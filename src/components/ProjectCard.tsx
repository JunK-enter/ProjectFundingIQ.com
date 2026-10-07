import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { ProjectCategory } from "@/content/projects";

export function ProjectCard({
  project,
  featured = false,
}: {
  project: ProjectCategory;
  featured?: boolean;
}) {
  return (
    <article
      className="group h-full overflow-hidden rounded-[14px] border border-line bg-paper"
    >
      <div
        className={`relative overflow-hidden ${
          featured ? "aspect-[16/10]" : "aspect-[5/4]"
        }`}
      >
        <Image
          src={project.image}
          alt={project.alt}
          fill
          sizes={
            featured
              ? "(min-width: 1024px) 50vw, 100vw"
              : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          }
          className="object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex items-center justify-between gap-3 px-4 py-3.5">
        <h3 className="font-serif text-xl text-ink">{project.title}</h3>
        <ArrowUpRight
          className="h-4 w-4 text-forest/70 motion-safe:transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
          aria-hidden
        />
      </div>
    </article>
  );
}
