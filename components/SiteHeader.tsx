import Image from "next/image";
import { nav } from "@/lib/content";

export default function SiteHeader() {
  return (
    <header id="hd">
      <a className="lk" href="#top">
        <Image src="/img/aks-logo-white.png" alt="AKS Chemicals" width={403} height={36} priority />
        <span className="est">EST. 1987</span>
      </a>
      <nav>
        {nav.map((n) => (
          <a key={n.href} href={n.href}>
            {n.label}
          </a>
        ))}
        <a className="cta" href="#contact">
          Contact
        </a>
      </nav>
      <button className="burger" aria-label="Menu">
        <span />
      </button>
    </header>
  );
}
