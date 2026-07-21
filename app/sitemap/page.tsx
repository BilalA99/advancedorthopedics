import Link from 'next/link';
import type { Metadata } from 'next';
import { AllTreatmentsCombined } from '@/components/data/treatments';
import { conditions } from '@/components/data/conditions';
import { clinics } from '@/components/data/clinics';
import { getVisibleProviders } from '@/lib/providers/providerVisibility';
import { buildCanonical } from '@/lib/seo';
import { GetBlogsPublic } from '@/app/blogs/api/get-blogs';

export const metadata: Metadata = {
  title: 'Complete Website Sitemap | Mountain Spine & Orthopedics',
  description: 'Complete sitemap of Mountain Spine & Orthopedics website. Browse all 250+ pages including treatments, conditions, locations, doctors, and blog resources.',
  alternates: {
    canonical: buildCanonical('/sitemap'),
  },
  openGraph: {
    title: 'Complete Website Sitemap | Mountain Spine & Orthopedics',
    description: 'Complete sitemap of Mountain Spine & Orthopedics website. Browse all 250+ pages including treatments, conditions, locations, doctors, and blog resources.',
    url: buildCanonical('/sitemap'),
  },
  twitter: {
    card: 'summary',
    title: 'Complete Website Sitemap | Mountain Spine & Orthopedics',
    description: 'Complete sitemap of Mountain Spine & Orthopedics website. Browse all 250+ pages including treatments, conditions, locations, doctors, and blog resources.',
  },
};

// Helper function to convert URL slug to readable title
function slugToTitle(slug: string): string {
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

// Main navigation pages
const mainPages = [
  { url: '/', title: 'Home' },
  { url: '/about', title: 'About Us' },
  { url: '/about/faqs', title: 'Frequently Asked Questions' },
  { url: '/about/meetourdoctors', title: 'Meet Our Doctors' },
  { url: '/condition-check', title: 'Condition Checker Tool' },
  { url: '/privacy-policy', title: 'Privacy Policy' },
  { url: '/insurance-policy', title: 'Insurance & Payment Information' },
  { url: '/patient-forms', title: 'Patient Forms & Documents' },
];

// Find Care pages
const findCarePages = [
  { url: '/find-care/book-an-appointment', title: 'Book an Appointment' },
  { url: '/find-care/find-a-doctor', title: 'Find a Doctor' },
  { url: '/find-care/free-mri-review', title: 'Free MRI Review Service' },
  { url: '/find-care/candidacy-check', title: 'Treatment Candidacy Assessment' },
  { url: '/find-care/second-opinion', title: 'Get a Second Opinion' },
];

// Area of Pain pages - Back Pain
const backPainPages = [
  { url: '/area-of-pain/back-pain/lower-back-pain', title: 'Lower Back Pain' },
  { url: '/area-of-pain/back-pain/lumbar-degenerative-disc-disease', title: 'Lumbar Degenerative Disc Disease' },
  { url: '/area-of-pain/back-pain/lumbar-herniated-disc', title: 'Lumbar Herniated Disc' },
  { url: '/area-of-pain/back-pain/foraminal-stenosis-back-pain', title: 'Foraminal Stenosis (Back Pain)' },
  { url: '/area-of-pain/back-pain/sciatica-nerve-pain', title: 'Sciatica Nerve Pain' },
  { url: '/area-of-pain/back-pain/tailbone-pain-coccydynia', title: 'Tailbone Pain (Coccydynia)' },
  { url: '/area-of-pain/back-pain/back-pain-treatment-options', title: 'Back Pain Treatment Options' },
];

// Area of Pain pages - Neck & Shoulder
const neckPainPages = [
  { url: '/area-of-pain/neck-and-shoulder-pain/neck-spinal-stenosis', title: 'Neck Spinal Stenosis' },
  { url: '/area-of-pain/neck-and-shoulder-pain/neck-herniated-disc', title: 'Neck Herniated Disc' },
  { url: '/area-of-pain/neck-and-shoulder-pain/cervical-degenerative-disc-disease', title: 'Cervical Degenerative Disc Disease' },
  { url: '/area-of-pain/neck-and-shoulder-pain/neck-shoulder-arthritis-pain', title: 'Neck & Shoulder Arthritis Pain' },
  { url: '/area-of-pain/neck-and-shoulder-pain/pinched-nerve-neck-shoulder', title: 'Pinched Nerve in Neck or Shoulder' },
  { url: '/area-of-pain/neck-and-shoulder-pain/neck-and-shoulder-pain-treatment', title: 'Neck & Shoulder Pain Treatment' },
];

// Area of Pain pages - Foot Pain
const footPainPages = [
  { url: '/area-of-pain/foot-pain/bunion-pain-hallux-valgus', title: 'Bunion Pain (Hallux Valgus)' },
  { url: '/area-of-pain/foot-pain/heel-pain-plantar-fasciitis', title: 'Heel Pain (Plantar Fasciitis)' },
  { url: '/area-of-pain/foot-pain/flat-feet-pain', title: 'Flat Feet Pain' },
  { url: '/area-of-pain/foot-pain/ankle-arthroscopy-recovery-pain', title: 'Ankle Arthroscopy Recovery & Pain' },
  { url: '/area-of-pain/foot-pain/hammertoes-foot-pain', title: 'Hammertoes Foot Pain' },
  { url: '/area-of-pain/foot-pain/diabetic-foot-ulcer-care', title: 'Diabetic Foot Ulcer Care' },
  { url: '/area-of-pain/foot-pain/ankle-replacement-surgery-pain', title: 'Ankle Replacement Surgery Pain' },
  { url: '/area-of-pain/foot-pain/achilles-tendon-pain', title: 'Achilles Tendon Pain' },
];

// Injury pages
const injuryPages = [
  { url: '/injuries/car-accident', title: 'Car Accident Injuries & Treatment' },
  { url: '/injuries/slip-and-fall', title: 'Slip and Fall Injuries & Treatment' },
  { url: '/injuries/work-injury', title: 'Work Injury Orthopedic Care' },
  { url: '/injuries/personal-injury', title: 'Personal Injury Orthopedic Evaluation' },
];

// Blog category pages (for reference)
const blogCategoryPages = [
  { url: '/blogs', title: 'Health & Wellness Blog' },
  { url: '/blogs/tag/back-pain', title: 'Blog: Back Pain Articles' },
  { url: '/blogs/tag/neck-pain', title: 'Blog: Neck Pain Articles' },
  { url: '/blogs/tag/joint-care', title: 'Blog: Joint Care Articles' },
  { url: '/blogs/tag/spinal-surgery', title: 'Blog: Spinal Surgery Articles' },
  { url: '/blogs/tag/sports-injury', title: 'Blog: Sports Injury Articles' },
  { url: '/blogs/tag/recovery', title: 'Blog: Recovery Tips' },
  { url: '/blogs/tag/minimally-invasive', title: 'Blog: Minimally Invasive Surgery' },
  { url: '/blogs/tag/spine', title: 'Blog: Spine Health' },
  { url: '/blogs/tag/lower-spine', title: 'Blog: Lower Spine' },
  { url: '/blogs/tag/neck', title: 'Blog: Neck Health' },
  { url: '/blogs/tag/shoulder', title: 'Blog: Shoulder Health' },
  { url: '/blogs/tag/knee', title: 'Blog: Knee Health' },
  { url: '/blogs/tag/hand', title: 'Blog: Hand, Wrist & Elbow' },
  { url: '/blogs/tag/foot', title: 'Blog: Foot & Ankle' },
];

// Section component for better organization
function SitemapSection({ title, links, columns = 3 }: { 
  title: string; 
  links: Array<{ url: string; title: string }>;
  columns?: number;
}) {
  const gridClass = columns === 2 ? 'md:grid-cols-2' : columns === 3 ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-4';
  
  return (
    <section className="mb-16">
      <h2 
        style={{
          fontFamily: 'var(--font-public-sans)',
          fontWeight: 500,
        }}
        className="text-[#252932] text-3xl md:text-4xl mb-8 pb-4 border-b-2 border-[#0A50EC]"
      >
        {title}
      </h2>
      <ul className={`grid grid-cols-1 ${gridClass} gap-4`}>
        {links.map(link => (
          <li key={link.url}>
            <Link 
              href={link.url}
              style={{
                fontFamily: 'var(--font-inter)',
                fontWeight: 400,
              }}
              className="text-[#0A50EC] hover:underline text-base block py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function SitemapPage() {
  // Fetch all blog posts with error handling
  let allBlogs: any[] = [];
  try {
    const fetchedBlogs = await GetBlogsPublic();
    allBlogs = Array.isArray(fetchedBlogs) ? fetchedBlogs : [];
  } catch (error) {
    console.error('Error fetching blogs for sitemap page:', error);
    allBlogs = [];
  }
  
  // Prepare blog post links with safe access
  const blogPostLinks = allBlogs
    .filter(blog => blog?.slug && blog?.blog_info?.title)
    .map(blog => ({
      url: `/blogs/${blog.slug}`,
      title: blog.blog_info?.title || slugToTitle(blog.slug),
    }))
    .sort((a, b) => a.title.localeCompare(b.title));

  // Prepare location links
  const locationLinks = clinics.map(clinic => ({
    url: `/locations/${clinic.stateSlug}/${clinic.locationSlug}`,
    title: clinic.region.split(',')[0].trim() + ' Office',
  })).sort((a, b) => a.title.localeCompare(b.title));

  // Prepare doctor links
  const doctorLinks = getVisibleProviders().map(doctor => ({
    url: `/about/meetourdoctors/${doctor.slug}`,
    title: doctor.name,
  })).sort((a, b) => a.title.localeCompare(b.title));

  // Prepare condition links
  const conditionLinks = conditions
    .filter(c => c.slug && c.slug !== 'undefined')
    .map(condition => ({
      url: `/conditions/${condition.slug}`,
      title: condition.title || slugToTitle(condition.slug),
    }))
    .sort((a, b) => a.title.localeCompare(b.title));

  // Prepare treatment links
  const treatmentLinks = AllTreatmentsCombined
    .filter(t => t.slug && t.slug !== 'undefined')
    .map(treatment => ({
      url: `/treatments/${treatment.slug}`,
      title: treatment.title || slugToTitle(treatment.slug),
    }))
    .sort((a, b) => a.title.localeCompare(b.title));

  return (
    <main className='w-full flex flex-col items-center justify-center bg-white min-h-screen py-20'>
      <div className="max-w-[1440px] w-full px-6 xl:px-[100px]">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 
            style={{
              fontFamily: 'var(--font-public-sans)',
              fontWeight: 500,
            }}
            className="text-[#252932] text-4xl md:text-6xl mb-4"
          >
            Complete Website Sitemap
          </h1>
          <p 
            style={{
              fontFamily: 'var(--font-inter)',
              fontWeight: 400,
            }}
            className="text-[#424959] text-lg md:text-xl max-w-3xl mx-auto"
          >
            Navigate our complete website with over 250 pages of comprehensive orthopedic information, treatments, specialist profiles, and resources across Florida.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-16">
          <div className="bg-[#EDEEE9] rounded-2xl p-6 text-center">
            <div className="text-4xl font-bold text-[#0A50EC]" style={{ fontFamily: 'var(--font-public-sans)' }}>
              {treatmentLinks.length}
            </div>
            <div className="text-sm text-[#424959] mt-2" style={{ fontFamily: 'var(--font-inter)' }}>
              Treatments
            </div>
          </div>
          <div className="bg-[#EDEEE9] rounded-2xl p-6 text-center">
            <div className="text-4xl font-bold text-[#0A50EC]" style={{ fontFamily: 'var(--font-public-sans)' }}>
              {conditionLinks.length}
            </div>
            <div className="text-sm text-[#424959] mt-2" style={{ fontFamily: 'var(--font-inter)' }}>
              Conditions
            </div>
          </div>
          <div className="bg-[#EDEEE9] rounded-2xl p-6 text-center">
            <div className="text-4xl font-bold text-[#0A50EC]" style={{ fontFamily: 'var(--font-public-sans)' }}>
              {locationLinks.length}
            </div>
            <div className="text-sm text-[#424959] mt-2" style={{ fontFamily: 'var(--font-inter)' }}>
              Locations
            </div>
          </div>
          <div className="bg-[#EDEEE9] rounded-2xl p-6 text-center">
            <div className="text-4xl font-bold text-[#0A50EC]" style={{ fontFamily: 'var(--font-public-sans)' }}>
              {doctorLinks.length}
            </div>
            <div className="text-sm text-[#424959] mt-2" style={{ fontFamily: 'var(--font-inter)' }}>
              Specialists
            </div>
          </div>
          <div className="bg-[#EDEEE9] rounded-2xl p-6 text-center">
            <div className="text-4xl font-bold text-[#0A50EC]" style={{ fontFamily: 'var(--font-public-sans)' }}>
              {blogPostLinks.length}
            </div>
            <div className="text-sm text-[#424959] mt-2" style={{ fontFamily: 'var(--font-inter)' }}>
              Blog Posts
            </div>
          </div>
        </div>

        {/* All Sections */}
        <SitemapSection title="Main Pages" links={mainPages} columns={3} />
        
        <SitemapSection title="Find Care & Patient Resources" links={findCarePages} columns={2} />
        
        <SitemapSection title="Our Locations" links={locationLinks} columns={3} />
        
        <SitemapSection title="Meet Our Specialists" links={doctorLinks} columns={2} />
        
        <SitemapSection 
          title={`All Treatments (${treatmentLinks.length})`} 
          links={treatmentLinks} 
          columns={3} 
        />
        
        <SitemapSection 
          title={`Conditions We Treat (${conditionLinks.length})`} 
          links={conditionLinks} 
          columns={3} 
        />
        
        <SitemapSection title="Back Pain Resources" links={backPainPages} columns={2} />
        
        <SitemapSection title="Neck & Shoulder Pain Resources" links={neckPainPages} columns={2} />
        
        <SitemapSection title="Foot & Ankle Pain Resources" links={footPainPages} columns={2} />
        
        <SitemapSection title="Injury Treatment" links={injuryPages} columns={2} />
        
        <SitemapSection title="Blog Categories" links={blogCategoryPages} columns={3} />
        
        <SitemapSection 
          title={`All Blog Posts (${blogPostLinks.length})`} 
          links={blogPostLinks} 
          columns={3} 
        />

        {/* Footer CTA */}
        <div className="mt-20 text-center bg-[#EDEEE9] rounded-3xl p-12">
          <h2 
            style={{
              fontFamily: 'var(--font-public-sans)',
              fontWeight: 500,
            }}
            className="text-[#252932] text-2xl md:text-3xl mb-4"
          >
            Ready to Start Your Journey to Recovery?
          </h2>
          <p 
            style={{
              fontFamily: 'var(--font-inter)',
              fontWeight: 400,
            }}
            className="text-[#424959] text-lg mb-8 max-w-2xl mx-auto"
          >
            Our board-certified specialists are here to help you find the right treatment for your orthopedic needs. Contact us today to schedule your consultation.
          </p>
          <Link
            href="/find-care/book-an-appointment"
            className="inline-block bg-[#0A50EC] text-white px-8 py-4 rounded-full font-medium hover:bg-[#0845c9] transition-colors"
            style={{
              fontFamily: 'var(--font-public-sans)',
              fontWeight: 500,
            }}
          >
            Book Your Appointment
          </Link>
        </div>
      </div>
    </main>
  );
}
