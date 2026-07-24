/**
 * PRNG determinista (mulberry32). Con la misma semilla, el mismo orden.
 * Esto es lo que permite reanudar el experimento por id de participante:
 * el plan de ensayos se genera UNA vez, se guarda en participants.trial_plan
 * y se reconstruye idéntico en cada visita.
 */
export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function shuffle<T>(arr: readonly T[], rand: () => number): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function makeSeed(): number {
  return Math.floor(Math.random() * 2 ** 31);
}

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // sin I, O, 0, 1

export function makeParticipantCode(prefix = "P"): string {
  let s = "";
  for (let i = 0; i < 6; i++) s += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  return `${prefix}-${s}`;
}
