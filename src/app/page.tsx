import { ThemeToggle } from "@/components/theme-toggle";

/* Temporary theme test page — replaced by real sections in later steps. */
export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-10 px-6 py-16">
      <div className="flex items-center justify-between">
        <span className="font-mono text-sm text-muted">theme check</span>
        <ThemeToggle />
      </div>

      <div className="flex flex-col gap-3">
        <h1 className="font-serif text-4xl text-primary">
          I build software the way I play games — all the way to{" "}
          <span className="text-accent">100%</span>.
        </h1>
        <p className="font-serif text-lg italic text-secondary">
          Problem solver by day. Gamer by night.
        </p>
        <p className="text-base text-secondary">
          Secondary text — descriptions and form labels live at this level.
        </p>
        <p className="font-mono text-sm text-muted">
          muted mono — eyebrows · meta lines · tags
        </p>
        <a href="#" className="text-accent underline underline-offset-4">
          Accent link with hover
        </a>
      </div>

      <div className="rounded-lg border border-line bg-surface p-6">
        <p className="text-primary">Surface panel with border token.</p>
        <p className="mt-2 text-sm text-secondary">
          Project frames and form fields sit on this layer.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-2 font-mono text-xs text-muted">
        {[
          ["bg", "bg-bg border border-line"],
          ["surface", "bg-surface border border-line"],
          ["accent", "bg-accent"],
          ["accent-soft", "bg-accent-soft"],
        ].map(([name, cls]) => (
          <div key={name} className="flex flex-col gap-1">
            <div className={`h-10 rounded ${cls}`} />
            <span>{name}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
