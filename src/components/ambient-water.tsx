"use client";

import { useEffect, useRef, useState } from "react";

/* Ambient water background (FR-5): a fixed full-viewport canvas behind all
   content rendering faint accent-colored ripples — a small trail following
   the cursor, a stronger multi-ring burst on click, and a very faint idle
   ripple when nothing has happened for a while.

   Constraints from the SRS: pointer-events none, requestAnimationFrame,
   devicePixelRatio-aware, capped concurrent ripples, theme-aware color,
   paused while the tab is hidden, whisper-subtle, and disabled entirely
   under prefers-reduced-motion (FR-6). */

type Ripple = {
  x: number;
  y: number;
  r0: number;
  r1: number;
  start: number;
  dur: number;
  alpha: number;
};

const MAX_RIPPLES = 24;
const MOVE_THROTTLE_MS = 60;
const MOVE_MIN_DIST = 24;
const IDLE_AFTER_MS = 3500;
const IDLE_EVERY_MS = 2800;

const easeOutCubic = (p: number) => 1 - Math.pow(1 - p, 3);

function useReducedMotionPref() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

export function AmbientWater() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduced = useReducedMotionPref();

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let ripples: Ripple[] = [];
    let raf = 0;
    let running = false;
    let rippleRgb = "56 189 248";

    const readColor = () => {
      rippleRgb = getComputedStyle(document.documentElement)
        .getPropertyValue("--ripple-rgb")
        .trim();
    };
    readColor();
    const themeObserver = new MutationObserver(readColor);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const push = (r: Ripple) => {
      if (ripples.length >= MAX_RIPPLES) ripples.shift();
      ripples.push(r);
      if (!running) start();
    };

    let lastMove = 0;
    let lastX = -1e4;
    let lastY = -1e4;
    let lastActivity = performance.now();
    let lastIdle = 0;

    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      lastActivity = now;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      if (now - lastMove < MOVE_THROTTLE_MS) return;
      if (dx * dx + dy * dy < MOVE_MIN_DIST * MOVE_MIN_DIST) return;
      lastMove = now;
      lastX = e.clientX;
      lastY = e.clientY;
      push({
        x: e.clientX,
        y: e.clientY,
        r0: 4,
        r1: 38,
        start: now,
        dur: 900,
        alpha: 0.09,
      });
    };

    const onDown = (e: PointerEvent) => {
      const now = performance.now();
      lastActivity = now;
      // Stronger burst: three rings, slightly staggered.
      for (let i = 0; i < 3; i++) {
        push({
          x: e.clientX,
          y: e.clientY,
          r0: 6,
          r1: 90 + i * 18,
          start: now + i * 90,
          dur: 1200,
          alpha: 0.16 - i * 0.04,
        });
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });

    const frame = (now: number) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Very faint drift when idle.
      if (
        now - lastActivity > IDLE_AFTER_MS &&
        now - lastIdle > IDLE_EVERY_MS
      ) {
        lastIdle = now;
        push({
          x: (0.15 + 0.7 * Math.random()) * window.innerWidth,
          y: (0.15 + 0.7 * Math.random()) * window.innerHeight,
          r0: 4,
          r1: 60,
          start: now,
          dur: 2400,
          alpha: 0.05,
        });
      }

      ripples = ripples.filter((r) => now - r.start < r.dur);
      for (const r of ripples) {
        const p = (now - r.start) / r.dur;
        if (p < 0) continue; // staggered burst ring not born yet
        const radius = r.r0 + (r.r1 - r.r0) * easeOutCubic(p);
        const alpha = r.alpha * (1 - p);
        ctx.beginPath();
        ctx.arc(r.x, r.y, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgb(${rippleRgb} / ${alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onVisibility = () => {
      if (document.hidden) stop();
      else {
        lastActivity = performance.now();
        start();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    start();

    return () => {
      stop();
      themeObserver.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
