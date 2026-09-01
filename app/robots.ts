import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

/**
 * One rule for every crawler, deliberately vendor-neutral.
 *
 * The wildcard group already permits every bot that exists or will exist,
 * AI crawlers included, so naming individual agents grants no access they do
 * not already have. Naming them is also a footgun: a crawler that matches a
 * named group ignores the wildcard group completely, so a Disallow added to *
 * later would silently not apply to whichever agents had been singled out.
 *
 * Add a named group only if some bot ever needs genuinely different treatment,
 * and if you do, remember it must then repeat every rule it should still obey.
 *
 * No host directive: it is a Yandex extension rather than part of the
 * robots.txt standard, and Google ignores it.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
