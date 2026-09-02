import { logEvent } from "firebase/analytics";
import { analyticsReady } from "./firebase";

/**
 * Custom event schema for Google Analytics (Firebase).
 *
 * Three rules shape everything below.
 *
 * No personal data can reach analytics. Every property is a closed union of
 * literal strings, so there is no way to pass an email address, a name, a
 * phone number, free-text form input or a query string through this helper.
 * Widening any of these to `string` would remove that guarantee.
 *
 * Names are snake_case because GA4 accepts only letters, digits and
 * underscores in an event name, must start with a letter, and truncates past
 * 40 characters. A name with a space in it is rejected rather than corrected,
 * so these read exactly as they will appear in the GA4 reports.
 *
 * One user action fires one event. Where an interaction could plausibly match
 * two events, it is assigned to the more specific one: a click on a booking
 * anchor is a booking_click rather than a navigation_click, and a mailto is a
 * contact_click rather than a second booking_click.
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

/** Section ids from siteConfig.nav, minus "book" which is a booking_click. */
type NavDestination = "the-show" | "video" | "about" | "gallery";

export type AnalyticsEvent =
  | {
      name: "booking_click";
      location: BookingLocation;
      /** Only "anchor" today. A restored form would add "form" here. */
      method: "anchor";
    }
  | {
      name: "contact_click";
      location: ContactLocation;
      method: "email" | "phone";
    }
  | {
      name: "performance_video_click";
      location: "video-section";
      destination: "youtube";
    }
  | {
      name: "social_click";
      platform: "youtube" | "instagram" | "facebook";
      location: "footer";
    }
  | {
      name: "navigation_click";
      destination: NavDestination;
      location: "header" | "mobile-menu" | "hero";
    };

/**
 * Fire and forget.
 *
 * The await never delays the click. Analytics is resolved once on load, so by
 * the time anyone can press a link the promise has already settled, and the
 * browser follows the href on the same tick either way. Failures are swallowed
 * upstream in analyticsReady, so a blocked measurement script costs the
 * visitor nothing.
 */
export function trackEvent(event: AnalyticsEvent): void {
  const { name, ...params } = event;

  void analyticsReady().then((analytics) => {
    if (analytics) logEvent(analytics, name, params);
  });
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
    trackEvent({ name: "booking_click", location, method: "anchor" });
    return;
  }

  if (isNavDestination(target)) {
    trackEvent({ name: "navigation_click", destination: target, location });
  }
}
