"use client";

import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/lib/site";

/**
 * Persistent booking CTA for small screens.
 *
 * Most enquiries arrive from a phone, often from a social link, so the primary
 * action stays within thumb reach for the whole scroll. It appears once the
 * hero has passed and retires while the booking form itself is on screen.
 */
export function MobileBookingBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    const book = document.getElementById("book");
    if (!hero || typeof IntersectionObserver === "undefined") return;

    let heroVisible = true;
    let bookVisible = false;
    const update = () => setVisible(!heroVisible && !bookVisible);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === hero) heroVisible = entry.isIntersecting;
          if (entry.target === book) bookVisible = entry.isIntersecting;
        }
        update();
      },
      { threshold: 0.12 },
    );

    observer.observe(hero);
    if (book) observer.observe(book);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={[
        "fixed inset-x-0 bottom-0 z-40 border-t border-line-soft bg-ink/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none lg:hidden",
        visible ? "translate-y-0" : "translate-y-full",
      ].join(" ")}
      aria-hidden={!visible}
    >
      {/* Native anchor, not next/link: see ButtonLink. */}
      <a
        href="#book"
        onClick={() =>
          trackEvent({
            name: "Booking Click",
            location: "mobile-bar",
            method: "anchor",
          })
        }
        tabIndex={visible ? undefined : -1}
        className="flex w-full items-center justify-center bg-champagne px-6 py-4 font-sans text-xs font-semibold uppercase tracking-[0.22em] text-ink transition-colors duration-300 active:bg-champagne-bright"
      >
        {siteConfig.cta.primary}
      </a>
    </div>
  );
}
