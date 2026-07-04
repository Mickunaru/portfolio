type Line =
  | { kind: "prompt"; text: string }
  | { kind: "blank" }
  | { kind: "check"; text: string }
  | { kind: "metric"; label: string; value: string; accent?: boolean };

const lines: Line[] = [
  { kind: "prompt", text: "locust -f locustfile.py --users 10 --headless" },
  { kind: "blank" },
  { kind: "check", text: "environment: Docker (1.0 vCPU, 1GB RAM)" },
  { kind: "check", text: "endpoints tested: /claim/parse/pdf, /recommendation" },
  { kind: "blank" },
  { kind: "metric", label: "concurrent_users", value: "10 (Sustained)" },
  { kind: "metric", label: "throughput", value: "3 req/s" },
  { kind: "metric", label: "response_time", value: "med=16ms  p(95)=26ms", accent: true },
  { kind: "metric", label: "error_rate", value: "0.00%", accent: true },
  { kind: "metric", label: "peak_cpu_load", value: "9.00% (Highly Efficient)", accent: true },
  { kind: "metric", label: "status", value: "PASS / ACCEPTED" },
];

export function TerminalCard() {
  return (
    <div className="flex aspect-video w-full flex-col bg-bg border border-line overflow-hidden">
      {/* Windows chrome */}
      <div className="flex items-center justify-between border-b border-line px-3 py-2 bg-bg/50">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] text-accent">{">_"}</span>
          <span className="font-sans text-[11px] text-muted tracking-wide">
            Windows PowerShell
          </span>
        </div>
        <div className="flex items-center gap-3 font-mono text-[10px] text-muted">
          <span className="cursor-default hover:text-secondary">─</span>
          <span className="cursor-default hover:text-secondary">□</span>
          <span className="cursor-default text-xs hover:text-red-500 hover:bg-red-500/10 px-1 -mr-1 rounded">✕</span>
        </div>
      </div>

      {/* output */}
      <div className="flex flex-1 flex-col justify-center gap-1 px-5 font-mono text-[11px] leading-relaxed sm:text-xs">
        {lines.map((line, i) => {
          if (line.kind === "blank") return <div key={i} className="h-1.5" />;
          
          if (line.kind === "prompt") {
            return (
              <div key={i} className="text-secondary">
                <span className="text-accent">PS C:\Projects\Portfolio&gt;</span> {line.text}
              </div>
            );
          }
          
          if (line.kind === "check") {
            return (
              <div key={i} className="text-muted">
                <span className="text-accent">✓</span> {line.text}
              </div>
            );
          }
          
          return (
            <div key={i} className="flex items-baseline gap-2 text-muted">
              <span className="min-w-[10rem] text-secondary">{line.label}</span>
              <span className={line.accent ? "text-accent" : "text-secondary"}>
                {line.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}