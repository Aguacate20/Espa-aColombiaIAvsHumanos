import { notFound, redirect } from "next/navigation";
import { getParticipant } from "@/lib/session";
import { SCALE_BY_ID } from "@/data/scales/registry";
import { GenericScaleForm } from "./GenericScaleForm";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { scale: string } }) {
  const p = await getParticipant();
  if (!p) redirect("/");
  if (!p.country) redirect("/pais");

  const scale = SCALE_BY_ID.get(params.scale.toLowerCase());
  if (!scale) notFound();

  // Serializa solo lo que el cliente necesita, ya resuelto al país.
  const country = p.country;
  const view = {
    id: scale.id,
    title: scale.title[country],
    instructions: scale.instructions[country],
    scaleNote: scale.scaleNote?.[country] ?? null,
    anchors: scale.anchors[country],
    items: scale.items.map((it) => ({ code: it.code, text: it.text[country] })),
  };

  return <GenericScaleForm scale={view} />;
}
