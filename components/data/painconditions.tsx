import { ConditionInfoProp } from "../ConditionCard";
import LowerBackImage from "@/public/lowerbackpain.png";
import LowerBackSide from "@/public/lowerbackpainside.jpeg";
import Image from "next/image";
import OutlinedButton from "@/components/OutlinedButton";
import cervicalspinalstenosis1 from "@/public/cervicalspinal.jpeg";
import cervicalspinalstenosis2 from "@/public/cervicalspinal2.png";
import cervicalspinalstenosisside from "@/public/cervicalspinalside.png";
import sciatica from "@/public/sciatica.png";
import sciaticaside from "@/public/sciaticaside.png";
import coccydynia from "@/public/coccydynia.jpeg";
import coccydynia2 from "@/public/coccydynia2.jpeg";
import coccydyniaside from "@/public/coccydyniaside.png";
import cervicalhernia from "@/public/cervicalhernia.jpeg";
import cervicalherniaside from "@/public/cervicalherniaside.png";
import degendiscside from "@/public/degendiscside.jpeg";
import GradientOverlayImage from "../GradientOverlayImage";
import lumbarherniateddisc from "@/public/lumberherniateddisc.jpeg";
import lumbarherniateddisc2 from "@/public/lumberherniateddisc2.png";
import lumbarherniateddiscside from "@/public/lumberherniateddiscside.png";
import arthritis from "@/public/arthritis.png";
import arthritis2 from "@/public/arthritis2.jpeg";
import pinchednerve from "@/public/pinchednerve.jpeg";
import pinchednerve2 from "@/public/pinchednerve2.jpeg";
import pinchednerveside from "@/public/pinchednerveside.jpeg";

import spondy3 from "@/public/spondy3.png";
import { sign } from "crypto";
import { StaticImageData } from "next/image";

// export interface ConditionInfoProp {
// title : string
// body : string
// slug : string
// forum? : {}[]
// card_img?: StaticImageData
// inTxt_img?: StaticImageData
// side_img? : StaticImageData
// detail? : string
// what_sym? : string
// risk_fac? : string
// diagnose? : string
// treatment? : string
// pain_info? : string
// prevent? : string
// schedule? : string
// }

export const conditions: ConditionInfoProp[] = [

    {
        title: "Understanding and Treating Lower Back Pain",
        tag: "Lower Spine",
        card_img:
            "https://mountainspineortho.b-cdn.net/public/LowerBackPainimg.png",
        inTxt_img: "https://mountainspineortho.b-cdn.net/public/LowerBackPaintxt.png",
        body: "If lower back pain is making it hard to work, sleep, or enjoy your life, you're not alone. It's a leading reason people seek medical care, but finding lasting relief starts with understanding the specific cause of your pain.",
        detail: "Your lower back, or lumbar spine, is a complex structure of bones, joints, and muscles that supports most of your body's weight. Pain can start from a simple muscle strain after a weekend of yard work, or from more complex issues like a herniated disc or arthritis that develop over time. At Mountain Spine & Orthopedics, our Florida-based team helps you pinpoint the exact source of your discomfort, so you can get on a path to meaningful relief.",
        what_sym: "Lower back pain feels different for everyone. You might have a dull, constant ache, or sudden, sharp pains that take your breath away. Sometimes, the pain travels down into your leg, causing numbness or a 'pins and needles' feeling. This is often a sign of sciatica and is a clear indicator that you should see a specialist.",
        risk_fac:
            "Your risk for lower back pain can increase with age, a desk job, or being overweight. Jobs that require heavy lifting or repetitive bending also put extra strain on the back. The first step to feeling better is identifying these factors in your own life.",
        diagnose:
            "To find the source of your pain, our specialists will talk with you about your symptoms and perform a physical exam. Often, this is enough to start a treatment plan. If needed, we offer a complimentary review of your MRI or X-rays to get a clearer picture of what's happening inside your spine.",
        treatment:
            "Most lower back pain gets better without surgery. We focus first on non-surgical options like targeted outside rehabilitation to build core strength, anti-inflammatory medications, and guided injections to calm irritated nerves. If your pain continues, our surgeons are experts in minimally invasive procedures that offer lasting relief with a quicker recovery.",
        pain_info:
            "Living with back pain is draining. It can flare up unexpectedly and make simple tasks feel monumental. Our approach is to break this cycle of pain and inflammation. We combine effective pain management with education on posture and movement to help you regain control and get back to your daily activities without fear of a flare-up.",
        prevent:
            "You can take simple steps to protect your lower back. Maintaining a healthy weight, practicing good posture at your desk, and learning how to lift properly can make a huge difference. Regular, gentle exercise like walking or swimming also keeps your back strong and flexible.",
        why_choose_us:
            "At Mountain Spine & Orthopedics, our board-certified spine specialists are focused on one thing: relieving your back pain. We provide every patient in our Florida clinics with a complimentary MRI review and a free second opinion to ensure you have a clear and accurate diagnosis from day one. We'll explore all effective non-surgical and minimally invasive options to help you reclaim your active life.",
        schedule:
            "If lower back pain is holding you back, it's time to get answers. Schedule a consultation with our team today for a complimentary MRI review and start your journey toward lasting relief.",
        side_img: "https://mountainspineortho.b-cdn.net/public/lowerbackpainside.jpeg",
        forum: [
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            What Could Be Causing My Lower Back Pain?
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                Lower back conditions can present in many ways, including
                                radiating pain, stiffness, numbness, or tingling that travels
                                through one or both legs. The severity and type of symptoms
                                often depend on the specific condition and how far it has
                                progressed. Conditions like herniated discs, spinal stenosis,
                                osteoarthritis, and spondylolisthesis are among the most common
                                causes of chronic lower back pain. If you’re experiencing
                                numbness or tingling in particular, this may point to nerve
                                compression which is often more serious than general discomfort
                                and should be addressed immediately to prevent long-term damage.
                            </p>
                            <GradientOverlayImage
                                imageData={
                                    "https://mountainspineortho.b-cdn.net/public/lowerbackpain.png"
                                } // Passing static image data
                                height="500px"
                                gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
                            />
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                Even if your pain seems manageable, it’s important not to ignore
                                it. Small symptoms can be early warning signs of more serious
                                spinal conditions. That’s why we offer a quick and easy Back
                                Condition Checker to help identify potential issues. This tool
                                is designed to gather information about your symptoms and guide
                                you toward the appropriate care pathway.
                            </p>

                            <OutlinedButton text="Do I have this Condition?" />
                        </div>
                    </div>
                ),
            },
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            What is the Right Treatment for Me?
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                The only way to determine the right treatment is through an
                                accurate diagnosis. Our specialists use a variety of advanced
                                tools, including MRI scans, X-rays, ultrasounds, and physical
                                evaluations to assess the source of your lower back pain. These
                                methods help detect conditions like herniated or bulging discs,
                                osteoarthritis, spinal stenosis, spondylolisthesis, or even
                                spinal fractures. Once a clear diagnosis is made, our highly
                                trained doctors at Mountain Spine & Orthopedics can recommend a
                                treatment plan tailored to your needs. With access to advanced
                                procedures not widely available elsewhere, we’re able to offer
                                both non-surgical and surgical options based on what’s best for
                                your recovery.
                            </p>
                            <OutlinedButton text="Find a Treatment" />
                        </div>
                    </div>
                ),
            },
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            Is Surgery Necessary for Back Pain?
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                Surgery is not always necessary for lower back pain. In fact,
                                many patients experience significant relief through
                                non-surgical treatments such as outside rehabilitation, spinal
                                injections, or medications that improve body mechanics and
                                reduce inflammation. However, if conservative treatments fail
                                or if there is significant damage to spinal discs or nerves,
                                surgical intervention may be required. In those cases, our team
                                specializes in minimally invasive procedures designed to reduce
                                recovery time and improve outcomes.
                            </p>
                        </div>
                    </div>
                ),
            },
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            How Can I Prevent Lower Back Pain?
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                The most effective way to prevent lower back pain is by
                                maintaining a healthy lifestyle. Carrying excess weight places
                                added pressure on the lower spine, accelerating disc
                                degeneration. Poor posture and lack of physical activity can
                                also contribute to spinal issues over time. Even habits like
                                smoking or prolonged sitting can increase the risk of developing
                                chronic back pain. Making simple changes, such as staying
                                active and practicing good posture, can go a long way in
                                protecting your spine.
                            </p>
                        </div>
                    </div>
                ),
            },
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            Schedule a Consultation Today
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                If you’re experiencing persistent lower back pain, numbness, or
                                radiating leg symptoms, it may be time to speak with a spine
                                specialist. These signs could indicate a more serious issue
                                that, if caught early, can be treated before it worsens. <br />{" "}
                                <br /> At Mountain Spine & Orthopedics, we specialize in
                                diagnosing and treating the full range of lower back conditions
                                with the most advanced technology and techniques available.
                                Don’t wait to take control of your health. Contact us at (561) 223-9959 or fill out our online form to schedule your
                                consultation today.
                            </p>
                        </div>
                    </div>
                ),
            },
        ],
        slug: "lower-back-pain",
        keywords: [
            "lower back pain relief", "causes of back pain", "sciatica pain", "back pain doctor Florida", "non-surgical back pain treatment", "lumbar pain", "chronic back ache",
        ],
        metaTitle: "Lower Back Pain Relief in Florida | Mountain Spine Orthopedics",
        metaDesc: "Struggling with lower back pain? Learn the common causes and your options for relief. Our Florida orthopedic team offers personalized care to get you moving again.",
    },
    {
        title: "Lumbar Degenerative Disc Disease",
        tag: "Spine",
        card_img:
            "https://mountainspineortho.b-cdn.net/public/DegenerativeDiscDiseasec.png",
        inTxt_img:
            "https://mountainspineortho.b-cdn.net/public/DegenerativeDiscDisease.png",
        body: "Pain from 'wear and tear' in your lower back is often called lumbar degenerative disc disease. It happens as the cushioning discs between your vertebrae thin out over time, which can lead to pain that worsens when you sit or bend.",
        detail: "Think of your spinal discs as small, soft shock absorbers between your backbones. As we age, they can naturally lose water and become less flexible. For many, this is a normal part of aging, but for some, it can cause the vertebrae to sit closer together, leading to a deep, aching pain in the lower back. Our goal at Mountain Spine & Orthopedics is to manage this pain, improve your mobility, and help you understand how to protect your spine during daily activities in Florida.",
        what_sym: "The most common sign is a nagging, chronic pain in the lower back that feels worse after sitting for long periods, like in the car or at a desk. Bending and lifting can also trigger flare-ups. In some cases, you might feel pain, numbness, or tingling that travels down into your buttocks or legs as nearby nerves become irritated.",
        risk_fac:
            "While age is the main factor, certain things can speed up disc wear. These include jobs that involve heavy lifting, being significantly overweight, or smoking, which reduces blood flow to your discs. A past back injury can also make you more susceptible.",
        diagnose: (
            <div className=" flex flex-col space-y-[16px] items-center justify-center">
                <p>
                    Understanding your symptoms is the first step. Our specialists will discuss how the pain affects your day and perform a physical exam. An MRI is often used to confirm disc degeneration, showing us exactly which discs are affected so we can create a precise treatment plan for you.
                </p>
                <Image
                    src={"https://mountainspineortho.b-cdn.net/public/ddd3.png"}
                    alt="degenerative disc disease"
                    layout="cover"
                    width={300}
                    height={300}
                    className="w-full h-full object-fill aspect-video rounded-2xl overflow-hidden"
                />
            </div>
        ),
        pain_info:
            "The pain from lumbar DDD can be a constant, annoying ache or come in painful flare-ups that severely limit your activities. Learning what triggers your pain is key. We help you find a balance between gentle movement, which can ease stiffness, and rest, which can calm inflammation.",
        prevent:
            "You can't stop aging, but you can slow down its effects on your spine. Regular core-strengthening exercises, maintaining a healthy weight, and practicing good posture are your best defenses. Simple changes, like getting up from your desk to stretch, can make a big impact over time.",
        why_choose_us:
            "Our Florida-based team at Mountain Spine & Orthopedics specializes in treating the frustrating pain of degenerative disc disease. We offer a complimentary MRI review to ensure your diagnosis is accurate. We focus on non-surgical and minimally invasive options first, creating a personalized plan to restore your comfort and mobility.",
        schedule:
            "If chronic lower back pain is making your life difficult, let us help. Schedule a consultation to take advantage of our complimentary MRI review and get a clear, customized care plan for your lumbar degenerative disc disease.",
        forum: [
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] text-2xl"
                        >
                            What is Degenerative Disc Disease?
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                Degenerative Disc Disease is a spinal condition caused by
                                age-related breakdown of the discs that cushion the vertebrae.
                                These discs act like shock absorbers, allowing your spine to
                                flex, bend, and twist. Over time, discs can lose water content,
                                flatten, and develop small tears, reducing their ability to
                                support your spine and absorb impact. Unlike acute injuries, DDD
                                develops slowly over time and is especially common in
                                individuals over 40. However, it can also affect younger
                                individuals with physically demanding lifestyles or spinal
                                injuries.
                            </p>
                            <GradientOverlayImage
                                imageData={"https://mountainspineortho.b-cdn.net/public/degendisc.png"} // Passing static image data
                                height="500px"
                                gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
                            />
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                To diagnose DDD, our specialists begin with a full medical
                                history and physical exam, followed by advanced imaging such as
                                X-rays or MRI scans to evaluate disc height, disc shape, and any
                                signs of degeneration. We also assess nerve function and spinal
                                alignment to understand the full extent of the damage. Diagnosis
                                may involve ruling out other conditions, such as herniated discs
                                or spinal stenosis, that share similar symptoms.
                            </p>

                            <OutlinedButton text="Do I have this Condition?" />
                        </div>
                    </div>
                ),
            },
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] text-2xl"
                        >
                            Symptoms of Degenerative Disc Disease
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                Symptoms vary depending on the location and severity of the disc
                                degeneration. Common signs include chronic lower back or neck
                                pain that worsens with bending, twisting, or prolonged sitting.
                                Some patients find relief when walking or changing positions.
                                Others may experience muscle weakness or numbness in the arms or
                                legs if nerve compression occurs. Many people also report
                                stiffness or reduced flexibility in the spine. The pain may be
                                intermittent, flaring up during activity and easing with rest.
                            </p>
                            <OutlinedButton text="Find a Treatment" />

                            <GradientOverlayImage
                                imageData={"https://mountainspineortho.b-cdn.net/public/degendisc2.png"} // Passing static image data
                                height="500px"
                                gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
                            />
                        </div>
                    </div>
                ),
            },
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] text-2xl"
                        >
                            Risk Factors for Degenerative Disc Disease
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                You may be at higher risk for DDD if you are over the age of 40,
                                smoke, or lead a sedentary lifestyle. A history of spinal
                                injuries or trauma can increase your risk, especially if paired
                                with poor posture or spinal misalignment. Genetic factors also
                                contribute, and individuals with a family history of
                                spine-related conditions are more likely to develop DDD.
                                Identifying these risk factors early can help slow the
                                progression of the disease and guide preventative care.
                            </p>
                        </div>
                    </div>
                ),
            },
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] text-2xl"
                        >
                            Treatment Options for Degenerative Disc Disease
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                At Mountain Spine & Orthopedics, we create personalized
                                treatment plans tailored to your condition and lifestyle.
                                Treatment options may include outside rehabilitation to improve
                                strength, flexibility, and posture, as well as medications like
                                non-steroidal anti-inflammatory drugs (NSAIDs) to reduce pain
                                and swelling. For patients with nerve irritation, epidural
                                steroid injections can offer targeted relief. Other approaches
                                may include chiropractic care or spinal manipulation therapy. In
                                more severe cases, minimally invasive spine surgery may be
                                recommended to stabilize the spine and relieve nerve pressure.
                                Our goal is to relieve your pain and restore spine stability
                                while avoiding unnecessary surgery whenever possible.
                            </p>
                        </div>
                    </div>
                ),
            },
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] text-2xl"
                        >
                            Schedule a Consultation Today
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                If you're experiencing persistent back or neck pain, don't wait
                                to seek help. Degenerative Disc Disease is manageable with the
                                right care plan and professional guidance. At Mountain Spine &
                                Orthopedics, our experienced spine specialists are here to
                                evaluate your condition, offer expert recommendations, and guide
                                you toward long-term relief.
                                <br />
                                <br />
                                Call us today at (561) 223-9959 or fill out our online form to
                                schedule your consultation. Let's work together to get your
                                spine and your life back on track.
                            </p>
                        </div>
                    </div>
                ),
            },
        ],
        side_img: "https://mountainspineortho.b-cdn.net/public/degendiscside.jpeg",
        slug: "lumbar-degenerative-disc-disease",
        keywords: [
            "lumbar degenerative disc disease", "lower back pain from sitting", "chronic back ache", "DDD back pain", "non-surgical spine care Florida", "disc degeneration pain", "back stiffness",
        ],
        metaTitle: "Lumbar Disc Disease Pain Relief | Mountain Spine Orthopedics",
        metaDesc: "Find relief from lower back pain caused by lumbar degenerative disc disease. Learn about your symptoms and treatment options from our Florida spine care team.",
    },
    {
        title: "Pain from a Lumbar Herniated Disc",
        tag: "Spine",
        card_img:
            "https://mountainspineortho.b-cdn.net/public/LumbarHerniatedDisc.png",
        inTxt_img:
            "https://mountainspineortho.b-cdn.net/public/LumbarHerniatedDiscarti.png",
        body: "A lumbar herniated disc, often called a 'slipped' or 'ruptured' disc, can cause intense lower back pain and sharp, radiating leg pain known as sciatica.",
        detail: "When the soft, jelly-like center of a spinal disc in your lower back pushes through a tear in its tough exterior, it's called a herniated disc. This can press directly on one of the sensitive spinal nerves, causing inflammation and pain. It can happen suddenly from an injury or develop gradually from age-related wear. At Mountain Spine & Orthopedics, our specialists are experts at finding the precise location of the herniation to create a treatment plan that works for you.",
        what_sym: "The most telling symptom is sciatica—a sharp, shooting pain that travels from your lower back, through your buttock, and down the back of one leg. You might also experience numbness, tingling, or even muscle weakness in that same leg or foot. The pain can feel worse when you sit, cough, or sneeze.",
        risk_fac:
            "Anyone can get a herniated disc, but it's most common in people aged 30 to 50. Using your back muscles instead of your legs to lift heavy objects is a major risk factor. A physically demanding job, being overweight, and a sedentary lifestyle can also put extra strain on your lower back discs.",
        diagnose:
            "Diagnosing a herniated disc starts with a conversation about your specific symptoms and a physical exam. To confirm it, an MRI is the best tool because it clearly shows the disc and the compressed nerve. We offer a complimentary MRI review at our Florida clinics to ensure you get an accurate diagnosis.",
        treatment:
            "The good news is that most herniated discs heal with non-surgical care. We focus on relieving the pressure on the nerve through targeted outside rehabilitation, anti-inflammatory medications, and Orthopedic Injections — including epidural steroid injections that deliver powerful medicine right to the source of the pain. If symptoms don't improve, a minimally invasive surgery called a microdiscectomy can be highly effective at providing lasting relief.",
        pain_info:
            "The leg pain (sciatica) from a herniated disc is often described as feeling like an electric shock and can be far worse than the back pain itself. This is nerve pain, and our primary goal is to calm that irritated nerve. Our treatments are designed to reduce inflammation and give the nerve space to heal, so you can get back to your life.",
        prevent:
            "Protecting your back is key. Always lift with your legs, not your back. Strengthen your core muscles through exercise to provide better support for your spine. Maintaining a healthy weight and avoiding long periods of sitting can also significantly reduce your risk.",
        why_choose_us:
            "At Mountain Spine & Orthopedics, our specialists are leaders in treating the painful symptoms of a lumbar herniated disc. We provide every patient in Florida with a complimentary MRI review and a free second opinion. Our focus is on finding the most effective, least invasive solution to relieve your pain and restore your mobility.",
        schedule:
            "Don't live with the shooting pain of sciatica. Contact Mountain Spine & Orthopedics for an expert evaluation. Our complimentary MRI review will provide a clear diagnosis, and our team will create a personalized plan to get you back on your feet.",
        slug: "lumbar-herniated-disc",
        side_img: "https://mountainspineortho.b-cdn.net/public/lumbarherniateddiscs.jpg",
        forum: [
            {
                post: (
                    <div className="flex flex-col space-y-[16px]">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            How Do I Know If I Have a Lumbar Herniated Disc?
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                Signs of a lumbar herniated disc often start gradually but may
                                worsen over time if not treated. The most common symptom is a
                                sharp or burning pain that radiates from the lower back into the
                                leg, often following the path of the sciatic nerve. Many
                                patients describe the pain as electric or stabbing, and it may
                                worsen when sitting for long periods, bending forward, or
                                coughing. Some patients also experience tingling, numbness, or
                                muscle weakness in the leg or foot on the affected side. In
                                severe cases, the condition can affect walking or standing for
                                extended periods, reducing your quality of life.
                            </p>
                            <GradientOverlayImage
                                imageData={
                                    "https://mountainspineortho.b-cdn.net/public/lumberherniateddisc.jpeg"
                                }
                                height="500px"
                                gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
                            />
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                If these symptoms sound familiar, you may be suffering from a
                                lumbar herniated disc. Mountain Spine & Orthopedics offers a
                                quick and effective symptom checker to gather information and
                                help determine the best path to recovery. Our goal is to
                                diagnose your condition early and create a treatment plan that
                                delivers real results.
                            </p>

                            <OutlinedButton text="Do I have this Condition?" />
                        </div>
                    </div>
                ),
            },
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            What Lumbar Herniated Disc Treatment is Right for Me?
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                The right treatment for a lumbar herniated disc depends on how
                                severe your symptoms are and how much they impact your daily
                                life. Most cases respond well to conservative care, including
                                rest, heat and ice therapy, outside rehabilitation, and
                                anti-inflammatory medications. These methods aim to reduce
                                nerve irritation, restore movement, and strengthen the muscles
                                that support the spine. If pain persists or worsens despite
                                these efforts, more advanced treatments such as spinal
                                injections or minimally invasive surgery may be recommended.
                                <br />
                                <br />
                                At Mountain Spine & Orthopedics, our spine specialists will
                                evaluate your condition and create a customized treatment plan
                                to help you return to a pain-free, active lifestyle. You don't
                                have to live with back pain we're here to help you find the
                                right solution.
                            </p>
                            <OutlinedButton text="Find a Treatment" />
                        </div>
                    </div>
                ),
            },
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            Pain Management for a Lumbar Herniated Disc
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                The right treatment for a lumbar herniated disc depends on how
                                severe your symptoms are and how much they impact your daily
                                life. Most cases respond well to conservative care, including
                                rest, heat and ice therapy, outside rehabilitation, and
                                anti-inflammatory medications. These methods aim to reduce
                                nerve irritation, restore movement, and strengthen the muscles
                                that support the spine. If pain persists or worsens despite
                                these efforts, more advanced treatments such as spinal
                                injections or minimally invasive surgery may be recommended. At
                                Mountain Spine & Orthopedics, our spine specialists will
                                evaluate your condition and create a customized treatment plan
                                to help you return to a pain-free, active lifestyle. You don't
                                have to live with back pain we're here to help you find the
                                right solution.
                            </p>
                            <GradientOverlayImage
                                imageData={
                                    "https://mountainspineortho.b-cdn.net/public/lumberherniateddisc2.png"
                                } // Passing static image data
                                height="500px"
                                gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
                            />
                        </div>
                    </div>
                ),
            },
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            Preventative Treatments for Lumbar Herniated Disc Pain
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                If you're experiencing symptoms of a lumbar herniated disc,
                                there are several treatment options available depending on the
                                severity of your condition. If your pain is mild and manageable,
                                starting with home care and guided outside rehabilitation can often
                                lead to improvement. Applying heat or ice, taking
                                anti-inflammatory medications such as ibuprofen or naproxen, and
                                making lifestyle adjustments like avoiding long periods of
                                sitting or poor lifting techniques can help reduce strain on the
                                lower back. Exercise programs that strengthen the core and
                                improve flexibility are also an essential part of recovery.
                                <br />
                                <br />
                                When conservative care is not enough, surgical treatment may be
                                necessary to relieve pressure on the affected nerves. Discectomy
                                is a common procedure where the portion of the disc pressing on
                                the nerve is removed to relieve pain. In some cases, a
                                laminectomy may be performed to widen the spinal canal and ease
                                nerve compression. For patients with severe disc damage, spinal
                                fusion may be considered to stabilize the spine and prevent
                                further injury.
                                <br />
                                <br />
                                Every patient is different, which is why the team at Mountain
                                Spine & Orthopedics develops personalized care plans using the
                                most advanced and least invasive techniques available. Whether
                                your condition is new or has been ongoing for years, we're here
                                to help you get back to living the life you love.
                            </p>
                        </div>
                    </div>
                ),
            },
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            Schedule a Consultation Today
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                Living with a lumbar herniated disc can affect every aspect of
                                your day, from walking and sitting to sleeping and working. You
                                don't have to push through the pain. At Mountain Spine &
                                Orthopedics, our expert spine team is ready to help you regain
                                control through innovative treatments and compassionate care.
                                Whether you're just beginning to feel discomfort or you've been
                                suffering for some time, the first step toward recovery starts
                                with a conversation.
                                <br />
                                <br />
                                Call us today at (561) 223-9959 or fill out our secure online
                                form to schedule your consultation. With Mountain Spine &
                                Orthopedics on your side, a pain-free future is within reach.
                            </p>
                        </div>
                    </div>
                ),
            },
        ],
        keywords: [
            "lumbar herniated disc pain", "sciatica relief Florida", "slipped disc treatment", "radiating leg pain causes", "epidural injection for back pain", "microdiscectomy surgery", "non-surgical sciatica treatment",
        ],
        metaTitle: "Herniated Disc & Sciatica Pain Relief | Mountain Spine FL",
        metaDesc: "Experiencing shooting leg pain from a lumbar herniated disc? Learn about causes, symptoms, and treatment options from our Florida spine specialists.",
    },
    {
        title: "Pain from Foraminal Stenosis (Pinched Nerve)",
        tag: "Spine",
        card_img: "https://mountainspineortho.b-cdn.net/public/ForaminalS.png",
        inTxt_img:
            "https://mountainspineortho.b-cdn.net/public/ForaminalSarti.png",
        body: "If you have sharp, radiating pain, numbness, or weakness in an arm or leg, it could be caused by a 'pinched nerve' from a condition called foraminal stenosis.",
        detail: "Think of your spine as having little doorways on each side (called foramina) where nerves exit to travel to your arms and legs. Foraminal stenosis occurs when these doorways become narrower, often due to age-related changes like bone spurs or a bulging disc. This narrowing can squeeze, or 'pinch,' the nerve. Our Florida specialists use advanced imaging to see exactly where the nerve is being compressed and create a plan to relieve the pressure.",
        what_sym: "Symptoms follow the path of the pinched nerve. If it's in your neck, you might feel a sharp, burning pain down your shoulder and arm. If it's in your lower back, you'll feel it in your buttock and down your leg (this is a common cause of sciatica). You may also experience tingling, numbness, or a feeling that your arm or leg is 'asleep'.",
        risk_fac:
            "The biggest risk factor is simply age, as wear and tear over the years is the most common cause. A previous spine injury, arthritis, or being born with a narrower spinal canal can also increase your risk of developing a pinched nerve.",
        diagnose:
            "A conversation about your symptoms and a physical exam helps us understand which nerve might be affected. To confirm the diagnosis, an MRI is the best way to see the nerve and the surrounding tissue. Our complimentary MRI review helps us pinpoint the exact location of the stenosis and plan the most effective, targeted treatment for you.",
        treatment:
            "Our first goal is to relieve your pain without surgery. This often involves outside rehabilitation to improve posture and strength, anti-inflammatory medications, and <a href=\"/treatments/orthopedic-injections\" class=\"text-blue-600 hover:underline\">Orthopedic Injections</a> — including targeted <a href=\"/treatments/epidural-steroid-injection\" class=\"text-blue-600 hover:underline\">epidural steroid injections</a> to calm the inflamed nerve. If the pain is severe or you have significant weakness, a minimally invasive procedure like a <a href=\"/treatments/endoscopic-foraminotomy-surgery\" class=\"text-blue-600 hover:underline\">foraminotomy</a> can be performed to open up the 'doorway' and give the nerve more space.",
        pain_info:
            "Nerve pain is frustrating because it can be unpredictable and sharp. Certain positions, like turning your head or sitting for too long, might trigger a jolt of pain. Our team focuses on calming the nerve inflammation and teaching you ways to move and sit that reduce pressure on the nerve, giving it a chance to heal.",
        prevent:
            "While you can't stop the aging process, you can protect your spine. Maintaining a healthy weight, practicing good posture, and doing exercises that strengthen your core can help reduce the strain on your spine and may slow down degenerative changes.",
        why_choose_us:
            "The spine specialists at Mountain Spine & Orthopedics are highly skilled in diagnosing and treating the radiating pain of foraminal stenosis. For patients across Florida, we offer a complimentary MRI review and a free second opinion. We specialize in minimally invasive solutions designed to relieve your nerve pain and help you return to a life without limitations.",
        schedule:
            "Don't let the shooting pain of a pinched nerve control your life. Contact us today to schedule your consultation and get a free second opinion. We'll find the source of your pain and create a plan for relief.",
        side_img: "https://mountainspineortho.b-cdn.net/public/ForaminalS.png",
        forum: [
            {
                post: (
                    <div className="flex flex-col space-y-[16px]">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            Understanding Foraminal Stenosis
                        </h2>
                        <div className="flex flex-col space-y-[40px]">
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                Foraminal stenosis is a specific type of spinal stenosis where
                                the openings between your spinal bones (vertebrae), called the
                                neural foramina, become narrow. These openings are crucial
                                because they provide the pathway for your spinal nerves to exit
                                the spinal cord and travel to other parts of your body, like
                                your arms and legs.
                                <br />
                                <br />
                                When a foramen narrows, it can squeeze or 'pinch' the nerve
                                passing through it. This nerve compression is what leads to the
                                characteristic symptoms of foraminal stenosis, such as pain,
                                numbness, tingling, or weakness that radiates away from the
                                spine along the path of the affected nerve. The location of
                                symptoms depends on which nerve is compressed – neck (cervical)
                                stenosis affects the arms, while lower back (lumbar) stenosis
                                affects the legs (often called sciatica).
                            </p>
                            <GradientOverlayImage
                                imageData={
                                    "https://mountainspineortho.b-cdn.net/public/ForaminalSarti.png"
                                } // Placeholder for diagram image
                                height="500px"
                                gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
                            />
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                Common causes include age-related wear and tear like bone spurs
                                (bony growths), bulging or herniated discs pushing into the
                                space, thickening of spinal ligaments, or a vertebra slipping
                                out of place (spondylolisthesis). If you're experiencing
                                radiating symptoms, understanding the cause is the first step
                                toward effective treatment.
                            </p>
                        </div>
                    </div>
                ),
            },
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] text-2xl" // Adjusted size for secondary heading
                        >
                            How Is Foraminal Stenosis Diagnosed?
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                Diagnosing foraminal stenosis accurately requires a combination
                                of understanding your symptoms and using advanced imaging. Our
                                specialists at Mountain Spine Orthopedics begin with a detailed
                                discussion about your pain pattern, numbness, weakness, and what
                                activities make your symptoms better or worse. A thorough
                                neurological exam follows, testing your reflexes, muscle
                                strength, and sensation to pinpoint which nerve might be
                                affected.
                                <br />
                                <br />
                                Imaging plays a vital role. While X-rays can show bone
                                alignment and arthritis, an MRI (Magnetic Resonance Imaging) is
                                usually the preferred test. It provides clear pictures of soft
                                tissues, including nerves and discs, showing exactly where and
                                how severely the nerve is being compressed within the foramen.
                                We offer complimentary MRI reviews to help assess your
                                condition. In some cases, a CT (Computed Tomography) scan might
                                be used for better bone detail, or nerve conduction studies
                                (EMG/NCS) might assess nerve function directly.
                            </p>
                            <OutlinedButton text="Explore Treatment Options" />
                        </div>
                    </div>
                ),
            },
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            Managing Pain from Foraminal Stenosis
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                The goal of managing foraminal stenosis pain is to reduce nerve
                                compression and inflammation. Conservative, non-surgical
                                approaches are typically tried first:
                            </p>
                            <ul
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl list-disc list-inside"
                            >
                                <li>
                                    <b>Activity Modification:</b> Avoiding activities that worsen
                                    symptoms.
                                </li>
                                <li>
                                    <b>Medications:</b> Over-the-counter or prescription
                                    nonsteroidal anti-inflammatory drugs (NSAIDs) like ibuprofen
                                    or naproxen can reduce pain and swelling.
                                </li>
                                <li>
                                    Outside Rehabilitation Guidance: Specific exercises can help improve
                                    flexibility, strengthen supporting muscles (core, back), and
                                    improve posture, potentially creating more space for the
                                    nerve.
                                </li>
                                <li>
                                    <b>Epidural Steroid Injections:</b> Corticosteroid medication
                                    injected near the compressed nerve can provide significant,
                                    though often temporary, relief from inflammation and pain.
                                </li>
                            </ul>
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                If these methods don't provide adequate relief, or if there is
                                progressive weakness, surgical options might be considered. Our
                                focus is on effective pain relief tailored to your specific
                                situation.
                            </p>
                        </div>
                    </div>
                ),
            },
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            What Causes Foraminal Stenosis?
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                Foraminal stenosis is most often caused by the natural aging
                                process and degenerative changes in the spine. As we age,
                                various structures can encroach upon the neural foramina:
                            </p>
                            <ul
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl list-disc list-inside"
                            >
                                <li>
                                    <b>Bone Spurs (Osteophytes):</b> The body may grow extra bone
                                    around joints affected by arthritis, narrowing the foraminal
                                    space.
                                </li>
                                <li>
                                    <b>Herniated or Bulging Discs:</b> The soft discs between
                                    vertebrae can bulge or rupture, pushing disc material into the
                                    foramen and compressing the nerve.
                                </li>
                                <li>
                                    <b>Thickened Ligaments:</b> Ligaments within the spinal canal
                                    can thicken and stiffen over time, reducing the available
                                    space.
                                </li>
                                <li>
                                    <b>Spondylolisthesis:</b> One vertebra slips forward relative
                                    to the one below it, potentially narrowing the foramen at that
                                    level.
                                </li>
                                <li>
                                    <b>Facet Joint Arthritis:</b> Enlargement of the small joints
                                    connecting vertebrae (facet joints) due to arthritis can also
                                    contribute to foraminal narrowing.
                                </li>
                            </ul>
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                Less common causes include spinal injuries, tumors, or cysts.
                                Understanding the specific cause is key to choosing the right
                                treatment.
                            </p>
                            <GradientOverlayImage
                                imageData={
                                    "https://mountainspineortho.b-cdn.net/public/ForaminalS.png"
                                } // Placeholder for another diagram/image
                                height="500px"
                                gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
                            />
                        </div>
                    </div>
                ),
            },
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            Risk Factors for Developing Foraminal Stenosis
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                While anyone can develop foraminal stenosis, certain factors
                                increase your risk:
                            </p>
                            <ul
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl list-disc list-inside"
                            >
                                <li>
                                    <b>Age:</b> It's most common in individuals over 50 due to
                                    cumulative wear and tear.
                                </li>
                                <li>
                                    <b>Degenerative Conditions:</b> Osteoarthritis, degenerative
                                    disc disease are major contributors.
                                </li>
                                <li>
                                    <b>Spinal Deformities:</b> Conditions like scoliosis can alter
                                    spinal mechanics and increase stress.
                                </li>
                                <li>
                                    <b>Previous Spinal Injury:</b> Trauma can accelerate
                                    degenerative changes or directly narrow the foramina.
                                </li>
                                <li>
                                    <b>Genetics:</b> Some individuals may have a hereditary
                                    predisposition to spinal degeneration.
                                </li>
                                <li>
                                    <b>Lifestyle Factors:</b> Obesity puts extra stress on the
                                    spine, and smoking can impair disc health. Repetitive strain
                                    from certain jobs or activities may also play a role.
                                </li>
                            </ul>
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                Being aware of these factors can help in early recognition and
                                management.
                            </p>
                        </div>
                    </div>
                ),
            },
            {
                post: (
                    <div className=" flex flex-col space-y-[16px]">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            Surgical Treatments for Foraminal Stenosis
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                Treatment for foraminal stenosis aims to relieve nerve pressure
                                and reduce symptoms. The approach depends on symptom severity
                                and cause. After conservative treatments have been explored, surgical options may be considered:
                            </p>
                            <ul
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl list-disc list-inside"
                            >
                                <li>
                                    <b>Foraminotomy:</b> A minimally invasive procedure where bone
                                    or tissue compressing the nerve within the foramen is removed,
                                    enlarging the opening.
                                </li>
                                <li>
                                    <b>Laminotomy/Laminectomy:</b> Removal of a small portion
                                    (laminotomy) or the entire lamina (laminectomy) - part of the
                                    vertebral bone - to create more space, often combined with
                                    foraminotomy.
                                </li>
                                <li>
                                    <b>Spinal Fusion:</b> May be necessary in cases of instability
                                    (like spondylolisthesis) often performed alongside
                                    decompression procedures.
                                </li>
                            </ul>
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                At Mountain Spine Orthopedics, our surgeons specialize in
                                minimally invasive techniques whenever possible. These
                                approaches often involve smaller incisions, less muscle
                                disruption, reduced blood loss, and potentially faster recovery
                                times compared to traditional open surgery. We tailor the
                                treatment plan to provide the most effective relief for your
                                specific condition.
                            </p>
                        </div>
                    </div>
                ),
            },
            {
                post: (
                    <div className="flex flex-col space-y-[16px]">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            Frequently Asked Questions About Foraminal Stenosis
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <h3
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 500,
                                }}
                                className="text-[#111315] text-md sm:text-xl"
                            >
                                Is foraminal stenosis serious?
                            </h3>
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                While often manageable with conservative care, severe or
                                progressive foraminal stenosis can lead to chronic pain,
                                significant weakness, numbness, and loss of function if left
                                untreated. In rare cases involving the lower spine, severe
                                compression can affect bowel or bladder control (cauda equina
                                syndrome), which is a medical emergency. Early diagnosis and
                                treatment are important.
                            </p>
                            <h3
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 500,
                                }}
                                className="text-[#111315] text-md sm:text-xl"
                            >
                                Can foraminal stenosis heal on its own?
                            </h3>
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                The underlying structural narrowing (like bone spurs or
                                thickened ligaments) typically does not resolve on its own.
                                However, symptoms can sometimes improve or fluctuate with
                                conservative treatments that reduce inflammation (like
                                injections) or improve biomechanics (like outside rehabilitation),
                                effectively managing the condition without surgery.
                            </p>
                            <h3
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 500,
                                }}
                                className="text-[#111315] text-md sm:text-xl"
                            >
                                What activities should be avoided with foraminal stenosis?
                            </h3>
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                Activities that worsen your specific symptoms should generally
                                be avoided or modified. This often includes high-impact
                                activities (like running on hard surfaces), heavy lifting with
                                improper form, prolonged sitting or standing without breaks, and
                                activities involving excessive twisting or extension of the
                                affected spinal region. A physical therapist can provide
                                personalized guidance.
                            </p>
                        </div>
                    </div>
                ),
            },
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            Schedule Your Consultation
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                Radiating nerve pain, numbness, or weakness shouldn't limit
                                your life. The expert team at Mountain Spine Orthopedics offers
                                comprehensive evaluation and cutting-edge treatments for
                                foraminal stenosis, from conservative care to advanced
                                minimally invasive surgery.
                                <br />
                                <br />
                                Take the first step towards relief. Contact us to schedule your
                                consultation, benefit from a complimentary MRI review, and
                                receive a free second opinion from our spine specialists. Call
                                us today or use our online form to request an appointment.
                            </p>
                        </div>
                    </div>
                ),
            },
        ],
        slug: "foraminal-stenosis-back-pain",
        keywords: [
            "foraminal stenosis pain", "pinched nerve relief", "radiating arm pain", "sciatica causes", "nerve compression treatment Florida", "foraminotomy", "numbness in leg",
        ],
        metaTitle: "Foraminal Stenosis Pain Relief Florida | Pinched Nerve Care",
        metaDesc: "Radiating arm or leg pain from a pinched nerve? Learn how foraminal stenosis causes this and what treatments can provide relief. Our Florida team can help.",
    },
    {
        title: "Finding Relief from Sciatica Pain",
        tag: "Lower Spine",
        card_img: "https://mountainspineortho.b-cdn.net/public/Sciaticacopy.png",
        inTxt_img: "https://mountainspineortho.b-cdn.net/public/Sciaticaarti.png",
        body: "Sciatica is the name for the sharp, shooting pain that travels from your lower back down your leg. It's not a condition itself, but a symptom of an underlying problem, most often a pinched nerve.",
        detail: "The sciatic nerve is the longest nerve in your body, running from your lower back all the way down to your feet. When something in your spine—like a herniated disc or a bone spur—presses on this nerve, you feel pain along its path. That's sciatica. The key to lasting relief is not just treating the leg pain, but accurately diagnosing and addressing the root cause in your lower back. Our Florida orthopedic team specializes in finding that 'why' behind your pain.",
        what_sym: "The classic sign of sciatica is pain that follows a clear path down one leg, sometimes all the way to your foot. It can range from a mild ache to a severe, burning sensation or an electric shock. You might also have numbness, tingling, or weakness in your leg, making it hard to walk or stand.",
        risk_fac:
            "Anything that puts pressure on your lower back can lead to sciatica. This includes age-related changes in the spine, being overweight, or having a job that requires a lot of sitting or heavy lifting. Sometimes even a sudden twist can trigger it. A proper diagnosis can help you understand your specific risk factors.",
        diagnose:
            "Because sciatica is a symptom, a thorough diagnosis is crucial. Our specialists will perform a physical exam, testing your muscle strength and reflexes. To find the source of the nerve pressure, an MRI is the most effective tool. We offer a complimentary MRI review to pinpoint the cause and develop a targeted treatment plan for you.",
        treatment:
            "Treatment for sciatica focuses on taking pressure off the nerve. This is often achieved with non-surgical methods like outside rehabilitation, specialized stretching, and anti-inflammatory medications. An epidural steroid injection can also provide powerful, targeted relief by reducing inflammation around the nerve. If your pain is severe and persistent, we may discuss minimally invasive surgery to remove what's pressing on the nerve.",
        pain_info:
            "Living with sciatica is challenging because the pain can be unpredictable and severe. It can make simple things like getting out of a chair or driving a car extremely painful. Our multidisciplinary approach focuses on calming the irritated nerve to provide immediate relief while also addressing the underlying structural issue to prevent the pain from coming back.",
        prevent:
            "Regular exercise that strengthens your core is one of the best ways to prevent sciatica. It's also important to maintain good posture, especially when sitting, and to use proper techniques when lifting. These habits help protect your lower back from the types of strain that can lead to a pinched nerve.",
        why_choose_us:
            "At Mountain Spine & Orthopedics, we understand how debilitating sciatica can be. Our specialists in Florida are experts at getting to the root cause of your pain. With a complimentary MRI review and a free second opinion, we provide a clear diagnosis and a full spectrum of care, including outside rehabilitation and minimally invasive surgery, to resolve your pain and restore your mobility.",
        schedule:
            "If radiating leg pain is disrupting your life, schedule a consultation with Mountain Spine & Orthopedics. Let us help you find the cause of your sciatica and start on the path to lasting relief.",
        side_img: "https://mountainspineortho.b-cdn.net/public/sciaticaside.png",
        forum: [
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            How Do I Know if I Have Sciatica?
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                Sciatica symptoms usually affect only one side of the body, most
                                commonly the lower back and leg. They often intensify while
                                sitting and may include radiating pain, numbness, tingling, and
                                muscle weakness in the affected leg. If the condition advances,
                                it may begin to impact your ability to walk or perform daily
                                activities. In some cases, tingling or numbness in the arms and
                                legs could signal a more advanced orthopedic issue.
                            </p>

                            <div className="rounded-[24px] overflow-hidden">
                                <iframe
                                    width="100%"
                                    height="500"
                                    src="https://www.youtube.com/embed/EVPlqu2FH2g?si=iSAQ8CBU0XJwmMAv"
                                    title="YouTube video player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                ></iframe>
                            </div>

                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                If you suspect you may be experiencing sciatica, we offer a
                                quick and easy condition checker. This tool gathers key
                                information about your symptoms and helps determine if you're a
                                candidate for evaluation and treatment.
                            </p>

                            <OutlinedButton text="Do I have this Condition?" />
                        </div>
                    </div>
                ),
            },
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            What Is the Right Treatment for Me?
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                Most cases of sciatica respond well to conservative treatment,
                                especially when the underlying condition compressing the sciatic
                                nerve is addressed. Treatment may include anti-inflammatory
                                medication, stretching exercises, heat and ice therapy, and
                                outside rehabilitation. These methods aim to relieve pressure, reduce
                                inflammation, and restore mobility.
                                <br />
                                <br />
                                Only after conservative options have been exhausted is surgery
                                considered. At Mountain Spine & Orthopedics, our board-certified
                                orthopedic doctors are experts in treating sciatica. We offer
                                advanced, customized care plans that many other practices are
                                not equipped to provide.
                            </p>
                            <OutlinedButton text="Find a Treatment" />
                        </div>
                    </div>
                ),
            },
            {
                post: (
                    <div className="flex flex-col space-y-[16px]">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            Sciatica Treatment Options
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                Sciatica treatments vary depending on nerve involvement and
                                symptom severity. Our team offers both non-surgical and
                                surgical solutions tailored to your condition
                            </p>

                            <h3
                                style={{
                                    fontFamily: "var(--font-inter),",
                                    fontWeight: 500,
                                }}
                                className="text-[#111315] text-md sm:text-xl"
                            >
                                Non-Surgical Treatment:
                            </h3>

                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                Stretching exercises improve mobility and flexibility.
                                Chiropractic care eases pressure on the spine. Medications
                                reduce inflammation and pain.
                            </p>
                            <h3
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 500,
                                }}
                                className="text-[#111315] text-md sm:text-xl"
                            >
                                Surgical Treatment:
                            </h3>

                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                Foraminotomy relieves pressure by enlarging the foramen.
                                <br />
                                Discectomy removes the herniated disc causing nerve compression.
                                <br /> Laminotomy removes part of the lamina to decompress the
                                nerve.
                                <br />
                                <br />
                                Our orthopedic specialists will help determine the best option
                                based on your condition, lifestyle, and treatment goals.
                            </p>
                            <GradientOverlayImage
                                imageData={
                                    "https://mountainspineortho.b-cdn.net/public/sciatica.png"
                                } // Passing static image data
                                height="500px"
                                gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
                            />
                        </div>
                    </div>
                ),
            },
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            Schedule a Consultation Today
                        </h2>

                        <div className=" flex flex-col space-y-[40px]">
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                If you suspect you’re experiencing sciatica, don’t wait to seek
                                help. Our team at Mountain Spine & Orthopedics specializes in
                                diagnosing and treating sciatica with both non-invasive and
                                surgical approaches. We’ve helped thousands of patients regain
                                their comfort, mobility, and quality of life.
                                <br />
                                <br />
                                Call us today at (561) 223-9959 or fill out our online form to
                                book your appointment. Let us help you find lasting relief.
                            </p>
                        </div>
                    </div>
                ),
            },
        ],
        slug: "sciatica-nerve-pain",
        keywords: [
            "sciatica pain relief", "radiating leg pain", "pinched sciatic nerve Florida", "herniated disc leg pain", "treatment for sciatica", "lower back and leg pain", "burning leg pain",
        ],
        metaTitle: "Sciatica Leg Pain Relief in Florida | Mountain Spine Orthopedics",
        metaDesc: "Struggling with sharp, radiating leg pain (sciatica)? Our Florida specialists find the root cause, like a herniated disc, to provide lasting relief.",
    },
    {
        title: "Relief for Coccydynia (Tailbone Pain)",
        tag: "Lower Spine",
        card_img: "https://mountainspineortho.b-cdn.net/public/Coccydynia.png",
        inTxt_img: "https://mountainspineortho.b-cdn.net/public/Coccydyniaarti.png",
        body: "If sitting has become a painful ordeal because of tailbone pain, you may have a condition called coccydynia. This sharp, localized pain at the very bottom of your spine can make everyday activities like driving or working at a desk unbearable.",
        detail: "Your coccyx, or tailbone, is the small triangular bone at the very end of your spine. It can be bruised or injured from a direct fall, the trauma of childbirth, or even from prolonged pressure on a hard or poorly designed chair. This leads to inflammation and pain right at the tip of the spine, a condition known as coccydynia. Our specialists at Mountain Spine & Orthopedics can help diagnose the issue and create a plan to let you sit comfortably again.",
        what_sym: "The main symptom is a sharp or dull ache that is centered on your tailbone. The pain is typically worst when you sit down, especially on hard surfaces or when leaning back, and it can flare up again when you stand up after being seated for a while. The area might also feel very tender to the touch.",
        risk_fac:
            "A fall directly onto your buttocks is a common cause of tailbone pain. Other risks include activities that put repetitive strain on the area, like cycling or rowing, and sitting for long hours on hard surfaces. Being overweight can also increase pressure on the coccyx.",
        diagnose:
            "Diagnosing tailbone pain is usually straightforward based on your symptoms. Our specialist will talk with you about the pain and may gently press on the area to confirm the location. Sometimes, an X-ray or a diagnostic injection of a local anesthetic is used to confirm the coccyx is the source of the pain and to rule out other issues.",
        treatment:
            "Most tailbone pain can be managed effectively with simple, non-surgical treatments. Using a special donut-shaped or wedge cushion when you sit can take the pressure off the area immediately. We may also recommend gentle outside rehabilitation or an anti-inflammatory medication. For persistent pain, a targeted steroid injection can provide significant relief. Surgery is very rarely needed.",
        pain_info:
            "The pain from coccydynia is very specific and can be incredibly disruptive to your daily routine, making work and travel difficult. Our treatment approach focuses on reducing the direct pressure and inflammation. By combining ergonomic solutions like cushions with medical treatment, we can break the cycle of pain and allow the injured area to heal.",
        prevent:
            "To prevent tailbone pain, always try to use a supportive cushion when sitting for long periods, especially on hard chairs or bleachers. Taking frequent breaks to stand and stretch can also help. Maintaining a healthy weight reduces the constant pressure on your coccyx.",
        why_choose_us:
            "Tailbone pain requires a specialized approach, and our experts at Mountain Spine & Orthopedics are skilled in treating this unique condition. For patients in Florida, we offer precise diagnostics and advanced, image-guided injections to provide targeted relief so you can get back to sitting, working, and living comfortably.",
        schedule:
            "You don't have to live with the misery of tailbone pain. Schedule a consultation with our team for an expert evaluation and let us create a personalized plan to relieve your pain and help you sit comfortably again.",
        side_img: "https://mountainspineortho.b-cdn.net/public/coccydyniaside.png",
        forum: [
            {
                post: (
                    <div className="flex flex-col space-y-[16px]">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            What Is Coccydynia?
                        </h2>
                        <div className="flex flex-col space-y-[40px]">
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                Coccydynia is the medical term for inflammation or injury to the
                                coccyx (tailbone), located at the bottom of the spine. Pain may
                                occur while sitting, standing up from a seated position, or
                                during bowel movements. It can be dull and persistent or sharp
                                and stabbing.
                                <br />
                                <br />
                                The cause isn't always obvious, but common triggers include a
                                traumatic fall, stressful childbirth, or prolonged pressure from
                                improper sitting posture. Rarely, it may be due to a tumor in
                                the coccyx region. If the pain persists or intensifies, it’s
                                important to consult with a spine specialist.
                            </p>
                            <GradientOverlayImage
                                imageData={
                                    "https://mountainspineortho.b-cdn.net/public/coccydynia.jpeg"
                                } // Passing static image data
                                height="500px"
                                gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
                            />
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                If you're experiencing symptoms like tailbone pain that worsens
                                when sitting or during bowel movements, you may be dealing with
                                coccydynia. Our diagnostic checker is a fast way to determine
                                whether a specialist evaluation is recommended.
                            </p>
                            <OutlinedButton text="Do I have this Condition?" />
                        </div>
                    </div>
                ),
            },
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] text-2xl"
                        >
                            How Is Coccydynia Diagnosed?
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                Diagnosing coccydynia typically starts with a physical
                                examination and discussion of your symptoms and medical
                                history. Your doctor may gently press on the tailbone area to
                                assess tenderness and rule out other causes of pain. In some
                                cases, imaging tests like X-rays or MRIs are used to identify
                                fractures, joint instability, or signs of inflammation.
                                <br />
                                <br />
                                Once diagnosed, your provider will recommend a treatment plan
                                based on the severity and duration of symptoms.
                            </p>
                            <OutlinedButton text="Find a Treatment" />
                        </div>
                    </div>
                ),
            },

            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            Pain Management for Coccydynia
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                In early cases, coccydynia can be managed with non-surgical
                                treatment. This includes using a wedge or donut-shaped cushion
                                to reduce pressure while sitting, increasing fiber intake, and
                                using stool softeners to minimize discomfort during bowel
                                movements. Over-the-counter anti-inflammatory medications and
                                hot/cold therapy can also help reduce inflammation and pain.
                                <br />
                                <br />
                                If the pain persists beyond a few weeks, stronger pain
                                relievers, outside rehabilitation, or injections may be recommended.
                                Surgery (coccygectomy) is reserved for severe cases when all
                                other options have failed.
                            </p>
                        </div>
                    </div>
                ),
            },
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            What Causes Coccydynia?
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                Coccydynia can result from both sudden trauma and long-term
                                strain. Common causes include:
                            </p>
                            <ul
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl list-disc list-inside"
                            >
                                <li> Falls or direct impact to the tailbone</li>
                                <li> Prolonged sitting on hard or unstable surfaces</li>
                                <li>Childbirth, especially when prolonged or difficult</li>
                                <li>
                                    Repetitive strain or poor posture In rare cases, bone tumors
                                    or infections may lead to coccyx pain, which is why imaging
                                    may be required when pain does not respond to treatment.
                                </li>
                            </ul>
                            <GradientOverlayImage
                                imageData={
                                    "https://mountainspineortho.b-cdn.net/public/coccydynia2.jpeg"
                                } // Passing static image data
                                height="500px"
                                gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
                            />
                        </div>
                    </div>
                ),
            },
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            Risk Factors for Coccydynia
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                Several factors increase the risk of developing coccydynia,
                                including being:
                            </p>
                            <ul
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl list-disc list-inside"
                            >
                                <li>Female (due to childbirth)</li>
                                <li> Obese or underweight (both affect sitting posture)</li>
                                <li>Sedentary (extended sitting)</li>
                                <li>
                                    Engaging in high-impact sports or activities Additionally,
                                    hormonal changes during pregnancy or aging can loosen the
                                    pelvic area and increase tailbone vulnerability.
                                </li>
                            </ul>
                        </div>
                    </div>
                ),
            },
            {
                post: (
                    <div className=" flex flex-col space-y-[16px]">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            Treatment Options for Coccydynia
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                Treatment depends on how long you’ve had symptoms and how severe
                                the pain is. Common treatments include:
                            </p>
                            <ul
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl list-disc list-inside"
                            >
                                <li>Cushions and posture correction</li>
                                <li>Anti-inflammatory medications</li>
                                <li>Rehabilitation planning</li>
                                <li>Corticosteroid injections</li>
                            </ul>
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                In rare cases, a coccygectomy (surgical removal of the coccyx)
                                may be considered. At Mountain Spine & Orthopedics, we specialize
                                in minimally invasive spine procedures to provide targeted
                                relief while preserving mobility and reducing recovery time.
                            </p>
                        </div>
                    </div>
                ),
            },
            {
                post: (
                    <div className="flex flex-col space-y-[16px]">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            Frequently Asked Questions About Coccydynia
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <h3
                                style={{
                                    fontFamily: "var(--font-inter),",
                                    fontWeight: 500,
                                }}
                                className="text-[#111315] text-md sm:text-xl"
                            >
                                How is coccydynia pain treated during pregnancy?
                            </h3>

                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                Tailbone pain in pregnancy is common and usually caused by the
                                hormone relaxin, which loosens pelvic joints. Using supportive
                                cushions, applying hot/cold therapy, and taking acetaminophen
                                may provide relief. Persistent pain should be evaluated by a
                                spine specialist.
                            </p>
                            <h3
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 500,
                                }}
                                className="text-[#111315] text-md sm:text-xl"
                            >
                                Does walking help coccydynia?
                            </h3>

                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                For many, gentle walking can reduce tailbone pressure. But if
                                there’s a fracture or joint instability, walking may worsen the
                                pain. Low-impact stretching or yoga may be a safer option in
                                those cases.
                            </p>

                            <h3
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 500,
                                }}
                                className="text-[#111315] text-md sm:text-xl"
                            >
                                How should I sleep with coccydynia?
                            </h3>

                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                Avoid sleeping flat on your back. Instead, sleep on your side
                                with a pillow between your knees. This position minimizes
                                pressure on the coccyx and can improve sleep quality.
                            </p>
                        </div>
                    </div>
                ),
            },
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            Schedule a Consultation Today
                        </h2>

                        <div className=" flex flex-col space-y-[40px]">
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                Tailbone pain doesn’t have to interfere with your life. At
                                Mountain Spine & Orthopedics, our expert team offers effective,
                                patient-centered solutions for coccydynia from non-surgical
                                therapies to advanced procedures. We’ll help you get to the root
                                of your pain and back to feeling your best.
                                <br />
                                <br />
                                Call us today at (561) 223-9959 or complete our online form to
                                schedule your consultation.
                            </p>
                        </div>
                    </div>
                ),
            },
        ],
        slug: "tailbone-pain-coccydynia",
        keywords: [
            "tailbone pain relief", "coccydynia treatment", "pain when sitting down", "coccyx pain Florida", "injured tailbone", "pain at bottom of spine", "how to relieve tailbone pain",
        ],
        metaTitle: "Tailbone Pain (Coccydynia) Relief | Mountain Spine Florida",
        metaDesc: "Does it hurt to sit? You might have coccydynia, or tailbone pain. Learn the causes and find effective relief options with our Florida orthopedic specialists.",
    },
      {
        title: "Neck Pain & Numbness from Cervical Spinal Stenosis",
        tag: "Neck",
        card_img:
            "https://mountainspineortho.b-cdn.net/public/CervicalSpinalStenosis.png",
        inTxt_img: "https://mountainspineortho.b-cdn.net/public/cervicalspinal2.png",
        body: "If you're experiencing neck pain along with numbness in your hands, clumsiness, or balance issues, it could be due to a narrowing of the spinal canal in your neck, a condition called cervical spinal stenosis.",
        detail: "Your spinal cord is a vital bundle of nerves that runs through a protective bony tube called the spinal canal. Over time, due to arthritis or disc issues, this canal can become too narrow in the neck area. This puts pressure on the delicate spinal cord itself, a serious condition that can interfere with nerve signals traveling to your arms and legs. Getting an accurate diagnosis is critical to prevent symptoms from worsening.",
        what_sym: "Symptoms of cervical stenosis can be subtle and widespread. You might notice a stiff, aching neck, but the bigger clues often involve your hands and legs. These can include numbness or tingling in your hands, finding it hard to button a shirt or type, a loss of balance, or a heavy feeling in your legs when you walk. Some people feel a 'shock-like' sensation down their back or arms when they bend their neck forward.",
        risk_fac:
            "Age is the primary risk factor, as this condition usually develops from years of wear and tear. A previous neck injury, significant arthritis, or simply being born with a narrower spinal canal can increase your chances of developing symptomatic stenosis.",
        diagnose: (
            <div className=" flex flex-col space-y-[16px] ">
                <p>
                    A neurological exam is key to diagnosing cervical stenosis. Our specialists will test your reflexes, strength, and walking gait to check for signs of spinal cord compression. An MRI is essential to confirm the diagnosis, and our complimentary MRI review allows us to see exactly where and how much the canal has narrowed, so we can recommend the most effective treatment.
                </p>
                <Image
                    src={"https://mountainspineortho.b-cdn.net/public/cervicalspinal3.jpeg"}
                    width={300}
                    height={300}
                    layout="cover"
                    alt="cervicalspinalstenosisside"
                    className="w-full h-full object-cover aspect-video rounded-2xl"
                />
            </div>
        ),
        treatment:
            "Because this condition can progress, treatment is focused on relieving pressure on the spinal cord. Non-surgical options like outside rehabilitation can help, but if you have clear signs of cord compression (myelopathy), surgery is often recommended to prevent further neurological issues. Our surgeons are experts in advanced, motion-preserving procedures like laminoplasty, which creates more space for the spinal cord without fusing the neck.",
        pain_info:
            "While neck pain can be a symptom, the more concerning issues are the neurological ones, like hand clumsiness and balance problems. These can develop gradually, and it's easy to dismiss them as just 'getting older.' Our goal is to intervene before these symptoms become permanent, protecting your mobility and quality of life for the long term.",
        prevent:
            "While you can't entirely prevent age-related changes, you can support your neck health. Practicing good posture, especially with screen use, and staying active can help maintain flexibility and strength. Early treatment of neck arthritis can also be beneficial.",
        why_choose_us:
            "At Mountain Spine & Orthopedics, our fellowship-trained spine surgeons specialize in complex neck conditions like cervical stenosis. We provide patients throughout Florida with world-class care, starting with a complimentary MRI review. We focus on protecting your future mobility using the most advanced motion-preserving techniques available.",
        schedule:
            "If you're dealing with neck pain combined with arm tingling or balance issues, don't wait. Schedule a consultation with our team today. We will provide a free second opinion based on your MRI to help you find the best path to recovery.",
        side_img: "https://mountainspineortho.b-cdn.net/public/cervicalspinalside.png",
        forum: [
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            How Do I Know If I Have Cervical Spinal Stenosis?
                        </h2>

                        <div className=" flex flex-col space-y-[40px]">
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                Cervical spinal stenosis can cause a variety of symptoms
                                depending on the severity and levels affected. Common signs
                                include shock-like pain in the neck or arms, tingling
                                sensations, arm weakness, numbness in the hands or fingers, loss
                                of coordination, balance issues, difficulty walking, and in
                                severe cases, loss of bladder control. These symptoms may
                                suggest compression of the spinal cord or nerve roots and should
                                never be ignored.
                            </p>

                            <GradientOverlayImage
                                imageData={"https://mountainspineortho.b-cdn.net/public/cervicalspinal.jpeg"} // Passing static image data
                                height="500px"
                                gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
                            />

                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                If you're experiencing any of these symptoms, it's essential to
                                get evaluated early. We offer a quick and easy spinal condition
                                assessment tool to help gather information and determine if you
                                may be a candidate for treatment. Don't delay your recovery the
                                earlier we intervene, the better your outcome.
                            </p>

                            <OutlinedButton text="Do I have this Condition?" />
                        </div>
                    </div>
                ),
            },
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            What is the Right Treatment for Me?
                        </h2>

                        <div className=" flex flex-col space-y-[40px]">
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                At Mountain Spine & Orthopedics, we specialize in procedures
                                that relieve spinal cord compression while preserving motion.
                                For patients with multi level stenosis (typically three or more
                                levels), we recommend cervical laminoplasty. This procedure opens
                                the spinal canal and decompresses the spinal cord without the
                                need for a multi-level fusion, preserving mobility in the neck.
                                <br /> <br />
                                For patients with one or two affected levels, a decompression
                                and artificial disc replacement is often ideal. This modern
                                approach allows for motion preservation and avoids the long-term
                                stiffness associated with spinal fusion. While multi-level
                                fusion is sometimes used, it can leave patients with a
                                permanently stiff neck, especially when four levels are
                                involved. In contrast, laminoplasty provides the best option for
                                multiple levels of compression without sacrificing mobility.
                            </p>

                            <OutlinedButton text="Find a Treatment" />

                            <GradientOverlayImage
                                imageData={"https://mountainspineortho.b-cdn.net/public/cervicalspinal2.png"} // Passing static image data
                                height="500px"
                                gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
                            />
                        </div>
                    </div>
                ),
            },
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            Understanding Cervical Laminoplasty
                        </h2>

                        <div className=" flex flex-col space-y-[40px]">
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                Cervical laminoplasty is a motion-preserving surgery done
                                through the back of the neck. During the procedure, the muscles
                                are temporarily moved aside and small cuts are made in the
                                lamina the bone protecting the spinal cord. These bones are then
                                lifted and repositioned to create more space for the spinal
                                cord, relieving pressure and reducing symptoms.
                                <br />
                                <br />
                                The key benefit of this procedure is that it retains the neck's
                                natural movement. Unlike fusion, which locks segments together,
                                laminoplasty allows the bones to remain flexible. However, it's
                                important to note that while laminoplasty is excellent for
                                relieving nerve-related symptoms like arm and leg pain or
                                headaches, it is not intended to address central neck pain. For
                                axial neck pain, artificial disc replacement may be the better
                                solution.
                            </p>
                        </div>
                    </div>
                ),
            },
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            Post-Operative Recovery
                        </h2>

                        <div className=" flex flex-col space-y-[40px]">
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                Most patients recover quickly after cervical laminoplasty. Many
                                go home the next day, and in some cases, it may be performed on
                                an outpatient basis. Pain typically improves by the third day
                                after surgery. Since neck movement is preserved, stiffness is
                                minimized, and mobility is encouraged early on, which further
                                speeds up recovery.
                            </p>
                        </div>
                    </div>
                ),
            },
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            Schedule a Consultation Today
                        </h2>

                        <div className=" flex flex-col space-y-[40px]">
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                If you're experiencing symptoms like numbness, clumsiness, or
                                radiating pain in your arms or legs, you may have cervical
                                spinal stenosis. Early treatment can significantly improve your
                                outcome and prevent further neurological damage. At Mountain
                                Spine & Orthopedics, our expert surgeons specialize in both
                                minimally invasive and motion-preserving spinal procedures to
                                help you get back to life without pain or stiffness.
                                <br />
                                <br />
                                Take the first step toward recovery. Call us at (561) 223-9959
                                or fill out our online form to schedule your consultation today.
                            </p>
                        </div>
                    </div>
                ),
            },
        ],
        slug: "neck-spinal-stenosis",
        keywords: [
            "cervical spinal stenosis symptoms", "neck pain and hand numbness", "spinal cord compression neck", "myelopathy treatment Florida", "balance problems neck pain", "laminoplasty",
        ],
        metaTitle: "Cervical Stenosis Symptoms & Relief | FL Orthopedics",
        metaDesc: "Neck pain, arm numbness, or balance problems? Learn how cervical spinal stenosis can cause these symptoms and what treatment options can help. Get expert care in Florida.",
    },
    {
        title: "Arm Pain from a Cervical Herniated Disc (Pinched Nerve)",
        tag: "Neck",
        card_img:
            "https://mountainspineortho.b-cdn.net/public/CervicalHerniatedDisc.png",
        inTxt_img:
            "https://mountainspineortho.b-cdn.net/public/CervicalHerniatedDiscarti.png",
        body: "A sudden sharp pain in your neck that shoots down your arm can be startling and debilitating. Often, this is caused by a herniated disc in your neck pressing on a sensitive nerve root.",
        detail: "The rubbery discs in your neck act as cushions between your vertebrae. If the tough outer layer of one of these discs tears—due to an injury or simply age-related wear—the soft inner material can push out. This is a herniated disc. When that material presses on a nearby nerve, it causes inflammation and the radiating pain, numbness, or weakness you feel down your shoulder and arm. Our Florida specialists can pinpoint exactly which disc and nerve are involved to provide targeted relief.",
        what_sym: "The hallmark symptom is pain that travels from the neck down one arm, often described as 'electric,' 'burning,' or 'pins and needles.' You might also have tingling in your fingers, numbness in parts of your hand, or weakness in your arm that makes it hard to lift or grip things. Turning your head, looking down at your phone, or even coughing can make the pain much worse.",
        risk_fac:
            "While a sudden injury like whiplash can cause a disc to herniate, it's often the result of gradual wear and tear. Poor posture, especially the 'text neck' from looking down at screens, puts a lot of strain on cervical discs. A job with repetitive heavy lifting can also increase your risk.",
        diagnose: (
            <div className="flex flex-col space-y-[16px]">
                <p>
                    A physical exam where our specialist tests your arm strength, sensation, and reflexes is the first step. To confirm a herniated disc and see exactly how it's affecting the nerve, an MRI is the best imaging tool. Our complimentary MRI review gives you and our team a clear picture of the problem so we can decide on the best treatment together.
                </p>
                <Image
                    src={"https://mountainspineortho.b-cdn.net/public/cervhernia3.png"}
                    alt="cervicalspinalstenosisside"
                    width={300}
                    height={300}
                    layout="cover"
                    className="w-full h-full object-cover aspect-video rounded-2xl"
                />
            </div>
        ),
        treatment:
            "Most people with a cervical herniated disc get better without surgery. We focus on calming the nerve pain with options like outside rehabilitation, anti-inflammatory medications, and targeted steroid injections. If the pain is severe and doesn't improve, or if you have significant arm weakness, surgical options like an Anterior Cervical Discectomy and Fusion (ACDF) or an artificial disc replacement can provide excellent relief by removing the pressure on the nerve.",
        pain_info:
            "The arm pain from a cervical herniated disc is often much worse than the neck pain itself. This nerve pain can be intense and interfere with sleep and daily activities. Our priority is to relieve that arm pain quickly and effectively while giving the nerve time and space to heal properly.",
        prevent:
            "Being mindful of your posture is the most important preventive step. Keep screens at eye level, take breaks from long periods of sitting, and use proper form when lifting. Strengthening your neck and upper back muscles also provides better support for your cervical spine.",
        why_choose_us:
            "At Mountain Spine & Orthopedics, we specialize in relieving the arm and neck pain caused by cervical herniated discs. Our Florida practice provides every patient with a complimentary MRI review and free second opinion. We are leaders in both non-surgical care and advanced surgical techniques like motion-preserving artificial disc replacement, helping you return to a pain-free life.",
        schedule:
            "If neck and arm pain are limiting you, schedule a consultation with our team. We'll review your MRI for free and provide a clear second opinion, so you can move forward with the right plan for lasting relief.",
        slug: "neck-herniated-disc",
        side_img: "https://mountainspineortho.b-cdn.net/public/cervicalherniaside.png",
        forum: [
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            What Is a Cervical Herniated Disc?
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                A herniated cervical disc occurs when one of the discs in the
                                neck region (cervical spine) becomes damaged. These discs are
                                gel-like cushions that sit between the vertebrae and act as
                                shock absorbers. Over time or due to injury, the outer wall of
                                the disc can tear, allowing the inner nucleus to leak out and
                                press against surrounding spinal nerves. This can lead to
                                symptoms such as neck pain, numbness, tingling, or weakness in
                                the shoulders, arms, or hands. Treatment options range from
                                conservative therapies like rest and outside rehabilitation to more
                                advanced solutions, including cervical spine surgery.
                            </p>

                            <div className="rounded-[24px] overflow-hidden">
                                <iframe
                                    width="100%"
                                    height="500"
                                    src="https://www.youtube.com/embed/gUG_zbKqlaU?si=k_-WQStF8cvjCaMj"
                                    title="YouTube video player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                ></iframe>
                            </div>

                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                If you're experiencing neck pain, numbness, or weakness in your
                                upper limbs, you may be dealing with a herniated disc in your
                                cervical spine. Our symptom checker tool is a quick and easy way
                                to help determine if you're showing signs of disc herniation and
                                whether a treatment consultation is recommended.
                            </p>

                            <OutlinedButton text="Do I have this Condition?" />
                        </div>
                    </div>
                ),
            },
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            How Are Cervical Herniated Discs Diagnosed?
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                Diagnosing a herniated disc begins with a medical history review
                                and physical examination. Your doctor may recommend imaging
                                tests such as X-rays, MRI scans, or CT scans to confirm whether
                                a disc is bulging or ruptured. While X-rays can help rule out
                                other causes of pain, MRI and CT scans offer the most accurate
                                visualization of soft tissue and nerve compression. If a
                                herniated disc is confirmed, treatment usually starts
                                conservatively with rest, ice, and medication. If symptoms
                                persist, surgical intervention may be recommended.
                            </p>
                            <OutlinedButton text="Find a Treatment" />
                        </div>
                    </div>
                ),
            },
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            Pain Management for a Cervical Herniated Disc
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                In the early stages of a cervical disc herniation, pain can
                                often be managed with rest, ice, heat therapy, and
                                anti-inflammatory medications. Muscle relaxants or prescription
                                pain relievers may also be used. If pain continues, physicians
                                may suggest outside rehabilitation to help strengthen the surrounding
                                neck muscles. In some cases, nerve root blocks or epidural
                                steroid injections are used to reduce inflammation and nerve
                                pressure. Our team at Mountain Spine & Orthopedics will help
                                determine the best approach based on your condition.
                            </p>
                        </div>
                    </div>
                ),
            },
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            What Causes a Cervical Herniated Disc?
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                Cervical disc herniation can occur suddenly due to trauma or
                                gradually as part of the aging process. The most common cause is
                                wear and tear, which leads to disc degeneration. Over time, the
                                discs lose elasticity and hydration, making them more prone to
                                rupture. Other contributing factors include poor posture,
                                obesity, repetitive strain, and spinal injury. In people over
                                the age of 30, disc degeneration becomes more common, but even
                                younger patients can suffer from herniated discs if their
                                lifestyle puts excess stress on the spine.
                            </p>

                            <GradientOverlayImage
                                imageData={
                                    "https://mountainspineortho.b-cdn.net/public/cervicalhernia.jpeg"
                                } // Passing static image data
                                height="500px"
                                gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
                            />
                        </div>
                    </div>
                ),
            },
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            Risk Factors for a Cervical Herniated Disc
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                Several factors can increase your risk of developing a cervical
                                herniated disc. These include being overweight, smoking, living
                                a sedentary lifestyle, or engaging in activities that involve
                                repetitive neck strain or heavy lifting. Trauma to the spine or
                                poor posture while sitting or sleeping can also contribute.
                                Herniated discs may present with a wide range of symptoms pain,
                                numbness, tingling, and weakness in the arms or legs so it's
                                important to get evaluated by a medical professional if you
                                suspect you may have this condition.
                            </p>
                        </div>
                    </div>
                ),
            },
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            Treatment Options for Cervical Herniated Discs
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                Treatment for a herniated disc depends on the severity of the
                                condition and the patient’s overall health. Mild cases often
                                respond well to conservative approaches like rest, physical
                                therapy, heat/ice, and anti-inflammatory medication. If these
                                measures fail to provide relief, more advanced treatments such
                                as epidural injections or surgery may be required. Surgical
                                options typically involve removing part or all of the damaged
                                disc to relieve pressure on the spinal nerves. At Mountain Spine
                                & Orthopedics, our specialists are trained in minimally invasive
                                procedures that aim to reduce recovery time and preserve neck
                                mobility
                            </p>
                        </div>
                    </div>
                ),
            },
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            Schedule a Consultation Today
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                Cervical herniated discs can significantly impact your daily
                                life but you don’t have to manage the pain alone. Whether you're
                                just beginning to feel discomfort or you've been struggling for
                                months, there are many effective treatments available. At
                                Mountain Spine & Orthopedics, our spine surgeons are highly
                                experienced in diagnosing and treating herniated discs through
                                both non-surgical and surgical solutions.
                                <br />
                                <br />
                                Call us today at (561) 223-9959 or fill out our online form to
                                schedule a consultation. You may have more options than you
                                think and recovery may be closer than you realize.
                            </p>
                        </div>
                    </div>
                ),
            },
        ],
        keywords: [
            "cervical herniated disc pain", "radiating arm pain", "pinched nerve in neck relief", "neck and shoulder pain", "tingling in fingers", "ACDF surgery Florida", "artificial disc replacement",
        ],
        metaTitle: "Neck & Arm Pain from Herniated Disc | Relief in Florida",
        metaDesc: "Experiencing radiating arm pain from a pinched nerve in your neck? A cervical herniated disc could be the cause. Our Florida specialists offer advanced relief options.",
    },
    {
        title: "Cervical Degenerative Disc Disease",
        tag: "Spine",
        card_img:
            "https://mountainspineortho.b-cdn.net/public/DegenerativeDiscDiseasec.png",
        inTxt_img:
            "https://mountainspineortho.b-cdn.net/public/DegenerativeDiscDisease.png",
        body: "Chronic neck stiffness and a nagging ache that won't go away are often signs of 'wear and tear' on the discs in your neck. This is known as cervical degenerative disc disease, a common condition that can affect your daily comfort and mobility.",
        detail: "The discs in your neck are like soft, flexible cushions that allow you to move your head freely. Over the years, these discs can naturally start to lose water and thin out. This process is called degenerative disc disease. As the discs lose height, more stress is placed on the neck joints, which can lead to arthritis, stiffness, and chronic pain. At our Florida clinics, we help patients manage this pain and maintain their neck's range of motion.",
        what_sym: "The most common symptom is a stiff, painful neck that feels worse at the end of the day or after holding your head in one position for a long time, like when driving, reading, or working on a computer. The pain is often a dull ache but can become sharp with certain movements. You might also experience headaches, grinding sounds when you turn your head, or pain that spreads to your shoulders.",
        risk_fac:
            "Age is the leading factor in disc degeneration. However, a past neck injury, a job with repetitive neck movements, or even genetics can play a role. Smoking is also a significant risk factor, as it can hinder the flow of nutrients to your discs, causing them to wear out faster.",
        diagnose: (
            <div className=" flex flex-col space-y-[16px] items-center justify-center">
                <p>
                    A diagnosis usually starts with a discussion of your symptoms and a physical exam of your neck's movement and strength. An X-ray or MRI can confirm the diagnosis by showing reduced disc height or bone spurs. Our complimentary imaging review helps us create a care plan tailored specifically to you.
                </p>
                <Image
                    src={"https://mountainspineortho.b-cdn.net/public/ddd3.png"}
                    alt="degenerative disc disease"
                    layout="cover"
                    width={300}
                    height={300}
                    className="w-full h-full object-fill aspect-video rounded-2xl overflow-hidden"
                />
            </div>
        ),
        pain_info:
            "The pain from cervical DDD is often chronic and frustrating. It can be a constant background ache that limits your ability to turn your head comfortably, affecting activities like driving. Our goal is to manage these symptoms, reduce painful flare-ups, and improve your day-to-day function through a combination of effective treatments.",
        prevent:
            "You can't reverse the aging process, but you can take steps to support your neck. Good posture is crucial—make sure your computer screen is at eye level. Gentle neck stretches and exercises can help maintain flexibility. Staying active and avoiding smoking are also key to keeping your discs as healthy as possible.",
        why_choose_us:
            "The specialists at Mountain Spine & Orthopedics are dedicated to helping you find relief from the chronic pain of cervical degenerative disc disease. We offer a complimentary MRI review and a free second opinion to ensure you have an accurate diagnosis. Our Florida team emphasizes non-surgical and minimally invasive options to restore your neck's mobility and comfort.",
        schedule:
            "If chronic neck ache and stiffness are impacting your life, book a consultation with us today. We'll provide a clear diagnosis and a customized care plan to help you manage your cervical degenerative disc disease and feel better.",
        forum: [
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] text-2xl"
                        >
                            What is Degenerative Disc Disease?
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                Degenerative Disc Disease is a spinal condition caused by
                                age-related breakdown of the discs that cushion the vertebrae.
                                These discs act like shock absorbers, allowing your spine to
                                flex, bend, and twist. Over time, discs can lose water content,
                                flatten, and develop small tears, reducing their ability to
                                support your spine and absorb impact. Unlike acute injuries, DDD
                                develops slowly over time and is especially common in
                                individuals over 40. However, it can also affect younger
                                individuals with physically demanding lifestyles or spinal
                                injuries.
                            </p>
                            <GradientOverlayImage
                                imageData={"https://mountainspineortho.b-cdn.net/public/degendisc.png"} // Passing static image data
                                height="500px"
                                gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
                            />
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                To diagnose DDD, our specialists begin with a full medical
                                history and physical exam, followed by advanced imaging such as
                                X-rays or MRI scans to evaluate disc height, disc shape, and any
                                signs of degeneration. We also assess nerve function and spinal
                                alignment to understand the full extent of the damage. Diagnosis
                                may involve ruling out other conditions, such as herniated discs
                                or spinal stenosis, that share similar symptoms.
                            </p>

                            <OutlinedButton text="Do I have this Condition?" />
                        </div>
                    </div>
                ),
            },
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] text-2xl"
                        >
                            Symptoms of Degenerative Disc Disease
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                Symptoms vary depending on the location and severity of the disc
                                degeneration. Common signs include chronic lower back or neck
                                pain that worsens with bending, twisting, or prolonged sitting.
                                Some patients find relief when walking or changing positions.
                                Others may experience muscle weakness or numbness in the arms or
                                legs if nerve compression occurs. Many people also report
                                stiffness or reduced flexibility in the spine. The pain may be
                                intermittent, flaring up during activity and easing with rest.
                            </p>
                            <OutlinedButton text="Find a Treatment" />

                            <GradientOverlayImage
                                imageData={"https://mountainspineortho.b-cdn.net/public/degendisc2.png"} // Passing static image data
                                height="500px"
                                gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
                            />
                        </div>
                    </div>
                ),
            },
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] text-2xl"
                        >
                            Risk Factors for Degenerative Disc Disease
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                You may be at higher risk for DDD if you are over the age of 40,
                                smoke, or lead a sedentary lifestyle. A history of spinal
                                injuries or trauma can increase your risk, especially if paired
                                with poor posture or spinal misalignment. Genetic factors also
                                contribute, and individuals with a family history of
                                spine-related conditions are more likely to develop DDD.
                                Identifying these risk factors early can help slow the
                                progression of the disease and guide preventative care.
                            </p>
                        </div>
                    </div>
                ),
            },
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] text-2xl"
                        >
                            Treatment Options for Degenerative Disc Disease
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                At Mountain Spine & Orthopedics, we create personalized
                                treatment plans tailored to your condition and lifestyle.
                                Treatment options may include outside rehabilitation to improve
                                strength, flexibility, and posture, as well as medications like
                                non-steroidal anti-inflammatory drugs (NSAIDs) to reduce pain
                                and swelling. For patients with nerve irritation, epidural
                                steroid injections can offer targeted relief. Other approaches
                                may include chiropractic care or spinal manipulation therapy. In
                                more severe cases, minimally invasive spine surgery may be
                                recommended to stabilize the spine and relieve nerve pressure.
                                Our goal is to relieve your pain and restore spine stability
                                while avoiding unnecessary surgery whenever possible.
                            </p>
                        </div>
                    </div>
                ),
            },
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] text-2xl"
                        >
                            Schedule a Consultation Today
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                If you're experiencing persistent back or neck pain, don't wait
                                to seek help. Degenerative Disc Disease is manageable with the
                                right care plan and professional guidance. At Mountain Spine &
                                Orthopedics, our experienced spine specialists are here to
                                evaluate your condition, offer expert recommendations, and guide
                                you toward long-term relief.
                                <br />
                                <br />
                                Call us today at (561) 223-9959 or fill out our online form to
                                schedule your consultation. Let's work together to get your
                                spine and your life back on track.
                            </p>
                        </div>
                    </div>
                ),
            },
        ],
        side_img: "https://mountainspineortho.b-cdn.net/public/degendiscside.jpeg",
        slug: "cervical-degenerative-disc-disease",
        keywords: [
            "cervical degenerative disc disease", "chronic neck pain relief", "stiff neck causes", "neck arthritis treatment Florida", "DDD in neck", "neck and shoulder ache", "headache from neck pain",
        ],
        metaTitle: "Cervical Disc Disease Neck Pain Relief | Mountain Spine FL",
        metaDesc: "Struggling with chronic neck pain and stiffness? Learn how cervical degenerative disc disease causes these symptoms and what our Florida spine team can do to help.",
    },
    {
        title: "Relief from Arthritis Pain in Your Joints",
        tag: "Hand",
        card_img: "https://mountainspineortho.b-cdn.net/public/arthritis2.jpeg",
        inTxt_img: "https://mountainspineortho.b-cdn.net/public/arthritis.png",
        body: "Arthritis is a common condition that causes joint inflammation, leading to chronic pain, stiffness, and swelling that can make daily activities difficult.",
        detail: "The term 'arthritis' covers many conditions, but the most common is osteoarthritis—the 'wear and tear' that breaks down the smooth cartilage cushioning your joints. This can affect any joint, from the small joints in your hands to the larger ones in your neck, shoulders, and knees. At Mountain Spine & Orthopedics, our goal is to accurately diagnose the cause of your joint pain and create a personalized plan to manage your symptoms and improve your quality of life.",
        what_sym: "The most common signs of arthritis are joint pain and stiffness, especially when you first wake up or after being inactive. You might also notice swelling, redness, or a feeling of warmth around the affected joint. Over time, you may find it harder to move the joint through its full range of motion, affecting activities like reaching overhead or gripping objects.",
        risk_fac:
            "While age is a primary risk factor, a family history of arthritis, a past joint injury, or being overweight can also increase your chances. Certain autoimmune conditions can also cause inflammatory arthritis, like rheumatoid arthritis.",
        diagnose:
            "Diagnosing arthritis starts with a conversation about your symptoms and a physical exam to check your joints. X-rays are very helpful to see the extent of cartilage loss or bone spurs. In some cases, blood tests or an MRI may be needed to get a clearer picture. We offer a complimentary MRI review to ensure you get a precise diagnosis.",
        treatment:
            "Treatment for arthritis focuses on relieving pain and keeping you active. Non-surgical options are the first line of defense, including outside rehabilitation to strengthen muscles around the joint, anti-inflammatory medications, and targeted injections like cortisone or viscosupplementation ('gel shots'). For severe cases, minimally invasive surgery or joint replacement may be recommended.",
        pain_info:
            "Arthritis pain can be a dull, constant ache or a sharp pain that flares up with activity. Our comprehensive approach is designed to reduce inflammation, protect your remaining cartilage, and teach you strategies to manage your pain so you can stay as active as possible.",
        prevent:
            "You can take steps to manage arthritis and slow its progression. Maintaining a healthy weight takes pressure off your joints. Regular, low-impact exercise like swimming or walking keeps joints moving and muscles strong. Protecting your joints from injury is also key.",
        why_choose_us:
            "Our Florida-based specialists at Mountain Spine & Orthopedics provide expert, comprehensive care for all types of arthritis. We offer a complimentary MRI review and a free second opinion to ensure an accurate diagnosis. From advanced non-surgical treatments to minimally invasive joint replacement, our team is dedicated to restoring your comfort and mobility.",
        schedule:
            "If joint pain is keeping you from the activities you love, schedule a consultation with our team. We'll find the source of your pain and create a personalized plan to manage your arthritis and help you feel better.",
        side_img: "https://mountainspineortho.b-cdn.net/public/arthritisside.jpeg",
        forum: [
            {
                post: (
                    <div className="flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] text-2xl"
                        >
                            What Is Arthritis?
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                Arthritis refers to inflammation of one or more joints. It’s not
                                a single disease but a broad term used to describe over 100
                                different types of joint disorders. The two most common types
                                are osteoarthritis (OA) and rheumatoid arthritis (RA), though
                                others like gout, psoriatic arthritis, and lupus-related
                                arthritis are also common.
                                <br />
                                <br />
                                The primary symptoms of arthritis include joint pain, stiffness,
                                swelling, redness, and decreased range of motion. Over time,
                                arthritis can lead to cartilage loss, bone erosion, and even
                                joint deformity, particularly if left untreated.
                            </p>
                            <GradientOverlayImage
                                imageData={
                                    "https://mountainspineortho.b-cdn.net/public/arthritis.png"
                                } // Passing static image data
                                height="500px"
                                gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
                            />
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                Many patients describe arthritis as a dull, aching pain that
                                worsens with activity or after periods of rest. Understanding
                                the exact type of arthritis you have is critical for choosing
                                the most effective treatment path.
                            </p>
                            <OutlinedButton text="Do I have this Condition?" />
                        </div>
                    </div>
                ),
            },
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] text-2xl"
                        >
                            Symptoms of Arthritis
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <ul
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl list-disc list-inside"
                            >
                                <li>
                                    Joint stiffness, especially in the morning or after inactivity
                                </li>
                                <li>Swelling around the joints</li>
                                <li>Persistent or sharp joint pain</li>
                                <li>Tenderness when touching the joint</li>
                                <li>Reduced range of motion</li>
                                <li>Clicking, popping, or grinding sounds</li>
                                <li>Warmth or redness over the joint</li>
                                <li>
                                    Fatigue or flu-like symptoms (common in inflammatory types
                                    like RA)
                                </li>
                            </ul>

                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                In more advanced stages, arthritis can lead to joint deformity,
                                loss of function, and reduced ability to perform everyday
                                tasks. Early diagnosis and treatment can significantly slow
                                progression and reduce permanent damage.
                            </p>
                            <OutlinedButton text="Find a Treatment" />
                            <GradientOverlayImage
                                imageData={
                                    "https://mountainspineortho.b-cdn.net/public/arthritis2.jpeg"
                                } // Passing static image data
                                height="500px"
                                gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
                            />
                        </div>
                    </div>
                ),
            },
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] text-2xl"
                        >
                            Types of Arthritis
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                There are several major types of arthritis that affect people of
                                all ages. Osteoarthritis is the most common and is caused by
                                the gradual breakdown of cartilage, which cushions the ends of
                                bones within a joint. As this cartilage deteriorates, bones
                                begin to rub against each other, leading to pain and stiffness.
                                Rheumatoid arthritis is an autoimmune disorder in which the
                                immune system attacks the lining of the joints, causing chronic
                                inflammation, swelling, and joint erosion. Gout results from a
                                buildup of uric acid crystals, often in the big toe, and leads
                                to sudden, intense pain. Psoriatic arthritis is associated with
                                psoriasis and can cause both joint inflammation and skin
                                symptoms. Each of these conditions presents unique challenges
                                and requires a tailored treatment plan to effectively control
                                pain and prevent further damage.
                            </p>
                        </div>
                    </div>
                ),
            },
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] text-2xl"
                        >
                            Arthritis Treatment Options
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                Arthritis may be a chronic condition, but that doesn’t mean it
                                has to control your life. With the right treatment plan, it’s
                                possible to reduce pain, slow joint damage, and improve your
                                mobility. At Mountain Spine & Orthopedics, our team of experts
                                offers a full spectrum of arthritis care from advanced imaging
                                and diagnosis to non-surgical therapies and state-of-the-art
                                surgical solutions when needed. Whether you’re managing early
                                signs of osteoarthritis or facing the challenges of an
                                inflammatory condition like rheumatoid arthritis, we’re here to
                                help guide you through every stage of your treatment.
                            </p>
                        </div>
                    </div>
                ),
            },
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] text-2xl"
                        >
                            Schedule a Consultation Today
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                If you’re living with persistent joint pain, stiffness, or
                                swelling, don’t wait to get the help you need. Arthritis is a
                                manageable condition when addressed early with the right
                                treatment plan and expert care. At Mountain Spine & Orthopedics,
                                our experienced specialists are here to evaluate your symptoms,
                                provide a personalized diagnosis, and guide you toward lasting
                                relief and better joint health.
                                <br />
                                <br />
                                Call us today at (561) 223-9959 or fill out our online
                                consultation form to schedule your appointment. Let’s take the
                                first step together toward improving your mobility, comfort, and
                                quality of life.
                            </p>
                        </div>
                    </div>
                ),
            },
        ],
        slug: "neck-shoulder-arthritis-pain",
        keywords: [
            "arthritis pain relief", "joint pain treatment Florida", "osteoarthritis symptoms", "rheumatoid arthritis", "shoulder arthritis", "neck arthritis", "orthopedic specialist Florida",
        ],
        metaTitle: "Arthritis & Joint Pain Relief in Florida | Mountain Spine Ortho",
        metaDesc: "Struggling with arthritis joint pain, stiffness, or swelling? Our Florida orthopedic specialists offer personalized treatment plans to restore your comfort and mobility.",
    },
    {
        title: "Understanding and Treating a Pinched Nerve",
        tag: "Spine",
        card_img: "https://mountainspineortho.b-cdn.net/public/PinchedNerve.png",
        inTxt_img:
            "https://mountainspineortho.b-cdn.net/public/PinchedNervearti.png",
        body: "A 'pinched nerve' is a common term for when a nerve is compressed by surrounding tissue, causing radiating pain, numbness, or a 'pins and needles' feeling.",
        detail: "A pinched nerve, or what doctors call radiculopathy, happens when too much pressure is applied to a nerve by surrounding tissues, such as bones, cartilage, muscles, or tendons. This pressure disrupts the nerve's function, causing pain, tingling, numbness or weakness. It often originates from a problem in the spine, like a herniated disc or bone spur. Our Florida team can find the exact source of the compression and create a plan to relieve it.",
        what_sym: "The symptoms of a pinched nerve can be felt far from the actual source. For example, a pinched nerve in your neck can cause sharp, burning pain down your arm and into your hand. A pinched nerve in your lower back can cause sciatica—pain that shoots down your leg. You might also feel like your hand or foot has 'fallen asleep' frequently.",
        risk_fac:
            "Age-related wear and tear is a common cause. Conditions like arthritis, repetitive motions from a job or hobby, and injuries can all lead to a pinched nerve. Being overweight can also add pressure to nerves, increasing your risk.",
        diagnose:
            "To diagnose a pinched nerve, our specialists will talk to you about your symptoms and perform a physical exam. An MRI is often used to see exactly where the nerve is being compressed. We offer a complimentary MRI review to help get an accurate diagnosis and find the right treatment path.",
        treatment:
            "The goal of treatment is to relieve the pressure on the nerve. Many people find relief with rest and non-surgical treatments like outside rehabilitation and anti-inflammatory medication. Targeted steroid injections can also be very effective. If the pressure is severe, minimally invasive surgery may be recommended to create more space for the nerve.",
        pain_info:
            "The radiating, electric-like pain of a pinched nerve can be very disruptive. Our approach focuses on calming the irritated nerve and addressing the underlying cause of the compression. We help you find relief so you can get back to your daily activities without pain.",
        prevent:
            "Maintaining good posture, incorporating strength and flexibility exercises into your routine, and avoiding repetitive motions for long periods can help prevent pinched nerves. If your job requires repetitive tasks, taking frequent breaks is important.",
        why_choose_us:
            "The specialists at Mountain Spine & Orthopedics are experts in relieving the frustrating pain of a pinched nerve. For patients across Florida, we offer a complimentary MRI review and free second opinion to ensure an accurate diagnosis. We utilize a range of advanced non-surgical and minimally invasive techniques to get you moving comfortably again.",
        schedule:
            "If radiating pain, numbness, or weakness is affecting your life, schedule a consultation with our team today. We'll find the cause of your pinched nerve and create a personalized plan to get you relief.",
        forum: [
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] text-2xl"
                        >
                            What Is a Pinched Nerve?
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                A pinched nerve occurs when soft tissue or bone compresses a
                                nearby nerve root, interrupting its ability to transmit signals
                                correctly. This can result in pain that radiates from the spine
                                to the extremities, depending on the location of the
                                compression. When the cervical spine is affected, symptoms often
                                extend into the arms or hands. If the lumbar spine is involved,
                                the pain can travel into the buttocks, legs, or feet.
                                <br />
                                <br />
                                Common causes of nerve compression include herniated discs, bone
                                spurs, spinal stenosis, and poor posture. Over time, continued
                                pressure can lead to worsening symptoms and even permanent nerve
                                damage if not treated properly.
                            </p>
                            <GradientOverlayImage
                                imageData={
                                    "https://mountainspineortho.b-cdn.net/public/pinchednerve.jpeg"
                                } // Passing static image data
                                height="500px"
                                gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
                            />
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                Many patients report that pinched nerve pain worsens with
                                movement or after long periods of sitting. Some also experience
                                burning sensations or weakness in the arms or legs. Early
                                diagnosis and treatment are essential to preventing long-term
                                nerve damage and restoring full function.
                            </p>

                            <OutlinedButton text="Do I have this Condition?" />
                        </div>
                    </div>
                ),
            },
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] text-2xl"
                        >
                            Symptoms of a Pinched Nerve
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                Symptoms of a pinched nerve depend on where the nerve is
                                compressed, but common warning signs include:
                            </p>
                            <ul
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl list-disc list-inside"
                            >
                                <li>A sharp or burning pain radiating into the arms or legs</li>
                                <li>Numbness or tingling in the affected limb</li>
                                <li>Muscle weakness or feeling that the limb is "asleep"</li>
                                <li>
                                    Pain that worsens with certain movements, like turning the
                                    head or standing up
                                </li>
                                <li>
                                    Discomfort that improves slightly when leaning forward or
                                    resting
                                </li>
                            </ul>

                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                Pinched nerve symptoms can come and go or be constant, depending
                                on the cause. If left untreated, nerve compression may lead to
                                permanent nerve damage, chronic pain, or muscle atrophy.
                                Recognizing these early warning signs is the first step toward
                                finding lasting relief.
                            </p>
                            <OutlinedButton text="Find a Treatment" />
                            <GradientOverlayImage
                                imageData={
                                    "https://mountainspineortho.b-cdn.net/public/pinchednerve2.jpeg"
                                } // Passing static image data
                                height="500px"
                                gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
                            />
                        </div>
                    </div>
                ),
            },
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] text-2xl"
                        >
                            Common Conditions Causing a Pinched Nerve
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                Several spinal conditions can lead to pinched nerves. Herniated
                                discs are one of the most common causes. When the soft inner
                                material of the disc bulges out, it can press against nearby
                                nerves and cause pain, tingling, or numbness. Spinal stenosis,
                                which involves narrowing of the spinal canal, is another major
                                cause especially in older adults.
                                <br />
                                <br />
                                Bone spurs, often related to arthritis or spinal degeneration,
                                can also contribute to nerve compression by invading space meant
                                for nerves. In some cases, muscle tightness or repetitive strain
                                from poor posture may also lead to a pinched nerve. Understanding
                                what’s causing your symptoms is key to receiving the right care.
                            </p>
                        </div>
                    </div>
                ),
            },
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] text-2xl"
                        >
                            Treatments for a Pinched Nerve
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                A pinched nerve doesn’t have to control your life. With early
                                intervention and the right treatment strategy, most patients
                                experience relief without surgery. Non-surgical options may
                                include outside rehabilitation, anti-inflammatory medication, activity
                                modification, ergonomic adjustments, and corticosteroid
                                injections. When conservative care fails to relieve pressure on
                                the nerve, minimally invasive surgical solutions such as
                                microdiscectomy or foraminotomy may be considered.
                                <br />
                                <br />
                                At Mountain Spine & Orthopedics, our team uses advanced imaging
                                and diagnostic tools to pinpoint the source of nerve compression
                                and build a customized care plan. Whether you need non-invasive
                                treatment or surgical intervention, we’re here to help you
                                recover quickly and safely.
                            </p>
                        </div>
                    </div>
                ),
            },
            {
                post: (
                    <div className=" flex flex-col space-y-[16px] ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] text-2xl"
                        >
                            Schedule a Consultation Today
                        </h2>
                        <div className=" flex flex-col space-y-[40px]">
                            <p
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontWeight: 400,
                                }}
                                className="text-[#424959] text-md sm:text-xl"
                            >
                                If you’re living with shooting pain, numbness, or tingling that
                                just won’t go away, it may be time to speak with a spine
                                specialist. A pinched nerve is highly treatable, especially
                                when diagnosed early. At Mountain Spine & Orthopedics, our
                                experienced physicians will evaluate your symptoms, identify the
                                source of the problem, and recommend a treatment path that works
                                best for your needs and lifestyle.
                                <br />
                                <br />
                                Call us today at (561) 223-9959 or fill out our online
                                consultation form to schedule your appointment. Lasting relief
                                could be just one visit away.
                            </p>
                        </div>
                    </div>
                ),
            },
        ],
        slug: "pinched-nerve-neck-shoulder",
        keywords: [
            "pinched nerve relief", "radiculopathy treatment Florida", "sciatica symptoms", "radiating leg pain", "numbness in arm", "pinched nerve in neck treatment", "pinched nerve in back", "pain management Florida",
        ],
        side_img: "https://mountainspineortho.b-cdn.net/public/pinchednerveside.jpeg",
        metaTitle: "Pinched Nerve Pain Relief in Florida | Mountain Spine Ortho",
        metaDesc: "A pinched nerve causes sharp, radiating pain, numbness, and tingling. Our Florida spine specialists offer expert diagnosis and treatment to relieve nerve compression.",
    },
    {
        title: "Relief from Painful Bunions (Hallux Valgus)",
        tag: "Foot",
        card_img: "https://mountainspineortho.b-cdn.net/public/Bunions%20(1).jpg",
        inTxt_img: "https://mountainspineortho.b-cdn.net/public/bunions2.png",
        body: "A bunion is a painful bony bump that develops on the joint at the base of your big toe, which can make wearing shoes and walking uncomfortable.",
        detail: "A bunion, which doctors call hallux valgus, is more than just a bump. It's a progressive foot deformity that happens when your big toe starts to lean toward your second toe. This forces the joint at the base of the big toe to stick out. While tight shoes can make them worse, bunions are often caused by your inherited foot type. At Mountain Spine & Orthopedics, our foot specialists create personalized plans to relieve your pain, correct the alignment, and help you walk comfortably again.",
        what_sym: "The most obvious sign is the bony bump on the side of your foot. You'll likely feel pain and tenderness around that joint, which can become red and swollen. One of the biggest challenges is finding shoes that fit without rubbing against the bunion and causing more pain.",
        risk_fac: "Your risk for bunions is higher if they run in your family. Wearing shoes that are too tight, narrow, or high-heeled can force the toes into an unnatural position and significantly contribute to their development. People with flat feet or low arches are also more prone to them.",
        diagnose: "Diagnosing a bunion is usually done with a physical exam of your foot. To understand the severity of the misalignment, our specialist will take weight-bearing X-rays. This helps us see how the bones are positioned and plan the most effective treatment for you.",
        treatment: "For many, simple changes can bring relief. This includes wearing wider, more comfortable shoes, using pads to cushion the bunion, or wearing custom shoe inserts (orthotics). If the pain and deformity are severe, our surgeons may recommend a bunionectomy—a procedure to realign the bone and correct the deformity for lasting relief.",
        pain_info: "Bunion pain comes from the constant pressure and friction on the enlarged joint. It can be a dull ache that turns into a sharp pain, especially after a long day on your feet. Our goal is to relieve this pressure and inflammation, whether through conservative care or advanced surgery.",
        prevent: "The best way to slow a bunion's progression is to choose your footwear wisely. Look for shoes with a wide toe box that doesn't squeeze your toes. If you have an inherited foot structure that makes you prone to bunions, using supportive orthotics can also help.",
        why_choose_us: "The foot and ankle surgeons at Mountain Spine & Orthopedics are leaders in bunion correction in Florida. We offer a full range of treatments, from custom orthotics to advanced, minimally invasive surgical techniques. With a complimentary X-ray review and a free second opinion, we can create a personalized plan to get you back on your feet comfortably.",
        schedule: "If bunion pain is affecting your daily life, contact Mountain Spine & Orthopedics. Our specialists can provide a thorough evaluation and discuss a personalized treatment path to provide relief.",
        slug: "bunion-pain-hallux-valgus",
        forum: [
            {
                post: (
                    <div className="flex flex-col space-y-[16px]">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            What are Bunions?
                        </h2>
                        <p
                            style={{
                                fontFamily: "var(--font-inter)",
                                fontWeight: 400,
                            }}
                            className="text-[#424959] text-md sm:text-xl"
                        >
                            A bunion is a structural misalignment of the first
                            metatarsophalangeal joint where the first metatarsal bone deviates
                            outward and the big toe angles inward. This creates an outward
                            bulge that rubs against footwear and concentrates pressure on the
                            joint surface, leading to inflammation, bursitis, and arthritic
                            change. Patients typically report localized soreness, swelling,
                            burning sensations, and difficulty finding comfortable shoes.
                            Accurate assessment of bunion size, joint flexibility, and
                            underlying bone shape guides the most effective treatment
                            strategy.
                        </p>
                        <div className="flex flex-col space-y-[40px] mt-[40px] w-full h-full">
                            <GradientOverlayImage
                                imageData={"https://mountainspineortho.b-cdn.net/bunions.png"}
                                height="500px"
                                gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
                            />
                            <OutlinedButton text="Do I have this condition?" />
                        </div>
                    </div>
                ),
            },
            {
                post: (
                    <div className="flex flex-col space-y-[16px]">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            Symptoms of Bunions
                        </h2>
                        <p
                            style={{
                                fontFamily: "var(--font-inter)",
                                fontWeight: 400,
                            }}
                            className="text-[#424959] text-md sm:text-xl"
                        >
                            Most patients first notice a visible bump and intermittent
                            soreness at the base of the big toe. With time, persistent joint
                            pain develops, often described as a burning or throbbing sensation
                            that worsens in snug footwear. Localized skin may appear shiny and
                            warm because of underlying bursitis. The big toe gradually
                            overlaps or under-rides the second toe, increasing crowding and
                            making ordinary activities such as running, hiking, or even
                            shopping arduous. Advanced bunions can cause numbness along the
                            inside of the toe or lead to tingling within the forefoot as nerve
                            branches become compressed. Prompt evaluation is crucial because
                            early intervention can slow or even halt further joint damage.
                        </p>
                        <div className="mt-[40px] space-y-[40px] flex flex-col">
                            <OutlinedButton text="Find a Treatment" />
                            <GradientOverlayImage
                                imageData={"https://mountainspineortho.b-cdn.net/bunion3.png"}
                                height="500px"
                                gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
                            />
                        </div>
                    </div>
                ),
            },
            {
                post: (
                    <div className="flex flex-col space-y-[16px]">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            Stages of Bunion Development
                        </h2>
                        <p
                            style={{
                                fontFamily: "var(--font-inter)",
                                fontWeight: 400,
                            }}
                            className="text-[#424959] text-md sm:text-xl"
                        >
                            Bunion progression typically follows a predictable path. In the
                            mild stage, the joint angle deviates slightly, and discomfort
                            appears only during extended activity. During the moderate stage,
                            the bump becomes visually obvious, pain occurs daily, and the big
                            toe begins to rotate. In the severe stage, pronounced angular
                            deviation, joint stiffness, and arthritic change limit walking
                            distance and shoe options to wide or custom designs. Recognizing
                            your stage allows the team at Mountain Spine & Orthopedics to match
                            therapies from conservative bracing to surgical realignment
                            precisely to your needs and lifestyle goals.
                        </p>
                    </div>
                ),
            },
            {
                post: (
                    <div className="flex flex-col space-y-[16px]">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            Bunion Treatments
                        </h2>
                        <p
                            style={{
                                fontFamily: "var(--font-inter)",
                                fontWeight: 400,
                            }}
                            className="text-[#424959] text-md sm:text-xl"
                        >
                            Many bunions respond well to conservative management when
                            addressed early. Wider toe-box shoes, silicone separators worn at
                            night, and custom orthotics redistribute weight and slow
                            progression. Targeted stretching and strengthening exercises
                            restore flexor-extensor balance in the foot, while nonsteroidal
                            anti-inflammatory medication eases flare-ups. When these measures
                            no longer control pain or when deformity interferes with normal
                            footwear, surgical correction becomes the gold standard. <br />
                            <br />
                            Our surgeons perform minimally invasive percutaneous osteotomies
                            as well as state-of-the-art Lapidus and scarf-type procedures that
                            realign the metatarsal, restore joint congruency, and stabilize
                            the foot with low-profile titanium hardware. Patients often bear
                            weight in a protective postoperative shoe within days and resume
                            athletic activities within weeks.
                        </p>
                    </div>
                ),
            },
            {
                post: (
                    <div className="flex flex-col space-y-[16px]">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            Schedule a Consultation Today
                        </h2>
                        <p
                            style={{
                                fontFamily: "var(--font-inter)",
                                fontWeight: 400,
                            }}
                            className="text-[#424959] text-md sm:text-xl"
                        >
                            Persistent foot pain, swelling, and visible toe deviation do not
                            have to define your day-to-day life. Early, expert-guided
                            treatment can halt bunion progression and restore comfortable
                            motion.
                            <br />
                            <br /> Contact Mountain Spine & Orthopedics today at (561) 223-9959 or complete our simple online consultation form.
                            <br />
                            <br />
                            Our specialists will evaluate your symptoms, provide a
                            personalized diagnosis, and craft a comprehensive plan that
                            relieves pain, realigns your toe, and gets you back on your feet
                            without compromise to your lifestyle or goals.
                        </p>
                    </div>
                ),
            },
        ],
        side_img: "https://mountainspineortho.b-cdn.net/bunions2.png",
        keywords: [
            "bunion pain relief", "hallux valgus treatment", "bunion surgery Florida", "bunionectomy", "foot pain relief", "bony bump on big toe", "foot and ankle surgeon", "minimally invasive bunion surgery",
        ],
        metaTitle: "Bunion Pain Relief & Treatment in Florida | Mountain Spine",
        metaDesc: "Bunions cause a painful bony bump on the big toe. Our Florida foot surgeons offer advanced treatments, including minimally invasive bunion surgery, to correct the deformity.",
    },
    {
        title: "Relief for Plantar Fasciitis Heel Pain",
        tag: "Foot",
        card_img: "https://mountainspineortho.b-cdn.net/public/pfcard.webp",
        inTxt_img: "https://mountainspineortho.b-cdn.net/public/pfarti.jpg",
        body: "Plantar fasciitis is the most common cause of stabbing heel pain, especially with your first steps in the morning. It occurs when the ligament that supports your arch becomes inflamed.",
        detail: "The plantar fascia is a thick, web-like ligament that connects your heel to the front of your foot and acts as a shock absorber. When this ligament is over-stressed from activities like running or prolonged standing, tiny tears can occur, leading to inflammation and pain. At Mountain Spine & Orthopedics, our Florida foot specialists create personalized therapy plans to relieve your pain and address the root cause, helping you stay on your feet.",
        what_sym: "The classic symptom is a sharp, stabbing pain at the bottom of your heel. This pain is usually at its worst right after you get out of bed or after long periods of sitting. While it might ease up after you walk around for a bit, it often returns after standing for a long time or when you stand up after sitting.",
        risk_fac: "You're at a higher risk for plantar fasciitis if you have flat feet or very high arches, if your calf muscles are tight, or if you've recently increased your activity level. Jobs that keep you on your feet all day and wearing shoes with poor support are also major contributors.",
        diagnose: "A diagnosis is usually made based on your medical history and a physical exam. Our specialist will check for points of tenderness in your foot, which can help confirm the cause of your pain. While imaging tests aren't always needed, we may use an ultrasound or offer a complimentary MRI review to rule out other problems like a stress fracture.",
        treatment: "The good news is that most cases of plantar fasciitis improve with simple, consistent, non-surgical care. This includes specific stretching exercises, wearing supportive shoes or custom orthotics, and resting the foot. For persistent pain, we may recommend targeted injections or advanced therapies like shockwave therapy to promote healing.",
        pain_info: "That intense morning pain happens because the plantar fascia tightens up overnight while you sleep. Our treatment plans focus on reducing the inflammation and teaching you stretches and habits to keep the ligament flexible, which helps break that painful cycle.",
        prevent: "Maintaining a healthy weight, choosing supportive shoes, and consistently stretching your calves and arches are the best ways to prevent plantar fasciitis. If you're a runner or very active, be sure to increase your mileage and intensity gradually.",
        why_choose_us: "The foot and ankle specialists at Mountain Spine & Orthopedics are experts in treating stubborn heel pain. We provide patients across Florida with accurate diagnoses and comprehensive, personalized treatment plans. Our goal is to relieve your plantar fasciitis pain and keep you active.",
        schedule: "Don't let heel pain dictate your morning routine. Schedule a consultation with our team for an expert evaluation and a personalized plan to get you back on your feet, pain-free.",
        slug: "heel-pain-plantar-fasciitis",
        forum: [
            {
                post: (
                    <div className="flex flex-col space-y-[16px]">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            What Is Plantar Fasciitis?
                        </h2>
                        <p
                            style={{
                                fontFamily: "var(--font-inter)",
                                fontWeight: 400,
                            }}
                            className="text-[#424959] text-md sm:text-xl"
                        >
                            Plantar Fasciitis is a degenerative inflammatory condition of the
                            plantar fascia. Repetitive overload causes tiny tears at the
                            origin of the fascia on the heel bone, leading to a cycle of
                            inflammation, scarring, and further degeneration. Pain is
                            classically described as a knife like sensation in the heel with
                            the first few steps after waking or after extended sitting. As the
                            fascia warms up, pain may ease, only to return after prolonged
                            standing or activity. Identifying the true source of heel pain is
                            essential because nerve entrapment, fat pad atrophy, and systemic
                            arthritis can mimic plantar fasciitis and require different
                            treatment strategies.
                        </p>
                        <div className="flex flex-col space-y-[40px] mt-[40px] w-full h-full ">
                            <GradientOverlayImage
                                imageData={
                                    "https://mountainspineortho.b-cdn.net/Orthopedic%20Website.jpg"
                                }
                                height="500px"
                                gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
                            />
                            <OutlinedButton text="Do I have this condition?" />
                        </div>
                    </div>
                ),
            },
            {
                post: (
                    <div className="flex flex-col space-y-[40px] w-full ">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            Symptoms of Plantar Fasciitis
                        </h2>
                        <div
                            style={{
                                fontFamily: "var(--font-inter)",
                                fontWeight: 400,
                            }}
                            className="text-[#424959] text-md sm:text-xl"
                        >
                            <ul className="list-disc list-inside space-y-2">
                                <li>
                                    Sharp or stabbing heel pain with the first steps in the morning
                                </li>
                                <li>
                                    Pain that improves after a few minutes of walking but returns
                                    with prolonged standing
                                </li>
                                <li>Tenderness and swelling near the bottom of the heel</li>
                                <li>
                                    Increased discomfort when climbing stairs or after intense
                                    exercise
                                </li>
                                <li>A tight feeling in the calf or Achilles region</li>
                                <li>
                                    Difficulty walking barefoot on hard floors. When left untreated,
                                    plantar fasciitis can alter walking mechanics and trigger
                                    secondary problems such as knee, hip, and lower back strain.
                                </li>
                            </ul>
                        </div>
                        <OutlinedButton text="Find a Treatment" />
                        <GradientOverlayImage
                            imageData={"https://mountainspineortho.b-cdn.net/fixplantf.jpg"}
                            height="500px"
                            gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
                        />
                    </div>
                ),
            },
            {
                post: (
                    <div className="flex flex-col space-y-[16px]">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            Stages of Plantar Fasciitis
                        </h2>
                        <p
                            style={{
                                fontFamily: "var(--font-inter)",
                                fontWeight: 400,
                            }}
                            className="text-[#424959] text-md sm:text-xl"
                        >
                            Early stage – intermittent heel pain that flares after new
                            activities or long days on the feet. Progressive stage – daily pain,
                            tightening of the calf and arch, and swelling near the heel pad.
                            <br />
                            <br /> Chronic stage – persistent inflammation, thickening of the
                            fascia, heel spur formation, and compensatory gait changes.
                            <br />
                            <br /> Recognizing your stage enables the care team at Mountain
                            Spine & Orthopedics to tailor treatments from basic stretching to
                            advanced regenerative options exactly to your needs.
                        </p>
                    </div>
                ),
            },
            {
                post: (
                    <div className="flex flex-col space-y-[16px]">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            Plantar Fasciitis Treatments
                        </h2>
                        <p
                            style={{
                                fontFamily: "var(--font-inter)",
                                fontWeight: 400,
                            }}
                            className="text-[#424959] text-md sm:text-xl"
                        >
                            Initial therapy focuses on reducing inflammation and restoring
                            flexibility. Key components include doctor guided stretching,
                            massage of the plantar fascia and calf, ice massage, and
                            nonsteroidal anti inflammatory medication. Night splints hold the
                            foot in gentle dorsiflexion during sleep, preventing painful
                            morning tightness. Custom orthotic inserts cushion the heel and
                            support the arch, while targeted outside rehabilitation strengthens
                            intrinsic foot muscles for long term stability.
                            <br />
                            <br />
                            When conservative care does not provide lasting relief within
                            three to six months, advanced modalities such as extracorporeal
                            shockwave therapy, platelet rich plasma injections, or ultrasound
                            guided needle tenotomy can stimulate tissue healing. Surgical
                            release of the plantar fascia is reserved for rare, stubborn cases
                            and is performed using minimally invasive techniques that allow
                            rapid return to weight bearing with a structured rehabilitation
                            program.
                        </p>
                    </div>
                ),
            },
            {
                post: (
                    <div className="flex flex-col space-y-[16px]">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            Schedule a Consultation Today
                        </h2>
                        <p
                            style={{
                                fontFamily: "var(--font-inter)",
                                fontWeight: 400,
                            }}
                            className="text-[#424959] text-md sm:text-xl"
                        >
                            Persistent heel pain should not sideline your lifestyle. Early
                            professional intervention can stop Plantar Fasciitis from
                            progressing and return you to comfortable movement. <br />
                            <br /> Contact Mountain Spine & Orthopedics today at (561) 223-9959 or complete our simple online consultation form.
                            <br />
                            <br /> Our dedicated specialists will evaluate your symptoms,
                            provide an accurate diagnosis, and craft a comprehensive treatment
                            plan that relieves pain, restores function, and gets you back on
                            your feet with confidence.
                        </p>
                    </div>
                ),
            },
        ],
        side_img:
            "https://mountainspineortho.b-cdn.net/Orthopedic%20Website%20(1).jpg",
        keywords: [
            "plantar fasciitis relief", "heel pain treatment Florida", "foot arch pain", "stabbing heel pain", "orthotics for plantar fasciitis", "heel spur symptoms", "foot and ankle specialist", "morning foot pain",
        ],
        metaTitle: "Plantar Fasciitis Heel Pain Relief | Mountain Spine Florida",
        metaDesc: "Plantar fasciitis causes stabbing heel pain, especially in the morning. Our Florida foot specialists offer effective treatments to relieve pain and restore mobility.",
    },
    {
        title: "Treating Achilles Tendonitis Pain",
        tag: "Foot",
        card_img: "https://mountainspineortho.b-cdn.net/public/tendo.png",
        inTxt_img: "https://mountainspineortho.b-cdn.net/public/tendo2.jpeg",
        body: "Achilles tendonitis is an overuse injury affecting the tendon that connects your calf muscles to your heel, causing pain and stiffness at the back of the ankle.",
        detail: "The Achilles tendon is the largest tendon in your body, and it's put under a lot of stress when you walk, run, and jump. When you do too much, too soon, this tendon can become irritated and inflamed—a condition called tendonitis. It's common in runners and 'weekend warriors.' At Mountain Spine & Orthopedics, our foot and ankle team provides expert diagnosis and care to calm the inflammation and get you back to your activities safely.",
        what_sym: "You'll likely feel a mild ache or burning pain at the back of your leg or above your heel, especially after activity. The area may be tender and stiff, particularly in the morning. Over time, the pain can become more severe and constant, and you might notice a thickening of the tendon.",
        risk_fac: "Suddenly increasing the intensity or duration of your exercise is a top risk factor. Having naturally tight calf muscles puts extra strain on the tendon. Other factors include having flat feet or bone spurs on your heel, which can rub against the tendon.",
        diagnose: "Diagnosis typically starts with a physical exam. Our specialist will gently press on the area to check for tenderness and may assess your foot's flexibility and range of motion. In some cases, we may use an ultrasound or offer a complimentary MRI review to see the extent of the inflammation or damage to the tendon.",
        treatment: "The first step is to reduce the strain on the tendon with rest, ice, and anti-inflammatory medication. Working with a physical therapist is key, and we will provide a referral. This will include specific stretching and strengthening exercises (especially 'heel drops'). If pain persists, we offer advanced non-surgical options like shockwave therapy (ESWT) or platelet-rich plasma (PRP) injections to stimulate healing.",
        pain_info: "Achilles tendon pain often starts as a minor issue but can become chronic if you ignore it. The morning stiffness is a classic sign of inflammation. Our goal is to address the issue before it progresses to a more serious condition like a tendon rupture.",
        prevent: "The best prevention is to warm up properly before exercise and to increase your activity level gradually. Regularly stretching your calf muscles is crucial to keep the tendon flexible. Wearing supportive shoes and strengthening your calves can also make a big difference.",
        why_choose_us: "The specialists at Mountain Spine & Orthopedics are experts in treating Achilles tendon injuries. We offer patients across Florida a complimentary imaging review and the most effective conservative and regenerative treatments, helping you avoid surgery and return to an active life.",
        schedule: "If pain at the back of your ankle is holding you back, schedule a consultation with our team. We'll find the cause of your pain and create a personalized recovery plan.",
        slug: "achilles-tendon-pain",
        forum: [
            {
                post: (
                    <div className="flex flex-col space-y-[16px]">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            What Is Achilles Tendonitis?
                        </h2>
                        <p
                            style={{
                                fontFamily: "var(--font-inter)",
                                fontWeight: 400,
                            }}
                            className="text-[#424959] text-md sm:text-xl"
                        >
                            Achilles Tendonitis is a degenerative inflammatory condition
                            resulting from cumulative overload. Two primary patterns occur:
                            insertional tendonitis, which affects the lower 2 cm where the
                            tendon anchors into the heel bone, and mid-substance tendonitis,
                            which involves the region 2–6 cm above the heel. In both cases,
                            collagen fibers lose their organized alignment, forming
                            thickened, painful nodules. Patients usually describe morning
                            “start-up pain” that improves with gentle movement but returns
                            after intense exercise or long periods on their feet. Properly
                            distinguishing Achilles Tendonitis from conditions such as
                            Haglund’s deformity, retrocalcaneal bursitis, or partial tendon
                            rupture is essential to selecting the right treatment.
                        </p>
                        <div className="flex flex-col space-y-[40px] mt-[40px]">
                            <GradientOverlayImage
                                imageData={"https://mountainspineortho.b-cdn.net/achilles.jpg"}
                                height="500px"
                                gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
                            />
                            <OutlinedButton text="Do I have this condition?" />
                        </div>
                    </div>
                ),
            },
            {
                post: (
                    <div className="flex flex-col space-y-[40px]">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            Symptoms of Achilles Tendonitis
                        </h2>
                        <div
                            style={{
                                fontFamily: "var(--font-inter)",
                                fontWeight: 400,
                            }}
                            className="text-[#424959] text-md sm:text-xl"
                        >
                            <ul className="list-disc list-inside space-y-2">
                                <li>
                                    Persistent or burning pain at the back of the heel or lower
                                    calf, worse with activity
                                </li>
                                <li>
                                    Morning stiffness that loosens after a few minutes of walking
                                </li>
                                <li>
                                    Localized swelling or a thickened “cord-like” feeling in the
                                    tendon
                                </li>
                                <li>Tender nodules or bumps that hurt when squeezed</li>
                                <li>Pain when rising on tiptoes or during uphill running</li>
                                <li>
                                    A creaking or crackling sensation (crepitus) during ankle
                                    movement
                                </li>
                                <li>
                                    Limited ankle dorsiflexion (when the foot flexes upward) due to
                                    tight calf muscles. Ignoring these signs can lead to tendon
                                    degeneration (tendinosis) and elevate the risk of full rupture—a
                                    surgical emergency.
                                </li>
                            </ul>
                        </div>
                        <OutlinedButton text="Find a Treatment" />
                        <GradientOverlayImage
                            imageData={"https://mountainspineortho.b-cdn.net/tendon2.jpg"}
                            height="500px"
                            gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
                        />
                    </div>
                ),
            },
            {
                post: (
                    <div className="flex flex-col space-y-[16px]">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            Stages of Achilles Tendonitis
                        </h2>
                        <div
                            style={{
                                fontFamily: "var(--font-inter)",
                                fontWeight: 400,
                            }}
                            className="text-[#424959] text-md sm:text-xl"
                        >
                            <ol className="list-decimal list-inside space-y-2">
                                <li>
                                    Reactive Stage – Sudden overload triggers temporary swelling
                                    of the tendon sheath; pain appears after an unusually hard
                                    workout.
                                </li>
                                <li>
                                    Early Degenerative Stage – Collagen fibers begin to
                                    disorganize; pain emerges more frequently, and a small lump may
                                    form.
                                </li>
                                <li>
                                    Late Degenerative Stage – Significant thickening, chronic
                                    inflammation, and scar tissue reduce elasticity; daily pain and
                                    weakness limit activity.
                                </li>
                                <li>
                                    Pre-Rupture Stage – Multiple micro-tears create severe pain,
                                    audible snapping sensations, or sudden loss of push-off power.
                                </li>
                            </ol>
                            <p className="mt-4">
                                Determining your stage helps Mountain Spine & Orthopedics
                                match therapies—from conservative care to minimally invasive
                                procedures—precisely to your needs.
                            </p>
                        </div>
                    </div>
                ),
            },
            {
                post: (
                    <div className="flex flex-col space-y-[16px]">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            Achilles Tendonitis Treatments
                        </h2>
                        <div
                            style={{
                                fontFamily: "var(--font-inter)",
                                fontWeight: 400,
                            }}
                            className="text-[#424959] text-md sm:text-xl"
                        >
                            <ul className="list-disc list-inside space-y-2">
                                <li>
                                    Phase 1: Calm Inflammation – Activity modification, ice
                                    massage, topical or oral NSAIDs, and a structured
                                    eccentric-calf-loading program proven to stimulate tendon
                                    remodeling.
                                </li>
                                <li>
                                    Phase 2: Correct Mechanics – Customized orthotics or heel lifts
                                    reduce tensile load; our physical therapists mobilize tight
                                    ankle joints and teach calf-lengthening stretches.
                                </li>
                                <li>
                                    Phase 3: Regenerate Tissue – For persistent cases, we offer
                                    ultrasound-guided platelet-rich plasma (PRP) injections,
                                    extracorporeal shock-wave therapy, and percutaneous needle
                                    micro-tenotomy to trigger new collagen growth.
                                </li>
                                <li>
                                    Phase 4: Restore Strength & Return to Sport – Progressive
                                    strengthening, plyometrics, and sport-specific drills under
                                    physiotherapist supervision ensure a safe comeback.
                                </li>
                                <li>
                                    Phase 5: Surgical Options (When Necessary) – Minimally invasive
                                    debridement, tendon-splitting repair, or reconstruction with a
                                    flexor-hallucis-longus tendon transfer for severe degeneration
                                    or partial tears. Most patients walk in a boot within days and
                                    transition to sneakers by week eight, guided by our on-site
                                    rehab team.
                                </li>
                            </ul>
                        </div>
                    </div>
                ),
            },
            {
                post: (
                    <div className="flex flex-col space-y-[16px]">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            Schedule a Consultation Today
                        </h2>
                        <p
                            style={{
                                fontFamily: "var(--font-inter)",
                                fontWeight: 400,
                            }}
                            className="text-[#424959] text-md sm:text-xl"
                        >
                            Heel or calf pain that lingers more than a few days deserves
                            expert evaluation early treatment preserves tendon integrity and
                            prevents rupture.
                            <br />
                            <br /> Contact Mountain Spine & Orthopedics today at (561) 223-9959 or complete our simple online consultation form.
                            <br />
                            <br />
                            Our experienced specialists will confirm your diagnosis, explain
                            every treatment option, and design a personalized plan that
                            relieves pain, rebuilds tendon strength, and returns you to
                            pain-free performance.
                        </p>
                    </div>
                ),
            },
        ],
        side_img:
            "https://mountainspineortho.b-cdn.net/Orthopedic%20Website%20(4).png",
        keywords: [
            "achilles tendonitis treatment", "pain in back of heel", "ankle tendonitis Florida", "calf pain when running", "PRP for tendonitis", "shockwave therapy", "foot and ankle specialist", "running injury treatment",
        ],
        metaTitle: "Achilles Tendonitis Treatment in Florida | Mountain Spine",
        metaDesc: "Achilles tendonitis causes heel and ankle pain from overuse. Our Florida specialists offer advanced treatments like PRP and ESWT to restore tendon health.",
    },
    {
        title: "Relief for Painful Flat Feet (Fallen Arches)",
        tag: "Foot",
        card_img: "https://mountainspineortho.b-cdn.net/public/flat2.webp",
        inTxt_img: "https://mountainspineortho.b-cdn.net/public/flat.webp",
        body: "Flat feet, also known as 'fallen arches,' is a condition where the arch of the foot collapses. When this becomes painful, it can lead to tired feet and other body aches.",
        detail: "Many people have flat feet and never experience problems. However, for some, the lack of an arch can put significant strain on the tendons in the foot, especially the posterior tibial tendon which is a primary arch supporter. This can lead to what's known as adult-acquired flatfoot, causing pain and alignment issues. At Mountain Spine & Orthopedics, our foot specialists can determine the cause of your pain and create a plan to support your feet and improve your comfort.",
        what_sym: "If your flat feet are causing problems, you'll likely feel pain along the inside of your arch and ankle. Your feet may feel tired or achy after standing for a long time. Because flat feet can affect your body's alignment, you might also experience pain in your calves, knees, or even your lower back.",
        risk_fac: "Some people are simply born with flat feet. For others, arches can fall over time due to age, an injury to the foot or ankle, or conditions like arthritis. Being overweight also puts extra stress on the arches.",
        diagnose: "Our specialist will examine your feet while you stand and walk to observe your foot structure and mechanics. If you're experiencing pain, we will likely take weight-bearing X-rays to get a clear look at the alignment of your bones. This helps us plan the most effective treatment.",
        treatment: "Treatment is focused on relieving pain and providing support. This often involves non-surgical options like wearing more supportive shoes, using over-the-counter or custom-made orthotic inserts, and doing specific stretching exercises. If a damaged tendon is the cause and pain persists, surgery may be considered to repair it and restore the arch.",
        pain_info: "The pain from flat feet is often due to strained tendons and ligaments that are working overtime to support your body without a proper arch. This can lead to chronic aches and inflammation. Our goal is to provide that missing support to relieve the strain.",
        prevent: "If you have flexible flat feet that aren't causing pain, the best prevention is to wear supportive footwear and maintain a healthy weight. Regularly stretching your Achilles tendon, which can contribute to flat feet when it's tight, is also very helpful.",
        why_choose_us: "The foot and ankle specialists at Mountain Spine & Orthopedics are experts in managing painful flat feet. For patients across Florida, we offer comprehensive evaluations, complimentary imaging reviews, and a full range of treatments from custom orthotics to complex reconstructive surgery. Our goal is to restore your alignment and help you move without pain.",
        schedule: "If tired, achy feet and arch pain are holding you back, schedule an appointment with our team. We'll provide a detailed evaluation and find the right support strategy for you.",
        slug: "flat-feet-pain",
        forum: [
            {
                post: (
                    <div className="flex flex-col space-y-[16px]">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            What Are Flat Feet?
                        </h2>
                        <p
                            style={{
                                fontFamily: "var(--font-inter)",
                                fontWeight: 400,
                            }}
                            className="text-[#424959] text-md sm:text-xl"
                        >
                            Flat feet fall into three broad categories. Flexible flat feet
                            maintain an arch when the foot is off the ground but flatten under
                            body weight. Rigid flat feet lack an arch whether seated or
                            standing, often because of tarsal bone fusion or severe
                            arthritis. Adult acquired flatfoot usually appears later in life
                            when the posterior tibial tendon—the primary dynamic supporter of
                            the arch weakens or tears. People with flat feet frequently notice
                            rapid shoe wear along the inner edge, aching or swelling along the
                            arch or inside ankle, and a tendency to stand or walk with the
                            toes pointed outward. A precise diagnosis is essential because
                            each subtype responds to different interventions.
                        </p>
                        <div className="flex flex-col space-y-[40px] mt-[40px]">
                            <GradientOverlayImage
                                imageData={
                                    "https://mountainspineortho.b-cdn.net/flatfoot.png"
                                }
                                height="500px"
                                objectFit="contain"
                                gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
                            />
                            <OutlinedButton text="Do I have this condition?" />
                        </div>
                    </div>
                ),
            },
            {
                post: (
                    <div className="flex flex-col space-y-[40px]">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            Symptoms of Flat Feet
                        </h2>
                        <p
                            style={{
                                fontFamily: "var(--font-inter)",
                                fontWeight: 400,
                            }}
                            className="text-[#424959] text-md sm:text-xl"
                        >
                            Typical signs include tired, aching feet after prolonged
                            standing, persistent pain or swelling along the inner ankle and
                            arch, heel or arch stiffness first thing in the morning, frequent
                            ankle sprains, knee or lower back discomfort from altered gait,
                            difficulty fitting into regular shoes because of foot widening,
                            and thickened skin under the big toe or along the inside border of
                            the foot. Ignoring these symptoms can invite complications such as
                            plantar fasciitis, shin splints, posterior tibial tendonitis, and
                            early joint arthritis.
                        </p>
                        <OutlinedButton text="Find a Treatment" />
                        <GradientOverlayImage
                            imageData={
                                "https://mountainspineortho.b-cdn.net/flatfoot.jpg"
                            }
                            height="500px"
                            objectFit="contain"
                            gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
                        />
                    </div>
                ),
            },
            {
                post: (
                    <div className="flex flex-col space-y-[16px]">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            Stages of Flat Feet Progression
                        </h2>
                        <p
                            style={{
                                fontFamily: "var(--font-inter)",
                                fontWeight: 400,
                            }}
                            className="text-[#424959] text-md sm:text-xl"
                        >
                            Flat foot deformity generally advances through four recognizable
                            stages. In Stage I the posterior tibial tendon is inflamed but
                            still functional, and the arch collapses only during strenuous
                            activity. Stage II brings a flexible deformity in which the tendon
                            elongates, the heel drifts outward, and the arch flattens fully
                            under load, though manual realignment is still possible.
                            <br />
                            <br />
                            Stage III represents a rigid deformity in which the tendon is
                            severely degenerated or torn, the arch collapse becomes fixed, and
                            arthritis develops in the subtalar and midfoot joints. Stage IV
                            extends the collapse into the ankle itself, producing valgus tilt
                            and advanced arthritic change. Understanding your stage allows
                            our specialists to match treatment, from conservative bracing to
                            corrective surgery, precisely to your needs.
                        </p>
                    </div>
                ),
            },
            {
                post: (
                    <div className="flex flex-col space-y-[16px]">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            Flat Feet Treatments
                        </h2>
                        <p
                            style={{
                                fontFamily: "var(--font-inter)",
                                fontWeight: 400,
                            }}
                            className="text-[#424959] text-md sm:text-xl"
                        >
                            Early care focuses on non surgical measures. Custom molded
                            orthotics or ankle foot braces cradle the arch and limit
                            overpronation, while calf stretching and posterior tibial
                            strengthening exercises improve muscular support. Many patients benefit from guided exercise programs that include balance drills and gait retraining techniques that
                            stabilize the entire lower limb chain. When painful flare ups
                            occur, short courses of anti inflammatory medication or precisely
                            guided corticosteroid injections reduce swelling and restore
                            mobility, and footwear counseling ensures you select shoes with
                            firm heel counters, ample toe boxes, and built in arch support.
                            For stubborn cases, regenerative therapies such as platelet rich
                            plasma injections or extracorporeal shock wave therapy stimulate
                            tendon healing. If the deformity is rigid or continues to progress
                            despite diligent conservative care, surgical correction may be
                            necessary. Our surgeons perform realignment procedures that can
                            include calcaneal osteotomy to reposition the heel, tendon
                            transfer or reconstruction to replace a degenerated posterior
                            tibial tendon, and midfoot or subtalar fusion when severe
                            arthritis is present. Most patients are allowed to bear weight in
                            a protective boot within a few weeks and transition to supportive
                            footwear under the guidance of our in house rehabilitation team.
                        </p>
                    </div>
                ),
            },
            {
                post: (
                    <div className="flex flex-col space-y-[16px]">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            Schedule a Consultation Today
                        </h2>
                        <p
                            style={{
                                fontFamily: "var(--font-inter)",
                                fontWeight: 400,
                            }}
                            className="text-[#424959] text-md sm:text-xl"
                        >
                            Foot fatigue, arch pain, or ankle instability do not have to limit
                            your daily life. Early expert evaluation can halt flat foot
                            progression and protect the joints throughout your lower body.
                            <br />
                            <br /> Contact Mountain Spine & Orthopedics today at (561) 223-9959
                             or complete our simple online consultation form.
                            <br />
                            <br /> Our multidisciplinary team will confirm your diagnosis,
                            explain every treatment option, and design a personalized plan
                            that supports your arches, relieves discomfort, and helps you
                            walk, run, and work without pain.
                        </p>
                    </div>
                ),
            },
        ],
        side_img:
            "https://mountainspineortho.b-cdn.net/Orthopedic%20Website%20(6).png",
        keywords: [
            "painful flat feet", "fallen arches treatment", "pes planus pain", "custom orthotics Florida", "posterior tibial tendonitis", "foot arch pain", "overpronation relief", "foot and ankle surgeon",
        ],
        metaTitle: "Painful Flat Feet Treatment | Mountain Spine Orthopedics",
        metaDesc: "Painful flat feet or fallen arches can cause widespread issues. Our Florida foot specialists offer custom orthotics and advanced surgery to restore alignment.",
    },
    {
        title: "Minimally Invasive Ankle Arthroscopy for Pain Relief",
        tag: "Foot",
        card_img:
            "https://mountainspineortho.b-cdn.net/Orthopedic%20Website%20(11).png",
        inTxt_img:
            "https://mountainspineortho.b-cdn.net/Orthopedic%20Website%20(11).png",
        body: "Ankle arthroscopy is a minimally invasive 'keyhole' surgery that allows doctors to diagnose and treat joint problems, offering less pain and a faster recovery.",
        detail: "Ankle arthroscopy uses a tiny camera (arthroscope) and small surgical tools to work inside the ankle joint through very small incisions. This advanced technique allows our surgeons to see and repair damage to cartilage, ligaments, and bone without the need for large, open surgery. It's an effective way to treat chronic ankle pain, instability, and stiffness, helping patients get back on their feet sooner.",
        what_sym: "Ankle arthroscopy isn't a condition, but a treatment for symptoms that don't improve with conservative care. You might be a candidate if you have persistent ankle pain, a feeling of 'catching' or 'locking' in the joint, chronic ankle instability that leads to frequent sprains, or swelling that just won't go away.",
        risk_fac: "This is a treatment. The conditions leading to it are often caused by previous injuries like severe ankle sprains or fractures that didn't heal properly, or from 'wear and tear' arthritis that creates painful bone spurs or loose cartilage.",
        diagnose: "The decision to recommend ankle arthroscopy is made after a thorough evaluation. This includes a physical exam and imaging studies. An MRI is particularly useful as it gives a detailed view of the ankle's soft tissues. We offer a complimentary MRI review to help determine if arthroscopy is the right choice for you.",
        treatment: "During the procedure, your surgeon can remove loose pieces of bone or cartilage, smooth out damaged cartilage, treat bone spurs that cause impingement, and even repair ligaments. Because it's minimally invasive, there is less scarring and post-operative pain, and a carefully guided outside rehabilitation program can restore your strength and mobility efficiently.",
        pain_info: "The goal of ankle arthroscopy is to relieve the chronic pain caused by an internal joint problem. By fixing the underlying mechanical issue, the procedure can provide lasting relief from the aching, grinding, or sharp pains that were limiting your activity.",
        prevent: "Preventing the need for arthroscopy involves protecting your ankles from injury. This includes wearing supportive footwear, strengthening the muscles around the ankle, and properly rehabilitating any ankle sprains to avoid long-term instability.",
        why_choose_us: "The foot and ankle surgeons at Mountain Spine & Orthopedics are highly skilled in advanced, minimally invasive ankle arthroscopy. We offer patients in Florida a complimentary MRI review to determine if this procedure is right for you. Our goal is to fix your ankle problem with less pain and a faster recovery.",
        schedule: "If chronic ankle pain is holding you back, contact Mountain Spine & Orthopedics. Our specialists can provide an expert evaluation and determine if you are a candidate for ankle arthroscopy.",
        slug: "ankle-arthroscopy-recovery-pain",
        forum: [
            {
                post: (
                    <div className="flex flex-col space-y-[16px]">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            What Is Ankle Arthroscopy?
                        </h2>
                        <p
                            style={{
                                fontFamily: "var(--font-inter)",
                                fontWeight: 400,
                            }}
                            className="text-[#424959] text-md sm:text-xl"
                        >
                            Ankle arthroscopy uses a rigid fiber optic scope connected to a
                            digital camera and light source to visualize the interior of the
                            joint on a high resolution monitor. The surgeon works through
                            portals typically measuring less than one centimeter, guiding
                            instruments such as graspers, shavers, micro drills, and
                            radiofrequency probes to perform precise repairs. Common
                            indications include persistent ankle pain after a sprain,
                            osteochondral defects, impingement caused by bone spurs at the
                            front or back of the joint, loose fragments of cartilage or bone
                            that catch during movement, and early synovitis associated with
                            inflammatory arthritis. By treating these conditions early, ankle
                            arthroscopy can delay or even eliminate the need for more
                            extensive surgery such as ankle fusion or total ankle replacement.
                        </p>
                        <div className="flex flex-col space-y-[40px] mt-[40px]">
                            <GradientOverlayImage
                                imageData={
                                    "https://mountainspineortho.b-cdn.net/anklereplace.jpg"
                                }
                                height="500px"
                                gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
                            />
                            <OutlinedButton text="Do I need this surgery?" />
                        </div>
                    </div>
                ),
            },
            {
                post: (
                    <div className="flex flex-col space-y-[40px]">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            When Is Ankle Arthroscopy Recommended?
                        </h2>
                        <p
                            style={{
                                fontFamily: "var(--font-inter)",
                                fontWeight: 400,
                            }}
                            className="text-[#424959] text-md sm:text-xl"
                        >
                            Patients considered for ankle arthroscopy usually report ongoing
                            deep ankle pain that fails to improve with rest, physical
                            therapy, and medication; repeated episodes of the ankle giving way
                            because of chronic ligament laxity; locking, catching, or
                            grinding sensations that suggest loose bodies or cartilage flaps;
                            swelling that persists long after the original injury; or painful
                            limits in ankle motion caused by anterior or posterior bone spurs.
                            A careful clinical exam combined with targeted imaging confirms
                            whether arthroscopy is the most effective next step.
                        </p>
                        <OutlinedButton text="Find a Treatment" />
                        <GradientOverlayImage
                            imageData={
                                "https://mountainspineortho.b-cdn.net/ankleant3.jpg"
                            }
                            height="500px"
                            gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
                        />
                    </div>
                ),
            },
            {
                post: (
                    <div className="flex flex-col space-y-[16px]">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            Injury Progression and Recovery Timeline
                        </h2>
                        <p
                            style={{
                                fontFamily: "var(--font-inter)",
                                fontWeight: 400,
                            }}
                            className="text-[#424959] text-md sm:text-xl"
                        >
                            Most ankle problems begin with an acute injury such as a sprain
                            or fracture that heals incompletely, leaving residual scar tissue,
                            cartilage defects, or subtle bone overgrowth. When conservative
                            care fails, ankle arthroscopy addresses these residual issues
                            before they advance to diffuse arthritis. Recovery unfolds in
                            three predictable phases. The first week focuses on pain control
                            and gentle motion while weight bearing occurs in a removable
                            boot. Weeks two through six emphasize progressive strengthening,
                            balance training, and gradual transition from the boot to
                            supportive athletic shoes. By the third month most patients resume
                            running, court sports, or occupational tasks that require
                            prolonged standing, with guidance for optimal recovery
                            therapy team.
                        </p>
                    </div>
                ),
            },
            {
                post: (
                    <div className="flex flex-col space-y-[16px]">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            Ankle Arthroscopy Procedures
                        </h2>
                        <p
                            style={{
                                fontFamily: "var(--font-inter)",
                                fontWeight: 400,
                            }}
                            className="text-[#424959] text-md sm:text-xl"
                        >
                            Not every ankle problem requires surgery, so we exhaust
                            nonsurgical measures first, including targeted outside rehabilitation,
                            ultrasound guided corticosteroid or platelet rich plasma
                            injections, custom bracing, and gait retraining. When imaging
                            shows mechanical impingement, unstable cartilage, or loose
                            debris, arthroscopy becomes the gold standard. Our surgeons use
                            state of the art 4K camera systems, biologic adhesives, and micro
                            fracture drilling techniques that stimulate new cartilage growth,
                            all performed through incisions so small they often require only
                            adhesive strips rather than sutures. After surgery patients
                            follow a tailored rehabilitation plan that blends early protected
                            motion with incremental loading to restore full strength and
                            flexibility without overstressing the healing tissues.
                        </p>
                    </div>
                ),
            },
            {
                post: (
                    <div className="flex flex-col space-y-[16px]">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            Schedule a Consultation Today
                        </h2>
                        <p
                            style={{
                                fontFamily: "var(--font-inter)",
                                fontWeight: 400,
                            }}
                            className="text-[#424959] text-md sm:text-xl"
                        >
                            Persistent ankle pain, swelling, or instability should not
                            compromise your lifestyle. Early expert evaluation can prevent
                            minor joint problems from progressing to disabling arthritis.{" "}
                            <br />
                            <br /> Contact Mountain Spine & Orthopedics today at (561) 223-9959 or complete our simple online consultation form.
                            <br />
                            <br />
                            Our fellowship trained foot and ankle specialists will review your
                            imaging, perform a comprehensive exam, and explain whether ankle
                            arthroscopy or another advanced treatment can give you lasting
                            relief and a confident return to work, sport, and everyday life.
                        </p>
                    </div>
                ),
            },
        ],
        side_img:
            "https://mountainspineortho.b-cdn.net/Orthopedic%20Website%20(7).jpg",
        keywords: [
            "ankle arthroscopy Florida", "minimally invasive ankle surgery", "ankle impingement surgery", "osteochondral lesion treatment", "chronic ankle instability", "ankle scope", "foot and ankle surgeon", "ankle pain treatment",
        ],
        metaTitle: "Ankle Arthroscopy in Florida | Mountain Spine Orthopedics",
        metaDesc: "Ankle arthroscopy can relieve chronic ankle pain and instability. Our Florida surgeons perform this minimally invasive procedure for a faster recovery.",
    },
    {
        title: "Relief for Painful Hammertoes",
        tag: "Foot",
        card_img:
            "https://mountainspineortho.b-cdn.net/Orthopedic%20Website%20(12).png",
        inTxt_img:
            "https://mountainspineortho.b-cdn.net/Orthopedic%20Website%20(12).png",
        body: "A hammertoe is a deformity that causes your toe to bend or curl downward instead of pointing forward, which can lead to painful corns and calluses.",
        detail: "A hammertoe develops from an imbalance in the muscles and tendons that hold your toe straight. This causes the middle joint of the toe to bend into a fixed, hammer-like shape. The top of this bent joint often rubs against the inside of your shoes, causing irritation and pain. While ill-fitting shoes are a common culprit, the condition can also be inherited. At Mountain Spine & Orthopedics, our foot specialists can help straighten your toe and relieve the painful pressure.",
        what_sym: "The most obvious symptom is the visible bend in the toe. This often leads to pain on the top of the toe where it rubs on footwear, and the formation of painful corns or calluses. In severe cases, it can be difficult to move the toe or find shoes that don't hurt.",
        risk_fac: "Wearing shoes that are too short or narrow is the biggest risk factor, as it forces your toes into a bent position. The risk also increases with age and is more common in women. A previous toe injury or certain types of arthritis can also lead to hammertoes.",
        diagnose: "Diagnosis is typically straightforward and involves a physical examination of your foot. Our specialist will assess the toe's flexibility to see if it can still be straightened. X-rays are often taken to check the alignment of the bones and help guide the best treatment approach.",
        treatment: "If your hammertoe is still flexible, simple changes can help. This includes wearing shoes with a wider and deeper toe box, using pads to cushion the joint, and doing exercises to stretch and strengthen your toe muscles. If the toe is rigid and painful, our surgeons may recommend a simple, minimally invasive procedure to straighten it permanently.",
        pain_info: "Most of the pain from a hammertoe comes from the constant friction between the bent joint and your shoe. This pressure leads to painful corns, which are your skin's way of protecting itself. Our goal is to correct the toe's alignment to eliminate this friction.",
        prevent: "The best prevention is wearing the right shoes. Make sure there is about a half-inch of space between your longest toe and the end of the shoe. Avoid shoes with pointed toes and high heels that crowd your forefoot.",
        why_choose_us: "The foot and ankle specialists at Mountain Spine & Orthopedics are experts in correcting painful hammertoes. We offer patients in Florida a full range of treatments, from conservative care to advanced, minimally invasive surgical techniques. With a complimentary consultation, we can help you walk in comfort again.",
        schedule: "If painful hammertoes are making it hard to wear shoes and stay active, contact our team. Our specialists will provide an expert evaluation and a personalized plan for relief.",
        slug: "hammertoes-foot-pain",
        forum: [
            {
                post: (
                    <div className="flex flex-col space-y-[16px]">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            What Are Hammertoes?
                        </h2>
                        <p
                            style={{
                                fontFamily: "var(--font-inter)",
                                fontWeight: 400,
                            }}
                            className="text-[#424959] text-md sm:text-xl"
                        >
                            Hammertoes most often affect the second third or fourth toes and
                            can be either flexible or rigid. In the flexible stage you can
                            still straighten the toe with your fingers, although it quickly
                            returns to a bent position when pressure is released. In the semi
                            rigid stage stiffness increases and pain becomes more frequent
                            with activity. In the rigid stage the joint locks in place, corns
                            harden, and shoes become difficult to wear. Although hammertoes
                            can arise in isolation they often occur alongside bunions or arch
                            imbalance which must be addressed simultaneously for lasting
                            relief.
                        </p>
                        <div className="flex flex-col space-y-[40px] mt-[40px]">
                            <GradientOverlayImage
                                imageData={
                                    "https://mountainspineortho.b-cdn.net/hammertoe3.jpg"
                                }
                                height="500px"
                                gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
                            />
                            <OutlinedButton text="Do I have this condition?" />
                        </div>
                    </div>
                ),
            },
            {
                post: (
                    <div className="flex flex-col space-y-[40px]">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            Symptoms of Hammertoes
                        </h2>
                        <p
                            style={{
                                fontFamily: "var(--font-inter)",
                                fontWeight: 400,
                            }}
                            className="text-[#424959] text-md sm:text-xl"
                        >
                            Early signs include a noticeable upward bump at the middle of the
                            toe, redness or irritation on the top of the joint, and soreness
                            that worsens in narrow shoes or high heels. As the condition
                            advances you may feel a sharp burning pain when walking, develop
                            thickened skin at the toe tip, or experience cramps in the ball of
                            the foot as the metatarsal heads bear extra load. Chronic
                            hammertoes can also cause the affected toe to overlap its
                            neighbor, leading to further crowding and friction.
                        </p>
                        <OutlinedButton text="Find a Treatment" />
                        <GradientOverlayImage
                            imageData={
                                "https://mountainspineortho.b-cdn.net/hammertoe2.jpg"
                            }
                            height="500px"
                            gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
                        />
                    </div>
                ),
            },
            {
                post: (
                    <div className="flex flex-col space-y-[16px]">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            Stages of Hammertoe Progression
                        </h2>
                        <p
                            style={{
                                fontFamily: "var(--font-inter)",
                                fontWeight: 400,
                            }}
                            className="text-[#424959] text-md sm:text-xl"
                        >
                            Stage one involves a flexible deformity with occasional discomfort
                            that improves after removing tight shoes. Stage two brings semi
                            rigid change with daily pain and limited toe motion. Stage three
                            results in a rigid deformity where the joint cannot be
                            straightened by hand and corns or calluses become persistent.
                            Recognizing your stage allows the specialists at Mountain Spine &
                            Orthopedics to match treatment intensity to the exact severity of
                            your condition.
                        </p>
                    </div>
                ),
            },
            {
                post: (
                    <div className="flex flex-col space-y-[16px]">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            Hammertoe Treatments
                        </h2>
                        <p
                            style={{
                                fontFamily: "var(--font-inter)",
                                fontWeight: 400,
                            }}
                            className="text-[#424959] text-md sm:text-xl"
                        >
                            Conservative management aims to reduce pressure and restore tendon
                            balance. Wider toe box shoes with soft uppers prevent rubbing
                            while custom orthotic inserts offload the ball of the foot. Toe
                            spacers and prefabricated hammer toe pads cushion prominent joints
                            and night splints gently stretch the flexor tendons during sleep.
                            A outside rehabilitation program focuses on towel scrunches marble pickups and
                            resistance band exercises to strengthen the small muscles that
                            stabilize the toes. When discomfort persists or the toe becomes
                            rigid surgical correction offers a reliable solution. <br />
                            <br /> Our surgeons perform minimally invasive procedures such as
                            flexor to extensor tendon transfer or small joint resection to
                            realign the toe, remove painful corns in the same sitting, and
                            secure the toe with low profile implants that allow early
                            protected weight bearing. Postoperative care includes protective
                            footwear for two to four weeks followed by progressive range of
                            motion and strengthening supervised by our onsite rehabilitation
                            team. Most patients resume regular shoes and low impact activities
                            within six to eight weeks.
                        </p>
                    </div>
                ),
            },
            {
                post: (
                    <div className="flex flex-col space-y-[16px]">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            Schedule a Consultation Today
                        </h2>
                        <p
                            style={{
                                fontFamily: "var(--font-inter)",
                                fontWeight: 400,
                            }}
                            className="text-[#424959] text-md sm:text-xl"
                        >
                            Do not let painful hammertoes dictate your footwear choices or
                            limit your mobility. Early expert evaluation can stop the
                            deformity from worsening and restore natural toe alignment
                            <br />
                            <br /> Contact Mountain Spine & Orthopedics today at (561) 223-9959 or complete our simple online consultation form.
                            <br />
                            <br />
                            Our dedicated foot and ankle team will confirm your diagnosis,
                            explain every treatment option, and create a personalized plan
                            that straightens your toes, relieves pressure, and lets you walk
                            in comfort and confidence once again.
                        </p>
                    </div>
                ),
            },
        ],
        side_img:
            "https://mountainspineortho.b-cdn.net/Orthopedic%20Website%20(7).png",
        keywords: [
            "hammertoe correction", "painful hammertoe relief", "bent toe treatment Florida", "corns on toes", "foot deformity surgery", "minimally invasive foot surgery", "foot and ankle specialist", "toe pain relief",
        ],
        metaTitle: "Hammertoe Correction & Pain Relief | Mountain Spine Florida",
        metaDesc: "Hammertoes are painful, bent toes that rub on shoes. Our Florida foot specialists offer advanced, minimally invasive surgical correction for lasting relief.",
    },
    {
        title: "Urgent Care for Diabetic Foot Ulcers",
        tag: "Foot",
        card_img:
            "https://mountainspineortho.b-cdn.net/Orthopedic%20Website%20(15).jpg",
        inTxt_img:
            "https://mountainspineortho.b-cdn.net/Orthopedic%20Website%20(15).jpg",
        body: "A diabetic foot ulcer is an open sore on the foot—a serious complication of diabetes that requires immediate medical care to prevent infection and amputation.",
        detail: "For people with diabetes, a simple blister or cut on the foot can turn into a non-healing open wound called an ulcer. This happens because of nerve damage (neuropathy), which reduces sensation, and poor circulation, which slows healing. At Mountain Spine & Orthopedics, our dedicated wound care team provides urgent, specialized care to heal these ulcers, prevent serious complications, and protect your health.",
        what_sym: "An ulcer often appears as a round open sore on the bottom of the foot. You might notice drainage from the wound on your socks, along with redness and swelling. A bad odor is a sign of infection. Crucially, because of nerve damage, you may not feel any pain from the ulcer, which is why daily foot checks are essential.",
        risk_fac: "Anyone with diabetes is at risk, but the risk is higher if you have had diabetes for a long time, have trouble managing your blood sugar, or have existing nerve or circulation problems. A history of previous foot ulcers also dramatically increases your risk.",
        diagnose: "Diagnosis involves a careful examination of the wound and the entire foot. Our specialist will assess the ulcer's size and depth and check for signs of infection. We will also test your circulation and nerve sensation. An X-ray or MRI may be needed to see if the infection has reached the bone.",
        treatment: "Treating a diabetic foot ulcer has two main goals: get it to heal and prevent it from coming back. This involves 'off-loading' (taking all pressure off the area), cleaning the wound (debridement), applying special dressings, and managing any infection. Strict blood sugar control is also vital for healing.",
        pain_info: "The most dangerous thing about a diabetic foot ulcer is that it is often painless. Without the warning signal of pain, a sore can go unnoticed and become dangerously infected. It's critical for anyone with diabetes to inspect their feet every single day for any changes.",
        prevent: "Prevention is the number one priority. This includes managing your diabetes, checking your feet daily for any cuts or red spots, wearing properly fitting shoes at all times (never go barefoot), and having your feet checked by a professional regularly.",
        why_choose_us: "Our specialized wound care team at Mountain Spine & Orthopedics provides comprehensive, limb-saving care for diabetic foot ulcers in Florida. We use the most advanced treatments, from off-loading to bioengineered skin substitutes, to heal wounds and prevent amputation. If you have a non-healing foot sore, we are here to help.",
        schedule: "If you have diabetes and notice any sore, blister, or cut on your foot, do not wait. Contact us immediately for an urgent evaluation. Timely and expert care is the key to preventing serious complications.",
        slug: "diabetic-foot-ulcer-care",
        forum: [
            {
                post: (
                    <div className="flex flex-col space-y-[16px]">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            What Are Diabetic Ulcers?
                        </h2>
                        <p
                            style={{
                                fontFamily: "var(--font-inter)",
                                fontWeight: 400,
                            }}
                            className="text-[#424959] text-md sm:text-xl"
                        >
                            Diabetic ulcers are classified as chronic full thickness wounds
                            that penetrate through the dermis. Most appear beneath the
                            metatarsal heads or at the heel where body weight concentrates,
                            but any area exposed to friction or trauma can break down. The
                            ulcers are staged according to depth and tissue involvement. A
                            superficial Grade One ulcer involves only skin, whereas a Grade
                            Four ulcer exposes bone or joint and may already harbor
                            osteomyelitis. Recognizing the exact grade guides both local
                            wound care and systemic treatment decisions.
                        </p>
                        <div className="flex flex-col space-y-[40px] mt-[40px]">
                            <GradientOverlayImage
                                imageData={"https://mountainspineortho.b-cdn.net/ulcer1.jpg"}
                                height="500px"
                                gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
                            />
                            <OutlinedButton text="Do I have this condition?" />
                        </div>
                    </div>
                ),
            },
            {
                post: (
                    <div className="flex flex-col space-y-[40px]">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            Symptoms of Diabetic Ulcers
                        </h2>
                        <p
                            style={{
                                fontFamily: "var(--font-inter)",
                                fontWeight: 400,
                            }}
                            className="text-[#424959] text-md sm:text-xl"
                        >
                            Early signs include a persistent redness or callus that feels
                            slightly moist, a foul odor from bacterial colonization, or
                            drainage spotted inside socks. As the ulcer deepens patients may
                            notice swelling, warmth, or blackened tissue called eschar along
                            the edges. Fever, chills, and increasing pain signal spreading
                            infection that demands urgent medical attention. Any nonhealing
                            foot sore lasting longer than two weeks warrants evaluation by a
                            specialist.
                        </p>
                        <OutlinedButton text="Find a Treatment" />
                        <GradientOverlayImage
                            imageData={"https://mountainspineortho.b-cdn.net/ulcer3.png"}
                            height="500px"
                            gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
                        />
                    </div>
                ),
            },
            {
                post: (
                    <div className="flex flex-col space-y-[16px]">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            Stages of Diabetic Ulcer Progression
                        </h2>
                        <p
                            style={{
                                fontFamily: "var(--font-inter)",
                                fontWeight: 400,
                            }}
                            className="text-[#424959] text-md sm:text-xl"
                        >
                            Stage one involves a flexible deformity with occasional discomfort
                            that improves after removing tight shoes. Stage two brings semi
                            rigid change with daily pain and limited toe motion. Stage three
                            results in a rigid deformity where the joint cannot be
                            straightened by hand and corns or calluses become persistent.
                            Recognizing your stage allows the specialists at Mountain Spine &
                            Orthopedics to match treatment intensity to the exact severity of
                            your condition.
                        </p>
                    </div>
                ),
            },
            {
                post: (
                    <div className="flex flex-col space-y-[16px]">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            Diabetic Ulcer Treatments
                        </h2>
                        <p
                            style={{
                                fontFamily: "var(--font-inter)",
                                fontWeight: 400,
                            }}
                            className="text-[#424959] text-md sm:text-xl"
                        >
                            Comprehensive care begins with aggressive offloading using total
                            contact casts, removable walkers, or custom orthotics that
                            redirect pressure away from the ulcer bed. Debridement removes
                            devitalized tissue and biofilm, creating a clean base for healing.
                            We apply advanced dressings impregnated with silver or iodine to
                            control bacterial load and maintain optimal moisture balance.
                            Negative pressure wound therapy draws edges together and
                            stimulates granulation, while biologic skin substitutes and
                            growth factor gels accelerate closure in stubborn wounds. When
                            poor circulation impedes healing our vascular partners perform
                            minimally invasive angioplasty or bypass to restore blood flow.
                            <br />
                            <br />
                            For confirmed osteomyelitis we combine targeted antibiotics with
                            surgical excision of infected bone if necessary. Throughout
                            recovery our diabetes educators fine tune blood sugar control
                            because tight glycemic management speeds tissue repair and
                            reduces recurrence.
                        </p>
                    </div>
                ),
            },
            {
                post: (
                    <div className="flex flex-col space-y-[16px]">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            Schedule a Consultation Today
                        </h2>
                        <p
                            style={{
                                fontFamily: "var(--font-inter)",
                                fontWeight: 400,
                            }}
                            className="text-[#424959] text-md sm:text-xl"
                        >
                            A diabetic foot ulcer should never be ignored. Prompt specialized
                            care prevents infection, shortens healing time, and safeguards
                            mobility.
                            <br />
                            <br /> Contact Mountain Spine & Orthopedics today at (561) 223-9959
                             or complete our simple online consultation form.
                            <br />
                            <br />
                            Our dedicated wound care experts will evaluate your ulcer, design a
                            personalized treatment plan, and guide you toward rapid healing
                            and lasting limb preservation.
                        </p>
                    </div>
                ),
            },
        ],
        side_img:
            "https://mountainspineortho.b-cdn.net/Orthopedic%20Website%20(8).png",
        keywords: [
            "diabetic foot ulcer", "diabetic wound care Florida", "foot ulcer treatment", "osteomyelitis foot", "peripheral neuropathy care", "limb salvage program", "diabetic foot care specialist", "non-healing foot wound",
        ],
        metaTitle: "Diabetic Foot Ulcer & Wound Care | Mountain Spine Florida",
        metaDesc: "Diabetic foot ulcers require urgent, specialized care. Our Florida wound care team offers advanced treatments to heal ulcers and prevent amputations.",
    },
    {
        title: "Total Ankle Replacement for Arthritis Pain",
        tag: "Foot",
        card_img:
            "https://mountainspineortho.b-cdn.net/Orthopedic%20Website%20(16).jpg",
        inTxt_img:
            "https://mountainspineortho.b-cdn.net/Orthopedic%20Website%20(16).jpg",
        body: "Total ankle replacement is an advanced surgery that relieves severe ankle arthritis pain by replacing the damaged joint with a prosthesis, preserving motion.",
        detail: "For patients with end-stage ankle arthritis, a total ankle replacement (or arthroplasty) can be a life-changing procedure. Unlike ankle fusion, which locks the joint, an ankle replacement aims to preserve a more natural, fluid motion. The surgery involves removing the damaged bone and cartilage and replacing them with a highly engineered artificial joint. Our fellowship-trained surgeons at Mountain Spine & Orthopedics use state-of-the-art technology to ensure precise alignment and help you walk comfortably again.",
        what_sym: "This is a treatment for end-stage ankle arthritis. You may be a candidate if you have severe, near-constant ankle pain that limits your ability to walk, significant ankle stiffness and loss of motion, and pain that no longer responds to non-surgical treatments like bracing or injections.",
        risk_fac: "The most common reason people need an ankle replacement is severe arthritis that has destroyed the joint. This is often 'post-traumatic' arthritis that develops years after a major ankle injury like a fracture. Other causes include osteoarthritis ('wear and tear') and inflammatory conditions like rheumatoid arthritis.",
        diagnose: "The decision for an ankle replacement is made after a careful evaluation, including a physical exam and weight-bearing X-rays that show severe joint damage. We also use specialized CT scans to create a 3D model of your ankle, allowing for a precise, patient-specific surgical plan before the operation even begins.",
        treatment: "The surgery replaces the damaged ends of the tibia (shin bone) and talus (ankle bone) with metal components, and a smooth plastic spacer is placed between them to allow for gliding motion. This preserves the up-and-down movement of the ankle, which protects other joints in the foot and leg from extra stress.",
        pain_info: "The goal of an ankle replacement is to eliminate the grinding, bone-on-bone pain of severe arthritis. By creating a new, smooth joint surface, the surgery provides significant pain relief and allows patients to return to activities like walking, hiking, and cycling with much greater comfort.",
        prevent: "While you can't always prevent arthritis, you can reduce your risk of post-traumatic arthritis by seeking prompt and proper medical care for any significant ankle injury. Maintaining a healthy weight also reduces the daily load on your ankle joints.",
        why_choose_us: "The foot and ankle surgeons at Mountain Spine & Orthopedics are leaders in total ankle replacement in Florida. We utilize cutting-edge, patient-specific technology to achieve the best possible outcomes. With a complimentary imaging review and free second opinion, we can help you make an informed decision about relieving your ankle arthritis pain.",
        schedule: "If severe ankle arthritis is controlling your life, learn about your options. Schedule a consultation with our experienced foot and ankle team to find out if a total ankle replacement is right for you.",
        slug: "ankle-replacement-surgery-pain",
        forum: [
            {
                post: (
                    <div className="flex flex-col space-y-[16px]">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            What Is Ankle Replacement?
                        </h2>
                        <p
                            style={{
                                fontFamily: "var(--font-inter)",
                                fontWeight: 400,
                            }}
                            className="text-[#424959] text-md sm:text-xl"
                        >
                            Ankle replacement involves two main steps. First the surgeon
                            removes the diseased joint surfaces and any osteophytes or bone
                            spurs. Second custom cutting guides prepare precise flat surfaces
                            on the tibia and talus to accept the implant. The new joint
                            consists of a cobalt chrome tibial component a titanium talar
                            component and a durable polyethylene insert that glides smoothly
                            between them. Unlike ankle fusion which eliminates motion ankle
                            replacement preserves up and down movement allowing more natural
                            gait and reducing stress on nearby joints such as the knee and
                            hip.
                        </p>
                        <div className="flex flex-col space-y-[40px] mt-[40px]">
                            <GradientOverlayImage
                                imageData={
                                    "https://mountainspineortho.b-cdn.net/ankleant6.jpg"
                                }
                                height="500px"
                                gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
                            />
                            <OutlinedButton text="Do I need this surgery?" />
                        </div>
                    </div>
                ),
            },
            {
                post: (
                    <div className="flex flex-col space-y-[40px]">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            Ankle Replacement Candidates
                        </h2>
                        <p
                            style={{
                                fontFamily: "var(--font-inter)",
                                fontWeight: 400,
                            }}
                            className="text-[#424959] text-md sm:text-xl"
                        >
                            Candidates for ankle replacement usually experience constant deep
                            ankle pain that interferes with walking work and sleep. Swelling
                            and stiffness limit range of motion and the joint may give way on
                            uneven ground. Imaging shows advanced arthritis with narrow joint
                            space cystic bone changes and large spurs. When daily activities
                            require frequent pain medication or when bracing and injections
                            no longer provide relief our specialists may recommend ankle
                            replacement as the best path to restore quality of life.
                        </p>
                        <OutlinedButton text="Find a Treatment" />
                        <GradientOverlayImage
                            imageData={
                                "https://mountainspineortho.b-cdn.net/anklereplace1.jpg"
                            }
                            height="500px"
                            gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
                        />
                    </div>
                ),
            },
            {
                post: (
                    <div className="flex flex-col space-y-[16px]">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            Ankle Replacement Recovery Progress
                        </h2>
                        <p
                            style={{
                                fontFamily: "var(--font-inter)",
                                fontWeight: 400,
                            }}
                            className="text-[#424959] text-md sm:text-xl"
                        >
                            Ankle arthritis begins with intermittent soreness after vigorous
                            activity then progresses to daily pain morning stiffness and
                            episodic swelling. As cartilage erodes the joint space narrows and
                            spurs form leading to visible deformity and limited motion. In the
                            final stage bone on bone contact causes grinding and sharp pain
                            with every step. During evaluation we assess the integrity of
                            surrounding ligaments alignment of the foot and prior surgeries
                            to confirm that ankle replacement will offer predictable pain
                            relief and durable function.
                        </p>
                    </div>
                ),
            },
            {
                post: (
                    <div className="flex flex-col space-y-[16px]">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            Ankle Replacement Treatments
                        </h2>
                        <p
                            style={{
                                fontFamily: "var(--font-inter)",
                                fontWeight: 400,
                            }}
                            className="text-[#424959] text-md sm:text-xl"
                        >
                            The procedure is performed under regional or general anesthesia
                            and usually requires a hospital stay of one night. A well padded
                            splint protects the ankle for the first two weeks while the
                            incision heals. Most patients begin gentle non weight bearing
                            range of motion exercises within days followed by progressive
                            partial weight bearing in a removable boot. By the sixth week
                            guided outside rehabilitation focuses on rebuilding strength balance
                            and gait mechanics.
                            <br />
                            <br />
                            During months three to six many people return to low impact
                            sports such as cycling golf and swimming while long distance
                            running and high impact court activities are discouraged to
                            prolong implant life. Our modern implants have shown excellent ten
                            year survival and ongoing studies demonstrate continued success
                            beyond fifteen years.
                        </p>
                    </div>
                ),
            },
            {
                post: (
                    <div className="flex flex-col space-y-[16px]">
                        <h2
                            style={{
                                fontFamily: "var(--font-public-sans)",
                                fontWeight: 500,
                            }}
                            className="text-[#111315] sm:text-4xl text-3xl"
                        >
                            Schedule a Consultation Today
                        </h2>
                        <p
                            style={{
                                fontFamily: "var(--font-inter)",
                                fontWeight: 400,
                            }}
                            className="text-[#424959] text-md sm:text-xl"
                        >
                            Persistent ankle pain and stiffness do not have to dictate your
                            pace of life. Early expert evaluation can determine whether total
                            ankle replacement is the right solution for you. <br />
                            <br /> Contact Mountain Spine & Orthopedics today at (561) 223-9959
                             or complete our simple online consultation form.
                            <br />
                            <br />
                            Our experienced foot and ankle team will review your imaging
                            explain every treatment option and design a personalized surgical
                            and rehabilitation plan that restores comfort supports mobility
                            and helps you step forward with confidence.
                        </p>
                    </div>
                ),
            },
        ],
        side_img:
            "https://mountainspineortho.b-cdn.net/Orthopedic%20Website%20(13).jpg",
        keywords: [
            "total ankle replacement Florida", "ankle arthritis surgery", "ankle fusion alternative", "foot and ankle surgeon", "ankle pain relief", "post-traumatic ankle arthritis", "motion-preserving ankle surgery",
        ],
        metaTitle: "Total Ankle Replacement in Florida | Mountain Spine Ortho",
        metaDesc: "Total ankle replacement relieves arthritis pain while preserving motion. Our Florida foot surgeons specialize in this advanced procedure for lasting mobility.",
    },
    
]
