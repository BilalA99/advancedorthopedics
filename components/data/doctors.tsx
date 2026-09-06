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

// --- Photos for the six providers added from the sister practice's roster ---
// TEMPORARY: these six are served from the OLSS media host, not BunnyCDN. They
// follow the same plain-object pattern as KATZMAN_IMG above - a literal that
// satisfies next/image's StaticImageData shape - so every existing
// `<Image src={doctor.img} />` consumer keeps working with no JSX change and
// no guessed dimensions (all six source files measure exactly 300x300).
// The host is allowlisted in next.config.ts under an equally temporary entry.
// Remove both once the photos are migrated to BunnyCDN and imported locally.
const OLSS_MEDIA = 'https://www.orthopedicandlaserspinesurgery.com/wp-content/uploads';
const SCHIEBERT_IMG: StaticImageData = { src: `${OLSS_MEDIA}/Steven-Schiebert.webp`, width: 300, height: 300 };
const SORRENTO_IMG: StaticImageData = { src: `${OLSS_MEDIA}/dr-dean-sorrento-bio.png.webp`, width: 300, height: 300 };
const SHARF_IMG: StaticImageData = { src: `${OLSS_MEDIA}/howard-sharf.webp`, width: 300, height: 300 };
const HO_IMG: StaticImageData = { src: `${OLSS_MEDIA}/Johnson-Ho.jpg`, width: 300, height: 300 };
const CUNNINGHAM_IMG: StaticImageData = { src: `${OLSS_MEDIA}/Joseph-Cunningham.png`, width: 300, height: 300 };
// Filename keeps the source spelling "Savoy"; every field we author uses the
// confirmed spelling "Savory". The URL is not ours to rename.
const SAVORY_IMG: StaticImageData = { src: `${OLSS_MEDIA}/PA-Sharmez-Savoy.png.webp`, width: 300, height: 300 };

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

    /**
     * Clinic `locationSlug` values from components/data/clinics.tsx where this
     * provider sees patients. Optional: the six original providers predate this
     * field and have no sourced location data, so adding it as required would
     * mean inventing assignments for them.
     */
    locations?: string[];

    /**
     * Credential class, used to pick the correct schema.org shape.
     * schema.org has no Physician Assistant type, and `Physician` is a
     * MedicalOrganization subtype meaning "a physician" - so emitting it for a
     * PA-C would assert a credential they do not hold. Defaults to 'physician'
     * when omitted, which preserves the existing six providers' schema exactly.
     */
    providerType?: 'physician' | 'physician-assistant';

    /**
     * True when the source photo is a circular cut-out on transparent corners
     * rather than a full rectangular photo. Those four assets are 300x300 with
     * an inscribed circle and ~19,800 transparent corner pixels, which showed
     * the card's own bg-gray-500 through the corners and read as a sticker.
     * Renderers scale the image so the circle covers the square instead.
     * Remove this flag per-provider once a full-bleed photo replaces the asset.
     */
    imgCircularMask?: boolean;
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
        short_bio: 'With elite training from Princeton, Harvard, and Brown University, Dr. Christopher McCarthy is an orthopedic spine surgeon whose expertise is uniquely enhanced by a second residency in emergency medicine. This powerful combination of skills enables him to treat complex spinal conditions with precision and compassionate care.', 
        desc: 'Dr. Christopher McCarthy is an Ivy League-trained orthopedic spine surgeon and one of the few physicians in the nation dual-trained in both Orthopedic Surgery and Emergency Medicine. With extensive trauma and sports medicine expertise, he is known for managing complex spinal conditions with precision and care.',
        aboutme: 'Dr. Christopher McCarthy brings a rare and powerful combination of training in both orthopedic surgery and emergency medicine. Educated at Princeton and Harvard, and fellowship-trained in orthopedic spine surgery at Brown University, he is among the nation\'s most uniquely skilled spinal surgeons.',
        bio: 'Raised in New Jersey, Dr. McCarthy graduated magna cum laude from Princeton University and earned his medical degree from Rutgers New Jersey Medical School. He trained in Emergency Medicine at Harvard, where he learned under some of the world\'s top physicians and treated a wide spectrum of trauma and ICU-level emergencies. He also served as an on-field physician for the Boston Red Sox during their championship years.\n\nAfter returning to NJ, he pursued fellowship training in Disaster Medicine and served as Director of EMS and Disaster Medicine for St. Vincent\'s Hospital in Manhattan. Driven by a passion to expand his scope, Dr. McCarthy undertook a second full residency in Orthopedic Surgery at Rutgers Robert Wood Johnson University Hospital. There, he also served as a sideline physician for the Rutgers football team.\n\nDrawn to the intricate challenges of spine surgery, he completed a specialized fellowship at Brown University in Spine Surgery. At one of the busiest trauma centers in the nation, Dr. McCarthy handled hundreds of major spinal trauma cases. Today, his combined expertise in emergency and orthopedic care enables him to treat complex spinal conditions with precision.\n\nHis specialties include adult spine disorders, spinal trauma, comprehensive spine care, reconstructive surgery, and sports-related injuries. With every patient, Dr. McCarthy brings a commitment to compassionate care and customized solutions.',
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
        aboutme: 'With a career spanning more than two decades, Dr. Douglas Slaughter brings extensive expertise in orthopedic spine surgery. His background in mechanical engineering, service in the U.S. Army Reserves, and medical training across top institutions have shaped him into a leader in comprehensive and reconstructive surgical techniques. Dr. Slaughter is committed to providing every patient with highly personalized, patient-centered care to restore mobility and relieve pain. Recognized as a 2023 Top Orthopedic Spine Surgeon, he continues to innovate and educate, helping raise the standard of care for spinal conditions nationwide.',
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
    {
        img: SCHIEBERT_IMG,
        imgCircularMask: true,
        slug: 'dr-steven-schiebert',
        name: 'Dr. Steven Schiebert',
        practice: 'Orthopedic Spine Surgeon',
        socials: '',
        short_bio: 'Dr. Steven Schiebert is an osteopathic spine surgeon whose career spans two and a half decades of general surgical practice followed by a decade of dedicated orthopaedic training. Licensed in both New Jersey and New York, he pairs minimally invasive spinal techniques with a conservative-first osteopathic philosophy.',
        desc: 'Dr. Steven Schiebert, DO, is an orthopedic spine surgeon with fellowship training from Brown University and 25 years of general surgical experience behind his orthopaedic practice. He treats patients across New Jersey and New York.',
        aboutme: "Dr. Steven Schiebert brings an unusually deep surgical foundation to spine care. Before focusing on the spine, he practiced general surgery for 25 years, then added a decade of orthopaedic surgical training on top of it. That sequence shapes how he works today: he reads a case broadly before narrowing to a plan, and he reaches for an operation only once conservative options have been given a fair trial. As an osteopathic physician he treats the spine as part of a whole system rather than an isolated set of vertebrae, and his practice leans on prevention and evidence-based pain management as much as on the operating room. He is licensed in New Jersey and New York.",
        bio: "Dr. Steven Schiebert is an osteopathic orthopedic surgeon specializing in disorders of the spine. His path into orthopaedics was a long one. He first earned board certification in General Surgery at the Tashkent State Medical Institute before relocating to the United States, and he accumulated roughly 25 years of general surgical experience over the course of that early career.\n\nAfter arriving in the United States he returned to training rather than trading on what he already knew. He earned his Doctor of Osteopathic Medicine degree from the New York College of Osteopathic Medicine at NYIT in 2007, then completed a four-year residency in Orthopaedic Surgery through North Shore-LIJ at Plainview Hospital. He went on to complete fellowship training in spine surgery at Brown University's Warren Alpert Medical School. In total, roughly ten years of supplementary orthopaedic training sit on top of his general surgical background.\n\nIn practice Dr. Schiebert works across the full range of spinal procedures. On the minimally invasive side he performs transforaminal lumbar interbody fusion, percutaneous discectomy, and other fusion techniques designed to limit tissue disruption. Where a condition calls for a traditional or more complex approach, he performs discectomy, laminectomy, and decompression surgery. His osteopathic training informs a preference for conservative and preventative care first, with evidence-based pain management guiding what comes next. He is licensed to practice in both New Jersey and New York.",
        snapshot: [
            'Doctor of Osteopathic Medicine, New York College of Osteopathic Medicine at NYIT (2007)',
            'Spine surgery fellowship, Warren Alpert Medical School of Brown University',
            'Four-year Orthopaedic Surgery residency, North Shore-LIJ at Plainview Hospital',
            'Board certified in General Surgery at Tashkent State Medical Institute prior to relocating to the U.S.',
            'Roughly 25 years of general surgical experience plus a decade of added orthopaedic training',
            'Holds active medical licensure in both New Jersey and New York',
            'Performs both minimally invasive fusion techniques and traditional open decompression',
            'Osteopathic, conservative-first approach to spinal pain',
        ],
        // --- SEO Data ---
        metaTitle: 'Dr. Steven Schiebert, DO | Orthopedic Spine Surgeon | Mountain Spine & Orthopedics | New Jersey & New York',
        metaDescription: 'Dr. Steven Schiebert, DO, is an orthopedic spine surgeon at Mountain Spine & Orthopedics treating patients in New Jersey and New York. Brown University spine fellowship; minimally invasive fusion, discectomy and decompression.',
        keywords: ["Dr. Steven Schiebert", "Steven Schiebert DO", "Mountain Spine & Orthopedics", "orthopedic spine surgeon New Jersey", "spine surgeon New York", "osteopathic spine surgeon", "minimally invasive spine surgery", "TLIF", "percutaneous discectomy", "laminectomy"],
        ogImage: SCHIEBERT_IMG.src,
        medicalSpecialty: ["Orthopedic Surgery", "Spine Surgery"],
        specialties: ["Transforaminal Lumbar Interbody Fusion (TLIF)", "Percutaneous Discectomy", "Spinal Fusion", "Microdiscectomy", "Laminectomy", "Spinal Decompression", "Conservative Pain Management"],
        conditionsTreated: ["Herniated Disc", "Spinal Stenosis", "Degenerative Disc Disease", "Sciatica", "Radiculopathy", "Chronic Back and Neck Pain"],
        sameAs: [],
        // Narrowed from state-level to specific clinics - CONFIRM WITH BILAL.
        // Source supports New Jersey and New York licensure only; it does not
        // name a clinic. NY has a single office so that one is unambiguous.
        locations: ['new-york-city-orthopedics', 'paramus-orthopedics', 'west-orange-surgery-center', 'edison-orthopedics'],
        providerType: 'physician',
    },
    {
        img: SORRENTO_IMG,
        imgCircularMask: true,
        slug: 'dr-dean-sorrento',
        name: 'Dr. Dean Sorrento',
        practice: 'Foot & Ankle Podiatric Surgeon',
        socials: '',
        short_bio: 'Dr. Dean Sorrento is a board certified foot and ankle surgeon who has spent more than two decades on the teaching faculty of the St. Luke’s University foot and ankle residency in Allentown. He treats deformity, arthritis, tendon injury and fracture, and sees a high volume of revision and second-opinion cases.',
        desc: 'Dr. Dean Sorrento is a board certified foot and ankle surgeon, a Diplomate of the American Board of Foot and Ankle Surgery and a Fellow of the American College of Foot and Ankle Surgeons, with 21+ years teaching surgical residents in Allentown, Pennsylvania.',
        aboutme: "Dr. Dean Sorrento has spent his career in the Lehigh Valley teaching the operations he performs. For more than 21 years he has served on the teaching faculty of the St. Luke's University Foot and Ankle Surgical Residency in Allentown, training the surgeons who now practice across eastern Pennsylvania, and he holds an appointment as Clinical Assistant Professor of Surgery at the Penn State College of Medicine in Hershey. That teaching role shapes his clinical work: he is used to explaining why a particular approach fits a particular foot, and he sees a steady stream of revision cases and second opinions from patients who want a clear answer before committing to surgery. His practice covers deformity correction, arthritis, tendon injuries and fractures, with additional training in minimally invasive technique and ankle replacement.",
        bio: "Dr. Dean Sorrento is a board certified foot and ankle surgeon, a Diplomate of the American Board of Foot and Ankle Surgery and a Fellow of the American College of Foot and Ankle Surgeons.\n\nHe earned a Bachelor of Science in Biology, with a minor in Philosophy, from St. Joseph's University in Philadelphia in 1992, then completed podiatric medical school at Temple University, graduating with honors in the top five percent of his class. His surgical training continued at the University of Pennsylvania and Presbyterian Medical Center foot and ankle program, where he trained in reconstructive and traumatologic surgery of the foot and ankle in both adults and children. He has since completed advanced coursework in minimally invasive surgical technique and in ankle arthroplasty.\n\nDr. Sorrento's academic record began early: he published peer-reviewed research while still a resident, and has gone on to lecture for the Podiatry Institute and to co-author a textbook chapter in his field. He serves as Clinical Assistant Professor of Surgery at the Penn State College of Medicine in Hershey, Pennsylvania, and has taught on the faculty of the St. Luke's University Foot and Ankle Surgical Residency in Allentown for over 21 years.\n\nClinically, his focus includes flat foot and other structural deformities, bunion and hammertoe correction, arthritis of the foot and ankle, tendon tears and ruptures, fractures, and revisional surgery for patients whose earlier procedures did not resolve the problem. He also sees a significant number of patients seeking a second opinion before proceeding with surgery.",
        snapshot: [
            'Diplomate, American Board of Foot and Ankle Surgery',
            'Fellow, American College of Foot and Ankle Surgeons',
            'Has trained surgical residents at St. Luke’s University in Allentown, PA for more than 21 years',
            'Clinical Assistant Professor of Surgery, Penn State College of Medicine, Hershey',
            'Graduated in the top 5% of his class at Temple University School of Podiatric Medicine',
            'Reconstructive and trauma training at the University of Pennsylvania / Presbyterian Medical Center foot and ankle program',
            'Post-graduate study in ankle replacement and in minimally invasive operative technique',
            'Published peer-reviewed research as a resident; Podiatry Institute lecturer and textbook chapter co-author',
            'B.S. Biology, St. Joseph’s University, Philadelphia (1992)',
        ],
        // --- SEO Data ---
        metaTitle: 'Dr. Dean Sorrento | Foot & Ankle Surgeon in Allentown, PA | Mountain Spine & Orthopedics',
        metaDescription: 'Dr. Dean Sorrento is a board certified foot and ankle surgeon at Mountain Spine & Orthopedics in Allentown, PA, with 21+ years on the St. Luke’s University residency teaching faculty. Bunions, flat foot, arthritis, tendon injury and revision surgery.',
        keywords: ["Dr. Dean Sorrento", "foot and ankle surgeon Allentown", "podiatric surgeon Lehigh Valley", "Mountain Spine & Orthopedics", "bunion surgery Allentown PA", "flat foot correction", "ankle arthritis treatment", "foot and ankle revision surgery", "second opinion foot surgery Pennsylvania"],
        ogImage: SORRENTO_IMG.src,
        medicalSpecialty: ["Podiatric Surgery", "Foot and Ankle Surgery"],
        specialties: ["Flat Foot Reconstruction", "Bunion Correction", "Hammertoe Correction", "Minimally Invasive Foot Surgery", "Ankle Arthroplasty", "Tendon Repair", "Foot & Ankle Fracture Care", "Revisional Foot & Ankle Surgery", "Second-Opinion Consultations"],
        conditionsTreated: ["Bunions", "Hammertoes", "Flat Foot & Structural Deformities", "Foot & Ankle Arthritis", "Tendon Tears and Ruptures", "Foot & Ankle Fractures", "Failed Prior Foot Surgery"],
        sameAs: [],
        // Allentown is directly evidenced (21+ years of teaching there). The three
        // Philadelphia offices were added per Bilal's instruction; his source bio
        // supports Philadelphia-area training, not practice at those clinics.
        locations: ['allentown-orthopedics', 'philadelphia-walnut-orthopedics', 'philadelphia-tioga-orthopedics', 'philadelphia-germantown-orthopedics'],
        providerType: 'physician',
    },
    {
        img: SHARF_IMG,
        imgCircularMask: true,
        slug: 'dr-howard-sharf',
        name: 'Dr. Howard Sharf',
        practice: 'Orthopedic Spine Surgeon',
        socials: '',
        short_bio: 'Dr. Howard Sharf is a board certified orthopedic surgeon specializing in the spine and neck. He spent 13 years on active duty in the U.S. Army, rising to Chief of Surgery, and later held the same role at St. Petersburg General Hospital in Florida.',
        desc: 'Dr. Howard Sharf is a board certified orthopedic surgeon focused on spine and neck conditions, with a career built across 13 years of U.S. Army service and senior surgical leadership in Florida.',
        aboutme: "Dr. Howard Sharf learned surgery in settings where there was no margin for hesitation. Over 13 years of active duty in the U.S. Army he served as a flight surgeon, taught orthopaedics as a preceptor, deployed multiple times, and ultimately ran a surgical department as Chief of Surgery at Fort Sill. He carried that leadership into civilian practice, serving as Chief of Surgery at St. Petersburg General Hospital in Florida. His clinical focus is the spine and neck, and he works across the whole treatment range rather than defaulting to the operating room, from non-invasive care through minimally invasive procedures to traditional open surgery when a condition genuinely requires it. He is a Fellow of the American Academy of Orthopaedic Surgeons and has published in the American Journal of Surgery.",
        bio: "Dr. Howard Sharf is a board certified orthopedic surgeon whose practice centers on conditions of the spine and neck.\n\nHe completed his undergraduate degree in Biology at Pennsylvania State University and earned his medical degree from Hahnemann Medical College in Philadelphia. His postgraduate training was carried out largely in uniform: an internship at Madigan Army Medical Center in Tacoma, Washington, an orthopedic residency at Lutheran Hospital of Indiana, and a spine fellowship at the Florida Spine Institute.\n\nDr. Sharf served 13 years on active duty with the U.S. Army. He spent two years as a Flight Surgeon at Fort Hood, Texas, followed by two years there as an Orthopedic Preceptor. He was subsequently appointed Chief of Orthopedic Surgery and then Chief of Surgery at Fort Sill, Oklahoma, and deployed on multiple occasions during his service. After leaving active duty he continued in senior surgical leadership as Chief of Surgery at St. Petersburg General Hospital in Florida.\n\nHis clinical philosophy is to match the intervention to the problem. He treats the full spectrum of spinal disorders and deformities using non-invasive care, minimally invasive procedures, and traditional surgical techniques, selecting among them based on what a patient's condition actually calls for. Dr. Sharf has published in the American Journal of Surgery and presented at professional conferences. He is a Fellow of the American Academy of Orthopaedic Surgeons and a member of the American Medical Association and the North American Spine Society.",
        snapshot: [
            'Board certified orthopedic surgeon specializing in spine and neck conditions',
            'Fellow, American Academy of Orthopaedic Surgeons (AAOS)',
            'Spine fellowship, Florida Spine Institute',
            '13 years of active duty service in the U.S. Army, including multiple deployments',
            'Chief of Orthopedic Surgery and later Chief of Surgery, Fort Sill, Oklahoma',
            'Chief of Surgery, St. Petersburg General Hospital, Florida',
            'Orthopedic residency, Lutheran Hospital of Indiana; internship, Madigan Army Medical Center',
            'M.D., Hahnemann Medical College, Philadelphia; B.S. Biology, Pennsylvania State University',
            'Published in the American Journal of Surgery; member of the AMA and North American Spine Society',
        ],
        // --- SEO Data ---
        metaTitle: 'Dr. Howard Sharf | Orthopedic Spine & Neck Surgeon | Mountain Spine & Orthopedics | Florida',
        metaDescription: 'Dr. Howard Sharf is a board certified orthopedic spine surgeon at Mountain Spine & Orthopedics in Florida. Former U.S. Army Chief of Surgery treating spinal disorders and deformities with non-invasive, minimally invasive and traditional techniques.',
        keywords: ["Dr. Howard Sharf", "orthopedic spine surgeon Florida", "neck surgeon Florida", "Mountain Spine & Orthopedics", "spinal deformity treatment", "minimally invasive spine surgery Florida", "military orthopedic surgeon", "North American Spine Society"],
        ogImage: SHARF_IMG.src,
        medicalSpecialty: ["Orthopedic Surgery", "Spine Surgery"],
        specialties: ["Minimally Invasive Spine Surgery", "Cervical Spine Surgery", "Spinal Deformity Correction", "Non-Surgical Spine Care", "Traditional Open Spine Surgery"],
        conditionsTreated: ["Neck Pain", "Back Pain", "Herniated Disc", "Spinal Stenosis", "Spinal Deformity", "Degenerative Disc Disease", "Sciatica"],
        sameAs: [],
        // Narrowed from state-level to specific clinics - CONFIRM WITH BILAL.
        // His bio establishes Florida (St. Petersburg) but MSO has no Tampa Bay
        // office. These two are the closest Central Florida clinics by geography,
        // which is an inference, not something the source states.
        locations: ['davenport-orthopedics', 'orlando-orthopedics'],
        providerType: 'physician',
    },
    {
        img: HO_IMG,
        slug: 'dr-johnson-ho',
        name: 'Dr. Johnson Ho',
        practice: 'Orthopedic Physician',
        socials: '',
        short_bio: 'Dr. Johnson Ho is an orthopedic physician with a background in biomedical engineering and neuromodulation research. He is completing his residency training and is scheduled to begin an Interventional Pain Medicine fellowship at Rutgers Robert Wood Johnson Medical School.',
        desc: 'Dr. Johnson Ho is an orthopedic physician whose interests span pain management, musculoskeletal medicine and sports medicine. A patented biomedical engineer and published researcher, he is finishing residency and is due to begin fellowship training in Interventional Pain Medicine.',
        aboutme: "Dr. Johnson Ho came to medicine through engineering. As an undergraduate he designed and patented a neuromodulation technology aimed at cortical and deep brain structures, with intended applications in chronic pain and recovery after stroke. He graduated as valedictorian of the CUNY Grove School of Engineering and was awarded a Barry M. Goldwater Scholarship. That research thread continued through medical school, where he studied traumatic brain injury and published first-author work on transcranial direct current stimulation as a treatment for chronic pain. He is completing his residency training, and is scheduled to begin an Interventional Pain Medicine fellowship at Rutgers Robert Wood Johnson Medical School. His clinical interests are pain management, musculoskeletal medicine and sports medicine. He speaks Mandarin Chinese, Spanish and Brazilian Portuguese.",
        bio: "Dr. Johnson Ho is an orthopedic physician whose route into clinical medicine ran through biomedical engineering.\n\nHe completed his undergraduate education at the CUNY Macaulay Honors College at City College, where he engineered and patented a neuromodulation technology targeting cortical and deep brain structures, developed with clinical applications in chronic pain and post-stroke recovery in mind. He graduated as valedictorian of the CUNY Grove School of Engineering and received a Barry M. Goldwater Scholarship in recognition of that research.\n\nIn medical school he studied traumatic brain injury under Professor Peter Bergold, held an Alpha Omega Alpha Student Research Fellowship, and graduated with distinction. He is the first author of a paper examining the advantages and limitations of transcranial direct current stimulation in treating chronic pain, published in Principles and Practice of Clinical Research. He also completed Downstate's ACCME-accredited program in Medical Acupuncture.\n\nDr. Ho is currently completing his residency training, which concludes in the spring, and is scheduled to begin a fellowship in Interventional Pain Medicine at Rutgers Robert Wood Johnson Medical School. He was named Resident Physician of the Year at Kings County.\n\nOutside of formal training he has volunteered at the Brooklyn Free Clinic and at community health fairs and flu clinics, and previously served on the SUNY Council and the Student Center Governing Board. He is faculty advisor to the Downstate Volleyball Club and serves as a team physician for high school football in the New York City Public School Athletics League. He is fluent in Mandarin Chinese, Spanish and Brazilian Portuguese, and his clinical interests are in pain management, musculoskeletal medicine and sports medicine.",
        snapshot: [
            'Completing residency training, concluding in the spring',
            'Scheduled to begin an Interventional Pain Medicine fellowship at Rutgers Robert Wood Johnson Medical School',
            'Engineered and patented a neuromodulation technology for chronic pain and post-stroke recovery',
            'Valedictorian, CUNY Grove School of Engineering; Barry M. Goldwater Scholarship recipient',
            'First author on published research into tDCS for chronic pain rehabilitation',
            'Alpha Omega Alpha Student Research Fellowship; graduated medical school with distinction',
            'Completed an ACCME-accredited Medical Acupuncture program at Downstate',
            'Named Resident Physician of the Year at Kings County',
            'Serves as a team physician for high school football in the NYC Public School Athletics League',
            'Fluent in Mandarin Chinese, Spanish and Brazilian Portuguese',
        ],
        // --- SEO Data ---
        metaTitle: 'Dr. Johnson Ho | Orthopedic Physician, Pain & Musculoskeletal Medicine | Mountain Spine & Orthopedics | New York',
        metaDescription: 'Dr. Johnson Ho is an orthopedic physician at Mountain Spine & Orthopedics in New York with interests in pain management, musculoskeletal and sports medicine. Patented neuromodulation researcher and incoming Interventional Pain Medicine fellow at Rutgers.',
        keywords: ["Dr. Johnson Ho", "orthopedic physician New York", "pain management New York", "musculoskeletal medicine", "sports medicine physician NYC", "Mountain Spine & Orthopedics", "medical acupuncture", "neuromodulation research"],
        ogImage: HO_IMG.src,
        medicalSpecialty: ["Pain Management", "Musculoskeletal Medicine", "Sports Medicine"],
        specialties: ["Pain Management", "Musculoskeletal Medicine", "Sports Medicine", "Medical Acupuncture"],
        conditionsTreated: ["Chronic Pain", "Musculoskeletal Injuries", "Sports Injuries", "Back and Neck Pain"],
        sameAs: [],
        // NY only. His training, volunteer work and team-physician role are all
        // NYC-based. The Rutgers (NJ) fellowship has NOT started, so no NJ clinic
        // is assigned on the strength of it. NY has a single office.
        locations: ['new-york-city-orthopedics'],
        providerType: 'physician',
    },
    {
        img: CUNNINGHAM_IMG,
        slug: 'joseph-cunningham-pa-c',
        name: 'Joseph Cunningham, PA-C',
        practice: 'Physician Assistant, Spine',
        socials: '',
        short_bio: 'Joseph Cunningham, PA-C is a nationally certified physician assistant specializing in spine care. He served as Chief Physician Assistant at South Brooklyn Health and is licensed in New York and New Jersey.',
        desc: 'Joseph Cunningham, PA-C is a nationally certified physician assistant with more than a decade of spine experience, formerly Chief Physician Assistant at South Brooklyn Health. He is licensed in New York and New Jersey.',
        aboutme: "Joseph Cunningham has built his career at the intersection of spine care and emergency medicine, two settings that reward fast, accurate assessment. He has been a nationally certified physician assistant since 2012, and in 2019 was appointed Chief Physician Assistant at South Brooklyn Health. His clinical work covers the musculoskeletal and neuropathic spine conditions that make up the bulk of day-to-day practice. Since joining the practice in 2024 he has increasingly concentrated on minimally invasive spine procedures. He is licensed to practice in both New York and New Jersey.",
        bio: "Joseph Cunningham, PA-C is a nationally certified physician assistant specializing in spine care.\n\nHe earned a Bachelor of Arts from The University of Arizona in 2006, then completed his Bachelor of Science in the Physician Assistant Program at the Sophie Davis School of Biomedical Education at the City College of New York. He has held national certification as a physician assistant since 2012 and is licensed to practice in New York and New Jersey.\n\nHis clinical background spans spine care alongside substantial emergency medicine experience. In 2019 he was named Chief Physician Assistant at South Brooklyn Health, a role in which he managed patients across the broad range of musculoskeletal and neuropathic spine conditions.\n\nJoseph joined the practice in 2024. Since then his work has shifted progressively toward minimally invasive spine procedures, and he works closely with the surgical team on both operative planning and the follow-up care that determines how well a patient actually recovers.",
        snapshot: [
            'Has held national PA certification continuously since 2012',
            'Carries active PA licensure in New York and in New Jersey',
            'Named Chief PA at South Brooklyn Health in 2019',
            'B.S., Physician Assistant Program, Sophie Davis School of Biomedical Education, City College of New York',
            'B.A., The University of Arizona (2006)',
            'Career built across spine and emergency-department practice',
            'Growing focus on minimally invasive spine procedures since joining the practice in 2024',
        ],
        // --- SEO Data ---
        metaTitle: 'Joseph Cunningham, PA-C | Spine Physician Assistant | Mountain Spine & Orthopedics | New York & New Jersey',
        metaDescription: 'Joseph Cunningham, PA-C is a nationally certified physician assistant in spine care at Mountain Spine & Orthopedics, serving New York and New Jersey. Former Chief PA at South Brooklyn Health.',
        keywords: ["Joseph Cunningham PA-C", "physician assistant spine care", "spine physician assistant New York", "physician assistant New Jersey", "Mountain Spine & Orthopedics", "minimally invasive spine care", "neuropathic spine disorders"],
        ogImage: CUNNINGHAM_IMG.src,
        medicalSpecialty: ["Orthopedics", "Spine Care"],
        specialties: ["Minimally Invasive Spine Procedures", "Spine Surgical Patient Care", "Pre-operative and Post-operative Spine Care", "Emergency Medicine"],
        conditionsTreated: ["Musculoskeletal Spine Disorders", "Neuropathic Spine Disorders", "Degenerative Disc Disease", "Spinal Stenosis", "Herniated Disc"],
        sameAs: [],
        // Narrowed from state-level to specific clinics - CONFIRM WITH BILAL.
        // NY + NJ licensure is explicit and his entire career is Brooklyn-based;
        // the specific NJ sites are inferred from proximity and from West Orange
        // being a surgery center, which suits a spine PA.
        locations: ['new-york-city-orthopedics', 'west-orange-surgery-center', 'paramus-orthopedics'],
        providerType: 'physician-assistant',
    },
    {
        img: SAVORY_IMG,
        imgCircularMask: true,
        slug: 'sharmez-savory-pa-c',
        name: 'Sharmez Savory, PA-C',
        practice: 'Physician Assistant',
        socials: '',
        short_bio: 'Sharmez Savory, PA-C is a board certified physician assistant with experience in family medicine and pain management, and surgical fellowship training completed at Arrowhead Medical Center.',
        desc: 'Sharmez Savory, PA-C is a board certified physician assistant whose background spans family medicine and pain management, with additional surgical fellowship training.',
        aboutme: "Sharmez Savory is a board certified physician assistant whose training moved deliberately from broad to specialized. He began in the biological sciences, spent time in maternal health as an intern with the Los Angeles Maternal Health Program, and completed hospital rotations before entering physician assistant training. After certification he practiced in family medicine and then in pain management, two fields that reward listening carefully to how a patient describes what they feel. He went on to complete a surgical fellowship, adding a surgical dimension to a background rooted in primary and pain care.",
        bio: "Sharmez Savory, PA-C is a board certified physician assistant.\n\nHe earned a Bachelor of Science in Biological Sciences from the University of California, Irvine. During his early training he completed an internship with the Los Angeles Maternal Health Program at the Charles R. Drew University of Medicine and Science, which included clinical rotations at Martin Luther King Hospital. He subsequently studied Business and Management at the University of Redlands.\n\nHe was accepted into the Physician Assistant program at Moreno Valley College in 2008 and graduated in 2010, going on to earn board certification. His clinical experience covers family medicine and pain management.\n\nIn 2015 Sharmez completed a surgical fellowship at Arrowhead Medical Center in San Bernardino, California, extending his practice into the surgical management of spinal conditions.",
        snapshot: [
            'Board certified Physician Assistant',
            'Surgical Fellowship, Arrowhead Medical Center, San Bernardino, CA (2015)',
            'Entered the PA program at Moreno Valley College in 2008 and finished in 2010',
            'B.S. Biological Sciences, University of California, Irvine',
            'Internship, Los Angeles Maternal Health Program, Charles R. Drew University of Medicine and Science',
            'Completed hospital rotations at Martin Luther King Hospital',
            'Studied Business and Management at the University of Redlands',
            'Practised first in family medicine, later in pain management',
        ],
        // --- SEO Data ---
        // State-agnostic on purpose: no practice location is confirmed yet.
        metaTitle: 'Sharmez Savory, PA-C | Physician Assistant | Mountain Spine & Orthopedics',
        metaDescription: 'Sharmez Savory, PA-C is a board certified physician assistant at Mountain Spine & Orthopedics with experience in family medicine and pain management and surgical fellowship training.',
        keywords: ["Sharmez Savory PA-C", "physician assistant", "Mountain Spine & Orthopedics", "pain management physician assistant", "fellowship trained physician assistant", "family medicine physician assistant"],
        ogImage: SAVORY_IMG.src,
        medicalSpecialty: ["Pain Management", "Spine Care"],
        specialties: ["Pain Management", "Family Medicine", "Spine Surgical Patient Care"],
        conditionsTreated: ["Chronic Pain", "Spine-Related Pain", "General Musculoskeletal Conditions"],
        sameAs: [],
        // No geographic tie found in source bio - confirm actual MSO practice
        // location(s) with Bilal before publishing location-specific content or
        // schema. His entire documented history is California-based.
        locations: [],
        providerType: 'physician-assistant',
    },
]
