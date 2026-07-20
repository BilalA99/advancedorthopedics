import type { Metadata } from "next";
import { buildCanonical, safeTitle, safeDescription, srOnly } from "@/lib/seo";
import { carAccidentFaqs } from "./faqs";
import {
  buildInjuryMedicalWebPageSchema,
  buildInjuryClinicItemListSchema,
  buildInjuryFAQPageSchema,
} from "@/lib/injuryPageSchema";

const PAGE_URL = "https://mountainspineorthopedics.com/injuries/car-accident";

export const metadata: Metadata = {
  title: safeTitle(
    undefined,
    "Car Accident Orthopedic Doctor Near Me | FL, NJ, NY & PA | Mountain Spine & Orthopedics"
  ),
  description: safeDescription(
    undefined,
    "Board-certified car accident orthopedic doctors in FL, NJ, NY & PA. Same-day eval, PIP/no-fault/lien accepted. Call (561) 223-9959 — don't miss FL's 14-day window."
  ),
  keywords: [
    "car accident orthopedic doctor near me",
    "car accident doctor FL NJ NY PA",
    "auto accident orthopedic specialist",
    "car crash injury treatment",
    "whiplash doctor near me",
    "herniated disc car accident",
    "PIP doctor Florida",
    "no-fault orthopedic NJ",
    "no-fault doctor NY",
    "car accident spine specialist",
    "motor vehicle accident orthopedic care",
    "personal injury orthopedic clinic",
    "car accident back pain doctor",
    "auto injury lien doctor",
    "car accident neck injury specialist",
    "whiplash treatment Florida",
    "car accident injury same day appointment",
    "accident injury orthopedic surgeon",
    "lumbar herniated disc car accident",
    "rotator cuff car accident",
    "cervical disc injury auto accident",
    "Florida PIP orthopedic",
    "NJ no-fault injury doctor",
    "NY no-fault orthopedic",
    "PA tort injury specialist",
    "car accident workers comp",
    "auto accident medical lien",
    "car accident MRI evaluation",
  ],
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  alternates: {
    canonical: buildCanonical("/injuries/car-accident"),
  },
  openGraph: {
    title: safeTitle(
      undefined,
      "Car Accident Orthopedic Doctor Near Me | FL, NJ, NY & PA | Mountain Spine & Orthopedics"
    ),
    description: safeDescription(
      undefined,
      "Board-certified car accident orthopedic doctors in FL, NJ, NY & PA. Same-day eval, PIP/no-fault/lien accepted. Call (561) 223-9959."
    ),
    url: buildCanonical("/injuries/car-accident"),
    type: "article",
    images: [
      {
        url: "/og-car-accident-treatment.jpg",
        width: 1200,
        height: 630,
        alt: "Doctor providing car accident spine care at Mountain Spine & Orthopedics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: safeTitle(
      undefined,
      "Car Accident Orthopedic Doctor Near Me | FL, NJ, NY & PA | Mountain Spine & Orthopedics"
    ),
    description: safeDescription(
      undefined,
      "Board-certified car accident orthopedic doctors in FL, NJ, NY & PA. PIP/no-fault/lien accepted. Same-day appointments. Call (561) 223-9959."
    ),
    images: ["/og-car-accident-treatment.jpg"],
  },
};

export default function CarAccidentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <h2 className={srOnly}>Expert Car Accident Orthopedic Care</h2>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildInjuryMedicalWebPageSchema({
              url: PAGE_URL,
              headline:
                "Car Accident Orthopedic Doctor Near Me — FL, NJ, NY & PA",
              description:
                "Board-certified orthopedic and spine specialists treating car accident injuries in Florida, New Jersey, New York, and Pennsylvania. Same-day evaluation, PIP/no-fault/lien billing accepted, 22+ locations open 8 AM–8 PM, 7 days.",
              injuryName: "Car Accident Orthopedic Injuries",
              alternateNames: [
                "Auto Accident Injuries",
                "Motor Vehicle Accident Injuries",
                "MVA Orthopedic Injuries",
              ],
              anatomy: [
                "Cervical Spine",
                "Lumbar Spine",
                "Shoulder",
                "Knee",
                "Wrist",
                "Hip",
              ],
              treatments: [
                "Orthopedic Evaluation",
                "MRI and Diagnostic Imaging",
                "Cervical Injections",
                "Lumbar Injections",
                "Outside Rehabilitation Guidance",
                "Minimally Invasive Spine Surgery",
                "Fracture Management",
              ],
              symptoms: [
                "Neck Pain",
                "Back Pain",
                "Whiplash",
                "Herniated Disc",
                "Radiculopathy",
                "Shoulder Pain",
                "Knee Pain",
                "Wrist Fracture",
              ],
              breadcrumbLabel: "Car Accident",
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
              availableService: "Car Accident Orthopedic Care",
            })
          ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildInjuryFAQPageSchema(carAccidentFaqs, PAGE_URL)
          ),
        }}
      />

      {children}
    </>
  );
}
