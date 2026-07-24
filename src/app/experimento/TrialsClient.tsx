"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shell } from "@/components/Shell";
import { AgentBeam } from "@/components/AgentBeam";
import { ConfidenceScale } from "@/components/ConfidenceScale";

type Agent = "ia" | "humano";
interface Trial {
  i: number;
  id: string;
  text: string;
  left: Agent;
  right: Agent;
}

export function TrialsClient({
  trials,
  startIndex,
  copy,
}: {
  trials: Trial[];
  startIndex: number;
  copy: Record<string, string>;
}) {
  const router = useRouter();
  const [idx, setIdx] = useState(startIndex);
  const [phase, setPhase] = useState<"choice" | "confidence">("choice");
  const [choice, setChoice] = useState<{ value: number; moves: number; rtMs: number } | null>(null);
  const [saving, setSaving] = useState(false);

  const trial = trials[idx];
  const labels = { ia: copy.agentIa, humano: copy.agentHuman };
  const progress = 0.5 + 0.5 * (idx / trials.length);

  async function saveAndAdvance(conf: { value: number; rtMs: number }) {
    setSaving(true);
    await fetch("/api/trial", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        block: "main",
        trialIndex: trial.i,
        situationId: trial.id,
        left: trial.left,
        right: trial.right,
        sliderValue: choice?.value ?? 50,
        sliderMoves: choice?.moves,
        rtMs: choice?.rtMs,
        confidence: conf.value,
        confidenceRtMs: conf.rtMs,
      }),
    });
    setSaving(false);

    if (idx + 1 >= trials.length) {
      await fetch("/api/finish", { method: "POST" });
      router.push("/fin");
      return;
    }
    setChoice(null);
    setPhase("choice");
    setIdx((i) => i + 1);
    window.scrollTo({ top: 0 });
  }

  return (
    <Shell progress={progress} step={`${idx + 1} de ${trials.length}`}>
      {phase === "choice" ? (
        <div className="fade-in" key={trial.id}>
          {/* La situación es el contenido: tipografía display, tamaño mayor */}
          <p className="font-display text-[25px] sm:text-[30px] leading-snug text-ink max-w-measure">{trial.text}</p>
          <p className="mt-5 text-[15px] text-muted">{copy.trialPrompt}</p>

          <AgentBeam
            left={trial.left}
            right={trial.right}
            labels={labels}
            hint={copy.sliderHint}
            untouchedHint={copy.sliderUntouched}
            cta={copy.continueCta}
            onCommit={(v) => {
              setChoice(v);
              setPhase("confidence");
              window.scrollTo({ top: 0 });
            }}
          />
        </div>
      ) : (
        <ConfidenceScale
          key={`c-${trial.id}`}
          title={copy.confidenceTitle}
          lowLabel={copy.confidenceLow}
          highLabel={copy.confidenceHigh}
          cta={saving ? "Guardando…" : copy.continueCta}
          onCommit={saveAndAdvance}
        />
      )}
    </Shell>
  );
}
