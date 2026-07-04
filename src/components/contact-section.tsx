import { ContactForm } from "@/components/contact-form";

const directLinks = [
  { label: "Email", text: "michaelle1248@gmail.com", href: "mailto:michaelle1248@gmail.com" },
  { label: "GitHub", text: "github.com/Mickunaru", href: "https://github.com/Mickunaru" },
  { label: "LinkedIn", text: "linkedin.com/in/michael-ht-le", href: "https://linkedin.com/in/michael-ht-le" },
  { label: "Steam", text: "steamcommunity.com/id/mickunaru", href: "https://steamcommunity.com/id/mickunaru/" },
];

export function ContactSection() {
  return (
    <section id="contact" className="flex flex-col gap-4 py-28">
      <p className="font-mono text-xs uppercase tracking-widest text-muted">
        contact
      </p>
      <h2 className="font-serif text-3xl text-primary">Get in touch.</h2>
      <p className="max-w-[60ch] font-sans text-base text-secondary">
        Have a role, a project, or just want to say hi? Drop me a line and
        I&apos;ll get back to you.
      </p>

      <div className="mt-6 grid gap-12 md:grid-cols-[3fr_2fr]">
        <ContactForm />

        <aside className="flex flex-col gap-4">
          <h3 className="font-sans text-sm font-medium text-primary">
            Or reach me directly
          </h3>
          <ul className="flex flex-col gap-2.5">
            {directLinks.map(({ label, text, href }) => (
              <li key={label} className="flex flex-col font-sans text-sm">
                <span className="text-muted">{label}</span>
                <a
                  href={href}
                  {...(href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="w-fit break-words text-secondary underline-offset-4 hover:text-accent hover:underline focus-visible:outline-2 focus-visible:outline-accent"
                >
                  {text}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="/cv.pdf"
            className="mt-2 w-fit rounded-md border border-line px-4 py-2 font-sans text-sm text-secondary transition-colors duration-200 hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
          >
            Download CV
          </a>
        </aside>
      </div>
    </section>
  );
}
