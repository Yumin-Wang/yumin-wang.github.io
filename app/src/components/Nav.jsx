import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { profile } from "../data/content";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#publications", label: "Publications" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleEmailClick = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(profile.email).catch(() => {});
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={`flex w-full max-w-5xl items-center justify-between rounded-full border px-5 py-2.5 transition-colors duration-300 ${
          scrolled ? "border-white/10 bg-black/60 backdrop-blur-lg" : "border-transparent bg-transparent"
        }`}
      >
        <a href="#top" className="font-display text-sm font-semibold tracking-tight text-ink">
          Yumin Wang
        </a>
        <div className="hidden items-center gap-6 md:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-ink-secondary transition-colors hover:text-ink">
              {l.label}
            </a>
          ))}
        </div>
        <a
          href={`mailto:${profile.email}`}
          onClick={handleEmailClick}
          title={profile.email}
          className="rounded-full border border-white/15 px-4 py-1.5 text-sm text-ink transition-colors hover:border-s1 hover:text-s1"
        >
          {copied ? "Copied!" : "Say hi"}
        </a>
      </nav>
    </motion.header>
  );
}
