import { NextResponse } from "next/server";
import { db } from "@/lib/supabase";
import { getParticipant, setStep } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function POST() {
  const p = await getParticipant();
  if (!p) return NextResponse.json({ ok: false, error: "sin sesión" }, { status: 401 });

  await db
    .from("participants")
    .update({ consent: true, consent_at: new Date().toISOString(), current_step: "demographics", updated_at: new Date().toISOString() })
    .eq("id", p.id);

  return NextResponse.json({ ok: true, next: "/participante" });
}
