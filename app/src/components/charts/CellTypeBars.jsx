import { useMemo, useState } from "react";
import { scaleLinear } from "d3-scale";
import { palette, alpha } from "../../lib/palette";

// Top cell types by significant kQTL count (OneK1K PBMC cohort), remaining
// 6 of the 14 profiled types folded into "Other" per categorical-palette limits.
const RAW = [
  { name: "CD4+ naive/central memory T", value: 30150, color: "s1" },
  { name: "CD14+ classical monocyte", value: 24380, color: "s2" },
  { name: "CD8+ effector memory T", value: 18720, color: "s3" },
  { name: "Natural killer (NK)", value: 15960, color: "s4" },
  { name: "B naive", value: 11840, color: "s5" },
  { name: "CD16+ non-classical monocyte", value: 8210, color: "s6" },
  { name: "Dendritic cell", value: 6540, color: "s7" },
  { name: "Other immune subsets (7 types)", value: 10494, color: "s8" },
];

export default function CellTypeBars() {
  const [hover, setHover] = useState(null);
  const max = useMemo(() => Math.max(...RAW.map((d) => d.value)), []);
  const x = scaleLinear().domain([0, max]).range([0, 100]);

  return (
    <div className="w-full space-y-2.5">
      {RAW.map((d, i) => (
        <div
          key={d.name}
          className="group"
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(null)}
        >
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="text-ink-secondary">{d.name}</span>
            <span className="font-tnum text-ink-muted">{d.value.toLocaleString()}</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/[0.05]">
            <div
              className="h-full rounded-full transition-[width] duration-500"
              style={{
                width: `${x(d.value)}%`,
                background: hover === i ? `var(--color-${d.color})` : alpha(palette[d.color], 0.75),
              }}
            />
          </div>
        </div>
      ))}
      <p className="pt-1 text-xs text-ink-faint">Significant kinetic-QTL associations by immune cell type (illustrative distribution; 14 cell types profiled, top 7 + remainder shown).</p>
    </div>
  );
}
