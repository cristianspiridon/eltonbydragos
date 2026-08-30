/**
 * Booking enquiry transport.
 *
 * The form component never talks to a provider directly — it calls
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
 * The default ("demo") performs no network request. It logs the payload and
 * resolves successfully so the interface can be exercised before a provider
 * is connected.
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

const demoAdapter: BookingAdapter = async (enquiry) => {
  if (process.env.NODE_ENV !== "production") {
    console.info("[booking] No provider configured. Enquiry payload:", enquiry);
  }
  await new Promise((resolve) => setTimeout(resolve, 900));
  return { ok: true };
};

function resolveAdapter(): BookingAdapter {
  const provider = process.env.NEXT_PUBLIC_BOOKING_PROVIDER;
  const formspree = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
  const endpoint = process.env.NEXT_PUBLIC_BOOKING_ENDPOINT;

  if (provider === "formspree" && formspree) return formspreeAdapter(formspree);
  if (provider === "endpoint" && endpoint) return endpointAdapter(endpoint);
  return demoAdapter;
}

export function submitEnquiry(enquiry: BookingEnquiry): Promise<BookingResult> {
  return resolveAdapter()(enquiry);
}

/** True while the form is not wired to a real provider. */
export const isBookingConfigured =
  (process.env.NEXT_PUBLIC_BOOKING_PROVIDER === "formspree" &&
    Boolean(process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT)) ||
  (process.env.NEXT_PUBLIC_BOOKING_PROVIDER === "endpoint" &&
    Boolean(process.env.NEXT_PUBLIC_BOOKING_ENDPOINT));

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
