import { DriftImage } from "@/components/media/DriftImage";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { perfectFor } from "@/lib/content";
import { photos } from "@/lib/images";

export function PerfectFor() {
  return (
    <section
      id="perfect-for"
      aria-labelledby="perfect-for-heading"
      className="border-y border-line-soft bg-ink-raised py-20 sm:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-[112rem] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <SectionLabel>{perfectFor.label}</SectionLabel>
              </Reveal>
              <Reveal delay={80}>
                <h2
                  id="perfect-for-heading"
                  className="display mt-6 text-[clamp(2.2rem,6vw,4rem)] uppercase text-bone"
                >
                  {perfectFor.heading.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h2>
              </Reveal>
              <Reveal delay={140} className="mt-10 hidden lg:block">
                <DriftImage
                  photo={photos.microphone}
                  sizes="(min-width: 1024px) 28vw, 100vw"
                  className="aspect-[5/6]"
                  amount={22}
                />
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <ul>
              {perfectFor.items.map((item, index) => (
                <Reveal
                  as="li"
                  key={item.title}
                  delay={index * 70}
                  className="group border-t border-line last:border-b"
                >
                  <div className="flex gap-6 py-8 sm:gap-10 sm:py-10">
                    <span className="mt-2 font-sans text-[0.62rem] tracking-[0.26em] text-champagne-deep transition-colors duration-500 group-hover:text-champagne">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="display text-[clamp(1.55rem,3.6vw,2.5rem)] uppercase text-bone">
                        {item.title}
                      </h3>
                      <span
                        aria-hidden="true"
                        className="mt-4 block h-px w-10 bg-champagne-deep transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-24 motion-reduce:transition-none"
                      />
                      <p className="mt-4 max-w-md font-sans text-[0.95rem] leading-[1.8] text-bone-muted">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
