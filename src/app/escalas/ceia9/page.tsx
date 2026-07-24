import { redirect } from "next/navigation";
import { Shell } from "@/components/Shell";
import { getParticipant } from "@/lib/session";
import { Ceia9Form } from "./Ceia9Form";

export const dynamic = "force-dynamic";

export default async function Page() {
  const p = await getParticipant();
  if (!p) redirect("/participante");
  if (!p.country) redirect("/pais");

  return <Ceia9Form country={p.country} />;
}
