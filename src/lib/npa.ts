import "server-only";
import { createHmac, createHash, randomBytes, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * REGISTRO DE NPA (solo España) — base de datos SEPARADA de la del estudio.
 *
 * Cómo se mantiene el anonimato:
 *  1. Al completar las 27 situaciones, /api/finish emite un token firmado
 *     (nonce aleatorio + HMAC). El token NO se guarda en la base del estudio:
 *     allí solo queda participants.npa_token_issued = true.
 *  2. El token llega al navegador de dos formas redundantes: en la respuesta
 *     de /api/finish (se guarda en localStorage) y en una cookie httpOnly.
 *     /api/npa acepta cualquiera de las dos.
 *  3. /api/npa comprueba la firma y escribe en la OTRA base el hash del token
 *     (para que sirva una sola vez) y el NPA, en tablas distintas y sin
 *     ninguna referencia al participante. /api/npa nunca lee la cookie "pid".
 *
 * Variables de entorno (Vercel):
 *   NPA_SUPABASE_URL                 URL del segundo proyecto de Supabase
 *   NPA_SUPABASE_SERVICE_ROLE_KEY    service_role de ese segundo proyecto
 *   NPA_TOKEN_SECRET                 cadena larga y aleatoria para firmar tokens
 * Si falta alguna, el registro de NPA queda desactivado sin romper el estudio.
 */

export const NPA_COOKIE = "npa_t";
export const NPA_DONE_COOKIE = "npa_ok";
// Ruta "/": las cookies limitadas a /api/npa no llegaban en algunos navegadores.
const NPA_PATH = "/";

export function npaEnabled(): boolean {
  return !!(process.env.NPA_SUPABASE_URL && process.env.NPA_SUPABASE_SERVICE_ROLE_KEY && process.env.NPA_TOKEN_SECRET);
}

let client: SupabaseClient | null = null;
export function npaDb(): SupabaseClient {
  if (!npaEnabled()) throw new Error("Registro de NPA no configurado");
  if (!client) {
    client = createClient(process.env.NPA_SUPABASE_URL!, process.env.NPA_SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return client;
}

const b64url = (b: Buffer) => b.toString("base64url");

function sign(nonce: string): string {
  return b64url(createHmac("sha256", process.env.NPA_TOKEN_SECRET!).update(nonce).digest());
}

/** Token nuevo: "<nonce>.<firma>". */
export function makeNpaToken(): string {
  const nonce = b64url(randomBytes(24));
  return `${nonce}.${sign(nonce)}`;
}

/** Motivo legible cuando el token no sirve (solo para diagnóstico). */
export function tokenProblem(token: string | undefined | null): "sin_token" | "firma" | null {
  if (!token) return "sin_token";
  return verifyNpaToken(token) ? null : "firma";
}

/** Devuelve el hash a guardar si la firma es válida; null si no. */
export function verifyNpaToken(token: string | undefined | null): string | null {
  if (!token || !npaEnabled()) return null;
  const [nonce, sig] = token.split(".");
  if (!nonce || !sig) return null;
  const expected = Buffer.from(sign(nonce));
  const given = Buffer.from(sig);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;
  return createHash("sha256").update(nonce).digest("hex");
}

const cookieBase = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: NPA_PATH,
};

export function setNpaCookie(token: string) {
  cookies().set(NPA_COOKIE, token, { ...cookieBase, maxAge: 60 * 60 * 24 * 60 });
}

export function markNpaDone() {
  cookies().set(NPA_COOKIE, "", { ...cookieBase, maxAge: 0 });
  cookies().set(NPA_DONE_COOKIE, "1", { ...cookieBase, maxAge: 60 * 60 * 24 * 60 });
}

/** Se usa al empezar una participación nueva en un dispositivo compartido. */
export function clearNpaCookies() {
  cookies().set(NPA_COOKIE, "", { ...cookieBase, maxAge: 0 });
  cookies().set(NPA_DONE_COOKIE, "", { ...cookieBase, maxAge: 0 });
}

/** Sin formato fijo (no sabemos cómo son los NPA): solo se quitan los
 *  espacios de los extremos y se limita la longitud. */
export const NPA_MAX = 100;

export function normalizeNpa(raw: string): string {
  return raw.trim();
}

export function npaLooksValid(npa: string): boolean {
  return npa.length >= 1 && npa.length <= NPA_MAX;
}
