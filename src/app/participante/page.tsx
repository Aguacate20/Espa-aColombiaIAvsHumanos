import { redirect } from "next/navigation";
import { Shell } from "@/components/Shell";
import { getParticipant } from "@/lib/session";
import { preItemsInOrder, PRE_ANCHORS, PRE_INSTRUCTIONS } from "@/data/scales/pretrust";
import { DemographicsForm, type DemoInitial } from "./DemographicsForm";
import { db } from "@/lib/supabase";
import { OPTIONS, DEVICE_CODES } from "@/data/copy";

export const dynamic = "force-dynamic";

export default async function Page() {
  const p = await getParticipant();
  if (!p) redirect("/");
  if (!p.country) redirect("/pais");
  if (!p.consent) redirect("/consentimiento");

  const preItems = preItemsInOrder(p.seed).map((it) => ({ code: it.code, text: it.text[p.country!] }));

  // Si vuelve con «Atrás», el formulario aparece con lo que ya había respondido.
  const { data: d } = await db
    .from("participants")
    .select("*")
    .eq("id", p.id)
    .maybeSingle();
  const devIdx = DEVICE_CODES.indexOf(d?.device_reported as (typeof DEVICE_CODES)[number]);
  const initial: DemoInitial = {
    age: d?.age ? String(d.age) : "",
    gender: d?.gender ?? "",
    genderOther: d?.gender_other ?? "",
    education: d?.education ?? "",
    degree: d?.degree ?? "",
    occupation: d?.occupation ?? "",
    aiUse: d?.ai_use_frequency ?? "",
    screenTime: d?.screen_time ?? "",
    device: devIdx >= 0 ? OPTIONS[p.country].device[devIdx] : "",
    mhStatus: d?.mh_status ?? "",
    mhDiagnosed: d?.mh_diagnosed ?? "",
    mhOther: d?.mh_other ?? "",
    mhConditions: Array.isArray(d?.mh_conditions) ? d.mh_conditions : [],
  };

  return (
    <Shell progress={0.28} step="Paso 3">
      <DemographicsForm initial={initial} country={p.country} preItems={preItems} preAnchors={PRE_ANCHORS} preInstructions={PRE_INSTRUCTIONS} />
    </Shell>
  );
}
