import { redirect } from "next/navigation";
import { getParticipant } from "@/lib/session";
import { PRACTICE_SITUATION, publicSituation } from "@/data/situations";
import { COPY } from "@/data/copy";
import { PracticeClient } from "./PracticeClient";

export const dynamic = "force-dynamic";

export default async function Page() {
  const p = await getParticipant();
  if (!p) redirect("/");
  if (!p.country) redirect("/pais");

  const c = COPY[p.country];
  return (
    <PracticeClient
      situation={publicSituation(PRACTICE_SITUATION, p.country)}
      stimulusSet={p.stimulus_set ?? "hombre"}
      copy={{
        practiceTitle: c.practiceTitle, practiceLead: c.practiceLead,
        trialPrompt: c.trialPrompt, sliderHint: c.sliderHint, sliderUntouched: c.sliderUntouched,
        confidenceTitle: c.confidenceTitle, confidenceLow: c.confidenceLow, confidenceHigh: c.confidenceHigh,
        continueCta: c.continueCta, backCta: c.backCta, agentIa: c.agentIaName, agentHuman: c.agentHumanName,
      }}
    />
  );
}
