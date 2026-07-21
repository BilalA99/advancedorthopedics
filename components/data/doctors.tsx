import { StaticImageData } from 'next/image';
import Monica from '../../public/Monica.png';
import David from '../../public/David.png';
import Douglas from '../../public/DouglasSlaughter.png';
import Christopher from '../../public/ChristopherMcarthy.png';
import Shumway from '../../public/clay-shumway.png';
import toporthoslaughter from '../../public/toporthoslaughter.webp';

// Dr. Scott Katzman's images are intentionally NOT statically imported.
// A webpack static `import` of an image is processed and bundled
// unconditionally at build time, regardless of any runtime array filtering
// applied later (see lib/providers/providerVisibility.ts) — the whole point
// of the SHOW_SCOTT_KATZMAN flag is to keep his data out of flag-off public
// output, so his image must not be pulled into every bundle that merely
// imports this file. These plain object literals satisfy Next/Image's
// StaticImageData shape (so every existing `<Image src={doctor.img} />`
// consumer works unchanged) while staying inert data — no webpack image
// loader ever touches them. The physical files are synced into/out of
// public/ by scripts/sync-provider-media.mjs based on the same flag, so a
// direct request for either path 404s when the flag is off.
const KATZMAN_IMG: StaticImageData = { src: '/ScottKatzman.png', width: 275, height: 286 };
const KATZMAN_CERT_IMG: StaticImageData = { src: '/toporthokatzman.webp', width: 239, height: 300 };

export interface DoctorProp {
    img: StaticImageData;
    slug: string;
    short_bio?: string;
    name: string;
    practice: string;
    socials: string;
    desc: string;
    aboutme: string;
    bio: string;
    snapshot: string[];
    cert?: StaticImageData;
    
    // --- NEW & UPDATED SEO Fields ---
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    ogImage: string;
    medicalSpecialty: string[]; // For schema
    specialties: string[]; // For on-page display
    conditionsTreated: string[]; // For on-page display
    sameAs: string[]; // For schema
    updatedAt?: string;
}

export const Doctors: DoctorProp[] = [
    {
        img: KATZMAN_IMG,
        slug: 'dr-scott-katzman',
        name: 'Dr. Scott Katzman',
        practice: 'Orthopedic Spine Surgeon',
        socials: '',
        short_bio: 'Dr. Scott Katzman is an internationally recognized, board-certified orthopedic surgeon who specializes in comprehensive spine care with a focus on patient outcomes and recovery. A leader in the field since 1996, he provides expert orthopedic care and actively educates fellow surgeons on advanced techniques worldwide.',
        cert: KATZMAN_CERT_IMG,
        desc: 'Dr. Scott Katzman is a nationally acclaimed orthopedic spine surgeon, recognized for his expertise in comprehensive spine care. With over 25 years of experience, he is one of the most sought-after spinal specialists in the country.',
        aboutme: "Dr. Scott Katzman is an internationally recognized board-certified orthopedic and spine surgeon specializing in comprehensive spine care. Since 1996, he has led the field in advanced spine treatments and outpatient procedures that focus on patient outcomes and recovery. Practicing in both New Jersey, New York, and Florida, Dr. Katzman also educates fellow surgeons worldwide and serves as a trusted clinical instructor for major medical companies.",
        bio: "Dr. Katzman is an internationally recognized orthopedic surgeon specializing in comprehensive spine care, and currently practices in New Jersey and Florida. In October 2015, Dr. Katzman was locally recognized as a top New Jersey doctor by The Star-Ledger's Inside New Jersey. After graduating from the University of California at San Diego in 1985, Dr. Scott Katzman attended medical school at Jefferson Medical College in Philadelphia. Upon graduating in 1989, he completed his residency in Orthopedic Surgery at the University of Arizona and went on to become a Board Certified Orthopedic Surgeon in 1996. Since then Dr. Katzman has focused his career on advanced spinal care and orthopedic procedures.\n\nAs one of the most sought after spinal surgeons in the U.S., Dr. Katzman has spent time throughout his career lecturing and educating other physicians on his highly regarded techniques. He has also been a clinical instructor for companies such as Biomet, Johnson & Johnson, Othrocore, Kyphon and Clarus. His comprehensive approach to spine care focuses on patient comfort and recovery, often allowing patients to receive care in outpatient settings. To his patients this means less down time and a quicker recovery than traditional approaches.",
        snapshot: [
            'One of the most sought after spinal surgeons in the U.S.',
            'Since 1996, he has focused his career on advanced spinal care and orthopedic procedures.',
            'Medical Degree at Jefferson Medical College in Philadelphia in 1989',
            'Graduated from the University of California at San Diego in 1985',
            'Top Orthopedic Spine Surgeon 2023 award by FindATopDoc',
            'Named Top New Jersey Doctor by Inside New Jersey (2015)',
            'Clinical instructor for Biomet, Johnson & Johnson, Orthocore, Kyphon, and Clarus',
        ],
        // --- SEO Data ---
        metaTitle: 'Dr. Scott Katzman | Expert Spine Surgery & Minimally Invasive Procedures | Mountain Spine Orthopedics | Florida',
        metaDescription: 'Dr. Scott Katzman at Mountain Spine Orthopedics performs advanced spine surgery including laser spine surgery, artificial disc replacement, and endoscopic procedures. Expert surgical care in Florida.',
        keywords: ["Dr. Scott Katzman", "Mountain Spine Orthopedics", "spine surgery", "laser spine surgery", "artificial disc replacement", "endoscopic spine surgery", "minimally invasive spine surgery", "Florida spine surgeon"],
        ogImage: "/" + (KATZMAN_IMG?.src || "newlogo4.png"),
        medicalSpecialty: ["Orthopedic Surgery", "Spine Surgery"],
        specialties: ["Minimally Invasive Spine Surgery", "Laser Spine Surgery", "Artificial Disc Replacement", "Endoscopic Discectomy", "Microdiscectomy", "Endoscopic Foraminotomy", "Laminoforaminotomy"],
        conditionsTreated: ["Herniated Disc", "Spinal Stenosis", "Degenerative Disc Disease", "Sciatica", "Spinal Tumors", "Scoliosis"],
        sameAs: [
            "https://www.healthgrades.com/physician/dr-scott-katzman-2bgw7",
            "https://www.jupitermed.com/find-a-physician/scott-s-katzman-md/"
        ]
    },
    {
        img: David,
        slug: 'dr-david-cowin',
        name: 'Dr. David Cowin',
        practice: 'Orthopedic Surgeon',
        short_bio: 'Dr. David Cowin is a highly skilled orthopedic surgeon who provides personalized, patient-first care for a wide range of conditions affecting the spine and extremities. He specializes in comprehensive orthopedic treatments and advanced techniques to restore function and relieve pain.',
        socials: '',
        desc: 'Dr. David Cowin is a board-certified orthopedic surgeon specializing in general orthopedic conditions and comprehensive spine care, with expertise in both upper and lower extremity care.',
        aboutme: 'Dr. David Cowin diagnoses and treats a wide range of orthopedic conditions affecting the upper and lower extremities as well as the spine. He is highly skilled in comprehensive orthopedic procedures and advanced techniques, with expertise in spine care and joint reconstruction. Known for his precision and patient-first approach, Dr. Cowin offers personalized care plans aimed at restoring function and relieving pain.',
        bio: "Dr. David Cowin was born in Washington, D.C. and spent part of his upbringing in the Philippines, where his father was an orthopedic surgeon for the U.S. Air Force. He attended Dartmouth College in New Hampshire as an undergraduate, where he conducted orthopedic research. He earned his Doctor of Medicine degree from the University of Florida Medical School, graduating with research honors.\n\nHe completed his orthopedic residency at the University of Florida's Department of Orthopedics and then went on to train further at the Bone and Joint Institute in Arizona, focusing on total joint reconstruction. Dr. Cowin specializes in diagnosing and treating a variety of orthopedic conditions including joint disorders, extremity injuries, and spine-related issues. His clinical focus includes comprehensive spine care and advanced orthopedic procedures.\n\nOutside the clinic, Dr. Cowin enjoys traveling, scuba diving, snowboarding, and spending time with his children as they participate in sports.",
        snapshot: ['Board-certified orthopedic surgeon with over 20 years of experience',
            'Doctor of Medicine from University of Florida in 1998',
            'Residency in Orthopedics at University of Florida Department of Orthopedics',
            'Completed advanced training at Bone and Joint Institute in Arizona focusing on joint reconstruction',
            'Specializes in comprehensive spine care and advanced orthopedic procedures',
            'Undergraduate research in orthopedic surgery at Dartmouth College',
            'Experience treating both upper and lower extremities and spine conditions'],
        // --- SEO Data ---
        metaTitle: 'Dr. David Cowin | Expert Orthopedic Surgery & Joint Reconstruction | Mountain Spine Orthopedics | Florida',
        metaDescription: 'Dr. David Cowin at Mountain Spine Orthopedics performs advanced orthopedic surgery including spine surgery, joint reconstruction, and endoscopic procedures. Expert surgical care in Florida.',
        keywords: ["Dr. David Cowin", "Mountain Spine Orthopedics", "orthopedic surgery", "spine surgery", "joint reconstruction surgery", "endoscopic surgery", "TLIF surgery", "Florida orthopedic surgeon"],
        ogImage: "/" + (David?.src || "newlogo4.png"),
        medicalSpecialty: ["Orthopedic Surgery"],
        specialties: ["Laser Spine Surgery", "Orthopedic Surgery", "TLIF (Transforaminal Lumbar Interbody Fusion)", "Axial Fusion", "Endoscopic Discectomy", "Facet Fusion"],
        conditionsTreated: ["General Orthopedic Conditions", "Sacroiliac Fusions", "Upper Extremity Conditions", "Lower Extremity Conditions", "Spine Conditions"],
        sameAs: [
            "https://www.healthgrades.com/physician/dr-david-cowin-3d8l5"
        ]
    },
    {
        img: Christopher,
        slug: 'dr-christopher-mccarthy',
        name: 'Dr. Christopher McCarthy',
        practice: 'Orthopedic Spine Surgeon',
        socials: '',
        short_bio: 'With elite training from Princeton, Harvard, and Brown University, Dr. Christopher McCarthy is an orthopedic spine surgeon whose expertise is uniquely enhanced by a second residency in emergency medicine. This powerful combination of skills enables him to treat complex spinal conditions with unmatched precision and compassionate care.', 
        desc: 'Dr. Christopher McCarthy is an Ivy League-trained orthopedic spine surgeon and one of the few physicians in the nation dual-trained in both Orthopedic Surgery and Emergency Medicine. With extensive trauma and sports medicine expertise, he is known for managing complex spinal conditions with precision and care.',
        aboutme: 'Dr. Christopher McCarthy brings a rare and powerful combination of training in both orthopedic surgery and emergency medicine. Educated at Princeton and Harvard, and fellowship-trained in orthopedic spine surgery at Brown University, he is among the nation\'s most uniquely skilled spinal surgeons.',
        bio: 'Raised in New Jersey, Dr. McCarthy graduated magna cum laude from Princeton University and earned his medical degree from Rutgers New Jersey Medical School. He trained in Emergency Medicine at Harvard, where he learned under some of the world\'s top physicians and treated a wide spectrum of trauma and ICU-level emergencies. He also served as an on-field physician for the Boston Red Sox during their championship years.\n\nAfter returning to NJ, he pursued fellowship training in Disaster Medicine and served as Director of EMS and Disaster Medicine for St. Vincent\'s Hospital in Manhattan. Driven by a passion to expand his scope, Dr. McCarthy undertook a second full residency in Orthopedic Surgery at Rutgers Robert Wood Johnson University Hospital. There, he also served as a sideline physician for the Rutgers football team.\n\nDrawn to the intricate challenges of spine surgery, he completed a specialized fellowship at Brown University in Spine Surgery. At one of the busiest trauma centers in the nation, Dr. McCarthy handled hundreds of major spinal trauma cases. Today, his combined expertise in emergency and orthopedic care enables him to treat complex spinal conditions with unmatched precision.\n\nHis specialties include adult spine disorders, spinal trauma, comprehensive spine care, reconstructive surgery, and sports-related injuries. With every patient, Dr. McCarthy brings a commitment to compassionate care and customized solutions.',
        snapshot: [
            'Dual-trained in Orthopedic Surgery and Emergency Medicine',
            'Graduated magna cum laude from Princeton University',
            'Completed Emergency Medicine training at Harvard',
            'Orthopedic Surgery residency at Rutgers Robert Wood Johnson University Hospital',
            'Spine Surgery fellowship at Brown University',
            "Former EMS Director at St. Vincent's Hospital, NYC",
            'Treated championship-level athletes, including the Boston Red Sox',
            'Specializes in comprehensive spine care and spine reconstruction',
            'Expert in adult spine disorders and spinal trauma',
            'Performed hundreds of major spine trauma surgeries at a top trauma center'
        ],
        // --- SEO Data ---
        metaTitle: 'Dr. Christopher McCarthy | Expert Spine Surgery & Trauma Reconstruction | Mountain Spine Orthopedics | Florida',
        metaDescription: 'Dr. Christopher McCarthy at Mountain Spine Orthopedics performs advanced spine surgery including trauma reconstruction, minimally invasive procedures, and complex spinal surgeries. Expert surgical care in Florida.',
        keywords: ["Dr. Christopher McCarthy", "Mountain Spine Orthopedics", "spine surgery", "trauma spine surgery", "spinal reconstruction surgery", "minimally invasive spine surgery", "Harvard trained surgeon", "Florida spine surgeon"],
        ogImage: "/" + (Christopher?.src || "newlogo4.png"),
        medicalSpecialty: ["Orthopedic Surgery", "Emergency Medicine", "Spine Surgery"],
        specialties: ["Minimally Invasive Spine Procedures", "Traditional 'Open' Decompression", "Reconstructive Spine Procedures", "Spinal Trauma Surgery"],
        conditionsTreated: ["Adult Degenerative Spine Issues", "Spinal Trauma", "Arthritis", "Hand Injuries", "Shoulder/Rotator Cuff Problems", "Sports-Related Injuries"],
        sameAs: [
            "https://www.healthgrades.com/physician/dr-christopher-mccarthy-338d8"
        ]
    },
    {
        img: Monica,
        slug: 'dr-monica-mcphail-pruitt',
        name: 'Dr. Monica McPhail-Pruitt',
        practice: 'Pain Management',
        socials: '',
        short_bio: 'Dr. Monica McPhail-Pruitt is a highly respected anesthesiologist, dually board-certified in both anesthesiology and pain medicine, who specializes in developing expert perioperative pain strategies. Her compassionate, patient-centered approach ensures individuals are fully supported through the healing process, helping them achieve smoother recoveries and an improved quality of life.',
        desc: 'Dr. Monica McPhail-Pruitt is a double board-certified anesthesiologist and pain management specialist with decades of experience in perioperative care. A vital part of the medical team, her expertise ensures patients receive the safest and most effective anesthesia and pain relief.',
        aboutme: 'Dr. Monica McPhail-Pruitt plays an essential role as a board-certified anesthesiologist with a specialized focus in pain management. With a career grounded in clinical excellence and patient-centered care, she has helped countless patients experience smoother recoveries and improved quality of life. Dr. McPhail-Pruitt provides expert perioperative pain strategies and collaborates closely with the medical team to ensure every patient is prepared for care and supported throughout the healing process.',
        bio: "Dr. Monica McPhail-Pruitt is a highly respected anesthesiologist with board certifications in both anesthesiology and pain medicine. She earned her Bachelor of Arts from the University of Michigan in 1991 and her Doctor of Medicine from Northwestern University's Feinberg School of Medicine in 1996. Following her internship and residency at the University of Michigan Medical Center's Department of Anesthesia, she went on to complete a fellowship in Multidisciplinary Pain Management at the same institution.\n\nDr. McPhail-Pruitt's clinical career has spanned over two decades, with a focus on anesthesia services, pain medicine application, and comprehensive perioperative care. She is certified as both an ACLS and BLS provider through the American Heart Association. As a member of the American Society of Anesthesiologists, the American Society of Regional Anesthesia and Pain Medicine, and the Florida Medical Association, she stays at the forefront of advancements in patient comfort and medical safety.\n\nHer expertise in managing complex pain cases and optimizing anesthesia care has made her an invaluable part of the Mountain Spine & Orthopedics team. Patients benefit not only from her deep knowledge but also from her compassionate approach to helping individuals lead pain-free lives.",
        snapshot: [
            'Double board-certified in anesthesiology and pain medicine',
            'Doctor of Medicine from Northwestern University Feinberg School of Medicine in 1996',
            'Completed internship, residency, and fellowship at University of Michigan Medical Center',
            'Fellowship-trained in multidisciplinary pain management',
            'Bachelor of Arts degree from the University of Michigan in 1991',
            'Certified ACLS and BLS provider with the American Heart Association',
            'Over two decades of experience in medical anesthesia and pain relief',
            'Member of the American Society of Anesthesiologists and the American Society of Regional Anesthesia & Pain Medicine',
            'Expert in comprehensive consultations, pain management, and perioperative care',
            'Key contributor to Mountain Spine & Orthopedics advanced medical and therapeutic procedures'
        ],
        // --- SEO Data ---
        metaTitle: 'Dr. Monica McPhail-Pruitt | Expert Surgical Anesthesia & Pain Management | Mountain Spine Orthopedics | Florida',
        metaDescription: 'Dr. Monica McPhail-Pruitt at Mountain Spine Orthopedics provides expert surgical anesthesia and pain management for orthopedic procedures. Advanced perioperative care in Florida.',
        keywords: ["Dr. Monica McPhail-Pruitt", "Mountain Spine Orthopedics", "surgical anesthesia", "orthopedic surgery anesthesia", "pain management", "perioperative care", "surgical pain relief", "Florida anesthesiologist"],
        ogImage: "/" + (Monica?.src || "newlogo4.png"),
        medicalSpecialty: ["Anesthesiology", "Pain Management"],
        specialties: ["Surgical Anesthesiology", "Post-Op Pain Management", "Perioperative Pain Management"],
        conditionsTreated: ["Acute Surgical Pain", "Chronic Pain Management", "Postoperative Recovery"],
        sameAs: [
            "https://www.healthgrades.com/physician/dr-monica-mcphail-pruitt-278yw"
        ]
    },
    {
        img: Douglas,
        slug: 'dr-douglas-slaughter',
        name: 'Dr. Douglas Slaughter',
        practice: 'Orthopedic Spine Surgeon',
        socials: '',
        cert: toporthoslaughter,
        short_bio: 'Dr. Douglas Slaughter is a board-certified orthopedic spine surgeon with over two decades of experience, whose unique background in mechanical engineering informs his expertise in comprehensive and reconstructive techniques. Recognized as a 2023 Top Orthopedic Spine Surgeon, he provides highly personalized, patient-centered care designed to restore mobility and relieve pain.',
        desc: 'Dr. Douglas Slaughter is an award-winning, board-certified orthopedic spine surgeon with over 21 years of experience in comprehensive and reconstructive spine surgery. Now part of the expert team, Dr. Slaughter is known for providing patients with advanced care and faster recoveries',
        aboutme: 'With a career spanning more than two decades, Dr. Douglas Slaughter brings unmatched expertise in orthopedic spine surgery. His background in mechanical engineering, service in the U.S. Army Reserves, and medical training across top institutions have shaped him into a leader in comprehensive and reconstructive surgical techniques. Dr. Slaughter is committed to providing every patient with highly personalized, patient-centered care to restore mobility and relieve pain. Recognized as a 2023 Top Orthopedic Spine Surgeon, he continues to innovate and educate, helping raise the standard of care for spinal conditions nationwide.',
        bio: "Dr. Douglas Slaughter, M.D. is a board-certified orthopedic surgeon, bringing over 21 years of experience in orthopedic spine surgery. He specializes in comprehensive and reconstructive surgical techniques for spinal conditions caused by injuries, aging, and high-impact activities. Dr. Slaughter earned his undergraduate degree in mechanical engineering and biochemistry from The Ohio State University while serving in the U.S. Army Reserves. He then received his medical degree from the University of Cincinnati College of Medicine and completed his orthopedic surgery residency at Maricopa Medical Center in Phoenix, Arizona.\n\nFurther honing his skills, Dr. Slaughter trained in spinal reconstructive surgery in New York City under the direction of Dr. Michael Neuwirth at the Beth Israel Spine Institute. He later joined Sonoran Spine Center, where he developed and refined his own comprehensive surgical methods now taught to surgeons across the southwestern U.S.\n\nDr. Slaughter's patient-first philosophy, technical precision, and commitment to optimizing recovery times have earned him national recognition — including the title of Top Orthopedic Spine Surgeon in 2023. He continues to lead with compassion and innovation, tailoring every treatment plan to each patient's unique needs.",
        snapshot: [
            'Over 21 years of experience in orthopedic spine surgery',
            'Board-certified orthopedic surgeon specializing in comprehensive and reconstructive spinal procedures',
            'Medical degree from the University of Cincinnati College of Medicine',
            'Residency in orthopedic surgery at Maricopa Medical Center in Phoenix, Arizona',
            'Advanced spinal reconstructive training at Beth Israel Spine Institute in New York City',
            'Background in mechanical engineering and biochemistry from The Ohio State University',
            'Served in the United States Army Reserves during undergraduate studies',
            'Pioneered comprehensive techniques now taught to surgeons across the western U.S.',
            'Named Top Orthopedic Spine Surgeon in 2023 by Findatopdoc',
            'Currently practicing at Mountain Spine & Orthopedics'
        ],
        // --- SEO Data ---
        metaTitle: 'Dr. Douglas Slaughter | Expert Reconstructive Spine Surgery & Advanced Procedures | Mountain Spine Orthopedics | Florida',
        metaDescription: 'Dr. Douglas Slaughter at Mountain Spine Orthopedics performs advanced reconstructive spine surgery and comprehensive spinal procedures. Expert surgical care in Florida.',
        keywords: ["Dr. Douglas Slaughter", "Mountain Spine Orthopedics", "reconstructive spine surgery", "spinal reconstruction surgery", "orthopedic spine surgery", "minimally invasive surgery", "top spine surgeon", "Florida spine surgeon"],
        ogImage: "/" + (Douglas?.src || "newlogo4.png"),
        medicalSpecialty: ["Orthopedic Surgery", "Spine Surgery"],
        specialties: ["Minimally Invasive Orthopedic Surgery", "Reconstructive Surgery for Spinal Injuries", "Spinal Reconstructive Surgery"],
        conditionsTreated: ["Sports Injuries", "High-Impact Activity Injuries", "Age-Related Spine Issues", "Musculoskeletal Conditions"],
        sameAs: [
            "https://www.healthgrades.com/physician/dr-douglas-slaughter-xc2mw"
        ]
    },
    {
        img: Shumway,
        slug: 'dr-clay-shumway',
        name: 'Dr. Clay Shumway',
        practice: 'Foot & Ankle Podiatric Surgeon',
        socials: '',
        short_bio: 'Dr. Clay Shumway is a fellowship-trained foot and ankle surgeon specializing in advanced, minimally invasive techniques, including total ankle replacement and 3D bunion correction. His patient-first philosophy prioritizes conservative care, utilizing surgery only when necessary to restore mobility and ensure lasting relief.',
        desc: 'Dr. Clay Shumway is a board-qualified foot and ankle surgeon with prestigious fellowship training in advanced lower extremity reconstruction, sports medicine, and total ankle replacement. He is a leading expert in 3D bunion correction.',
        aboutme: "Dr. Clay B. Shumway is a fellowship-trained foot and ankle surgeon dedicated to providing the most advanced, compassionate, and comprehensive care. Trained at the prestigious Pennsylvania Intensive Lower Extremity Fellowship, he specializes in complex reconstructions, sports medicine, and total ankle replacement. Dr. Shumway is a leader in 3D bunion correction, having performed nearly 250 Lapiplasty procedures. While an expert in the latest surgical techniques, he is a firm believer in conservative care and only recommends surgery when it provides the clearest path to recovery for his patients.",
        bio: "Dr. Clay B. Shumway is a board-qualified foot and ankle surgeon trained in today's most advanced surgical and nonsurgical treatments. He completed his fellowship at the prestigious Pennsylvania Intensive Lower Extremity Fellowship in Philadelphia, where he mastered high-volume, complex cases including cavus foot reconstruction, podiatry and foot biomechanics, sports medicine, and revision surgeries.\n\nDr. Shumway utilizes state-of-the-art sports medicine techniques, including arthroscopic lateral ankle stabilization, cartilage replacement, and total ankle replacement—a procedure in which few surgeons have extensive fellowship experience. He has a special interest in 3D bunion correction and is one of the most experienced surgeons in the nation with the Lapiplasty procedure.\n\nDuring his residency, Dr. Shumway trained under national leaders in complex foot and ankle reconstruction, gaining extensive experience in Charcot reconstruction and trauma at a level 1 trauma center. Though an expert surgeon, he believes many conditions can be alleviated with conservative treatment and recommends surgery only when clearly indicated. A passionate educator, Dr. Shumway contributes to the medical field by authoring journal articles and presenting at national meetings. When not working, he enjoys spending time with his wife and four young children.",
        snapshot: [
            'Fellowship-Trained in Foot & Ankle Surgery',
            'Specialist in Total Ankle Replacement & Sports Medicine',
            'National Leader in 3D Bunion Correction (Lapiplasty)',
            'Trained in Complex Reconstruction & Revision Surgery',
            'Level 1 Trauma Center Experience',
            'Focus on Conservative, Non-Surgical Treatments First',
            'Author of Peer-Reviewed Journal Articles',
            'Completed Pennsylvania Intensive Lower Extremity Fellowship'
        ],
        // --- SEO Data ---
        metaTitle: 'Dr. Clay Shumway | Expert Foot & Ankle Surgery & Advanced Procedures | Mountain Spine Orthopedics | Florida',
        metaDescription: 'Dr. Clay Shumway at Mountain Spine Orthopedics performs advanced foot and ankle surgery including total ankle replacement, 3D bunion correction, and arthroscopic procedures. Expert surgical care in Florida.',
        keywords: ["Dr. Clay Shumway", "Mountain Spine Orthopedics", "foot and ankle surgery", "total ankle replacement surgery", "3D bunion correction surgery", "Lapiplasty surgery", "arthroscopic ankle surgery", "Florida foot and ankle surgeon"],
        ogImage: "/" + (Shumway?.src || "https://mountainspineortho.b-cdn.net/clay.png"),
        medicalSpecialty: ["Orthopedic Surgery", "Foot and Ankle Surgery"],
        specialties: ["Total Ankle Replacement", "3D Bunion Correction (Lapiplasty)", "Arthroscopic Lateral Ankle Stabilization", "Cartilage Replacement", "Cavus Foot Reconstruction", "Complex Revision Surgery", "Charcot Reconstruction"],
        conditionsTreated: ["Bunions (Hallux Valgus)", "Ankle Arthritis", "Foot & Ankle Sports Injuries", "Cavus Foot Deformity", "Ankle Instability", "Cartilage Lesions", "Foot & Ankle Trauma"],
        sameAs: [
            "https://ossio.io/provider/clay-shumway/"
        ]
    },
]
