"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const VIEWPORT = { once: true, amount: 0.15 } as const;

function useVariants(): Variants {
  const reduced = useReducedMotion();
  return {
    hidden: { opacity: 0, y: reduced ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduced ? 0.2 : 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
}

export function Reveal({
  children,
  className,
}: {
  readonly children: ReactNode;
  readonly className?: string;
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

export function RevealGroup({
  children,
  className,
}: {
  readonly children: ReactNode;
  readonly className?: string;
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

export function RevealItem({
  children,
  className,
}: {
  readonly children: ReactNode;
  readonly className?: string;
}) {
  const variants = useVariants();
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
