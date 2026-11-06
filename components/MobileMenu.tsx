"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { nav } from "@/lib/content";

/**
 * Burger button plus the full-screen menu it opens below 860px.
 * Closes on link tap, Escape, or when the viewport grows back to desktop.
 */
export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLElement>(null);

  const close = useCallback((returnFocus = false) => {
    setOpen(false);
    if (returnFocus) button.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";
    panel.current?.querySelector("a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close(true);
    };
    const desktop = window.matchMedia("(min-width: 861px)");
    const onResize = () => desktop.matches && close();

    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [open, close]);

  return (
    <>
      <button
        ref={button}
        type="button"
        className="burger"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mnav"
        onClick={() => setOpen((o) => !o)}
      >
        <span />
      </button>

      <nav
        ref={panel}
        id="mnav"
        className={`mnav${open ? " open" : ""}`}
        aria-label="Main"
        inert={!open}
      >
        {nav.map((n) => (
          <a key={n.href} href={n.href} onClick={() => close()}>
            {n.label}
          </a>
        ))}
        <a className="cta" href="#contact" onClick={() => close()}>
          Contact
        </a>
      </nav>
    </>
  );
}
