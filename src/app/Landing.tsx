"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { STUDY_TITLE, STUDY_SUBTITLE, COPY } from "@/data/copy";

const c = COPY.CO; // en el inicio aún no hay país elegido
const field = "w-full border border-line rounded-sm px-3 py-2.5 text-[16px] bg-white";
const label = "block text-[14px] font-medium text-ink mb-1.5";

export function Landing() {
  const router = useRouter();
  const [mode, setMode] = useState<"start" | "resume">("start");
  const [fullName, setFullName] = useState("");
  const [document, setDocument] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const ready = fullName.trim().length > 1 && document.trim().length > 2;

  async function start() {
    setBusy(true);
    setMsg(null);
    const res = await fetch("/api/participant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, document }),
    });
    const j = await res.json();
    setBusy(false);
    if (j.ok) router.push(j.next);
    else setMsg("No se pudo continuar. Inténtalo de nuevo.");
  }

  async function resume() {
    setBusy(true);
    setMsg(null);
    const res = await fetch("/api/resume", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, document }),
    });
    const j = await res.json();
    setBusy(false);
    if (j.ok) router.push(j.next);
    else if (j.reason === "finished") setMsg(c.resumeFinished);
    else setMsg(c.resumeNotFound);
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
        <div className="flex gap-1 mb-6 border-b border-line">
          <TabButton active={mode === "start"} onClick={() => { setMode("start"); setMsg(null); }}>
            {c.idTitle}
          </TabButton>
          <TabButton active={mode === "resume"} onClick={() => { setMode("resume"); setMsg(null); }}>
            {c.resumeTitle}
          </TabButton>
        </div>

        <p className="text-[15px] text-muted mb-6">{mode === "start" ? c.idLead : c.resumeLead}</p>

        <div className="grid gap-4">
          <div>
            <label className={label} htmlFor="fullName">{c.idName}</label>
            <input id="fullName" className={field} value={fullName} onChange={(e) => setFullName(e.target.value)} autoComplete="name" />
          </div>
          <div>
            <label className={label} htmlFor="document">{c.idDocument}</label>
            <input id="document" className={field} value={document} onChange={(e) => setDocument(e.target.value)} inputMode="text" />
          </div>

          {mode === "start" && <p className="text-[13px] text-muted">{c.idNotice}</p>}
          {msg && <p className="text-[14px] text-accent">{msg}</p>}

          <div className="pt-1">
            <button
              type="button"
              disabled={!ready || busy}
              onClick={mode === "start" ? start : resume}
              className="inline-flex items-center justify-center px-6 py-3 text-[15px] font-medium rounded-sm bg-brand text-white transition-colors hover:bg-ink disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {busy ? "Un momento…" : mode === "start" ? c.continueCta : c.resumeCta}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2.5 text-[14px] font-medium -mb-px border-b-2 transition-colors ${
        active ? "border-brand text-brand" : "border-transparent text-muted hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}
