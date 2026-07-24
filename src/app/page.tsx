import Link from "next/link";
import { Shell, Title, Lead } from "@/components/Shell";
import { getParticipant } from "@/lib/session";
import { pathForStep } from "@/lib/flow";
import { COPY } from "@/data/copy";

export const dynamic = "force-dynamic";

export default async function Home() {
  const p = await getParticipant();
  const c = COPY.CO; // aún no se ha elegido país
  const resumeHref = p && !p.finished_at ? pathForStep(p.current_step) : null;

  return (
    <Shell>
      <Title>{c.consentTitle}</Title>
      <Lead>{c.consentBody}</Lead>

      <div className="border-t border-line pt-8 flex flex-wrap gap-3">
        <Link
          href="/participante"
          className="inline-flex items-center px-6 py-3 text-[15px] font-medium rounded-sm bg-brand text-white no-underline hover:bg-ink transition-colors"
        >
          {c.consentCta}
        </Link>
        {resumeHref && (
          <Link
            href={resumeHref}
            className="inline-flex items-center px-6 py-3 text-[15px] font-medium rounded-sm border border-line text-ink no-underline hover:border-brand hover:text-brand transition-colors"
          >
            Retomar donde lo dejé
          </Link>
        )}
      </div>
    </Shell>
  );
}
