import type { MetadataRoute } from "next";
import { articles } from "@/content/resources";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-10-07");
  const paths = [
    "",
    "/how-heas-work",
    "/for-contractors",
    "/resources",
    "/about",
    "/privacy",
    "/terms",
  ];

  return [
    ...paths.map((path) => ({
      url: `${siteUrl}${path || "/"}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...articles.map((article) => ({
      url: `${siteUrl}/resources/${article.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
