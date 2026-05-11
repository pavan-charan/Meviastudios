import { Hero } from "@/components/sections/Hero";
import { CreatorToProblem } from "@/components/sections/CreatorToProblem";
import { Solution } from "@/components/sections/Solution";
import { FeaturesToEcosystem } from "@/components/sections/FeaturesToEcosystem";
import { MeviaFeaturesFlow } from "@/components/sections/MeviaFeaturesFlow";
import { BulkImport } from "@/components/sections/BulkImport";
import { Stats } from "@/components/sections/Stats";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col overflow-clip bg-bg-primary">
      <Hero />
      <CreatorToProblem />
      <Solution />
      <FeaturesToEcosystem />
      <MeviaFeaturesFlow />
      <BulkImport />
      <Stats />
      <CTA />
    </main>
  );
}
// Force rebuild
