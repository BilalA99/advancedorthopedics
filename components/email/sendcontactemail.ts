'use server'

import { Resend } from 'resend';
import { randomUUID, createHash } from 'node:crypto';
import { EmailTemplate } from './emailtemplate';
import { MRIEmailTemplate } from './mrireviewtemplate';
import { TreatmentCandidacyEmailTemplate } from './candidemailtemplate';
import { ConditionCheckEmailTemplate } from './conditioncheckemailtemplate';
import { UserEmailTemplate } from './useremailtemplate';
import { MetaLeadEmailTemplate } from './metaleadtemplate';
import { MetaConfirmationEmailTemplate } from './metaconfirmationtemplate';
import { LawyerEmailTemplate } from './lawyeremailtemplate';
import { LawyerConfirmationTemplate } from './lawyerconfirmationtemplate';
import { createClient } from '@/utils/supabase/server';
import { createServiceClient } from '@/utils/supabase/service';
import { normalizeStateCode } from '@/lib/stateUtils';
import { resolveFormSource } from '@/lib/lead-contract';
import { resolveLeadRouting } from '@/lib/insurance-routing';
import { subjectWithInsurance } from '@/lib/intake-submission';
import { normalizeDateOfBirth, formatDateOfBirthForStaff } from '@/lib/date-of-birth';
import { CONFIRMATION_SUBJECT, confirmationPlainText } from '@/lib/meta-confirmation-content';

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error('RESEND_API_KEY is required to send email');
  }

  return new Resend(apiKey);
}

// ─────────────────────────────────────────────────────────────────────────────
// buildIdempotencyKey — collapse duplicate sends of the same lead
//
// Resend honours an `Idempotency-Key` header for 24h: two sends with the same key
// in that window resolve to a single delivered email. We derive a STABLE key from
// the submission fingerprint (scope + contact details) so that a user retrying
// after a transient failure — or double-submitting — never spams info@, WITHOUT
// needing any client change. `scope` keeps the internal notification, the patient
// confirmation, and each form type on separate keys so they never dedupe each other.
// ─────────────────────────────────────────────────────────────────────────────
function buildIdempotencyKey(scope: string, parts: Array<string | undefined>): string {
  const fingerprint = createHash('sha256')
    .update(parts.map((p) => (p || '').trim().toLowerCase()).join('|'))
    .digest('hex');
  return `${scope}-${fingerprint}`;
}

type PersistResult = {
  submissionId: string;
  persisted: boolean;
  /**
   * True when the row was rejected because this external lead is ALREADY
   * stored (unique violation on forms.external_lead_id).
   *
   * This is a success, not a failure: Meta retried a webhook and the database
   * refused the second copy, which is exactly what the unique index is for.
   * Callers must not treat it as a dropped lead, and must not re-send the
   * messages that the first pass already queued.
   */
  duplicate: boolean;
};

// ─────────────────────────────────────────────────────────────────────────────
// logLeadToSupabase — best-effort persistence boundary for accepted leads
//
// Persistence is deliberately NON-FATAL. The human-facing contract of a submission
// is "the practice was notified and the patient was confirmed", not "a row was
// written". If the insert fails (schema drift, RLS, an outage) we log loudly and
// return persisted:false, but we never throw — so a database problem can never
// again block the notification email, 500 the request, and drive the retry loop
// that spammed info@. A fresh submission_id is always returned so downstream
// measurement still has a stable, non-PII id even when the row did not land.
// ─────────────────────────────────────────────────────────────────────────────
async function logLeadToSupabase(data: {
  patient_name?: string;
  patient_email?: string;
  patient_phone?: string;
  state?: string;
  reason?: string;
  best_time?: string;
  insurance_type?: string;
  /** YYYY-MM-DD. Supabase only, never an ad or analytics parameter. */
  date_of_birth?: string;
  form_source?: string;
  attorney_firm?: string;
  attorney_name?: string;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  /**
   * Pathname of the landing page a paid lead arrived on.
   *
   * Supabase ONLY - never the GA4 event payload, never a Google Ads conversion
   * parameter. form_source=paid-landing is one bucket for every current and future
   * LP, so without this there is no way to compute per-LP conversion rate.
   *
   * This is NOT a privacy control, and must not be justified as one: GA4 already
   * receives the submitting page's pathname on every event as page_path. The line
   * that matters is per-user vs per-page - page_path records that a page was
   * viewed; a field on the lead record attaches information to an individual who
   * converted. Keeping landing_path server-side honors that line; it does not
   * keep the path out of GA4, because page_path was already there.
   */
  landing_path?: string;
  marketing_consent?: boolean;
  consent_recorded_at?: string;
  /**
   * External lead identity, for leads captured OUTSIDE this website.
   *
   * Only Meta Instant Form leads set these. `external_lead_id` carries a UNIQUE
   * partial index, so it is what makes "one row per Meta lead" a database
   * guarantee instead of an application hope — Meta retries a leadgen webhook
   * for ~36h and can have two retries in flight simultaneously.
   *
   * Identifiers only. Nothing here is patient data.
   */
  external_lead_id?: string;
  external_form_id?: string;
  external_form_version?: string;
  /** Meta's own created_time. `created_at` already records OUR receipt time. */
  external_submitted_at?: string;
}): Promise<PersistResult> {
  const submissionId = randomUUID();
  try {
    // ── Which key writes this row ──────────────────────────────────────────
    // A website submission keeps using the publishable key, exactly as before:
    // that is a request made on behalf of a browser, the RLS insert policy is
    // written for it, and changing it would alter the trust model of every form
    // on the site for no benefit.
    //
    // A Meta lead is PRIVILEGED SERVER INGESTION and now writes as service_role,
    // for two reasons:
    //
    //   1. The RLS insert policy (202611170003) forbids anon from setting the
    //      external_* columns or claiming form_source='meta-instant-form' — that
    //      is the point of the policy. Meta ingestion must bypass it, and
    //      service_role is how.
    //
    //   2. `createClient()` reads `cookies()`. This code path runs inside
    //      `waitUntil`, after the response has been sent, where there is no
    //      meaningful cookie scope and no browser to act for. A machine-to-
    //      machine client is the honest description of what this is.
    //
    // If the service key is absent, Meta ingestion fails rather than silently
    // falling back to a key the policy will now reject — a clear error beats an
    // RLS violation reported as schema drift.
    const isExternalIngestion = !!data.external_lead_id;
    const supabase = isExternalIngestion ? createServiceClient() : await createClient();
    if (!supabase) {
      console.error('[logLeadToSupabase] SUPABASE_SERVICE_ROLE_KEY missing — external lead NOT persisted', {
        submissionId,
        form_source: data.form_source,
      });
      return { submissionId, persisted: false, duplicate: false };
    }
    const { error } = await supabase.from('forms').insert({
      submission_id:  submissionId,
      patient_name:   data.patient_name   || null,
      patient_email:  data.patient_email  || null,
      patient_phone:  data.patient_phone  || null,
      state:          normalizeStateCode(data.state || '') || null,
      reason:         data.reason         || null,
      best_time:      data.best_time      || null,
      insurance_type: data.insurance_type || null,
      date_of_birth:  normalizeDateOfBirth(data.date_of_birth),
      form_source:    resolveFormSource({ explicitSource: data.form_source }) || null,
      attorney_firm:  data.attorney_firm  || null,
      attorney_name:  data.attorney_name  || null,
      gclid:          data.gclid          || null,
      gbraid:         data.gbraid         || null,
      wbraid:         data.wbraid         || null,
      utm_source:     data.utm_source     || null,
      utm_medium:     data.utm_medium     || null,
      utm_campaign:   data.utm_campaign   || null,
      utm_term:       data.utm_term       || null,
      utm_content:    data.utm_content    || null,
      landing_path:   data.landing_path   || null,
      // Consent state at submission. The offline Google Ads export reads this
      // and must upload only where it is TRUE — NULL means "not recorded" and
      // fails closed. Never gate the insert above on it: a patient who refuses
      // marketing cookies must still be able to request care.
      marketing_consent:   typeof data.marketing_consent === 'boolean' ? data.marketing_consent : null,
      consent_recorded_at: data.consent_recorded_at || null,
      external_lead_id:      data.external_lead_id      || null,
      external_form_id:      data.external_form_id      || null,
      external_form_version: data.external_form_version || null,
      external_submitted_at: data.external_submitted_at || null,
    });
    if (error) {
      // 23505 on forms_external_lead_id_key means this external lead is already
      // stored — a Meta webhook retry losing a race it was never meant to win.
      // Reported as a DUPLICATE, not a failure: logging it as "lead NOT
      // persisted" would make a correctly-deduplicated retry look like data loss
      // in exactly the logs an operator checks during an incident.
      if ((error as { code?: string }).code === '23505') {
        console.info('[logLeadToSupabase] duplicate external lead — already stored', {
          form_source: data.form_source,
          external_lead_id: data.external_lead_id,
        });
        return { submissionId, persisted: false, duplicate: true };
      }
      // Loud, structured log so a persistence outage is greppable/alertable and
      // never silent again (this outage went unnoticed for ~4 days).
      console.error('[logLeadToSupabase] insert failed — lead NOT persisted', {
        submissionId,
        form_source: data.form_source,
        message: error.message,
        code: (error as { code?: string }).code,
      });
      return { submissionId, persisted: false, duplicate: false };
    }
    return { submissionId, persisted: true, duplicate: false };
  } catch (err) {
    console.error('[logLeadToSupabase] unexpected error — lead NOT persisted', {
      submissionId,
      form_source: data.form_source,
      err,
    });
    return { submissionId, persisted: false, duplicate: false };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// sendUserEmail — confirmation email to patient + Supabase insert
// ─────────────────────────────────────────────────────────────────────────────
export async function sendUserEmail(formData: {
  name: string;
  email: string;
  phone: string;
  landing_path?: string;
  state?: string;
  reason?: string;
  bestTime?: string;
  /**
   * Insurance selection (D10/D11). First-party only: it lands in Supabase and
   * the internal staff email, and is never forwarded to an ad platform.
   */
  insurance_type?: string;
  /** Intake date of birth (YYYY-MM-DD). First-party only, like insurance_type. */
  date_of_birth?: string;
  form_source?: string;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}) {
  const { submissionId, persisted } = await logLeadToSupabase({
    patient_name:  formData.name,
    patient_email: formData.email,
    patient_phone: formData.phone,
    state:         formData.state,
    reason:        formData.reason,
    best_time:     formData.bestTime,
    insurance_type: formData.insurance_type,
    date_of_birth: formData.date_of_birth,
    form_source:   formData.form_source || 'unknown',
    landing_path:  formData.landing_path,
    gclid:         formData.gclid,
    gbraid:        formData.gbraid,
    wbraid:        formData.wbraid,
    utm_source:    formData.utm_source,
    utm_medium:    formData.utm_medium,
    utm_campaign:  formData.utm_campaign,
    utm_term:      formData.utm_term,
    utm_content:   formData.utm_content,
  });

  // The patient confirmation is best-effort: staff have already been notified
  // (routes call sendContactEmail first) and the lead is captured, so a bad
  // patient email address must not 500 the request and re-trigger the retry loop.
  // A real Resend outage still surfaces through the staff notification, which IS fatal.
  try {
    await getResendClient().emails.send({
      from: 'Mountain Spine & Orthopedics <info@mountainspineorthopedics.com>',
      to: [formData.email],
      subject: 'Thank you for contacting Mountain Spine & Orthopedics',
      react: await UserEmailTemplate({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      }),
    }, {
      idempotencyKey: buildIdempotencyKey('confirm', [formData.form_source, formData.email, formData.phone]),
    });
  } catch (error) {
    console.error('[sendUserEmail] patient confirmation failed (non-blocking)', { submissionId, error });
  }

  if (!persisted) {
    console.warn('[sendUserEmail] lead accepted but not persisted', { submissionId });
  }

  // The server's qualification decision, for the injury-page forms that call this
  // action directly (2026-10-24). The /api/forms routes spread their own routing
  // over this; it is the same function on the same value, so the two agree.
  return { ok: true as const, submissionId, ...resolveLeadRouting(formData.insurance_type, formData.date_of_birth) };
}

// ─────────────────────────────────────────────────────────────────────────────
// sendContactEmail — internal notification email to staff (no Supabase insert)
// ─────────────────────────────────────────────────────────────────────────────
export async function sendContactEmail(formData: {
  name: string;
  email: string;
  phone: string;
  reason: string;
  /** Optional since D10 removed "Best Time To Contact" from the intake form. */
  bestTime?: string;
  /** Insurance selection (D10/D11). Staff-facing only. */
  insurance_type?: string;
  /** Intake date of birth (YYYY-MM-DD). Email body only, never the subject. */
  date_of_birth?: string;
  has_attorney?: string;
  injury_type?: string;
  pain_level?: string;
  location?: string;
  state?: string;
  form_source?: string;
  destinationEmail?: string;
  insuranceCardFront?: File;
  insuranceCardBack?: File;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}) {
  try {
    const toEmail = formData.destinationEmail || 'info@mountainspineorthopedics.com';

    const attachments = formData.insuranceCardFront || formData.insuranceCardBack
      ? await Promise.all(
          [formData.insuranceCardFront, formData.insuranceCardBack].map(async (file) => {
            if (file) {
              const buffer = await file.arrayBuffer();
              return { filename: file.name, content: Buffer.from(buffer) };
            }
          })
        )
      : undefined;

    const data = await getResendClient().emails.send({
      from: 'Mountain Spine & Orthopedics <no-reply@mountainspineorthopedics.com>',
      to: [toEmail],
      subject: subjectWithInsurance('New Contact Form Submission', formData.insurance_type),
      react: await EmailTemplate({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        reason: formData.reason,
        bestTime: formData.bestTime,
        insurance_type: formData.insurance_type,
        date_of_birth: formatDateOfBirthForStaff(formData.date_of_birth),
        has_attorney: formData.has_attorney,
        injury_type: formData.injury_type,
        pain_level: formData.pain_level,
        location: formData.location,
        state: formData.state,
        gclid: formData.gclid,
        utm_source: formData.utm_source,
        utm_medium: formData.utm_medium,
        utm_campaign: formData.utm_campaign,
        utm_term: formData.utm_term,
        utm_content: formData.utm_content,
      }),
      attachments: attachments?.filter(Boolean) as any[],
    }, {
      idempotencyKey: buildIdempotencyKey('notify', [formData.form_source, formData.email, formData.phone]),
    });

    return data;
  } catch (error) {
    console.error('[sendContactEmail]', error);
    throw new Error('Failed to send email');
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// sendMRIContactEmail — Free MRI Review form
// ─────────────────────────────────────────────────────────────────────────────
export async function sendMRIContactEmail(formData: {
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
  comments: string;
  email_optout: string;
  insurance_type: string;
  /** Optional date of birth, YYYY-MM-DD. Supabase and the staff email body only. */
  date_of_birth?: string;
  last_test_date: string;
  other: string;
  recent_diagnosis: string;
  state: string;
  bestTime: string;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}) {
  const { submissionId, persisted } = await logLeadToSupabase({
    patient_name:   `${formData.first_name} ${formData.last_name}`.trim(),
    patient_email:  formData.email,
    patient_phone:  formData.phone,
    state:          formData.state,
    reason:         formData.recent_diagnosis || formData.comments || undefined,
    best_time:      formData.bestTime,
    insurance_type: formData.insurance_type,
    date_of_birth:  formData.date_of_birth,
    form_source:    'free-mri-review',
    gclid:          formData.gclid,
    gbraid:         formData.gbraid,
    wbraid:         formData.wbraid,
    utm_source:     formData.utm_source,
    utm_medium:     formData.utm_medium,
    utm_campaign:   formData.utm_campaign,
    utm_term:       formData.utm_term,
    utm_content:    formData.utm_content,
  });

  try {
    await getResendClient().emails.send({
      from: 'Mountain Spine & Orthopedics <no-reply@mountainspineorthopedics.com>',
      to: ['info@mountainspineorthopedics.com'],
      subject: subjectWithInsurance('New MRI Review Form Submission', formData.insurance_type),
      react: await MRIEmailTemplate({
        email: formData.email,
        phone: formData.phone,
        first_name: formData.first_name,
        last_name: formData.last_name,
        comments: formData.comments,
        email_optout: formData.email_optout,
        insurance_type: formData.insurance_type,
        date_of_birth: formatDateOfBirthForStaff(formData.date_of_birth),
        last_test_date: formData.last_test_date,
        other: formData.other,
        recent_diagnosis: formData.recent_diagnosis,
        state: formData.state,
        bestTime: formData.bestTime,
      }),
    }, {
      idempotencyKey: buildIdempotencyKey('mri', [formData.email, formData.phone]),
    });
  } catch (error) {
    console.error('[sendMRIContactEmail]', error);
    throw new Error('Failed to send email');
  }

  if (!persisted) {
    console.warn('[sendMRIContactEmail] notification sent but lead not persisted', { submissionId });
  }

  // D10: server-decided qualification, as for the other questionnaires.
  return { ok: true as const, submissionId, ...resolveLeadRouting(formData.insurance_type, formData.date_of_birth) };
}

// ─────────────────────────────────────────────────────────────────────────────
// sendCandidacyEmail — Treatment Candidacy Check form
// ─────────────────────────────────────────────────────────────────────────────
export async function sendCandidacyEmail(formData: {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  state: string;
  condition: string;
  age: string;
  health: string;
  smoking: string;
  recent_diagnosis: string;
  insurance_type: string;
  /** Optional date of birth, YYYY-MM-DD. Supabase and the staff email body only. */
  date_of_birth?: string;
  last_test_date: string;
  other: string;
  comments: string;
  email_optout: string;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}) {
  const { submissionId, persisted } = await logLeadToSupabase({
    patient_name:   `${formData.first_name} ${formData.last_name}`.trim(),
    patient_email:  formData.email,
    patient_phone:  formData.phone,
    state:          formData.state,
    reason:         formData.condition || undefined,
    insurance_type: formData.insurance_type,
    date_of_birth:  formData.date_of_birth,
    form_source:    'candidacy-check',
    gclid:          formData.gclid,
    gbraid:         formData.gbraid,
    wbraid:         formData.wbraid,
    utm_source:     formData.utm_source,
    utm_medium:     formData.utm_medium,
    utm_campaign:   formData.utm_campaign,
    utm_term:       formData.utm_term,
    utm_content:    formData.utm_content,
  });

  try {
    await getResendClient().emails.send({
      from: 'Mountain Spine & Orthopedics <info@mountainspineorthopedics.com>',
      to: ['info@mountainspineorthopedics.com'],
      subject: subjectWithInsurance('New Candidacy Form Submission', formData.insurance_type),
      react: await TreatmentCandidacyEmailTemplate({
        first_name:       formData.first_name,
        last_name:        formData.last_name,
        email:            formData.email,
        phone:            formData.phone,
        state:            formData.state,
        condition:        formData.condition,
        age:              formData.age,
        health:           formData.health,
        smoking:          formData.smoking,
        recent_diagnosis: formData.recent_diagnosis,
        insurance_type:   formData.insurance_type,
        date_of_birth:    formatDateOfBirthForStaff(formData.date_of_birth),
        last_test_date:   formData.last_test_date,
        other:            formData.other,
        comments:         formData.comments,
        email_optout:     formData.email_optout,
      }),
    }, {
      idempotencyKey: buildIdempotencyKey('candidacy', [formData.email, formData.phone]),
    });
  } catch (error) {
    console.error('[sendCandidacyEmail]', error);
    throw new Error('Failed to send email');
  }

  if (!persisted) {
    console.warn('[sendCandidacyEmail] notification sent but lead not persisted', { submissionId });
  }

  // D10: qualification is decided HERE, not in the browser, exactly as the
  // /api/forms/* endpoints do it. This questionnaire asks for insurance, so a
  // lead whose plan the practice cannot serve must not fire the qualified
  // conversion just because the form submitted successfully.
  return { ok: true as const, submissionId, ...resolveLeadRouting(formData.insurance_type, formData.date_of_birth) };
}

// ─────────────────────────────────────────────────────────────────────────────
// sendConditionCheckEmail — Condition Check form
// ─────────────────────────────────────────────────────────────────────────────
export const sendConditionCheckEmail = async (formData: {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  state: string;
  insurance_type: string;
  /** Optional date of birth, YYYY-MM-DD. Supabase and the staff email body only. */
  date_of_birth?: string;
  comments: string;
  email_optout: string;
  pain_area: string[];
  pain_strongest: string;
  pain_length: string;
  pain_desc: string;
  pain_always: string;
  pain_symptoms: string[];
  pain_worst: string;
  pain_feel_better: string;
  pain_source: string;
  pain_test: string;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}) => {
  const { submissionId, persisted } = await logLeadToSupabase({
    patient_name:   `${formData.first_name} ${formData.last_name}`.trim(),
    patient_email:  formData.email,
    patient_phone:  formData.phone,
    state:          formData.state,
    reason:         formData.pain_area?.join(', ') || undefined,
    insurance_type: formData.insurance_type,
    date_of_birth:  formData.date_of_birth,
    form_source:    'condition-check',
    gclid:          formData.gclid,
    gbraid:         formData.gbraid,
    wbraid:         formData.wbraid,
    utm_source:     formData.utm_source,
    utm_medium:     formData.utm_medium,
    utm_campaign:   formData.utm_campaign,
    utm_term:       formData.utm_term,
    utm_content:    formData.utm_content,
  });

  try {
    await getResendClient().emails.send({
      from: 'Mountain Spine & Orthopedics <info@mountainspineorthopedics.com>',
      to: ['info@mountainspineorthopedics.com'],
      subject: subjectWithInsurance('New Condition Check Form Submission', formData.insurance_type),
      react: await ConditionCheckEmailTemplate({
        first_name:       formData.first_name,
        last_name:        formData.last_name,
        email:            formData.email,
        phone:            formData.phone,
        state:            formData.state,
        insurance_type:   formData.insurance_type,
        date_of_birth:    formatDateOfBirthForStaff(formData.date_of_birth),
        comments:         formData.comments,
        email_optout:     formData.email_optout,
        pain_area:        formData.pain_area,
        pain_strongest:   formData.pain_strongest,
        pain_length:      formData.pain_length,
        pain_desc:        formData.pain_desc,
        pain_always:      formData.pain_always,
        pain_symptoms:    formData.pain_symptoms,
        pain_worst:       formData.pain_worst,
        pain_feel_better: formData.pain_feel_better,
        pain_source:      formData.pain_source,
        pain_test:        formData.pain_test,
      }),
    }, {
      idempotencyKey: buildIdempotencyKey('condition', [formData.email, formData.phone]),
    });
  } catch (error) {
    console.error('[sendConditionCheckEmail]', error);
    throw new Error('Failed to send email');
  }

  if (!persisted) {
    console.warn('[sendConditionCheckEmail] notification sent but lead not persisted', { submissionId });
  }

  // D10: server-decided qualification, as above.
  return { ok: true as const, submissionId, ...resolveLeadRouting(formData.insurance_type, formData.date_of_birth) };
};

// ─────────────────────────────────────────────────────────────────────────────
// sendLawyerContactEmail — Attorney Coordination form (internal + Supabase insert)
// ─────────────────────────────────────────────────────────────────────────────
export async function sendLawyerContactEmail(formData: {
  firmName: string;
  attorneyName: string;
  email: string;
  phone: string;
  barNumber?: string;
  practiceAreas: string;
  caseType: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  accidentDate: string;
  injuryDescription: string;
  urgency: string;
  additionalInfo?: string;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}) {
  const { submissionId, persisted } = await logLeadToSupabase({
    patient_name:  formData.clientName,
    patient_email: formData.clientEmail,
    patient_phone: formData.clientPhone,
    reason:        `${formData.caseType}: ${formData.injuryDescription}`,
    form_source:   'attorney-coordination',
    attorney_firm: formData.firmName,
    attorney_name: formData.attorneyName,
    gclid:         formData.gclid,
    gbraid:        formData.gbraid,
    wbraid:        formData.wbraid,
    utm_source:    formData.utm_source,
    utm_medium:    formData.utm_medium,
    utm_campaign:  formData.utm_campaign,
    utm_term:      formData.utm_term,
    utm_content:   formData.utm_content,
  });

  try {
    await getResendClient().emails.send({
      from: 'Mountain Spine & Orthopedics <no-reply@mountainspineorthopedics.com>',
      to: ['info@mountainspineorthopedics.com'],
      subject: `New Attorney Coordination Request - ${formData.clientName}`,
      react: await LawyerEmailTemplate({
        firmName:          formData.firmName,
        attorneyName:      formData.attorneyName,
        email:             formData.email,
        phone:             formData.phone,
        barNumber:         formData.barNumber,
        practiceAreas:     formData.practiceAreas,
        caseType:          formData.caseType,
        clientName:        formData.clientName,
        clientEmail:       formData.clientEmail,
        clientPhone:       formData.clientPhone,
        accidentDate:      formData.accidentDate,
        injuryDescription: formData.injuryDescription,
        urgency:           formData.urgency,
        additionalInfo:    formData.additionalInfo,
      }),
    }, {
      idempotencyKey: buildIdempotencyKey('lawyer-notify', [formData.email, formData.clientEmail, formData.clientPhone]),
    });
  } catch (error) {
    console.error('[sendLawyerContactEmail]', error);
    throw new Error('Failed to send attorney coordination email');
  }

  if (!persisted) {
    console.warn('[sendLawyerContactEmail] notification sent but lead not persisted', { submissionId });
  }

  return { ok: true as const, submissionId };
}

// ─────────────────────────────────────────────────────────────────────────────
// sendLawyerConfirmationEmail — confirmation email to attorney (no Supabase insert)
// ─────────────────────────────────────────────────────────────────────────────
export async function sendLawyerConfirmationEmail(formData: {
  attorneyName: string;
  email: string;
  firmName: string;
  clientName: string;
}) {
  try {
    const data = await getResendClient().emails.send({
      from: 'Mountain Spine & Orthopedics <info@mountainspineorthopedics.com>',
      to: [formData.email],
      subject: `Attorney Coordination Request Confirmed - ${formData.clientName}`,
      react: await LawyerConfirmationTemplate({
        attorneyName: formData.attorneyName,
        email:        formData.email,
        firmName:     formData.firmName,
        clientName:   formData.clientName,
      }),
    }, {
      idempotencyKey: buildIdempotencyKey('lawyer-confirm', [formData.email, formData.clientName]),
    });
    return data;
  } catch (error) {
    console.error('[sendLawyerConfirmationEmail]', error);
    throw new Error('Failed to send attorney confirmation email');
  }
}


// ─────────────────────────────────────────────────────────────────────────────
// Meta Instant Form leads — three independent steps
//
// This was ONE function (`sendMetaLeadEmail`) that persisted the lead and sent
// the staff email together, and threw if the email failed. That coupling is the
// thing being fixed: a patient confirmation email now has to be queued from the
// same lead WITHOUT being able to delay or fail the staff notification, and the
// webhook has to be able to retry one of the two without re-sending the other.
//
// So it is split into:
//   persistMetaLead               — store or reconcile the lead in Supabase
//   sendMetaStaffNotification     — the existing info@ alert, unchanged in intent
//   sendMetaPatientConfirmation   — the new acknowledgement to the patient
//
// Orchestration (ordering, idempotency, the feature flag, the activation
// boundary) lives in lib/meta-lead-pipeline.ts. Nothing here decides WHETHER to
// send; each function does one thing and reports what the provider said.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Stores a Meta Instant Form lead, or recognises it as already stored.
 *
 * Meta deletes Instant Form leads after 90 days, so this row is the only durable
 * record of the lead and must be written before any message is queued.
 */
export async function persistMetaLead(lead: {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  platform?: string;
  leadId: string;
  formId?: string;
  formVersion?: string | null;
  /** Meta's own created_time. `created_at` already records OUR receipt time. */
  submittedAt?: string;
  campaignId?: string;
  adsetId?: string;
  adId?: string;
}): Promise<PersistResult> {
  // The clinic the patient picked is the single most actionable thing on a Meta
  // lead - it is what decides who books them - and it was being shown in the
  // staff email and then dropped before the insert. public.forms has no column
  // for it, so it rides in `reason`, which is free text and surfaces as the
  // "Reason / Condition" column of the lead sheet. That column was otherwise a
  // constant sentence on every Meta row, carrying no information at all.
  const preferredLocation = lead.location?.trim();
  const reason = preferredLocation
    ? `Appointment request submitted through a Meta ad (Instant Form) - preferred location: ${preferredLocation}`
    : 'Appointment request submitted through a Meta ad (Instant Form)';

  // state is hardcoded because the Instant Form behind these ads asks "Which
  // Florida location is most convenient for you?" and offers Florida clinics
  // only, and the single live campaign targets Florida cities exclusively.
  // If a Meta campaign is ever run outside Florida, this must be derived from
  // the chosen location rather than left to file every lead under FL.
  return logLeadToSupabase({
    patient_name:  lead.name,
    patient_email: lead.email,
    patient_phone: lead.phone,
    state:         'FL',
    reason,
    form_source:   'meta-instant-form',
    utm_source:    lead.platform === 'instagram' ? 'instagram' : 'facebook',
    utm_medium:    'paid_social',
    utm_campaign:  lead.campaignId,
    // utm_term / utm_content carry the ad set and ad. They are the ONLY record
    // of which ad produced the lead, so they are never overwritten with
    // placeholder metadata when Meta omits them — an absent ad id stays absent.
    utm_term:      lead.adsetId,
    utm_content:   lead.adId,
    external_lead_id:      lead.leadId,
    external_form_id:      lead.formId,
    external_form_version: lead.formVersion || undefined,
    external_submitted_at: lead.submittedAt,
  });
}

/**
 * STAFF notification for a Meta Instant Form lead.
 *
 * Separate from sendContactEmail because the audience is different. A Meta lead
 * has no website session behind it: no date of birth, no insurance, no
 * reason-for-visit, because the Instant Form deliberately collects contact
 * details only.
 *
 * SUBJECT PRIVACY (changed 2026-11-17). The subject was
 * `New Meta Ad Lead — <patient name> — <clinic>`. info@ is a SHARED mailbox, and
 * a subject line is the most widely-replicated part of an email: it shows on
 * lock screens, in notification banners, in mobile previews, in mail-server
 * logs, and in any future forward or integration. Putting a patient's name there
 * published an identifiable care-seeking event to every one of those surfaces,
 * including a phone screen visible to whoever is standing next to it.
 *
 * The name and the clinic have NOT been removed from the email — they are in the
 * body, where staff already read them, so nobody loses information needed to
 * book the patient. Only the subject is now generic.
 */
export async function sendMetaStaffNotification(formData: {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  platform?: string;
  leadId: string;
  formId?: string;
  campaignId?: string;
  adsetId?: string;
  adId?: string;
  submittedAt?: string;
  destinationEmail?: string;
  /** Opaque, hashed. Never the Meta lead id. */
  idempotencyKey?: string;
}): Promise<{ id: string | null }> {
  const toEmail = formData.destinationEmail || 'info@mountainspineorthopedics.com';

  const { data, error } = await getResendClient().emails.send({
    from: 'Mountain Spine & Orthopedics <no-reply@mountainspineorthopedics.com>',
    to: [toEmail],
    // Generic. No name, no phone, no email address, no clinic, nothing clinical.
    subject: 'New Appointment Request — Action Required',
    react: await MetaLeadEmailTemplate({
      name:       formData.name,
      email:      formData.email,
      phone:      formData.phone,
      location:   formData.location,
      platform:   formData.platform,
      leadId:     formData.leadId,
      formId:     formData.formId,
      campaignId: formData.campaignId,
      adsetId:    formData.adsetId,
      adId:       formData.adId,
      submittedAt: formData.submittedAt,
    }),
  }, {
    // Provider-side dedup as a SECOND line of defence only. The first is the
    // unique `delivery_key` in public.message_deliveries, because Resend's key
    // expires after 24h while Meta retries for ~36h.
    idempotencyKey: formData.idempotencyKey || buildIdempotencyKey('meta-lead', [formData.leadId]),
  });

  if (error) {
    // Rethrown as a typed shape the pipeline can classify into retry-or-not.
    // The provider message is NOT logged: it can echo the recipient address.
    throw Object.assign(new Error('resend_send_failed'), {
      providerName: (error as { name?: string }).name,
      providerStatus: (error as { statusCode?: number }).statusCode,
    });
  }

  return { id: data?.id ?? null };
}

/**
 * PATIENT acknowledgement that an appointment REQUEST was received.
 *
 * Never called directly — lib/meta-lead-pipeline.ts gates it on the feature
 * flag, the activation boundary, the form's authorization status, and a claimed
 * row in public.message_deliveries. That gating is the whole safety story, so
 * this function deliberately contains none of it: it sends, or it throws.
 *
 * TRACKING IS DISABLED AT MESSAGE LEVEL. Resend's open tracking injects a 1x1
 * pixel and its click tracking rewrites every href through a redirector; both
 * would report a patient's read time, IP and client to a provider with no BAA,
 * and the rewritten links would also break the `tel:` CTA. Resend's domain
 * settings are the OTHER place these can be switched on, and they override
 * nothing here — but they can be changed in the dashboard without a deploy, so
 * the per-message headers below are the durable control and the domain setting
 * must be verified as off before activation.
 */
export async function sendMetaPatientConfirmation(formData: {
  /** The patient's address. Not persisted anywhere by this function. */
  email: string;
  /** Opaque, hashed. Never the Meta lead id. */
  idempotencyKey: string;
}): Promise<{ id: string | null }> {
  const { data, error } = await getResendClient().emails.send({
    // info@ is already the verified production sender for the website's patient
    // confirmation (sendUserEmail), so no new address or domain is introduced.
    // A dedicated scheduling@ address would read better, but claiming one that
    // is not verified in Resend would silently fail every send.
    from: 'Mountain Spine & Orthopedics <info@mountainspineorthopedics.com>',
    to: [formData.email],
    replyTo: 'info@mountainspineorthopedics.com',
    // No patient name, no location, no condition.
    subject: CONFIRMATION_SUBJECT,
    react: await MetaConfirmationEmailTemplate({}),
    // Required, not decorative: a text/plain part materially improves
    // deliverability for transactional mail and is what some clients render.
    text: confirmationPlainText(),
    headers: {
      // Transactional, not bulk. Keeps it out of Gmail's Promotions tab and
      // tells well-behaved clients not to auto-reply to it.
      'X-Entity-Ref-ID': formData.idempotencyKey,
      'Auto-Submitted': 'auto-generated',
    },
  }, {
    idempotencyKey: formData.idempotencyKey,
  });

  if (error) {
    throw Object.assign(new Error('resend_send_failed'), {
      providerName: (error as { name?: string }).name,
      providerStatus: (error as { statusCode?: number }).statusCode,
    });
  }

  return { id: data?.id ?? null };
}

/**
 * Generic operational alert for a lead from an UNAUTHORIZED Meta form or Page.
 *
 * WHY THIS IS NOT THE SCHEDULING NOTIFICATION
 * The first version sent quarantined leads through `sendMetaStaffNotification`,
 * reasoning that losing a patient to a config mismatch is worse than confusing a
 * scheduler. The first half of that is right; the conclusion was not. Routing an
 * unverifiable lead into the scheduling inbox means an attacker — or a stray
 * leadgen subscription on someone else's Page — can put arbitrary contact
 * details in front of staff in a message that looks exactly like a real patient
 * request. Staff then call a stranger, or a planted number.
 *
 * So quarantine is now RESTRICTED: this alert carries the form and page
 * identifiers and nothing else. No name, no phone, no email, no clinic. The
 * lead's actual details are still stored in Supabase, so nothing is lost and an
 * authorized operator can recover it after confirming the form is legitimate —
 * which is exactly the decision that should not be made by reflex from an inbox.
 *
 * Sent at most once per lead: the pipeline claims it through the same
 * `message_deliveries` row a staff notification would have used, so a Meta retry
 * cannot turn a misconfiguration into an inbox flood.
 */
export async function sendMetaQuarantineAlert(params: {
  leadId: string;
  formId?: string;
  pageId?: string;
  reason: string;
  destinationEmail?: string;
  /** Opaque, hashed. Never the Meta lead id. */
  idempotencyKey: string;
}): Promise<{ id: string | null }> {
  const toEmail = params.destinationEmail || 'info@mountainspineorthopedics.com';

  const lines = [
    'A Meta Instant Form lead arrived from a form or Page that is not in the authorized registry.',
    '',
    'It has been STORED but withheld from the scheduling workflow, and no patient',
    'details are included in this message by design.',
    '',
    `Reason:       ${params.reason}`,
    `Meta form ID: ${params.formId || '(none supplied)'}`,
    `Meta Page ID: ${params.pageId || '(none supplied)'}`,
    `Meta lead ID: ${params.leadId}`,
    '',
    'What to do:',
    '1. Confirm with whoever manages the Meta ad account that this form is ours.',
    '2. If it is, add the form ID to META_LEAD_FORM_ID_V3 (or the page ID to',
    '   META_LEAD_PAGE_IDS) and redeploy.',
    '3. The stored lead can then be worked from the lead sheet.',
    '',
    'If nobody recognises this form, treat it as unauthorized and do not contact',
    'anyone named in it.',
  ].join('\n');

  const { data, error } = await getResendClient().emails.send({
    from: 'Mountain Spine & Orthopedics <no-reply@mountainspineorthopedics.com>',
    to: [toEmail],
    // Deliberately distinguishable from the real scheduling alert, so it cannot
    // be mistaken for a lead to call.
    subject: 'Action needed: unrecognized Meta lead form (no patient details)',
    text: lines,
  }, {
    idempotencyKey: params.idempotencyKey,
  });

  if (error) {
    throw Object.assign(new Error('resend_send_failed'), {
      providerName: (error as { name?: string }).name,
      providerStatus: (error as { statusCode?: number }).statusCode,
    });
  }

  return { id: data?.id ?? null };
}
