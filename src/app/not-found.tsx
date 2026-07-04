import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-start justify-center gap-5 px-6 py-28">
      <p className="font-mono text-xs uppercase tracking-widest text-muted">
        404
      </p>
      <h1 className="font-serif text-4xl text-primary">
        Where am I...
      </h1>
      <Link
        href="/"
        className="font-sans text-sm text-secondary underline-offset-4 hover:text-accent hover:underline focus-visible:outline-2 focus-visible:outline-accent"
      >
        Take me home
      </Link>
    </main>
  );
}
