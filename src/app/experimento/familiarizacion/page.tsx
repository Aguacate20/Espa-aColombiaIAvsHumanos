import Link from "next/link";
import { redirect } from "next/navigation";
import { Shell, Title, Lead } from "@/components/Shell";
import { getParticipant } from "@/lib/session";
import { COPY } from "@/data/copy";

export const dynamic = "force-dynamic";

export default async function Page() {
  const p = await getParticipant();
  if (!p) redirect("/participante");
  if (!p.country) redirect("/pais");
  const c = COPY[p.country];

  const agents = [
    { name: c.agentIaName, desc: c.agentIaDesc },
    { name: c.agentHumanName, desc: c.agentHumanDesc },
  ];

  return (
    <Shell progress={0.42} step="4 de 5">
      <div className="fade-in">
        <Title>{c.familTitle}</Title>
        <Lead>{c.familLead}</Lead>

        {/* Presentación estrictamente simétrica: mismo peso visual para ambos */}
        <div className="grid sm:grid-cols-2 gap-4">
          {agents.map((a) => (
            <div key={a.name} className="border border-line rounded-sm p-6">
              <h2 className="font-display text-[21px] text-ink leading-snug">{a.name}</h2>
              <p className="mt-3 text-[15px] text-muted leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 max-w-measure text-[15px] text-muted">
          No hay respuestas correctas. Nos interesa a quién acudirías tú, no a quién sería “mejor” acudir.
        </p>

        <div className="mt-8 border-t border-line pt-8">
          <Link
            href="/experimento/practica"
            className="inline-flex items-center px-6 py-3 text-[15px] font-medium rounded-sm bg-brand text-white no-underline hover:bg-ink transition-colors"
          >
            {c.continueCta}
          </Link>
        </div>
      </div>
    </Shell>
  );
}
