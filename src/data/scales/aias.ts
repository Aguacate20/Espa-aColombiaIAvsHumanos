import { ScaleDef, bi, co_es } from "./types";

/**
 * AIAS — AI Attachment Scale. 15 ítems, 3 subescalas:
 *   EC = cercanía emocional, SS = sustitución social, NR = consideración normativa.
 * Likert 5.
 *
 * Nota metodológica: SS (sustitución social) es justamente el moderador que
 * el estudio preregistró. Conviene mantener su puntuación separada.
 */

export const AIAS: ScaleDef = {
  id: "AIAS",
  title: bi("Tu vínculo con la inteligencia artificial"),
  instructions: co_es(
    `La inteligencia artificial generativa produce texto, imágenes u otros contenidos a partir de lo que escribes (por ejemplo ChatGPT, Replika, DALL·E, DeepSeek). Piensa en el sistema o los sistemas de IA generativa que usas con más frecuencia e indica cuánto estás de acuerdo con cada afirmación según tu experiencia.`,
    `La inteligencia artificial generativa produce texto, imágenes u otros contenidos a partir de lo que escribes (por ejemplo ChatGPT, Replika, DALL·E, DeepSeek). Piensa en el sistema o los sistemas de IA generativa que usas con más frecuencia e indica cuánto estás de acuerdo con cada afirmación según tu experiencia.`,
  ),
  scaleNote: bi("Escala de 1 (totalmente en desacuerdo) a 5 (totalmente de acuerdo)."),
  anchors: {
    CO: [
      { value: 1, label: "Totalmente en desacuerdo" },
      { value: 2, label: "En desacuerdo" },
      { value: 3, label: "Ni de acuerdo ni en desacuerdo" },
      { value: 4, label: "De acuerdo" },
      { value: 5, label: "Totalmente de acuerdo" },
    ],
    ES: [
      { value: 1, label: "Totalmente en desacuerdo" },
      { value: 2, label: "En desacuerdo" },
      { value: 3, label: "Ni de acuerdo ni en desacuerdo" },
      { value: 4, label: "De acuerdo" },
      { value: 5, label: "Totalmente de acuerdo" },
    ],
  },
  items: [
    // Emotional Closeness
    { code: "EC1", subscale: "EC", text: bi("Mis intercambios con la IA me resultan personalmente significativos.") },
    { code: "EC2", subscale: "EC", text: co_es(
      "Hay una sensación de familiaridad en mi manera de interactuar con la IA.",
      "Hay una sensación de familiaridad en mi forma de interactuar con la IA.") },
    { code: "EC3", subscale: "EC", text: co_es(
      "Tengo ganas de interactuar con la IA.",
      "Me apetece interactuar con la IA.") },
    { code: "EC4", subscale: "EC", text: bi("Siento cercanía y comodidad en mis interacciones con la IA.") },
    { code: "EC5", subscale: "EC", text: co_es(
      "Me sentiría incómodo/a si la IA dejara de estar disponible de repente.",
      "Me sentiría incómodo/a si la IA dejara de estar disponible de repente.") },
    // Social Substitution
    { code: "SS1", subscale: "SS", text: co_es(
      "A veces recurro a la IA cuando necesito con quién hablar.",
      "A veces recurro a la IA cuando necesito con quién hablar.") },
    { code: "SS2", subscale: "SS", text: co_es(
      "A menudo hablo con la IA cuando tengo problemas.",
      "A menudo hablo con la IA cuando tengo problemas.") },
    { code: "SS3", subscale: "SS", text: co_es(
      "A veces prefiero hablar con la IA porque no tengo que preocuparme por ser juzgado/a.",
      "A veces prefiero hablar con la IA porque no tengo que preocuparme por que me juzguen.") },
    { code: "SS4", subscale: "SS", text: co_es(
      "Recurro a la IA cuando no me siento apoyado/a por las personas de mi vida.",
      "Recurro a la IA cuando no me siento apoyado/a por las personas de mi entorno.") },
    { code: "SS5", subscale: "SS", text: co_es(
      "Cuando no tengo con quién hablar, a veces termino interactuando con la IA.",
      "Cuando no tengo con quién hablar, a veces acabo interactuando con la IA.") },
    // Normative Regard
    { code: "NR1", subscale: "NR", text: co_es(
      "Procuro tratar a la IA con respeto.",
      "Procuro tratar a la IA con respeto.") },
    { code: "NR2", subscale: "NR", text: co_es(
      "Me parece mal responder con desdén a la IA.",
      "Me parece mal responder con desdén a la IA.") },
    { code: "NR3", subscale: "NR", text: co_es(
      "Intento no ser grosero/a con la IA, aunque no me entienda.",
      "Intento no ser grosero/a con la IA, aunque no me entienda.") },
    { code: "NR4", subscale: "NR", text: bi("Me comporto de forma amable con la IA.") },
    { code: "NR5", subscale: "NR", text: co_es(
      "Creo que es importante ser considerado/a al hablar con la IA.",
      "Creo que es importante ser considerado/a al hablar con la IA.") },
  ],
};
