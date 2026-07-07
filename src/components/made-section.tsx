import Image from "next/image";
import type { ReactNode } from "react";
import { RevealGroup, RevealItem } from "@/components/reveal";
import { TerminalCard } from "@/components/terminal-card";
import { TiltFrame } from "@/components/tilt-frame";
import { TerraformCard } from "./terraform-card";

type Project = {
  outcome: ReactNode;
  alt: string;
  meta: string;
  repo?: { label: string; href: string };
  description: ReactNode;
  tags: string[];
  screenshot: string | null;
  visual?: ReactNode;
};

const projects: Project[] = [
  {
    outcome:
      "Insurance-recommendation platform on a single vCPU: 17 ms median, 0% errors under load",
    alt: "Screenshot of the insurance-recommendation capstone app",
    meta: "2026 · Capstone",
    description:
      "Capstone for Sollio & Mitco7. DevSecOps pipeline with zero vulnerability regressions, plus an AI pipeline that categorized sensitive claims with privacy kept intact.",
    tags: ["C# / ASP.NET", "AWS", "Gemini"],
    screenshot: null,
    visual: <TerminalCard />,
  },
  {
    outcome:
      "Shipped production software for two years while finishing my degree",
    alt: "Screenshot of the Shopify–HubSpot sync pipeline at Okapya",
    meta: "2024–2026 · Okapya",
    description: (
      <>
        At Okapya: new features shipped end-to-end for{" "}
        <em>Checklist for monday</em>, a SaaS app on the monday.com
        marketplace, plus a fault-tolerant Shopify→HubSpot pipeline I built
        solo with 100% sync consistency. Across both, I took test coverage
        from zero to 95%+.
      </>
    ),
    tags: ["Node.js", "TypeScript", "React"],
    screenshot: null,
    visual: (
      <>
        <Image
          src="/okapya_data_pipeline_dark.png"
          alt="Screenshot of the Shopify–HubSpot sync pipeline at Okapya"
          width={1280}
          height={720}
          className="night-only aspect-video w-full object-cover grayscale-25 transition-[filter] duration-300 group-hover/frame:grayscale-0"
        />
        <Image
          src="/okapya_data_pipeline_light.png"
          alt="Screenshot of the Shopify–HubSpot sync pipeline at Okapya"
          width={1280}
          height={720}
          className="day-only aspect-video w-full object-cover grayscale-25 transition-[filter] duration-300 group-hover/frame:grayscale-0"
        />
      </>
    ),
  },
  {
    outcome:
      "MySQL cluster on AWS, provisioned by Terraform in under 2 minutes",
    alt: "Diagram of the master-replica MySQL cluster on AWS",
    meta: "2025",
    repo: {
      label: "github.com/Mickunaru/LOG8415-Project",
      href: "https://github.com/Mickunaru/LOG8415-Project",
    },
    description:
      "A master-replica MySQL setup on AWS with a Python proxy doing latency-based routing. Held 100% success across 86,000+ queries at 8,500+ QPS.",
    tags: ["Terraform", "AWS", "Python"],
    screenshot: null,
    visual: <TerraformCard />,
  },
  {
    outcome: "Rebuilt a legacy quiz platform in Flutter with 100% feature parity",
    alt: "Screenshot of the Kazoo quiz platform",
    meta: "2025",
    repo: {
      label: "github.com/Mickunaru/Kazoo",
      href: "https://github.com/Mickunaru/Kazoo",
    },
    description:
      "Real-time avatars synced over Firebase across 10+ modules, and 30+ merge requests reviewed to keep the team unblocked.",
    tags: ["Flutter", "Node.js", "Firebase"],
    screenshot: "/kazoo.png",
  },
  {
    outcome: "RAG assistant with cited answers: 0.94 recall, 0.87 faithfulness",
    alt: "Screenshot of the AskTheSpire RAG assistant",
    meta: "2026",
    repo: {
      label: "github.com/Mickunaru/AskTheSpire",
      href: "https://github.com/Mickunaru/AskTheSpire",
    },
    description: (
      <>
        End-to-end retrieval that answers <em>Slay the Spire</em> questions
        with citations, using hybrid search and query expansion tuned against
        real eval metrics.
      </>
    ),
    tags: ["Python", "Chroma", "Claude API"],
    screenshot: "/askthespire.png",
  },
];

function ProjectFrame({ project }: { readonly project: Project }) {
  const renderContent = () => {
    if (project.screenshot) {
      return (
        <Image
          src={project.screenshot}
          alt={project.alt}
          width={1280}
          height={720}
          className="aspect-video w-full object-cover grayscale-25 transition-[filter] duration-300 group-hover/frame:grayscale-0"
        />
      );
    }

    if (project.visual) {
      return project.visual;
    }

    return (
      <div className="flex aspect-video w-full items-center justify-center">
        <span className="font-mono text-xs text-muted">
          screenshot coming soon
        </span>
      </div>
    );
  };

  return <TiltFrame>{renderContent()}</TiltFrame>;
}

export function MadeSection() {
  return (
    <section id="made" className="flex flex-col gap-4 py-28">
      <RevealGroup className="flex flex-col gap-4">
        <RevealItem>
          <p className="font-mono text-xs tracking-widest text-muted">03</p>
        </RevealItem>
        <RevealItem>
          <h2 className="font-serif text-3xl text-primary">Made</h2>
        </RevealItem>
      </RevealGroup>
      <ul className="mt-6 flex flex-col gap-20">
        {projects.map((project, i) => (
          <li key={i}>
            <RevealGroup className="flex flex-col gap-3">
              <RevealItem>
                <ProjectFrame project={project} />
              </RevealItem>
              <RevealItem>
                <p className="mt-2 font-mono text-xs text-muted">
                  {project.meta}
                  {project.repo && (
                    <>
                      {" · "}
                      <a
                        href={project.repo.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-accent"
                      >
                        {project.repo.label}
                      </a>
                    </>
                  )}
                </p>
              </RevealItem>
              <RevealItem>
                <h3 className="font-serif text-xl font-semibold text-primary">
                  {project.outcome}
                </h3>
              </RevealItem>
              <RevealItem>
                <p className="text-base leading-relaxed text-secondary">
                  {project.description}
                </p>
              </RevealItem>
              <RevealItem>
                <p className="font-mono text-xs text-muted">
                  {project.tags.join(" · ")}
                </p>
              </RevealItem>
            </RevealGroup>
          </li>
        ))}
      </ul>
    </section>
  );
}
