/**
 * Copia del token del NPA en el navegador (solo España). Es la vía principal;
 * la cookie queda como respaldo. No contiene nada que identifique al participante.
 */
const KEY = "npa_t";
const DONE = "npa_ok";

export function saveNpaToken(token?: string) {
  if (!token) return;
  try { localStorage.setItem(KEY, token); } catch { /* navegador sin almacenamiento */ }
}

export function getNpaToken(): string | undefined {
  try { return localStorage.getItem(KEY) ?? undefined; } catch { return undefined; }
}

export function markNpaDoneLocal() {
  try { localStorage.removeItem(KEY); localStorage.setItem(DONE, "1"); } catch { /* */ }
}

export function npaDoneLocal(): boolean {
  try { return localStorage.getItem(DONE) === "1"; } catch { return false; }
}

/** Al empezar una participación nueva en un dispositivo compartido. */
export function clearNpaLocal() {
  try { localStorage.removeItem(KEY); localStorage.removeItem(DONE); } catch { /* */ }
}
