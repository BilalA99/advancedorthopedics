import { ConditionInfoProp } from "../ConditionCard";
import LowerBackImage from '@/public/lowerbackpain.png'
import LowerBackSide from '@/public/lowerbackpainside.jpeg'
import Image from "next/image";
import OutlinedButton from '@/components/OutlinedButton'
import cervicalspinalstenosis1 from '@/public/cervicalspinal.jpeg'
import cervicalspinalstenosis2 from '@/public/cervicalspinal2.png'
import cervicalspinalstenosisside from '@/public/cervicalspinalside.png'
import sciatica from '@/public/sciatica.png'
import sciaticaside from '@/public/sciaticaside.png'
import coccydynia from '@/public/coccydynia.jpeg'
import coccydynia2 from '@/public/coccydynia2.jpeg'
import coccydyniaside from '@/public/coccydyniaside.png'
import cervicalhernia from '@/public/cervicalhernia.jpeg'
import cervicalherniaside from '@/public/cervicalherniaside.png'
import degendiscside from '@/public/degendiscside.jpeg'
import GradientOverlayImage from "../GradientOverlayImage"
import lumbarherniateddisc from '@/public/lumberherniateddisc.jpeg'
import lumbarherniateddisc2 from '@/public/lumberherniateddisc2.png'
import lumbarherniateddiscside from '@/public/lumberherniateddiscside.png'
import arthritis from '@/public/arthritis.png'
import arthritis2 from '@/public/arthritis2.jpeg'
import pinchednerve from '@/public/pinchednerve.jpeg'
import pinchednerve2 from '@/public/pinchednerve2.jpeg'
import pinchednerveside from '@/public/pinchednerveside.jpeg'

import spondy3 from '@/public/spondy3.png'
import { sign } from "crypto";


// export interface ConditionInfoProp {
//   title : string
//   body : string
//   slug : string
//   forum? : {}[]
//   card_img?: StaticImageData
//   inTxt_img?: StaticImageData
//   side_img? : StaticImageData
//   detail? : string
//   what_sym? : string
//   risk_fac? : string
//   diagnose? : string
//   treatment? : string
//   pain_info? : string
//   prevent? : string
//   schedule? : string
// }

export const Conditions : ConditionInfoProp[] = [
  {
    "title": "Adult Degenerative Scoliosis",
    "tag": "Spine",
    "card_img": 'https://mountainspineortho.b-cdn.net/public/AdultDegenerativeScoliosis.png',
    "inTxt_img": 'https://mountainspineortho.b-cdn.net/public/AdultDegenerativeScoliosisArti.png',
    "body": "Adult Degenerative Scoliosis develops when age related wear on the spine creates a side to side curve that can cause pain and limit movement.  offers specialized care that eases discomfort, restores function, and improves quality of life while providing complimentary services that make every visit smooth and stress free.",
    "detail": "This condition affects adults who are usually older than fifty when spinal discs and facet joints begin to break down. As the support structures weaken the spine can tilt and rotate, producing an abnormal curve, back pain, and trouble with daily activities. At  our team uses precise diagnostics that include complimentary MRI reviews to measure curvature and uncover related issues. Patients receive clear explanations, free second opinions, and car service so they can focus on healing rather than logistics.",
    "what_sym": "Common signs include chronic lower back pain, uneven shoulders or hips, a noticeable spinal curve, stiffness or ache during routine tasks, and radiating pain numbness or weakness that travels into the legs.",
    "risk_fac": "Risk rises with advancing age, a history of disc degeneration or arthritis, low bone density such as osteoporosis, and previous spinal surgery or injury.",
    "diagnose": "Evaluation begins with a thorough medical history and physical exam followed by imaging such as complimentary MRI scans so our specialists can map the exact curve and choose the most effective treatment plan.",
    "treatment": "Plans may feature customized physical therapy, targeted exercises, pain management medication or spinal injections, supportive bracing, and when conservative care is not enough minimally invasive surgery. Every approach aims to be effective yet as gentle as possible to encourage faster recovery.",
    "pain_info": "Discomfort results from nerve pressure, inflammation, and instability in curved segments. Pain can range from mild to severe and chronic, but targeted care from  can lower symptoms and help patients move with greater comfort.",
    "prevent": "While natural aging changes cannot be stopped completely, you can slow scoliosis progression by practicing good posture, participating in regular low impact exercise, strengthening core and back muscles, avoiding tobacco, and keeping calcium and vitamin D intake at healthy levels.",
    "schedule": "Book a consultation with  today to explore relief from Adult Degenerative Scoliosis. Enjoy complimentary MRI reviews, a free second opinion, and door to door transportation that supports your journey to better spinal health.",
    "slug": "adultdegenerativescoliosis"
  },
  {
    "title": "Adjacent Segment Disease",
    "tag": "Spine",
    "card_img": 'https://mountainspineortho.b-cdn.net/public/adjsegdisease1.jpg',
    "inTxt_img": 'https://mountainspineortho.b-cdn.net/public/AdjacentSegmentDisease2.png',
    "body": "Adjacent Segment Disease (ASD) occurs when spinal segments next to a surgically treated area endure extra stress, which accelerates degeneration and discomfort. Knowing the symptoms, risk factors, diagnostic methods, and treatment options offered at  helps patients manage and prevent this condition effectively.",
    "detail": "Adjacent Segment Disease refers to the deterioration of spinal segments directly above or below a segment that has already undergone fusion or another procedure. The change in biomechanics after surgery places additional strain on the neighboring levels, making them more prone to wear and tear. At , our specialized team provides thorough evaluations that include complimentary MRI reviews and free second opinions to deliver precise diagnoses and individualized care.",
    "what_sym": "Common symptoms include persistent neck or back pain, stiffness, reduced range of motion, numbness or tingling, and muscle weakness. These issues can grow more intense over time and can limit daily activities, which highlights the need for early diagnosis and timely intervention.",
    "risk_fac": "Risk factors for ASD include age related degeneration, obesity, poor posture, repetitive strain, osteoporosis, smoking, and a history of prior spinal surgeries. Recognizing these factors helps with proactive monitoring and management.",
    "diagnose": "Diagnosis at  begins with a detailed medical history and a comprehensive physical examination, followed by advanced imaging such as MRI or X ray. A complimentary MRI review allows our experts to check spinal integrity and identify any adjacent segment degeneration with accuracy.",
    "treatment": "Treatment depends on symptom severity and the underlying cause. Conservative options such as physical therapy, anti inflammatory medication, targeted injections, and lifestyle changes often provide relief. If symptoms persist, the care team may recommend minimally invasive surgery.  always offers a free second opinion so that patients can move forward with confidence.",
    "pain_info": "Pain is a hallmark symptom of ASD because of increased mechanical stress, irritation of nerves, or inflammation at the affected levels. Discomfort usually centers near the previously operated region and can spread along the impacted nerve pathways.",
    "prevent": "Helpful prevention steps include maintaining a healthy weight, doing low impact exercises to strengthen core and spinal muscles, practicing good posture, avoiding smoking, and managing chronic conditions such as diabetes and osteoporosis.  supports patients with comprehensive rehabilitation programs and convenience amenities, including complimentary car service, to encourage follow through.",
    "schedule": "If you have had spine surgery and now experience new or worsening symptoms, schedule a consultation with  today. Take advantage of our complimentary MRI review, free second opinion, and patient focused amenities for compassionate and convenient care.",
    "slug": "adjacentsegmentdisease"
  },
  {
    "title": "Lumbar Herniated Disc",
    "tag": "Spine",
    "card_img": 'https://mountainspineortho.b-cdn.net/public/LumbarHerniatedDisc.png', 
    "inTxt_img": 'https://mountainspineortho.b-cdn.net/public/LumbarHerniatedDiscarti.png',
    "body": "A lumbar herniated disc occurs when a disc in the lower back becomes damaged or shifts out of place, often due to aging, injury, or improper lifting. These discs cushion the vertebrae and allow for movement, but when the outer layer tears, the inner gel like center can press on nearby nerves. This can lead to pain, tingling, or weakness that radiates from the lower back into the hips, buttocks, or legs often referred to as sciatica. The lower back is the most common area for herniated discs because it absorbs the most stress from daily movement.",
    "detail": "Each spinal disc has a tough outer layer called the annulus fibrosus and a soft, gel-like center known as the nucleus pulposus. Herniation happens when a tear in the annulus allows the nucleus to push outward. This displacement can occur gradually due to degenerative changes or suddenly from excessive strain or trauma. When the herniated material compresses or irritates spinal nerves exiting the spinal canal in the lower back, it triggers the characteristic radiating symptoms down the leg (sciatica). Mountain Spine & Care specializes in accurately diagnosing the level and severity of the herniation to guide effective treatment.",
    "what_sym": "Symptoms often include sharp, shooting pain originating in the lower back and traveling down the buttock and back of one leg (sciatica), though sometimes back pain itself might be minimal. Numbness, tingling ('pins and needles'), or muscle weakness in the affected leg or foot are common. Pain may worsen with activities like sitting for long periods, bending forward, coughing, or sneezing.",
    "risk_fac": "Key risk factors include age, as discs naturally degenerate over time making them more prone to herniation (most common between ages 30-50), improper lifting techniques or repetitive twisting motions, physically demanding occupations, excess body weight putting added strain on the spine, a sedentary lifestyle leading to weaker core support muscles, smoking which can impair disc nutrition, and a potential genetic predisposition to disc degeneration.",
    "diagnose": "Diagnosis at Mountain Spine & Care involves a comprehensive evaluation, starting with a detailed medical history focusing on the pattern and triggers of your pain. A physical examination includes neurological testing (checking reflexes, muscle strength, sensation) and specific maneuvers like the straight leg raise test to identify nerve irritation. While symptoms often suggest a herniated disc, imaging studies, particularly an MRI, are crucial to confirm the diagnosis, visualize the disc pressing on the nerve, and rule out other conditions. We offer a complimentary MRI review to ensure diagnostic accuracy.",
    "treatment": "Mountain Spine & Care prioritizes conservative treatment initially for most lumbar herniated discs. This often includes modified rest, targeted physical therapy focusing on core stabilization and specific exercises (like McKenzie method), pain and anti-inflammatory medications (NSAIDs, muscle relaxants), and epidural steroid injections to reduce nerve inflammation and radiating pain. If significant pain or neurological symptoms persist despite several weeks of conservative care, minimally invasive surgical options like microdiscectomy (removing the herniated portion of the disc) may be recommended to decompress the affected nerve.",
    "pain_info": "The pain from a lumbar herniated disc is often neuropathic, meaning it stems from nerve compression, resulting in sharp, burning, or electric shock-like sensations down the leg (sciatica). This leg pain is frequently more severe than the localized back pain. Mountain Spine & Care focuses on alleviating this nerve pain through targeted treatments like epidural injections and physical therapy designed to reduce nerve irritation and improve function.",
    "prevent": "While not all herniated discs are preventable, you can reduce your risk by consistently using proper lifting techniques (lifting with your legs, not your back), maintaining a healthy weight, practicing good posture, strengthening your core and back muscles through regular exercise, avoiding prolonged periods of sitting by taking frequent breaks to stand and stretch, and quitting smoking.",
    "schedule": "If you're experiencing persistent lower back pain radiating into your leg, contact Mountain Spine & Care for an expert evaluation. Utilize our complimentary MRI review for an accurate diagnosis, and let our specialists develop a personalized treatment plan, emphasizing conservative care first, to relieve your pain and help you return to your daily activities.",
   side_img : lumbarherniateddiscside,
   forum : [
    {
      post : (
      <div className=" flex flex-col space-y-[16px] ">
        <h1
          style={{
            fontFamily: "var(--font-reem-kufi)",
            fontWeight: 500,
          }}
          className="text-[#111315] sm:text-4xl text-3xl">
          How Do I Know If I Have a Lumbar Herniated Disc?
        </h1>
        <div className=" flex flex-col space-y-[40px]">
          <h1
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 400,
            }}
            className="text-[#5B5F67] text-md sm:text-xl"
          >
            Signs of a lumbar herniated disc often start gradually but may worsen over time if not treated. The most common symptom is a sharp or burning pain that radiates from the lower back into the leg, often following the path of the sciatic nerve. Many patients describe the pain as electric or stabbing, and it may worsen when sitting for long periods, bending forward, or coughing. Some patients also experience tingling, numbness, or muscle weakness in the leg or foot on the affected side. In severe cases, the condition can affect walking or standing for extended periods, reducing your quality of life.
          </h1>
          <GradientOverlayImage
              imageData={lumbarherniateddisc} // Passing static image data
              height="500px"
              gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
          />
          <h1
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 400,
            }}
            className="text-[#5B5F67] text-md sm:text-xl"
          >
            If these symptoms sound familiar, you may be suffering from a lumbar herniated disc. Mountain Spine & Care offers a quick and effective symptom checker to gather information and help determine the best path to recovery. Our goal is to diagnose your condition early and create a treatment plan that delivers real results.
          </h1>

          <OutlinedButton text="Do I have this Condition?" />

        </div>
      </div>
      )
    },
    {
      post : (
        <div className=" flex flex-col space-y-[16px] ">
        <h1
          style={{
            fontFamily: "var(--font-reem-kufi)",
            fontWeight: 500,
          }}
          className="text-[#111315] sm:text-4xl text-3xl">
          What Lumbar Herniated Disc Treatment is Right for Me?
        </h1>
        <div className=" flex flex-col space-y-[40px]">
          <h1
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 400,
            }}
            className="text-[#5B5F67] text-md sm:text-xl"
          >
            The right treatment for a lumbar herniated disc depends on how severe your symptoms are and how much they impact your daily life. Most cases respond well to conservative care, including rest, heat and ice therapy, physical therapy, and anti-inflammatory medications. These methods aim to reduce nerve irritation, restore movement, and strengthen the muscles that support the spine. If pain persists or worsens despite these efforts, more advanced treatments such as spinal injections or minimally invasive surgery may be recommended.<br/><br/>
            At Mountain Spine & Care, our spine specialists will evaluate your condition and create a customized treatment plan to help you return to a pain-free, active lifestyle. You don’t have to live with back pain we’re here to help you find the right solution.
          </h1>
          <OutlinedButton text="Find a Treatment" />
        </div>
      </div>
      )
    },
    {
      post : (
      <div className=" flex flex-col space-y-[16px] ">
        <h1
          style={{
            fontFamily: "var(--font-reem-kufi)",
            fontWeight: 500,
          }}
          className="text-[#111315] sm:text-4xl text-3xl">
          Pain Management for a Lumbar Herniated Disc
        </h1>
        <div className=" flex flex-col space-y-[40px]">
          <h1
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 400,
            }}
            className="text-[#5B5F67] text-md sm:text-xl"
          >
            The right treatment for a lumbar herniated disc depends on how severe your symptoms are and how much they impact your daily life. Most cases respond well to conservative care, including rest, heat and ice therapy, physical therapy, and anti-inflammatory medications. These methods aim to reduce nerve irritation, restore movement, and strengthen the muscles that support the spine. If pain persists or worsens despite these efforts, more advanced treatments such as spinal injections or minimally invasive surgery may be recommended.
            At Mountain Spine & Care, our spine specialists will evaluate your condition and create a customized treatment plan to help you return to a pain-free, active lifestyle. You don’t have to live with back pain we’re here to help you find the right solution.
          </h1>
          <GradientOverlayImage
              imageData={'https://mountainspineortho.b-cdn.net/public/lumberherniateddisc2.png'} // Passing static image data
              height="500px"
              gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
          />
        </div>
      </div>
      )
    },
    {
      post : (
        <div className=" flex flex-col space-y-[16px] ">
        <h1
          style={{
            fontFamily: "var(--font-reem-kufi)",
            fontWeight: 500,
          }}
          className="text-[#111315] sm:text-4xl text-3xl">
          Best Treatment to Prevent Pain From a Lumbar Herniated Disc
        </h1>
        <div className=" flex flex-col space-y-[40px]">
          <h1
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 400,
            }}
            className="text-[#5B5F67] text-md sm:text-xl"
          >
           If you’re experiencing symptoms of a lumbar herniated disc, there are several treatment options available depending on the severity of your condition. If your pain is mild and manageable, starting with home care and guided physical therapy can often lead to improvement. Applying heat or ice, taking anti-inflammatory medications such as ibuprofen or naproxen, and making lifestyle adjustments like avoiding long periods of sitting or poor lifting techniques can help reduce strain on the lower back. Exercise programs that strengthen the core and improve flexibility are also an essential part of recovery.<br/><br/>
            When conservative care is not enough, surgical treatment may be necessary to relieve pressure on the affected nerves. Discectomy is a common procedure where the portion of the disc pressing on the nerve is removed to relieve pain. In some cases, a laminectomy may be performed to widen the spinal canal and ease nerve compression. For patients with severe disc damage, spinal fusion may be considered to stabilize the spine and prevent further injury.<br/><br/>
            Every patient is different, which is why the team at Mountain Spine & Care develops personalized care plans using the most advanced and least invasive techniques available. Whether your condition is new or has been ongoing for years, we’re here to help you get back to living the life you love.
          </h1>
        </div>
      </div>
      )
    },
    {
      post : (
        <div className=" flex flex-col space-y-[16px] ">
        <h1
          style={{
            fontFamily: "var(--font-reem-kufi)",
            fontWeight: 500,
          }}
          className="text-[#111315] sm:text-4xl text-3xl">
          Schedule a Consultation Today
        </h1>
        <div className=" flex flex-col space-y-[40px]">
          <h1
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 400,
            }}
            className="text-[#5B5F67] text-md sm:text-xl"
          >
           Living with a lumbar herniated disc can affect every aspect of your day, from walking and sitting to sleeping and working. You don’t have to push through the pain. At Mountain Spine & Care, our expert spine team is ready to help you regain control through innovative treatments and compassionate care. Whether you’re just beginning to feel discomfort or you’ve been suffering for some time, the first step toward recovery starts with a conversation.<br/><br/>
           Call us today at (855) 853-6542 or fill out our secure online form to schedule your consultation. With Mountain Spine & Care on your side, a pain-free future is within reach.
          </h1>
        </div>
      </div>
      )
    }
   ],
  "slug": "lumbarherniateddisc"
},

{
  "title": "Degenerative Disc Disease",
  "tag": "Spine",
  "card_img": 'https://mountainspineortho.b-cdn.net/public/DegenerativeDiscDiseasec.png',
  "inTxt_img": 'https://mountainspineortho.b-cdn.net/public/DegenerativeDiscDisease.png',
  "body": "Degenerative Disc Disease, often called DDD, refers to the natural wear and tear of the spinal discs that cushion each vertebra. At  our specialists provide comprehensive patient focused treatment that relieves back pain and improves quality of life through advanced care and complimentary services.",
  "detail": "Degenerative Disc Disease is not an illness but a condition that develops when intervertebral discs gradually lose hydration, become thinner, and allow minor instability in the spine. These changes may create pain, reduced mobility, and discomfort.  excels at diagnosing and treating DDD with precise imaging, including complimentary MRI readings, and a personalized approach. Patients receive clear explanations, free second opinions, and convenient car service to make every visit comfortable.",
  "what_sym": "Common signs include chronic neck or back pain, pain that worsens when sitting bending lifting or twisting, discomfort that radiates into arms or legs, numbness or tingling, and stiffness or reduced flexibility.",
  "risk_fac": "Factors that can speed degeneration are advancing age, smoking, excess body weight, frequent heavy lifting or repetitive spinal strain, and a family tendency toward disc problems.",
  "diagnose": (
    <div className=" flex flex-col space-y-[16px] items-center justify-center">
      <p>Evaluation begins with a detailed medical history and a physical examination.  then confirms the affected areas with advanced imaging such as complimentary MRI scans, creating a precise plan of care.</p>
      <Image src={'https://mountainspineortho.b-cdn.net/public/ddd3.png'} alt="degenerative disc disease" layout="cover" width={300} height={300} className="w-full h-full object-fill aspect-video rounded-2xl overflow-hidden"/>
    </div>
  ),
  "treatment": "Plans are tailored to each individual and may include physical therapy with guided exercise, pain management medication, minimally invasive spinal injections, or when needed modern surgical procedures. The goal is to choose the least invasive and most effective option so recovery is faster and downtime is shorter.",
  "pain_info": "Pain from DDD can vary from mild discomfort to debilitating episodes. Identifying personal triggers and following professional guidance can help manage and reduce symptoms.",
  "prevent": "Although aging cannot be stopped completely, you can slow disc degeneration by exercising and stretching regularly, keeping a healthy weight, practicing good posture, avoiding tobacco, and using ergonomic furniture that lowers spinal strain.",
  "schedule": "Book a consultation with  today to address ongoing back or neck pain. Take advantage of our complimentary MRI review, free second opinion, and convenient transportation service for a smooth and supportive care experience.",
forum : [
  {
    post : (
      <div className=" flex flex-col space-y-[16px] ">
        <h1 
        style={{
          fontFamily: "var(--font-reem-kufi)",
          fontWeight: 500,
        }}
        className="text-[#111315] text-2xl">
          What is Degenerative Disc Disease?
        </h1>
        <div  className=" flex flex-col space-y-[40px]">
          <h1
           style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 400,
          }}
          className="text-[#5B5F67] text-md sm:text-xl"
          >
          Degenerative Disc Disease is a spinal condition caused by age-related breakdown of the discs that cushion the vertebrae. These discs act like shock absorbers, allowing your spine to flex, bend, and twist. Over time, discs can lose water content, flatten, and develop small tears, reducing their ability to support your spine and absorb impact. Unlike acute injuries, DDD develops slowly over time and is especially common in individuals over 40. However, it can also affect younger individuals with physically demanding lifestyles or spinal injuries.
          </h1>
          <GradientOverlayImage
            imageData={'https://mountainspineortho.b-cdn.net/public/degendisc.png'} // Passing static image data
            height="500px"
            gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
          />
        <h1 
         style={{
          fontFamily: "var(--font-inter)",
          fontWeight: 400,
        }}
        className="text-[#5B5F67] text-md sm:text-xl"
          >
            To diagnose DDD, our specialists begin with a full medical history and physical exam, followed by advanced imaging such as X-rays or MRI scans to evaluate disc height, disc shape, and any signs of degeneration. We also assess nerve function and spinal alignment to understand the full extent of the damage. Diagnosis may involve ruling out other conditions, such as herniated discs or spinal stenosis, that share similar symptoms.
          </h1>

          <OutlinedButton text="Do I have this Condition?"/>
        </div>
      </div>
    )
  },
  {
    post : (
      <div className=" flex flex-col space-y-[16px] ">
        <h1 
        style={{
          fontFamily: "var(--font-reem-kufi)",
          fontWeight: 500,
        }}
        className="text-[#111315] text-2xl">
          Symptoms of Degenerative Disc Disease
        </h1>
        <div  className=" flex flex-col space-y-[40px]">
          <h1
           style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 400,
          }}
          className="text-[#5B5F67] text-md sm:text-xl"
          >
          Symptoms vary depending on the location and severity of the disc degeneration. Common signs include chronic lower back or neck pain that worsens with bending, twisting, or prolonged sitting. Some patients find relief when walking or changing positions. Others may experience muscle weakness or numbness in the arms or legs if nerve compression occurs. Many people also report stiffness or reduced flexibility in the spine. The pain may be intermittent, flaring up during activity and easing with rest.
          </h1>
          <OutlinedButton text="Find a Treatment"/>

          <GradientOverlayImage
            imageData={'https://mountainspineortho.b-cdn.net/public/degendisc2.png'} // Passing static image data
            height="500px"
            gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
          />

        </div>
      </div>
    )
  },
  {
    post : (
      <div className=" flex flex-col space-y-[16px] ">
        <h1 
        style={{
          fontFamily: "var(--font-reem-kufi)",
          fontWeight: 500,
        }}
        className="text-[#111315] text-2xl">
          Risk Factors for Degenerative Disc Disease
        </h1>
        <div  className=" flex flex-col space-y-[40px]">
          <h1
           style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 400,
          }}
          className="text-[#5B5F67] text-md sm:text-xl"
          >
          You may be at higher risk for DDD if you are over the age of 40, smoke, or lead a sedentary lifestyle. A history of spinal injuries or trauma can increase your risk, especially if paired with poor posture or spinal misalignment. Genetic factors also contribute, and individuals with a family history of spine-related conditions are more likely to develop DDD. Identifying these risk factors early can help slow the progression of the disease and guide preventative care.
          </h1>
        </div>
      </div>
    )
  },
  {
    post : (
      <div className=" flex flex-col space-y-[16px] ">
        <h1 
        style={{
          fontFamily: "var(--font-reem-kufi)",
          fontWeight: 500,
        }}
        className="text-[#111315] text-2xl">
          Treatment Options for Degenerative Disc Disease
        </h1>
        <div  className=" flex flex-col space-y-[40px]">
          <h1
           style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 400,
          }}
          className="text-[#5B5F67] text-md sm:text-xl"
          >
          At Mountain Spine & Care, we create personalized treatment plans tailored to your condition and lifestyle. Treatment options may include physical therapy to improve strength, flexibility, and posture, as well as medications like non-steroidal anti-inflammatory drugs (NSAIDs) to reduce pain and swelling. For patients with nerve irritation, epidural steroid injections can offer targeted relief. Other approaches may include chiropractic care or spinal manipulation therapy. In more severe cases, minimally invasive spine surgery may be recommended to stabilize the spine and relieve nerve pressure. Our goal is to relieve your pain and restore spine stability while avoiding unnecessary surgery whenever possible.
          </h1>
        </div>
      </div>
    )
  },
  {
    post : (
      <div className=" flex flex-col space-y-[16px] ">
        <h1 
        style={{
          fontFamily: "var(--font-reem-kufi)",
          fontWeight: 500,
        }}
        className="text-[#111315] text-2xl">
          Schedule a Consultation Today
        </h1>
        <div  className=" flex flex-col space-y-[40px]">
          <h1
           style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 400,
          }}
          className="text-[#5B5F67] text-md sm:text-xl"
          >
          If you’re experiencing persistent back or neck pain, don’t wait to seek help. Degenerative Disc Disease is manageable with the right care plan and professional guidance. At Mountain Spine & Care, our experienced spine specialists are here to evaluate your condition, offer expert recommendations, and guide you toward long-term relief.<br/><br/>Call us today at (855) 853-6542 or fill out our online form to schedule your consultation. Let’s work together to get your spine and your life back on track.
          </h1>
        </div>
      </div>
    )
  }
],
side_img : 'https://mountainspineortho.b-cdn.net/public/degendiscside.jpeg',
"slug": "degenerativediscdisease"
},
{
  "title": "Cervical Spinal Stenosis",
  "tag": "Neck",
  "card_img": 'https://mountainspineortho.b-cdn.net/public/CervicalSpinalStenosis.png',
  "inTxt_img": 'https://mountainspineortho.b-cdn.net/public/cervicalspinal2.png',
  "body": "Cervical Spinal Stenosis is a condition in which the spinal canal in the neck narrows compressing the spinal cord or exiting nerve roots. At  our fellowship trained spine specialists combine precise diagnostics with leading edge therapies to relieve pain protect neurologic function and restore confident neck mobility supported by complimentary MRI reviews free second opinions and convenient car service",
  "detail": "The cervical spine houses the delicate spinal cord while permitting flexible head movement. Degenerative changes such as disc bulging thickened ligaments bone spurs or facet joint enlargement can progressively constrict the canal producing cervical spinal stenosis. As space diminishes patients may experience radiating arm pain numbness weakness or in advanced cases myelopathy with gait imbalance and hand clumsiness.  performs a comprehensive evaluation beginning with a detailed history and neurologic examination mapping sensory loss reflex changes and coordination deficits. Complimentary high resolution MRI and when needed CT myelography pinpoint the exact levels and structures causing compression. This meticulous assessment guides a personalized treatment plan that preserves cord health and addresses pain at its source",
  "what_sym": "Patients often report neck stiffness or aching burning or electric like pain radiating into shoulders and arms hand numbness fine motor difficulty such as buttoning shirts leg weakness or heaviness balance problems and in severe cases bladder or bowel urgency",
  "risk_fac": "Risks increase with advancing age and include longstanding osteoarthritis degenerative disc disease ossification of the posterior longitudinal ligament previous neck trauma or surgery congenital narrow canal rheumatoid arthritis and lifestyle factors like smoking and heavy manual labor",
  "diagnose": (
    <div className=" flex flex-col space-y-[16px] ">
      <h1>
      Our diagnostic process integrates detailed physical and neurological examinations with upright X rays to assess alignment flexion extension films to reveal instability and nerve conduction studies when arm symptoms predominate. These complimentary diagnostics ensure dynamic and static contributors to stenosis are identified before therapy begins     
      </h1>
      <Image src={'https://mountainspineortho.b-cdn.net/public/cervicalspinal3.jpeg'} width={300} height={300} layout="cover" alt="cervicalspinalstenosisside" className="w-full h-full object-cover aspect-video rounded-2xl"/>
    </div>
  ),
  "treatment": "Initial management focuses on activity modification posture optimization anti inflammatory or neuropathic medications and targeted physiotherapy that strengthens deep cervical stabilizers. Image guided epidural steroid injections can provide powerful but temporary relief of radicular pain. When myelopathy progresses or pain remains refractory our surgeons offer motion preserving laminoplasty posterior decompression and fusion or anterior cervical corpectomy and discectomy and fusion ACDF tailored to canal dimensions and patient goals with minimal tissue disruption and rapid rehabilitation",
  "pain_info": "Pain may fluctuate with neck posture and activity but neurologic symptoms can progress silently.  blends precise decompression techniques with postoperative rehabilitation to curb pain restore nerve function and prevent irreversible cord changes",
  "prevent": "Maintaining strong neck and core muscles practicing ergonomic workstation habits treating arthritis early avoiding tobacco and staying physically active help preserve canal diameter and spinal stability reducing the likelihood of symptomatic stenosis",
  "schedule": "If neck pain arm tingling or balance issues are affecting your life schedule a consultation with  today. We will review your complimentary MRI provide a free second opinion and arrange car service so you can access world class care focused on restoring spinal health and protecting your future mobility",
  side_img : cervicalspinalstenosisside,
  forum : [
    {
      post : (
        <div className=" flex flex-col space-y-[16px] ">
          <h1 
          style={{
            fontFamily: "var(--font-reem-kufi)",
            fontWeight: 500,
          }}
          className="text-[#111315] sm:text-4xl text-3xl">
             How Do I Know If I Have Spinal Stenosis?
          </h1>

          <div className=" flex flex-col space-y-[40px]">
            <h1
             style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 400,
            }}
            className="text-[#5B5F67] text-md sm:text-xl"
            >
            Cervical spinal stenosis can cause a variety of symptoms depending on the severity and levels affected. Common signs include shock-like pain in the neck or arms, tingling sensations, arm weakness, numbness in the hands or fingers, loss of coordination, balance issues, difficulty walking, and in severe cases, loss of bladder control. These symptoms may suggest compression of the spinal cord or nerve roots and should never be ignored.
            </h1>

            <GradientOverlayImage
              imageData={cervicalspinalstenosis1} // Passing static image data
              height="500px"
              gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
            />

            <h1
             style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 400,
            }}
            className="text-[#5B5F67] text-md sm:text-xl"
            >
              If you’re experiencing any of these symptoms, it’s essential to get evaluated early. We offer a quick and easy spinal condition assessment tool to help gather information and determine if you may be a candidate for treatment. Don’t delay your recovery the earlier we intervene, the better your outcome.
            </h1>

            <OutlinedButton text="Do I have this Condition?"/>
          </div>
        </div>
      )
    },
    {
      post : (
        <div className=" flex flex-col space-y-[16px] ">
        <h1 
        style={{
          fontFamily: "var(--font-reem-kufi)",
          fontWeight: 500,
        }}
        className="text-[#111315] sm:text-4xl text-3xl">
          What is the Right Treatment for Me?
        </h1>

        <div className=" flex flex-col space-y-[40px]">
          <h1
           style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 400,
          }}
          className="text-[#5B5F67] text-md sm:text-xl"
          >
            At Mountain Spine & Care, we specialize in procedures that relieve spinal cord compression while preserving motion. For patients with multi level stenosis (typically three or more levels), we recommend cervical laminoplasty. This procedure opens the spinal canal and decompresses the spinal cord without the need for a multi-level fusion, preserving mobility in the neck.<br/> <br/>
            For patients with one or two affected levels, a decompression and artificial disc replacement is often ideal. This modern approach allows for motion preservation and avoids the long-term stiffness associated with spinal fusion. While multi-level fusion is sometimes used, it can leave patients with a permanently stiff neck, especially when four levels are involved. In contrast, laminoplasty provides the best option for multiple levels of compression without sacrificing mobility.
          </h1>

          <OutlinedButton text="Find a Treatment"/>

          <GradientOverlayImage
              imageData={cervicalspinalstenosis2} // Passing static image data
              height="500px"
              gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
            />

        </div>
      </div>
      )
    },
    {
      post : (
        <div className=" flex flex-col space-y-[16px] ">
        <h1 
        style={{
          fontFamily: "var(--font-reem-kufi)",
          fontWeight: 500,
        }}
        className="text-[#111315] sm:text-4xl text-3xl">
          More About Cervical Laminoplasty
        </h1>

        <div className=" flex flex-col space-y-[40px]">
          <h1
           style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 400,
          }}
          className="text-[#5B5F67] text-md sm:text-xl"
          >
            Cervical laminoplasty is a motion-preserving surgery done through the back of the neck. During the procedure, the muscles are temporarily moved aside and small cuts are made in the lamina the bone protecting the spinal cord. These bones are then lifted and repositioned to create more space for the spinal cord, relieving pressure and reducing symptoms.<br /><br/>
            The key benefit of this procedure is that it retains the neck’s natural movement. Unlike fusion, which locks segments together, laminoplasty allows the bones to remain flexible. However, it’s important to note that while laminoplasty is excellent for relieving nerve-related symptoms like arm and leg pain or headaches, it is not intended to address central neck pain. For axial neck pain, artificial disc replacement may be the better solution.
          </h1>

        </div>
      </div>
      )
    },
    {
      post : (
        <div className=" flex flex-col space-y-[16px] ">
        <h1 
        style={{
          fontFamily: "var(--font-reem-kufi)",
          fontWeight: 500,
        }}
        className="text-[#111315] sm:text-4xl text-3xl">
          Post-Op Recovery           
        </h1>

        <div className=" flex flex-col space-y-[40px]">
          <h1
           style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 400,
          }}
          className="text-[#5B5F67] text-md sm:text-xl"
          >
            Most patients recover quickly after cervical laminoplasty. Many go home the next day, and in some cases, it may be performed on an outpatient basis. Pain typically improves by the third day after surgery. Since neck movement is preserved, stiffness is minimized, and mobility is encouraged early on, which further speeds up recovery.
          </h1>

        </div>
      </div>
      )
    },
    {
      post : (
        <div className=" flex flex-col space-y-[16px] ">
        <h1 
        style={{
          fontFamily: "var(--font-reem-kufi)",
          fontWeight: 500,
        }}
        className="text-[#111315] sm:text-4xl text-3xl">
         Schedule a Consultation Today          
        </h1>

        <div className=" flex flex-col space-y-[40px]">
          <h1
           style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 400,
          }}
          className="text-[#5B5F67] text-md sm:text-xl"
          >
            If you’re experiencing symptoms like numbness, clumsiness, or radiating pain in your arms or legs, you may have cervical spinal stenosis. Early treatment can significantly improve your outcome and prevent further neurological damage. At Mountain Spine & Care, our expert surgeons specialize in both minimally invasive and motion-preserving spinal procedures to help you get back to life without pain or stiffness.<br /><br/>
            Take the first step toward recovery. Call us at (855) 853-6542 or fill out our online form to schedule your consultation today.
          </h1>

        </div>
      </div>
      )
    },
   
  ],
  "slug": "cervicalspinalstenosis"
},

{
  "title": "Spondylolisthesis",
  "tag": "Spine",
  "card_img": 'https://mountainspineortho.b-cdn.net/public/adtcard.png',
  "inTxt_img": 'https://mountainspineortho.b-cdn.net/public/sdtarti.jpg',
  "body": "Spondylolisthesis is a spinal condition in which one vertebra slips forward over the one below it often causing back pain nerve compression and reduced mobility. At Mountain Spine & Orthopedics we offer expert diagnosis and individualized treatment supported by complimentary MRI reviews free second opinions and convenient car service to stabilize the spine relieve pain and restore confident movement",
  "detail": "Spondylolisthesis can result from congenital defects spinal degeneration trauma or stress fractures. It most commonly affects the lower lumbar spine and may compress spinal nerves leading to back pain sciatica or difficulty walking. There are several types degenerative isthmic traumatic and dysplastic each with unique causes and treatment approaches. Severity is classified by the degree of slippage. At Mountain Spine & Orthopedics evaluation begins with a full history of symptoms activity levels and previous injuries. A physical exam assesses posture flexibility and neurologic function. Complimentary imaging including standing X rays MRI and CT helps determine the type and grade of slippage evaluate nerve involvement and rule out spinal instability or associated conditions",
  "what_sym": "Lower back pain tight hamstrings pain radiating into the buttocks or legs sciatica numbness or tingling weakness in the legs and trouble walking or standing for long periods in severe cases bladder or bowel dysfunction may occur",
  "risk_fac": "Repetitive spinal stress for example gymnastics or football spinal arthritis genetics congenital spinal anomalies previous spine trauma and aging all contribute to the risk of developing spondylolisthesis",
  "diagnose": (
    <div className="flex flex-col space-y-[16px]">
      <p>Complimentary standing flexion extension X rays confirm vertebral slippage and instability MRI and CT imaging assess nerve compression and bony detail. Grading the severity of the slip guides treatment decisions and helps monitor progression</p>
      <Image src={spondy3} alt="spondy3" className="w-full h-full object-fill aspect-video rounded-2xl"/>
    </div>
  ),
  "treatment": "Nonsurgical care may include physical therapy to strengthen core and stabilize the spine anti inflammatory medications and image guided injections to reduce nerve inflammation. Bracing may help in some cases. If conservative care fails or slippage progresses surgical options like decompression and spinal fusion are considered. At Mountain Spine & Orthopedics we use minimally invasive techniques to reduce recovery time while achieving long term spinal stability",
  "pain_info": "Pain often stems from mechanical instability and nerve compression and may increase with standing walking or extension. Our integrated treatment approach targets both the pain and its source to provide long lasting relief",
  "prevent": "Core strengthening proper body mechanics limiting repetitive lumbar hyperextension and addressing early symptoms can help prevent progression or recurrence",
  "schedule": "If you are experiencing lower back pain leg symptoms or instability schedule a consultation with Mountain Spine & Orthopedics today. Benefit from a complimentary MRI review free second opinion and door to door transportation then take the first step toward resolving spondylolisthesis and regaining spine stability and comfort",
  "slug": "spondylolisthesis"
},
{
  title : 'Cervical Herniated Disc',
  "tag": "Neck",
  "card_img": 'https://mountainspineortho.b-cdn.net/public/CervicalHerniatedDisc.png',
  "inTxt_img": 'https://mountainspineortho.b-cdn.net/public/CervicalHerniatedDiscarti.png',
  "body": "A cervical herniated disc occurs when the soft gel like core of a neck level intervertebral disc ruptures through its outer layer and presses on nearby nerves or the spinal cord.  provides leading edge diagnostics and multidisciplinary care to relieve pain protect nerve function and restore neck mobility with free second opinions complimentary MRI reviews and car service for every patient",
  "detail": "The cervical spine supports the head and allows extensive motion making its discs vulnerable to injury and degeneration. When the annulus fibrosus tears the nucleus pulposus can protrude creating inflammatory and mechanical pressure on the C5 to C8 nerve roots or the spinal cord. This can lead to neck pain radiating arm symptoms numbness weakness and in severe cases problems with balance and dexterity. At  we begin with a detailed history to identify potential triggers such as trauma overhead work or progressive degeneration and perform a focused neurological exam mapping sensory changes reflex asymmetries and muscle strength. Complimentary high resolution MRI scans then pinpoint the herniation level size and any spinal cord compression guiding a customized treatment plan",
  "what_sym": "Symptoms include sharp or burning neck pain that worsens with coughing or head movement radiating pain or electric like shocks down the shoulder or arm hand or finger numbness reduced grip strength and when the cord is involved difficulty with fine motor tasks or unsteady gait",
  "risk_fac": "Risk factors encompass age related disc dehydration poor posture during prolonged screen use repeated heavy lifting sudden whiplash injuries smoking obesity and a family history of degenerative disc disease",
  "diagnose": (
    <div className="flex flex-col space-y-[16px]">
      <p>Diagnosis involves a comprehensive physical exam and neurological assessment combined with complimentary MRI confirmation nerve conduction studies to quantify root irritation and dynamic imaging to rule out instability. These tests ensure all contributing factors are identified before treatment</p>
      <Image src={'https://mountainspineortho.b-cdn.net/public/cervhernia3.png'} alt="cervicalspinalstenosisside" width={300} height={300} layout="cover" className="w-full h-full object-cover aspect-video rounded-2xl"/>
    </div>
  ),
  "treatment": "Initial care focuses on activity modification targeted physical therapy to offload the affected segment and anti inflammatory medication. Cervical traction and image guided epidural steroid injections can offer fast relief when conservative measures are not enough. For persistent neurological deficits our spine surgeons perform minimally invasive anterior cervical discectomy and fusion or artificial disc replacement to decompress neural structures restore alignment and support rapid recovery with lasting stability",
  "pain_info": "Pain intensity often peaks in the first few weeks after herniation especially with neck movement or sustained positions. A combination of precise diagnostic injections and rehabilitative exercises to strengthen deep neck flexor muscles helps reduce inflammation improve posture and accelerate symptom resolution",
  "prevent": "Preventive steps include setting up ergonomic workstations with monitors at eye level practicing proper lifting mechanics regular core and cervical strengthening routines staying hydrated and avoiding tobacco to lower the risk of future disc injury",
  "schedule": "If neck or arm pain is limiting your life schedule a consultation with  today. We will review your complimentary MRI provide a free second opinion and arrange car service so you can focus on returning to pain free motion and reliable nerve function",
  slug : 'cervicalherniateddisc',
  side_img : cervicalherniaside,
  forum: [
    {
      post : (
        <div className=" flex flex-col space-y-[16px] ">
        <h1
          style={{
            fontFamily: "var(--font-reem-kufi)",
            fontWeight: 500,
          }}
          className="text-[#111315] sm:text-4xl text-3xl">
          What Is a Herniated Cervical Disc?
        </h1>
        <div className=" flex flex-col space-y-[40px]">
          <h1
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 400,
            }}
            className="text-[#5B5F67] text-md sm:text-xl"
          >
            A herniated cervical disc occurs when one of the discs in the neck region (cervical spine) becomes damaged. These discs are gel-like cushions that sit between the vertebrae and act as shock absorbers. Over time or due to injury, the outer wall of the disc can tear, allowing the inner nucleus to leak out and press against surrounding spinal nerves. This can lead to symptoms such as neck pain, numbness, tingling, or weakness in the shoulders, arms, or hands. Treatment options range from conservative therapies like rest and physical therapy to more advanced solutions, including cervical spine surgery.
          </h1>

          <div className="rounded-[24px] overflow-hidden"><iframe width="100%" height="500" src="https://www.youtube.com/embed/gUG_zbKqlaU?si=k_-WQStF8cvjCaMj" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  allowFullScreen></iframe></div>
          
          <h1
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 400,
            }}
            className="text-[#5B5F67] text-md sm:text-xl"
          >
            If you’re experiencing neck pain, numbness, or weakness in your upper limbs, you may be dealing with a herniated disc in your cervical spine. Our symptom checker tool is a quick and easy way to help determine if you’re showing signs of disc herniation and whether a treatment consultation is recommended.
          </h1>

          <OutlinedButton text="Do I have this Condition?" />

        </div>

      </div>
      )
    },
    {
      post : (
        <div className=" flex flex-col space-y-[16px] ">
          <h1
            style={{
              fontFamily: "var(--font-reem-kufi)",
              fontWeight: 500,
            }}
            className="text-[#111315] sm:text-4xl text-3xl">
            How Are Herniated Discs Diagnosed?
          </h1>
          <div className=" flex flex-col space-y-[40px]">
            <h1
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 400,
              }}
              className="text-[#5B5F67] text-md sm:text-xl"
            >
             Diagnosing a herniated disc begins with a medical history review and physical examination. Your doctor may recommend imaging tests such as X-rays, MRI scans, or CT scans to confirm whether a disc is bulging or ruptured. While X-rays can help rule out other causes of pain, MRI and CT scans offer the most accurate visualization of soft tissue and nerve compression. If a herniated disc is confirmed, treatment usually starts conservatively with rest, ice, and medication. If symptoms persist, surgical intervention may be recommended.
            </h1>
            <OutlinedButton text="Find a Treatment" />
          </div>
        </div>
      )
    },
    {
      post : (
        <div className=" flex flex-col space-y-[16px] ">
          <h1
            style={{
              fontFamily: "var(--font-reem-kufi)",
              fontWeight: 500,
            }}
            className="text-[#111315] sm:text-4xl text-3xl">
            Pain Management for a Cervical Herniated Disc
          </h1>
          <div className=" flex flex-col space-y-[40px]">
            <h1
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 400,
              }}
              className="text-[#5B5F67] text-md sm:text-xl"
            >
             In the early stages of a cervical disc herniation, pain can often be managed with rest, ice, heat therapy, and anti-inflammatory medications. Muscle relaxants or prescription pain relievers may also be used. If pain continues, physicians may suggest physical therapy to help strengthen the surrounding neck muscles. In some cases, nerve root blocks or epidural steroid injections are used to reduce inflammation and nerve pressure. Our team at Mountain Spine & Care will help determine the best approach based on your condition.
            </h1>
          </div>
        </div>
      )
    },
    {
      post : (
        <div className=" flex flex-col space-y-[16px] ">
        <h1
          style={{
            fontFamily: "var(--font-reem-kufi)",
            fontWeight: 500,
          }}
          className="text-[#111315] sm:text-4xl text-3xl">
          What Causes a Herniated Disc in the Neck?
        </h1>
        <div className=" flex flex-col space-y-[40px]">
          <h1
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 400,
            }}
            className="text-[#5B5F67] text-md sm:text-xl"
          >
           Cervical disc herniation can occur suddenly due to trauma or gradually as part of the aging process. The most common cause is wear and tear, which leads to disc degeneration. Over time, the discs lose elasticity and hydration, making them more prone to rupture. Other contributing factors include poor posture, obesity, repetitive strain, and spinal injury. In people over the age of 30, disc degeneration becomes more common, but even younger patients can suffer from herniated discs if their lifestyle puts excess stress on the spine.
          </h1>

          <GradientOverlayImage
              imageData={'https://mountainspineortho.b-cdn.net/public/cervicalhernia.jpeg'} // Passing static image data
              height="500px"
              gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
            />

        </div>
      </div>
      )
    },
    {
      post : (
        <div className=" flex flex-col space-y-[16px] ">
        <h1
          style={{
            fontFamily: "var(--font-reem-kufi)",
            fontWeight: 500,
          }}
          className="text-[#111315] sm:text-4xl text-3xl">
          Risk Factors for a Cervical Herniated Disc
        </h1>
        <div className=" flex flex-col space-y-[40px]">
          <h1
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 400,
            }}
            className="text-[#5B5F67] text-md sm:text-xl"
          >
           Several factors can increase your risk of developing a cervical herniated disc. These include being overweight, smoking, living a sedentary lifestyle, or engaging in activities that involve repetitive neck strain or heavy lifting. Trauma to the spine or poor posture while sitting or sleeping can also contribute. Herniated discs may present with a wide range of symptoms pain, numbness, tingling, and weakness in the arms or legs so it’s important to get evaluated by a medical professional if you suspect you may have this condition.
          </h1>
        </div>
      </div>
      )
    },
    {
      post : (
        <div className=" flex flex-col space-y-[16px] ">
        <h1
          style={{
            fontFamily: "var(--font-reem-kufi)",
            fontWeight: 500,
          }}
          className="text-[#111315] sm:text-4xl text-3xl">
          Treatment Options for Herniated Discs
        </h1>
        <div className=" flex flex-col space-y-[40px]">
          <h1
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 400,
            }}
            className="text-[#5B5F67] text-md sm:text-xl"
          >
           Treatment for a herniated disc depends on the severity of the condition and the patient’s overall health. Mild cases often respond well to conservative approaches like rest, physical therapy, heat/ice, and anti-inflammatory medication. If these measures fail to provide relief, more advanced treatments such as epidural injections or surgery may be required. Surgical options typically involve removing part or all of the damaged disc to relieve pressure on the spinal nerves. At Mountain Spine & Care, our specialists are trained in minimally invasive procedures that aim to reduce recovery time and preserve neck mobility
          </h1>
        </div>
      </div>
      )
    },
    {
      post : (
        <div className=" flex flex-col space-y-[16px] ">
        <h1
          style={{
            fontFamily: "var(--font-reem-kufi)",
            fontWeight: 500,
          }}
          className="text-[#111315] sm:text-4xl text-3xl">
          Schedule a Consultation Today
        </h1>
        <div className=" flex flex-col space-y-[40px]">
          <h1
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 400,
            }}
            className="text-[#5B5F67] text-md sm:text-xl"
          >
           Cervical herniated discs can significantly impact your daily life but you don’t have to manage the pain alone. Whether you're just beginning to feel discomfort or you've been struggling for months, there are many effective treatments available. At Mountain Spine & Care, our spine surgeons are highly experienced in diagnosing and treating herniated discs through both non-surgical and surgical solutions.<br/><br/>
           Call us today at (855) 853-6542 or fill out our online form to schedule a consultation. You may have more options than you think and recovery may be closer than you realize.
          </h1>
        </div>
      </div>
      )
    }
  ]
},
{
  "title": "Spinal Compression Fractures",
  "tag": "Spine",
  "card_img": 'https://mountainspineortho.b-cdn.net/public/scfcard.png',
  "inTxt_img": 'https://mountainspineortho.b-cdn.net/public/scfarti.jpg',
  "body": "Spinal compression fractures are small cracks or collapses in the vertebrae often caused by osteoporosis trauma or spinal tumors. These fractures can result in sudden back pain posture changes and mobility loss. At Mountain Spine & Orthopedics we provide expert evaluation and treatment supported by complimentary MRI reviews free second opinions and convenient car service to stabilize the spine relieve pain and restore function",
  "detail": "Compression fractures occur when one or more vertebrae weaken and collapse under normal pressure or minor trauma. Osteoporosis is the leading cause especially in older adults but high impact injuries and spinal tumors can also compromise vertebral strength. These fractures can lead to chronic back pain decreased height spinal deformity kyphosis and reduced lung function in severe cases. At Mountain Spine & Orthopedics we begin with a detailed history of symptoms and risk factors such as osteoporosis cancer or trauma. A focused physical exam checks for spinal tenderness alignment and mobility. Complimentary imaging typically X rays MRI or CT is used to identify the location and severity of the fracture and to rule out serious underlying causes. These findings help guide a tailored treatment plan",
  "what_sym": "Symptoms include sudden severe back pain that worsens with movement and improves with rest localized tenderness over the spine loss of height visible stooping or forward curvature of the upper back and in some cases numbness or tingling if nerve structures are involved",
  "risk_fac": "Osteoporosis is the most significant risk factor particularly in postmenopausal women and older adults. Other risks include long term steroid use history of cancer especially metastatic previous spinal fractures smoking poor nutrition and low body weight",
  "diagnose": "Mountain Spine & Orthopedics uses complimentary high resolution imaging to detect fractures and assess vertebral alignment and bone quality. Bone density testing such as DEXA scan may also be performed to evaluate osteoporosis and guide long term management",
  "treatment": "Most fractures heal with conservative care including bracing pain management calcium and vitamin D supplementation and physical therapy. In cases of persistent pain or instability minimally invasive procedures like vertebroplasty or kyphoplasty can stabilize the fracture and restore vertebral height. For patients with osteoporosis we coordinate long term bone health management using medications such as bisphosphonates or anabolic agents",
  "pain_info": "Pain is typically localized and worsens with standing or walking. Our approach aims to stabilize the spine reduce inflammation and strengthen supporting musculature helping patients return to daily activities with confidence",
  "prevent": "Maintaining strong bones through weight bearing exercise calcium and vitamin D intake osteoporosis screening fall prevention strategies and prompt treatment of any bone weakening conditions are key to avoiding compression fractures",
  "schedule": "If you’re experiencing sudden back pain or height loss schedule a consultation with Mountain Spine & Orthopedics today. Receive a complimentary MRI review expert second opinion and convenient transportation then move forward with a personalized plan to address spinal compression fractures and rebuild stability and strength",
  "slug": "spinalcompressionfractures"
},
{
  "title": "Kyphosis",
  "tag": "Spine",
  "card_img": 'https://mountainspineortho.b-cdn.net/public/Kyphosiscard.jpeg',
  "inTxt_img": 'https://mountainspineortho.b-cdn.net/public/Kyphosisarti.png',
  "body": "Kyphosis refers to an exaggerated forward curvature of the thoracic spine that can create a rounded back appearance chronic pain muscle fatigue and in severe cases breathing or digestive issues.  combines high resolution imaging evidence based therapies and patient centered amenities including complimentary MRI reviews free second opinions and convenient car service to correct spinal alignment relieve discomfort and restore confident posture",
  "detail": "A normal thoracic spine curves gently forward balancing the neck and lower back. Degenerative disc collapse osteoporotic compression fractures Scheuermanns disease congenital vertebral anomalies or postural habits can accentuate this curve producing kyphosis. As the apex rounds supporting muscles stretch and weaken ligaments tighten and vertebral bodies may wedge anteriorly leading to pain stiffness and cosmetic concerns. Severe deformity can reduce thoracic cavity space compromising lung capacity and digestive organ function. At  evaluation begins with a comprehensive history capturing age of onset progression speed pain pattern neurologic symptoms and impact on daily functions. A focused exam measures the kyphotic angle with a flexible ruler assesses spinal flexibility and screens for neurologic deficits. Complimentary standing long cassette X rays quantify the Cobb angle sagittal balance and pelvic parameters while high resolution MRI or CT evaluates disc integrity spinal cord space and vertebral structure. These metrics guide a tailored plan that balances non operative correction with surgical precision when needed",
  "what_sym": "Many patients note mid back ache that worsens after prolonged sitting or standing shoulder or neck fatigue from compensatory postures reduced height tight hamstrings and in rigid or severe curves shortness of breath heartburn from compressed abdominal organs or difficulty lying flat",
  "risk_fac": "Risk increases with advancing age and osteoporosis adolescent growth spurts associated with Scheuermanns disease chronic poor posture previous spinal trauma vertebral infections or tumors and genetic disorders affecting connective tissue integrity",
  "diagnose": "Diagnosis includes standing long cassette X rays to measure the Cobb angle and assess sagittal balance and pelvic parameters along with high resolution MRI or CT scans to evaluate disc integrity and spinal cord space.  may also conduct pulmonary function tests for high angle curves and bone density scans to identify osteoporotic fragility. Complimentary evaluations ensure all contributing factors are addressed in the final strategy",
  "treatment": "Flexible postural kyphosis often improves with physiotherapy that strengthens scapular retractors and core muscles ergonomic coaching and structured stretching. Rigid Scheuermanns curves in younger patients may benefit from custom thoracolumbosacral bracing to halt progression. For adults with painful or progressive deformity spine surgeons use minimally invasive osteotomies segmental instrumentation and fusion to restore sagittal balance while protecting the spinal cord and lung function. Postoperative rehabilitation emphasizes gradual extension exercises bone health optimization and lifestyle modifications to maintain alignment gains",
  "pain_info": "Pain from kyphosis often stems from muscle fatigue facet overload and intervertebral disc stress.  uses targeted injections muscle balancing therapy and when needed surgical realignment to deliver durable pain relief and functional improvement",
  "prevent": "Preventive measures include maintaining strong back extensor and core muscles practicing ergonomic posture during work and technology use ensuring adequate calcium and vitamin D intake treating osteoporosis early and monitoring adolescent spinal curves to prevent progression and complications",
  "schedule": "If rounding of the back persistent mid spine pain or breathing changes concern you schedule a consultation with  today. Enjoy a complimentary MRI review thorough second opinion and convenient car service then move forward with a customized plan to correct kyphosis reduce pain and stand tall with confidence",
  "slug": "kyphosis"
},
{
  "title": "Osteoarthritis",  
  "tag": "Spine",
  "card_img": 'https://mountainspineortho.b-cdn.net/public/oste.png',
  "inTxt_img": 'https://mountainspineortho.b-cdn.net/public/ostearti.jpg',
  "body": "Osteoarthritis is a progressive joint condition characterized by the breakdown of articular cartilage, bone spur formation, and low grade inflammation that together cause pain, stiffness, and reduced mobility. Mountain Spine & Orthopedics delivers comprehensive evaluation and evidence based treatment supported by complimentary MRI reviews, free second opinions, and convenient car service to slow disease progression, relieve symptoms, and help you remain active at every stage of life.",
  "detail": "Cartilage acts as a smooth shock absorbing surface that allows bones to glide effortlessly inside a joint. With age, repetitive stress, injury, or mechanical misalignment, cartilage thins and fissures, exposing underlying bone. The body responds by forming osteophytes, thickening the joint capsule, and triggering inflammation inside the synovial lining. These changes limit motion, provoke aching or sharp pain, and can produce swelling or audible grinding. Knees, hips, hands, and the spine are most frequently affected, but any synovial joint can develop osteoarthritic changes over time. At Mountain Spine & Orthopedics, assessment begins with a detailed history covering symptom duration, daily activity limitations, and prior injuries, combined with a focused examination that inspects alignment, range of motion, joint stability, and swelling. Complimentary high resolution MRI or weight bearing X rays visualize cartilage thickness, bone spurs, subchondral cysts, and joint space narrowing. These findings guide a personalized treatment roadmap that addresses both mechanical stressors and inflammatory pain.",
  "what_sym": "Patients often notice deep aching pain that intensifies after activity and eases with rest, morning stiffness lasting under thirty minutes, crepitus or grinding during movement, intermittent swelling, and in advanced stages, joint deformity or instability that hampers everyday tasks such as climbing stairs or opening jars.",
  "risk_fac": "Advancing age, female sex after menopause, obesity that overloads weight bearing joints, previous joint trauma or surgery, repetitive occupational or athletic stress, genetic predisposition to cartilage weakness, and limb malalignment all accelerate cartilage wear and osteophyte growth.",
  "diagnose": "Mountain Spine & Orthopedics may perform ultrasound to detect synovial inflammation or guided aspiration to analyze joint fluid when crystal arthritis is suspected. Complimentary laboratory panels rule out inflammatory arthritides, ensuring precise diagnosis and appropriate therapy.",
  "treatment": "Initial management centers on patient education, weight optimization, low impact aerobic and strengthening exercises, and activity modifications that reduce peak joint loads. Evidence based nutraceuticals, topical or oral anti inflammatory medication, and image guided corticosteroid or hyaluronic acid injections target pain and swelling. For persistent symptoms or structural deformity, our surgeons offer arthroscopic cartilage restoration, realignment osteotomy, or joint replacement using minimally invasive techniques that speed recovery and preserve healthy tissue. Every plan includes coordinated physical therapy to maintain muscle strength and joint flexibility, maximizing treatment benefit.",
  "pain_info": "Osteoarthritic pain typically surfaces during or after activity and may linger as a dull ache at night. Mountain Spine & Orthopedics blends targeted injections, regenerative biologics, bracing, and muscle balancing exercise to break the cycle of inflammation and mechanical stress, producing durable pain relief.",
  "prevent": "Maintaining a healthy body weight, engaging in balanced strength and flexibility training, correcting biomechanical malalignment, addressing acute joint injuries promptly, and avoiding tobacco and excessive alcohol help slow cartilage degradation and preserve joint function.",
  "schedule": "If joint pain or stiffness is limiting your lifestyle, schedule a consultation with Mountain Spine & Orthopedics today. Receive a complimentary MRI review, expert second opinion, and door to door transportation—then move forward with a personalized plan to manage osteoarthritis and safeguard your mobility for the years ahead.",
  "slug": "osteoarthritis"
},
{
  "title": "Rotator Cuff Tear",
  "tag": "Shoulder",
  "card_img": 'https://mountainspineortho.b-cdn.net/public/rctcard.jpg',
  "inTxt_img": 'https://mountainspineortho.b-cdn.net/public/rtcarti.jpg',
  "body": "A rotator cuff tear occurs when one or more of the tendons that stabilize the shoulder joint become partially or fully torn, often causing persistent shoulder pain, weakness, and limited range of motion. Rotator cuff injuries affect up to 30 percent of people over age 60 and can significantly impact daily activities and quality of life. At Mountain Spine & Orthopedics, we provide comprehensive evaluation and treatment plans—supported by complimentary MRI reviews, free second opinions, and door-to-door transportation—to accurately diagnose tears and restore shoulder function.",
  "detail": "The rotator cuff is composed of four muscles and their tendons—supraspinatus, infraspinatus, teres minor, and subscapularis—that surround the shoulder joint, providing dynamic stability and enabling overhead motion. Tears develop due to acute trauma such as a fall on an outstretched arm, chronic degeneration from repetitive overhead activity, or age-related tendon thinning. Partial-thickness tears affect only a portion of the tendon thickness, while full-thickness tears create a complete discontinuity. At Mountain Spine & Orthopedics, our assessment begins with a detailed history of injury mechanism, activity levels, and symptom progression. We perform a focused physical examination—including tests such as the painful arc, the drop arm test, and resisted strength maneuvers—and use high-resolution MRI or diagnostic musculoskeletal ultrasound to determine tear size, tendon retraction, and muscle quality. In select cases, diagnostic arthroscopy may be utilized to visualize tendon integrity directly and address any additional joint pathology.",
  "what_sym": "Patients with a rotator cuff tear typically experience gradual or sudden onset of shoulder pain that worsens with overhead activities, lifting, or reaching behind the back. Night pain that disrupts sleep, weakness when lifting the arm, difficulty combing hair or putting on a coat, and a clicking or popping sensation are common. In large tears, the shoulder may feel unstable or ‘give way’ during certain movements.",
  "risk_fac": "Risk factors include advancing age, repetitive overhead sports or occupations such as swimming, tennis, painting, and carpentry, a history of shoulder impingement or arthritis, smoking, and systemic factors like diabetes that impair tendon health. Genetic predisposition and poor posture can also contribute to chronic tendon degeneration.",
  "diagnose": (
    <div className=" flex flex-col space-y-[16px] items-center justify-center">
      <p>Diagnosis relies on a combination of clinical examination and imaging. We perform specific orthopedic tests—including the empty can test and lift-off maneuvers—to localize the tear and assess functional deficit. MRI remains the gold standard for visualizing tendon tears, muscle atrophy, and fatty infiltration, while ultrasound offers a dynamic, cost-effective alternative. Plain X rays help rule out bony spurs and arthritis. Electromyography may be indicated for chronic tears to evaluate muscle function and nerve involvement.</p>
      <Image src={'https://mountainspineortho.b-cdn.net/public/rotatorcufftear3.png'} alt="rotator cuff tear" width={300} height={300} layout="cover" className="w-full h-full object-fill aspect-video rounded-xl overflow-hidden"/>
    </div>
  ),
  "treatment": "Initial management for small or partial tears often includes activity modification, nonsteroidal anti-inflammatory medications, physical therapy focused on rotator cuff strengthening and scapular stabilization exercises, and image-guided corticosteroid injections for pain relief. For patients with persistent symptoms, larger tears, or functional deficits, minimally invasive arthroscopic rotator cuff repair is performed using suture anchors and tendon mobilization techniques to reattach the torn tendon to bone. Postoperative rehabilitation follows a phased protocol to protect the repair, gradually restore range of motion, and strengthen the shoulder girdle to ensure long-term success.",
  "pain_info": "Pain in a rotator cuff tear arises from tendon inflammation, mechanical impingement under the acromion, and inflammatory mediators that sensitize nerve endings. Patients often report deep, aching discomfort that intensifies with arm elevation and activities such as lifting or throwing. Nighttime pain is common due to pressure on the shoulder when lying on the affected side.",
  "prevent": "To reduce the risk of rotator cuff injury, maintain shoulder flexibility and strength through regular stretching and rotator cuff–targeted exercises, practice proper warm-up and cool-down routines before sports or repetitive overhead work, use ergonomic tools and techniques to minimize shoulder strain, and address early symptoms promptly with rest and professional evaluation.",
  "schedule": "If you are experiencing shoulder pain, weakness, or limited mobility, schedule a consultation with Mountain Spine & Orthopedics today. Take advantage of our complimentary MRI review, free second opinion, door-to-door transportation, and telehealth options to receive a precise diagnosis and a personalized treatment plan designed to restore your shoulder health and return you to the activities you enjoy.",
  "slug": "rotatorcufftear"
},
{
  "title": "ACL Injury",
  "tag": "Knee",
  "card_img": 'https://mountainspineortho.b-cdn.net/public/aclcard.webp',
  "inTxt_img": 'https://mountainspineortho.b-cdn.net/public/aclcard.png',
  "body": "An ACL injury occurs when the anterior cruciate ligament—the primary stabilizer of knee rotation and forward tibial translation—is overstretched or torn, commonly due to sudden pivoting, abrupt deceleration, or direct impact. Patients often report a popping sound at the moment of injury, followed by rapid swelling and a sensation of instability. At Mountain Spine & Orthopedics, we specialize in prompt, accurate diagnosis and personalized treatment plans supported by complimentary MRI reviews, free second opinions, and door-to-door transportation. Our multidisciplinary approach ensures patients receive advanced care to restore knee stability, alleviate pain, and return to daily activities and sports with confidence.",
  "detail": "The anterior cruciate ligament is one of four major ligaments within the knee joint, responsible for maintaining rotational stability and preventing excessive forward translation of the tibia relative to the femur. Injuries range from microtears and partial disruptions to complete ruptures classified as grade I, II, or III based on fiber damage. The most common mechanism involves sudden deceleration, pivoting, or landing from a jump with a valgus knee position, placing immense stress on the ligament fibers. At Mountain Spine & Orthopedics, evaluation begins with a thorough history of the injury mechanism, symptom onset, and activity level. A focused physical examination includes Lachman, anterior drawer, and pivot shift tests to assess ligament integrity and knee laxity. High-resolution MRI confirms the diagnosis by visualizing the extent of ligament tears, associated bone bruises, and concomitant meniscal or chondral injuries. In select cases, diagnostic arthroscopy provides direct visualization to guide surgical planning and address other intra-articular pathology.",
  "what_sym": "Common symptoms of an ACL injury include an audible 'pop' at the time of injury, rapid knee swelling due to hemarthrosis, severe pain initially that may subside, a sensation of giving way or instability, difficulty bearing weight or walking, limited range of motion, and persistent discomfort with twisting or deceleration movements.",
  "risk_fac": "Risk factors for ACL injuries include participation in high-risk sports such as soccer, basketball, football, and skiing; sudden changes in direction, pivoting, or landing mechanics that place the knee in valgus; muscle imbalances between the quadriceps and hamstrings; poor neuromuscular control; anatomical factors such as a wider pelvis in female athletes; previous knee injuries; and environmental factors such as uneven playing surfaces and inadequate footwear.",
  "diagnose": "Diagnosis of an ACL injury relies on clinical examination and imaging studies. We perform Lachman, anterior drawer, and pivot shift tests to evaluate ligament laxity and knee stability. MRI remains the gold standard imaging modality, accurately depicting the extent of ACL fiber disruption, bone marrow edema patterns, and associated meniscal or cartilage injuries. In rare circumstances where MRI is contraindicated or inconclusive, diagnostic arthroscopy may be performed to confirm the diagnosis and assess other intra-articular findings.",
  "treatment": "Treatment options for ACL injuries depend on tear severity, patient age, activity level, and concomitant injuries. Non-surgical management—including bracing, activity modification, and a structured rehabilitation program focusing on strength, stability, and proprioception—may suffice for partial tears or low-demand patients. For complete tears or athletes seeking return to pivoting sports, ACL reconstruction surgery is often indicated. At Mountain Spine & Orthopedics, we employ minimally invasive arthroscopic ACL reconstruction techniques using autograft or allograft tissue, combined with accelerated rehabilitation protocols to optimize graft healing, restore function, and facilitate safe return to sports.",
  "pain_info": "Pain in ACL injuries arises from acute ligament fiber disruption, hemarthrosis, and subsequent inflammation of intra-articular structures. Patients often experience sharp pain initially, followed by stiffness and discomfort that intensifies during weight-bearing, twisting, or rapid directional changes. Our treatment approach addresses both mechanical instability and inflammatory pain through a combination of surgical intervention, targeted rehabilitation, and pain management techniques.",
  "prevent": "To reduce the risk of ACL injuries, athletes and active individuals should engage in neuromuscular training programs focusing on proper landing mechanics, strength and balance exercises for the quadriceps, hamstrings, hips, and core; plyometric drills emphasizing safe deceleration; flexibility training to maintain joint mobility; and use of appropriate footwear and protective bracing during high-risk activities.",
  "schedule": "If you suspect an ACL injury due to knee pain, swelling, or instability, schedule a consultation with Mountain Spine & Orthopedics today. Benefit from our complimentary MRI review, free second opinion, door-to-door transportation, and telehealth options as we develop a comprehensive evaluation and personalized treatment plan to restore your knee stability, function, and confidence.",
  "slug": "aclinjury"
},
{
  "title": "Labral Tears",  
  "tag": "Shoulder",
  "card_img": 'https://mountainspineortho.b-cdn.net/public/labraltear.jpg',
  "inTxt_img": 'https://mountainspineortho.b-cdn.net/public/LabralTeararti.png',
  "body": "A labral tear is a rupture of the fibrous cartilage ring that deepens and stabilizes either the shoulder glenoid or hip acetabular socket. These tears can produce pain clicking and instability that limit athletic performance and daily tasks. At  we pair cutting edge imaging with tailored non operative and arthroscopic solutions supported by complimentary MRI reviews free second opinions and convenient car service to repair the labrum restore smooth motion and protect long term joint health",
  "detail": "The labrum acts like a suction cup gasket enlarging the socket cushioning the joint and anchoring ligaments. Traumatic dislocation repetitive overhead or pivoting sports congenital dysplasia or degenerative wear can split this tissue. In the shoulder a superior labrum anterior posterior lesion may follow a fall onto an outstretched hand or a powerful throw. In the hip femoroacetabular impingement or dysplasia often underlies acetabular labral tears. Frayed edges or detached segments allow joint fluid to leak reducing stability and generating catching sensations that accelerate cartilage wear and early arthritis. At  assessment begins with a detailed account of injury mechanism sport demands and positional pain coupled with provocative exams such as the OBrien or FADIR tests. Complimentary high resolution MRI arthrography highlights contrast extravasation through labral defects while 3 D CT or ultrasound assesses bony morphology and dynamic motion. These findings inform an individualized plan aimed at preserving native tissue whenever possible",
  "what_sym": "Patients commonly experience sharp or aching pain deep in the joint clicking or catching during rotation sense of giving way or instability loss of range of motion and decreased power during overhead throws or hip flexion activities. Pain often intensifies after prolonged sitting in hip cases or repeated elevation in shoulder cases",
  "risk_fac": "High risk groups include athletes engaged in baseball pitching volleyball spikes hockey soccer ballet or golf individuals with femoroacetabular impingement or hip dysplasia workers performing repetitive overhead lifting patients with connective tissue laxity disorders and those with prior joint dislocations or trauma",
  "diagnose": "Beyond MRI arthrography  may administer diagnostic intra articular anesthetic injections to confirm the labrum as the primary pain source. Dynamic ultrasound captures real time impingement while CT quantifies cam or pincer lesions in hip cases. These complimentary studies ensure surgical indications are precise and evidence based",
  "treatment": "Initial care emphasizes activity modification targeted physiotherapy to rebalance surrounding muscles anti inflammatory or biologic injections and posture or technique refinement to reduce impingement. Persistent pain mechanical symptoms or instability prompt arthroscopic repair where anchors reattach the labrum to bone restore the suction seal and address underlying cam pincer or bony Bankart lesions. Postoperative rehabilitation advances through protected motion progressive strengthening and sport specific drills guided by milestones that safeguard the repair while expediting return to play.  tailors protocols to each patient sport position and season goals",
  "pain_info": "Labral tear pain often presents as deep pinpoint discomfort exacerbated by rotation or sustained load. By correcting mechanical conflict and nurturing tissue healing through phased rehabilitation our integrated approach markedly diminishes pain and restores confidence in joint stability",
  "prevent": "Maintaining balanced shoulder rotator cuff and scapular stabilizer strength optimizing hip and core flexibility refining overhead or pivot mechanics gradual sport specific conditioning and early management of impingement morphology reduce labral stress and prevent future tears",
  "schedule": "If clicking catching or joint pain is limiting your performance schedule a consultation with  today Receive a complimentary MRI review comprehensive second opinion and convenient transportation then move forward with a personalized strategy to heal labral tears and return to peak activity",
  "slug": "labraltears"
},
{
  "title": "Torn Meniscus",
  "tag": "Knee",
  "card_img": 'https://mountainspineortho.b-cdn.net/public/tmcard.png',
  "inTxt_img": 'https://mountainspineortho.b-cdn.net/public/tmarti.webp',
  "body": "A torn meniscus is a tear of the C shaped cartilage pads that cushion and stabilize the knee joint, often resulting in pain, swelling, and mechanical symptoms that limit mobility. At Mountain Spine & Orthopedics, we provide expert evaluation with high resolution MRI, personalized treatment plans, and supportive services including complimentary MRI reviews, free second opinions, and door to door transportation to help you recover knee function and return to the activities you love.",
  "detail": "The menisci are two C shaped fibrocartilage structures that distribute load, absorb shock, and provide stability to the knee. Tears occur from acute twisting injuries, direct impact, or gradual degeneration. Tear patterns include vertical longitudinal, horizontal cleavage, flap, radial, and complex tears, each requiring a tailored approach. Degenerative tears are more common in patients over 40 due to age related wear. At Mountain Spine & Orthopedics, evaluation begins with a detailed history of your injury mechanism, symptom onset, and activity level. A focused physical exam assesses joint line tenderness, range of motion, and mechanical signs such as clicking or locking. We use high resolution MRI to visualize tear location, size, and associated cartilage damage. In select cases, diagnostic arthroscopy may be recommended to confirm the diagnosis and address other intra-articular pathology.",
  "what_sym": "Symptoms of a torn meniscus include localized pain along the knee joint line, swelling or effusion, stiffness, difficulty fully straightening or bending the knee, locking or catching sensations, a feeling of instability or giving way, and discomfort with twisting or squatting movements.",
  "risk_fac": "Risk factors for meniscal tears include sports that involve pivoting and sudden changes in direction such as basketball and soccer, age related degeneration, previous knee injuries, muscle weakness around the knee, obesity, and improper training or exercise techniques.",
  "diagnose": "Diagnosis involves a thorough clinical examination with tests like the McMurray’s and Apley grind to reproduce mechanical symptoms. Imaging with MRI offers detailed visualization of tear type, location, and severity. When MRI is contraindicated or additional clarity is needed, diagnostic arthroscopy can be performed to inspect the meniscus directly and evaluate joint surface health.",
  "treatment": "Conservative management often succeeds for small tears and includes rest, ice, compression, elevation, physical therapy to strengthen quadriceps and hamstrings, anti inflammatory medications, and activity modification. For tears causing persistent mechanical symptoms or failing nonsurgical care, arthroscopic meniscal repair or partial meniscectomy is recommended. At Mountain Spine & Orthopedics, we use state of the art minimally invasive arthroscopy techniques to preserve as much healthy cartilage as possible, optimize recovery, and minimize long term joint degeneration.",
  "pain_info": "Pain from a torn meniscus arises from both mechanical impingement of torn fragments and inflammation of the synovial lining. Swelling results from fluid accumulation within the joint and release of inflammatory mediators. Patients often describe sharp pain with weight bearing, twisting, or deep knee bending.",
  "prevent": "To reduce the risk of meniscal tears, maintain strong and flexible muscles around the knee through regular strengthening and stretching exercises, practice proper warm up before activities, use safe techniques when pivoting or landing, wear supportive footwear, and maintain a healthy weight to lessen joint stress.",
  "schedule": "If you are experiencing knee pain, swelling, locking, or instability, schedule a consultation with Mountain Spine & Orthopedics today. Benefit from a complimentary MRI review, free second opinion, and door to door transportation as you take the first step toward accurate diagnosis and effective treatment of your meniscal tear.",
  "slug": "tornmeniscus"
},

{
  "title": "Sacroiliac Joint Dysfunction",
  "tag": "Spine",
  "card_img": 'https://mountainspineortho.b-cdn.net/public/sjdcard.jpg',
  "inTxt_img": 'https://mountainspineortho.b-cdn.net/public/sjdarti.jpg',                                                                                                                                                                                                                                                                                                                                                                                                                 
  "body": "Sacroiliac SI Joint Dysfunction arises when the small but critical joints connecting the spine to the pelvis become inflamed or move abnormally producing lower back buttock or groin pain that can mimic sciatica. Mountain Spine & Orthopedics delivers precision diagnostics and evidence based therapies supported by complimentary MRI reviews free second opinions and convenient car service to stabilize the SI joint relieve pain and restore effortless movement",
  "detail": "The sacroiliac joints transfer load between the upper body and legs. Trauma pregnancy related ligament laxity leg length discrepancy inflammatory arthritis or previous lumbar fusion can disrupt their finely balanced motion triggering inflammation and pain with sitting standing or walking. Misdiagnosis is common because SI pain often radiates into the thigh or groin and overlaps with lumbar disc symptoms. Accurate identification is essential to avoid unnecessary spine surgery and to guide targeted treatment that restores normal joint mechanics. At Mountain Spine & Orthopedics evaluation begins with a detailed history of pain triggers such as prolonged standing transitional movements or sleep disturbances. A focused examination uses provocative maneuvers Gaenslen FABER and thigh thrust tests to reproduce SI pain while ruling out lumbar nerve compression. Complimentary high resolution MRI or CT excludes disc or hip pathology and visualizes joint inflammation or degeneration. Diagnostic fluoroscopy guided SI joint anesthetic injections offered at no additional cost confirm the joint as the primary pain generator ensuring that subsequent therapy is precisely directed",
  "what_sym": "Deep aching pain localized to one side of the lower back or buttock radiating into the groin thigh or occasionally the calf pain that intensifies when rising from a seated position climbing stairs or rolling over in bed and a sensation of instability or giving way in the pelvis during walking or standing on one leg",
  "risk_fac": "Pregnancy and postpartum ligamentous laxity prior lumbar fusion that alters pelvic load leg length discrepancy inflammatory conditions such as ankylosing spondylitis traumatic falls on the buttocks repetitive heavy lifting and obesity that increases pelvic stress all heighten SI joint dysfunction risk",
  "diagnose": "Diagnosis includes physical tests imaging and dual diagnostic intra articular injections spaced days apart to ensure robust confirmation. A pain reduction of at least 75 percent after anesthetic injection substantiates the SI joint as the pain source guiding therapeutic planning",
  "treatment": "Conservative management starts with activity modification pelvic and core stabilization physiotherapy anti inflammatory medication and pelvic belts that limit excessive motion. Image guided corticosteroid or biologic injections reduce joint inflammation and provide substantial relief. For chronic refractory pain our surgeons offer minimally invasive SI joint fusion using triangular titanium implants or 3 D printed porous implants that promote rapid bone integration while preserving surrounding soft tissue. Post procedure rehabilitation emphasizes gradual weight bearing progression core strengthening and gait correction to maintain long term stability",
  "pain_info": "SI joint pain typically sharpens during transitional movements standing from sitting rolling in bed or climbing stairs and eases with short bouts of walking or lying flat. By stabilizing joint motion and calming inflammation our integrated approach delivers lasting pain relief and renewed confidence in daily activities",
  "prevent": "Maintaining balanced core and hip strength correcting leg length discrepancies with orthotics practicing proper lifting mechanics avoiding prolonged asymmetrical postures managing body weight and addressing inflammatory conditions early all protect SI joint integrity",
  "schedule": "If lower back or buttock pain is hindering your life schedule a consultation with Mountain Spine & Orthopedics today. Receive a complimentary MRI review comprehensive second opinion and door to door transportation then move forward with a personalized plan to conquer Sacroiliac Joint Dysfunction and regain stable pain free mobility",
  "slug": "sacroiliacjointdysfunction"
},

{
  "title": "Trochanteric Bursitis",
  "tag": "Lower Spine",
  "card_img": 'https://mountainspineortho.b-cdn.net/public/tbcard.avif',
  "inTxt_img": 'https://mountainspineortho.b-cdn.net/public/tbarti.webp',
  "body": "Trochanteric bursitis is a painful condition caused by inflammation of the bursa over the outer hip leading to discomfort with walking climbing stairs or lying on the affected side. At Mountain Spine & Orthopedics we provide expert care supported by complimentary MRI reviews free second opinions and convenient car service to reduce inflammation relieve pain and restore hip function",
  "detail": "The trochanteric bursa is a fluid filled sac that cushions the outer part of the hip where tendons glide over bone. Repetitive stress direct trauma hip arthritis leg length discrepancies or improper biomechanics can irritate this bursa resulting in inflammation and pain. Although common in runners and older adults anyone can develop this condition. At Mountain Spine & Orthopedics diagnosis begins with a full clinical history and physical exam focused on pinpoint tenderness over the outer hip range of motion and gait analysis. Complimentary MRI or ultrasound imaging may be used to confirm inflammation rule out tendon tears and assess surrounding structures",
  "what_sym": "Sharp or aching pain on the outer hip or thigh pain when lying on the affected side discomfort when climbing stairs or rising from a chair and tenderness to the touch. The pain may radiate down the leg but does not usually go below the knee",
  "risk_fac": "Overuse or repetitive hip movement hip arthritis prior hip injury or surgery poor posture or gait obesity leg length differences and tight iliotibial bands all contribute to the development of this condition",
  "diagnose": "In addition to a physical exam Mountain Spine & Orthopedics may perform complimentary imaging to confirm bursal inflammation and rule out other causes like tendonitis or hip joint arthritis. Lab work may be used if infection or systemic inflammation is suspected",
  "treatment": "Initial care includes rest ice physical therapy to correct biomechanics and stretch the IT band and anti inflammatory medications. Image guided corticosteroid injections can provide rapid relief in persistent cases. If symptoms do not resolve with conservative care surgical bursectomy or IT band release may be considered. Every treatment plan is tailored to the patient’s pain level goals and activity needs",
  "pain_info": "Pain from trochanteric bursitis is typically sharp with movement and aching at rest often worsening when lying on the affected side. Our treatments reduce inflammation and restore pain free movement",
  "prevent": "Maintaining strong hip and core muscles using proper form during exercise addressing leg length discrepancies managing weight and stretching tight structures like the IT band help reduce the risk of recurrence",
  "schedule": "If outer hip pain is limiting your comfort or mobility schedule a consultation with Mountain Spine & Orthopedics today. Receive a complimentary MRI review free second opinion and door to door transportation then move forward with a plan to resolve trochanteric bursitis and restore your active lifestyle",
  "slug": "trochantericbursitis"
},
{
  "title": "Carpal Tunnel Syndrome",
  "tag": "Hand",
  "card_img": 'https://mountainspineortho.b-cdn.net/public/CarpalTunnelSyndrome.png',
  "inTxt_img": 'https://mountainspineortho.b-cdn.net/public/CarpalTunnelSyndromearti.png',
  "body": "Carpal Tunnel Syndrome is a nerve compression disorder affecting the median nerve in the wrist often causing pain tingling and weakness in the hand. At  our team offers precise diagnostics and evidence based treatments to relieve symptoms restore hand function and protect your quality of life with complimentary patient amenities",
  "detail": "Carpal Tunnel Syndrome develops when the carpal tunnel a narrow passage on the palm side of the wrist narrows or when tissues around the flexor tendons swell placing pressure on the median nerve. Repeated hand motions long periods of keyboard use variations in wrist anatomy or conditions such as diabetes and thyroid imbalance can contribute to CTS. Symptoms start gradually and worsen over time interfering with tasks like gripping objects or typing. At  our experts perform detailed clinical assessments combined with complimentary MRI or ultrasound imaging to confirm diagnosis and pinpoint underlying factors. We deliver personalized patient focused care with free second opinions and car service to ensure comfort and confidence throughout your treatment journey",
  "what_sym": "Common signs include intermittent or constant numbness burning or tingling in the thumb index middle and ring fingers weakness that leads to dropping objects nighttime pain that disturbs sleep and reduced dexterity making fine motor tasks challenging",
  "risk_fac": "Key factors include repetitive wrist motions prolonged computer or tool use previous wrist fractures or sprains inflammatory conditions such as rheumatoid arthritis pregnancy related fluid retention diabetes thyroid disorders obesity and a genetic tendency to a narrower carpal tunnel",
  "diagnose": "Diagnosis starts with a detailed medical history and physical exam including provocative tests such as Tinels and Phalens maneuvers.  then uses nerve conduction studies electromyography and complimentary high resolution imaging to measure median nerve compression accurately and rule out other causes",
  "treatment": "Our step by step treatment plan begins with conservative measures such as activity modification ergonomic changes wrist splinting especially at night anti inflammatory medication and targeted hand therapy. If symptoms persist we offer ultrasound guided corticosteroid injections for fast relief. Severe or resistant cases may benefit from endoscopic or open carpal tunnel release using microsurgical techniques that shorten recovery and preserve function",
  "pain_info": "Pain from CTS can range from mild discomfort to sharp shooting sensations that travel up the forearm and often worsen with sustained wrist flexion or extension or by performing tasks without break.  provides comprehensive pain management combining therapeutic exercise splinting medication and targeted injections when needed to ease nerve irritation",
  "prevent": "Preventive steps include keeping wrists in neutral positions during repetitive activities taking regular stretch breaks using ergonomic keyboards and tools managing health conditions effectively and doing strengthening exercises for forearm and hand muscles to reduce tendon inflammation",
  "schedule": "Contact  today to book your personalized consultation. Benefit from complimentary MRI or ultrasound reviews free second opinions and car service for smooth convenient care as you recover hand function and get lasting relief from Carpal Tunnel Syndrome",
  "slug": "carpaltunnelsyndrome"
},
  {
    "title": "Back Pain",
    "tag": "Spine",
    "card_img": 'https://mountainspineortho.b-cdn.net/public/BackPaincard.jpg',
    "inTxt_img": 'https://mountainspineortho.b-cdn.net/public/BackPaintxt.jpeg',
    "body": "Back pain refers to discomfort or severe pain that can appear in the lower, middle, or upper back and often limits daily activity.  creates complete treatment plans that blend modern techniques with compassionate, patient focused care to give lasting relief and restore mobility.",
    "detail": "Back pain can arise anywhere along the spine, from the neck to the lower back. Causes include muscle strain, ligament sprain, herniated discs, degenerative changes, or structural concerns such as spinal stenosis or scoliosis. Ongoing or intense pain disrupts daily routines and affects both physical and emotional health. The team at  performs careful evaluations using advanced tools that include complimentary MRI readings, free second opinions, and convenient car service so each patient receives clear answers and support throughout care.",
    "what_sym": "Possible signs are steady aching, sharp or stabbing sensations, pain that radiates into legs or arms, muscle tightness or spasms, stiffness, and limited range of motion.",
    "risk_fac": "Factors that raise the chance of back pain include growing age, a sedentary lifestyle, poor posture, extra body weight, heavy lifting, repetitive motion, previous back injury, and family tendency toward spinal problems or degeneration.",
    "diagnose": "Diagnosis starts with a complete medical history and a thorough physical exam, followed by complimentary MRI scans or other imaging so our specialists can locate the exact source of pain and select the best treatment.",
    "treatment": "Personalized plans may contain physical therapy, targeted exercise, pain relief medicine, spinal injections, lifestyle changes, and when needed minimally invasive surgery. The objective is to ease pain, restore function, and improve quality of life as safely and quickly as possible.",
    "pain_info": "Back pain may vary from mild occasional soreness to severe continuous discomfort. Identifying individual triggers and following a structured plan from  can greatly reduce symptoms and support daily comfort.",
    "prevent": "Prevention steps include regular physical activity, keeping a healthy weight, using correct lifting techniques, choosing ergonomic furniture, maintaining good posture, and practicing routine stretching and strengthening exercises.",
    "schedule": "Arrange a consultation with  today. Benefit from complimentary MRI review, a free second opinion, and convenient transportation that makes your path to relief smooth and comfortable.",
    "slug": "backpain"
  },

  {
    "title": "Bulging Disc",
    "tag": "Spine",
    "card_img": 'https://mountainspineortho.b-cdn.net/public/BulgingDisc.png',
    "inTxt_img": 'https://mountainspineortho.b-cdn.net/public/BulgingDiscarti.png',
    "body": "A bulging disc occurs when an intervertebral disc protrudes beyond its normal boundary and may compress nearby nerves causing pain numbness or weakness. At  our specialists provide targeted treatments designed to relieve symptoms restore function and enhance quality of life through compassionate patient focused care.",
    "detail": "A bulging disc develops when a spinal disc which acts as a shock absorber between vertebrae extends beyond its typical outline. This can result from aging wear and tear repetitive strain or injury and most often affects the lower back or neck leading to discomfort or nerve compression. At  our dedicated team uses state of the art diagnostic tools including complimentary MRI readings to assess each case accurately. We tailor care plans to individual needs and support every step with free second opinions and complementary car service to ensure comfort and convenience.",
    "what_sym": "Common symptoms include localized pain at the affected level radiating pain into the arms or legs tingling or numbness muscle weakness stiffness and reduced range of motion.",
    "risk_fac": "Risk factors include advancing age repetitive heavy lifting or strain sedentary lifestyle poor posture excess body weight smoking and genetic predisposition.",
    "diagnose": "Diagnosis begins with a thorough physical examination and detailed patient history followed by advanced imaging such as complimentary MRI scans. Accurate identification of the bulging disc and its severity is essential for creating an effective treatment plan.",
    "treatment": "Personalized treatment strategies may include physical therapy and guided exercises pain management medications spinal injections lifestyle modifications and minimally invasive surgical procedures when needed. Our goal is to relieve pain restore function and help you resume everyday activities quickly.",
    "pain_info": "Pain from a bulging disc can range from mild discomfort to severe debilitating sensations often worsening with certain movements or positions. Expert pain management at  greatly improves comfort and supports better daily functioning.",
    "prevent": "Preventive measures include regular exercise maintaining a healthy weight practicing proper lifting techniques ensuring good posture and engaging in consistent stretching and strengthening exercises.",
    "schedule": "Contact  today to schedule your personalized consultation. Benefit from complimentary MRI reviews free second opinions and complementary transportation services for a smooth and effective path to relief.",
    "slug": "bulgingdisc"
  },
{
  "title": "Pinched Nerve",
  "tag": "Spine",
  "card_img": 'https://mountainspineortho.b-cdn.net/public/PinchedNerve.png',
  "inTxt_img": 'https://mountainspineortho.b-cdn.net/public/PinchedNervearti.png',
  "body": "A pinched nerve, also called nerve compression or radiculopathy, occurs when surrounding tissues such as discs, bones, or swollen soft tissue press against a spinal or peripheral nerve producing pain, numbness, or weakness along the nerve’s path. Mountain Spine & Orthopedics offers precise diagnostics and targeted therapies supported by complimentary MRI reviews, free second opinions, and convenient car service to relieve compression, restore sensation, and get you moving comfortably again.",
  "detail": "Nerves travel through narrow anatomical corridors surrounded by discs, ligaments, muscles, and bones. Herniated discs, degenerative bone spurs, thickened ligaments, or acute swelling after injury can narrow these passageways and irritate or compress the nerve. In the spine, cervical nerve compression may trigger arm pain or tingling while lumbar compression often produces sciatica that radiates down the leg. Peripheral entrapments such as carpal tunnel syndrome arise when nerves are squeezed in limb tunnels. Persistent pressure disrupts nerve signaling leading to pain, altered sensation, and muscle weakness if untreated. At Mountain Spine & Orthopedics evaluation begins with a thorough history detailing symptom onset, aggravating positions, occupational demands, and red flag signs like progressive weakness or bladder changes. A focused neurologic examination maps sensory deficits, reflex alterations, and motor strength. Complimentary high resolution MRI pinpoints structural causes whether disc herniation, stenosis, or soft tissue swelling while electromyography distinguishes nerve root compression from peripheral neuropathy. These data guide an individualized treatment strategy that addresses both inflammation and mechanical pressure.",
  "what_sym": "Patients describe sharp, burning, or electric like pain radiating along the nerve pathway accompanied by numbness, tingling, or pins and needles in the limb or region served by the nerve. Muscle weakness, diminished grip strength, or foot drop can develop when compression persists and symptoms often worsen with specific neck or back positions or repetitive limb motions.",
  "risk_fac": "Age related disc degeneration, repetitive heavy lifting, prolonged poor posture, obesity that increases spinal load, inflammatory conditions causing tissue swelling, prior injuries, and occupations or sports with repetitive motions all heighten the likelihood of nerve compression.",
  "diagnose": "Alongside MRI and nerve conduction studies, Mountain Spine & Orthopedics may employ selective diagnostic nerve root or peripheral nerve blocks to confirm the exact compression site. These complimentary assessments ensure treatment targets the true pain generator and avoids unnecessary procedures.",
  "treatment": "Initial care emphasizes activity modification, ergonomic adjustments, anti inflammatory or neuropathic medication, and a structured physiotherapy program that strengthens supporting muscles and improves posture. Image guided epidural steroid injections or peripheral nerve injections deliver medication directly to the compressed nerve reducing inflammation and pain. When structural narrowing remains severe or neurologic deficits progress our surgeons perform minimally invasive decompression techniques such as microdiscectomy, foraminotomy, or carpal tunnel release to free the nerve while preserving healthy tissue. Post procedure rehabilitation focuses on restoring strength, flexibility, and safe movement patterns to prevent recurrence.",
  "pain_info": "Pain from a pinched nerve often spikes with certain movements or sustained positions and may ease with gentle stretching or positional changes. Mountain Spine & Orthopedics combines targeted injections, therapeutic exercise, and ergonomic coaching to break the pain inflammation cycle and foster nerve healing.",
  "prevent": "Maintaining strong core and limb muscles, practicing proper lifting mechanics, optimizing workstation ergonomics, taking regular breaks from repetitive motion, controlling body weight, and addressing early degenerative changes help prevent nerve compression and recurrent flare ups.",
  "schedule": "If radiating pain, numbness, or weakness is affecting your life, schedule a consultation with Mountain Spine & Orthopedics today. Receive a complimentary MRI review, comprehensive second opinion, and door to door transportation then move forward with a personalized plan to relieve your pinched nerve and regain comfortable confident motion.",
  forum : [
    {
      post : (
        <div className=" flex flex-col space-y-[16px] ">
          <h1 
          style={{
            fontFamily: "var(--font-reem-kufi)",
            fontWeight: 500,
          }}
          className="text-[#111315] text-2xl">
            What Is a Pinched Nerve?
          </h1>
          <div  className=" flex flex-col space-y-[40px]">
            <h1
             style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 400,
            }}
            className="text-[#5B5F67] text-md sm:text-xl"
            >
              A pinched nerve occurs when soft tissue or bone compresses a nearby nerve root, interrupting its ability to transmit signals correctly. This can result in pain that radiates from the spine to the extremities, depending on the location of the compression. When the cervical spine is affected, symptoms often extend into the arms or hands. If the lumbar spine is involved, the pain can travel into the buttocks, legs, or feet.<br/><br/>
              Common causes of nerve compression include herniated discs, bone spurs, spinal stenosis, and poor posture. Over time, continued pressure can lead to worsening symptoms and even permanent nerve damage if not treated properly.
            </h1>
            <GradientOverlayImage
              imageData={'https://mountainspineortho.b-cdn.net/public/pinchednerve.jpeg'} // Passing static image data
              height="500px"
              gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
            />
            <h1 
           style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 400,
          }}
          className="text-[#5B5F67] text-md sm:text-xl"
            >
              Many patients report that pinched nerve pain worsens with movement or after long periods of sitting. Some also experience burning sensations or weakness in the arms or legs. Early diagnosis and treatment are essential to preventing long-term nerve damage and restoring full function.
            </h1>

            <OutlinedButton text="Do I have this Condition?"/>
          </div>
        </div>
      )
    },
    {
      post : (
        <div className=" flex flex-col space-y-[16px] ">
          <h1 
          style={{
            fontFamily: "var(--font-reem-kufi)",
            fontWeight: 500,
          }}
          className="text-[#111315] text-2xl">
           Symptoms of a Pinched Nerve
          </h1>
          <div  className=" flex flex-col space-y-[40px]">
            <h1
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 400,
            }}
            className="text-[#5B5F67] text-md sm:text-xl"
            >
              Symptoms of a pinched nerve depend on where the nerve is compressed, but common warning signs include:<br/>
              <li>A sharp or burning pain radiating into the arms or legs</li><br/>
              <li>Numbness or tingling in the affected limb</li><br/>
              <li>Muscle weakness or feeling that the limb is "asleep"</li><br/>
              <li>Pain that worsens with certain movements, like turning the head or standing up</li><br/>
              <li>Discomfort that improves slightly when leaning forward or resting</li><br/>
            </h1>
            
            <h1 
          style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 400,
          }}
          className="text-[#5B5F67] text-md sm:text-xl"
            >
              Pinched nerve symptoms can come and go or be constant, depending on the cause. If left untreated, nerve compression may lead to permanent nerve damage, chronic pain, or muscle atrophy. Recognizing these early warning signs is the first step toward finding lasting relief.
            </h1>
            <OutlinedButton text="Find a Treatment"/>
            <GradientOverlayImage
              imageData={'https://mountainspineortho.b-cdn.net/public/pinchednerve2.jpeg'} // Passing static image data
              height="500px"
              gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
            />
          </div>
        </div>
      )
    },
    {
      post : (
        <div className=" flex flex-col space-y-[16px] ">
          <h1 
          style={{
            fontFamily: "var(--font-reem-kufi)",
            fontWeight: 500,
          }}
          className="text-[#111315] text-2xl">
            Types of Pinched Nerve Conditions
          </h1>
          <div  className=" flex flex-col space-y-[40px]">
            <h1
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 400,
            }}
            className="text-[#5B5F67] text-md sm:text-xl"
            >
            Several spinal conditions can lead to pinched nerves. Herniated discs are one of the most common causes. When the soft inner material of the disc bulges out, it can press against nearby nerves and cause pain, tingling, or numbness. Spinal stenosis, which involves narrowing of the spinal canal, is another major cause especially in older adults.<br/><br/>
            Bone spurs, often related to arthritis or spinal degeneration, can also contribute to nerve compression by invading space meant for nerves. In some cases, muscle tightness or repetitive strain from poor posture may also lead to a pinched nerve. Understanding what’s causing your symptoms is key to receiving the right care.
            </h1>
          </div>
        </div>
      )
    },
    {
      post : (
        <div className=" flex flex-col space-y-[16px] ">
        <h1 
        style={{
          fontFamily: "var(--font-reem-kufi)",
          fontWeight: 500,
        }}
        className="text-[#111315] text-2xl">
          Learn About Pinched Nerve Treatments
        </h1>
        <div  className=" flex flex-col space-y-[40px]">
          <h1
          style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 400,
          }}
          className="text-[#5B5F67] text-md sm:text-xl"
          >
            A pinched nerve doesn’t have to control your life. With early intervention and the right treatment strategy, most patients experience relief without surgery. Non-surgical options may include physical therapy, anti-inflammatory medication, activity modification, ergonomic adjustments, and corticosteroid injections. When conservative care fails to relieve pressure on the nerve, minimally invasive surgical solutions such as microdiscectomy or foraminotomy may be considered.<br/><br/>
            At Mountain Spine & Care, our team uses advanced imaging and diagnostic tools to pinpoint the source of nerve compression and build a customized care plan. Whether you need non-invasive treatment or surgical intervention, we’re here to help you recover quickly and safely.
          </h1>
        </div>
      </div>
      )
    },
    {
      post : (
        <div className=" flex flex-col space-y-[16px] ">
        <h1 
        style={{
          fontFamily: "var(--font-reem-kufi)",
          fontWeight: 500,
        }}
        className="text-[#111315] text-2xl">
          Schedule a Consultation Today
        </h1>
        <div  className=" flex flex-col space-y-[40px]">
          <h1
          style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 400,
          }}
          className="text-[#5B5F67] text-md sm:text-xl"
          >
            If you’re living with shooting pain, numbness, or tingling that just won’t go away, it may be time to speak with a spine specialist. A pinched nerve is highly treatable, especially when diagnosed early. At Mountain Spine & Care, our experienced physicians will evaluate your symptoms, identify the source of the problem, and recommend a treatment path that works best for your needs and lifestyle.<br/><br/>
            Call us today at (855) 853-6542 or fill out our online consultation form to schedule your appointment. Lasting relief could be just one visit away.
          </h1>
        </div>
      </div>
      )
    }
  ],
  side_img : pinchednerveside,
  "slug": "pinchednerve"
},
  {
    "title": "Cervical Deformities",
    "tag": "Neck",
    "card_img": 'https://mountainspineortho.b-cdn.net/public/CervicalDeformitiescard.png',
    "inTxt_img": 'https://mountainspineortho.b-cdn.net/public/CervicalDeformitiestxt.webp',
    "body": "Cervical deformities involve abnormal alignment of the neck portion of the spine such as excessive kyphosis loss of natural lordosis or complex scoliosis which can cause pain neurological deficits and noticeable posture changes. At  our fellowship trained spine surgeons and multidisciplinary team provide state of the art evaluation and correction strategies that relieve symptoms protect spinal cord function and restore natural alignment while offering complimentary MRI reviews free second opinions and convenient car service",
    "detail": "The cervical spine consists of seven delicate vertebrae that support the head and protect the spinal cord. Degenerative disc disease prior trauma or surgery congenital abnormalities inflammatory arthritis tumors or progressive osteoporosis can disrupt this balance leading to deformities that tilt the head forward sideways or rotate out of plane. Such malalignment increases stress on discs joints and neural structures often causing chronic neck pain muscle fatigue balance issues and difficulty maintaining a level gaze. At  we begin with a meticulous clinical assessment of posture range of motion and neurological function followed by standing X rays and complimentary high resolution MRI or CT scans to evaluate bone quality spinal canal space and overall spinal balance. This data allows us to craft a personalized plan that may include targeted rehabilitation or precise surgical intervention when conservative care is not sufficient",
    "what_sym": "Patients commonly experience persistent neck or upper back pain muscle tightness tension headaches radiating numbness or weakness in the arms gait or balance disturbances and visible changes in head or shoulder position that worsen with fatigue",
    "risk_fac": "Risk factors include advancing age with progressive disc degeneration prior cervical fusion or laminectomy inflammatory arthritis such as rheumatoid or ankylosing spondylitis untreated fractures congenital skeletal variants spinal tumors and low bone density",
    "diagnose": "Diagnosis integrates a detailed physical and neurological exam with upright radiographic imaging to measure sagittal and coronal balance followed by complimentary MRI to view soft tissue compromise and CT scans to assess bony anatomy. Dynamic flexion extension views may be added to reveal hidden instability so every structural issue is addressed",
    "treatment": "Nonoperative care is preferred when possible and may include customized physiotherapy posture retraining anti inflammatory medication and cervical bracing designed to support the neck. When surgery is required to protect the spinal cord and relieve pain our surgeons use minimally invasive decompression anterior or posterior fusion techniques and for severe rigid deformities osteotomies with modern instrumentation that restore natural alignment and reduce recovery time",
    "pain_info": "Pain arises from overloaded facet joints strained posterior muscles and nerve compression. Symptoms often worsen after prolonged sitting overhead work or when trying to keep the head level. Comprehensive pain management at  blends targeted injections muscle balancing therapy and when needed corrective surgery that addresses the underlying cause",
    "prevent": "Maintaining ergonomic posture during daily activities strengthening neck and shoulder muscles treating degenerative changes early protecting the spine during sports or accidents and ensuring adequate calcium and vitamin D intake all help preserve alignment and prevent progression of deformity",
    "schedule": "Take the first step toward better alignment and comfort by scheduling a consultation with . We will review your complimentary MRI provide a free second opinion and arrange car service so you can focus on reclaiming a pain free lifestyle",
    "slug": "cervicaldeformities"
  },

  {
    "title": "Disc Tear",
    "tag": "Spine",
    "card_img": 'https://mountainspineortho.b-cdn.net/public/DiscTear.jpeg',
    "inTxt_img": 'https://mountainspineortho.b-cdn.net/public/DiscTeartxt.jpeg',
    "body": "A disc tear also called an annular fissure or annular tear occurs when the tough outer ring of an intervertebral disc develops a crack allowing chemical irritants to leak and inflame nearby nerves. At  we deliver accurate diagnosis and evidence based care pairing complimentary MRI reviews and free second opinions with personalized treatment plans that relieve pain speed healing and restore spinal stability",
    "detail": "Each spinal disc is built like a jelly filled donut with a resilient outer annulus fibrosus encasing a gel like nucleus pulposus. Sudden twists heavy lifting or chronic overload can split the annulus producing a disc tear. Even without a visible bulge the exposed nucleus releases inflammatory proteins that trigger sharp localized pain and muscle guarding. Left untreated an annular tear can progress to a full herniation or accelerate disc degeneration. At  evaluation begins with a detailed history of symptom onset often tied to a single lift or torsion and a focused physical examination that reproduces pain with forward flexion or axial loading. Complimentary high resolution MRI scans reveal high intensity zones within the annulus confirming the tear and identifying any early disc bulging or nerve irritation. This precise mapping guides a tailored rehabilitation and intervention strategy",
    "what_sym": "Symptoms include sudden stabbing pain in the neck or lower back after lifting or twisting lingering soreness that worsens with sitting or bending deep ache at night or in the morning occasional radiating discomfort into the buttocks or shoulder blades and episodes of muscle spasm that restrict movement",
    "risk_fac": "Risk rises in individuals who perform repetitive heavy lifting or twisting athletes in impact or rotational sports smokers whose discs dehydrate faster people with sedentary lifestyles and weak core muscles and those with a family history of early disc disease",
    "diagnose": "Diagnosis uses a thorough history and examination supplemented by advanced imaging such as complimentary MRI scans and in select cases provocative discography to correlate imaging with pain generation. Upright X rays assess alignment under load and nerve conduction studies are used when radiating symptoms suggest root irritation. These complimentary tests confirm the exact pain source before treatment begins",
    "treatment": "Initial management includes activity modification core stabilization physiotherapy and brace support during acute healing along with anti inflammatory or neuropathic medication to calm chemical irritation. Image guided epidural or intradiscal injections deliver steroids or platelet rich plasma directly to the tear to reduce inflammation and promote repair. When debilitating pain persists or the tear progresses to a large herniation microdiscectomy or endoscopic nucleus removal may be performed to remove offending tissue while preserving disc height. Throughout recovery  offers ergonomic coaching and return to work guidance to prevent re injury",
    "pain_info": "Pain from an annular tear is often deep and burning intensifying after prolonged sitting or sudden movements and easing with gentle walking or lying flat. By addressing both chemical inflammation and mechanical instability our integrated approach reduces pain rapidly and restores confidence in movement",
    "prevent": "Preventive measures include maintaining strong core and paraspinal muscles practicing proper lifting techniques avoiding sudden twisting under load staying hydrated avoiding tobacco and doing regular flexibility exercises to safeguard the annulus and reduce the risk of future tears",
    "schedule": "If sharp back or neck pain is limiting your life schedule a consultation with  today Benefit from a complimentary MRI review a free second opinion and door to door car service so you can focus on healing and returning to activities you love guided by a team committed to resolving disc tears quickly and effectively",
    "slug": "disctear"
  },

  {
    "title": "Anti Inflammatory Injections",
    "tag": "Spine", 
    "card_img": 'https://mountainspineortho.b-cdn.net/public/aiicard.jpeg',
    "inTxt_img": 'https://mountainspineortho.b-cdn.net/public/aiitxt.jpg',
    "body": "Anti inflammatory injections such as corticosteroid or biologic agents deliver potent medication directly to inflamed joints bursae or spinal regions rapidly reducing pain and swelling when oral therapies fall short. At  our specialists use image guided precision complimentary MRI reviews and personalized follow up to ensure each injection provides maximum relief with minimal risk",
    "detail": "Inflammation is the body’s natural response to injury but when it lingers in joints tendons or around irritated spinal nerves it can cause relentless pain and tissue damage. Anti inflammatory injections introduce medication exactly where inflammation is strongest bathing irritated tissues in high concentrations of therapeutic agents while limiting whole body side effects. Common targets include arthritic knees and shoulders swollen bursae painful trigger points and spinal facets or epidural spaces affected by disc disease. At  every injection begins with a detailed consultation and complimentary MRI or ultrasound review that confirms the inflamed structure and rules out other causes of pain. Using real time ultrasound or fluoroscopy guidance our physicians place medication with pinpoint accuracy maximizing benefit and reducing complications. We then design a rehabilitation plan combining physical therapy and ergonomic coaching to help patients capitalize on their pain free window and regain strength and flexibility",
    "what_sym": "Benefits include rapid pain relief diminished swelling increased range of motion and easier participation in rehabilitative exercise. Targeted delivery also minimizes the gastrointestinal or cardiovascular side effects sometimes linked to long term oral anti inflammatory treatments",
    "risk_fac": "Injections may be deferred or modified for patients with uncontrolled diabetes bleeding disorders active infection near the injection site known medication allergies or those on anticoagulation therapy without proper coordination.  screens each patient carefully adjusting dosage or technique to safeguard overall health",
    "diagnose": "Our team reviews medical history performs a focused physical exam and analyzes complimentary imaging to map inflammation precisely. When uncertainty persists diagnostic local anesthetic injections may be used to confirm the pain generator before administering the anti inflammatory medication",
    "treatment": "The procedure is performed under sterile conditions using live imaging for accuracy. Most patients report only mild pressure during injection and can resume light activities the same day. We provide personalized aftercare instructions including temporary activity modifications ice protocols and phased return to exercise. Follow up calls and visits ensure optimal outcomes and allow scheduling of additional injections if clinically indicated",
    "pain_info": "Discomfort at the injection site is generally mild and short lived. Significant pain reduction often emerges within 24 to 72 hours and can last weeks to months depending on the underlying condition and adherence to rehabilitation recommendations",
    "prevent": "While injections quell acute inflammation long term relief comes from addressing biomechanical stressors.  integrates core strengthening joint specific stabilization weight management and smoking cessation guidance to reduce future flare ups and prolong injection benefits",
    "schedule": "Explore targeted relief today by scheduling an appointment at  for a complimentary MRI review expert second opinion and convenient car service. Our multidisciplinary team will determine whether anti inflammatory injections align with your goals and craft a customized plan to get you moving pain free again",
    "slug": "antiinflammatoryinjections"
  },

  {
    "title": "Hip Dysplasia",
    "tag": "Lower Spine",
    "card_img": 'https://mountainspineortho.b-cdn.net/public/HipDysplasiatxt.jpeg',
    "inTxt_img": 'https://mountainspineortho.b-cdn.net/public/HipDysplsia.jpg',
    "body": "Hip dysplasia is a structural condition in which the hip socket or acetabulum is too shallow to fully cover and support the femoral head leading to joint instability early cartilage wear and progressive arthritis. At  our fellowship trained hip specialists combine state of the art imaging individualized treatment plans and patient focused amenities including complimentary MRI reviews free second opinions and convenient car service to preserve joint health and keep you moving pain free",
    "detail": "In a healthy hip a cup shaped acetabulum holds the femoral head securely distributing load evenly during walking or running. With dysplasia the socket is under developed or oriented abnormally forcing the femoral head to bear weight across a thin rim of cartilage. Over time excess stress causes labral tears cartilage breakdown and painful arthritis that may appear decades earlier than in normal hips. Though often diagnosed in infancy mild dysplasia can go unnoticed until adulthood when groin pain clicking or mechanical catching emerges during sports or prolonged sitting. At  evaluation starts with a detailed history exploring childhood hip issues gait abnormalities and current activity limitations. A focused examination assesses range of motion impingement signs and limb length differences. Complimentary high resolution MRI or 3 D CT scans map socket depth version and labral integrity while standing AP pelvis X rays quantify key angles such as the lateral center edge angle. These measurements guide a personalized treatment strategy that balances joint preservation with long term function",
    "what_sym": "Many adults report deep groin or lateral hip pain that worsens with long periods of standing pivoting sports or rising from low chairs. A sensation of instability audible clicking or a catching feeling may indicate labral damage. As arthritis advances stiffness and reduced stride length accompany persistent discomfort during daily activities",
    "risk_fac": "Risk increases with female sex family history of dysplasia or early hip replacement breech birth swaddling practices that restrict infant hip abduction ligamentous laxity disorders and high impact athletics that overload a shallow socket",
    "diagnose": "Diagnosis begins with standing AP pelvis X rays that reveal a shallow acetabular roof increased Tonnis angle or crossover sign of acetabular retroversion. Complimentary MRI delineates cartilage and labral damage while 3 D CT assists surgical planning by capturing the precise three dimensional orientation of the acetabulum and femoral head",
    "treatment": "Conservative care focuses on physical therapy to strengthen gluteal and core stabilizers activity modification to limit repetitive pivoting weight management and anti inflammatory medication for symptom control. When structural instability and labral tears predominate surgeons perform periacetabular osteotomy to reorient the socket restoring coverage while preserving the native joint. Arthroscopic labral repair or rim trimming addresses focal damage in milder dysplasia. For hips with advanced arthritis minimally invasive total hip replacement offers predictable pain relief and rapid return to activity. Throughout the continuum patients receive comprehensive pre operative education complimentary transportation and a tailored rehabilitation roadmap to ensure optimal recovery",
    "pain_info": "Hip dysplasia pain often begins as intermittent groin discomfort after exercise and progresses to constant aching that disrupts sleep. By correcting biomechanical overload and rehabilitating surrounding muscles our integrated care model breaks the cycle of inflammation and cartilage wear delivering lasting relief",
    "prevent": "Early detection through screening of at risk infants maintaining healthy body weight engaging in low impact exercise and avoiding repetitive extreme hip positions help slow cartilage degeneration and delay arthritis onset",
    "schedule": "If hip pain or instability is limiting your lifestyle schedule a consultation with . Benefit from a complimentary MRI review thorough second opinion and convenient car service to get answers and a personalized plan for managing hip dysplasia and safeguarding joint health for years to come",
    "slug": "hipdysplasia"
  },
    
    
    {
      "title": "Facet Joint Disease",
      "tag": "Spine",
      "card_img": 'https://mountainspineortho.b-cdn.net/public/FacetJointDisease.png',
      "inTxt_img": 'https://mountainspineortho.b-cdn.net/public/FacetJointDiseasearti.png',
      "body": "Facet Joint Disease, sometimes called Facet Syndrome, involves inflammation and degeneration of the facet joints in the spine.  delivers targeted treatment that eases pain, restores mobility, and supports an active lifestyle through exceptional patient care and helpful amenities.",
      "detail": "Facet joints are the small stabilizing joints that link one vertebra to another and allow the spine to bend and twist. Over time these joints can wear down or become inflamed from aging, injury, or repetitive stress, which leads to chronic neck or back pain.  evaluates each case with advanced imaging that includes a complimentary MRI review and provides clear diagnoses, free second opinions, and convenient car service so that patients feel supported from start to finish.",
      "what_sym": "Typical symptoms include persistent neck or back pain, greater discomfort when standing twisting or bending, stiffness and limited motion, pain that travels to shoulders arms hips or legs, and muscle spasms near the affected area.",
      "risk_fac": "Risks rise with growing age especially beyond fifty, a history of spinal injury, arthritis or disc degeneration, repetitive strain or heavy lifting, and excess body weight.",
      "diagnose": "Our team begins with a complete medical history and physical exam and then confirms the affected joints with complimentary MRI imaging. This precise information guides a treatment plan that fits each patient’s needs.",
      "treatment": "Care may include structured physical therapy and guided exercise, pain relief or anti inflammatory medication, facet joint injections, radiofrequency ablation for longer lasting relief, and when needed minimally invasive surgery. We always choose the most effective option that allows the quickest safe recovery.",
      "pain_info": "Pain from Facet Joint Disease often grows worse with certain movements or long periods of standing. A structured pain management plan from  can greatly reduce symptoms and improve daily comfort.",
      "prevent": "You can slow joint wear by taking regular low impact exercise, keeping a healthy weight, sitting and moving with good posture, using ergonomic furniture and equipment, and avoiding smoking and repetitive heavy strain.",
      "schedule": "Set up a consultation with  today and take advantage of complimentary MRI review, a free second opinion, and door to door transportation that keeps your care convenient and comfortable.",
      "slug": "facetjointdisease"
    },
    {
      "title": "Arthritis",
      "tag": "Hand",
      "card_img": 'https://mountainspineortho.b-cdn.net/public/arthritis2.jpeg',
      "inTxt_img": 'https://mountainspineortho.b-cdn.net/public/arthritis.png',
      "body": `Arthritis is a common joint condition that causes inflammation, stiffness, and pain, affecting millions of people across the U.S. It can severely limit mobility and interfere with daily activities like walking, climbing stairs, or even gripping objects. While arthritis is often associated with aging, it can affect people of all ages depending on the type and underlying cause.
      At Mountain Spine & Care, we offer comprehensive arthritis treatment plans tailored to your condition whether it's osteoarthritis, rheumatoid arthritis, or another form. With a combination of expert diagnosis, non-surgical therapies, and cutting-edge orthopedic care, our goal is to reduce inflammation, restore joint function, and help you regain your quality of life.`,
      "detail": "Arthritis isn't a single disease, but rather an umbrella term covering over 100 types of joint pain and joint disease. The most common forms include Osteoarthritis (OA), resulting from the wear-and-tear breakdown of cartilage cushioning the joints, and Rheumatoid Arthritis (RA), an autoimmune disorder where the body's immune system mistakenly attacks the joint lining. Other types can stem from infections, underlying diseases like lupus, or uric acid crystal buildup (gout). Regardless of the type, arthritis can significantly impact mobility and overall well-being. Mountain Spine & Care is dedicated to identifying the specific type and cause of your arthritis to provide targeted, effective relief.",
      "what_sym": "Common symptoms include persistent or intermittent joint pain, stiffness (often worse in the morning or after periods of inactivity), swelling or warmth around the joints, redness of the overlying skin, and a decreased range of motion. Fatigue and a general sense of feeling unwell can also accompany inflammatory types like Rheumatoid Arthritis.",
      "risk_fac": "Risk factors vary depending on the type of arthritis but commonly include advancing age (especially for OA), a family history of arthritis, previous joint injuries or surgeries, obesity (which puts extra stress on joints like hips and knees), autoimmune conditions, and gender (some types, like RA and lupus, are more common in women).",
      "diagnose": "At Mountain Spine & Care, diagnosis begins with a thorough review of your medical history and a detailed physical examination, assessing joint range of motion, tenderness, swelling, and stability. Diagnostic imaging, such as X-rays to visualize cartilage loss and bone spurs or MRIs for detailed views of soft tissues, is often employed; we offer a complimentary MRI review to aid this process. Blood tests or analysis of joint fluid may also be necessary to pinpoint specific types like RA or gout.",
      "treatment": "Mountain Spine & Care creates personalized treatment plans that may involve a combination of approaches: pain-relieving and anti-inflammatory medications (including NSAIDs or specific drugs for RA like DMARDs), tailored physical therapy programs to improve strength and flexibility, lifestyle adjustments focusing on weight management and joint protection, corticosteroid or hyaluronic acid injections directly into the joint for temporary relief, and the use of assistive devices like braces or canes. For severe cases unresponsive to conservative care, advanced minimally invasive surgical options or joint replacement may be considered.",
      "pain_info": "Arthritis pain can manifest differently – it might be a dull ache or a sharp pain, constant or activity-triggered, often accompanied by significant stiffness, especially upon waking. Mountain Spine & Care utilizes a comprehensive pain management strategy, combining medication, therapeutic injections, physical therapy, and lifestyle advice to effectively reduce discomfort, manage flare-ups, and significantly improve your ability to perform daily tasks.",
      "prevent": "While preventing some types of arthritis (like those caused by genetics or autoimmune factors) isn't fully possible, managing risk factors and slowing progression is key. Maintaining a healthy weight reduces stress on weight-bearing joints, regular low-impact exercise (like swimming or cycling) keeps joints flexible and supporting muscles strong, protecting joints from injury during sports or work is crucial, and eating a balanced, anti-inflammatory diet may also offer benefits.",
      "schedule": "If joint pain and stiffness are impacting your life, schedule a consultation at Mountain Spine & Care today. Our specialists can provide an accurate diagnosis, leveraging our complimentary MRI review service, discuss the wide range of effective treatment options available, and develop a personalized care plan designed to manage your arthritis and restore your mobility and comfort.",
    
      side_img : 'https://mountainspineortho.b-cdn.net/public/arthritisside.jpeg',
      forum : [
        {
          post : (
            <div className="flex flex-col space-y-[16px] ">
              <h1 
              style={{
                fontFamily: "var(--font-reem-kufi)",
                fontWeight: 500,
              }}
              className="text-[#111315] text-2xl">
                What Is Arthritis?
              </h1>
              <div  className=" flex flex-col space-y-[40px]">
                <h1
                 style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 400,
                }}
                className="text-[#5B5F67] text-md sm:text-xl"
                >
                Arthritis refers to inflammation of one or more joints. It’s not a single disease but a broad term used to describe over 100 different types of joint disorders. The two most common types are osteoarthritis (OA) and rheumatoid arthritis (RA), though others like gout, psoriatic arthritis, and lupus-related arthritis are also common.<br/><br/>
                The primary symptoms of arthritis include joint pain, stiffness, swelling, redness, and decreased range of motion. Over time, arthritis can lead to cartilage loss, bone erosion, and even joint deformity, particularly if left untreated.
                </h1>
                <GradientOverlayImage
                  imageData={'https://mountainspineortho.b-cdn.net/public/arthritis.png'} // Passing static image data
                  height="500px"
                  gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
                />
                <h1 
               style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 400,
              }}
              className="text-[#5B5F67] text-md sm:text-xl"
                >
                  Many patients describe arthritis as a dull, aching pain that worsens with activity or after periods of rest. Understanding the exact type of arthritis you have is critical for choosing the most effective treatment path.
                </h1>
                <OutlinedButton text="Do I have this Condition?"/>
              </div>
            </div>
          )
        },
        {
          post : (
            <div className=" flex flex-col space-y-[16px] ">
              <h1 
              style={{
                fontFamily: "var(--font-reem-kufi)",
                fontWeight: 500,
              }}
              className="text-[#111315] text-2xl">
                Symptoms of Arthritis
              </h1>
              <div  className=" flex flex-col space-y-[40px]">
                <h1
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 400,
                }}
                className="text-[#5B5F67] text-md sm:text-xl"
                >
                  <li>Joint stiffness, especially in the morning or after inactivity</li><br/>
                  <li>Swelling around the joints</li><br/>
                  <li>Persistent or sharp joint pain</li><br/>
                  <li>Tenderness when touching the joint</li><br/>
                  <li>Reduced range of motion</li><br/>
                  <li>Clicking, popping, or grinding sounds</li><br/>
                  <li>Warmth or redness over the joint</li><br/>
                  <li>Fatigue or flu-like symptoms (common in inflammatory types like RA)</li><br/>
                </h1>
                
                <h1 
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 400,
              }}
              className="text-[#5B5F67] text-md sm:text-xl"
                >
                  In more advanced stages, arthritis can lead to joint deformity, loss of function, and reduced ability to perform everyday tasks. Early diagnosis and treatment can significantly slow progression and reduce permanent damage.
                </h1>
                <OutlinedButton text="Find a Treatment"/>
                <GradientOverlayImage
                  imageData={'https://mountainspineortho.b-cdn.net/public/arthritis2.jpeg'} // Passing static image data
                  height="500px"
                  gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
                />
              </div>
            </div>
          )
        },
        {
          post : (
            <div className=" flex flex-col space-y-[16px] ">
              <h1 
              style={{
                fontFamily: "var(--font-reem-kufi)",
                fontWeight: 500,
              }}
              className="text-[#111315] text-2xl">
                Types of Arthritis
              </h1>
              <div  className=" flex flex-col space-y-[40px]">
                <h1
                 style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 400,
                }}
                className="text-[#5B5F67] text-md sm:text-xl"
                >
                There are several major types of arthritis that affect people of all ages. Osteoarthritis is the most common and is caused by the gradual breakdown of cartilage, which cushions the ends of bones within a joint. As this cartilage deteriorates, bones begin to rub against each other, leading to pain and stiffness. Rheumatoid arthritis is an autoimmune disorder in which the immune system attacks the lining of the joints, causing chronic inflammation, swelling, and joint erosion. Gout results from a buildup of uric acid crystals, often in the big toe, and leads to sudden, intense pain. Psoriatic arthritis is associated with psoriasis and can cause both joint inflammation and skin symptoms. Each of these conditions presents unique challenges and requires a tailored treatment plan to effectively control pain and prevent further damage.
                </h1>
              </div>
            </div>
          )
        },
        {
          post : (
            <div className=" flex flex-col space-y-[16px] ">
              <h1 
              style={{
                fontFamily: "var(--font-reem-kufi)",
                fontWeight: 500,
              }}
              className="text-[#111315] text-2xl">
                Learn About Arthritis Treatments
              </h1>
              <div  className=" flex flex-col space-y-[40px]">
                <h1
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 400,
                }}
                className="text-[#5B5F67] text-md sm:text-xl"
                >
                  Arthritis may be a chronic condition, but that doesn’t mean it has to control your life. With the right treatment plan, it’s possible to reduce pain, slow joint damage, and improve your mobility. At Mountain Spine & Care, our team of experts offers a full spectrum of arthritis care from advanced imaging and diagnosis to non-surgical therapies and state-of-the-art surgical solutions when needed. Whether you’re managing early signs of osteoarthritis or facing the challenges of an inflammatory condition like rheumatoid arthritis, we’re here to help guide you through every stage of your treatment.
                </h1>
              </div>
          </div>
          )
        },
        {
          post : (
            <div className=" flex flex-col space-y-[16px] ">
              <h1 
              style={{
                fontFamily: "var(--font-reem-kufi)",
                fontWeight: 500,
              }}
              className="text-[#111315] text-2xl">
                Schedule a Consultation Today
              </h1>
              <div  className=" flex flex-col space-y-[40px]">
                <h1
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 400,
                }}
                className="text-[#5B5F67] text-md sm:text-xl"
                >
                  If you’re living with persistent joint pain, stiffness, or swelling, don’t wait to get the help you need. Arthritis is a manageable condition when addressed early with the right treatment plan and expert care. At Mountain Spine & Care, our experienced specialists are here to evaluate your symptoms, provide a personalized diagnosis, and guide you toward lasting relief and better joint health.<br/><br/>
                  Call us today at (855) 853-6542 or fill out our online consultation form to schedule your appointment. Let’s take the first step together toward improving your mobility, comfort, and quality of life.
                </h1>
              </div>
          </div>
          )
        }
      ],
      "slug": "arthritis"
    },

    {
      "title": "Lower Back Pain",
      "tag": "Lower Spine",
      "card_img": 'https://mountainspineortho.b-cdn.net/public/LowerBackPainimg.png',
      "inTxt_img": 'https://mountainspineortho.b-cdn.net/public/LowerBackPaintxt.png',
      "body": "Lower back pain is one of the most common musculoskeletal complaints ranging from a dull ache to sharp disabling discomfort that limits work sports and daily activities. At  we provide comprehensive evaluation and personalized treatment supported by complimentary MRI reviews free second opinions and convenient car service to identify the root cause of lower back pain and restore pain free movement",
      "detail": "The lumbar spine bears more load and endures greater motion than any other spinal region making it vulnerable to degenerative disc disease facet arthropathy muscle strain ligament sprain herniated discs spinal stenosis and spondylolisthesis. Poor posture repetitive lifting prolonged sitting and age related tissue wear can inflame joints irritate nerves and trigger protective muscle spasms. Persistent pain may radiate into the buttocks or legs and without proper management can progress to chronic disability. At  a thorough history explores occupational demands recreational activities prior injuries and red flag symptoms such as bowel or bladder changes. A focused physical exam evaluates posture flexibility strength neurological function and pain provocation patterns. Complimentary high resolution MRI scans pinpoint disc pathology nerve compression or arthritic changes while upright X rays assess alignment and dynamic instability. These insights form the foundation of a targeted treatment plan tailored to each patient’s lifestyle and goals",
      "what_sym": "Patients may feel a constant dull ache or episodic sharp pain in the lumbar region stiffness upon waking muscle tightness after prolonged sitting or standing radiating pain or tingling down the leg sciatica and limited ability to bend lift or twist. Pain often intensifies with heavy lifting sudden movements or poor ergonomic positions",
      "risk_fac": "Risk increases with aging sedentary lifestyle weak core musculature obesity occupations requiring repetitive bending or heavy lifting smoking that impairs disc nutrition previous lumbar injury and genetic predisposition to degenerative spine conditions",
      "diagnose": "Diagnosis includes detailed history physical exam and complimentary MRI scans and X rays.  may also use diagnostic facet or nerve root blocks electromyography to assess nerve function and bone density scans when fractures or osteoporosis are suspected. These complementary investigations ensure treatment targets the true pain generator rather than incidental findings",
      "treatment": "Initial management emphasizes patient education activity modification anti inflammatory or neuropathic medication and a structured physiotherapy program that strengthens core and hip stabilizers while improving flexibility and posture. Image guided epidural steroid injections or facet joint blocks provide focal relief for inflammatory flares. When structural issues such as severe stenosis large herniated discs or unstable spondylolisthesis cause persistent pain or neurologic deficits minimally invasive decompression or fusion surgery offers durable relief while preserving surrounding tissues.  tailors each intervention to minimize downtime and promote long term spine health",
      "pain_info": "Lower back pain can fluctuate with daily activity often easing during gentle movement and worsening with prolonged static postures. Our integrative approach combines targeted pain interventions graded exercise and ergonomic coaching to break the cycle of inflammation and muscle guarding that perpetuates chronic pain",
      "prevent": "Preventive steps include maintaining a healthy weight engaging in regular low impact exercise strengthening core and hip muscles practicing proper lifting techniques using ergonomically designed workstations avoiding smoking and addressing minor back issues early to help prevent recurrent flare ups and chronic lumbar pain",
      "schedule": "If lower back pain is limiting your life schedule a consultation with  today. Take advantage of a complimentary MRI review free second opinion and door to door transportation then move forward with a personalized plan to conquer lower back pain and reclaim active living",
      side_img : 'https://mountainspineortho.b-cdn.net/public/lowerbackpainside.jpeg',
      forum : [
        {
          post : (
            <div className=" flex flex-col space-y-[16px] ">
              <h1 
              style={{
                fontFamily: "var(--font-reem-kufi)",
                fontWeight: 500,
              }}
              className="text-[#111315] sm:text-4xl text-3xl">
                What Could Be Causing My Lower Back Pain?
              </h1>
              <div  className=" flex flex-col space-y-[40px]">
                <h1
                 style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 400,
                }}
                className="text-[#5B5F67] text-md sm:text-xl"
                >
                Lower back conditions can present in many ways, including radiating pain, stiffness, numbness, or tingling that travels through one or both legs. The severity and type of symptoms often depend on the specific condition and how far it has progressed. Conditions like herniated discs, spinal stenosis, osteoarthritis, and spondylolisthesis are among the most common causes of chronic lower back pain. If you’re experiencing numbness or tingling in particular, this may point to nerve compression which is often more serious than general discomfort and should be addressed immediately to prevent long-term damage.
                </h1>
                <GradientOverlayImage
                  imageData={'https://mountainspineortho.b-cdn.net/public/lowerbackpain.png'} // Passing static image data
                  height="500px"
                  gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
                />
                <h1 
               style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 400,
              }}
              className="text-[#5B5F67] text-md sm:text-xl"
                >
                  Even if your pain seems manageable, it’s important not to ignore it. Small symptoms can be early warning signs of more serious spinal conditions. That’s why we offer a quick and easy Back Condition Checker to help identify potential issues. This tool is designed to gather information about your symptoms and guide you toward the appropriate care pathway.
                </h1>

                <OutlinedButton text="Do I have this Condition?"/>
              </div>
            </div>
          )
        },
        {
          post : (
            <div className=" flex flex-col space-y-[16px] ">
              <h1 
              style={{
                fontFamily: "var(--font-reem-kufi)",
                fontWeight: 500,
              }}
              className="text-[#111315] sm:text-4xl text-3xl">
                  What is the Right Treatment for Me?
              </h1>
              <div  className=" flex flex-col space-y-[40px]">
                <h1
                 style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 400,
                }}
                className="text-[#5B5F67] text-md sm:text-xl"
                >
                  The only way to determine the right treatment is through an accurate diagnosis. Our specialists use a variety of advanced tools, including MRI scans, X-rays, ultrasounds, and physical evaluations to assess the source of your lower back pain. These methods help detect conditions like herniated or bulging discs, osteoarthritis, spinal stenosis, spondylolisthesis, or even spinal fractures. Once a clear diagnosis is made, our highly trained doctors at Mountain Spine & Care can recommend a treatment plan tailored to your needs. With access to advanced procedures not widely available elsewhere, we’re able to offer both non-surgical and surgical options based on what’s best for your recovery. 
               </h1>
               <OutlinedButton text="Find a Treatment"/>
              </div>
            </div>
          )
        },
        {
          post : (
            <div className=" flex flex-col space-y-[16px] ">
              <h1 
              style={{
                fontFamily: "var(--font-reem-kufi)",
                fontWeight: 500,
              }}
              className="text-[#111315] sm:text-4xl text-3xl">
                 Can Back Pain Mean I Need Surgery?
              </h1>
              <div  className=" flex flex-col space-y-[40px]">
                <h1
                 style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 400,
                }}
                className="text-[#5B5F67] text-md sm:text-xl"
                >
Surgery is not always necessary for lower back pain. In fact, many patients experience significant relief through non-surgical treatments such as physical therapy, spinal injections, or medications that improve body mechanics and reduce inflammation. However, if conservative treatments fail or if there is significant damage to spinal discs or nerves, surgical intervention may be required. In those cases, our team specializes in minimally invasive procedures designed to reduce recovery time and improve outcomes.
               </h1>
              </div>
            </div>
          )
        },
        {
          post : (
            <div className=" flex flex-col space-y-[16px] ">
              <h1 
              style={{
                fontFamily: "var(--font-reem-kufi)",
                fontWeight: 500,
              }}
              className="text-[#111315] sm:text-4xl text-3xl">
                 What Can I Do to Prevent Lower Back Pain?
              </h1>
              <div  className=" flex flex-col space-y-[40px]">
                <h1
                 style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 400,
                }}
                className="text-[#5B5F67] text-md sm:text-xl"
                >
                  The most effective way to prevent lower back pain is by maintaining a healthy lifestyle. Carrying excess weight places added pressure on the lower spine, accelerating disc degeneration. Poor posture and lack of physical activity can also contribute to spinal issues over time. Even habits like smoking or prolonged sitting can increase the risk of developing chronic back pain. Making simple changes, such as staying active and practicing good posture, can go a long way in protecting your spine.
               </h1>
              </div>
            </div>
          )
        },
        {
          post : (
            <div className=" flex flex-col space-y-[16px] ">
              <h1 
              style={{
                fontFamily: "var(--font-reem-kufi)",
                fontWeight: 500,
              }}
              className="text-[#111315] sm:text-4xl text-3xl">
                Schedule a Consultation Today
              </h1>
              <div  className=" flex flex-col space-y-[40px]">
                <h1
                 style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 400,
                }}
                className="text-[#5B5F67] text-md sm:text-xl"
                >
                  If you’re experiencing persistent lower back pain, numbness, or radiating leg symptoms, it may be time to speak with a spine specialist. These signs could indicate a more serious issue that, if caught early, can be treated before it worsens. <br/> <br/> At Mountain Spine & Care, we specialize in diagnosing and treating the full range of lower back conditions with the most advanced technology and techniques available. Don’t wait to take control of your health. Contact us at (855) 853-6542 or fill out our online form to schedule your consultation today.
                </h1>
              </div>
            </div>
          )
        }
      ],
      "slug": "lowerbackpain",
    },

    {
        "title": "Sciatica", 
        "tag": "Lower Spine",
        "card_img": 'https://mountainspineortho.b-cdn.net/public/Sciaticacopy.png',
        "inTxt_img": 'https://mountainspineortho.b-cdn.net/public/Sciaticaarti.png',
        "body": "Sciatica refers to pain caused by irritation or compression of the sciatic nerve, which runs from the lower back through the hips and down each leg. Mountain Spine & Orthopedics provides precise diagnostics and targeted therapies supported by complimentary MRI reviews, free second opinions, and convenient car service to relieve sciatic nerve pressure, reduce inflammation, and restore comfortable pain free motion.",
        "detail": "The sciatic nerve is the body’s largest nerve, originating from spinal nerve roots in the lower back and traveling through the pelvis buttocks and down each leg. Herniated discs bone spurs spinal stenosis or inflammation can compress these roots, triggering radiating pain numbness or weakness that follows the nerve’s path. Sciatica is a symptom of an underlying issue that must be correctly identified for effective treatment. At Mountain Spine & Orthopedics evaluation begins with a detailed history identifying pain onset activity triggers and previous spine or hip conditions. A focused physical exam assesses posture gait reflexes and straight leg raise response. Complimentary high resolution MRI pinpoints the structural cause—often a herniated disc or foraminal narrowing—while electromyography distinguishes true sciatica from peripheral nerve or muscular disorders. These findings guide an individualized care plan to relieve nerve root pressure and address biomechanical contributors.",
        "what_sym": "Sharp burning or electric like pain radiating from the lower back into the buttock thigh and down one leg; numbness or tingling along the same path; muscle weakness in the affected leg or foot; increased discomfort when sitting coughing or standing for long periods; and difficulty walking due to pain or instability.",
        "risk_fac": "Age related disc degeneration obesity sedentary lifestyle occupations involving heavy lifting or prolonged sitting diabetes smoking and previous spine injury or surgery all increase the risk of developing sciatica.",
        "diagnose": "In addition to MRI and nerve testing, Mountain Spine & Orthopedics may perform selective diagnostic nerve root blocks or physical maneuvers to reproduce symptoms and confirm the precise location of irritation. Complimentary evaluations ensure all potential contributing factors are considered before developing a personalized treatment plan.",
        "treatment": "First line treatments include activity modification anti inflammatory or neuropathic medications and structured physical therapy focused on lumbar stabilization hamstring flexibility and nerve gliding techniques. Image guided epidural steroid injections target inflammation at the root level. For persistent or severe cases minimally invasive decompression procedures such as microdiscectomy or foraminotomy can relieve pressure on the sciatic nerve with shorter recovery times and minimal tissue disruption. Post procedure rehab focuses on posture correction and functional strength to prevent recurrence.",
        "pain_info": "Sciatica pain can range from mild aching to debilitating shocks of nerve pain often fluctuating with movement or posture. Mountain Spine & Orthopedics targets both the source and symptoms through a multidisciplinary approach restoring nerve health and daily comfort.",
        "prevent": "Maintaining a healthy body weight practicing proper lifting techniques staying active with core strengthening and flexibility exercises avoiding prolonged sitting and addressing early signs of back pain can all help prevent sciatic nerve compression.",
        "schedule": "If leg or lower back pain is interfering with your mobility schedule a consultation with Mountain Spine & Orthopedics today. Receive a complimentary MRI review a detailed second opinion and door to door transportation then move forward with a personalized plan to resolve sciatica and return to confident pain free movement.",
      side_img : 'https://mountainspineortho.b-cdn.net/public/sciaticaside.png',
      forum: [
        {
          post: (
            <div className=" flex flex-col space-y-[16px] ">
              <h1
                style={{
                  fontFamily: "var(--font-reem-kufi)",
                  fontWeight: 500,
                }}
                className="text-[#111315] sm:text-4xl text-3xl">
                How Do I Know if I Have Sciatica?
              </h1>
              <div className=" flex flex-col space-y-[40px]">
                <h1
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 400,
                  }}
                  className="text-[#5B5F67] text-md sm:text-xl"
                >
                  Sciatica symptoms usually affect only one side of the body, most commonly the lower back and leg. They often intensify while sitting and may include radiating pain, numbness, tingling, and muscle weakness in the affected leg. If the condition advances, it may begin to impact your ability to walk or perform daily activities. In some cases, tingling or numbness in the arms and legs could signal a more advanced orthopedic issue.
                </h1>
    
                <div className="rounded-[24px] overflow-hidden"><iframe width="100%" height="500" src="https://www.youtube.com/embed/EVPlqu2FH2g?si=iSAQ8CBU0XJwmMAv" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe></div>
                
                <h1
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 400,
                  }}
                  className="text-[#5B5F67] text-md sm:text-xl"
                >
                  If you suspect you may be experiencing sciatica, we offer a quick and easy condition checker. This tool gathers key information about your symptoms and helps determine if you're a candidate for evaluation and treatment.
                </h1>

                <OutlinedButton text="Do I have this Condition?" />

              </div>
    
            </div>
          )
        },
        {
          post: (
            <div className=" flex flex-col space-y-[16px] ">
              <h1
                style={{
                  fontFamily: "var(--font-reem-kufi)",
                  fontWeight: 500,
                }}
                className="text-[#111315] sm:text-4xl text-3xl">
                What Is the Right Treatment for Me?
              </h1>
              <div className=" flex flex-col space-y-[40px]">
                <h1
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 400,
                  }}
                  className="text-[#5B5F67] text-md sm:text-xl"
                >
                  Most cases of sciatica respond well to conservative treatment, especially when the underlying condition compressing the sciatic nerve is addressed. Treatment may include anti-inflammatory medication, stretching exercises, heat and ice therapy, and physical therapy. These methods aim to relieve pressure, reduce inflammation, and restore mobility.<br /><br />
                  Only after conservative options have been exhausted is surgery considered. At Mountain Spine & Care, our board-certified orthopedic doctors are experts in treating sciatica. We offer advanced, customized care plans that many other practices are not equipped to provide.
                </h1>
                <OutlinedButton text="Find a Treatment" />
              </div>
            </div>
          )
        },
        {
          post: (
            <div className="flex flex-col space-y-[16px]">
              <h1
                style={{
                  fontFamily: "var(--font-reem-kufi)",
                  fontWeight: 500
                }}
                className="text-[#111315] sm:text-4xl text-3xl">
                Best Sciatica Treatment Options
              </h1>
              <div className=" flex flex-col space-y-[40px]">
                <h1
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 400
                  }}
                  className="text-[#5B5F67] text-md sm:text-xl"
                >
                  Sciatica treatments vary depending on nerve involvement and symptom severity. Our team offers both non-surgical and surgical solutions tailored to your condition
                </h1>
    
                <h1
                  style={{
                    fontFamily: "var(--font-inter),",
                    fontWeight: 500
                  }}
                  className="text-[#111315] text-md sm:text-xl"
                >
                  Non-Surgical Treatment:
                </h1>
    
                <h1
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 400
                  }}
                  className="text-[#5B5F67] text-md sm:text-xl"
                >
                  Stretching exercises improve mobility and flexibility. Chiropractic care eases pressure on the spine. Medications reduce inflammation and pain.
                </h1>
                <h1
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 500,
                  }}
                  className="text-[#111315] text-md sm:text-xl">
                  Surgical Treatment:
                </h1>
    
                <h1
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 400,
                  }}
                  className="text-[#5B5F67] text-md sm:text-xl"
                >
                  Foraminotomy relieves pressure by enlarging the foramen.<br />Discectomy removes the herniated disc causing nerve compression.<br /> Laminotomy removes part of the lamina to decompress the nerve.<br /><br />
                  Our orthopedic specialists will help determine the best option based on your condition, lifestyle, and treatment goals.
                </h1>
                <GradientOverlayImage
                  imageData={'https://mountainspineortho.b-cdn.net/public/sciatica.png'} // Passing static image data
                  height="500px"
                  gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
                />
              </div>
            </div>
          )
        },
        {
          post : (
            <div className=" flex flex-col space-y-[16px] ">
            <h1 
            style={{
              fontFamily: "var(--font-reem-kufi)",
              fontWeight: 500,
            }}
            className="text-[#111315] sm:text-4xl text-3xl">
             Schedule a Consultation Today          
            </h1>

            <div className=" flex flex-col space-y-[40px]">
              <h1
               style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 400,
              }}
              className="text-[#5B5F67] text-md sm:text-xl"
              >
                If you suspect you’re experiencing sciatica, don’t wait to seek help. Our team at Mountain Spine & Care specializes in diagnosing and treating sciatica with both non-invasive and surgical approaches. We’ve helped thousands of patients regain their comfort, mobility, and quality of life.<br/><br/>
                Call us today at (855) 853-6542 or fill out our online form to book your appointment. Let us help you find lasting relief.
              </h1>

            </div>
          </div>
          )
        }
      ],
      slug: "sciatica"
    },

    {
      "title": "Coccydynia",
      "tag": "Lower Spine",
      "card_img": 'https://mountainspineortho.b-cdn.net/public/Coccydynia.png',
      "inTxt_img": 'https://mountainspineortho.b-cdn.net/public/Coccydyniaarti.png',
      "body": "Coccydynia or tailbone pain can make every sit stand or step an ordeal.  uses precise diagnosis and evidence based therapies to ease discomfort improve mobility and restore pain free sitting while providing complimentary MRI reviews free second opinions and door to door car service",
      "detail": "The coccyx or tailbone anchors pelvic floor muscles and supports weight during sitting. Falls onto hard surfaces repetitive microtrauma from cycling or rowing childbirth prolonged sitting on hard chairs and degenerative joint changes can inflame or dislocate the coccyx producing coccydynia. Pain may last weeks to months and often radiates into the low back or hips interfering with work driving and even restful sleep. At  our specialists gather a thorough history to pinpoint injury events and aggravating activities and conduct a focused physical examination that palpates coccygeal segments and screens for pelvic floor tension. Complimentary high resolution MRI or dynamic X rays clarify alignment rule out fractures or tumors and evaluate surrounding soft tissues enabling a customized care plan that targets the true source of pain",
      "what_sym": "Classic signs include sharp or aching pain directly over the tailbone pain that spikes when rising from sitting or leaning backward tenderness to touch pain during bowel movements or intercourse and in chronic cases radiating soreness into the sacrum or hips",
      "risk_fac": "Higher risk is linked to recent falls childbirth especially with instrumental delivery excess body weight rapid weight loss that removes natural padding prolonged desk work without ergonomic seating repetitive sports such as cycling and underlying degenerative joint disease",
      "diagnose": "Diagnosis may include diagnostic local anesthetic injections to confirm the coccyx as the source of pain in addition to imaging studies. These complimentary evaluations guide therapy and avoid unnecessary treatment of unrelated areas",
      "treatment": "Care begins with activity modification use of specialized cut out seat cushions anti inflammatory medication and targeted physical therapy that stretches hip flexors and relieves pelvic floor tension. Ultrasound guided steroid or nerve block injections offer potent relief when conservative measures stall. In rare cases of persistent pain and confirmed instability our surgeons perform minimally invasive coccygectomy removing the painful segment while preserving function",
      "pain_info": "Tailbone pain often intensifies after long car rides sitting on hard surfaces or sudden position changes.  pairs ergonomic counseling with image guided interventions to reduce inflammation retrain posture and break the cycle of chronic coccygeal pain",
      "prevent": "Using cushioned or Ushaped seats taking standing breaks during extended sitting maintaining a healthy weight strengthening core and pelvic floor muscles and wearing proper protective gear during contact sports help protect the coccyx from injury and irritation",
      "schedule": "Do not let tailbone pain dictate your day. Schedule a consultation with  for a complimentary MRI review expert second opinion and convenient car service so you can sit move and live comfortably again",
      side_img : 'https://mountainspineortho.b-cdn.net/public/coccydyniaside.png',
      forum: [
        {
          post: (
            <div className="flex flex-col space-y-[16px]">
              <h1
                style={{
                  fontFamily: "var(--font-reem-kufi)",
                  fontWeight: 500,
                }}
                className="text-[#111315] sm:text-4xl text-3xl"
              >
                What Is Coccydynia?
              </h1>
              <div className="flex flex-col space-y-[40px]">
                <h1
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 400,
                  }}
                  className="text-[#5B5F67] text-md sm:text-xl"
                >
                  Coccydynia is the medical term for inflammation or injury to the coccyx (tailbone), located at the bottom of the spine. Pain may occur while sitting, standing up from a seated position, or during bowel movements. It can be dull and persistent or sharp and stabbing.<br /><br />
                  The cause isn't always obvious, but common triggers include a traumatic fall, stressful childbirth, or prolonged pressure from improper sitting posture. Rarely, it may be due to a tumor in the coccyx region. If the pain persists or intensifies, it’s important to consult with a spine specialist.
                </h1>
                <GradientOverlayImage
                  imageData={'https://mountainspineortho.b-cdn.net/public/coccydynia.jpeg'} // Passing static image data
                  height="500px"
                  gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
                />
                <h1
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 400,
                  }}
                  className="text-[#5B5F67] text-md sm:text-xl"
                >
                  If you're experiencing symptoms like tailbone pain that worsens when sitting or during bowel movements, you may be dealing with coccydynia. Our diagnostic checker is a fast way to determine whether a specialist evaluation is recommended.
                </h1>
                <OutlinedButton text="Do I have this Condition?" />
              </div>
            </div>
          ),
        },
        {
          post : (
            <div className=" flex flex-col space-y-[16px] ">
              <h1
                style={{
                  fontFamily: "var(--font-reem-kufi)",
                  fontWeight: 500,
                }}
              className="text-[#111315] text-2xl"
              >
                How Is Coccydynia Diagnosed?
              </h1>
              <div className=" flex flex-col space-y-[40px]">
              <h1
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 400,
                  }}
                  className="text-[#5B5F67] text-md sm:text-xl"
                >
                  Diagnosing coccydynia typically starts with a physical examination and discussion of your symptoms and medical history. Your doctor may gently press on the tailbone area to assess tenderness and rule out other causes of pain. In some cases, imaging tests like X-rays or MRIs are used to identify fractures, joint instability, or signs of inflammation.<br /><br />
                  Once diagnosed, your provider will recommend a treatment plan based on the severity and duration of symptoms.
                </h1>
                <OutlinedButton text="Find a Treatment" />
              </div>
            </div>
          )
        },

        {
          post : (
            <div className=" flex flex-col space-y-[16px] ">
              <h1
                style={{
                  fontFamily: "var(--font-reem-kufi)",
                  fontWeight: 500,
                }}
                className="text-[#111315] sm:text-4xl text-3xl">
                Pain Management for Coccydynia
              </h1>
              <div className=" flex flex-col space-y-[40px]">
                <h1
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 400,
                  }}
                  className="text-[#5B5F67] text-md sm:text-xl"
                >
                  In early cases, coccydynia can be managed with non-surgical treatment. This includes using a wedge or donut-shaped cushion to reduce pressure while sitting, increasing fiber intake, and using stool softeners to minimize discomfort during bowel movements. Over-the-counter anti-inflammatory medications and hot/cold therapy can also help reduce inflammation and pain.<br/><br/>
                  If the pain persists beyond a few weeks, stronger pain relievers, physical therapy, or injections may be recommended. Surgery (coccygectomy) is reserved for severe cases when all other options have failed.
                </h1>
              </div>
            </div>
          )
        },
        {
          post : (
            <div className=" flex flex-col space-y-[16px] ">
              <h1
                style={{
                  fontFamily: "var(--font-reem-kufi)",
                  fontWeight: 500,
                }}
                className="text-[#111315] sm:text-4xl text-3xl">
                What Causes Coccydynia?
              </h1>
              <div className=" flex flex-col space-y-[40px]">
                <h1
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 400,
                  }}
                  className="text-[#5B5F67] text-md sm:text-xl"
                >
                  Coccydynia can result from both sudden trauma and long-term strain. Common causes include:<br/>
                   <li> Falls or direct impact to the tailbone</li>
                   <li> Prolonged sitting on hard or unstable surfaces</li>
                    <li>Childbirth, especially when prolonged or difficult</li>
                    <li>Repetitive strain or poor posture In rare cases, bone tumors or infections may lead to coccyx pain, which is why imaging may be required when pain does not respond to treatment.</li>
                </h1>
                <GradientOverlayImage
                  imageData={'https://mountainspineortho.b-cdn.net/public/coccydynia2.jpeg'} // Passing static image data
                  height="500px"
                  gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
                />
              </div>
            </div>
          )
        },
        {
          post : (
            <div className=" flex flex-col space-y-[16px] ">
              <h1
                style={{
                  fontFamily: "var(--font-reem-kufi)",
                  fontWeight: 500,
                }}
                className="text-[#111315] sm:text-4xl text-3xl">
                Risk Factors for Coccydynia
              </h1>
              <div className=" flex flex-col space-y-[40px]">
                <h1
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 400,
                  }}
                  className="text-[#5B5F67] text-md sm:text-xl"
                >
                  Several factors increase the risk of developing coccydynia, including being:
                   <li>Female (due to childbirth)</li>
                   <li> Obese or underweight (both affect sitting posture)</li>
                   <li>Sedentary (extended sitting)</li>
                   <li>Engaging in high-impact sports or activities Additionally, hormonal changes during pregnancy or aging can loosen the pelvic area and increase tailbone vulnerability.</li>
                </h1>
              </div>
            </div>
          )
        },
        {
          post : (
            <div className=" flex flex-col space-y-[16px]">
              <h1
                style={{
                  fontFamily: "var(--font-reem-kufi)",
                  fontWeight: 500,
                }}
                className="text-[#111315] sm:text-4xl text-3xl">
               Treatment Options for Coccydynia
              </h1>
              <div className=" flex flex-col space-y-[40px]">
                <h1
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 400,
                  }}
                  className="text-[#5B5F67] text-md sm:text-xl"
                >
                  Treatment depends on how long you’ve had symptoms and how severe the pain is. Common treatments include:
                   <li>Cushions and posture correction</li>
                   <li>Anti-inflammatory medications</li>
                   <li>Physical Therapy</li>
                   <li>Corticosteroid injections</li>
                </h1>
                <h1
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 400,
                }}
                className="text-[#5B5F67] text-md sm:text-xl"
                >
                  In rare cases, a coccygectomy (surgical removal of the coccyx) may be considered. At Mountain Spine & Care, we specialize in minimally invasive spine procedures to provide targeted relief while preserving mobility and reducing recovery time.
                </h1>
              </div>
            </div>
          )
        },
        {
          post : (
            <div className="flex flex-col space-y-[16px]">
            <h1
              style={{
                fontFamily: "var(--font-reem-kufi)",
                fontWeight: 500
              }}
              className="text-[#111315] sm:text-4xl text-3xl">
              Frequently Asked Questions About Coccydynia
            </h1>
            <div className=" flex flex-col space-y-[40px]">
              <h1
                style={{
                  fontFamily: "var(--font-inter),",
                  fontWeight: 500
                }}
                className="text-[#111315] text-md sm:text-xl"
              >
                How is coccydynia pain treated during pregnancy?
              </h1>
  
              <h1
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 400
                }}
                className="text-[#5B5F67] text-md sm:text-xl"
              >
                Tailbone pain in pregnancy is common and usually caused by the hormone relaxin, which loosens pelvic joints. Using supportive cushions, applying hot/cold therapy, and taking acetaminophen may provide relief. Persistent pain should be evaluated by a spine specialist.
              </h1>
              <h1
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 500,
                }}
                className="text-[#111315] text-md sm:text-xl">
                Does walking help coccydynia?
              </h1>
  
              <h1
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 400,
                }}
                className="text-[#5B5F67] text-md sm:text-xl"
              >
                For many, gentle walking can reduce tailbone pressure. But if there’s a fracture or joint instability, walking may worsen the pain. Low-impact stretching or yoga may be a safer option in those cases.
              </h1>

              <h1
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 500,
                }}
                className="text-[#111315] text-md sm:text-xl">
                How should I sleep with coccydynia?
              </h1>
  
              <h1
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 400,
                }}
                className="text-[#5B5F67] text-md sm:text-xl"
              >
                Avoid sleeping flat on your back. Instead, sleep on your side with a pillow between your knees. This position minimizes pressure on the coccyx and can improve sleep quality.
              </h1>
            </div>
          </div>
          )
        },
        {
          post : (
            <div className=" flex flex-col space-y-[16px] ">
            <h1 
            style={{
              fontFamily: "var(--font-reem-kufi)",
              fontWeight: 500,
            }}
            className="text-[#111315] sm:text-4xl text-3xl">
             Schedule a Consultation Today          
            </h1>

            <div className=" flex flex-col space-y-[40px]">
              <h1
               style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 400,
              }}
              className="text-[#5B5F67] text-md sm:text-xl"
              >
                Tailbone pain doesn’t have to interfere with your life. At Mountain Spine & Care, our expert team offers effective, patient-centered solutions for coccydynia from non-surgical therapies to advanced procedures. We’ll help you get to the root of your pain and back to feeling your best.<br/><br/>
                Call us today at (855) 853-6542 or complete our online form to schedule your consultation.
              </h1>

            </div>
          </div>
          )
        }
      ],
      "slug": "coccydynia"
    },

    {
      "title": "Failed Back or Failed Neck Surgery Syndrome", 
      "tag": "Spine",
      "card_img": 'https://mountainspineortho.b-cdn.net/public/FailedBAN.png',
      "inTxt_img": 'https://mountainspineortho.b-cdn.net/public/failedBANarti.png',
      "body": "Failed Back or Failed Neck Surgery Syndrome describes persistent or recurrent pain and functional limitations following spinal procedures that were expected to relieve symptoms. At  our multidisciplinary team specializes in uncovering the root causes of ongoing pain delivering precision diagnostics revision strategies and comprehensive rehabilitation supported by complimentary MRI reviews free second opinions and convenient car service to help patients reclaim quality of life",
      "detail": "Spine surgery is often performed to decompress nerves stabilize unstable segments or correct deformity. While most patients improve a subset continues to experience pain due to unresolved nerve compression inadequate fusion adjacent segment degeneration hardware complications or new sources of inflammation and scarring. This constellation of persistent symptoms is termed Failed Back Surgery Syndrome when pain originates in the lumbar region and Failed Neck Surgery Syndrome when cervical procedures are involved. Complex anatomy pre existing conditions and postoperative biomechanics all influence outcomes making precise re evaluation essential before considering additional interventions. At  evaluation begins with a meticulous review of surgical records imaging and symptom chronology combined with a thorough neurologic and musculoskeletal examination. Complimentary high resolution MRI or CT often with contrast visualizes scar tissue hardware position and fusion integrity alongside dynamic flexion extension radiographs that reveal hidden instability and guide a personalized treatment roadmap",
      "what_sym": "Patients frequently report persistent or worsening axial pain radicular burning or electric like sensations in the limbs numbness weakness limited range of motion difficulty standing or sitting for prolonged periods and sleep disruption emotional distress fatigue and decreased activity tolerance often accompany chronic postoperative pain",
      "risk_fac": "Pre existing diffuse degenerative disease multilevel pathology diabetes or osteoporosis that impair healing smoking obesity inadequate preoperative rehabilitation technical surgical challenges and formation of epidural scar tissue can all elevate the likelihood of persistent postoperative symptoms",
      "diagnose": "Diagnosis goes beyond advanced imaging to include diagnostic selective nerve root blocks facet or sacroiliac joint injections and spinal cord stimulation trials to pinpoint pain generators electromyography clarifies ongoing nerve injury versus healed roots these complimentary diagnostics create an evidence based foundation for targeted revision or non surgical management",
      "treatment": "A stepped care approach begins with personalized physical therapy emphasizing core and paraspinal reconditioning activity pacing and postural retraining pharmacologic regimens address neuropathic and inflammatory components while image guided injections provide focal relief neuromodulation options including spinal cord stimulation and intrathecal pumps can dramatically cut pain when structural issues are stabilized for clearly defined mechanical failures such as pseudarthrosis hardware malposition or recurrent stenosis our surgeons perform minimally invasive revision decompression or fusion leveraging modern technologies to minimize scar disruption and expedite recovery psychological support and pain coping strategies round out a holistic program aimed at durable improvement",
      "pain_info": "Postoperative pain often involves a mix of residual mechanical compression nerve hypersensitivity and central pain amplification  integrates targeted interventions with cognitive behavioral and mindfulness techniques to recalibrate pain pathways and foster sustained relief",
      "prevent": "Rigorous preoperative assessment ensuring the correct indication for surgery smoking cessation optimized nutrition and bone health meticulous surgical technique early mobilization and adherence to individualized rehabilitation protocols dramatically reduce the risk of persistent postoperative pain",
      "schedule": "If spine surgery has failed to provide lasting relief schedule a consultation with  our specialists will conduct a complimentary MRI review deliver a thorough second opinion and arrange car service guiding you toward a clear plan to confront Failed Back or Failed Neck Surgery Syndrome and regain control of your life",
      "slug": "failedbackorfailenecksurgerysyndrome"
    },

    {
    "title": "Foraminal Stenosis",  
    "tag": "Spine",
      "card_img": 'https://mountainspineortho.b-cdn.net/public/ForaminalS.png', // Placeholder for card image variable
      "inTxt_img": 'https://mountainspineortho.b-cdn.net/public/ForaminalSarti.png', 
      "body": "Foraminal stenosis, a narrowing of the spinal canal openings where nerves exit, can cause radiating pain, numbness, or weakness. Mountain Spine Orthopedics offers advanced diagnostics and personalized treatments, including minimally invasive options, to relieve nerve compression and restore function, backed by complimentary MRI reviews and free second opinions.",
      "detail": "The intervertebral foramina are small passageways on either side of your spine through which spinal nerves exit the spinal canal to travel to the rest of your body. Foraminal stenosis occurs when these openings become narrowed, often due to degenerative changes like bone spurs (osteophytes), herniated discs, thickened ligaments, or spondylolisthesis (slipped vertebra). This narrowing can compress or 'pinch' the exiting nerve root, leading to symptoms along the nerve's pathway. At Mountain Spine Orthopedics, our spine specialists utilize a detailed history, neurological examination, and advanced imaging like complimentary MRI reviews to precisely identify the location and cause of the stenosis. This allows for a tailored treatment plan targeting the specific compressed nerve.",
      "what_sym": "Symptoms depend on the location (cervical, thoracic, lumbar) and severity of the nerve compression. Common signs include radiating pain (sciatica in the leg, radiculopathy in the arm), numbness, tingling ('pins and needles'), muscle weakness, cramping, or burning sensations in the affected limb or region. Pain may worsen with certain activities or positions, like walking or standing for long periods.",
      "risk_fac": "Age is the primary risk factor, as degenerative changes accumulate over time. Other factors include genetics (predisposition to disc degeneration or arthritis), previous spinal injury or surgery, occupations involving heavy lifting or repetitive spinal stress, obesity, and conditions like osteoarthritis or rheumatoid arthritis.",
      "diagnose": "Diagnosis involves a thorough clinical evaluation assessing symptoms, reflexes, muscle strength, and sensation. Imaging is crucial; complimentary MRI reviews provide detailed views of nerves and soft tissues, while CT scans excel at showing bone structure (like bone spurs). X-rays can show alignment issues or arthritis. Electromyography (EMG) and nerve conduction studies may be used to assess nerve function.",
      "treatment": "Initial treatment is typically conservative: anti-inflammatory medications, physical therapy to improve flexibility, strength, and posture, activity modification, and sometimes epidural steroid injections to reduce inflammation around the nerve. If symptoms persist or worsen, or if there's significant weakness, minimally invasive surgical options like foraminotomy (enlarging the foramen) or laminectomy/laminotomy may be recommended by our expert surgeons at Mountain Spine Orthopedics to decompress the nerve.",
      "pain_info": "Pain from foraminal stenosis often follows a specific nerve path (dermatome). Lumbar stenosis typically causes leg pain (sciatica), while cervical stenosis causes arm pain. The character of pain can range from a dull ache to sharp, shooting sensations. Our team focuses on identifying the exact nerve involved to deliver targeted relief, from physical therapy guidance to precise, image-guided injections or minimally invasive surgery.",
      "prevent": "While age-related degeneration is hard to prevent entirely, maintaining a healthy weight, practicing good posture, using proper lifting techniques, regular exercise (especially core strengthening), and avoiding smoking can help maintain spinal health and potentially slow the progression of degenerative changes that lead to stenosis.",
      "schedule": "Don't live with radiating nerve pain, numbness, or weakness. Contact Mountain Spine Orthopedics today to schedule your consultation. Benefit from our complimentary MRI review, expert free second opinion, and personalized care plan designed to relieve nerve compression and improve your quality of life. Convenient patient services may be available.", // Added mention of patient services
      "side_img": 'https://mountainspineortho.b-cdn.net/public/ForaminalS.png',
      forum : [
        {
          "post": (
            <div className="flex flex-col space-y-[16px]">
              <h1
                style={{
                  fontFamily: "var(--font-reem-kufi)",
                  fontWeight: 500,
                }}
                className="text-[#111315] sm:text-4xl text-3xl"
              >
                Understanding Foraminal Stenosis
              </h1>
              <div className="flex flex-col space-y-[40px]">
                <h1
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 400,
                  }}
                  className="text-[#5B5F67] text-md sm:text-xl"
                >
                  Foraminal stenosis is a specific type of spinal stenosis where the openings between your spinal bones (vertebrae), called the neural foramina, become narrow. These openings are crucial because they provide the pathway for your spinal nerves to exit the spinal cord and travel to other parts of your body, like your arms and legs.<br /><br />
                  When a foramen narrows, it can squeeze or 'pinch' the nerve passing through it. This nerve compression is what leads to the characteristic symptoms of foraminal stenosis, such as pain, numbness, tingling, or weakness that radiates away from the spine along the path of the affected nerve. The location of symptoms depends on which nerve is compressed – neck (cervical) stenosis affects the arms, while lower back (lumbar) stenosis affects the legs (often called sciatica).
                </h1>
                <GradientOverlayImage
                  imageData={'https://mountainspineortho.b-cdn.net/public/ForaminalSarti.png'} // Placeholder for diagram image
                  height="500px"
                  gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
                />
                <h1
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 400,
                  }}
                  className="text-[#5B5F67] text-md sm:text-xl"
                >
                  Common causes include age-related wear and tear like bone spurs (bony growths), bulging or herniated discs pushing into the space, thickening of spinal ligaments, or a vertebra slipping out of place (spondylolisthesis). If you're experiencing radiating symptoms, understanding the cause is the first step toward effective treatment.
                </h1>
                {/* Placeholder for a potential diagnostic checker button */}
                {/* <OutlinedButton text="Do I have this Condition?" /> */}
              </div>
            </div>
          ),
        },
        {
          "post": (
            <div className=" flex flex-col space-y-[16px] ">
              <h1
                style={{
                  fontFamily: "var(--font-reem-kufi)",
                  fontWeight: 500,
                }}
                className="text-[#111315] text-2xl" // Adjusted size for secondary heading
              >
                How Is Foraminal Stenosis Diagnosed?
              </h1>
              <div className=" flex flex-col space-y-[40px]">
                <h1
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 400,
                  }}
                  className="text-[#5B5F67] text-md sm:text-xl"
                >
                  Diagnosing foraminal stenosis accurately requires a combination of understanding your symptoms and using advanced imaging. Our specialists at Mountain Spine Orthopedics begin with a detailed discussion about your pain pattern, numbness, weakness, and what activities make your symptoms better or worse. A thorough neurological exam follows, testing your reflexes, muscle strength, and sensation to pinpoint which nerve might be affected.<br /><br />
                  Imaging plays a vital role. While X-rays can show bone alignment and arthritis, an MRI (Magnetic Resonance Imaging) is usually the preferred test. It provides clear pictures of soft tissues, including nerves and discs, showing exactly where and how severely the nerve is being compressed within the foramen. We offer complimentary MRI reviews to help assess your condition. In some cases, a CT (Computed Tomography) scan might be used for better bone detail, or nerve conduction studies (EMG/NCS) might assess nerve function directly.
                </h1>
                <OutlinedButton text="Explore Treatment Options" />
              </div>
            </div>
          )
        },
        {
          "post": (
            <div className=" flex flex-col space-y-[16px] ">
              <h1
                style={{
                  fontFamily: "var(--font-reem-kufi)",
                  fontWeight: 500,
                }}
                className="text-[#111315] sm:text-4xl text-3xl">
                Managing Pain from Foraminal Stenosis
              </h1>
              <div className=" flex flex-col space-y-[40px]">
                <h1
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 400,
                  }}
                  className="text-[#5B5F67] text-md sm:text-xl"
                >
                  The goal of managing foraminal stenosis pain is to reduce nerve compression and inflammation. Conservative, non-surgical approaches are typically tried first:<br />
                  <li><b>Activity Modification:</b> Avoiding activities that worsen symptoms.</li>
                  <li><b>Medications:</b> Over-the-counter or prescription nonsteroidal anti-inflammatory drugs (NSAIDs) like ibuprofen or naproxen can reduce pain and swelling.</li>
                  <li><b>Physical Therapy:</b> Specific exercises can help improve flexibility, strengthen supporting muscles (core, back), and improve posture, potentially creating more space for the nerve.</li>
                  <li><b>Epidural Steroid Injections:</b> Corticosteroid medication injected near the compressed nerve can provide significant, though often temporary, relief from inflammation and pain.</li><br /><br />
                  If these methods don't provide adequate relief, or if there is progressive weakness, surgical options might be considered. Our focus is on effective pain relief tailored to your specific situation.
                </h1>
              </div>
            </div>
          )
        },
        {
          "post": (
            <div className=" flex flex-col space-y-[16px] ">
              <h1
                style={{
                  fontFamily: "var(--font-reem-kufi)",
                  fontWeight: 500,
                }}
                className="text-[#111315] sm:text-4xl text-3xl">
                What Causes Foraminal Stenosis?
              </h1>
              <div className=" flex flex-col space-y-[40px]">
                <h1
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 400,
                  }}
                  className="text-[#5B5F67] text-md sm:text-xl"
                >
                  Foraminal stenosis is most often caused by the natural aging process and degenerative changes in the spine. As we age, various structures can encroach upon the neural foramina:<br />
                  <li><b>Bone Spurs (Osteophytes):</b> The body may grow extra bone around joints affected by arthritis, narrowing the foraminal space.</li>
                  <li><b>Herniated or Bulging Discs:</b> The soft discs between vertebrae can bulge or rupture, pushing disc material into the foramen and compressing the nerve.</li>
                  <li><b>Thickened Ligaments:</b> Ligaments within the spinal canal can thicken and stiffen over time, reducing the available space.</li>
                  <li><b>Spondylolisthesis:</b> One vertebra slips forward relative to the one below it, potentially narrowing the foramen at that level.</li>
                  <li><b>Facet Joint Arthritis:</b> Enlargement of the small joints connecting vertebrae (facet joints) due to arthritis can also contribute to foraminal narrowing.</li><br /><br />
                  Less common causes include spinal injuries, tumors, or cysts. Understanding the specific cause is key to choosing the right treatment.
                </h1>
                <GradientOverlayImage
                  imageData={'https://mountainspineortho.b-cdn.net/public/ForaminalS.png'} // Placeholder for another diagram/image
                  height="500px"
                  gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
                />
              </div>
            </div>
          )
        },
        {
          "post": (
            <div className=" flex flex-col space-y-[16px] ">
              <h1
                style={{
                  fontFamily: "var(--font-reem-kufi)",
                  fontWeight: 500,
                }}
                className="text-[#111315] sm:text-4xl text-3xl">
                Risk Factors for Developing Foraminal Stenosis
              </h1>
              <div className=" flex flex-col space-y-[40px]">
                <h1
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 400,
                  }}
                  className="text-[#5B5F67] text-md sm:text-xl"
                >
                  While anyone can develop foraminal stenosis, certain factors increase your risk:<br />
                  <li><b>Age:</b> It's most common in individuals over 50 due to cumulative wear and tear.</li>
                  <li><b>Degenerative Conditions:</b> Osteoarthritis, degenerative disc disease are major contributors.</li>
                  <li><b>Spinal Deformities:</b> Conditions like scoliosis can alter spinal mechanics and increase stress.</li>
                  <li><b>Previous Spinal Injury:</b> Trauma can accelerate degenerative changes or directly narrow the foramina.</li>
                  <li><b>Genetics:</b> Some individuals may have a hereditary predisposition to spinal degeneration.</li>
                  <li><b>Lifestyle Factors:</b> Obesity puts extra stress on the spine, and smoking can impair disc health. Repetitive strain from certain jobs or activities may also play a role.</li><br /><br />
                  Being aware of these factors can help in early recognition and management.
                </h1>
              </div>
            </div>
          )
        },
        {
          "post": (
            <div className=" flex flex-col space-y-[16px]">
              <h1
                style={{
                  fontFamily: "var(--font-reem-kufi)",
                  fontWeight: 500,
                }}
                className="text-[#111315] sm:text-4xl text-3xl">
                Treatment Options for Foraminal Stenosis
              </h1>
              <div className=" flex flex-col space-y-[40px]">
                <h1
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 400,
                  }}
                  className="text-[#5B5F67] text-md sm:text-xl"
                >
                  Treatment for foraminal stenosis aims to relieve nerve pressure and reduce symptoms. The approach depends on symptom severity and cause:<br />
                  <b>Conservative Treatments:</b>
                  <li>Physical therapy, NSAIDs, activity modification.</li>
                  <li>Epidural steroid injections for inflammation.</li>
                  <b>Surgical Treatments (when conservative care fails or symptoms are severe):</b>
                  <li><b>Foraminotomy:</b> A minimally invasive procedure where bone or tissue compressing the nerve within the foramen is removed, enlarging the opening.</li>
                  <li><b>Laminotomy/Laminectomy:</b> Removal of a small portion (laminotomy) or the entire lamina (laminectomy) - part of the vertebral bone - to create more space, often combined with foraminotomy.</li>
                  <li><b>Spinal Fusion:</b> May be necessary in cases of instability (like spondylolisthesis) often performed alongside decompression procedures.</li>
                </h1>
                <h1
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 400,
                  }}
                  className="text-[#5B5F67] text-md sm:text-xl"
                >
                  At Mountain Spine Orthopedics, our surgeons specialize in minimally invasive techniques whenever possible. These approaches often involve smaller incisions, less muscle disruption, reduced blood loss, and potentially faster recovery times compared to traditional open surgery. We tailor the treatment plan to provide the most effective relief for your specific condition.
                </h1>
              </div>
            </div>
          )
        },
        {
          "post": (
            <div className="flex flex-col space-y-[16px]">
              <h1
                style={{
                  fontFamily: "var(--font-reem-kufi)",
                  fontWeight: 500
                }}
                className="text-[#111315] sm:text-4xl text-3xl">
                Frequently Asked Questions About Foraminal Stenosis
              </h1>
              <div className=" flex flex-col space-y-[40px]">
                <h1
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 500
                  }}
                  className="text-[#111315] text-md sm:text-xl"
                >
                  Is foraminal stenosis serious?
                </h1>
                <h1
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 400
                  }}
                  className="text-[#5B5F67] text-md sm:text-xl"
                >
                  While often manageable with conservative care, severe or progressive foraminal stenosis can lead to chronic pain, significant weakness, numbness, and loss of function if left untreated. In rare cases involving the lower spine, severe compression can affect bowel or bladder control (cauda equina syndrome), which is a medical emergency. Early diagnosis and treatment are important.
                </h1>
                <h1
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 500,
                  }}
                  className="text-[#111315] text-md sm:text-xl">
                  Can foraminal stenosis heal on its own?
                </h1>
                <h1
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 400,
                  }}
                  className="text-[#5B5F67] text-md sm:text-xl"
                >
                  The underlying structural narrowing (like bone spurs or thickened ligaments) typically does not resolve on its own. However, symptoms can sometimes improve or fluctuate with conservative treatments that reduce inflammation (like injections) or improve biomechanics (like physical therapy), effectively managing the condition without surgery.
                </h1>
                <h1
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 500,
                  }}
                  className="text-[#111315] text-md sm:text-xl">
                  What activities should be avoided with foraminal stenosis?
                </h1>
                <h1
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 400,
                  }}
                  className="text-[#5B5F67] text-md sm:text-xl"
                >
                  Activities that worsen your specific symptoms should generally be avoided or modified. This often includes high-impact activities (like running on hard surfaces), heavy lifting with improper form, prolonged sitting or standing without breaks, and activities involving excessive twisting or extension of the affected spinal region. A physical therapist can provide personalized guidance.
                </h1>
              </div>
            </div>
          )
        },
        {
          "post": (
            <div className=" flex flex-col space-y-[16px] ">
              <h1
                style={{
                  fontFamily: "var(--font-reem-kufi)",
                  fontWeight: 500,
                }}
                className="text-[#111315] sm:text-4xl text-3xl">
                Schedule Your Foraminal Stenosis Consultation
              </h1>
              <div className=" flex flex-col space-y-[40px]">
                <h1
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 400,
                  }}
                  className="text-[#5B5F67] text-md sm:text-xl"
                >
                  Radiating nerve pain, numbness, or weakness shouldn't limit your life. The expert team at Mountain Spine Orthopedics offers comprehensive evaluation and cutting-edge treatments for foraminal stenosis, from conservative care to advanced minimally invasive surgery.<br /><br />
                  Take the first step towards relief. Contact us to schedule your consultation, benefit from a complimentary MRI review, and receive a free second opinion from our spine specialists. Call us today or use our online form to request an appointment.
                </h1>
                {/* Add contact info or button here */}
                {/* Example: <OutlinedButton text="Request Appointment" /> */}
              </div>
            </div>
          )
        }
      ],
      "slug": "foraminal-stenosis"
    },

    {
      "title": "Hip Impingement (Femoroacetabular Impingement)",
      "tag": "Lower Spine",
      "card_img": 'https://mountainspineortho.b-cdn.net/public/Hipcard.jpg',
      "inTxt_img": 'https://mountainspineortho.b-cdn.net/public/Hiparti.png',
      "body": "Hip impingement also known as femoroacetabular impingement or FAI occurs when abnormal contact between the femoral head neck junction and the rim of the hip socket leads to cartilage and labral damage causing groin pain stiffness and reduced athletic performance. At  we provide high resolution imaging personalized treatment options and patient centered amenities including complimentary MRI reviews free second opinions and convenient car service to help you return to pain free motion",
      "detail": "A healthy hip functions as a smoothly rotating ball and socket joint. In FAI extra bone forms at the femoral head neck junction cam lesion or along the acetabular rim pincer lesion causing pinch like contact of soft tissues during flexion and rotation. Repeated impaction tears the labrum and abrades cartilage resulting in sharp groin pain mechanical clicking and progressive stiffness. Young athletes and active adults often notice reduced hip flexion difficulty with deep squats or pain after prolonged sitting. At  evaluation begins with a detailed history including sport participation injury timeline and functional limits. A focused exam checks range of motion and reproduces symptoms with flexion adduction internal rotation maneuvers. Complimentary high resolution MRI arthrography shows labral tears cartilage wear and bony morphology while 3 D CT evaluates the precise size and orientation of bone overgrowth. These findings inform an individualized treatment pathway aimed at preserving the joint",
      "what_sym": "Most patients report sharp or aching groin pain triggered by hip flexion pivoting or sitting in low chairs along with clicking or locking sensations reduced hip flexion and internal rotation and in chronic cases lateral hip or buttock pain from muscle overuse",
      "risk_fac": "Risk increases with high impact or pivoting sports during growth family history of FAI childhood hip disorders such as slipped capital femoral epiphysis or Legg Calve Perthes disease repetitive deep squatting and hip joint laxity permitting excess motion",
      "diagnose": "Diagnosis uses MRI and CT plus standing pelvis and Dunn view X rays to measure alpha angle and acetabular coverage confirming cam and pincer morphology. Diagnostic intra articular anesthetic injections help differentiate FAI related pain from other causes. These complimentary tests ensure precise diagnosis before therapy begins",
      "treatment": "Initial care focuses on activity modification targeted physiotherapy to strengthen hip abductors and core muscles anti inflammatory medication and injections of corticosteroid or platelet rich plasma to relieve labral irritation. When pain persists or imaging shows damage arthroscopic surgery reshapes cam and pincer lesions repairs the labrum and addresses cartilage defects restoring smooth mechanics while preserving the native joint. Postoperative rehabilitation gradually restores motion strength and sport specific agility with milestones tailored to each patient",
      "pain_info": "Pain often spikes during deep hip flexion prolonged sitting or athletic pivoting then lingers as a dull ache.  addresses both mechanical impingement and soft tissue inflammation through integrated care that rapidly reduces pain and prevents further joint damage",
      "prevent": "Early recognition of hip pain limiting repetitive deep flexion drills maintaining balanced hip and core strength and correcting movement mechanics reduce impingement forces and protect the labrum and cartilage from wear",
      "schedule": "Don’t let hip pain sideline your active lifestyle. Schedule a consultation with  for a complimentary MRI review expert second opinion and convenient car service then move forward with a personalized plan to resolve hip impingement and reclaim full motion",
      "slug": "hipimpingement"
    },

    {
      "title": "Loose Bodies",
      "tag": "Lower Spine",
      "card_img": 'https://mountainspineortho.b-cdn.net/public/looseBodiescard.jpeg',
      "inTxt_img": 'https://mountainspineortho.b-cdn.net/public/looseBody.png',
      "body": "Loose bodies are small fragments of cartilage bone or synovial tissue that break free within a joint and float in the synovial fluid causing painful catching locking and swelling. At  our team uses high resolution imaging arthroscopic expertise and patient centered care with complimentary MRI reviews free second opinions and car service to locate and remove loose bodies relieve symptoms and protect long term joint health",
      "detail": "Joints endure repetitive motion and load occasionally causing cartilage chips osteochondral fragments or calcified synovial nodules to detach and drift freely. Traumatic injury osteoarthritis osteochondritis dissecans and synovial chondromatosis commonly generate these loose bodies. Some fragments remain silent but many lodge between articular surfaces triggering sharp pain sudden locking episodes joint effusion and accelerated cartilage wear. Knees elbows ankles and hips are most frequently affected impairing athletic performance and everyday comfort. At  assessment begins with a detailed history of mechanical symptoms clicking catching or giving way alongside swelling patterns and activity restrictions. A focused exam palpates joint lines gauges range of motion and identifies tenderness or effusion. Complimentary high resolution MRI and dynamic ultrasound visualize fragment size composition and location while low dose CT offers crystal clear definition of mineralized bodies. These imaging insights guide a customized treatment strategy tailored to fragment size number and underlying pathology",
      "what_sym": "Patients often describe intermittent sharp pain popping or clicking transient locking that requires gentle manipulation to unlock joint swelling after activity a sense of instability and reduced range of motion. Symptoms can wax and wane as fragments migrate within the joint space",
      "risk_fac": "High impact sports prior intra articular fractures or ligament injuries chronic osteoarthritis osteochondritis dissecans synovial chondromatosis and occupational kneeling or squatting elevate the likelihood of loose body formation",
      "diagnose": "Diagnosis combines clinical exam with complimentary MRI and dynamic ultrasound to map fragment characteristics. Low dose CT provides detailed views of mineralized bodies. In select cases diagnostic arthroscopy may be performed to confirm fragment location and assess cartilage quality before intervention",
      "treatment": "Small symptom free fragments may be monitored with periodic imaging and activity modification. Mechanical symptoms or progressive cartilage damage warrant arthroscopic removal where fragments are extracted cartilage edges smoothed and causative lesions addressed. Post procedure rehabilitation emphasizes early range of motion gradual strengthening and return to sport protocols. When degenerative arthritis coexists adjunctive procedures such as microfracture osteochondral transplantation or realignment osteotomy may accompany loose body removal to restore joint congruity",
      "pain_info": "Pain typically strikes when loose fragments wedge between articulating surfaces then subsides once the fragment dislodges. By eliminating the offending bodies and rehabilitating surrounding tissues our integrated care model provides rapid lasting pain relief and guards against future cartilage wear",
      "prevent": "Preventive strategies focus on addressing underlying joint instability promptly treating cartilage and ligament injuries maintaining balanced muscle strength for joint support and modifying high impact or repetitive activities that amplify shear forces on cartilage",
      "schedule": "If sudden joint locking or sharp pain is disrupting your routine schedule a consultation with . Benefit from a complimentary MRI review a comprehensive second opinion and car service so you can move forward with a clear plan to remove loose bodies and restore smooth pain free motion",
      "slug": "loosebodies"
    },

    {
      "title": "Aging Management",
      "tag": "Spine",
      "card_img": 'https://mountainspineortho.b-cdn.net/public/agingM.jpg',
      "inTxt_img": 'https://mountainspineortho.b-cdn.net/public/agearti.png',
      "body": "Aging management focuses on proactive measures that preserve bone density, joint integrity, and muscle strength as we grow older, reducing the risk of fractures, chronic pain, and loss of independence.  offers personalized aging management programs supported by complimentary MRI reviews, free second opinions, and convenient car service to help you stay active, strong, and pain free throughout every decade",
      "detail": "Starting in our thirties, bone mass gradually declines, cartilage loses hydration, and muscles shrink unless actively trained. These natural changes can culminate in osteopenia, arthritis, and balance deficits that heighten fall and fracture risk. Aging management reframes orthopedic care from reactive treatment to preventive maintenance by identifying vulnerabilities early, optimizing nutrition and exercise, and implementing targeted interventions to delay or reverse musculoskeletal decline. At  evaluation begins with a comprehensive health and activity profile that includes dietary habits, previous injuries, and current fitness routine. A physical exam measures posture, flexibility, strength, and balance, while complimentary bone density DEXA scanning, MRI, or ultrasound gauges bone quality, cartilage thickness, and muscle composition. These data inform a customized roadmap that integrates medical, nutritional, and lifestyle strategies for lifelong mobility",
      "what_sym": "Common indicators include gradual loss of height, new or worsening joint stiffness in the morning, decreased grip strength, slower walking speed, difficulty rising from low chairs, and episodic low back or joint pain after routine tasks",
      "risk_fac": "Genetic predisposition to osteoporosis, sedentary lifestyle, smoking, excessive alcohol use, chronic inflammatory diseases, prolonged corticosteroid therapy, inadequate protein or calcium intake, and hormonal changes such as menopause can all speed tissue degeneration",
      "diagnose": "Beyond imaging and DEXA scanning,  performs laboratory tests to evaluate vitamin D status, inflammatory markers, and hormonal balance. Gait analysis and computerized balance testing pinpoint biomechanical inefficiencies that raise injury risk. These complimentary assessments create a precise baseline against which progress can be measured",
      "treatment": "Our integrated program combines resistance and balance training supervised by physiotherapists, personalized nutrition plans rich in protein, calcium, and vitamin D, smoking cessation support, and medication review to minimize bone depleting drugs. When bone density falls below safe thresholds, pharmacologic therapies such as bisphosphonates or anabolic agents are introduced. Joint preservation techniques including viscosupplementation, platelet rich plasma injections, and minimally invasive arthroscopy address symptomatic degeneration early, delaying or avoiding joint replacement. Regular follow up reassessments track bone and muscle metrics, ensuring interventions evolve with your needs",
      "pain_info": "Age related pain often stems from low grade inflammation, joint cartilage thinning, or tendon stiffness. Our approach combines anti inflammatory nutrition, targeted exercise, regenerative injections, and when appropriate image guided interventions to keep discomfort minimal and function high",
      "prevent": "Participants commonly experience improved posture and balance, increased muscle mass, higher bone density scores, reduced fall incidence, and enhanced confidence to pursue active hobbies well into later life",
      "schedule": "Take charge of healthy aging by scheduling a consultation with  today. Enjoy a complimentary MRI or DEXA review, thorough second opinion, and door to door transportation then embark on a personalized aging management plan designed to keep you mobile strong and independent for decades to come",
      "slug": "agingmanagement"
    },

    {
      "title": "Neck Pain",
      "tag": "Neck",
      "card_img": 'https://mountainspineortho.b-cdn.net/public/neckcard.png',
      "inTxt_img": 'https://mountainspineortho.b-cdn.net/public/neckarti.webp',
      "body": "Neck pain ranges from a dull nagging ache to sharp disabling discomfort that can radiate into the arms and head disrupting work sleep and everyday activities.  offers comprehensive evaluation and individualized treatment supported by complimentary MRI reviews free second opinions and convenient car service to identify the precise cause of neck pain and restore comfortable motion",
      "detail": "The cervical spine balances the head's weight while allowing wide ranging motion making it susceptible to muscle strain degenerative disc disease facet joint arthritis herniated discs whiplash injuries and postural overload from prolonged screen use. Tight muscles inflamed joints or compressed nerves can trigger localized pain headaches numbness or weakness that interferes with driving sleeping and desk work. Without timely care acute sprains may evolve into chronic dysfunction and reduced quality of life. At  evaluation begins with a thorough history exploring symptom onset work ergonomics recreational activities and red flag signs such as arm weakness or balance changes. A focused examination assesses posture range of motion muscle strength reflexes and sensory changes. Complimentary high resolution MRI pinpoints disc degeneration nerve compression or arthritic changes while upright X rays reveal alignment issues and dynamic instability. These findings underpin a personalized treatment plan aligned with each patient's goals and lifestyle",
      "what_sym": "Patients may experience persistent aching or stiffness in the neck sharp pain during sudden movement headaches originating at the base of the skull radiating pain or tingling into the shoulder arm or hand and difficulty turning the head while driving or sleeping comfortably",
      "risk_fac": "Risk increases with prolonged forward head posture during computer or smartphone use sudden whiplash trauma weak shoulder and core muscles degenerative disc disease arthritis smoking that impairs disc nutrition obesity and repetitive overhead work",
      "diagnose": "Diagnosis begins with detailed medical history physical exam and complimentary MRI scans and X rays.  may also use diagnostic selective nerve root or facet blocks electromyography to evaluate nerve function and vascular studies when dizziness or vision changes suggest vertebral artery involvement. These complementary assessments ensure treatment targets the true pain generator",
      "treatment": "First line care focuses on patient education ergonomic adjustments anti inflammatory or neuropathic medication and a structured physiotherapy program that strengthens deep neck flexors shoulder stabilizers and core muscles while restoring flexibility. Image guided cervical epidural or facet injections provide potent relief for inflammatory flares. When structural issues such as large herniated discs severe stenosis or unstable segments cause persistent pain or neurologic deficits minimally invasive decompression or fusion surgery offers durable resolution while preserving healthy tissue. Throughout care  tailors interventions to minimize downtime and promote long term cervical health",
      "pain_info": "Neck pain often worsens with prolonged static posture stress or sudden rotation and eases during gentle movement or heat therapy. Our integrative approach combines precise pain interventions graded exercise and posture retraining to break the cycle of inflammation and muscle guarding that sustains chronic discomfort",
      "prevent": "Preventive measures include maintaining ergonomic workstation setups at eye level taking regular micro breaks to stretch strengthening shoulder girdle and core muscles practicing good sleep posture staying physically active and avoiding tobacco to help prevent recurrent neck pain and related headaches",
      "schedule": "If neck pain is limiting your activities schedule a consultation with  today. Receive a complimentary MRI review comprehensive second opinion and door to door transportation then move forward with a personalized plan to conquer neck pain and regain effortless pain free motion",
      "slug": "neckpain"
    },
    
    {
      "title": "Degenerative Disc Disease Surgery",
      "tag": "Spine",
      "card_img": 'https://mountainspineortho.b-cdn.net/public/dddScard.png',
      "inTxt_img": 'https://mountainspineortho.b-cdn.net/public/dddarti.png',
      "body": "When conservative care no longer controls pain from Degenerative Disc Disease DDD surgical intervention can restore stability relieve nerve pressure and reclaim active living. Mountain Spine & Orthopedics offers state of the art surgical solutions including lumbar or cervical fusion motion preserving disc replacement and minimally invasive decompression backed by complimentary MRI reviews free second opinions and convenient car service to guide you confidently from decision to recovery",
      "detail": "Degenerative Disc Disease occurs as spinal discs dehydrate lose height and crack with age or repetitive stress. In most patients physiotherapy injections and lifestyle modifications ease symptoms but severe degeneration may collapse vertebral spacing inflame facet joints and compress nerve roots creating relentless pain and weakness. Surgical treatment aims to eliminate the mechanical source of pain either by removing the damaged disc and fusing adjacent vertebrae for stability or by replacing it with an artificial disc that maintains motion. At Mountain Spine & Orthopedics surgical candidacy evaluation begins with a meticulous review of symptom duration prior therapies imaging findings and functional goals. Complimentary high resolution MRI clarifies disc collapse Modic changes and nerve impingement while dynamic X rays assess spinal movement and instability. These data underpin a tailored surgical plan that balances durability motion preservation and recovery time",
      "what_sym": "Persistent axial or radicular pain unresponsive to six months of comprehensive non operative therapy progressive neurologic deficits such as weakness or numbness radiographic evidence of severe disc collapse with instability and diminished quality of life that limits work sleep or mobility all support surgical consideration",
      "risk_fac": "Better outcomes correlate with non smoking status healthy body weight strong core musculature and absence of multilevel degeneration. Risk factors such as osteoporosis diabetes active infection or unmanaged mental health conditions require optimization before surgery to ensure solid fusion and smooth recovery",
      "diagnose": "Beyond MRI and X rays Mountain Spine & Orthopedics may perform provocative discography to confirm the symptomatic level and use CT to evaluate bone quality for hardware fixation. These complimentary diagnostics guarantee that surgery targets the precise pain generator and that implant selection aligns with individual anatomy",
      "treatment": "Lumbar or cervical fusion where the damaged disc is removed and adjacent vertebrae are secured with cages and low profile titanium hardware filled with bone graft. Over several months the graft fuses the bones into one solid unit eliminating painful motion. Artificial disc replacement in carefully selected patients with preserved facet joints replaces the disc with a mobile implant that restores spacing and maintains natural movement reducing stress on adjacent segments. Minimally invasive decompression with interbody fusion uses small incisions and tubular retractors to remove herniated disc fragments and osteophytes decompress nerve roots and insert an interbody spacer with less muscle disruption and quicker rehabilitation. Postoperative rehabilitation at Mountain Spine & Orthopedics begins immediately with staged mobility core strengthening and ergonomic retraining guided by physical therapists who coordinate closely with your surgeon",
      "pain_info": "Post surgical soreness typically peaks within the first few days and is managed with multimodal analgesia and early mobilization. As fusion matures or the artificial disc settles nerve irritation subsides producing durable pain relief and renewed confidence in movement",
      "prevent": "Successful surgery markedly improves pain scores function and quality of life. Maintaining strong core and hip muscles practicing proper lifting mechanics avoiding tobacco and adhering to scheduled follow ups protect adjacent discs and extend surgical benefits",
      "schedule": "If unrelenting disc related pain is limiting your life schedule a surgical evaluation at Mountain Spine & Orthopedics today. Receive a complimentary MRI review a comprehensive second opinion and door to door transportation then take the next step toward lasting relief through expertly planned Degenerative Disc Disease surgery",
      "slug": "degenerativediscdiseasesurgery"
    },


    {
      "title": "Pseudarthrosis",
      "tag": "Spine",
      "card_img": 'https://mountainspineortho.b-cdn.net/public/Pseudarti.webp',
      "inTxt_img": 'https://mountainspineortho.b-cdn.net/public/Pseud.png',
      "body": "Pseudarthrosis commonly called a non union occurs when a fractured bone or surgical fusion site fails to heal into solid bone leaving a painful false joint that moves abnormally. At Mountain Spine & Orthopedics our subspecialty team combines high resolution imaging biologic therapies and revision surgical expertise supported by complimentary CT or MRI reviews free second opinions and door to door car service to achieve solid union relieve pain and restore dependable function",
      "detail": "Bone normally heals through stages of inflammation callus formation and remodeling. When blood supply is insufficient mechanical stability is inadequate or systemic factors such as smoking diabetes or osteoporosis interfere the healing cascade stalls and fibrous tissue replaces bone. In the spine pseudarthrosis after fusion permits persistent motion that perpetuates pain and hardware fatigue. In long bones a non union can produce deformity limb length discrepancy and chronic disability. Diagnosis hinges on persistent pain abnormal motion at the fracture or fusion site and imaging that shows absent bridging bone months after surgery or injury. At Mountain Spine & Orthopedics evaluation begins with a detailed review of the original injury or surgery fixation method and biologic risk factors. A focused examination checks for tenderness instability and hardware prominence. Complimentary thin slice CT scanning or high resolution MRI assesses bone bridging implant integrity and occult infection while laboratory tests screen for metabolic or infectious contributors. These data inform a personalized strategy that addresses both mechanical and biological barriers to union",
      "what_sym": "Patients often experience persistent deep pain at the fracture or fusion site grinding or clicking with movement visible deformity or abnormal motion swelling and in spinal cases continued radicular symptoms or inability to wean from brace support months after surgery",
      "risk_fac": "Smoking diabetes malnutrition chronic steroid use vitamin D deficiency advanced age severe soft tissue damage infection poor initial fracture reduction inadequate fixation stability and multilevel spinal fusions all elevate non union risk",
      "diagnose": "Beyond CT and MRI Mountain Spine & Orthopedics may utilize dynamic radiographs to reveal motion at the intended fusion bone scan imaging to assess metabolic activity and blood markers or aspiration to rule out low grade infection. These complimentary evaluations ensure the treatment plan targets every obstacle to healing",
      "treatment": "Non operative measures including electrical or ultrasound bone stimulators targeted vitamin D and protein supplementation smoking cessation support and protected weight bearing may stimulate union in select cases. Persistent non unions require revision surgery including hardware exchange or augmentation for rigid fixation meticulous debridement of fibrous tissue fresh bone graft augmentation using autograft allograft or cellular bone matrix and biologic enhancers such as bone morphogenetic protein BMP. In spinal pseudarthrosis modern techniques incorporate expandable interbody cages navigation guided screw placement and adjunctive osteo inductive materials to achieve solid pain free fusion. Post operative rehabilitation balances protection with progressive loading to foster biologic consolidation while restoring strength and mobility",
      "pain_info": "Non union pain arises from micro motion at the fracture or fusion site and surrounding soft tissue irritation. By re establishing rigid stability and invigorating bone biology our integrated approach transforms chronic pain into dependable support and renewed confidence in movement",
      "prevent": "Optimizing vitamin D and nutrition strict smoking cessation managing diabetes selecting stable fixation constructs ensuring meticulous surgical technique and adhering to post operative weight bearing protocols all mitigate non union risk. Mountain Spine & Orthopedics provides comprehensive peri operative risk factor modification to maximize first time union success",
      "schedule": "If lingering pain or instability persists after a fracture or spinal fusion schedule a consultation with Mountain Spine & Orthopedics today. Receive a complimentary CT or MRI review expert second opinion and door to door transportation then move forward with a personalized plan to conquer pseudarthrosis and regain solid pain free function",
      "slug": "pseudarthrosis"
    },

    {
      "title": "Shoulder Arthritis",
      "tag": "Shoulder",
      "card_img": 'https://mountainspineortho.b-cdn.net/public/sacard.jpg',
      "inTxt_img": 'https://mountainspineortho.b-cdn.net/public/saartib.jpg',
      "body": "Shoulder arthritis is a degenerative joint condition that leads to cartilage loss, joint stiffness, and pain with motion, often impacting daily activities like lifting, dressing, or reaching overhead. At Mountain Spine & Orthopedics we offer expert evaluation and treatment supported by complimentary MRI reviews, free second opinions, and convenient car service to reduce shoulder pain, restore range of motion, and improve quality of life",
      "detail": "The shoulder is a complex joint that relies on smooth cartilage surfaces for pain free mobility. With arthritis whether osteoarthritis post traumatic arthritis or inflammatory types like rheumatoid arthritis, cartilage wears down over time exposing bone and leading to stiffness, swelling, and painful grinding. Bone spurs and joint space narrowing further limit range of motion making basic tasks difficult. At Mountain Spine & Orthopedics diagnosis begins with a complete clinical history and physical exam evaluating pain patterns, strength, flexibility, and joint mechanics. Complimentary X rays show joint space narrowing, bone spurs, or changes in alignment, while high resolution MRI provides detail on cartilage wear, rotator cuff integrity, and inflammation. These insights help shape a personalized treatment strategy based on the stage and type of arthritis",
      "what_sym": "Deep aching pain in the shoulder that worsens with activity and improves with rest; stiffness especially in the morning or after inactivity; audible grinding or clicking with movement; decreased ability to raise the arm overhead or rotate the shoulder; and disrupted sleep due to shoulder discomfort",
      "risk_fac": "Aging, previous shoulder injuries or dislocations, chronic overuse especially in overhead athletes or laborers, autoimmune disorders, family history of arthritis, and rotator cuff tears that alter joint biomechanics all increase the risk of shoulder arthritis",
      "diagnose": "Mountain Spine & Orthopedics uses detailed imaging including complimentary MRI or ultrasound when needed to assess joint cartilage, rotator cuff condition, and inflammation. Combined with clinical evaluation this ensures the most accurate diagnosis and effective treatment plan",
      "treatment": "Initial management includes anti inflammatory medications, corticosteroid or biologic injections, and physical therapy focused on preserving motion and strengthening the surrounding muscles. When symptoms persist or joint damage is advanced surgical options include minimally invasive arthroscopy, partial joint resurfacing, or total shoulder replacement. Reverse shoulder replacement is considered when rotator cuff tears accompany arthritis. Postoperative rehab restores function and ensures long term joint preservation",
      "pain_info": "Pain from shoulder arthritis often flares with repetitive activity or lifting and can become constant over time. Our approach targets both inflammation and joint mechanics to relieve pain and restore comfortable motion",
      "prevent": "Avoiding repetitive overhead strain, maintaining shoulder strength and flexibility, managing underlying autoimmune or metabolic conditions, and treating minor injuries promptly can help delay arthritis progression",
      "schedule": "If shoulder pain or stiffness is interfering with your routine schedule a consultation with Mountain Spine & Orthopedics today. Enjoy a complimentary MRI review, a second opinion, and door to door transportation then take the first step toward long lasting relief from shoulder arthritis",
      "slug": "shoulderarthritis"
    },

    {
      "title": "Shoulder Tendonitis",
      "tag": "Shoulder",
      "card_img": 'https://mountainspineortho.b-cdn.net/public/stcard.jpg',
      "inTxt_img": 'https://mountainspineortho.b-cdn.net/public/starti.png',
      "body": "Shoulder tendonitis is a common overuse injury involving inflammation of the rotator cuff or biceps tendon, causing pain with motion, tenderness, and limited function. At Mountain Spine & Orthopedics we specialize in accurate diagnosis and targeted treatments supported by complimentary MRI reviews, free second opinions, and convenient car service to calm inflammation, restore motion, and get you back to pain free activity",
      "detail": "Tendons are thick bands of tissue that connect muscles to bones allowing smooth and stable movement. In the shoulder repetitive motion overhead activity poor posture or trauma can inflame the rotator cuff or biceps tendons producing shoulder tendonitis. This condition often coexists with impingement syndrome or bursitis and if left untreated can progress to partial or full tendon tears. At Mountain Spine & Orthopedics diagnosis begins with a thorough clinical history focused on activity triggers duration of pain and past shoulder injuries. A physical exam evaluates range of motion tendon tenderness strength and signs of impingement. Complimentary high resolution MRI or ultrasound helps confirm inflammation swelling or microtears in the tendon. These findings allow for an individualized staged treatment approach",
      "what_sym": "Sharp or aching pain at the front or side of the shoulder; pain that worsens with lifting reaching overhead or behind the back; tenderness when pressing on the tendon; night pain that can disturb sleep; and stiffness or weakness with shoulder movements",
      "risk_fac": "Repetitive overhead activity such as sports painting or lifting poor posture weak shoulder stabilizing muscles advancing age bone spurs or previous shoulder injuries can increase the risk of developing shoulder tendonitis",
      "diagnose": "Mountain Spine & Orthopedics uses focused physical tests such as Hawkins Kennedy or Speeds Test alongside complimentary imaging to detect inflammation microtears and associated bursitis or impingement. This ensures a clear diagnosis and effective customized treatment plan",
      "treatment": "Initial treatment includes rest from aggravating activity anti inflammatory medications and physical therapy focused on rotator cuff and scapular muscle balance. Ultrasound guided corticosteroid injections may provide rapid relief when inflammation is severe. For persistent or recurrent cases platelet rich plasma PRP therapy or minimally invasive arthroscopy can treat chronic tendon damage and restore full function. All treatments are designed to relieve pain prevent recurrence and return patients to their regular activities safely and confidently",
      "pain_info": "Shoulder tendonitis pain is usually activity related and sharp with movement especially when reaching overhead or behind the back. Pain may radiate into the upper arm and worsen at night. Mountain Spine & Orthopedics’ targeted therapies reduce inflammation promote tendon healing and restore pain free strength",
      "prevent": "Proper warm up before activity maintaining shoulder flexibility and strength ergonomic modifications and avoiding repetitive overhead tasks when possible all help prevent tendonitis and recurrence",
      "schedule": "If shoulder pain or limited motion is disrupting your daily activities schedule a consultation with Mountain Spine & Orthopedics today. Benefit from a complimentary MRI review expert second opinion and convenient transportation then take the first step toward resolving shoulder tendonitis and regaining pain free motion",
      "slug": "shouldertendonitis"
    },

    {
      "title": "Snapping Hip Syndrome",
      "tag": "Lower Spine",
      "card_img": 'https://mountainspineortho.b-cdn.net/public/shscard.jpg',
      "inTxt_img": 'https://mountainspineortho.b-cdn.net/public/shsarti.jpg',
      "body": "Snapping Hip Syndrome is a condition where a tendon or muscle moves over a bony structure in the hip creating a snapping or popping sensation sometimes accompanied by pain or tightness. At Mountain Spine & Orthopedics we offer accurate diagnosis and personalized treatment supported by complimentary MRI reviews free second opinions and convenient car service to restore hip comfort function and mobility",
      "detail": "Snapping Hip Syndrome also called coxa saltans is caused by tendons catching and releasing as they move across bony prominences in the hip during activity. There are three primary types external most common caused by the iliotibial band or gluteus maximus snapping over the greater trochanter internal from the iliopsoas tendon snapping over pelvic bones and intra articular due to loose bodies or labral tears inside the joint. While snapping may be painless at first repeated friction or inflammation can lead to discomfort and limited range of motion. At Mountain Spine & Orthopedics diagnosis begins with a comprehensive patient history and physical examination including observing the snapping motion during activity. Complimentary imaging such as MRI or dynamic ultrasound is used to confirm the source of snapping evaluate for inflammation and rule out intra articular causes like labral tears. These findings allow our specialists to create a focused individualized treatment plan",
      "what_sym": "An audible or palpable snapping or popping sensation in the front side or back of the hip during walking rising from a chair or rotating the leg pain or discomfort with repetitive hip movements tightness in the hip or thigh muscles and occasional weakness or instability",
      "risk_fac": "Athletes involved in repetitive hip motion such as dancers runners cyclists and soccer players are at higher risk. Muscle tightness limb length discrepancies weak hip stabilizers previous hip injury or abnormal biomechanics also increase the likelihood of developing this condition",
      "diagnose": "Mountain Spine & Orthopedics uses clinical movement assessments provocative maneuvers and complimentary dynamic ultrasound or MRI to identify the exact snapping structure and differentiate between external internal and intra articular types. This ensures treatment is appropriately targeted",
      "treatment": "Most cases respond well to non operative care including activity modification anti inflammatory medications and physical therapy focused on stretching tight structures and strengthening hip stabilizers. Manual therapy and guided stretching for the iliopsoas or IT band are key in recovery. If conservative treatment fails or imaging reveals intra articular pathology minimally invasive arthroscopy may be used to address labral tears or remove loose bodies. Our approach is customized for each patient’s activity level and recovery goals",
      "pain_info": "While snapping itself may be painless inflammation tendon irritation or intra articular causes can lead to sharp aching or throbbing pain in the hip or groin. Addressing both mechanical and inflammatory factors is essential for long lasting relief",
      "prevent": "Regular stretching especially of the hip flexors IT band and gluteal muscles strength training for core and hip stabilizers proper warm up before activity and early treatment of tightness or imbalance can prevent the condition from developing or recurring",
      "schedule": "If hip snapping or pain is disrupting your movement schedule a consultation with Mountain Spine & Orthopedics today. Take advantage of a complimentary MRI review expert second opinion and door to door transportation then move forward with a personalized plan to resolve Snapping Hip Syndrome and restore smooth pain free motion",
      "slug": "snappinghipsydrome"
    },

    {
      "title": "Spinal Bone Spurs",
      "tag": "Spine",
      "card_img": 'https://mountainspineortho.b-cdn.net/public/sbscard.jpg',
      "inTxt_img": 'https://mountainspineortho.b-cdn.net/public/sbsarti.webp',
      "body": "Spinal bone spurs also known as osteophytes are bony growths that develop along the edges of vertebrae often in response to arthritis or disc degeneration. At Mountain Spine & Orthopedics we provide expert diagnosis and advanced treatment options supported by complimentary MRI reviews free second opinions and convenient car service to relieve nerve compression reduce pain and restore spinal mobility",
      "detail": "Bone spurs form as part of the body’s attempt to stabilize degenerating joints in the spine. They typically develop near the facet joints or vertebral endplates and while not always symptomatic they can narrow the spinal canal or foramina leading to nerve compression. This can result in back or neck pain stiffness and radiating symptoms into the arms or legs depending on their location. At Mountain Spine & Orthopedics evaluation begins with a detailed medical history and physical examination to assess pain patterns range of motion and neurologic symptoms. Complimentary imaging such as high resolution MRI CT or X rays is used to identify the presence and impact of bone spurs along with any associated disc degeneration or spinal stenosis. These findings allow for a customized tiered treatment approach based on severity and lifestyle goals",
      "what_sym": "Localized neck or back pain stiffness numbness or tingling in the arms or legs weakness pain that radiates down a limb and difficulty with balance or walking in more severe cases. Symptoms typically worsen with activity or prolonged posture",
      "risk_fac": "Age related disc degeneration osteoarthritis spinal injuries poor posture repetitive spinal stress as seen in manual labor or certain sports and genetic predisposition to joint degeneration all increase the risk of developing spinal bone spurs",
      "diagnose": "In addition to clinical evaluation Mountain Spine & Orthopedics offers complimentary high resolution imaging to pinpoint the size and location of bone spurs and assess their impact on spinal nerves or cord. Electromyography may be used to evaluate nerve function and guide treatment planning",
      "treatment": "Initial management may include anti inflammatory medications physical therapy focused on posture and core stabilization and activity modification. Image guided injections such as epidural steroid injections or facet blocks can reduce inflammation and relieve nerve pressure. In cases where symptoms persist or neurological deficits appear minimally invasive surgery may be recommended to remove the bone spur and decompress the affected nerve root or spinal cord. All care plans are tailored to patient function severity of compression and long term goals",
      "pain_info": "Pain from spinal bone spurs often presents as dull or aching discomfort at rest with sharper radiating pain during activity. Our approach aims to reduce mechanical pressure and calm nerve inflammation for long term symptom relief",
      "prevent": "Maintaining good posture engaging in regular low impact exercise managing weight avoiding repetitive strain and treating arthritis or disc degeneration early can help slow the progression of bone spur formation",
      "schedule": "If back or neck pain is impacting your quality of life schedule a consultation with Mountain Spine & Orthopedics today. Take advantage of a complimentary MRI review expert second opinion and door to door transportation then move forward with a personalized plan to manage spinal bone spurs and regain comfortable movement",
      "slug": "spinalbonespurs"
    },

    {
      "title": "Spinal Stenosis",
      "tag": "Spine",
      "card_img": 'https://mountainspineortho.b-cdn.net/public/sscard.jpg',
      "inTxt_img": 'https://mountainspineortho.b-cdn.net/public/ssarti.jpg',
      "body": "Spinal stenosis is the narrowing of spaces within the spine which can compress spinal nerves and cause pain numbness or weakness. Mountain Spine & Orthopedics provides expert diagnosis and treatment supported by complimentary MRI reviews free second opinions and convenient car service to relieve nerve pressure restore comfort and help you move freely again",
      "detail": "Spinal stenosis most commonly occurs in the cervical or lumbar spine due to age related changes such as disc degeneration thickened ligaments or bone spurs. This narrowing places pressure on the spinal cord or nerve roots leading to symptoms that may worsen over time. Lumbar stenosis may cause leg pain with walking neurogenic claudication while cervical stenosis can affect the arms and hands or even balance. At Mountain Spine & Orthopedics evaluation begins with a thorough medical history and symptom assessment followed by a focused neurologic exam to detect weakness sensory loss or reflex changes. Complimentary imaging typically MRI and standing X rays is used to confirm stenosis assess severity and identify associated spinal instability or disc issues. These insights guide the development of a personalized treatment plan tailored to your symptoms and lifestyle goals",
      "what_sym": "Back or neck pain numbness tingling or weakness in the arms or legs pain or cramping in the legs with walking or standing that improves with sitting or bending forward and in severe cases issues with balance coordination or bladder bowel control",
      "risk_fac": "Aging arthritis herniated discs prior spinal surgery spinal injuries genetic predisposition to narrow spinal canals and conditions like scoliosis all increase the risk of developing spinal stenosis",
      "diagnose": "Mountain Spine & Orthopedics uses complimentary high resolution imaging to visualize the spinal canal nerve roots and surrounding structures. Electromyography EMG may also be used to assess nerve function and guide the best course of treatment",
      "treatment": "Conservative care includes anti inflammatory medications physical therapy and activity modification. Image guided epidural steroid injections can reduce inflammation and relieve nerve compression. If symptoms persist or neurologic decline is present minimally invasive decompression or spinal fusion surgery may be recommended. Mountain Spine & Orthopedics uses modern surgical techniques designed to minimize downtime and maximize long term relief",
      "pain_info": "Pain from spinal stenosis is often positional worsening with standing or walking and improving with sitting or leaning forward. Our treatments target both the mechanical compression and the resulting nerve inflammation for lasting relief",
      "prevent": "Staying physically active maintaining good posture avoiding smoking and treating spinal conditions early can help reduce the risk or progression of spinal stenosis",
      "schedule": "If you're experiencing back or neck pain numbness or difficulty walking schedule a consultation with Mountain Spine & Orthopedics today. Receive a complimentary MRI review expert second opinion and convenient transportation then move forward with a personalized plan to manage spinal stenosis and regain comfortable mobility",
      "slug": "spinalstenosis"
    },

    {
      "title": "Spine Deformities",
      "tag": "Spine",
      "card_img": 'https://mountainspineortho.b-cdn.net/public/sdcard.png',
      "inTxt_img": 'https://mountainspineortho.b-cdn.net/public/sdarti.jpg',
      "body": "Spine deformities including scoliosis kyphosis and lordosis involve abnormal curvatures or misalignment of the spine that can lead to pain postural changes and reduced mobility. At Mountain Spine & Orthopedics we specialize in diagnosing and treating spinal deformities with customized care plans supported by complimentary MRI reviews free second opinions and convenient car service to improve alignment reduce discomfort and restore balance and function",
      "detail": "Spinal deformities may develop during growth as in adolescent idiopathic scoliosis or in adulthood due to degenerative disc disease trauma arthritis or previous surgeries. These curvatures can disrupt normal spinal biomechanics strain muscles and ligaments and compress nerves leading to discomfort and posture related fatigue. Left untreated severe deformities may interfere with lung function walking or daily activities. At Mountain Spine & Orthopedics evaluation begins with a complete history including symptom patterns family history and functional limitations. A detailed physical exam assesses spinal curvature flexibility and neurologic status. Complimentary imaging including standing X rays MRI or CT confirms the type severity and progression of the deformity and guides a personalized treatment strategy",
      "what_sym": "Uneven shoulders or hips visible spinal curvature back or neck pain fatigue after standing or walking height loss breathing difficulty in severe cases and radiating nerve pain from compression",
      "risk_fac": "Genetics adolescence during growth spurts degenerative disc disease osteoporosis spinal trauma neuromuscular conditions and history of spinal surgery increase the likelihood of developing spine deformities",
      "diagnose": "Mountain Spine & Orthopedics uses complimentary standing X rays to measure curvature angles and assess spinal balance. MRI or CT helps detect associated disc nerve or structural issues. Ongoing monitoring may be used to track curve progression in younger patients or those with mild deformity",
      "treatment": "Non surgical options include physical therapy to strengthen core and postural muscles bracing in growing adolescents and pain management strategies like injections or medications. For progressive or functionally limiting curves our spine surgeons offer minimally invasive or open surgical correction using spinal instrumentation and fusion techniques tailored to curve type and patient health. Rehabilitation supports safe recovery and long term spinal alignment",
      "pain_info": "Pain from spine deformities can be mechanical from muscle fatigue and postural strain or neurologic from compressed nerves. Our approach addresses both sources with a combination of targeted therapies and structural realignment",
      "prevent": "Early detection in children and adolescents regular spinal checkups for at risk adults maintaining strong core musculature bone health and good posture can help slow progression or reduce the impact of spinal deformities",
      "schedule": "If you or a loved one is living with spinal curvature or postural discomfort schedule a consultation with Mountain Spine & Orthopedics today. Receive a complimentary MRI or X ray review a thorough second opinion and door to door car service then move forward with a plan to manage spine deformities and restore your natural alignment",
      "slug": "spinedeformities"
    },

    {
      "title": "Synovitis",
      "tag": "Spine",
      "card_img": 'https://mountainspineortho.b-cdn.net/public/syncard.png',
      "inTxt_img": 'https://mountainspineortho.b-cdn.net/public/synarti.jpg',
      "body": "Synovitis is the inflammation of the synovial membrane that lines joints, leading to pain, swelling, and restricted movement. At Mountain Spine & Orthopedics we provide expert evaluation and advanced care supported by complimentary MRI reviews free second opinions and convenient car service to reduce joint inflammation improve mobility and prevent long term joint damage",
      "detail": "The synovial membrane produces fluid that lubricates and nourishes joints. In synovitis this membrane becomes inflamed due to trauma overuse autoimmune conditions like rheumatoid arthritis or underlying joint disorders. The resulting excess synovial fluid and inflammation can damage cartilage over time if untreated. At Mountain Spine & Orthopedics diagnosis begins with a detailed clinical history focused on pain patterns joint stiffness swelling and underlying medical conditions. A physical exam evaluates joint range of motion tenderness and warmth. Complimentary imaging such as MRI or ultrasound is used to detect inflammation joint effusion and underlying damage. Lab testing may also be performed to assess for inflammatory or autoimmune causes",
      "what_sym": "Joint pain and swelling stiffness especially in the morning warmth over the joint tenderness to touch and reduced range of motion. Inflammatory forms may affect multiple joints and worsen with inactivity",
      "risk_fac": "Autoimmune diseases such as rheumatoid arthritis or lupus overuse injuries joint trauma gout infections and metabolic or inflammatory disorders increase the risk of synovial inflammation",
      "diagnose": "Mountain Spine & Orthopedics uses complimentary MRI and diagnostic ultrasound to assess synovial thickening and fluid buildup. Joint aspiration may be performed to analyze synovial fluid for crystals infection or inflammation. Blood tests help rule out systemic inflammatory causes",
      "treatment": "Treatment depends on the underlying cause. Nonsteroidal anti inflammatory drugs NSAIDs corticosteroid injections and physical therapy are often used to reduce inflammation and restore joint function. In chronic or autoimmune cases disease modifying antirheumatic drugs DMARDs or biologics may be prescribed. In persistent cases arthroscopic synovectomy may be recommended to remove inflamed tissue",
      "pain_info": "Pain is usually dull and achy but may intensify with activity or prolonged immobility. Our integrated approach aims to reduce inflammation protect joint surfaces and restore comfortable function",
      "prevent": "Managing underlying autoimmune or metabolic disorders avoiding joint overuse maintaining a healthy weight and using proper biomechanics during physical activity help reduce the risk of developing or worsening synovitis",
      "schedule": "If joint swelling or stiffness is limiting your lifestyle schedule a consultation with Mountain Spine & Orthopedics today. Receive a complimentary MRI review a thorough second opinion and door to door transportation then take the first step toward resolving synovitis and protecting your long term joint health",
      "slug": "synovitis"
    },

    {
      "title": "Tingling or Numbness in Extremities",
      "tag": "Spine",
      "card_img": 'https://mountainspineortho.b-cdn.net/public/tnecard.jpg',
      "inTxt_img": 'https://mountainspineortho.b-cdn.net/public/tnearti.jpg',
      "body": "Tingling or numbness in the arms hands legs or feet can signal nerve compression circulation issues or underlying neurological conditions. At Mountain Spine & Orthopedics we offer comprehensive diagnostics and advanced treatment supported by complimentary MRI reviews free second opinions and convenient car service to pinpoint the cause and restore healthy nerve function and sensation",
      "detail": "Numbness and tingling also referred to as paresthesia can result from nerve root compression in the spine entrapment syndromes like carpal tunnel peripheral neuropathy or systemic conditions like diabetes or multiple sclerosis. Symptoms may be temporary or persistent and may affect one or both sides of the body depending on the source of nerve irritation or damage. At Mountain Spine & Orthopedics diagnosis starts with a complete history including the location duration and patterns of symptoms along with any underlying medical issues or recent injuries. A neurologic exam evaluates strength reflexes and sensory response. Complimentary high resolution MRI electromyography EMG and nerve conduction studies help identify the precise nerve involved and whether compression inflammation or degeneration is present",
      "what_sym": "Pins and needles sensation loss of feeling burning or prickling in the hands or feet weakness clumsiness or a sensation of limbs falling asleep. Symptoms may worsen at night or during specific movements or postures",
      "risk_fac": "Diabetes spinal stenosis herniated discs repetitive motion autoimmune diseases vitamin deficiencies infections and previous trauma increase the likelihood of developing nerve related symptoms",
      "diagnose": "In addition to a full clinical and neurological evaluation Mountain Spine & Orthopedics provides complimentary imaging and electrodiagnostic testing to identify the cause. These tools help differentiate between peripheral entrapment spinal nerve root compression and systemic conditions affecting the nerves",
      "treatment": "Treatment is guided by the underlying diagnosis. Conservative care may include physical therapy anti inflammatory or neuropathic pain medications bracing ergonomic correction and vitamin supplementation. Image guided injections can reduce inflammation around compressed nerves. If structural issues like herniated discs or bone spurs are the cause minimally invasive surgery may be considered. Chronic systemic conditions are managed in collaboration with specialists",
      "pain_info": "Tingling and numbness may be painless or accompanied by burning aching or shooting pain. Our approach targets both symptom relief and the underlying condition to protect nerve health and improve daily function",
      "prevent": "Maintaining good posture avoiding repetitive strain managing blood sugar levels staying physically active and treating underlying medical conditions can help reduce the risk of numbness and tingling",
      "schedule": "If tingling or numbness is affecting your mobility or quality of life schedule a consultation with Mountain Spine & Orthopedics today. Receive a complimentary MRI review expert second opinion and convenient car service then take the first step toward resolving your symptoms and restoring healthy nerve function",
      "slug": "tinglingornumbnessinextremities"
    },
    
    {
      "title": "Herniated Disc",
      "tag": "Spine",
      "card_img": 'https://mountainspineortho.b-cdn.net/public/hdarti.jpeg',
      "inTxt_img": 'https://mountainspineortho.b-cdn.net/public/hdcard.webp',
      "body": "A herniated disc occurs when the soft inner core of an intervertebral disc protrudes through its tougher outer layer, often pressing on nearby nerves and causing pain, numbness, or weakness. At Mountain Spine & Orthopedics, we provide advanced imaging, expert interpretation, and personalized care plans supported by complimentary MRI reviews, free second opinions, and door to door transportation to diagnose and treat herniated discs effectively.",
      "detail": "Herniated discs most commonly affect the lumbar spine but can also occur in the cervical region. They arise from age-related disc degeneration, repetitive strain, sudden trauma, or genetics. As the disc wall weakens, the nucleus pulposus can bulge or rupture, leading to nerve root irritation or compression. Symptoms vary based on location and severity and may include localized pain, radiating limb symptoms, and reduced mobility. At Mountain Spine & Orthopedics, our evaluation begins with a comprehensive medical history and physical examination assessing posture, range of motion, and neurologic function. We use high-resolution MRI and, if needed, CT myelography to pinpoint the site of herniation, gauge nerve involvement, and rule out other spinal pathologies.",
      "what_sym": "Common symptoms include persistent back or neck pain, pain radiating down the arms or legs, numbness or tingling in the extremities, muscle weakness, and difficulty walking or controlling fine motor tasks. Severe cases may present with bowel or bladder dysfunction, indicating urgent intervention is required.",
      "risk_fac": "Risk factors for herniated discs include advancing age, repetitive heavy lifting or bending, poor posture, smoking, obesity, genetic predisposition to disc degeneration, and occupations or sports that place frequent stress on the spine.",
      "diagnose": "Diagnosis relies on a thorough clinical examination and imaging studies. We perform detailed neurologic testing and utilize MRI to visualize soft tissue and nerve involvement. When MRI is contraindicated, CT myelography can provide comparable detail. Electromyography and nerve conduction studies help assess the extent of nerve irritation and guide treatment planning.",
      "treatment": "Conservative management is often successful and may include targeted physical therapy to strengthen core and paraspinal muscles, nonsteroidal anti-inflammatory medications, activity modification, and epidural steroid injections to reduce nerve inflammation. For patients who do not respond to nonsurgical care or who have severe neurologic deficits, minimally invasive microdiscectomy or tubular discectomy can relieve nerve compression while preserving spinal stability and reducing recovery time.",
      "pain_info": "Pain results from both mechanical compression of nerve roots and inflammatory chemicals released by the damaged disc. Symptoms often worsen with sitting, bending, or coughing. Our multidisciplinary approach addresses both inflammation and supporting structures to provide lasting relief.",
      "prevent": "Patients can reduce their risk of herniation by maintaining good posture, practicing proper lifting techniques, engaging in regular core strengthening exercises, maintaining a healthy weight, and avoiding prolonged static positions.",
      "schedule": "If you are experiencing back or neck pain, radiating limb symptoms, or weakness, schedule a consultation with Mountain Spine & Orthopedics today. Benefit from a complimentary MRI review, free second opinion, and door to door transportation as you take the first step toward relief and recovery.",
      "slug": "herniateddisc"
    },
    
    {
      "title": "Rheumatoid Arthritis",
      "tag": "Spine",
      "card_img": 'https://mountainspineortho.b-cdn.net/public/racard.jpeg',
      "inTxt_img": 'https://mountainspineortho.b-cdn.net/public/raarti.jpeg',
      "body": "Rheumatoid arthritis is a chronic autoimmune disorder in which the body’s immune system mistakenly attacks the synovial lining of joints, leading to inflammation, pain, and progressive joint damage. It affects approximately 1% of the global population and can cause significant disability if untreated. At Mountain Spine & Orthopedics, we deliver comprehensive care—from early diagnosis to long-term management—supported by complimentary MRI reviews, free second opinions, and door-to-door transportation to ensure every patient receives personalized treatment and unmatched convenience.",
      "detail": "Rheumatoid arthritis most often affects small joints in the hands and feet but can involve any synovial joint, including the spine. Autoimmune activation triggers synovitis, pannus formation, and gradual erosion of cartilage and bone. Over months to years, persistent inflammation can lead to joint deformity, loss of function, and systemic complications such as cardiovascular disease, pulmonary fibrosis, and osteoporosis. At Mountain Spine & Orthopedics, our evaluation begins with a detailed medical history—including symptom onset, duration of morning stiffness, and family history of autoimmune disease—and a focused physical exam to assess joint swelling, tenderness, and range of motion. We employ advanced imaging with MRI and musculoskeletal ultrasound to visualize early synovitis, erosions, and tenosynovitis. Laboratory testing for rheumatoid factor, anti–CCP antibodies, ESR, and CRP confirms the diagnosis, gauges disease activity, and helps guide therapy.",
      "what_sym": "Patients with rheumatoid arthritis typically experience persistent joint pain, swelling, warmth, and prolonged morning stiffness lasting more than one hour. Symptoms are often symmetrical, affecting the wrists, metacarpophalangeal and proximal interphalangeal joints, and may include fatigue, low-grade fevers, loss of appetite, and generalized malaise. As the disease progresses, joint deformities such as ulnar deviation, swan-neck, and boutonnière deformities may develop, along with reduced grip strength and difficulty performing daily tasks.",
      "risk_fac": "Risk factors for rheumatoid arthritis include a family history of autoimmune disease, specific genetic markers such as HLA-DRB1 alleles, female sex (women are two to three times more likely to develop RA), advancing age, smoking, obesity, and a history of severe periodontal disease. Environmental triggers—such as certain infections, hormonal changes, and alterations in the gut microbiome—also contribute to disease onset and progression.",
      "diagnose": "Diagnosis of rheumatoid arthritis follows the 2010 ACR/EULAR criteria, combining clinical findings with serologic markers and acute phase reactants. We perform comprehensive blood tests for rheumatoid factor and anti–CCP antibodies, measure ESR and CRP levels, and use high-resolution MRI or ultrasound to detect synovial thickening, joint effusions, and early erosions. In select cases, we utilize joint aspiration and synovial fluid analysis to exclude infection or crystal arthropathies. Early detection allows timely initiation of therapy to prevent irreversible joint damage.",
      "treatment": "Treatment focuses on achieving remission or low disease activity through early and aggressive therapy. First-line medications include conventional DMARDs such as methotrexate, sulfasalazine, and leflunomide, often in combination. Biologic agents—TNF inhibitors, IL-6 receptor blockers, B-cell depletion therapies—and targeted small molecules like JAK inhibitors are introduced when patients do not respond adequately. We monitor treatment efficacy and safety with regular lab tests and clinical assessments, adopting a treat-to-target approach. Adjunctive measures include NSAIDs for symptomatic relief, short-term corticosteroids to control flares, and physical and occupational therapy to preserve function. In advanced cases with severe joint destruction, we collaborate with orthopedic surgeons to evaluate joint replacement or synovectomy options.",
      "pain_info": "Inflammatory joint pain in rheumatoid arthritis arises from synovial proliferation, pannus invasion, and the release of cytokines such as TNF-alpha and IL-1 that sensitize pain receptors. Pain often worsens after periods of rest and improves with gentle movement. Many patients also experience central sensitization and fatigue. Our multidisciplinary team addresses both inflammation and pain through tailored pharmacologic regimens, ergonomic counseling, and supportive therapies including aquatic exercises and pain management techniques.",
      "prevent": "While there is no cure for rheumatoid arthritis, early intervention and lifestyle modifications can slow progression. Patients can reduce risk and improve outcomes by quitting smoking, maintaining a healthy weight, engaging in low-impact exercises like swimming or yoga to preserve joint mobility, and practicing good oral hygiene to mitigate periodontal disease. Staying up to date on vaccinations and attending regular follow-up appointments also help prevent complications.",
      "schedule": "If you are experiencing persistent joint pain, stiffness, or swelling, schedule a consultation with Mountain Spine & Orthopedics today. Take advantage of our complimentary MRI review, free second opinion, door-to-door transportation, and telehealth options to embark on a personalized treatment plan designed to control your rheumatoid arthritis and help you reclaim an active, pain-free life.",
      "slug": "rheumatoidarthritis"
    },

    {
      "title": "Tennis Elbow",
      "tag": "Hand",
      "card_img": 'https://mountainspineortho.b-cdn.net/public/tecard.jpg',
      "inTxt_img": 'https://mountainspineortho.b-cdn.net/public/tearti.jpg',
      "body": "Tennis elbow, also known as lateral epicondylitis, is an overuse injury causing degeneration of the extensor carpi radialis brevis tendon at its attachment on the lateral epicondyle of the elbow. Patients typically experience sharp or aching pain on the outside of the elbow that worsens with gripping or wrist extension. At Mountain Spine & Orthopedics, we offer precise diagnosis and individualized treatment plans—supported by complimentary MRI reviews, free second opinions, and door-to-door transportation—to relieve pain, promote tendon healing, and restore full function.",
      "detail": "Tennis elbow arises from repetitive wrist extension and forearm supination activities that produce microtears in the extensor tendon origin. Over time, these microtears trigger an inflammatory and degenerative cascade, leading to tendon thickening, neovascularization, and pain. Although commonly associated with racquet sports, lateral epicondylitis affects patients engaged in any repetitive gripping task, including typing, painting, and assembly line work. At Mountain Spine & Orthopedics, our evaluation begins with a comprehensive history of activity patterns and symptom onset, followed by a focused physical exam assessing tenderness at the lateral epicondyle and reproduction of pain with resisted wrist and middle finger extension. When indicated, we utilize high-resolution ultrasound or MRI to visualize tendon pathology, rule out concomitant joint or nerve injury, and quantify tendon degeneration.",
      "what_sym": "Patients with tennis elbow commonly report lateral elbow pain that radiates down the forearm, weakness when gripping objects, difficulty shaking hands or turning doorknobs, and increased discomfort when lifting a cup or making a fist. Morning stiffness and pain at night may also occur in more severe cases.",
      "risk_fac": "Risk factors for tennis elbow include repetitive wrist extension and pronation movements, participation in racquet sports such as tennis and squash, occupational activities involving tool use or heavy lifting, poor ergonomic setup, middle age between 35 and 55 years, and smoking, which impairs tendon healing.",
      "diagnose": "Diagnosis relies on clinical assessment and targeted imaging. We perform physical tests such as Cozen’s test, Mill’s test, and Maudsley’s test to reproduce symptoms. High-resolution ultrasound offers dynamic evaluation of tendon structure, while MRI provides detailed visualization of tendon tears, neovascularization, and associated joint pathology when needed.",
      "treatment": "Conservative management succeeds in most cases and includes activity modification, a counterforce brace to offload the tendon, physical therapy emphasizing eccentric strengthening of the wrist extensors, and nonsteroidal anti-inflammatory medications. For persistent symptoms, image-guided interventions such as platelet-rich plasma injections or extracorporeal shockwave therapy may enhance tendon healing. In rare cases unresponsive to nonsurgical care, we perform minimally invasive tenotomy or open debridement to remove degenerative tissue and stimulate a healing response.",
      "pain_info": "Pain in tennis elbow stems from both mechanical overload of tendon fibers and inflammatory mediators released during the degeneration process. Microvascular ingrowth into the tendon disrupts normal collagen alignment, sensitizing local nerve endings and amplifying pain with wrist movement.",
      "prevent": "To prevent tennis elbow, patients should use proper technique and equipment in sports, incorporate a thorough warm-up and stretching routine, perform regular forearm strengthening exercises focusing on eccentric loading, maintain optimal workstation ergonomics, and avoid prolonged repetitive gripping without breaks.",
      "schedule": "If you are experiencing persistent lateral elbow pain, weakness, or difficulty with daily activities, schedule a consultation with Mountain Spine & Orthopedics today. Take advantage of our complimentary MRI review, free second opinion, door-to-door transportation, and telehealth options to begin an effective treatment plan and return to pain-free function.",
      "slug": "tenniselbow"
    },

    {
      "title": "Plantar Fasciitis",
      "tag": "Foot",
      "card_img": 'https://mountainspineortho.b-cdn.net/public/pfcard.webp',
      "inTxt_img": 'https://mountainspineortho.b-cdn.net/public/pfarti.jpg',
      "body": "Plantar Fasciitis is the leading cause of heel pain in adults. It develops when the plantar fascia a thick band of connective tissue that runs from the heel to the base of the toes becomes irritated, inflamed, or partially torn. Repetitive stress from walking, running, or long hours of standing can strain the fascia, producing sharp, stabbing heel pain that is often worst with the first steps in the morning or after periods of rest.<br/> At Mountain Spine & Care our foot and ankle specialists combine precise diagnosis with evidence based therapies to relieve discomfort, restore normal gait, and keep you active without interruption.",
      "detail": "The plantar fascia acts like a shock absorbing bowstring that supports the arch of the foot. When microtears accumulate faster than the body can repair them, inflammation sets in, leading to pain and stiffness along the heel and arch. Contributing factors include tight calf muscles, high arches, flat feet, sudden increases in activity level, inappropriate footwear, and excess body weight. <br/> At Mountain Spine & Care we begin with a thorough physical examination and high resolution ultrasound or weight bearing X rays to confirm the diagnosis and rule out related conditions such as stress fractures or heel spurs. From there, we design a step by step plan that may include personalized stretching routines, targeted manual therapy, and custom orthotics that redistribute load across the heel and midfoot. For athletes and workers who spend long hours on hard surfaces, we also provide footwear consultations to ensure proper cushioning and arch support.",
      "what_sym": "Patients with plantar fasciitis typically report sharp heel pain first thing in the morning or after sitting, which improves slightly with movement but may return after prolonged standing, walking, or stair climbing. Other symptoms include tenderness at the bottom of the heel, swelling, a tight Achilles tendon, and discomfort when dorsiflexing the foot.",
      "risk_fac": "Key risk factors include excessive pronation (flat feet), high-arched feet, tight calf muscles and Achilles tendon, obesity, prolonged standing or walking on hard surfaces, sudden increases in activity, improper or worn-out footwear, and underlying conditions such as diabetes or rheumatoid arthritis.",
      "diagnose": "Diagnosis is primarily clinical, based on history and physical exam demonstrating point tenderness at the plantar fascia origin. Imaging is reserved for atypical cases or refractory symptoms. Ultrasound reveals fascia thickness (>4 mm), hypoechoic areas, and neovascularization. MRI can further assess associated bone marrow edema or rule out alternative diagnoses. Weight-bearing X-rays may show heel spurs but spur presence does not correlate directly with pain.",
      "treatment": "Most patients improve with conservative care, which includes activity modification, stretching exercises for the plantar fascia and calf muscles, custom orthotics or supportive shoes, night splints to maintain dorsiflexion, and physical therapy focusing on eccentric loading of the fascia. Nonsteroidal anti-inflammatory medications and ice massage can reduce pain and inflammation. For persistent cases, image-guided corticosteroid injections, platelet-rich plasma (PRP), extracorporeal shockwave therapy (ESWT), or ultrasound-guided tenotomy may promote healing. Surgical intervention—plantar fascia release—is considered only after six to twelve months of failed nonsurgical management.",
      "pain_info": "Pain arises from both mechanical overload of the fascia and the inflammatory mediators released at sites of microtearing. Morning pain and post-rest pain are hallmark features due to overnight tightening of the fascia. Our treatment plan addresses both inflammation and biomechanical contributors to deliver lasting relief.",
      "prevent": "Preventive strategies include maintaining a healthy weight, choosing supportive, well-fitted footwear, incorporating daily stretching of the Achilles tendon and plantar fascia, gradually increasing activity intensity, avoiding prolonged standing on hard surfaces, and using orthotic inserts or heel cups when needed.",
      "schedule": "If you are experiencing heel pain or stiffness first thing in the morning, schedule a consultation with Mountain Spine & Orthopedics today. Benefit from our complimentary MRI review, free second opinion, door-to-door transportation, and telehealth options as we create a personalized plan to relieve your plantar fasciitis and restore your active lifestyle.",
      "slug": "plantar-fasciitis",
      forum: [
        {
           "post": (
            <div className="flex flex-col space-y-[16px]">
              <h1
                style={{
                  fontFamily: "var(--font-reem-kufi)",
                  fontWeight: 500
                }}
                className="text-[#111315] sm:text-4xl text-3xl">
               What Is Plantar Fasciitis?
              </h1>
               <h1
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 400
                  }}
                  className="text-[#5B5F67] text-md sm:text-xl"
                >
                  Plantar Fasciitis is a degenerative inflammatory condition of the plantar fascia. Repetitive overload causes tiny tears at the origin of the fascia on the heel bone, leading to a cycle of inflammation, scarring, and further degeneration. Pain is classically described as a knife like sensation in the heel with the first few steps after waking or after extended sitting. As the fascia warms up, pain may ease, only to return after prolonged standing or activity. Identifying the true source of heel pain is essential because nerve entrapment, fat pad atrophy, and systemic arthritis can mimic plantar fasciitis and require different treatment strategies.
                </h1>
                <div className="flex flex-col space-y-[40px] mt-[40px] w-full h-full ">
                  <GradientOverlayImage
                    imageData={'https://mountainspineortho.b-cdn.net/Orthopedic%20Website.jpg'} // Placeholder for another diagram/image
                    height="500px"
                    gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
                  />
                  <OutlinedButton text="Do I have this condition?" />
                </div>
            </div>
          )
        },
        {
          post : (
            <div className="flex flex-col space-y-[40px] w-full ">
              <h1
                style={{
                  fontFamily: "var(--font-reem-kufi)",
                  fontWeight: 500
                }}
                className="text-[#111315] sm:text-4xl text-3xl">
                Symptoms of Plantar Fasciitis
              </h1>
              <h1
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 400
                }}
                className="text-[#5B5F67] text-md sm:text-xl"
              >
                <li>Sharp or stabbing heel pain with the first steps in the morning</li>
                <li>Pain that improves after a few minutes of walking but returns with prolonged standing</li>
                <li>Tenderness and swelling near the bottom of the heel</li>
                <li>Increased discomfort when climbing stairs or after intense exercise</li>
                <li>A tight feeling in the calf or Achilles region</li>
                <li>Difficulty walking barefoot on hard floors When left untreated, plantar fasciitis can alter walking mechanics and trigger secondary problems such as knee, hip, and lower back strain.</li>
              </h1>
              <OutlinedButton text="Find a Treatment" />
              <GradientOverlayImage
                    imageData={'https://mountainspineortho.b-cdn.net/fixplantf.jpg'} // Placeholder for another diagram/image
                    height="500px"

                    gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
              />
            </div>
          )
        },
        {
          post : (
            <div className="flex flex-col space-y-[16px]">
              <h1
                style={{
                  fontFamily: "var(--font-reem-kufi)",
                  fontWeight: 500
                }}
                className="text-[#111315] sm:text-4xl text-3xl">
               Stages of Plantar Fasciitis
              </h1>
              <h1
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 400
                }}
                className="text-[#5B5F67] text-md sm:text-xl"
              >
                Early stage – intermittent heel pain that flares after new activities or long days on the feetProgressive stage – daily pain, tightening of the calf and arch, and swelling near the heel pad<br/><br/> Chronic stage – persistent inflammation, thickening of the fascia, heel spur formation, and compensatory gait changes<br/><br/> Recognizing your stage enables the care team at Mountain Spine & Orthopedics to tailor treatments from basic stretching to advanced regenerative options exactly to your needs.
                Learn About Plantar Fasciitis Treatments
              </h1>
            </div>
          )
        },
        {
          post : (
            <div className="flex flex-col space-y-[16px]">
              <h1
                style={{
                  fontFamily: "var(--font-reem-kufi)",
                  fontWeight: 500
                }}
                className="text-[#111315] sm:text-4xl text-3xl"
                >
                  Learn About Plantar Fasciitis Treatments
              </h1>
              <h1
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 400
                }}
                className="text-[#5B5F67] text-md sm:text-xl"
              >
                Initial therapy focuses on reducing inflammation and restoring flexibility. Key components include doctor guided stretching, massage of the plantar fascia and calf, ice massage, and nonsteroidal anti inflammatory medication. Night splints hold the foot in gentle dorsiflexion during sleep, preventing painful morning tightness. Custom orthotic inserts cushion the heel and support the arch, while targeted physical therapy strengthens intrinsic foot muscles for long term stability.<br/><br/>When conservative care does not provide lasting relief within three to six months, advanced modalities such as extracorporeal shockwave therapy, platelet rich plasma injections, or ultrasound guided needle tenotomy can stimulate tissue healing. Surgical release of the plantar fascia is reserved for rare, stubborn cases and is performed using minimally invasive techniques that allow rapid return to weight bearing with a structured rehabilitation program.
              </h1>
            </div>
          )
        },
        {
          post : (
            <div className="flex flex-col space-y-[16px]">
            <h1
              style={{
                fontFamily: "var(--font-reem-kufi)",
                fontWeight: 500
              }}
              className="text-[#111315] sm:text-4xl text-3xl">
              Schedule a Consultation Today            
            </h1>
            <h1
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 400
              }}
              className="text-[#5B5F67] text-md sm:text-xl"
            >
              Persistent heel pain should not sideline your lifestyle. Early professional intervention can stop Plantar Fasciitis from progressing and return you to comfortable movement. <br/><br/> Contact Mountain Spine & Care today at (855) 853-6542 or complete our simple online consultation form.<br/><br/> Our dedicated specialists will evaluate your symptoms, provide an accurate diagnosis, and craft a comprehensive treatment plan that relieves pain, restores function, and gets you back on your feet with confidence.
            </h1>
          </div>
          )
        }
      ],
      side_img : 'https://mountainspineortho.b-cdn.net/Orthopedic%20Website%20(1).jpg'
    },
    {
      "title": "Bursitis",
      "tag": "Knee",
      "card_img": 'https://mountainspineortho.b-cdn.net/public/bcard.jpeg',
      "inTxt_img": 'https://mountainspineortho.b-cdn.net/public/barti.webp',
      "body": "Bursitis is the inflammation of a bursa—a small, fluid-filled sac that cushions and reduces friction between bones, tendons, and muscles—commonly occurring in joints such as the shoulder, elbow, hip, or knee. Patients experience localized pain, swelling, and tenderness that worsen with movement or pressure. At Mountain Spine & Orthopedics, we combine expert clinical evaluation, advanced imaging, and personalized treatment plans—supported by complimentary MRI reviews, free second opinions, and door-to-door transportation—to relieve pain, reduce inflammation, and restore full joint function.",
      "detail": "Bursae are essential for smooth joint mechanics, allowing tendons and muscles to glide over bony prominences. Repetitive motions, direct trauma, prolonged pressure, or underlying systemic conditions such as rheumatoid arthritis and gout can trigger bursal inflammation. Common sites include subacromial (shoulder), olecranon (elbow), trochanteric (hip), prepatellar (knee), and retrocalcaneal (heel) bursae. At Mountain Spine & Orthopedics, our assessment begins with a thorough history of symptom onset, aggravating activities, and occupational or athletic demands. A focused physical exam evaluates point tenderness, warmth, and range of motion. We use high-resolution ultrasound or MRI to confirm bursal inflammation, detect fluid accumulation, and rule out tendon tears, joint arthritis, or infection.",
      "what_sym": "Symptoms of bursitis include sharp or aching joint pain localized to the affected bursa, swelling or palpable fluid collection, warmth and redness over the joint, stiffness, and decreased range of motion. Pain often intensifies with activities such as lifting the arm (shoulder), leaning on the elbow, prolonged walking (hip), kneeling (knee), or pushing off with the foot (heel).",
      "risk_fac": "Risk factors include repetitive or prolonged pressure on a joint (e.g., leaning on elbows, kneeling), overuse from sports like swimming, tennis, or running, direct trauma, poor posture, muscle imbalance, obesity, diabetes, inflammatory arthritis, and infections that can seed the bursa.",
      "diagnose": "Diagnosis is clinical, based on history and physical exam. Provocative tests reproduce pain by compressing or moving the bursa. Ultrasound allows real-time visualization of fluid, bursae thickening, and guides aspiration or injection. MRI provides detailed assessment of adjacent structures, identifies subtle tears or joint disease, and excludes septic bursitis when infection is suspected. Laboratory tests and fluid analysis may be performed if infection is a concern.",
      "treatment": "Most cases of noninfectious bursitis respond to conservative care: rest, ice, compression, and elevation (RICE); nonsteroidal anti-inflammatory drugs (NSAIDs); activity modification; and targeted physical therapy to strengthen and stretch surrounding muscles. If fluid persists or pain is severe, ultrasound-guided bursal aspiration and corticosteroid injection can accelerate recovery. For septic bursitis, we perform aspiration for culture, initiate appropriate antibiotics, and in rare cases consider surgical drainage. Chronic or refractory bursitis may require bursectomy via minimally invasive arthroscopic techniques.",
      "pain_info": "Pain in bursitis originates from stretching and irritation of the inflamed bursal lining and accumulation of inflammatory fluid. Mechanical pressure and movement stimulate pain receptors, leading to sharp or throbbing discomfort that can limit daily activities.",
      "prevent": "Preventive measures include avoiding prolonged pressure on vulnerable joints, practicing proper ergonomics and body mechanics, strengthening and balancing peri-articular muscles, using protective padding for kneeling or leaning, maintaining a healthy weight, and promptly addressing joint injuries or inflammatory conditions.",
      "schedule": "If you are experiencing persistent joint pain, swelling, or stiffness, schedule a consultation with Mountain Spine & Orthopedics today. Benefit from our complimentary MRI review, free second opinion, door-to-door transportation, and telehealth options as we develop a tailored plan to diagnose and treat your bursitis and help you return to pain-free movement.",
      "slug": "bursitis"
    },
    {
      "title": "Bunions (Hallux Valgus)",
      "tag": "Foot",
      "card_img": "https://mountainspineortho.b-cdn.net/public/Bunions%20(1).jpg",
      "inTxt_img": "https://mountainspineortho.b-cdn.net/public/bunions2.png",
      "body": "Bunions develop when the big toe drifts inward toward the other toes, causing the joint at its base to enlarge and protrude along the inside of the foot. This bony bump, known medically as hallux valgus, can create chronic pain, shoe-fit problems, and progressive deformity that interferes with walking and daily activities.<br/>Although tight or narrow footwear often aggravates the condition, bunions stem from a combination of inherited foot structure, biomechanical imbalance, and repetitive stress over time. At Mountain Spine & Orthopedics our specialists diagnose and treat bunions with personalized plans that relieve pain, correct alignment, and help you stay active.",
      "detail": "As a bunion forms, the protective cartilage covering the big-toe joint wears down and the surrounding soft tissues become inflamed. Over time the toe rotates, the bump enlarges, and pressure spreads to the smaller toes, sometimes creating calluses, hammertoes, and altered gait mechanics that strain the knees, hips, and lower back.<br/>The team at Mountain Spine & Orthopedics combines advanced imaging, custom orthotics, and both non-surgical and surgical options to slow progression, restore normal toe position, and prevent long-term complications.",
      "what_sym": "Key symptoms of bunions include a visible bony prominence on the side of the big toe, pain and tenderness around the MTP joint, redness and inflammation, a burning sensation, and possible numbness or tingling. The skin over the bunion may become callused. As the bunion progresses, it can lead to restricted movement of the big toe and pain that worsens with pressure from shoes or standing for long periods. Corns and calluses may also develop on adjacent toes due to pressure and misalignment.",
      "risk_fac": "Primary risk factors for developing bunions include a family history of the condition, as foot type and structure are often inherited. Wearing shoes that are too tight, narrow, or have high heels significantly increases the risk by compressing the toes and altering natural foot mechanics. Individuals with certain arthritic conditions (e.g., rheumatoid arthritis, gout) or those with low arches, flat feet, or overly flexible ligaments are also more susceptible. Age can be a factor, as bunions tend to worsen over time. Occupations that involve a lot of standing or walking can also exacerbate the condition.",
      "diagnose": "Diagnosing a bunion typically involves a physical examination of the foot, where a healthcare provider will assess the MTP joint, check the range of motion of the big toe, and look for signs of pain, redness, and swelling. They will also inquire about family history, footwear habits, and activity levels. X-rays are commonly ordered to determine the extent of the deformity, assess the alignment of the bones, and detect any associated arthritis or damage to the joint. This imaging helps in planning the appropriate treatment strategy.",
      "treatment": "Bunion treatment aims to relieve pain and prevent progression. Conservative, non-surgical treatments are often the first approach and include: wearing wider shoes with a roomy toe box, using over-the-counter bunion pads or cushions, applying ice packs to reduce inflammation, taking nonsteroidal anti-inflammatory drugs (NSAIDs) for pain relief, and using custom orthotic devices or shoe inserts to support the arch and improve foot mechanics. Toe spacers and splints may also be recommended. If conservative measures fail to provide adequate relief or the bunion is severe and significantly impacting quality of life, surgical options (bunionectomy) may be considered to realign the bone and repair soft tissues.",
      "pain_info": "Pain from bunions primarily originates from the inflamed MTP joint due to pressure and misalignment. It can range from a dull ache to sharp, intense pain, especially when walking or wearing shoes. The overlying bursa can become inflamed (bursitis), contributing to tenderness and swelling. Pressure from footwear can also irritate the skin, leading to calluses or corns, which can be painful. In advanced cases, arthritic changes in the joint can cause chronic pain.",
      "prevent": "While genetic predisposition cannot be changed, certain measures can help prevent bunions or slow their progression. Choosing well-fitting footwear with a wide toe box, low heels, and good arch support is crucial. Avoid shoes that squeeze the toes or put excessive pressure on the MTP joint. Maintaining a healthy weight can reduce stress on the feet. Exercises to strengthen foot muscles may also be beneficial. If you have flat feet or other structural foot issues, using orthotics can help maintain proper alignment and reduce strain on the MTP joint. Early attention to foot pain and changes in toe alignment can lead to interventions that may prevent worsening of the condition.",
      "schedule": "If you are struggling with bunion pain or a noticeable deformity affecting your daily life, we encourage you to contact Mountain Spine & Orthopedics. Our specialists can provide a thorough evaluation, including a complimentary MRI review if needed, and discuss personalized treatment pathways. Explore your options for relief, with patient conveniences like telehealth consultations and door-to-door transportation.",
      "slug": "bunions-hallux-valgus",
      forum: [
        {
           "post": (
            <div className="flex flex-col space-y-[16px]">
              <h1
                style={{
                  fontFamily: "var(--font-reem-kufi)",
                  fontWeight: 500
                }}
                className="text-[#111315] sm:text-4xl text-3xl">
                What are Bunions?
              </h1>
               <h1
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 400
                  }}
                  className="text-[#5B5F67] text-md sm:text-xl"
                >
                  A bunion is a structural misalignment of the first metatarsophalangeal joint where the first metatarsal bone deviates outward and the big toe angles inward. This creates an outward bulge that rubs against footwear and concentrates pressure on the joint surface, leading to inflammation, bursitis, and arthritic change. Patients typically report localized soreness, swelling, burning sensations, and difficulty finding comfortable shoes. Accurate assessment of bunion size, joint flexibility, and underlying bone shape guides the most effective treatment strategy.        
                </h1>
                <div className="flex flex-col space-y-[40px] mt-[40px] w-full h-full">
                  <GradientOverlayImage
                    imageData={'https://mountainspineortho.b-cdn.net/bunions.png'} // Placeholder for another diagram/image
                    height="500px"
                    gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
                  />
                  <OutlinedButton text="Do I have this condition?" />
                </div>
            </div>
          )
        },
        {
          post : (
            <div className="flex flex-col space-y-[16px]">
              <h1
                style={{
                  fontFamily: "var(--font-reem-kufi)",
                  fontWeight: 500
                }}
                className="text-[#111315] sm:text-4xl text-3xl">
                Symptoms of Bunions
              </h1>
              <h1
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 400
                }}
                className="text-[#5B5F67] text-md sm:text-xl"
              >
                Most patients first notice a visible bump and intermittent soreness at the base of the big toe. With time, persistent joint pain develops, often described as a burning or throbbing sensation that worsens in snug footwear. Localized skin may appear shiny and warm because of underlying bursitis. The big toe gradually overlaps or under-rides the second toe, increasing crowding and making ordinary activities such as running, hiking, or even shopping arduous. Advanced bunions can cause numbness along the inside of the toe or lead to tingling within the forefoot as nerve branches become compressed. Prompt evaluation is crucial because early intervention can slow or even halt further joint damage.
              </h1>
              <div className="mt-[40px] space-y-[40px] flex flex-col">
                <OutlinedButton text="Find a Treatment" />
                <GradientOverlayImage
                    imageData={'https://mountainspineortho.b-cdn.net/bunion3.png'} // Placeholder for another diagram/image
                    height="500px"
                    gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
                />
              </div>
            </div>
          )
        },
        {
          post : (
            <div className="flex flex-col space-y-[16px]">
              <h1
                style={{
                  fontFamily: "var(--font-reem-kufi)",
                  fontWeight: 500
                }}
                className="text-[#111315] sm:text-4xl text-3xl">
                Stages of Bunion Development 
              </h1>
              <h1
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 400
                }}
                className="text-[#5B5F67] text-md sm:text-xl"
              >
                Bunion progression typically follows a predictable path. In the mild stage, the joint angle deviates slightly, and discomfort appears only during extended activity. During the moderate stage, the bump becomes visually obvious, pain occurs daily, and the big toe begins to rotate. In the severe stage, pronounced angular deviation, joint stiffness, and arthritic change limit walking distance and shoe options to wide or custom designs. Recognizing your stage allows the team at Mountain Spine & Care to match therapies from conservative bracing to surgical realignment precisely to your needs and lifestyle goals.
              </h1>
            </div>
          )
        },
        {
          post : (
            <div className="flex flex-col space-y-[16px]">
              <h1
                style={{
                  fontFamily: "var(--font-reem-kufi)",
                  fontWeight: 500
                }}
                className="text-[#111315] sm:text-4xl text-3xl">
                Learn About Bunion Treatments
              </h1>
              <h1
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 400
                }}
                className="text-[#5B5F67] text-md sm:text-xl"
              >
Many bunions respond well to conservative management when addressed early. Wider toe-box shoes, silicone separators worn at night, and custom orthotics redistribute weight and slow progression. Targeted stretching and strengthening exercises restore flexor-extensor balance in the foot, while nonsteroidal anti-inflammatory medication eases flare-ups. When these measures no longer control pain or when deformity interferes with normal footwear, surgical correction becomes the gold standard. <br/><br/>Our surgeons perform minimally invasive percutaneous osteotomies as well as state-of-the-art Lapidus and scarf-type procedures that realign the metatarsal, restore joint congruency, and stabilize the foot with low-profile titanium hardware. Patients often bear weight in a protective postoperative shoe within days and resume athletic activities within weeks, guided by our in-house physical therapy team.
              </h1>
            </div>
          )
        },
        {
          post : (
            <div className="flex flex-col space-y-[16px]">
            <h1
              style={{
                fontFamily: "var(--font-reem-kufi)",
                fontWeight: 500
              }}
              className="text-[#111315] sm:text-4xl text-3xl">
              Schedule a Consultation Today            
            </h1>
            <h1
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 400
              }}
              className="text-[#5B5F67] text-md sm:text-xl"
            >
              Persistent foot pain, swelling, and visible toe deviation do not have to define your day-to-day life. Early, expert-guided treatment can halt bunion progression and restore comfortable motion.<br/><br/> Contact Mountain Spine & Care today at (855) 853-6542 or complete our simple online consultation form.<br/><br/> Our specialists will evaluate your symptoms, provide a personalized diagnosis, and craft a comprehensive plan that relieves pain, realigns your toe, and gets you back on your feet without compromise to your lifestyle or goals.
            </h1>
          </div>
          )
        }
      ],
      side_img : 'https://mountainspineortho.b-cdn.net/bunions2.png'
    },
    {
      "title": "Achilles Tendonitis",
      "tag": "Foot",
      "card_img": "https://mountainspineortho.b-cdn.net/public/tendo.png",
      "inTxt_img": "https://mountainspineortho.b-cdn.net/public/tendo2.jpeg",
      "body": "Achilles Tendonitis is one of the most frequent overuse injuries seen in active adults. It occurs when the strong Achilles tendon the thick cord connecting your calf muscles to the back of the heel becomes irritated, inflamed, or micro-torn from repetitive stress. <br/> At Mountain Spine & Care, our foot-and-ankle specialists provide state-of-the-art diagnostics and comprehensive treatment plans that calm inflammation, rebuild strength, and protect you from future injury.",
      "detail": "The Achilles tendon endures forces up to eight times body weight during high-impact activities. Sudden mileage increases, tight calf muscles, poorly cushioned shoes, or naturally flat or high-arched feet all shift excess load to the tendon. Over time, microscopic collagen fibers fray, and the tendon’s lining thickens, limiting its ability to glide smoothly. Blood flow to the mid-portion of the Achilles is already limited, slowing natural healing.<br/>Imaging at Mountain Spine & Care including high-resolution diagnostic ultrasound and, when indicated, MRI pinpoints inflamed tissue, tendon thickening, or small tears, allowing us to tailor care from the very first visit.",
      "risk_fac": "Risk factors for Achilles Tendonitis include: sudden increases in the intensity or amount of physical activity, tight calf muscles which put extra stress on the Achilles tendon, and improper footwear that doesn't provide adequate support or cushioning. Having flat arches (overpronation) or bone spurs on the heel can also contribute. Older age is a risk factor as the tendon becomes less flexible and more prone to injury. Certain medical conditions like psoriasis or high blood pressure, and the use of some antibiotics (fluoroquinolones), have also been linked to an increased risk.",
      "diagnose": "Diagnosis usually involves a physical examination by a healthcare provider. They will ask about your symptoms and activity levels. During the exam, they will gently palpate (feel) along the Achilles tendon for pain, swelling, thickening, or tenderness. They will also assess your foot and ankle's range of motion, flexibility, alignment, and strength. X-rays may be taken to check for bone spurs (common in insertional Achilles Tendonitis) or calcification within the tendon. In some cases, an MRI or ultrasound may be ordered to get a more detailed view of the tendon and assess the extent of damage or degeneration.",
      "treatment": "Treatment for Achilles Tendonitis focuses on reducing pain and inflammation and allowing the tendon to heal. The RICE protocol (Rest, Ice, Compression, Elevation) is often the first line of defense. Over-the-counter NSAIDs can help manage pain and swelling. Physical therapy is crucial and typically includes stretching exercises (especially for the calf muscles and Achilles tendon), strengthening exercises (particularly eccentric exercises like heel drops), and potentially other modalities like ultrasound or massage. Orthotic devices or heel lifts may be recommended to reduce stress on the tendon. In some cases, a walking boot or cast may be used to immobilize the ankle. If conservative treatments are not effective after several months, options like extracorporeal shock wave therapy (ESWT) or surgery might be considered for more severe or chronic cases.",
      "pain_info": "Pain from Achilles Tendonitis is typically felt along the back of the lower leg, near the heel. It can range from a mild ache to a more severe, burning pain. The pain often begins as a mild ache after running or other sports activity and can gradually worsen. Morning pain and stiffness are characteristic. The area may be tender to touch and swollen. The type and location of pain can sometimes help differentiate between noninsertional (mid-portion) and insertional (at the heel) tendonitis.",
      "prevent": "Preventing Achilles Tendonitis involves several strategies: gradually increase your activity level and intensity, rather than making sudden changes. Always warm up before exercising and cool down afterward. Incorporate regular stretching exercises for your calf muscles and Achilles tendons to maintain flexibility. Wear appropriate, supportive footwear for your activities and replace worn-out shoes. Strengthen your calf muscles to help them absorb more of the impact from exercise. If you have flat feet or other biomechanical issues, consider using orthotics. Listen to your body and rest if you feel pain or tightness in your Achilles tendon.",
      "schedule": "Experiencing ongoing Achilles tendon pain or stiffness that limits your activities? It's time to seek expert care. Contact Mountain Spine & Orthopedics to arrange a consultation. We provide thorough diagnostic services, including complimentary MRI reviews, and offer amenities like door-to-door transportation to ensure your path to recovery is smooth and effective.",
      "slug": "achilles-tendonitis",
      forum: [
        {
           "post": (
            <div className="flex flex-col space-y-[16px]">
              <h1
                style={{
                  fontFamily: "var(--font-reem-kufi)",
                  fontWeight: 500
                }}
                className="text-[#111315] sm:text-4xl text-3xl">
                What Is Achilles Tendonitis?
              </h1>
               <h1
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 400
                  }}
                  className="text-[#5B5F67] text-md sm:text-xl"
                >
                  Achilles Tendonitis is a degenerative inflammatory condition resulting from cumulative overload. Two primary patterns occur: insertional tendonitis, which affects the lower 2 cm where the tendon anchors into the heel bone, and mid-substance tendonitis, which involves the region 2–6 cm above the heel. In both cases, collagen fibers lose their organized alignment, forming thickened, painful nodules. Patients usually describe morning “start-up pain” that improves with gentle movement but returns after intense exercise or long periods on their feet. Properly distinguishing Achilles Tendonitis from conditions such as Haglund’s deformity, retrocalcaneal bursitis, or partial tendon rupture is essential to selecting the right treatment.
                </h1>
                <div className="flex flex-col space-y-[40px] mt-[40px]">
                  <GradientOverlayImage
                    imageData={'https://mountainspineortho.b-cdn.net/achilles.jpg'} // Placeholder for another diagram/image
                    height="500px"
                    className=""
                    gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
                  />
                  <OutlinedButton text="Do I have this condition?" />
                </div>
            </div>
          )
        },
        {
          post : (
            <div className="flex flex-col space-y-[40px]">
              <h1
                style={{
                  fontFamily: "var(--font-reem-kufi)",
                  fontWeight: 500
                }}
                className="text-[#111315] sm:text-4xl text-3xl">
                Symptoms of  Achilles Tendonitis
              </h1>
              <h1
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 400
                }}
                className="text-[#5B5F67] text-md sm:text-xl"
              >
                <li>Persistent or burning pain at the back of the heel or lower calf, worse with activity</li>
                <li>Morning stiffness that loosens after a few minutes of walking</li>
                <li>Localized swelling or a thickened “cord-like” feeling in the tendon</li>
                <li>Tender nodules or bumps that hurt when squeezed</li>
                <li>Pain when rising on tiptoes or during uphill running</li>
                <li>A creaking or crackling sensation (crepitus) during ankle movement</li>
                <li>Limited ankle dorsiflexion (when the foot flexes upward) due to tight calf muscles Ignoring these signs can lead to tendon degeneration (tendinosis) and elevate the risk of full rupture a surgical emergency.</li>
              </h1>
              <OutlinedButton text="Find a Treatment" />
              <GradientOverlayImage
                    imageData={'https://mountainspineortho.b-cdn.net/tendon2.jpg'} // Placeholder for another diagram/image
                    height="500px"
                    gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
                />
            </div>
          )
        },
        {
          post : (
            <div className="flex flex-col space-y-[16px]">
              <h1
                style={{
                  fontFamily: "var(--font-reem-kufi)",
                  fontWeight: 500
                }}
                className="text-[#111315] sm:text-4xl text-3xl">
                Stages of Achilles Tendonitis
              </h1>
              <ul
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 400
                }}
                className="text-[#5B5F67] text-md sm:text-xl"
              >
                <li>1. Reactive Stage – Sudden overload triggers temporary swelling of the tendon sheath; pain appears after an unusually hard workout.</li>
                <li>2. Early Degenerative Stage – Collagen fibers begin to disorganize; pain emerges more frequently, and a small lump may form.</li>
                <li>3. Late Degenerative Stage – Significant thickening, chronic inflammation, and scar tissue reduce elasticity; daily pain and weakness limit activity.</li>
                <li>4. Pre-Rupture Stage – Multiple micro-tears create severe pain, audible snapping sensations, or sudden loss of push-off power.<br/> Determining your stage helps Mountain Spine & Care match therapies—from conservative care to minimally invasive procedures—precisely to your needs.</li>
              </ul>
            </div>
          )
        },
        {
          post : (
            <div className="flex flex-col space-y-[16px]">
              <h1
                style={{
                  fontFamily: "var(--font-reem-kufi)",
                  fontWeight: 500
                }}
                className="text-[#111315] sm:text-4xl text-3xl">
                Learn About Achilles Tendonitis Treatments
              </h1>
              <h1
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 400
                }}
                className="text-[#5B5F67] text-md sm:text-xl"
              >
                <li>Phase 1: Calm Inflammation – Activity modification, ice massage, topical or oral NSAIDs, and a structured eccentric-calf-loading program proven to stimulate tendon remodeling.</li>
                <li>Phase 2: Correct Mechanics – Customized orthotics or heel lifts reduce tensile load; our physical therapists mobilize tight ankle joints and teach calf-lengthening stretches.</li>
                <li>Phase 3: Regenerate Tissue – For persistent cases, we offer ultrasound-guided platelet-rich plasma (PRP) injections, extracorporeal shock-wave therapy, and percutaneous needle micro-tenotomy to trigger new collagen growth.</li>
                <li>Phase 4: Restore Strength & Return to Sport – Progressive strengthening, plyometrics, and sport-specific drills under physiotherapist supervision ensure a safe comeback.</li>
                <li>Phase 5: Surgical Options (When Necessary) – Minimally invasive debridement, tendon-splitting repair, or reconstruction with a flexor-hallucis-longus tendon transfer for severe degeneration or partial tears. Most patients walk in a boot within days and transition to sneakers by week eight, guided by our on-site rehab team.</li>
              </h1>
            </div>
          )
        },
        {
          post : (
            <div className="flex flex-col space-y-[16px]">
            <h1
              style={{
                fontFamily: "var(--font-reem-kufi)",
                fontWeight: 500
              }}
              className="text-[#111315] sm:text-4xl text-3xl">
              Schedule a Consultation Today            
            </h1>
            <h1
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 400
              }}
              className="text-[#5B5F67] text-md sm:text-xl"
            >
              Heel or calf pain that lingers more than a few days deserves expert evaluation early treatment preserves tendon integrity and prevents rupture.<br/><br/> Contact Mountain Spine & Care today at (855) 853-6542 or complete our simple online consultation form.<br/><br/> Our experienced specialists will confirm your diagnosis, explain every treatment option, and design a personalized plan that relieves pain, rebuilds tendon strength, and returns you to pain-free performance.
            </h1>
          </div>
          )
        }
      ],
      side_img : 'https://mountainspineortho.b-cdn.net/Orthopedic%20Website%20(4).png'
    },
    {
      "title": "Flat Feet",
      "tag": "Foot",
      "card_img": "https://mountainspineortho.b-cdn.net/public/flat2.webp",
      "inTxt_img": "https://mountainspineortho.b-cdn.net/public/flat.webp",
      "body": "Flat feet also called fallen arches or pes planus occur when the arch on the inside of the foot collapses and comes into complete or near-complete contact with the ground. Some people are born with flat feet, while others acquire them over time because of ligament laxity, obesity, pregnancy, injury, or illnesses such as arthritis and diabetes. <br/> Although many individuals experience no pain at first, progressive flattening can strain the ankles, knees, hips, and lower back, leading to fatigue, imbalance, and overuse injuries. At Mountain Spine & Orthopedics, our foot-and-ankle specialists combine precise imaging, gait analysis, and personalized treatment plans to support your arches, restore alignment, and help you move comfortably and confidently.",
      "detail": "A healthy arch works like a spring, absorbing shock and distributing body weight across the foot. When the arch collapses, the heel often rolls inward (overpronation) and the forefoot splays outward, altering the entire kinetic chain. Over time this imbalance can stretch the plantar fascia, inflame the posterior tibial tendon, and overload the shin and knee.<br/>At Mountain Spine & Orthopedics, we begin with weight-bearing X-rays and, when needed, high-resolution ultrasound or MRI to assess bone alignment, ligament laxity, and tendon integrity. We then craft a multi-step plan that may include custom orthotics, targeted muscle-strengthening exercises, and shoe recommendations for optimal arch support. For active patients, our sports medicine team offers video gait analysis to fine-tune running mechanics and prevent secondary injuries.",
      "what_sym": "Many individuals with flat feet experience no symptoms. However, when symptoms do occur, they can include: pain in the arch, heel, ankle, or along the inside of the foot; tired or achy feet, especially after prolonged standing or activity; swelling along the inside of the ankle; difficulty moving the foot in certain ways or standing on tiptoes. The pain may also extend to the calf, knee, hip, or lower back due to altered biomechanics and gait. Shoes may wear unevenly. In cases of PTTD, there may be a gradual outward pointing of the forefoot and heel.",
      "risk_fac": "Risk factors for developing symptomatic flat feet or acquired flatfoot include: genetics (inherited foot structure), aging (wear and tear on tendons), injuries to the foot or ankle (e.g., posterior tibial tendon injury), obesity (increased stress on the arches), and certain medical conditions like rheumatoid arthritis, diabetes (which can cause neuropathy and Charcot foot), and Ehlers-Danlos syndrome (connective tissue disorders). Pregnancy can also temporarily or permanently cause flat feet due to hormonal changes and weight gain. Occupations requiring prolonged standing or walking can also be a contributing factor.",
      "diagnose": "Diagnosing flat feet typically involves a physical examination. Your doctor will observe your feet while you stand and walk, looking for the absence of an arch. They may ask you to stand on your tiptoes to assess the flexibility of the arch and the function of the posterior tibial tendon. The wear pattern on your shoes can also provide clues. If pain is present or an acquired flatfoot is suspected, imaging tests like X-rays may be ordered to examine the bone structure and alignment. In some cases, an MRI or CT scan might be used to evaluate tendon or ligament damage, especially if posterior tibial tendon dysfunction is suspected.",
      "treatment": "Treatment for flat feet is usually only necessary if they cause pain or other problems. For asymptomatic flat feet, no treatment is typically required. If symptoms are present, conservative measures are often effective: wearing supportive, well-fitting shoes with good arch support; using over-the-counter or custom-made orthotic insoles to support the arch and improve foot mechanics; stretching exercises for the Achilles tendon and calf muscles; strengthening exercises for the muscles that support the arch; and weight management if obesity is a factor. Pain relievers like NSAIDs can help with discomfort. In cases of severe PTTD or when conservative treatments fail, surgical options to repair the tendon, realign bones, or fuse joints may be considered.",
      "pain_info": "Pain associated with flat feet can manifest in various locations, including the arch, heel (due to associated Plantar Fasciitis), inner ankle (often related to posterior tibial tendon strain), or even the outer ankle if the foot rolls inward excessively (overpronation). The pain is often described as an ache or fatigue in the feet and legs, particularly after activity or standing for long periods. This discomfort arises from the increased strain on tendons, ligaments, and joints due to the lack of arch support and altered foot biomechanics.",
      "prevent": "While congenital flat feet cannot be prevented, you can take steps to prevent symptoms or the progression of acquired flatfoot. Wearing supportive shoes that provide good arch support and stability is key. Avoid prolonged standing or activities that cause foot pain. Maintain a healthy weight to reduce stress on your feet. Perform regular stretching exercises for the Achilles tendon and calf muscles, as tightness in these areas can exacerbate flat feet. If you notice changes in your arch or develop foot pain, seek early evaluation from a healthcare professional to implement appropriate management strategies.",
      "schedule": "If foot pain or fatigue associated with flat feet is impacting your comfort or mobility, consider scheduling an appointment at Mountain Spine & Orthopedics. Our team is ready to provide a detailed evaluation, discuss if a complimentary MRI review or free second opinion could benefit you, and outline suitable treatment strategies, accessible via in-person or telehealth visits.",
      "slug": "flat-feet",
      forum: [
        {
           "post": (
            <div className="flex flex-col space-y-[16px]">
              <h1
                style={{
                  fontFamily: "var(--font-reem-kufi)",
                  fontWeight: 500
                }}
                className="text-[#111315] sm:text-4xl text-3xl">
                What Are Flat Feet?
              </h1>
               <h1
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 400
                  }}
                  className="text-[#5B5F67] text-md sm:text-xl"
                >
                  Flat feet fall into three broad categories. Flexible flat feet maintain an arch when the foot is off the ground but flatten under body weight. Rigid flat feet lack an arch whether seated or standing, often because of tarsal bone fusion or severe arthritis. Adult acquired flatfoot usually appears later in life when the posterior tibial tendon—the primary dynamic supporter of the arch weakens or tears. People with flat feet frequently notice rapid shoe wear along the inner edge, aching or swelling along the arch or inside ankle, and a tendency to stand or walk with the toes pointed outward. A precise diagnosis is essential because each subtype responds to different interventions.
                </h1>
                <div className="flex flex-col space-y-[40px] mt-[40px]">
                  <GradientOverlayImage
                    imageData={'https://mountainspineortho.b-cdn.net/flatfoot.png'} // Placeholder for another diagram/image
                    height="500px"
                    objectFit="contain"
                    gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
                  />
                  <OutlinedButton text="Do I have this condition?" />
                </div>
            </div>
          )
        },
        {
          post : (
            <div className="flex flex-col space-y-[40px]">
              <h1
                style={{
                  fontFamily: "var(--font-reem-kufi)",
                  fontWeight: 500
                }}
                className="text-[#111315] sm:text-4xl text-3xl">
                Symptoms of Flat Feet
              </h1>
              <h1
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 400
                }}
                className="text-[#5B5F67] text-md sm:text-xl"
              >
                Typical signs include tired, aching feet after prolonged standing, persistent pain or swelling along the inner ankle and arch, heel or arch stiffness first thing in the morning, frequent ankle sprains, knee or lower back discomfort from altered gait, difficulty fitting into regular shoes because of foot widening, and thickened skin under the big toe or along the inside border of the foot. Ignoring these symptoms can invite complications such as plantar fasciitis, shin splints, posterior tibial tendonitis, and early joint arthritis.
              </h1>
              <OutlinedButton text="Find a Treatment" />
              <GradientOverlayImage
                    imageData={'https://mountainspineortho.b-cdn.net/flatfoot.jpg'} // Placeholder for another diagram/image
                    height="500px"
                    objectFit="contain"
                    gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
                />
            </div>
          )
        },
        {
          post : (
            <div className="flex flex-col space-y-[16px]">
              <h1
                style={{
                  fontFamily: "var(--font-reem-kufi)",
                  fontWeight: 500
                }}
                className="text-[#111315] sm:text-4xl text-3xl">
                Stages of Flat Feet Progression
              </h1>
              <h1
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 400
                }}
                className="text-[#5B5F67] text-md sm:text-xl"
              >
              Flat foot deformity generally advances through four recognizable stages. In Stage I the posterior tibial tendon is inflamed but still functional, and the arch collapses only during strenuous activity. Stage II brings a flexible deformity in which the tendon elongates, the heel drifts outward, and the arch flattens fully under load, though manual realignment is still possible.
              <br/><br/>Stage III represents a rigid deformity in which the tendon is severely degenerated or torn, the arch collapse becomes fixed, and arthritis develops in the subtalar and midfoot joints. Stage IV extends the collapse into the ankle itself, producing valgus tilt and advanced arthritic change. Understanding your stage allows our specialists to match treatment, from conservative bracing to corrective surgery, precisely to your needs.
              </h1>
            </div>
          )
        },
        {
          post : (
            <div className="flex flex-col space-y-[16px]">
              <h1
                style={{
                  fontFamily: "var(--font-reem-kufi)",
                  fontWeight: 500
                }}
                className="text-[#111315] sm:text-4xl text-3xl">
                Learn About Flat Feet Treatments
              </h1>
              <h1
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 400
                }}
                className="text-[#5B5F67] text-md sm:text-xl"
              >
                Early care focuses on non surgical measures. Custom molded orthotics or ankle foot braces cradle the arch and limit overpronation, while calf stretching and posterior tibial strengthening exercises improve muscular support. Physical therapy sessions teach balance drills and gait retraining techniques that stabilize the entire lower limb chain. When painful flare ups occur, short courses of anti inflammatory medication or precisely guided corticosteroid injections reduce swelling and restore mobility, and footwear counseling ensures you select shoes with firm heel counters, ample toe boxes, and built in arch support. For stubborn cases, regenerative therapies such as platelet rich plasma injections or extracorporeal shock wave therapy stimulate tendon healing. If the deformity is rigid or continues to progress despite diligent conservative care, surgical correction may be necessary. Our surgeons perform realignment procedures that can include calcaneal osteotomy to reposition the heel, tendon transfer or reconstruction to replace a degenerated posterior tibial tendon, and midfoot or subtalar fusion when severe arthritis is present. Most patients are allowed to bear weight in a protective boot within a few weeks and transition to supportive footwear under the guidance of our in house rehabilitation team.
              </h1>
            </div>
          )
        },
        {
          post : (
            <div className="flex flex-col space-y-[16px]">
            <h1
              style={{
                fontFamily: "var(--font-reem-kufi)",
                fontWeight: 500
              }}
              className="text-[#111315] sm:text-4xl text-3xl">
              Schedule a Consultation Today            
            </h1>
            <h1
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 400
              }}
              className="text-[#5B5F67] text-md sm:text-xl"
            >
             Foot fatigue, arch pain, or ankle instability do not have to limit your daily life. Early expert evaluation can halt flat foot progression and protect the joints throughout your lower body.<br/><br/> Contact Mountain Spine & Care today at (855) 853-6542 or complete our simple online consultation form.
             <br/><br/> Our multidisciplinary team will confirm your diagnosis, explain every treatment option, and design a personalized plan that supports your arches, relieves discomfort, and helps you walk, run, and work without pain.
            
            </h1>
          </div>
          )
        }
      ],
      side_img : 'https://mountainspineortho.b-cdn.net/Orthopedic%20Website%20(6).png'
    },
    {
      "title": "Ankle Arthroscopy",
      "tag": "Foot",
      "card_img": "https://mountainspineortho.b-cdn.net/Orthopedic%20Website%20(11).png",
      "inTxt_img": "https://mountainspineortho.b-cdn.net/Orthopedic%20Website%20(11).png",
      "body": "Ankle arthroscopy is a minimally invasive surgical procedure used to diagnose and treat a variety of ankle joint problems. By using a small camera and specialized instruments, surgeons can address issues with less pain and faster recovery compared to traditional open surgery.<br/> Understanding the indications, procedure, and recovery process is important for patients considering this option.",
      "detail": "During ankle arthroscopy the surgeon fills the joint with sterile fluid to create a clear working space, then guides a high definition camera to inspect the articular cartilage, ligaments, and synovial lining in real time. Through a second or third portal, micro instruments shave damaged tissue, remove inflamed synovium, trim bone spurs, or implant biologic scaffolds that encourage cartilage healing. Because muscles and tendons remain untouched, most patients walk in a protective boot within a few days and begin gentle range of motion exercises almost immediately.<br/>Advanced imaging at Mountain Spine & Orthopedics—including weight bearing radiographs, high resolution MRI, and when needed CT scans—helps us plan each arthroscopy with pinpoint accuracy so we can correct the underlying problem and preserve as much healthy tissue as possible.",
      "what_sym": "Ankle arthroscopy is not a condition itself but a procedure to address symptoms of underlying ankle problems. Symptoms that might lead to a recommendation for ankle arthroscopy include: persistent ankle pain not relieved by conservative treatments, chronic ankle instability or recurrent sprains, sensations of catching, locking, or grinding in the ankle joint, stiffness and limited range of motion, swelling that doesn't resolve, and pain associated with specific conditions like osteochondral defects (damage to cartilage and underlying bone), synovitis, or impingement.",
      "risk_fac": "Risks associated with ankle arthroscopy, while generally lower than open surgery, include those common to any surgical procedure such as infection, bleeding, blood clots, and adverse reactions to anesthesia. Specific risks related to ankle arthroscopy can include nerve irritation or damage (leading to numbness, tingling, or weakness around the ankle or foot), stiffness in the ankle joint, persistent pain or swelling, and the potential need for further surgery if the initial problem is not fully resolved or recurs. The surgeon will discuss these potential risks in detail before the procedure.",
      "diagnose": "The decision to proceed with ankle arthroscopy is based on a thorough diagnostic process. This includes a detailed medical history, a physical examination to assess pain, instability, range of motion, and swelling. Imaging studies are crucial: X-rays can identify bone abnormalities, fractures, or arthritis. Magnetic Resonance Imaging (MRI) provides detailed images of soft tissues like ligaments, tendons, and cartilage, helping to identify tears or damage. A CT scan may be used for a more detailed look at bone structures or loose bodies. If these diagnostic tools indicate an intra-articular (inside the joint) problem amenable to arthroscopic treatment, and conservative measures have failed, arthroscopy may be recommended as both a diagnostic tool (to directly visualize the joint) and a therapeutic procedure.",
      "treatment": "Ankle arthroscopy is itself a treatment method. During the procedure, various problems can be addressed. For example, surgeons can: debride (clean out) damaged cartilage or synovium, remove loose bodies (bone chips or cartilage fragments), repair or reconstruct torn ligaments, treat osteochondral lesions (e.g., by microfracture to stimulate cartilage growth or by grafting), and remove bone spurs causing impingement. Post-operative care typically involves rest, ice, compression, and elevation (RICE). Pain medication will be prescribed. Weight-bearing status will depend on the specific procedure performed. Physical therapy is a critical component of recovery to restore range of motion, strength, and function to the ankle.",
      "pain_info": "Pain after ankle arthroscopy is expected but is generally less severe than after open ankle surgery. The level of pain will depend on the complexity of the procedure performed. Pain is typically managed with prescribed pain medications and NSAIDs. The initial pain and swelling are often due to the surgical trauma and inflammation. As healing progresses and physical therapy begins, some discomfort may be experienced during exercises, but this should gradually subside. Persistent or worsening pain should be reported to the surgeon.",
      "prevent": "Prevention focuses on avoiding ankle injuries that might necessitate arthroscopy. This includes: wearing appropriate and supportive footwear for activities, properly warming up before exercise and cooling down afterward, strengthening the muscles around the ankle to provide better support and stability, maintaining good flexibility in the ankle and calf muscles, and being cautious on uneven surfaces to prevent sprains. For individuals with a history of ankle instability, using braces or taping during high-risk activities may be beneficial. If an ankle injury does occur, seeking prompt and appropriate treatment can help prevent chronic problems that might eventually require surgical intervention like arthroscopy.",
      "schedule": "If chronic ankle issues are holding you back and you're considering surgical options like arthroscopy, please connect with Mountain Spine & Orthopedics. We offer expert consultations, complimentary MRI reviews to assess your case, and convenient services such as door-to-door transportation and telehealth appointments to facilitate your care journey.",
      "slug": "ankle-arthroscopy",
      forum: [
        {
           "post": (
            <div className="flex flex-col space-y-[16px]">
              <h1
                style={{
                  fontFamily: "var(--font-reem-kufi)",
                  fontWeight: 500
                }}
                className="text-[#111315] sm:text-4xl text-3xl">
                What Is Ankle Arthroscopy?
              </h1>
               <h1
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 400
                  }}
                  className="text-[#5B5F67] text-md sm:text-xl"
                >
                  Ankle arthroscopy uses a rigid fiber optic scope connected to a digital camera and light source to visualize the interior of the joint on a high resolution monitor. The surgeon works through portals typically measuring less than one centimeter, guiding instruments such as graspers, shavers, micro drills, and radiofrequency probes to perform precise repairs. Common indications include persistent ankle pain after a sprain, osteochondral defects, impingement caused by bone spurs at the front or back of the joint, loose fragments of cartilage or bone that catch during movement, and early synovitis associated with inflammatory arthritis. By treating these conditions early, ankle arthroscopy can delay or even eliminate the need for more extensive surgery such as ankle fusion or total ankle replacement.
                </h1>
                <div className="flex flex-col space-y-[40px] mt-[40px]">
                  <GradientOverlayImage
                    imageData={'https://mountainspineortho.b-cdn.net/anklereplace.jpg'} // Placeholder for another diagram/image
                    height="500px"
                    gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
                  />
                  <OutlinedButton text="Do I have this condition?" />
                </div>
            </div>
          )
        },
        {
          post : (
            <div className="flex flex-col space-y-[40px]">
              <h1
                style={{
                  fontFamily: "var(--font-reem-kufi)",
                  fontWeight: 500
                }}
                className="text-[#111315] sm:text-4xl text-3xl">
                Symptoms and Signs That May Lead to Ankle Arthroscopy
              </h1>
              <h1
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 400
                }}
                className="text-[#5B5F67] text-md sm:text-xl"
              >
                Patients considered for ankle arthroscopy usually report ongoing deep ankle pain that fails to improve with rest, physical therapy, and medication; repeated episodes of the ankle giving way because of chronic ligament laxity; locking, catching, or grinding sensations that suggest loose bodies or cartilage flaps; swelling that persists long after the original injury; or painful limits in ankle motion caused by anterior or posterior bone spurs. A careful clinical exam combined with targeted imaging confirms whether arthroscopy is the most effective next step.
              </h1>
              <OutlinedButton text="Find a Treatment" />
              <GradientOverlayImage
                  imageData={'https://mountainspineortho.b-cdn.net/ankleant3.jpg'} // Placeholder for another diagram/image
                  height="500px"
                  gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
              />
            </div>
          )
        },
        {
          post : (
            <div className="flex flex-col space-y-[16px]">
              <h1
                style={{
                  fontFamily: "var(--font-reem-kufi)",
                  fontWeight: 500
                }}
                className="text-[#111315] sm:text-4xl text-3xl">
                Stages of Injury Progression and Recovery Timeline
              </h1>
              <h1
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 400
                }}
                className="text-[#5B5F67] text-md sm:text-xl"
              > 
              Most ankle problems begin with an acute injury such as a sprain or fracture that heals incompletely, leaving residual scar tissue, cartilage defects, or subtle bone overgrowth. When conservative care fails, ankle arthroscopy addresses these residual issues before they advance to diffuse arthritis. Recovery unfolds in three predictable phases. The first week focuses on pain control and gentle motion while weight bearing occurs in a removable boot. Weeks two through six emphasize progressive strengthening, balance training, and gradual transition from the boot to supportive athletic shoes. By the third month most patients resume running, court sports, or occupational tasks that require prolonged standing, guided throughout by our on site physical therapy team.
              </h1>
            </div>
          )
        },
        {
          post : (
            <div className="flex flex-col space-y-[16px]">
              <h1
                style={{
                  fontFamily: "var(--font-reem-kufi)",
                  fontWeight: 500
                }}
                className="text-[#111315] sm:text-4xl text-3xl">
               Learn About Ankle Arthroscopy Treatment Options
              </h1>
              <h1
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 400
                }}
                className="text-[#5B5F67] text-md sm:text-xl"
              >
                Not every ankle problem requires surgery, so we exhaust nonsurgical measures first, including targeted physical therapy, ultrasound guided corticosteroid or platelet rich plasma injections, custom bracing, and gait retraining. When imaging shows mechanical impingement, unstable cartilage, or loose debris, arthroscopy becomes the gold standard. Our surgeons use state of the art 4K camera systems, biologic adhesives, and micro fracture drilling techniques that stimulate new cartilage growth, all performed through incisions so small they often require only adhesive strips rather than sutures. After surgery patients follow a tailored rehabilitation plan that blends early protected motion with incremental loading to restore full strength and flexibility without overstressing the healing tissues.
              </h1>
            </div>
          )
        },
        {
          post : (
            <div className="flex flex-col space-y-[16px]">
            <h1
              style={{
                fontFamily: "var(--font-reem-kufi)",
                fontWeight: 500
              }}
              className="text-[#111315] sm:text-4xl text-3xl">
              Schedule a Consultation Today            
            </h1>
            <h1
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 400
              }}
              className="text-[#5B5F67] text-md sm:text-xl"
            >
             Persistent ankle pain, swelling, or instability should not compromise your lifestyle. Early expert intervention can prevent minor joint problems from progressing to disabling arthritis. <br/><br/> Contact Mountain Spine & Care today at (855) 853-6542 or complete our simple online consultation form.
             <br/><br/> Our fellowship trained foot and ankle specialists will review your imaging, perform a comprehensive exam, and explain whether ankle arthroscopy or another advanced treatment can give you lasting relief and a confident return to work, sport, and everyday life.
            
            </h1>
          </div>
          )
        }
      ],
      side_img : "https://mountainspineortho.b-cdn.net/Orthopedic%20Website%20(7).jpg"
    },
    {
      "title": "Hammertoes",
      "tag": "Foot",
      "card_img": "https://mountainspineortho.b-cdn.net/Orthopedic%20Website%20(12).png",
      "inTxt_img": "https://mountainspineortho.b-cdn.net/Orthopedic%20Website%20(12).png",
      "body": "Hammertoes are a progressive toe deformity in which one or more of the lesser toes bend at the middle joint so that the tip points downward while the joint protrudes upward. This abnormal position can rub against shoes, leading to painful corns, calluses, inflammation, and eventually rigid stiffness that interferes with walking and balance. Genetics, poor fitting footwear, high arched or flat feet, previous injury, and certain neuromuscular conditions all contribute to the problem.<br/>At Mountain Spine & Orthopedics our foot and ankle specialists use advanced imaging and individualized care plans to straighten your toes, relieve pressure, and keep you comfortably on your feet.",
      "detail": "A healthy toe relies on balanced pull between its flexor and extensor tendons. When that balance shifts toward the extensor side the toe begins to buckle at the proximal interphalangeal joint. Over time the surrounding ligaments tighten, the joint capsule contracts, and the toe becomes fixed in a hammer shape. Friction inside shoes creates thick calluses over the joint prominence and beneath the tip of the toe, producing burning pain with each step.<br/>At Mountain Spine & Orthopedics we begin with weight bearing X rays to measure joint angles, evaluate the flexibility of the deformity, and rule out arthritic change in the metatarsophalangeal joints. We then craft step by step solutions that may start with shoe modifications, custom orthotics, and soft silicone shields to redistribute pressure while targeted exercises stretch tight tendons and strengthen intrinsic foot muscles.",
      "what_sym": "Common symptoms of hammertoes include a visible abnormal bend in the toe, pain or irritation on the top of the bent toe when wearing shoes, and the formation of corns or calluses on the top of the PIP joint or at the tip of the toe due to friction against footwear. Redness and swelling may occur at the affected joint. In some cases, there might be pain in the ball of the foot beneath the affected toe. Movement of the toe may become restricted and painful. Finding comfortable shoes can become increasingly difficult.",
      "risk_fac": "The most common risk factor for hammertoes is wearing ill-fitting shoes, particularly those that are too tight, too short, or have high heels, which can crowd the toes and force them into a bent position. A traumatic toe injury, such as stubbing, jamming, or breaking a toe, can also predispose to hammertoe. An imbalance in the toe muscles and tendons, which can be due to genetics or nerve damage (e.g., from diabetes or stroke), is another significant factor. Foot structure, such as having a second toe that is longer than the big toe, or having bunions, can also increase the risk. Arthritis can also contribute to the development of hammertoes.",
      "diagnose": "Diagnosis of hammertoes is typically made through a physical examination of the foot. The healthcare provider will assess the structure of the toes, check for flexibility or rigidity of the affected joints, and look for associated corns, calluses, or redness. They will also inquire about symptoms, footwear habits, and any history of foot trauma or medical conditions. X-rays may be taken to evaluate the alignment of the bones, the severity of the deformity, and to check for any underlying arthritis or bone abnormalities. This imaging can help in planning treatment, especially if surgery is being considered.",
      "treatment": "Treatment for hammertoes depends on their severity and whether they are flexible or rigid. For flexible hammertoes, conservative treatments are often effective. These include: wearing shoes with a wider and deeper toe box to accommodate the bent toe, avoiding high heels and tight shoes, using over-the-counter corn pads or cushions to relieve pressure, and gentle stretching or manipulation of the toe. Custom orthotic devices or shoe inserts may help control muscle/tendon imbalance. If corns and calluses are painful, a podiatrist can safely trim them. For rigid hammertoes or when conservative measures fail to relieve pain, surgical options may be considered. Surgery can involve releasing a tight tendon, realigning the toe, or fusing the joint to straighten it.",
      "pain_info": "Pain from hammertoes primarily arises from the pressure and friction on the bent joint when wearing shoes, leading to irritation, corns, and calluses. The abnormal joint position can also cause inflammation within the joint itself (capsulitis or synovitis). If the toe tip is forced downwards, it can also cause pain and calluses on the end of the toe. In some cases, the altered mechanics of the foot due to hammertoes can contribute to pain in the ball of the foot (metatarsalgia).",
      "prevent": "The most effective way to prevent hammertoes is to wear properly fitting shoes. Choose footwear with adequate toe room (both width and depth), low heels, and good arch support. Ensure there is about a half-inch of space between your longest toe and the end of the shoe. Avoid shoes that are too tight or have pointed toes. If you have a predisposition to hammertoes (e.g., family history, long second toe), be particularly mindful of your footwear choices. Performing foot exercises that stretch and strengthen the toe muscles may also be beneficial. Addressing conditions like bunions promptly may also help prevent secondary hammertoe formation.",
      "schedule": "If hammertoes are causing you discomfort, corns, or difficulty with shoes, it's time to explore your options. The specialists at Mountain Spine & Orthopedics are available for consultations, offering services like a no-cost second opinion and telehealth appointments to help you find the best path toward pain-free, functional toes. Contact us to learn more.",
      "slug": "hammertoes",
      forum: [
        {
           "post": (
            <div className="flex flex-col space-y-[16px]">
              <h1
                style={{
                  fontFamily: "var(--font-reem-kufi)",
                  fontWeight: 500
                }}
                className="text-[#111315] sm:text-4xl text-3xl">
               What Is Hammertoes?
              </h1>
               <h1
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 400
                  }}
                  className="text-[#5B5F67] text-md sm:text-xl"
                >
                  Hammertoes most often affect the second third or fourth toes and can be either flexible or rigid. In the flexible stage you can still straighten the toe with your fingers, although it quickly returns to a bent position when pressure is released. In the semi rigid stage stiffness increases and pain becomes more frequent with activity. In the rigid stage the joint locks in place, corns harden, and shoes become difficult to wear. Although hammertoes can arise in isolation they often occur alongside bunions or arch imbalance which must be addressed simultaneously for lasting relief.
                </h1>
                <div className="flex flex-col space-y-[40px] mt-[40px]">
                  <GradientOverlayImage
                    imageData={'https://mountainspineortho.b-cdn.net/hammertoe3.jpg'} // Placeholder for another diagram/image
                    height="500px"
                    gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
                  />
                  <OutlinedButton text="Do I have this condition?" />
                </div>
            </div>
          )
        },
        {
          post : (
            <div className="flex flex-col space-y-[40px]">
              <h1
                style={{
                  fontFamily: "var(--font-reem-kufi)",
                  fontWeight: 500
                }}
                className="text-[#111315] sm:text-4xl text-3xl">
                Symptoms of Hammertoes
              </h1>
              <h1
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 400
                }}
                className="text-[#5B5F67] text-md sm:text-xl"
              >
                Early signs include a noticeable upward bump at the middle of the toe, redness or irritation on the top of the joint, and soreness that worsens in narrow shoes or high heels. As the condition advances you may feel a sharp burning pain when walking, develop thickened skin at the toe tip, or experience cramps in the ball of the foot as the metatarsal heads bear extra load. Chronic hammertoes can also cause the affected toe to overlap its neighbor, leading to further crowding and friction.
              </h1>
              <OutlinedButton text="Find a Treatment" />
              <GradientOverlayImage
                    imageData={'https://mountainspineortho.b-cdn.net/hammertoe2.jpg'} // Placeholder for another diagram/image
                    height="500px"
                    gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
                />
            </div>
          )
        },
        {
          post : (
            <div className="flex flex-col space-y-[16px]">
              <h1
                style={{
                  fontFamily: "var(--font-reem-kufi)",
                  fontWeight: 500
                }}
                className="text-[#111315] sm:text-4xl text-3xl">
                Stages of Hammertoes Progression 
              </h1>
              <h1
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 400
                }}
                className="text-[#5B5F67] text-md sm:text-xl"
              >
               Stage one involves a flexible deformity with occasional discomfort that improves after removing tight shoes. Stage two brings semi rigid change with daily pain and limited toe motion. Stage three results in a rigid deformity where the joint cannot be straightened by hand and corns or calluses become persistent. Recognizing your stage allows the specialists at Mountain Spine & Orthopedics to match treatment intensity to the exact severity of your condition.
              </h1>
            </div>
          )
        },
        {
          post : (
            <div className="flex flex-col space-y-[16px]">
              <h1
                style={{
                  fontFamily: "var(--font-reem-kufi)",
                  fontWeight: 500
                }}
                className="text-[#111315] sm:text-4xl text-3xl">
                Learn About Hammertoes Treatments
              </h1>
              <h1
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 400
                }}
                className="text-[#5B5F67] text-md sm:text-xl"
              >
                Conservative management aims to reduce pressure and restore tendon balance. Wider toe box shoes with soft uppers prevent rubbing while custom orthotic inserts offload the ball of the foot. Toe spacers and prefabricated hammer toe pads cushion prominent joints and night splints gently stretch the flexor tendons during sleep. Physical therapy focuses on towel scrunches marble pickups and resistance band exercises to strengthen the small muscles that stabilize the toes. When discomfort persists or the toe becomes rigid surgical correction offers a reliable solution. <br/><br/> Our surgeons perform minimally invasive procedures such as flexor to extensor tendon transfer or small joint resection to realign the toe, remove painful corns in the same sitting, and secure the toe with low profile implants that allow early protected weight bearing. Postoperative care includes protective footwear for two to four weeks followed by progressive range of motion and strengthening supervised by our onsite rehabilitation team. Most patients resume regular shoes and low impact activities within six to eight weeks.
              </h1>
            </div>
          )
        },
        {
          post : (
            <div className="flex flex-col space-y-[16px]">
            <h1
              style={{
                fontFamily: "var(--font-reem-kufi)",
                fontWeight: 500
              }}
              className="text-[#111315] sm:text-4xl text-3xl">
              Schedule a Consultation Today            
            </h1>
            <h1
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 400
              }}
              className="text-[#5B5F67] text-md sm:text-xl"
            >
             Do not let painful hammertoes dictate your footwear choices or limit your mobility. Early expert evaluation can stop the deformity from worsening and restore natural toe alignment<br/><br/> Contact Mountain Spine & Care today at (855) 853-6542 or complete our simple online consultation form.<br/><br/> Our dedicated foot and ankle team will confirm your diagnosis, explain every treatment option, and create a personalized plan that straightens your toes, relieves pressure, and lets you walk in comfort and confidence once again.
            </h1>
          </div>
          )
        }
      ],
      side_img : 'https://mountainspineortho.b-cdn.net/Orthopedic%20Website%20(7).png'
    },
    {
      "title": "Diabetic Foot Ulcers",
      "tag": "Foot",
      "card_img": "https://mountainspineortho.b-cdn.net/Orthopedic%20Website%20(15).jpg",
      "inTxt_img": "https://mountainspineortho.b-cdn.net/Orthopedic%20Website%20(15).jpg",
      "body": "Diabetic ulcers are open sores that usually develop on the bottom of the foot or around the toes in people with diabetes. Elevated blood sugar damages small blood vessels and nerves, reducing sensation and slowing circulation so even a small cut or blister can evolve into a deep nonhealing wound. Left untreated these ulcers invite serious infection and raise the risk of amputation.<br/>At Mountain Spine & Orthopedics our multidisciplinary wound care team combines advanced diagnostics with evidence based therapies to close ulcers quickly, prevent complications, and protect overall limb health.",
      "detail": "A healthy foot relies on prompt blood flow and intact sensation to heal minor injuries. Diabetes compromises both. Peripheral neuropathy dulls pain perception so patients may not notice pressure points or sharp objects inside a shoe, while peripheral arterial disease limits oxygen delivery to tissues. The result is a breakdown of skin that deepens into subcutaneous fat, muscle, and even bone.<br/>At Mountain Spine & Orthopedics we start every evaluation with a thorough vascular assessment that includes ankle brachial index testing and Doppler ultrasound to measure blood supply, followed by high resolution imaging such as MRI when bone infection is suspected. We also perform in office foot pressure mapping to identify areas of excess load that must be offloaded for reliable healing.",
      "what_sym": "Early signs of a potential diabetic foot ulcer can include: unusual swelling, irritation, redness, warmth, or odors from one or both feet. Drainage or pus from a sore on the foot, which may stain socks or shoes, is a clear indication of an ulcer. The ulcer itself may appear as a crater-like lesion, sometimes surrounded by callused skin. Pain may not be present due to nerve damage, which is why visual inspection is critical. In advanced cases, black tissue (eschar or gangrene) may form around the ulcer, indicating tissue death due to lack of blood flow. Systemic signs of infection like fever or chills can occur if the ulcer becomes severely infected.",
      "risk_fac": "Major risk factors for diabetic foot ulcers include: poorly controlled blood sugar levels, a history of previous foot ulcers, peripheral neuropathy, peripheral artery disease, foot deformities, improper footwear, impaired vision (making foot inspection difficult), kidney disease (common in diabetics), and smoking (which further impairs circulation). The longer a person has diabetes, the higher their risk. Calluses or corns, if not properly managed, can also break down and form ulcers.",
      "diagnose": "Diagnosis of a diabetic foot ulcer involves a thorough examination of the foot by a healthcare provider. The provider will assess the ulcer's size, depth, location, and appearance, looking for signs of infection (redness, warmth, swelling, pus, odor) and checking for neuropathy (using a monofilament test) and vascular status (checking pulses, skin temperature, and capillary refill time). A probe may be used to determine the depth of the ulcer and whether it extends to bone. A wound culture might be taken if infection is suspected. X-rays, MRI, or bone scans may be ordered to check for bone infection (osteomyelitis) or foreign bodies.",
      "treatment": "Treatment for diabetic foot ulcers is multifaceted and aims to promote healing, prevent infection, and reduce pressure on the affected area. Key components include: 'off-loading' (reducing pressure on the ulcer with special footwear, casts, braces, or crutches), debridement (removal of dead or infected tissue from the ulcer), application of appropriate wound dressings and topical medications to promote a moist healing environment and control infection, and management of any infection with antibiotics (oral or intravenous). Blood sugar control is essential for healing. In cases of severe PAD, procedures to restore blood flow (angioplasty or bypass surgery) may be necessary. Advanced therapies like hyperbaric oxygen therapy or bioengineered skin substitutes may be used for non-healing ulcers. Amputation may be required as a last resort for severe, non-healing, or life-threatening infections.",
      "pain_info": "A significant concern with diabetic foot ulcers is that they are often painless due to diabetic neuropathy, which deadens nerve sensation in the feet. This lack of pain means that an ulcer can develop and worsen without the individual being aware of it. If pain is present, it might indicate a deep infection, significant inflammation, or ischemia (lack of blood flow). Any new pain in the foot of a person with diabetes should be evaluated promptly.",
      "prevent": "Prevention is paramount for diabetic foot ulcers. Key preventive measures include: daily foot inspection (checking for cuts, blisters, redness, swelling, or nail problems), practicing good foot hygiene (washing feet daily with lukewarm water and mild soap, drying thoroughly, especially between the toes), moisturizing feet (but not between toes) to prevent cracking, wearing properly fitting, comfortable shoes and socks (avoiding tight shoes or going barefoot), and regular professional foot exams by a podiatrist or healthcare provider. Proper toenail care (cutting straight across) is important. Managing blood sugar levels effectively, maintaining a healthy lifestyle, and quitting smoking are also crucial. Any foot injury, no matter how minor, should be attended to promptly.",
      "schedule": "For individuals with diabetes, any foot wound or unusual change requires immediate professional attention. Mountain Spine & Orthopedics offers specialized diabetic foot care. Please contact us without delay to arrange an evaluation. We provide support through services like complimentary MRI reviews if indicated, free second opinions, telehealth consultations, and door-to-door transportation to ensure you receive timely and comprehensive care.",
      "slug": "diabetic-foot-ulcers",
      forum: [
        {
           "post": (
            <div className="flex flex-col space-y-[16px]">
              <h1
                style={{
                  fontFamily: "var(--font-reem-kufi)",
                  fontWeight: 500
                }}
                className="text-[#111315] sm:text-4xl text-3xl">
               What Is Diabetic Ulcers?
              </h1>
               <h1
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 400
                  }}
                  className="text-[#5B5F67] text-md sm:text-xl"
                >
                  Diabetic ulcers are classified as chronic full thickness wounds that penetrate through the dermis. Most appear beneath the metatarsal heads or at the heel where body weight concentrates, but any area exposed to friction or trauma can break down. The ulcers are staged according to depth and tissue involvement. A superficial Grade One ulcer involves only skin, whereas a Grade Four ulcer exposes bone or joint and may already harbor osteomyelitis. Recognizing the exact grade guides both local wound care and systemic treatment decisions.
                </h1>
                <div className="flex flex-col space-y-[40px] mt-[40px]">
                  <GradientOverlayImage
                    imageData={'https://mountainspineortho.b-cdn.net/ulcer1.jpg'} 
                    height="500px"
                    gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
                  />
                  <OutlinedButton text="Do I have this condition?" />
                </div>
            </div>
          )
        },
        {
          "post" : (
            <div className="flex flex-col space-y-[40px]">
              <h1
                style={{
                  fontFamily: "var(--font-reem-kufi)",
                  fontWeight: 500
                }}
                className="text-[#111315] sm:text-4xl text-3xl">
                Symptoms of Diabetic Ulcers
              </h1>
              <h1
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 400
                }}
                className="text-[#5B5F67] text-md sm:text-xl"
              >
                Early signs include a persistent redness or callus that feels slightly moist, a foul odor from bacterial colonization, or drainage spotted inside socks. As the ulcer deepens patients may notice swelling, warmth, or blackened tissue called eschar along the edges. Fever, chills, and increasing pain signal spreading infection that demands urgent medical attention. Any nonhealing foot sore lasting longer than two weeks warrants evaluation by a specialist.
              </h1>
              <OutlinedButton text="Find a Treatment" />
              <GradientOverlayImage
                    imageData={'https://mountainspineortho.b-cdn.net/ulcer3.png'} // Placeholder for another diagram/image
                    height="500px"
                    gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
                />
            </div>
          )
        },
        {
          "post" : (
            <div className="flex flex-col space-y-[16px]">
              <h1
                style={{
                  fontFamily: "var(--font-reem-kufi)",
                  fontWeight: 500
                }}
                className="text-[#111315] sm:text-4xl text-3xl">
                Stages of Diabetic Ulcers Progression 
              </h1>
              <h1
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 400
                }}
                className="text-[#5B5F67] text-md sm:text-xl"
              >
                Stage one involves a flexible deformity with occasional discomfort that improves after removing tight shoes. Stage two brings semi rigid change with daily pain and limited toe motion. Stage three results in a rigid deformity where the joint cannot be straightened by hand and corns or calluses become persistent. Recognizing your stage allows the specialists at Mountain Spine & Orthopedics to match treatment intensity to the exact severity of your condition.
              </h1>
            </div>
          )
        },
        {
          "post" : (
            <div className="flex flex-col space-y-[16px]">
              <h1
                style={{
                  fontFamily: "var(--font-reem-kufi)",
                  fontWeight: 500
                }}
                className="text-[#111315] sm:text-4xl text-3xl">
                Learn About Diabetic Ulcers Treatments
              </h1>
              <h1
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 400
                }}
                className="text-[#5B5F67] text-md sm:text-xl"
              >
                Comprehensive care begins with aggressive offloading using total contact casts, removable walkers, or custom orthotics that redirect pressure away from the ulcer bed. Debridement removes devitalized tissue and biofilm, creating a clean base for healing. We apply advanced dressings impregnated with silver or iodine to control bacterial load and maintain optimal moisture balance. Negative pressure wound therapy draws edges together and stimulates granulation, while biologic skin substitutes and growth factor gels accelerate closure in stubborn wounds. When poor circulation impedes healing our vascular partners perform minimally invasive angioplasty or bypass to restore blood flow.<br/><br/>For confirmed osteomyelitis we combine targeted antibiotics with surgical excision of infected bone if necessary. Throughout recovery our diabetes educators fine tune blood sugar control because tight glycemic management speeds tissue repair and reduces recurrence.
              </h1>
            </div>
          )
        },
        {
          "post" : (
            <div className="flex flex-col space-y-[16px]">
            <h1
              style={{
                fontFamily: "var(--font-reem-kufi)",
                fontWeight: 500
              }}
              className="text-[#111315] sm:text-4xl text-3xl">
              Schedule a Consultation Today            
            </h1>
            <h1
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 400
              }}
              className="text-[#5B5F67] text-md sm:text-xl"
            >
             A diabetic foot ulcer should never be ignored. Prompt specialized care prevents infection, shortens healing time, and safeguards mobility.<br/><br/> Contact Mountain Spine & Care today at (855) 853-6542 or complete our simple online consultation form.<br/><br/>Our dedicated wound care experts will evaluate your ulcer, design a personalized treatment plan, and guide you toward rapid healing and lasting limb preservation.
            </h1>
          </div>
          )
        }
      ],
      side_img : 'https://mountainspineortho.b-cdn.net/Orthopedic%20Website%20(8).png'
    },

    {
      "title": "Ankle Replacement",
      "tag": "Foot",
      "card_img": "https://mountainspineortho.b-cdn.net/Orthopedic%20Website%20(16).jpg",
      "inTxt_img": "https://mountainspineortho.b-cdn.net/Orthopedic%20Website%20(16).jpg",
      "body": "Ankle replacement sometimes called total ankle arthroplasty is an advanced procedure that removes damaged bone and cartilage in the ankle joint and restores function with a precision engineered prosthesis. Severe ankle arthritis can make every step painful and limit the activities you enjoy. By resurfacing the joint surfaces and inserting a streamlined metal and medical grade plastic implant this surgery relieves pain preserves motion and helps you walk more naturally than older methods that fused the joint.<br/>At Mountain Spine & Orthopedics our fellowship trained foot and ankle specialists use cutting edge imaging and computer guided alignment tools to personalize each ankle replacement and deliver lasting comfort and mobility.",
      "detail": "The ankle joint carries forces up to five times body weight during walking and even higher during running or jumping. Over years previous injuries inflammatory disease or degenerative wear can erode the protective cartilage lining the tibia and talus leading to bone on bone grinding swelling and stiffness. When non surgical treatments such as medication bracing and targeted physical therapy can no longer control symptoms ankle replacement becomes the most effective solution.<br/>Before surgery our team obtains high resolution weight bearing CT scans that reveal the exact shape of your joint and any subtle deformities. We then design a three dimensional plan that guides implant positioning within fractions of a millimeter ensuring proper alignment and longevity.",    
      "what_sym": "Symptoms indicating the need for an ankle replacement often develop gradually and worsen over time. These may include: severe and persistent ankle pain, especially during weight-bearing activities like walking or standing; significant ankle stiffness and reduced range of motion, making it difficult to flex or point the foot; chronic swelling and tenderness around the ankle joint; a grinding or catching sensation within the joint during movement; difficulty with daily activities such as climbing stairs, walking on uneven surfaces, or participating in recreational pursuits. Pain may also be present at rest or disrupt sleep in advanced cases. These symptoms typically persist despite conservative treatments like pain medication, anti-inflammatory drugs, bracing, or physical therapy.",
      "risk_fac": "Several factors can increase the risk of developing severe ankle arthritis necessitating an ankle replacement. These include: a history of significant ankle trauma, such as previous ankle fractures or recurrent severe sprains that may have damaged the joint cartilage; osteoarthritis, the 'wear-and-tear' arthritis that degenerates cartilage over time; inflammatory arthritis, like rheumatoid arthritis, psoriatic arthritis, or gout, which can attack and destroy the ankle joint lining and cartilage; avascular necrosis of the talus (the lower bone of the ankle joint), where a loss of blood supply leads to bone collapse and cartilage damage. Other contributing factors can be increasing age, obesity (which places greater stress on the ankle joint), and certain congenital foot or ankle deformities that cause abnormal joint mechanics.",
      "diagnose": "Diagnosing the underlying condition leading to the consideration of ankle replacement involves a comprehensive evaluation by an orthopedic specialist. This typically starts with a detailed medical history, including the onset of symptoms, previous injuries, and any existing medical conditions. A thorough physical examination of the foot and ankle will assess range of motion, stability, areas of tenderness, gait abnormalities, and overall alignment. Imaging studies are crucial: weight-bearing X-rays are usually the first step to visualize the extent of joint space narrowing, bone spurs, and any deformities. Advanced imaging, such as CT scans, provides detailed information about the bone structure and is often used for pre-operative planning, as mentioned. MRI scans may be employed to evaluate the condition of soft tissues, including cartilage integrity, ligaments, tendons, and to detect conditions like avascular necrosis. In some cases, diagnostic injections of local anesthetic into the ankle joint can help confirm it as the primary source of pain.",
      "treatment": "Ankle replacement surgery is a surgical procedure that replaces the damaged ankle joint with an artificial one. This procedure is typically performed when the ankle joint is severely damaged or arthritic, and other treatments have not been successful. The artificial joint is made of metal and plastic and is designed to mimic the natural movement of the ankle joint. At Mountain Spine & Orthopedics we perform ankle replacement surgery using the latest techniques and technologies to ensure the best possible outcome for our patients.",
      "pain_info": "The pain experienced by individuals requiring ankle replacement is typically chronic, debilitating, and primarily due to arthritic changes in the joint, where protective cartilage has worn away leading to bone-on-bone contact. This pain often manifests as a deep ache or sharp pain within the ankle, significantly worsened by activities like walking, standing, or climbing stairs. It can limit mobility and daily functioning, and in severe cases, pain may persist even at rest or disrupt sleep. The primary goal of ankle replacement surgery is to significantly reduce or eliminate this chronic arthritic pain by replacing the damaged joint surfaces with an artificial implant, thereby restoring smoother, pain-free motion to the ankle.",
      "prevent": "While it's not always possible to prevent the conditions that lead to needing an ankle replacement, such as arthritis stemming from autoimmune diseases, certain measures can help reduce the risk or slow the progression of ankle joint damage. These include: prompt and appropriate medical attention for ankle injuries like fractures or severe sprains to ensure optimal healing and joint stability; maintaining a healthy body weight to minimize stress on the ankle joints; wearing supportive, well-fitting footwear suitable for your activities; engaging in regular, low-impact exercises (e.g., swimming, cycling) to maintain joint mobility and muscle strength without overburdening the joint; avoiding repetitive high-impact activities if you have a pre-existing ankle condition or are at higher risk. For those with inflammatory conditions like rheumatoid arthritis, diligent management of the underlying disease with medical guidance is crucial to protect joint health.",
      "schedule": "For individuals with diabetes, any foot wound or unusual change requires immediate professional attention. Mountain Spine & Orthopedics offers specialized diabetic foot care. Please contact us without delay to arrange an evaluation. We provide support through services like complimentary MRI reviews if indicated, free second opinions, telehealth consultations, and door-to-door transportation to ensure you receive timely and comprehensive care.",
      "slug": "ankle-replacement",
      forum: [
        {
           "post": (
            <div className="flex flex-col space-y-[16px]">
              <h1
                style={{
                  fontFamily: "var(--font-reem-kufi)",
                  fontWeight: 500
                }}
                className="text-[#111315] sm:text-4xl text-3xl">
               What Is Ankle Replacement?
              </h1>
               <h1
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 400
                  }}
                  className="text-[#5B5F67] text-md sm:text-xl"
                >
                  Ankle replacement involves two main steps. First the surgeon removes the diseased joint surfaces and any osteophytes or bone spurs. Second custom cutting guides prepare precise flat surfaces on the tibia and talus to accept the implant. The new joint consists of a cobalt chrome tibial component a titanium talar component and a durable polyethylene insert that glides smoothly between them. Unlike ankle fusion which eliminates motion ankle replacement preserves up and down movement allowing more natural gait and reducing stress on nearby joints such as the knee and hip.
                </h1>
                <div className="flex flex-col space-y-[40px] mt-[40px]">
                  <GradientOverlayImage
                    imageData={'https://mountainspineortho.b-cdn.net/ankleant6.jpg'} 
                    height="500px"
                    gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
                  />
                  <OutlinedButton text="Do I need this surgery?" />
                </div>
            </div>
          )
        },
        {
          "post" : (
            <div className="flex flex-col space-y-[40px]">
              <h1
                style={{
                  fontFamily: "var(--font-reem-kufi)",
                  fontWeight: 500
                }}
                className="text-[#111315] sm:text-4xl text-3xl">
               Ankle Replacement Candidates
              </h1>
              <h1
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 400
                }}
                className="text-[#5B5F67] text-md sm:text-xl"
              >
                Candidates for ankle replacement usually experience constant deep ankle pain that interferes with walking work and sleep. Swelling and stiffness limit range of motion and the joint may give way on uneven ground. Imaging shows advanced arthritis with narrow joint space cystic bone changes and large spurs. When daily activities require frequent pain medication or when bracing and injections no longer provide relief our specialists may recommend ankle replacement as the best path to restore quality of life.
              </h1>
              <OutlinedButton text="Find a Treatment" />
              <GradientOverlayImage
                    imageData={'https://mountainspineortho.b-cdn.net/anklereplace1.jpg'} // Placeholder for another diagram/image
                    height="500px"
                    gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
                />
            </div>
          )
        },
        {
          "post" : (
            <div className="flex flex-col space-y-[16px]">
              <h1
                style={{
                  fontFamily: "var(--font-reem-kufi)",
                  fontWeight: 500
                }}
                className="text-[#111315] sm:text-4xl text-3xl">
                Ankle Replacement Recovery Progress
              </h1>
              <h1
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 400
                }}
                className="text-[#5B5F67] text-md sm:text-xl"
              >
                Ankle arthritis begins with intermittent soreness after vigorous activity then progresses to daily pain morning stiffness and episodic swelling. As cartilage erodes the joint space narrows and spurs form leading to visible deformity and limited motion. In the final stage bone on bone contact causes grinding and sharp pain with every step. During evaluation we assess the integrity of surrounding ligaments alignment of the foot and prior surgeries to confirm that ankle replacement will offer predictable pain relief and durable function.
              </h1>
            </div>
          )
        },
        {
          "post" : (
            <div className="flex flex-col space-y-[16px]">
              <h1
                style={{
                  fontFamily: "var(--font-reem-kufi)",
                  fontWeight: 500
                }}
                className="text-[#111315] sm:text-4xl text-3xl">
                Learn About Ankle Replacement Treatments
              </h1>
              <h1
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 400
                }}
                className="text-[#5B5F67] text-md sm:text-xl"
              >
                The procedure is performed under regional or general anesthesia and usually requires a hospital stay of one night. A well padded splint protects the ankle for the first two weeks while the incision heals. Most patients begin gentle non weight bearing range of motion exercises within days followed by progressive partial weight bearing in a removable boot. By the sixth week supervised physical therapy focuses on rebuilding strength balance and gait mechanics.<br/><br/>During months three to six many people return to low impact sports such as cycling golf and swimming while long distance running and high impact court activities are discouraged to prolong implant life. Our modern implants have shown excellent ten year survival and ongoing studies demonstrate continued success beyond fifteen years.
              </h1>
            </div>
          )
        },
        {
          "post" : (
            <div className="flex flex-col space-y-[16px]">
            <h1
              style={{
                fontFamily: "var(--font-reem-kufi)",
                fontWeight: 500
              }}
              className="text-[#111315] sm:text-4xl text-3xl">
              Schedule a Consultation Today            
            </h1>
            <h1
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 400
              }}
              className="text-[#5B5F67] text-md sm:text-xl"
            >
            Persistent ankle pain and stiffness do not have to dictate your pace of life. Early expert evaluation can determine whether total ankle replacement is the right solution for you. <br/><br/> Contact Mountain Spine & Care today at (855) 853-6542 or complete our simple online consultation form.<br/><br/>Our experienced foot and ankle team will review your imaging explain every treatment option and design a personalized surgical and rehabilitation plan that restores comfort supports mobility and helps you step forward with confidence.
            </h1>
          </div>
          )
        }
      ],
      side_img : 'https://mountainspineortho.b-cdn.net/Orthopedic%20Website%20(13).jpg'
    },
  ]