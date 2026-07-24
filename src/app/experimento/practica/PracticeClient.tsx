"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shell, Title, Lead } from "@/components/Shell";
import { AgentBeam } from "@/components/AgentBeam";
import { ConfidenceScale } from "@/components/ConfidenceScale";
import type { StimulusSet } from "@/data/stimuli";

export function PracticeClient({
  situation, stimulusSet, copy,
}: {
  situation: { id: string; text: string };
  stimulusSet: StimulusSet;
  copy: Record<string, string>;
}) {
  const router = useRouter();
  const [phase, setPhase] = useState<"choice" | "confidence">("choice");
  const [choice, setChoice] = useState<{ value: number; moves: number; rtMs: number } | null>(null);
  const labels = { ia: copy.agentIa, humano: copy.agentHuman };

  async function finish(conf: { value: number; rtMs: number }) {
    await fetch("/api/trial", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        block: "practice", trialIndex: 0, situationId: situation.id,
        left: "ia", right: "humano", humanGender: "mujer",
        sliderValue: choice?.value ?? 50, sliderMoves: choice?.moves, rtMs: choice?.rtMs,
        confidence: conf.value, confidenceRtMs: conf.rtMs,
      }),
    });
    router.push("/experimento");
  }

  return (
    <Shell progress={0.56} step="Práctica">
      {phase === "choice" ? (
        <div className="fade-in">
          <Title>{copy.practiceTitle}</Title>
          <Lead>{copy.practiceLead}</Lead>
          <p className="mt-8 font-display text-[24px] sm:text-[28px] leading-snug text-ink max-w-measure">{situation.text}</p>
          <p className="mt-4 text-[15px] text-muted">{copy.trialPrompt}</p>
          <AgentBeam
            left="ia" right="humano" labels={labels}
            stimulusSet={stimulusSet} humanGender="mujer"
            hint={copy.sliderHint} untouchedHint={copy.sliderUntouched} cta={copy.continueCta}
            onCommit={(v) => { setChoice(v); setPhase("confidence"); }}
          />
          <div className="mt-8 border-t border-line pt-6">
            <a href="/experimento/familiarizacion" className="inline-flex items-center px-6 py-3 text-[15px] font-medium rounded-sm border border-line text-ink no-underline hover:border-brand hover:text-brand transition-colors">
              {copy.backCta}
            </a>
          </div>
        </div>
      ) : (
        <ConfidenceScale title={copy.confidenceTitle} lowLabel={copy.confidenceLow} highLabel={copy.confidenceHigh} cta={copy.continueCta} onCommit={finish} />
      )}
    </Shell>
  );
}
