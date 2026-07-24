/**
 * CONFIANZA PREVIA (bloque PRE) — 5 ítems, Likert 1–5.
 *
 * Diseño 2x2 cruzado + 1 covariable:
 *
 *              │ Epistémico          │ Socioemocional
 *   ───────────┼─────────────────────┼──────────────────
 *   IA         │ PRE_EPI_IA          │ PRE_SOC_IA
 *   Humano     │ PRE_EPI_HUM         │ PRE_SOC_HUM
 *
 *   PRE_KNOW = conocimiento autoinformado sobre IA (covariable, NO es confianza:
 *   no debe promediarse con los otros cuatro).
 *
 * Los cuatro ítems de confianza son paralelos en estructura para que la
 * diferencia IA–humano y la diferencia epistémico–socioemocional sean
 * comparables. La única variación entre ellos es el agente y el dominio.
 *
 * ORDEN: se presenta la mitad de los participantes con los ítems de IA
 * primero y la otra mitad con los de humano primero, para que un eventual
 * efecto de orden no se confunda con el efecto de agente. El orden real de
 * cada participante queda en scale_responses.presented_index.
 */

export type Country = "CO" | "ES";
export type PreSubscale = "KNOW" | "EPI_IA" | "SOC_IA" | "EPI_HUM" | "SOC_HUM";

export interface PreItem {
  code: string;
  subscale: PreSubscale;
  agent: "ia" | "humano" | null;
  domain: "epistemico" | "socioemocional" | null;
  text: Record<Country, string>;
}

const same = (t: string): Record<Country, string> => ({ CO: t, ES: t });

export const PRE_ANCHORS: string[] = ["Nada", "Poco", "Algo", "Bastante", "Mucho"];

export const PRE_INSTRUCTIONS =
  "Antes de empezar con los cuestionarios, responda estas cinco preguntas según lo que piensa hoy. Marque la opción que mejor lo describe.";

export const PRE_KNOW: PreItem = {
  code: "PRE_KNOW",
  subscale: "KNOW",
  agent: null,
  domain: null,
  text: same("¿Qué tanto sabe sobre inteligencia artificial: cómo funciona y qué puede hacer?"),
};

export const PRE_IA_BLOCK: PreItem[] = [
  {
    code: "PRE_EPI_IA",
    subscale: "EPI_IA",
    agent: "ia",
    domain: "epistemico",
    text: same("¿Qué tanto confía en que un chat de inteligencia artificial le dé respuestas correctas cuando busca información?"),
  },
  {
    code: "PRE_SOC_IA",
    subscale: "SOC_IA",
    agent: "ia",
    domain: "socioemocional",
    text: same("¿Qué tanto confía en que un chat de inteligencia artificial le ayude cuando necesita apoyo personal o emocional?"),
  },
];

export const PRE_HUM_BLOCK: PreItem[] = [
  {
    code: "PRE_EPI_HUM",
    subscale: "EPI_HUM",
    agent: "humano",
    domain: "epistemico",
    text: same("¿Qué tanto confía en que otras personas le den respuestas correctas cuando busca información?"),
  },
  {
    code: "PRE_SOC_HUM",
    subscale: "SOC_HUM",
    agent: "humano",
    domain: "socioemocional",
    text: same("¿Qué tanto confía en que otras personas le ayuden cuando necesita apoyo personal o emocional?"),
  },
];

export const PRE_ITEMS: PreItem[] = [PRE_KNOW, ...PRE_IA_BLOCK, ...PRE_HUM_BLOCK];

/** Orden presentado: conocimiento primero, luego los dos bloques contrabalanceados. */
export function preItemsInOrder(seed: number): PreItem[] {
  const iaFirst = Math.floor(seed / 2) % 2 === 0;
  return iaFirst
    ? [PRE_KNOW, ...PRE_IA_BLOCK, ...PRE_HUM_BLOCK]
    : [PRE_KNOW, ...PRE_HUM_BLOCK, ...PRE_IA_BLOCK];
}
