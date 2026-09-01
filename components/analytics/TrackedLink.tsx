"use client";

import type { ComponentPropsWithoutRef } from "react";
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";

type TrackedLinkProps = ComponentPropsWithoutRef<"a"> & {
  href: string;
  event: AnalyticsEvent;
};

/**
 * A plain anchor that reports its own click.
 *
 * This exists so server components such as the footer and the booking panel
 * can keep rendering on the server: only this leaf crosses into the client
 * bundle, rather than the whole section. It renders a native anchor and adds
 * nothing to the markup, so styling and scroll behaviour are unchanged.
 */
export function TrackedLink({ event, onClick, ...props }: TrackedLinkProps) {
  return (
    <a
      {...props}
      onClick={(nativeEvent) => {
        trackEvent(event);
        onClick?.(nativeEvent);
      }}
    />
  );
}
