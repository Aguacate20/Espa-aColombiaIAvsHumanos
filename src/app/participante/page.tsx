import { redirect } from "next/navigation";
import { Shell } from "@/components/Shell";
import { getParticipant } from "@/lib/session";
import { preItemsInOrder, PRE_ANCHORS, PRE_INSTRUCTIONS } from "@/data/scales/pretrust";
import { DemographicsForm } from "./DemographicsForm";

export const dynamic = "force-dynamic";

export default async function Page() {
  const p = await getParticipant();
  if (!p) redirect("/");
  if (!p.country) redirect("/pais");
  if (!p.consent) redirect("/consentimiento");

  const preItems = preItemsInOrder(p.seed).map((it) => ({ code: it.code, text: it.text[p.country!] }));

  return (
    <Shell progress={0.28} step="Paso 3">
      <DemographicsForm country={p.country} preItems={preItems} preAnchors={PRE_ANCHORS} preInstructions={PRE_INSTRUCTIONS} />
    </Shell>
  );
}
