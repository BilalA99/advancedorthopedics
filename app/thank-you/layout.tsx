import type { Metadata } from "next";
import { buildCanonical, safeTitle, safeDescription } from "@/lib/seo";

export const metadata: Metadata = {
  title: safeTitle(undefined, "Thank You | Mountain Spine & Orthopedics"),
  description: safeDescription(undefined, "Thank you for contacting Mountain Spine & Orthopedics. We'll get back to you soon to schedule your consultation."),
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: buildCanonical("/thank-you"),
  },
  openGraph: {
    title: safeTitle(undefined, "Thank You | Mountain Spine & Orthopedics"),
    description: safeDescription(undefined, "Thank you for contacting Mountain Spine & Orthopedics. We'll get back to you soon to schedule your consultation."),
    url: buildCanonical("/thank-you"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: safeTitle(undefined, "Thank You | Mountain Spine & Orthopedics"),
    description: safeDescription(undefined, "Thank you for contacting Mountain Spine & Orthopedics. We'll get back to you soon to schedule your consultation."),
  },
};

export default function ThankYouLayout({
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
