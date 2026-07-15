import Reveal from "./ui/Reveal";
import { SectionHeading } from "./ui/primitives";
import { education, honors, teaching } from "../data/content";

const DOT_COLORS = ["s1", "s2", "s5", "s8"];

export default function Education() {
  return (
    <section id="education" className="mx-auto max-w-6xl px-6 py-20">
      <Reveal>
        <SectionHeading eyebrow="Background" title="Education & recognition" />
      </Reveal>

      <div className="grid gap-12 lg:grid-cols-5">
        <Reveal className="lg:col-span-3">
          <ol className="relative space-y-8 border-l border-white/[0.1] pl-8">
            {education.map((e, i) => (
              <li key={e.school} className="relative">
                <span
                  className="absolute -left-[calc(2rem+5px)] top-1 h-2.5 w-2.5 rounded-full ring-4 ring-page"
                  style={{ background: `var(--color-${DOT_COLORS[i % DOT_COLORS.length]})` }}
                />
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-base font-semibold text-ink">{e.school}</h3>
                  <span className="font-mono text-xs text-ink-muted">{e.date}</span>
                </div>
                <p className="mt-1 text-sm text-ink-secondary">{e.degree}</p>
                <p className="mt-0.5 text-xs text-ink-faint">
                  {e.detail} · {e.location}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-10 rounded-xl border border-white/[0.08] bg-white/[0.02] p-5">
            <h4 className="font-display text-sm font-semibold text-ink">{teaching.role}</h4>
            <p className="mt-1 text-xs text-ink-muted">
              {teaching.course} · {teaching.date}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{teaching.description}</p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-2">
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-ink-muted">Honors & Awards</h3>
          <ul className="mt-4 space-y-4">
            {honors.map((h) => (
              <li key={h.title} className="border-b border-white/[0.06] pb-4 last:border-0">
                <p className="text-sm font-medium text-ink">{h.title}</p>
                <p className="mt-0.5 text-xs text-ink-muted">
                  {h.org} · {h.date}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
