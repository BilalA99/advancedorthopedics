"use client"
import React, { useState, useEffect } from 'react'
import { m, motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { sendConditionCheckEmail } from '@/components/email/sendcontactemail'
import { useRouter } from 'next/navigation'
import { EMPTY_ATTRIBUTION, getAttributionData } from '@/lib/gclid'
import { pushAcceptedLead } from '@/utils/enhancedConversions'


const formSchema = z.object({
  // Step 1 Questions
  pain_area: z.string().array().nonempty({
    message: "Can't be empty!"
  }),
  pain_strongest: z.string().nonempty({ message: "Choose an area " }),
  pain_length: z.string().nonempty({ message: " " }),
  pain_desc: z.string().nonempty({}),
  pain_always: z.string(),
  // Step 2 Questions
  pain_symptoms: z.string().array().nonempty({
    message: "Can't be empty!"
  }),
  pain_worst: z.string().nonempty({ message: "Choose an area " }),
  pain_feel_better: z.string().nonempty({ message: " " }),
  pain_source: z.string().nonempty({}),
  pain_test: z.string(),
  // Step 3 Questions
  first_name: z.string().min(2),
  last_name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  state: z.string(),
  insurance_type: z.string(),
  comments: z.string(),
  email_optout: z.string()
})

interface ConditionCheckSectionProps {
  steps: Array<{
    step: string,
    caption: string,
    questions: Array<{
      question: string,
      control: string,
      options: string[]
    }>
  }>,
  initialValues: Record<string, any>,
  onSubmit?: (values: any) => Promise<void>
}


export default function ConditionCheckSection({
  steps,
  initialValues,
  onSubmit: parentOnSubmit
}: ConditionCheckSectionProps) {
  const [ConditionStep, setConditionStep] = useState(1)
  const [openAppointmentConfirm, setAppointmentConfirm] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [attribution, setAttribution] = useState(EMPTY_ATTRIBUTION)
  const router = useRouter()

  useEffect(() => {
    setAttribution(getAttributionData())
  }, [])

  const ConditionForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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
    },
  })
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setDisabled(true)
    const data = await sendConditionCheckEmail({
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
      await pushAcceptedLead({
        acceptance: data,
        form_name: 'ConditionCheckForm',
        form_source: 'condition-check',
        state: values.state,
        email: values.email,
        phone: values.phone,
        firstName: values.first_name,
        lastName: values.last_name,
      })
      ConditionForm.reset()
      //setAppointmentConfirm(true)
      setDisabled(false)
      router.push('/thank-you')
    }
  }
  return (
    <section className='w-full h-full flex flex-col relative overflow-hidden [mask-composite:intersect] [mask-image:linear-gradient(to_top,transparent,black_6rem)] bg-[#FAFAFA] py-[50px] px-6 lg:px-[80px]' aria-label="Condition Check Form">
      <div className=' flex flex-row md:space-x-[20px] items-center justify-center max-w-[1440px]' role="list" aria-label="Condition Check Steps">
        {steps.map((step, index) => (
          <div className=' flex flex-row space-x-[12px] items-center justify-center' key={index} role="listitem">
            <div className={` h-[40px] w-[40px] flex items-center  justify-center rounded-full ${ConditionStep == index + 1 ? ' bg-[#0A50EC] text-white ' : 'bg-[#EFF1F4] text-[#0A50EC] md:flex hidden'}`}>
              <span style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }} className=' text-lg'>{index + 1}</span>
            </div>
            <span style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }} className={`text-black text-xl ${ConditionStep == index + 1 ? 'flex' : ' lg:flex hidden'}`}>{step.step}</span>
            {index + 1 != steps.length ? (
              <div className={`md:flex hidden`} aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="122" height="10" viewBox="0 0 122 8" fill="none">
                  <path d="M1 3.5C0.723858 3.5 0.5 3.72386 0.5 4C0.5 4.27614 0.723858 4.5 1 4.5V3.5ZM121.354 4.35355C121.549 4.15829 121.549 3.84171 121.354 3.64645L118.172 0.464466C117.976 0.269204 117.66 0.269204 117.464 0.464466C117.269 0.659728 117.269 0.976311 117.464 1.17157L120.293 4L117.464 6.82843C117.269 7.02369 117.269 7.34027 117.464 7.53553C117.66 7.7308 117.976 7.7308 118.172 7.53553L121.354 4.35355ZM1 4.5H121V3.5H1V4.5Z" fill="#838890" />
                </svg>
              </div>
            ) : null}
          </div>
        ))}
      </div>
      <motion.div className='flex flex-col items-center justify-center max-w-[1440px] mt-[50px] overflow-hidden' layout transition={{ duration: 0.3, ease: "easeInOut" }}>
        <div className=' bg-[#252932] rounded-t-[24px] rounded-b-0 w-full p-[16px]'>
          <h2 style={{ fontFamily: "var(--font-public-sans)", fontWeight: 400 }} className="text-white text-3xl text-center self-center" id="condition-check-step-title">
            Step {ConditionStep}: {steps[ConditionStep - 1].step}
          </h2>
        </div>
        <div className='bg-white p-[16px] space-y-[24px] flex flex-col w-full'>
          <p style={{ fontFamily: "var(--font-public-sans)", fontWeight: 400 }} className="text-[#424959] text-lg text-left w-full">
            {steps[ConditionStep - 1].caption}
          </p>
          {ConditionStep == 3 ? (
            <div className='flex-col space-y-[16px] '>
              {['100% Secure', 'Your information is never shared', 'We are HIPAA compliant', 'We hate spam'].map((item) => (
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
              ))}
            </div>
          ) : null}
          <Form {...ConditionForm}>
            <form className=' flex flex-col space-y-[24px] ' aria-labelledby="condition-check-step-title">
              {steps[ConditionStep - 1].questions.map((question: any) => (
                <FormField
                  control={ConditionForm.control}
                  name={question.control}
                  key={question.question}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <span style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500 }} className="text-black text-lg text-left w-full">{question.question}</span>
                      </FormLabel>
                      <FormControl>
                        {/* Multi-select checkboxes for only the two specific questions */}
                        {(question.question === "Where is your pain? (Choose all that apply)" || question.question === "Do you have any of the following symptoms? (choose all that apply)?") ? (
                          <div className='flex flex-col space-y-[16px]'>
                            {question.options.map((option: string) => {
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

                                  <span
                                    style={{
                                      fontFamily: "var(--font-public-sans)",
                                      fontWeight: 500,
                                    }}
                                    className="text-[#424959] text-lg text-left w-full"
                                  >
                                    {option}
                                  </span>
                                </div>
                              )
                            })}
                          </div>
                        ) : question.options && question.options.length > 0 ? (
                          // Single-select dropdown for all other questions with options
                          <Select
                            value={field.value || ""}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="w-full h-12 px-6 bg-[#f0f5ff] border rounded-sm">
                              <SelectValue placeholder="Choose" className="font-[var(--font-inter)] text-lg" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {question.options.map((option: string) => (
                                  <SelectItem key={option} value={option}>{option}</SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        ) : question.control === 'comments' ? (
                          <Textarea placeholder={question.question} className="min-h-[200px] text-lg resize-none border-[#DCDEE1] bg-[#FAFAFA]" {...field} />
                        ) : question.control === 'email_optout' ? (
                          <div className=' flex flex-row items-center justify-start space-x-[12px] w-full hover:cursor-pointer'
                            onClick={() => field.onChange(field.value == 'false' ? 'true' : 'false')}
                          >
                            {
                              field.value == 'true' ?
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                  <path fillRule="evenodd" clipRule="evenodd" d="M10.0526 0.604126C12.061 0.604126 13.6386 0.604131 14.8697 0.770048C16.1319 0.939631 17.1329 1.29439 17.9194 2.08089C18.7059 2.86739 19.0607 3.86837 19.2302 5.13062C19.3962 6.3617 19.3962 7.93929 19.3962 9.9477V10.0522C19.3962 12.0606 19.3962 13.6382 19.2302 14.8693C19.0607 16.1316 18.7059 17.1325 17.9194 17.919C17.1329 18.7055 16.1319 19.0603 14.8697 19.2299C13.6386 19.3958 12.061 19.3958 10.0526 19.3958H9.94807C7.93965 19.3958 6.36207 19.3958 5.13098 19.2299C3.86873 19.0603 2.86775 18.7055 2.08125 17.919C1.29475 17.1325 0.939998 16.1316 0.770414 14.8693C0.604498 13.6382 0.604492 12.0606 0.604492 10.0522V9.9477C0.604492 7.93929 0.604498 6.3617 0.770414 5.13062C0.939998 3.86837 1.29475 2.86739 2.08125 2.08089C2.86775 1.29439 3.86873 0.939631 5.13098 0.770048C6.36207 0.604131 7.93965 0.604126 9.94807 0.604126H10.0526ZM14.4718 6.35162C14.7147 6.79621 14.5516 7.35355 14.107 7.59646C12.8502 8.28396 11.6696 9.72313 10.7676 11.1027C10.3285 11.7755 9.97558 12.4025 9.73358 12.86C9.61259 13.0891 9.52 13.2743 9.45767 13.4017L9.36784 13.5896C9.22575 13.8995 8.92416 14.1048 8.58408 14.124C8.244 14.1424 7.92224 13.971 7.74715 13.6795C7.46207 13.2028 7.01016 12.7683 6.59033 12.4365C6.38683 12.2751 6.20348 12.1486 6.0724 12.0625L5.879 11.9424C5.43991 11.6912 5.28683 11.1311 5.538 10.692C5.78825 10.252 6.34832 10.099 6.78832 10.3501L7.07709 10.5289C7.24392 10.6389 7.47307 10.7975 7.72699 10.9982C7.92224 11.1522 8.1395 11.3374 8.35858 11.55C8.59417 11.1275 8.8884 10.6279 9.23307 10.1008C10.1653 8.67355 11.5513 6.90438 13.227 5.98771C13.6716 5.74479 14.2289 5.90796 14.4718 6.35162Z" fill="#252932" />
                                </svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                  <path fillRule="evenodd" clipRule="evenodd" d="M2.081 17.9184C3.55775 19.3952 5.711 19.3952 10.0001 19.3952C14.2892 19.3952 16.4424 19.3943 17.9192 17.9184C19.3959 16.4426 19.3959 14.2884 19.3959 9.99935C19.3959 5.71027 19.395 3.55703 17.9192 2.08028C16.4433 0.603525 14.2892 0.603516 10.0001 0.603516C5.711 0.603516 3.55775 0.603525 2.081 2.08028C0.604248 3.55611 0.604248 5.71026 0.604248 9.99934V9.99935V9.99936C0.604248 14.2884 0.604248 16.4417 2.081 17.9184ZM10 1.97852H10.0001H10.0001C13.9106 1.97852 15.8741 1.97852 16.9475 3.05193C18.0209 4.12626 18.0209 6.08884 18.0209 9.99933V9.99935V9.99937C18.0209 13.9099 18.0209 15.8734 16.9475 16.9468C15.8732 18.0202 13.9106 18.0202 10.0001 18.0202H10.0001H10.0001C6.08958 18.0202 4.127 18.0202 3.05267 16.9468C1.97925 15.8724 1.97925 13.9099 1.97925 9.99935C1.97925 6.08885 1.97925 4.12535 3.05267 3.05193C4.127 1.97852 6.08957 1.97852 10 1.97852ZM7.84688 13.9575C7.98805 14.1985 8.24563 14.3452 8.5243 14.3452H8.54814C8.83505 14.337 9.09263 14.1729 9.2228 13.9171C9.83605 12.7016 10.7435 11.0956 11.4521 10.2312L11.5851 10.069L11.5909 10.0618C11.9761 9.59031 12.2107 9.30316 12.6649 8.86629C12.9115 8.62979 13.0609 8.49505 13.3506 8.27505C13.5449 8.12655 13.896 7.91205 14.0142 7.84238C14.3415 7.64988 14.4505 7.22821 14.258 6.90096C14.0655 6.57371 13.6439 6.46464 13.3166 6.65714C13.2653 6.68739 12.8115 6.95597 12.5173 7.18055C12.1772 7.43813 11.9866 7.60956 11.7106 7.87539C11.1978 8.36908 10.9293 8.69742 10.5254 9.19142L10.5199 9.19813L10.3879 9.35947C9.69488 10.2056 8.9423 11.5127 8.45005 12.4257C8.27771 12.2195 8.0843 12.0224 7.87439 11.8629C7.47499 11.5596 6.873 11.1375 6.74807 11.0499C6.73595 11.0414 6.72832 11.036 6.7258 11.0342C6.41413 10.817 5.98605 10.893 5.7688 11.2047C5.55155 11.5164 5.62763 11.9445 5.9393 12.1617C5.93966 12.162 5.94218 12.1637 5.94667 12.1669C6.02181 12.2195 6.65025 12.6599 7.04205 12.9574C7.29046 13.1462 7.5838 13.511 7.84688 13.9575Z" fill="#838890" />
                                </svg>
                            }
                            <span>I don’t want to receive occasional emails from Mountain Spine Orthopedics.</span>
                          </div>
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
        </div>
        <div className=' flex flex-row p-[16px] w-full rounded-b-[24px] justify-between bg-white'>
          {ConditionStep != 1 ? (
            <button
              type="button"
              onClick={() => setConditionStep(ConditionStep - 1)}
              className=" max-h-[56px] w-fit h-full px-[32px] py-[16px] space-x-[10px] rounded-[62px] relative flex bg-[white] text-[#252932] border border-[#252932] text-[14px] font-semibold justify-center items-center hover:cursor-pointer"
            >
              <span style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500, fontSize: "16px", lineHeight: "24px", letterSpacing: "0.02em" }}>Back</span>
            </button>
          ) : null}
          <button
            type="button"
            disabled={disabled}
            onClick={() => {
              if (ConditionStep != steps.length) {
                setConditionStep(Math.min(steps.length, ConditionStep + 1))
              } else {
                ConditionForm.handleSubmit(onSubmit)()
              }
            }}
            className={`self-end max-h-[56px] w-fit h-full px-[32px] py-[16px] space-x-[10px] rounded-[62px] relative flex bg-[#0A50EC] text-white text-[14px] font-semibold justify-center items-center ${disabled ? "hover:cursor-not-allowed bg-[#252932]" : 'hover:cursor-pointer'}`}
          >
            {ConditionStep != steps.length ? (
              <span style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500, fontSize: "16px", lineHeight: "24px", letterSpacing: "0.02em" }}>Next</span>
            ) : (
              <span style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500, fontSize: "16px", lineHeight: "24px", letterSpacing: "0.02em" }}>{disabled ? "Sending..." : "Get My Results"}</span>
            )}
          </button>
        </div>
      </motion.div>
      <Dialog open={openAppointmentConfirm} onOpenChange={() => setAppointmentConfirm(!openAppointmentConfirm)} >
        <DialogContent className=" rounded-[20px] p-[32px]" >
          <DialogTitle></DialogTitle>
          <div className="bg-white flex flex-col space-y-[20px] items-center justify-center">
            <div className=" relative h-[100px] self-center flex w-full">
              {/* Animated SVGs omitted for brevity */}
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
              <h2 style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }} className='text-[black] text-2xl'>Your Appointment Request Is Confirmed</h2>
              <p style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }} className='text-[#838890] text-md text-center'>You're one step closer to a pain-free life!<br />Please check your email for details. Our team will contact you shortly.<br />Thank you for choosing Mountain Spine & Orthopedic Center!</p>
            </div>
            <button
              onClick={() => setAppointmentConfirm(false)}
              className=" max-h-[56px] h-full px-[32px] py-[16px] rounded-[62px] relative flex bg-[#0A50EC] text-white text-[14px] font-semibold w-full justify-center items-center hover:cursor-pointer"
            >
              <span style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500, fontSize: "16px", lineHeight: "24px", letterSpacing: "0.02em" }}>Done</span>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
} 
