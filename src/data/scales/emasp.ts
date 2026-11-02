import { ScaleDef, bi } from "./types";

/**
 * EMASP / MSPSS-12 — Apoyo social percibido (Zimet, adaptación).
 * Formato de 6 alternativas (1 = completamente en desacuerdo; 6 = completamente
 * de acuerdo), tal como lo maneja el equipo (no el de 7 puntos del original).
 * Subescalas: SO = otro significativo, FAM = familia, FRI = amigos.
 */
export const EMASP: ScaleDef = {
  id: "EMASP",
  title: bi("Tu apoyo social"),
  instructions: {
    CO: "Las siguientes frases se refieren a las personas que te rodean. Indica en qué medida estás de acuerdo con cada una.",
    ES: "Las siguientes frases se refieren a las personas que te rodean. Indica en qué medida estás de acuerdo con cada una.",
  },
  scaleNote: bi("Escala de 1 (completamente en desacuerdo) a 6 (completamente de acuerdo)."),
  anchors: {
    CO: [
      { value: 1, label: "Completamente en desacuerdo" },
      { value: 2, label: "En desacuerdo" },
      { value: 3, label: "Algo en desacuerdo" },
      { value: 4, label: "Algo de acuerdo" },
      { value: 5, label: "De acuerdo" },
      { value: 6, label: "Completamente de acuerdo" },
    ],
    ES: [
      { value: 1, label: "Completamente en desacuerdo" },
      { value: 2, label: "En desacuerdo" },
      { value: 3, label: "Algo en desacuerdo" },
      { value: 4, label: "Algo de acuerdo" },
      { value: 5, label: "De acuerdo" },
      { value: 6, label: "Completamente de acuerdo" },
    ],
  },
  items: [
    { code: "MSPSS1",  subscale: "SO",  text: bi("Hay una persona que está cerca cuando estoy en una situación difícil.") },
    { code: "MSPSS2",  subscale: "SO",  text: bi("Existe una persona especial con la cual yo puedo compartir mis penas y alegrías.") },
    { code: "MSPSS3",  subscale: "FAM", text: bi("Mi familia realmente intenta ayudarme.") },
    { code: "MSPSS4",  subscale: "FAM", text: bi("Obtengo de mi familia el apoyo emocional que necesito.") },
    { code: "MSPSS5",  subscale: "SO",  text: bi("Existe una persona que realmente es una fuente de bienestar para mí.") },
    { code: "MSPSS6",  subscale: "FRI", text: bi("Mis amigos realmente tratan de ayudarme.") },
    { code: "MSPSS7",  subscale: "FRI", text: bi("Puedo contar con mis amigos cuando las cosas van mal.") },
    { code: "MSPSS8",  subscale: "FAM", text: bi("Puedo hablar de mis problemas con mi familia.") },
    { code: "MSPSS9",  subscale: "FRI", text: bi("Tengo amigos con los que puedo compartir las penas y alegrías.") },
    { code: "MSPSS10", subscale: "SO",  text: bi("Existe una persona especial en mi vida que se preocupa por mis sentimientos.") },
    { code: "MSPSS11", subscale: "FAM", text: bi("Mi familia se muestra dispuesta a ayudarme para tomar decisiones.") },
    { code: "MSPSS12", subscale: "FRI", text: bi("Puedo hablar de mis problemas con mis amigos.") },
  ],
};
