import { useState } from "react";
import Reveal from "./ui/Reveal";
import { profile } from "../data/content";

const LINKS = [
  { label: "GitHub", href: profile.links.github },
  { label: "Google Scholar", href: profile.links.scholar },
  { label: "LinkedIn", href: profile.links.linkedin },
].filter((l) => l.href);

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleEmailClick = (e) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(profile.email).catch(() => {});
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
    // href is still mailto: — this only supplements it for visitors with no mail client configured
  };

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-24">
      <Reveal className="overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-s1/[0.08] via-transparent to-s5/[0.08] px-8 py-16 text-center sm:px-16">
        <p className="text-sm uppercase tracking-[0.18em] text-ink-muted">Open to opportunities</p>
        <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          <span className="text-gradient">Looking for Data Scientist & Machine Learning roles</span> — internships and full-time.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-ink-secondary">
          I'd love to talk about data science, applied ML, or statistics roles — also open to biostatistics opportunities.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            onClick={handleEmailClick}
            className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm text-ink transition-colors hover:border-s1 hover:text-s1"
          >
            {copied ? "Copied! " : ""}{profile.email}
          </a>
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm text-ink transition-colors hover:border-s1 hover:text-s1"
            >
              {l.label}
            </a>
          ))}
        </div>
        <p className="mt-3 text-xs text-ink-faint">Click the email to copy it, in case your browser has no mail app set up.</p>
      </Reveal>
    </section>
  );
}
