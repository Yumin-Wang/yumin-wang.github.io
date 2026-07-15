import { motion } from "framer-motion";
import { profile, heroStats } from "../data/content";
import HeroScatter from "./charts/HeroScatter";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-40 pb-24 sm:pt-48 sm:pb-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <HeroScatter className="absolute -right-[10%] top-0 h-[120%] w-[70%] opacity-70 sm:-right-[5%]" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-4xl px-6"
      >
        <motion.div
          variants={item}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 font-mono text-xs uppercase tracking-[0.15em] text-ink-secondary"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-s4" />
          {profile.roleTag}
        </motion.div>

        <motion.h1
          variants={item}
          className="mt-7 font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl"
        >
          <span className="text-gradient">{profile.headline}</span>
        </motion.h1>

        <motion.p variants={item} className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-secondary">
          {profile.subhead}
        </motion.p>

        <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
          <a
            href="#work"
            className="rounded-full bg-s1 px-6 py-3 text-sm font-medium text-page transition-transform hover:scale-[1.03]"
          >
            View research →
          </a>
          <a
            href="#contact"
            className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-white/30"
          >
            Get in touch
          </a>
        </motion.div>

        <motion.div variants={item} className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {heroStats.map((s) => (
            <div key={s.label}>
              <div className="font-display font-tnum text-2xl font-semibold sm:text-3xl" style={{ color: `var(--color-${s.accent})` }}>
                {s.value}
              </div>
              <div className="mt-1 text-xs text-ink-muted sm:text-sm">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
