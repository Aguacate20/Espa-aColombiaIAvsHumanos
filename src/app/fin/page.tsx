import { redirect } from "next/navigation";
import { Shell, Title, Lead } from "@/components/Shell";
import { db } from "@/lib/supabase";
import { getParticipant } from "@/lib/session";
import { COPY } from "@/data/copy";
import { NpaBox } from "./NpaBox";
import { FinishSync } from "./FinishSync";

export const dynamic = "force-dynamic";

export default async function Page() {
  const p = await getParticipant();
  const c = COPY[p?.country ?? "CO"];

  // Si falta alguna situación por guardar, se vuelve a ella (solo a las que faltan).
  if (p && !p.finished_at && p.trial_plan?.length) {
    const { data: done } = await db.from("trials").select("situation_id").eq("participant_id", p.id).eq("block", "main");
    const doneIds = new Set((done ?? []).map((r) => r.situation_id));
    if (p.trial_plan.some((t) => !doneIds.has(t.situationId))) redirect("/experimento");
  }

  return (
    <Shell progress={1} step="Completado">
      <div className="fade-in">
        <Title>{c.doneTitle}</Title>
        <Lead>{c.doneBody}</Lead>
        {p && (
          <p className="text-[14px] text-muted">
            Tu código de participante es <span className="font-medium text-ink tabular-nums">{p.code}</span>. Guárdalo
            si quieres solicitar la eliminación de tus datos.
          </p>
        )}
        {p && p.country !== "ES" && <FinishSync />}
        {p?.country === "ES" && (
          <NpaBox
            copy={{
              npaTitle: c.npaTitle, npaLead: c.npaLead, npaLabel: c.npaLabel, npaRepeat: c.npaRepeat,
              npaMismatch: c.npaMismatch, npaInvalid: c.npaInvalid, npaSubmit: c.npaSubmit, npaSaved: c.npaSaved,
              npaAlready: c.npaAlready, npaLocked: c.npaLocked, npaDisabled: c.npaDisabled, npaError: c.npaError,
            }}
          />
        )}
      </div>
    </Shell>
  );
}
