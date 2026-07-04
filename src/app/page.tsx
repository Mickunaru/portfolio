import { MadeSection } from "@/components/made-section";
import { SunMoon } from "@/components/sun-moon";

/* Placeholder sections — real content lands in steps 4–7 (plan.md).
   Ids match the nav anchors; generous vertical rhythm per SRS §5.3. */

const placeholders = [
  { id: "now", eyebrow: "now", title: "Now" },
  { id: "contact", eyebrow: "contact", title: "Get in touch." },
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-6">
      <section
        id="home"
        className="flex min-h-[80vh] flex-col justify-center gap-5"
      >
        <SunMoon className="h-10 w-10 text-accent" />
        <p className="font-sans text-sm text-secondary">Michael Le</p>
        <h1 className="font-serif text-4xl text-primary sm:text-5xl">
          I build software the way I play games — all the way to{" "}
          <span className="text-accent">100%</span>.
        </h1>
        <p className="font-serif text-lg italic text-secondary">
          Problem solver by day. Gamer by night.
        </p>
        <p>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 font-sans text-xs text-secondary">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-accent"
            />
            Open to opportunities
          </span>
        </p>
      </section>

      <section id="story" className="flex flex-col gap-4 py-28">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          story
        </p>
        <h2 className="font-serif text-3xl text-primary">Story</h2>
        <div className="flex max-w-[68ch] flex-col gap-5">
          <p className="font-serif text-2xl leading-snug text-primary">
            I didn&apos;t start in software.
          </p>
          <p className="font-serif text-lg leading-relaxed text-primary">
            I was on the natural-sciences track in CEGEP when a show about a
            start-up got me. Watching the characters go all in with nothing but
            an idea and actually build it into something real, chasing it with
            everything they had, flipped a switch. I wanted that kind of
            ownership, that kind of experience.
          </p>
          <p className="font-serif text-lg leading-relaxed text-primary">
            So I moved to software engineering at Polytechnique Montréal and
            started chasing the same feeling: the thrill of creating something
            of your own with just some characters on the screen.
          </p>
          <p className="font-serif text-lg leading-relaxed text-primary">
            Turned out the whole path is the fun part.{" "}
            <em>The messy middle as much as the finish line.</em>{" "}
            And when the
            thing you built actually helps someone on the other end,
            that&apos;s what makes it worthwhile.
          </p>
        </div>
      </section>

      <MadeSection />

      {placeholders.map(({ id, eyebrow, title }) => (
        <section id={id} key={id} className="flex flex-col gap-4 py-28">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            {eyebrow}
          </p>
          <h2 className="font-serif text-3xl text-primary">{title}</h2>
          <p className="text-secondary">Section content lands in a later step.</p>
        </section>
      ))}
    </main>
  );
}
