import type { Metadata } from "next";
import localFont from "next/font/local";
import ScrollFX from "@/components/ScrollFX";
import { company, ranges, shots } from "@/lib/content";
import "./globals.css";

const display = localFont({
  variable: "--font-display",
  display: "swap",
  src: [
    { path: "./fonts/newsreader-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/newsreader-latin-400-italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/newsreader-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/newsreader-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
});

const body = localFont({
  variable: "--font-body",
  display: "swap",
  src: [
    { path: "./fonts/inter-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/inter-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/inter-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "./fonts/inter-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
});

const mono = localFont({
  variable: "--font-mono",
  display: "swap",
  src: [{ path: "./fonts/jetbrains-mono-latin-500-normal.woff2", weight: "500", style: "normal" }],
});

const description = `Manufacturer and supplier of textile chemicals. Pretreatment, dyeing auxiliaries, finishes, denim washing and special finishing. ${company.city}, since ${company.founded}.`;

export const metadata: Metadata = {
  metadataBase: new URL(company.siteUrl),
  title: `${company.name} | ${company.tagline}`,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: company.name,
    title: company.name,
    description,
    url: "/",
    images: [{ url: shots.production.src, width: shots.production.w, height: shots.production.h, alt: shots.production.alt }],
  },
  twitter: { card: "summary_large_image", title: company.name, description, images: [shots.production.src] },
};

/**
 * Runs before first paint. Reveal animations only hide content once this class
 * is present, so the page stays fully readable if JavaScript fails to load.
 */
const jsFlag = `document.documentElement.classList.add("js")`;

/**
 * Structured data for search engines and AI assistants: who AKS is, where, since
 * when, and what it makes. Built from lib/content.ts, so it cannot drift from the
 * page. No ISO edition here until the current certificate is confirmed.
 */
const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${company.siteUrl}/#organization`,
  name: company.name,
  url: company.siteUrl,
  logo: `${company.siteUrl}/img/aks-logo.png`,
  description,
  foundingDate: String(company.founded),
  email: company.email,
  telephone: company.phones[0].replace(/\s+/g, ""),
  address: {
    "@type": "PostalAddress",
    streetAddress: company.address[0],
    addressLocality: "Lahore",
    addressCountry: "PK",
  },
  areaServed: "Worldwide",
  knowsAbout: [
    "Textile chemicals",
    "Textile auxiliaries",
    ...ranges.map((r) => r.name),
    "Toll manufacturing",
  ],
  makesOffer: ranges.map((r) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Product", name: `${r.name} chemicals`, description: r.blurb },
  })),
};

const siteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${company.siteUrl}/#website`,
  url: company.siteUrl,
  name: company.name,
  publisher: { "@id": `${company.siteUrl}/#organization` },
  inLanguage: "en",
};

/** Escapes "<" so a string in the data can never close the script tag. */
const jsonLd = (o: object) => JSON.stringify(o).replace(/</g, "\\u003c");

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(orgSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(siteSchema) }} />
      </head>
      <body>
        {children}
        <ScrollFX />
      </body>
    </html>
  );
}
