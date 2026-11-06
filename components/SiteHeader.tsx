import Image from "next/image";
import MobileMenu from "./MobileMenu";
import { company, nav } from "@/lib/content";

export default function SiteHeader() {
  return (
    <header id="hd">
      <a className="lk" href="#top">
        <Image src="/img/aks-logo-white.png" alt={company.name} width={403} height={36} priority />
        <span className="est">EST. {company.founded}</span>
      </a>
      <nav className="dnav" aria-label="Main">
        {nav.map((n) => (
          <a key={n.href} href={n.href}>
            {n.label}
          </a>
        ))}
        <a className="cta" href="#contact">
          Contact
        </a>
      </nav>
      <MobileMenu />
    </header>
  );
}
