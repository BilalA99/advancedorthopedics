export interface InjectionArea {
  id: string;
  label: string;
  area: string;
  title: string;
  shortDescription: string;
  commonUses: string[];
  injectionOptions: string[];
  trustLine: string;
  learnMoreHref: string;
  primaryCtaText: string;
  primaryCtaHref: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
  hotspot: {
    top: string;
    left: string;
  };
  /** Pixel offset for the frosted ring wrapper relative to the hotspot button (fine-tuned to artwork). */
  ringOffset: {
    top: string;
    left: string;
  };
}

export const InjectionAreas: InjectionArea[] = [
  {
    id: 'back-spine',
    label: 'Back & Spine',
    area: 'Back & Spine',
    title: 'Back & Spine Injections',
    shortDescription:
      'Targeted injections for herniated discs, spinal stenosis, sciatica, facet joint pain, and inflammation-related nerve pain. Image-guided precision to the exact lumbar or thoracic source.',
    commonUses: [
      'Radiating leg pain / sciatica',
      'Facet joint inflammation',
      'SI joint dysfunction',
      'Lower back pain with nerve irritation',
      'Lumbar spinal stenosis',
    ],
    injectionOptions: [
      'Epidural Steroid Injection',
      'Facet Joint Injection',
      'SI Joint Injection',
      'Nerve Block Injection',
    ],
    trustLine: 'Image-guided precision · Board-certified specialists',
    learnMoreHref: '/treatments/epidural-steroid-injection',
    primaryCtaText: 'Learn About Spine Injections',
    primaryCtaHref: '/treatments/epidural-steroid-injection',
    secondaryCtaText: 'Book Appointment',
    secondaryCtaHref: '/find-care/book-an-appointment',
    // PNG 1024×1536, object-contain in 340×660 → drawn 340×510, 75px letterbox top+bottom.
    // Lumbar marker fine-tuned in px (matches preview alignment).
    hotspot: { top: '253px', left: '178px' },
    ringOffset: { top: '-18px', left: '-11px' },
  },
  {
    id: 'neck',
    label: 'Neck',
    area: 'Neck',
    title: 'Neck & Cervical Injections',
    shortDescription:
      'Precision cervical injections for disc herniation, cervical stenosis, facet arthritis, and neck-related arm pain or radiculopathy. Fluoroscopy-guided for maximum accuracy.',
    commonUses: [
      'Cervical disc herniation',
      'Neck-related arm pain / radiculopathy',
      'Cervical facet arthritis',
      'Cervical spinal stenosis',
    ],
    injectionOptions: [
      'Cervical Epidural Steroid Injection',
      'Cervical Facet Joint Injection',
      'Cervical Nerve Block',
    ],
    trustLine: 'Fluoroscopy-guided · Fellowship-trained specialists',
    learnMoreHref: '/conditions/neck-pain',
    primaryCtaText: 'Learn About Cervical Injections',
    primaryCtaHref: '/treatments/epidural-steroid-injection',
    secondaryCtaText: 'Book Appointment',
    secondaryCtaHref: '/find-care/book-an-appointment',
    hotspot: { top: '23.1%', left: '51.2%' },
    ringOffset: { top: '20px', left: '-6px' },
  },
  {
    id: 'shoulder',
    label: 'Shoulder',
    area: 'Shoulder',
    title: 'Shoulder Injections',
    shortDescription:
      'Targeted injections for rotator cuff injuries, shoulder bursitis, AC joint arthritis, and glenohumeral joint pain. Ultrasound-guided delivery to the exact shoulder structure.',
    commonUses: [
      'Rotator cuff tendinitis / partial tear',
      'Subacromial bursitis',
      'AC joint arthritis',
      'Shoulder impingement syndrome',
    ],
    injectionOptions: [
      'Cortisone Shot',
      'Subacromial Bursa Injection',
      'AC Joint Injection',
      'Glenohumeral Joint Injection',
    ],
    trustLine: 'Ultrasound-guided · Same-week appointments',
    learnMoreHref: '/conditions/shoulder-pain',
    primaryCtaText: 'Learn About Shoulder Injections',
    primaryCtaHref: '/conditions/shoulder-pain',
    secondaryCtaText: 'Book Appointment',
    secondaryCtaHref: '/find-care/book-an-appointment',
    hotspot: { top: '29%', left: '53.2%' },
    ringOffset: { top: '0px', left: '21px' },
  },
  {
    id: 'hip',
    label: 'Hip',
    area: 'Hip',
    title: 'Hip Injections',
    shortDescription:
      'Image-guided hip injections for osteoarthritis, bursitis, labral tears, and hip impingement. Cortisone and joint injections provide meaningful relief without surgery.',
    commonUses: [
      'Hip osteoarthritis',
      'Trochanteric bursitis',
      'Hip impingement pain',
      'Sacroiliac joint pain',
    ],
    injectionOptions: [
      'Hip Joint Cortisone Injection',
      'Trochanteric Bursa Injection',
      'SI Joint Injection',
    ],
    trustLine: 'Image-guided accuracy · Board-certified orthopedic care',
    learnMoreHref: '/find-care/book-an-appointment',
    primaryCtaText: 'Find Hip Injection Relief',
    primaryCtaHref: '/find-care/book-an-appointment',
    secondaryCtaText: 'Book Appointment',
    secondaryCtaHref: '/find-care/book-an-appointment',
    hotspot: { top: '50.3%', left: '51.8%' },
    ringOffset: { top: '-64px', left: '-31px' },
  },
  {
    id: 'knee',
    label: 'Knee',
    area: 'Knee',
    title: 'Knee Injections',
    shortDescription:
      'Cortisone shots and gel (hyaluronic acid) injections for knee arthritis, meniscus degeneration, and chronic knee pain. Effective non-surgical relief for appropriate candidates.',
    commonUses: [
      'Knee osteoarthritis',
      'Meniscus degeneration',
      'Chronic knee inflammation',
      'Post-injury knee pain',
    ],
    injectionOptions: [
      'Cortisone Shot',
      'Gel (Hyaluronic Acid) Injection',
      'Intra-articular Injection',
    ],
    trustLine: 'Most PPO plans accepted · No referral required',
    learnMoreHref: '/conditions/knee-pain',
    primaryCtaText: 'Learn About Knee Injections',
    primaryCtaHref: '/conditions/knee-pain',
    secondaryCtaText: 'Book Appointment',
    secondaryCtaHref: '/find-care/book-an-appointment',
    hotspot: { top: '59.3%', left: '55.7%' },
    ringOffset: { top: '-28px', left: '-41px' },
  },
  {
    id: 'foot-ankle',
    label: 'Foot & Ankle',
    area: 'Foot & Ankle',
    title: 'Foot & Ankle Injections',
    shortDescription:
      'Precision injections for plantar fasciitis, ankle arthritis, Achilles tendinopathy, and Morton\'s neuroma pain. Fast in-office treatment with same-week appointments available.',
    commonUses: [
      'Plantar fasciitis / heel pain',
      'Ankle joint arthritis',
      'Achilles tendinopathy',
      'Morton\'s neuroma',
    ],
    injectionOptions: [
      'Cortisone Shot',
      'Ankle Joint Injection',
      'Plantar Fascia Injection',
    ],
    trustLine: 'Same-week appointments · 23 locations across FL, NJ, NY, PA & GA',
    learnMoreHref: '/find-care/book-an-appointment',
    primaryCtaText: 'Find Foot & Ankle Relief',
    primaryCtaHref: '/find-care/book-an-appointment',
    secondaryCtaText: 'Book Appointment',
    secondaryCtaHref: '/find-care/book-an-appointment',
    // Ankle marker must stay within the figure; y≈1310 sat in empty padding below the feet.
    hotspot: { top: '65.9%', left: '53.9%' },
    ringOffset: { top: '4px', left: '6px' },
  },
  {
    id: 'hand-wrist',
    label: 'Hand & Wrist',
    area: 'Hand & Wrist',
    title: 'Hand & Wrist Injections',
    shortDescription:
      'Targeted injections for carpal tunnel syndrome, trigger finger, De Quervain\'s tenosynovitis, and hand arthritis. Precise ultrasound-guided delivery for fast, effective relief.',
    commonUses: [
      'Carpal tunnel syndrome',
      'Trigger finger',
      'De Quervain\'s tenosynovitis',
      'Hand / wrist arthritis',
    ],
    injectionOptions: [
      'Cortisone Shot',
      'Carpal Tunnel Injection',
      'Trigger Finger Injection',
    ],
    trustLine: 'Ultrasound-guided precision · Fellowship-trained specialists',
    learnMoreHref: '/conditions/carpal-tunnel-syndrome',
    primaryCtaText: 'Learn About Hand Injections',
    primaryCtaHref: '/conditions/carpal-tunnel-syndrome',
    secondaryCtaText: 'Book Appointment',
    secondaryCtaHref: '/find-care/book-an-appointment',
    // Anatomical left wrist (viewer's right on a front-facing figure).
    hotspot: { top: '46%', left: '77%' },
    ringOffset: { top: '-26px', left: '-26px' },
  },
];
