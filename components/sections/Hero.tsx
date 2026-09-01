import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { hero } from "@/lib/content";
import { photos } from "@/lib/images";
import { siteConfig } from "@/lib/site";

/**
 * Full-viewport opening frame.
 *
 * The photograph is the only frame in the set showing hands on the keys, so it
 * carries the whole proposition (singer, pianist, costume, stage) before a
 * word is read.
 */
export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink"
    >
      {/* Two compositions, not one scaled down.
          Below lg the frame occupies the upper stage and dissolves into black,
          giving the headline a clean plate. From lg it is full-bleed, pushed
          right of centre so the type falls on dark stage rather than the face. */}
      <div className="absolute inset-x-0 top-0 bottom-[34%] overflow-hidden lg:bottom-0 lg:left-[10%] lg:-right-[20%]">
        <Image
          src={photos.hero.src}
          alt={photos.hero.alt}
          fill
          priority
          fetchPriority="high"
          quality={78}
          sizes="(min-width: 1024px) 110vw, 100vw"
          placeholder="blur"
          blurDataURL={photos.hero.blurDataURL}
          className="object-cover object-[56%_30%] motion-safe:animate-hero-settle sm:object-[58%_22%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink from-12% via-ink/75 via-55% to-transparent lg:hidden"
        />
      </div>

      {/* Solid floor starting above the clip boundary. Rounding the clipped
          frame to device pixels can otherwise leave a single row of photograph
          showing along the seam. */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 top-[64%] bg-ink lg:hidden" />

      {/* Readability scrims, layered rather than one heavy wash. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink from-5% via-ink/60 via-45% to-transparent to-80% lg:via-ink/35"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-ink/75 to-transparent to-35%"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden bg-gradient-to-r from-ink via-ink/45 via-25% to-transparent to-65% lg:block"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 45%, transparent 30%, rgba(5,5,6,0.55) 100%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[112rem] px-5 pb-24 pt-32 sm:px-8 sm:pb-28 lg:px-12 lg:pb-[14vh]">
        <div className="max-w-4xl">
          <p className="eyebrow flex items-center gap-4 opacity-0 motion-safe:animate-[fade-up_1s_var(--ease-stage)_0.15s_forwards] motion-reduce:opacity-100">
            <span aria-hidden="true" className="h-px w-10 bg-champagne-deep" />
            {hero.eyebrow}
          </p>

          <h1 id="hero-heading" className="mt-6 sm:mt-8">
            <span className="sr-only">{hero.accessibleHeadline}</span>
            {hero.headlineLines.map((line, index) => (
              <span
                key={line}
                aria-hidden="true"
                className="display block text-[clamp(2.6rem,6.5vw,7rem)] uppercase text-bone opacity-0 [text-shadow:0_2px_40px_rgba(5,5,6,0.55)] motion-safe:animate-[fade-up_1.1s_var(--ease-stage)_forwards] motion-reduce:opacity-100"
                style={{ animationDelay: `${0.3 + index * 0.14}s` }}
              >
                {line}
              </span>
            ))}
          </h1>

          <p
            className="mt-7 max-w-xl font-sans text-base leading-relaxed tracking-[0.02em] text-bone/85 opacity-0 motion-safe:animate-[fade-up_1.1s_var(--ease-stage)_0.78s_forwards] motion-reduce:opacity-100 sm:mt-8 sm:text-lg"
          >
            {hero.standfirst}
          </p>

          <div
            className="mt-9 flex flex-col gap-3 opacity-0 motion-safe:animate-[fade-up_1.1s_var(--ease-stage)_0.92s_forwards] motion-reduce:opacity-100 sm:mt-11 sm:flex-row sm:gap-4"
          >
            {/* Scrolls to the video section rather than opening YouTube, so
                this is navigation. The play button reports the video click. */}
            <ButtonLink
              href="#video"
              variant="ghost"
              size="lg"
              event={{ name: "Navigation Click", destination: "video", location: "hero" }}
            >
              {siteConfig.cta.watch}
            </ButtonLink>
            <ButtonLink
              href="#book"
              variant="primary"
              size="lg"
              event={{ name: "Booking Click", location: "hero", method: "anchor" }}
            >
              {siteConfig.cta.primary}
            </ButtonLink>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-8 right-5 hidden items-center gap-4 sm:right-8 lg:flex lg:right-12"
      >
        <span className="font-sans text-[0.6rem] uppercase tracking-[0.36em] text-bone-muted">
          Scroll
        </span>
        <span className="relative block h-14 w-px overflow-hidden bg-bone/15">
          <span className="absolute inset-0 block bg-champagne motion-safe:animate-scroll-hint" />
        </span>
      </div>
    </section>
  );
}
