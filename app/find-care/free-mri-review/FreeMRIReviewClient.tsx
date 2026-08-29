'use client'
import React, { useState } from 'react'
import PatientFormsLanding from '@/public/PatientFormsLanding.jpeg'
import OrthoDoctos from '@/public/OrthoDoctors.jpeg'
import Image from 'next/image'
import ContactUsSection from '@/components/ContactUsSection'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { m, motion, steps } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import RatingsAndReviews from '@/components/RatingsAndReviews'
import type { SocialProofReview } from '@/components/data/socialProofReviews'
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
import DoctorCard from '@/components/DoctorCard';
import FAQsSection from '@/components/FaqsSection';
import DoctorsTestitmonial from '@/components/DoctorsTestitmonial';
import { TextAnimate } from '@/components/magicui/text-animate'
import { Marquee } from '@/components/magicui/marquee'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { sendMRIContactEmail } from '@/components/email/sendcontactemail'
import { redirect } from 'next/navigation'
import { pushAcceptedLead } from '@/utils/enhancedConversions'
import { normalizeState } from '@/lib/stateUtils'
import { EMPTY_ATTRIBUTION, getAttributionData } from '@/lib/gclid'

const formSchema = z.object({
  // Step 1 Questions
  recent_diagnosis: z.string(),
  last_test_date: z.string(),
  other: z.string(),
  // Step 2 Questions
  first_name: z.string().min(2, "First name must be at least 2 characters"),
  last_name: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  state: z.string().min(2, "State must selected"),
  insurance_type: z.string().min(2, "Insurance type must be selected"),
  comments: z.string(),
  email_optout: z.string(),
  bestTime: z.string().min(1, "Please provide more detail about your consultation needs")

})

// 1. Define allowed field names

type FormFieldName =
  | "recent_diagnosis"
  | "last_test_date"
  | "other"
  | "first_name"
  | "last_name"
  | "email"
  | "phone"
  | "state"
  | "insurance_type"
  | "comments"
  | "email_optout"
  | "bestTime";

const faqItems: { question: string, answer: React.ReactNode }[] = [
  {
    question: 'Reason 1: Protect Yourself From Misdiagnosis',
    answer: (
      <p>
        One of the main reasons why you should seek a second opinion is to obtain an accurate, thorough and conclusive MRI diagnosis. Approximately 12 million people are misdiagnosed in the U.S. every year. Even the most seasoned radiologists are bound to make a mistake. So it's only right to have your results reviewed by a fresh pair of eyes.
      </p>
    )
  },
  {
    question: 'Reason 2: Your Diagnosis Is Not Final',
    answer: (
      <p>
        A second opinion from Orthopedic & Laser Spine Surgery can ensure that you receive the most effective treatment plan. Our experienced spine and orthopedic specialists provide valuable insights into your medical condition.
        <br /><br />A remote second opinion helps confirm your diagnosis, prevent unnecessary procedures, optimize treatment strategies, and bolster your confidence in making informed health decisions.
      </p>
    )
  },
  {
    question: 'Reason 3: There Are Many Suitable Treatments',
    answer: (
      <p>
        A second opinion from Orthopedic & Laser Spine Surgery can ensure that you receive the most effective treatment plan. Our experienced spine and orthopedic specialists provide valuable insights into your medical condition.
        <br /><br />A remote second opinion helps confirm your diagnosis, prevent unnecessary procedures, optimize treatment strategies, and bolster your confidence in making informed health decisions.
      </p>
    )
  },
  {
    question: 'Free MRI Review Today!',
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
    Request a Free MRI Review From Our Spine Specialists:<br /><br />A second opinion can be helpful after the first diagnosis. But it can be especially important when treatment options like surgery are recommended. Asking questions and gathering as much information about a diagnosis should be your priority as a patient. Keep in mind that radiologists are also human and are bound to mistakes. Obtaining a second opinion can make a world of difference in your diagnosis and treatment.
  </p>
)

const Header = (
  <span>
    Reasons Why You Should Seek Second Opinion
  </span>
)

// 2. Update FreeMriReviewSteps to type control as FormFieldName

const FreeMriReviewSteps = [

  {
    step: "Previous Diagnostic Tests",
    caption: "Please indicate any other tests you have had in the past",
    questions: [
      {
        question: "Have you recently had any diagnostic exams done?",
        control: "recent_diagnosis" as FormFieldName,
        options: [
          "MRI",
          "X-Ray",
          "CT Scan"
        ]
      },
      {
        question: "How long ago was it taken?",
        control: "last_test_date" as FormFieldName,
        options: [
          "Not Applicable",
          "A month or less",
          "One to six months",
          "Seven months to a year",
          "More than a year",
        ]
      },
      {
        question: "Other",
        control: "other" as FormFieldName,
        options: []
      }
    ]
  },
  {
    step: "Your Profile",
    caption: "Lastly, a few details about you helps us better protect your information and allows us to quickly give you a targeted diagnosis.",
    questions: [
      {
        question: "First Name",
        control: "first_name" as FormFieldName,
        options: []
      },
      {
        question: "Last Name",
        control: "last_name" as FormFieldName,
        options: []
      },
      {
        question: "Email",
        control: "email" as FormFieldName,
        options: []
      },
      {
        question: "Phone",
        control: "phone" as FormFieldName,
        options: []
      },
      {
        question: "State",
        control: "state" as FormFieldName,
        options: ["Florida", "New Jersey", "New York", "Pennsylvania"]
      },
      {
        question: "Insurance Type",
        control: "insurance_type" as FormFieldName,
        options: [
          "Blue Cross Blue Shield", "Aetna", "Cigna Healthcare", "United Healthcare", "Meritan Health", "Bright Health Group", "Multiplan", "Self-pay"
        ]
      },
      {
        question: "Best Time to Call",
        control: "bestTime" as FormFieldName,
        options: ["As Soon As Possible", "Morning", "Afternoon", "Evening"]
      },
      {
        question: "Comments",
        control: "comments" as FormFieldName,
        options: []
      },
      {
        question: 'Email Opt Out',
        control: "email_optout" as FormFieldName,
        options: []
      }
    ]
  }
]

export default function FreeMRIReviewClient({ reviews }: { reviews: SocialProofReview[] }) {
  const [ConditionStep, setConditionStep] = useState(1)
  const [openAppointmentConfirm, setAppointmentConfirm] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [attribution, setAttribution] = useState(EMPTY_ATTRIBUTION)

  React.useEffect(() => {
    setAttribution(getAttributionData())
  }, [])

  const ConditionForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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
      bestTime: "",
      email_optout: "false"
    },
  })
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setDisabled(true)
    const data = await sendMRIContactEmail({
      ...values,
      gclid: attribution.gclid,
      gbraid: attribution.gbraid,
      wbraid: attribution.wbraid,
      utm_source: attribution.utm_source,
      utm_medium: attribution.utm_medium,
      utm_campaign: attribution.utm_campaign,
      utm_term: attribution.utm_term,
      utm_content: attribution.utm_content,
    })
    if (data) {
      await pushAcceptedLead({ acceptance: data, form_name: 'FreeMRIReviewForm', form_source: 'free-mri-review', state: normalizeState(values.state), email: values.email, phone: values.phone, firstName: values.first_name, lastName: values.last_name })
      ConditionForm.reset()
      redirect('/thank-you')
      setDisabled(false)
    }

  }
  return (
    <>
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
            alt="Get a free MRI review from Mountain Spine & Orthopedics orthopedic specialists"
          />
          <div
            className="w-full h-[100px] absolute bottom-0 z-[1]"
            style={{
              background: 'linear-gradient(to bottom, transparent 0%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 1) 100%)',
            }}
          />
          <div className="z-[2] flex flex-col w-full h-full text-left relative pt-32 lg:pt-26 pb-20 px-6 lg:px-[80px]">
            <div className='max-w-[1440px] w-full flex flex-col items-start justify-start'>
              <h1
                style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
                className='text-[#252932] text-3xl md:text-6xl'
              >
                Get a Free MRI Review
              </h1>
              <p
                style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
                className='text-[#252932] text-lg md:text-xl mt-2'
              >
                This tool enables you to easily and securely send us those results, where they will be reviewed by a certified orthopedic specialist.
              </p>
            </div>
          </div>
        </section>

        <section className='w-full h-full flex flex-col items-center relative overflow-hidden bg-white py-[50px] px-6 xl:px-[80px]'>
          <div className='flex flex-col items-center justify-center max-w-[1440px] w-full lg:px-[200px]'>
            <div className='w-full mb-6'>
              <div
                className='flex flex-row space-x-[4px] rounded-[62px] w-fit items-center justify-center px-[20px] py-[10px]'
                style={{ background: 'rgba(255, 255, 255, 0.5)' }}
              >
                <span className='text-black' style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 400 }}>Find Care</span>
                <span className='text-black' style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 400 }}>/</span>
                <span className='text-[#2358AC]' style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 400 }}>Get a Free MRI Review</span>
              </div>
            </div>
            <div className=' bg-[#252932] rounded-t-[24px] rounded-b-0 w-full p-[16px]'>
              <h2 style={{ fontFamily: "var(--font-public-sans)", fontWeight: 400 }} className="text-white text-3xl text-center self-center">
                Step {ConditionStep}: {FreeMriReviewSteps[ConditionStep - 1].step}
              </h2>
            </div>
            <div className='bg-[#E0F5FF] border border-black rounded-b-[24px] p-[16px] space-y-[24px] flex flex-col w-full'>
              <h3 style={{ fontFamily: "var(--font-public-sans)", fontWeight: 400 }} className="text-[#424959] text-lg text-left w-full">
                {FreeMriReviewSteps[ConditionStep - 1].caption}
              </h3>
              {
                ConditionStep == 2 ?
                  <div className='flex-col space-y-[16px] '>
                    {
                      ["100% Secure", "Your information is never shared", "We are HIPAA compliant", "We hate spam"].map((item) => (
                        <div className=' flex flex-row space-x-[12px] items-center'
                          key={item}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M17.3543 0.340991C17.0821 0.0763472 16.6468 0.082532 16.3822 0.354805C16.1175 0.627078 16.1237 1.06233 16.396 1.32698C16.5441 1.47095 16.7798 1.65633 17.0041 1.83254L17.0563 1.87353C17.2816 2.05037 17.5225 2.23947 17.7504 2.4326L17.7569 2.43815H13.6668C13.2871 2.43815 12.9793 2.74596 12.9793 3.12565C12.9793 3.50535 13.2871 3.81315 13.6668 3.81315H17.7569L17.7504 3.81871C17.5225 4.01183 17.2816 4.20092 17.0564 4.37775L17.0563 4.37777L17.0041 4.41876C16.7798 4.59497 16.5441 4.78035 16.396 4.92432C16.1237 5.18897 16.1175 5.62422 16.3822 5.8965C16.6468 6.16877 17.0821 6.17496 17.3543 5.91031C17.438 5.829 17.6047 5.69551 17.8535 5.50009L17.9084 5.45695L17.9085 5.45691C18.1304 5.28269 18.3908 5.07832 18.6393 4.86774C18.9056 4.64206 19.1823 4.38945 19.3973 4.13693C19.5051 4.01039 19.6114 3.86776 19.6935 3.71431C19.7727 3.56633 19.8543 3.36241 19.8543 3.12565C19.8543 2.88889 19.7727 2.68498 19.6935 2.53699C19.6114 2.38355 19.5051 2.24092 19.3973 2.11437C19.1823 1.86185 18.9056 1.60924 18.6393 1.38356C18.3908 1.17298 18.1304 0.968591 17.9084 0.794364L17.9084 0.79435L17.8535 0.751216C17.6047 0.555789 17.438 0.422301 17.3543 0.340991ZM7.01838 6.18505C7.34059 5.93781 7.70434 5.71036 8.12841 5.65797C8.51562 5.61013 9.0653 5.69579 9.79529 6.30588L11.0459 7.48151L8.59969 7.48151C8.21999 7.48151 7.91219 7.78931 7.91219 8.16901C7.91219 8.5487 8.21999 8.85651 8.59969 8.85651L17.7886 8.85651C18.1714 8.85651 18.4799 9.16604 18.4799 9.54563C18.4799 9.92522 18.1714 10.2348 17.7886 10.2348H10.849C10.4693 10.2348 10.1615 10.5426 10.1615 10.9223C10.1615 11.3019 10.4693 11.6098 10.849 11.6098H12.9877L12.9811 11.8713C12.9707 12.2774 12.7498 12.6308 12.4204 12.827C12.2488 12.9292 12.0485 12.988 11.8328 12.988H10.9126C10.5329 12.988 10.2251 13.2958 10.2251 13.6755C10.2251 14.0552 10.5329 14.363 10.9126 14.363H11.8328C11.9044 14.363 11.9755 14.36 12.0457 14.3541L12.035 14.6139L12.0347 14.6245C12.0249 15.0098 11.8258 15.3473 11.5241 15.5487C11.3418 15.6704 11.1232 15.7412 10.8864 15.7412H9.96631C9.58662 15.7412 9.27881 16.049 9.27881 16.4287C9.27881 16.8084 9.58662 17.1162 9.96631 17.1162H10.8864C10.9383 17.1162 10.9898 17.1147 11.041 17.1116L10.9814 17.4642C10.9801 17.4717 10.979 17.4793 10.978 17.4868C10.9007 18.0585 10.4089 18.4849 9.82894 18.4796H6.57007C6.04797 18.4796 5.57546 18.4365 5.14987 18.2965C4.72819 18.1578 4.34164 17.9858 4.12525 17.8157C3.97047 17.6941 3.83933 17.5806 3.71449 17.4711L3.66964 17.4316C3.56295 17.3378 3.45017 17.2387 3.33935 17.1511C3.06497 16.9343 2.75373 16.7479 2.31157 16.6742C1.78528 16.5864 1.1519 16.5763 0.833496 16.5763C0.4538 16.5763 0.145996 16.8841 0.145996 17.2638C0.145996 17.6435 0.4538 17.9513 0.833496 17.9513C1.14552 17.9513 1.68036 17.9629 2.08545 18.0304C2.22541 18.0538 2.32555 18.1025 2.4868 18.2299C2.56731 18.2935 2.65056 18.3666 2.76141 18.464L2.80769 18.5047C2.93717 18.6183 3.09079 18.7516 3.27558 18.8968C3.68878 19.2216 4.2662 19.4533 4.72018 19.6027C5.34605 19.8086 5.98531 19.8546 6.57007 19.8546H9.81971C11.0855 19.8645 12.1635 18.936 12.3389 17.683L12.5387 16.5008C13.0544 16.0543 13.3888 15.4002 13.4091 14.6653L13.4453 13.7812C13.985 13.333 14.3364 12.6624 14.3556 11.9063L14.3632 11.6098H17.7886C18.9288 11.6098 19.8549 10.6866 19.8549 9.54563C19.8549 8.40464 18.9288 7.48151 17.7886 7.48151H13.0535L10.7229 5.29076C10.7138 5.2822 10.7045 5.27389 10.6949 5.26584C9.72042 4.44507 8.79509 4.19014 7.95981 4.29334C7.16435 4.39163 6.56052 4.8039 6.18889 5.08839L2.55473 7.7234C2.35926 7.86513 2.12404 7.94143 1.88267 7.94143H0.844315C0.464619 7.94143 0.156815 8.24923 0.156815 8.62893C0.156815 9.00863 0.464619 9.31643 0.844315 9.31643H1.88267C2.41399 9.31643 2.93171 9.14847 3.36186 8.83658L7.00342 6.19621L7.01838 6.18505Z" fill="#219653" />
                          </svg>
                          <span style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500 }} className="text-[#424959] text-lg text-left w-full">
                            {item}
                          </span>
                        </div>
                      ))
                    }
                  </div>
                  :
                  <></>
              }
              <Form {...ConditionForm}>
                <form className=' flex flex-col space-y-[24px] ' >
                  {
                    FreeMriReviewSteps[ConditionStep - 1].questions.map((question) => (
                      <FormField
                        control={ConditionForm.control}
                        name={question.control}
                        key={question.question}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              <div key={question.question}>
                                <h3 style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500 }} className="text-black text-lg text-left w-full">
                                  {question.question}
                                </h3>
                              </div>
                            </FormLabel>
                            <FormControl>
                              {
                                question.question == "Where is your pain? (Choose all that apply)" || question.question == "Do you have any of the following symptoms? (choose all that apply)?" ?
                                  <div className=' flex flex-col space-y-[16px]'>
                                    {question.options.map((option) => {
                                      // Check if this option is currently selected in the form state
                                      const isChecked = field.value?.includes(option) ?? false;

                                      // Handler to toggle the selection
                                      const handleToggle = () => {
                                        const currentValues = Array.isArray(field.value) ? [...field.value] : [];
                                        let newValues;

                                        if (isChecked) {
                                          // Remove the option
                                          newValues = currentValues.filter(item => item !== option);
                                        } else {
                                          // Add the option
                                          newValues = [...currentValues, option];
                                        }
                                        // Update the form field state
                                        field.onChange(newValues);
                                      };
                                      return (
                                        <div className=' flex flex-row space-x-[12px] items-center'
                                          key={option}
                                          onClick={handleToggle}>
                                          <div >
                                            {
                                              // CheckMark Box
                                              isChecked ?
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                  <path fillRule="evenodd" clipRule="evenodd" d="M10.0523 0.603516C12.0608 0.603516 13.6383 0.603521 14.8694 0.769438C16.1317 0.939021 17.1327 1.29378 17.9192 2.08028C18.7057 2.86678 19.0604 3.86776 19.23 5.13001C19.3959 6.36109 19.3959 7.93868 19.3959 9.94709V10.0516C19.3959 12.06 19.3959 13.6376 19.23 14.8687C19.0604 16.1309 18.7057 17.1319 17.9192 17.9184C17.1327 18.7049 16.1317 19.0597 14.8694 19.2293C13.6383 19.3952 12.0608 19.3952 10.0523 19.3952H9.94783C7.93941 19.3952 6.36182 19.3952 5.13074 19.2293C3.86849 19.0597 2.86751 18.7049 2.08101 17.9184C1.29451 17.1319 0.939753 16.1309 0.77017 14.8687C0.604253 13.6376 0.604248 12.06 0.604248 10.0516V9.94709C0.604248 7.93868 0.604253 6.36109 0.77017 5.13001C0.939753 3.86776 1.29451 2.86678 2.08101 2.08028C2.86751 1.29378 3.86849 0.939021 5.13074 0.769438C6.36182 0.603521 7.93941 0.603516 9.94783 0.603516H10.0523ZM14.4716 6.35101C14.7145 6.7956 14.5513 7.35294 14.1068 7.59585C12.85 8.28335 11.6693 9.72252 10.7673 11.1021C10.3283 11.7749 9.97534 12.4019 9.73334 12.8593C9.61234 13.0885 9.51976 13.2737 9.45742 13.4011L9.36759 13.589C9.22551 13.8988 8.92392 14.1042 8.58384 14.1234C8.24375 14.1418 7.92199 13.9703 7.74691 13.6788C7.46182 13.2022 7.00992 12.7677 6.59009 12.4359C6.38659 12.2745 6.20324 12.148 6.07216 12.0618L5.87875 11.9418C5.43967 11.6906 5.28659 11.1305 5.53776 10.6914C5.788 10.2514 6.34808 10.0984 6.78808 10.3495L7.07684 10.5283C7.24368 10.6383 7.47283 10.7968 7.72674 10.9976C7.92199 11.1516 8.13926 11.3368 8.35834 11.5494C8.59392 11.1268 8.88815 10.6273 9.23282 10.1002C10.1651 8.67294 11.5511 6.90376 13.2267 5.9871C13.6713 5.74418 14.2287 5.90734 14.4716 6.35101Z" fill="#252932" />
                                                </svg>
                                                :
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                  <path fillRule="evenodd" clipRule="evenodd" d="M2.081 17.9184C3.55775 19.3952 5.711 19.3952 10.0001 19.3952C14.2892 19.3952 16.4424 19.3943 17.9192 17.9184C19.3959 16.4426 19.3959 14.2884 19.3959 9.99935C19.3959 5.71027 19.395 3.55703 17.9192 2.08028C16.4433 0.603525 14.2892 0.603516 10.0001 0.603516C5.711 0.603516 3.55775 0.603525 2.081 2.08028C0.604248 3.55611 0.604248 5.71026 0.604248 9.99934V9.99935V9.99936C0.604248 14.2884 0.604248 16.4417 2.081 17.9184ZM10 1.97852H10.0001H10.0001C13.9106 1.97852 15.8741 1.97852 16.9475 3.05193C18.0209 4.12626 18.0209 6.08884 18.0209 9.99933V9.99935V9.99937C18.0209 13.9099 18.0209 15.8734 16.9475 16.9468C15.8732 18.0202 13.9106 18.0202 10.0001 18.0202H10.0001H10.0001C6.08958 18.0202 4.127 18.0202 3.05267 16.9468C1.97925 15.8724 1.97925 13.9099 1.97925 9.99935C1.97925 6.08885 1.97925 4.12535 3.05267 3.05193C4.127 1.97852 6.08957 1.97852 10 1.97852ZM7.84688 13.9575C7.98805 14.1985 8.24563 14.3452 8.5243 14.3452H8.54814C8.83505 14.337 9.09263 14.1729 9.2228 13.9171C9.83605 12.7016 10.7435 11.0956 11.4521 10.2312L11.5851 10.069L11.5909 10.0618C11.9761 9.59031 12.2107 9.30316 12.6649 8.86629C12.9115 8.62979 13.0609 8.49505 13.3506 8.27505C13.5449 8.12655 13.896 7.91205 14.0142 7.84238C14.3415 7.64988 14.4505 7.22821 14.258 6.90096C14.0655 6.57371 13.6439 6.46464 13.3166 6.65714C13.2653 6.68739 12.8115 6.95597 12.5173 7.18055C12.1772 7.43813 11.9866 7.60956 11.7106 7.87539C11.1978 8.36908 10.9293 8.69742 10.5254 9.19142L10.5199 9.19813L10.3879 9.35947C9.69488 10.2056 8.9423 11.5127 8.45005 12.4257C8.27771 12.2195 8.0843 12.0224 7.87439 11.8629C7.47499 11.5596 6.873 11.1375 6.74807 11.0499C6.73595 11.0414 6.72832 11.036 6.7258 11.0342C6.41413 10.817 5.98605 10.893 5.7688 11.2047C5.55155 11.5164 5.62763 11.9445 5.9393 12.1617C5.93966 12.162 5.94218 12.1637 5.94667 12.1669C6.02181 12.2195 6.65025 12.6599 7.04205 12.9574C7.29046 13.1462 7.5838 13.511 7.84688 13.9575Z" fill="#838890" />
                                                </svg>

                                            }
                                          </div>

                                          <span style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500 }} className="text-[#424959] text-lg text-left w-full">
                                            {option}
                                          </span>
                                        </div>
                                      )
                                    })}
                                  </div>
                                  : question.options.length > 0 ?
                                    <Select
                                      // Pass the field's onChange handler to the Select component.
                                      // This updates React Hook Form's state when the select value changes.
                                      onValueChange={field.onChange}
                                      // Use field.value to make it a controlled component.
                                      // Ensure defaultValues provides an initial empty string or valid option.
                                      value={field.value || ""}
                                    // defaultValue={field.value} // Can also use defaultValue, but `value` is standard for controlled
                                    >
                                      <SelectTrigger aria-label="Choose"
                                        className="w-full h-12 px-6 bg-[#f0f5ff] border rounded-sm"
                                      >
                                        {/* Note: className on SelectValue might have limited effect; style Trigger/Item */}
                                        <SelectValue
                                          placeholder="Choose"
                                          className="font-[var(--font-inter)] text-lg" // Apply font/text styles here if needed
                                        />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {/* SelectGroup is optional but fine */}
                                        <SelectGroup>
                                          {question.options.map((service) => (
                                            <SelectItem key={service} value={service}>
                                              {service}
                                            </SelectItem>
                                          ))}
                                        </SelectGroup>
                                      </SelectContent>
                                    </Select>
                                    :
                                    question.question == 'Comments' || question.question == 'Other' ?
                                      <Textarea placeholder={question.question} className={`min-h-[200px] text-lg resize-none  border-[#DCDEE1]  bg-[#FAFAFA]`} {...field} />
                                      :
                                      question.question == 'Email Opt Out' ?
                                        <div className=' flex flex-row items-center justify-start space-x-[12px] w-full hover:cursor-pointer'
                                          onClick={() => field.onChange(field.value == 'false' ? 'true' : 'false')}
                                        >
                                          {
                                            field.value == 'true' ?
                                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M10.0526 0.604126C12.061 0.604126 13.6386 0.604131 14.8697 0.770048C16.1317 0.939021 17.1327 1.29378 17.9192 2.08028C18.7057 2.86678 19.0604 3.86776 19.23 5.13001C19.3959 6.36109 19.3959 7.93868 19.3959 9.94709V10.0516C19.3959 12.06 19.3959 13.6376 19.23 14.8687C19.0604 16.1309 18.7057 17.1319 17.9192 17.9184C17.1327 18.7049 16.1317 19.0597 14.8694 19.2293C13.6383 19.3952 12.0608 19.3952 10.0523 19.3952H9.94783C7.93941 19.3952 6.36182 19.3952 5.13074 19.2293C3.86849 19.0597 2.86751 18.7049 2.08101 17.9184C1.29451 17.1319 0.939753 16.1309 0.77017 14.8687C0.604253 13.6376 0.604248 12.06 0.604248 10.0516V9.94709C0.604248 7.93868 0.604253 6.36109 0.77017 5.13001C0.939753 3.86776 1.29451 2.86678 2.08101 2.08028C2.86751 1.29378 3.86849 0.939021 5.13074 0.769438C6.36182 0.603521 7.93941 0.603516 9.94783 0.603516H10.0523ZM14.4718 6.35162C14.7147 6.79621 14.5516 7.35355 14.107 7.59646C12.8502 8.28396 11.6696 9.72313 10.7676 11.1027C10.3285 11.7755 9.97558 12.4025 9.73358 12.86C9.61259 13.0891 9.52 13.2743 9.45742 13.4011L9.36759 13.589C9.22551 13.8988 8.92392 14.1042 8.58384 14.1234C8.24375 14.1418 7.92199 13.9703 7.74691 13.6788C7.46182 13.2022 7.00992 12.7677 6.59009 12.4359C6.38659 12.2745 6.20324 12.148 6.07216 12.0618L5.87875 11.9418C5.43967 11.6906 5.28659 11.1305 5.53776 10.6914C5.788 10.2514 6.34808 10.0984 6.78808 10.3495L7.07684 10.5283C7.24368 10.6383 7.47283 10.7968 7.72674 10.9976C7.92199 11.1516 8.13926 11.3368 8.35834 11.5494C8.59392 11.1268 8.88815 10.6273 9.23282 10.1002C10.1651 8.67294 11.5511 6.90376 13.2267 5.9871C13.6713 5.74418 14.2287 5.90734 14.4716 6.35101Z" fill="#252932" />
                                              </svg>
                                              :
                                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M2.081 17.9184C3.55775 19.3952 5.711 19.3952 10.0001 19.3952C14.2892 19.3952 16.4424 19.3943 17.9192 17.9184C19.3959 16.4426 19.3959 14.2884 19.3959 9.99935C19.3959 5.71027 19.395 3.55703 17.9192 2.08028C16.4433 0.603525 14.2892 0.603516 10.0001 0.603516C5.711 0.603516 3.55775 0.603525 2.081 2.08028C0.604248 3.55611 0.604248 5.71026 0.604248 9.99934V9.99935V9.99936C0.604248 14.2884 0.604248 16.4417 2.081 17.9184ZM10 1.97852H10.0001H10.0001C13.9106 1.97852 15.8741 1.97852 16.9475 3.05193C18.0209 4.12626 18.0209 6.08884 18.0209 9.99933V9.99935V9.99937C18.0209 13.9099 18.0209 15.8734 16.9475 16.9468C15.8732 18.0202 13.9106 18.0202 10.0001 18.0202H10.0001H10.0001C6.08958 18.0202 4.127 18.0202 3.05267 16.9468C1.97925 15.8724 1.97925 13.9099 1.97925 9.99935C1.97925 6.08885 1.97925 4.12535 3.05267 3.05193C4.127 1.97852 6.08957 1.97852 10 1.97852ZM7.84688 13.9575C7.98805 14.1985 8.24563 14.3452 8.5243 14.3452H8.54814C8.83505 14.337 9.09263 14.1729 9.2228 13.9171C9.83605 12.7016 10.7435 11.0956 11.4521 10.2312L11.5851 10.069L11.5909 10.0618C11.9761 9.59031 12.2107 9.30316 12.6649 8.86629C12.9115 8.62979 13.0609 8.49505 13.3506 8.27505C13.5449 8.12655 13.896 7.91205 14.0142 7.84238C14.3415 7.64988 14.4505 7.22821 14.258 6.90096C14.0655 6.57371 13.6439 6.46464 13.3166 6.65714C13.2653 6.68739 12.8115 6.95597 12.5173 7.18055C12.1772 7.43813 11.9866 7.60956 11.7106 7.87539C11.1978 8.36908 10.9293 8.69742 10.5254 9.19142L10.5199 9.19813L10.3879 9.35947C9.69488 10.2056 8.9423 11.5127 8.45005 12.4257C8.27771 12.2195 8.0843 12.0224 7.87439 11.8629C7.47499 11.5596 6.873 11.1375 6.74807 11.0499C6.73595 11.0414 6.72832 11.036 6.7258 11.0342C6.41413 10.817 5.98605 10.893 5.7688 11.2047C5.55155 11.5164 5.62763 11.9445 5.9393 12.1617C5.93966 12.162 5.94218 12.1637 5.94667 12.1669C6.02181 12.2195 6.65025 12.6599 7.04205 12.9574C7.29046 13.1462 7.5838 13.511 7.84688 13.9575Z" fill="#838890" />
                                              </svg>

                                          }
                                          <p>I don't want to receive occasional emails from Mountain Spine Orthopedics.</p>
                                        </div>
                                        :
                                        <Input placeholder={question.question} className="h-12 text-lg  border-[#DCDEE1] bg-[#FAFAFA]" {...field} />
                              }
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))
                  }
                </form>
              </Form>

              <div className=' flex flex-row pt-[16px] justify-between'>
              {
                ConditionStep != 1 ?
                  <button
                    onClick={() => setConditionStep(ConditionStep - 1)}
                    className=" max-h-[56px] w-fit h-full px-[32px] py-[16px] space-x-[10px] rounded-[62px] relative flex bg-[white] text-[#252932] border border-[#252932] text-[14px] font-semibold justify-center items-center hover:cursor-pointer"
                  >
                    <div className=''>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="12" viewBox="0 0 18 12" fill="none">
                        <path d="M5.2929 11.7071C5.68342 12.0976 6.31659 12.0976 6.70711 11.7071C7.09763 11.3166 7.09763 10.6834 6.7071 10.2929L3.41419 7L17 7C17.5523 7 18 6.55228 18 6C18 5.44771 17.5523 5 17 5L3.41423 5L6.70707 1.7071C7.09759 1.31657 7.09759 0.683409 6.70706 0.292888C6.31653 -0.0976335 5.68337 -0.0976287 5.29285 0.292899L0.298225 5.2876C0.27977 5.30578 0.262016 5.32468 0.245012 5.34424C0.177454 5.42185 0.123865 5.50741 0.0842495 5.59762C0.0304489 5.71989 0.000417697 5.85497 3.81444e-06 5.99702L0 6C2.69961e-10 6.00309 1.3352e-05 6.00617 4.19625e-05 6.00925C0.00118257 6.13503 0.0255413 6.25525 0.0690403 6.36586C0.117815 6.49017 0.192434 6.60669 0.292896 6.70715L5.2929 11.7071Z" fill="#252932" />
                      </svg>
                    </div>
                    <h3 style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500, fontSize: "16px", lineHeight: "24px", letterSpacing: "0.02em" }}>Back</h3>

                  </button>
                  : <></>
              }
              <button
                disabled={disabled}
                onClick={
                  () => {
                    // const parse = formSchema.safeParse(ConditionForm.getValues());
                    // const error = parse.error?.issues.find(
                    //     (i) => i.path[0] == "recent_diagnosis" || i.path[0] == "last_test_date" || i.path[0] == "other"
                    // );
                    // if(!error){
                    //     setConditionStep(Math.min(2,ConditionStep + 1))
                    // }
                    if (ConditionStep != 2) {
                      setConditionStep(Math.min(2, ConditionStep + 1))
                    }
                    else {
                      ConditionForm.handleSubmit(onSubmit)()
                      ConditionForm.reset()
                    }

                  }}
                className={`${disabled ? "hover:cursor-not-allowed bg-[#252932]" : 'hover:cursor-pointer'} self-end max-h-[56px] w-fit h-full px-[32px] py-[16px] space-x-[10px] rounded-[62px] relative flex bg-[#0A50EC] text-white text-[14px] font-semibold justify-center items-center hover:cursor-pointer`}
              >
                {
                  ConditionStep != 2 ?
                    <>
                      <p style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500, fontSize: "16px", lineHeight: "24px", letterSpacing: "0.02em" }}>Next</p>
                      <div className=''>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="12" viewBox="0 0 18 12" fill="none">
                          <path fillRule="evenodd" clipRule="evenodd" d="M12.5303 0.469668C12.2374 0.176776 11.7626 0.176778 11.4697 0.469672C11.1768 0.762566 11.1768 1.23744 11.4697 1.53033L15.1894 5.25H1C0.585786 5.25 0.25 5.58579 0.25 6C0.25 6.41421 0.585786 6.75 1 6.75H15.1893L11.4697 10.4697C11.1768 10.7626 11.1768 11.2374 11.4697 11.5303C11.7626 11.8232 12.2375 11.8232 12.5304 11.5303L17.5258 6.53486C17.542 6.51892 17.5575 6.50224 17.5722 6.48489C17.619 6.42974 17.6566 6.36941 17.685 6.30596C17.7268 6.21252 17.75 6.10898 17.75 6C17.75 5.99768 17.75 5.99537 17.75 5.99305C17.7491 5.90338 17.7323 5.81382 17.6996 5.72903C17.663 5.63451 17.6066 5.5459 17.5303 5.46963L12.5303 0.469668Z" fill="#FAFAFA" />
                        </svg>
                      </div>
                    </>
                    :
                    <p
                      style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500, fontSize: "16px", lineHeight: "24px", letterSpacing: "0.02em" }}
                    >{disabled ? "Sending..." : "Claim my FREE Review"}</p>
              }
            </button>
              </div>
            </div>
          </div>
        </section>

        <ContactUsSection />
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
        <RatingsAndReviews reviews={reviews} />

        <FAQsSection header={Header} faqItems={faqItems} />

        <DoctorsTestitmonial testimonial={Testimonial} />

        <Dialog open={openAppointmentConfirm} onOpenChange={() => setAppointmentConfirm(!openAppointmentConfirm)} >
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
                <h1 style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500 }} className='text-[black] text-2xl'>
                  Your Appointment Request Is Confirmed
                </h1>
                <h3 style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500 }} className='text-[#838890] text-md text-center'>
                  You're one step closer to effective pain management!<br />
                  Please check your email for details. Our team will contact you shortly.<br />
                  Thank you for choosing Mountain Spine & Orthopedic Center!
                </h3>
              </div>
              <div
                onClick={() => {
                  setAppointmentConfirm(false)
                }}
                className=" max-h-[56px] h-full px-[32px] py-[16px] rounded-[62px] relative flex bg-[#0A50EC] text-white text-[14px] font-semibold w-full justify-center items-center hover:cursor-pointer"
              >
                <h3 style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500, fontSize: "16px", lineHeight: "24px", letterSpacing: "0.02em" }}>Done</h3>
              </div>
            </div>
          </DialogContent>
        </Dialog>

      </main>
    </>
  )
}
