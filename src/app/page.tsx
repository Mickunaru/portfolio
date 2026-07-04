/* Placeholder sections — real content lands in steps 3–7 (plan.md).
   Ids match the nav anchors; generous vertical rhythm per SRS §5.3. */

const placeholders = [
  { id: "story", eyebrow: "story", title: "Story" },
  { id: "made", eyebrow: "made", title: "Made" },
  { id: "now", eyebrow: "now", title: "Now" },
  { id: "contact", eyebrow: "contact", title: "Get in touch." },
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-6">
      <section
        id="home"
        className="flex min-h-[70vh] flex-col justify-center gap-4"
      >
        <h1 className="font-serif text-4xl text-primary sm:text-5xl">
          I build software the way I play games — all the way to{" "}
          <span className="text-accent">100%</span>.
        </h1>
        <p className="font-serif text-lg italic text-secondary">
          Problem solver by day. Gamer by night.
        </p>
      </section>

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
