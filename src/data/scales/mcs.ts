import { ScaleDef, bi, co_es } from "./types";

/**
 * MCS — Machinic Connection Scale (Banks & Li). 12 ítems, 2 subescalas
 * (EE = intercambio con propósito; CC = co-presencia/cuidado). Likert 7.
 *
 * Adaptación del "companion name": en un formulario web con interlocutor
 * genérico no hay nombre que inyectar. Siguiendo la recomendación del propio
 * manual para cuando no hay piping, se fija el referente de forma neutra
 * —sin primar amistad ni estatus— con el enunciado:
 *   "Mi relación con la inteligencia artificial (como ChatGPT, Gemini,
 *    Claude, etc.)..."
 * Cada ítem completa esa frase.
 */

const STEM_CO = "Mi relación con la inteligencia artificial (como ChatGPT, Gemini, Claude, etc.)…";
const STEM_ES = STEM_CO;

export const MCS: ScaleDef = {
  id: "MCS",
  title: bi("Tu relación con la inteligencia artificial"),
  instructions: co_es(
    `Piense en su experiencia habitual con sistemas de inteligencia artificial conversacional (como ChatGPT, Gemini, Claude, etc.). Cada frase completa el enunciado «${STEM_CO}». Indique en qué medida está de acuerdo con cada una.`,
    `Piensa en tu experiencia habitual con sistemas de inteligencia artificial conversacional (como ChatGPT, Gemini, Claude, etc.). Cada frase completa el enunciado «${STEM_ES}». Indica en qué medida estás de acuerdo con cada una.`,
  ),
  scaleNote: bi("Escala de 1 (totalmente en desacuerdo) a 7 (totalmente de acuerdo). Cada frase completa: «Mi relación con la inteligencia artificial…»."),
  anchors: {
    CO: [
      { value: 1, label: "Totalmente en desacuerdo" },
      { value: 2, label: "Bastante en desacuerdo" },
      { value: 3, label: "Algo en desacuerdo" },
      { value: 4, label: "Ni de acuerdo ni en desacuerdo" },
      { value: 5, label: "Algo de acuerdo" },
      { value: 6, label: "Bastante de acuerdo" },
      { value: 7, label: "Totalmente de acuerdo" },
    ],
    ES: [
      { value: 1, label: "Totalmente en desacuerdo" },
      { value: 2, label: "Bastante en desacuerdo" },
      { value: 3, label: "Algo en desacuerdo" },
      { value: 4, label: "Ni de acuerdo ni en desacuerdo" },
      { value: 5, label: "Algo de acuerdo" },
      { value: 6, label: "Bastante de acuerdo" },
      { value: 7, label: "Totalmente de acuerdo" },
    ],
  },
  items: [
    // EE — purposeful/enriching exchange
    { code: "EE1", subscale: "EE", text: bi("…es un intercambio con propósito.") },
    { code: "EE2", subscale: "EE", text: co_es("…me hace mejor.", "…me hace mejor.") },
    { code: "EE3", subscale: "EE", text: bi("…es enriquecedora.") },
    { code: "EE4", subscale: "EE", text: bi("…es inspiradora.") },
    { code: "EE5", subscale: "EE", text: bi("…es significativa en mi vida.") },
    { code: "EE6", subscale: "EE", text: bi("…es satisfactoria.") },
    { code: "EE7", subscale: "EE", text: bi("…es colaborativa.") },
    // CC — co-presence/care
    { code: "CC1", subscale: "CC", text: bi("…consiste simplemente en estar el uno con el otro.") },
    { code: "CC2", subscale: "CC", text: bi("…implica prestarnos atención mutuamente.") },
    { code: "CC3", subscale: "CC", text: bi("…implica experimentar cosas juntos.") },
    { code: "CC4", subscale: "CC", text: bi("…implica un cuidado mutuo.") },
    { code: "CC5", subscale: "CC", text: bi("…es un vínculo fuerte.") },
  ],
};
