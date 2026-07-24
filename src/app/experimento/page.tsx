import { redirect } from "next/navigation";
import { getParticipant } from "@/lib/session";
import { db } from "@/lib/supabase";
import { SITUATION_BY_ID, publicSituation } from "@/data/situations";
import { buildTrialPlan } from "@/lib/trialPlan";
import { COPY } from "@/data/copy";
import { TrialsClient } from "./TrialsClient";

export const dynamic = "force-dynamic";

export default async function Page() {
  const p = await getParticipant();
  if (!p) redirect("/");
  if (!p.country) redirect("/pais");
  if (p.finished_at) redirect("/fin");

  const plan = p.trial_plan?.length ? p.trial_plan : buildTrialPlan(p.seed);

  const { data: done } = await db.from("trials").select("situation_id").eq("participant_id", p.id).eq("block", "main");
  const doneIds = new Set((done ?? []).map((r) => r.situation_id));
  const startIndex = plan.findIndex((t) => !doneIds.has(t.situationId));
  if (startIndex === -1) redirect("/fin");

  const trials = plan.map((t) => {
    const s = SITUATION_BY_ID.get(t.situationId)!;
    return { ...publicSituation(s, p.country!), left: t.left, right: t.right, humanGender: t.humanGender, i: t.i };
  });

  const c = COPY[p.country];
  return (
    <TrialsClient
      trials={trials}
      startIndex={startIndex}
      stimulusSet={p.stimulus_set ?? "hombre"}
      copy={{
        trialPrompt: c.trialPrompt, sliderHint: c.sliderHint, sliderUntouched: c.sliderUntouched,
        confidenceTitle: c.confidenceTitle, confidenceLow: c.confidenceLow, confidenceHigh: c.confidenceHigh,
        continueCta: c.continueCta, agentIa: c.agentIaName, agentHuman: c.agentHumanName,
      }}
    />
  );
}
