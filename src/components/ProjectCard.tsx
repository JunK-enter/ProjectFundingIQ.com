import Image from "next/image";
import type { ProjectCategory } from "@/content/projects";

export function ProjectCard({
  project,
  number,
  featured = false,
}: {
  project: ProjectCategory;
  number: number;
  featured?: boolean;
}) {
  return (
    <article
      className="group h-full overflow-hidden rounded-[14px] border border-line bg-paper motion-safe:transition-[box-shadow,border-color] motion-safe:duration-500 motion-safe:hover:border-forest/15 motion-safe:hover:shadow-[0_18px_40px_rgba(16,44,38,0.08)]"
    >
      <div
        className={`relative overflow-hidden ${
          featured ? "aspect-[16/10]" : "aspect-[4/3]"
        }`}
      >
        <Image
          src={project.image}
          alt={project.alt}
          fill
          sizes={
            featured
              ? "(min-width: 1024px) 50vw, 100vw"
              : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          }
          className="object-cover motion-safe:transition-transform motion-safe:duration-[900ms] motion-safe:ease-out motion-safe:group-hover:scale-[1.045]"
        />
      </div>
      <div className="flex items-baseline justify-between gap-3 px-4 py-3.5">
        <h3 className="font-serif text-xl text-ink">{project.title}</h3>
        <span className="eyebrow text-muted tabular-nums">
          {String(number).padStart(2, "0")}
        </span>
      </div>
    </article>
  );
}
