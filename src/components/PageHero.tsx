import Image from "next/image";
import type { ReactNode } from "react";
import { Container } from "./Container";

export function PageHero({
  eyebrow,
  title,
  children,
  image,
}: {
  eyebrow?: string;
  title: ReactNode;
  children?: ReactNode;
  image?: { src: string; alt: string };
}) {
  return (
    <section className="pb-12 pt-8 md:pb-16 md:pt-14">
      <Container>
        <div className={image ? "grid items-end gap-8 lg:grid-cols-12 lg:gap-12" : ""}>
          <div className={image ? "lg:col-span-7" : "max-w-3xl"}>
            {eyebrow ? <p className="eyebrow text-forest">{eyebrow}</p> : null}
            <h1 className="mt-3 font-serif text-[2.15rem] leading-[1.14] text-balance text-ink sm:text-5xl">
              {title}
            </h1>
            {children ? (
              <div className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                {children}
              </div>
            ) : null}
          </div>
          {image ? (
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[14px]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
