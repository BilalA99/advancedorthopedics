import { Metadata, ResolvingMetadata } from "next";
import { getVisibleProviderBySlug } from "@/lib/providers/providerVisibility";
import PhysicianSchema from "@/components/PhysicianSchema";
import { buildCanonical, normalizeUTF8 } from "@/lib/seo";
import { getOgImageForPath } from "@/lib/og";

export async function generateMetadata(
  { params }: { params: Promise<{ Doctor_Name: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { Doctor_Name } = await params;
  const doctor = getVisibleProviderBySlug(Doctor_Name);

  if (!doctor) {
    return {
      title: "Doctor Not Found",
    };
  }

  const title = normalizeUTF8(doctor.metaTitle || `${doctor.name} | ${doctor.practice} | Mountain Spine & Orthopedics`);
  const description = normalizeUTF8(doctor.metaDescription || doctor.short_bio || doctor.desc);
  const canonical = buildCanonical(`/about/meetourdoctors/${doctor.slug}`);

  return {
    title,
    description,
    keywords: doctor.keywords,
    robots: { index: true, follow: true },
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "profile",
      images: [
        {
          url: doctor.img.src || getOgImageForPath("/about/meetourdoctors"),
          width: 1200,
          height: 630,
          alt: doctor.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [doctor.img.src || getOgImageForPath("/about/meetourdoctors")],
    },
  };
}

export default async function DoctorLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ Doctor_Name: string }>;
}) {
  const { Doctor_Name } = await params;
  const doctor = getVisibleProviderBySlug(Doctor_Name);

  return (
    <>
      {doctor && <PhysicianSchema doctors={[doctor]} />}
      {children}
    </>
  );
}
