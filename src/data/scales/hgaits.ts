import { ScaleDef, bi, co_es } from "./types";

/**
 * HGAITS — Human-Generative AI Trust Scale (adaptación).
 * 9 ítems, 3 subescalas (benevolencia, competencia, reciprocidad), Likert 5.
 *
 * Traducción: el original alterna ejemplos ("ChatGPT, ERNIE Bo", etc.). Se
 * unifica a "ChatGPT, Gemini, Claude, etc." como en el resto del instrumento,
 * y solo se menciona el ejemplo en el primer ítem de cada subescala para no
 * recargar. El original está anclado en "aprendizaje" (learning); se conserva
 * esa referencia porque define el constructo de competencia de la escala.
 */

const IA = "la inteligencia artificial (como ChatGPT, Gemini, Claude, etc.)";
const IA_short = "la inteligencia artificial";

export const HGAITS: ScaleDef = {
  id: "HGAITS",
  title: bi("Confianza en la inteligencia artificial"),
  instructions: co_es(
    `Estas afirmaciones evalúan la confianza en sistemas de inteligencia artificial (como ChatGPT, Gemini, Claude, etc.). No hay respuestas correctas ni incorrectas: marque la opción que mejor refleje su punto de vista en cada caso.`,
    `Estas afirmaciones evalúan la confianza en sistemas de inteligencia artificial (como ChatGPT, Gemini, Claude, etc.). No hay respuestas correctas ni incorrectas: marca la opción que mejor refleje tu punto de vista en cada caso.`,
  ),
  scaleNote: bi("Escala de 1 (totalmente en desacuerdo) a 5 (totalmente de acuerdo)."),
  anchors: {
    CO: [
      { value: 1, label: "Totalmente en desacuerdo" },
      { value: 2, label: "En desacuerdo" },
      { value: 3, label: "Indeciso" },
      { value: 4, label: "De acuerdo" },
      { value: 5, label: "Totalmente de acuerdo" },
    ],
    ES: [
      { value: 1, label: "Totalmente en desacuerdo" },
      { value: 2, label: "En desacuerdo" },
      { value: 3, label: "Indeciso" },
      { value: 4, label: "De acuerdo" },
      { value: 5, label: "Totalmente de acuerdo" },
    ],
  },
  items: [
    // Benevolence
    { code: "BEN1", subscale: "BEN", text: bi(`Creo que ${IA} actúa buscando mi beneficio.`) },
    { code: "BEN2", subscale: "BEN", text: co_es(
      `Confío en que, si necesito ayuda, ${IA_short} me asistirá lo mejor que pueda.`,
      `Confío en que, si necesito ayuda, ${IA_short} me asistirá lo mejor que pueda.`) },
    { code: "BEN3", subscale: "BEN", text: bi(`Creo que ${IA_short} está dispuesta a entender mis necesidades y preferencias.`) },
    // Competence
    { code: "COM1", subscale: "COM", text: bi(`Creo que ${IA} es capaz de apoyar eficazmente mi proceso de aprendizaje.`) },
    { code: "COM2", subscale: "COM", text: bi(`Considero que ${IA_short} cumple bien su función de ayudar en el aprendizaje.`) },
    { code: "COM3", subscale: "COM", text: bi(`Confío en que ${IA_short} tiene todas las funciones que espero para apoyar eficazmente el aprendizaje.`) },
    // Reciprocity
    { code: "REC1", subscale: "REC", text: bi(`Cuando uso ${IA}, creo que puedo apoyarme plenamente en ella.`) },
    { code: "REC2", subscale: "REC", text: bi(`Siempre puedo confiar en que ${IA_short} apoyará mi aprendizaje.`) },
    { code: "REC3", subscale: "REC", text: bi(`Me apoyo en la información que proporciona ${IA_short}.`) },
  ],
};
