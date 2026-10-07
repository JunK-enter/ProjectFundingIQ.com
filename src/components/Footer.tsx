import Link from "next/link";
import { disclosure, footerExplore, footerLegal, partnerTransition, partnerUrl } from "@/content/site";
import { Container } from "./Container";
import { Logo } from "./Logo";

async function currentYear() {
  "use cache";
  return new Date().getFullYear();
}

export async function Footer() {
  const year = await currentYear();

  return (
    <footer className="border-t border-white/10 bg-forest-deep text-cream">
      <Container className="py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/75">
              Funding education and resources for home improvement professionals.
            </p>
          </div>
          <nav aria-label="Footer">
            <p className="eyebrow text-gold">Explore</p>
            <ul className="mt-4 space-y-2.5">
              {footerExplore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/85 hover:text-cream"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="eyebrow text-gold">Partner program</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={partnerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-cream/85 hover:text-cream"
                >
                  Become a Partner
                  <span className="sr-only">
                    {" "}
                    (opens the HomeWealthIQ partner experience)
                  </span>
                </a>
              </li>
              {footerLegal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/85 hover:text-cream"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 max-w-xs text-xs leading-relaxed text-cream/55">
              {partnerTransition}
            </p>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="max-w-4xl text-sm leading-relaxed text-cream/65">
            {disclosure}
          </p>
          <p className="mt-6 text-sm text-cream/55">
            © {year} ProjectFundingIQ.
          </p>
        </div>
      </Container>
    </footer>
  );
}
