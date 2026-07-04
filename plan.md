# Build Plan — Personal Website (lemichael.vercel.app)

Derived from [SRS.md](SRS.md) v1.2. Executed **one step at a time** — each step ends with a review checkpoint before moving on. Mark steps `[x]` as they're approved.

**How we work:** I implement a step → you review in the browser → give feedback → we iterate or advance. No step starts until the previous one is approved.

---

## Phase A — Foundation (needed before any section can exist)

### Step 0 — Scaffold
- [x] `create-next-app` (App Router, TypeScript, Tailwind), clean out boilerplate
- [x] Fonts via `next/font/google`: Fraunces (serif), Inter (sans), JetBrains Mono (mono) — two weights max per family (§5.1)
- [x] Verify dev server runs clean

**Checkpoint:** blank page renders with fonts loaded, no boilerplate leftovers.

### Step 1 — Theme tokens + theme system
- [x] CSS custom properties for **night (default)** and day on `[data-theme]` (§5.2), wired into Tailwind
- [x] Theme provider: default night, persist choice in localStorage, no flash-of-wrong-theme on load (FR-1)
- [x] Temporary toggle button to test both themes; ~400ms color cross-fade on switch
- [x] Both palettes pass WCAG AA for body text

**Checkpoint:** flip themes, confirm colors/contrast/persistence across reloads.

### Step 2 — Layout shell + nav skeleton
- [ ] Page container, centered ~640–720px content column, generous vertical rhythm (§5.3)
- [ ] Top-left "ML" monogram; slim sticky nav top-right: Story, Made, Now, Contact + toggle slot (§6.2)
- [ ] Nav gains hairline border once scrolled
- [ ] Mobile: text links collapse; monogram + toggle stay reachable
- [ ] Empty placeholder sections with ids so nav anchors have targets

**Checkpoint:** shell looks right on desktop + mobile widths; sticky nav behaves.

---

## Phase B — Sections, one at a time (static content first, verbatim from §7)

### Step 3 — Home / Hearth section
- [ ] Name, hero headline in serif — "I build software the way I play games — all the way to 100%." with **100%** in accent
- [ ] Tagline (serif italic, muted): "Problem solver by day. Gamer by night."
- [ ] Status pill: `Open to opportunities`
- [ ] Sun/moon SVG motif by the headline + in the nav — line-work sun that eases into moon on theme change (FR-4), replaces the temp toggle from Step 1
- [ ] Motif is the real theme toggle, with aria labels

**Checkpoint:** hero reads right in both themes; sun↔moon animation feels smooth.

### Step 4 — Story section
- [ ] Section title **Story**, mono eyebrow
- [ ] Origin narrative verbatim (§7.2), serif prose, ~60–70 char line length

**Checkpoint:** typography + reading rhythm approved.

### Step 5 — Made section (projects)
- [ ] Five project entries in SRS order (§7.3), each with:
  - 16:9 bordered screenshot frame via `next/image` (placeholder images until real assets)
  - Meta line (mono, year · repo link where public)
  - Bold outcome line (serif), description (sans), tech tags (mono)
- [ ] Hover: frame border warms toward accent; optional desaturate-at-rest treatment
- [ ] Repo links: LOG8415-Project, Kazoo, AskTheSpire

**Checkpoint:** project layout on desktop + mobile; decide on desaturate treatment; real screenshots slot in whenever ready.

### Step 6 — Now section
- [ ] Section title **Now**, present-tense copy verbatim (§7.4)

**Checkpoint:** quick — bundled with Step 5 review if preferred.

### Step 7 — Get in touch (Contact) section
- [ ] Eyebrow **Contact**, headline "Get in touch.", subline verbatim (§7.5)
- [ ] Two columns (form left, links right), stacking on mobile
- [ ] Form: Name / Email / Message / `Send message` → composes `mailto:michaelle1248@gmail.com`, shows "Opening your mail app…" note (FR-7)
- [ ] Direct links aside "Or reach me directly": email, GitHub, LinkedIn, Steam, **Download CV** → `/cv.pdf` (FR-8)
- [ ] Commented placeholder hook for optional grayscale portrait
- [ ] Footer: `Built with Next.js · deployed on Vercel` + `I also hate portals.` (§7.6)

**Checkpoint:** form flow works end-to-end; decide here whether to upgrade to Formspree/Web3Forms in-page send.

---

## Phase C — Behavior & motion (cross-section)

### Step 8 — Smooth-scroll nav + active section
- [ ] Nav links smooth-scroll to sections (FR-2)
- [ ] Subtle active-section indication

**Checkpoint:** scroll behavior on desktop + mobile.

### Step 9 — Scroll-reveal motion
- [ ] Sections slide in softly at ~12–15% visibility: translateY 16–24px + fade, 500–600ms ease-out, children stagger 60–80ms, runs once (FR-3, §5.4)
- [ ] `prefers-reduced-motion`: reveals place instantly / simple fade (FR-6)

**Checkpoint:** motion feels "smooth and subtle — nothing springy"; test reduced-motion.

### Step 10 — Ambient water background (signature)
- [ ] Fixed full-viewport `<canvas>` behind content, `pointer-events: none` (FR-5)
- [ ] Faint accent ripples: trail on cursor move (throttled), stronger multi-ring burst on click, faint idle ripple
- [ ] `requestAnimationFrame`, DPR-aware, capped concurrent ripples, pauses on hidden tab, theme-aware color
- [ ] **Disabled entirely** under `prefers-reduced-motion` (FR-6)

**Checkpoint:** the big feel-check — must stay whisper-subtle, never fight the type; verify perf.

---

## Phase D — Finish & ship

### Step 11 — 404 page
- [ ] Themed 404: "I also hate portals." + quiet link home (FR-9, §7.7)

### Step 12 — Polish pass
- [ ] Visible accent focus states, hover micro-interactions, keyboard nav sweep
- [ ] SEO: title, meta description, Open Graph tags + simple themed OG image (§9)
- [ ] Favicon from ML monogram
- [ ] Lighthouse tuning — target 95+ across the board

**Checkpoint:** Lighthouse scores + a11y sweep results reviewed.

### Step 13 — Deploy
- [ ] Add `/cv.pdf` and optimized real screenshots
- [ ] Push to GitHub, import into Vercel (free Hobby tier) → live at `lemichael.vercel.app` (§10)
- [ ] Post-deploy smoke test on the live URL

**Checkpoint:** live site review. *(Optional later: connect `lemichael.ca`.)*

---

## Out of scope for v1 (per §12)
AI "ask my site" Q&A · in-page form send (unless chosen at Step 7) · FR/EN toggle · auto theme by clock · custom domain · portrait · live Steam/GitHub data.
