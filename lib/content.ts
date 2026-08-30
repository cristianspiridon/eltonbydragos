import { siteConfig } from "./site";

/**
 * All editable page copy.
 *
 * Provisional wording lives here so it can be revised without touching any
 * component. Anything wrapped in a `placeholder` field is deliberately unwritten
 * and must be replaced with supplied facts before launch.
 */

const performer = siteConfig.performer.name;

export const hero = {
  eyebrow: siteConfig.brand.name,
  /** Rendered one line at a time. */
  headlineLines: ["The Music.", "The Piano.", "The Show."],
  /** Read by assistive technology in place of the stylised headline. */
  accessibleHeadline: `${siteConfig.brand.name} — an Elton John tribute show. The music, the piano, the show.`,
  standfirst: "An unforgettable live tribute to the music of Elton John.",
};

export const availabilityStrip = [
  "Theatres",
  "Festivals",
  "Weddings",
  "Corporate Events",
  "Private Events",
];

export const experience = {
  label: "The Experience",
  heading: ["More than", "a tribute."],
  lead: "A celebration of one of the greatest catalogues in music.",
  body: [
    `From intimate piano moments to the songs that get an entire room singing, ${performer} brings the sound, energy and unmistakable character of Elton John’s music to the stage.`,
    "Every booking is built around the room it is played in — a full show for a seated theatre audience, a high-energy set for a festival crowd, or something more intimate for a private celebration.",
  ],
};

export const watch = {
  label: "Showreel",
  heading: "See it live",
  standfirst:
    "Footage speaks louder than a description. Press play and hear the show as an audience hears it.",
  /** PLACEHOLDER — replace with the venue, event and date once confirmed. */
  captionPlaceholder: "Live performance footage — venue and date to be supplied.",
};

export const music = {
  label: "The Music",
  heading: ["Featuring the music", "you know and love"],
  songs: [
    "Rocket Man",
    "Your Song",
    "I’m Still Standing",
    "Tiny Dancer",
    "Crocodile Rock",
    "Don’t Go Breaking My Heart",
    "Bennie and the Jets",
    "Saturday Night’s Alright for Fighting",
  ],
  footnote:
    "A selection of the songs performed. Set lists are shaped around the event, the room and the running time — the full repertoire is available on request.",
};

export const perfectFor = {
  label: "Perfect For",
  heading: ["Built for", "the occasion."],
  items: [
    {
      title: "Theatres & Venues",
      description: "A complete live tribute experience.",
    },
    {
      title: "Festivals",
      description: "Iconic songs built for a crowd.",
    },
    {
      title: "Weddings & Celebrations",
      description: "A memorable live performance for special occasions.",
    },
    {
      title: "Corporate & Private Events",
      description: "Premium entertainment tailored to the event.",
    },
  ],
};

export const about = {
  label: `About ${performer}`,
  heading: ["Meet the man", "behind the piano."],
  /** PLACEHOLDER — no biography has been supplied, so none is invented here. */
  placeholder: {
    note: "Biography to be supplied",
    prompts: [
      "Musical background and training",
      "Years performing live",
      "Piano and vocal experience",
      "Notable venues and events performed at",
      "Why Elton John’s music",
      "Location and travel availability",
    ],
  },
};

export const gallery = {
  label: "Gallery",
  heading: ["From", "the stage."],
  standfirst: "Photographs from live performances.",
};

export const bookingCta = {
  heading: ["Bring the show", "to your event."],
  body: "Planning an event, venue night or celebration? Get in touch to discuss availability and the right format for your event.",
};

export const bookingForm = {
  label: "Booking",
  heading: ["Check", "availability."],
  standfirst:
    "Tell us a little about the event and we will come back to you with availability, formats and options.",
  eventTypes: [
    "Theatre or venue",
    "Festival",
    "Wedding",
    "Corporate event",
    "Private party",
    "Other",
  ],
};
