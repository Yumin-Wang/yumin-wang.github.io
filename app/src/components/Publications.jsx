import Reveal from "./ui/Reveal";
import { SectionHeading } from "./ui/primitives";
import { publications, patents } from "../data/content";

export default function Publications() {
  return (
    <section id="publications" className="mx-auto max-w-6xl px-6 py-20">
      <Reveal>
        <SectionHeading eyebrow="Record" title="Publications & patents" />
      </Reveal>

      <div className="space-y-3">
        {publications.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.05}>
            <div className="group flex flex-col gap-1 rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 transition-colors hover:border-white/20 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
              <div>
                <p className="text-sm font-medium leading-snug text-ink">{p.title}</p>
                <p className="mt-1.5 text-xs text-ink-muted">{p.authors}</p>
                <p className="mt-1 font-mono text-xs text-s1">{p.venue}</p>
              </div>
              <span className="shrink-0 font-mono text-xs text-ink-faint">{p.year}</span>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2} className="mt-8">
        <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-ink-muted">Patents</h3>
        {patents.map((p) => (
          <div key={p.id} className="mt-3 rounded-xl border border-white/[0.08] bg-white/[0.02] p-5">
            <p className="text-sm text-ink">{p.title}</p>
            <p className="mt-1 font-mono text-xs text-ink-muted">
              {p.id} · {p.date}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-ink-faint">{p.note}</p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
