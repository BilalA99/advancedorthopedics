import { ConditionInfoProp } from "../ConditionCard";
import Image from "next/image";
import OutlinedButton from '@/components/OutlinedButton'
import backpaintreatment from '@/public/backpaintreatment.png'
import backpaintreatment2 from '@/public/backpaintreatment2.jpeg'
import backpaintreatmentside from '@/public/backpaintreatmentside.png'
import GradientOverlayImage from "../GradientOverlayImage";
import pinchednerve from '@/public/pinchednerve.jpeg'
import pinchednerve2 from '@/public/pinchednerve2.jpeg'
import pinchednerveside from '@/public/pinchednerveside.jpeg'

export const PainAreaTreatments: ConditionInfoProp[] = [
    {
        title: "Back Pain Treatment Options",
        body: "We offer a range of advanced back pain treatments, starting with non-surgical options and medication. When conservative care isn't enough, we provide minimally invasive procedures such as microdiscectomy, cervical discectomy, and artificial disc replacement to relieve nerve compression. For more complex cases, traditional surgeries like spinal fusion or laminectomy may be necessary. Our focus is on restoring mobility, reducing pain, and helping you get back to daily life with lasting relief.",
        metaTitle: "Back Pain Treatment Options - Mountain Spine & Orthopedics",
        metaDesc: "Explore our comprehensive back pain treatments, from non-surgical options to advanced minimally invasive procedures. Get personalized care for lasting relief.",
        ogImage: "/backpaintreatment.png", // or another relevant imported image if available, else /newlogo4.png
        forum: [
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] text-2xl">
                            What Back Pain Treatments Are Available?
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-xl"
                            >
                                At Mountain Spine & Orthopedics, we specialize in personalized back pain care, starting with conservative options like rehabilitation planning, medications, and lifestyle adjustments. For more severe cases, we offer advanced minimally invasive spine surgery techniques that reduce tissue disruption, shorten recovery times, and provide lasting relief.
                            </p>

                            <GradientOverlayImage
                                imageData={backpaintreatment} // Passing static image data
                                height="500px"
                                gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
                            />

                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-xl"
                            >
                                If you're struggling with persistent or worsening back pain, our team is here to help. Use our quick and easy condition checker to determine whether you may be a candidate for evaluation or treatment.
                            </p>

                            <OutlinedButton text="Do I have this Condition?" />

                        </div>
                    </div>
                )
            },
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] text-2xl">
                            Top Back Pain & Spine Procedures at Mountain Spine & Orthopedics
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <ul
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-xl list-disc pl-6 space-y-2"
                            >
                                <li>Transforaminal Lumbar Interbody Fusion (TLIF): Stabilizes the spine by removing a damaged disc and inserting a bone graft or spacer, relieving nerve pressure.</li>
                                <li>Lumbar Laminectomy: Removes a portion of vertebral bone (lamina) to decompress nerves, often used to treat spinal stenosis.</li>
                                <li>Lumbar Fusion: Joins two or more vertebrae together to treat degenerative disc disease or spondylolisthesis.</li>
                                <li>Lumbar Disc Replacement: Replaces a damaged disc with an artificial one to preserve motion and reduce pain.</li>
                                <li>Coccygectomy: Removes the tailbone in severe, chronic coccydynia cases unresponsive to conservative treatment.</li>
                                <li>Minimally Invasive Surgery: Includes TLIF, laminectomy, and others performed through small incisions for quicker recovery.</li>
                            </ul>

                            <OutlinedButton text="Find a Treatment" />
                        </div>
                    </div>
                )
            },
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] text-4xl">
                            How Is Back Pain Treated Without Surgery?
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <div
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-xl">
                                <p className="mb-4">Not all back pain requires surgery. Many patients respond well to non-invasive treatment options such as:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Steroid Injections: Reduce inflammation and provide temporary relief.</li>
                                    <li>Medications: NSAIDs, muscle relaxants, and analgesics ease discomfort and tension.</li>
                                    <li>Alternative Therapies: Acupuncture, TENS, tai chi, and chiropractic care can improve circulation and reduce nerve pain.</li>
                                    <li>Hot & Cold Therapy: Cold packs reduce swelling, while heat relaxes muscles and increases flexibility.</li>
                                    <li>Weight Management: Maintaining a healthy weight helps reduce strain on the spine and prevent flare-ups.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )
            },
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] text-4xl">
                            Common Causes of Chronic Back Pain
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <div
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-xl">
                                <p className="mb-4">Chronic back pain is defined as pain lasting 12 weeks or longer, even after the initial cause has been treated. It can be caused by:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Herniated or Bulging Discs: Disc material presses on nerve roots, causing inflammation and pain.</li>
                                    <li>Spinal Stenosis: Narrowing of the spinal canal compresses nerves and leads to chronic discomfort.</li>
                                    <li>Degenerative Disc Disease: Disc breakdown over time leads to stiffness, inflammation, and instability.</li>
                                    <li>Facet Joint Dysfunction: Irritation in the small joints between vertebrae creates localized back pain.</li>
                                    <li>Muscle Strains: Caused by overuse, poor posture, or improper lifting.</li>
                                    <li>Traumatic Injury: Fractures or direct trauma may result in long-term pain.</li>
                                </ul>
                            </div>

                            <GradientOverlayImage
                                imageData={backpaintreatment2} // Passing static image data
                                height="500px"
                                gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
                            />

                        </div>
                    </div>
                )
            },
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] text-4xl">
                            Signs Your Back Pain May Be Worsening
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <div
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-xl">
                                <p className="mb-4">You should consult a spine specialist if you notice:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Persistent Pain: Lasting more than a few weeks</li>
                                    <li>Limited Mobility: Struggling with walking, bending, or lifting</li>
                                    <li>Increased Pain After Rest: Pain worsens with inactivity or bed rest</li>
                                    <li>Radiating Symptoms: Numbness, weakness, or shooting pain in the legs or arms</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )
            },
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] text-4xl">
                            How to Prevent Back Pain with Lifestyle Habits
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <div
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-xl">
                                <p className="mb-4">A healthy lifestyle plays a key role in preventing chronic back pain. Here's what we recommend:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Exercise Regularly: Strengthen your core and improve flexibility</li>
                                    <li>Eat a Balanced Diet: Choose anti-inflammatory foods to support joint health</li>
                                    <li>Maintain Good Posture: Adjust your seating and work environment</li>
                                    <li>Avoid Heavy Lifting: Or use proper lifting techniques</li>
                                    <li>Stay Active: Avoid prolonged sitting or sedentary habits</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )
            },
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] text-4xl">
                            Frequently Asked Questions About Treating Back Pain
                        </h2>
                        <div className=" flex flex-col space-y-[16px]">
                            <div
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-xl">
                                <p className="mb-4">What's the recovery time for minimally invasive back surgery?</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Most patients recover faster than with traditional surgery returning to activity within weeks.</li>
                                </ul>
                            </div>

                            <div
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-xl">
                                <p className="mb-4">Are minimally invasive surgeries effective?</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Yes, they offer the same or better outcomes with less pain and faster recovery.</li>
                                </ul>
                            </div>

                            <div
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-xl">
                                <p className="mb-4">Will I need outside rehabilitation after surgery?</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>In most cases, yes. Your surgeon will refer you to trusted PT specialists who help strengthen muscles and improve mobility.</li>
                                </ul>
                            </div>

                            <div
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-xl">
                                <p className="mb-4">What are the risks of spinal surgery?</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Risks are low, especially with minimally invasive techniques, but may include infection or incomplete relief.</li>
                                </ul>
                            </div>

                            <div
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-xl">
                                <p className="mb-4">Can physical activity worsen my back pain?</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Not if done correctly. Guided exercise helps reduce pain over time and prevent reinjury.</li>
                                </ul>
                            </div>

                        </div>
                    </div>
                )
            },
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] text-4xl">
                            Back Pain Doesn't Have to Control Your Life
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <div
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-xl">
                                Living with chronic back pain can be exhausting—but you don't have to do it alone. At Mountain Spine & Orthopedics, our team specializes in advanced, minimally invasive techniques and personalized recovery plans to help you get back to doing what you love.<br /><br />
                                Call us today at (866) 272-9271 or fill out our online form to schedule your consultation. Relief may be closer than you think.
                            </div>
                        </div>
                    </div>
                )
            }
        ],
        side_img: backpaintreatmentside,
        slug: "back-pain-treatment-options",
        tag: "Back Pain",
        keywords: [
            "back pain treatment Florida",
            "degenerative disc disease relief",
            "herniated disc solutions",
            "orthopedic spine specialist Florida",
            "minimally invasive back surgery",
            "lumbar spine care",
            "sciatica treatment options",
            "non-surgical spine therapy"]
    },
    {
        title: "Neck & Shoulder Treatment Options",
        body: `Chronic neck and shoulder pain can interfere with your everyday activities from working at a desk to sleeping through the night. Whether the cause is poor posture, a pinched nerve, muscle strain, arthritis, or a more complex spine condition, finding the right treatment starts with understanding the root cause.
At Mountain Spine & Orthopedics, our team specializes in diagnosing and treating a wide range of neck and shoulder conditions. From non-invasive therapies to advanced surgical solutions, we help patients regain motion, strength, and long-term comfort. If you're unsure about your current care plan, we also offer second opinions and customized treatment strategies.`,
        metaTitle: "Neck & Shoulder Treatment Options - Mountain Spine & Orthopedics",
        metaDesc: "Discover our comprehensive neck and shoulder pain treatments, from non-invasive therapies to advanced surgical solutions. Get personalized care for lasting relief.",
        ogImage: "/pinchednerve.jpeg", // or another relevant imported image if available, else /newlogo4.png
        tag: "Neck & Shoulder Pain",
        forum: [
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] text-2xl">
                            What Neck & Shoulder Treatments Are Available?
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <div
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-xl"
                            >
                                <p className="mb-4">We take a comprehensive approach to neck and shoulder care, beginning with a detailed evaluation and diagnosis. Treatments may include:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Rehabilitation planning to improve flexibility and reduce muscle strain</li>
                                    <li>Anti-inflammatory medications and muscle relaxants</li>
                                    <li>Corticosteroid injections to reduce inflammation around joints or nerves</li>
                                    <li>Trigger point injections for myofascial pain</li>
                                    <li>Minimally invasive surgery when conservative options fail</li>
                                </ul>
                                <p className="mt-4">Our specialists will guide you through every option so you can make the most informed decision for your lifestyle and condition.</p>
                            </div>

                            <GradientOverlayImage
                                imageData={pinchednerve} // Passing static image data
                                height="500px"
                                gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
                            />

                            <div
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-xl"
                            >
                                If you're struggling with persistent or worsening neck or shoulder pain, our team is here to help. Use our quick and easy condition checker to see if you're a candidate for treatment.
                            </div>

                            <OutlinedButton text="Do I have this Condition?" />

                        </div>
                    </div>
                )
            },
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] text-2xl">
                            Top Neck & Shoulder Procedures at Mountain Spine & Orthopedics
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <div
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-xl"
                            >
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Cervical Discectomy & Fusion: Removes a damaged disc in the neck and fuses the vertebrae to relieve nerve pressure</li>
                                    <li>Artificial Disc Replacement: Replaces a worn disc with a synthetic one to maintain motion in the cervical spine</li>
                                    <li>Shoulder Arthroscopy: A minimally invasive surgery to repair rotator cuff tears or impingement</li>
                                    <li>Trigger Point Injections: Used to treat myofascial pain and shoulder stiffness</li>
                                    <li>Cervical Laminoplasty: Expands the spinal canal in the neck to relieve nerve compression from spinal stenosis</li>
                                </ul>
                                <p className="mt-4">These procedures are performed using the latest technology to reduce downtime and improve outcomes.</p>
                            </div>
                            <OutlinedButton text="Find a Treatment" />
                            <GradientOverlayImage
                                imageData={pinchednerve2} // Passing static image data
                                height="500px"
                                gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
                            />

                        </div>
                    </div>
                )
            },
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] text-4xl">
                            How Are Neck & Shoulder Issues Treated Without Surgery?
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <div
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-xl">
                                <p className="mb-4">Many patients experience relief from conservative treatments without the need for surgery. Common non-invasive options include:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Outside rehabilitation guidance to stretch and strengthen key muscles</li>
                                    <li>Ergonomic adjustments for work or sleep posture</li>
                                    <li>Anti-inflammatory and neuropathic medications</li>
                                    <li>Therapeutic massage or acupuncture</li>
                                    <li>Cold and heat therapy for pain relief</li>
                                </ul>
                                <p className="mt-4">Early intervention can prevent symptoms from worsening and may eliminate the need for more aggressive procedures down the line.</p>
                            </div>
                        </div>
                    </div>
                )
            },
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] text-4xl">
                            Frequently Asked Questions About Neck & Shoulder Treatments
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <div
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-xl">
                                <p className="mb-4"><span className="text-black">Do I need surgery for chronic neck or shoulder pain?</span></p>
                                Not necessarily. Many conditions can be treated effectively with rehabilitation planning, medications, or injections.
                            </div>
                            <div
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-xl">
                                <p className="mb-4"><span className="text-black">When should I see a specialist?</span></p>
                                If your pain has lasted more than a few weeks or is interfering with daily activities, it's time to consult a physician.
                            </div>
                            <div
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-xl">
                                <p className="mb-4"><span className="text-black">Are there long-term risks if I delay treatment?</span></p>
                                Prolonged nerve compression or joint damage can lead to permanent issues, so early care is best.
                            </div>
                            <div
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-xl">
                                <p className="mb-4"><span className="text-black">What does recovery after surgery involve?</span></p>
                                Recovery typically includes guided exercise programs to improve range of motion and strengthen supporting muscles. Many patients benefit from structured rehabilitation as part of their recovery plan.
                            </div>
                        </div>
                    </div>
                )
            },
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] text-4xl">
                            Schedule a Consultation Today
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <div
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-xl">
                                Living with chronic pain in your neck or shoulders can limit your ability to enjoy everyday activities. At Mountain Spine & Orthopedics, our expert team is here to help you find lasting relief. We take the time to understand your condition, explain all your options, and create a treatment plan tailored to your goals.<br /><br />
                                Call us today at (561) 223-9959 or fill out our online consultation form to get started. Relief may be closer than you think.
                            </div>

                        </div>
                    </div>
                )
            }
        ],
        side_img: pinchednerveside,
        slug: "neck-and-shoulder-pain-treatment",
        keywords: [
            "neck pain treatment Florida",
            "shoulder pain specialist",
            "cervical disc herniation care",
            "ACDF surgery options",
            "pinched nerve relief Florida",
            "minimally invasive neck surgery",
            "cervical spine doctor Florida",
            "shoulder stiffness treatment"
        ],

    }
]
