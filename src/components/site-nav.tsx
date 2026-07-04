"use client";

import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  { id: "story", label: "Story" },
  { id: "made", label: "Made" },
  { id: "now", label: "Now" },
  { id: "contact", label: "Contact" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    /* Active section = the one crossing a band around the viewport middle.
       "home" participates so hero clears the highlight (FR-2). */
    const sections = ["home", ...links.map((l) => l.id)]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id === "home" ? null : entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-bg/80 backdrop-blur-sm ${
        scrolled ? "border-line" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-6 py-3">
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
            {links.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={activeId === id ? "true" : undefined}
                  className={`font-sans text-sm transition-colors duration-200 hover:text-accent focus-visible:outline-2 focus-visible:outline-accent ${
                    activeId === id ? "text-accent" : "text-secondary"
                  }`}
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
