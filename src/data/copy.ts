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
  anonLead:
    "Tu participación es anónima: no te pediremos tu nombre, tu documento ni ningún dato que permita identificarte.",
  anonResume:
    "Si cierras la ventana, podrás continuar donde quedaste abriendo de nuevo este enlace desde el mismo dispositivo y navegador.",
  startCta: "Empezar",
  resumeTitle: "Continúa donde quedaste",
  resumeLead: "En este dispositivo hay una participación sin terminar. Puedes retomarla justo donde la dejaste.",
  resumeCta: "Continuar",
  sharedDevice: "¿Eres otra persona y estás usando este mismo dispositivo?",
  startOtherCta: "Empezar una participación nueva",
  finishedTitle: "Estudio completado",
  finishedLink: "Ver la pantalla final",
  resumeFinished: "En este dispositivo ya se completó el estudio. Muchas gracias por tu participación.",

  // ---- país ----
  countryTitle: "¿Desde dónde participas?",
  countryLead: "Selecciona el país donde resides actualmente. La redacción de algunas preguntas y las condiciones de tratamiento de datos se ajustan según tu selección.",

  // ---- sociodemográficos ----
  demoTitle: "Datos sociodemográficos",
  demoLead: "Estos datos nos permiten describir la muestra. No se usan para identificarte individualmente.",
  demoAge: "Edad",
  demoGender: "Género",
  demoGenderHelp: "Se usa para seleccionar las imágenes que verás más adelante.",
  demoEducation: "Nivel educativo actual",
  demoOccupation: "Ocupación actual",
  demoDevice: "¿Desde qué dispositivo estás respondiendo?",
  demoDeviceHelp: "Te pedimos que respondas todo el estudio desde este mismo dispositivo.",
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
  saveError: "No se pudo guardar tu respuesta. Revisa tu conexión y vuelve a pulsar «Continuar».",
  confidenceTitle: "¿Qué tanto confías en la opción que elegiste en la situación anterior?",
  confidenceLow: "Nada",
  confidenceHigh: "Totalmente",

  // ---- común ----
  continueCta: "Continuar",
  backCta: "Atrás",
  doneTitle: "Listo. Gracias por participar.",
  doneBody: "Tus respuestas quedaron registradas. Ya puedes cerrar esta ventana.",

  // ---- NPA (solo se muestra en España) ----
  npaTitle: "Puntos de clase",
  npaLead:
    "Si participas en el marco de una asignatura, indica tu NPA para que se te asignen los puntos. Tu NPA se guarda por separado y no tiene ninguna relación con tus respuestas: nadie puede saber qué contestaste.",
  npaLabel: "Indica tu NPA (Número Personal del Alumno)",
  npaRepeat: "Repite tu NPA",
  npaMismatch: "Los dos NPA no coinciden.",
  npaInvalid: "Escribe tu NPA (máximo 100 caracteres).",
  npaSubmit: "Registrar mi NPA",
  npaSaved: "Tu NPA ha quedado registrado. ¡Gracias!",
  npaAlready: "El NPA de esta participación ya se registró.",
  npaLocked: "El registro del NPA se habilita al completar todas las situaciones del estudio.",
  npaDisabled: "El registro del NPA no está disponible en este momento. Escribe al correo de contacto del consentimiento.",
  npaError: "No se pudo registrar. Revisa tu conexión e inténtalo de nuevo.",
};

const ES: typeof CO = {
  ...CO,
  landingBody:
    "Este estudio explora a quién prefieren acudir las personas cuando necesitan ayuda: a otra persona o a un sistema de inteligencia artificial. Dura entre 30 y 40 minutos y puedes hacerlo en varias sesiones.",
  demoEducation: "Nivel de estudios actual",
  demoScreenTime: "¿Cuánto tiempo pasas al día frente a pantallas? (móvil, ordenador, televisión, tableta)",
  confidenceTitle: "¿Cuánto confías en la opción que has elegido en la situación anterior?",
  doneBody: "Tus respuestas han quedado registradas. Ya puedes cerrar esta ventana.",
};

export const COPY: Record<Country, typeof CO> = { CO, ES };

export const OPTIONS: Record<Country, Record<string, string[]>> = {
  CO: {
    gender: ["Mujer", "Hombre", "No binario", "Prefiero no decirlo", "Otro"],
    education: ["Bachillerato", "Técnico o tecnólogo", "Pregrado en curso", "Pregrado completo", "Especialización", "Maestría", "Doctorado"],
    aiUse: ["Nunca", "Alguna vez al mes", "Varias veces al mes", "Varias veces por semana", "A diario"],
    screenTime: ["Menos de 2 horas", "Entre 2 y 4 horas", "Entre 4 y 6 horas", "Entre 6 y 8 horas", "Entre 8 y 10 horas", "Más de 10 horas"],
    device: ["Computador (de escritorio o portátil)", "Celular", "Tableta"],
  },
  ES: {
    gender: ["Mujer", "Hombre", "No binario", "Prefiero no decirlo", "Otro"],
    education: ["Bachillerato", "Formación profesional", "Grado en curso", "Grado completado", "Máster", "Doctorado"],
    aiUse: ["Nunca", "Alguna vez al mes", "Varias veces al mes", "Varias veces por semana", "A diario"],
    screenTime: ["Menos de 2 horas", "Entre 2 y 4 horas", "Entre 4 y 6 horas", "Entre 6 y 8 horas", "Entre 8 y 10 horas", "Más de 10 horas"],
    device: ["Ordenador (de sobremesa o portátil)", "Móvil", "Tableta"],
  },
};

/** Código que se guarda en participants.device_reported, por posición de la opción. */
export const DEVICE_CODES = ["pc", "movil", "tableta"] as const;

export function t(country: Country, key: keyof typeof CO): string {
  return COPY[country][key];
}
