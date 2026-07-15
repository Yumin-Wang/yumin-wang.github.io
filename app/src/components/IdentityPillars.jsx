import Reveal from "./ui/Reveal";
import { Card, Tag, colorVar } from "./ui/primitives";
import { identityPillars } from "../data/content";

export default function IdentityPillars() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <Reveal>
        <p className="max-w-2xl text-sm uppercase tracking-[0.18em] text-ink-muted">What I bring to the table</p>
        <h2 className="mt-3 max-w-3xl font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          A data scientist and ML builder, backed by statistical depth most candidates don't have.
        </h2>
      </Reveal>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {identityPillars.map((p, i) => (
          <Reveal key={p.key} delay={i * 0.1}>
            <Card className="h-full transition-colors hover:border-white/20">
              <div
                className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg font-display text-sm font-semibold"
                style={{ background: `color-mix(in oklab, ${colorVar(p.color)} 22%, transparent)`, color: colorVar(p.color) }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="font-display text-lg font-semibold text-ink">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-secondary">{p.description}</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
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
