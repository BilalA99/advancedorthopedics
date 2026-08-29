import { normalizeStateCode } from "@/lib/stateUtils";

export const CANONICAL_LEAD_EVENT = "lead_form_submit_success" as const;

export const FORM_SOURCES = [
  "book-appointment",
  "doctor-contact",
  "location-contact",
  "general-contact",
  "homepage-consultation",
  "state-consultation",
  "location-consultation",
  "body-part-consultation",
  "modal-appointment",
  "patient-advocate",
  "free-mri-review",
  "candidacy-check",
  "condition-check",
  "attorney-coordination",
  "car-accident",
  "personal-injury",
  "slip-and-fall",
  "work-injury",
] as const;

export type FormSource = (typeof FORM_SOURCES)[number];

const FORM_SOURCE_SET = new Set<string>(FORM_SOURCES);

export function resolveFormSource({
  explicitSource,
  pathname = "",
  formId = "",
}: {
  explicitSource?: string | null;
  pathname?: string | null;
  formId?: string | null;
}): FormSource {
  const normalizedExplicit = explicitSource?.trim().toLowerCase();
  if (normalizedExplicit && FORM_SOURCE_SET.has(normalizedExplicit)) {
    return normalizedExplicit as FormSource;
  }

  const path = (pathname || "").toLowerCase();
  const id = (formId || "").toLowerCase();

  if (path === "/find-care/book-an-appointment" || id.includes("bookappointment")) {
    return "book-appointment";
  }
  if (id.includes("bookanappoitmentbutton") || id.includes("appointmentpopup")) {
    return "modal-appointment";
  }
  if (path.includes("/about/meetourdoctors/")) return "doctor-contact";
  if (path.includes("/locations/")) return "location-contact";
  if (id.includes("bodyparthero")) return "body-part-consultation";
  if (id.includes("mobilehero")) return "homepage-consultation";
  if (id.includes("patientadvocate")) return "patient-advocate";
  if (id.includes("lawyer")) return "attorney-coordination";
  if (id.includes("doctorcontact")) return "general-contact";
  return "general-contact";
}

export type LeadAcceptance = {
  ok: true;
  submissionId: string;
};

export function parseLeadAcceptance(value: unknown): LeadAcceptance | null {
  if (!value || typeof value !== "object") return null;
  const candidate = value as { ok?: unknown; submissionId?: unknown };
  if (candidate.ok !== true) return null;
  if (typeof candidate.submissionId !== "string" && typeof candidate.submissionId !== "number") return null;
  const submissionId = String(candidate.submissionId).trim();
  return submissionId ? { ok: true, submissionId } : null;
}

export async function readLeadAcceptance(response: Response): Promise<LeadAcceptance | null> {
  if (!response.ok || response.redirected) return null;
  try {
    return parseLeadAcceptance(await response.json());
  } catch {
    return null;
  }
}

export type CanonicalLeadEventPayload = {
  event: typeof CANONICAL_LEAD_EVENT;
  form_id: string;
  form_source: FormSource;
  page_path: string;
  market: string;
  submission_id: string;
};

export function buildCanonicalLeadEvent({
  formId,
  formSource,
  pagePath,
  state,
  submissionId,
}: {
  formId: string;
  formSource?: string;
  pagePath: string;
  state?: string;
  submissionId: string | number;
}): CanonicalLeadEventPayload {
  const normalizedSubmissionId = String(submissionId).trim();
  if (!normalizedSubmissionId) throw new Error("Accepted lead is missing its submission ID");

  return {
    event: CANONICAL_LEAD_EVENT,
    form_id: formId.trim() || "unknown-form",
    form_source: resolveFormSource({ explicitSource: formSource, pathname: pagePath, formId }),
    page_path: pagePath || "/",
    market: normalizeStateCode(state || ""),
    submission_id: normalizedSubmissionId,
  };
}
