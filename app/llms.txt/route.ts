import { about, availabilityStrip, music } from "@/lib/content";
import { siteConfig } from "@/lib/site";

/**
 * Plain-Markdown summary of the site for AI agents and answer engines.
 *
 * Generated from the same config and copy the page renders, so it cannot drift
 * out of sync with what a human visitor is told. Every line here is already
 * stated somewhere on the site: nothing about audiences, venues, awards,
 * pricing or availability is invented.
 */
export const dynamic = "force-static";

function buildDocument() {
  const watchUrl = `https://www.youtube.com/watch?v=${siteConfig.video.id}`;

  const lines = [
    `# ${siteConfig.brand.name}`,
    "",
    `${siteConfig.brand.name} is a live Elton John tribute show performed by ${about.name}, available for bookings across the ${siteConfig.contact.basedIn}.`,
    "",
    "## Summary",
    "",
    `- Show: ${siteConfig.brand.name} (${siteConfig.brand.subtitle})`,
    `- Performer: ${about.name}, also credited as ${siteConfig.performer.name}`,
    "- Format: live performance at the piano, playing the music of Elton John",
    `- Based in: ${siteConfig.contact.basedIn}`,
    `- Booking enquiries: ${siteConfig.contact.email}`,
    "",
    "## Available for",
    "",
    ...availabilityStrip.map((item) => `- ${item}`),
    "",
    "## Repertoire",
    "",
    ...music.songs.map((song) => `- ${song}`),
    "",
    music.footnote,
    "",
    "## Links",
    "",
    `- [Homepage](${siteConfig.url})`,
    `- [Sitemap](${siteConfig.url}/sitemap.xml)`,
    `- [Performance video](${watchUrl})`,
    ...(siteConfig.social.youtube
      ? [`- [YouTube channel](${siteConfig.social.youtube})`]
      : []),
    "",
    "## About the performer",
    "",
    about.lead,
    "",
    "## Disclaimer",
    "",
    siteConfig.disclaimer,
    "",
  ];

  return lines.join("\n");
}

export function GET() {
  return new Response(buildDocument(), {
    headers: {
      // text/plain so it opens in a browser rather than downloading. The body
      // is Markdown, which is what the llms.txt convention expects.
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
