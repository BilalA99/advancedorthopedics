import "server-only";

import {
  persistMetaLead,
  sendMetaStaffNotification,
  sendMetaPatientConfirmation,
  sendMetaQuarantineAlert,
} from "@/components/email/sendcontactemail";
import {
  enableMetaPatientConfirmationEmail,
  metaPatientConfirmationActivationAt,
} from "@/lib/config/featureFlags";
import { decideActivation } from "@/lib/config/metaConfirmationActivation";
import { classifyMetaForm, type MetaFormClassification } from "@/lib/meta-forms";
import {
  buildDeliveryKey,
  classifyProviderFailure,
  providerIdempotencyKey,
} from "@/lib/message-delivery";
import {
  claimDelivery,
  recordAccepted,
  recordFailure,
  recordSuppressed,
} from "@/lib/delivery-store";
import { hasServiceClient } from "@/utils/supabase/service";
import type { MetaLeadContact } from "@/lib/meta-leadgen";

/**
 * Orchestration for one Meta Instant Form lead.
 *
 * ORDER, AND WHY IT IS THIS ORDER
 *   1. Store the lead. Meta deletes Instant Form leads after 90 days, so until
 *      the row exists there is no durable record and nothing to reconcile
 *      against. Everything downstream keys off its submission_id.
 *   2. Staff notification. This is the EXISTING production behaviour and the
 *      thing that actually gets a patient called back. It runs first, and it
 *      never waits on the patient email.
 *   3. Patient confirmation. Independent job, independent idempotency,
 *      independent failure. Gated on the feature flag AND the activation
 *      boundary AND the form's authorization status.
 *
 * WHAT NEVER HAPPENS HERE
 *   - A lead is never discarded because an email failed. Persistence already
 *     succeeded by then, and each send records its own state.
 *   - The staff notification is never skipped because the patient email is off,
 *     and never retried because the patient email failed.
 *   - A quarantined lead (unauthorized form or Page) is never discarded and
 *     never enters the scheduling workflow. It is stored, and staff get a
 *     GENERIC alert carrying identifiers only — no contact details — so an
 *     unverifiable lead cannot be mistaken for a real patient to call.
 */

export type MetaLeadProcessResult = {
  leadgenId: string;
  /** public.forms.submission_id for this lead. The ingestion queue's join key. */
  submissionId: string;
  /** True when the form OR the delivering Page was not authorized. */
  quarantined: boolean;
  formClassification: MetaFormClassification;
  stored: "inserted" | "duplicate" | "failed";
  staff: "accepted" | "skipped-duplicate" | "failed" | "backoff";
  patient:
    | "accepted"
    | "suppressed-flag-disabled"
    | "suppressed-pre-activation"
    | "suppressed-form-version"
    | "suppressed-quarantined-form"
    | "suppressed-no-recipient"
    | "skipped-duplicate"
    | "skipped-no-delivery-store"
    | "failed"
    | "backoff";
};

/** Namespace for every delivery key this pipeline mints. */
const NAMESPACE = "meta";

type DeliveryAttemptOutcome = "accepted" | "skipped-duplicate" | "failed" | "backoff";

/**
 * Runs one send under the outbox: claim, send, record.
 *
 * `failOpenWithoutStore` is the single most consequential parameter in this
 * file. When the durable store is unavailable:
 *
 *   STAFF notification fails OPEN (true). Losing a staff alert loses the
 *   patient, and a duplicate alert costs a scheduler five seconds. Resend's own
 *   24h idempotency key still collapses most duplicates.
 *
 *   PATIENT confirmation fails CLOSED (false). Without the store there is no way
 *   to prove a patient has not already been emailed, and mailing a patient twice
 *   about their medical appointment request is not a five-second cost.
 */
async function runDelivery({
  submissionId,
  messageType,
  leadgenId,
  send,
  failOpenWithoutStore,
}: {
  submissionId: string;
  messageType: "staff-notification" | "patient-confirmation";
  leadgenId: string;
  send: (opaqueKey: string) => Promise<{ id: string | null }>;
  failOpenWithoutStore: boolean;
}): Promise<DeliveryAttemptOutcome> {
  const deliveryKey = buildDeliveryKey(NAMESPACE, leadgenId, messageType);
  const opaqueKey = providerIdempotencyKey(deliveryKey);

  const claim = await claimDelivery({ submissionId, messageType, deliveryKey });

  if (!claim.claimed) {
    if (claim.reason === "already-settled") return "skipped-duplicate";
    if (claim.reason === "backoff" || claim.reason === "exhausted") return "backoff";
    // store-unavailable
    if (!failOpenWithoutStore) {
      console.error("[meta-pipeline] delivery store unavailable — patient email withheld", {
        messageType,
        leadgenId,
      });
      return "backoff";
    }
    console.warn("[meta-pipeline] delivery store unavailable — sending without durable state", {
      messageType,
      leadgenId,
    });
    try {
      await send(opaqueKey);
      return "accepted";
    } catch (error) {
      console.error("[meta-pipeline] send failed with no durable state", {
        messageType,
        leadgenId,
        code: (error as { providerName?: string }).providerName,
      });
      return "failed";
    }
  }

  try {
    const { id } = await send(opaqueKey);
    await recordAccepted(claim.deliveryId, id);
    return "accepted";
  } catch (error) {
    const providerStatus = (error as { providerStatus?: number }).providerStatus ?? null;
    const providerName = (error as { providerName?: string }).providerName ?? null;
    const { status, recoverable } = classifyProviderFailure(providerStatus, providerName);
    // Sanitized code only: the provider's message can echo the recipient address.
    const errorCode = providerName
      ? `${providerName}`.slice(0, 64)
      : providerStatus
        ? `http_${providerStatus}`
        : "network_error";
    await recordFailure(claim.deliveryId, status === "pending" ? "pending" : "failed", errorCode);
    console.error("[meta-pipeline] send failed", {
      messageType,
      leadgenId,
      attempt: claim.attempt,
      errorCode,
      recoverable,
    });
    return recoverable ? "backoff" : "failed";
  }
}

/**
 * Processes a single verified Meta lead end to end.
 *
 * Never throws. The webhook has already acknowledged Meta by the time this runs,
 * so an exception escaping here would be an unhandled rejection in a background
 * task with nothing to catch it — every failure mode is a recorded state instead.
 */
export async function processMetaLead({
  leadgenId,
  formId,
  pageId,
  contact,
  submittedAt,
  submittedAtDisplay,
  pageAuthorized = true,
}: {
  leadgenId: string;
  formId: string | undefined;
  pageId?: string | undefined;
  contact: MetaLeadContact;
  /** Meta's `created_time`, the patient's own submission instant. */
  submittedAt: string | undefined;
  /** Clinic-local string for the staff email body. */
  submittedAtDisplay: string | undefined;
  /** False when the delivering Page is not in the authorized list. */
  pageAuthorized?: boolean;
}): Promise<MetaLeadProcessResult> {
  const formClassification = classifyMetaForm(formId);
  const quarantined = formClassification.status !== "authorized" || !pageAuthorized;

  const persisted = await persistMetaLead({
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
    location: contact.location,
    platform: contact.utm_source,
    leadId: leadgenId,
    formId: formClassification.formId || formId,
    formVersion: formClassification.version,
    submittedAt,
    campaignId: contact.utm_campaign,
    adsetId: contact.utm_term,
    adId: contact.utm_content,
  });

  const stored: MetaLeadProcessResult["stored"] = persisted.duplicate
    ? "duplicate"
    : persisted.persisted
      ? "inserted"
      : "failed";

  // ── Staff notification, or a restricted quarantine alert ───────────────────
  //
  // An unauthorized form or Page gets a GENERIC alert carrying identifiers only
  // — no name, no phone, no email, no clinic. Routing an unverifiable lead into
  // the scheduling inbox would let a stray leadgen subscription, or an attacker,
  // put arbitrary contact details in front of staff in a message indistinguish-
  // able from a real patient request; staff would then call a stranger or a
  // planted number. The lead's details are still STORED, so nothing is lost and
  // an authorized operator can recover it after confirming the form is ours.
  //
  // Both paths share the same `staff-notification` delivery key, so exactly one
  // of the two is ever sent for a given lead and a Meta retry cannot turn a
  // misconfiguration into an inbox flood.
  //
  // Neither is conditioned on the insert succeeding: a database outage must not
  // also silence the alert that gets the patient called.
  const staff = await runDelivery({
    submissionId: persisted.submissionId,
    messageType: "staff-notification",
    leadgenId,
    failOpenWithoutStore: true,
    send: (opaqueKey) =>
      quarantined
        ? sendMetaQuarantineAlert({
            leadId: leadgenId,
            formId: formClassification.formId || formId,
            pageId,
            reason: !pageAuthorized
              ? "page_not_authorized"
              : `form_${formClassification.status}`,
            idempotencyKey: opaqueKey,
          })
        : sendMetaStaffNotification({
            name: contact.name,
            email: contact.email,
            phone: contact.phone,
            location: contact.location,
            platform: contact.utm_source,
            leadId: leadgenId,
            formId: formClassification.formId || formId,
            campaignId: contact.utm_campaign,
            adsetId: contact.utm_term,
            adId: contact.utm_content,
            submittedAt: submittedAtDisplay,
            idempotencyKey: opaqueKey,
          }),
  });

  if (quarantined) {
    console.warn("[meta-pipeline] quarantined — generic alert only, no patient details sent", {
      leadgenId,
      formId: formClassification.formId || null,
      pageId: pageId ?? null,
      formStatus: formClassification.status,
      pageAuthorized,
    });
  }

  // ── Patient confirmation ───────────────────────────────────────────────────
  const patient = await runPatientConfirmation({
    submissionId: persisted.submissionId,
    leadgenId,
    recipient: contact.email,
    submittedAt,
    formClassification,
    quarantined,
  });

  // Identifiers and outcomes only — never a contact field.
  console.info("[meta-pipeline] processed", {
    leadgenId,
    formId: formClassification.formId || null,
    formVersion: formClassification.version,
    formStatus: formClassification.status,
    stored,
    staff,
    patient,
  });

  return {
    leadgenId,
    submissionId: persisted.submissionId,
    quarantined,
    formClassification,
    stored,
    staff,
    patient,
  };
}

async function runPatientConfirmation({
  submissionId,
  leadgenId,
  recipient,
  submittedAt,
  formClassification,
  quarantined,
}: {
  submissionId: string;
  leadgenId: string;
  recipient: string;
  submittedAt: string | undefined;
  formClassification: MetaFormClassification;
  /** True when the form OR the delivering Page was unauthorized. */
  quarantined: boolean;
}): Promise<MetaLeadProcessResult["patient"]> {
  const deliveryKey = buildDeliveryKey(NAMESPACE, leadgenId, "patient-confirmation");

  const suppress = async (
    reason: string,
    outcome: MetaLeadProcessResult["patient"],
  ): Promise<MetaLeadProcessResult["patient"]> => {
    // Recorded, not just skipped: a `suppressed` row is terminal, so turning the
    // flag on later cannot retroactively mail a lead that was already judged
    // ineligible. That is what keeps the 12 historical leads safe.
    await recordSuppressed({
      submissionId,
      messageType: "patient-confirmation",
      deliveryKey,
      reason,
    });
    return outcome;
  };

  // A lead we cannot attribute to an authorized form AND Page does not get an
  // outbound patient message. Storage and the generic alert already happened.
  if (quarantined) {
    return suppress("quarantined", "suppressed-quarantined-form");
  }

  const activation = decideActivation({
    enabled: enableMetaPatientConfirmationEmail,
    activationBoundary: metaPatientConfirmationActivationAt,
    submittedAt,
    formVersion: formClassification.version,
  });

  if (!activation.eligible) {
    if (activation.reason === "flag-disabled") {
      return suppress("flag_disabled", "suppressed-flag-disabled");
    }
    if (activation.reason === "form-version-not-eligible") {
      return suppress("form_version_not_eligible", "suppressed-form-version");
    }
    return suppress(activation.reason.replace(/-/g, "_"), "suppressed-pre-activation");
  }

  // The Instant Form makes email required, but a malformed payload must not
  // become a send to "".
  const email = recipient.trim();
  if (!email || !email.includes("@")) {
    return suppress("no_recipient", "suppressed-no-recipient");
  }

  if (!hasServiceClient()) {
    // Fail closed, loudly. Without the outbox there is no duplicate protection
    // beyond Resend's 24h window, which is shorter than Meta's retry window.
    console.error(
      "[meta-pipeline] SUPABASE_SERVICE_ROLE_KEY missing — patient confirmation withheld",
      { leadgenId },
    );
    return "skipped-no-delivery-store";
  }

  const outcome = await runDelivery({
    submissionId,
    messageType: "patient-confirmation",
    leadgenId,
    failOpenWithoutStore: false,
    send: (opaqueKey) => sendMetaPatientConfirmation({ email, idempotencyKey: opaqueKey }),
  });

  return outcome;
}
