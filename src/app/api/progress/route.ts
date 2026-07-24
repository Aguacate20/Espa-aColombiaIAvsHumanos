import { NextResponse } from "next/server";
import { db } from "@/lib/supabase";
import { getParticipant } from "@/lib/session";

export const dynamic = "force-dynamic";

/** Estado actual del participante: en qué paso va y cuántos ensayos lleva. */
export async function GET() {
  const p = await getParticipant();
  if (!p) return NextResponse.json({ ok: false, participant: null });

  const { count } = await db
    .from("trials")
    .select("id", { count: "exact", head: true })
    .eq("participant_id", p.id)
    .eq("block", "main");

  return NextResponse.json({
    ok: true,
    participant: { code: p.code, country: p.country, step: p.current_step },
    trialsDone: count ?? 0,
    trialsTotal: p.trial_plan?.length ?? 0,
  });
}
