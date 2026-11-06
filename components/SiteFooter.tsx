import Image from "next/image";
import Year from "./Year";
import { company, isoFull, ranges, summary } from "@/lib/content";

const ABOUT = [
  { href: "#about", label: "Who we are" },
  { href: "#ranges", label: "What we do" },
  { href: "#toll", label: "Toll manufacturing" },
  { href: "#compliance", label: "REACH compliance" },
  { href: "#contact", label: "Contact us" },
];

export default function SiteFooter() {
  return (
    <footer>
      <div className="fgrid">
        <div>
          <Image src="/img/aks-logo-white.png" alt={company.name} width={403} height={36} />
          <p>{summary}</p>
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
          <a href="#contact">{company.addressShort}</a>
        </div>
      </div>

      <div className="fbot">
        <span className="mono">
          &copy; <Year /> {company.name}
        </span>
        <span className="mono">{isoFull} &middot; REACH</span>
        <span className="mono credit">
          Photography: RephiLe water &middot; Bergstrand Consultancy &middot; Jimmy Nilsson Masth / Unsplash
        </span>
      </div>
    </footer>
  );
}
