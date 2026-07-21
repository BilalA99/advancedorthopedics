export interface SocialProofReview {
  img: string;
  rating: number;
  name: string;
  location: string;
  body: string;
}

/** Sitewide "What Our Patients Say" reviews (components/RatingsAndReviews.tsx). */
export const sitewideReviews: SocialProofReview[] = [
  {
    img: 'https://originui.com/avatar-80-03.jpg',
    rating: 5,
    name: 'Robert P.',
    location: 'Miami Beach',
    body: 'After years of debilitating back pain, I finally sought help at Mountain Spine Orthopedics. Dr. Katzman took the time to actually listen and explain my options clearly. The minimally invasive procedure he performed gave me my life back. The entire team was professional and supportive throughout.'
  },
  {
    img: 'https://mountainspineortho.b-cdn.net/Mreview.png',
    rating: 5,
    name: 'Maria G.',
    location: 'Hollywood',
    body: `I was hesitant about surgery for my spinal stenosis, but the staff at Mountain Spine Orthopedics put me at ease. From the front desk to the medical assistants, everyone was incredibly kind and efficient. My recovery was smoother than I ever expected. Highly recommend!`
  },
  {
    img: 'https://mountainspineortho.b-cdn.net/DReview.jpg',
    rating: 5,
    name: 'David L.',
    location: 'Orlando',
    body: `Getting a second opinion from Dr. Katzman was the best decision I made. He reviewed my MRI, explained things in a way I could understand, and offered a non-surgical approach that actually worked for my herniated disc. Truly grateful for his expertise and honest assessment.`
  },
  {
    img: 'https://mountainspineortho.b-cdn.net/Sreview.png',
    rating: 5,
    name: 'Sarah Chen',
    location: 'Altamonate',
    body: `The level of care at Mountain Spine Orthopedics is outstanding. Scheduling was easy, the office is modern and clean, and Dr. Katzman's team is top-notch. They genuinely care about their patients' well-being and getting them back to their activities.`
  },
  {
    img: 'https://originui.com/avatar-80-01.jpg',
    rating: 5,
    name: 'Michael B.',
    location: 'Davenport',
    body: `Dealing with chronic neck pain was exhausting. The team at Mountain Spine Orthopedics provided a comprehensive treatment plan, not just a quick fix. I felt involved in my care every step of the way. Feeling so much better now!`
  },
  {
    img: 'https://originui.com/avatar-80-05.jpg',
    rating: 5,
    name: 'Linda S.',
    location: 'Palm Springs',
    body: `Dr. Katzman is a fantastic surgeon with a great bedside manner. He addressed all my concerns before my procedure and the results exceeded my expectations. The follow-up care from his team at Mountain Spine Orthopedics has also been excellent. Five stars aren't enough!`
  }
];

export interface HomepageGoogleReview {
  id: number;
  name: string;
  timeAgo: string;
  rating: number;
  text: string;
}

/** Homepage Google-review-style testimonials (app/landing-page/components/Testimonials.tsx). */
export const homepageGoogleReviews: HomepageGoogleReview[] = [
  {
    id: 1,
    name: "edy constancia",
    timeAgo: "a week ago",
    rating: 5,
    text: "I had a great experience at this center. The team is efficient and friendly, and Dr. Katzman made sure I understood my treatment plan. They really go above and beyond for their patients",
  },
  {
    id: 2,
    name: "Mike Qual",
    timeAgo: "a week ago",
    rating: 5,
    text: "Great experience herein Hollywood. The staff is kind and professional and Dr. Katzman made me feel comfortable. I would definitely recommend this office.",
  },
  {
    id: 3,
    name: "Chelsea Constancia",
    timeAgo: "a week ago",
    rating: 5,
    text: "My sister and I were both injured in an accident, and we decided to see Dr. Katzman together for treatment. From the very first visit, he listened carefully, answered all of our questions, and treated us with kindness and patience. The staff is also incredibly supportive and always made me feel welcomed.",
  },
  {
    id: 4,
    name: "melanie redondo",
    timeAgo: "a week ago",
    rating: 5,
    text: "I can’t thank Dr. Katzman enough for the care he provided me and my sister. After our accident, I was scared I wouldn’t recover fully. But Dr. Katzman explained everything clearly and guided me through the entire process step by step. The treatment I received has helped me tremendously, and having a doctor who truly cares about his patients makes all the difference",
  },
  {
    id: 5,
    name: "Jessica Mestre",
    timeAgo: "a week ago",
    rating: 5,
    text: "I was in a terrible car accident that left me with constant neck and back pain. After trying different treatments, I finally came to see Dr. Katzman. He took the time to explain my options and recommended a minimally invasive procedure. I’m finally getting relief and feel confident in my recovery.",
  },
  {
    id: 6,
    name: "Matheus abudjr",
    timeAgo: "2 months ago",
    rating: 5,
    text: "Super happy with the care I got here. Dr. Scott and the team were really helpful and made everything easy to understand. Great service and smooth recovery, my mom feels so good now!!",
  },
  {
    id: 7,
    name: "Vanessa Bandeira",
    timeAgo: "4 months ago",
    rating: 5,
    text: "Very quick service bilingual speaking staff. They got me in immediately I feel so much better",
  },
  {
    id: 8,
    name: "bilal Ahmad",
    timeAgo: "3 weeks ago",
    rating: 5,
    text: "Fixed my Sciatica with a minimally invasive procedure, thanks guys",
  },
  {
    id: 9,
    name: "mirtala chavarria",
    timeAgo: "a week ago",
    rating: 5,
    text: "Excellent experience at this clinic. The team is professional and always willing to help. Dr. Katzman demonstrates great dedication and confidence in his work.",
  },
];
