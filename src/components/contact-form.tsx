"use client";

import { useState } from "react";

/* Zero-backend: composes a mailto: from the fields. To upgrade, swap the
   submit handler for a Formspree / Web3Forms POST. */
export function ContactForm() {
  const [note, setNote] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");

    const subject = `Message from ${name}`;
    const body = `${message}\n\n- ${name} (${email})`;
    window.location.href = `mailto:michaelle1248@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setNote(true);
  };

  const fieldClass =
    "rounded-md border border-line bg-surface px-3 py-2 font-sans text-sm text-primary placeholder:text-muted focus:border-accent focus:outline-none focus-visible:outline-2 focus-visible:outline-accent";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-name" className="font-sans text-sm text-secondary">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className={fieldClass}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-email" className="font-sans text-sm text-secondary">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={fieldClass}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-message" className="font-sans text-sm text-secondary">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          className={`${fieldClass} resize-y`}
        />
      </div>
      <div className="flex items-center gap-4">
        <button
          type="submit"
          className="w-fit rounded-md border border-accent px-4 py-2 font-sans text-sm text-accent transition-colors duration-200 hover:bg-accent hover:text-bg focus-visible:outline-2 focus-visible:outline-accent"
        >
          Send message
        </button>
        <p
          aria-live="polite"
          className="font-sans text-sm text-muted"
        >
          {note ? "Opening your mail app…" : ""}
        </p>
      </div>
    </form>
  );
}
