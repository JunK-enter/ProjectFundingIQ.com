import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "Placeholder privacy notice for ProjectFundingIQ, an educational site for home improvement contractors.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy">
        <p>A placeholder for the policy that should be reviewed before this site is treated as final.</p>
      </PageHero>
      <section className="pb-20">
        <Container className="max-w-3xl">
          <p className="rounded-[14px] border border-line bg-clay-soft px-4 py-3 text-sm leading-relaxed text-ink">
            Placeholder. This page describes the site as it is built today. It
            should be reviewed by qualified counsel before publication as a
            binding privacy policy.
          </p>
          <div className="mt-8 space-y-4 text-base leading-relaxed text-muted">
            <p>
              ProjectFundingIQ is an educational website for contractors and
              home improvement professionals. This version of the site does not
              ask you to create an account, and it does not include a database
              of customer records.
            </p>
            <p>
              If you choose “Become a Partner” or “Talk With Neil,” you leave
              this website for the HomeWealthIQ partner experience. That
              destination has its own privacy practices. ProjectFundingIQ does
              not control them.
            </p>
            <p>
              Basic technical information, such as the data a host uses to
              deliver pages, may be processed by the site’s hosting provider in
              the ordinary course of serving the website.
            </p>
            <p>
              This notice will be replaced when a reviewed privacy policy is
              ready. Until then, do not treat this page as a complete statement
              of legal rights or obligations.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
