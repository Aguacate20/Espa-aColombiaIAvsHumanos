"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Title, Lead, Button } from "@/components/Shell";
import { COPY, OPTIONS } from "@/data/copy";

const c = COPY.CO;
const o = OPTIONS.CO;

const field = "w-full border border-line rounded-sm px-3 py-2.5 text-[16px] bg-white";
const label = "block text-[14px] font-medium text-ink mb-1.5";

export function DemographicsForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    age: "",
    gender: "",
    genderOther: "",
    education: "",
    occupation: "",
    email: "",
    aiUse: "",
  });
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const ageOk = Number(form.age) >= 18 && Number(form.age) <= 99;
  const ready = ageOk && form.gender && form.education && form.aiUse && consent;

  async function submit() {
    setBusy(true);
    setError(null);
    const res = await fetch("/api/participant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, age: Number(form.age) }),
    });
    const json = await res.json();
    if (!json.ok) {
      setError("No se pudo guardar. Revisa tu conexión e inténtalo otra vez.");
      setBusy(false);
      return;
    }
    router.push(json.next);
  }

  return (
    <div className="fade-in">
      <Title>{c.demoTitle}</Title>
      <Lead>{c.demoLead}</Lead>

      <div className="grid gap-6 max-w-xl">
        <div>
          <label className={label} htmlFor="age">{c.demoAge}</label>
          <input id="age" type="number" min={18} max={99} inputMode="numeric" className={field} value={form.age} onChange={set("age")} />
          {form.age !== "" && !ageOk && (
            <p className="mt-1.5 text-[13px] text-accent">Para participar debes tener 18 años o más.</p>
          )}
        </div>

        <div>
          <label className={label} htmlFor="gender">{c.demoGender}</label>
          <select id="gender" className={field} value={form.gender} onChange={set("gender")}>
            <option value="">Selecciona una opción</option>
            {o.gender.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
          {form.gender === "Otro" && (
            <input className={`${field} mt-2`} placeholder="¿Cómo te identificas?" value={form.genderOther} onChange={set("genderOther")} />
          )}
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
          <label className={label} htmlFor="email">{c.demoEmail}</label>
          <input id="email" type="email" className={field} value={form.email} onChange={set("email")} />
        </div>

        <label className="flex items-start gap-3 border-t border-line pt-6 cursor-pointer">
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 h-4 w-4 accent-[rgb(var(--brand))]" />
          <span className="text-[15px] text-ink">{c.consentCheck}</span>
        </label>

        {error && <p className="text-[14px] text-accent">{error}</p>}

        <div>
          <Button onClick={submit} disabled={!ready || busy}>
            {busy ? "Guardando…" : c.continueCta}
          </Button>
        </div>
      </div>
    </div>
  );
}
