/**
 * Redacción por país. Todo texto visible que varíe entre Colombia y España
 * pasa por aquí. Añadir un país = añadir una clave.
 */
export type Country = "CO" | "ES";

export const COUNTRY_META: Record<Country, { label: string; university: string }> = {
  CO: { label: "Colombia", university: "Universidad de La Sabana" },
  ES: { label: "España", university: "Universitat de València" },
};

export const STUDY_TITLE = "Toma de decisiones en la era de la inteligencia artificial";
export const STUDY_SUBTITLE = "¿A quién acudimos cuando necesitamos ayuda?";

const CO = {
  // ---- inicio ----
  landingBody:
    "Este estudio explora a quién prefieren acudir las personas cuando necesitan ayuda: a otra persona o a un sistema de inteligencia artificial. Toma entre 30 y 40 minutos y puedes hacerlo en varias sesiones.",
  landingNoTest: "No es una prueba. No hay respuestas correctas ni incorrectas, y no se evalúa tu desempeño.",
  idTitle: "Empezar",
  idLead: "Necesitamos estos dos datos únicamente para identificar tu sesión y permitirte retomar el estudio si lo interrumpes.",
  idName: "Nombre completo",
  idDocument: "Número de documento de identidad",
  idNotice:
    "Al continuar guardamos estos dos datos para identificar tu sesión. En la siguiente pantalla verás el consentimiento informado completo antes de responder nada del estudio.",
  resumeTitle: "Ya empecé antes",
  resumeLead: "Ingresa el mismo nombre y documento con los que empezaste y continuarás justo donde quedaste.",
  resumeCta: "Retomar mi sesión",
  resumeNotFound: "No encontramos una sesión con esos datos. Revisa que el nombre y el documento sean los mismos que usaste al empezar.",
  resumeFinished: "Según nuestros registros ya completaste el estudio. Muchas gracias por tu participación.",

  // ---- país ----
  countryTitle: "¿Desde dónde participas?",
  countryLead: "Selecciona el país donde resides actualmente. La redacción de algunas preguntas y las condiciones de tratamiento de datos se ajustan según tu selección.",

  // ---- sociodemográficos ----
  demoTitle: "Datos sociodemográficos",
  demoLead: "Estos datos nos permiten describir la muestra. No se usan para identificarte individualmente.",
  demoAge: "Edad",
  demoGender: "Sexo",
  demoGenderHelp: "Se usa para seleccionar las imágenes que verás más adelante.",
  demoEducation: "Nivel educativo alcanzado",
  demoOccupation: "Ocupación actual",
  demoEmail: "Correo electrónico (opcional, solo si quieres recibir los resultados generales)",
  demoAiUse: "¿Con qué frecuencia usas herramientas de inteligencia artificial?",
  demoScreenTime: "¿Cuánto tiempo pasas al día frente a pantallas? (celular, computador, televisor, tableta)",

  // ---- cuestionarios ----
  scaleTitle: "Tu experiencia con la inteligencia artificial",
  scaleRemaining: "Faltan {n} por responder",
  scaleGoToMissing: "Ir al primero sin responder",
  scaleComplete: "Todo respondido",

  // ---- familiarización ----
  familIntro: "En la siguiente parte verás una serie de situaciones. En cada una tendrás que indicar a quién acudirías entre estas dos opciones.",
  agentIaName: "Chat con Inteligencia Artificial",
  agentIaDesc: "Como ChatGPT, Gemini o Claude: una manera de conversar con un sistema tecnológico artificial que emula las capacidades propiamente humanas.",
  agentHumanName: "Humano",
  agentHumanDesc: "Una persona como tú, sin importar su edad, sexo o conocimientos específicos.",
  familHumanNote: "Pasa el cursor sobre la imagen para ver las dos variantes.",
  familHumanNoteTouch: "Toca la imagen para ver las dos variantes.",

  // ---- práctica y ensayos ----
  practiceTitle: "Ensayo de práctica",
  practiceLead:
    "Antes de empezar, prueba cómo funciona la barra. Muévela hacia el lado de quien elegirías: cuanto más la lleves hacia un extremo, mayor es tu preferencia por esa opción, y más se resaltará en pantalla. Esta respuesta no se analiza.",
  trialPrompt: "En esta situación, ¿a quién acudirías?",
  sliderHint: "Cuanto más lleves la barra hacia un lado, mayor es tu preferencia por esa opción.",
  sliderUntouched: "Mueve la barra para continuar.",
  confidenceTitle: "¿Qué tanto confías en la opción que elegiste en la situación anterior?",
  confidenceLow: "Nada",
  confidenceHigh: "Totalmente",

  // ---- común ----
  continueCta: "Continuar",
  backCta: "Atrás",
  doneTitle: "Listo. Gracias por participar.",
  doneBody: "Tus respuestas quedaron registradas. Ya puedes cerrar esta ventana.",
};

const ES: typeof CO = {
  ...CO,
  landingBody:
    "Este estudio explora a quién prefieren acudir las personas cuando necesitan ayuda: a otra persona o a un sistema de inteligencia artificial. Dura entre 30 y 40 minutos y puedes hacerlo en varias sesiones.",
  idLead: "Necesitamos estos dos datos únicamente para identificar tu sesión y permitirte retomar el estudio si lo interrumpes.",
  idDocument: "Número de DNI / NIE / pasaporte",
  demoEducation: "Nivel de estudios alcanzado",
  demoScreenTime: "¿Cuánto tiempo pasas al día frente a pantallas? (móvil, ordenador, televisión, tableta)",
  confidenceTitle: "¿Cuánto confías en la opción que has elegido en la situación anterior?",
  doneBody: "Tus respuestas han quedado registradas. Ya puedes cerrar esta ventana.",
  resumeNotFound: "No hemos encontrado una sesión con esos datos. Revisa que el nombre y el documento sean los mismos que usaste al empezar.",
  resumeFinished: "Según nuestros registros ya has completado el estudio. Muchas gracias por tu participación.",
};

export const COPY: Record<Country, typeof CO> = { CO, ES };

export const OPTIONS: Record<Country, Record<string, string[]>> = {
  CO: {
    gender: ["Mujer", "Hombre", "No binario", "Prefiero no decirlo", "Otro"],
    education: ["Bachillerato", "Técnico o tecnólogo", "Pregrado en curso", "Pregrado completo", "Especialización", "Maestría", "Doctorado"],
    aiUse: ["Nunca", "Alguna vez al mes", "Varias veces al mes", "Varias veces por semana", "A diario"],
    screenTime: ["Menos de 2 horas", "Entre 2 y 4 horas", "Entre 4 y 6 horas", "Entre 6 y 8 horas", "Entre 8 y 10 horas", "Más de 10 horas"],
  },
  ES: {
    gender: ["Mujer", "Hombre", "No binario", "Prefiero no decirlo", "Otro"],
    education: ["Bachillerato", "Formación profesional", "Grado en curso", "Grado completado", "Máster", "Doctorado"],
    aiUse: ["Nunca", "Alguna vez al mes", "Varias veces al mes", "Varias veces por semana", "A diario"],
    screenTime: ["Menos de 2 horas", "Entre 2 y 4 horas", "Entre 4 y 6 horas", "Entre 6 y 8 horas", "Entre 8 y 10 horas", "Más de 10 horas"],
  },
};

export function t(country: Country, key: keyof typeof CO): string {
  return COPY[country][key];
}
