export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6">
      {/* Temporary font check — replaced by real sections in later steps. */}
      <h1 className="font-serif text-4xl">Fraunces — the voice.</h1>
      <p className="font-serif text-lg italic">
        Problem solver by day. Gamer by night.
      </p>
      <p className="font-sans text-base">Inter — the structure.</p>
      <p className="font-mono text-sm">JetBrains Mono — the texture.</p>
    </main>
  );
}
