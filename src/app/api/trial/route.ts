import { NextResponse } from "next/server";
import { db } from "@/lib/supabase";
import { getParticipant, setStep } from "@/lib/session";
import { categoryOf } from "@/data/situations";
import { toPreferenceIa, toChoice } from "@/lib/trialPlan";

export const dynamic = "force-dynamic";

/** Guarda un ensayo. La CATEGORÍA se resuelve en el servidor: nunca llega al cliente. */
export async function POST(req: Request) {
  const p = await getParticipant();
  if (!p) return NextResponse.json({ ok: false, error: "sin sesión" }, { status: 401 });

  const b = await req.json();
  const category = categoryOf(b.situationId);
  if (!category) return NextResponse.json({ ok: false, error: "situación desconocida" }, { status: 400 });

  const slider = Math.max(0, Math.min(100, Math.round(b.sliderValue)));
  const preferenceIa = toPreferenceIa(slider, b.left);

  const { error } = await db.from("trials").upsert(
    {
      participant_id: p.id,
      block: b.block ?? "main",
      trial_index: b.trialIndex,
      situation_id: b.situationId,
      situation_category: category,
      left_agent: b.left,
      right_agent: b.right,
      human_agent_gender: b.humanGender ?? null,
      slider_value: slider,
      preference_ia: preferenceIa,
      choice: toChoice(preferenceIa),
      slider_moves: b.sliderMoves ?? null,
      rt_ms: b.rtMs ?? null,
      confidence: Math.max(0, Math.min(10, Math.round(b.confidence))),
      confidence_rt_ms: b.confidenceRtMs ?? null,
    },
    { onConflict: "participant_id,block,situation_id" },
  );

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  if ((b.block ?? "main") === "practice") await setStep(p.id, "trials");
  return NextResponse.json({ ok: true });
}
