import type { Metadata } from "next";
import { buildCanonical, safeTitle, safeDescription, srOnly } from "@/lib/seo";
import { workInjuryFaqs } from "./faqs";
import {
  buildInjuryMedicalWebPageSchema,
  buildInjuryClinicItemListSchema,
  buildInjuryFAQPageSchema,
} from "@/lib/injuryPageSchema";

const PAGE_URL = "https://mountainspineorthopedics.com/injuries/work-injury";

export const metadata: Metadata = {
  title: safeTitle(
    undefined,
    "Work Injury Orthopedic Doctor Near Me | FL, NJ, NY, PA & GA | Mountain Spine & Orthopedics"
  ),
  description: safeDescription(
    undefined,
    "Board-certified work injury orthopedic doctors in FL, NJ, NY, PA & GA. Workers' comp coordinated, ATP provider, same-week eval. Call (561) 223-9959 — WC accepted."
  ),
  keywords: [
    "work injury doctor near me",
    "workers compensation orthopedic doctor",
    "work injury orthopedic specialist",
    "workers comp spine doctor",
    "occupational injury orthopedic",
    "on-the-job injury treatment",
    "work injury back pain doctor",
    "ATP authorized treating physician Florida",
    "workers comp NJ doctor",
    "NY WCB orthopedic provider",
    "PA panel physician orthopedic",
    "work injury shoulder treatment",
    "workers comp knee specialist",
    "repetitive stress injury doctor",
    "FCE functional capacity evaluation",
    "IME independent medical exam",
    "Scaffold Law NY construction injury",
    "work injury same day appointment",
    "construction injury orthopedic",
    "warehouse work injury doctor",
    "workers comp fracture treatment",
    "occupational lumbar injury",
    "carpal tunnel workers comp",
    "rotator cuff work injury",
    "work-related injury documentation",
  ],
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  alternates: {
    canonical: buildCanonical("/injuries/work-injury"),
  },
  openGraph: {
    title: safeTitle(
      undefined,
      "Work Injury Orthopedic Doctor Near Me | FL, NJ, NY, PA & GA | Mountain Spine & Orthopedics"
    ),
    description: safeDescription(
      undefined,
      "Board-certified work injury orthopedic doctors in FL, NJ, NY, PA & GA. Workers' comp coordinated. Same-week eval. Call (561) 223-9959."
    ),
    url: buildCanonical("/injuries/work-injury"),
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: safeTitle(
      undefined,
      "Work Injury Orthopedic Doctor Near Me | FL, NJ, NY, PA & GA | Mountain Spine & Orthopedics"
    ),
    description: safeDescription(
      undefined,
      "Board-certified work injury orthopedic doctors in FL, NJ, NY, PA & GA. Workers' comp coordinated. Same-week eval."
    ),
  },
};

export default function WorkInjuryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <h2 className={srOnly}>Work Injury Orthopedic Care</h2>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildInjuryMedicalWebPageSchema({
              url: PAGE_URL,
              headline:
                "Work Injury Orthopedic Doctor Near Me — FL, NJ, NY, PA & GA",
              description:
                "Board-certified orthopedic and spine specialists treating work-related injuries in Florida, New Jersey, New York, Pennsylvania, and Georgia. Workers' compensation coordination, ATP provider, FCE referrals, same-week evaluation. 22+ locations open 8 AM–8 PM, 7 days.",
              injuryName: "Work-Related Orthopedic Injuries",
              alternateNames: [
                "Workplace Injury",
                "Occupational Injury",
                "Workers Compensation Injury",
              ],
              anatomy: [
                "Lumbar Spine",
                "Shoulder",
                "Knee",
                "Cervical Spine",
                "Wrist",
                "Hip",
                "Elbow",
              ],
              treatments: [
                "Workers Compensation Evaluation",
                "Orthopedic Evaluation",
                "MRI and Diagnostic Imaging",
                "Functional Capacity Evaluation",
                "Work Status Documentation",
                "Lumbar Injections",
                "Shoulder Injections",
                "Minimally Invasive Surgery",
              ],
              symptoms: [
                "Back Pain",
                "Shoulder Pain",
                "Knee Pain",
                "Repetitive Stress Injury",
                "Carpal Tunnel",
                "Rotator Cuff Tear",
                "Lumbar Strain",
                "Fracture",
              ],
              breadcrumbLabel: "Work Injury",
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
              availableService: "Work Injury Orthopedic Care",
            })
          ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildInjuryFAQPageSchema(workInjuryFaqs, PAGE_URL)
          ),
        }}
      />

      {children}
    </>
  );
}
