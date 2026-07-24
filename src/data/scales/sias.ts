import { ScaleDef, bi } from "./types";

/**
 * SIAS-6 — Ansiedad en la interacción social (versión breve de 6 ítems).
 * Escala 0–4. Nota: las anclas del original saltan del 0 (Nada) al 4
 * (Totalmente) dejando 1–3 sin etiqueta explícita; aquí se etiquetan los
 * extremos y el punto medio, dejando 1 y 3 como intermedios, que es la
 * práctica habitual para no forzar etiquetas que el original no fija.
 */
export const SIAS: ScaleDef = {
  id: "SIAS6",
  title: bi("En situaciones sociales"),
  instructions: {
    CO: "Para cada frase, indique en qué grado es cierta para usted.",
    ES: "Para cada frase, indica en qué grado es cierta para ti.",
  },
  scaleNote: bi("Escala de 0 (nada) a 4 (totalmente)."),
  anchors: {
    CO: [
      { value: 0, label: "Nada" },
      { value: 1, label: "Poco" },
      { value: 2, label: "Bastante" },
      { value: 3, label: "Mucho" },
      { value: 4, label: "Totalmente" },
    ],
    ES: [
      { value: 0, label: "Nada" },
      { value: 1, label: "Poco" },
      { value: 2, label: "Bastante" },
      { value: 3, label: "Mucho" },
      { value: 4, label: "Totalmente" },
    ],
  },
  items: [
    { code: "SIAS1", subscale: "SIAS", text: bi("Se me hace difícil mirar a los ojos a los demás.") },
    { code: "SIAS2", subscale: "SIAS", text: bi("Se me hace difícil socializar con las personas con las que trabajo.") },
    { code: "SIAS3", subscale: "SIAS", text: bi("Me tenso si me encuentro algún conocido en la calle.") },
    { code: "SIAS4", subscale: "SIAS", text: bi("Me siento tenso/a si estoy a solas con otra persona.") },
    { code: "SIAS5", subscale: "SIAS", text: bi("Se me hace difícil platicar con otras personas.") },
    { code: "SIAS6", subscale: "SIAS", text: bi("Se me hace difícil estar en desacuerdo con el punto de vista de alguien más.") },
  ],
};
