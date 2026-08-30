import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { bookingCta } from "@/lib/content";
import { photos } from "@/lib/images";
import { siteConfig } from "@/lib/site";

/**
 * Full-bleed conversion moment, using the most expressive frame in the set.
 */
export function BookingCta() {
  return (
    <section
      aria-labelledby="booking-cta-heading"
      className="relative isolate flex min-h-[80svh] items-center overflow-hidden bg-ink-deep py-24 sm:py-32"
    >
      <Image
        src={photos.midNote.src}
        alt=""
        fill
        quality={72}
        sizes="100vw"
        placeholder="blur"
        blurDataURL={photos.midNote.blurDataURL}
        className="-z-10 object-cover object-[62%_35%]"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/72" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-transparent to-ink/85"
      />

      <div className="mx-auto w-full max-w-[112rem] px-5 text-center sm:px-8 lg:px-12">
        <Reveal>
          <h2
            id="booking-cta-heading"
            className="display mx-auto max-w-6xl text-[clamp(2.4rem,7.6vw,6.5rem)] uppercase text-bone [text-shadow:0_2px_40px_rgba(5,5,6,0.6)]"
          >
            {bookingCta.heading.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <p className="mx-auto mt-8 max-w-xl font-sans text-[0.95rem] leading-[1.85] text-bone/85 sm:text-base">
            {bookingCta.body}
          </p>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-10 flex justify-center">
            <ButtonLink href="#book" variant="primary" size="lg">
              {siteConfig.cta.availability}
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
