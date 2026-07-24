import { NextResponse } from "next/server";
import { db } from "@/lib/supabase";
import { setParticipantCookie, getParticipant, setStep } from "@/lib/session";
import { makeSeed, makeParticipantCode } from "@/lib/rng";

export const dynamic = "force-dynamic";

/** Crea el participante con sus datos demográficos y abre la sesión. */
export async function POST(req: Request) {
  const body = await req.json();

  const existing = await getParticipant();
  if (existing) {
    await db
      .from("participants")
      .update({
        age: body.age ?? null,
        gender: body.gender ?? null,
        gender_other: body.genderOther ?? null,
        education: body.education ?? null,
        occupation: body.occupation ?? null,
        email: body.email ?? null,
        ai_use_frequency: body.aiUse ?? null,
        consent: true,
        updated_at: new Date().toISOString(),
      })
      .eq("id", existing.id);
    await setStep(existing.id, "country");
    return NextResponse.json({ ok: true, code: existing.code, next: "/pais" });
  }

  const { data, error } = await db
    .from("participants")
    .insert({
      code: makeParticipantCode(),
      seed: makeSeed(),
      current_step: "country",
      age: body.age ?? null,
      gender: body.gender ?? null,
      gender_other: body.genderOther ?? null,
      education: body.education ?? null,
      occupation: body.occupation ?? null,
      email: body.email ?? null,
      ai_use_frequency: body.aiUse ?? null,
      consent: true,
      user_agent: req.headers.get("user-agent")?.slice(0, 400) ?? null,
    })
    .select("id, code")
    .single();

  if (error || !data) {
    return NextResponse.json({ ok: false, error: error?.message ?? "insert failed" }, { status: 500 });
  }

  await setParticipantCookie(data.id);
  return NextResponse.json({ ok: true, code: data.code, next: "/pais" });
}
