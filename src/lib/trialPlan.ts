import "server-only";
import { SITUATIONS } from "@/data/situations";
import { mulberry32, shuffle } from "./rng";

export type Agent = "ia" | "humano";

export interface PlannedTrial {
  /** posición en la secuencia (0-based) */
  i: number;
  situationId: string;
  left: Agent;
  right: Agent;
}

/**
 * Genera el plan completo para un participante:
 *  - orden de las situaciones aleatorio
 *  - lado del agente aleatorio en CADA situación
 *  - contrabalanceado: la mitad de los ensayos tiene la IA a la izquierda
 *    (evita que el azar puro deje a un participante con 22 de 27 a un lado)
 */
export function buildTrialPlan(seed: number): PlannedTrial[] {
  const rand = mulberry32(seed);
  const order = shuffle(SITUATIONS.map((s) => s.id), rand);

  const n = order.length;
  const sides: Agent[] = [
    ...Array(Math.ceil(n / 2)).fill("ia" as Agent),
    ...Array(Math.floor(n / 2)).fill("humano" as Agent),
  ];
  const leftSides = shuffle(sides, rand);

  return order.map((situationId, i) => {
    const left = leftSides[i];
    return { i, situationId, left, right: left === "ia" ? "humano" : "ia" };
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
