import Image from "next/image";
import { Container } from "@/components/Container";
import { NeilSection } from "@/components/NeilSection";
import { PageHero } from "@/components/PageHero";
import { PartnerCTA } from "@/components/PartnerCTA";
import { futureAudiencePages } from "@/content/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description:
    "ProjectFundingIQ helps home improvement contractors understand Home Equity Agreements and connect with the HomeWealthIQ partner experience.",
  path: "/about",
});

const weDo = [
  "Explain Home Equity Agreements in language built for contractors.",
  "Show where the option may belong in a stalled project conversation.",
  "Separate the contractor’s role from the provider’s role.",
  "Point interested contractors to the HomeWealthIQ partner experience.",
];

const weDont = [
  "Make funding or qualification decisions.",
  "Guarantee approval, funding, pricing, or a recovered project.",
  "Provide legal, tax, or financial advice.",
  "Replace the provider’s disclosures or contract.",
  "Present ProjectFundingIQ as a lender.",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Helping contractors have better funding conversations."
        image={{
          src: "/images/residence.jpg",
          alt: "A shingle home with a wide front porch in daylight",
        }}
      >
        <p>
          Many home improvement projects do not stop because the homeowner
          doesn’t want the work. Sometimes the funding structure simply doesn’t
          fit.
        </p>
      </PageHero>

      <section className="border-t border-line py-16 md:py-20">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-3xl text-ink sm:text-4xl">Our purpose</h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-muted">
              <p>
                ProjectFundingIQ exists to help contractors understand another
                option they may be able to introduce when a customer wants the
                project and a traditional monthly payment does not.
              </p>
              <p>
                The point is a clearer conversation. Not a harder close, and
                not a promise that yesterday’s estimate will start next week.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[14px]">
            <Image
              src="/images/bath.jpg"
              alt="A renovated residential bathroom with a glass shower"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      <section className="bg-paper py-16 md:py-20">
        <Container>
          <h2 className="font-serif text-3xl text-ink sm:text-4xl">Who we serve</h2>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Home improvement professionals working on real residential
            projects: solar, roofing, ADUs, remodeling, HVAC, electrical,
            windows, doors, and outdoor work.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {futureAudiencePages.map((audience) => (
              <li key={audience.slug} className="rounded-[14px] border border-line bg-cream p-5">
                <h3 className="font-serif text-xl text-ink">{audience.audience}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{audience.summary}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container className="grid gap-6 md:grid-cols-2">
          <article className="rounded-[14px] border border-line bg-paper p-6 sm:p-8">
            <h2 className="font-serif text-2xl text-ink">What we do</h2>
            <ul className="mt-5 space-y-3">
              {weDo.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-forest" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-[14px] bg-forest p-6 text-cream sm:p-8">
            <h2 className="font-serif text-2xl">What we don’t do</h2>
            <ul className="mt-5 space-y-3">
              {weDont.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-cream/80">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </Container>
      </section>

      <section className="bg-sage py-16 md:py-20">
        <Container className="max-w-3xl">
          <h2 className="font-serif text-3xl text-ink sm:text-4xl">
            The HomeWealthIQ relationship
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            ProjectFundingIQ helps contractors learn about and connect with the
            HomeWealthIQ partner experience. Program details, eligibility, and
            funding decisions belong to the applicable provider. Visiting a
            partner page is a separate step, and that destination is labeled
            before you leave this site.
          </p>
        </Container>
      </section>

      <NeilSection />
      <PartnerCTA />
    </>
  );
}
