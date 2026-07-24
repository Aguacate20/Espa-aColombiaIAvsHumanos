import { NextResponse } from "next/server";
import { db } from "@/lib/supabase";
import { getParticipant, setStep } from "@/lib/session";
import { buildTrialPlan } from "@/lib/trialPlan";
import { stimulusSetFor } from "@/data/stimuli";

export const dynamic = "force-dynamic";

/**
 * Guarda sociodemográficos y CONGELA el plan de ensayos.
 * Se hace aquí y no antes porque el plan incluye el sexo del interlocutor
 * humano, y el juego de imágenes (stimulus_set) depende del sexo declarado.
 */
export async function POST(req: Request) {
  const p = await getParticipant();
  if (!p) return NextResponse.json({ ok: false, error: "sin sesión" }, { status: 401 });

  const b = await req.json();
  const stimulusSet = stimulusSetFor(b.gender ?? null, p.seed);
  const plan = p.trial_plan?.length ? p.trial_plan : buildTrialPlan(p.seed);

  const { error } = await db
    .from("participants")
    .update({
      age: b.age ?? null,
      gender: b.gender ?? null,
      gender_other: b.genderOther ?? null,
      education: b.education ?? null,
      occupation: b.occupation ?? null,
      email: b.email ?? null,
      ai_use_frequency: b.aiUse ?? null,
      screen_time: b.screenTime ?? null,
      stimulus_set: stimulusSet,
      trial_plan: plan,
      current_step: "ceia9",
      updated_at: new Date().toISOString(),
    })
    .eq("id", p.id);

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, next: "/escalas/ceia9" });
}
