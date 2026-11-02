import { Shell } from "@/components/Shell";
import { getParticipant } from "@/lib/session";
import { pathForStep } from "@/lib/flow";
import { Landing, type SessionState } from "./Landing";

export const dynamic = "force-dynamic";

export default async function Home() {
  const p = await getParticipant();
  let session: SessionState = { state: "new" };
  if (p?.finished_at) session = { state: "finished" };
  else if (p) session = { state: "inProgress", next: pathForStep(p.current_step) };

  return (
    <Shell>
      <Landing session={session} />
    </Shell>
  );
}
