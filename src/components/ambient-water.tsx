"use client";

import { useEffect, useRef, useState } from "react";

/* Fixed full-viewport canvas behind all content running a heightfield
   water simulation: drags leave a wake, clicks splash, idle rain keeps
   the surface alive. Pauses while the tab is hidden, sleeps once the
   surface settles, disabled under prefers-reduced-motion.

   Two-buffer wave equation on a low-res grid (CELL css px per cell),
   rendered into a grid-sized ImageData tinted with the theme accent,
   then scaled up to the viewport with image smoothing. */

const CELL = 3; // css px per sim cell — lower is sharper but costlier
const DAMPING = 0.975; // energy loss per step; higher rings longer
const MOVE_SPACING = CELL * 1.5; // wake stamp spacing along drag path
const IDLE_AFTER_MS = 3500;
const IDLE_EVERY_MS = 250; // base gap between rain ticks (jittered)
const RAIN_CLUSTER = 3; // max drops per rain tick
const RAIN_HEAVY_CHANCE = 0.08; // odds a tick lands one big plop
const SLEEP_EPS = 0.004; // max |height| below this → surface asleep
const ALPHA_GAIN = 0.3; // wave height → pixel alpha
const ALPHA_MAX = 0.5;

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

    let raf = 0;
    let running = false;

    // Theme accent, as "r g b".
    let tintR = 56;
    let tintG = 189;
    let tintB = 248;
    const readColor = () => {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue("--ripple-rgb")
        .trim()
        .split(/\s+/)
        .map(Number);
      if (raw.length === 3 && raw.every((n) => Number.isFinite(n))) {
        [tintR, tintG, tintB] = raw;
      }
    };
    readColor();
    const themeObserver = new MutationObserver(readColor);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    // Simulation state (rebuilt on resize).
    let gw = 0;
    let gh = 0;
    let curr = new Float32Array(0);
    let prev = new Float32Array(0);
    let image: ImageData | null = null;
    const offscreen = document.createElement("canvas");
    const offctx = offscreen.getContext("2d");
    if (!offctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = true;

      gw = Math.max(8, Math.ceil(window.innerWidth / CELL));
      gh = Math.max(8, Math.ceil(window.innerHeight / CELL));
      curr = new Float32Array(gw * gh);
      prev = new Float32Array(gw * gh);
      offscreen.width = gw;
      offscreen.height = gh;
      image = offctx.createImageData(gw, gh);
    };
    resize();
    window.addEventListener("resize", resize);

    /* Press the surface down in a rounded bump; the wave equation does
       the rest (propagation, edge reflection, interference). */
    const disturb = (cx: number, cy: number, radius: number, depth: number) => {
      const gx = cx / CELL;
      const gy = cy / CELL;
      const r = Math.max(1, radius / CELL);
      const x0 = Math.max(1, Math.floor(gx - r));
      const x1 = Math.min(gw - 2, Math.ceil(gx + r));
      const y0 = Math.max(1, Math.floor(gy - r));
      const y1 = Math.min(gh - 2, Math.ceil(gy + r));
      for (let y = y0; y <= y1; y++) {
        for (let x = x0; x <= x1; x++) {
          const dx = x - gx;
          const dy = y - gy;
          const d2 = (dx * dx + dy * dy) / (r * r);
          if (d2 > 1) continue;
          curr[y * gw + x] -= depth * (1 - d2) * (1 - d2);
        }
      }
      if (!running) start();
    };

    let lastX = -1;
    let lastY = -1;
    let lastActivity = performance.now();
    let lastIdle = 0;
    let nextRainGap = IDLE_EVERY_MS;

    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      lastActivity = now;
      if (lastX < 0) {
        lastX = e.clientX;
        lastY = e.clientY;
        return;
      }
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const dist = Math.hypot(dx, dy);
      if (dist < MOVE_SPACING) return;
      // Stamp along the path so fast drags leave a continuous wake;
      // faster movement pushes slightly deeper.
      const depth = Math.min(1.4, 0.5 + dist * 0.02);
      const steps = Math.min(24, Math.floor(dist / MOVE_SPACING));
      for (let i = 1; i <= steps; i++) {
        disturb(
          lastX + (dx * i) / steps,
          lastY + (dy * i) / steps,
          CELL * 2.5,
          depth,
        );
      }
      lastX = e.clientX;
      lastY = e.clientY;
    };

    const onDown = (e: PointerEvent) => {
      lastActivity = performance.now();
      disturb(e.clientX, e.clientY, CELL * 5, 4);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });

    const frame = (now: number) => {
      // Idle rain: each tick drops a small cluster at random spots with
      // jittered timing; the odd tick lands one heavy plop.
      if (now - lastActivity > IDLE_AFTER_MS && now - lastIdle > nextRainGap) {
        lastIdle = now;
        nextRainGap = IDLE_EVERY_MS * (0.4 + Math.random() * 1.2);
        const drops = 1 + Math.floor(Math.random() * RAIN_CLUSTER);
        for (let i = 0; i < drops; i++) {
          const size = 0.3 + Math.random() * 0.7; // drop weight 0.3–1
          disturb(
            Math.random() * window.innerWidth,
            Math.random() * window.innerHeight,
            CELL * (2 + size * 2.5),
            0.3 + size * 0.7,
          );
        }
        if (Math.random() < RAIN_HEAVY_CHANCE) {
          disturb(
            (0.15 + 0.7 * Math.random()) * window.innerWidth,
            (0.15 + 0.7 * Math.random()) * window.innerHeight,
            CELL * 5,
            2.2,
          );
        }
      }

      // Wave equation step: each cell pulled by its neighbors' average,
      // carried by velocity (curr - prev), damped a little each step.
      let maxAbs = 0;
      for (let y = 1; y < gh - 1; y++) {
        const row = y * gw;
        for (let x = 1; x < gw - 1; x++) {
          const i = row + x;
          const v =
            ((curr[i - 1] + curr[i + 1] + curr[i - gw] + curr[i + gw]) / 2 -
              prev[i]) *
            DAMPING;
          prev[i] = v;
          const a = v < 0 ? -v : v;
          if (a > maxAbs) maxAbs = a;
        }
      }
      [curr, prev] = [prev, curr];

      // Slope shading, light from the top-left: near face of a crest gets
      // a pale highlight, far face a darker accent shadow. Alpha follows
      // slope steepness.
      if (image) {
        const px = image.data;
        // Lit/shadow tints derived from the accent per frame so theme
        // swaps apply live.
        const litR = tintR + (255 - tintR) * 0.55;
        const litG = tintG + (255 - tintG) * 0.55;
        const litB = tintB + (255 - tintB) * 0.55;
        const shR = tintR * 0.45;
        const shG = tintG * 0.45;
        const shB = tintB * 0.45;
        for (let y = 0; y < gh; y++) {
          const row = y * gw;
          for (let x = 0; x < gw; x++) {
            const i = row + x;
            const j = i * 4;
            if (x === 0 || y === 0 || x === gw - 1 || y === gh - 1) {
              px[j + 3] = 0;
              continue;
            }
            // Surface slope facing the top-left light.
            const s =
              curr[i - 1] - curr[i + 1] + (curr[i - gw] - curr[i + gw]);
            const a = s < 0 ? -s : s;
            if (a <= 0.01) {
              px[j + 3] = 0;
              continue;
            }
            if (s > 0) {
              px[j] = litR;
              px[j + 1] = litG;
              px[j + 2] = litB;
            } else {
              px[j] = shR;
              px[j + 1] = shG;
              px[j + 2] = shB;
            }
            px[j + 3] = Math.min(ALPHA_MAX, a * ALPHA_GAIN) * 255;
          }
        }
        offctx.putImageData(image, 0, 0);
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        ctx.drawImage(
          offscreen,
          0,
          0,
          gw,
          gh,
          0,
          0,
          window.innerWidth,
          window.innerHeight,
        );
      }

      // Sleep once the surface settles, but stay awake within the
      // idle-rain window.
      if (maxAbs < SLEEP_EPS && now - lastActivity > IDLE_AFTER_MS * 4) {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        running = false;
        return;
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
