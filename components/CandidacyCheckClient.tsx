'use client'
import React, { useState } from 'react'
import PatientFormsLanding from '@/public/PatientFormsLanding.jpeg'
import Image from 'next/image'
import ContactUsSection from '@/components/ContactUsSection'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from 'react-hook-form'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'
import { TextAnimate } from '@/components/magicui/text-animate'
import { sendCandidacyEmail, sendUserEmail } from '@/components/email/sendcontactemail'
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Marquee } from '@/components/magicui/marquee'
import RatingsAndReviews from '@/components/RatingsAndReviews'
import FaqsSection from '@/components/FaqsSection'
import DoctorsTestitmonial from '@/components/DoctorsTestitmonial'
import AAOS from '@/public/AAOS.png';
import ACP from '@/public/ACP.png';
import AOA from '@/public/AOA.png';
import NASS from '@/public/NASS.png';
import Serpent from '@/public/Serpent.png';
import SMIS from '@/public/SMIS.png';

// Professional association logo alt text mapping
const associationLogoAlt: Record<string, string> = {
  'AAOS': 'American Academy of Orthopaedic Surgeons (AAOS) member logo',
  'ACP': 'American College of Physicians (ACP) certification',
  'AOA': 'American Osteopathic Association (AOA) accreditation',
  'NASS': 'North American Spine Society (NASS) membership badge',
  'Serpent': 'Medical caduceus symbol representing healthcare excellence',
  'SMIS': 'Society for Minimally Invasive Spine Surgery (SMISS) member'
};
import { useRouter } from 'next/navigation'
import { getAttributionData } from '@/lib/gclid'
import { pushFormSubmit } from '@/utils/enhancedConversions'
// Reverted form schema to match the "Candidacy Check" steps from the image
const formSchema = z.object({
  // Step 1 Questions
  condition: z.string().nonempty({ message: "Please select a condition." }),
  age: z.string().nonempty({ message: "Please select an age range." }),
  health: z.string().nonempty({ message: "Please rate your health." }),
  smoking: z.string().nonempty({ message: "This field is required." }),
  // Step 2 Questions
  recent_diagnosis: z.string().nonempty({ message: "Please select an option." }),
  last_test_date: z.string().nonempty({ message: "Please choose a timeframe." }),
  other: z.string(), // Other is optional
  // Step 3 Questions
  first_name: z.string().min(2, { message: "First name is required." }),
  last_name: z.string().min(2, { message: "Last name is required." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  phone: z.string().min(10, "Phone number must be at least 10 digits."),
  state: z.string().min(2, { message: "Please select your state." }),
  insurance_type: z.string().min(2, { message: "Please select an insurance type." }),
  comments: z.string(),
})

// Reverted form steps to match the image content
const CandidacyCheckSteps = [
  {
    step: "Describe Your Condition",
    caption: "Your medical condition and overall health will help us understand more about what treatment might be best for you.",
    questions: [
      { question: "What condition do you have?", control: "condition", options: ["Bulging Disc", "Degenerative Disc Disease", "Disc Tear", "Facet Joint Disease", "Failed Surgery Syndrome", "Foraminal Stenosis", "Herniated Disc", "Pinched Nerve", "Radiculitis", "Radiculopathy", "Sciatica", "Spinal Bone Spurs", "Spinal Stenosis", "Spondylolisthesis"] },
      { question: "How old are you?", control: "age", options: ["21-35", "36-50", "51-66", "66+"] },
      { question: "How would you rate your overall health?", control: "health", options: ["Poor", "Fair", "Good", "Very Good", "Excellent"] },
      { question: "Do you smoke cigarettes?", control: "smoking", options: ["No", "Occasionally", "Regularly"] }
    ]
  },
  {
    step: "Previous Diagnostic Tests",
    caption: "Please indicate any other tests you have had in the past.",
    questions: [
      { question: "Have you recently had any diagnostic exams done?", control: "recent_diagnosis", options: ["MRI", "X-Ray", "CT Scan"] },
      { question: "How long ago was it taken?", control: "last_test_date", options: ["Not Applicable", "A month or less", "One to six months", "Seven months to a year", "More than a year"] },
      { question: "Other", control: "other", options: [] }
    ]
  },
  {
    step: "More Information",
    caption: "Lastly, a few details about you helps us better protect your information and allows us to quickly give you a targeted diagnosis.",
    questions: [
      { question: "First Name", control: "first_name", options: [] },
      { question: "Last Name", control: "last_name", options: [] },
      { question: "Email", control: "email", options: [] },
      { question: "Phone", control: "phone", options: [] },
      { question: "State", control: "state", options: ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"] },
      { question: "Insurance Type", control: "insurance_type", options: ["Blue Cross Blue Shield", "Aetna", "Cigna Healthcare", "United Healthcare", "Meritan Health", "Bright Health Group", "Multiplan", "Self-pay"] },
      { question: "Comments", control: "comments", options: [] },
    ]
  }
]

const faqItems: { question: string, answer: JSX.Element }[] = [
  {
    question: "Reason 1: Understanding Potential Causes of Back Pain",
    answer: (
      <p>
        Your back is a complex and highly engineered system made up of bones, muscles, joints, and ligaments. Unfortunately, it's also vulnerable to pain. Whether caused by injuries, fractures, or conditions like spinal stenosis, disc degeneration, pinched nerves, or herniated discs, understanding the source of pain is the first step toward treatment.
      </p>
    )
  },
  {
    question: "Reason 2: Don't Ignore the Warning Signs",
    answer: (
      <p>
        Back pain is common, but recurring or chronic symptoms warrant medical evaluation. Research indicates that persistent spinal conditions are associated with increased health risks. Early diagnosis and treatment planning can lead to better health outcomes.
        <br /><br />A remote second opinion helps confirm your diagnosis, prevent unnecessary procedures, optimize treatment strategies, and bolster your confidence in making informed health decisions.
      </p>
    )
  },
  {
    question: "Reason 3: Explore Non-Surgical and Surgical Solutionss",
    answer: (
      <p>
        The good news? Most patients respond well to non-surgical options and medication. However, if these don't work, minimally invasive surgery may be the next step. Mountain Spine & Orthopedics provides advanced treatments tailored to your unique condition.
        <br /><br />A remote second opinion helps confirm your diagnosis, prevent unnecessary procedures, optimize treatment strategies, and bolster your confidence in making informed health decisions.
      </p>
    )
  },
  {
    question: "Free Candidacy Check Tool",
    answer: (
      <p>
        A second opinion from Orthopedic & Laser Spine Surgery can ensure that you receive the most effective treatment plan. Our experienced spine and orthopedic specialists provide valuable insights into your medical condition.
        <br /><br />A remote second opinion helps confirm your diagnosis, prevent unnecessary procedures, optimize treatment strategies, and bolster your confidence in making informed health decisions.
      </p>
    )
  },
]

const Testimonial = (
  <p>
    Request a Free Candidacy Evaluation from Our Spine Team: <br /> <br />Knowing your options starts with the right diagnosis. That's why Mountain Spine & Orthopedics offers free spine surgery candidacy checks. We help determine which treatments may be a fit for your condition at no cost to you. Whether you need a outside rehabilitation guidance or surgery, you'll get expert advice based on your specific needs.    </p>
)

const Header = (
  <span>
    Reasons Why You Should Seek Candidacy Check for Spine Treatment
  </span>
)

export default function CandidacyCheckClient() {
  const [conditionStep, setConditionStep] = useState(1);
  const [appointmentConfirm, setAppointmentConfirm] = useState(false);
  const [disabled, setDisabled] = useState(false)
  const [attribution, setAttribution] = useState({ gclid: '', utm_source: '', utm_medium: '', utm_campaign: '', utm_term: '', utm_content: '' })
  const router = useRouter()

  React.useEffect(() => {
    setAttribution(getAttributionData())
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      condition: "",
      age: "",
      health: "",
      smoking: "",
      recent_diagnosis: "",
      last_test_date: "",
      other: "",
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      state: "",
      insurance_type: "",
      comments: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setDisabled(true)
    const data = await sendCandidacyEmail({ ...values, email_optout: "false", ...attribution });
    if (data) {
      pushFormSubmit({
        form_name: 'CandidacyCheckForm',
        state: values.state,
        email: values.email,
        phone: values.phone,
        firstName: values.first_name,
        lastName: values.last_name,
      })
      //setAppointmentConfirm(true);
      form.reset();
      setDisabled(false)
      router.push('/thank-you')
    }
  }

  return (
    <main className='w-full flex flex-col items-center justify-center bg-white h-full'>
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
          alt="Check your candidacy for spine surgery treatments at Mountain Spine & Orthopedics"
        />
        <div
          className="lg:w-[100%] z-[1] h-full absolute left-0 top-0 md:w-[100%] w-full"
          style={{
            background: 'linear-gradient(180deg, rgba(10, 80, 236, 0.20) 0%, rgba(255, 255, 255, 0.20) 100%)',
          }}
        />
        <div
          className="w-full h-[100px] absolute bottom-0 z-[1]"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0.8) 100%)',
          }}
        />
        <div className="z-[2] flex flex-col w-full h-full text-left relative pt-32 lg:pt-26 pb-20 px-6 lg:px-[80px]">
          <div className='max-w-[1440px] w-full flex flex-col items-start justify-start'>
            <TextAnimate animation="blurInUp" by="word" once
              style={{
                fontFamily: 'var(--font-public-sans)',
                fontWeight: 500,
              }}
              className='text-[#252932] text-3xl md:text-6xl'
            >
              Candidacy Check
            </TextAnimate>
            <p
              style={{
                fontFamily: 'var(--font-public-sans)',
                fontWeight: 500,
              }}
              className='text-[#252932] text-lg md:text-xl mt-2'
            >
              This tool is designed to quickly and easily provide you with information on specific treatments for which you may be a candidate.
            </p>
          </div>
        </div>
      </section>
      <section className='w-full h-full flex flex-col relative overflow-hidden bg-white py-[50px] px-6 xl:px-[80px]'>
        <div className='flex flex-col items-center justify-center w-full max-w-screen-xl mx-auto'>
          <div className='w-full mb-6'>
            <nav className='flex flex-row space-x-[4px] rounded-[62px] w-fit items-center justify-center px-[20px] py-[10px]'
              style={{
                background: 'rgba(255, 255, 255, 0.50)'
              }}
              aria-label="Breadcrumb"
            >
              <span
                style={{
                  fontFamily: "var(--font-public-sans)",
                  fontWeight: 400,
                }}
                className="text-black"
              >
                Find Care
              </span>

              <span
                style={{
                  fontFamily: "var(--font-public-sans)",
                  fontWeight: 400,
                }}
                className="text-black"
              >
                /
              </span>

              <span
                style={{
                  fontFamily: "var(--font-public-sans)",
                  fontWeight: 400,
                }}
                className="text-[#2358AC]"
              >
                Learn Treatment Candidacy
              </span>
            </nav>
          </div>
          <div className=' flex flex-row space-x-[20px] items-center justify-center w-full'>
            {
              CandidacyCheckSteps.map((step, index) => (
                <div className=' flex flex-row space-x-[12px] items-center justify-center' key={index}>
                  <div className={` h-[40px] w-[40px] flex items-center  justify-center rounded-full ${conditionStep == index + 1 ? ' bg-[#0A50EC] text-white ' : 'bg-[#EFF1F4] text-[#0A50EC] md:flex hidden'}`}>
                    <span
                      style={{
                        fontFamily: 'var(--font-public-sans)',
                        fontWeight: 500,
                      }}
                      className=' text-lg'
                    >
                      {index + 1}
                    </span>
                  </div>

                  <h2
                    style={{
                      fontFamily: "var(--font-public-sans)",
                      fontWeight: 500,
                    }}
                    className={`text-black text-xl ${conditionStep == index + 1 ? 'flex' : ' md:flex hidden'}`}>
                    {step.step}
                  </h2>

                  {
                    index + 1 != 3 ?
                      <div className='md:flex hidden'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="122" height="10" viewBox="0 0 122 8" fill="none">
                          <path d="M1 3.5C0.723858 3.5 0.5 3.72386 0.5 4C0.5 4.27614 0.723858 4.5 1 4.5V3.5ZM121.354 4.35355C121.549 4.15829 121.549 3.84171 121.354 3.64645L118.172 0.464466C117.976 0.269204 117.66 0.269204 117.464 0.464466C117.269 0.659728 117.269 0.976311 117.464 1.17157L120.293 4L117.464 6.82843C117.269 7.02369 117.269 7.34027 117.464 7.53553C117.66 7.7308 117.976 7.7308 118.172 7.53553L121.354 4.35355ZM1 4.5H121V3.5H1V4.5Z" fill="#838890" />
                        </svg>
                      </div>
                      : <></>
                  }
                </div>
              ))
            }
          </div>
        </div>

        <motion.div className='flex flex-col items-center justify-center w-full max-w-screen-xl mx-auto mt-[50px] overflow-hidden' layout transition={{ duration: 0.3, ease: "easeInOut" }}>
          <div className=' bg-[#252932] rounded-t-[24px] rounded-b-0 w-full p-[16px]'>
            <h3
              style={{
                fontFamily: "var(--font-public-sans)",
                fontWeight: 400,
              }}
              className="text-white text-3xl text-center self-center"
            >
              Step {conditionStep}: {CandidacyCheckSteps[conditionStep - 1].step}
            </h3>
          </div>

          <div className='bg-[#E0F5FF] border border-black rounded-b-[24px] p-[16px] space-y-[24px] flex flex-col w-full'>
            <p
              style={{
                fontFamily: "var(--font-public-sans)",
                fontWeight: 400,
              }}
              className="text-[#424959] text-lg text-left w-full"
            >
              {CandidacyCheckSteps[conditionStep - 1].caption}
            </p>

            {
              conditionStep == 3 ?
                <div className='flex-col space-y-[16px] '>
                  {
                    ["100% Secure", "Your information is never shared", "We are HIPAA compliant", "We hate spam"].map((item) => (
                      <div className=' flex flex-row space-x-[12px] items-center'
                        key={item}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path fillRule="evenodd" clipRule="evenodd" d="M17.3543 0.340991C17.0821 0.0763472 16.6468 0.082532 16.3822 0.354805C16.1175 0.627078 16.1237 1.06233 16.396 1.32698C16.5441 1.47095 16.7798 1.65633 17.0041 1.83254L17.0563 1.87353C17.2816 2.05037 17.5225 2.23947 17.7504 2.4326L17.7569 2.43815H13.6668C13.2871 2.43815 12.9793 2.74596 12.9793 3.12565C12.9793 3.50535 13.2871 3.81315 13.6668 3.81315H17.7569L17.7504 3.81871C17.5225 4.01183 17.2816 4.20092 17.0564 4.37775L17.0563 4.37777L17.0041 4.41876C16.7798 4.59497 16.5441 4.78035 16.396 4.92432C16.1237 5.18897 16.1175 5.62422 16.3822 5.8965C16.6468 6.16877 17.0821 6.17496 17.3543 5.91031C17.438 5.829 17.6047 5.69551 17.8535 5.50009L17.9084 5.45695L17.9085 5.45691C18.1304 5.28269 18.3908 5.07832 18.6393 4.86774C18.9056 4.64206 19.1823 4.38945 19.3973 4.13693C19.5051 4.01039 19.6114 3.86776 19.6935 3.71431C19.7727 3.56633 19.8543 3.36241 19.8543 3.12565C19.8543 2.88889 19.7727 2.68498 19.6935 2.53699C19.6114 2.38355 19.5051 2.24092 19.3973 2.11437C19.1823 1.86185 18.9056 1.60924 18.6393 1.38356C18.3908 1.17298 18.1304 0.968591 17.9084 0.794364L17.9084 0.79435L17.8535 0.751216C17.6047 0.555789 17.438 0.422301 17.3543 0.340991ZM7.01838 6.18505C7.34059 5.93781 7.70434 5.71036 8.12841 5.65797C8.51562 5.61013 9.0653 5.69579 9.79529 6.30588L11.0459 7.48151L8.59969 7.48151C8.21999 7.48151 7.91219 7.78931 7.91219 8.16901C7.91219 8.5487 8.21999 8.85651 8.59969 8.85651L17.7886 8.85651C18.1714 8.85651 18.4799 9.16604 18.4799 9.54563C18.4799 9.92522 18.1714 10.2348 17.7886 10.2348H10.849C10.4693 10.2348 10.1615 10.5426 10.1615 10.9223C10.1615 11.3019 10.4693 11.6098 10.849 11.6098H12.9877L12.9811 11.8713C12.9707 12.2774 12.7498 12.6308 12.4204 12.827C12.2488 12.9292 12.0485 12.988 11.8328 12.988H10.9126C10.5329 12.988 10.2251 13.2958 10.2251 13.6755C10.2251 14.0552 10.5329 14.363 10.9126 14.363H11.8328C11.9044 14.363 11.9755 14.36 12.0457 14.3541L12.035 14.6139L12.0347 14.6245C12.0249 15.0098 11.8258 15.3473 11.5241 15.5487C11.3418 15.6704 11.1232 15.7412 10.8864 15.7412H9.96631C9.58662 15.7412 9.27881 16.049 9.27881 16.4287C9.27881 16.8084 9.58662 17.1162 9.96631 17.1162H10.8864C10.9383 17.1162 10.9898 17.1147 11.041 17.1116L10.9814 17.4642C10.9801 17.4717 10.979 17.4793 10.978 17.4868C10.9007 18.0585 10.4089 18.4849 9.82894 18.4796H6.57007C6.04797 18.4796 5.57546 18.4365 5.14987 18.2965C4.72819 18.1578 4.34164 17.9858 4.12525 17.8157C3.97047 17.6941 3.83933 17.5806 3.71449 17.4711L3.66964 17.4316C3.56295 17.3378 3.45017 17.2387 3.33935 17.1511C3.06497 16.9343 2.75373 16.7479 2.31157 16.6742C1.78528 16.5864 1.1519 16.5763 0.833496 16.5763C0.4538 16.5763 0.145996 16.8841 0.145996 17.2638C0.145996 17.6435 0.4538 17.9513 0.833496 17.9513C1.14552 17.9513 1.68036 17.9629 2.08545 18.0304C2.22541 18.0538 2.32555 18.1025 2.4868 18.2299C2.56731 18.2935 2.65056 18.3666 2.76141 18.464L2.80769 18.5047C2.93717 18.6183 3.09079 18.7516 3.27558 18.8968C3.68878 19.2216 4.2662 19.4533 4.72018 19.6027C5.34605 19.8086 5.98531 19.8546 6.57007 19.8546H9.81971C11.0855 19.8645 12.1635 18.936 12.3389 17.683L12.5387 16.5008C13.0544 16.0543 13.3888 15.4002 13.4091 14.6653L13.4453 13.7812C13.985 13.333 14.3364 12.6624 14.3556 11.9063L14.3632 11.6098H17.7886C18.9288 11.6098 19.8549 10.6866 19.8549 9.54563C19.8549 8.40464 18.9288 7.48151 17.7886 7.48151H13.0535L10.7229 5.29076C10.7138 5.2822 10.7045 5.27389 10.6949 5.26584C9.72042 4.44507 8.79509 4.19014 7.95981 4.29334C7.16435 4.39163 6.56052 4.8039 6.18889 5.08839L2.55473 7.7234C2.35926 7.86513 2.12404 7.94143 1.88267 7.94143H0.844315C0.464619 7.94143 0.156815 8.24923 0.156815 8.62893C0.156815 9.00863 0.464619 9.31643 0.844315 9.31643H1.88267C2.41399 9.31643 2.93171 9.14847 3.36186 8.83658L7.00342 6.19621L7.01838 6.18505Z" fill="#219653" />
                        </svg>
                        <span
                          style={{
                            fontFamily: "var(--font-public-sans)",
                            fontWeight: 500,
                          }}
                          className="text-[#424959] text-lg text-left w-full"
                        >
                          {item}
                        </span>
                      </div>
                    ))
                  }
                </div>
                :
                <></>
            }

            <Form {...form}>
              <form className=' flex flex-col space-y-[24px] ' onSubmit={(e) => e.preventDefault()}>
                {CandidacyCheckSteps[conditionStep - 1].questions.map((question) => (
                  <FormField
                    control={form.control}
                    name={question.control as any}
                    key={question.question}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <div key={question.question}>
                            <label
                              style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                              }}
                              className="text-black text-lg text-left w-full"
                            >
                              {question.question}
                            </label>
                          </div>
                        </FormLabel>
                        <FormControl>
                          {question.options.length > 0 ? (
                            <Select onValueChange={field.onChange} value={field.value || ""}>
                              <SelectTrigger className="w-full h-12 px-6 bg-[#f0f5ff] border rounded-sm">
                                <SelectValue placeholder="Choose" className="font-[var(--font-inter)] text-lg" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {question.options.map((option) => (
                                    <SelectItem key={option} value={option}>{option}</SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          ) : (
                            <Input placeholder={question.question} className="h-12 text-lg border-[#DCDEE1] bg-[#FAFAFA]" {...field} />
                          )}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </form>
            </Form>

            <div className=' flex flex-row pt-[16px] justify-between'>
            {
              conditionStep != 1 ?
                <button
                  onClick={() => setConditionStep(conditionStep - 1)}
                  className=" max-h-[56px] w-fit h-full px-[32px] py-[16px] space-x-[10px] rounded-[62px] relative flex bg-[white] text-[#252932] border border-[#252932] text-[14px] font-semibold justify-center items-center hover:cursor-pointer"
                >
                  <div className=''>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="12" viewBox="0 0 18 12" fill="none">
                      <path d="M5.2929 11.7071C5.68342 12.0976 6.31659 12.0976 6.70711 11.7071C7.09763 11.3166 7.09763 10.6834 6.7071 10.2929L3.41419 7L17 7C17.5523 7 18 6.55228 18 6C18 5.44771 17.5523 5 17 5L3.41423 5L6.70707 1.7071C7.09759 1.31657 7.09759 0.683409 6.70706 0.292888C6.31653 -0.0976335 5.68337 -0.0976287 5.29285 0.292899L0.298225 5.2876C0.27977 5.30578 0.262016 5.32468 0.245012 5.34424C0.177454 5.42185 0.123865 5.50741 0.0842495 5.59762C0.0304489 5.71989 0.000417697 5.85497 3.81444e-06 5.99702L0 6C2.69961e-10 6.00309 1.3352e-05 6.00617 4.19625e-05 6.00925C0.00118257 6.13503 0.0255413 6.25525 0.0690403 6.36586C0.117815 6.49017 0.192434 6.60669 0.292896 6.70715L5.2929 11.7071Z" fill="#252932" />
                    </svg>
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-public-sans)",
                      fontWeight: 500, fontSize: "16px",
                      lineHeight: "24px",
                      letterSpacing: "0.02em"
                    }}
                  >Back</span>
                </button>
                : <></>
            }
            <button
              disabled={disabled}
              onClick={() => {
                if (conditionStep != 3) {
                  setConditionStep(Math.min(3, conditionStep + 1))
                }
                else {
                  form.handleSubmit(onSubmit)()
                }
              }}
              className={`${disabled ? "hover:cursor-not-allowed bg-[#252932]" : 'hover:cursor-pointer'} self-end max-h-[56px] w-fit h-full px-[32px] py-[16px] space-x-[10px] rounded-[62px] relative flex bg-[#0A50EC] text-white text-[14px] font-semibold justify-center items-center hover:cursor-pointer`}
            >
              {
                conditionStep != 3 ?
                  <>
                    <span
                      style={{
                        fontFamily: "var(--font-public-sans)",
                        fontWeight: 500, fontSize: "16px",
                        lineHeight: "24px",
                        letterSpacing: "0.02em"
                      }}
                    >Next</span>
                    <div className=''>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="12" viewBox="0 0 18 12" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12.5303 0.469668C12.2374 0.176776 11.7626 0.176778 11.4697 0.469672C11.1768 0.762566 11.1768 1.23744 11.4697 1.53033L15.1894 5.25H1C0.585786 5.25 0.25 5.58579 0.25 6C0.25 6.41421 0.585786 6.75 1 6.75H15.1893L11.4697 10.4697C11.1768 10.7626 11.1768 11.2374 11.4697 11.5303C11.7626 11.8232 12.2375 11.8232 12.5304 11.5303L17.5258 6.53486C17.542 6.51892 17.5575 6.50224 17.5722 6.48489C17.619 6.42974 17.6566 6.36941 17.685 6.30596C17.7268 6.21252 17.75 6.10898 17.75 6C17.75 5.99768 17.75 5.99537 17.75 5.99305C17.7491 5.90338 17.7323 5.81382 17.6996 5.72903C17.663 5.63451 17.6066 5.5459 17.5303 5.46963L12.5303 0.469668Z" fill="#FAFAFA" />
                      </svg>
                    </div>
                  </>
                  :
                  <span
                    style={{
                      fontFamily: "var(--font-public-sans)",
                      fontWeight: 500, fontSize: "16px",
                      lineHeight: "24px",
                      letterSpacing: "0.02em"
                    }}
                  >{disabled ? "Sending..." : "Get my Result"}</span>
              }
            </button>
            </div>
          </div>
        </motion.div>
      </section>

      <ContactUsSection />
      <div className="w-full flex flex-row items-center justify-evenly py-20 "
      >
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
      <RatingsAndReviews />

      <FaqsSection header={Header} faqItems={faqItems} />

      <DoctorsTestitmonial testimonial={Testimonial} />
      <Dialog open={appointmentConfirm} onOpenChange={() => setAppointmentConfirm(!appointmentConfirm)} >
        <DialogContent className=" rounded-[20px] p-[32px]" >
          <DialogTitle>
          </DialogTitle>
          <div className="bg-white flex flex-col space-y-[20px] items-center justify-center">
            <div className=" relative h-[100px] self-center flex w-full">
              <motion.div className="z-1 relative justify-center items-center flex w-full"
                animate={{
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="108" height="108" viewBox="0 0 108 108" fill="none">
                  <circle opacity="0.1" cx="54" cy="54" r="54" fill="#4CC2FF" />
                </svg>
                <motion.div className=" absolute top-1.5 z-2"
                  animate={{
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="86" height="86" viewBox="0 0 86 86" fill="none">
                    <circle opacity="0.2" cx="43" cy="43" r="43" fill="#4CC2FF" />
                  </svg>
                </motion.div>
                <motion.div className=" absolute top-4.5 z-3 "
                  animate={{
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
                    <circle cx="32" cy="32" r="32" fill="#4CC2FF" />
                  </svg>
                </motion.div>
                <motion.div className="absolute top-9.5 z-4"
                  animate={{
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12.1194 0.95737C11.4704 0.416553 10.5277 0.416554 9.87875 0.957371L7.72754 2.75005L4.49907 2.75005C3.53258 2.75005 2.74908 3.53355 2.74907 4.50005L2.74907 7.72851L0.956394 9.87973C0.415578 10.5287 0.415577 11.4714 0.956394 12.1204L2.74907 14.2716L2.74908 17.5001C2.74908 18.4666 3.53258 19.2501 4.49908 19.2501L7.72754 19.25L9.87875 21.0427C10.5277 21.5835 11.4704 21.5835 12.1194 21.0427L14.2706 19.25H17.4991C18.4656 19.25 19.2491 18.4665 19.2491 17.5L19.2491 14.2716L21.0417 12.1204C21.5826 11.4714 21.5826 10.5287 21.0418 9.87973L19.2491 7.72851L19.2491 4.50005C19.2491 3.53355 18.4656 2.75005 17.4991 2.75005L14.2706 2.75005L12.1194 0.95737ZM14.4611 9.38694C14.9509 9.13182 15.1412 8.52792 14.8861 8.03809C14.6309 7.54826 14.027 7.35799 13.5372 7.61311C12.1092 8.35684 10.9442 9.7806 10.1744 10.9032C10.1078 11.0004 10.0434 11.0964 9.98137 11.1907C9.84153 11.4033 9.71366 11.6073 9.59878 11.7971C9.51302 11.7245 9.42957 11.6575 9.35034 11.5963C9.32499 11.5767 9.30008 11.5577 9.27566 11.5393C9.06035 11.3772 8.86673 11.2494 8.72532 11.1612C8.65433 11.1169 8.59572 11.0821 8.55316 11.0575C8.53187 11.0451 8.51453 11.0353 8.50161 11.0281L8.48557 11.0191L8.48012 11.0161L8.47806 11.015L8.47644 11.0141C7.99113 10.7505 7.38401 10.9303 7.1204 11.4156C6.85685 11.9008 7.03677 12.5079 7.52183 12.7716L7.52391 12.7728L7.55058 12.788C7.576 12.8028 7.61582 12.8263 7.6667 12.8581C7.76905 12.9219 7.91292 13.0168 8.07261 13.1371C8.40619 13.3882 8.74611 13.7036 8.9523 14.0319C9.14601 14.3403 9.4921 14.519 9.85574 14.4984C10.2193 14.4778 10.543 14.2609 10.7007 13.9328L10.7032 13.9276L10.7159 13.9018C10.7276 13.878 10.746 13.8413 10.7707 13.7932C10.8202 13.6969 10.8947 13.5553 10.992 13.3804C11.187 13.0294 11.4706 12.5494 11.8239 12.0343C12.5541 10.9694 13.489 9.89321 14.4611 9.38694Z" fill="#FAFAFA" />
                  </svg>
                </motion.div>
              </motion.div>
            </div>

            <div className=" flex flex-col space-y-[10px] items-center justify-center">
              <h2
                style={{
                  fontFamily: 'var(--font-public-sans)',
                  fontWeight: 500,
                }}
                className='text-[black] text-2xl'
              >
                Your Appointment Request Is Confirmed
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-public-sans)',
                  fontWeight: 500,
                }}
                className='text-[#838890] text-md text-center'
              >
                You're one step closer to a pain-free life!<br />
                Please check your email for details. Our team will contact you shortly.<br />
                Thank you for choosing Mountain Spine & Orthopedic Center!
              </p>
            </div>
            <div
              onClick={() => {
                setAppointmentConfirm(false)
              }}
              className=" max-h-[56px] h-full px-[32px] py-[16px] rounded-[62px] relative flex bg-[#0A50EC] text-white text-[14px] font-semibold w-full justify-center items-center hover:cursor-pointer"
            >
              <span
                style={{
                  fontFamily: "var(--font-public-sans)",
                  fontWeight: 500, fontSize: "16px",
                  lineHeight: "24px",
                  letterSpacing: "0.02em"
                }}
              >Done</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
