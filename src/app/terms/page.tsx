import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms",
  description:
    "Placeholder terms for ProjectFundingIQ, an educational site for home improvement contractors.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms">
        <p>A placeholder for terms that should be reviewed before this site is treated as final.</p>
      </PageHero>
      <section className="pb-20">
        <Container className="max-w-3xl">
          <p className="rounded-[14px] border border-line bg-clay-soft px-4 py-3 text-sm leading-relaxed text-ink">
            Placeholder. These notes describe how the site is meant to be used.
            They are not a finished terms-of-use agreement and should be
            reviewed by qualified counsel.
          </p>
          <div className="mt-8 space-y-4 text-base leading-relaxed text-muted">
            <p>
              ProjectFundingIQ publishes educational information for contractors
              and home improvement professionals. Nothing on this site is an
              offer of credit, a commitment to fund a project, or a statement
              that any homeowner will qualify.
            </p>
            <p>
              Funding availability, eligibility, fees, liens, settlement, and
              other requirements are determined by the applicable provider and
              the contractual agreement. Examples on the site are illustrative.
            </p>
            <p>
              Links to the HomeWealthIQ partner experience leave this website.
              The partner experience is governed by its own terms. ProjectFundingIQ
              does not make the provider’s funding decision.
            </p>
            <p>
              Do not rely on this page as legal, tax, or financial advice. A
              reviewed terms document should replace this placeholder before
              the site is held out as complete.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
