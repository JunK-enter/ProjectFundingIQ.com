import Link from "next/link";
import { Container } from "@/components/Container";
import { ContractorJourney } from "@/components/ContractorJourney";
import { FaqList } from "@/components/FaqList";
import { LostProjects } from "@/components/LostProjects";
import { PageHero } from "@/components/PageHero";
import { PartnerCTA } from "@/components/PartnerCTA";
import { ProjectGrid } from "@/components/ProjectGrid";
import { RoleColumns } from "@/components/RoleColumns";
import { contractorFaqs } from "@/content/faqs";
import { futureAudiencePages } from "@/content/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "For Contractors",
  description:
    "For home improvement contractors whose customers want the project, but hesitate because another monthly payment does not fit.",
  path: "/for-contractors",
});

export default function ForContractorsPage() {
  return (
    <>
      <PageHero
        eyebrow="For contractors"
        title={
          <>
            The project was wanted. The funding didn’t fit.
          </>
        }
        image={{
          src: "/images/roofing.jpg",
          alt: "Two roofers measuring a residential shingle roof",
        }}
      >
        <p>
          Contractors run into this every week. The homeowner likes the scope,
          trusts the crew, and still pauses because another monthly payment
          does not fit the way they want to pay for the work.
        </p>
      </PageHero>

      <section className="border-t border-line py-16 md:py-20">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow text-forest">Why projects stall</p>
            <h2 className="mt-3 font-serif text-3xl text-ink sm:text-4xl">
              The work was never the objection.
            </h2>
          </div>
          <div className="space-y-4 text-lg leading-relaxed text-muted lg:col-span-7">
            <p>
              You already earned the conversation. The estimate is in the CRM.
              The site visit happened. The homeowner said the project made
              sense. Then the funding path asked for a payment they did not
              want to add.
            </p>
            <p>
              That stall is common for solar and battery installers, roofers,
              ADU builders, remodelers, HVAC contractors, electricians, window
              and door companies, and other home improvement businesses. The
              trades differ. The sentence at the kitchen table often does not.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-paper py-16 md:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="eyebrow text-forest">Where an HEA may enter</p>
              <h2 className="mt-3 font-serif text-3xl text-ink sm:text-4xl">
                After the yes, when the payment is the pause.
              </h2>
            </div>
            <div className="lg:col-span-7">
              <p className="text-lg leading-relaxed text-muted">
                A Home Equity Agreement may give an eligible homeowner another
                option to explore when traditional financing does not fit. It
                is not a rescue for every lost lead, and it is not a product
                you underwrite. It is a funding structure worth understanding
                so you can mention it accurately, then let the provider take
                the conversation.
              </p>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {futureAudiencePages.map((audience) => (
                  <li key={audience.slug} className="border-t border-line pt-4">
                    <p className="font-medium text-ink">{audience.audience}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {audience.summary}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <ProjectGrid
        id="project-types"
        eyebrow="Project categories"
        title="If you improve homes, the stall will look familiar."
        intro="The same funding hesitation shows up across residential work. These examples are illustrative, not a list of approved project types."
      />

      <section className="py-16 md:py-20">
        <Container>
          <h2 className="max-w-2xl font-serif text-3xl text-ink sm:text-4xl">
            Keep the roles separate.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            You remain the contractor. The funding provider remains responsible
            for qualification and the contract.
          </p>
          <div className="mt-8">
            <RoleColumns />
          </div>
        </Container>
      </section>

      <LostProjects
        id="stalled-estimates"
        eyebrow="Revisiting stalled estimates"
        title="The next conversation may already be in your pipeline."
        showCta={false}
        intro="These are illustrations of the kind of job that stalls. They are not a claim that any of them would qualify."
      />

      <section id="introduce" className="bg-paper py-16 md:py-20">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow text-forest">How to introduce it</p>
            <h2 className="mt-3 font-serif text-3xl text-ink sm:text-4xl">
              Say less than you think you need to.
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="text-lg leading-relaxed text-muted">
              Mention the option when another monthly payment is the reason a
              wanted project is waiting. Then stop. You do not need a rate, a
              term, or a prediction.
            </p>
            <blockquote className="mt-6 border-l-2 border-gold pl-5">
              <p className="font-serif text-xl italic leading-relaxed text-ink sm:text-2xl">
                “If another monthly payment is what is holding this, some
                eligible homeowners look at a Home Equity Agreement. I don’t
                decide who qualifies. The provider explains the contract if you
                want to learn more.”
              </p>
            </blockquote>
            <p className="mt-4 text-sm text-muted">
              An example of plain language, not a required script.
            </p>
            <p className="mt-6">
              <Link
                href="/resources/how-contractors-introduce-an-hea"
                className="inline-flex min-h-11 items-center font-medium text-forest"
              >
                Read the conversation guide →
              </Link>
            </p>
          </div>
        </Container>
      </section>

      <ContractorJourney showCta={false} />

      <section className="py-16 md:py-20">
        <Container>
          <h2 className="font-serif text-3xl text-ink sm:text-4xl">
            Questions contractors ask first
          </h2>
          <div className="mt-8">
            <FaqList items={contractorFaqs} idPrefix="contractor" />
          </div>
        </Container>
      </section>

      <PartnerCTA
        title="Give another project another conversation."
        body="Join the partner program when you want to learn how this option can sit beside the estimates you already have."
      />
    </>
  );
}
