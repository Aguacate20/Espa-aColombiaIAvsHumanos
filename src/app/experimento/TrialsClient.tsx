"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Shell } from "@/components/Shell";
import { AgentBeam } from "@/components/AgentBeam";
import { ConfidenceScale } from "@/components/ConfidenceScale";
import type { StimulusSet } from "@/data/stimuli";

type Agent = "ia" | "humano";
interface Trial { i: number; id: string; text: string; left: Agent; right: Agent; humanGender: "hombre" | "mujer"; }
type Choice = { value: number; moves: number; rtMs: number; firstMoveMs: number | null; pointerType: string | null };

/**
 * Recibe SOLO las situaciones pendientes (en el orden del plan). Así, al
 * reanudar o si alguna no se guardó, nunca se vuelve a mostrar una situación
 * ya respondida ni se sobrescribe su respuesta.
 */
export function TrialsClient({
  trials, doneCount, total, stimulusSet, copy,
}: {
  trials: Trial[]; doneCount: number; total: number; stimulusSet: StimulusSet; copy: Record<string, string>;
}) {
  const router = useRouter();
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<"choice" | "confidence">("choice");
  const [choice, setChoice] = useState<Choice | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Candado contra el doble toque: un segundo clic mientras se guarda saltaba una situación.
  const busy = useRef(false);

  const trial = trials[idx];
  const position = doneCount + idx + 1;
  const labels = { ia: copy.agentIa, humano: copy.agentHuman };
  const progress = 0.6 + 0.4 * ((position - 1) / total);

  async function postTrial(body: string): Promise<boolean> {
    for (let attempt = 0; attempt < 2; attempt++) {
      const ok = await fetch("/api/trial", { method: "POST", headers: { "Content-Type": "application/json" }, body })
        .then((r) => r.ok)
        .catch(() => false);
      if (ok) return true;
    }
    return false;
  }

  async function saveAndAdvance(conf: { value: number; rtMs: number }) {
    if (busy.current || !trial) return;
    busy.current = true;
    setSaving(true);
    setError(null);

    const ok = await postTrial(
      JSON.stringify({
        block: "main", trialIndex: trial.i, situationId: trial.id,
        left: trial.left, right: trial.right, humanGender: trial.humanGender,
        sliderValue: choice?.value ?? 50, sliderMoves: choice?.moves, rtMs: choice?.rtMs,
        firstMoveMs: choice?.firstMoveMs ?? null, pointerType: choice?.pointerType ?? null,
        confidence: conf.value, confidenceRtMs: conf.rtMs,
      }),
    );

    if (!ok) {
      setSaving(false);
      busy.current = false;
      setError(copy.saveError);
      return;
    }

    if (idx + 1 >= trials.length) {
      await fetch("/api/finish", { method: "POST" }).catch(() => null);
      router.push("/fin");
      return;
    }
    setChoice(null);
    setPhase("choice");
    setIdx(idx + 1);
    setSaving(false);
    busy.current = false;
    window.scrollTo({ top: 0 });
  }

  if (!trial) return null;

  return (
    <Shell progress={progress} step={`Situación ${position} de ${total}`}>
      {phase === "choice" ? (
        <div className="fade-in" key={trial.id}>
          <p className="font-display text-[25px] sm:text-[30px] leading-snug text-ink max-w-measure">{trial.text}</p>
          <p className="mt-5 text-[15px] text-muted">{copy.trialPrompt}</p>
          <AgentBeam
            left={trial.left} right={trial.right} labels={labels}
            stimulusSet={stimulusSet} humanGender={trial.humanGender}
            hint={copy.sliderHint} untouchedHint={copy.sliderUntouched} cta={copy.continueCta}
            onCommit={(v) => { setChoice(v); setPhase("confidence"); window.scrollTo({ top: 0 }); }}
          />
        </div>
      ) : (
        <>
          <ConfidenceScale
            key={`c-${trial.id}`}
            title={copy.confidenceTitle} lowLabel={copy.confidenceLow} highLabel={copy.confidenceHigh}
            cta={saving ? "Guardando…" : copy.continueCta} busy={saving} onCommit={saveAndAdvance}
          />
          {error && <p className="mt-4 text-center text-[14px] text-accent">{error}</p>}
        </>
      )}
    </Shell>
  );
}
