/**
 * The single US ZIP / postal code rule, shared by the intake form and the
 * submission endpoint.
 *
 * ## Why this is a module and not two regexes
 *
 * The form validated ZIP with an inline `/^\d{5}(?:-\d{4})?$/` in each of the
 * thirteen components that collect it, and the server validated it nowhere. A
 * shared rule means the client and the server cannot disagree about what a valid
 * ZIP is, and a fix lands once.
 *
 * ## ZIP is a STRING, never a number
 *
 * `02134` and `2134` are not the same postal code, and `Number("02134")` is
 * `2134`. Every function here takes and returns strings, and nothing in this
 * module coerces, parses or arithmetically compares a ZIP. That is the entire
 * defence against the leading-zero class of bug, which silently drops the leading
 * digit of every ZIP in the 0xxxx band (CT, MA, ME, NH, NJ, NY, PR, RI, VT).
 *
 * Florida — the practice's home market — is 32xxx–34xxx and so never exercises
 * that path in local testing, which is exactly why it has to be enforced by a
 * rule rather than noticed by hand.
 */

/** 5-digit ZIP, or ZIP+4 with a hyphen. Anchored: no prefix or suffix allowed. */
export const POSTAL_CODE_PATTERN = /^\d{5}(?:-\d{4})?$/;

/** The one message every surface shows for a bad ZIP. */
export const POSTAL_CODE_ERROR = "Please enter a valid ZIP code";

/**
 * Cleans up what a real person (or their browser's autofill, or a paste from a
 * PDF) actually types, without ever changing which postal code it is.
 *
 * Handles, in order:
 *  - surrounding and interior whitespace, including the non-breaking space that
 *    comes from pasting out of Word and the tab from pasting out of a spreadsheet
 *  - the Unicode dashes an autocorrecting keyboard substitutes for a hyphen
 *    (en dash, em dash, minus sign, figure dash), which otherwise fail the
 *    pattern for a ZIP+4 the patient typed correctly
 *  - a 9-digit run with no separator, or a space-separated ZIP+4, both of which
 *    become the canonical hyphenated form
 *
 * Deliberately does NOT strip non-digits generally: a ZIP containing letters is a
 * mistake worth surfacing to the patient, not something to silently repair into a
 * different, valid-looking ZIP.
 */
export function normalizePostalCode(raw: string | null | undefined): string {
  if (!raw) return "";

  const collapsed = String(raw)
    // Every Unicode space separator, plus tab/newline and the non-breaking space.
    .replace(/[\s   -   　]+/g, " ")
    .trim()
    // Any dash that is not an ASCII hyphen.
    .replace(/[‐-―−]/g, "-");

  // "12345 6789" -> "12345-6789"; also tolerates "12345 - 6789".
  const spaced = collapsed.replace(/^(\d{5})\s*-?\s*(\d{4})$/, "$1-$2");
  if (spaced !== collapsed) return spaced;

  // "123456789" -> "12345-6789". Only for exactly 9 digits, so a 6- or 8-digit
  // typo still fails loudly instead of being reshaped into a valid-looking ZIP.
  const bare = collapsed.replace(/\s+/g, "");
  if (/^\d{9}$/.test(bare)) return `${bare.slice(0, 5)}-${bare.slice(5)}`;

  return bare;
}

/** True when `raw` normalizes to a 5-digit ZIP or a hyphenated ZIP+4. */
export function isValidPostalCode(raw: string | null | undefined): boolean {
  return POSTAL_CODE_PATTERN.test(normalizePostalCode(raw));
}

/**
 * The value to store and forward: normalized when valid, empty string when not.
 *
 * The server calls this after `isValidPostalCode` has already rejected invalid
 * input, so the empty-string branch is a belt-and-braces guarantee that a
 * malformed ZIP is never persisted rather than an expected outcome.
 */
export function toStoredPostalCode(raw: string | null | undefined): string {
  const normalized = normalizePostalCode(raw);
  return POSTAL_CODE_PATTERN.test(normalized) ? normalized : "";
}

/** The first five digits, for service-area checks that ignore the +4. */
export function postalCodePrefix(raw: string | null | undefined): string {
  const normalized = normalizePostalCode(raw);
  return POSTAL_CODE_PATTERN.test(normalized) ? normalized.slice(0, 5) : "";
}

/**
 * Server-side validation for a submitted ZIP.
 *
 * Validates the FORMAT of a value that was provided, and treats an absent value as
 * acceptable. Requiredness is a per-form business rule enforced client-side, where
 * the patient can actually see the error — and it genuinely differs per form: the
 * main consultation form requires ZIP, while the compact MiniContactForm on
 * condition pages has never collected it. Hard-requiring ZIP on the shared
 * `/api/forms/consultation` endpoint would 400 every MiniContactForm submission and
 * silently destroy those leads, which is the same class of outage as writing a
 * column that does not exist.
 *
 * What the server does guarantee is that a malformed ZIP never reaches storage: a
 * present-but-invalid value is rejected outright rather than stored as garbage or
 * silently blanked.
 */
export function validateSubmittedPostalCode(
  raw: string | null | undefined,
): { ok: boolean; stored: string } {
  const normalized = normalizePostalCode(raw);
  if (!normalized) return { ok: true, stored: "" };
  return POSTAL_CODE_PATTERN.test(normalized)
    ? { ok: true, stored: normalized }
    : { ok: false, stored: "" };
}
