"use client";

import { SunMoon } from "@/components/sun-moon";

const STORAGE_KEY = "theme";

/* Nav theme toggle (FR-1). The sun/moon motif inside is styled purely off
   [data-theme], so the server markup is identical for both themes and there
   is nothing to mismatch on hydration. */
export function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "night" ? "day" : "night";
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
