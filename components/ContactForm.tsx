"use client";

import { useState } from "react";
import { ranges } from "@/lib/content";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <form
      className="form rv"
      data-d="2"
      onSubmit={(e) => {
        e.preventDefault();
        // Wire this to a route handler, a form service or an email API.
        setSent(true);
      }}
    >
      <div className="fl">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" placeholder="Your name" required />
      </div>
      <div className="fl">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" placeholder="Mill or converter" />
      </div>
      <div className="fl">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" placeholder="you@company.com" required />
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
        <textarea id="brief" name="brief" placeholder="Substrate, machine, target result" />
      </div>
      <button type="submit">{sent ? "Thank you" : "Send enquiry"}</button>
    </form>
  );
}
