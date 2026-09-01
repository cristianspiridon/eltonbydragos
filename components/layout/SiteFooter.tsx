import { BrandMark } from "./BrandMark";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { siteConfig } from "@/lib/site";

/** Profiles without a URL yet are dropped rather than linked nowhere. */
const socialLinks = [
  { label: "Instagram", platform: "instagram", href: siteConfig.social.instagram },
  { label: "Facebook", platform: "facebook", href: siteConfig.social.facebook },
  { label: "YouTube", platform: "youtube", href: siteConfig.social.youtube },
].filter(
  (link): link is { label: string; platform: "instagram" | "facebook" | "youtube"; href: string } =>
    Boolean(link.href),
);

export function SiteFooter() {
  return (
    <footer className="border-t border-line-soft bg-ink-deep">
      <div className="mx-auto max-w-[112rem] px-5 py-14 sm:px-8 sm:py-16 lg:px-12">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <BrandMark />
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:gap-20">
            <div>
              <h2 className="eyebrow">Follow</h2>
              <ul className="mt-5 space-y-3">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <TrackedLink
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      event={{
                        name: "Social Click",
                        platform: link.platform,
                        location: "footer",
                      }}
                      className="font-sans text-sm tracking-[0.06em] text-bone-muted underline-offset-8 transition-colors hover:text-champagne-bright hover:underline"
                    >
                      {link.label}
                      {/* Visible text stays first, so the accessible name still
                          starts with the label (WCAG 2.5.3). */}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </TrackedLink>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="eyebrow">Bookings</h2>
              <ul className="mt-5 space-y-3">
                <li>
                  <TrackedLink
                    href={`mailto:${siteConfig.contact.email}`}
                    event={{ name: "Contact Click", location: "footer", method: "email" }}
                    className="font-sans text-sm tracking-[0.06em] text-bone underline-offset-8 transition-colors hover:text-champagne-bright hover:underline"
                  >
                    {siteConfig.contact.email}
                  </TrackedLink>
                </li>
                {siteConfig.contact.phone && (
                  <li>
                    <TrackedLink
                      href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                      event={{ name: "Contact Click", location: "footer", method: "phone" }}
                      className="font-sans text-sm tracking-[0.06em] text-bone-muted transition-colors hover:text-champagne-bright"
                    >
                      {siteConfig.contact.phone}
                    </TrackedLink>
                  </li>
                )}
                <li>
                  {/* Native anchor, not next/link: see ButtonLink. */}
                  <TrackedLink
                    href="#book"
                    event={{ name: "Booking Click", location: "footer", method: "anchor" }}
                    className="font-sans text-sm tracking-[0.06em] text-bone-muted underline-offset-8 transition-colors hover:text-champagne-bright hover:underline"
                  >
                    Check availability
                  </TrackedLink>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="mt-14 border-0 border-t border-line-soft" />

        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-xl font-sans text-[0.7rem] leading-relaxed tracking-[0.04em] text-bone-faint">
            {siteConfig.disclaimer}
          </p>
          <p className="font-sans text-[0.7rem] tracking-[0.12em] text-bone-faint">
            © {new Date().getFullYear()} {siteConfig.brand.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
