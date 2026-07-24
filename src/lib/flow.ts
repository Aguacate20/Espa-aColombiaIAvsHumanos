/** Orden canónico del protocolo. Añadir escalas = añadir pasos aquí. */
export const STEPS = [
  "identify",
  "country",
  "consent",
  "demographics",
  "ceia9",
  // <-- aquí entrarán HGAITS-24, MCS-12, AIAS-15, UCLA-3, MSPSS-12, SIAS-6, ERQ-10
  "familiarization",
  "practice",
  "trials",
  "done",
] as const;

export type Step = (typeof STEPS)[number];

export const STEP_PATH: Record<Step, string> = {
  identify: "/",
  country: "/pais",
  consent: "/consentimiento",
  demographics: "/participante",
  ceia9: "/escalas/ceia9",
  familiarization: "/experimento/familiarizacion",
  practice: "/experimento/practica",
  trials: "/experimento",
  done: "/fin",
};

/** Etiqueta humana para el mensaje de "retomaste aquí". */
export const STEP_LABEL: Record<Step, string> = {
  identify: "el inicio",
  country: "la selección de país",
  consent: "el consentimiento informado",
  demographics: "los datos sociodemográficos",
  ceia9: "los cuestionarios",
  familiarization: "la presentación de los interlocutores",
  practice: "el ensayo de práctica",
  trials: "las situaciones",
  done: "el final",
};

export function nextStep(step: Step): Step {
  const i = STEPS.indexOf(step);
  return STEPS[Math.min(i + 1, STEPS.length - 1)];
}

export function pathForStep(step: string): string {
  return STEP_PATH[(step as Step) in STEP_PATH ? (step as Step) : "identify"];
}

export function labelForStep(step: string): string {
  return STEP_LABEL[(step as Step) in STEP_LABEL ? (step as Step) : "identify"];
}
