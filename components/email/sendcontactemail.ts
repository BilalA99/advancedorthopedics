'use server'

import { Resend } from 'resend';
import { randomUUID, createHash } from 'node:crypto';
import { EmailTemplate } from './emailtemplate';
import { MRIEmailTemplate } from './mrireviewtemplate';
import { TreatmentCandidacyEmailTemplate } from './candidemailtemplate';
import { ConditionCheckEmailTemplate } from './conditioncheckemailtemplate';
import { UserEmailTemplate } from './useremailtemplate';
import { LawyerEmailTemplate } from './lawyeremailtemplate';
import { LawyerConfirmationTemplate } from './lawyerconfirmationtemplate';
import { createClient } from '@/utils/supabase/server';
import { normalizeStateCode } from '@/lib/stateUtils';
import { resolveFormSource } from '@/lib/lead-contract';
import { resolveLeadRouting } from '@/lib/insurance-routing';

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

type PersistResult = { submissionId: string; persisted: boolean };

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
  /**
   * ZIP / postal code, already normalized and validated by lib/postal-code.ts.
   *
   * Kept as a string end-to-end: `Number("02134")` is `2134`, a different place.
   * Column added in 202609270001_add_postal_code.sql — before this writer shipped,
   * because writing a column that does not exist is what broke lead capture for
   * four days when `landing_path` was added without a migration.
   */
  postal_code?: string;
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
}): Promise<PersistResult> {
  const submissionId = randomUUID();
  try {
    const supabase = await createClient();
    const { error } = await supabase.from('forms').insert({
      submission_id:  submissionId,
      patient_name:   data.patient_name   || null,
      patient_email:  data.patient_email  || null,
      patient_phone:  data.patient_phone  || null,
      state:          normalizeStateCode(data.state || '') || null,
      reason:         data.reason         || null,
      best_time:      data.best_time      || null,
      insurance_type: data.insurance_type || null,
      postal_code:    data.postal_code    || null,
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
    });
    if (error) {
      // Loud, structured log so a persistence outage is greppable/alertable and
      // never silent again (this outage went unnoticed for ~4 days).
      console.error('[logLeadToSupabase] insert failed — lead NOT persisted', {
        submissionId,
        form_source: data.form_source,
        message: error.message,
        code: (error as { code?: string }).code,
      });
      return { submissionId, persisted: false };
    }
    return { submissionId, persisted: true };
  } catch (err) {
    console.error('[logLeadToSupabase] unexpected error — lead NOT persisted', {
      submissionId,
      form_source: data.form_source,
      err,
    });
    return { submissionId, persisted: false };
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
  /** ZIP / postal code. Normalized and validated upstream; persisted verbatim. */
  postalCode?: string;
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
    postal_code:   formData.postalCode,
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

  return { ok: true as const, submissionId };
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
  /** ZIP / postal code. Staff-facing: the clinic uses it to route by service area. */
  postalCode?: string;
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
      subject: 'New Contact Form Submission',
      react: await EmailTemplate({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        reason: formData.reason,
        bestTime: formData.bestTime,
        insurance_type: formData.insurance_type,
        postalCode: formData.postalCode,
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
      subject: 'New MRI Review Form Submission',
      react: await MRIEmailTemplate({
        email: formData.email,
        phone: formData.phone,
        first_name: formData.first_name,
        last_name: formData.last_name,
        comments: formData.comments,
        email_optout: formData.email_optout,
        insurance_type: formData.insurance_type,
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
  return { ok: true as const, submissionId, ...resolveLeadRouting(formData.insurance_type) };
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
      subject: 'New Candidacy Form Submission',
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
  return { ok: true as const, submissionId, ...resolveLeadRouting(formData.insurance_type) };
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
      subject: 'New Condition Check Form Submission',
      react: await ConditionCheckEmailTemplate({
        first_name:       formData.first_name,
        last_name:        formData.last_name,
        email:            formData.email,
        phone:            formData.phone,
        state:            formData.state,
        insurance_type:   formData.insurance_type,
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
  return { ok: true as const, submissionId, ...resolveLeadRouting(formData.insurance_type) };
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
