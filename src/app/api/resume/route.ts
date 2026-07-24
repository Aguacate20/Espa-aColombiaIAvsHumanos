import { NextResponse } from "next/server";
import { db } from "@/lib/supabase";
import { setParticipantCookie, normalizeDocument, normalizeName } from "@/lib/session";
import { pathForStep } from "@/lib/flow";

export const dynamic = "force-dynamic";

/** Retoma una sesión ya iniciada. Exige que documento Y nombre coincidan. */
export async function POST(req: Request) {
  const { fullName, document } = await req.json();
  if (!fullName?.trim() || !document?.trim()) {
    return NextResponse.json({ ok: false, error: "Faltan datos" }, { status: 400 });
  }

  const docNorm = normalizeDocument(document);
  const { data } = await db
    .from("participants")
    .select("id, full_name, current_step, finished_at")
    .eq("document_norm", docNorm)
    .maybeSingle();

  if (!data) return NextResponse.json({ ok: false, reason: "not_found" });

  // Verificación blanda del nombre: evita reabrir la sesión de otra persona
  // que comparta un documento mal tecleado.
  if (normalizeName(data.full_name ?? "") !== normalizeName(fullName)) {
    return NextResponse.json({ ok: false, reason: "not_found" });
  }

  await setParticipantCookie(data.id);
  if (data.finished_at) return NextResponse.json({ ok: false, reason: "finished" });

  return NextResponse.json({ ok: true, next: pathForStep(data.current_step) });
}
