"use client";

import { useState } from "react";
import { company, ranges } from "@/lib/content";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    setError("");

    try {
      // Handled by public/contact.php on the PHP host (see README > Hosting).
      const res = await fetch("/contact.php", { method: "POST", body: new FormData(form) });
      const data: { ok: boolean; error?: string } = await res.json().catch(() => ({ ok: false }));
      if (!res.ok || !data.ok) throw new Error(data.error || "We couldn't send your enquiry.");
      form.reset();
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "We couldn't send your enquiry.");
      setStatus("error");
    }
  }

  const sending = status === "sending";

  return (
    <form className="form rv" data-d="2" onSubmit={onSubmit} aria-busy={sending}>
      <div className="fl">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" placeholder="Your name" autoComplete="name" maxLength={120} required />
      </div>
      <div className="fl">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" placeholder="Mill or converter" autoComplete="organization" maxLength={160} />
      </div>
      <div className="fl">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" placeholder="you@company.com" autoComplete="email" maxLength={200} required />
      </div>
      <div className="fl">
        <label htmlFor="process">Process</label>
        <select id="process" name="process" defaultValue={ranges[0].name}>
          {ranges.map((r) => (
            <option key={r.n}>{r.name}</option>
          ))}
          <option>Toll manufacturing</option>
        </select>
      </div>
      <div className="fl">
        <label htmlFor="brief">What you need</label>
        <textarea id="brief" name="brief" placeholder="Substrate, machine, target result" maxLength={4000} />
      </div>

      {/* Spam trap: hidden from people and screen readers, bots fill it in. */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="website">Leave this empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button type="submit" disabled={sending}>
        {sending ? "Sending..." : "Send enquiry"}
      </button>

      <p className="note">We use these details only to reply to your enquiry.</p>

      <p className={`status${status === "error" ? " err" : ""}`} role="status" aria-live="polite">
        {status === "sent" && "Thank you. A technician will be in touch shortly."}
        {status === "error" && (
          <>
            {error} Please try again, or email us at{" "}
            <a href={`mailto:${company.email}`}>{company.email}</a>.
          </>
        )}
      </p>
    </form>
  );
}
