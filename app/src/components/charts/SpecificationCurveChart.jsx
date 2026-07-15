import { useMemo, useRef, useState, useCallback } from "react";
import { scaleLinear, scaleLog } from "d3-scale";
import useElementSize from "../../lib/useElementSize";
import { palette, alpha } from "../../lib/palette";

const N = 1208;
const ROW_DEFS = [
  { label: "Outcome model", color: palette.s1, options: ["Cox PH", "Cox PH, age-strat.", "Poisson"] },
  { label: "Meat exposure", color: palette.s2, options: ["Continuous (g/day)", "Tertiles", "Quartiles", "Binary split"] },
  { label: "Adjustment set", color: palette.s5, options: ["Minimal", "+ Demographics", "+ Lifestyle", "Fully adjusted"] },
  { label: "Subgroup", color: palette.s8, options: ["All participants", "Male only", "Female only", "Age ≥ 65"] },
  { label: "Follow-up window", color: palette.s7, options: ["Full follow-up", "5-year", "10-year"] },
];

function seededRandom(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}
function gaussian(rand) {
  let u = 0, v = 0;
  while (u === 0) u = rand();
  while (v === 0) v = rand();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

// Builds an illustrative dataset whose summary statistics match the published
// results (median HR 0.94, IQR 0.83-1.05, range 0.51-1.75, ~3.97% significant)
// — this is a faithful recreation of the chart type, not the original per-spec data.
function buildData() {
  const rand = seededRandom(20230304);
  const targetMedianLog = Math.log(0.94);
  const sdLog = 0.174;

  let raw = [];
  for (let i = 0; i < N; i++) {
    let logHr = targetMedianLog + gaussian(rand) * sdLog;
    logHr = Math.max(Math.log(0.51), Math.min(Math.log(1.75), logHr));
    raw.push(logHr);
  }
  raw.sort((a, b) => a - b);

  // find SE scale so that ~48 of 1208 cross significance (|logHR|/SE > 1.96)
  const baseSe = raw.map(() => 0.045 + rand() * 0.05);
  let scale = 1;
  for (let iter = 0; iter < 40; iter++) {
    const count = raw.filter((lh, i) => Math.abs(lh) / (baseSe[i] * scale) > 1.96).length;
    if (count <= 50 && count >= 44) break;
    scale *= count > 48 ? 1.03 : 0.97;
  }

  // Block-random assignment (not per-column noise): real specification grids show
  // contiguous runs because correlated analytic choices tend to land near each
  // other once sorted by effect size. Per-column noise here would alias into a
  // flat average at ~1px/column, so we chunk into ~25-column blocks instead.
  const chunk = 25;
  const rowAssignments = ROW_DEFS.map((row) => {
    const nChunks = Math.ceil(N / chunk);
    const chunkCats = Array.from({ length: nChunks }, () => Math.floor(rand() * row.options.length));
    return raw.map((_, i) => chunkCats[Math.floor(i / chunk)]);
  });

  return raw.map((logHr, i) => {
    const hr = Math.exp(logHr);
    const se = baseSe[i] * scale;
    const low = Math.exp(logHr - 1.96 * se);
    const high = Math.exp(logHr + 1.96 * se);
    const significant = low > 1 || high < 1;
    return {
      rank: i + 1,
      hr,
      low,
      high,
      significant,
      cats: rowAssignments.map((r) => r[i]),
    };
  });
}

export default function SpecificationCurveChart() {
  const data = useMemo(buildData, []);
  const sigCount = useMemo(() => data.filter((d) => d.significant).length, [data]);
  const [containerRef, { width }] = useElementSize();
  const canvasRef = useRef(null);
  const [hover, setHover] = useState(null);

  const W = Math.max(width, 320);
  const topH = 260;
  const rowH = 26;
  const gridH = ROW_DEFS.length * rowH;
  const margin = { top: 16, right: 16, bottom: 8, left: 132 };
  const plotW = Math.max(W - margin.left - margin.right, 100);

  const x = useMemo(() => scaleLinear().domain([1, N]).range([0, plotW]), [plotW]);
  const y = useMemo(() => scaleLog().domain([0.48, 1.85]).range([topH - 24, 10]), [topH]);

  const draw = useCallback(
    (canvas) => {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      const totalH = margin.top + topH + gridH + margin.bottom;
      canvas.width = W * dpr;
      canvas.height = totalH * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${totalH}px`;
      const ctx = canvas.getContext("2d");
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, totalH);
      ctx.translate(margin.left, margin.top);

      // reference gridlines (top panel)
      ctx.strokeStyle = palette.grid;
      ctx.lineWidth = 1;
      [0.5, 0.75, 1, 1.25, 1.5, 1.75].forEach((v) => {
        const yy = y(v);
        ctx.beginPath();
        ctx.moveTo(0, yy);
        ctx.lineTo(plotW, yy);
        ctx.stroke();
        ctx.fillStyle = palette.inkMuted;
        ctx.font = "10px Inter, sans-serif";
        ctx.textAlign = "right";
        ctx.textBaseline = "middle";
        ctx.fillText(v.toFixed(2), -8, yy);
      });
      // baseline at HR = 1
      ctx.strokeStyle = palette.baseline;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, y(1));
      ctx.lineTo(plotW, y(1));
      ctx.stroke();

      // CI whiskers first — a soft ribbon behind the curve, not a solid block
      data.forEach((d) => {
        const xx = x(d.rank);
        const color = d.significant ? palette.s6 : palette.s1;
        ctx.strokeStyle = alpha(color, d.significant ? 0.32 : 0.055);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(xx, y(Math.max(d.low, 0.48)));
        ctx.lineTo(xx, y(Math.min(d.high, 1.85)));
        ctx.stroke();
      });

      // the ranked point-estimate curve, drawn on top so it reads clearly
      ctx.strokeStyle = alpha(palette.ink, 0.85);
      ctx.lineWidth = 1.75;
      ctx.beginPath();
      data.forEach((d, i) => {
        const xx = x(d.rank);
        const yy = y(d.hr);
        if (i === 0) ctx.moveTo(xx, yy);
        else ctx.lineTo(xx, yy);
      });
      ctx.stroke();

      // significant points only — non-significant ones are already carried by the line
      data.forEach((d) => {
        if (!d.significant) return;
        const xx = x(d.rank);
        ctx.fillStyle = alpha(palette.s6, 0.95);
        ctx.beginPath();
        ctx.arc(xx, y(d.hr), 1.8, 0, Math.PI * 2);
        ctx.fill();
      });

      // grid panel
      ctx.translate(0, topH);
      ROW_DEFS.forEach((row, ri) => {
        const k = row.options.length;
        data.forEach((d) => {
          const xx = x(d.rank);
          const cat = d.cats[ri];
          const a = 0.28 + 0.6 * (cat / Math.max(k - 1, 1));
          ctx.fillStyle = alpha(row.color, a);
          ctx.fillRect(xx - 0.6, ri * rowH + 3, 1.3, rowH - 6);
        });
        ctx.fillStyle = palette.inkSecondary;
        ctx.font = "11px Inter, sans-serif";
        ctx.textAlign = "right";
        ctx.textBaseline = "middle";
        ctx.fillText(row.label, -8, ri * rowH + rowH / 2);
      });

      ctx.setTransform(1, 0, 0, 1, 0, 0);
    },
    [W, data, plotW, x, y, topH, gridH, margin.left, margin.top]
  );

  const canvasCallback = useCallback(
    (node) => {
      canvasRef.current = node;
      draw(node);
    },
    [draw]
  );

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = e.clientX - rect.left - margin.left;
    if (relX < 0 || relX > plotW) {
      setHover(null);
      return;
    }
    const rank = Math.round(x.invert(relX));
    const d = data[Math.min(Math.max(rank - 1, 0), N - 1)];
    setHover({ d, px: e.clientX - rect.left, py: e.clientY - rect.top });
  };

  const totalH = margin.top + topH + gridH + margin.bottom;

  return (
    <div className="w-full">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-s6" /> significant (95% CI excludes 1)
          <span className="ml-3 h-1.5 w-1.5 rounded-full bg-s1 opacity-60" /> not significant
        </div>
        <div className="font-mono text-xs text-ink-muted">
          {sigCount}/{N} specifications significant ({((sigCount / N) * 100).toFixed(1)}%)
        </div>
      </div>
      <div ref={containerRef} className="relative w-full" style={{ height: totalH }} onMouseLeave={() => setHover(null)}>
        <canvas ref={canvasCallback} onMouseMove={handleMove} className="block" />
        {hover && (
          <div
            className="pointer-events-none absolute z-10 w-56 rounded-lg border border-white/10 bg-surface-3/95 p-3 text-xs shadow-xl backdrop-blur"
            style={{
              left: Math.min(Math.max(hover.px + 12, 0), W - 232),
              top: 4,
            }}
          >
            <div className="font-mono text-ink-muted">Specification #{hover.d.rank}</div>
            <div className="mt-1 font-tnum text-base font-semibold text-ink">
              HR {hover.d.hr.toFixed(2)}{" "}
              <span className="font-normal text-ink-muted">
                [{hover.d.low.toFixed(2)}–{hover.d.high.toFixed(2)}]
              </span>
            </div>
            <div className={`mt-0.5 font-mono text-[10px] uppercase tracking-wide ${hover.d.significant ? "text-s6" : "text-ink-faint"}`}>
              {hover.d.significant ? "Significant" : "Not significant"}
            </div>
            <div className="mt-2 space-y-1 border-t border-white/10 pt-2">
              {ROW_DEFS.map((row, ri) => (
                <div key={row.label} className="flex justify-between gap-2">
                  <span className="text-ink-faint">{row.label}</span>
                  <span className="text-ink-secondary">{row.options[hover.d.cats[ri]]}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <p className="mt-4 text-xs leading-relaxed text-ink-faint">
        Recreated chart type from <em>Grilling the Data</em> (J. Clin. Epidemiol.) — {N.toLocaleString()} Cox
        model specifications ranked by hazard ratio, each varying outcome model, exposure operationalization,
        adjustment set, subgroup, and follow-up window. Per-specification values are illustrative and
        reproduce the paper's reported summary statistics (median HR 0.94, IQR 0.83–1.05, {((sigCount/N)*100).toFixed(1)}% significant); hover any column for detail.
      </p>
    </div>
  );
}
