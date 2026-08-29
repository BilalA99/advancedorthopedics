import type { Metadata } from "next";
import { buildCanonical, safeTitle, safeDescription } from "@/lib/seo";

export const metadata: Metadata = {
  title: safeTitle(undefined, "Candidacy Check | Mountain Spine & Orthopedics"),
  description: safeDescription(undefined, "Take our candidacy check to see if you're a candidate for orthopedic surgery or spine procedures at Mountain Spine & Orthopedics."),
  robots: { index: true, follow: true },
  alternates: {
    canonical: buildCanonical("/find-care/candidacy-check"),
  },
  openGraph: {
    title: safeTitle(undefined, "Candidacy Check | Mountain Spine & Orthopedics"),
    description: safeDescription(undefined, "Take our candidacy check to see if you're a candidate for orthopedic surgery or spine procedures at Mountain Spine & Orthopedics."),
    url: buildCanonical("/find-care/candidacy-check"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: safeTitle(undefined, "Candidacy Check | Mountain Spine & Orthopedics"),
    description: safeDescription(undefined, "Take our candidacy check to see if you're a candidate for orthopedic surgery or spine procedures at Mountain Spine & Orthopedics."),
  },
};

export default function CandidacyCheckLayout({
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
