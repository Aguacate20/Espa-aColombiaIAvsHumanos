import { redirect } from "next/navigation";
import { Shell } from "@/components/Shell";
import { getParticipant } from "@/lib/session";
import { CountryPicker } from "./CountryPicker";

export const dynamic = "force-dynamic";

export default async function Page() {
  const p = await getParticipant();
  if (!p) redirect("/");
  return (
    <Shell progress={0.1} step="Paso 1">
      <CountryPicker />
    </Shell>
  );
}
