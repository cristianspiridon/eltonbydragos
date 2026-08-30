import { DriftImage } from "@/components/media/DriftImage";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { experience } from "@/lib/content";
import { photos } from "@/lib/images";

export function Experience() {
  return (
    <section
      id="the-show"
      aria-labelledby="the-show-heading"
      className="bg-ink py-20 sm:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-[112rem] px-5 sm:px-8 lg:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16 xl:gap-24">
          <Reveal className="lg:col-span-6 xl:col-span-6">
            <DriftImage
              photo={photos.stageLights}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="aspect-[4/5] sm:aspect-[3/2] lg:aspect-[4/5]"
              amount={30}
            />
          </Reveal>

          <div className="lg:col-span-6 xl:col-span-5 xl:col-start-8">
            <Reveal>
              <SectionLabel>{experience.label}</SectionLabel>
            </Reveal>

            <Reveal delay={80}>
              <h2
                id="the-show-heading"
                className="display mt-6 text-[clamp(2.5rem,7.5vw,5rem)] uppercase text-bone"
              >
                {experience.heading.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h2>
            </Reveal>

            <Reveal delay={140}>
              <p className="display mt-8 max-w-xl text-[clamp(1.35rem,2.6vw,1.9rem)] leading-[1.25] tracking-normal text-champagne-bright">
                {experience.lead}
              </p>
            </Reveal>

            <Reveal delay={200}>
              <hr className="rule mt-8 max-w-xs" />
            </Reveal>

            <div className="mt-8 max-w-xl space-y-5">
              {experience.body.map((paragraph, index) => (
                <Reveal key={paragraph} delay={240 + index * 60}>
                  <p className="font-sans text-[0.95rem] leading-[1.85] tracking-[0.01em] text-bone-muted sm:text-base">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
