import Image from 'next/image'
import PatientFormsLanding from '@/public/PatientFormsLanding.jpeg'
import ContactUsSection from '@/components/ContactUsSection'
import ConditionCheckSection from '@/components/ConditionCheckSection'

const ConditionCheckSteps = [
  {
    step: "Describe Your Pain",
    caption: "Understanding the nature and intensity your pain is the first step to diagnosing it.",
    questions: [
      { question: "Where is your pain? (Choose all that apply)", control: "pain_area", options: ["Lower Back", "Middle Back", "Neck", "Shoulders", "Arms", "Buttocks", "Legs"] },
      { question: "Where is the pain strongest?", control: "pain_strongest", options: ["Lower Back", "Middle Back", "Neck", "Shoulders", "Arms", "Buttocks", "Legs"] },
      { question: "How long have you been experiencing pain?", control: "pain_length", options: ["A month or less", "One to six months", "Seven months to a Year", "Shoulders", "A year or more"] },
      { question: "How would describe your pain?", control: "pain_desc", options: ["Sharp", "Burning", "Cramping", "Radiating (throbbing)", "Shocking (quick jolts of pain, with minor pain in-between)"] },
      { question: "Are you always in pain?", control: "pain_always", options: ["Yes, I am in constant pain that worsens depending on what activity I am doing.", "No, it comes and goes depending on what activity I am doing."] }
    ]
  },
  {
    step: "Describe Your Symptoms",
    caption: "Determining How your pain responds to different activities and identifying any other specific symptoms is the second step to diagnosing your pain",
    questions: [
      { question: "Do you have any of the following symptoms? (choose all that apply)?", control: "pain_symptoms", options: ["Pins and needles feeling", "Numbness", "Tingling sensations", "Progressing weakness", "Loss of coordination"] },
      { question: "When is your pain at its worst? (choose the one that most applies)", control: "pain_worst", options: ["In the morning after waking up", "While standing or walking", "While bending backward", "While sitting", "While performing strenous activity"] },
      { question: "When does your pain feel better?", control: "pain_feel_better", options: ["Sitting down", "Standing up", "Walking", "Lying down and relaxing", "Leaning forward", "Bending backward"] },
      { question: "What caused your pain originally?", control: "pain_source", options: ["Lifting something heavy", "Vehicle crash", "Slip or fall", "Traumatic injury", "Leaning forward", "Bending backward", "Other (Specify in the next steps comments)"] },
      { question: "Have you undergone any of the following tests", control: "pain_test", options: ["CT Scan", "MRI", "X-Ray", "Nerve conduction study", "Other (Specify in the next steps comments)"] },
    ]
  },
  {
    step: "Your Profile",
    caption: "Lastly, a few details about you helps us better protect your information and allows us to quickly give you a targeted diagnosis.",
    questions: [
      { question: "First Name", control: "first_name", options: [] },
      { question: "Last Name", control: "last_name", options: [] },
      { question: "Email", control: "email", options: [] },
      { question: "Phone", control: "phone", options: [] },
      { question: "State", control: "state", options: ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"] },
      { question: "Insurance Type", control: "insurance_type", options: ["Blue Cross Blue Shield", "Aetna", "Cigna Healthcare", "United Healthcare", "Meritan Health", "Bright Health Group", "Multiplan", "Self-pay"] },
      { question: "Comments", control: "comments", options: [] },
      { question: 'Email Opt Out', control: 'email_optout', options: [] }
    ]
  }
]

const initialValues = {
  pain_area: [],
  pain_strongest: "",
  pain_length: "",
  pain_desc: "",
  pain_always: "",
  pain_symptoms: [],
  pain_worst: "",
  pain_feel_better: "",
  pain_source: "",
  pain_test: "",
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  state: "",
  insurance_type: "",
  comments: "",
  email_optout: ""
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  'itemListElement': [
    {
      '@type': 'ListItem',
      'position': 1,
      'name': 'Home',
      'item': 'https://www.mountainspineortho.com/'
    },
    {
      '@type': 'ListItem',
      'position': 2,
      'name': 'Condition Check',
      'item': 'https://www.mountainspineortho.com/condition-check'
    }
  ]
}

// HowTo Schema for the condition checker process
const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Check Your Spine Condition with Our Free Online Assessment",
  "description": "Answer a few quick questions to see if you're a candidate for minimally invasive spine or joint treatment. Takes less than 2 minutes.",
  "totalTime": "PT2M",
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "USD",
    "value": "0"
  },
  "step": [
    {
      "@type": "HowToStep",
      "name": "Describe Your Pain",
      "text": "Understanding the nature and intensity of your pain is the first step. You'll answer questions about where your pain is, how long you've had it, and what it feels like.",
      "url": "https://mountainspineorthopedics.com/condition-check#step-1"
    },
    {
      "@type": "HowToStep", 
      "name": "Describe Your Symptoms",
      "text": "Pinpoint how your pain responds to different activities and identify other specific symptoms like numbness or tingling.",
      "url": "https://mountainspineorthopedics.com/condition-check#step-2"
    },
    {
      "@type": "HowToStep",
      "name": "Provide Your Profile", 
      "text": "A few details about you help us protect your information and provide a more targeted preliminary diagnosis.",
      "url": "https://mountainspineorthopedics.com/condition-check#step-3"
    }
  ],
  "supply": [
    {
      "@type": "HowToSupply",
      "name": "Computer or mobile device"
    },
    {
      "@type": "HowToSupply", 
      "name": "Internet connection"
    }
  ],
  "tool": [
    {
      "@type": "HowToTool",
      "name": "Mountain Spine & Orthopedics Condition Checker"
    }
  ]
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

export default function ConditionChecker() {
  return (
    <main className="w-full flex flex-col items-center justify-center bg-white h-full" aria-label="Condition Check Main Content">
      {/* JSON-LD Schema Markup */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalOrganizationSchema) }} />
      {/* Landing Section */}
      <section className="w-full h-full flex flex-col relative overflow-hidden [mask-composite:intersect] [mask-image:linear-gradient(to_top,transparent,black_6rem)]" aria-labelledby="condition-check-heading">
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
          alt="Orthopedic specialist performing spine condition assessment for online diagnosis tool at Mountain Spine & Orthopedics"
        />
        <div
          className="lg:w-[100%] z-[1] h-full absolute left-0 top-0 md:w-[100%] w-full"
          style={{
            background: 'linear-gradient(180deg, rgba(10, 80, 236, 0.20) 0%, rgba(255, 255, 255, 0.20) 100%)',
          }}
        />
        {/* <div
        className="lg:w-[100%] z-[1] h-full absolute left-0 top-0 md:w-[85%] w-full"
        style={{
          background: '#5FBBEC',
        }}
      /> */}
        <div className="z-[1] flex flex-col w-full h-full text-left relative sm:pt-60 sm:pb-20 pt-30 pb-0">
          <nav aria-label="Breadcrumb" className="px-6 lg:px-[80px] z-[2] w-full flex items-center justify-center">

            <ol className="flex flex-row space-x-[4px] rounded-[62px] w-fit items-center justify-center px-[20px] py-[10px] bg-[rgba(255,255,255,0.5)]">
              <li><a href="/" className="text-[#252932]" style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 400 }}>Home</a></li>
              <li aria-hidden="true" className="text-[#252932]">/</li>
              <li aria-current="page" className="text-[#2358AC]" style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 400 }}>Condition Check</li>
            </ol>
          </nav>
          <div className="px-6 lg:px-[80px] z-[2] flex flex-row space-x-[20px] items-center justify-center text-center mt-[12px] w-full">
            <h1 id="condition-check-heading" style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 400 }} className="text-[#252932] text-5xl sm:text-6xl xl:text-6xl">
              Check Your Spine Condition – Free Online Assessment
            </h1>
          </div>
          <div className="z-[2] px-6 lg:px-[80px] mt-[24px] w-full pb-8">
            <p style={{ fontWeight: 400 }} className="text-[#424959] sm:text-lg lg:text-xl text-center">
              Welcome to an exciting new way to obtain a preliminary diagnosis online based on your symptoms, previous tests, and history. This tool's confidential results are often used by pain sufferers to assist them in seeking effective treatment, or as a confirmation of the existence of a specific orthopedic condition they may be concerned about.
            </p>
          </div>
        </div>
      </section>
      {/* Interactive Condition Checker Section */}
      <ConditionCheckSection steps={ConditionCheckSteps} initialValues={initialValues} />
      {/* Final CTA Section */}
      <section className="w-full flex flex-col items-center justify-center py-16" aria-label="Condition Check CTA">
        <h2 className="text-3xl md:text-5xl font-bold text-[#252932] mb-4" style={{ fontFamily: 'var(--font-public-sans)' }}>
          Take the first step toward a pain-free life.
        </h2>
        <h3 className="text-xl md:text-2xl text-[#2358AC] mb-8" style={{ fontFamily: 'var(--font-public-sans)' }}>
          Contact Us
        </h3>
        <ContactUsSection />
      </section>
    </main>
  )
}
