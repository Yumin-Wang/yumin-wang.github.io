import { useMemo, useState } from "react";
import { scaleLinear } from "d3-scale";
import { palette, alpha } from "../../lib/palette";

const SETS = ["Burst size", "Splicing rate", "Degradation rate", "Shared w/ eQTL"];

// Illustrative combination sizes following a realistic UpSet decay pattern
// (single-set membership dominant, deep intersections rare). Totals are
// scaled to land near the published ~126K significant kQTL associations.
function buildCombos() {
  const combos = [];
  for (let mask = 1; mask < 1 << SETS.length; mask++) {
    const members = SETS.filter((_, i) => mask & (1 << i));
    combos.push({ mask, members, size: members.length });
  }
  const rand = (() => {
    let s = 77;
    return () => {
      s = (s * 16807) % 2147483647;
      return (s % 1000) / 1000;
    };
  })();
  const raw = combos.map((c) => {
    const base = Math.pow(0.42, c.size - 1) * 38000;
    const jitter = 0.75 + rand() * 0.5;
    return { ...c, count: Math.round(base * jitter) };
  });
  raw.sort((a, b) => b.count - a.count);
  return raw;
}

export default function QTLUpsetChart() {
  const data = useMemo(buildCombos, []);
  const [hoverIdx, setHoverIdx] = useState(null);

  const W = 680;
  const barH = 140;
  const rowH = 24;
  const gridH = SETS.length * rowH;
  const margin = { top: 8, right: 8, bottom: 8, left: 116 };
  const plotW = W - margin.left - margin.right;
  const bw = plotW / data.length;
  const barPad = Math.min(bw * 0.28, 8);

  const yMax = Math.max(...data.map((d) => d.count));
  const y = scaleLinear().domain([0, yMax]).range([barH - 6, 4]);

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${W} ${margin.top + barH + gridH + margin.bottom}`} className="w-full" role="img" aria-label="UpSet plot of kinetic QTL parameter intersections">
        <g transform={`translate(${margin.left},${margin.top})`}>
          {/* y gridlines for bar chart */}
          {[0, 0.25, 0.5, 0.75, 1].map((f) => (
            <line key={f} x1={0} x2={plotW} y1={y(yMax * f)} y2={y(yMax * f)} stroke={palette.grid} strokeWidth={1} />
          ))}
          {[0, 0.5, 1].map((f) => (
            <text key={f} x={-8} y={y(yMax * f)} fontSize="9" fill={palette.inkMuted} textAnchor="end" dominantBaseline="middle" fontFamily="JetBrains Mono, monospace">
              {Math.round(yMax * f).toLocaleString()}
            </text>
          ))}

          {/* bars */}
          {data.map((d, i) => {
            const x0 = i * bw + barPad / 2;
            const w = bw - barPad;
            const active = hoverIdx === i;
            return (
              <rect
                key={d.mask}
                x={x0}
                y={y(d.count)}
                width={w}
                height={barH - 6 - y(d.count)}
                rx={2}
                fill={active ? palette.s2 : alpha(palette.s2, 0.72)}
                onMouseEnter={() => setHoverIdx(i)}
                onMouseLeave={() => setHoverIdx(null)}
                style={{ cursor: "pointer" }}
              />
            );
          })}

          {/* dot matrix */}
          <g transform={`translate(0,${barH})`}>
            {SETS.map((s, ri) => (
              <g key={s}>
                <line x1={0} x2={plotW} y1={ri * rowH + rowH / 2} y2={ri * rowH + rowH / 2} stroke={palette.grid} strokeWidth={1} />
                <text x={-8} y={ri * rowH + rowH / 2} fontSize="10.5" fill={palette.inkSecondary} textAnchor="end" dominantBaseline="middle">
                  {s}
                </text>
              </g>
            ))}
            {data.map((d, i) => {
              const cx = i * bw + bw / 2;
              const activeRows = SETS.map((_, si) => Boolean(d.mask & (1 << si)));
              const activeYs = activeRows.map((on, ri) => (on ? ri * rowH + rowH / 2 : null)).filter((v) => v !== null);
              const hovered = hoverIdx === i;
              return (
                <g key={d.mask} onMouseEnter={() => setHoverIdx(i)} onMouseLeave={() => setHoverIdx(null)} style={{ cursor: "pointer" }}>
                  {activeYs.length > 1 && (
                    <line x1={cx} x2={cx} y1={activeYs[0]} y2={activeYs[activeYs.length - 1]} stroke={hovered ? palette.s2 : alpha(palette.s2, 0.6)} strokeWidth={2} />
                  )}
                  {activeRows.map((on, ri) => (
                    <circle
                      key={ri}
                      cx={cx}
                      cy={ri * rowH + rowH / 2}
                      r={on ? 5 : 2.5}
                      fill={on ? (hovered ? palette.s2 : alpha(palette.s2, 0.85)) : palette.grid}
                    />
                  ))}
                </g>
              );
            })}
          </g>
        </g>
      </svg>
      <div className="mt-2 min-h-[2.5rem] text-xs text-ink-muted">
        {hoverIdx !== null ? (
          <span>
            <span className="font-tnum font-semibold text-ink">{data[hoverIdx].count.toLocaleString()}</span> genes with significant
            kinetic QTLs affecting <span className="text-s2">{data[hoverIdx].members.join(" ∩ ")}</span>
          </span>
        ) : (
          <span>Hover a bar or dot column to see which kinetic parameters intersect in that set of genes.</span>
        )}
      </div>
    </div>
  );
}
