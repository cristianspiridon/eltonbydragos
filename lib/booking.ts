/**
 * Booking enquiry transport.
 *
 * The form component never talks to a provider directly. It calls
 * `submitEnquiry`, which resolves an adapter from environment configuration.
 * To go live, set the variables below in `.env.local`; no component changes
 * are required.
 *
 *   NEXT_PUBLIC_BOOKING_PROVIDER=formspree
 *   NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/xxxxxxxx
 *
 *   NEXT_PUBLIC_BOOKING_PROVIDER=endpoint      // POSTs JSON to your own route
 *   NEXT_PUBLIC_BOOKING_ENDPOINT=/api/booking  // e.g. backed by Resend
 *
 * With neither set, the form reports that it cannot take enquiries yet and
 * points the visitor at the email address.
 */

export interface BookingEnquiry {
  name: string;
  email: string;
  phone?: string;
  eventType: string;
  eventDate?: string;
  location: string;
  message: string;
}

export type BookingResult =
  | { ok: true }
  | { ok: false; error: string };

export type BookingAdapter = (enquiry: BookingEnquiry) => Promise<BookingResult>;

const GENERIC_FAILURE =
  "Something went wrong sending your enquiry. Please try again, or email us directly.";

const NO_PROVIDER =
  "This form is not accepting enquiries yet. Please email us directly and we will come straight back to you.";

const formspreeAdapter =
  (endpoint: string): BookingAdapter =>
  async (enquiry) => {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(enquiry),
      });
      if (!response.ok) return { ok: false, error: GENERIC_FAILURE };
      return { ok: true };
    } catch {
      return { ok: false, error: GENERIC_FAILURE };
    }
  };

const endpointAdapter =
  (endpoint: string): BookingAdapter =>
  async (enquiry) => {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(enquiry),
      });
      if (!response.ok) return { ok: false, error: GENERIC_FAILURE };
      return { ok: true };
    } catch {
      return { ok: false, error: GENERIC_FAILURE };
    }
  };

/**
 * Used until a provider is configured.
 *
 * This deliberately fails rather than resolving successfully. Reporting an
 * enquiry as sent while discarding it is the worst outcome available: the
 * visitor believes they have made contact and never follows up. Failing
 * visibly keeps them pointed at the email address instead.
 */
const unconfiguredAdapter: BookingAdapter = async (enquiry) => {
  if (process.env.NODE_ENV !== "production") {
    console.warn("[booking] No provider configured. Enquiry not sent:", enquiry);
  }
  return { ok: false, error: NO_PROVIDER };
};

function resolveAdapter(): BookingAdapter {
  const provider = process.env.NEXT_PUBLIC_BOOKING_PROVIDER;
  const formspree = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
  const endpoint = process.env.NEXT_PUBLIC_BOOKING_ENDPOINT;

  if (provider === "formspree" && formspree) return formspreeAdapter(formspree);
  if (provider === "endpoint" && endpoint) return endpointAdapter(endpoint);
  return unconfiguredAdapter;
}

export function submitEnquiry(enquiry: BookingEnquiry): Promise<BookingResult> {
  return resolveAdapter()(enquiry);
}

// --- Validation -------------------------------------------------------------

export type FieldErrors = Partial<Record<keyof BookingEnquiry, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateEnquiry(values: BookingEnquiry): FieldErrors {
  const errors: FieldErrors = {};

  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) errors.email = "Please enter your email address.";
  else if (!EMAIL.test(values.email.trim()))
    errors.email = "Please enter a valid email address.";
  if (values.phone && values.phone.replace(/[^\d]/g, "").length < 7)
    errors.phone = "Please enter a valid phone number, or leave this blank.";
  if (!values.eventType) errors.eventType = "Please choose an event type.";
  if (!values.location.trim()) errors.location = "Please tell us where the event is.";
  if (!values.message.trim()) errors.message = "Please add a few details about the event.";

  return errors;
}
