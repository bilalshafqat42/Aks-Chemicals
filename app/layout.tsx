import type { Metadata } from "next";
import localFont from "next/font/local";
import ScrollFX from "@/components/ScrollFX";
import { company } from "@/lib/content";
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

export const metadata: Metadata = {
  title: "AKS Chemicals",
  description:
    "Manufacturer and supplier of textile chemicals. Pretreatment, dyeing auxiliaries, finishes, denim washing and special finishing. Lahore, Pakistan, since 1987.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        {children}
        <ScrollFX />
      </body>
    </html>
  );
}
