# Elton Live Experience

Marketing site for a UK-based Elton John tribute performer. The single objective
is enquiries from venues, event organisers, wedding planners, private clients and
festival bookers.

Built with Next.js (App Router), TypeScript, React and Tailwind CSS v4. Runtime
dependencies are limited to `next`, `react` and `react-dom` — there is no
animation, form, carousel or lightbox library.

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run images` | Regenerate `public/photos`, the OG image and blur placeholders from `images/` |

## Before launch

Everything that needs real information is marked with a placeholder in the UI or
a `PLACEHOLDER` comment in the source. The full list:

| What | Where |
| --- | --- |
| Domain and canonical URL | `lib/site.ts` → `domain`, `url` |
| Booking email address | `lib/site.ts` → `contact.email` |
| Phone number (optional; set a string to reveal it in the footer) | `lib/site.ts` → `contact.phone` |
| Base location and travel availability | `lib/site.ts` → `contact.basedIn` |
| Instagram and Facebook URLs | `lib/site.ts` → `social` |
| Biography | `lib/content.ts` → `about.placeholder`, then replace the panel in `components/sections/About.tsx` |
| Video venue and date caption | `lib/content.ts` → `watch.captionPlaceholder` |
| Booking form provider | `.env.local` (see below) |

Nothing on the site asserts a review, award, venue, client name or performance
statistic, and the structured data makes no claim beyond what is listed above.
Keep it that way unless you have the evidence.

### Renaming the brand

The brand name appears in exactly one place. Edit `brand` in `lib/site.ts` and
every heading, the metadata, the footer and the structured data follow.

### Connecting the booking form

The form calls `submitEnquiry()` from `lib/booking.ts`, which resolves an adapter
from the environment. Copy `.env.example` to `.env.local` and pick one:

```bash
# Formspree — no backend needed
NEXT_PUBLIC_BOOKING_PROVIDER=formspree
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/xxxxxxxx

# Or your own route handler, e.g. wrapping Resend
NEXT_PUBLIC_BOOKING_PROVIDER=endpoint
NEXT_PUBLIC_BOOKING_ENDPOINT=/api/booking
```

Until one is configured, the form runs in demo mode: it validates, logs the
payload in development and shows the success state, and the booking section
displays a notice so nobody mistakes it for a working inbox.

To add a provider, write another adapter in `lib/booking.ts` — the form itself
does not change.

## Structure

```
app/
  layout.tsx        Fonts, metadata, OpenGraph, JSON-LD, header/footer shell
  page.tsx          Section composition, in scroll order
  globals.css       Design tokens, reveal system, grain
  icon.svg          Favicon monogram
  robots.ts, sitemap.ts
components/
  layout/           Header, mobile menu, sticky mobile CTA, footer, wordmark
  sections/         One file per page section
  media/            LiteYouTube facade, Lightbox, DriftImage
  forms/            BookingForm
  ui/               Button, Reveal, SectionLabel
lib/
  site.ts           Brand, contact, navigation, video  ← rebrand here
  content.ts        All editable page copy             ← client revisions here
  images.ts         Photo manifest, alt text, focal points
  booking.ts        Enquiry interface, adapters, validation
scripts/
  prepare-images.mjs
images/             Original photographs (not served)
public/photos/      Derived, web-sized photographs
```

## Photography

`images/` holds the 6144×4096 originals. `npm run images` downscales them into
`public/photos`, generates the 1200×630 social card and writes blur placeholders
to `lib/photo-manifest.json`. Only the derived files are served.

Each photograph has a focal point in `lib/images.ts` so the performer stays in
frame at every crop ratio. Adjust `focus` there rather than in components.

## Performance and accessibility notes

- The YouTube player is a click-to-load facade. The embed's ~1MB of scripts is
  only paid by visitors who press play; everyone else gets a local poster frame.
- The hero image is the only priority image. Everything below the fold is lazy
  loaded, served as AVIF/WebP at responsive sizes.
- Scroll reveals are pure CSS transitions toggled by IntersectionObserver, and
  are disabled entirely under `prefers-reduced-motion`. Their hidden state sits
  behind a `(scripting: enabled)` media query, so the page is fully readable
  without JavaScript and no markup differs between server and client.
- The lightbox and mobile menu trap focus, close on Escape, lock body scroll and
  restore focus to the trigger. The gallery supports arrow-key navigation.
- Colour contrast, semantic landmarks, a skip link and visible focus rings are
  in place throughout.

## Disclaimer

The site states, in the footer, that this is an independent tribute production
with no affiliation to or endorsement by Elton John or his representatives.
Keep that notice in place.
