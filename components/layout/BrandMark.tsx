import { siteConfig } from "@/lib/site";

/**
 * Stacked wordmark. Reads the name from siteConfig so a rebrand is a one-file
 * change.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <span className={["block leading-none", className].filter(Boolean).join(" ")}>
      <span className="display block text-[0.92rem] uppercase tracking-[0.11em] text-bone sm:text-[1.2rem] sm:tracking-[0.14em]">
        {siteConfig.brand.nameLead}{" "}
        <span className="text-champagne">{siteConfig.brand.nameTrail}</span>
      </span>
      <span className="mt-1 block font-sans text-[0.45rem] font-medium uppercase tracking-[0.32em] text-bone-muted sm:text-[0.55rem] sm:tracking-[0.4em]">
        {siteConfig.brand.subtitle}
      </span>
    </span>
  );
}
