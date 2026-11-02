"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Title, Lead, Button } from "@/components/Shell";

type Consent = ReturnType<typeof import("@/data/consent").consentFor>;

export function ConsentClient({ consent }: { consent: Consent }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);

  async function accept() {
    if (busy) return;
    setBusy(true);
    setError(false);
    const j = await fetch("/api/consent", { method: "POST" }).then((r) => r.json()).catch(() => ({ ok: false }));
    if (j.ok) router.push(j.next);
    else {
      setBusy(false);
      setError(true);
    }
  }

  return (
    <div className="fade-in">
      <Title>{consent.title}</Title>
      <Lead>{consent.lead}</Lead>

      <div className="space-y-7 max-w-measure">
        {consent.sections.map((s) => (
          <section key={s.heading}>
            <h2 className="font-display text-[19px] text-ink mb-2">{s.heading}</h2>
            {s.body.map((para, i) => (
              <p key={i} className="text-[15px] leading-relaxed text-muted mb-2">{para}</p>
            ))}
          </section>
        ))}
      </div>

      <div className="mt-10 border-t border-line pt-6 max-w-measure">
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} className="mt-1 h-4 w-4 accent-[rgb(var(--brand))]" />
          <span className="text-[15px] text-ink">{consent.checkboxLabel}</span>
        </label>

        {error && <p className="mt-4 text-[14px] text-accent">No se pudo continuar. Revisa tu conexión e inténtalo de nuevo.</p>}

        <div className="mt-6 flex flex-wrap gap-3">
          <Button onClick={accept} disabled={!checked || busy}>
            {busy ? "Un momento…" : consent.accept}
          </Button>
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 text-[15px] font-medium rounded-sm border border-line text-muted no-underline hover:text-ink hover:border-ink transition-colors"
          >
            {consent.decline}
          </a>
        </div>
      </div>
    </div>
  );
}
