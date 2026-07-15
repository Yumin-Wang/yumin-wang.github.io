import clsx from "clsx";

// Maps a semantic color key to Tailwind-friendly inline style vars.
export const colorVar = (key) => `var(--color-${key})`;

export function Kicker({ children, color = "s1", className }) {
  return (
    <div
      className={clsx("flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em]", className)}
      style={{ color: colorVar(color) }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: colorVar(color) }} />
      {children}
    </div>
  );
}

export function SectionHeading({ eyebrow, title, subtitle, color = "s1", align = "left" }) {
  return (
    <div className={clsx("mb-12 max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && <Kicker color={color} className={clsx(align === "center" && "justify-center")}>{eyebrow}</Kicker>}
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-4 text-base leading-relaxed text-ink-secondary">{subtitle}</p>}
    </div>
  );
}

export function StatTile({ value, label, color = "s1", size = "md" }) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] px-5 py-4">
      <div
        className={clsx(
          "font-display font-tnum font-semibold leading-none",
          size === "lg" ? "text-4xl sm:text-5xl" : "text-2xl sm:text-3xl"
        )}
        style={{ color: colorVar(color) }}
      >
        {value}
      </div>
      <div className="mt-2 text-sm text-ink-muted">{label}</div>
    </div>
  );
}

export function Pill({ children, color = "s1", active = false, onClick }) {
  const Comp = onClick ? "button" : "span";
  return (
    <Comp
      onClick={onClick}
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors",
        active
          ? "border-transparent text-page"
          : "border-white/10 bg-white/[0.03] text-ink-secondary hover:border-white/20 hover:text-ink"
      )}
      style={active ? { background: colorVar(color) } : undefined}
    >
      {children}
    </Comp>
  );
}

export function Card({ children, className }) {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.03] to-white/[0.01] p-6 backdrop-blur-sm",
        className
      )}
    >
      {children}
    </div>
  );
}

export function Tag({ children, color = "s1" }) {
  return (
    <span
      className="rounded-md border px-2 py-1 font-mono text-[11px] uppercase tracking-wide"
      style={{ borderColor: `color-mix(in oklab, ${colorVar(color)} 40%, transparent)`, color: colorVar(color) }}
    >
      {children}
    </span>
  );
}
