import { Shell } from "@/components/Shell";
import { DemographicsForm } from "./DemographicsForm";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Shell progress={0.08} step="1 de 5">
      <DemographicsForm />
    </Shell>
  );
}
