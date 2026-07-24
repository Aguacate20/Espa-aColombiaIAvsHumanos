import { NextResponse } from "next/server";
import { db } from "@/lib/supabase";
import { getParticipant } from "@/lib/session";
import { buildTrialPlan } from "@/lib/trialPlan";

export const dynamic = "force-dynamic";

/**
 * Fija el país y CONGELA el plan de ensayos.
 * A partir de aquí el orden y los lados no vuelven a cambiar, aunque el
 * participante cierre el navegador y regrese días después.
 */
export async function POST(req: Request) {
  const p = await getParticipant();
  if (!p) return NextResponse.json({ ok: false, error: "sin sesión" }, { status: 401 });

  const { country } = await req.json();
  if (country !== "CO" && country !== "ES") {
    return NextResponse.json({ ok: false, error: "país inválido" }, { status: 400 });
  }

  const plan = p.trial_plan ?? buildTrialPlan(p.seed);
  const code = p.code.startsWith(`${country}-`) ? p.code : `${country}-${p.code.split("-")[1]}`;

  const { error } = await db
    .from("participants")
    .update({ country, code, trial_plan: plan, current_step: "ceia9", updated_at: new Date().toISOString() })
    .eq("id", p.id);

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, next: "/escalas/ceia9" });
}
