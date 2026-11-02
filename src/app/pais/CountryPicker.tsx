"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Title, Lead } from "@/components/Shell";
import { COPY, COUNTRY_META } from "@/data/copy";

const c = COPY.CO;

export function CountryPicker() {
  const router = useRouter();
  const [busy, setBusy] = useState<"CO" | "ES" | null>(null);
  const [error, setError] = useState(false);

  async function choose(country: "CO" | "ES") {
    if (busy) return;
    setBusy(country);
    setError(false);
    const j = await fetch("/api/country", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country }),
    }).then((r) => r.json()).catch(() => ({ ok: false }));
    if (j.ok) router.push(j.next);
    else {
      setBusy(null);
      setError(true);
    }
  }

  return (
    <div className="fade-in">
      <Title>{c.countryTitle}</Title>
      <Lead>{c.countryLead}</Lead>
      {error && <p className="mb-4 text-[14px] text-accent">No se pudo continuar. Revisa tu conexión e inténtalo de nuevo.</p>}
      <div className="grid sm:grid-cols-2 gap-4">
        {(["CO", "ES"] as const).map((code) => {
          const meta = COUNTRY_META[code];
          return (
            <button
              key={code}
              type="button"
              disabled={busy !== null}
              onClick={() => choose(code)}
              className="group text-left border border-line rounded-lg p-6 transition-colors hover:border-brand disabled:opacity-50"
            >
              <span className="block font-display text-[26px] text-ink group-hover:text-brand transition-colors">{meta.label}</span>
              <span className="mt-2 block text-[14px] text-muted">{meta.university}</span>
              {busy === code && <span className="mt-4 block text-[13px] text-muted">Un momento…</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
