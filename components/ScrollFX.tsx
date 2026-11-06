"use client";

import { useEffect } from "react";

/**
 * The only client-side code on the page: solidifies the masthead on scroll,
 * reveals `.rv` elements as they enter the viewport, and runs the hero line
 * reveal once on mount. Everything else is a server component.
 */
export default function ScrollFX() {
  useEffect(() => {
    const header = document.getElementById("hd");
    const onScroll = () => header?.classList.toggle("solid", window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll(".rv").forEach((n) => io.observe(n));

    // two frames so the starting transform is painted before it animates
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => document.querySelector(".hero")?.classList.add("go"));
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, []);

  return null;
}
