import Image from 'next/image';
import FAQsDocotorTestimony from '@/public/FAQsDoctorTestimony.png';
import type { Metadata } from 'next';
import FaqsSection from '@/components/FaqsSection';
import { buildCanonical } from '@/lib/seo';
import { ReactElement } from 'react';
import Link from 'next/link';

// Helper function to extract plain text from React elements for schema
function extractTextFromReactElement(element: ReactElement | string): string {
  if (typeof element === 'string') {
    return element;
  }
  
  if (!element || !element.props) {
    return '';
  }
  
  const { children } = element.props;
  
  if (!children) {
    return '';
  }
  
  if (typeof children === 'string') {
    return children;
  }
  
  if (Array.isArray(children)) {
    return children.map(child => extractTextFromReactElement(child)).join(' ');
  }
  
  return extractTextFromReactElement(children);
}

// SEO-optimized FAQ data organized by sections
const faqSections = [
  {
    category: 'Orthopedic Basics & Education',
    items: [
      {
        question: 'What is orthopedic surgery?',
        answer: (
          <p>
            Orthopedic surgery focuses on diagnosing and treating conditions affecting bones, joints, muscles, ligaments, and tendons. At <Link href="/about" className="text-blue-600 hover:underline">Mountain Spine & Orthopedics</Link>, our specialists across FL, NJ, NY, and PA use both surgical and non-surgical methods to relieve pain and restore movement.
          </p>
        ),
      },
      {
        question: 'What is arthroplasty?',
        answer: (
          <p>
            Arthroplasty is the reconstruction or replacement of a damaged joint — often the hip, knee, or shoulder — to restore mobility and reduce pain.
          </p>
        ),
      },
      {
        question: 'What is arthroscopic surgery?',
        answer: (
          <p>
            Arthroscopic surgery is a minimally invasive procedure using small incisions and a tiny camera to diagnose and treat joint problems. It allows for faster recovery and minimal scarring.
          </p>
        ),
      },
      {
        question: 'What is revision surgery?',
        answer: (
          <p>
            Revision surgery corrects or replaces a previous joint implant that has worn out or failed. It restores proper alignment and mobility.
          </p>
        ),
      },
      {
        question: 'What is minimally invasive spine surgery?',
        answer: (
          <p>
            Minimally invasive spine surgery uses advanced tools and smaller incisions to treat spinal conditions while preserving surrounding muscle tissue — resulting in less pain and a shorter recovery period. Learn more about our <Link href="/treatments/endoscopic-discectomy-surgery" className="text-blue-600 hover:underline">minimally invasive procedures</Link>.
          </p>
        ),
      },
    ],
  },
  {
    category: 'Before Your Appointment or Surgery',
    items: [
      {
        question: 'What questions should I ask my orthopedic surgeon before surgery?',
        answer: (
          <p>
            Ask about your diagnosis, treatment options, recovery time, potential risks, and whether minimally invasive techniques are available. Our <Link href="/about/meetourdoctors" className="text-blue-600 hover:underline">orthopedic surgeons</Link> ensure you're informed before any procedure.
          </p>
        ),
      },
      {
        question: 'What should I bring to my orthopedic appointment?',
        answer: (
          <p>
            Bring your insurance card, photo ID, recent X-rays or MRI results, a list of medications, and any prior medical records. If under 18, a parent or guardian must be present. You can also submit your records through our <Link href="/find-care/free-mri-review" className="text-blue-600 hover:underline">Free MRI Review tool</Link>.
          </p>
        ),
      },
      {
        question: 'Do I need a referral to see an orthopedic specialist?',
        answer: (
          <p>
            Most insurance plans don't require referrals, but it depends on your policy. Check with your provider or call our office for guidance. Review our <Link href="/insurance-policy" className="text-blue-600 hover:underline">insurance policy page</Link> for more details.
          </p>
        ),
      },
      {
        question: 'When should I see an orthopedic doctor?',
        answer: (
          <p>
            Schedule an appointment if you experience chronic back pain, joint stiffness, or limited range of motion. Early evaluation helps prevent further damage. Try our <Link href="/condition-check" className="text-blue-600 hover:underline">Condition Checker</Link> to assess your symptoms.
          </p>
        ),
      },
      {
        question: 'How do I schedule an appointment at Mountain Spine & Orthopedics?',
        answer: (
          <p>
            You can <Link href="/find-care/book-an-appointment" className="text-blue-600 hover:underline">book online 24/7</Link> or call any of our <Link href="/locations" className="text-blue-600 hover:underline">offices</Link> directly. Same-day and next-day appointments are often available for urgent orthopedic care.
          </p>
        ),
      },
    ],
  },
  {
    category: 'Treatment, Pain & Recovery',
    items: [
      {
        question: 'How long does recovery take after orthopedic surgery?',
        answer: (
          <p>
            Recovery time depends on your condition and procedure. Many patients resume light activities within 6–12 weeks, with full recovery taking several months. Your surgeon will provide a personalized recovery timeline based on your specific treatment.
          </p>
        ),
      },
      {
        question: 'What kind of pain should I expect after orthopedic surgery?',
        answer: (
          <p>
            Mild to moderate soreness and swelling are normal. Our surgeons use advanced pain-management plans to keep you comfortable throughout recovery. We offer comprehensive <Link href="/treatments/non-surgical-treatments-for-pain-management" className="text-blue-600 hover:underline">pain management treatments</Link>.
          </p>
        ),
      },
      {
        question: 'When can I return to work or daily activities?',
        answer: (
          <p>
            Most patients return to normal routines within a few weeks, depending on the type of surgery. Your doctor will provide a personalized timeline based on your occupation and procedure.
          </p>
        ),
      },
      {
        question: 'Will I need rehabilitation after surgery?',
        answer: (
          <p>
            Often, rehabilitation is part of recovery. Your orthopedic surgeon may recommend exercises and activities to help restore strength, flexibility, and range of motion. Your provider will discuss the appropriate recovery plan for your specific procedure.
          </p>
        ),
      },
      {
        question: 'How long do artificial joints last?',
        answer: (
          <p>
            Modern joint replacements can last 15–20 years or longer, depending on your activity level and overall health. Proper care and regular follow-ups help maximize implant longevity.
          </p>
        ),
      },
    ],
  },
  {
    category: 'Conditions & Non-Surgical Options',
    items: [
      {
        question: 'What conditions do orthopedic surgeons treat?',
        answer: (
          <p>
            We treat back pain, <Link href="/conditions" className="text-blue-600 hover:underline">spine disorders</Link>, arthritis, sports injuries, joint pain, fractures, and more — for both surgical and non-surgical cases across our locations in FL, NJ, NY, and PA.
          </p>
        ),
      },
      {
        question: 'What are common orthopedic injuries?',
        answer: (
          <p>
            Sprains, strains, fractures, and dislocations are among the most common. Sports injuries often involve knees, shoulders, and ankles. We provide specialized care for <Link href="/injuries/car-accident" className="text-blue-600 hover:underline">accident-related injuries</Link>.
          </p>
        ),
      },
      {
        question: 'Can I avoid surgery with non-surgical treatments?',
        answer: (
          <p>
            Yes. Many patients improve with non-surgical care such as <Link href="/treatments/epidural-steroid-injection" className="text-blue-600 hover:underline">injections</Link>, medication, and bracing before surgery is considered.
          </p>
        ),
      },
      {
        question: 'What is sports medicine?',
        answer: (
          <p>
            Sports medicine focuses on preventing and treating injuries related to exercise and physical activity — helping athletes of all levels recover safely and return to peak performance.
          </p>
        ),
      },
      {
        question: 'What happens if I delay or avoid orthopedic surgery?',
        answer: (
          <p>
            Delaying surgery may cause pain, stiffness, and worsening joint damage. Early intervention often prevents complications and leads to faster recovery. Consider getting a <Link href="/find-care/second-opinion" className="text-blue-600 hover:underline">second opinion</Link> to explore all your options.
          </p>
        ),
      },
    ],
  },
  {
    category: 'Credentials, Insurance & Local Expertise',
    items: [
      {
        question: 'What does it mean when an orthopedic surgeon is board certified?',
        answer: (
          <p>
            It means the doctor has passed rigorous training and testing standards set by the American Board of Orthopaedic Surgery, demonstrating advanced expertise. All our <Link href="/find-care/find-a-doctor" className="text-blue-600 hover:underline">board-certified orthopedic specialists</Link> are highly qualified and experienced.
          </p>
        ),
      },
      {
        question: 'What does fellowship-trained mean?',
        answer: (
          <p>
            A fellowship-trained orthopedic surgeon has completed additional subspecialty education in areas like spine surgery, joint replacement, or sports medicine beyond their residency training.
          </p>
        ),
      },
      {
        question: 'What insurance plans do you accept?',
        answer: (
          <p>
            We are a PPO practice and accept PPO plans across our locations in FL, NJ, NY, and PA — no referral needed to see a specialist. HMO plans are not accepted. Please <Link href="/insurance-policy" className="text-blue-600 hover:underline">review our insurance policy</Link> or call ahead to confirm coverage for your specific plan.
          </p>
        ),
      },
      {
        question: 'Where are Mountain Spine & Orthopedics locations?',
        answer: (
          <p>
            We proudly serve patients across FL, NJ, NY, and PA. Our offices include locations in <Link href="/locations/florida/boca-raton-orthopedics" className="text-blue-600 hover:underline">Boca Raton</Link>, <Link href="/locations/florida/palm-beach-gardens-orthopedics" className="text-blue-600 hover:underline">Palm Beach Gardens</Link>, <Link href="/locations/florida/fort-pierce-orthopedics" className="text-blue-600 hover:underline">Fort Pierce</Link>, and more. <Link href="/locations" className="text-blue-600 hover:underline">View all locations</Link>.
          </p>
        ),
      },
      {
        question: 'Do you offer emergency or same-day orthopedic appointments?',
        answer: (
          <p>
            Yes. Same-day appointments are available for acute injuries like fractures, sprains, and back pain. <Link href="/find-care/book-an-appointment" className="text-blue-600 hover:underline">Contact us immediately</Link> for urgent care.
          </p>
        ),
      },
    ],
  },
  {
    category: 'Post-Care, Casts & Complications',
    items: [
      {
        question: 'Is my cast too tight?',
        answer: (
          <p>
            Mild tightness is normal. If you feel numbness, tingling, or swelling that worsens, elevate the cast and contact our office immediately. Never ignore signs of restricted circulation.
          </p>
        ),
      },
      {
        question: 'How can I reduce swelling after surgery?',
        answer: (
          <p>
            Elevate the affected limb above your heart, use cold compresses as directed, and rest. Follow all postoperative instructions from your surgeon for optimal healing.
          </p>
        ),
      },
      {
        question: 'When should I contact my doctor after surgery?',
        answer: (
          <p>
            Call if you experience increased pain, redness, fever, or signs of infection. Our orthopedic team is available 24/7 for post-operative concerns. Don't hesitate to reach out with any questions.
          </p>
        ),
      },
    ],
  },
];

// Flatten all FAQ items for schema generation
const allFaqItems = faqSections.flatMap(section => section.items);

export const metadata: Metadata = {
  title: 'Orthopedic Surgery FAQs | Mountain Spine & Orthopedics',
  description: 'Get answers to frequently asked questions about orthopedic surgery, spine treatments, recovery times, and patient care at Mountain Spine & Orthopedics across FL, NJ, NY, and PA.',
  alternates: {
    canonical: buildCanonical('/about/faqs'),
  },
  openGraph: {
    title: 'Orthopedic Surgery FAQs | Mountain Spine & Orthopedics',
    description: 'Get answers to frequently asked questions about orthopedic surgery, spine treatments, recovery times, and patient care at Mountain Spine & Orthopedics.',
    url: buildCanonical('/about/faqs'),
    images: ['/FAQs.jpeg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Orthopedic Surgery FAQs | Mountain Spine & Orthopedics',
    description: 'Get answers to frequently asked questions about orthopedic surgery, spine treatments, recovery times, and patient care at Mountain Spine & Orthopedics.',
    images: ['/FAQs.jpeg'],
  },
};

export default function FAQs() {
  // Generate FAQPage schema from FAQ data for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": allFaqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": extractTextFromReactElement(item.answer)
      }
    }))
  };

  return (
    <main className='w-full flex flex-col items-center justify-center bg-white h-full'>
      {/* FAQPage Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Landing */}
      <section className="w-full h-full flex flex-col relative overflow-hidden [mask-composite:intersect] [mask-image:linear-gradient(to_top,transparent,black_6rem)]" >
        <div
          style={{
            filter: 'blur(30px)'
          }}
          className="w-full h-[120px] absolute top-0 z-[1]"
        />
        <Image
          src={'/herosectionimg.jpg'}
          priority={true}
          fetchPriority="high"
          layout='fill'
          className="h-full absolute top-0 object-cover object-center md:object-center w-full"
          alt="Orthopedic doctor answering frequently asked questions about spine surgery and joint care"
        />
        <div
          className="lg:w-[100%] z-[1] h-full absolute left-0 top-0 md:w-[100%] w-full"
          style={{
            background: 'linear-gradient(180deg, rgba(10, 80, 236, 0.20) 0%, rgba(255, 255, 255, 0.20) 100%)',
          }}
        />
        <div className="z-[1] flex flex-col w-full h-full text-center items-center justify-center relative sm:pt-60 sm:pb-20 pt-30 pb-0">
          <div className=' px-6 xl:px-[80px] z-[2] w-full flex items-center justify-center'>
            <div className='flex flex-row space-x-[4px] rounded-[62px] w-fit items-center justify-center px-[20px] py-[10px]'
              style={{ background: 'rgba(255, 255, 255, 0.50)' }}
            >
              <span style={{ fontFamily: "var(--font-public-sans)", fontWeight: 400 }} className="text-[#252932]">About</span>
              <span style={{ fontFamily: "var(--font-public-sans)", fontWeight: 400 }} className="text-[#252932]">/</span>
              <span style={{ fontFamily: "var(--font-public-sans)", fontWeight: 400 }} className="text-[#2358AC]">FAQ's</span>
            </div>
          </div>
          <div className=" px-6 xl:px-[80px] z-[2] flex flex-row space-x-[20px] items-center justify-start mt-[12px] md:w-[71%] xl:w-[70%] pb-20">
            <h1 style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500 }} className="text-[#252932] text-3xl sm:text-5xl md:text-6xl">
              Frequently Asked Questions – Mountain Spine & Orthopedics
            </h1>
          </div>
        </div>
      </section>

      {/* Interactive FAQ Sections */}
      {faqSections.map((section, index) => (
        <FaqsSection
          key={index}
          header={<span>{section.category}</span>}
          faqItems={section.items}
        />
      ))}

      {/* Testimonial/Closing Section */}
      <section className=' xl:mt-[80px] py-[50px] max-w-[1440px]  px-6 xl:px-[80px] w-full max-h-[680px] lg:h-[680px]'>
        <div className=' h-full w-full rounded-[40px] bg-[#EDEEE9] p-8 xl:p-[80px] relative border overflow-clip'>
          <Image src={FAQsDocotorTestimony} alt='Happy Female Doctor' className=' md:flex hidden absolute -bottom-8 left-[40%] w-[75%] z-20' />
          <p
            style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
            className=' text-[#424959] md:w-[55%] w-full text-xl md:text-2xl'
          >
            At Mountain Spine & Orthopedics, we take the time to listen to each patient to provide you with a positive and individualized treatment experience. Our board-certified, fellowship-trained orthopedic surgeons across FL, NJ, NY, and PA are here to answer your questions and guide you toward the best treatment plan for your needs.
          </p>
        </div>
      </section>
    </main>
  )
}
