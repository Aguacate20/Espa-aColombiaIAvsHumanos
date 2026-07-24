import "server-only";

/**
 * CATALOGO DE SITUACIONES — ARCHIVO SOLO-SERVIDOR.
 *
 * `import "server-only"` hace que el build falle si alguien lo importa desde
 * un componente cliente. La categoria NUNCA viaja al navegador: el cliente
 * recibe unicamente { id, text }. La categoria se resuelve en /api/trial al
 * momento de guardar.
 *
 * Los ids estan intercalados a proposito (S01 es de mediacion, S02 epistemica,
 * S03 autotelica...) para que ni el orden ni el numero delaten el nivel si
 * alguien inspecciona la red.
 */

export type Category = "epistemica" | "mediacion" | "autotelica";
export type Country = "CO" | "ES";

export interface Situation {
  id: string;
  category: Category;
  /** true = la redaccion ES difiere de la CO y requiere validacion del equipo de València */
  adapted?: boolean;
  text: Record<Country, string>;
}

export const SITUATIONS: Situation[] = [
  // ---------------- EPISTEMICAS (instrumental-epistemico) ----------------
  {
    id: "S04",
    category: "epistemica",
    adapted: true,
    text: {
      CO: "Quiero saber en qué año exacto se inventó el bombillo.",
      ES: "Quiero saber en qué año exacto se inventó la bombilla.",
    },
  },
  {
    id: "S11",
    category: "epistemica",
    text: {
      CO: "Dejé un alimento fuera de la nevera toda la noche y quiero saber si todavía se puede comer.",
      ES: "Dejé un alimento fuera de la nevera toda la noche y quiero saber si todavía se puede comer.",
    },
  },
  {
    id: "S19",
    category: "epistemica",
    text: {
      CO: "Voy a firmar un contrato y quiero saber si alguna cláusula me perjudica.",
      ES: "Voy a firmar un contrato y quiero saber si alguna cláusula me perjudica.",
    },
  },
  {
    id: "S02",
    category: "epistemica",
    text: {
      CO: "Quiero saber cuál es la mejor época del año para viajar a otro país.",
      ES: "Quiero saber cuál es la mejor época del año para viajar a otro país.",
    },
  },
  {
    id: "S23",
    category: "epistemica",
    adapted: true,
    text: {
      CO: "Quiero sembrar un árbol de mango en casa.",
      ES: "Quiero plantar un árbol frutal en casa.",
    },
  },
  {
    id: "S08",
    category: "epistemica",
    text: {
      CO: "Quiero saber qué formación tiene mejores oportunidades laborales en los próximos años.",
      ES: "Quiero saber qué formación tiene mejores oportunidades laborales en los próximos años.",
    },
  },
  {
    id: "S15",
    category: "epistemica",
    text: {
      CO: "Quiero saber quién es el mejor jugador de fútbol del mundo.",
      ES: "Quiero saber quién es el mejor jugador de fútbol del mundo.",
    },
  },
  {
    id: "S26",
    category: "epistemica",
    text: {
      CO: "Quiero saber si me conviene invertir tiempo en aprender otro idioma o dedicarlo a otra cosa.",
      ES: "Quiero saber si me conviene invertir tiempo en aprender otro idioma o dedicarlo a otra cosa.",
    },
  },
  {
    id: "S13",
    category: "epistemica",
    text: {
      CO: "Me ofrecieron un trabajo y quiero saber si me conviene aceptarlo.",
      ES: "Me han ofrecido un trabajo y quiero saber si me conviene aceptarlo.",
    },
  },

  // ---------------- MEDIACION (mediacion relacional) ----------------
  {
    id: "S07",
    category: "mediacion",
    text: {
      CO: "Hay algo que necesito decirle a alguien cercano y sé que puede sonar más duro de lo que quiero. Necesito revisar cómo formularlo antes de decírselo.",
      ES: "Hay algo que necesito decirle a alguien cercano y sé que puede sonar más duro de lo que quiero. Necesito revisar cómo formularlo antes de decírselo.",
    },
  },
  {
    id: "S21",
    category: "mediacion",
    text: {
      CO: "Tengo pendiente una conversación difícil con alguien y quiero prepararme antes de tenerla.",
      ES: "Tengo pendiente una conversación difícil con alguien y quiero prepararme antes de tenerla.",
    },
  },
  {
    id: "S01",
    category: "mediacion",
    text: {
      CO: "Discutí con alguien y no logro entender por qué reaccionó como reaccionó. Quiero pensarlo mejor antes de volver a hablar con esa persona.",
      ES: "Discutí con alguien y no logro entender por qué reaccionó como reaccionó. Quiero pensarlo mejor antes de volver a hablar con esa persona.",
    },
  },
  {
    id: "S17",
    category: "mediacion",
    text: {
      CO: "Quiero decirle algo importante a alguien y no estoy seguro de que vaya a entenderlo como yo lo pienso. Quiero revisarlo antes.",
      ES: "Quiero decirle algo importante a alguien y no estoy seguro de que vaya a entenderlo como yo lo pienso. Quiero revisarlo antes.",
    },
  },
  {
    id: "S09",
    category: "mediacion",
    text: {
      CO: "Estoy a mitad de un intercambio de mensajes con alguien y necesito pensar cómo plantear lo que sigue.",
      ES: "Estoy a mitad de un intercambio de mensajes con alguien y necesito pensar cómo plantear lo que sigue.",
    },
  },
  {
    id: "S25",
    category: "mediacion",
    text: {
      CO: "Estoy a mitad de un intercambio de mensajes con alguien y no me queda claro qué me está queriendo decir en realidad.",
      ES: "Estoy a mitad de un intercambio de mensajes con alguien y no me queda claro qué me está queriendo decir en realidad.",
    },
  },
  {
    id: "S05",
    category: "mediacion",
    text: {
      CO: "Estoy a mitad de una conversación con alguien y no sé si seguir con el tema ahora o dejarlo para después.",
      ES: "Estoy a mitad de una conversación con alguien y no sé si seguir con el tema ahora o dejarlo para después.",
    },
  },
  {
    id: "S12",
    category: "mediacion",
    text: {
      CO: "Ya hablé con alguien y quedó algo mal dicho de mi parte. Quiero pensar cómo lo aclaro.",
      ES: "Ya hablé con alguien y quedó algo mal dicho por mi parte. Quiero pensar cómo lo aclaro.",
    },
  },
  {
    id: "S27",
    category: "mediacion",
    text: {
      CO: "Terminé una conversación con alguien y no sé si dejar el tema ahí o volver a sacarlo más adelante.",
      ES: "Terminé una conversación con alguien y no sé si dejar el tema ahí o volver a sacarlo más adelante.",
    },
  },

  // ---------------- AUTOTELICAS (compañia maquinica) ----------------
  {
    id: "S14",
    category: "autotelica",
    text: {
      CO: "Tengo ganas de conversar largo con alguien, sin más motivo que la conversación misma.",
      ES: "Tengo ganas de conversar largo con alguien, sin más motivo que la conversación misma.",
    },
  },
  {
    id: "S03",
    category: "autotelica",
    text: {
      CO: "Quiero pasar un rato jugando o inventando algo con alguien, por el puro gusto de hacerlo entre los dos.",
      ES: "Quiero pasar un rato jugando o inventando algo con alguien, por el puro gusto de hacerlo entre los dos.",
    },
  },
  {
    id: "S22",
    category: "autotelica",
    text: {
      CO: "Tengo ganas de meterme en una de esas conversaciones que se van alargando solas, donde uno sigue porque quiere seguir ahí.",
      ES: "Tengo ganas de meterme en una de esas conversaciones que se van alargando solas, donde uno sigue porque quiere seguir ahí.",
    },
  },
  {
    id: "S10",
    category: "autotelica",
    text: {
      CO: "Voy a estar un buen rato en algo rutinario y quisiera tener con quién estar, aunque no estemos hablando todo el tiempo.",
      ES: "Voy a estar un buen rato en algo rutinario y me gustaría tener con quién estar, aunque no estemos hablando todo el tiempo.",
    },
  },
  {
    id: "S18",
    category: "autotelica",
    text: {
      CO: "Quiero contarle a alguien cómo estuvo mi día y que el otro también me cuente el suyo.",
      ES: "Quiero contarle a alguien qué tal me ha ido el día y que el otro también me cuente el suyo.",
    },
  },
  {
    id: "S06",
    category: "autotelica",
    text: {
      CO: "Quiero ponerme a hacer algo entretenido con alguien, donde los dos aportemos y los dos lo disfrutemos.",
      ES: "Quiero ponerme a hacer algo entretenido con alguien, donde los dos aportemos y los dos lo disfrutemos.",
    },
  },
  {
    id: "S24",
    category: "autotelica",
    text: {
      CO: "Tengo ganas de imaginar historias o situaciones absurdas con alguien, poniendo cada uno la mitad.",
      ES: "Tengo ganas de imaginar historias o situaciones absurdas con alguien, poniendo cada uno la mitad.",
    },
  },
  {
    id: "S16",
    category: "autotelica",
    text: {
      CO: "Quiero tener a alguien ahí mientras paso el rato, sin plan ninguno, y que la cosa siga sola hacia donde vaya.",
      ES: "Quiero tener a alguien ahí mientras paso el rato, sin plan ninguno, y que la cosa siga sola hacia donde vaya.",
    },
  },
  {
    id: "S20",
    category: "autotelica",
    text: {
      CO: "Quiero que alguien me acompañe mientras hago algo que disfruto, y acompañar al otro en lo que disfruta.",
      ES: "Quiero que alguien me acompañe mientras hago algo que disfruto, y acompañar al otro en lo que disfruta.",
    },
  },
];

/** Situación de práctica: fuera del catálogo, no entra en el análisis principal. */
export const PRACTICE_SITUATION: Situation = {
  id: "P01",
  category: "epistemica",
  text: {
    CO: "Quiero saber cuánto dura el vuelo entre Bogotá y Madrid.",
    ES: "Quiero saber cuánto dura el vuelo entre Madrid y Bogotá.",
  },
};

export const SITUATION_BY_ID = new Map<string, Situation>(
  [...SITUATIONS, PRACTICE_SITUATION].map((s) => [s.id, s]),
);

export function categoryOf(id: string): Category | null {
  return SITUATION_BY_ID.get(id)?.category ?? null;
}

/** Payload seguro para el cliente: sin categoría. */
export function publicSituation(s: Situation, country: Country) {
  return { id: s.id, text: s.text[country] };
}
