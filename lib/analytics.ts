import { track } from "@vercel/analytics";

/**
 * Custom event schema for Vercel Web Analytics.
 *
 * Two rules shape everything below.
 *
 * No personal data can reach analytics. Every property is a closed union of
 * literal strings, so there is no way to pass an email address, a name, a
 * phone number, free-text form input or a query string through this helper.
 * Widening any of these to `string` would remove that guarantee.
 *
 * Every event carries exactly two properties, because Vercel caps custom
 * events at two properties on Pro. Adding a third would silently lose data,
 * so the types keep the limit visible at the call site.
 *
 * One user action fires one event. Where an interaction could plausibly match
 * two events, it is assigned to the more specific one: a click on a booking
 * anchor is a Booking Click rather than a Navigation Click, and a mailto is a
 * Contact Click rather than a second Booking Click.
 */

/** Anything that scrolls the visitor to the booking panel. */
type BookingLocation =
  | "header"
  | "hero"
  | "mobile-menu"
  | "mobile-bar"
  | "booking-cta"
  | "footer";

/** Anywhere a real contact channel is opened. */
type ContactLocation = "booking-section" | "footer" | "mobile-menu";

/** Section ids from siteConfig.nav, minus "book" which is a Booking Click. */
type NavDestination = "the-show" | "video" | "about" | "gallery";

export type AnalyticsEvent =
  | {
      name: "Booking Click";
      location: BookingLocation;
      /** Only "anchor" today. A restored form would add "form" here. */
      method: "anchor";
    }
  | {
      name: "Contact Click";
      location: ContactLocation;
      method: "email" | "phone";
    }
  | {
      name: "Performance Video Click";
      location: "video-section";
      destination: "youtube";
    }
  | {
      name: "Social Click";
      platform: "youtube" | "instagram" | "facebook";
      location: "footer";
    }
  | {
      name: "Navigation Click";
      destination: NavDestination;
      location: "header" | "mobile-menu" | "hero";
    };

/**
 * Fire and forget. track() never throws and never blocks navigation, so a
 * click handler can call this immediately before the browser follows the link.
 */
export function trackEvent(event: AnalyticsEvent): void {
  const { name, ...properties } = event;
  track(name, properties);
}

const NAV_DESTINATIONS: readonly NavDestination[] = [
  "the-show",
  "video",
  "about",
  "gallery",
];

function isNavDestination(value: string): value is NavDestination {
  return (NAV_DESTINATIONS as readonly string[]).includes(value);
}

/**
 * Reports a click on one of the siteConfig.nav items.
 *
 * The booking item is reported as booking intent rather than navigation, so
 * the two menus agree with every other Book CTA on the page. A nav item added
 * later without being added to NavDestination is left untracked on purpose:
 * silence is better than sending a value the schema does not describe.
 */
export function trackNavItem(
  href: string,
  location: "header" | "mobile-menu",
): void {
  const target = href.replace("#", "");

  if (target === "book") {
    trackEvent({ name: "Booking Click", location, method: "anchor" });
    return;
  }

  if (isNavDestination(target)) {
    trackEvent({ name: "Navigation Click", destination: target, location });
  }
}
