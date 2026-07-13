import type { Metadata } from "next";
import { buildCanonical, safeTitle, safeDescription, srOnly } from "@/lib/seo";
import { personalInjuryFaqs } from "./faqs";
import {
  buildInjuryMedicalWebPageSchema,
  buildInjuryClinicItemListSchema,
  buildInjuryFAQPageSchema,
} from "@/lib/injuryPageSchema";

const PAGE_URL = "https://mountainspineorthopedics.com/injuries/personal-injury";

export const metadata: Metadata = {
  title: safeTitle(
    undefined,
    "Personal Injury Orthopedic Doctor Near Me | FL, NJ, NY & PA | Mountain Spine & Orthopedics"
  ),
  description: safeDescription(
    undefined,
    "Board-certified personal injury orthopedic doctors in FL, NJ, NY & PA. Lien accepted, same-week eval, expert witness records. Call (561) 223-9959 — no insurance needed."
  ),
  keywords: [
    "personal injury orthopedic doctor near me",
    "personal injury spine doctor FL NJ NY PA",
    "accident injury orthopedic specialist",
    "personal injury medical lien doctor",
    "lien-based orthopedic care",
    "personal injury no upfront cost",
    "car accident personal injury doctor",
    "slip and fall personal injury specialist",
    "personal injury herniated disc",
    "personal injury expert witness orthopedic",
    "accident injury same day appointment",
    "pedestrian accident orthopedic doctor",
    "bicycle accident injury doctor",
    "personal injury spine injury FL",
    "personal injury orthopedic NJ",
    "NY personal injury orthopedic",
    "PA personal injury spine doctor",
    "personal injury no-fault doctor NY",
    "personal injury PIP Florida",
    "personal injury attorney referral orthopedic",
    "IME independent medical exam",
    "accident injury medical documentation",
    "personal injury fracture treatment",
    "personal injury shoulder knee injury",
    "personal injury settlement medical records",
  ],
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  alternates: {
    canonical: buildCanonical("/injuries/personal-injury"),
  },
  openGraph: {
    title: safeTitle(
      undefined,
      "Personal Injury Orthopedic Doctor Near Me | FL, NJ, NY & PA | Mountain Spine & Orthopedics"
    ),
    description: safeDescription(
      undefined,
      "Board-certified personal injury orthopedic doctors in FL, NJ, NY & PA. Lien accepted, same-week eval, expert records. Call (561) 223-9959."
    ),
    url: buildCanonical("/injuries/personal-injury"),
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: safeTitle(
      undefined,
      "Personal Injury Orthopedic Doctor Near Me | FL, NJ, NY & PA | Mountain Spine & Orthopedics"
    ),
    description: safeDescription(
      undefined,
      "Board-certified personal injury orthopedic doctors in FL, NJ, NY & PA. Lien accepted, same-week eval, expert records."
    ),
  },
};

export default function PersonalInjuryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <h2 className={srOnly}>Personal Injury Orthopedic Care</h2>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildInjuryMedicalWebPageSchema({
              url: PAGE_URL,
              headline:
                "Personal Injury Orthopedic Doctor Near Me — FL, NJ, NY & PA",
              description:
                "Board-certified orthopedic and spine specialists treating personal injuries from car accidents, slip and falls, pedestrian knockdowns, and other trauma in Florida, New Jersey, New York, and Pennsylvania. Medical lien accepted, same-week evaluation, expert witness reports. 22+ locations open 8 AM–8 PM, 7 days.",
              injuryName: "Personal Injury-Related Orthopedic Conditions",
              alternateNames: [
                "Accident-Related Orthopedic Injuries",
                "Traumatic Orthopedic Injuries",
                "PI Orthopedic Injuries",
              ],
              anatomy: [
                "Cervical Spine",
                "Lumbar Spine",
                "Shoulder",
                "Hip",
                "Knee",
                "Wrist",
                "Ankle",
              ],
              treatments: [
                "Orthopedic Evaluation",
                "MRI and Diagnostic Imaging",
                "Medical Lien Treatment",
                "Cervical and Lumbar Injections",
                "Fracture Management",
                "Expert Witness Report",
                "Outside Rehabilitation Guidance",
                "Minimally Invasive Surgery",
              ],
              symptoms: [
                "Neck Pain",
                "Back Pain",
                "Herniated Disc",
                "Radiculopathy",
                "Hip Fracture",
                "Wrist Fracture",
                "Shoulder Pain",
                "Knee Pain",
              ],
              breadcrumbLabel: "Personal Injury",
            })
          ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildInjuryClinicItemListSchema({
              injuryPageUrl: PAGE_URL,
              availableService: "Personal Injury Orthopedic Care",
            })
          ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildInjuryFAQPageSchema(personalInjuryFaqs, PAGE_URL)
          ),
        }}
      />

      {children}
    </>
  );
}
