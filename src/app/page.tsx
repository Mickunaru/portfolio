import { ContactSection } from "@/components/contact-section";
import { MadeSection } from "@/components/made-section";
import { RevealGroup, RevealItem } from "@/components/reveal";
import { SunMoon } from "@/components/sun-moon";

const experience = [
  {
    period: "2024–2026",
    title: "Software developer",
    org: "Okapya",
  },
  {
    period: "2026",
    title: "Insurance recommendation platform",
    org: "Sollio & Mitco7",
  },
  {
    period: "2022-2026",
    title: "B.Eng., Software Engineering",
    org: "Polytechnique Montréal",
  },
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6">
      <section
        id="home"
        className="flex min-h-[80vh] flex-col justify-center gap-5"
      >
        <div className="hero-rise" style={{ "--rise-i": 0 } as React.CSSProperties}>
          <SunMoon className="h-10 w-10 text-accent" />
        </div>
        <p
          className="hero-rise font-sans text-base text-secondary font-medium"
          style={{ "--rise-i": 1 } as React.CSSProperties}
        >
          Michael Le
        </p>
        <h1
          className="hero-rise-solid font-serif text-4xl text-primary sm:text-5xl"
          style={{ "--rise-i": 2 } as React.CSSProperties}
        >
          I build systems that hold up:{" "}
          <span className="text-accent">95%+</span> coverage,{" "}
          <span className="text-accent">100%</span> consistency, zero
          regressions.
        </h1>
        <p
          className="hero-rise font-sans text-sm text-secondary"
          style={{ "--rise-i": 3 } as React.CSSProperties}
        >
          Backend & full-stack developer · Montréal
        </p>
        <p className="hero-rise" style={{ "--rise-i": 4 } as React.CSSProperties}>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 font-sans text-xs text-secondary">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-accent"
            />
            Open to opportunities
          </span>
        </p>
      </section>

      <section id="story" className="py-28">
        <RevealGroup className="flex flex-col gap-4">
          <RevealItem>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              story
            </p>
          </RevealItem>
          <RevealItem>
            <h2 className="font-serif text-3xl text-primary">Story</h2>
          </RevealItem>
          <RevealItem>
            <p className="max-w-[68ch] font-serif text-lg leading-relaxed text-primary">
              I came to software from the natural sciences. Partway through
              CEGEP, I got interested enough in how products actually get
              built to switch tracks and study software engineering at
              Polytechnique Montréal. What&apos;s kept me in it is the full
              path: taking an idea through the messy middle to something that
              works, and seeing it help someone on the other end.
            </p>
          </RevealItem>
        </RevealGroup>
      </section>

      <section id="background" className="py-28">
        <RevealGroup className="flex flex-col gap-4">
          <RevealItem>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              background
            </p>
          </RevealItem>
          <RevealItem>
            <h2 className="font-serif text-3xl text-primary">Background</h2>
          </RevealItem>
          <RevealItem>
            <ul className="mt-2 flex flex-col gap-3">
              {experience.map(({ period, title, org }) => (
                <li
                  key={title}
                  className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between"
                >
                  <p className="font-sans text-base text-primary">
                    {title}
                    <span className="text-secondary"> · {org}</span>
                  </p>
                  <p className="font-mono text-xs text-muted">{period}</p>
                </li>
              ))}
            </ul>
          </RevealItem>
        </RevealGroup>
      </section>

      <MadeSection />

      <section id="now" className="py-28">
        <RevealGroup className="flex flex-col gap-4">
          <RevealItem>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              now
            </p>
          </RevealItem>
          <RevealItem>
            <h2 className="font-serif text-3xl text-primary">Now</h2>
          </RevealItem>
          <RevealItem>
            <p className="max-w-[68ch] font-serif text-lg leading-relaxed text-primary">
              Recently graduated in software engineering from Polytechnique
              Montréal. Currently building independent projects and deepening
              my systems and infrastructure skills.
            </p>
          </RevealItem>
        </RevealGroup>
      </section>

      <ContactSection />
    </main>
  );
}
