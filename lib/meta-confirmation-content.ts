/**
 * Copy and plain-text rendering for the Meta lead patient confirmation email.
 *
 * Kept out of the React template, and free of `server-only`, so the exact words
 * that reach a patient are unit-testable and so the plain-text part is generated
 * from the same source as the HTML rather than drifting from it.
 *
 * WHAT THIS EMAIL IS NOT
 * It is not an appointment confirmation. Nothing is booked when a Meta Instant
 * Form is submitted — the practice calls the patient afterwards — so the body
 * states outright that the appointment is not confirmed until they speak to
 * scheduling. Wording it as a confirmation would be the single most harmful
 * mistake this email could make: a patient who believes they already have an
 * appointment does not answer the call that would have made one.
 *
 * NO RESPONSE-TIME PROMISE. "During business hours" is as specific as this gets.
 * The audit found 64% of leads arriving after 4 PM and 55% on weekends, so any
 * stated interval ("within 24 hours", "shortly") would be broken by the majority
 * of leads on the day they arrive.
 *
 * It carries NO patient name in the subject, no symptom, no pain location, no
 * condition, no insurance, no date of birth, nothing clinical, no promotion, no
 * newsletter, and no tracking parameter.
 */

/**
 * Inbound AND outbound scheduling number.
 *
 * ⚠️ UNVERIFIED FROM THIS ENVIRONMENT. "Please expect a call from (561) 223-9959"
 * is an assertion about what appears on a patient's screen, and nothing reachable
 * from here can confirm the practice's outbound caller ID. If the practice dials
 * out on a different trunk, this line actively trains patients to ignore the real
 * call — the exact failure the email exists to prevent. It must be confirmed with
 * the practice before activation; it is recorded as an open blocker in
 * mso-website-v3-readiness.json. If inbound and outbound differ, split this into
 * two constants and reword `EXPECT_CALL_*` to name both.
 */
export const SCHEDULING_PHONE_DISPLAY = "(561) 223-9959";
export const SCHEDULING_PHONE_TEL = "+15612239959";

export const SITE_URL = "https://mountainspineorthopedics.com";
export const SITE_LABEL = "mountainspineorthopedics.com";
export const PRACTICE_NAME = "Mountain Spine & Orthopedics";

/** Generic by design: no patient name, no location, no condition. */
export const CONFIRMATION_SUBJECT = "We've received your request";

export const CONFIRMATION_PREVIEW_TEXT =
  "Our scheduling team will be in touch during business hours.";

export const CONFIRMATION_HEADING = "We've Received Your Appointment Request!";

export const CONFIRMATION_CTA_LABEL = "Call Our Scheduling Team";

/** Paragraphs before the callout that carries the phone number. */
export const CONFIRMATION_INTRO: readonly string[] = [
  `Thank you for contacting ${PRACTICE_NAME}.`,
  "We've successfully received your request, and a member of our scheduling team will contact you during business hours to help arrange your appointment.",
];

/** Label above the number, then the reason to keep it. */
export const EXPECT_CALL_LABEL = "Please expect a call from:";
export const EXPECT_CALL_NOTE = "Save this number so you recognize our call.";

/** Paragraphs after the callout. */
export const CONFIRMATION_OUTRO: readonly string[] = [
  "Prefer to speak with us directly? You can also contact our scheduling team during business hours.",
  "Your appointment is not confirmed until you speak with our scheduling team.",
  "We look forward to assisting you.",
];

/**
 * The plain-text alternative.
 *
 * Required, not optional: a text/plain part materially improves deliverability
 * for a transactional message, and some patients read mail in clients that never
 * render the HTML. Generated from the same constants as the HTML so the two can
 * never disagree about the phone number.
 */
export function confirmationPlainText(): string {
  const blocks = [
    CONFIRMATION_HEADING,
    ...CONFIRMATION_INTRO,
    `${EXPECT_CALL_LABEL}\n${SCHEDULING_PHONE_DISPLAY}`,
    EXPECT_CALL_NOTE,
    ...CONFIRMATION_OUTRO,
  ];
  // Single newlines inside the signature so it reads as one block.
  const signature = [PRACTICE_NAME, SCHEDULING_PHONE_DISPLAY, SITE_LABEL].join("\n");
  return `${blocks.join("\n\n")}\n\n--\n${signature}\n`;
}
