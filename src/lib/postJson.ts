/**
 * POST con reintento (solo cliente). Devuelve el JSON si el servidor
 * respondió 2xx, o null si falló tras los reintentos. Sirve para no avanzar
 * de pantalla cuando una respuesta no llegó a guardarse.
 */
export async function postJson<T = any>(url: string, body: unknown, tries = 2): Promise<T | null> {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (r.ok) return (await r.json().catch(() => ({}))) as T;
    } catch {
      /* red caída: se reintenta */
    }
    if (i + 1 < tries) await new Promise((res) => setTimeout(res, 800));
  }
  return null;
}

export const SAVE_ERROR = "No se pudieron guardar tus respuestas. Revisa tu conexión y vuelve a intentarlo.";
