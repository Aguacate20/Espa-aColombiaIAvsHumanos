/** Orden canónico del protocolo. Añadir escalas = añadir pasos aquí. */
export const STEPS = [
  "demographics",
  "country",
  "ceia9",
  // <-- aquí entrarán HGAITS-24, MCS-12, AIAS-15, UCLA-3, MSPSS-12, SIAS-6, ERQ-10
  "familiarization",
  "practice",
  "trials",
  "done",
] as const;

export type Step = (typeof STEPS)[number];

export const STEP_PATH: Record<Step, string> = {
  demographics: "/participante",
  country: "/pais",
  ceia9: "/escalas/ceia9",
  familiarization: "/experimento/familiarizacion",
  practice: "/experimento/practica",
  trials: "/experimento",
  done: "/fin",
};

export function nextStep(step: Step): Step {
  const i = STEPS.indexOf(step);
  return STEPS[Math.min(i + 1, STEPS.length - 1)];
}

export function pathForStep(step: string): string {
  return STEP_PATH[(step as Step) in STEP_PATH ? (step as Step) : "demographics"];
}
