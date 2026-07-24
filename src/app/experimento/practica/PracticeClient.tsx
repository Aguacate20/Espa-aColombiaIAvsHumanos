"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shell, Title, Lead } from "@/components/Shell";
import { AgentBeam } from "@/components/AgentBeam";
import { ConfidenceScale } from "@/components/ConfidenceScale";

type Copy = Record<string, string>;

export function PracticeClient({
  situation,
  copy,
}: {
  situation: { id: string; text: string };
  copy: Copy;
}) {
  const router = useRouter();
  const [phase, setPhase] = useState<"choice" | "confidence">("choice");
  const [choice, setChoice] = useState<{ value: number; moves: number; rtMs: number } | null>(null);

  const labels = { ia: copy.agentIa, humano: copy.agentHuman };

  async function finish(conf: { value: number; rtMs: number }) {
    await fetch("/api/trial", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        block: "practice",
        trialIndex: 0,
        situationId: situation.id,
        left: "ia",
        right: "humano",
        sliderValue: choice?.value ?? 50,
        sliderMoves: choice?.moves,
        rtMs: choice?.rtMs,
        confidence: conf.value,
        confidenceRtMs: conf.rtMs,
      }),
    });
    router.push("/experimento");
  }

  return (
    <Shell progress={0.46} step="4 de 5 · práctica">
      {phase === "choice" ? (
        <div className="fade-in">
          <Title>{copy.practiceTitle}</Title>
          <Lead>{copy.practiceLead}</Lead>

          <p className="mt-10 font-display text-[24px] sm:text-[28px] leading-snug text-ink max-w-measure">
            {situation.text}
          </p>
          <p className="mt-4 text-[15px] text-muted">{copy.trialPrompt}</p>

          <AgentBeam
            left="ia"
            right="humano"
            labels={labels}
            hint={copy.sliderHint}
            untouchedHint={copy.sliderUntouched}
            cta={copy.continueCta}
            onCommit={(v) => {
              setChoice(v);
              setPhase("confidence");
            }}
          />
        </div>
      ) : (
        <ConfidenceScale
          title={copy.confidenceTitle}
          lowLabel={copy.confidenceLow}
          highLabel={copy.confidenceHigh}
          cta={copy.continueCta}
          onCommit={finish}
        />
      )}
    </Shell>
  );
}
