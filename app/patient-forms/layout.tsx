import type { Metadata } from "next";
import { buildCanonical, safeTitle, safeDescription } from "@/lib/seo";

export const metadata: Metadata = {
  title: safeTitle(undefined, "Patient Forms | Mountain Spine & Orthopedics"),
  description: safeDescription(undefined, "Download patient forms and medical questionnaires for your appointment at Mountain Spine & Orthopedics. Complete forms online for faster check-in."),
  robots: { index: true, follow: true },
  alternates: {
    canonical: buildCanonical("/patient-forms"),
  },
  openGraph: {
    title: safeTitle(undefined, "Patient Forms | Mountain Spine & Orthopedics"),
    description: safeDescription(undefined, "Download patient forms and medical questionnaires for your appointment at Mountain Spine & Orthopedics. Complete forms online for faster check-in."),
    url: buildCanonical("/patient-forms"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: safeTitle(undefined, "Patient Forms | Mountain Spine & Orthopedics"),
    description: safeDescription(undefined, "Download patient forms and medical questionnaires for your appointment at Mountain Spine & Orthopedics. Complete forms online for faster check-in."),
  },
};

export default function PatientFormsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}
