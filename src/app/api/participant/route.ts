import { NextResponse } from "next/server";
import { db } from "@/lib/supabase";
import { setParticipantCookie, normalizeDocument, normalizeName } from "@/lib/session";
import { makeSeed, makeParticipantCode } from "@/lib/rng";

export const dynamic = "force-dynamic";

/**
 * Crea (o recupera) al participante a partir de nombre + documento.
 *
 * El documento normalizado es único: si alguien vuelve a entrar con el mismo
 * documento, NO se crea una fila nueva, se reabre la suya y se restaura la
 * cookie. Así la identidad —y el progreso— sobreviven aunque cambie de
 * dispositivo o borre cookies.
 */
export async function POST(req: Request) {
  const { fullName, document } = await req.json();

  if (!fullName?.trim() || !document?.trim()) {
    return NextResponse.json({ ok: false, error: "Faltan datos" }, { status: 400 });
  }

  const docNorm = normalizeDocument(document);

  const { data: existing } = await db
    .from("participants")
    .select("id, current_step, finished_at")
    .eq("document_norm", docNorm)
    .maybeSingle();

  if (existing) {
    await setParticipantCookie(existing.id);
    return NextResponse.json({
      ok: true,
      resumed: true,
      finished: !!existing.finished_at,
      next: existing.finished_at ? "/fin" : "/pais",
    });
  }

  const { data, error } = await db
    .from("participants")
    .insert({
      code: makeParticipantCode(),
      seed: makeSeed(),
      full_name: fullName.trim(),
      document_id: document.trim(),
      document_norm: docNorm,
      current_step: "country",
      user_agent: req.headers.get("user-agent")?.slice(0, 400) ?? null,
    })
    .select("id")
    .single();

  if (error || !data) {
    // Colisión por doble envío: reintenta como recuperación.
    const { data: retry } = await db.from("participants").select("id, finished_at").eq("document_norm", docNorm).maybeSingle();
    if (retry) {
      await setParticipantCookie(retry.id);
      return NextResponse.json({ ok: true, resumed: true, finished: !!retry.finished_at, next: retry.finished_at ? "/fin" : "/pais" });
    }
    return NextResponse.json({ ok: false, error: error?.message ?? "insert failed" }, { status: 500 });
  }

  await setParticipantCookie(data.id);
  return NextResponse.json({ ok: true, resumed: false, next: "/pais" });
}
