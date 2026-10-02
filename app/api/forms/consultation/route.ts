import { NextResponse } from "next/server";
import { geolocation } from "@vercel/functions";
import {
  sendContactEmail,
  sendUserEmail,
} from "@/components/email/sendcontactemail";
import { resolveIntake } from "@/lib/intake-submission";

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
  /**
   * ZIP / postal code. Retained by the 2026-09-24 meeting, which removed only
   * "Best Time To Contact". Validated here against the same shared rule the form
   * uses, then persisted to `forms.postal_code`.
   */
  postalCode?: string;
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

    // ─────────────────────────────────────────────────────────────────────────
    // ZIP format is validated on the server, not only in the browser.
    //
    // Both sides call the SAME rule (lib/postal-code.ts), so they cannot drift
    // apart and reject each other's idea of a valid ZIP.
    //
    // A malformed value is rejected; an ABSENT one is not. Three different forms
    // post here — ConsultationForm and StateHeroForm collect ZIP and require it
    // client-side, MiniContactForm has never collected it — so requiring ZIP here
    // would 400 every MiniContactForm lead. Requiredness stays with the form that
    // shows the patient the error.
    //
    // Stored in normalized form, as a STRING, so a ZIP in the 0xxxx band keeps
    // its leading zero.
    // ─────────────────────────────────────────────────────────────────────────
    const intake = resolveIntake({ insuranceType: body.insurance_type, postalCode: body.postalCode });
    if (!intake.ok) {
      return NextResponse.json({ ok: false, error: intake.error, field: intake.field }, { status: 400 });
    }
    const { postalCode, routing } = intake;

    await sendContactEmail({
      name: fullName,
      email: body.email,
      phone: body.phone,
      reason: body.reason,
      insurance_type: body.insurance_type,
      postalCode,
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
      postalCode,
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


