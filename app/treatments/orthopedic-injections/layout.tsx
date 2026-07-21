import type { Metadata } from 'next';
import React from 'react';
import { buildCanonical } from '@/lib/seo';
import { isProviderVisible, providerIds } from '@/lib/providers/providerVisibility';

const BASE_URL = 'https://mountainspineorthopedics.com';
const PAGE_PATH = '/treatments/orthopedic-injections';
const PAGE_URL = `${BASE_URL}${PAGE_PATH}`;
const OG_IMAGE = 'https://mountainspineortho.b-cdn.net/treatments-thumbnails/orthopedic-injections-mountain-spine-orthopedics.png';
const DATE_PUBLISHED = '2024-01-15';
const DATE_MODIFIED  = '2026-04-03';

const META_TITLE =
  'Orthopedic Injections & Cortisone Shots Near Me | Mountain Spine & Orthopedics';
const META_DESCRIPTION =
  'Board-certified orthopedic specialists offering cortisone shots, epidural steroid injections, nerve blocks, facet & SI joint injections for back, neck, knee and shoulder pain. 23 locations across FL, NJ, NY & PA. PPO insurance accepted — same-week appointments, no referral needed.';

export const metadata: Metadata = {
  title: META_TITLE,
  description: META_DESCRIPTION,
  keywords: [
    'orthopedic injections',
    'cortisone shot near me',
    'cortisone injection near me',
    'epidural steroid injection near me',
    'facet joint injection',
    'SI joint injection',
    'nerve block injection',
    'pain management doctor near me',
    'cortisone shot for knee pain',
    'cortisone shot for back pain',
    'cortisone shot for shoulder pain',
    'cortisone shot for hip pain',
    'steroid injection near me',
    'injection for sciatica',
    'injection for herniated disc',
    'injection for spinal stenosis',
    'orthopedic pain management Florida',
    'orthopedic pain management New Jersey',
    'orthopedic pain management New York',
    'cortisone shot Florida',
    'cortisone shot New Jersey',
    'injection for back pain relief',
    'pain injection doctor near me',
    'does insurance cover cortisone shot',
    'how long does cortisone shot last',
    'hyaluronic acid knee injection',
    'gel injection for knee',
    'cortisone shot Boca Raton',
    'cortisone shot Fort Lauderdale',
    'cortisone shot Cherry Hill NJ',
    'epidural steroid injection Florida',
  ],
  robots: { index: true, follow: true },
  openGraph: {
    title: META_TITLE,
    description: META_DESCRIPTION,
    type: 'article',
    url: PAGE_URL,
    siteName: 'Mountain Spine & Orthopedics',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Orthopedic Injections for Pain Relief — Mountain Spine & Orthopedics' }],
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: META_TITLE,
    description: META_DESCRIPTION,
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: buildCanonical(PAGE_PATH),
  },
};

// ─── Schema IDs ───────────────────────────────────────────────────────────────
const organizationId = `${BASE_URL}#medicalorganization`;
const procedureId    = `${PAGE_URL}#medicalprocedure`;
const webpageId      = `${PAGE_URL}#webpage`;
const serviceId      = `${PAGE_URL}#service`;
const breadcrumbId   = `${PAGE_URL}#breadcrumb`;
const faqId          = `${PAGE_URL}#faqpage`;
const itemListId     = `${PAGE_URL}#itemlist`;
const howToId        = `${PAGE_URL}#howto`;

const consolidatedSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    // ── 1. MedicalOrganization ──────────────────────────────────────────────
    {
      '@type': 'MedicalOrganization',
      '@id': organizationId,
      name: 'Mountain Spine & Orthopedics',
      url: BASE_URL,
      logo: `${BASE_URL}/newlogo4.png`,
      image: `${BASE_URL}/herosectionimg.jpg`,
      telephone: [
        '(561) 223-9959',
        '(754) 212-8736',
        '(407) 565-7598',
        '(407) 960-1717',
        '(863) 777-5805',
        '(561) 556-1802',
        '(954) 987-2047',
        '(561) 544-5501',
      ],
      medicalSpecialty: [
        'Orthopedic Surgery',
        'Spine Surgery',
        'Sports Medicine',
        'Pain Management',
        'Minimally Invasive Surgery',
        'Joint Replacement',
        'Spinal Fusion',
        'Discectomy',
        'Arthroscopy',
      ],
      areaServed: [
        { '@type': 'State', name: 'Florida',      sameAs: 'https://en.wikipedia.org/wiki/Florida' },
        { '@type': 'State', name: 'New Jersey',   sameAs: 'https://en.wikipedia.org/wiki/New_Jersey' },
        { '@type': 'State', name: 'New York',     sameAs: 'https://en.wikipedia.org/wiki/New_York_(state)' },
        { '@type': 'State', name: 'Pennsylvania', sameAs: 'https://en.wikipedia.org/wiki/Pennsylvania' },
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5',
        reviewCount: '54',
        bestRating: '5',
        worstRating: '1',
      },
      hasCredential: [
        { '@type': 'EducationalOccupationalCredential', credentialCategory: 'Board Certification', recognizedBy: { '@type': 'Organization', name: 'American Board of Orthopaedic Surgery' } },
        { '@type': 'EducationalOccupationalCredential', credentialCategory: 'Board Certification', recognizedBy: { '@type': 'Organization', name: 'American Board of Neurological Surgery' } },
      ],
    },

    // ── 2. MedicalProcedure ─────────────────────────────────────────────────
    {
      '@type': 'MedicalProcedure',
      '@id': procedureId,
      name: 'Orthopedic Injections for Pain Relief',
      alternateName: [
        'Cortisone Shot',
        'Steroid Injection',
        'Epidural Steroid Injection',
        'Cortisone Injection',
        'Joint Injection',
        'Nerve Block Injection',
        'Facet Joint Injection',
        'Facet Block',
        'Medial Branch Block',
        'SI Joint Injection',
        'Hyaluronic Acid Injection',
        'Gel Knee Injection',
        'Occipital Nerve Block',
        'Sympathetic Nerve Block',
      ],
      description:
        'Orthopedic injections including cortisone shots, epidural steroid injections, nerve blocks, facet joint injections, SI joint injections, and hyaluronic acid (gel) injections for pain relief from back, neck, knee, shoulder, hip, and foot conditions. Performed under fluoroscopy or ultrasound image guidance by board-certified orthopedic surgeons and pain management specialists.',
      procedureType: 'https://health-lifesci.schema.org/TherapeuticProcedure',
      followup:
        'Patients typically resume normal activities within 24–48 hours. Pain relief begins within 2–7 days and may last weeks to months depending on injection type.',
      howPerformed:
        'Image-guided (fluoroscopy or ultrasound) injection performed in-office under local anesthetic. Procedure takes 10–15 minutes; total visit 45–60 minutes.',
      preparation:
        'Inform your doctor of current medications, especially blood thinners. Most patients do not require special preparation. No sedation required.',
      bodyLocation: [
        'Lumbar spine',
        'Cervical spine',
        'Thoracic spine',
        'Knee joint',
        'Shoulder joint',
        'Hip joint',
        'SI joint',
        'Facet joints',
        'Ankle joint',
        'Plantar fascia',
        'Carpal tunnel',
      ],
      relevantSpecialty: 'Orthopedic Surgery',
      recognizingAuthority: {
        '@type': 'MedicalOrganization',
        name: 'American Academy of Orthopaedic Surgeons',
        sameAs: 'https://www.aaos.org',
      },
      guideline: {
        '@type': 'MedicalGuidelineRecommendation',
        guidelineSubject: { '@type': 'MedicalEntity', name: 'Corticosteroid Injection Therapy' },
        evidenceLevel: 'https://schema.org/EvidenceLevelA',
        recommendationStrength: 'Strong',
      },
      performedBy: { '@id': organizationId },
    },

    // ── 3. MedicalWebPage ───────────────────────────────────────────────────
    {
      '@type': 'MedicalWebPage',
      '@id': webpageId,
      url: PAGE_URL,
      name: META_TITLE,
      description: META_DESCRIPTION,
      about: { '@id': procedureId },
      isPartOf: { '@type': 'WebSite', url: BASE_URL, name: 'Mountain Spine & Orthopedics' },
      specialty: 'Orthopedic Surgery',
      medicalAudience: {
        '@type': 'MedicalAudience',
        audienceType: 'patient',
        healthCondition: [
          { '@type': 'MedicalCondition', name: 'Back Pain' },
          { '@type': 'MedicalCondition', name: 'Knee Osteoarthritis' },
          { '@type': 'MedicalCondition', name: 'Sciatica' },
          { '@type': 'MedicalCondition', name: 'Herniated Disc' },
          { '@type': 'MedicalCondition', name: 'Shoulder Bursitis' },
          { '@type': 'MedicalCondition', name: 'Hip Arthritis' },
        ],
      },
      breadcrumb: { '@id': breadcrumbId },
      datePublished: DATE_PUBLISHED,
      dateModified: DATE_MODIFIED,
      lastReviewed: DATE_MODIFIED,
      reviewedBy: {
        '@type': 'Person',
        name: 'Mountain Spine & Orthopedics Medical Team',
        jobTitle: 'Board-Certified Orthopedic Surgeons',
      },
      inLanguage: 'en-US',
    },

    // ── 4. Service ──────────────────────────────────────────────────────────
    {
      '@type': 'Service',
      '@id': serviceId,
      name: 'Orthopedic Injection Therapy',
      description:
        'Comprehensive orthopedic injection services including cortisone shots, epidural steroid injections, nerve blocks, facet injections, SI joint injections, and gel (hyaluronic acid) injections for joint and spine pain. Board-certified specialists. Same-week appointments. PPO insurance accepted.',
      provider: { '@id': organizationId },
      serviceType: 'Pain Management',
      areaServed: [
        { '@type': 'State', name: 'Florida' },
        { '@type': 'State', name: 'New Jersey' },
        { '@type': 'State', name: 'New York' },
        { '@type': 'State', name: 'Pennsylvania' },
      ],
      availableChannel: {
        '@type': 'ServiceChannel',
        serviceUrl: `${BASE_URL}/find-care/book-an-appointment`,
        servicePhone: '(561) 223-9959',
        availableLanguage: { '@type': 'Language', name: 'English' },
      },
      offers: {
        '@type': 'Offer',
        description: 'PPO and commercial insurance plans accepted. Free MRI review for qualifying PPO-insured patients.',
        acceptedPaymentMethod: [
          { '@type': 'PaymentMethod', name: 'Insurance' },
          { '@type': 'PaymentMethod', name: 'PPO' },
        ],
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Orthopedic Injection Types',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Cortisone Shot (Corticosteroid Injection)' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Epidural Steroid Injection (ESI)' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Facet Joint Injection' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SI Joint Injection' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Nerve Block Injection' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Hyaluronic Acid (Gel) Knee Injection' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Trigger Point Injection' } },
        ],
      },
    },

    // ── 5. BreadcrumbList ───────────────────────────────────────────────────
    {
      '@type': 'BreadcrumbList',
      '@id': breadcrumbId,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home',                 item: `${BASE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Treatments',           item: `${BASE_URL}/treatments` },
        { '@type': 'ListItem', position: 3, name: 'Orthopedic Injections', item: PAGE_URL },
      ],
    },

    // ── 6. FAQPage — ALL 9 questions (must match page content exactly) ──────
    {
      '@type': 'FAQPage',
      '@id': faqId,
      url: PAGE_URL,
      about: { '@id': procedureId },
      isPartOf: { '@id': webpageId },
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How long does a cortisone shot last?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Varies by injection type and location. Cortisone shots for joints typically provide 4–8 weeks of significant relief; some patients experience 3–6 months. Epidural steroid injections for back or neck pain often last 3–6 months. Hyaluronic acid (gel) knee injections typically provide 6 months or more. Individual results vary based on severity of condition, patient age, and activity level.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does a cortisone shot hurt?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Most patients report mild discomfort — similar to a blood draw or vaccine. A local anesthetic is applied to numb the skin before the injection, significantly reducing pain. The injection itself may cause brief pressure or a burning sensation as medication enters the joint or spinal space, which typically resolves within seconds. Post-injection soreness at the site for 24–48 hours is normal and usually managed with ice.',
          },
        },
        {
          '@type': 'Question',
          name: 'How many cortisone shots can I get per year?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The generally accepted limit is 3–4 cortisone shots per joint per year. Frequent corticosteroid injections can weaken cartilage and tendons over time. Your orthopedic specialist will evaluate whether additional injections are appropriate based on your response to prior injections and overall treatment goals.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between a cortisone shot and a gel injection?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Cortisone shots (corticosteroid injections) deliver anti-inflammatory medication to reduce swelling and pain. Gel injections (hyaluronic acid or viscosupplementation) add lubricating fluid to the joint, primarily used for knee osteoarthritis. Cortisone works faster (2–7 days) with stronger immediate effect; gel injections may last longer (6+ months) for appropriate candidates.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do I need a referral for an orthopedic injection?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. At Mountain Spine & Orthopedics, you do not need a referral to schedule a consultation for injection therapy. You can book directly online or by calling your nearest location. PPO insurance plans allow direct access to specialists.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is an epidural steroid injection?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'An epidural steroid injection (ESI) delivers corticosteroid medication directly into the epidural space surrounding the spinal cord and nerve roots. It is most commonly used for back pain caused by herniated discs, spinal stenosis, or nerve compression causing sciatica. ESIs are performed under fluoroscopy guidance, typically take 15–20 minutes, and are performed as an outpatient procedure.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is a facet joint injection?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Facet joint injections treat pain originating from the small joints along the spine that connect vertebrae to each other. The injection delivers corticosteroid medication directly into the affected facet joint under fluoroscopy guidance. Relief typically lasts several months. Facet injections also serve a diagnostic function to confirm the facet joint as the pain source.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much does a cortisone shot cost with insurance?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'With PPO insurance, your out-of-pocket cost is typically your standard specialist copay plus any remaining deductible responsibility. PPO insurance plans cover medically necessary orthopedic injections when documented as treatment for a diagnosed condition. Mountain Spine & Orthopedics accepts PPO insurance plans.',
          },
        },
        {
          '@type': 'Question',
          name: 'Who qualifies for the free MRI review?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The complimentary MRI review is available to patients who carry PPO insurance and have existing MRI imaging (within the last 2 years) of the spine, knee, shoulder, hip, or other affected joint. One of our board-certified specialists evaluates your imaging and discusses whether an orthopedic injection or another treatment path is the right next step — no obligation to proceed.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does insurance cover orthopedic injections?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. PPO insurance plans cover medically necessary orthopedic injections, including cortisone shots, epidural steroid injections, facet joint injections, and SI joint injections, when ordered by a physician for a documented diagnosis. Mountain Spine & Orthopedics accepts Aetna, Blue Cross Blue Shield, Cigna, UnitedHealthcare, and other PPO carriers. Call our office or use our online insurance verification tool to confirm your specific coverage before your appointment.',
          },
        },
        {
          '@type': 'Question',
          name: 'How quickly can I get an orthopedic injection appointment?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Mountain Spine & Orthopedics offers same-week appointments at 23 locations across Florida, New Jersey, New York, and Pennsylvania. No referral is required for PPO-insured patients. You can book online 24/7 or call (561) 223-9959 to speak with a patient coordinator. Most new patients are seen within 2–5 business days.',
          },
        },
      ],
    },

    // ── 7. ItemList — injection types ───────────────────────────────────────
    {
      '@type': 'ItemList',
      '@id': itemListId,
      name: 'Types of Orthopedic Injections Offered at Mountain Spine & Orthopedics',
      itemListElement: [
        { '@type': 'ListItem', position: 1,  name: 'Cortisone Shot (Corticosteroid Injection)',    url: `${BASE_URL}/treatments/cortisone-injections-for-back-pain` },
        { '@type': 'ListItem', position: 2,  name: 'Epidural Steroid Injection',                   url: `${BASE_URL}/treatments/epidural-steroid-injection` },
        { '@type': 'ListItem', position: 3,  name: 'Facet Joint Injection',                        url: `${BASE_URL}/treatments/facet-ablation-rhizotomy-treatment` },
        { '@type': 'ListItem', position: 4,  name: 'SI Joint Injection',                           url: `${BASE_URL}/treatments/orthopedic-injections` },
        { '@type': 'ListItem', position: 5,  name: 'Nerve Block Injection',                        url: `${BASE_URL}/treatments/nerve-block-injection` },
        { '@type': 'ListItem', position: 6,  name: 'Hyaluronic Acid (Gel) Knee Injection',         url: `${BASE_URL}/conditions/knee-pain` },
        { '@type': 'ListItem', position: 7,  name: 'Trigger Point Injection',                      url: `${BASE_URL}/treatments/orthopedic-injections` },
        { '@type': 'ListItem', position: 8,  name: 'Subacromial Bursa Injection (Shoulder)',        url: `${BASE_URL}/conditions/shoulder-pain` },
        { '@type': 'ListItem', position: 9,  name: 'Plantar Fascia Injection (Heel Pain)',          url: `${BASE_URL}/conditions/foot-pain` },
        { '@type': 'ListItem', position: 10, name: 'Carpal Tunnel Injection',                       url: `${BASE_URL}/conditions/carpal-tunnel-syndrome` },
        { '@type': 'ListItem', position: 11, name: 'Occipital Nerve Block (for headaches)',          url: `${BASE_URL}/treatments/orthopedic-injections` },
        { '@type': 'ListItem', position: 12, name: 'Medial Branch Block / Facet Block',              url: `${BASE_URL}/treatments/facet-ablation-rhizotomy-treatment` },
        { '@type': 'ListItem', position: 13, name: 'Sympathetic Nerve Block (for severe leg pain)',  url: `${BASE_URL}/treatments/orthopedic-injections` },
      ],
    },

    // ── 8. Individual MedicalProcedure — per injection type ─────────────────
    {
      '@type': 'MedicalProcedure',
      '@id': `${PAGE_URL}#cortisone-injection`,
      name: 'Cortisone Shot (Corticosteroid Injection)',
      alternateName: ['Cortisone Injection', 'Steroid Injection', 'Joint Injection', 'Corticosteroid Shot'],
      description: 'A corticosteroid injection that delivers powerful anti-inflammatory medication directly into a joint, bursa, or spinal space to reduce swelling and relieve pain.',
      procedureType: 'https://health-lifesci.schema.org/TherapeuticProcedure',
      bodyLocation: ['Knee joint', 'Shoulder joint', 'Hip joint', 'Ankle joint', 'Elbow', 'Wrist', 'Facet joints'],
      howPerformed: 'Performed in-office under local anesthetic. A needle delivers corticosteroid medication directly to the inflamed site, often guided by ultrasound. Takes 10–15 minutes.',
      preparation: 'No fasting required. Inform physician of current medications, especially blood thinners.',
      followUp: 'Resume normal activities within 24–48 hours. Pain relief begins in 2–7 days and may last weeks to months.',
      performedBy: { '@id': organizationId },
    },
    {
      '@type': 'MedicalProcedure',
      '@id': `${PAGE_URL}#epidural-steroid-injection`,
      name: 'Epidural Steroid Injection',
      alternateName: ['ESI', 'Spinal Steroid Injection', 'Cervical Epidural', 'Lumbar Epidural'],
      description: 'Injection of corticosteroid medication into the epidural space surrounding the spinal cord and nerve roots to reduce inflammation causing radicular pain, sciatica, or spinal stenosis symptoms.',
      procedureType: 'https://health-lifesci.schema.org/TherapeuticProcedure',
      bodyLocation: ['Lumbar epidural space', 'Cervical epidural space', 'Thoracic epidural space'],
      howPerformed: 'Performed under fluoroscopy (real-time X-ray) guidance. Contrast dye confirms needle placement before corticosteroid is delivered. Outpatient procedure taking 15–20 minutes.',
      preparation: 'Inform physician of blood thinners and allergies to contrast dye. No sedation required for most patients.',
      followUp: 'Pain relief typically begins within 2–7 days. Effects last 3–6 months for most patients.',
      performedBy: { '@id': organizationId },
    },
    {
      '@type': 'MedicalProcedure',
      '@id': `${PAGE_URL}#facet-joint-injection`,
      name: 'Facet Joint Injection',
      alternateName: ['Facet Block', 'Zygapophysial Joint Injection', 'Medial Branch Block'],
      description: 'Corticosteroid injection into the small facet joints along the spine that connect adjacent vertebrae. Both therapeutic and diagnostic — confirms the facet joint as the pain source.',
      procedureType: 'https://health-lifesci.schema.org/TherapeuticProcedure',
      bodyLocation: ['Lumbar facet joints', 'Cervical facet joints', 'Thoracic facet joints'],
      howPerformed: 'Fluoroscopy-guided injection into the affected facet joint. Contrast confirms placement. Takes 15–20 minutes.',
      preparation: 'No special preparation. Inform physician of blood thinners.',
      followUp: 'Relief often lasts several months. If effective, may be followed by radiofrequency ablation for longer-lasting results.',
      performedBy: { '@id': organizationId },
    },
    {
      '@type': 'MedicalProcedure',
      '@id': `${PAGE_URL}#si-joint-injection`,
      name: 'SI Joint Injection (Sacroiliac Joint Injection)',
      alternateName: ['Sacroiliac Block', 'SI Joint Block'],
      description: 'Corticosteroid injection into the sacroiliac joint at the base of the spine to treat pain from SI joint dysfunction. Also used diagnostically to confirm SI joint as the pain generator.',
      procedureType: 'https://health-lifesci.schema.org/TherapeuticProcedure',
      bodyLocation: ['Sacroiliac joint', 'Pelvis'],
      howPerformed: 'Fluoroscopy-guided injection into the sacroiliac joint. Takes 15–20 minutes as an outpatient procedure.',
      preparation: 'Inform physician of blood thinners. No sedation required.',
      followUp: 'Pain relief typically lasts several months. May be repeated or followed by SI joint fusion if response is positive but short-lived.',
      performedBy: { '@id': organizationId },
    },
    {
      '@type': 'MedicalProcedure',
      '@id': `${PAGE_URL}#nerve-block-injection`,
      name: 'Nerve Block Injection',
      alternateName: ['Selective Nerve Root Block', 'Occipital Nerve Block', 'Sympathetic Nerve Block'],
      description: 'Targeted injection of local anesthetic and/or corticosteroid around a specific nerve or nerve bundle to interrupt pain signals. Used for diagnostic and therapeutic purposes.',
      procedureType: 'https://health-lifesci.schema.org/TherapeuticProcedure',
      bodyLocation: ['Cervical nerve roots', 'Lumbar nerve roots', 'Occipital nerves', 'Sympathetic chain'],
      howPerformed: 'Fluoroscopy or ultrasound guided. Medication is injected at precise nerve location. Takes 10–20 minutes.',
      preparation: 'Inform physician of allergies and blood thinners.',
      followUp: 'Temporary numbness expected for hours after procedure. Therapeutic effects may last weeks to months.',
      performedBy: { '@id': organizationId },
    },
    {
      '@type': 'MedicalProcedure',
      '@id': `${PAGE_URL}#gel-knee-injection`,
      name: 'Hyaluronic Acid Knee Injection (Gel Injection)',
      alternateName: ['Viscosupplementation', 'Gel Injection for Knee', 'Hyaluronate Injection', 'Synvisc', 'Euflexxa'],
      description: 'Injection of hyaluronic acid (a natural joint lubricant) into the knee joint to reduce friction and pain in knee osteoarthritis patients. Restores joint fluid viscosity.',
      procedureType: 'https://health-lifesci.schema.org/TherapeuticProcedure',
      bodyLocation: ['Knee joint'],
      howPerformed: 'Ultrasound-guided injection directly into the knee joint. May be a single injection or series of 3–5 weekly injections depending on the product used.',
      preparation: 'No fasting required. Inform physician of PPO insurance coverage as plan-specific authorization may be needed.',
      followUp: 'Pain relief typically begins within 2–4 weeks and may last 6+ months. PPO insurance plans typically cover this procedure.',
      performedBy: { '@id': organizationId },
    },

    // ── 9. Physician entities (Person) — doctors performing injections ────────
    {
      '@type': ['Person', 'Physician'],
      '@id': `${PAGE_URL}#doctor-mcphail-pruitt`,
      name: 'Dr. Monica McPhail-Pruitt',
      jobTitle: 'Pain Management Specialist & Anesthesiologist',
      description: 'Double board-certified anesthesiologist and pain management specialist with fellowship training in multidisciplinary pain management at the University of Michigan Medical Center.',
      medicalSpecialty: ['Anesthesiology', 'Pain Management'],
      hasCredential: [
        { '@type': 'EducationalOccupationalCredential', credentialCategory: 'Board Certification', recognizedBy: { '@type': 'Organization', name: 'American Board of Anesthesiology' } },
        { '@type': 'EducationalOccupationalCredential', credentialCategory: 'Board Certification', recognizedBy: { '@type': 'Organization', name: 'American Board of Pain Medicine' } },
      ],
      alumniOf: [
        { '@type': 'CollegeOrUniversity', name: 'University of Michigan' },
        { '@type': 'CollegeOrUniversity', name: 'Northwestern University Feinberg School of Medicine' },
      ],
      worksFor: { '@id': organizationId },
      url: `${BASE_URL}/about/meetourdoctors/dr-monica-mcphail-pruitt`,
      sameAs: ['https://www.healthgrades.com/physician/dr-monica-mcphail-pruitt-278yw'],
    },
    {
      '@type': ['Person', 'Physician'],
      '@id': `${PAGE_URL}#doctor-katzman`,
      name: 'Dr. Scott Katzman',
      jobTitle: 'Orthopedic Spine Surgeon',
      description: 'Internationally recognized board-certified orthopedic spine surgeon with over 25 years of experience in comprehensive spine care and minimally invasive procedures.',
      medicalSpecialty: ['Orthopedic Surgery', 'Spine Surgery'],
      hasCredential: [
        { '@type': 'EducationalOccupationalCredential', credentialCategory: 'Board Certification', recognizedBy: { '@type': 'Organization', name: 'American Board of Orthopaedic Surgery' } },
      ],
      alumniOf: [
        { '@type': 'CollegeOrUniversity', name: 'University of California San Diego' },
        { '@type': 'CollegeOrUniversity', name: 'Jefferson Medical College' },
      ],
      worksFor: { '@id': organizationId },
      url: `${BASE_URL}/about/meetourdoctors/dr-scott-katzman`,
      sameAs: ['https://www.healthgrades.com/physician/dr-scott-katzman-2bgw7'],
    },
    {
      '@type': ['Person', 'Physician'],
      '@id': `${PAGE_URL}#doctor-mccarthy`,
      name: 'Dr. Christopher McCarthy',
      jobTitle: 'Orthopedic Spine Surgeon',
      description: 'Dual-trained orthopedic spine surgeon and emergency medicine physician. Princeton and Harvard-educated, fellowship-trained in spine surgery at Brown University.',
      medicalSpecialty: ['Orthopedic Surgery', 'Spine Surgery', 'Emergency Medicine'],
      hasCredential: [
        { '@type': 'EducationalOccupationalCredential', credentialCategory: 'Board Certification', recognizedBy: { '@type': 'Organization', name: 'American Board of Orthopaedic Surgery' } },
        { '@type': 'EducationalOccupationalCredential', credentialCategory: 'Board Certification', recognizedBy: { '@type': 'Organization', name: 'American Board of Emergency Medicine' } },
      ],
      alumniOf: [
        { '@type': 'CollegeOrUniversity', name: 'Princeton University' },
        { '@type': 'CollegeOrUniversity', name: 'Rutgers New Jersey Medical School' },
        { '@type': 'CollegeOrUniversity', name: 'Brown University' },
      ],
      worksFor: { '@id': organizationId },
      url: `${BASE_URL}/about/meetourdoctors/dr-christopher-mccarthy`,
      sameAs: ['https://www.healthgrades.com/physician/dr-christopher-mccarthy-338d8'],
    },
    {
      '@type': ['Person', 'Physician'],
      '@id': `${PAGE_URL}#doctor-slaughter`,
      name: 'Dr. Douglas Slaughter',
      jobTitle: 'Orthopedic Spine Surgeon',
      description: 'Award-winning board-certified orthopedic spine surgeon with 21+ years of experience in comprehensive and reconstructive spine surgery. Named Top Orthopedic Spine Surgeon 2023.',
      medicalSpecialty: ['Orthopedic Surgery', 'Spine Surgery'],
      hasCredential: [
        { '@type': 'EducationalOccupationalCredential', credentialCategory: 'Board Certification', recognizedBy: { '@type': 'Organization', name: 'American Board of Orthopaedic Surgery' } },
      ],
      alumniOf: [
        { '@type': 'CollegeOrUniversity', name: 'The Ohio State University' },
        { '@type': 'CollegeOrUniversity', name: 'University of Cincinnati College of Medicine' },
      ],
      worksFor: { '@id': organizationId },
      url: `${BASE_URL}/about/meetourdoctors/dr-douglas-slaughter`,
      sameAs: ['https://www.healthgrades.com/physician/dr-douglas-slaughter-xc2mw'],
    },

    // ── 10. Review entities — patient testimonials ────────────────────────────
    {
      '@type': 'Review',
      '@id': `${PAGE_URL}#review-david-s`,
      author: { '@type': 'Person', name: 'David S.' },
      datePublished: '2024-02-01',
      description: 'I had been dealing with lower back pain for over a year. After one epidural steroid injection at Mountain Spine, I was back to my normal routine within a week. The whole process took less than 30 minutes.',
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5', worstRating: '1' },
      itemReviewed: { '@id': organizationId },
      reviewAspect: 'Epidural Steroid Injection — Back Pain',
    },
    {
      '@type': 'Review',
      '@id': `${PAGE_URL}#review-christina-j`,
      author: { '@type': 'Person', name: 'Christina J.' },
      datePublished: '2024-11-01',
      description: 'My knee was so bad I could barely walk. The cortisone shot they gave me worked better than anything I had tried before. Six months later and I am still doing well.',
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5', worstRating: '1' },
      itemReviewed: { '@id': organizationId },
      reviewAspect: 'Cortisone Shot — Knee Osteoarthritis',
    },
    {
      '@type': 'Review',
      '@id': `${PAGE_URL}#review-dean-w`,
      author: { '@type': 'Person', name: 'Dean W.' },
      datePublished: '2025-01-01',
      description: 'I was nervous about needles but the doctor numbed the area first and I barely felt a thing. The facet injection relieved my neck pain faster than I expected. I would recommend this to anyone.',
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5', worstRating: '1' },
      itemReviewed: { '@id': organizationId },
      reviewAspect: 'Facet Joint Injection — Cervical Pain',
    },

    // ── 11. HowTo — What to Expect at Your Injection Appointment ─────────────
    {
      '@type': 'HowTo',
      '@id': howToId,
      name: 'What to Expect During an Orthopedic Injection at Mountain Spine & Orthopedics',
      description: 'A step-by-step guide to getting an orthopedic injection procedure — from consultation through pain relief.',
      about: { '@id': procedureId },
      isPartOf: { '@id': webpageId },
      totalTime: 'PT1H',
      performTime: 'PT15M',
      prepTime: 'PT15M',
      tool: [
        { '@type': 'HowToTool', name: 'Fluoroscopy (real-time X-ray guidance)' },
        { '@type': 'HowToTool', name: 'Ultrasound guidance' },
        { '@type': 'HowToTool', name: 'Local anesthetic' },
      ],
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Consultation & Imaging Review',
          text: 'Your specialist reviews your imaging (X-ray, MRI) and medical history to confirm the injection is the right treatment and identify the precise injection site.',
          url: `${PAGE_URL}#step-1`,
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Positioning & Preparation',
          text: "You'll be positioned comfortably. The injection site is cleaned and a local anesthetic is applied so you feel minimal discomfort.",
          url: `${PAGE_URL}#step-2`,
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Image-Guided Injection',
          text: 'Using real-time fluoroscopy (X-ray) or ultrasound guidance, your doctor precisely places the needle and delivers the medication directly to the source of your pain. Guidance ensures accuracy and safety.',
          url: `${PAGE_URL}#step-3`,
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Recovery & Discharge',
          text: 'You rest briefly in the office. Most patients go home the same day. You may experience mild soreness at the injection site for 24–48 hours.',
          url: `${PAGE_URL}#step-4`,
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Pain Relief Timeline',
          text: 'Relief typically begins within 2–7 days as inflammation subsides. Effects last from several weeks to several months depending on the injection type and your condition.',
          url: `${PAGE_URL}#step-5`,
        },
      ],
    },
  ],
};

const visibleSchema = {
  ...consolidatedSchema,
  '@graph': consolidatedSchema['@graph'].filter(
    (node: { '@id'?: string }) =>
      node['@id'] !== `${PAGE_URL}#doctor-katzman` || isProviderVisible({ slug: providerIds.scottKatzman })
  ),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(visibleSchema) }}
      />
      {children}
    </>
  );
}
