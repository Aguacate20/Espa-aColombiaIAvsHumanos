export type Country = "CO" | "ES";

export interface Anchor {
  value: number;
  label: string;
}

export interface ScaleItemDef {
  code: string;
  subscale: string;
  reverse?: boolean;
  text: Record<Country, string>;
}

export interface ScaleDef {
  /** id corto, en MAYÚSCULAS, sin espacios: se usa en la URL y en la BD */
  id: string;
  /** título visible de la sección */
  title: Record<Country, string>;
  /** instrucciones de la escala */
  instructions: Record<Country, string>;
  /** anclas de respuesta, de menor a mayor */
  anchors: Record<Country, Anchor[]>;
  /** ítems en orden de presentación fija */
  items: ScaleItemDef[];
  /** nota de puntuación bajo el título (opcional) */
  scaleNote?: Record<Country, string>;
}

/** Sinónimo para redacción idéntica CO/ES. */
export const bi = (t: string): Record<Country, string> => ({ CO: t, ES: t });
export const co_es = (co: string, es: string): Record<Country, string> => ({ CO: co, ES: es });
