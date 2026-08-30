import { LiteYouTube } from "@/components/media/LiteYouTube";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { watch } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export function WatchTheShow() {
  return (
    <section
      id="video"
      aria-labelledby="video-heading"
      className="border-y border-line-soft bg-ink-deep py-20 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-[92rem] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div>
            <Reveal>
              <SectionLabel>{watch.label}</SectionLabel>
            </Reveal>
            <Reveal delay={80}>
              <h2
                id="video-heading"
                className="display mt-5 text-[clamp(2.75rem,9vw,7rem)] uppercase text-bone"
              >
                {watch.heading}
              </h2>
            </Reveal>
          </div>

          <Reveal delay={140} className="lg:max-w-sm lg:pb-3">
            <p className="font-sans text-[0.95rem] leading-[1.85] text-bone-muted">
              {watch.standfirst}
            </p>
          </Reveal>
        </div>

        <Reveal delay={120} className="mt-10 sm:mt-14">
          <div className="relative">
            {/* Offset champagne rule: a printed frame rather than a border box. */}
            <span
              aria-hidden="true"
              className="absolute -left-2 -top-2 hidden h-24 w-px bg-champagne-deep sm:block"
            />
            <span
              aria-hidden="true"
              className="absolute -left-2 -top-2 hidden h-px w-24 bg-champagne-deep sm:block"
            />
            <LiteYouTube
              videoId={siteConfig.video.id}
              title={siteConfig.video.title}
              poster={siteConfig.video.poster}
              startAt={siteConfig.video.startAt}
            />
            <span
              aria-hidden="true"
              className="absolute -bottom-2 -right-2 hidden h-24 w-px bg-champagne-deep sm:block"
            />
            <span
              aria-hidden="true"
              className="absolute -bottom-2 -right-2 hidden h-px w-24 bg-champagne-deep sm:block"
            />
          </div>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-6 font-sans text-[0.7rem] uppercase tracking-[0.24em] text-bone-faint">
            {watch.captionPlaceholder}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
