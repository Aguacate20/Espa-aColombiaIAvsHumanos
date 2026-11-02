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
  verifyNpaToken,
} from "@/lib/npa";

export const dynamic = "force-dynamic";

/*
 * IMPORTANTE (anonimato): esta ruta NO lee la cookie "pid" ni consulta la
 * base del estudio. Solo conoce el token y el NPA, y escribe en la base de NPA.
 */

type Status = "available" | "done" | "locked" | "disabled";

async function status(): Promise<{ status: Status; hash: string | null }> {
  if (!npaEnabled()) return { status: "disabled", hash: null };
  const jar = cookies();
  if (jar.get(NPA_DONE_COOKIE)?.value === "1") return { status: "done", hash: null };
  const hash = verifyNpaToken(jar.get(NPA_COOKIE)?.value);
  if (!hash) return { status: "locked", hash: null };
  const { data } = await npaDb().from("npa_tokens_usados").select("token_hash").eq("token_hash", hash).maybeSingle();
  return data ? { status: "done", hash } : { status: "available", hash };
}

export async function GET() {
  const s = await status();
  return NextResponse.json({ status: s.status });
}

export async function POST(req: Request) {
  const s = await status();
  if (s.status !== "available" || !s.hash) return NextResponse.json({ ok: false, status: s.status });

  const { npa } = (await req.json().catch(() => ({}))) as { npa?: string };
  const clean = normalizeNpa(npa ?? "");
  if (!npaLooksValid(clean)) return NextResponse.json({ ok: false, status: "invalid" }, { status: 400 });

  // Inserta hash + NPA en una sola transacción (función SQL de la base NPA).
  const { data, error } = await npaDb().rpc("registrar_npa", { p_token_hash: s.hash, p_npa: clean });
  if (error) return NextResponse.json({ ok: false, status: "error" }, { status: 500 });

  markNpaDone();
  return NextResponse.json({ ok: true, status: data === "usado" ? "done" : "saved" });
}
