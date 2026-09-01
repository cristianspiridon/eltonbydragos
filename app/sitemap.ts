import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

/**
 * Bump this when the homepage content genuinely changes.
 *
 * It is a fixed date rather than new Date() on purpose. Building the date at
 * deploy time told crawlers the page had changed every time anything shipped,
 * including changes that never touched the copy, and Google discounts a
 * lastmod it cannot trust.
 */
const LAST_CONTENT_UPDATE = "2026-09-01";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
