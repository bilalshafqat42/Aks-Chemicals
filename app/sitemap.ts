import type { MetadataRoute } from "next";
import { company } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${company.siteUrl}/`, changeFrequency: "monthly", priority: 1 }];
}
