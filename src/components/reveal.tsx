"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

/* Scroll-reveal motion (FR-3, SRS §5.4): soft slide-in + fade as a section
   enters the viewport, children staggered ~70ms, running once. Under
   prefers-reduced-motion everything places with a simple fade and no
   transform (FR-6).

   RSC children pass through untouched — only the wrappers are client. */

const VIEWPORT = { once: true, amount: 0.15 } as const;

function useVariants(): Variants {
  const reduced = useReducedMotion();
  return {
    hidden: { opacity: 0, y: reduced ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0.2 : 0.55, ease: "easeOut" },
    },
  };
}

/** Single block that reveals as one unit when scrolled into view. */
export function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const variants = useVariants();
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      {children}
    </motion.div>
  );
}

/** Container whose RevealItem children stagger in (~70ms apart). */
export function RevealGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.07 } },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      {children}
    </motion.div>
  );
}

/** Child of RevealGroup; inherits the group's stagger timing. */
export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const variants = useVariants();
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
