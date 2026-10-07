import type { ReactNode } from "react";
import { projectCategories } from "@/content/projects";
import { projectDisclaimer } from "@/content/site";
import { Container } from "./Container";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

export function ProjectGrid({
  id = "project-types",
  eyebrow = "Built for home improvement",
  title = (
    <>
      One funding conversation. Many kinds of projects.
    </>
  ),
  intro = "ProjectFundingIQ is designed for professionals improving residential properties.",
}: {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  intro?: string;
}) {
  return (
    <section id={id} className="bg-paper py-20 md:py-28">
      <Container>
        <SectionHeader eyebrow={eyebrow} title={title}>
          {intro}
        </SectionHeader>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {projectCategories.map((project, index) => (
            <Reveal
              key={project.title}
              delay={Math.min(index * 0.04, 0.2)}
              className={index < 2 ? "sm:col-span-2" : undefined}
            >
              <ProjectCard project={project} featured={index < 2} />
            </Reveal>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted">
          {projectDisclaimer}
        </p>
      </Container>
    </section>
  );
}
