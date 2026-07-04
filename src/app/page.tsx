import { ContactSection } from "@/components/contact-section";
import { MadeSection } from "@/components/made-section";
import { RevealGroup, RevealItem } from "@/components/reveal";
import { SunMoon } from "@/components/sun-moon";

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
          className="hero-rise font-sans text-sm text-secondary"
          style={{ "--rise-i": 1 } as React.CSSProperties}
        >
          Michael Le
        </p>
        <h1
          className="hero-rise-solid font-serif text-4xl text-primary sm:text-5xl"
          style={{ "--rise-i": 2 } as React.CSSProperties}
        >
          I build software the way I play games — all the way to{" "}
          <span className="text-accent">100%</span>.
        </h1>
        <p
          className="hero-rise font-serif text-lg italic text-secondary"
          style={{ "--rise-i": 3 } as React.CSSProperties}
        >
          Problem solver by day. Gamer by night.
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
          <div className="flex max-w-[68ch] flex-col gap-5">
            <RevealItem>
              <p className="font-serif text-2xl leading-snug text-primary">
                I didn&apos;t start in software.
              </p>
            </RevealItem>
            <RevealItem>
              <p className="font-serif text-lg leading-relaxed text-primary">
                I was on the natural-sciences track in CEGEP when a show about
                a start-up got me. Watching the characters go all in with
                nothing but an idea and actually build it into something real,
                chasing it with everything they had, flipped a switch. I wanted
                that kind of ownership, that kind of experience.
              </p>
            </RevealItem>
            <RevealItem>
              <p className="font-serif text-lg leading-relaxed text-primary">
                So I moved to software engineering at Polytechnique Montréal
                and started chasing the same feeling: the thrill of creating
                something of your own with just some characters on the screen.
              </p>
            </RevealItem>
            <RevealItem>
              <p className="font-serif text-lg leading-relaxed text-primary">
                Turned out the whole path is the fun part.{" "}
                <em>The messy middle as much as the finish line.</em> And when
                the thing you built actually helps someone on the other end,
                that&apos;s what makes it worthwhile.
              </p>
            </RevealItem>
          </div>
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
              Just wrapped my software engineering degree. Right now I&apos;m
              building whatever pulls me in and teaching myself whatever it
              demands. Off the clock, I&apos;m deep into my virtual world.
            </p>
          </RevealItem>
        </RevealGroup>
      </section>

      <ContactSection />
    </main>
  );
}
