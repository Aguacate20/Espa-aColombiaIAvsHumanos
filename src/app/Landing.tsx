"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { STUDY_TITLE, STUDY_SUBTITLE, COPY } from "@/data/copy";

const c = COPY.CO; // en el inicio aún no hay país elegido

export type SessionState = { state: "new" } | { state: "inProgress"; next: string } | { state: "finished" };

const primary =
  "inline-flex items-center justify-center px-6 py-3 text-[15px] font-medium rounded-sm bg-brand text-white transition-colors hover:bg-ink disabled:opacity-40 disabled:cursor-not-allowed";

/**
 * Inicio ANÓNIMO: no se pide ningún dato identificativo. La sesión queda en
 * este navegador (cookie), así que se puede retomar desde el mismo dispositivo.
 */
export function Landing({ session }: { session: SessionState }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function startNew() {
    setBusy(true);
    setMsg(null);
    const res = await fetch("/api/participant", { method: "POST" });
    const j = await res.json().catch(() => ({ ok: false }));
    if (j.ok) router.push(j.next);
    else {
      setBusy(false);
      setMsg("No se pudo continuar. Revisa tu conexión e inténtalo de nuevo.");
    }
  }

  return (
    <div className="fade-in">
      {/* Portada */}
      <div className="mb-10">
        <p className="text-[13px] tracking-[0.18em] uppercase text-brand font-semibold mb-4">
          Universidad de La Sabana · Universitat de València
        </p>
        <h1 className="font-display text-[34px] sm:text-[46px] leading-[1.08] text-ink">{STUDY_TITLE}</h1>
        <p className="mt-4 font-display text-[20px] sm:text-[24px] text-muted italic">{STUDY_SUBTITLE}</p>
        <p className="mt-6 max-w-measure text-[16px] text-muted">{c.landingBody}</p>
        <p className="mt-3 max-w-measure text-[15px] text-muted">{c.landingNoTest}</p>
      </div>

      {/* Tarjeta de entrada */}
      <div className="border border-line rounded-lg p-6 sm:p-8 max-w-xl">
        {session.state === "new" && (
          <>
            <h2 className="font-display text-[22px] text-ink mb-3">{c.idTitle}</h2>
            <p className="text-[15px] text-muted mb-3">{c.anonLead}</p>
            <p className="text-[13px] text-muted mb-6">{c.anonResume}</p>
            <button type="button" disabled={busy} onClick={startNew} className={primary}>
              {busy ? "Un momento…" : c.startCta}
            </button>
          </>
        )}

        {session.state === "inProgress" && (
          <>
            <h2 className="font-display text-[22px] text-ink mb-3">{c.resumeTitle}</h2>
            <p className="text-[15px] text-muted mb-6">{c.resumeLead}</p>
            <button type="button" disabled={busy} onClick={() => router.push(session.next)} className={primary}>
              {c.resumeCta}
            </button>
            <div className="mt-6 border-t border-line pt-4">
              <p className="text-[13px] text-muted mb-2">{c.sharedDevice}</p>
              <button type="button" disabled={busy} onClick={startNew} className="text-[14px] text-brand underline underline-offset-2 disabled:opacity-40">
                {c.startOtherCta}
              </button>
            </div>
          </>
        )}

        {session.state === "finished" && (
          <>
            <h2 className="font-display text-[22px] text-ink mb-3">{c.finishedTitle}</h2>
            <p className="text-[15px] text-muted mb-6">{c.resumeFinished}</p>
            <a href="/fin" className="text-[14px] text-brand underline underline-offset-2">{c.finishedLink}</a>
            <div className="mt-6 border-t border-line pt-4">
              <p className="text-[13px] text-muted mb-2">{c.sharedDevice}</p>
              <button type="button" disabled={busy} onClick={startNew} className="text-[14px] text-brand underline underline-offset-2 disabled:opacity-40">
                {c.startOtherCta}
              </button>
            </div>
          </>
        )}

        {msg && <p className="mt-4 text-[14px] text-accent">{msg}</p>}
      </div>
    </div>
  );
}
