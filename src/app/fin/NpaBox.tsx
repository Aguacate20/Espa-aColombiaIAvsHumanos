"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/Shell";

type Copy = Record<
  | "npaTitle" | "npaLead" | "npaLabel" | "npaRepeat" | "npaMismatch" | "npaInvalid" | "npaSubmit"
  | "npaSaved" | "npaAlready" | "npaLocked" | "npaDisabled" | "npaError",
  string
>;

const field = "w-full border border-line rounded-sm px-3 py-2.5 text-[16px] bg-white tracking-wide";
const label = "block text-[14px] font-medium text-ink mb-1.5";
const clean = (s: string) => s.replace(/\s+/g, "").toUpperCase();

/**
 * Registro del NPA (solo España). Se desbloquea con el token que emite
 * /api/finish al completar las 27 situaciones. Se guarda en otra base de datos.
 */
export function NpaBox({ copy }: { copy: Copy }) {
  const [status, setStatus] = useState<"loading" | "available" | "done" | "saved" | "locked" | "disabled" | "error">("loading");
  const [npa, setNpa] = useState("");
  const [npa2, setNpa2] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    // Por si el cierre del último ensayo no llegó al servidor: /api/finish es idempotente.
    fetch("/api/finish", { method: "POST" })
      .catch(() => null)
      .then(() => fetch("/api/npa").then((r) => r.json()))
      .then((j) => setStatus(j?.status ?? "locked"))
      .catch(() => setStatus("locked"));
  }, []);

  const a = clean(npa);
  const valid = /^[A-Z0-9-]{4,20}$/.test(a);
  const match = a === clean(npa2);

  async function submit() {
    setBusy(true);
    setMsg(null);
    const j = await fetch("/api/npa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ npa: a }),
    })
      .then((r) => r.json())
      .catch(() => ({ ok: false, status: "error" }));
    setBusy(false);
    if (j.ok) setStatus(j.status === "done" ? "done" : "saved");
    else if (j.status === "invalid") setMsg(copy.npaInvalid);
    else if (j.status === "done" || j.status === "locked" || j.status === "disabled") setStatus(j.status);
    else setMsg(copy.npaError);
  }

  if (status === "loading") return null;

  return (
    <section className="mt-10 border border-line rounded-lg p-6 sm:p-8 max-w-xl">
      <h2 className="font-display text-[22px] text-ink mb-3">{copy.npaTitle}</h2>

      {status === "available" && (
        <>
          <p className="text-[15px] text-muted mb-6">{copy.npaLead}</p>
          <div className="grid gap-4">
            <div>
              <label className={label} htmlFor="npa">{copy.npaLabel}</label>
              <input id="npa" className={field} value={npa} onChange={(e) => setNpa(e.target.value)} autoComplete="off" autoCapitalize="characters" spellCheck={false} />
              {npa !== "" && !valid && <p className="mt-1.5 text-[13px] text-accent">{copy.npaInvalid}</p>}
            </div>
            <div>
              <label className={label} htmlFor="npa2">{copy.npaRepeat}</label>
              <input id="npa2" className={field} value={npa2} onChange={(e) => setNpa2(e.target.value)} autoComplete="off" autoCapitalize="characters" spellCheck={false} />
              {npa2 !== "" && !match && <p className="mt-1.5 text-[13px] text-accent">{copy.npaMismatch}</p>}
            </div>
            {msg && <p className="text-[14px] text-accent">{msg}</p>}
            <div className="pt-1">
              <Button onClick={submit} disabled={!valid || !match || busy}>{busy ? "Guardando…" : copy.npaSubmit}</Button>
            </div>
          </div>
        </>
      )}

      {status === "saved" && <p className="text-[15px] text-ink">{copy.npaSaved}</p>}
      {status === "done" && <p className="text-[15px] text-muted">{copy.npaAlready}</p>}
      {status === "locked" && <p className="text-[15px] text-muted">{copy.npaLocked}</p>}
      {status === "disabled" && <p className="text-[15px] text-muted">{copy.npaDisabled}</p>}
      {status === "error" && <p className="text-[15px] text-accent">{copy.npaError}</p>}
    </section>
  );
}
