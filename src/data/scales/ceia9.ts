/**
 * CEIA-9 — Confianza Emocional en la Inteligencia Artificial
 * 24 ítems, 4 subescalas de 6, Likert de 5 puntos.
 *
 * AP = Autenticidad percibida
 * VE = Validación emocional
 * RA = Reconocimiento afectivo
 * VS = Vínculo socioemocional
 *
 * Este archivo SÍ puede importarse desde el cliente: aquí no hay nada que
 * ocultar al participante (a diferencia del catálogo de situaciones). Lo que
 * no se muestra en pantalla es el código de subescala.
 */

export type Country = "CO" | "ES";
export type Subscale = "AP" | "VE" | "RA" | "VS";

export interface ScaleItem {
  code: string;
  subscale: Subscale;
  reverse?: boolean;
  text: Record<Country, string>;
}

const same = (t: string): Record<Country, string> => ({ CO: t, ES: t });

export const CEIA9_ANCHORS: Record<Country, string[]> = {
  CO: [
    "Totalmente en desacuerdo",
    "En desacuerdo",
    "Ni de acuerdo ni en desacuerdo",
    "De acuerdo",
    "Totalmente de acuerdo",
  ],
  ES: [
    "Totalmente en desacuerdo",
    "En desacuerdo",
    "Ni de acuerdo ni en desacuerdo",
    "De acuerdo",
    "Totalmente de acuerdo",
  ],
};

export const CEIA9_INSTRUCTIONS: Record<Country, string> = {
  CO:
    "A continuación encontrará una serie de afirmaciones sobre su interacción con sistemas de inteligencia artificial (por ejemplo, asistentes virtuales tipo ChatGPT, chatbots de ayuda, aplicaciones de bienestar). Indique en qué medida está de acuerdo con cada afirmación según su experiencia personal. Responda con sinceridad: no existen respuestas correctas o incorrectas.",
  ES:
    "A continuación encontrará una serie de afirmaciones sobre su interacción con sistemas de inteligencia artificial (por ejemplo, asistentes virtuales tipo ChatGPT, chatbots de ayuda, aplicaciones de bienestar). Indique en qué medida está de acuerdo con cada afirmación según su experiencia personal. Responda con sinceridad: no existen respuestas correctas o incorrectas.",
};

export const CEIA9_ITEMS: ScaleItem[] = [
  // --- AP · Autenticidad percibida ---
  { code: "AP1", subscale: "AP", text: same("Las respuestas de la IA me resultan sinceras y coherentes con lo que le comento.") },
  { code: "AP2", subscale: "AP", text: same("La IA responde de forma genuina, no solo con datos fríos.") },
  { code: "AP3", subscale: "AP", text: same("Cuando interactúo con la IA, siento que su respuesta refleja un intento real de entendimiento.") },
  { code: "AP4", subscale: "AP", text: same("Las respuestas de la IA son coherentes con el tono emocional de la conversación.") },
  { code: "AP5", subscale: "AP", text: same("La IA ajusta sus respuestas de forma auténtica según lo que expreso.") },
  { code: "AP6", subscale: "AP", text: same("La comunicación de la IA me parece honesta y auténtica.") },

  // --- VE · Validación emocional ---
  { code: "VE1", subscale: "VE", text: same("Siento que la IA reconoce mis sentimientos cuando interactúo con ella.") },
  { code: "VE2", subscale: "VE", text: same("Las respuestas de la IA me hacen sentir comprendido/a en lo emocional.") },
  { code: "VE3", subscale: "VE", text: same("Las respuestas de la IA me hacen sentir acompañado/a emocionalmente.") },
  { code: "VE4", subscale: "VE", text: same("La IA ofrece comentarios que me ayudan a aceptar o validar lo que siento.") },
  { code: "VE5", subscale: "VE", text: same("Sentir que la IA valida mis emociones me genera calma o alivio.") },
  { code: "VE6", subscale: "VE", text: same("Considero que la IA puede ser útil para expresar emociones y sentirse comprendido/a.") },

  // --- RA · Reconocimiento afectivo ---
  { code: "RA1", subscale: "RA", text: same("La IA suele identificar correctamente el tono emocional de mis mensajes.") },
  { code: "RA2", subscale: "RA", text: same("La IA detecta cuándo estoy triste, preocupado/a o contento/a.") },
  { code: "RA3", subscale: "RA", text: same("Las respuestas de la IA cambian según mi estado de ánimo.") },
  { code: "RA4", subscale: "RA", text: same("La IA demuestra haber comprendido mi estado emocional.") },
  { code: "RA5", subscale: "RA", text: same("Confío en que la IA puede reconocer mis emociones incluso si no las explicito por completo.") },
  { code: "RA6", subscale: "RA", text: same("La IA responde de forma apropiada cuando expreso angustia o estrés.") },

  // --- VS · Vínculo socioemocional ---
  { code: "VS1", subscale: "VS", text: same("A veces siento una conexión personal con la IA tras varias interacciones.") },
  { code: "VS2", subscale: "VS", text: same("Considero a la IA como una compañía con la que puedo conversar sobre asuntos personales.") },
  { code: "VS3", subscale: "VS", text: same("Me resulta cómodo recurrir a la IA cuando necesito desahogarme.") },
  { code: "VS4", subscale: "VS", text: same("En ocasiones me resulta más fácil expresarme con la IA que con otras personas.") },
  { code: "VS5", subscale: "VS", text: same("Siento que la relación con la IA tiene valor emocional para mí, aunque sé que no es humana.") },
  { code: "VS6", subscale: "VS", text: same("Me gustaría que la IA continuara disponible para conversaciones futuras sobre temas emocionales.") },
];

/** Presentación: 4 páginas de 6 ítems (una por subescala, orden fijo del instrumento). */
export const CEIA9_PAGES: ScaleItem[][] = [
  CEIA9_ITEMS.filter((i) => i.subscale === "AP"),
  CEIA9_ITEMS.filter((i) => i.subscale === "VE"),
  CEIA9_ITEMS.filter((i) => i.subscale === "RA"),
  CEIA9_ITEMS.filter((i) => i.subscale === "VS"),
];

export const CEIA9 = {
  id: "CEIA9",
  name: "CEIA-9",
  min: 1,
  max: 5,
  items: CEIA9_ITEMS,
  pages: CEIA9_PAGES,
  anchors: CEIA9_ANCHORS,
  instructions: CEIA9_INSTRUCTIONS,
} as const;
