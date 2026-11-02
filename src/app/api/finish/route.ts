import { NextResponse } from "next/server";
import { db } from "@/lib/supabase";
import { getParticipant } from "@/lib/session";
import { makeNpaToken, npaEnabled, setNpaCookie } from "@/lib/npa";

export const dynamic = "force-dynamic";

/**
 * Cierra la participación. Es idempotente: /fin la vuelve a llamar por si la
 * llamada del último ensayo se perdió.
 *
 * Solo marca como terminado si están guardadas TODAS las situaciones del plan.
 * En España, además, emite (una sola vez) el token que desbloquea el registro
 * del NPA. El token no se guarda en esta base: solo el indicador
 * npa_token_issued.
 */
export async function POST() {
  const p = await getParticipant();
  if (!p) return NextResponse.json({ ok: false }, { status: 401 });

  const total = p.trial_plan?.length ?? 0;
  const { count } = await db
    .from("trials")
    .select("id", { count: "exact", head: true })
    .eq("participant_id", p.id)
    .eq("block", "main");

  const complete = total > 0 && (count ?? 0) >= total;
  if (!complete) return NextResponse.json({ ok: false, complete: false, next: "/experimento" });

  if (!p.finished_at) {
    await db
      .from("participants")
      .update({ current_step: "done", finished_at: new Date().toISOString(), updated_at: new Date().toISOString() })
      .eq("id", p.id);
  }

  let npaToken: string | undefined;
  if (p.country === "ES" && !p.npa_token_issued && npaEnabled()) {
    npaToken = makeNpaToken();
    setNpaCookie(npaToken);
    await db.from("participants").update({ npa_token_issued: true }).eq("id", p.id);
  }

  // El token también va en la respuesta: el navegador lo guarda en localStorage
  // por si la cookie no llega. No se guarda en esta base.
  return NextResponse.json({ ok: true, complete: true, next: "/fin", npaToken });
}
