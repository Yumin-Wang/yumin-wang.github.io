import Reveal from "./ui/Reveal";
import { SectionHeading, Card, Kicker, colorVar } from "./ui/primitives";
import { flagshipProjects } from "../data/content";
import SpecificationCurveChart from "./charts/SpecificationCurveChart";
import QTLUpsetChart from "./charts/QTLUpsetChart";
import CellTypeBars from "./charts/CellTypeBars";
import PCAClusterScatter from "./charts/PCAClusterScatter";
import TrialDesignTree from "./charts/TrialDesignTree";

function Viz({ type }) {
  if (type === "spec-curve") return <SpecificationCurveChart />;
  if (type === "trial-tree") return <TrialDesignTree />;
  if (type === "qtl") {
    return (
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <div className="mb-3 text-sm font-medium text-ink">Kinetic-parameter intersections (UpSet)</div>
          <QTLUpsetChart />
        </div>
        <div className="grid gap-8">
          <div>
            <div className="mb-3 text-sm font-medium text-ink">Associations by immune cell type</div>
            <CellTypeBars />
          </div>
          <div>
            <div className="mb-3 text-sm font-medium text-ink">Single-cell embedding by cell type</div>
            <PCAClusterScatter />
          </div>
        </div>
      </div>
    );
  }
  return null;
}

function ProjectBlock({ project, index }) {
  const reversed = index % 2 === 1;
  return (
    <div id={project.id} className="scroll-mt-28 py-14 first:pt-0">
      <Reveal>
        <Kicker color={project.color}>{project.kicker}</Kicker>
        <div className="mt-3 flex flex-wrap items-baseline justify-between gap-3">
          <h3 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{project.title}</h3>
          <span className="font-mono text-xs text-ink-muted">{project.dates}</span>
        </div>
        <p className="mt-1 text-sm text-ink-muted">{project.advisor}</p>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-ink-secondary">{project.summary}</p>
      </Reveal>

      <Reveal delay={0.08} className="mt-6 grid grid-flow-col auto-cols-[minmax(120px,1fr)] gap-3 overflow-x-auto pb-1">
        {project.stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3">
            <div className="font-display font-tnum text-xl font-semibold sm:text-2xl" style={{ color: colorVar(project.color) }}>
              {s.value}
            </div>
            <div className="mt-1 text-xs text-ink-muted">{s.label}</div>
          </div>
        ))}
      </Reveal>

      <div className={`mt-8 grid gap-10 lg:grid-cols-5 ${reversed ? "" : ""}`}>
        <Reveal delay={0.1} className="lg:col-span-2">
          <ul className="space-y-3">
            {project.bullets.map((b, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed text-ink-secondary">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full" style={{ background: colorVar(project.color) }} />
                {b}
              </li>
            ))}
          </ul>
          <div className="mt-6 space-y-1.5 border-t border-white/[0.08] pt-5">
            {project.outputs.map((o, i) => (
              <p key={i} className="text-xs leading-relaxed text-ink-faint">
                {o}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.16} className="lg:col-span-3">
          <Card>
            <Viz type={project.viz} />
          </Card>
        </Reveal>
      </div>
    </div>
  );
}

export default function FlagshipProjects() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-20">
      <Reveal>
        <SectionHeading
          eyebrow="Selected research"
          title="Three projects, one thread: rigorous statistics at scale"
          subtitle="From a single-cell atlas of a million cells to a sensitivity analysis of 1,200+ regression models to the design math behind a clinical trial — each project pushes a different kind of statistical machinery as far as it goes."
        />
      </Reveal>
      <div className="divide-y divide-white/[0.08]">
        {flagshipProjects.map((p, i) => (
          <ProjectBlock key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
