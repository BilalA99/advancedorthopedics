import type { Metadata } from "next";
import { buildCanonical, safeTitle, safeDescription } from "@/lib/seo";

export const metadata: Metadata = {
  title: safeTitle(undefined, "Book an Appointment | Mountain Spine & Orthopedics"),
  description: safeDescription(undefined, "Schedule your orthopedic consultation with Mountain Spine & Orthopedics. Book online or call us for same-day appointments across our locations in Florida, New Jersey, New York, Pennsylvania, and Georgia."),
  robots: { index: true, follow: true },
  alternates: {
    canonical: buildCanonical("/find-care/book-an-appointment"),
  },
  openGraph: {
    title: safeTitle(undefined, "Book an Appointment | Mountain Spine & Orthopedics"),
    description: safeDescription(undefined, "Schedule your orthopedic consultation with Mountain Spine & Orthopedics. Book online or call us for same-day appointments across our locations in Florida, New Jersey, New York, Pennsylvania, and Georgia."),
    url: buildCanonical("/find-care/book-an-appointment"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: safeTitle(undefined, "Book an Appointment | Mountain Spine & Orthopedics"),
    description: safeDescription(undefined, "Schedule your orthopedic consultation with Mountain Spine & Orthopedics. Book online or call us for same-day appointments across our locations in Florida, New Jersey, New York, Pennsylvania, and Georgia."),
  },
};

export default function BookAppointmentLayout({
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
