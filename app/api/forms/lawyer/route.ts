import { NextResponse } from "next/server";
import { geolocation } from "@vercel/functions";
import {
  sendLawyerConfirmationEmail,
  sendLawyerContactEmail,
} from "@/components/email/sendcontactemail";

type LawyerPayload = {
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
    const body: LawyerPayload = await request.json();

    const acceptance = await sendLawyerContactEmail(body);
    await sendLawyerConfirmationEmail({
      attorneyName: body.attorneyName,
      email: body.email,
      firmName: body.firmName,
      clientName: body.clientName,
    });

    return NextResponse.json(acceptance);
  } catch (error) {
    console.error("[LawyerForm] Submission failed", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}


