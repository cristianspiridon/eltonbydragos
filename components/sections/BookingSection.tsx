import { BookingForm } from "@/components/forms/BookingForm";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { bookingForm } from "@/lib/content";
import { isBookingConfigured } from "@/lib/booking";
import { siteConfig } from "@/lib/site";

export function BookingSection() {
  return (
    <section
      id="book"
      aria-labelledby="book-heading"
      className="bg-ink py-20 sm:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-[112rem] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 xl:gap-24">
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
              <div className="mt-10 space-y-6">
                <div>
                  <p className="eyebrow">Direct</p>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="display mt-3 block break-words text-[clamp(1.15rem,2.6vw,1.75rem)] text-bone underline-offset-[6px] transition-colors hover:text-champagne-bright hover:underline"
                  >
                    {siteConfig.contact.email}
                  </a>
                  <p className="mt-2 font-sans text-[0.65rem] uppercase tracking-[0.24em] text-champagne-deep">
                    Address to be replaced before launch
                  </p>
                </div>

                <div>
                  <p className="eyebrow">Based in</p>
                  <p className="mt-3 font-sans text-[0.95rem] text-bone-muted">
                    {siteConfig.contact.basedIn}
                    <span className="ml-2 text-[0.65rem] uppercase tracking-[0.2em] text-champagne-deep">
                      travel details to be supplied
                    </span>
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} className="lg:col-span-7">
            {!isBookingConfigured && (
              <p className="mb-8 border-l-2 border-champagne-deep bg-champagne/5 px-5 py-3 font-sans text-[0.7rem] uppercase tracking-[0.18em] text-champagne">
                Demo mode — connect a form provider before launch
              </p>
            )}
            <BookingForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
