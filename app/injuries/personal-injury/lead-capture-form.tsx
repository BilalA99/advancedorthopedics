"use client"

import { useState, useEffect } from "react"
import { getAttributionData } from "@/lib/gclid"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Calendar, User, Mail, Phone, Stethoscope } from "lucide-react"
import { BorderBeam } from "@/components/magicui/border-beam"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { sendContactEmail, sendUserEmail } from "@/components/email/sendcontactemail"
import { redirect } from "next/navigation"
import { pushFormSubmit } from "@/utils/enhancedConversions"
import { STATE_OPTIONS } from "@/lib/stateUtils"
import { clinicsForMap as clinics } from "@/components/data/clinicsForMap.generated"

const leadSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Valid email is required"),
  injury: z.string().min(1, "Please select your injury type"),
  urgency: z.string().min(1, "Please select urgency level"),
  location: z.string().min(1, "Please select preferred location"),
  state: z.string().min(1, "Please select your state"),
})

type LeadFormData = z.infer<typeof leadSchema>

const personalInjuryTypes = [
  "Neck pain or whiplash",
  "Back pain after accident",
  "Shoulder injury",
  "Knee injury",
  "Wrist/hand fracture or sprain",
  "Hip injury",
  "Ankle/foot sprain or fracture",
  "Multiple areas",
  "Other injury",
]

const urgencyOptions = [
  { value: "today", label: "Today (urgent)" },
  { value: "this-week", label: "This week" },
  { value: "next-week", label: "Next week" },
  { value: "flexible", label: "I'm flexible" },
]

export function PersonalInjuryLeadCaptureForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [attribution, setAttribution] = useState({ gclid: '', utm_source: '', utm_medium: '', utm_campaign: '', utm_term: '', utm_content: '' })

  useEffect(() => {
    setAttribution(getAttributionData())
  }, [])
  const form = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      injury: "",
      urgency: "",
      location: "",
      state: "",
    },
  })

  async function onSubmit(values: z.infer<typeof leadSchema>) {
    setIsSubmitting(true)
    const data = await sendContactEmail({
      name: values.firstName,
      email: values.email,
      phone: values.phone,
      reason: values.injury,
      bestTime: values.urgency,
      injury_type: values.injury,
      location: values.location,
      state: values.state,
      gclid: attribution.gclid,
      utm_source: attribution.utm_source,
      utm_medium: attribution.utm_medium,
      utm_campaign: attribution.utm_campaign,
      utm_term: attribution.utm_term,
      utm_content: attribution.utm_content,
    })
    await sendUserEmail({
      name: values.firstName,
      email: values.email,
      phone: values.phone,
      state: values.state,
      reason: values.injury,
      form_source: 'personal-injury',
      gclid: attribution.gclid,
      utm_source: attribution.utm_source,
      utm_medium: attribution.utm_medium,
      utm_campaign: attribution.utm_campaign,
      utm_term: attribution.utm_term,
      utm_content: attribution.utm_content,
    })

    pushFormSubmit({ form_name: 'PersonalInjuryLeadForm', state: values.state, email: values.email, phone: values.phone, firstName: values.firstName, lastName: values.lastName })

    setIsSubmitting(false)
    if (data) {
      setIsOpen(false)
      redirect("/thank-you")
      form.reset()
    }
  }

  if (isSubmitted) {
    return (
      <div className="relative w-full p-4 rounded-3xl overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden"
          style={{
            filter: "drop-shadow(-8px -10px 46px #0000005f)",
            backdropFilter: "brightness(1.1) blur(2px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <div
            className="absolute inset-0 rounded-3xl"
            style={{
              boxShadow: "inset 6px 6px 0px -6px rgba(255, 255, 255, 0.7), inset 0 0 8px 1px rgba(255, 255, 255, 0.7)",
            }}
          />
        </div>
        <div className="relative z-10 p-6 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-6 h-6 text-green-600" />
          </div>
          <h3
            style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500 }}
            className="text-[#111315] text-lg mb-2"
          >
            Request Received!
          </h3>
          <p
            style={{ fontFamily: "var(--font-inter)", fontWeight: 400 }}
            className="text-[#424959] mb-4"
          >
            We'll contact you within 2 hours to schedule your appointment.
          </p>
          <p
            style={{ fontFamily: "var(--font-inter)", fontWeight: 400 }}
            className="text-[#838890] text-sm"
          >
            Need immediate care? Call (561) 223-9959
          </p>
        </div>
        <BorderBeam duration={8} size={200} borderWidth={2} colorFrom="#0A50EC" colorTo="#ffffff" />
      </div>
    )
  }

  return (
    <div className="relative w-full p-4 rounded-3xl overflow-hidden" data-section="personal-injury-lead-form">
      <div
        className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden"
        style={{
          filter: "drop-shadow(-8px -10px 46px #0000005f)",
          backdropFilter: "brightness(1.1) blur(2px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <div
          className="absolute inset-0 rounded-3xl"
          style={{
            boxShadow: "inset 6px 6px 0px -6px rgba(255, 255, 255, 0.7), inset 0 0 8px 1px rgba(255, 255, 255, 0.7)",
          }}
        />
      </div>

      <div className="relative z-10">
        <div className="mb-6">
          <h3
            style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500 }}
            className="text-[#111315] text-2xl mb-2 flex items-center space-x-2"
          >
            <Stethoscope className="w-5 h-5 text-[#0A50EC]" />
            <span>Schedule Your Personal Injury Evaluation</span>
          </h3>
          <p
            style={{ fontFamily: "var(--font-inter)", fontWeight: 400 }}
            className="text-[#424959] text-sm"
          >
            Get expert orthopedic care for car accidents, falls, and other personal injuries
          </p>
        </div>

        <Form {...form}>
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-[#838890] font-semibold">
                      <span
                        style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500 }}
                        className="text-[#111315] text-md"
                      >
                        First Name
                      </span>
                    </FormLabel>
                    <FormControl>
                      <div className="flex">
                        <Input placeholder="Name" startIcon={User} className="h-12 text-lg border-[#DCDEE1]" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-[#838890] font-semibold">
                      <span
                        style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500 }}
                        className="text-[#111315] text-md"
                      >
                        Last Name
                      </span>
                    </FormLabel>
                    <FormControl>
                      <div className="flex">
                        <Input placeholder="Name" startIcon={User} className="h-12 text-lg border-[#DCDEE1]" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-[#838890] font-semibold">
                    <span
                      style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500 }}
                      className="text-[#111315] text-md"
                    >
                      Phone Number
                    </span>
                  </FormLabel>
                  <FormControl>
                    <div className="flex">
                      <Input
                        placeholder="Phone Number"
                        startIcon={Phone}
                        className="h-12 text-lg border-[#DCDEE1]"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-[#838890] font-semibold">
                    <span
                      style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500 }}
                      className="text-[#111315] text-md"
                    >
                      Email
                    </span>
                  </FormLabel>
                  <FormControl>
                    <div className="flex">
                      <Input placeholder="Email" startIcon={Mail} className="h-12 text-lg border-[#DCDEE1]" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className="w-full max-h-[56px] h-full px-[32px] py-[16px] rounded-[62px] relative flex bg-[#0A50EC] text-white text-[14px] font-semibold justify-center items-center hover:cursor-pointer"
              disabled={isSubmitting}
              data-cta="personal-injury-schedule-evaluation"
              onClick={(e) => {
                e.preventDefault()
                setIsOpen(true)
              }}
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <span className="text-white">Scheduling...</span>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                </div>
              ) : (
                <span style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500 }} className="text-white">
                  Schedule My Evaluation
                </span>
              )}
            </Button>
          </form>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
              <DialogTitle className="flex items-center gap-2 text-[#111315] text-2xl" style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500 }}>
                <Stethoscope className="w-5 h-5 text-[#0A50EC] shrink-0" />
                Schedule Your Personal Injury Evaluation
              </DialogTitle>
              <form className="space-y-4 flex flex-col">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-[#838890] font-semibold">
                          <span
                            style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500 }}
                            className="text-[#111315] text-md"
                          >
                            First Name
                          </span>
                        </FormLabel>
                        <FormControl>
                          <div className="flex">
                            <Input
                              placeholder="Name"
                              startIcon={User}
                              className="h-12 text-lg border-[#DCDEE1]"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-[#838890] font-semibold">
                          <span
                            style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500 }}
                            className="text-[#111315] text-md"
                          >
                            Last Name
                          </span>
                        </FormLabel>
                        <FormControl>
                          <div className="flex">
                            <Input
                              placeholder="Name"
                              startIcon={User}
                              className="h-12 text-lg border-[#DCDEE1]"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-[#838890] font-semibold">
                        <span
                          style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500 }}
                          className="text-[#111315] text-md"
                        >
                          Phone Number
                        </span>
                      </FormLabel>
                      <FormControl>
                        <div className="flex">
                          <Input
                            placeholder="Phone Number"
                            startIcon={Phone}
                            className="h-12 text-lg border-[#DCDEE1]"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-[#838890] font-semibold">
                        <span
                          style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500 }}
                          className="text-[#111315] text-md"
                        >
                          Email
                        </span>
                      </FormLabel>
                      <FormControl>
                        <div className="flex">
                          <Input
                            placeholder="Email"
                            startIcon={Mail}
                            className="h-12 text-lg border-[#DCDEE1]"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="gap-y-2 flex flex-col">
                  <Label htmlFor="injury">
                    <span
                      style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500 }}
                      className="text-[#111315] text-md"
                    >
                      Type of Injury
                    </span>
                  </Label>
                  <Select onValueChange={(value) => form.setValue("injury", value)}>
                    <SelectTrigger
                      className={`w-full h-12 px-6 bg-[#f0f5ff] border rounded-sm ${
                        form.formState.errors.injury ? "border-red-500" : ""
                      }`}
                    >
                      <SelectValue
                        placeholder="Select your injury"
                        className="font-[var(--font-inter)] h-12 text-lg"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {personalInjuryTypes.map((injury) => (
                        <SelectItem key={injury} value={injury}>
                          {injury}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.injury && (
                    <p className="text-sm text-red-600 mt-1">{form.formState.errors.injury.message}</p>
                  )}
                </div>

                <div className="gap-y-2 flex flex-col">
                  <Label htmlFor="urgency">
                    <span
                      style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500 }}
                      className="text-[#111315] text-md"
                    >
                      How soon do you need care?
                    </span>
                  </Label>
                  <Select onValueChange={(value) => form.setValue("urgency", value)}>
                    <SelectTrigger
                      className={`w-full h-12 px-6 bg-[#f0f5ff] border rounded-sm ${
                        form.formState.errors.urgency ? "border-red-500" : ""
                      }`}
                    >
                      <SelectValue
                        placeholder="Select urgency"
                        className="font-[var(--font-inter)] h-12 text-lg"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {urgencyOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.urgency && (
                    <p className="text-sm text-red-600 mt-1">{form.formState.errors.urgency.message}</p>
                  )}
                </div>

                <div className="gap-y-2 flex flex-col">
                  <Label htmlFor="location">
                    <span
                      style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500 }}
                      className="text-[#111315] text-md"
                    >
                      Preferred Location
                    </span>
                  </Label>
                  <Select onValueChange={(value) => form.setValue("location", value)}>
                    <SelectTrigger
                      className={`w-full h-12 px-6 bg-[#f0f5ff] border rounded-sm ${
                        form.formState.errors.location ? "border-red-500" : ""
                      }`}
                    >
                      <SelectValue
                        placeholder="Select location"
                        className="font-[var(--font-inter)] h-12 text-lg"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {clinics.map((clinic) => (
                        <SelectItem key={clinic.id} value={clinic.region}>
                          {clinic.region}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.location && (
                    <p className="text-sm text-red-600 mt-1">{form.formState.errors.location.message}</p>
                  )}
                </div>

                <div className="gap-y-2 flex flex-col">
                  <Label>
                    <span style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500 }} className="text-[#111315] text-md">
                      State <span className="text-red-500">*</span>
                    </span>
                  </Label>
                  <Select onValueChange={(value) => form.setValue("state", value)}>
                    <SelectTrigger className={`w-full h-12 px-6 bg-[#f0f5ff] border rounded-sm ${form.formState.errors.state ? "border-red-500" : ""}`}>
                      <SelectValue placeholder="Select your state" />
                    </SelectTrigger>
                    <SelectContent>
                      {STATE_OPTIONS.map(({ value, label }) => (
                        <SelectItem key={value} value={value}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.state && (
                    <p className="text-sm text-red-600 mt-1">{form.formState.errors.state.message}</p>
                  )}
                </div>

                <Button
                  type="button"
                  className="w-full max-h-[56px] h-full px-[32px] py-[16px] rounded-[62px] relative flex bg-[#0A50EC] text-white text-[14px] font-semibold justify-center items-center hover:cursor-pointer"
                  disabled={isSubmitting}
                  data-cta="personal-injury-schedule-evaluation"
                  onClick={(e) => {
                    e.preventDefault()
                    form.handleSubmit(onSubmit)()
                  }}
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <span className="text-white">Scheduling...</span>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    </div>
                  ) : (
                    <span style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500 }} className="text-white">
                      Schedule My Evaluation
                    </span>
                  )}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </Form>
      </div>
      <BorderBeam duration={8} size={200} borderWidth={2} colorFrom="#0A50EC" colorTo="#ffffff" />
    </div>
  )
}

