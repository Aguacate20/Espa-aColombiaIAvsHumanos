/**
 * Redacción por país. Todo texto visible al participante que varíe entre
 * Colombia y España pasa por aquí. Añadir un país = añadir una clave.
 */
export type Country = "CO" | "ES";

export const COUNTRY_META: Record<Country, { label: string; university: string; city: string }> = {
  CO: { label: "Colombia", university: "Universidad de La Sabana", city: "Chía, Cundinamarca" },
  ES: { label: "España", university: "Universitat de València", city: "València" },
};

export const COPY: Record<Country, Record<string, string>> = {
  CO: {
    consentTitle: "Antes de empezar",
    consentBody:
      "Este estudio investiga a quién acude la gente cuando necesita ayuda en distintas situaciones cotidianas. Tomará entre 15 y 20 minutos. Tus respuestas son anónimas y se usarán solo con fines de investigación. Puedes retirarte en cualquier momento cerrando esta ventana.",
    consentCheck: "He leído lo anterior y acepto participar voluntariamente.",
    consentCta: "Aceptar y continuar",

    demoTitle: "Datos del participante",
    demoLead: "Estos datos nos permiten describir la muestra. No se usan para identificarte individualmente.",
    demoAge: "Edad",
    demoGender: "Género",
    demoEducation: "Nivel educativo alcanzado",
    demoOccupation: "Ocupación actual",
    demoEmail: "Correo electrónico (opcional, solo para el sorteo o el envío de resultados)",
    demoAiUse: "¿Con qué frecuencia usas herramientas de inteligencia artificial?",

    countryTitle: "¿Desde dónde participas?",
    countryLead: "Selecciona el país donde resides actualmente. La redacción de algunas preguntas se ajusta según tu selección.",

    scaleTitle: "Tu experiencia con la inteligencia artificial",

    familTitle: "Vas a conocer a dos interlocutores",
    familLead:
      "En la siguiente parte verás una serie de situaciones. En cada una tendrás que indicar a quién acudirías entre estas dos opciones.",
    agentIaName: "Una inteligencia artificial",
    agentIaDesc: "Un sistema conversacional como ChatGPT: disponible siempre, responde al instante, no te conoce personalmente.",
    agentHumanName: "Una persona",
    agentHumanDesc: "Alguien de tu entorno con quien puedes hablar: te conoce, pero no siempre está disponible.",

    practiceTitle: "Ensayo de práctica",
    practiceLead:
      "Antes de empezar, prueba cómo funciona la barra. Arrástrala hacia el lado de quien elegirías. Cuanto más la muevas hacia un extremo, más clara es tu preferencia. Esta respuesta no se analiza.",

    trialPrompt: "En esta situación, ¿a quién acudirías?",
    sliderHint: "Arrastra la barra hacia la opción que elegirías.",
    sliderUntouched: "Mueve la barra para continuar.",

    confidenceTitle: "¿Qué tanto confías en la opción que elegiste en la situación anterior?",
    confidenceLow: "Nada",
    confidenceHigh: "Totalmente",

    continueCta: "Continuar",
    backCta: "Atrás",

    doneTitle: "Listo. Gracias por participar.",
    doneBody: "Tus respuestas quedaron registradas. Ya puedes cerrar esta ventana.",
  },

  ES: {
    consentTitle: "Antes de empezar",
    consentBody:
      "Este estudio investiga a quién acude la gente cuando necesita ayuda en distintas situaciones cotidianas. Te llevará entre 15 y 20 minutos. Tus respuestas son anónimas y se usarán solo con fines de investigación. Puedes retirarte en cualquier momento cerrando esta ventana.",
    consentCheck: "He leído lo anterior y acepto participar voluntariamente.",
    consentCta: "Aceptar y continuar",

    demoTitle: "Datos del participante",
    demoLead: "Estos datos nos permiten describir la muestra. No se usan para identificarte individualmente.",
    demoAge: "Edad",
    demoGender: "Género",
    demoEducation: "Nivel de estudios alcanzado",
    demoOccupation: "Ocupación actual",
    demoEmail: "Correo electrónico (opcional, solo para el sorteo o el envío de resultados)",
    demoAiUse: "¿Con qué frecuencia usas herramientas de inteligencia artificial?",

    countryTitle: "¿Desde dónde participas?",
    countryLead: "Selecciona el país donde resides actualmente. La redacción de algunas preguntas se ajusta según tu selección.",

    scaleTitle: "Tu experiencia con la inteligencia artificial",

    familTitle: "Vas a conocer a dos interlocutores",
    familLead:
      "En la siguiente parte verás una serie de situaciones. En cada una tendrás que indicar a quién acudirías entre estas dos opciones.",
    agentIaName: "Una inteligencia artificial",
    agentIaDesc: "Un sistema conversacional como ChatGPT: disponible siempre, responde al instante, no te conoce personalmente.",
    agentHumanName: "Una persona",
    agentHumanDesc: "Alguien de tu entorno con quien puedes hablar: te conoce, pero no siempre está disponible.",

    practiceTitle: "Ensayo de práctica",
    practiceLead:
      "Antes de empezar, prueba cómo funciona la barra. Arrástrala hacia el lado de quien elegirías. Cuanto más la muevas hacia un extremo, más clara es tu preferencia. Esta respuesta no se analiza.",

    trialPrompt: "En esta situación, ¿a quién acudirías?",
    sliderHint: "Arrastra la barra hacia la opción que elegirías.",
    sliderUntouched: "Mueve la barra para continuar.",

    confidenceTitle: "¿Cuánto confías en la opción que has elegido en la situación anterior?",
    confidenceLow: "Nada",
    confidenceHigh: "Totalmente",

    continueCta: "Continuar",
    backCta: "Atrás",

    doneTitle: "Listo. Gracias por participar.",
    doneBody: "Tus respuestas han quedado registradas. Ya puedes cerrar esta ventana.",
  },
};

export const OPTIONS: Record<Country, Record<string, string[]>> = {
  CO: {
    gender: ["Mujer", "Hombre", "No binario", "Prefiero no decirlo", "Otro"],
    education: [
      "Bachillerato",
      "Técnico o tecnólogo",
      "Pregrado en curso",
      "Pregrado completo",
      "Especialización",
      "Maestría",
      "Doctorado",
    ],
    aiUse: ["Nunca", "Alguna vez al mes", "Varias veces al mes", "Varias veces por semana", "A diario"],
  },
  ES: {
    gender: ["Mujer", "Hombre", "No binario", "Prefiero no decirlo", "Otro"],
    education: [
      "Bachillerato",
      "Formación profesional",
      "Grado en curso",
      "Grado completado",
      "Máster",
      "Doctorado",
    ],
    aiUse: ["Nunca", "Alguna vez al mes", "Varias veces al mes", "Varias veces por semana", "A diario"],
  },
};

export function t(country: Country, key: string): string {
  return COPY[country][key] ?? COPY.CO[key] ?? key;
}
