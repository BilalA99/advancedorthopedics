import { NextResponse } from "next/server";
import { geolocation } from "@vercel/functions";
import {
  sendContactEmail,
  sendUserEmail,
} from "@/components/email/sendcontactemail";
import { resolveIntake } from "@/lib/intake-submission";
import { normalizeDateOfBirth } from "@/lib/date-of-birth";

type ConsultationPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  reason: string;
  /**
   * Insurance selection (D10/D11, 2026-09-24). Persisted to Supabase and shown
   * in the staff email only — never forwarded to GA4, Google Ads or Meta.
   */
  insurance_type?: string;
  /** Date of birth, YYYY-MM-DD (lib/date-of-birth.ts). Supabase and the staff email body only. */
  date_of_birth?: string;
  country?: string;
  state?: string;
  form_source?: string;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
};

export async function POST(request: Request) {
  const { country } = geolocation(request) || {};
  const requestCountry =
    country || request.headers.get("x-vercel-ip-country") || "US";

  if (requestCountry !== "US") {
    console.warn("[GeoBlock] Blocked non-US submission:", requestCountry);
    return NextResponse.redirect(new URL("/unavailable", request.url));
  }

  try {
    const body: ConsultationPayload = await request.json();

    const fullName = `${body.firstName} ${body.lastName}`.trim();

    // Insurance qualification is decided here, on the server (lib/intake-submission.ts).
    // ZIP is no longer collected or read (2026-10-14).
    // Normalised, never rejected: a missing or invalid value is stored as NULL.
    const dateOfBirth = normalizeDateOfBirth(body.date_of_birth) ?? undefined;
    const intake = resolveIntake({ insuranceType: body.insurance_type, dateOfBirth });
    const { routing } = intake;

    await sendContactEmail({
      name: fullName,
      email: body.email,
      phone: body.phone,
      reason: body.reason,
      insurance_type: body.insurance_type,
      date_of_birth: dateOfBirth,
      state: body.state,
      form_source: body.form_source || 'general-contact',
      gclid: body.gclid,
      gbraid: body.gbraid,
      wbraid: body.wbraid,
      utm_source: body.utm_source,
      utm_medium: body.utm_medium,
      utm_campaign: body.utm_campaign,
      utm_term: body.utm_term,
      utm_content: body.utm_content,
    });
    const acceptance = await sendUserEmail({
      name: fullName,
      email: body.email,
      phone: body.phone,
      state: body.state,
      reason: body.reason,
      insurance_type: body.insurance_type,
      date_of_birth: dateOfBirth,
      form_source: body.form_source || 'general-contact',
      gclid: body.gclid,
      gbraid: body.gbraid,
      wbraid: body.wbraid,
      utm_source: body.utm_source,
      utm_medium: body.utm_medium,
      utm_campaign: body.utm_campaign,
      utm_term: body.utm_term,
      utm_content: body.utm_content,
    });

    // The browser obeys `qualification` for the conversion gate and navigates by
    // `destination`. `acceptance` keeps its existing { ok, submissionId } shape, so
    // every other caller of this endpoint is unaffected.
    return NextResponse.json({ ...acceptance, ...routing });
  } catch (error) {
    console.error("[ConsultationForm] Submission failed", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}


