import { siteConfig } from "./site";

/**
 * All editable page copy.
 *
 * Provisional wording lives here so it can be revised without touching any
 * component. Nothing here asserts a fact that has not been supplied.
 */

const performer = siteConfig.performer.name;

export const hero = {
  eyebrow: siteConfig.brand.name,
  /** Rendered one line at a time. */
  headlineLines: ["The Music.", "The Piano.", "The Show."],
  /** Read by assistive technology in place of the stylised headline. */
  accessibleHeadline: `${siteConfig.brand.name}. An Elton John tribute show. The music, the piano, the show.`,
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
    "Every booking is built around the room it is played in: a full show for a seated theatre audience, a high-energy set for a festival crowd, or something more intimate for a private celebration.",
  ],
};

export const watch = {
  label: "Showreel",
  heading: "See it live",
  standfirst:
    "Footage speaks louder than a description. Press play and hear the show as an audience hears it.",
  /** Add the venue, event and date here once they are confirmed. */
  caption: "Live performance footage.",
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
    "A selection of the songs performed. Set lists are shaped around the event, the room and the running time. The full repertoire is available on request.",
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
  /** The full name sits directly beneath, so the label stays generic. */
  label: "About the artist",
  /** Full name, set at display size. Romanian diacritics are intentional. */
  name: "Dragoș Moștenescu",
  disciplines: "Actor. Comedian. Musician. Performer.",

  /** Opening statement, set larger than the body copy that follows. */
  lead: "Dragoș Moștenescu is a Romanian-born actor, comedian, producer and musician whose career in entertainment spans television, theatre, comedy and live music.",

  /** The established entertainment career. */
  career: [
    "He became widely known in Romania through some of the country’s most successful television productions, including the acclaimed sitcom “The Block of Flats”, which won Best Sitcom in 2002 and attracted audiences comparable to major sporting events. His television work also includes appearances in “The Power” on Amazon Prime and “Rain Dogs”, a BBC/HBO production.",
    "In 2017, Dragoș moved to the United Kingdom and brought his distinctive combination of comedy and music to the British stage. His musical comedy show “All Aboard!” premiered at Leicester Square Theatre before a successful run at the Edinburgh Fringe Festival, where it was rated “Highly Recommended” by The Fringe Review.",
  ],

  /** Hinge of the section. The emphasised word is pulled out in champagne. */
  turn: {
    before: "But",
    emphasis: "music",
    after: "has always been part of the story.",
  },

  /** How that career arrives at this show. */
  music: [
    "An accomplished pianist, guitarist and vocalist, Dragoș has spent years combining live music with his natural ability to entertain an audience. That experience now comes together in Elton Live Experience, a celebration of the extraordinary music of Elton John, performed live at the piano with Dragoș’s own personality, humour and stage presence.",
    "Rather than simply impersonating Elton John, Dragoș brings the songs to life through musicianship, storytelling and entertainment, creating a show designed to make audiences sing, laugh and celebrate some of the greatest songs in popular music.",
  ],
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
    "Send a few details about the event and we will come back to you with availability, formats and options.",
  /**
   * Prompts shown in place of the form. An emailed enquiry that answers these
   * is as useful as a structured submission, and saves a round trip.
   */
  enquiryPrompts: [
    "The type of event",
    "The date, or the rough timing",
    "Venue and location",
    "Running time and audience, if you know them",
  ],
  /** Retained for the enquiry form, which is currently not rendered. */
  eventTypes: [
    "Theatre or venue",
    "Festival",
    "Wedding",
    "Corporate event",
    "Private party",
    "Other",
  ],
};
