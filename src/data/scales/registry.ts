import { CEIA9_ITEMS } from "./ceia9";
import { PRE_ITEMS } from "./pretrust";

/**
 * Mapa código de ítem → subescala, para todas las escalas del protocolo.
 * Al añadir una escala nueva, regístrala aquí y /api/scale la reconoce sola.
 */
const ENTRIES: [string, string][] = [
  ...CEIA9_ITEMS.map((i) => [i.code, i.subscale] as [string, string]),
  ...PRE_ITEMS.map((i) => [i.code, i.subscale] as [string, string]),
];

export const SUBSCALE_BY_CODE = new Map<string, string>(ENTRIES);

export const SCALE_IDS = ["PRE", "CEIA9"] as const;
