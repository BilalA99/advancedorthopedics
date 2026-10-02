import { CheckCircle, Phone, Mail } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { MAIN_PHONE_DISPLAY, MAIN_PHONE_HREF } from "@/lib/locationConstants";

/**
 * Non-qualified confirmation page (D10).
 *
 * Intentionally a server component with no client JavaScript: it must not push
 * any analytics event. The qualified conversion is fired from the canonical
 * dataLayer event in utils/enhancedConversions.ts before navigation, and
 * unqualified leads never reach that push (see the STEP 0 gate there). Keeping
 * this page inert is the second line of defence — there is no code here that
 * could fire a conversion even by accident.
 *
 * Tone matters. This patient asked a practice for help and is being told their
 * plan may not be accepted. It says what happens next, gives a phone number, and
 * makes no promise about coverage either way.
 */
export default function ThankYouOtherPage() {
  return (
    <div className="lg:py-[80px] py-[40px] w-full bg-gradient-to-br from-blue-50 to-slate-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle className="h-12 w-12 text-[#0A50EC]" aria-hidden="true" />
            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-[#252932]">
                Request Received
              </h1>
              <p className="text-lg text-gray-600">We&apos;ll be in touch shortly</p>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              Thank you for contacting Mountain Spine &amp; Orthopedics. Your request
              has been received and a member of our team will reach out to you.
            </p>

            <div className="rounded-lg border border-blue-100 bg-white p-6 space-y-3">
              <h2 className="text-xl font-semibold text-[#252932]">
                About your insurance
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Mountain Spine &amp; Orthopedics is a PPO practice. Because the plan
                you selected is outside the plans we participate in directly, our
                team will go over your options with you before anything is
                scheduled — including self-pay pricing and, where it applies,
                out-of-network benefits your plan may still provide.
              </p>
              <p className="text-gray-700 leading-relaxed">
                If you are not certain which plan type you hold, it is worth a
                call. Plan names can be misleading, and patients sometimes have a
                PPO without realising it.
              </p>
            </div>

            <div className="rounded-lg bg-white border border-gray-200 p-6 space-y-4">
              <h2 className="text-xl font-semibold text-[#252932]">
                Prefer to speak with someone now?
              </h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="bg-[#0A50EC] hover:bg-[#0840c4]">
                  <a href={MAIN_PHONE_HREF} className="flex items-center gap-2">
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    Call {MAIN_PHONE_DISPLAY}
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/insurance-policy" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    Review accepted plans
                  </Link>
                </Button>
              </div>
            </div>

            <p className="text-sm text-gray-500">
              Nothing on this page confirms or denies coverage under your specific
              plan. Benefits, deductibles and authorisation requirements vary by
              plan, and our team will confirm the details with you directly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
