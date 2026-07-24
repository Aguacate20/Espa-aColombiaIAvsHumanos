import { NextResponse } from "next/server";
import { db } from "@/lib/supabase";
import { getParticipant, setStep } from "@/lib/session";
import { categoryOf } from "@/data/situations";
import { toPreferenceIa, toChoice } from "@/lib/trialPlan";

export const dynamic = "force-dynamic";

/**
 * Guarda un ensayo completo (elección + confianza).
 *
 * La CATEGORÍA se resuelve aquí, en el servidor, a partir del situation_id.
 * El cliente nunca la conoce ni la envía, así que no puede filtrarse a la
 * interfaz ni contaminar la respuesta del participante.
 */
export async function POST(req: Request) {
  const p = await getParticipant();
  if (!p) return NextResponse.json({ ok: false, error: "sin sesión" }, { status: 401 });

  const b = (await req.json()) as {
    block?: "practice" | "main";
    trialIndex: number;
    situationId: string;
    left: "ia" | "humano";
    right: "ia" | "humano";
    sliderValue: number;
    sliderMoves?: number;
    rtMs?: number;
    confidence: number;
    confidenceRtMs?: number;
  };

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
