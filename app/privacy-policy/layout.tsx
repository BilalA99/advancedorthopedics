import type { Metadata } from "next";
import { buildCanonical, safeTitle, safeDescription } from "@/lib/seo";

export const metadata: Metadata = {
  title: safeTitle(undefined, "Privacy Policy | Mountain Spine & Orthopedics"),
  description: safeDescription(undefined, "Mountain Spine & Orthopedics privacy policy. Learn how we protect your personal information and medical data in accordance with HIPAA regulations."),
  robots: { index: true, follow: true },
  alternates: {
    canonical: buildCanonical("/privacy-policy"),
  },
  openGraph: {
    title: safeTitle(undefined, "Privacy Policy | Mountain Spine & Orthopedics"),
    description: safeDescription(undefined, "Mountain Spine & Orthopedics privacy policy. Learn how we protect your personal information and medical data in accordance with HIPAA regulations."),
    url: buildCanonical("/privacy-policy"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: safeTitle(undefined, "Privacy Policy | Mountain Spine & Orthopedics"),
    description: safeDescription(undefined, "Mountain Spine & Orthopedics privacy policy. Learn how we protect your personal information and medical data in accordance with HIPAA regulations."),
  },
};

export default function PrivacyPolicyLayout({
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
