import { ScaleDef, bi } from "./types";

/** UCLA-3 — Soledad (versión de 3 ítems). Likert de 3 puntos. */
export const UCLA: ScaleDef = {
  id: "UCLA3",
  title: bi("Cómo te sientes en tu día a día"),
  instructions: {
    CO: "Indique con qué frecuencia se siente de la manera que describe cada frase.",
    ES: "Indica con qué frecuencia te sientes de la manera que describe cada frase.",
  },
  scaleNote: bi("1 = casi nunca · 2 = algunas veces · 3 = con frecuencia."),
  anchors: {
    CO: [
      { value: 1, label: "Casi nunca" },
      { value: 2, label: "Algunas veces" },
      { value: 3, label: "Con frecuencia" },
    ],
    ES: [
      { value: 1, label: "Casi nunca" },
      { value: 2, label: "Algunas veces" },
      { value: 3, label: "Con frecuencia" },
    ],
  },
  items: [
    { code: "UCLA1", subscale: "LON", text: bi("¿Con qué frecuencia siente que le falta compañía?") },
    { code: "UCLA2", subscale: "LON", text: bi("¿Con qué frecuencia se siente excluido/a?") },
    { code: "UCLA3", subscale: "LON", text: bi("¿Con qué frecuencia se siente aislado/a?") },
  ],
};
