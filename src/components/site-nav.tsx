"use client";

import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  { href: "#story", label: "Story" },
  { href: "#made", label: "Made" },
  { href: "#now", label: "Now" },
  { href: "#contact", label: "Contact" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-bg/80 backdrop-blur-sm ${
        scrolled ? "border-line" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-2xl items-center justify-between px-6 py-3">
        <a
          href="#home"
          aria-label="Michael Le — back to top"
          className="font-mono text-sm font-semibold tracking-widest text-primary hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
        >
          ML
        </a>
        <nav aria-label="Sections" className="flex items-center gap-5">
          {/* Text links collapse on mobile (§6.2); monogram + toggle stay. */}
          <ul className="hidden items-center gap-5 sm:flex">
            {links.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className="font-sans text-sm text-secondary hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
