import { DriftImage } from "@/components/media/DriftImage";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { about } from "@/lib/content";
import { photos } from "@/lib/images";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-ink py-20 sm:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-[112rem] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16 xl:gap-24">
          {/* The profile frame carries its own falloff to the right, so it sits
              against the copy column without needing a divider. */}
          <Reveal className="lg:col-span-6">
            <DriftImage
              photo={photos.profile}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="aspect-[4/5] sm:aspect-[16/10] lg:aspect-[4/5]"
              amount={30}
            />
          </Reveal>

          <div className="lg:col-span-6 xl:col-span-5">
            <Reveal>
              <SectionLabel>{about.label}</SectionLabel>
            </Reveal>

            <Reveal delay={80}>
              <h2
                id="about-heading"
                className="display mt-6 text-[clamp(2.1rem,4.6vw,3.5rem)] uppercase text-bone"
              >
                {about.heading.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h2>
            </Reveal>

            <Reveal delay={140}>
              <div className="mt-10 border border-dashed border-champagne-deep/50 p-6 sm:p-8">
                <p className="eyebrow">Placeholder</p>
                <p className="display mt-4 text-[clamp(1.4rem,3vw,2rem)] text-bone">
                  [{about.placeholder.note}]
                </p>
                <p className="mt-5 font-sans text-[0.85rem] leading-[1.8] text-bone-muted">
                  Replace this panel with the biography. The following details
                  will make the strongest case to a booker:
                </p>
                <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {about.placeholder.prompts.map((prompt) => (
                    <li
                      key={prompt}
                      className="flex items-start gap-3 font-sans text-[0.78rem] leading-relaxed tracking-[0.06em] text-bone-faint"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-px w-4 shrink-0 bg-champagne-deep"
                      />
                      {prompt}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
