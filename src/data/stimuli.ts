/**
 * ESTÍMULOS VISUALES
 *
 * Los PNG van en  public/estimulos/  con estos nombres exactos:
 *   Hombre - IA.png      Hombre - Hombre.png      Hombre - Mujer.png
 *   Mujer - IA.png       Mujer - Hombre.png       Mujer - Mujer.png
 *
 * Lectura del nombre:  <sexo del participante> - <interlocutor mostrado>
 *
 * Si prefieres renombrarlos sin espacios ni tildes, cambia solo `fileName`.
 */

export type StimulusSet = "hombre" | "mujer";
export type HumanGender = "hombre" | "mujer";

const LABEL: Record<string, string> = { hombre: "Hombre", mujer: "Mujer", ia: "IA" };

function fileName(set: StimulusSet, agent: "ia" | HumanGender): string {
  return `/estimulos/${LABEL[set]} - ${LABEL[agent]}.png`;
}

/** encodeURI convierte los espacios en %20; los nombres con espacios funcionan igual. */
export function iaImage(set: StimulusSet): string {
  return encodeURI(fileName(set, "ia"));
}

export function humanImage(set: StimulusSet, gender: HumanGender): string {
  return encodeURI(fileName(set, gender));
}

/** Todas las imágenes que un participante llegará a ver, para precargarlas. */
export function allImagesFor(set: StimulusSet): string[] {
  return [iaImage(set), humanImage(set, "hombre"), humanImage(set, "mujer")];
}

/**
 * Qué juego de estímulos le corresponde a cada participante.
 * Si no declara sexo (no binario, prefiere no decirlo, otro), se asigna de
 * forma determinista a partir de la semilla para que quede balanceado entre
 * participantes y sea reproducible al reanudar. Se guarda en
 * participants.stimulus_set y debe usarse como covariable.
 */
export function stimulusSetFor(gender: string | null, seed: number): StimulusSet {
  const g = (gender ?? "").toLowerCase();
  if (g.startsWith("hombre")) return "hombre";
  if (g.startsWith("mujer")) return "mujer";
  return seed % 2 === 0 ? "hombre" : "mujer";
}
