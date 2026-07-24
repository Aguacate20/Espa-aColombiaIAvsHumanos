"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Shell, Title, Button } from "@/components/Shell";
import { LikertItem } from "@/components/Likert";
import { CEIA9 } from "@/data/scales/ceia9";
import { COPY, type Country } from "@/data/copy";

/**
 * CEIA-9 en UNA sección. Es la primera del bloque de cuestionarios; al
 * continuar pasa a HGAITS (primera escala genérica). Atrás vuelve a los
 * sociodemográficos.
 */
export function Ceia9Form({ country }: { country: Country }) {
  const router = useRouter();
  const c = COPY[country];
  const items = CEIA9.items;
  const anchors = CEIA9.anchors[country];

  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [busy, setBusy] = useState(false);
  const t0 = useRef(performance.now());

  useEffect(() => {
    fetch("/api/scale?scale=CEIA9").then((r) => r.json()).then((j) => { if (j.ok) setAnswers(j.answers ?? {}); }).catch(() => {});
  }, []);

  const answered = Object.keys(answers).length;
  const missing = items.filter((it) => answers[it.code] === undefined);
  const complete = missing.length === 0;

  function goToMissing() {
    document.getElementById(`item-${missing[0].code}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  async function submit() {
    setBusy(true);
    await fetch("/api/scale", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ scale: "CEIA9", answers, pageRtMs: Math.round(performance.now() - t0.current), nextStepAfter: "scale_hgaits" }),
    });
    router.push("/escalas/hgaits");
  }

  return (
    <Shell step={`Cuestionario · ${answered}/${items.length}`}>
      <div className="fade-in">
        <Title>{c.scaleTitle}</Title>
        <p className="max-w-measure text-[15px] sm:text-[16px] text-muted mb-2">{CEIA9.instructions[country]}</p>
        <p className="max-w-measure text-[13px] sm:text-[14px] text-muted mb-6">Escala de 1 (totalmente en desacuerdo) a 5 (totalmente de acuerdo).</p>

        <div className="mt-4">
          {items.map((it, i) => (
            <div key={it.code} id={`item-${it.code}`}>
              <LikertItem name={it.code} index={i + 1} text={it.text[country]} anchors={anchors} value={answers[it.code]} onChange={(v) => setAnswers((a) => ({ ...a, [it.code]: v }))} />
            </div>
          ))}
        </div>

        <div className="sticky bottom-0 bg-surface border-t border-line pt-4 pb-4 mt-4 flex items-center gap-3 flex-wrap">
          <a href="/participante" className="inline-flex items-center px-6 py-3 text-[15px] font-medium rounded-sm border border-line text-ink no-underline hover:border-brand hover:text-brand transition-colors">{c.backCta}</a>
          <Button onClick={submit} disabled={!complete || busy}>{busy ? "Guardando…" : c.continueCta}</Button>
          {!complete && (
            <button type="button" onClick={goToMissing} className="text-[13px] text-accent underline underline-offset-2">
              {c.scaleRemaining.replace("{n}", String(missing.length))} · {c.scaleGoToMissing}
            </button>
          )}
        </div>
      </div>
    </Shell>
  );
}
