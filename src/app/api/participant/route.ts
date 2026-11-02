import { NextResponse } from "next/server";
import { db } from "@/lib/supabase";
import { setParticipantCookie } from "@/lib/session";
import { makeSeed, makeParticipantCode } from "@/lib/rng";
import { clearNpaCookies } from "@/lib/npa";

export const dynamic = "force-dynamic";

/**
 * Crea una participación ANÓNIMA. No se pide nombre ni documento: la sesión
 * queda ligada a este navegador mediante la cookie httpOnly "pid" (un UUID
 * aleatorio), que permite retomar en el mismo dispositivo.
 *
 * Siempre crea una fila nueva. Si en el navegador había otra participación
 * (dispositivo compartido), simplemente se sustituye la cookie.
 * Los datos del dispositivo se registran después del consentimiento, en
 * /api/demographics, no aquí.
 */
export async function POST() {
  const { data, error } = await db
    .from("participants")
    .insert({
      code: makeParticipantCode(),
      seed: makeSeed(),
      current_step: "country",
    })
    .select("id")
    .single();

  if (error || !data) {
    return NextResponse.json({ ok: false, error: error?.message ?? "insert failed" }, { status: 500 });
  }

  await setParticipantCookie(data.id);
  clearNpaCookies();
  return NextResponse.json({ ok: true, next: "/pais" });
}
