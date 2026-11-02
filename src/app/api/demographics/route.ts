import { NextResponse } from "next/server";
import { db } from "@/lib/supabase";
import { getParticipant, setStep } from "@/lib/session";
import { buildTrialPlan } from "@/lib/trialPlan";
import { stimulusSetFor } from "@/data/stimuli";
import { MH_STATUS, MH_DIAGNOSED, MH_CONDITIONS } from "@/data/copy";

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
  const d = (b.deviceInfo ?? {}) as Record<string, unknown>;
  const num = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? v : null);
  const bool = (v: unknown) => (typeof v === "boolean" ? v : null);
  const str = (v: unknown, n = 60) => (typeof v === "string" ? v.slice(0, n) : null);
  const reported = ["pc", "movil", "tableta"].includes(b.deviceReported) ? b.deviceReported : null;
  const stimulusSet = stimulusSetFor(b.gender ?? null, p.seed);
  const plan = p.trial_plan?.length ? p.trial_plan : buildTrialPlan(p.seed);

  // Titulación y salud psicológica (migración 007). Solo se aceptan las opciones del formulario.
  const extra = {
    degree: str(b.degree, 120),
    mh_status: MH_STATUS.includes(b.mhStatus) ? b.mhStatus : null,
    mh_diagnosed: MH_DIAGNOSED.includes(b.mhDiagnosed) ? b.mhDiagnosed : null,
    mh_conditions: Array.isArray(b.mhConditions) ? MH_CONDITIONS.filter((c) => b.mhConditions.includes(c)) : null,
    mh_other: str(b.mhOther, 120),
  };

  const base = {
    age: b.age ?? null,
    gender: b.gender ?? null,
    gender_other: b.genderOther ?? null,
    education: b.education ?? null,
    occupation: b.occupation ?? null,
    ai_use_frequency: b.aiUse ?? null,
    screen_time: b.screenTime ?? null,
    // ---- dispositivo (ver src/lib/deviceInfo.ts) ----
    device_reported: reported,
    device_detected: str(d.deviceDetected, 10),
    pointer_coarse: bool(d.pointerCoarse),
    any_pointer_coarse: bool(d.anyPointerCoarse),
    any_pointer_fine: bool(d.anyPointerFine),
    hover_none: bool(d.hoverNone),
    max_touch_points: num(d.maxTouchPoints),
    screen_w: num(d.screenW),
    screen_h: num(d.screenH),
    viewport_w: num(d.viewportW),
    viewport_h: num(d.viewportH),
    device_pixel_ratio: num(d.devicePixelRatio),
    orientation: str(d.orientation, 12),
    ua_mobile: bool(d.uaMobile),
    platform: str(d.platform, 40),
    user_agent: req.headers.get("user-agent")?.slice(0, 400) ?? null,
    stimulus_set: stimulusSet,
    trial_plan: plan,
    current_step: "ceia9",
    updated_at: new Date().toISOString(),
  };

  let { error } = await db.from("participants").update({ ...base, ...extra }).eq("id", p.id);
  // Si aún no se ha aplicado la migración 007, se guarda lo demás para no bloquear al participante.
  if (error && /mh_|degree|column/i.test(error.message)) {
    console.error("demographics: faltan columnas de la migración 007:", error.message);
    ({ error } = await db.from("participants").update(base).eq("id", p.id));
  }

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, next: "/escalas/ceia9" });
}
