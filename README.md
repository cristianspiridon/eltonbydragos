# Elton Live Experience

Marketing site for a UK-based Elton John tribute performer. The single objective
is enquiries from venues, event organisers, wedding planners, private clients and
festival bookers.

Built with Next.js (App Router), TypeScript, React and Tailwind CSS v4. Runtime
dependencies are limited to `next`, `react` and `react-dom`. There is no
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

The site shows no "to be supplied" notices to visitors. Anything still missing
either degrades quietly (an unset social profile is not rendered at all) or
falls back to something real. That makes the list below easy to forget, so it is
the single source of truth for what is still outstanding:

| What | Where |
| --- | --- |
| Domain and canonical URL | `lib/site.ts` → `domain`, `url` |
| Booking email address (currently a personal inbox, move to the live domain) | `lib/site.ts` → `contact.email` |
| Phone number (optional; set a string to reveal it in the footer) | `lib/site.ts` → `contact.phone` |
| Base location and travel availability | `lib/site.ts` → `contact.basedIn` |
| Instagram and Facebook URLs | `lib/site.ts` → `social`. Both are `null`, so neither link appears in the footer. Set a URL to reveal one. |
| Artist portrait | Drop a file at `images/dragos-portrait.jpg`, then run `npm run images`. The About section picks it up automatically. Until then it falls back to the profile frame from the live set. |
| Biography copy | `lib/content.ts` → `about` |
| Video venue and date caption | `lib/content.ts` → `watch.caption` |
| Booking form provider | `.env.local` (see below). Until one is set the form accepts an enquiry and discards it, and a warning shows in development only. |

Nothing on the site asserts a review, award, venue, client name or performance
statistic, and the structured data makes no claim beyond what is listed above.
Keep it that way unless you have the evidence.

### Renaming the brand

The brand name appears in exactly one place. Edit `brand` in `lib/site.ts` and
every heading, the metadata, the footer and the structured data follow.

### Connecting the booking form

**The form is currently not rendered.** The booking section asks people to email
instead, and prompts them for the details the form used to collect. Everything
below still works and nothing has been deleted: `components/forms/BookingForm.tsx`
and `app/api/booking/route.ts` are both intact. To switch the form back on,
configure a provider and render `<BookingForm />` in the right-hand column of
`components/sections/BookingSection.tsx`.

The form calls `submitEnquiry()` from `lib/booking.ts`, which resolves an adapter
from the environment. Copy `.env.example` to `.env.local` and pick one.

Until one is configured the form does not pretend to work: it reports that
enquiries cannot be taken yet and points the visitor at the email address, which
is also printed next to the submit button. Reporting an enquiry as sent while
discarding it would lose real bookings, so that path was removed deliberately.

**Resend, via the included route handler.** `app/api/booking/route.ts` validates
the enquiry again on the server, then sends it through Resend's REST API. There
is no SDK dependency. `Reply-To` is set to the enquirer, so replying from the
inbox reaches them directly.

```bash
NEXT_PUBLIC_BOOKING_PROVIDER=endpoint
NEXT_PUBLIC_BOOKING_ENDPOINT=/api/booking

RESEND_API_KEY=re_xxxxxxxx
BOOKING_FROM="Elton Live Experience <bookings@eltonliveexperience.co.uk>"
BOOKING_TO=dragos.mostenescu@gmail.com
```

`RESEND_API_KEY` is a sending credential and must never be given a
`NEXT_PUBLIC_` prefix. The address in `BOOKING_FROM` has to sit on a domain
verified at resend.com/domains. Resend's verification puts its bounce `MX`
record on `send.yourdomain`, not the root, so it does not disturb whatever
receives mail at the root of the domain.

**Formspree,** if you would rather not run a server. No domain required, and the
free tier covers 50 enquiries a month.

```bash
NEXT_PUBLIC_BOOKING_PROVIDER=formspree
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/xxxxxxxx
```

To add a different provider, write another adapter in `lib/booking.ts`. The form
itself does not change.

### Email on the domain

Three separate systems, often confused for one:

| Job | Handled by |
| --- | --- |
| The website form reaching your inbox | Resend, above. Nothing to receive; it only sends. |
| `bookings@yourdomain` existing and forwarding to Gmail | An inbound forwarder. Cloudflare Email Routing is free and does exactly this, but the domain's DNS has to be on Cloudflare. It adds `MX` records at the root. |
| Replying *as* `bookings@yourdomain` from Gmail | Gmail's "Send mail as" pointed at an SMTP relay. Set the forwarder up first, because Gmail sends a confirmation code to that address. |

The first two do not collide, because Resend's `MX` sits on the `send.`
subdomain and the forwarder's sits at the root.

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

`images/dragos-portrait.jpg` is optional. If it is absent the build skips it and
the About section falls back to the profile frame; if it is present it is
processed like any other photograph and used as the biography portrait. A
roughly 4:5 file works best, since that is the desktop crop.

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
