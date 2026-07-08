"use client";

import { useRef } from "react";
import { SunMoon } from "@/components/sun-moon";

const STORAGE_KEY = "theme";

/* Styled purely off [data-theme] so server markup is identical for both
   themes — nothing to mismatch on hydration. */
export function ThemeToggle() {
  const fadeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggle = () => {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "night" ? "day" : "night";
    // Scopes the 400ms cross-fade to the switch; see globals.css.
    root.classList.add("theme-switching");
    if (fadeTimer.current) clearTimeout(fadeTimer.current);
    fadeTimer.current = setTimeout(
      () => root.classList.remove("theme-switching"),
      450,
    );
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle day/night theme"
      className="rounded-full p-1.5 text-accent hover:text-accent-soft focus-visible:outline-2 focus-visible:outline-accent"
    >
      <SunMoon className="h-5 w-5" />
    </button>
  );
}
