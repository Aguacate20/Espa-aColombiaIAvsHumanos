import { ScaleDef } from "./types";

/**
 * DERS-SF — Dificultades en la Regulación Emocional, versión breve de 18 ítems
 * (Kaufman et al., 2015), 6 subescalas × 3 ítems. Sustituye al ERQ-10.
 *
 * MISMOS 18 ÍTEMS EN LOS DOS PAÍSES (necesario para la invarianza CO–ES);
 * cambia solo la redacción validada en cada población:
 *   CO → Navarro, Restrepo-Ochoa, Rommel, Ghalaret y Fleury-Bahi (2021).
 *        DERS-S SF, validada en adultos de Cartagena. Rev. CES Psico, 14(2), 71-88.
 *        doi:10.21615/cesp.5360  (texto tal cual aparece en su Tabla 2)
 *   ES → Gómez-Simón, Penelo y De la Osa (2014). Psicothema, 26(3), 401-408.
 *        doi:10.7334/psicothema2013.324  (texto tal cual de su Tabla 2; es la
 *        fuente de la que Navarro et al. tomaron su redacción)
 *
 * Subescalas: AWA = falta de conciencia (ítems INVERSOS), CLA = falta de
 * claridad, GOA = metas, IMP = impulsos, NAC = no aceptación, STR = acceso
 * limitado a estrategias. Puntuación alta = más dificultad.
 * Orden de presentación: el del instrumento original (número entre corchetes
 * = ítem de la DERS-36 de Gratz y Roemer, 2004).
 *
 * Adaptación: se añade la forma femenina («molesto/a», «deprimido/a»…), como en el
 * resto de escalas del protocolo; el resto del texto es el validado.
 *
 * Nota: Navarro et al. no confirmaron la fiabilidad de AWA en Colombia; la
 * literatura recomienda analizarla por separado del total.
 */
// Anclas de Gómez-Simón et al. (2014). Los porcentajes van en la nota de la
// escala y no en cada botón, para que la rejilla sea legible en el celular.
const ANCHORS = [
  { value: 1, label: "Casi nunca" },
  { value: 2, label: "Algunas veces" },
  { value: 3, label: "La mitad de las veces" },
  { value: 4, label: "La mayoría de las veces" },
  { value: 5, label: "Casi siempre" },
];
const NOTE =
  "1 = casi nunca (0-10 % de las veces) · 2 = algunas veces (11-35 %) · 3 = la mitad de las veces (36-65 %) · 4 = la mayoría de las veces (66-90 %) · 5 = casi siempre (91-100 %).";

const it = (code: string, subscale: string, co: string, es: string, reverse = false) => ({
  code,
  subscale,
  reverse,
  text: { CO: co, ES: es },
});

export const DERS: ScaleDef = {
  id: "DERSSF",
  title: { CO: "Cómo manejas tus emociones", ES: "Cómo manejas tus emociones" },
  instructions: {
    CO: "Indica con qué frecuencia te ocurre cada una de las siguientes afirmaciones.",
    ES: "Indica con qué frecuencia te ocurre cada una de las siguientes afirmaciones.",
  },
  scaleNote: { CO: NOTE, ES: NOTE },
  anchors: { CO: ANCHORS, ES: ANCHORS },
  items: [
    /* [2]  */ it("DERS1",  "AWA", "Pongo atención a cómo me siento", "Pongo atención a cómo me siento", true),
    /* [4]  */ it("DERS2",  "CLA", "No sé cómo me siento", "No tengo ni idea de cómo me siento"),
    /* [5]  */ it("DERS3",  "CLA", "Me cuesta entender mis sentimientos", "Me cuesta entender mis sentimientos"),
    /* [8]  */ it("DERS4",  "AWA", "Le doy importancia a lo que estoy sintiendo", "Le doy importancia a lo que estoy sintiendo", true),
    /* [9]  */ it("DERS5",  "CLA", "Estoy confuso/a sobre lo que siento", "Estoy confuso/a sobre lo que siento"),
    /* [10] */ it("DERS6",  "AWA", "Cuando estoy molesto/a, sé reconocer cuáles son mis emociones", "Cuando estoy molesto/a, sé reconocer cuáles son mis emociones (si es rabia, si es decepción…)", true),
    /* [12] */ it("DERS7",  "NAC", "Cuando estoy molesto/a, me da vergüenza sentirme de esa manera", "Cuando estoy molesto/a, me da vergüenza sentirme de esa manera"),
    /* [13] */ it("DERS8",  "GOA", "Cuando estoy molesto/a, me cuesta terminar el trabajo", "Cuando estoy molesto/a, me cuesta terminar el trabajo"),
    /* [14] */ it("DERS9",  "IMP", "Cuando estoy molesto/a, pierdo el control", "Cuando estoy molesto/a, pierdo el control"),
    /* [16] */ it("DERS10", "STR", "Cuando estoy molesto/a, creo que acabaré sintiéndome muy deprimido/a", "Cuando estoy molesto/a, creo que acabaré sintiéndome muy deprimido/a"),
    /* [18] */ it("DERS11", "GOA", "Cuando estoy molesto/a, me cuesta centrarme en otras cosas", "Cuando estoy molesto/a, me cuesta centrarme en otras cosas"),
    /* [25] */ it("DERS12", "NAC", "Cuando estoy molesto/a, me siento culpable por sentirme de esa manera", "Cuando estoy molesto/a, me siento culpable por sentirme de esta manera"),
    /* [26] */ it("DERS13", "GOA", "Cuando estoy molesto/a, me cuesta concentrarme", "Cuando estoy molesto/a, me cuesta concentrarme"),
    /* [27] */ it("DERS14", "IMP", "Cuando estoy molesto/a, me cuesta controlar mi comportamiento", "Cuando estoy molesto/a, me cuesta controlar mi comportamiento"),
    /* [28] */ it("DERS15", "STR", "Cuando estoy molesto/a, creo que no hay nada que pueda hacer para sentirme mejor", "Cuando estoy molesto/a, creo que no hay nada que pueda hacer para conseguir sentirme mejor"),
    /* [29] */ it("DERS16", "NAC", "Cuando estoy molesto/a, me enfado conmigo mismo/a por sentirme de esa manera", "Cuando estoy molesto/a, me enfado conmigo mismo/a por sentirme de esa manera"),
    /* [32] */ it("DERS17", "IMP", "Cuando estoy molesto/a, pierdo el control sobre mi comportamiento", "Cuando estoy molesto/a, pierdo el control sobre mi comportamiento"),
    /* [35] */ it("DERS18", "STR", "Cuando estoy molesto/a, tardo mucho tiempo en sentirme mejor", "Cuando estoy molesto/a, tardo mucho tiempo en sentirme mejor"),
  ],
};
