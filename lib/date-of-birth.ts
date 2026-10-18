/**
 * The intake date of birth (Abubeckr and Israel, 2026-10-17, checklist thread).
 *
 * Optional on every intake form (Israel and Abubeckr agreed 2026-10-18; required
 * may come later, decided from the before and after form counts).
 * One rule, shared by the browser (each form's zod schema) and the server (each
 * `/api/forms/*` route), so the two can never disagree about what counts as a
 * real date of birth.
 *
 * ## Privacy: first-party only
 *
 * A date of birth is patient personal data. It goes to Supabase
 * `forms.date_of_birth` and to the body of the staff email to info@, and nowhere
 * else: never the email subject, never a URL, never `dataLayer`, GA4, Google Ads
 * Enhanced Conversions or Meta. docs/2026-09-20-measurement/measurement_privacy_review.md
 * lists it among what must not be sent, and scripts/validate-measurement-contract.mjs
 * fails the build if a measurement file mentions it.
 *
 * ## Server behaviour: never lose a lead over it
 *
 * Both sides accept an empty value. The server normalises: a missing or invalid
 * value is stored as NULL and the email says "Not provided", but the lead is still
 * accepted. A page cached from before this field existed, or a browser that skipped
 * validation, must not turn a real patient enquiry into an error.
 */

export const DATE_OF_BIRTH_LABEL = "Date of birth" as const;
export const DATE_OF_BIRTH_REQUIRED_MESSAGE = "Please enter your date of birth" as const;
export const DATE_OF_BIRTH_INVALID_MESSAGE = "Please enter a valid date of birth" as const;

/** Earliest accepted date of birth, as the native date input's `min`. */
export const DATE_OF_BIRTH_MIN = "1900-01-01" as const;

const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;

/** Today as YYYY-MM-DD in local time, for the native date input's `max`. */
export function todayIsoDate(now: Date = new Date()): string {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * Returns the value as YYYY-MM-DD when it is a real calendar date between
 * 1900-01-01 and today, otherwise null.
 *
 * A native `<input type="date">` always yields YYYY-MM-DD (or "" when empty),
 * whatever the display format on the patient's phone, so only that shape is
 * accepted. "Today" allows one day of slack so a patient in a time zone ahead of
 * the server is never rejected.
 */
export function normalizeDateOfBirth(
  value: string | null | undefined,
  now: Date = new Date(),
): string | null {
  const text = String(value ?? "").trim();
  const match = ISO_DATE.exec(text);
  if (!match) return null;

  const [, y, m, d] = match;
  const year = Number(y);
  const month = Number(m);
  const day = Number(d);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null; // e.g. 2001-02-30
  }

  if (text < DATE_OF_BIRTH_MIN) return null;
  const latest = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  if (date.getTime() > latest.getTime()) return null;

  return text;
}

/** Client-side check for each form's validation. */
export function isValidDateOfBirth(value: string | null | undefined): boolean {
  return normalizeDateOfBirth(value) !== null;
}

/** How the staff email shows it: MM/DD/YYYY, US style, or "Not provided". */
export function formatDateOfBirthForStaff(value: string | null | undefined): string {
  const iso = normalizeDateOfBirth(value);
  if (!iso) return "Not provided";
  const [y, m, d] = iso.split("-");
  return `${m}/${d}/${y}`;
}
