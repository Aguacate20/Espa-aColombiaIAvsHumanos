import { CEIA9 } from "./ceia9";
import { HGAITS } from "./hgaits";
import { MCS } from "./mcs";
import { AIAS } from "./aias";
import { UCLA } from "./ucla";
import { EMASP } from "./emasp";
import { SIAS } from "./sias";
import { DERS } from "./ders";
import { PRE_ITEMS } from "./pretrust";
import type { ScaleDef } from "./types";

/**
 * ORDEN DE LOS CUESTIONARIOS.
 *
 * CEIA-9 conserva su propia página dedicada (/escalas/ceia9) por compatibilidad
 * con lo ya construido. Las 7 restantes comparten una sola página genérica
 * (/escalas/[scale]) que se configura desde este arreglo. Para reordenar,
 * cambia el orden aquí y en STEPS de flow.ts.
 */
export const GENERIC_SCALES: ScaleDef[] = [HGAITS, MCS, AIAS, UCLA, EMASP, SIAS, DERS];

export const ALL_SCALES: ScaleDef[] = [CEIA9 as unknown as ScaleDef, ...GENERIC_SCALES];

export const SCALE_BY_ID = new Map<string, ScaleDef>(GENERIC_SCALES.map((s) => [s.id.toLowerCase(), s]));

/** Mapa código de ítem → subescala, para TODAS las escalas del protocolo. */
const ENTRIES: [string, string][] = [];
for (const s of ALL_SCALES) for (const it of s.items) ENTRIES.push([it.code, it.subscale]);
for (const it of PRE_ITEMS) ENTRIES.push([it.code, it.subscale]);
export const SUBSCALE_BY_CODE = new Map<string, string>(ENTRIES);

/** Ítems de puntuación inversa (hoy solo la subescala AWA de la DERS-SF). */
export const REVERSE_CODES = new Set<string>(
  ALL_SCALES.flatMap((s) => s.items.filter((it) => it.reverse).map((it) => it.code)),
);

/** Slug de URL de cada escala genérica: /escalas/hgaits, /escalas/mcs, ... */
export function scaleSlug(s: ScaleDef): string {
  return s.id.toLowerCase();
}

/** Devuelve la escala siguiente a una dada, o null si es la última. */
export function nextGenericScale(id: string): ScaleDef | null {
  const i = GENERIC_SCALES.findIndex((s) => s.id.toLowerCase() === id.toLowerCase());
  if (i === -1 || i + 1 >= GENERIC_SCALES.length) return null;
  return GENERIC_SCALES[i + 1];
}

export function prevGenericScale(id: string): ScaleDef | null {
  const i = GENERIC_SCALES.findIndex((s) => s.id.toLowerCase() === id.toLowerCase());
  if (i <= 0) return null;
  return GENERIC_SCALES[i - 1];
}
