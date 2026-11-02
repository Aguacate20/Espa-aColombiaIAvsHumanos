/**
 * Orden canónico del protocolo. Los pasos scale_* corresponden a las escalas
 * genéricas (una por cuestionario), cuyo orden real vive en
 * data/scales/registry.ts (GENERIC_SCALES). Si reordenas allí, reordena aquí.
 */
export const STEPS = [
  "identify",
  "country",
  "consent",
  "demographics",
  "ceia9",
  "scale_hgaits",
  "scale_mcs",
  "scale_aias",
  "scale_ucla3",
  "scale_emasp",
  "scale_sias6",
  "scale_derssf",
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
  scale_hgaits: "/escalas/hgaits",
  scale_mcs: "/escalas/mcs",
  scale_aias: "/escalas/aias",
  scale_ucla3: "/escalas/ucla3",
  scale_emasp: "/escalas/emasp",
  scale_sias6: "/escalas/sias6",
  scale_derssf: "/escalas/derssf",
  familiarization: "/experimento/familiarizacion",
  practice: "/experimento/practica",
  trials: "/experimento",
  done: "/fin",
};

export const STEP_LABEL: Record<Step, string> = {
  identify: "el inicio",
  country: "la selección de país",
  consent: "el consentimiento informado",
  demographics: "los datos sociodemográficos",
  ceia9: "los cuestionarios",
  scale_hgaits: "los cuestionarios",
  scale_mcs: "los cuestionarios",
  scale_aias: "los cuestionarios",
  scale_ucla3: "los cuestionarios",
  scale_emasp: "los cuestionarios",
  scale_sias6: "los cuestionarios",
  scale_derssf: "los cuestionarios",
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
