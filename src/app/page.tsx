import { Shell } from "@/components/Shell";
import { Landing } from "./Landing";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <Shell>
      <Landing />
    </Shell>
  );
}
