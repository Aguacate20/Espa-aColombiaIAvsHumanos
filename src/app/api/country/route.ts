import { NextResponse } from "next/server";
import { db } from "@/lib/supabase";
import { getParticipant } from "@/lib/session";
import { buildTrialPlan } from "@/lib/trialPlan";

export const dynamic = "force-dynamic";

/** Fija el país. El plan de ensayos NO se congela aquí, sino cuando ya se
 *  conoce el sexo (en /api/demographics), porque el plan depende de él. */
export async function POST(req: Request) {
  const p = await getParticipant();
  if (!p) return NextResponse.json({ ok: false, error: "sin sesión" }, { status: 401 });

  const { country } = await req.json();
  if (country !== "CO" && country !== "ES") {
    return NextResponse.json({ ok: false, error: "país inválido" }, { status: 400 });
  }

  const code = p.code.includes("-") && p.code.startsWith(`${country}-`) ? p.code : `${country}-${p.code.split("-").pop()}`;
  const nextStep = p.consent ? "demographics" : "consent";

  const { error } = await db
    .from("participants")
    .update({ country, code, current_step: nextStep, updated_at: new Date().toISOString() })
    .eq("id", p.id);

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, next: p.consent ? "/participante" : "/consentimiento" });
}
