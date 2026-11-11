import { Suspense } from "react";
import { Container } from "@/components/Container";
import { HeatmapViewer } from "@/components/HeatmapViewer";
import { pageMetadata } from "@/lib/seo";

export const metadata = {
  ...pageMetadata({
    title: "Click heatmap",
    description: "Internal click heatmap for ProjectFundingIQ.",
    path: "/insights/heatmap",
  }),
  robots: { index: false, follow: false },
};

function HeatmapFallback() {
  return (
    <p className="text-sm text-muted">Loading click map…</p>
  );
}

export default function HeatmapPage() {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <div className="max-w-3xl">
          <p className="eyebrow text-blue">Insights</p>
          <h1 className="mt-3 font-serif text-3xl text-ink sm:text-4xl">
            Click heatmap
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            See where people are clicking on the site. Clicks are collected
            anonymously as page path and position. This page is not linked in
            the public navigation.
          </p>
        </div>
        <div className="mt-10">
          <Suspense fallback={<HeatmapFallback />}>
            <HeatmapViewer />
          </Suspense>
        </div>
      </Container>
    </section>
  );
}
