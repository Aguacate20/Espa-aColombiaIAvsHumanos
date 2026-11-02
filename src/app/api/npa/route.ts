import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  NPA_COOKIE,
  NPA_DONE_COOKIE,
  markNpaDone,
  normalizeNpa,
  npaDb,
  npaEnabled,
  npaLooksValid,
  tokenProblem,
  verifyNpaToken,
} from "@/lib/npa";

export const dynamic = "force-dynamic";

/*
 * IMPORTANTE (anonimato): esta ruta NO lee la cookie "pid" ni consulta la
 * base del estudio. Solo conoce el token y el NPA, y escribe en la base de NPA.
 */

type Status = "available" | "done" | "locked" | "disabled" | "error";

type Result = { status: Status; hash: string | null; reason?: string };

/** El token puede venir en el cuerpo (localStorage) o en la cookie. */
async function status(bodyToken?: string): Promise<Result> {
  if (!npaEnabled()) return { status: "disabled", hash: null };
  const jar = cookies();
  if (jar.get(NPA_DONE_COOKIE)?.value === "1") return { status: "done", hash: null };
  const candidates = [bodyToken, jar.get(NPA_COOKIE)?.value].filter((t): t is string => !!t);
  const hash = candidates.map(verifyNpaToken).find((h) => h) ?? null;
  if (!hash) return { status: "locked", hash: null, reason: tokenProblem(candidates[0]) ?? "sin_token" };
  const { data, error } = await npaDb().from("npa_tokens_usados").select("token_hash").eq("token_hash", hash).maybeSingle();
  if (error) return { status: "error", hash: null, reason: "base" };
  return data ? { status: "done", hash } : { status: "available", hash };
}

const noStore = { headers: { "Cache-Control": "no-store" } };

export async function GET() {
  const s = await status();
  return NextResponse.json({ status: s.status, reason: s.reason ?? null }, noStore);
}

/**
 * { token }        → consulta el estado
 * { token, npa }   → registra el NPA
 */
export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { npa?: string; token?: string };
  const s = await status(typeof body.token === "string" ? body.token : undefined);
  if (body.npa === undefined) return NextResponse.json({ status: s.status, reason: s.reason ?? null }, noStore);
  if (s.status !== "available" || !s.hash) return NextResponse.json({ ok: false, status: s.status, reason: s.reason ?? null }, noStore);

  const clean = normalizeNpa(body.npa ?? "");
  if (!npaLooksValid(clean)) return NextResponse.json({ ok: false, status: "invalid" }, { status: 400 });

  // Inserta hash + NPA en una sola transacción (función SQL de la base NPA).
  const { data, error } = await npaDb().rpc("registrar_npa", { p_token_hash: s.hash, p_npa: clean });
  if (error) return NextResponse.json({ ok: false, status: "error" }, { status: 500 });

  markNpaDone();
  return NextResponse.json({ ok: true, status: data === "usado" ? "done" : "saved" }, noStore);
}
