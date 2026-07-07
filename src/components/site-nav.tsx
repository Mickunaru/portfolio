"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  { id: "story", label: "Story" },
  { id: "made", label: "Made" },
  { id: "now", label: "Now" },
  { id: "contact", label: "Contact" },
];

const sectionToLink: Record<string, string> = {
  home: "",
  story: "story",
  background: "story",
  made: "made",
  now: "now",
  contact: "contact",
};

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = Object.keys(sectionToLink)
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const mapped = sectionToLink[entry.target.id];
            setActiveId(mapped ? mapped : null);
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
          aria-label="ML, back to top"
          className="font-mono text-sm font-semibold tracking-widest text-primary hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
        >
          ML
        </a>
        <nav aria-label="Sections" className="flex items-center gap-5">
          <ul className="hidden items-center gap-5 sm:flex">
            {links.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={activeId === id ? "true" : undefined}
                  className={`relative block font-sans text-sm transition-colors duration-200 hover:text-accent focus-visible:outline-2 focus-visible:outline-accent ${
                    activeId === id ? "text-accent" : "text-secondary"
                  }`}
                >
                  {label}
                  {activeId === id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute -bottom-1 left-0 right-0 h-px bg-accent"
                      transition={
                        reduced
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 400, damping: 32 }
                      }
                    />
                  )}
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
