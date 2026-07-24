import { redirect } from "next/navigation";
import { getParticipant } from "@/lib/session";
import { COPY } from "@/data/copy";
import { FamiliarizationClient } from "./FamiliarizationClient";

export const dynamic = "force-dynamic";

export default async function Page() {
  const p = await getParticipant();
  if (!p) redirect("/");
  if (!p.country) redirect("/pais");
  const c = COPY[p.country];

  return (
    <FamiliarizationClient
      stimulusSet={p.stimulus_set ?? "hombre"}
      copy={{
        intro: c.familIntro,
        iaName: c.agentIaName, iaDesc: c.agentIaDesc,
        humanName: c.agentHumanName, humanDesc: c.agentHumanDesc,
        humanNote: c.familHumanNote, humanNoteTouch: c.familHumanNoteTouch,
        continueCta: c.continueCta, backCta: c.backCta,
      }}
    />
  );
}
