import { DriftImage } from "@/components/media/DriftImage";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { about } from "@/lib/content";
import { portrait } from "@/lib/images";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-ink py-20 sm:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-[112rem] px-5 sm:px-8 lg:px-12">
        {/* Masthead. The name carries the section, so the label stays quiet. */}
        <header className="max-w-4xl">
          <Reveal>
            <SectionLabel>{about.label}</SectionLabel>
          </Reveal>

          <Reveal delay={80}>
            <h2
              id="about-heading"
              className="display mt-6 text-[clamp(1.9rem,6vw,4.5rem)] uppercase leading-[0.95] text-bone"
            >
              {about.name}
            </h2>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-7 flex items-center gap-5 font-sans text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-champagne sm:text-[0.72rem] sm:tracking-[0.34em]">
              {about.disciplines}
              <span
                aria-hidden="true"
                className="hidden h-px flex-1 bg-gradient-to-r from-champagne-deep to-transparent sm:block"
              />
            </p>
          </Reveal>
        </header>

        {/* Portrait first in the DOM so mobile reads name, face, then story. */}
        <div className="mt-14 grid gap-12 sm:mt-16 lg:mt-20 lg:grid-cols-12 lg:items-center lg:gap-14 xl:gap-20">
          <Reveal className="lg:col-span-5">
            <div className="relative">
              {/* Offset outline, the framed-print device used on the showreel. */}
              <span
                aria-hidden="true"
                className="absolute -left-4 -top-4 hidden h-full w-full border border-champagne-deep/40 lg:block"
              />
              {/* Full width between sm and lg, so the tall portrait crop is
                  relaxed there to stop it running most of a tablet screen. */}
              <DriftImage
                photo={portrait}
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="relative aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5]"
                amount={26}
              />
            </div>

          </Reveal>

          {/* Capped measure: the column is wider than comfortable line length. */}
          <div className="max-w-[36rem] lg:col-span-6 lg:col-start-7">
            <Reveal>
              <p className="display text-[clamp(1.2rem,2.2vw,1.65rem)] leading-[1.4] text-bone">
                {about.lead}
              </p>
            </Reveal>

            <Reveal delay={80}>
              <div className="mt-8 space-y-6 border-l border-champagne-deep/30 pl-6 sm:pl-8">
                {about.career.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 24)}
                    className="font-sans text-[0.95rem] leading-[1.9] text-bone-muted sm:text-[1rem]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        {/* The hinge of the section: career on one side, this show on the other. */}
        <Reveal className="mt-20 sm:mt-28 lg:mt-32">
          <div className="flex flex-col items-center text-center">
            <span
              aria-hidden="true"
              className="h-14 w-px bg-gradient-to-b from-transparent to-champagne-deep sm:h-20"
            />
            <p className="display mt-8 max-w-5xl text-[clamp(1.55rem,4.4vw,3.5rem)] uppercase leading-[1.1] text-bone sm:mt-10">
              {about.turn.before}{" "}
              <span className="text-champagne">{about.turn.emphasis}</span>{" "}
              {about.turn.after}
            </p>
            <span
              aria-hidden="true"
              className="mt-8 h-14 w-px bg-gradient-to-t from-transparent to-champagne-deep sm:mt-10 sm:h-20"
            />
          </div>
        </Reveal>

        <Reveal delay={80} className="mx-auto mt-12 max-w-[38rem] sm:mt-16">
          <div className="space-y-6">
            {about.music.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="font-sans text-[0.95rem] leading-[1.9] text-bone-muted sm:text-[1.02rem]"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
