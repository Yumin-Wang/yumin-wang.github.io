import { useMemo } from "react";
import { motion } from "framer-motion";

// Decorative echo of the single-cell PCA embedding from the QTL kinetics
// project — abstract, not literal data. Points cluster into arcing blobs by
// "cell type", each cluster its own categorical hue.
const CLUSTERS = [
  { color: "var(--color-s1)", cx: 0.28, cy: 0.32, n: 34, r: 0.16 },
  { color: "var(--color-s2)", cx: 0.68, cy: 0.22, n: 26, r: 0.13 },
  { color: "var(--color-s5)", cx: 0.55, cy: 0.62, n: 30, r: 0.17 },
  { color: "var(--color-s6)", cx: 0.82, cy: 0.68, n: 18, r: 0.11 },
  { color: "var(--color-s3)", cx: 0.15, cy: 0.72, n: 16, r: 0.1 },
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

export default function HeroScatter({ className }) {
  const points = useMemo(() => {
    const rand = seededRandom(42);
    const pts = [];
    CLUSTERS.forEach((c, ci) => {
      for (let i = 0; i < c.n; i++) {
        const x = c.cx + gaussian(rand) * c.r * 0.5;
        const y = c.cy + gaussian(rand) * c.r * 0.5;
        pts.push({ x, y, color: c.color, key: `${ci}-${i}`, r: 2 + rand() * 2.4 });
      }
    });
    return pts;
  }, []);

  return (
    <svg viewBox="0 0 100 100" className={className} preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="heroFade" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="heroMask">
          <rect width="100" height="100" fill="url(#heroFade)" />
        </mask>
      </defs>
      <g mask="url(#heroMask)">
        {points.map((p, i) => (
          <motion.circle
            key={p.key}
            cx={p.x * 100}
            cy={p.y * 100}
            r={p.r}
            fill={p.color}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.85, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 + i * 0.012, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </g>
    </svg>
  );
}
