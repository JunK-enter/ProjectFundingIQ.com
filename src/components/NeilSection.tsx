import Image from "next/image";
import { CalendarDays, Mail, Phone } from "lucide-react";
import { contactEmail, contactPhone, neilTransition, neilUrl } from "@/content/site";
import { Button } from "./Button";
import { Container } from "./Container";
import { Reveal } from "./Reveal";

const contactLink =
  "group inline-flex items-center gap-3 text-[15px] text-ink transition-colors duration-300 hover:text-blue";

export function NeilSection() {
  return (
    <section id="contact" className="scroll-mt-20 py-20 md:py-28">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="relative mx-auto aspect-[4/5] max-w-sm overflow-hidden rounded-[14px] border border-line bg-navy">
              <Image
                src="/images/neil.jpg"
                alt="Neil Okun, partner contact for contractors exploring the program"
                fill
                sizes="(min-width: 1024px) 24rem, 90vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy via-navy/80 to-transparent px-7 pb-7 pt-24">
                <p className="eyebrow text-sky">Partner contact</p>
                <p className="mt-3 font-serif text-3xl text-white">Neil Okun</p>
                <p className="mt-2 max-w-[16rem] text-sm leading-relaxed text-white/80">
                  Partner contact for contractors exploring the program.
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={0.08}>
            <p className="eyebrow text-blue">Contact</p>
            <h2 className="mt-4 font-serif text-[2rem] leading-[1.15] text-balance text-ink sm:text-4xl">
              Questions before you join?
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
              Book a call with Neil, or reach Chloe by phone or email. Either
              way, you’ll talk with someone who can answer questions about the
              partner process.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col rounded-[14px] border border-line bg-white p-6">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-[10px] bg-tint text-blue">
                  <CalendarDays className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-5 font-serif text-2xl text-ink">Book with Neil</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">
                  Neil works with contractors and home improvement professionals
                  exploring the HomeWealthIQ partner program.
                </p>
                <div className="mt-auto pt-6">
                  <Button
                    href={neilUrl}
                    external
                    externalLabel="opens Neil’s calendar"
                    className="w-full"
                  >
                    Talk With Neil
                  </Button>
                  <p className="mt-3 text-sm text-muted">{neilTransition}</p>
                </div>
              </div>
              <div className="flex flex-col rounded-[14px] border border-line bg-white p-6">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-[10px] bg-tint text-blue">
                  <Phone className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-5 font-serif text-2xl text-ink">Call or email Chloe</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">
                  Prefer to reach out directly? Chloe can help with questions
                  and point you to the right next step.
                </p>
                <ul className="mt-auto space-y-3 pt-6">
                  <li>
                    <a href={contactPhone.href} className={contactLink}>
                      <Phone className="h-4 w-4 shrink-0 text-blue" aria-hidden />
                      <span className="underline-offset-4 group-hover:underline">
                        {contactPhone.display}
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${contactEmail}`} className={contactLink}>
                      <Mail className="h-4 w-4 shrink-0 text-blue" aria-hidden />
                      <span className="break-all underline-offset-4 group-hover:underline">
                        {contactEmail}
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
