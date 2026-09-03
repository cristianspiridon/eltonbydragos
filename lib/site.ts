/**
 * Single source of truth for brand, contact and navigation.
 *
 * To rebrand the entire site, edit `brand` below. Nothing else references the
 * name directly. Values marked PLACEHOLDER must be replaced before launch.
 */

export const siteConfig = {
  brand: {
    /** Full wordmark, used in the header, footer, metadata and structured data. */
    name: "Elton Live Experience",
    /** Split form so the logo can set the two halves in different weights. */
    nameLead: "Elton",
    nameTrail: "Live Experience",
    subtitle: "An Elton John Tribute Show",
  },

  performer: {
    /** Stage/first name used in body copy. */
    name: "Dragoș",
  },

  /** PLACEHOLDER. Replace with the live domain. */
  domain: "eltonliveexperience.co.uk",
  url: "https://eltonliveexperience.co.uk",

  contact: {
    /** Interim inbox. Swap to a bookings@ address on the live domain later. */
    email: "dragos.mostenescu@gmail.com",
    /** PLACEHOLDER. Set to a string to reveal a phone link in the footer. */
    phone: null as string | null,
    /** PLACEHOLDER. Replace with the real base/travel statement. */
    basedIn: "United Kingdom",
  },

  /**
   * Null means "no profile yet", and the link is simply not rendered. Set a
   * URL to make it appear in the footer.
   */
  social: {
    instagram: null as string | null,
    facebook: null as string | null,
    /** Verified from the supplied performance video. */
    youtube: "https://www.youtube.com/@DragosMostenescu" as string | null,
  },

  video: {
    id: "rQxJrDgo4F4",
    /** Seconds into the video to begin playback. */
    startAt: 74,
    title: "Tribute to Elton John, live performance",
    poster: "/video/showreel-poster.jpg",
    /**
     * Taken from YouTube's own metadata for this video, offset included.
     * Google treats uploadDate as required for video rich results, so a guess
     * here would be worse than the field being absent.
     */
    uploadDate: "2016-09-08T01:32:31-07:00",
    /** ISO 8601 form of the 639 seconds YouTube reports. */
    duration: "PT10M39S",
  },

  /** Ordered to match the scroll order of the page. */
  nav: [
    { label: "The Show", href: "#the-show" },
    { label: "Video", href: "#video" },
    { label: "About", href: "#about" },
    { label: "Gallery", href: "#gallery" },
    { label: "Book", href: "#book" },
  ],

  cta: {
    primary: "Book the Show",
    watch: "Watch the Show",
    availability: "Check Availability",
  },

  disclaimer:
    "This is an independent tribute production and is not affiliated with or endorsed by Elton John or his representatives.",
} as const;

export type SiteConfig = typeof siteConfig;

export const mailtoBookings = `mailto:${siteConfig.contact.email}`;
