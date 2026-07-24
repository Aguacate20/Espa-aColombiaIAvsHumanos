import "server-only";
import { SITUATIONS } from "@/data/situations";
import { mulberry32, shuffle } from "./rng";

export type Agent = "ia" | "humano";
export type HumanGender = "hombre" | "mujer";

export interface PlannedTrial {
  i: number;
  situationId: string;
  left: Agent;
  right: Agent;
  /** Cuál de las dos imágenes de interlocutor humano se muestra en este ensayo. */
  humanGender: HumanGender;
}

/**
 * Plan completo del participante. Se genera una sola vez y se guarda en
 * participants.trial_plan, así que el orden y los lados sobreviven a que el
 * participante cierre el navegador.
 *
 * Tres factores, los tres CONTRABALANCEADOS dentro del participante (no
 * azar puro): con 27 ensayos, el azar puro dejaría a algún participante con
 * 21 de 27 al mismo lado, y eso mete varianza de lado en el drift rate.
 *   1. Orden de las situaciones — aleatorio.
 *   2. Lado del agente — mitad y mitad.
 *   3. Sexo del interlocutor humano mostrado — mitad y mitad.
 */
export function buildTrialPlan(seed: number): PlannedTrial[] {
  const rand = mulberry32(seed);
  const order = shuffle(SITUATIONS.map((s) => s.id), rand);
  const n = order.length;

  const sides = shuffle(
    [...Array(Math.ceil(n / 2)).fill("ia" as Agent), ...Array(Math.floor(n / 2)).fill("humano" as Agent)],
    rand,
  );

  const genders = shuffle(
    [
      ...Array(Math.ceil(n / 2)).fill("hombre" as HumanGender),
      ...Array(Math.floor(n / 2)).fill("mujer" as HumanGender),
    ],
    rand,
  );

  return order.map((situationId, i) => {
    const left = sides[i];
    return {
      i,
      situationId,
      left,
      right: left === "ia" ? "humano" : "ia",
      humanGender: genders[i],
    };
  });
}

/** Convierte la posición cruda del slider (0..100) en preferencia hacia la IA. */
export function toPreferenceIa(sliderValue: number, left: Agent): number {
  return left === "ia" ? 100 - sliderValue : sliderValue;
}

export function toChoice(preferenceIa: number): "ia" | "humano" | "neutral" {
  if (preferenceIa > 50) return "ia";
  if (preferenceIa < 50) return "humano";
  return "neutral";
}
