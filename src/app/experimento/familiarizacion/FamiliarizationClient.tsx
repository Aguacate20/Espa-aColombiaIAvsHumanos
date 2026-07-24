"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shell } from "@/components/Shell";
import { IaStimulus, HumanStimulus } from "@/components/Stimulus";
import type { StimulusSet } from "@/data/stimuli";

type Copy = Record<string, string>;

/**
 * Tres pantallas encadenadas dentro del mismo paso:
 *  0 — solo la instrucción
 *  1 — el interlocutor IA, con imagen y descripción
 *  2 — el interlocutor humano, con las dos variantes alternables
 */
export function FamiliarizationClient({ stimulusSet, copy }: { stimulusSet: StimulusSet; copy: Copy }) {
  const router = useRouter();
  const [screen, setScreen] = useState(0);

  function next() {
    if (screen < 2) setScreen((s) => s + 1);
    else router.push("/experimento/practica");
  }
  function back() {
    if (screen > 0) setScreen((s) => s - 1);
    else router.push("/escalas/ceia9");
  }

  const progress = 0.5 + 0.02 * screen;

  return (
    <Shell progress={progress} step="Presentación">
      <div className="fade-in min-h-[46vh] flex flex-col justify-center" key={screen}>
        {screen === 0 && (
          <p className="font-display text-[24px] sm:text-[30px] leading-snug text-ink max-w-measure">{copy.intro}</p>
        )}

        {screen === 1 && (
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <div className="w-44 sm:w-56 shrink-0"><IaStimulus set={stimulusSet} /></div>
            <div>
              <h2 className="font-display text-[24px] text-ink mb-3">{copy.iaName}</h2>
              <p className="text-[16px] leading-relaxed text-muted max-w-measure">{copy.iaDesc}</p>
            </div>
          </div>
        )}

        {screen === 2 && (
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <div className="w-44 sm:w-56 shrink-0">
              <HumanStimulus set={stimulusSet} />
              <p className="mt-3 text-center text-[12px] text-muted sm:hidden">{copy.humanNoteTouch}</p>
              <p className="mt-3 text-center text-[12px] text-muted hidden sm:block">{copy.humanNote}</p>
            </div>
            <div>
              <h2 className="font-display text-[24px] text-ink mb-3">{copy.humanName}</h2>
              <p className="text-[16px] leading-relaxed text-muted max-w-measure">{copy.humanDesc}</p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-10 border-t border-line pt-6 flex items-center gap-3">
        <button type="button" onClick={back} className="inline-flex items-center px-6 py-3 text-[15px] font-medium rounded-sm border border-line text-ink hover:border-brand hover:text-brand transition-colors">
          {copy.backCta}
        </button>
        <button type="button" onClick={next} className="inline-flex items-center px-8 py-3 text-[15px] font-medium rounded-sm bg-brand text-white hover:bg-ink transition-colors">
          {copy.continueCta}
        </button>
        <span className="ml-auto text-[12px] text-muted tabular-nums">{screen + 1} / 3</span>
      </div>
    </Shell>
  );
}
