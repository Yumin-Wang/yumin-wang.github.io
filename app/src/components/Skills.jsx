import Reveal from "./ui/Reveal";
import { SectionHeading, Card, colorVar } from "./ui/primitives";
import { skillGroups } from "../data/content";

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-20">
      <Reveal>
        <SectionHeading
          eyebrow="Toolkit"
          title="What I actually build with"
          subtitle="Machine learning and applied statistics share the same spine — the same rigor that ships models also designs experiments and derives estimators."
        />
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-2">
        {skillGroups.map((g, i) => (
          <Reveal key={g.title} delay={i * 0.08}>
            <Card className="h-full">
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full" style={{ background: colorVar(g.color) }} />
                <h3 className="font-display text-base font-semibold text-ink">{g.title}</h3>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {g.items.map((it) => (
                  <span
                    key={it}
                    className="rounded-lg border border-white/[0.08] bg-white/[0.02] px-2.5 py-1.5 text-xs text-ink-secondary"
                  >
                    {it}
                  </span>
                ))}
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
