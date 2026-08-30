import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { bookingForm } from "@/lib/content";
import { mailtoBookings, siteConfig } from "@/lib/site";

/**
 * Enquiries currently go by email rather than through the form.
 *
 * `components/forms/BookingForm.tsx` and `app/api/booking/route.ts` are both
 * intact. To bring the form back, render <BookingForm /> in the right-hand
 * column again and configure a provider as described in the README.
 */
export function BookingSection() {
  const enquiryHref = `${mailtoBookings}?subject=${encodeURIComponent("Booking enquiry")}`;

  return (
    <section
      id="book"
      aria-labelledby="book-heading"
      className="bg-ink py-20 sm:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-[112rem] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16 xl:gap-24">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionLabel>{bookingForm.label}</SectionLabel>
            </Reveal>

            <Reveal delay={80}>
              <h2
                id="book-heading"
                className="display mt-6 text-[clamp(2.4rem,7vw,5rem)] uppercase text-bone"
              >
                {bookingForm.heading.map((line, index) => (
                  <span key={line} className={index === 1 ? "block text-champagne" : "block"}>
                    {line}
                  </span>
                ))}
              </h2>
            </Reveal>

            <Reveal delay={140}>
              <p className="mt-8 max-w-md font-sans text-[0.95rem] leading-[1.85] text-bone-muted">
                {bookingForm.standfirst}
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-10">
                <p className="eyebrow">Based in</p>
                <p className="mt-3 font-sans text-[0.95rem] text-bone-muted">
                  {siteConfig.contact.basedIn}
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} className="lg:col-span-6 lg:col-start-7">
            <div className="border border-line p-8 sm:p-10">
              <p className="eyebrow">Enquiries</p>

              <a
                href={enquiryHref}
                className="display mt-5 block break-words text-[clamp(1.25rem,3vw,2.1rem)] text-bone underline-offset-[6px] transition-colors hover:text-champagne-bright hover:underline"
              >
                {siteConfig.contact.email}
              </a>

              <p className="mt-8 font-sans text-[0.9rem] leading-[1.85] text-bone-muted">
                Include as much of the following as you can and we can usually
                answer in a single reply.
              </p>

              <ul className="mt-6 space-y-3">
                {bookingForm.enquiryPrompts.map((prompt) => (
                  <li
                    key={prompt}
                    className="flex items-start gap-3 font-sans text-[0.85rem] leading-relaxed tracking-[0.04em] text-bone-muted"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2.5 h-px w-4 shrink-0 bg-champagne-deep"
                    />
                    {prompt}
                  </li>
                ))}
              </ul>

              <ButtonLink
                href={enquiryHref}
                variant="primary"
                size="lg"
                className="mt-10 w-full sm:w-auto"
              >
                Email your enquiry
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
