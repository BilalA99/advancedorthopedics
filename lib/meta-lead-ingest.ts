import "server-only";

import { isAuthorizedPage } from "@/lib/meta-forms";
import { processMetaLead } from "@/lib/meta-lead-pipeline";
import {
  markAttemptFailed,
  markCompleted,
  markProcessing,
  markQuarantined,
} from "@/lib/meta-ingestion-store";
import { mapLeadToContact, type GraphLead, type LeadgenValue } from "@/lib/meta-leadgen";

/**
 * Fetch-and-process for one Meta lead.
 *
 * WHY THIS IS NOT IN THE ROUTE FILE
 * Next.js App Router permits a route module to export only route handlers and a
 * fixed set of config values — an extra export is a type error, not a warning
 * (`OmitWithTag<...> does not satisfy '{ [x: string]: never }'`). This function
 * has to be callable from two places: the webhook, and the reconciliation cron
 * that re-drives a lead whose first attempt died after the 200 was already sent.
 * So it lives here, the same reason `lib/meta-leadgen.ts` exists.
 *
 * Every step is idempotent. The lead insert is guarded by a unique
 * `forms.external_lead_id`; each message by a unique
 * `message_deliveries.delivery_key`; the work item by its primary key. Calling
 * this twice for the same lead cannot duplicate a row or an email.
 */

const GRAPH_VERSION = process.env.META_GRAPH_API_VERSION || "v26.0";
const LEAD_FIELDS = "id,created_time,field_data,campaign_id,adset_id,ad_id,form_id,platform";

/**
 * Hard timeout on the Graph call.
 *
 * Without one, a hanging request holds the background task open until the
 * platform kills the invocation, which loses the lead with no record of why.
 * 10s is well inside Meta's own latency and leaves room for the sends.
 */
const GRAPH_TIMEOUT_MS = 10_000;

export async function fetchLead(leadgenId: string, token: string): Promise<GraphLead> {
  /**
   * The token goes in an Authorization header, NOT in the query string.
   *
   * Graph accepts both. `?access_token=` is the form every example uses, and it
   * is the form that leaks: a URL ends up in platform request logs, in fetch
   * error messages, in stack traces, and in any error-reporting service that
   * captures the failing request — which is how a production Meta credential
   * gets exposed without anyone printing it. A header is captured by none of
   * those by default.
   */
  const url = `https://graph.facebook.com/${GRAPH_VERSION}/${leadgenId}?fields=${LEAD_FIELDS}`;

  const res = await fetch(url, {
    cache: "no-store",
    headers: { authorization: `Bearer ${token}` },
    signal: AbortSignal.timeout(GRAPH_TIMEOUT_MS),
  });
  const json = (await res.json()) as GraphLead;
  if (!res.ok || json.error) {
    // Reports the status, never the body: a Graph error body can echo the
    // request URL back, and callers log this message.
    throw new Error(json.error?.message || `Graph returned ${res.status}`);
  }
  return json;
}

/** Terminal outcome of one ingestion attempt, for the caller's logs. */
export type IngestOutcome = "completed" | "quarantined" | "retryable";

export async function ingestMetaLead(
  change: LeadgenValue,
  token: string,
): Promise<IngestOutcome> {
  const leadgenId = change.leadgen_id as string;
  const pageAuthorized = isAuthorizedPage(change.page_id);

  await markProcessing(leadgenId);

  let lead: GraphLead;
  try {
    lead = await fetchLead(leadgenId, token);
  } catch (error) {
    // A failed Graph lookup used to be the end of the lead: Meta already had its
    // 200 and would never retry. Now the attempt is recorded and the sweep tries
    // again, because the leadgen id stays valid for Meta's 90-day window.
    const code =
      error instanceof Error && error.name === "TimeoutError"
        ? "graph_timeout"
        : "graph_lookup_failed";
    const { exhausted } = await markAttemptFailed(leadgenId, code);
    console.error("[MetaLeadIngest] Graph lookup failed", { leadgenId, code, exhausted });
    throw error;
  }

  const contact = mapLeadToContact(lead, change);

  // Meta reports created_time in ISO; show it in clinic time so the scheduler
  // can judge how fresh the lead is at a glance.
  const submittedAtDisplay = lead.created_time
    ? new Date(lead.created_time).toLocaleString("en-US", {
        timeZone: "America/New_York",
        dateStyle: "medium",
        timeStyle: "short",
      })
    : undefined;

  const result = await processMetaLead({
    leadgenId,
    formId: lead.form_id || change.form_id,
    pageId: change.page_id,
    pageAuthorized,
    contact,
    // The raw instant, for the activation-boundary comparison. Judged on when
    // the PATIENT submitted, not when we happened to receive or reconcile it.
    submittedAt: lead.created_time,
    submittedAtDisplay,
  });

  // A quarantined lead is TERMINAL. An unauthorized form or Page will not become
  // authorized by being retried, and retrying would resend the operational alert
  // on every sweep. Clearing it is deliberate: configure the form or page id,
  // then reset the row's status to 'received'.
  if (result.quarantined) {
    await markQuarantined(
      leadgenId,
      !pageAuthorized ? "page_not_authorized" : `form_${result.formClassification.status}`,
    );
    return "quarantined";
  }

  if (result.stored === "failed") {
    // Nothing was stored, so this is not done. The staff alert has still gone
    // out, so the patient is not waiting on the retry.
    const { exhausted } = await markAttemptFailed(leadgenId, "persist_failed");
    console.error("[MetaLeadIngest] lead not persisted — left for reconciliation", {
      leadgenId,
      exhausted,
    });
    return "retryable";
  }

  await markCompleted(leadgenId, result.submissionId);
  return "completed";
}
