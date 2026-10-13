import { ComparisonTable } from "@/components/ComparisonTable";
import { ContractorJourney } from "@/components/ContractorJourney";
import { HEAExplainer } from "@/components/HEAExplainer";
import { Hero } from "@/components/Hero";
import { LostProjects } from "@/components/LostProjects";
import { NeilSection } from "@/components/NeilSection";
import { PartnerCTA } from "@/components/PartnerCTA";
import { ProjectGrid } from "@/components/ProjectGrid";
import { ResourceGrid } from "@/components/ResourceGrid";
import { StallStory } from "@/components/StallStory";
import { TradeMarquee } from "@/components/TradeMarquee";
import { ValueColumns } from "@/components/ValueColumns";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TradeMarquee />
      <StallStory />
      <ProjectGrid />
      <HEAExplainer />
      <ComparisonTable />
      <ContractorJourney />
      <LostProjects />
      <ValueColumns />
      <ResourceGrid />
      <NeilSection />
      <PartnerCTA />
    </>
  );
}
