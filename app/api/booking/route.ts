import { validateEnquiry, type BookingEnquiry } from "@/lib/booking";
import { siteConfig } from "@/lib/site";

/**
 * Booking enquiry endpoint, delivered by Resend.
 *
 * Called through the `endpoint` adapter in `lib/booking.ts`, so the form knows
 * nothing about Resend. Resend is reached over its REST API with `fetch`
 * rather than the SDK, which keeps the dependency list unchanged.
 *
 * Required environment variables, none of them public:
 *
 *   RESEND_API_KEY=re_xxxxxxxx
 *   BOOKING_FROM="Elton Live Experience <bookings@eltonliveexperience.co.uk>"
 *   BOOKING_TO=dragos.mostenescu@gmail.com   // optional, defaults to site config
 *
 * The address in BOOKING_FROM must sit on a domain verified in Resend.
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";

const FIELD_LABELS: Record<keyof BookingEnquiry, string> = {
  name: "Name",
  email: "Email",
  phone: "Phone",
  eventType: "Event type",
  eventDate: "Event date",
  location: "Venue / location",
  message: "Message",
};

const ORDER: (keyof BookingEnquiry)[] = [
  "name",
  "email",
  "phone",
  "eventType",
  "eventDate",
  "location",
  "message",
];

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function buildEmail(enquiry: BookingEnquiry) {
  const rows = ORDER.filter((field) => enquiry[field]).map((field) => ({
    label: FIELD_LABELS[field],
    value: enquiry[field] as string,
  }));

  const text = rows.map((row) => `${row.label}: ${row.value}`).join("\n\n");

  const html = `<table style="border-collapse:collapse;font-family:system-ui,sans-serif;font-size:15px;line-height:1.6">
${rows
  .map(
    (row) =>
      `<tr><td style="padding:6px 20px 6px 0;color:#666;vertical-align:top;white-space:nowrap">${escapeHtml(
        row.label,
      )}</td><td style="padding:6px 0;color:#111">${escapeHtml(row.value).replace(
        /\n/g,
        "<br>",
      )}</td></tr>`,
  )
  .join("\n")}
</table>`;

  return { text, html };
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.BOOKING_FROM;
  const to = process.env.BOOKING_TO ?? siteConfig.contact.email;

  if (!apiKey || !from) {
    console.error("[booking] RESEND_API_KEY or BOOKING_FROM is not set.");
    return Response.json(
      { error: "Enquiries are not configured on this deployment." },
      { status: 503 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Malformed request." }, { status: 400 });
  }

  // The form's off-screen honeypot. Anything that fills it is a bot, so accept
  // the request and drop it rather than telling it what went wrong.
  if (asString(body.company)) return Response.json({ ok: true });

  const enquiry: BookingEnquiry = {
    name: asString(body.name),
    email: asString(body.email),
    phone: asString(body.phone),
    eventType: asString(body.eventType),
    eventDate: asString(body.eventDate),
    location: asString(body.location),
    message: asString(body.message),
  };

  // Revalidated here because client-side validation is a convenience, not a
  // guarantee: this endpoint is reachable directly.
  const errors = validateEnquiry(enquiry);
  if (Object.keys(errors).length > 0) {
    return Response.json({ error: "Some details are missing.", errors }, { status: 400 });
  }

  const { text, html } = buildEmail(enquiry);

  let response: globalThis.Response;
  try {
    response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        // Replying in the mail client goes straight back to the enquirer.
        reply_to: enquiry.email,
        subject: `Booking enquiry from ${enquiry.name} (${enquiry.eventType})`,
        text,
        html,
      }),
    });
  } catch (error) {
    console.error("[booking] Could not reach Resend.", error);
    return Response.json({ error: "Could not send the enquiry." }, { status: 502 });
  }

  if (!response.ok) {
    console.error("[booking] Resend rejected the message.", {
      status: response.status,
      body: await response.text().catch(() => ""),
    });
    return Response.json({ error: "Could not send the enquiry." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
