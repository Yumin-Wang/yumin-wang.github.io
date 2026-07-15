import { useMemo, useState } from "react";
import { palette, alpha } from "../../lib/palette";

const CLUSTERS = [
  { key: "CD4 T", color: "s1", cx: 0.30, cy: 0.38, n: 90, spread: 0.10 },
  { key: "CD8 T", color: "s2", cx: 0.55, cy: 0.22, n: 62, spread: 0.085 },
  { key: "NK", color: "s3", cx: 0.72, cy: 0.40, n: 44, spread: 0.07 },
  { key: "Monocyte", color: "s5", cx: 0.42, cy: 0.68, n: 58, spread: 0.09 },
  { key: "B cell", color: "s6", cx: 0.68, cy: 0.72, n: 40, spread: 0.075 },
  { key: "Dendritic", color: "s7", cx: 0.20, cy: 0.70, n: 20, spread: 0.055 },
  { key: "Other", color: "s8", cx: 0.85, cy: 0.60, n: 16, spread: 0.05 },
];

function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}
function gaussian(rand) {
  const u = 1 - rand();
  const v = rand();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

export default function PCAClusterScatter() {
  const points = useMemo(() => {
    const rand = seededRandom(7);
    const pts = [];
    CLUSTERS.forEach((c) => {
      for (let i = 0; i < c.n; i++) {
        const x = c.cx + gaussian(rand) * c.spread * 0.55;
        const y = c.cy + gaussian(rand) * c.spread * 0.55;
        pts.push({ x, y, cluster: c.key, color: c.color });
      }
    });
    return pts;
  }, []);

  const [activeCluster, setActiveCluster] = useState(null);

  return (
    <div className="w-full">
      <svg viewBox="0 0 100 78" className="w-full">
        {points.map((p, i) => {
          const dim = activeCluster && activeCluster !== p.cluster;
          return (
            <circle
              key={i}
              cx={p.x * 100}
              cy={p.y * 78}
              r={dim ? 0.55 : 0.9}
              fill={dim ? alpha(palette[p.color], 0.12) : alpha(palette[p.color], 0.85)}
              style={{ transition: "all 200ms ease" }}
            />
          );
        })}
      </svg>
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
        {CLUSTERS.map((c) => (
          <button
            key={c.key}
            onMouseEnter={() => setActiveCluster(c.key)}
            onMouseLeave={() => setActiveCluster(null)}
            className="flex items-center gap-1.5 text-xs text-ink-secondary transition-colors hover:text-ink"
          >
            <span className="h-2 w-2 rounded-full" style={{ background: `var(--color-${c.color})` }} />
            {c.key}
          </button>
        ))}
      </div>
      <p className="mt-3 text-xs text-ink-faint">
        Illustrative PCA embedding of single-cell transcriptomes, colored by immune cell type (biVI kinetic
        parameter space) — hover a legend entry to isolate a cluster.
      </p>
    </div>
  );
}
