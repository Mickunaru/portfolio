/* From the Next.js guide "preventing-flash-before-hydration": runs as real
   script during HTML parsing on the server render, inert text/plain on the
   client so React doesn't warn about rendered script tags. */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
