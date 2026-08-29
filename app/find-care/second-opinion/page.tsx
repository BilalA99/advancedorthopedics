import React, { ReactElement } from 'react'
import ContactUsSection from '@/components/ContactUsSection'
import RatingsAndReviews from '@/components/RatingsAndReviews'
import Image from 'next/image'
import AAOS from '@/public/AAOS.png';
import ACP from '@/public/ACP.png';
import AOA from '@/public/AOA.png';
import NASS from '@/public/NASS.png';
import Serpent from '@/public/Serpent.png';
import SMIS from '@/public/SMIS.png';
import { isProviderVisible, providerIds, getVisibleReviews } from '@/lib/providers/providerVisibility';
import { sitewideReviews } from '@/components/data/socialProofReviews';

const showFeaturedDoctor = isProviderVisible({ slug: providerIds.scottKatzman });

// Professional association logo alt text mapping
const associationLogoAlt: Record<string, string> = {
  'AAOS': 'American Academy of Orthopaedic Surgeons (AAOS) member logo',
  'ACP': 'American College of Physicians (ACP) certification',
  'AOA': 'American Osteopathic Association (AOA) accreditation',
  'NASS': 'North American Spine Society (NASS) membership badge',
  'Serpent': 'Medical caduceus symbol representing healthcare excellence',
  'SMIS': 'Society for Minimally Invasive Spine Surgery (SMISS) member'
};
import DoctorCard from '@/components/DoctorCard';
import FAQsSection from '@/components/FaqsSection';
import DoctorsTestitmonial from '@/components/DoctorsTestitmonial';
import FindCareContactUsSection from '@/components/FindCardContactUsSection';
import { TextAnimate } from '@/components/magicui/text-animate';
import { Marquee } from '@/components/magicui/marquee';

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


const faqItems: { question: string, answer: React.ReactElement }[] = [
    {
        question: 'What is a second opinion?',
        answer: (
            <p>
                A second opinion is a crucial step in your healthcare journey where you ask another expert specialist to review your diagnosis and proposed treatment plan. It ensures you have all the information needed to make a confident decision, confirming the diagnosis is correct and that you are aware of all possible treatment options, including the most advanced <a href="/treatments/surgical-treatments" className="text-blue-600 hover:underline">minimally invasive procedures</a> available.
            </p>
        )
    },
    {
        question: 'When should I seek a second opinion?',
        answer: (
            <p>
                You should consider a second opinion if you have been diagnosed with a complex condition, if surgery has been recommended, or if you feel uncertain about your current treatment plan. It is especially important for conditions like <a href="/conditions/failed-back-surgery-syndrome" className="text-blue-600 hover:underline">Failed Back Surgery Syndrome</a>, scoliosis, or when considering a major procedure like a <a href="/treatments/spinal-fusion" className="text-blue-600 hover:underline">spinal fusion</a>.
            </p>
        )
    },
    {
        question: 'What does a second opinion cost?',
        answer: (
            <p>
                Many insurance plans cover the cost of a second opinion, especially when surgery is recommended. We recommend checking with your provider about your specific coverage. For more details on navigating costs, you can review our <a href="/insurance-policy" className="text-blue-600 hover:underline">insurance information page</a> or read our blog post about <a href="/blogs/orthopedic-visit-cost-without-insurance" className="text-blue-600 hover:underline">costs without insurance</a>.
            </p>
        )
    },
    {
        question: 'Which patients benefit most from a second opinion?',
        answer: (
            <p>
                Patients who have been told they need a complex surgery, such as a <a href="/treatments/multilevel-degenerative-disc-disease-surgery" className="text-blue-600 hover:underline">multilevel fusion</a> or <a href="/treatments/revision-spinal-surgery" className="text-blue-600 hover:underline">revision surgery</a>, benefit greatly. Additionally, patients whose symptoms have not improved with initial treatments or those who have received a rare diagnosis should seek a second opinion to ensure all avenues have been explored.
            </p>
        )
    },
    {
        question: 'Will my current doctor be offended if I get a second opinion?',
        answer: (
            <p>
                Not at all. Seeking a second opinion is a standard and respected part of the medical process. Most doctors welcome a second opinion as it either confirms their diagnosis and builds patient confidence, or provides new insights that can lead to a better outcome. It is a collaborative part of ensuring the best possible care for you.
            </p>
        )
    }
]

const Testimonial = (
    <p>
        A virtual second opinion from Mountain Spine & Orthopedics helps you make an informed decision about your medical treatment from the comfort of your home. For patients who live far away or have difficulty traveling, our service provides direct access to leading spine and orthopedic specialists like {showFeaturedDoctor && (
            <><a href="/about/meetourdoctors/dr-scott-katzman" className="text-blue-600 hover:underline">Dr. Katzman</a> and </>
        )}<a href="/about/meetourdoctors/dr-david-cowin" className="text-blue-600 hover:underline">Dr. Cowin</a>. Already have an MRI? Use our <a href="/find-care/free-mri-review" className="text-blue-600 hover:underline">Free MRI Review tool</a> to let our doctors review it free of charge. Ready to talk? <a href="/find-care/book-an-appointment" className="text-blue-600 hover:underline">Book an appointment</a> to discuss your options.
    </p>
)

const Header = (
    <span>Your Questions Answered: Second Opinion FAQs From Our Patients</span>
)

// FAQPage Schema for SEO
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqItems.map(item => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": extractTextFromReactElement(item.answer)
    }
  }))
}

// MedicalOrganization Schema for brand consistency
const medicalOrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  "name": "Mountain Spine & Orthopedics",
  "description": "Leading spine and orthopedic specialists in Florida providing advanced minimally invasive treatments, including Band-Aid Back Surgery, laser spine procedures, and comprehensive pain management.",
  "url": "https://mountainspineorthopedics.com",
  "logo": "https://mountainspineorthopedics.com/newlogo4.png",
  "image": "https://mountainspineorthopedics.com/herosectionimg.jpg",
  "telephone": [
    "(561) 223-9959",
    "(754) 212-8736", 
    "(407) 565-7598",
    "(407) 960-1717",
    "(863) 777-5805",
    "(561) 556-1802",
    "(954) 987-2047",
    "(561) 544-5501"
  ],
  "medicalSpecialty": [
    "Orthopedic Surgery",
    "Spine Surgery", 
    "Sports Medicine",
    "Pain Management",
    "Minimally Invasive Surgery",
    "Joint Replacement",
    "Spinal Fusion",
    "Discectomy",
    "Arthroscopy"
  ],
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 27.7663,
      "longitude": -82.6404
    },
    "geoRadius": "300000"
  },
  "areaServed": [
    "Florida",
    "Hollywood, FL",
    "Orlando, FL", 
    "Altamonte Springs, FL",
    "Davenport, FL",
    "Fort Pierce, FL",
    "Palm Beach Gardens, FL",
    "South Miami, FL",
    "Boca Raton, FL"
  ]
}

export default function SecondOpinion() {
    return (
        <main className='w-full flex flex-col items-center justify-center bg-white h-full'>
            {/* JSON-LD Schema Markup */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalOrganizationSchema) }} />
            <section className="w-full h-full flex flex-col relative overflow-hidden [mask-composite:intersect] [mask-image:linear-gradient(to_top,transparent,black_6rem)]">
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
                    alt="Get a second opinion from Mountain Spine & Orthopedics spine specialists"
                />
                <div
                    className="w-full h-[100px] absolute bottom-0 z-[1]"
                    style={{
                        background: 'linear-gradient(to bottom, transparent 0%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 1) 100%)',
                    }}
                />
                <div className="z-[2] flex flex-col w-full h-full text-left relative pt-32 lg:pt-26 pb-20 px-6 lg:px-[80px]">
                    <div className='max-w-[1440px] w-full flex flex-col items-start justify-start'>
                        <TextAnimate as="h1" animation="blurInUp" by="word" once
                            style={{
                                fontFamily: 'var(--font-public-sans)',
                                fontWeight: 500,
                            }}
                            className='text-[#252932] text-3xl md:text-6xl'
                        >
                            Get a Second Opinion
                        </TextAnimate>
                        <p
                            style={{
                                fontFamily: 'var(--font-public-sans)',
                                fontWeight: 500,
                            }}
                            className='text-[#252932] text-lg md:text-xl mt-2'
                        >
                            Our Virtual Second Opinion service offers easy access for remote patients to top specialists.
                        </p>
                    </div>
                </div>
            </section>
            <FindCareContactUsSection page={'Get a Second Opinion'} backgroundcolor="white" />
            <div className="w-full flex flex-row items-center justify-evenly bg-white py-20 ">

                <Marquee pauseOnHover className='w-full' >
                    {
                        [
                          { img: AAOS, name: 'AAOS' },
                          { img: ACP, name: 'ACP' },
                          { img: AOA, name: 'AOA' },
                          { img: NASS, name: 'NASS' },
                          { img: Serpent, name: 'Serpent' },
                          { img: SMIS, name: 'SMIS' }
                        ].map((item, index) => (
                            <Image key={index} src={item.img} alt={associationLogoAlt[item.name]} className=" h-[40px] object-contain mx-[20px]" />
                        ))
                    }
                </Marquee>

            </div>
            <RatingsAndReviews reviews={getVisibleReviews(sitewideReviews)} />

            <FAQsSection header={Header} faqItems={faqItems} />

            <DoctorsTestitmonial testimonial={Testimonial} />


            <section className='max-w-[1440px] w-full py-[30px] flex flex-row items-center justify-center'>
                <div
                    className=" max-h-[56px] h-full px-[32px] py-[16px] rounded-[62px] relative flex bg-[#0A50EC] text-white text-[14px] font-semibold w-fit lg:w-[40%] justify-center items-center hover:cursor-pointer"
                >
                    <div className='pr-[10px]'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M6 1C6 0.447715 5.55229 0 5 0C4.44772 0 4 0.447715 4 1V1.44885C3.23882 1.6903 2.57734 2.06994 2.01802 2.6746C1.18949 3.57031 0.83279 4.69272 0.664161 6.04866C0.499967 7.36894 0.499982 9.05406 0.5 11.1739V11.1739V11.8261V11.8261C0.499982 13.9459 0.499967 15.6311 0.664161 16.9513C0.83279 18.3073 1.18949 19.4297 2.01802 20.3254C2.8568 21.2322 3.92535 21.6329 5.21533 21.8204C6.45141 22.0001 8.02291 22 9.97119 22H9.97121H9.97122H12.0288H12.0288H12.0288C13.9771 22 15.5486 22.0001 16.7847 21.8204C18.0747 21.6329 19.1432 21.2322 19.982 20.3254C20.8105 19.4297 21.1672 18.3073 21.3358 16.9513C21.5 15.6311 21.5 13.9459 21.5 11.8261V11.1739C21.5 9.05408 21.5 7.36895 21.3358 6.04866C21.1672 4.69272 20.8105 3.57031 19.982 2.6746C19.4227 2.06993 18.7612 1.6903 18 1.44885V1C18 0.447715 17.5523 0 17 0C16.4477 0 16 0.447715 16 1V1.09173C14.903 0.999955 13.5863 0.999976 12.0288 1H12.0288H9.97122H9.97121C8.41374 0.999976 7.09704 0.999955 6 1.09173V1ZM3.49783 8C3.03921 8 2.8099 8 2.66385 8.14417C2.51781 8.28833 2.51487 8.51472 2.509 8.96751C2.50027 9.64067 2.5 10.3942 2.5 11.2432V11.7568C2.5 13.9616 2.50182 15.5221 2.64887 16.7045C2.79327 17.8656 3.06263 18.5094 3.48622 18.9673C3.89956 19.4142 4.4647 19.6903 5.503 19.8412C6.57858 19.9975 8.00425 20 10.05 20H11.95C13.9957 20 15.4214 19.9975 16.497 19.8412C17.5353 19.6903 18.1004 19.4142 18.5138 18.9673C18.9374 18.5094 19.2067 17.8656 19.3511 16.7045C19.4982 15.5221 19.5 13.9616 19.5 11.7568V11.2432C19.5 10.3942 19.4997 9.64067 19.491 8.96751C19.4851 8.51472 19.4822 8.28833 19.3362 8.14417C19.1901 8 18.9608 8 18.5022 8H3.49783ZM12 11C12 10.4477 11.5523 10 11 10C10.4477 10 10 10.4477 10 11V13H8C7.44772 13 7 13.4477 7 14C7 14.5523 7.44772 15 8 15H10V17C10 17.5523 10.4477 18 11 18C11.5523 18 12 17.5523 12 17V15H14C14.5523 15 15 14.5523 15 14C15 13.4477 14.5523 13 14 13H12V11Z" fill="#FAFAFA" />
                        </svg>
                    </div>
                    <span
                        style={{
                            fontFamily: "var(--font-public-sans)",
                            fontWeight: 500, fontSize: "16px",
                            lineHeight: "24px",
                            letterSpacing: "0.02em"
                        }}
                    >Request for a Second Opinion</span>
                </div>
            </section>



        </main>
    )
}
