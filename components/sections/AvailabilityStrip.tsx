import { Fragment } from "react";
import { availabilityStrip } from "@/lib/content";

/**
 * Restrained qualifier directly under the hero: what the act is available for,
 * with no invented credentials.
 */
export function AvailabilityStrip() {
  return (
    <section aria-label="Availability" className="border-y border-line-soft bg-ink-raised">
      <div className="mx-auto max-w-[112rem] px-5 py-5 sm:px-8 sm:py-6 lg:px-12">
        <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center font-sans text-[0.62rem] font-medium uppercase tracking-[0.26em] text-bone-muted sm:gap-x-5 sm:text-[0.7rem] sm:tracking-[0.3em]">
          <span className="text-bone-faint">Available for</span>
          {availabilityStrip.map((item, index) => (
            <Fragment key={item}>
              {index > 0 && (
                <span aria-hidden="true" className="text-champagne-deep">
                  •
                </span>
              )}
              <span className="text-bone">{item}</span>
            </Fragment>
          ))}
        </p>
      </div>
    </section>
  );
}
