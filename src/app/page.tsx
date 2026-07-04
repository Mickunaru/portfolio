import { ContactSection } from "@/components/contact-section";
import { MadeSection } from "@/components/made-section";
import { RevealGroup, RevealItem } from "@/components/reveal";
import { SunMoon } from "@/components/sun-moon";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6">
      <section id="home" className="flex min-h-[80vh] flex-col justify-center">
        <RevealGroup className="flex flex-col gap-5">
          <RevealItem>
            <SunMoon className="h-10 w-10 text-accent" />
          </RevealItem>
          <RevealItem>
            <p className="font-sans text-sm text-secondary">Michael Le</p>
          </RevealItem>
          <RevealItem>
            <h1 className="font-serif text-4xl text-primary sm:text-5xl">
              I build software the way I play games — all the way to{" "}
              <span className="text-accent">100%</span>.
            </h1>
          </RevealItem>
          <RevealItem>
            <p className="font-serif text-lg italic text-secondary">
              Problem solver by day. Gamer by night.
            </p>
          </RevealItem>
          <RevealItem>
            <p>
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 font-sans text-xs text-secondary">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-accent"
                />
                Open to opportunities
              </span>
            </p>
          </RevealItem>
        </RevealGroup>
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
