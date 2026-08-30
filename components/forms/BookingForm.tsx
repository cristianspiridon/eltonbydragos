"use client";

import { useId, useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import {
  submitEnquiry,
  validateEnquiry,
  type BookingEnquiry,
  type FieldErrors,
} from "@/lib/booking";
import { bookingForm } from "@/lib/content";
import { siteConfig } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

const emptyEnquiry: BookingEnquiry = {
  name: "",
  email: "",
  phone: "",
  eventType: "",
  eventDate: "",
  location: "",
  message: "",
};

const fieldClasses =
  "w-full border-0 border-b border-line bg-transparent px-0 py-3 font-sans text-[0.95rem] text-bone transition-colors duration-300 placeholder:text-bone-faint focus:border-champagne focus:outline-none focus:ring-0 aria-[invalid=true]:border-red-400/70";

function Field({
  label,
  htmlFor,
  optional,
  error,
  errorId,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  optional?: boolean;
  error?: string;
  errorId: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={htmlFor}
        className="flex items-baseline justify-between gap-3 font-sans text-[0.65rem] font-medium uppercase tracking-[0.24em] text-bone-muted"
      >
        {label}
        {optional && <span className="text-bone-faint normal-case tracking-[0.1em]">Optional</span>}
      </label>
      <div className="mt-1">{children}</div>
      {error && (
        <p id={errorId} className="mt-2 font-sans text-[0.75rem] tracking-[0.04em] text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}

export function BookingForm() {
  const formId = useId();
  const [values, setValues] = useState<BookingEnquiry>(emptyEnquiry);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  /** Only re-validate on change once the visitor has tried to submit. */
  const [attempted, setAttempted] = useState(false);
  const honeypot = useRef<HTMLInputElement>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);

  const fieldId = (name: keyof BookingEnquiry) => `${formId}-${name}`;
  const errorId = (name: keyof BookingEnquiry) => `${formId}-${name}-error`;

  function update(name: keyof BookingEnquiry, value: string) {
    const next = { ...values, [name]: value };
    setValues(next);
    if (attempted) setErrors(validateEnquiry(next));
  }

  function describedBy(name: keyof BookingEnquiry) {
    return errors[name] ? errorId(name) : undefined;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAttempted(true);
    setSubmitError(null);

    // Bots fill every field, including the one positioned off screen.
    if (honeypot.current?.value) {
      setStatus("success");
      return;
    }

    const nextErrors = validateEnquiry(values);
    setErrors(nextErrors);

    const firstInvalid = Object.keys(nextErrors)[0] as keyof BookingEnquiry | undefined;
    if (firstInvalid) {
      document.getElementById(fieldId(firstInvalid))?.focus();
      return;
    }

    setStatus("submitting");
    const result = await submitEnquiry({
      ...values,
      name: values.name.trim(),
      email: values.email.trim(),
      location: values.location.trim(),
      message: values.message.trim(),
    });

    if (result.ok) {
      setStatus("success");
      setValues(emptyEnquiry);
      setAttempted(false);
      requestAnimationFrame(() => feedbackRef.current?.focus());
      return;
    }

    setStatus("error");
    setSubmitError(result.error);
    requestAnimationFrame(() => feedbackRef.current?.focus());
  }

  if (status === "success") {
    return (
      <div
        ref={feedbackRef}
        tabIndex={-1}
        role="status"
        className="border border-champagne-deep/50 p-8 sm:p-10"
      >
        <p className="eyebrow">Enquiry sent</p>
        <p className="display mt-5 text-[clamp(1.6rem,3.2vw,2.4rem)] uppercase text-bone">
          Thank you.
        </p>
        <p className="mt-4 max-w-md font-sans text-[0.95rem] leading-[1.8] text-bone-muted">
          Your enquiry is on its way. You will receive a reply at the email address
          you provided. For anything urgent, email{" "}
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="text-champagne-bright underline underline-offset-4"
          >
            {siteConfig.contact.email}
          </a>
          .
        </p>
        <Button
          variant="ghost"
          className="mt-8"
          onClick={() => {
            setStatus("idle");
            setErrors({});
          }}
        >
          Send another enquiry
        </Button>
      </div>
    );
  }

  const invalidCount = Object.keys(errors).length;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-8">
      {(submitError || (attempted && invalidCount > 0)) && (
        <div
          ref={feedbackRef}
          tabIndex={-1}
          role="alert"
          className="border-l-2 border-red-400/70 bg-red-500/5 px-5 py-4 font-sans text-[0.85rem] leading-relaxed text-red-200"
        >
          {submitError ??
            `Please check the highlighted ${invalidCount === 1 ? "field" : "fields"} and try again.`}
        </div>
      )}

      <div className="grid gap-8 sm:grid-cols-2">
        <Field label="Name" htmlFor={fieldId("name")} error={errors.name} errorId={errorId("name")}>
          <input
            id={fieldId("name")}
            name="name"
            type="text"
            autoComplete="name"
            required
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy("name")}
            className={fieldClasses}
            placeholder="Your name"
          />
        </Field>

        <Field
          label="Email"
          htmlFor={fieldId("email")}
          error={errors.email}
          errorId={errorId("email")}
        >
          <input
            id={fieldId("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
            className={fieldClasses}
            placeholder="you@example.com"
          />
        </Field>

        <Field
          label="Phone"
          htmlFor={fieldId("phone")}
          optional
          error={errors.phone}
          errorId={errorId("phone")}
        >
          <input
            id={fieldId("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(event) => update("phone", event.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={describedBy("phone")}
            className={fieldClasses}
            placeholder="+44"
          />
        </Field>

        <Field
          label="Event type"
          htmlFor={fieldId("eventType")}
          error={errors.eventType}
          errorId={errorId("eventType")}
        >
          <div className="relative">
            <select
              id={fieldId("eventType")}
              name="eventType"
              required
              value={values.eventType}
              onChange={(event) => update("eventType", event.target.value)}
              aria-invalid={Boolean(errors.eventType)}
              aria-describedby={describedBy("eventType")}
              className={`${fieldClasses} appearance-none pr-8 ${
                values.eventType ? "text-bone" : "text-bone-faint"
              }`}
            >
              <option value="" disabled>
                Select an event type
              </option>
              {bookingForm.eventTypes.map((type) => (
                <option key={type} value={type} className="bg-ink text-bone">
                  {type}
                </option>
              ))}
            </select>
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 stroke-champagne-deep"
              fill="none"
              strokeWidth="1.5"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </Field>

        <Field
          label="Event date"
          htmlFor={fieldId("eventDate")}
          optional
          error={errors.eventDate}
          errorId={errorId("eventDate")}
        >
          <input
            id={fieldId("eventDate")}
            name="eventDate"
            type="date"
            value={values.eventDate}
            onChange={(event) => update("eventDate", event.target.value)}
            aria-describedby={describedBy("eventDate")}
            className={`${fieldClasses} ${values.eventDate ? "text-bone" : "text-bone-faint"}`}
          />
        </Field>

        <Field
          label="Venue / location"
          htmlFor={fieldId("location")}
          error={errors.location}
          errorId={errorId("location")}
        >
          <input
            id={fieldId("location")}
            name="location"
            type="text"
            required
            value={values.location}
            onChange={(event) => update("location", event.target.value)}
            aria-invalid={Boolean(errors.location)}
            aria-describedby={describedBy("location")}
            className={fieldClasses}
            placeholder="Town, venue or region"
          />
        </Field>
      </div>

      <Field
        label="Message"
        htmlFor={fieldId("message")}
        error={errors.message}
        errorId={errorId("message")}
      >
        <textarea
          id={fieldId("message")}
          name="message"
          rows={4}
          required
          value={values.message}
          onChange={(event) => update("message", event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describedBy("message")}
          className={`${fieldClasses} resize-y`}
          placeholder="Tell us about the event, the audience and the running time you have in mind."
        />
      </Field>

      {/* Honeypot: hidden from people, irresistible to bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor={`${formId}-company`}>Company</label>
        <input
          ref={honeypot}
          id={`${formId}-company`}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="flex flex-col gap-5 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" disabled={status === "submitting"} className="w-full sm:w-auto">
          {status === "submitting" ? "Sending…" : "Send Booking Enquiry"}
        </Button>
        <p className="font-sans text-[0.7rem] leading-relaxed tracking-[0.06em] text-bone-faint">
          Or email{" "}
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="text-bone-muted underline underline-offset-4 hover:text-champagne-bright"
          >
            {siteConfig.contact.email}
          </a>
        </p>
      </div>
    </form>
  );
}
