import { NextResponse } from "next/server";
import { db } from "@/lib/supabase";
import { getParticipant, setStep } from "@/lib/session";
import { SUBSCALE_BY_CODE } from "@/data/scales/registry";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const p = await getParticipant();
  if (!p) return NextResponse.json({ ok: false, error: "sin sesión" }, { status: 401 });

  const { scale, answers, order, pageRtMs, nextStepAfter } = (await req.json()) as {
    scale: string;
    answers: Record<string, number>;
    order?: Record<string, number>;
    pageRtMs?: number;
    nextStepAfter?: string;
  };

  const rows = Object.entries(answers).map(([item_code, value]) => ({
    participant_id: p.id,
    scale,
    subscale: SUBSCALE_BY_CODE.get(item_code) ?? null,
    item_code,
    value,
    presented_index: order?.[item_code] ?? null,
    page_rt_ms: pageRtMs ?? null,
    answered_at: new Date().toISOString(),
  }));

  if (rows.length) {
    const { error } = await db.from("scale_responses").upsert(rows, { onConflict: "participant_id,scale,item_code" });
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  if (nextStepAfter) await setStep(p.id, nextStepAfter);
  return NextResponse.json({ ok: true });
}

export async function GET(req: Request) {
  const p = await getParticipant();
  if (!p) return NextResponse.json({ ok: false }, { status: 401 });
  const scale = new URL(req.url).searchParams.get("scale") ?? "CEIA9";

  const { data } = await db
    .from("scale_responses")
    .select("item_code, value")
    .eq("participant_id", p.id)
    .eq("scale", scale);

  const answers: Record<string, number> = {};
  (data ?? []).forEach((r) => (answers[r.item_code] = r.value));
  return NextResponse.json({ ok: true, answers });
}
