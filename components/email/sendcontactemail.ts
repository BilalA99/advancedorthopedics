'use server'

import { Resend } from 'resend';
import { randomUUID } from 'node:crypto';
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

const resend = new Resend(process.env.RESEND_API_KEY);

// ─────────────────────────────────────────────────────────────────────────────
// logLeadToSupabase — authoritative persistence boundary for accepted leads
// ─────────────────────────────────────────────────────────────────────────────
async function logLeadToSupabase(data: {
  patient_name?: string;
  patient_email?: string;
  patient_phone?: string;
  state?: string;
  reason?: string;
  best_time?: string;
  insurance_type?: string;
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
   * LP, so without this there is no way to compute per-LP conversion rate. Keeping
   * it server-side means that analysis is possible without putting a page path that
   * can imply a health condition into an ad platform.
   */
  landing_path?: string;
}) {
  try {
    const supabase = await createClient();
    const submissionId = randomUUID();
    const { error } = await supabase.from('forms').insert({
      submission_id:  submissionId,
      patient_name:   data.patient_name   || null,
      patient_email:  data.patient_email  || null,
      patient_phone:  data.patient_phone  || null,
      state:          normalizeStateCode(data.state || '') || null,
      reason:         data.reason         || null,
      best_time:      data.best_time      || null,
      insurance_type: data.insurance_type || null,
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
      console.error('[logLeadToSupabase]', error);
      throw new Error('Lead persistence failed');
    }
    return { ok: true as const, submissionId };
  } catch (err) {
    console.error('[logLeadToSupabase] unexpected error', err);
    throw new Error('Lead persistence failed');
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
  try {
    const acceptance = await logLeadToSupabase({
      patient_name:  formData.name,
      patient_email: formData.email,
      patient_phone: formData.phone,
      state:         formData.state,
      reason:        formData.reason,
      best_time:     formData.bestTime,
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

    await resend.emails.send({
      from: 'Mountain Spine & Orthopedics <info@mountainspineorthopedics.com>',
      to: [formData.email],
      subject: 'Thank you for contacting Mountain Spine & Orthopedics',
      react: await UserEmailTemplate({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      }),
    });

    return acceptance;
  } catch (error) {
    console.error('[sendUserEmail]', error);
    throw new Error('Failed to send email');
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// sendContactEmail — internal notification email to staff (no Supabase insert)
// ─────────────────────────────────────────────────────────────────────────────
export async function sendContactEmail(formData: {
  name: string;
  email: string;
  phone: string;
  reason: string;
  bestTime: string;
  has_attorney?: string;
  injury_type?: string;
  pain_level?: string;
  location?: string;
  state?: string;
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

    const data = await resend.emails.send({
      from: 'Mountain Spine & Orthopedics <no-reply@mountainspineorthopedics.com>',
      to: [toEmail],
      subject: 'New Contact Form Submission',
      react: await EmailTemplate({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        reason: formData.reason,
        bestTime: formData.bestTime,
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
  try {
    const acceptance = await logLeadToSupabase({
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

    await resend.emails.send({
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
    });

    return acceptance;
  } catch (error) {
    console.error('[sendMRIContactEmail]', error);
    throw new Error('Failed to send email');
  }
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
  try {
    const acceptance = await logLeadToSupabase({
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

    await resend.emails.send({
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
    });

    return acceptance;
  } catch (error) {
    console.error('[sendCandidacyEmail]', error);
    throw new Error('Failed to send email');
  }
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
  try {
    const acceptance = await logLeadToSupabase({
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

    await resend.emails.send({
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
    });

    return acceptance;
  } catch (error) {
    console.error('[sendConditionCheckEmail]', error);
    throw new Error('Failed to send email');
  }
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
  try {
    const acceptance = await logLeadToSupabase({
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

    await resend.emails.send({
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
    });

    return acceptance;
  } catch (error) {
    console.error('[sendLawyerContactEmail]', error);
    throw new Error('Failed to send attorney coordination email');
  }
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
    const data = await resend.emails.send({
      from: 'Mountain Spine & Orthopedics <info@mountainspineorthopedics.com>',
      to: [formData.email],
      subject: `Attorney Coordination Request Confirmed - ${formData.clientName}`,
      react: await LawyerConfirmationTemplate({
        attorneyName: formData.attorneyName,
        email:        formData.email,
        firmName:     formData.firmName,
        clientName:   formData.clientName,
      }),
    });
    return data;
  } catch (error) {
    console.error('[sendLawyerConfirmationEmail]', error);
    throw new Error('Failed to send attorney confirmation email');
  }
}
