# Software Requirements Specification
## Personal Website — Michael Le

**Version:** 1.2
**Owner:** Michael Le (GitHub / Steam: `Mickunaru`)
**Purpose of this document:** A complete, build-ready specification to be used with Claude Code to build the site incrementally, one step at a time. It contains the core concept, the full design system, the exact content (verbatim), functional requirements, and a phased build plan.

**Changes in 1.2:** Expanded the project showcase (screenshots + meta/repo links per project); turned Contact into a full **Get in touch** section with a message form; added the **ambient water** background (subtle ripples reacting to cursor movement and clicks). FR list and build plan updated accordingly.
**Changes in 1.1:** Hosting locked to Vercel on the free `lemichael.vercel.app` URL. Removed auto day/night by clock — the site defaults to night mode and the sun/moon toggle handles the switch.

---

## 1. Overview

A personal website that presents Michael Le's story and achievements. It is a "home on the internet" first, and a quiet recruiting tool second. The hard constraints: it must feel **special and unmistakably his**, and it must cost **nothing** (the free `.vercel.app` URL needs no purchase at all).

The site is a single-page, multi-section experience with a signature idea: a **day/night duality** — *problem solver by day, gamer by night* — expressed as two monochrome themes. It **opens in night mode**, and a sun/moon toggle flips it to day.

---

## 2. Vision & Core Concept

**The spine of the whole site:** Michael is one person who finishes things to 100%, expressed two ways. By day he's a builder and problem solver (95%+ test coverage, 100% data consistency, zero regressions). By night he's a completionist gamer (9 perfect games, hundreds of achievements). The day/night themes are that duality made visible.

The site **opens at night** — Michael's off-the-clock, gamer half, and the mode where the icy-blue accent comes alive — with a sun/moon toggle that flips it to day. Same duality, now something the visitor chooses to explore rather than something dictated by their clock.

Three principles that every decision must agree with:

1. **Calm surface, substance one layer down.** The site is minimal and unbothered; the proof a recruiter needs is present but never loud.
2. **Playfulness lives in motion, not decoration.** No confetti, no gimmicks. The personality comes entirely from how things *move* — smooth, subtle, deliberate. The ambient water and the section reveals are the whole budget for "play," and both stay whisper-quiet.
3. **Coherence over features.** Every element (type, color, motion, theme) reinforces the same feeling. Restraint is the aesthetic.

---

## 3. Goals & Non-Goals

**Goals**
- Tell Michael's story with genuine voice and show his best work, outcome-first, with real screenshots.
- Serve two audiences at once: a non-technical recruiter (who needs signal in ~15 seconds) and a hiring engineer (who is won over by craft and restraint).
- Make it easy and inviting to get in touch.
- Load fast, feel crafted, and cost effectively nothing.

**Non-Goals**
- Not a blog, not a CMS, not a dashboard.
- No loud "HIRE ME" energy. Availability is signaled quietly.
- No heavy or decorative imagery beyond project screenshots and the signature motif.
- The job search is **not** mentioned in body copy — only the status pill signals availability.

---

## 4. Tech Stack

| Concern | Choice | Notes |
|---|---|---|
| Framework | **Next.js (App Router, latest), TypeScript, React** | Michael's fluent stack; easy to maintain and extend. |
| Styling | **Tailwind CSS** + CSS custom properties for theme tokens | Custom properties drive the day/night theming. |
| Motion | **Framer Motion** (`motion`) for scroll reveals + a small **`<canvas>`** for the ambient water | Keep usage light; CSS-only fallback acceptable for reveals. |
| Fonts | **`next/font`** (self-hosted Google fonts, zero layout shift) | See §5.1. |
| Images | **`next/image`** for project screenshots | Optimized, responsive, lazy-loaded. |
| Contact form | **`mailto:` compose** (zero backend) — optional free service (Formspree / Web3Forms) for in-page send | See §7.5. |
| Hosting | **Vercel (free Hobby tier)** — live at `lemichael.vercel.app` | Zero-config for Next.js; auto-deploy on every push; HTTPS included. |
| Domain | Primary address is the free `lemichael.vercel.app`. | Optional: `lemichael.ca` (owned, $0.01 first year) can be connected later via Vercel — see §10. No paid item required for v1. |

**Cost:** $0/month. Running on the `.vercel.app` URL requires no purchase at all; the optional `.ca` domain is the only (tiny) expense if used.

---

## 5. Design System

### 5.1 Typography

Three roles. All loaded via `next/font/google`.

- **Serif — the voice.** `Fraunces`. Used for the headline sentence, the story prose, section/project titles, and the "Get in touch" headline. Carries warmth and character. (Alternative: `Newsreader`.)
- **Sans — the structure.** `Inter`. Used for nav, labels, status pill, "Now" text, project descriptions, form fields. Neutral and clean. (Alternative: `Geist Sans`.)
- **Mono — the texture.** `JetBrains Mono` (or `Geist Mono`). Used for section eyebrows, project meta lines, and tech-stack tags — a subtle developer texture.

Rules: sentence case everywhere. Two weights per family max. Serif for anything that is Michael *speaking*; sans for anything that is the site *labeling*.

### 5.2 Color & Theming

Near-monochrome grayscale canvas with **one cool accent: icy blue.** The accent is the only chrome color and is reserved for interactive elements, links, focus states, the sun/moon motif, and the water ripples. The day/night themes are a **subtle, monochrome** pair (light neutrals → deep neutrals).

**Default theme on first visit: night (dark).** Define these as CSS custom properties on a `[data-theme]` attribute.

**Night (dark) — DEFAULT**
```
--bg:            #09090B
--surface:       #18181B
--text-primary:  #FAFAFA
--text-secondary:#A1A1AA
--text-muted:    #71717A
--border:        #27272A
--accent:        #38BDF8   /* icy blue pops on dark; ripple rgb 56,189,248 */
--accent-soft:   #7DD3FC
```

**Day (light)**
```
--bg:            #FAFAFA
--surface:       #FFFFFF
--text-primary:  #18181B
--text-secondary:#52525B
--text-muted:    #A1A1AA
--border:        #E4E4E7
--accent:        #0EA5E9   /* icy blue, contrast-safe on light; ripple rgb 14,165,233 */
--accent-soft:   #38BDF8
```

Both themes must pass WCAG AA for body text. Toggling animates background and text color over ~400ms ease. Project screenshots are the one place color beyond the accent appears; they live inside bordered frames so the monochrome system holds around them.

### 5.3 Spacing & Layout

- Generous whitespace; the page should breathe.
- Content column max-width ~640–720px, centered, comfortable line-length for serif prose (~60–70 characters).
- Consistent vertical rhythm between sections (large, deliberate gaps).
- Fully responsive; mobile-first. Nav collapses on mobile (§6.2); the contact grid and project layout stack.

### 5.4 Motion

The personality vehicle. Keep everything **smooth and subtle** — nothing springy.

- **Section entrance:** as a section scrolls into view (~12–15% visible), it **slides in softly** — translateY ~16–24px + fade 0→1, ~500–600ms ease-out. Child elements stagger by ~60–80ms.
- **Ambient water (signature):** a faint, monochrome water surface behind everything (§5.5 / FR-5). Ripples in the accent color trail the cursor as it moves, burst a little stronger on click, and drift very faintly when idle. Whisper-subtle — it must never compete with the type.
- **Nav scrolling:** clicking a nav item smooth-scrolls to that section.
- **Day/night toggle:** the sun icon eases into a moon (and theme colors cross-fade) over ~400ms.
- **Hover states:** subtle — a color shift to accent, a small underline animation on links, project frames warm their border toward accent.
- **`prefers-reduced-motion`:** honor it. Reveals place instantly (or simple fade); the ambient water is **disabled entirely**.

### 5.5 Imagery

Three kinds only:

1. **Monogram mark** — a small "ML" in the top-left, monochrome. Doubles as the **favicon**.
2. **Signature SVG motif** — a minimal line-work **sun that eases into a moon** as the theme shifts, in the icy-blue accent. Sits by the hero headline and in the nav toggle. Pure SVG, zero cost.
3. **Project screenshots** — one per project in the showcase, in a consistent **16:9** bordered frame (rounded, subtle hover border → accent), served via `next/image`. Optional refinement to preserve the calm palette: slightly desaturate screenshots at rest and restore full color on hover.

No photo of Michael for now. Leave a clean, commented hook in the Contact section for an optional grayscale portrait later.

The ambient water surface is rendered by a fixed full-viewport `<canvas>` behind all content (never an image asset).

---

## 6. Site Structure & Navigation

### 6.1 Sections (single page, in order)

1. **Home / Hearth** — monogram, name, the one-sentence headline, status pill, tagline, sun/moon toggle, signature motif.
2. **Story** — the origin narrative.
3. **Made** — five projects, each with a screenshot, meta line, outcome, description, tags.
4. **Now** — present-tense, what he's up to.
5. **Get in touch (Contact)** — inviting headline, message form, direct links, CV.

*(Order is deliberate: identity → past → proof → present → reach out. Adjustable, but this is the intended arc.)*

Plus a **404 page** (§7.6).

### 6.2 Navigation

- A **small, minimal nav** anchored top (top-right on desktop): links to Story, Made, Now, Contact, and the day/night toggle. Slim, sticky, gains a hairline border once scrolled.
- Nav links **smooth-scroll** to their section.
- On mobile: text links collapse; monogram and the day/night toggle stay reachable.
- The ⌘K command palette is intentionally **out of scope** (the nav replaces it).

---

## 7. Content Specification (verbatim — use exactly)

> This is the final, approved copy. Use it word-for-word.

### 7.1 Home / Hearth

- **Name:** Michael Le
- **Headline (serif, hero line):**
  > I build software the way I play games — all the way to 100%.
  *(Style "100%" in the accent color.)*
- **Tagline (serif italic, muted):**
  > Problem solver by day. Gamer by night.
- **Status pill (sans, small):** `Open to opportunities`
  *(Alternative if a role should be named: `Open to backend roles · Montréal / Remote`. Default to the lowkey version.)*
- Sun/moon toggle and signature motif live here (toggle also in the nav).

### 7.2 Story

Section title: **Story**

> I didn't start in software. I was on the natural-sciences track in CEGEP when a show about a start-up got me. Watching the characters go all in with nothing but an idea and actually build it into something real, chasing it with everything they had, flipped a switch. I wanted that kind of ownership, that kind of experience. So I moved to software engineering at Polytechnique Montréal and started chasing the same feeling: the thrill of creating something of your own with just some characters on the screen. Turned out the whole path is the fun part. The messy middle as much as the finish line. And when the thing you built actually helps someone on the other end, that's what makes it worthwhile.

### 7.3 Made

Section title: **Made**

Each project is a showcase entry with: a **16:9 screenshot** (real asset, added later), a **meta line** (mono: year/timeframe · optional repo link), a **bold outcome line** (serif), a **description** (sans), and **tech tags** (mono). Ordered as below — end on the fun one.

**1. Ran a full insurance-recommendation app on a 1 vCPU box — 17 ms median, 0% errors under load**
Meta: `2026 · Capstone` (private — no public repo)
Capstone for Sollio & Mitco7. DevSecOps pipeline with zero vulnerability regressions, plus an AI pipeline that categorized sensitive claims with privacy kept intact.
Tags: `C# / ASP.NET` · `AWS` · `Gemini`

**2. Shipped production software for two years while finishing my degree**
Meta: `2024–2026 · Okapya` (employment — no public repo)
At Okapya: a fault-tolerant hourly pipeline syncing thousands of Shopify events into HubSpot at 100% consistency, and a test suite I built from zero to 95%+ coverage.
Tags: `Node.js` · `TypeScript` · `React`

**3. Taught myself Terraform, then stood up a database cluster in under 2 minutes**
Meta: `2025 · Repo` → `github.com/Mickunaru/LOG8415-Project`
A master-replica MySQL setup on AWS with a Python proxy doing latency-based routing — held 100% success across 86,000+ queries at 8,500+ QPS.
Tags: `Terraform` · `AWS` · `Python`

**4. Rebuilt a legacy quiz platform in Flutter with 100% feature parity**
Meta: `2025 · Repo` → `github.com/Mickunaru/Kazoo`
Real-time avatars synced over Firebase across 10+ modules, and 30+ merge requests reviewed to keep the team unblocked.
Tags: `Flutter` · `Node.js` · `Firebase`

**5. Built a RAG assistant that answers *Slay the Spire* questions with citations — for fun**
Meta: `2026 · Repo` → `github.com/Mickunaru/AskTheSpire`
End-to-end retrieval with hybrid search and query expansion, tuned against real eval metrics (0.94 recall, 0.87 faithfulness).
Tags: `Python` · `Chroma` · `Claude API`

### 7.4 Now

Section title: **Now**

> Just wrapped my software engineering degree. Right now I'm building whatever pulls me in and teaching myself whatever it demands. Off the clock, I'm deep into my virtual world.

### 7.5 Get in touch (Contact)

Section eyebrow: **Contact**

- **Headline (serif):** `Get in touch.`
- **Subline (sans):** `Have a role, a project, or just want to say hi? Drop me a line and I'll get back to you.`

**Layout:** two columns (form left, direct links right); stacks on mobile.

**Message form** — fields: `Name`, `Email`, `Message`; button `Send message`.
- **Default behavior (zero backend, $0):** on submit, compose a `mailto:michaelle1248@gmail.com` with a subject and a body built from the fields, and show a small note ("Opening your mail app…").
- **Optional upgrade:** wire the form to a free service (**Formspree** or **Web3Forms**) so visitors send without leaving the page — a one-line change to the submit handler. Choose this if in-page submission is preferred over opening a mail client.

**Direct links (aside), labeled "Or reach me directly":**
- Email: `michaelle1248@gmail.com`
- GitHub: `github.com/Mickunaru`
- LinkedIn: `linkedin.com/in/michael-le-124864294`
- Steam (a nod to the "night" half): `steamcommunity.com/profiles/76561199196374960`
- **Download CV** — links to `/cv.pdf` (Michael adds the file).

Leave a commented placeholder here for an optional grayscale portrait.

### 7.6 Footer

Small, muted:
- **Built-with line:** `Built with Next.js · deployed on Vercel`
- **Easter egg (Michael's Steam status):** `I also hate portals.`

### 7.7 404 Page

A minimal 404 reusing the site theme. Copy:

> I also hate portals.

Plus a quiet link back home.

---

## 8. Functional Requirements

- **FR-1 — Default theme + manual toggle.** Loads in **night (dark)** by default. A sun/moon control flips night↔day. The chosen theme **persists** across visits (localStorage) and takes precedence on return. No auto-by-clock behavior.
- **FR-2 — Smooth-scroll nav.** Nav links scroll smoothly to their section; the active section may be subtly indicated.
- **FR-3 — Scroll-reveal motion.** Sections animate in per §5.4 (IntersectionObserver / Framer Motion `whileInView`). Runs once per section.
- **FR-4 — Sun→moon transition.** The SVG motif animates between states on theme change.
- **FR-5 — Ambient water background.** A fixed full-viewport `<canvas>` behind all content (below content, above the base background; `pointer-events: none`) renders faint accent-colored ripples: a small ripple trailing cursor movement (throttled), a stronger multi-ring burst on click, and a very faint idle ripple when there's been no recent activity. Ease-out expand + fade, capped concurrent count, `requestAnimationFrame`, `devicePixelRatio`-aware, theme-aware color. Must stay subtle enough not to reduce text legibility.
- **FR-6 — Reduced motion.** Respect `prefers-reduced-motion`: reveals place without transform; the **ambient water is disabled entirely**.
- **FR-7 — Contact form.** Name/Email/Message with a `Send message` action. Default composes a `mailto:` (§7.5); optionally posts to a free form service.
- **FR-8 — CV download.** A visible control links to the CV PDF.
- **FR-9 — 404.** Custom themed 404 with the copy above.

---

## 9. Non-Functional Requirements

- **Performance:** Lighthouse 95+ across the board. Minimal JS. Self-hosted fonts, no layout shift. Optimized screenshots via `next/image`. The water canvas must be cheap — cap concurrent ripples, clear/redraw with `requestAnimationFrame`, and it may pause when the tab is hidden. Target sub-second first load.
- **Accessibility:** WCAG AA. Semantic landmarks, keyboard-navigable, visible focus states (accent), labeled form fields, alt text on screenshots, aria on the toggle/motif, reduced-motion honored. The water is decorative and must not trap focus or interfere with input (`pointer-events: none`).
- **Responsive:** Mobile-first; clean from ~360px up.
- **SEO / sharing:** Sensible `<title>`, meta description, Open Graph tags, and a simple generated OG image (themed monochrome card with the headline).
- **Browser support:** Current evergreen browsers.

---

## 10. Deployment

1. Push to GitHub, import the repo into **Vercel** (free Hobby tier). Live at **`lemichael.vercel.app`** immediately, with automatic HTTPS and auto-deploy on every push. **No DNS setup required.**
2. *(Optional, later.)* Michael owns `lemichael.ca` ($0.01 first year). To use it, add the domain in the Vercel dashboard and paste the DNS records it provides into the registrar. The `.vercel.app` URL is the primary address for v1. Note the `.ca` **renewal** price (~$15–20/yr) and consider auto-renew.
3. Confirm current free-tier terms at deploy time.

---

## 11. Build Plan (incremental — for Claude Code)

Build in this order; each step should be independently reviewable.

1. **Scaffold.** `create-next-app` (App Router, TypeScript, Tailwind). Clean boilerplate. Fonts via `next/font`.
2. **Theme tokens.** CSS custom properties for night/day on `[data-theme]`, wired into Tailwind. **Night is the default.** Get both themes right with a hardcoded switch.
3. **Layout shell.** Page container, max-width column, vertical rhythm, top monogram + minimal sticky nav (no behavior yet).
4. **Sections (static).** All five sections with the **exact verbatim content** from §7 (including the Get in touch structure). No motion yet — just typography and spacing.
5. **Theme system.** FR-1: default night, sun/moon toggle, persist in localStorage, cross-fade colors on switch.
6. **Sun/moon SVG motif.** Line-work sun→moon wired to theme state (FR-4).
7. **Smooth-scroll nav.** Wire nav links to sections; active-section indication (FR-2).
8. **Project showcase.** Screenshot frames (16:9, `next/image`), meta lines with repo links, outcome/description/tags. Wire in real screenshots as they're ready; optional desaturate-at-rest treatment.
9. **Contact form.** Fields + `Send message` composing a `mailto:` (FR-7). Optionally swap in Formspree/Web3Forms for in-page send.
10. **Scroll-reveal motion.** Soft slide-in + stagger, with reduced-motion handling (FR-3, FR-6).
11. **Ambient water.** Canvas ripple layer reacting to cursor move, click, and idle; theme-aware; disabled under reduced-motion (FR-5, FR-6). Keep it whisper-subtle.
12. **404 page.** Themed, easter-egg copy (FR-9).
13. **Polish pass.** Focus states, hover micro-interactions, OG/meta tags, favicon from the monogram, Lighthouse tuning.
14. **Deploy.** Add `/cv.pdf` and optimized screenshots, push to GitHub, import into Vercel — live at `lemichael.vercel.app` (FR-8 link wired). *(Optional later: connect `lemichael.ca`.)*

---

## 12. Future Enhancements (out of scope for v1)

- **"Ask my site anything"** — an AI Q&A trained on Michael's bio, mirroring his AskTheSpire RAG project. On-brand and impressive, but incurs a small API cost, so deferred.
- **In-page contact send** — upgrade the form from `mailto:` to Formspree/Web3Forms whenever desired (also listed as an option in §7.5).
- **Bilingual FR/EN toggle** — Michael is native in both; suits a Québec audience. Deferred to keep v1 focused.
- **Auto day/night by local clock** — deferred by choice; v1 defaults to night with a manual toggle.
- **`lemichael.ca` custom domain** — owned; connect via Vercel whenever desired.
- **Grayscale portrait** in Contact.
- **Live "night" data** — pulling real Steam/GitHub activity into the page.

---

*End of SRS v1.2.*
