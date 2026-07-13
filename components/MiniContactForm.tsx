"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useEffect, useState } from "react"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import BookAnAppoitmentButton from "./BookAnAppoitmentButton"
import { getAttributionData } from "@/lib/gclid"
import { useRouter } from "next/navigation"
import { pushFormSubmit } from "@/utils/enhancedConversions"

const formSchema = z.object({
  name: z.string().min(2, "name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  bestTime: z.string().min(1, "Please select a time"),
  reason: z.string().min(2, "Please provide more detail about your consultation needs"),
})

export function MiniContactForm({ backgroundcolor = 'white' }: { backgroundcolor?: string }) {
  const [attribution, setAttribution] = useState({ gclid: '', utm_source: '', utm_medium: '', utm_campaign: '', utm_term: '', utm_content: '' })
  const router = useRouter()

  useEffect(() => {
    setAttribution(getAttributionData())
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      bestTime: "",
      reason: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const nameParts = values.name.trim().split(' ')
      const firstName = nameParts[0] || values.name
      const lastName = nameParts.slice(1).join(' ') || ''
      const res = await fetch('/api/forms/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email: values.email,
          phone: values.phone,
          reason: values.reason,
          bestTime: values.bestTime,
          form_source: 'state-consultation',
          gclid: attribution.gclid,
          utm_source: attribution.utm_source,
          utm_medium: attribution.utm_medium,
          utm_campaign: attribution.utm_campaign,
          utm_term: attribution.utm_term,
          utm_content: attribution.utm_content,
        }),
      })
      if (res.redirected) {
        router.push(res.url)
        return
      }
      if (res.ok) {
        pushFormSubmit({
          form_name: 'MiniContactForm',
          state: '',
          email: values.email,
          phone: values.phone,
          firstName,
          lastName,
        })
        router.push('/thank-you')
      }
    } catch (error) {
      console.error('[MiniContactForm] Submit failed', error)
    }
  }

  return (
    <div className={`w-full p-8 rounded-3xl overflow-hidden backdrop-blur-[15px] bg-[${backgroundcolor}] bg-opacity-50`}

    >
      <h4
        style={{
          fontFamily: "var(--font-public-sans)",
          fontWeight: 500,
        }}
        className="text-black text-2xl text-left w-full"
      >Book Your Appointment</h4>

      <Form {...form}

      >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
          {/* Name Fields */}
          <div className="grid grid-cols-1  gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-[#838890] font-semibold ">Full Name<span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <div className=" flex  ">
                      <span className="inline-flex items-center px-6 h-12 text-lg border border-[#DCDEE1] border-r-0 rounded-l-md bg-[#FAFAFA]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="20" viewBox="0 0 19 20" fill="none">
                          <path fillRule="evenodd" clipRule="evenodd" d="M9.77084 0.145508C7.113 0.145508 4.95836 2.30013 4.95836 4.95801C4.95836 7.61587 7.113 9.77051 9.77084 9.77051C12.4287 9.77051 14.5833 7.61587 14.5833 4.95801C14.5833 2.30013 12.4287 0.145508 9.77084 0.145508ZM15.477 12.8203C15.3294 12.737 15.199 12.6634 15.0932 12.6005C11.8353 10.6605 7.70651 10.6605 4.44863 12.6005C4.34201 12.6639 4.21029 12.7382 4.06119 12.8224C3.40778 13.191 2.42006 13.7482 1.74341 14.4105C1.32021 14.8248 0.918114 15.3706 0.84501 16.0394C0.767276 16.7506 1.07753 17.418 1.69997 18.011C2.7738 19.034 4.06243 19.8539 5.72921 19.8539H13.8127C15.4794 19.8539 16.7681 19.034 17.8419 18.011C18.4643 17.418 18.7746 16.7506 18.6968 16.0394C18.6237 15.3706 18.2216 14.8248 17.7984 14.4105C17.1217 13.7482 16.134 13.191 15.4806 12.8224L15.477 12.8203Z" fill="#838890" />
                        </svg>
                      </span>
                      <Input placeholder="Name" className="h-12 text-lg rounded-l-none border-[#DCDEE1] border-l-0 bg-[#FAFAFA]" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>

          {/* Contact Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-[#838890] font-semibold">Email Address<span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <div className=" flex  ">
                      <span className="inline-flex items-center px-6 h-12 text-lg border border-[#DCDEE1] border-r-0 rounded-l-md bg-[#FAFAFA]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 20 18" fill="none">
                          <path fillRule="evenodd" clipRule="evenodd" d="M12.4587 0.554246C10.6659 0.509257 9.33393 0.509265 7.54114 0.55425L7.47253 0.555971C6.08895 0.590651 4.95056 0.619185 4.03301 0.778781C3.05917 0.948168 2.24378 1.27805 1.55316 1.97043C0.86616 2.65919 0.537216 3.46172 0.370571 4.42015C0.214179 5.31961 0.190513 6.42956 0.161869 7.77295L0.160395 7.84206C0.140864 8.75681 0.140874 9.24255 0.160407 10.1573L0.161881 10.2264C0.190526 11.5698 0.214193 12.6797 0.370585 13.5792C0.53723 14.5376 0.866175 15.3402 1.55318 16.0289C2.2438 16.7213 3.05918 17.0512 4.03302 17.2206C4.95057 17.3802 6.08896 17.4087 7.47254 17.4434L7.54116 17.4451C9.33395 17.4901 10.6659 17.4901 12.4587 17.4451L12.5273 17.4434C13.9109 17.4087 15.0493 17.3802 15.9668 17.2206C16.9407 17.0512 17.7561 16.7213 18.4467 16.0289C19.1337 15.3402 19.4626 14.5376 19.6293 13.5792C19.7857 12.6797 19.8093 11.5698 19.838 10.2264L19.8394 10.1573C19.859 9.24254 19.859 8.75681 19.8394 7.84206L19.838 7.77297C19.8093 6.42959 19.7856 5.31961 19.6293 4.42015C19.4626 3.46173 19.1337 2.65919 18.4467 1.97044C18.0586 1.58135 17.6311 1.30673 17.1582 1.11074C17.0862 1.07146 17.0091 1.04185 16.9288 1.02294C16.6264 0.916357 16.3062 0.837822 15.9668 0.778784C15.0493 0.619187 13.9109 0.59065 12.5273 0.555967L12.4587 0.554246ZM17.9564 6.11245C17.9386 5.74073 17.9298 5.55487 17.7952 5.48067C17.6606 5.40647 17.4951 5.50022 17.1642 5.68773L13.2814 7.88776C12.09 8.56276 11.0825 8.99966 9.99974 8.99966C8.91697 8.99966 7.90942 8.56276 6.71812 7.88776L2.83566 5.68793C2.50473 5.50042 2.33926 5.40666 2.20466 5.48087C2.07006 5.55507 2.06119 5.74093 2.04346 6.11266C2.01957 6.61363 2.00661 7.1944 1.99195 7.88107C1.97297 8.76981 1.97298 9.22954 1.99196 10.1183C2.02249 11.5483 2.04564 12.5191 2.17554 13.2662C2.29786 13.9697 2.50194 14.3876 2.85103 14.7376C3.19651 15.084 3.62016 15.2915 4.34734 15.418C5.11568 15.5517 6.1178 15.5791 7.58717 15.616C9.34929 15.6602 10.6506 15.6602 12.4127 15.616C13.882 15.5791 14.8842 15.5517 15.6525 15.418C16.3797 15.2915 16.8033 15.0839 17.1488 14.7376C17.4979 14.3876 17.702 13.9696 17.8243 13.2661C17.9542 12.5191 17.9774 11.5483 18.0079 10.1183C18.0269 9.22954 18.0269 8.76981 18.0079 7.88107C17.9932 7.19431 17.9803 6.61347 17.9564 6.11245Z" fill="#838890" />
                        </svg>
                      </span>
                      <Input placeholder="Enter your email" className="h-12 text-lg rounded-l-none border-[#DCDEE1] border-l-0 bg-[#FAFAFA]" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-[#838890] font-semibold">Phone Number<span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <div className=" flex  ">

                      <Input placeholder="+1 0123456789" className="h-12 text-lg  border-[#DCDEE1] bg-[#FAFAFA]" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Reason Field */}
          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm text-[#838890] font-semibold">Message (optional)</FormLabel>
                <FormControl>
                  <Textarea placeholder="Your Message" className="min-h-[200px] text-lg resize-none  border-[#DCDEE1]  bg-[#FAFAFA]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-full self-center flex items-center justify-center"><BookAnAppoitmentButton /></div>
        </form>
      </Form>
    </div>
  )
}
