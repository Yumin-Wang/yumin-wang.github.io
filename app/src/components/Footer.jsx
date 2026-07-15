import { profile } from "../data/content";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08] px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-xs text-ink-faint sm:flex-row">
        <p>© {new Date().getFullYear()} {profile.name}. Built with React, D3 &amp; Framer Motion.</p>
        <p>{profile.location}</p>
      </div>
    </footer>
  );
}
