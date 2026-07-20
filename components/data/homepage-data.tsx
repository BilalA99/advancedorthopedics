import { StaticImageData } from "next/image";
import React from "react";

// Image imports required by the data arrays
import Neck from '../../public/neck.png';
import LowerBack from '../../public/Lowerback.png';
import Joints from '../../public/Joints.png';
import Foot from '../../public/Foot.png';
import Consultation from '../../public/Consultation.png';
import Diagnosis from '../../public/Diagnosis.png';
import Treatment from '../../public/Treatment.png';
import ExpertCare from '../../public/ExpertCare.png';
import aftercare from '../../public/aftercare.jpg';

// Type definitions for better code quality and developer experience
export interface ServiceAndExpertiseItem {
  img: StaticImageData;
  title: string;
  anatomy: string;
  desc: string;
  link: string[];
}

export interface SpecialtyItem {
  icon: () => React.ReactNode;
  title: string;
  body: string;
}

export interface TestimonialStat {
  stat: string;
  value: number;
  desc: string;
}

export interface AmenityItem {
  icon: () => React.ReactNode;
  title: string;
}

export interface PainToProgressItem {
  img: StaticImageData;
  title: string;
  body: string;
}

export interface TreatmentCategory {
  name: string;
  slug: string;
}

export interface OrthoConditionItem {
  area: string;
  area_procedures: {
    title: string;
    desc: string;
  };
  view_all_treatments: {
    text: string;
    href: string;
  };
  treatment_categories: TreatmentCategory[];
}

// --- ALL DATA ARRAYS ---

export const ServicesAndExpertise: ServiceAndExpertiseItem[] = [
  {
    img: Neck,
    title: 'Neck & Spine',
    anatomy: 'https://mountainspineortho.b-cdn.net/public/NeckAnat.png',
    desc: 'Cutting-edge cervical treatments relieve compression and restore alignment.',
    link: ['Neck', 'Spine']
  },
  {
    img: LowerBack,
    title: 'Lower Back',
    anatomy: 'https://mountainspineortho.b-cdn.net/public/LowerbackAnat.png',
    desc: 'Minimally invasive lumbar interventions reduce pain and improve function.',
    link: ['Lower Spine']
  },
  {
    img: Joints,
    title: 'Joints',
    anatomy: 'https://mountainspineortho.b-cdn.net/public/JointsAnat.png',
    desc: 'Arthroscopic and regenerative methods help get your joints moving again.',
    link: ['Knee', 'Shoulder', 'Hand']
  },
  {
    img: Foot,
    title: 'Foot & Ankle',
    anatomy: 'https://mountainspineortho.b-cdn.net/public/FootAnat.png',
    desc: 'Precision interventions fix lower extremity biomechanics and restore optimal foot and ankle function.',
    link: ['Foot']
  },
];

export const OurSpecialtyItems: SpecialtyItem[] = [
  {
    icon: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="22" viewBox="0 0 18 22" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M7 11.2502C7.19892 11.2502 7.38968 11.3293 7.53033 11.4699L9 12.9396L10.4697 11.4699C10.6103 11.3293 10.8011 11.2502 11 11.2502H11H11.0001C12.3676 11.2502 13.5248 11.2502 14.3918 11.3668C15.2919 11.4878 16.0497 11.7467 16.6517 12.3486C17.2536 12.9505 17.5125 13.7084 17.6335 14.6085C17.75 15.4755 17.75 16.5778 17.75 17.9454V21.0002C17.75 21.4145 17.4142 21.7502 17 21.7502L1 21.7502C0.585789 21.7502 0.250001 21.4145 0.250001 21.0002L0.250001 17.9454V17.9454V17.9453C0.249981 16.5778 0.249965 15.4755 0.366525 14.6085C0.487541 13.7084 0.746435 12.9505 1.34835 12.3486C1.95027 11.7467 2.70814 11.4878 3.60825 11.3668C4.4752 11.2502 5.63238 11.2502 6.99994 11.2502H6.99998H7ZM13 13.7502C13.4142 13.7502 13.75 14.086 13.75 14.5002V15.7502H15C15.4142 15.7502 15.75 16.086 15.75 16.5002C15.75 16.9145 15.4142 17.2502 15 17.2502H13.75V18.5002C13.75 18.9145 13.4142 19.2502 13 19.2502C12.5858 19.2502 12.25 18.9145 12.25 18.5002V17.2502H11C10.5858 17.2502 10.25 16.9145 10.25 16.5002C10.25 16.086 10.5858 15.7502 11 15.7502H12.25V14.5002C12.25 14.086 12.5858 13.7502 13 13.7502ZM9 0.250137C6.65279 0.250137 4.75 2.15293 4.75 4.50014V5.50014C4.75 7.84735 6.65279 9.75014 9 9.75014C11.3472 9.75014 13.25 7.84735 13.25 5.50014L13.25 4.50014C13.25 2.15293 11.3472 0.250137 9 0.250137Z" fill="#0A50EC" />
      </svg>
    ),
    title: 'World - Class Expertise',
    body: 'Our board-certified orthopedic surgeons bring years of experience and a proven track record of successful outcomes.'
  },
  {
    icon: () => (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" id="Spine--Streamline-Simple-Icons" height="24" width="24">
        <path d="M7.157 2.207c0.066 2.004 1.454 3.117 4.221 3.55 2.345 0.368 4.46 0.181 5.151 -1.829C17.874 0.01 14.681 0.985 11.915 0.55S7.051 -1.013 7.157 2.207m0.831 8.23c0.257 1.497 1.652 2.355 3.786 2.297 2.135 -0.059 3.728 -0.892 3.949 -2.507 0.409 -2.988 -1.946 -1.832 -4.08 -1.774 -2.136 0.059 -4.161 -0.952 -3.655 1.984m2.778 6.852c0.424 1.117 1.587 1.589 3.159 1.253 1.569 -0.335 2.656 -0.856 2.568 -2.129 -0.159 -2.357 -1.713 -1.616 -3.283 -1.279 -1.571 0.333 -3.272 -0.039 -2.444 2.155m1.348 5.221c0.123 0.943 0.939 1.5 2.215 1.49 1.279 -0.011 2.248 -0.515 2.412 -1.525 0.308 -1.871 -1.123 -1.175 -2.4 -1.165 -1.28 0.01 -2.47 -0.65 -2.227 1.2" fill="#0A50EC" strokeWidth="1"></path>
      </svg>
    ),
    title: 'Laser Spine & Radio',
    body: 'We lead the industry in advanced laser spine procedures and targeted radio treatments, delivering exceptional outcomes with cutting-edge technology.'
  },
  {
    icon: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 22 20" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M7.02299 3.376C7.03911 3.15406 7.06365 2.97295 7.09643 2.82372C7.15781 2.54433 7.23372 2.44399 7.27636 2.40136C7.31899 2.35872 7.41933 2.28281 7.69872 2.22143C7.98944 2.15756 8.40114 2.125 9 2.125H13C13.5989 2.125 14.0106 2.15756 14.3013 2.22143C14.5807 2.28281 14.681 2.35872 14.7236 2.40136C14.7663 2.44399 14.8422 2.54433 14.9036 2.82372C14.9364 2.97295 14.9609 3.15406 14.977 3.376C14.6818 3.37499 14.3738 3.375 14.0527 3.375H14.0527H14.0527H7.94732H7.94731H7.9473C7.62618 3.375 7.31821 3.37499 7.02299 3.376ZM5.01648 3.41956C5.03581 3.05074 5.07429 2.70741 5.14301 2.39459C5.25632 1.8788 5.46503 1.38426 5.86214 0.987143C6.25926 0.59003 6.7538 0.381319 7.26959 0.268009C7.77406 0.157186 8.35786 0.125 9 0.125H13C13.6421 0.125 14.2259 0.157186 14.7304 0.268009C15.2462 0.381319 15.7407 0.59003 16.1379 0.987143C16.535 1.38426 16.7437 1.8788 16.857 2.39459C16.9257 2.70741 16.9642 3.05074 16.9835 3.41956C17.325 3.43802 17.6415 3.46412 17.9342 3.50102C18.9621 3.63057 19.8113 3.90463 20.4878 4.5389C21.1712 5.1796 21.4729 5.99471 21.6143 6.98061C21.75 7.92738 21.75 9.13186 21.75 10.6289V10.6289V10.6289V10.6289V12.6211V12.6211V12.6211V12.6211C21.75 14.1181 21.75 15.3226 21.6143 16.2694C21.4729 17.2553 21.1712 18.0704 20.4878 18.7111C19.8113 19.3454 18.9621 19.6194 17.9342 19.749C16.9342 19.875 15.6579 19.875 14.0527 19.875H7.94733C6.3421 19.875 5.06579 19.875 4.06576 19.749C3.03794 19.6194 2.18873 19.3454 1.51217 18.7111C0.828766 18.0704 0.527127 17.2553 0.385739 16.2694C0.249962 15.3226 0.249979 14.1181 0.250001 12.6211V12.6211V12.6211V12.6211V10.6289V10.6289V10.6289V10.6289C0.249979 9.13188 0.249962 7.92739 0.385739 6.98061C0.527127 5.99471 0.828765 5.1796 1.51217 4.5389C2.18873 3.90463 3.03794 3.63057 4.06576 3.50102C4.35855 3.46412 4.67501 3.43802 5.01648 3.41956ZM11 7.625C11.5523 7.625 12 8.07272 12 8.625V10.625H14C14.5523 10.625 15 11.0727 15 11.625C15 12.1773 14.5523 12.625 14 12.625H12V14.625C12 15.1773 11.5523 15.625 11 15.625C10.4477 15.625 10 15.1773 10 14.625V12.625H8C7.44772 12.625 7 12.1773 7 11.625C7 11.0727 7.44772 10.625 8 10.625H10V8.625C10 8.07272 10.4477 7.625 11 7.625Z" fill="#0A50EC" />
      </svg>
    ),
    title: 'Band Aid Back Surgery',
    body: 'Mountain Spine is one of the only providers of Band Aid Back Surgery, a revolutionary minimally-invasive technique that delivers exceptional results with faster recovery times.'
  },
  {
    icon: () => (
      <svg className="text-[#0A50EC]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 22 22">
        <path d="m17.9646 5.49185.3705.37054c.3906.39052 1.0237.39052 1.4142 0 .3906-.39053.3906-1.02369 0-1.41422L17.594 2.29283c-.3905-.39052-1.0237-.39052-1.4142 0-.3905.39053-.3905 1.02369 0 1.41422l.3706.37059-.7412.74118-.3706-.37059c-.3905-.39053-1.0237-.39053-1.4142 0L9.71372 8.75891c-.39053.39053-.39053 1.02369 0 1.41419l.34948.3495-.77031.7703c-.39053.3905-.39053 1.0237 0 1.4142.39052.3905 1.02371.3905 1.41421 0l.7703-.7703.3917.3917c.3905.3905 1.0236.3905 1.4142 0l2.0628-2.0629c.4145.6745.6539 1.4706.6539 2.3256 0 2.4448-1.9584 4.4087-4.3521 4.4087-1.0458 0-2.00787-.3737-2.76051-.9999H11c.5523 0 1-.4477 1-1s-.4477-1-1-1H5c-.55228 0-1 .4477-1 1s.44772 1 1 1h1.26803C6.92225 17.0489 7.8715 17.8952 9 18.4182V20H5c-.55228 0-1 .4477-1 1s.44772 1 1 1h14c.5523 0 1-.4477 1-1s-.4477-1-1-1h-4v-1.9637c1.8034-1.1328 3-3.1517 3-5.4451 0-1.4061-.4498-2.70897-1.2126-3.76687l.8066-.80655c.3905-.39052.3905-1.02369 0-1.41421l-.3706-.37054.7412-.74118Z" />
      </svg>
    ),
    title: 'Minimally Invasive',
    body: 'We specialize in minimally invasive treatments that minimize tissue damage, reduce recovery time, and help you get back to your life faster with less pain and scarring.'
  },
];

export const Testimonials: TestimonialStat[] = [
  {
    stat: 'k+',
    value: 15,
    desc: 'Successful Treatments'
  },
  {
    stat: '+',
    value: 20,
    desc: 'Years of Experience'
  },
  {
    stat: '%',
    value: 95,
    desc: 'Patient Satasfaction Rate'
  },
  {
    stat: '/7',
    value: 24,
    desc: 'Customer Support'
  }
];

export const Amenities: AmenityItem[] = [
  {
    icon: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="27" height="37" viewBox="0 0 27 37" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M3.12393 8.50306C3.10176 8.33475 3.09048 8.2061 3.0859 8.1087C3.22963 8.09302 3.42998 8.08317 3.7093 8.08317L15.3629 8.08317L15.2353 12.6775C14.6937 12.824 14.1811 12.9906 13.7109 13.1473C13.5758 13.1923 13.4449 13.2363 13.3178 13.2791L13.3167 13.2795L13.3167 13.2795L13.3166 13.2795C12.8316 13.4426 12.4005 13.5876 11.9913 13.703C11.4733 13.8491 11.0928 13.9165 10.8107 13.9165C10.6792 13.9165 10.6093 13.9015 10.5793 13.8929C10.5534 13.8855 10.5417 13.8788 10.5301 13.8709C10.4781 13.8357 10.4527 13.8078 10.3541 13.6994L10.354 13.6994C10.3072 13.6479 10.2438 13.5782 10.1532 13.481C9.90878 13.2187 9.55403 12.8759 8.99397 12.6219C8.4454 12.3731 7.79225 12.2498 6.98494 12.2498C5.55991 12.2498 4.49594 12.6453 3.73649 13.1546L3.12393 8.50306ZM17.8639 8.08317L17.748 12.2568C17.8595 12.2522 17.9713 12.2498 18.0834 12.2498C19.5025 12.2498 20.7107 12.6294 21.6113 13.0462L22.2096 8.50306C22.2318 8.33475 22.243 8.2061 22.2476 8.1087C22.1039 8.09302 21.9036 8.08317 21.6242 8.08317H17.8639ZM20.8232 15.4433C20.9878 15.5285 21.1349 15.6134 21.2628 15.6927L21.2169 16.0415L17.6519 15.718L17.6784 14.764C17.8141 14.7547 17.9491 14.7498 18.0834 14.7498C19.1922 14.7498 20.1397 15.0895 20.8232 15.4433ZM19.5401 28.7742L21.2165 16.0445L17.6518 15.7202L17.2496 30.2012C17.2305 30.8913 16.6555 31.4352 15.9654 31.416C15.2753 31.3969 14.7314 30.8219 14.7506 30.1318L15.1571 15.4933L14.7038 15.452C14.6365 15.4741 14.5691 15.4965 14.5014 15.519C14.3838 15.5582 14.2646 15.5983 14.1444 15.6388C13.6526 15.8043 13.145 15.9752 12.6699 16.1091C12.0799 16.2756 11.4377 16.4165 10.8107 16.4165C10.1414 16.4165 9.5936 16.2559 9.12869 15.9412C8.80094 15.7194 8.52569 15.4106 8.38508 15.2528L8.38507 15.2528L8.38503 15.2528L8.38495 15.2527C8.36047 15.2252 8.34009 15.2024 8.32422 15.1853C8.18042 15.031 8.09009 14.9571 7.96123 14.8986C7.90228 14.8719 7.81874 14.8413 7.70044 14.8149L6.98494 14.7498C5.29644 14.7498 4.69919 15.5786 4.59746 15.7651C4.4867 15.9681 4.32781 16.1282 4.14267 16.2389L5.79347 28.7742C5.97991 30.19 6.10548 31.1211 6.29753 31.8095C6.47634 32.4505 6.67471 32.7316 6.92106 32.9273C7.18001 33.133 7.85183 33.405 8.97609 33.6113C10.0392 33.8064 11.3266 33.9119 12.6358 33.9164C13.9451 33.9208 15.2368 33.8241 16.3091 33.6315C17.4387 33.4286 18.1296 33.152 18.4125 32.9273C18.6588 32.7316 18.8572 32.4505 19.036 31.8095C19.228 31.1211 19.3536 30.19 19.5401 28.7742ZM7.6993 14.8147L7.70044 14.8149L14.7038 15.452L14.7077 15.4507L7.6993 14.8147ZM14.7077 15.4507L15.1572 15.4915L15.1624 15.3046C15.0118 15.3517 14.8602 15.4006 14.7077 15.4507ZM6.98494 14.7498L7.6993 14.8147C7.53606 14.7783 7.30681 14.7498 6.98494 14.7498ZM17.9333 5.58317H21.6242C22.0673 5.58317 22.5034 5.60231 22.8925 5.68015C23.2843 5.75852 23.7457 5.91866 24.1223 6.29177C24.5154 6.68111 24.6723 7.15778 24.7253 7.58449C24.7754 7.98769 24.7424 8.41826 24.6882 8.82947L22.0073 29.1868L22.0073 29.1868L22.0073 29.1869C21.8354 30.4929 21.6894 31.6019 21.4441 32.4813C21.1801 33.4274 20.7655 34.2509 19.9675 34.8848C19.1692 35.519 17.9473 35.8772 16.7511 36.0921C15.4977 36.3172 14.0507 36.4212 12.6272 36.4163C11.2036 36.4115 9.76405 36.2976 8.5249 36.0702C7.34692 35.8541 6.14116 35.5006 5.366 34.8848C4.56805 34.2509 4.15343 33.4274 3.88948 32.4813C3.64414 31.6019 3.49815 30.4929 3.32621 29.1868L0.645326 8.82947C0.591174 8.41826 0.558091 7.98769 0.608215 7.58449C0.661261 7.15778 0.818159 6.6811 1.21119 6.29177C1.58783 5.91866 2.04921 5.75852 2.44098 5.68015C2.83017 5.60231 3.26624 5.58317 3.7093 5.58317L15.4324 5.58317L15.4945 3.3479L15.4956 3.32856C15.5863 1.78693 16.8629 0.583168 18.4072 0.583168H25.169C25.8594 0.583168 26.419 1.14281 26.419 1.83317C26.419 2.52352 25.8594 3.08317 25.169 3.08317H18.4072C18.1909 3.08317 18.0114 3.24844 17.9922 3.46243L17.9333 5.58317ZM10.1668 23.4998C9.24629 23.4998 8.5001 24.246 8.5001 25.1665C8.5001 26.087 9.24629 26.8332 10.1668 26.8332H10.1817C11.1021 26.8332 11.8483 26.087 11.8483 25.1665C11.8483 24.246 11.1021 23.4998 10.1817 23.4998H10.1668Z" fill="#0A50EC" />
      </svg>
    ),
    title: 'Refreshments',
  },
  {
    icon: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" viewBox="0 0 37 37" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M19.8333 0.583496C20.9336 0.583496 21.7766 1.25243 22.2876 2.0188C22.8043 2.79391 23.0833 3.79271 23.0833 4.8335C23.0833 5.08691 23.0608 5.33861 23.0164 5.5835C24.0809 5.58353 24.9758 5.58561 25.7093 5.66238C26.5041 5.74556 27.2336 5.92591 27.9018 6.36733C28.5784 6.81443 29.0139 7.41123 29.3663 8.1055C29.6933 8.74988 29.9903 9.56676 30.3361 10.5181L31.3106 13.1977L32.9413 12.3824C33.5586 12.0737 34.3094 12.3239 34.6183 12.9414C34.9269 13.5589 34.6768 14.3097 34.0593 14.6185L32.3926 15.4518C32.3541 15.471 32.3153 15.488 32.2759 15.503L32.3793 15.604C33.0774 16.2865 33.9429 17.1323 34.6619 18.0413C35.5618 19.1788 36.4166 20.6315 36.4166 22.2958V27.7588C36.4166 27.9117 36.4053 28.0632 36.3833 28.2122C36.4051 28.3047 36.4166 28.401 36.4166 28.5002V33.3035C36.4166 34.4893 35.6663 35.4793 34.6378 35.9365L34.5464 35.9775C34.1843 36.1415 33.5763 36.4168 32.8489 36.4168H29.9843C29.2569 36.4168 28.6489 36.1415 28.2868 35.9775L28.1954 35.9365C27.1669 35.4793 26.4166 34.4893 26.4166 33.3035V31.4168L10.5833 31.4168L10.5833 33.3035C10.5833 34.4893 9.83292 35.4793 8.80445 35.9365L8.71307 35.9775C8.3509 36.1415 7.74292 36.4168 7.01562 36.4168H4.15089C3.52749 36.4168 2.99176 36.2145 2.62334 36.0535L2.45344 35.9775L2.36205 35.9365C1.33359 35.4793 0.583252 34.4893 0.583252 33.3035L0.583252 28.5002C0.583252 28.401 0.594785 28.3047 0.616585 28.2122C0.594569 28.0632 0.583252 27.9117 0.583252 27.7588L0.583252 22.2958C0.583252 20.6315 1.43802 19.1788 2.33799 18.0413C2.9132 17.3141 3.58207 16.6274 4.1841 16.0323L4.62067 15.6038L4.7239 15.503C4.6846 15.488 4.64569 15.471 4.6073 15.4518L2.94064 14.6185C2.32315 14.3097 2.07287 13.5589 2.38162 12.9414C2.69035 12.3239 3.44119 12.0737 4.05867 12.3824L5.68864 13.1974L6.63864 10.5849L6.66294 10.5181C7.00882 9.56676 7.30582 8.74988 7.63284 8.1055C7.98519 7.41123 8.4206 6.81443 9.0973 6.36733C9.7654 5.92591 10.4949 5.74556 11.2897 5.66238C12.0235 5.5856 12.9186 5.58353 13.9835 5.5835C13.9391 5.33861 13.9166 5.08691 13.9166 4.8335C13.9166 3.79271 14.1956 2.79391 14.7123 2.0188C15.2233 1.25243 16.0663 0.583496 17.1666 0.583496L19.8333 0.583496ZM33.9166 30.7487C33.8944 30.752 33.8721 30.755 33.8498 30.7578L28.9166 31.3745V33.3035C28.9166 33.3802 28.9688 33.5443 29.2108 33.6518C29.6896 33.8647 29.8261 33.9168 29.9843 33.9168H32.8489C33.0071 33.9168 33.1436 33.8647 33.6224 33.6518C33.8644 33.5443 33.9166 33.3802 33.9166 33.3035V30.7487ZM3.08325 30.7487L3.08325 33.3035C3.08325 33.3802 3.13544 33.5443 3.3774 33.6518C3.8562 33.8647 3.99272 33.9168 4.15089 33.9168H7.01562C7.17379 33.9168 7.3103 33.8647 7.7891 33.6518C8.03107 33.5443 8.08325 33.3802 8.08325 33.3035V31.3745L3.15014 30.7578C3.12774 30.755 3.10544 30.752 3.08325 30.7487ZM30.4863 17.2502L6.51367 17.2502L6.30684 17.4528C5.62107 18.124 4.91105 18.819 4.30254 19.5873L6.5592 20.7157C7.17669 21.0245 7.42697 21.7753 7.11822 22.3928C6.80949 23.0103 6.05865 23.2605 5.44117 22.9518L3.13412 21.7983C3.10042 21.9675 3.08325 22.1333 3.08325 22.2958L3.08325 27.7588C3.08325 28.0858 3.30369 28.2575 3.46022 28.2772L8.57775 28.9168H10.6551C10.6607 28.901 10.6667 28.885 10.673 28.8693L11.0824 27.8457L11.1056 27.7877C11.3902 27.0762 11.6403 26.4508 11.9044 25.9555C12.1903 25.4195 12.5443 24.9313 13.0905 24.5617C13.6367 24.1918 14.2213 24.0443 14.8251 23.978C15.2716 23.9291 15.7919 23.9193 16.3745 23.9173L20.1774 23.9168C20.9439 23.9168 21.6173 23.9168 22.1754 23.978C22.7793 24.0443 23.3638 24.1918 23.9101 24.5617C24.4563 24.9313 24.8103 25.4195 25.0961 25.9555C25.3603 26.4508 25.6103 27.0762 25.8949 27.7877L26.3276 28.8693C26.3339 28.885 26.3398 28.901 26.3454 28.9168H28.4221L33.5396 28.2772C33.6961 28.2575 33.9166 28.0858 33.9166 27.7588V22.393L31.3028 23.0465C30.6331 23.2138 29.9544 22.8067 29.7869 22.137C29.6196 21.4672 30.0268 20.7885 30.6964 20.6212L33.0334 20.0368C32.9309 19.8908 32.8201 19.7427 32.7013 19.5923C32.0918 18.822 31.3803 18.1255 30.6929 17.4528L30.4863 17.2502ZM20.6948 26.4178H16.3057C15.7788 26.4204 15.4021 26.4297 15.0981 26.4632C14.7234 26.5042 14.5808 26.5717 14.4921 26.6318C14.4034 26.6918 14.2877 26.7992 14.1104 27.1318C13.9185 27.4917 13.7183 27.9875 13.4036 28.7742L13.3466 28.9168L23.6539 28.9168L23.5969 28.7742C23.2823 27.9875 23.0819 27.4917 22.8901 27.1318C22.7128 26.7992 22.5971 26.6918 22.5084 26.6318C22.4198 26.5717 22.2771 26.5042 21.9024 26.4632C21.5984 26.4297 21.2217 26.4204 20.6948 26.4178ZM23.6802 8.08474L13.3188 8.08474C12.5669 8.08818 12.0066 8.10102 11.55 8.1488C10.967 8.20981 10.6803 8.31785 10.4754 8.4532C10.2792 8.58285 10.0948 8.7786 9.86219 9.2369C9.61192 9.73001 9.36514 10.4025 8.98812 11.4393L7.78415 14.7502L29.2149 14.7502L28.0109 11.4393C27.6339 10.4025 27.3871 9.73001 27.1369 9.2369C26.9043 8.7786 26.7199 8.58285 26.5236 8.4532C26.3188 8.31785 26.0321 8.20981 25.4491 8.1488C24.9925 8.10102 24.4321 8.08818 23.6802 8.08474ZM19.8442 3.08457L17.1557 3.08457C17.1163 3.09072 16.975 3.13177 16.7924 3.40555C16.5853 3.71623 16.4166 4.21743 16.4166 4.8335C16.4166 5.17341 16.5108 5.42463 16.5973 5.55433L16.6178 5.5835L20.3821 5.5835L20.4026 5.55433C20.4891 5.42463 20.5833 5.17341 20.5833 4.8335C20.5833 4.21743 20.4146 3.71623 20.2074 3.40555C19.9944 3.08615 19.8376 3.0835 19.8333 3.0835L19.8442 3.08457Z" fill="#0A50EC" />
      </svg>
    ),
    title: 'Car Service',
  },
  {
    icon: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="37" height="29" viewBox="0 0 37 29" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M18.4999 0.75C24.5441 0.749973 30.5232 3.10944 35.9731 7.71143C36.5005 8.15683 36.5671 8.94549 36.1217 9.47294C35.6763 10.0004 34.8876 10.0669 34.3602 9.62153C29.2837 5.33484 23.8593 3.24998 18.5 3.25C13.1406 3.25002 7.71621 5.33494 2.63975 9.62171C2.1123 10.0671 1.32364 10.0006 0.87824 9.47314C0.432837 8.94569 0.499352 8.15703 1.02681 7.71163C6.47666 3.10955 12.4558 0.750027 18.4999 0.75ZM30.1616 12.7305C23.3957 6.74448 13.9822 6.77657 6.86639 12.7064C6.33604 13.1483 6.26439 13.9366 6.70634 14.4669C7.1483 14.9972 7.9365 15.0689 8.46685 14.6269C14.6844 9.44566 22.7122 9.47774 28.505 14.6029C29.022 15.0603 29.812 15.012 30.2695 14.4949C30.7269 13.9779 30.6786 13.1879 30.1616 12.7305ZM25.6338 17.7828C21.8123 13.9613 15.1875 13.9613 11.366 17.7828C10.8779 18.2709 10.8779 19.0624 11.366 19.5506C11.8542 20.0387 12.6456 20.0387 13.1338 19.5506C15.979 16.7054 21.0209 16.7054 23.866 19.5506C24.3542 20.0387 25.1456 20.0387 25.6338 19.5506C26.122 19.0624 26.122 18.2709 25.6338 17.7828ZM17.2499 24.5C17.2499 23.8096 17.8096 23.25 18.4999 23.25C19.1903 23.25 19.7499 23.8096 19.7499 24.5C19.7499 25.1904 19.1903 25.75 18.4999 25.75C17.8096 25.75 17.2499 25.1904 17.2499 24.5ZM18.4999 20.75C16.4289 20.75 14.7499 22.4289 14.7499 24.5C14.7499 26.5711 16.4289 28.25 18.4999 28.25C20.571 28.25 22.2499 26.5711 22.2499 24.5C22.2499 22.4289 20.571 20.75 18.4999 20.75Z" fill="#0A50EC" />
      </svg>
    ),
    title: 'Free WiFi',
  }
];

export const PainToProgress: PainToProgressItem[] = [
  {
    img: Consultation,
    title: 'Personalised Consultation',
    body: 'We listen to understand your pain points and goals.'
  },
  {
    img: Diagnosis,
    title: 'Accurate Diagnosis',
    body: 'Using advanced imaging and evaluation techniques, we pinpoint the root cause.'
  },
  {
    img: Treatment,
    title: 'Tailored Treatment Plan',
    body: 'Whether surgical or non-surgical, we develop a plan that aligns with your lifestyle and recover y timeline.'
  },
  {
    img: ExpertCare,
    title: 'Expert Care',
    body: 'Our skilled team performs procedures with precision and compassion.'
  },
  {
    img: aftercare,
    title: "Ongoing Recovery Support",
    body: "Your journey continues with us. We provide dedicated post-treatment care and guidance for a full and lasting recovery."
  }
];

export const OrthoConditionsWeTreat: OrthoConditionItem[] = [
  {
    area: 'Neck',
    area_procedures: {
      title: 'Neck Procedures',
      desc: 'Our expert spine specialists provide comprehensive neck care, treating conditions such as cervical disc herniation, spinal stenosis, and degenerative disc disease. We focus on relieving pain, restoring function, and using the least invasive techniques for optimal recovery.'
    },
    view_all_treatments: { text: 'View all Neck Treatments', href: '/' },
    treatment_categories: [
      {
        name: 'Cervical Disc Replacement',
        slug: 'cervical-disc-replacement'
      },
      {
        name: 'Anterior Cervical Discectomy and Fusion',
        slug: 'acdf-surgery'
      },
      {
        name: 'Cervical Laminectomy',
        slug: 'posterior-cervical-laminectomy-surgery'
      },
      {
        name: 'Cervical Foraminotomy',
        slug: 'posterior-cervical-foraminotomy-surgery'
      },
      {
        name: 'Neck Pain Management',
        slug: 'neck-pain-treatment-and-shoulder-pain-relief'
      },
    ]
  },
  {
    area: 'Shoulder',
    area_procedures: {
      title: 'Shoulder Procedures',
      desc: 'At Mountain Spine & Orthopedics, our expert shoulder surgeons specialize in advanced shoulder procedures to treat a wide range of conditions, including rotator cuff tears, shoulder instability, and chronic shoulder pain. Using cutting-edge surgical techniques and minimally invasive approaches, we focus on relieving pain, restoring shoulder mobility, and delivering faster recovery times with optimal results.'
    },
    view_all_treatments: { text: 'View all Shoulder Treatments', href: '/' },
    treatment_categories: [
      {
        name: 'Rotator Cuff Repair',
        slug: 'rotator-cuff-repair-surgery'
      },
      {
        name: 'Shoulder Arthroscopy',
        slug: 'shoulder-arthroscopy'
      },
      {
        name: 'Resurfacing Shoulder Replacement',
        slug: 'resurfacing-shoulder-replacement'
      },
      {
        name: 'Shoulder Instability',
        slug: 'shoulder-instability'
      },
      {
        name: 'Fracture Fixation Surgery',
        slug: 'fracture-fixation-surgery'
      }
    ]
  },
  {
    area: 'Hand',
    area_procedures: {
      title: 'Hand Procedures',
      desc: 'Our hand specialists provide expert care for conditions ranging from carpal tunnel syndrome to arthritis and trigger finger. Using advanced microsurgical techniques and minimally invasive approaches, we focus on restoring hand function, reducing pain, and improving quality of life through precise surgical intervention and comprehensive treatment plans.'
    },
    view_all_treatments: { text: 'View all Hand Treatments', href: '/' },
    treatment_categories: [
      {
        name: 'Arthritis Treatment',
        slug: 'arthritis-treatment'
      },
      {
        name: 'Carpal Tunnel Treatment',
        slug: 'carpal-tunnel-release'
      },
      {
        name: 'Trigger Finger Release Surgery',
        slug: 'trigger-finger-release'
      }
    ]
  },
  {
    area: 'Spine',
    area_procedures: {
      title: 'Spine Procedures',
      desc: 'Our spine specialists treat a wide range of conditions including degenerative disc disease, spinal deformities, and nerve compression using both minimally invasive procedures and comprehensive non-surgical care to alleviate pain, improve stability, and enhance overall spinal health.'
    },
    view_all_treatments: { text: 'View all Spine Treatments', href: '/' },
    treatment_categories: [
      {
        name: 'Anterior Cervical Discectomy & Fusion',
        slug: 'acdf-surgery'
      },
      {
        name: 'Facet Joint Rhizotomy Ablation',
        slug: 'facet-ablation-rhizotomy-treatment'
      },
      {
        name: 'Anterior Cervical Corpectomy & Fusion',
        slug: 'anterior-cervical-corpectomy-and-fusion'
      },
      {
        name: 'Artifical Disc Arthroplasty',
        slug: 'artificial-disc-replacement-surgery'
      },
      {
        name: 'Axial Fusion Surgery',
        slug: 'spinal-fusion'
      }
    ]
  },
  {
    area: 'Lower Spine',
    area_procedures: {
      title: 'Lower Spine Procedure',
      desc: 'Our lower back specialists address conditions such as herniated discs, spinal stenosis, and sciatica through a combination of advanced surgical techniques and conservative therapies, aiming to relieve pain, restore mobility, and enhance spinal function.'
    },
    view_all_treatments: { text: 'View all Lower Spine Treatments', href: '/' },
    treatment_categories: [
      {
        name: 'Lumbar Microdiscectomy',
        slug: 'lumbar-microdiscectomy-surgery'
      },
      {
        name: 'Lumbar Laminectomy',
        slug: 'lumbar-laminectomy-surgery'
      },
      {
        name: 'Lumbar Interbody Fusion',
        slug: 'lumbar-fusion-surgery'
      },
      {
        name: 'Anterior Lumbar Interbody Fusion',
        slug: 'anterior-lumbar-interbody-fusion'
      },
      {
        name: 'Lumbar Artificial Disc Replacement',
        slug: 'artificial-disc-replacement-surgery'
      }
    ]
  },
  {
    area: 'Knee',
    area_procedures: {
      title: 'Knee Procedures',
      desc: 'From sports injuries to chronic arthritis, our knee surgeons provide advanced care including ACL repair, meniscus surgery, and total knee replacement. Our goal is to restore movement, relieve pain, and help patients return to daily activities faster.'
    },
    view_all_treatments: { text: 'View all Knee Treatments', href: '/' },
    treatment_categories: [
      {
        name: 'ACL Reconstruction',
        slug: 'acl-reconstruction-surgery'
      },
      {
        name: 'Meniscus Repair',
        slug: 'knee-meniscus-repair'
      },
      {
        name: 'Total Knee Replacement',
        slug: 'total-knee-replacement'
      },
      {
        name: 'Knee Arthroscopy',
        slug: 'knee-arthroscopy'
      }
    ]
  },
  {
    area: 'Foot',
    area_procedures: {
      title: 'Foot Procedures',
      desc: 'Our foot and ankle specialists treat a wide range of conditions, including bunions, plantar fasciitis, and fractures. We use cutting-edge techniques to ensure the best outcomes and minimal downtime for our patients.'
    },
    view_all_treatments: { text: 'View all Foot Treatments', href: '/' },
    treatment_categories: [
      {
        name: 'Bunion Correction',
        slug: 'bunion-correction-surgery'
      },
      {
        name: 'Ankle Ligament Reconstruction',
        slug: 'ankle-ligament-reconstruction-surgery'
      },
      {
        name: 'Ankle Arthroscopy',
        slug: 'ankle-arthroscopy-minimally-invasive-surgery'
      },
      {
        name: 'Ankle Replacement Surgery',
        slug: 'ankle-replacement-surgery'
      }
    ]
  },
];

