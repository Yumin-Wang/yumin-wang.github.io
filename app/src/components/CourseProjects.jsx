import Reveal from "./ui/Reveal";
import { SectionHeading, Card, Tag, colorVar } from "./ui/primitives";
import { courseProjects } from "../data/content";

export default function CourseProjects() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <Reveal>
        <SectionHeading
          eyebrow="Also shipped"
          title="Course & side projects"
          subtitle="Smaller in scope, still real analyses — from a CNN reading X-rays to spatial statistics on a pandemic."
        />
      </Reveal>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {courseProjects.map((p, i) => (
          <Reveal key={p.title} delay={(i % 3) * 0.08}>
            <Card className="h-full">
              <div className="h-1 w-8 rounded-full" style={{ background: colorVar(p.color) }} />
              <h3 className="mt-4 font-display text-base font-semibold leading-snug text-ink">{p.title}</h3>
              <p className="mt-1 text-xs text-ink-muted">{p.org}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-secondary">{p.description}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <Tag key={t} color={p.color}>
                    {t}
                  </Tag>
                ))}
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
