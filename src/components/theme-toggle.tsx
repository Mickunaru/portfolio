"use client";

const STORAGE_KEY = "theme";

/* Temporary control for verifying the theme system — replaced by the
   sun/moon SVG motif in plan step 3.

   The label is driven by CSS off [data-theme] (see globals.css) rather than
   React state, so the server markup is identical for both themes and there
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
      className="rounded-md border border-line bg-surface px-3 py-1.5 font-sans text-sm text-secondary hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
    >
      <span className="night-only">☾ night</span>
      <span className="day-only">☀ day</span>
    </button>
  );
}
