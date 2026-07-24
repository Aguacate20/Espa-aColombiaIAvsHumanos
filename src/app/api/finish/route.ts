import { NextResponse } from "next/server";
import { db } from "@/lib/supabase";
import { getParticipant } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function POST() {
  const p = await getParticipant();
  if (!p) return NextResponse.json({ ok: false }, { status: 401 });

  await db
    .from("participants")
    .update({ current_step: "done", finished_at: new Date().toISOString(), updated_at: new Date().toISOString() })
    .eq("id", p.id);

  return NextResponse.json({ ok: true, next: "/fin" });
}
