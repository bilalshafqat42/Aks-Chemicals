import Image from "next/image";
import { company, ranges } from "@/lib/content";

const ABOUT = [
  { href: "#about", label: "About us" },
  { href: "#about", label: "Who we are" },
  { href: "#ranges", label: "What we do" },
  { href: "#compliance", label: "REACH compliance" },
  { href: "#contact", label: "Contact us" },
];

export default function SiteFooter() {
  return (
    <footer>
      <div className="fgrid">
        <div>
          <Image src="/img/aks-logo-white.png" alt="AKS Chemicals" width={403} height={36} />
          <p>Manufacturer and supplier of textile chemicals. Lahore, Pakistan, since 1987.</p>
        </div>

        <div className="fcol">
          <b>More about us</b>
          {ABOUT.map((a) => (
            <a href={a.href} key={a.label}>
              {a.label}
            </a>
          ))}
        </div>

        <div className="fcol">
          <b>Our services</b>
          {ranges.map((r) => (
            <a href="#ranges" key={r.n}>
              {r.name}
            </a>
          ))}
        </div>

        <div className="fcol">
          <b>Get in touch</b>
          <a href={`mailto:${company.email}`}>{company.email}</a>
          <a href={`tel:${company.phones[0].replace(/\s/g, "")}`}>{company.phones[0]}</a>
          <a href="#contact">544 A Faisal Town, Lahore</a>
        </div>
      </div>

      <div className="fbot">
        <span className="mono">&copy; {new Date().getFullYear()} AKS Chemicals</span>
        <span className="mono">ISO 9001:2008 &middot; REACH</span>
        <span
          className="mono"
          style={{ flexBasis: "100%", color: "#5A6370", fontSize: "9.5px", letterSpacing: ".14em" }}
        >
          Photography: Unsplash licence &middot; RephiLe water &middot; Bergstrand Consultancy &middot;
          Jimmy Nilsson Masth &middot; placeholder until AKS supply their own
        </span>
      </div>
    </footer>
  );
}
