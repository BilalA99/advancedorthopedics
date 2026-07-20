import type { Metadata } from "next";
import { buildCanonical, safeTitle, safeDescription, srOnly } from "@/lib/seo";
import { slipFallFaqs } from "./faqs";
import {
  buildInjuryMedicalWebPageSchema,
  buildInjuryClinicItemListSchema,
  buildInjuryFAQPageSchema,
} from "@/lib/injuryPageSchema";

const PAGE_URL = "https://mountainspineorthopedics.com/injuries/slip-and-fall";

export const metadata: Metadata = {
  title: safeTitle(
    undefined,
    "Slip and Fall Orthopedic Doctor Near Me | FL, NJ, NY & PA | Mountain Spine & Orthopedics"
  ),
  description: safeDescription(
    undefined,
    "Board-certified slip and fall orthopedic doctors in FL, NJ, NY & PA. Fractures, spine & hip injuries treated same-week. Lien & liability insurance accepted. (561) 223-9959."
  ),
  keywords: [
    "slip and fall doctor near me",
    "slip and fall orthopedic specialist",
    "fall injury treatment FL NJ NY PA",
    "slip fall fracture doctor",
    "hip fracture slip and fall",
    "FOOSH injury treatment",
    "premises liability orthopedic doctor",
    "slip and fall spine injury",
    "fall accident orthopedic care",
    "slip fall wrist fracture",
    "fall injury same day appointment",
    "slip and fall medical lien",
    "premises liability injury care",
    "slip fall back pain doctor",
    "fall injury lien doctor",
    "New York slip and fall orthopedic",
    "Florida premises liability doctor",
    "NJ slip and fall specialist",
    "PA fall injury orthopedic",
    "workers comp slip and fall",
    "slip and fall herniated disc",
    "fall injury hip fracture treatment",
    "slip fall ankle fracture",
    "personal injury fracture care",
    "fall accident medical documentation",
  ],
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  alternates: {
    canonical: buildCanonical("/injuries/slip-and-fall"),
  },
  openGraph: {
    title: safeTitle(
      undefined,
      "Slip and Fall Orthopedic Doctor Near Me | FL, NJ, NY & PA | Mountain Spine & Orthopedics"
    ),
    description: safeDescription(
      undefined,
      "Board-certified slip and fall orthopedic doctors in FL, NJ, NY & PA. Fractures, spine & hip injuries treated same-week. Lien accepted. (561) 223-9959."
    ),
    url: buildCanonical("/injuries/slip-and-fall"),
    type: "article",
    images: [
      {
        url: "/og-slip-fall-treatment.jpg",
        width: 1200,
        height: 630,
        alt: "Orthopedic doctor treating slip and fall fracture injury at Mountain Spine & Orthopedics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: safeTitle(
      undefined,
      "Slip and Fall Orthopedic Doctor Near Me | FL, NJ, NY & PA | Mountain Spine & Orthopedics"
    ),
    description: safeDescription(
      undefined,
      "Board-certified slip and fall orthopedic doctors in FL, NJ, NY & PA. Fractures, spine & hip injuries treated same-week. Lien accepted."
    ),
    images: ["/og-slip-fall-treatment.jpg"],
  },
};

export default function SlipAndFallLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <h2 className={srOnly}>Expert Slip and Fall Orthopedic Treatment</h2>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildInjuryMedicalWebPageSchema({
              url: PAGE_URL,
              headline:
                "Slip and Fall Orthopedic Doctor Near Me — FL, NJ, NY & PA",
              description:
                "Board-certified orthopedic and spine specialists treating slip and fall injuries in Florida, New Jersey, New York, and Pennsylvania. Fractures, hip injuries, FOOSH, and spinal trauma treated same-week. Premises liability lien billing accepted. 22+ locations open 8 AM–8 PM, 7 days.",
              injuryName: "Slip and Fall Orthopedic Injuries",
              alternateNames: [
                "Fall Accident Injuries",
                "Premises Liability Injuries",
                "Trip and Fall Injuries",
              ],
              anatomy: [
                "Hip",
                "Wrist",
                "Cervical Spine",
                "Lumbar Spine",
                "Shoulder",
                "Ankle",
                "Knee",
              ],
              treatments: [
                "Fracture Management",
                "Hip Fracture Evaluation",
                "Orthopedic Evaluation",
                "MRI and Diagnostic Imaging",
                "Lumbar and Cervical Injections",
                "Surgical Consultation",
                "Outside Rehabilitation Guidance",
              ],
              symptoms: [
                "Hip Pain",
                "Wrist Pain",
                "Neck Pain",
                "Back Pain",
                "Ankle Swelling",
                "FOOSH Wrist Fracture",
                "Herniated Disc",
                "Knee Pain",
              ],
              breadcrumbLabel: "Slip and Fall",
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
              availableService: "Slip and Fall Orthopedic Care",
            })
          ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildInjuryFAQPageSchema(slipFallFaqs, PAGE_URL)
          ),
        }}
      />

      {children}
    </>
  );
}
