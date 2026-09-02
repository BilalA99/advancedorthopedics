import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ConsultationForm } from '@/components/ContactForm';
import { getVisibleProviders } from '@/lib/providers/providerVisibility';
import DoctorCard from '@/components/DoctorCard';
import InternalLinkingSection from '@/components/InternalLinkingSection';
import InjectionsFAQ, { FAQItem } from './InjectionsFAQ';
import BodyPartHeroForm from '@/components/BodyPartHeroForm';
import InjectionReliefMap from '@/components/InjectionReliefMap.client';
import { GoogleStylePatientReviews } from '@/components/GoogleStylePatientReviews';
import { REVIEW_LINKS } from '@/lib/reviewLinks';

const INJECTION_FAQS: FAQItem[] = [
  {
    question: 'How long does a cortisone shot last?',
    answer:
      'Varies by injection type and location. **Cortisone shots** for joints typically provide 4–8 weeks of significant relief; some patients experience 3–6 months. **Epidural steroid injections** for back or neck pain often last 3–6 months. Hyaluronic acid (gel) knee injections typically provide 6 months or more. Individual results vary based on severity of condition, patient age, and activity level. Your specialist will discuss realistic expectations based on your specific diagnosis. Some patients receive periodic injections as part of an ongoing pain management plan.',
  },
  {
    question: 'Does a cortisone shot hurt?',
    answer:
      'Most patients report mild discomfort — similar to a blood draw or vaccine. A local anesthetic is applied to numb the skin before the injection, significantly reducing pain. The injection itself may cause brief pressure or a burning sensation as medication enters the joint or spinal space, which typically resolves within seconds. For spinal injections, image guidance ensures the needle is precisely placed, minimizing discomfort and improving safety. Post-injection soreness at the site for 24–48 hours is normal and usually managed with ice. Most patients are pleasantly surprised by how tolerable the procedure is.',
  },
  {
    question: 'How many cortisone shots can I get per year?',
    answer:
      'The generally accepted limit is **3–4 cortisone shots per joint per year**. Frequent corticosteroid injections can weaken cartilage and tendons over time. Your orthopedic specialist will evaluate whether additional injections are appropriate based on your response to prior injections and overall treatment goals. If cortisone shots are no longer providing adequate relief, your doctor may recommend alternative injections (such as hyaluronic acid for knees) or discuss whether a minimally invasive surgical option might offer more lasting results.',
  },
  {
    question: 'What is the difference between a cortisone shot and a gel injection?',
    answer:
      '**Cortisone shots** (corticosteroid injections) deliver anti-inflammatory medication to reduce swelling and pain — they work by calming the inflammatory response. **Gel injections** (hyaluronic acid or viscosupplementation) add lubricating fluid to the joint, primarily used for knee osteoarthritis. Gel injections mimic natural joint fluid, reducing friction and pain. Cortisone works faster (2–7 days) with stronger immediate effect; gel injections build more gradually but may last longer (6+ months) for appropriate candidates. Your doctor will recommend the right type based on your diagnosis, imaging, and prior treatment history.',
  },
  {
    question: 'Do I need a referral for an orthopedic injection?',
    answer:
      'No. At Mountain Spine & Orthopedics, you do not need a referral to schedule a consultation for injection therapy. You can book directly online or by calling your nearest location. If your insurance requires a referral for coverage purposes, we can help you navigate that process — but you do not need a referral to start the conversation with our specialists. PPO insurance plans allow direct access to specialists.',
  },
  {
    question: 'What is an epidural steroid injection?',
    answer:
      'An **epidural steroid injection** (ESI) delivers corticosteroid medication directly into the epidural space surrounding the spinal cord and nerve roots. It is most commonly used for back pain caused by herniated discs, spinal stenosis, or nerve compression causing sciatica. The injection reduces inflammation around irritated nerve roots, providing relief from radiating pain into the legs (lumbar ESI) or arms (cervical ESI). ESIs are performed under fluoroscopy guidance, typically take 15–20 minutes, and are performed as an outpatient procedure. Many patients experience significant relief within 3–7 days.',
  },
  {
    question: 'What is a facet joint injection?',
    answer:
      '**Facet joint injections** treat pain originating from the small joints along the spine that connect vertebrae to each other. Facet joint arthritis or injury causes localized back or neck pain that often worsens with extension or rotation. The injection delivers corticosteroid medication directly into the affected facet joint under fluoroscopy guidance. Relief typically lasts several months. Facet injections also serve a diagnostic function — if they provide significant temporary relief, it confirms the facet joint as the pain source, which guides further treatment decisions including radiofrequency ablation for longer-lasting results.',
  },
  {
    question: 'How much does a cortisone shot cost with insurance?',
    answer:
      'With PPO insurance, your out-of-pocket cost for a **cortisone shot** at an orthopedic specialist is typically your standard specialist copay plus any deductible responsibility. PPO insurance plans cover medically necessary orthopedic injections when documented as treatment for a diagnosed condition. Mountain Spine & Orthopedics accepts PPO insurance plans. Call our office or check our website to verify your coverage before your appointment.',
  },
  {
    question: 'Who qualifies for the free MRI review?',
    answer:
      'The **complimentary MRI review** is available to patients who carry PPO insurance and have existing MRI imaging (within the last 2 years) of the spine, knee, shoulder, hip, or other affected joint. During the review, one of our board-certified specialists evaluates your imaging and discusses whether an orthopedic injection, further diagnostics, or another treatment path is the right next step. There is no obligation to proceed with treatment. To find out if you qualify, call our office or submit your information online — a patient coordinator will confirm eligibility before your appointment.',
  },
  {
    question: 'Does insurance cover orthopedic injections?',
    answer:
      'Yes. **PPO insurance plans** cover medically necessary orthopedic injections — including cortisone shots, epidural steroid injections, facet joint injections, SI joint injections, and nerve blocks — when ordered by a physician for a documented diagnosis. Mountain Spine & Orthopedics accepts Aetna, Blue Cross Blue Shield, Cigna, UnitedHealthcare, and other PPO carriers. Call (561) 223-9959 or use our online tool to verify your specific coverage before your appointment.',
  },
  {
    question: 'How quickly can I get an orthopedic injection appointment?',
    answer:
      'Mountain Spine & Orthopedics offers **same-week appointments** at 23 locations across Florida, New Jersey, New York, Pennsylvania, and Georgia. **No referral is required** for PPO-insured patients. You can book online 24/7 or call (561) 223-9959 to speak with a patient coordinator. Most new patients are seen within 2–5 business days. If you have an existing MRI, bring it to your first appointment — in many cases we can proceed with your injection the same day as your consultation.',
  },
];

// Pain management + spine doctors most relevant for injection therapy
const injectionDoctors = getVisibleProviders().filter(
  (d) =>
    d.practice === 'Pain Management' ||
    d.medicalSpecialty.includes('Pain Management') ||
    d.medicalSpecialty.includes('Spine Surgery')
).slice(0, 4);

const TESTIMONIALS = [
  {
    quote:
      'I had been dealing with lower back pain for over a year. After one epidural steroid injection at Mountain Spine, I was back to my normal routine within a week. The whole process took less than 30 minutes.',
    name: 'David S.',
    location: 'Boca Raton, FL',
    detail: 'Epidural Steroid Injection — Back Pain',
    date: 'February 2024',
    writeReviewHref: REVIEW_LINKS['boca-raton-orthopedics'],
  },
  {
    quote:
      'My knee was so bad I could barely walk. The cortisone shot they gave me at the Wellington office worked better than anything I had tried before. Six months later and I am still doing well.',
    name: 'Christina J.',
    location: 'Bridgewater, NJ',
    detail: 'Cortisone Shot — Knee Osteoarthritis',
    date: 'November 2024',
    writeReviewHref: REVIEW_LINKS['palm-beach-gardens-orthopedics'],
  },
  {
    quote:
      'I was nervous about needles but the doctor numbed the area first and I barely felt a thing. The facet injection relieved my neck pain faster than I expected. I would recommend this to anyone.',
    name: 'Dean W.',
    location: 'Cherry Hill, NJ',
    detail: 'Facet Joint Injection — Cervical Pain',
    date: 'January 2025',
    writeReviewHref: REVIEW_LINKS['cherry-hill-orthopedics'],
  },
];

export default function OrthopedicInjectionsPage() {
  return (
    <main className="w-full flex flex-col items-center justify-center bg-white h-full">
      {/* ── HERO ── */}
      <section
        className="w-full h-full flex flex-col relative overflow-hidden [mask-composite:intersect] [mask-image:linear-gradient(to_top,transparent,black_6rem)]"
      >
        <div
          style={{ filter: 'blur(30px)' }}
          className="w-full h-[120px] absolute top-0 z-[1]"
        />
        <Image
          src="/herosectionimg.jpg"
          priority
          fetchPriority="high"
          layout="fill"
          className="h-full absolute top-0 object-cover object-center w-full"
          alt="A board-certified specialist performing an orthopedic injection for pain relief"
        />
        <div
          className="lg:w-[100%] z-[1] h-full absolute left-0 top-0 md:w-[100%] w-full"
          style={{
            background:
              'linear-gradient(180deg, rgba(10, 80, 236, 0.20) 0%, rgba(255, 255, 255, 0.20) 100%)',
          }}
        />
        <div className="z-[1] flex flex-col w-full h-full text-left relative">
          <div className="max-w-[1440px] mx-auto w-full flex flex-col lg:flex-row items-start px-6 xl:px-[80px] pt-[220px] pb-10 gap-8 lg:gap-12 z-[2]">
            {/* Left: Breadcrumb + H1 + Description + CTAs */}
            <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left pb-6 lg:pb-0">
              <nav
                aria-label="Breadcrumb"
                className="text-xs md:text-md flex flex-row space-x-[4px] rounded-[62px] w-fit items-center justify-center px-[20px] py-[10px] mb-4"
                style={{ background: 'rgba(255, 255, 255, 0.50)' }}
              >
                <Link href="/" style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 400 }} className="text-[#252932]">Home</Link>
                <span style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 400 }} className="text-[#252932]">/</span>
                <Link href="/treatments" style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 400 }} className="text-[#252932]">Treatments</Link>
                <span style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 400 }} className="text-[#252932]">/</span>
                <span style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 400 }} className="text-[#2358AC]">Orthopedic Injections</span>
              </nav>
              <h1
                style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 400 }}
                className="text-[#252932] flex-wrap text-3xl md:text-6xl lg:text-7xl"
              >
                Get Expert Orthopedic Injections for Fast Pain Relief
              </h1>
              <p
                style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                className="text-[#252932] sm:text-xl text-sm mt-[24px] lg:max-w-[560px]"
              >
                Board-certified orthopedic specialists delivering cortisone shots, epidural steroid
                injections, nerve blocks, facet injections, and more — image-guided, in-office, and
                effective. 23 locations across FL, NJ, NY &amp; PA. Same-week appointments.
              </p>
              {/* Trust badges */}
              <div className="mt-4 flex flex-row flex-wrap gap-2 justify-center lg:justify-start">
                {[
                  'Same-Week Appointments',
                  'Board-Certified Specialists',
                  '23 Locations — FL, NJ, NY, PA & GA',
                  'PPO Insurance Accepted',
                ].map((badge) => (
                  <span
                    key={badge}
                    style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 400, background: 'rgba(255,255,255,0.60)' }}
                    className="text-[#252932] text-xs px-[14px] py-[7px] rounded-[62px] border border-[#252932]"
                  >
                    {badge}
                  </span>
                ))}
              </div>
              {/* CTA buttons */}
              <div className="mt-5 flex flex-col sm:flex-row flex-wrap gap-3 justify-center lg:justify-start">
                <Link
                  href="/find-care/book-an-appointment"
                  style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
                  className="bg-[#0A50EC] text-white px-[28px] py-[14px] rounded-[62px] text-sm shadow-sm hover:bg-[#1B2A4A] hover:shadow-md hover:scale-[1.03] active:scale-95 transition-all duration-200 text-center"
                >
                  Book Appointment
                </Link>
                <Link
                  href="/find-care/free-mri-review"
                  style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
                  className="bg-[#1B2A4A] text-white px-[28px] py-[14px] rounded-[62px] text-sm shadow-sm hover:bg-[#252932] hover:shadow-md hover:scale-[1.03] active:scale-95 transition-all duration-200 text-center"
                >
                  See If You Qualify for a Free MRI Review
                </Link>
              </div>
              <p
                style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                className="text-[#252932] text-xs mt-2 opacity-75"
              >
                Free MRI review available for qualifying PPO-insured patients.
              </p>
            </div>
            {/* Right: Hero Form — aligned with H1, not breadcrumb */}
            <div className="w-full max-w-[340px] sm:max-w-[360px] flex-shrink-0 mx-auto lg:mx-0 lg:mt-[52px]">
              <BodyPartHeroForm bodyPartTitle="Spine & Joint" />
            </div>
          </div>
        </div>
      </section>

      {/* ── PATIENT REVIEWS (Google Reviews–style) ── */}
      <GoogleStylePatientReviews
        testimonials={TESTIMONIALS}
        writeReviewHref={REVIEW_LINKS['hollywood-orthopedics']}
        aggregateReviewLabel="Featured patient stories"
      />

      {/* ── TWO-COLUMN LAYOUT ── */}
      <section className="max-w-[1440px] w-full flex lg:flex-row flex-col relative py-[50px] px-6 xl:px-[80px] space-x-[60px] pb-[100px] lg:pb-[50px]">
        {/* ── SIDEBAR ── */}
        <aside className="lg:w-[28%] w-full lg:order-1 order-2 bg-white flex flex-col lg:overflow-hidden lg:flex-shrink-0 lg:items-stretch">
          {/* Minimal contact CTA — de-emphasized for paid traffic */}
          <div className="border border-[#E5E7EB] rounded-[16px] p-5 bg-[#FAFAFA]">
            <p
              style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
              className="text-[#111315] text-sm mb-3"
            >
              Ready to schedule?
            </p>
            <Link
              href="/find-care/book-an-appointment"
              style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
              className="block w-full text-center bg-[#0A50EC] text-white px-4 py-3 rounded-[62px] text-sm hover:bg-[#1B2A4A] transition-colors mb-2"
            >
              Book Appointment
            </Link>
            <a
              href="tel:5612239959"
              style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 400 }}
              className="block w-full text-center border border-[#DCDEE1] text-[#424959] px-4 py-3 rounded-[62px] text-sm hover:bg-white transition-colors"
            >
              (561) 223-9959
            </a>
          </div>

          {/* Related injection treatments — focused sidebar replacing full treatment list */}
          <div className="mt-6 flex flex-col space-y-2">
            <p
              style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
              className="text-[#111315] text-xs uppercase tracking-wide mb-1"
            >
              Related Injection Treatments
            </p>
            {[
              { title: 'Orthopedic Injections', slug: 'orthopedic-injections' },
              { title: 'Epidural Steroid Injection', slug: 'epidural-steroid-injection' },
              { title: 'Cortisone Injections for Back Pain', slug: 'cortisone-injections-for-back-pain' },
              { title: 'Nerve Block Injection', slug: 'nerve-block-injection' },
              { title: 'Facet Ablation & Rhizotomy', slug: 'facet-ablation-rhizotomy-treatment' },
              { title: 'SI Joint Injection', slug: 'sacroiliac-joint-injection' },
              { title: 'Anti-Inflammatory Injections', slug: 'anti-inflammatory-injections-for-joint-and-spine-pain' },
              { title: 'Impar Block Treatment', slug: 'impar-block-treatment' },
            ].map(({ title, slug }) => {
              const isCurrent = slug === 'orthopedic-injections';
              return (
                <Link
                  key={slug}
                  href={`/treatments/${slug}`}
                  style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 400 }}
                  className={`flex flex-row items-center justify-between px-4 py-3 rounded-[10px] text-sm transition-colors ${
                    isCurrent
                      ? 'bg-[#252932] text-white'
                      : 'bg-[#FAFAFA] text-[#111315] hover:bg-[#F0F1F3]'
                  }`}
                >
                  <span>{title}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 8 14" fill="none" aria-hidden="true">
                    <path d="M0.55723 12.3964C0.718604 12.2745 1.20035 11.9106 1.47806 11.6939C2.03427 11.2598 2.77336 10.6667 3.51025 10.0269C4.25087 9.38385 4.97216 8.70833 5.50241 8.10822C5.76829 7.80731 5.97032 7.54297 6.10182 7.32484C6.22549 7.11969 6.25121 6.99851 6.25121 6.99851C6.25121 6.99851 6.22549 6.88088 6.10182 6.67574C5.97032 6.45761 5.76829 6.19328 5.50241 5.89236C4.97217 5.29225 4.25087 4.61674 3.51024 3.9737C2.77334 3.3339 2.03424 2.74079 1.47802 2.30671C1.20031 2.08998 0.719248 1.72658 0.557872 1.6047C0.224349 1.35906 0.152413 0.889059 0.398046 0.555536C0.643678 0.222013 1.11318 0.150764 1.4467 0.396397L1.44924 0.398315C1.6185 0.526155 2.11751 0.903056 2.40086 1.12419C2.96965 1.56806 3.73055 2.17849 4.49365 2.84105C5.25303 3.50037 6.03173 4.22604 6.62649 4.89916C6.9231 5.23486 7.18982 5.57515 7.38645 5.90131C7.57066 6.20689 7.75195 6.59379 7.75194 7.0003C7.75194 7.40681 7.57066 7.7937 7.38644 8.09927C7.18982 8.42544 6.9231 8.76573 6.62648 9.10143C6.03173 9.77454 5.25304 10.5002 4.49367 11.1595C3.73058 11.8221 2.96968 12.4325 2.40091 12.8764C2.11735 13.0977 1.61832 13.4746 1.44941 13.6022L1.44723 13.6038C1.11371 13.8495 0.643732 13.7786 0.398097 13.4451C0.152471 13.1115 0.223736 12.642 0.55723 12.3964Z" fill="currentColor" />
                  </svg>
                </Link>
              );
            })}
            <Link
              href="/treatments"
              style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 400 }}
              className="text-[#2358AC] text-xs text-center mt-2 hover:underline"
            >
              View all treatments →
            </Link>
          </div>

          {/* Doctors — mobile only */}
          <section className="bg-white space-y-[40px] lg:hidden flex flex-col mt-6">
            <h2
              style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 400 }}
              className="text-[#111315] sm:text-5xl text-3xl"
            >
              Our Pain Management Specialists
            </h2>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-[32px] gap-y-[32px]">
              {injectionDoctors.map((doctor) => (
                <DoctorCard doctor={doctor} key={doctor.name} />
              ))}
            </div>
          </section>

          {/* Internal linking — mobile only */}
          <div className="lg:hidden flex flex-col mt-6">
            <InternalLinkingSection currentSlug="orthopedic-injections" pageType="treatment" />
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <div className="w-full lg:w-[72%] lg:order-2 order-1 flex flex-col space-y-[60px] lg:mt-0 mt-6 rounded-[24px]">

          {/* ── SECTION D: Why Choose MSO (moved first) ── */}
          <section className="bg-[#FAFAFA] space-y-[32px] flex flex-col w-full p-4 md:p-[40px] rounded-[24px]">
            <h2
              style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
              className="text-[#111315] sm:text-5xl text-2xl"
            >
              Why Patients Choose Mountain Spine &amp; Orthopedics
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Board-Certified Orthopedic Surgeons',
                  body: 'Your injections are performed by fellowship-trained specialists — not general practitioners — bringing surgical-level expertise to every procedure.',
                },
                {
                  title: 'Image-Guided Precision',
                  body: 'Fluoroscopy and ultrasound guidance for every injection ensures the needle is precisely placed, improving accuracy and minimizing discomfort.',
                },
                {
                  title: '23 Locations Across FL, NJ, NY, PA & GA',
                  body: 'Same-week appointments available at 23 locations across Florida, New Jersey, New York, Pennsylvania, and Georgia. Convenient care close to where you live and work.',
                },
                {
                  title: 'PPO Insurance Accepted',
                  body: 'PPO insurance accepted. No-surprise billing policy. Call to verify your coverage before your appointment.',
                },
                {
                  title: 'No Referral Required',
                  body: 'Book directly online or by phone. No waiting for a referral — start treatment as soon as this week.',
                },
                {
                  title: 'Free MRI Review for Qualifying Patients',
                  body: 'PPO-insured patients with existing MRI imaging may qualify for a complimentary review. Our specialists will confirm whether an injection is the right first step — no obligation to proceed.',
                },
              ].map(({ title, body }) => (
                <div key={title} className="flex gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <circle cx="10" cy="10" r="10" fill="#2358AC" fillOpacity="0.1"/>
                      <path d="M6 10.5 L8.5 13 L14 7.5" stroke="#2358AC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="space-y-1">
                    <h3
                      style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
                      className="text-[#111315] text-base"
                    >
                      {title}
                    </h3>
                    <p
                      style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                      className="text-[#424959] text-sm"
                    >
                      {body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── SECTION A: What Is an Orthopedic Injection ── */}
          <section className="bg-[#FAFAFA] space-y-[24px] flex flex-col w-full p-4 md:p-[40px] rounded-[24px]">
            <h2
              style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
              className="text-[#111315] sm:text-5xl text-2xl"
            >
              What Is an Orthopedic Injection?
            </h2>
            <div
              style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
              className="text-[#424959] sm:text-xl text-sm leading-relaxed space-y-4 [&_strong]:font-semibold [&_strong]:text-[#111315]"
            >
              <p>
                An <strong>orthopedic injection</strong> is a targeted delivery of anti-inflammatory
                medication, local anesthetic, or other therapeutic substance directly into a joint,
                bursa, tendon sheath, or spinal space. By treating the source of pain precisely,
                injections can achieve higher therapeutic concentrations with fewer systemic side
                effects than oral medications.
              </p>
              <p>
                Orthopedic injections serve multiple purposes: providing pain relief, reducing
                inflammation, restoring joint lubrication, and confirming the exact source of pain
                as a diagnostic tool. For many patients, they are an effective non-surgical
                alternative — or a bridge treatment that reduces pain enough to allow participation
                in recovery activities.
              </p>
              <p>
                The most common types include <strong>cortisone shots</strong> (corticosteroid
                injections), <strong>epidural steroid injections</strong> for spine-related nerve
                pain, <strong>facet joint injections</strong> for spinal arthritis,{' '}
                <strong>SI joint injections</strong> for sacroiliac joint pain,{' '}
                <strong>nerve block injections</strong> for targeted nerve pain, and{' '}
                <strong>hyaluronic acid (gel) injections</strong> for knee osteoarthritis.
              </p>
              <p>
                At Mountain Spine & Orthopedics, every orthopedic injection is performed by
                board-certified orthopedic surgeons and pain management specialists using
                fluoroscopy or ultrasound image guidance — ensuring the medication is delivered
                precisely to the site of pain with maximum accuracy and safety.
              </p>
            </div>
          </section>

          {/* ── INJECTION RELIEF MAP ── */}
          <InjectionReliefMap />

          {/* ── SECTION B: Which Injection Is Right for You ── */}
          <section className="bg-[#FAFAFA] space-y-[32px] flex flex-col w-full p-4 md:p-[40px] rounded-[24px]">
            <div className="space-y-[16px]">
              <h2
                style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
                className="text-[#111315] sm:text-5xl text-2xl"
              >
                Which Injection Is Right for You?
              </h2>
              <p
                style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                className="text-[#424959] sm:text-xl text-sm"
              >
                The right injection depends on <strong>where your pain is</strong>, not just what
                it&apos;s called. Our specialists match the injection type to your exact anatomy.
              </p>
            </div>

            {/* Primary cards — 2 columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Back & Spine */}
              <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-6 hover:shadow-md transition-shadow border-t-4 border-t-[#2358AC]">
                <div className="mb-3">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <rect x="13" y="2" width="6" height="5" rx="1.5" fill="#2358AC"/>
                    <rect x="13" y="9" width="6" height="5" rx="1.5" fill="#2358AC" fillOpacity="0.7"/>
                    <rect x="13" y="16" width="6" height="5" rx="1.5" fill="#2358AC" fillOpacity="0.5"/>
                    <rect x="13" y="23" width="6" height="5" rx="1.5" fill="#2358AC" fillOpacity="0.3"/>
                    <rect x="8" y="4" width="4" height="2" rx="1" fill="#2358AC" fillOpacity="0.4"/>
                    <rect x="20" y="4" width="4" height="2" rx="1" fill="#2358AC" fillOpacity="0.4"/>
                    <rect x="8" y="11" width="4" height="2" rx="1" fill="#2358AC" fillOpacity="0.3"/>
                    <rect x="20" y="11" width="4" height="2" rx="1" fill="#2358AC" fillOpacity="0.3"/>
                    <rect x="8" y="18" width="4" height="2" rx="1" fill="#2358AC" fillOpacity="0.2"/>
                    <rect x="20" y="18" width="4" height="2" rx="1" fill="#2358AC" fillOpacity="0.2"/>
                  </svg>
                </div>
                <h3
                  style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
                  className="text-[#111315] text-lg mb-2"
                >
                  Back &amp; Spine Injections
                </h3>
                <p
                  style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                  className="text-[#424959] text-sm mb-3"
                >
                  For herniated discs, spinal stenosis, sciatica, and chronic lower back pain.
                </p>
                <ul
                  style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                  className="text-[#424959] text-sm space-y-1 mb-4 list-disc list-inside"
                >
                  <li>Epidural Steroid Injection</li>
                  <li>Facet Joint Injection</li>
                  <li>Nerve Block</li>
                  <li>SI Joint Injection</li>
                </ul>
                <Link
                  href="/treatments/epidural-steroid-injection"
                  style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
                  className="text-[#2358AC] text-sm hover:underline"
                >
                  Learn about spine injections →
                </Link>
              </div>

              {/* Neck */}
              <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-6 hover:shadow-md transition-shadow border-t-4 border-t-[#2358AC]">
                <div className="mb-3">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <ellipse cx="16" cy="8" rx="6" ry="4" fill="#2358AC" fillOpacity="0.3"/>
                    <rect x="13" y="12" width="6" height="4" rx="1.5" fill="#2358AC" fillOpacity="0.7"/>
                    <rect x="13" y="18" width="6" height="4" rx="1.5" fill="#2358AC" fillOpacity="0.5"/>
                    <path d="M10 26 Q16 30 22 26" stroke="#2358AC" strokeWidth="2" strokeLinecap="round" fill="none"/>
                  </svg>
                </div>
                <h3
                  style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
                  className="text-[#111315] text-lg mb-2"
                >
                  Neck &amp; Cervical Injections
                </h3>
                <p
                  style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                  className="text-[#424959] text-sm mb-3"
                >
                  For cervical disc herniation, cervical facet arthritis, and neck-related arm pain.
                </p>
                <ul
                  style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                  className="text-[#424959] text-sm space-y-1 mb-4 list-disc list-inside"
                >
                  <li>Cervical Epidural Steroid Injection</li>
                  <li>Cervical Facet Injection</li>
                  <li>Cervical Nerve Block</li>
                </ul>
                <Link
                  href="/treatments/epidural-steroid-injection"
                  style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
                  className="text-[#2358AC] text-sm hover:underline"
                >
                  Learn about cervical injections →
                </Link>
              </div>

              {/* Knee */}
              <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-6 hover:shadow-md transition-shadow border-t-4 border-t-[#2358AC]">
                <div className="mb-3">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M12 4 L12 14 Q8 16 8 20 L8 28" stroke="#2358AC" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                    <path d="M20 4 L20 14 Q24 16 24 20 L24 28" stroke="#2358AC" strokeWidth="2.5" strokeLinecap="round" fill="none" strokeOpacity="0.5"/>
                    <ellipse cx="16" cy="15" rx="5" ry="3.5" fill="#2358AC" fillOpacity="0.6"/>
                  </svg>
                </div>
                <h3
                  style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
                  className="text-[#111315] text-lg mb-2"
                >
                  Knee Injections
                </h3>
                <p
                  style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                  className="text-[#424959] text-sm mb-3"
                >
                  For knee arthritis, meniscus injuries, and chronic knee pain without surgery.
                </p>
                <ul
                  style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                  className="text-[#424959] text-sm space-y-1 mb-4 list-disc list-inside"
                >
                  <li>Cortisone Shot</li>
                  <li>Gel (Hyaluronic Acid) Injection</li>
                  <li>Intra-articular Injection</li>
                </ul>
                <Link
                  href="/conditions/knee-pain"
                  style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
                  className="text-[#2358AC] text-sm hover:underline"
                >
                  Learn about knee injections →
                </Link>
              </div>

              {/* Shoulder */}
              <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-6 hover:shadow-md transition-shadow border-t-4 border-t-[#2358AC]">
                <div className="mb-3">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <circle cx="10" cy="12" r="5" fill="#2358AC" fillOpacity="0.3"/>
                    <circle cx="10" cy="12" r="3" fill="#2358AC" fillOpacity="0.6"/>
                    <path d="M14 12 Q20 10 24 16 L28 22" stroke="#2358AC" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                    <path d="M10 17 L10 28" stroke="#2358AC" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3
                  style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
                  className="text-[#111315] text-lg mb-2"
                >
                  Shoulder Injections
                </h3>
                <p
                  style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                  className="text-[#424959] text-sm mb-3"
                >
                  For rotator cuff injuries, shoulder bursitis, and AC joint arthritis.
                </p>
                <ul
                  style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                  className="text-[#424959] text-sm space-y-1 mb-4 list-disc list-inside"
                >
                  <li>Cortisone Shot</li>
                  <li>Subacromial Bursa Injection</li>
                  <li>AC Joint Injection</li>
                </ul>
                <Link
                  href="/conditions/shoulder-pain"
                  style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
                  className="text-[#2358AC] text-sm hover:underline"
                >
                  Learn about shoulder injections →
                </Link>
              </div>
            </div>

            {/* Secondary cards — 3 columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Hip */}
              <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-5 hover:shadow-md transition-shadow">
                <h3
                  style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
                  className="text-[#111315] text-base mb-2"
                >
                  Hip Injections
                </h3>
                <p
                  style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                  className="text-[#424959] text-sm mb-2"
                >
                  For hip arthritis, trochanteric bursitis, and hip impingement pain.
                </p>
                <ul
                  style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                  className="text-[#424959] text-xs space-y-1 list-disc list-inside mb-3"
                >
                  <li>Cortisone Shot</li>
                  <li>Hip Joint Injection</li>
                  <li>Trochanteric Bursa Injection</li>
                </ul>
                <Link
                  href="/conditions/hip-pain"
                  style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
                  className="text-[#2358AC] text-xs hover:underline"
                >
                  Learn about hip injections →
                </Link>
              </div>

              {/* Ankle & Foot */}
              <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-5 hover:shadow-md transition-shadow">
                <h3
                  style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
                  className="text-[#111315] text-base mb-2"
                >
                  Ankle &amp; Foot Injections
                </h3>
                <p
                  style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                  className="text-[#424959] text-sm mb-2"
                >
                  For plantar fasciitis, heel pain, and ankle arthritis.
                </p>
                <ul
                  style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                  className="text-[#424959] text-xs space-y-1 list-disc list-inside mb-3"
                >
                  <li>Cortisone Shot</li>
                  <li>Ankle Joint Injection</li>
                  <li>Plantar Fascia Injection</li>
                </ul>
                <Link
                  href="/conditions/foot-pain"
                  style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
                  className="text-[#2358AC] text-xs hover:underline"
                >
                  Learn about foot &amp; ankle injections →
                </Link>
              </div>

              {/* Hand & Wrist */}
              <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-5 hover:shadow-md transition-shadow">
                <h3
                  style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
                  className="text-[#111315] text-base mb-2"
                >
                  Hand &amp; Wrist Injections
                </h3>
                <p
                  style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                  className="text-[#424959] text-sm mb-2"
                >
                  For carpal tunnel syndrome, trigger finger, and wrist arthritis.
                </p>
                <ul
                  style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                  className="text-[#424959] text-xs space-y-1 list-disc list-inside mb-3"
                >
                  <li>Carpal Tunnel Injection</li>
                  <li>Trigger Finger Injection</li>
                  <li>De Quervain&apos;s Injection</li>
                </ul>
                <Link
                  href="/conditions/carpal-tunnel-syndrome"
                  style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
                  className="text-[#2358AC] text-xs hover:underline"
                >
                  Learn about hand &amp; wrist injections →
                </Link>
              </div>
            </div>
          </section>

          {/* ── SECTION: Conditions & Diagnoses Treated ── */}
          <section className="bg-[#FAFAFA] space-y-[32px] flex flex-col w-full p-4 md:p-[40px] rounded-[24px]">
            <div className="space-y-[12px]">
              <h2
                style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
                className="text-[#111315] sm:text-5xl text-2xl"
              >
                Conditions &amp; Diagnoses We Treat with Injections
              </h2>
              <p
                style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                className="text-[#424959] sm:text-xl text-sm"
              >
                Our board-certified specialists use image-guided injections to treat a wide range of
                musculoskeletal and spinal conditions. If you have received any of the diagnoses below,
                you may be a strong candidate for non-surgical injection therapy.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Spine & Back */}
              <div className="space-y-3">
                <h3
                  style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 600 }}
                  className="text-[#111315] text-base flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-[#2358AC] flex-shrink-0" aria-hidden="true" />
                  Spine &amp; Back Pain
                </h3>
                <ul
                  style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                  className="text-[#424959] text-sm space-y-2"
                >
                  {[
                    ['Herniated disc (L4–L5, L5–S1)', 'Epidural Steroid Injection'],
                    ['Lumbar spinal stenosis', 'Epidural Steroid Injection'],
                    ['Sciatica / lumbar radiculopathy', 'ESI, Nerve Block'],
                    ['Degenerative disc disease', 'Facet Joint Injection, ESI'],
                    ['Facet joint arthritis / spondylosis', 'Facet Joint Injection'],
                    ['Sacroiliac (SI) joint dysfunction', 'SI Joint Injection'],
                    ['Piriformis syndrome', 'Trigger Point, Nerve Block'],
                    ['Facet block / medial branch block (diagnostic + therapeutic)', 'Facet Block, Medial Branch Block'],
                    ['Sympathetic block — severe leg pain / CRPS', 'Sympathetic Nerve Block'],
                    ['Failed back surgery syndrome', 'ESI, Nerve Block'],
                  ].map(([condition, injection]) => (
                    <li key={condition} className="flex items-start gap-2">
                      <span className="flex-shrink-0 text-[#2358AC] font-bold mt-0.5">›</span>
                      <span>
                        <strong style={{ fontWeight: 500 }} className="text-[#111315]">{condition}</strong>
                        <span className="text-[#6B7280]"> — {injection}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/conditions/back-pain"
                  style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
                  className="text-[#2358AC] text-xs hover:underline inline-block"
                >
                  All back &amp; spine conditions →
                </Link>
              </div>

              {/* Neck */}
              <div className="space-y-3">
                <h3
                  style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 600 }}
                  className="text-[#111315] text-base flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-[#2358AC] flex-shrink-0" aria-hidden="true" />
                  Neck &amp; Cervical Pain
                </h3>
                <ul
                  style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                  className="text-[#424959] text-sm space-y-2"
                >
                  {[
                    ['Cervical herniated disc', 'Cervical ESI'],
                    ['Cervical spinal stenosis', 'Cervical ESI'],
                    ['Cervical radiculopathy (arm pain)', 'Cervical ESI, Nerve Block'],
                    ['Cervical facet arthritis', 'Cervical Facet Injection'],
                    ['Neck-related headaches', 'Cervical Facet, Nerve Block'],
                    ['Occipital neuralgia / chronic headaches', 'Occipital Nerve Block'],
                    ['Whiplash / cervical strain', 'Trigger Point, Cervical ESI'],
                  ].map(([condition, injection]) => (
                    <li key={condition} className="flex items-start gap-2">
                      <span className="flex-shrink-0 text-[#2358AC] font-bold mt-0.5">›</span>
                      <span>
                        <strong style={{ fontWeight: 500 }} className="text-[#111315]">{condition}</strong>
                        <span className="text-[#6B7280]"> — {injection}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/conditions/neck-pain"
                  style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
                  className="text-[#2358AC] text-xs hover:underline inline-block"
                >
                  All neck &amp; cervical conditions →
                </Link>
              </div>

              {/* Knee */}
              <div className="space-y-3">
                <h3
                  style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 600 }}
                  className="text-[#111315] text-base flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-[#2358AC] flex-shrink-0" aria-hidden="true" />
                  Knee Pain
                </h3>
                <ul
                  style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                  className="text-[#424959] text-sm space-y-2"
                >
                  {[
                    ['Knee osteoarthritis (mild to severe)', 'Cortisone Shot, Gel Injection'],
                    ['Meniscus degeneration / tear', 'Cortisone Shot'],
                    ['Patellar tendinitis (jumper\'s knee)', 'Cortisone Shot'],
                    ['Prepatellar / pes anserine bursitis', 'Cortisone Shot'],
                    ['Post-surgical knee inflammation', 'Intra-articular Injection'],
                    ['Knee pain from gout or pseudogout', 'Cortisone Shot'],
                  ].map(([condition, injection]) => (
                    <li key={condition} className="flex items-start gap-2">
                      <span className="flex-shrink-0 text-[#2358AC] font-bold mt-0.5">›</span>
                      <span>
                        <strong style={{ fontWeight: 500 }} className="text-[#111315]">{condition}</strong>
                        <span className="text-[#6B7280]"> — {injection}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/conditions/knee-pain"
                  style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
                  className="text-[#2358AC] text-xs hover:underline inline-block"
                >
                  All knee conditions →
                </Link>
              </div>

              {/* Shoulder / Hip / Foot / Hand */}
              <div className="space-y-3">
                <h3
                  style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 600 }}
                  className="text-[#111315] text-base flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-[#2358AC] flex-shrink-0" aria-hidden="true" />
                  Shoulder, Hip, Foot &amp; Hand
                </h3>
                <ul
                  style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                  className="text-[#424959] text-sm space-y-2"
                >
                  {[
                    ['Rotator cuff tendinitis / partial tear', 'Subacromial Bursa Injection'],
                    ['Shoulder bursitis / impingement', 'Cortisone Shot'],
                    ['AC joint arthritis', 'AC Joint Injection'],
                    ['Hip osteoarthritis', 'Hip Joint Injection'],
                    ['Trochanteric bursitis (outer hip)', 'Bursa Injection'],
                    ['Plantar fasciitis / heel pain', 'Plantar Fascia Injection'],
                    ['Ankle arthritis', 'Ankle Joint Injection'],
                    ['Carpal tunnel syndrome', 'Carpal Tunnel Injection'],
                    ['Trigger finger', 'Trigger Finger Injection'],
                    ['De Quervain\'s tenosynovitis', 'Cortisone Shot'],
                  ].map(([condition, injection]) => (
                    <li key={condition} className="flex items-start gap-2">
                      <span className="flex-shrink-0 text-[#2358AC] font-bold mt-0.5">›</span>
                      <span>
                        <strong style={{ fontWeight: 500 }} className="text-[#111315]">{condition}</strong>
                        <span className="text-[#6B7280]"> — {injection}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-[#EEF3FF] border border-[#C7D8FF] rounded-[12px] p-4 flex flex-col sm:flex-row sm:items-center gap-4">
              <p
                style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                className="text-[#1B2A4A] text-sm flex-1"
              >
                <strong style={{ fontWeight: 600 }}>Not sure if your diagnosis qualifies?</strong>{' '}
                Our specialists offer complimentary MRI reviews for PPO-insured patients. Upload your
                imaging and a board-certified physician will review it and recommend the right next step.
              </p>
              <Link
                href="/find-care/free-mri-review"
                style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
                className="flex-shrink-0 bg-[#0A50EC] text-white px-5 py-3 rounded-[62px] text-sm hover:bg-[#1B2A4A] transition-colors text-center"
              >
                Get a Free MRI Review
              </Link>
            </div>
          </section>

          {/* ── SECTION C: What to Expect ── */}
          <section className="bg-[#FAFAFA] space-y-[32px] flex flex-col w-full p-4 md:p-[40px] rounded-[24px]">
            <h2
              style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
              className="text-[#111315] sm:text-5xl text-2xl"
            >
              What to Expect at Your Appointment
            </h2>

            <div className="space-y-6">
              {[
                {
                  step: '1',
                  title: 'Consultation & Imaging Review',
                  time: '15 min',
                  body: 'Your specialist reviews your imaging (X-ray, MRI) and medical history to confirm the injection is the right treatment and identify the precise injection site.',
                },
                {
                  step: '2',
                  title: 'Positioning & Preparation',
                  time: '5 min',
                  body: "You'll be positioned comfortably. The injection site is cleaned and a local anesthetic is applied so you feel minimal discomfort.",
                },
                {
                  step: '3',
                  title: 'Image-Guided Injection',
                  time: '10–15 min',
                  body: 'Using real-time fluoroscopy (X-ray) or ultrasound guidance, your doctor precisely places the needle and delivers the medication directly to the source of your pain. Guidance ensures accuracy and safety.',
                },
                {
                  step: '4',
                  title: 'Recovery & Discharge',
                  time: '15–30 min',
                  body: 'You rest briefly in the office. Most patients go home the same day. You may experience mild soreness at the injection site for 24–48 hours.',
                },
                {
                  step: '5',
                  title: 'Pain Relief Timeline',
                  time: 'Days to weeks',
                  body: 'Relief typically begins within 2–7 days as inflammation subsides. Effects last from several weeks to several months depending on the injection type and your condition.',
                },
              ].map(({ step, title, time, body }) => (
                <div key={step} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#2358AC] flex items-center justify-center">
                    <span
                      style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 600 }}
                      className="text-white text-sm"
                    >
                      {step}
                    </span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3
                        style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
                        className="text-[#111315] text-base sm:text-lg"
                      >
                        {title}
                      </h3>
                      <span
                        style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                        className="text-[#424959] text-xs px-2 py-0.5 bg-white border border-[#DCDEE1] rounded-full"
                      >
                        {time}
                      </span>
                    </div>
                    <p
                      style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                      className="text-[#424959] sm:text-xl text-sm"
                    >
                      {body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── SECTION: Insurance Coverage & Cost ── */}
          <section className="bg-[#FAFAFA] space-y-[28px] flex flex-col w-full p-4 md:p-[40px] rounded-[24px]">
            <div className="space-y-[12px]">
              <h2
                style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
                className="text-[#111315] sm:text-5xl text-2xl"
              >
                Does Insurance Cover Orthopedic Injections?
              </h2>
              <p
                style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                className="text-[#424959] sm:text-xl text-sm"
              >
                <strong style={{ fontWeight: 600, color: '#111315' }}>Yes — PPO insurance plans cover orthopedic injections</strong>{' '}
                when ordered by a physician for a documented diagnosis. Here is what to expect.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Coverage */}
              <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-6 space-y-4">
                <h3
                  style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 600 }}
                  className="text-[#111315] text-base"
                >
                  What Insurance Covers
                </h3>
                <ul
                  style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                  className="text-[#424959] text-sm space-y-2"
                >
                  {[
                    'Cortisone shots (corticosteroid injections) for joint and spine conditions',
                    'Epidural steroid injections for herniated disc, stenosis, and sciatica',
                    'Facet joint injections for spinal arthritis',
                    'SI joint injections for sacroiliac dysfunction',
                    'Nerve block injections for targeted nerve pain',
                    'Hyaluronic acid (gel) knee injections — covered by PPO plans',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="flex-shrink-0 mt-0.5" aria-hidden="true">
                        <circle cx="10" cy="10" r="10" fill="#2358AC" fillOpacity="0.1"/>
                        <path d="M6 10.5L8.5 13L14 7.5" stroke="#2358AC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cost & Carriers */}
              <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-6 space-y-4">
                <h3
                  style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 600 }}
                  className="text-[#111315] text-base"
                >
                  Typical Out-of-Pocket Costs
                </h3>
                <div
                  style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                  className="text-[#424959] text-sm space-y-3"
                >
                  <p>
                    <strong style={{ fontWeight: 600, color: '#111315' }}>With PPO insurance:</strong>{' '}
                    Most patients pay their standard specialist copay plus any remaining deductible.
                    The injection itself is billed separately and is usually covered in full after your copay.
                  </p>
                  <p>
                    <strong style={{ fontWeight: 600, color: '#111315' }}>Without insurance:</strong>{' '}
                    Self-pay options are available and vary by injection type and location.
                    Call our office to discuss pricing.
                  </p>
                </div>
                <div className="pt-2 border-t border-[#E5E7EB]">
                  <p
                    style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
                    className="text-[#111315] text-xs mb-2"
                  >
                    Insurance carriers we accept:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Aetna',
                      'Blue Cross Blue Shield',
                      'Cigna Healthcare',
                      'United Healthcare',
                      'Meritan Healthcare',
                      'Multiplan',
                      'Bright Health Group',
                      'PPO',
                      'Emblem Health',
                    ].map((carrier) => (
                      <span
                        key={carrier}
                        style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                        className="text-[#424959] bg-[#F3F4F6] text-xs px-2.5 py-1 rounded-full"
                      >
                        {carrier}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/find-care/book-an-appointment"
                style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
                className="bg-[#0A50EC] text-white px-6 py-3 rounded-[62px] text-sm hover:bg-[#1B2A4A] transition-colors text-center"
              >
                Book Appointment — No Referral Needed
              </Link>
              <a
                href="tel:5612239959"
                style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
                className="border border-[#DCDEE1] text-[#424959] px-6 py-3 rounded-[62px] text-sm hover:border-[#2358AC] hover:text-[#2358AC] transition-colors text-center"
              >
                Call to Verify Coverage: (561) 223-9959
              </a>
            </div>
          </section>

          {/* ── SECTION: Are Injections Right for You? ── */}
          <section className="bg-[#FAFAFA] space-y-[28px] flex flex-col w-full p-4 md:p-[40px] rounded-[24px]">
            <div className="space-y-[12px]">
              <h2
                style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
                className="text-[#111315] sm:text-5xl text-2xl"
              >
                Are Orthopedic Injections Right for You?
              </h2>
              <p
                style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                className="text-[#424959] sm:text-xl text-sm"
              >
                Injections are not the right choice for every patient or every condition. Our specialists
                evaluate each patient individually to match the treatment to the diagnosis. Here is a
                general guide to help you understand whether injection therapy may apply to your situation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Good candidates */}
              <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-6 space-y-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-7 h-7 rounded-full bg-green-50 border border-green-200 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2.5 7.5L5.5 10.5L11.5 4" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3
                    style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 600 }}
                    className="text-[#111315] text-base"
                  >
                    You may be a good candidate if:
                  </h3>
                </div>
                <ul
                  style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                  className="text-[#424959] text-sm space-y-2"
                >
                  {[
                    'Your pain has not responded to rest, rehabilitation, or oral medications',
                    'You have a confirmed diagnosis via MRI, X-ray, or clinical examination',
                    'Surgery is not yet indicated or you prefer to exhaust non-surgical options first',
                    'Your pain significantly limits daily activities, work, or sleep',
                    'You are not currently on anticoagulant medications (or can safely pause them)',
                    'You have localized pain from arthritis, disc disease, bursitis, or nerve compression',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="flex-shrink-0 text-green-600 font-bold mt-0.5">›</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Caution / not candidates */}
              <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-6 space-y-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-7 h-7 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M7 2v6M7 10v1.5" stroke="#d97706" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <h3
                    style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 600 }}
                    className="text-[#111315] text-base"
                  >
                    Discuss with your doctor first if:
                  </h3>
                </div>
                <ul
                  style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                  className="text-[#424959] text-sm space-y-2"
                >
                  {[
                    'You have an active infection near the injection site or elsewhere in the body',
                    'You are currently taking prescription blood thinners — your doctor will advise whether a temporary pause is needed before your procedure',
                    'You are pregnant or may be pregnant',
                    'You have uncontrolled diabetes — steroids can temporarily elevate blood sugar',
                    'You have received 3–4 cortisone shots in the same joint within the past year',
                    'You have known allergy to corticosteroids or contrast dye (for fluoroscopy-guided procedures)',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="flex-shrink-0 text-amber-600 font-bold mt-0.5">›</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p
              style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
              className="text-[#424959] text-sm leading-relaxed"
            >
              <strong style={{ fontWeight: 600, color: '#111315' }}>Clinical evidence:</strong>{' '}
              Corticosteroid injections are supported by strong clinical evidence for short-to-medium-term
              pain relief in knee osteoarthritis (Cochrane Review, 2015), lumbar radiculopathy (AAOS
              guidelines), and shoulder bursitis. Hyaluronic acid injections show significant benefit in
              moderate knee osteoarthritis, particularly for patients not yet ready for joint replacement
              (OARSI guidelines). Our specialists discuss evidence-based expectations with every patient
              before proceeding.
            </p>
          </section>

          {/* ── SECTION F: Doctors (desktop) ── */}
          <section className="hidden lg:flex flex-col space-y-[40px]">
            <h2
              style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 400 }}
              className="text-[#111315] sm:text-5xl text-3xl"
            >
              Our Pain Management Specialists
            </h2>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-[32px] gap-y-[32px]">
              {injectionDoctors.map((doctor) => (
                <DoctorCard doctor={doctor} key={doctor.name} />
              ))}
            </div>
          </section>

          {/* ── SECTION G: FAQ ── */}
          <section className="bg-[#FAFAFA] space-y-[40px] flex flex-col w-full p-4 md:p-[40px] rounded-[24px]">
            <h2
              style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
              className="text-[#111315] sm:text-4xl text-2xl"
              id="faq-heading"
            >
              Frequently Asked Questions About Orthopedic Injections
            </h2>
            <InjectionsFAQ faqs={INJECTION_FAQS} />
          </section>

          {/* ── SECTION: Service Areas ── */}
          <section className="bg-[#FAFAFA] space-y-[24px] flex flex-col w-full p-4 md:p-[40px] rounded-[24px]">
            <h2
              style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
              className="text-[#111315] sm:text-4xl text-2xl"
            >
              Find Orthopedic Injections Near You
            </h2>
            <p
              style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
              className="text-[#424959] sm:text-lg text-sm"
            >
              Mountain Spine &amp; Orthopedics operates <strong style={{ fontWeight: 600, color: '#111315' }}>23 clinic locations</strong> across
              Florida, New Jersey, New York, Pennsylvania, and Georgia — making board-certified injection therapy
              accessible no matter where you live or work. Same-week appointments are available at all
              locations. No referral required.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  state: 'Florida',
                  cities: ['Boca Raton', 'Hollywood', 'Palm Beach Gardens', 'Palm Springs', 'South Miami', 'Orlando', 'Altamonte Springs', 'Davenport', 'Fort Pierce', 'Jacksonville'],
                  href: '/locations/florida',
                },
                {
                  state: 'New Jersey',
                  cities: ['Bridgewater', 'Cherry Hill', 'Edison', 'Freehold', 'Paramus', 'Princeton', 'Voorhees', 'West Orange'],
                  href: '/locations/new-jersey',
                },
                {
                  state: 'New York',
                  cities: ['New York City'],
                  href: '/locations/new-york',
                },
                {
                  state: 'Pennsylvania',
                  cities: ['Allentown', 'Philadelphia'],
                  href: '/locations/pennsylvania',
                },
              ].map(({ state, cities, href }) => (
                <div key={state} className="bg-white border border-[#E5E7EB] rounded-[16px] p-5 space-y-3">
                  <h3
                    style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 600 }}
                    className="text-[#111315] text-sm"
                  >
                    {state}
                  </h3>
                  <ul
                    style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                    className="text-[#424959] text-xs space-y-1"
                  >
                    {cities.map((city) => (
                      <li key={city} className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-[#2358AC] flex-shrink-0" aria-hidden="true" />
                        {city}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={href}
                    style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
                    className="text-[#2358AC] text-xs hover:underline inline-block pt-1"
                  >
                    View {state} locations →
                  </Link>
                </div>
              ))}
            </div>
            <Link
              href="/find-care/book-an-appointment"
              style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
              className="self-start bg-[#0A50EC] text-white px-6 py-3 rounded-[62px] text-sm hover:bg-[#1B2A4A] transition-colors"
            >
              Find My Nearest Location &amp; Book
            </Link>
          </section>

          {/* ── SECTION E: Surgical Funnel (Final CTA) ── */}
          <section className="bg-[#1B2A4A] space-y-[24px] flex flex-col w-full p-4 md:p-[40px] rounded-[24px]">
            <h2
              style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
              className="text-white sm:text-4xl text-2xl"
            >
              When Injections Are the First Step Toward Lasting Relief
            </h2>
            <div className="space-y-4">
              <p
                style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                className="text-white sm:text-xl text-sm opacity-90"
              >
                For most patients, orthopedic injections are an effective non-surgical treatment
                that provides meaningful pain relief for months. Beyond relief, injections serve a
                critical diagnostic role — pinpointing the exact nerve, joint, or spinal structure
                responsible for your pain with a precision that imaging alone cannot always confirm.
              </p>
              <p
                style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                className="text-white sm:text-xl text-sm opacity-90"
              >
                When injections alone cannot provide lasting relief, that diagnostic information
                guides our surgeons toward the right surgical solution. Many of our injection
                patients go on to explore minimally invasive options such as{' '}
                <Link href="/treatments/lumbar-microdiscectomy-surgery" className="underline opacity-90 hover:opacity-100">microdiscectomy</Link>,{' '}
                <Link href="/treatments/lumbar-laminectomy-surgery" className="underline opacity-90 hover:opacity-100">lumbar laminectomy</Link>,{' '}
                <Link href="/treatments/cervical-disc-replacement" className="underline opacity-90 hover:opacity-100">cervical disc replacement</Link>, or{' '}
                <Link href="/treatments/total-knee-replacement" className="underline opacity-90 hover:opacity-100">joint replacement</Link>{' '}
                when conservative treatment has been exhausted. Each procedure directly addresses
                the root cause that injections were managing.
              </p>
              <p
                style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                className="text-white sm:text-xl text-sm opacity-90"
              >
                Most patients are bounced between a pain management clinic, a spine specialist, and
                a surgeon — three separate practices, three separate intake processes, no shared
                history. At Mountain Spine &amp; Orthopedics, all three are available under one
                roof. Your care — from your first injection to any surgical consultation — stays
                with the same board-certified team, with no referrals and no starting over.
              </p>
            </div>
            <div className="flex flex-row flex-wrap gap-4">
              <Link
                href="/find-care/book-an-appointment"
                style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
                className="bg-white text-[#1B2A4A] px-[24px] py-[12px] rounded-[62px] text-sm hover:bg-[#FAFAFA] hover:scale-[1.03] active:scale-95 transition-all duration-200"
              >
                Book Appointment
              </Link>
              <Link
                href="/conditions/spine"
                style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
                className="border border-white text-white px-[24px] py-[12px] rounded-[62px] text-sm hover:bg-white hover:text-[#1B2A4A] transition-colors"
              >
                Learn About Spine Surgery
              </Link>
            </div>
          </section>

          {/* ── SECTION H: Internal Linking (desktop) ── */}
          <div className="hidden lg:flex flex-col">
            <InternalLinkingSection currentSlug="orthopedic-injections" pageType="treatment" />
          </div>
        </div>
      </section>

      {/* ── MOBILE STICKY CTA ── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#1B2A4A] px-4 py-3 flex flex-row gap-3 items-center justify-center">
        <a
          href="tel:5612239959"
          style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
          className="flex-1 text-center bg-white text-[#1B2A4A] px-4 py-3 rounded-[62px] text-sm"
        >
          (561) 223-9959
        </a>
        <Link
          href="/find-care/book-an-appointment"
          style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
          className="flex-1 text-center bg-[#0A50EC] text-white px-4 py-3 rounded-[62px] text-sm"
        >
          Book Now
        </Link>
      </div>
    </main>
  );
}
