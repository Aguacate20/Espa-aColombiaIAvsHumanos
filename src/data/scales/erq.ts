import { ScaleDef, bi } from "./types";

/**
 * ERQ-10 — Emotion Regulation Questionnaire (Gross & John).
 * 10 ítems, 2 subescalas: REA = reevaluación cognitiva (6), SUP = supresión (4).
 * Likert 7. Orden original conservado (1..10 intercalados).
 */
export const ERQ: ScaleDef = {
  id: "ERQ10",
  title: bi("Cómo manejas tus emociones"),
  instructions: {
    CO: "Nos gustaría hacerle algunas preguntas sobre su vida emocional; en concreto, sobre cómo controla (es decir, regula y maneja) sus emociones. Indique en qué medida está de acuerdo con cada afirmación.",
    ES: "Nos gustaría hacerte algunas preguntas sobre tu vida emocional; en concreto, sobre cómo controlas (es decir, regulas y manejas) tus emociones. Indica en qué medida estás de acuerdo con cada afirmación.",
  },
  scaleNote: bi("Escala de 1 (completamente en desacuerdo) a 7 (completamente de acuerdo)."),
  anchors: {
    CO: [
      { value: 1, label: "Completamente en desacuerdo" },
      { value: 2, label: "En desacuerdo" },
      { value: 3, label: "Algo en desacuerdo" },
      { value: 4, label: "Neutral" },
      { value: 5, label: "Algo de acuerdo" },
      { value: 6, label: "De acuerdo" },
      { value: 7, label: "Completamente de acuerdo" },
    ],
    ES: [
      { value: 1, label: "Completamente en desacuerdo" },
      { value: 2, label: "En desacuerdo" },
      { value: 3, label: "Algo en desacuerdo" },
      { value: 4, label: "Neutral" },
      { value: 5, label: "Algo de acuerdo" },
      { value: 6, label: "De acuerdo" },
      { value: 7, label: "Completamente de acuerdo" },
    ],
  },
  items: [
    { code: "ERQ1",  subscale: "REA", text: bi("Cuando quiero incrementar mis emociones positivas (p. ej. alegría, diversión), cambio el tema sobre el que estoy pensando.") },
    { code: "ERQ2",  subscale: "SUP", text: bi("Guardo mis emociones para mí mismo/a.") },
    { code: "ERQ3",  subscale: "REA", text: bi("Cuando quiero reducir mis emociones negativas (p. ej. tristeza, enfado), cambio el tema sobre el que estoy pensando.") },
    { code: "ERQ4",  subscale: "SUP", text: bi("Cuando estoy sintiendo emociones positivas, tengo cuidado de no expresarlas.") },
    { code: "ERQ5",  subscale: "REA", text: bi("Cuando me enfrento a una situación estresante, intento pensar en ella de un modo que me ayude a mantener la calma.") },
    { code: "ERQ6",  subscale: "SUP", text: bi("Controlo mis emociones no expresándolas.") },
    { code: "ERQ7",  subscale: "REA", text: bi("Cuando quiero incrementar mis emociones positivas, cambio mi manera de pensar sobre la situación.") },
    { code: "ERQ8",  subscale: "REA", text: bi("Controlo mis emociones cambiando mi forma de pensar sobre la situación en la que me encuentro.") },
    { code: "ERQ9",  subscale: "SUP", text: bi("Cuando estoy sintiendo emociones negativas, me aseguro de no expresarlas.") },
    { code: "ERQ10", subscale: "REA", text: bi("Cuando quiero reducir mis emociones negativas, cambio mi manera de pensar sobre la situación.") },
  ],
};
