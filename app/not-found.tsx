import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { company } from "@/lib/content";

export const metadata: Metadata = {
  title: `Page not found | ${company.name}`,
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className="nf">
      <Link href="/" aria-label={`${company.name} home`}>
        <Image src="/img/aks-logo-white.png" alt={company.name} width={403} height={36} priority />
      </Link>
      <div>
        <span className="mono">Error 404</span>
        <h1>This page isn&rsquo;t here.</h1>
        <p>The address may have changed when the site was rebuilt. Everything is on the home page.</p>
        <Link className="nf-btn" href="/">
          Back to the home page
        </Link>
      </div>
    </main>
  );
}
