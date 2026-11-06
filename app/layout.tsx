import type { Metadata } from "next";
import localFont from "next/font/local";
import ScrollFX from "@/components/ScrollFX";
import { company, shots } from "@/lib/content";
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
      </head>
      <body>
        {children}
        <ScrollFX />
      </body>
    </html>
  );
}
