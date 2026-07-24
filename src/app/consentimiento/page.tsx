import { redirect } from "next/navigation";
import { Shell } from "@/components/Shell";
import { getParticipant } from "@/lib/session";
import { consentFor } from "@/data/consent";
import { ConsentClient } from "./ConsentClient";

export const dynamic = "force-dynamic";

export default async function Page() {
  const p = await getParticipant();
  if (!p) redirect("/");
  if (!p.country) redirect("/pais");

  return (
    <Shell progress={0.18} step="Paso 2">
      <ConsentClient consent={consentFor(p.country)} />
    </Shell>
  );
}
