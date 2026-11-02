"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Title, Lead, Button } from "@/components/Shell";
import { COPY, OPTIONS, DEVICE_CODES, type Country } from "@/data/copy";
import { collectDeviceInfo } from "@/lib/deviceInfo";
import { postJson, SAVE_ERROR } from "@/lib/postJson";

export type DemoInitial = Partial<Record<"age" | "gender" | "genderOther" | "education" | "occupation" | "aiUse" | "screenTime" | "device", string>>;

const field = "w-full border border-line rounded-sm px-3 py-2.5 text-[16px] bg-white";
const label = "block text-[14px] font-medium text-ink mb-1.5";

export function DemographicsForm({
  country,
  preItems,
  preAnchors,
  preInstructions,
  initial = {},
}: {
  country: Country;
  preItems: { code: string; text: string }[];
  preAnchors: string[];
  preInstructions: string;
  /** Lo ya guardado, para que al volver con «Atrás» no aparezca el formulario vacío. */
  initial?: DemoInitial;
}) {
  const router = useRouter();
  const c = COPY[country];
  const o = OPTIONS[country];

  const [form, setForm] = useState({
    age: "", gender: "", genderOther: "", education: "", occupation: "", aiUse: "", screenTime: "", device: "",
    ...Object.fromEntries(Object.entries(initial).filter(([, v]) => v)),
  });
  const [pre, setPre] = useState<Record<string, number>>({});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const ageOk = Number(form.age) >= 18 && Number(form.age) <= 99;
  const preComplete = preItems.every((it) => pre[it.code] !== undefined);
  const ready = ageOk && form.gender && form.education && form.aiUse && form.screenTime && form.device && preComplete;
  const order = useMemo(() => Object.fromEntries(preItems.map((it, i) => [it.code, i])), [preItems]);

  useEffect(() => {
    fetch("/api/scale?scale=PRE").then((r) => r.json()).then((j) => {
      if (j.ok) setPre((prev) => ({ ...(j.answers ?? {}), ...prev }));
    }).catch(() => {});
  }, []);

  async function submit() {
    if (busy) return;
    setBusy(true);
    setError(null);
    const demo = await postJson<{ ok: boolean; next: string }>("/api/demographics", {
      ...form,
      age: Number(form.age),
      deviceReported: DEVICE_CODES[o.device.indexOf(form.device)] ?? null,
      deviceInfo: collectDeviceInfo(),
    });

    if (!demo?.ok) { setError(SAVE_ERROR); setBusy(false); return; }

    const saved = await postJson("/api/scale", { scale: "PRE", answers: pre, order });
    if (!saved) { setError(SAVE_ERROR); setBusy(false); return; }

    router.push(demo.next);
  }

  return (
    <div className="fade-in">
      <Title>{c.demoTitle}</Title>
      <Lead>{c.demoLead}</Lead>

      <div className="grid gap-6 max-w-xl">
        <div>
          <label className={label} htmlFor="age">{c.demoAge}</label>
          <input id="age" type="number" min={18} max={99} inputMode="numeric" className={field} value={form.age} onChange={set("age")} />
          {form.age !== "" && !ageOk && <p className="mt-1.5 text-[13px] text-accent">Para participar debes tener 18 años o más.</p>}
        </div>

        <div>
          <label className={label} htmlFor="gender">{c.demoGender}</label>
          <select id="gender" className={field} value={form.gender} onChange={set("gender")}>
            <option value="">Selecciona una opción</option>
            {o.gender.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
          <p className="mt-1.5 text-[12px] text-muted">{c.demoGenderHelp}</p>
          {form.gender === "Otro" && <input className={`${field} mt-2`} placeholder="¿Cómo te identificas?" value={form.genderOther} onChange={set("genderOther")} />}
        </div>

        <div>
          <label className={label} htmlFor="education">{c.demoEducation}</label>
          <select id="education" className={field} value={form.education} onChange={set("education")}>
            <option value="">Selecciona una opción</option>
            {o.education.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>

        <div>
          <label className={label} htmlFor="occupation">{c.demoOccupation}</label>
          <input id="occupation" className={field} value={form.occupation} onChange={set("occupation")} />
        </div>

        <div>
          <label className={label} htmlFor="aiUse">{c.demoAiUse}</label>
          <select id="aiUse" className={field} value={form.aiUse} onChange={set("aiUse")}>
            <option value="">Selecciona una opción</option>
            {o.aiUse.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>

        <div>
          <label className={label} htmlFor="screenTime">{c.demoScreenTime}</label>
          <select id="screenTime" className={field} value={form.screenTime} onChange={set("screenTime")}>
            <option value="">Selecciona una opción</option>
            {o.screenTime.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>

        <div>
          <label className={label} htmlFor="device">{c.demoDevice}</label>
          <select id="device" className={field} value={form.device} onChange={set("device")}>
            <option value="">Selecciona una opción</option>
            {o.device.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
          <p className="mt-1.5 text-[12px] text-muted">{c.demoDeviceHelp}</p>
        </div>
      </div>

      {/* Confianza previa — misma pantalla, rejilla 1..5 */}
      <div className="mt-10 border-t border-line pt-8 max-w-xl">
        <h2 className="font-display text-[20px] text-ink mb-2">Antes de empezar</h2>
        <p className="text-[15px] text-muted mb-6">{preInstructions}</p>

        <div className="space-y-6">
          {preItems.map((it, idx) => (
            <fieldset key={it.code}>
              <legend className="text-[15px] leading-snug text-ink mb-3">
                <span className="text-muted tabular-nums mr-2 text-[13px]">{idx + 1}</span>{it.text}
              </legend>
              <div className="grid grid-cols-5 gap-1 sm:gap-2">
                {preAnchors.map((anchor, i) => {
                  const v = i + 1; const active = pre[it.code] === v;
                  return (
                    <label key={v} className={`cursor-pointer rounded-sm border px-1 py-2 text-center transition-colors ${active ? "border-brand bg-brand text-white" : "border-line text-ink hover:border-brand"}`}>
                      <input type="radio" name={it.code} value={v} checked={active} onChange={() => setPre((a) => ({ ...a, [it.code]: v }))} className="sr-only" />
                      <span className="block text-[15px] tabular-nums font-medium">{v}</span>
                      <span className={`mt-1 block text-[11px] leading-tight ${active ? "text-white/85" : "text-muted"}`}>{anchor}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          ))}
        </div>
      </div>

      {error && <p className="mt-6 text-[14px] text-accent">{error}</p>}

      <div className="mt-8 flex items-center gap-3">
        <a href="/consentimiento" className="inline-flex items-center px-6 py-3 text-[15px] font-medium rounded-sm border border-line text-ink no-underline hover:border-brand hover:text-brand transition-colors">
          {c.backCta}
        </a>
        <Button onClick={submit} disabled={!ready || busy}>{busy ? "Guardando…" : c.continueCta}</Button>
        {!ready && <span className="text-[13px] text-muted">Completa todos los campos para continuar.</span>}
      </div>
    </div>
  );
}
