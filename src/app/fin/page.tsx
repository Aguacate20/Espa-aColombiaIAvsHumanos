import { Shell, Title, Lead } from "@/components/Shell";
import { getParticipant } from "@/lib/session";
import { COPY } from "@/data/copy";

export const dynamic = "force-dynamic";

export default async function Page() {
  const p = await getParticipant();
  const c = COPY[p?.country ?? "CO"];

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
      </div>
    </Shell>
  );
}
