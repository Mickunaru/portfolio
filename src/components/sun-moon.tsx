import { useId } from "react";

/* Signature motif (SRS §5.5, FR-4): line-work sun that eases into a moon.
   Theme-driven entirely by CSS on [data-theme] (see globals.css): the mask
   bite slides in to carve the disc into a crescent while the rays rotate
   out. Server markup is theme-independent. */
export function SunMoon({ className }: { className?: string }) {
  const maskId = useId();

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
      className={`sun-moon ${className ?? ""}`}
    >
      <mask id={maskId}>
        <rect width="24" height="24" fill="white" />
        {/* The "bite" — slides left at night to cut the crescent. */}
        <circle className="sun-moon-bite" cy="8" r="5.5" fill="black" />
      </mask>
      <circle cx="12" cy="12" r="5" mask={`url(#${maskId})`} />
      <g className="sun-moon-rays">
        <line x1="12" y1="2" x2="12" y2="4.5" />
        <line x1="12" y1="19.5" x2="12" y2="22" />
        <line x1="2" y1="12" x2="4.5" y2="12" />
        <line x1="19.5" y1="12" x2="22" y2="12" />
        <line x1="4.9" y1="4.9" x2="7.1" y2="7.1" />
        <line x1="16.9" y1="16.9" x2="19.1" y2="19.1" />
        <line x1="4.9" y1="19.1" x2="7.1" y2="16.9" />
        <line x1="16.9" y1="7.1" x2="19.1" y2="4.9" />
      </g>
    </svg>
  );
}
