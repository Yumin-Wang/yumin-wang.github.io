import { useMemo, useState } from "react";
import { palette, alpha } from "../../lib/palette";

const TREES = [
  {
    title: "Fully randomized",
    subtitle: "Standard RCT",
    root: {
      label: "Eligible participants",
      children: [
        { label: "Randomize", children: [{ label: "Arm 1", leaf: "s1" }, { label: "Arm 2", leaf: "s8" }] },
      ],
    },
  },
  {
    title: "Two-stage randomized",
    subtitle: "Wennberg design",
    root: {
      label: "Eligible participants",
      children: [
        { label: "Consent to randomize", children: [{ label: "Arm 1", leaf: "s1" }, { label: "Arm 2", leaf: "s8" }] },
        { label: "Declines randomization", children: [{ label: "Chooses Arm 1", leaf: "s5" }, { label: "Chooses Arm 2", leaf: "s7" }] },
      ],
    },
  },
  {
    title: "Partially randomized preference (PRPD)",
    subtitle: "Esserman & Li — this project",
    highlight: true,
    root: {
      label: "Eligible participants",
      children: [
        { label: "No strong preference", children: [{ label: "Randomized Arm 1", leaf: "s1" }, { label: "Randomized Arm 2", leaf: "s8" }] },
        { label: "Strong preference", children: [{ label: "Preference Arm 1", leaf: "s5" }, { label: "Preference Arm 2", leaf: "s7" }] },
      ],
    },
  },
];

function layout(root, width, height) {
  const leaves = [];
  const nodes = [];
  const edges = [];

  function walk(node, depth) {
    if (node.children) {
      const childLeafRanges = node.children.map((c) => walk(c, depth + 1));
      const x = childLeafRanges.reduce((a, b) => a + b, 0) / childLeafRanges.length;
      const y = depth * (height / 3) + 14;
      nodes.push({ ...node, x, y, depth });
      node.children.forEach((c, i) => {
        edges.push({ x1: x, y1: y, x2: c._x, y2: c._y, color: c.leaf ? palette[c.leaf] : palette.baseline });
      });
      node._x = x;
      node._y = y;
      return x;
    } else {
      const x = leaves.length * (width / (countLeaves(root) - 1 || 1));
      const y = depth * (height / 3) + 14;
      node._x = x;
      node._y = y;
      leaves.push(node);
      nodes.push({ ...node, x, y, depth });
      return x;
    }
  }
  function countLeaves(n) {
    if (!n.children) return 1;
    return n.children.reduce((a, c) => a + countLeaves(c), 0);
  }
  walk(root, 0);
  return { nodes, edges };
}

function Tree({ def }) {
  const width = 200;
  const height = 150;
  const { nodes, edges } = useMemo(() => layout(JSON.parse(JSON.stringify(def.root)), width, height), [def]);
  const [hoverLeaf, setHoverLeaf] = useState(null);

  return (
    <div
      className={`rounded-2xl border p-5 ${
        def.highlight ? "border-s5/40 bg-s5/[0.06]" : "border-white/[0.08] bg-white/[0.02]"
      }`}
    >
      <div className="mb-1 font-display text-sm font-semibold text-ink">{def.title}</div>
      <div className="mb-4 text-xs text-ink-muted">{def.subtitle}</div>
      <svg viewBox={`-10 0 ${width + 20} ${height}`} className="w-full">
        {edges.map((e, i) => (
          <line
            key={i}
            x1={e.x1}
            y1={e.y1 + 8}
            x2={e.x2}
            y2={e.y2 - 8}
            stroke={hoverLeaf === null ? alpha(e.color, 0.55) : alpha(e.color, e.color === hoverLeaf ? 0.9 : 0.15)}
            strokeWidth={1.5}
          />
        ))}
        {nodes.map((n, i) => {
          const color = n.leaf ? palette[n.leaf] : palette.inkSecondary;
          const dim = n.leaf && hoverLeaf !== null && hoverLeaf !== palette[n.leaf];
          return (
            <g
              key={i}
              transform={`translate(${n.x},${n.y})`}
              onMouseEnter={() => n.leaf && setHoverLeaf(palette[n.leaf])}
              onMouseLeave={() => setHoverLeaf(null)}
              style={{ cursor: n.leaf ? "pointer" : "default" }}
            >
              <circle r={n.leaf ? 4.5 : 3} fill={dim ? alpha(color, 0.25) : color} />
              <text
                y={-9}
                textAnchor="middle"
                fontSize="7.4"
                fontFamily="Inter, sans-serif"
                fill={dim ? palette.inkFaint : palette.inkSecondary}
              >
                {n.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default function TrialDesignTree() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {TREES.map((t) => (
        <Tree key={t.title} def={t} />
      ))}
    </div>
  );
}
