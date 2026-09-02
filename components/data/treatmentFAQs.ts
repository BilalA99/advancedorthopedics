export interface FAQItem {
  question: string;
  answer: string;
}

export const treatmentFAQs: Record<string, FAQItem[]> = {
  // 1. Revision Spinal Surgery
  "revision-spinal-surgery": [
    {
      question: "What determines whether revision spinal surgery works?",
      answer: "The single biggest factor is whether the original diagnosis was right and the failure mode is clearly identified — a revision for a confirmed pseudoarthrosis behaves very differently from one for unexplained persistent pain. Results are generally less predictable than primary surgery because scar tissue and altered anatomy make the dissection harder, and modern techniques like computer-navigated placement of <strong>pedicle screws</strong> have significantly improved outcomes for correcting <strong>pseudoarthrosis</strong> (failed fusion) and adjacent segment disease."
    },
    {
      question: "Is revision spine surgery more painful than the first?",
      answer: "Yes, <strong>revision spine surgery</strong> is often more painful initially than the first procedure because it involves working through scar tissue and often requires more extensive reconstruction. However, specialized <strong>pain management protocols</strong> are used to ensure patient comfort, and the long-term relief from nerve compression typically outweighs the surgical recovery period."
    },
    {
      question: "How long is the recovery for revision spinal surgery?",
      answer: "Recovery is typically longer than the initial surgery, often requiring <strong>3 to 5 days in the hospital</strong> and <strong>3 to 6 months</strong> for bone fusion to solidify. Patients may need to wear a back brace for support during the first 6 to 12 weeks while avoiding bending, lifting, and twisting."
    },
    {
      question: "What are the risks of revision spine surgery?",
      answer: "Risks include a higher rate of infection, dural tears (spinal fluid leak), and nerve injury compared to primary surgery. Utilizing a specialized <strong>orthopedic spine surgeon</strong> who uses intraoperative neuromonitoring drastically reduces these risks."
    },
    {
      question: "What is pseudarthrosis after spinal fusion?",
      answer: "<strong>Pseudarthrosis</strong> is a failed fusion or nonunion where the intended bone bridge never becomes solid. It can create painful micromotion, clicking, loose hardware, or persistent nerve symptoms after surgery."
    },
    {
      question: "How is failed spinal fusion treated?",
      answer: "A confirmed failed fusion may require <strong>revision spinal surgery</strong> to remove or revise hardware, clear fibrous nonunion tissue, add new bone graft or biologics when appropriate, and create a more stable fusion environment."
    }
  ],

  // 2. Multilevel Degenerative Disc Disease Surgery
  "multilevel-degenerative-disc-disease-surgery": [
    {
      question: "Can surgery fix multilevel degenerative disc disease?",
      answer: "Yes, surgery is effective for <strong>multilevel degenerative disc disease</strong> when conservative care fails. Options include <strong>multilevel spinal fusion</strong> to stabilize the spine or <strong>hybrid surgery</strong> (combining fusion and disc replacement) to preserve motion while correcting instability across multiple spinal segments."
    },
    {
      question: "How long is the recovery for 3-level spinal fusion?",
      answer: "Recovery from a <strong>3-level spinal fusion</strong> is a major process, typically requiring <strong>6 to 12 months</strong> for complete bone healing. Patients usually walk the day after surgery but must strictly limit physical activity for the first 3 months to ensure the grafts fuse properly."
    },
    {
      question: "Does multilevel fusion limit mobility?",
      answer: "Yes, fusing multiple levels of the spine will reduce flexibility in that specific region. However, most patients find that the elimination of debilitating pain allows for better overall functional mobility than they had prior to surgery."
    },
    {
      question: "Is multilevel disc replacement an option?",
      answer: "For qualified patients with healthy facet joints, <strong>multilevel artificial disc replacement</strong> (up to 2 levels) can be performed to maintain neck or back motion. This reduces the risk of adjacent segment disease compared to long fusion constructs."
    }
  ],

  // 3. Anterior Lumbar Corpectomy and Fusion
  "anterior-lumbar-corpectomy-and-fusion": [
    {
      question: "What happens during an Anterior Lumbar Corpectomy?",
      answer: "During an <strong>Anterior Lumbar Corpectomy</strong>, the surgeon removes the entire vertebral body and the adjacent discs to decompress the spinal cord. A <strong>vertebral body replacement (VBR) cage</strong> filled with bone graft is inserted to reconstruct the spine and promote <strong>spinal fusion</strong>."
    },
    {
      question: "Is a corpectomy a major surgery?",
      answer: "Yes, a <strong>corpectomy</strong> is a major, complex spinal surgery used for severe trauma, tumors, or infection. Despite its complexity, the anterior approach (from the front) allows for direct decompression of the nerves without moving the sensitive spinal cord."
    },
    {
      question: "What is the recovery time for a lumbar corpectomy?",
      answer: "Patients typically remain in the hospital for <strong>3 to 5 days</strong>. A custom back brace is worn for <strong>6 to 12 weeks</strong>, and full recovery with solid bone fusion generally takes <strong>6 to 12 months</strong> depending on the patient's bone quality."
    },
    {
      question: "Can you walk after corpectomy surgery?",
      answer: "Yes, patients are encouraged to walk as soon as possible, often the day after surgery, to prevent blood clots and pneumonia. Walking is the primary form of exercise during the initial 6-week recovery phase."
    }
  ],

  // 4. Anterior Lumbar Interbody Fusion
  "anterior-lumbar-interbody-fusion": [
    {
      question: "What are the benefits of ALIF over posterior fusion?",
      answer: "<strong>ALIF (Anterior Lumbar Interbody Fusion)</strong> allows for the placement of a larger interbody cage, which provides better correction of spinal alignment (lordosis) and a larger surface area for fusion. It also avoids cutting through the large back muscles, leading to less post-operative pain."
    },
    {
      question: "Does ALIF surgery require a vascular surgeon?",
      answer: "Yes, an <strong>access surgeon</strong> (vascular surgeon) typically assists during <strong>ALIF surgery</strong> to safely move the major blood vessels (aorta and vena cava) aside, ensuring clear access to the front of the spine."
    },
    {
      question: "How long does it take to recover from ALIF surgery?",
      answer: "Most patients go home within <strong>1 to 2 days</strong>. While bone fusion takes months, many patients return to light desk work in <strong>2 to 4 weeks</strong> and more active pursuits by <strong>3 months</strong>."
    },
    {
      question: "What are the permanent restrictions after ALIF?",
      answer: "Once the fusion is solid (usually after 1 year), there are rarely permanent restrictions. However, patients are often advised to use proper lifting mechanics and avoid extreme heavy loading of the spine to protect adjacent levels."
    }
  ],

  // 5. Hybrid Lumbar Spine Surgery
  "hybrid-lumbar-spine-surgery": [
    {
      question: "What is hybrid lumbar spine surgery?",
      answer: "<strong>Hybrid lumbar spine surgery</strong> combines two techniques: <strong>artificial disc replacement</strong> at one level (to preserve motion) and <strong>spinal fusion</strong> at an adjacent level (to stabilize severe degeneration). This offers a balanced approach for multilevel disease."
    },
    {
      question: "Who is a candidate for hybrid spine surgery?",
      answer: "Ideal candidates have disease at multiple levels where one level is too degenerated for replacement (requiring fusion) but the adjacent level is healthy enough for an artificial disc. This minimizes the stiffness associated with multi-level fusion."
    },
    {
      question: "Is hybrid surgery recovery faster than fusion?",
      answer: "Recovery is generally similar to fusion because bone healing is still required at the fused level. However, patients often report better long-term function and flexibility compared to an all-fusion approach."
    },
    {
      question: "What are the risks of hybrid spine surgery?",
      answer: "Risks are similar to standard spine surgery, including infection and implant migration. There is also a small risk that the artificial disc level may eventually degenerate and require conversion to a fusion."
    }
  ],

  // 6. Lumbar Fusion Surgery
  "lumbar-fusion-surgery": [
    {
      question: "What makes a lumbar fusion more or less likely to work?",
      answer: "Fusion is most predictable when there is <strong>demonstrable instability</strong> — a slip that moves on flexion-extension films, or a clear structural deformity. It is least predictable when the only finding is back pain without instability, because then the pain generator has not actually been identified. Bone quality and nicotine use also matter: both affect whether the fusion heals at all."
    },
    {
      question: "How long does back pain last after fusion surgery?",
      answer: "Acute surgical pain diminishes significantly within <strong>2 to 4 weeks</strong>. However, patients may experience intermittent muscular soreness for <strong>3 to 6 months</strong> as they rehabilitate and the fusion solidifies."
    },
    {
      question: "Can screws come loose after lumbar fusion?",
      answer: "Yes, screw loosening can occur if the bone fails to fuse (<strong>pseudoarthrosis</strong>). This risk is higher in smokers and patients with osteoporosis. Following post-op restrictions and using bone growth stimulators helps prevent this."
    },
    {
      question: "When can I drive after lumbar fusion?",
      answer: "Most patients can return to driving <strong>2 to 4 weeks</strong> after surgery, provided they are off narcotic pain medication and can safely operate the vehicle without severe pain."
    }
  ],

  // 7. Spinal Fusion
  "spinal-fusion": [
    {
      question: "What are the permanent restrictions after spinal fusion?",
      answer: "For a single-level fusion, there are few <strong>permanent restrictions</strong>. For multi-level fusions, doctors typically advise avoiding <strong>heavy deadlifts</strong>, high-impact contact sports, and extreme spinal twisting to prevent adjacent segment disease."
    },
    {
      question: "How serious is spinal fusion surgery?",
      answer: "<strong>Spinal fusion</strong> is a major orthopedic procedure. While safe and common, it involves a recovery period of several months. It is reserved for cases where instability, deformity, or severe nerve compression cannot be treated non-surgically."
    },
    {
      question: "Does spinal fusion stop you from bending?",
      answer: "A single-level fusion limits motion only at that specific segment, which is barely noticeable. Even with multi-level fusions, patients can still bend at the hips (hip-hinge) to pick things up, maintaining good functional mobility."
    },
    {
      question: "What is the 'dark side' of spinal fusion?",
      answer: "The 'dark side' refers to <strong>Adjacent Segment Disease</strong>, where the discs above and below the fusion wear out faster due to increased stress. This can occur years later, potentially requiring additional surgery. Minimally invasive techniques aim to reduce this risk."
    },
    {
      question: "What is AxiaLIF or axial lumbar interbody fusion?",
      answer: "<strong>AxiaLIF</strong> is a specialized L5-S1 fusion approach that reaches the disc space through a small presacral corridor near the tailbone. It is considered only for selected lumbosacral anatomy and is part of the broader spinal fusion decision."
    }
  ],

  // 8. Understanding TLIF Surgery
  "understanding-tlif-surgery": [
    {
      question: "What does TLIF stand for in spine surgery?",
      answer: "<strong>TLIF</strong> stands for <strong>Transforaminal Lumbar Interbody Fusion</strong>. It is a technique where the surgeon accesses the disc space from the back (posterior) but comes in from the side, minimizing the need to retract the spinal nerves."
    },
    {
      question: "Is TLIF surgery minimally invasive?",
      answer: "Yes, <strong>MIS-TLIF (Minimally Invasive TLIF)</strong> uses tubular retractors and small incisions. This results in less blood loss, less muscle damage, and a shorter hospital stay (often 1-2 days) compared to open surgery."
    },
    {
      question: "How long does it take for a TLIF cage to fuse?",
      answer: "While the titanium or PEEK cage provides immediate stability, the actual <strong>bone fusion</strong> takes <strong>6 to 12 months</strong> to fully mature. X-rays at follow-up appointments will track this progress."
    },
    {
      question: "Is TLIF safer than PLIF?",
      answer: "Generally, <strong>TLIF</strong> is considered safer for the nerves than PLIF (Posterior Lumbar Interbody Fusion) because it requires less retraction of the thecal sac to place the cage, reducing the risk of nerve injury."
    }
  ],

  // 9. Posterior Cervical Fusion With Instrumentation
  "posterior-cervical-fusion-with-instrumentation-surgery": [
    {
      question: "Why is instrumentation used in cervical fusion?",
      answer: "<strong>Instrumentation</strong> (screws and rods) acts as an internal brace, holding the cervical spine rigidly in place immediately after surgery. This holds the graft under steady compression while it heals, which is what allows bone to bridge across the segment rather than moving under load."
    },
    {
      question: "How long do I wear a collar after posterior cervical fusion?",
      answer: "Patients typically wear a rigid cervical collar for <strong>6 to 12 weeks</strong> after posterior fusion. This prevents neck motion and supports the heavy head while the posterior muscles heal."
    },
    {
      question: "Is posterior cervical fusion more painful than anterior?",
      answer: "Yes, <strong>posterior cervical fusion</strong> is generally more painful than anterior (ACDF) surgery because it involves dissecting the thick muscles at the back of the neck. Muscle spasms are common but managed with medication and therapy."
    },
    {
      question: "Can the hardware be removed later?",
      answer: "Hardware is rarely removed unless it causes irritation, infection, or breaks. In most cases, the titanium screws and rods remain in the body permanently without issues."
    }
  ],

  // 10. Posterior Cervical Fusion Surgery
  "posterior-cervical-fusion-surgery": [
    {
      question: "When is posterior cervical fusion recommended?",
      answer: "It is recommended for conditions that cannot be treated from the front, such as multilevel <strong>cervical stenosis</strong>, ossification of the posterior longitudinal ligament (OPLL), or to repair a <strong>pseudarthrosis</strong> (failed fusion) from a previous anterior surgery."
    },
    {
      question: "What is the recovery time for posterior cervical fusion?",
      answer: "Full recovery takes <strong>6 to 12 months</strong>. Patients usually return to desk work in 4-6 weeks but must avoid heavy lifting or overhead work for at least 3 months."
    },
    {
      question: "Does this surgery correct neck deformity?",
      answer: "Yes, <strong>posterior cervical fusion</strong> is excellent for correcting <strong>cervical kyphosis</strong> (forward hunching of the neck) and restoring proper alignment to relieve strain on the spinal cord."
    },
    {
      question: "What are the risks?",
      answer: "Risks include C5 nerve palsy (temporary shoulder weakness), infection, and wound healing issues. Smoking significantly increases the risk of complications and non-union."
    }
  ],

  // 11. Anterior Cervical Corpectomy and Fusion
  "anterior-cervical-corpectomy-and-fusion": [
    {
      question: "What is the difference between ACDF and ACCF?",
      answer: "ACDF removes just the disc, while <strong>ACCF (Anterior Cervical Corpectomy and Fusion)</strong> removes the disc and the vertebral bone. ACCF is used when spinal cord compression extends behind the bone itself."
    },
    {
      question: "Is cervical corpectomy dangerous?",
      answer: "While it is a higher-risk procedure than ACDF due to the extent of bone removal, it is highly effective for preventing paralysis in patients with severe <strong>cervical myelopathy</strong>. Intraoperative monitoring makes it safer."
    },
    {
      question: "Do I need a plate for corpectomy?",
      answer: "Yes, a metal plate is screwed into the vertebrae above and below the removed bone to hold the graft or cage in place. This provides immediate stability for the <strong>cervical spine</strong>."
    },
    {
      question: "How long is the hospital stay?",
      answer: "The stay is typically <strong>2 to 4 days</strong>. Swallowing difficulty (dysphagia) is a common temporary side effect that is monitored closely before discharge."
    }
  ],

  // 12. ACDF Surgery
  "acdf-surgery": [
    {
      question: "What is the recovery time for ACDF surgery?",
      answer: "Most patients recover from <strong>ACDF surgery</strong> within <strong>4 to 6 weeks</strong> for light activities. Full bone fusion takes 3 to 6 months. Arm pain relief is often immediate, while neck muscle strength returns gradually."
    },
    {
      question: "What are the permanent restrictions after ACDF surgery?",
      answer: "There are typically few <strong>permanent restrictions</strong> once the fusion is solid. Patients are advised to avoid high-impact sports like football to protect the adjacent levels, but can return to gym workouts, running, and swimming."
    },
    {
      question: "How serious is ACDF surgery?",
      answer: "<strong>ACDF</strong> is a common and highly successful spine surgery. While 'major' because it involves the spine, it is often performed as an outpatient procedure with a low complication rate."
    },
    {
      question: "Does ACDF limit neck movement?",
      answer: "A single-level ACDF results in very little loss of motion. Even with 2 or 3 levels fused, patients are often surprised by how much neck mobility they retain because the unfused segments compensate."
    }
  ],

  // 13. Lumbar Disc Replacement Surgery
  "lumbar-disc-replacement-surgery": [
    {
      question: "Am I a candidate for lumbar disc replacement?",
      answer: "Ideal candidates are generally under 60, have <strong>single-level degenerative disc disease</strong>, and have no significant arthritis in the facet joints. It is designed to preserve motion in active patients."
    },
    {
      question: "How long does a lumbar disc replacement last?",
      answer: "Modern artificial discs are tested to last <strong>40+ years</strong>. Unlike hip or knee replacements, they do not bear the full weight of the body in the same way, leading to excellent long-term durability."
    },
    {
      question: "Is disc replacement better than fusion?",
      answer: "For the right patient, <strong>disc replacement</strong> is superior because it preserves spinal motion and reduces the risk of adjacent level degeneration. However, if the joints are arthritic, fusion is the better option."
    },
    {
      question: "What is the recovery time?",
      answer: "Recovery is faster than fusion because there is no bone graft to heal. Patients often return to non-impact activities in <strong>2 to 4 weeks</strong> and full sports in <strong>3 months</strong>."
    }
  ],

  // 14. Artificial Disc Replacement Surgery
  "artificial-disc-replacement-surgery": [
    {
      question: "Does insurance cover artificial disc replacement?",
      answer: "Yes, most major insurance plans and Medicare cover <strong>artificial disc replacement</strong> for the cervical spine (neck). Coverage for lumbar (back) replacement is becoming more common but varies by policy."
    },
    {
      question: "Can an artificial disc slip out?",
      answer: "Implant migration is extremely rare. The artificial disc is anchored into the bone. Over time, the bone grows into the surface of the implant (osseointegration), locking it permanently in place."
    },
    {
      question: "What materials are artificial discs made of?",
      answer: "Most devices use a combination of medical-grade <strong>titanium</strong>, cobalt-chromium alloy, and high-density polyethylene (plastic) to mimic the natural movement and shock absorption of a healthy disc."
    },
    {
      question: "Is it reversible?",
      answer: "While technically reversible, removing an artificial disc is complex. If a replacement fails, it is typically converted to a <strong>spinal fusion</strong> rather than replaced with another device."
    }
  ],

  // 15. Cervical Disc Arthroplasty
  "cervical-disc-arthroplasty": [
    {
      question: "What is the difference between ACDF and arthroplasty?",
      answer: "ACDF fuses the bones together, stopping motion. <strong>Cervical Disc Arthroplasty</strong> replaces the damaged disc with a movable implant, maintaining natural neck motion and reducing stress on other discs."
    },
    {
      question: "Who is eligible for cervical disc arthroplasty?",
      answer: "Patients with 1 or 2 levels of herniated discs causing arm pain (radiculopathy) who do not have severe arthritis, instability, or osteoporosis are excellent candidates."
    },
    {
      question: "How soon can I drive after cervical arthroplasty?",
      answer: "Most patients can drive within <strong>1 to 2 weeks</strong>, once they can turn their head comfortably and are off narcotic pain medication."
    },
    {
      question: "What should I expect from cervical disc replacement?",
      answer: "Relief of arm pain is generally more predictable than relief of neck pain, because compression of a specific nerve root is something imaging can confirm and surgery can directly decompress. The trade-off against fusion is motion preservation at the treated level."
    }
  ],

  // 16. Motion Preservation Spine Surgery
  "motion-preservation-spine-surgery": [
    {
      question: "What types of motion preservation surgery exist?",
      answer: "The main types include <strong>Artificial Disc Replacement</strong>, <strong>Posterior Cervical Laminoplasty</strong> (opening space without fusion), and <strong>Dynamic Stabilization</strong> systems. These preserve natural spine mechanics."
    },
    {
      question: "Why choose motion preservation?",
      answer: "The primary goal is to prevent <strong>Adjacent Segment Disease</strong>. By keeping the treated level moving, stress is not transferred to the discs above and below, preserving the overall health of the spine."
    },
    {
      question: "Is motion preservation surgery safe?",
      answer: "Yes, these are FDA-approved procedures with extensive clinical data supporting their safety and efficacy, particularly for younger patients wishing to maintain an active lifestyle."
    },
    {
      question: "Can I play sports after motion preservation surgery?",
      answer: "Yes, one of the biggest advantages is the ability to return to sports like golf, tennis, and running without the stiffness associated with spinal fusion."
    }
  ],

  // 17. Total Hip Replacement
  "total-hip-replacement": [
    {
      question: "What are the lifetime restrictions after hip replacement?",
      answer: "Modern <strong>hip replacements</strong> have few restrictions. Doctors advise avoiding high-impact running or jumping. Low-impact activities like cycling, swimming, hiking, and golf are highly encouraged."
    },
    {
      question: "How long does a total hip replacement last?",
      answer: "With modern ceramic-on-plastic bearings, <strong>total hip replacements</strong> can last <strong>20 to 30 years</strong>. This longevity makes surgery a viable option even for younger patients with severe arthritis."
    },
    {
      question: "What is the fastest way to recover from hip surgery?",
      answer: "The fastest recovery comes from <strong>early ambulation</strong> (walking the day of surgery) and strictly following rehabilitation exercises. Choosing the <strong>Direct Anterior Approach</strong> often leads to faster early recovery due to muscle preservation."
    },
    {
      question: "Can I sleep on my side after hip replacement?",
      answer: "You typically need to sleep on your back or non-operative side with a pillow between your legs for the first <strong>4 to 6 weeks</strong> to prevent dislocation while the tissues heal."
    }
  ],

  // 18. Total Knee Replacement
  "total-knee-replacement": [
    {
      question: "How painful is total knee replacement recovery?",
      answer: "<strong>Total knee replacement</strong> is known to be painful in the first 2 weeks due to the need for early movement. However, advanced <strong>nerve blocks</strong> and multimodal pain management have significantly reduced acute post-op pain."
    },
    {
      question: "How long until I can walk without a walker?",
      answer: "Most patients transition from a walker to a cane within <strong>2 to 3 weeks</strong> and are walking unassisted by <strong>4 to 6 weeks</strong>. Full strength and balance continue to improve for up to a year."
    },
    {
      question: "Can I kneel after knee replacement?",
      answer: "You *can* kneel, but it may feel uncomfortable or strange due to the lack of sensation in the scar or pressure on the implant. Using a cushioned kneeling pad usually solves this issue."
    },
    {
      question: "What should I expect from the procedure?",
      answer: "Pain relief and improved function for daily activities are the goals of the procedure. How far any individual gets depends on the state of the knee before surgery and on rehabilitation."
    }
  ],

  // 19. Posterior Cervical Laminoplasty
  "posterior-cervical-laminoplasty": [
    {
      question: "What is a laminoplasty?",
      answer: "<strong>Laminoplasty</strong> is a motion-sparing surgery where the lamina (roof of the spine) is hinged open like a door to create more space for the spinal cord, relieving compression without fusing the bones."
    },
    {
      question: "Is laminoplasty better than laminectomy?",
      answer: "For many patients, yes. Unlike laminectomy (which removes bone), <strong>laminoplasty</strong> preserves the bone and natural posterior tension band, reducing the risk of post-surgical instability and deformity."
    },
    {
      question: "What is the recovery time?",
      answer: "Recovery takes <strong>6 to 12 weeks</strong>. Patients wear a soft collar for comfort for a few weeks. Range of motion exercises begin early to maintain the preserved neck flexibility."
    },
    {
      question: "Who is a candidate?",
      answer: "Candidates are patients with <strong>cervical myelopathy</strong> involving 3 or more levels who do not have significant neck pain or kyphosis (forward curvature)."
    }
  ],

  // 20. Posterior Cervical Foraminotomy Surgery
  "posterior-cervical-foraminotomy-surgery": [
    {
      question: "What does a foraminotomy treat?",
      answer: "A <strong>posterior cervical foraminotomy</strong> treats <strong>radiculopathy</strong> (pinched nerve) by shaving away a small amount of bone and disc to enlarge the neural foramen, the tunnel where the nerve exits the spine."
    },
    {
      question: "Is fusion required with foraminotomy?",
      answer: "No, this is a <strong>decompression-only</strong> procedure. The stability of the spine is maintained, and no screws or rods are implanted, preserving full range of motion."
    },
    {
      question: "How minimally invasive is it?",
      answer: "It is very minimally invasive. It can often be done through a small tube (16-18mm) as an outpatient surgery, with patients returning to desk work in just <strong>1 to 2 weeks</strong>."
    },
    {
      question: "How well does foraminotomy relieve arm pain?",
      answer: "Arm pain from a confirmed lateral disc herniation responds more predictably than axial neck pain. It is an alternative to ACDF for patients whose compression sits out to the side, where the nerve can be decompressed without entering the disc space from the front."
    }
  ],

  // 21. Lumbar Laminectomy Surgery
  "lumbar-laminectomy-surgery": [
    {
      question: "Does laminectomy weaken the back?",
      answer: "<strong>Lumbar laminectomy</strong> removes the lamina and spinous process. While it alters the anatomy, it does not cause instability in most patients. If instability is already present (spondylolisthesis), a fusion may be added."
    },
    {
      question: "How long does it take to recover?",
      answer: "Recovery is relatively quick. Patients walk immediately and return to light activity in <strong>2 to 4 weeks</strong>. Unrestricted activity is usually allowed after <strong>6 to 8 weeks</strong>."
    },
    {
      question: "Will my back pain go away after laminectomy?",
      answer: "Laminectomy is designed to treat <strong>leg pain (sciatica)</strong> and heaviness caused by stenosis. While it helps leg symptoms significantly, it may not relieve localized lower back pain caused by arthritis."
    },
    {
      question: "Can stenosis return after laminectomy?",
      answer: "Yes, over many years, bone spurs or disc bulges can reoccur at the same level or adjacent levels, a condition known as <strong>restenosis</strong>, potentially requiring further treatment."
    }
  ],

  // 22. Lumbar Decompression
  "lumbar-decompression": [
    {
      question: "What is lumbar decompression?",
      answer: "<strong>Lumbar decompression</strong> is a general term for procedures (laminectomy, discectomy, foraminotomy) that free compressed nerves to treat <strong>spinal stenosis</strong> or herniated discs."
    },
    {
      question: "Is lumbar decompression major surgery?",
      answer: "It ranges from minimally invasive micro-procedures to open surgery. Most isolated decompressions are considered <strong>moderate</strong> surgeries performed on an outpatient basis."
    },
    {
      question: "How do I sleep after lumbar decompression?",
      answer: "It is best to sleep on your back with a pillow under your knees, or on your side with a pillow between your knees. This relieves tension on the lower back nerves."
    },
    {
      question: "What are the restrictions?",
      answer: "The 'No BLT' rule applies: <strong>No Bending, Lifting (>10lbs), or Twisting</strong> for the first 4 to 6 weeks to prevent recurrent disc herniation or hematoma."
    }
  ],

  // 23. Lumbar Microendoscopic Discectomy Surgery
  "lumbar-microendoscopic-discectomy-surgery": [
    {
      question: "What is the difference between microdiscectomy and endoscopic discectomy?",
      answer: "Microdiscectomy uses a microscope and a small incision (~1 inch). <strong>Microendoscopic discectomy (MED)</strong> uses a tube and a camera (endoscope) with an even smaller incision (<1 inch), causing less muscle trauma."
    },
    {
      question: "How fast is recovery from MED?",
      answer: "Recovery is rapid. Patients often leave the surgery center within hours. Many return to sedentary work in <strong>1 week</strong> and light exercise in <strong>3 to 4 weeks</strong>."
    },
    {
      question: "Is MED effective for large herniations?",
      answer: "Yes, the endoscopic view allows the surgeon to see and remove even large or migrated disc fragments safely while navigating around the nerve roots."
    },
    {
      question: "What is the recurrence rate?",
      answer: "The risk of re-herniation is about <strong>5-10%</strong>, which is similar to standard microdiscectomy. Following post-op lifting restrictions is crucial to preventing this."
    }
  ],

  // 24. Lumbar Microdiscectomy Surgery
  "lumbar-microdiscectomy-surgery": [
    {
      question: "How long does leg pain last after microdiscectomy?",
      answer: "For most patients, <strong>leg pain (sciatica)</strong> relief is immediate upon waking from surgery. Some may experience temporary numbness or tingling as the compressed nerve heals over weeks."
    },
    {
      question: "Can I climb stairs after microdiscectomy?",
      answer: "Yes, you can climb stairs immediately, but you should do so slowly and utilize the handrail. Avoid carrying heavy objects up and down stairs for the first few weeks."
    },
    {
      question: "Is microdiscectomy a permanent fix?",
      answer: "It is a permanent removal of the herniated portion of the disc. However, the remaining disc can degenerate further over time. Maintaining a strong core helps prevent future issues."
    },
    {
      question: "What is the incision size?",
      answer: "The incision is typically very small, about <strong>1 to 1.5 inches</strong> long, placed in the midline of the lower back. It usually heals with a minimal cosmetic scar."
    }
  ],

  // 25. Degenerative Disc Disease Surgery
  "degenerative-disc-disease-surgery": [
    {
      question: "When should I have surgery for DDD?",
      answer: "Surgery for <strong>Degenerative Disc Disease (DDD)</strong> is considered only after 6 months of non-surgical treatment (PT, injections) has failed to relieve disabling pain that affects daily life."
    },
    {
      question: "Does surgery cure degenerative disc disease?",
      answer: "Surgery does not 'cure' the disease, which is a natural aging process. Instead, it treats the painful symptoms by stabilizing the painful joint (fusion) or removing the source of pain (replacement)."
    },
    {
      question: "What are the best surgical options for DDD?",
      answer: "The gold standards are <strong>Spinal Fusion</strong> (for stability) and <strong>Artificial Disc Replacement</strong> (for motion). Intradiscal therapies and stem cells are also emerging as non-surgical options."
    },
    {
      question: "How successful is surgery for DDD?",
      answer: "Everything depends on whether the disc is genuinely the pain generator. When one level is confirmed as the sole source and the surrounding levels are healthy, the operation is addressing the actual problem. When several levels are degenerate or the source is unclear, surgery is treating an imaging finding rather than a diagnosis."
    }
  ],

  // 26. Percutaneous Discectomy
  "percutaneous-discectomy": [
    {
      question: "What is percutaneous discectomy?",
      answer: "<strong>Percutaneous discectomy</strong> is a minimally invasive procedure where a needle/probe is inserted into the disc to remove or vaporize disc material, reducing pressure on the nerve without an incision."
    },
    {
      question: "Who is a candidate?",
      answer: "Candidates are patients with small, <strong>contained disc herniations</strong> (where the outer wall is intact) who have sciatica but no severe stenosis or bone spurs."
    },
    {
      question: "Is it done under general anesthesia?",
      answer: "Usually, no. It is often performed under <strong>local anesthesia with sedation</strong>, allowing the patient to communicate with the surgeon during the procedure to ensure safety."
    },
    {
      question: "What is the recovery time?",
      answer: "Recovery is extremely fast. Patients go home the same day with just a Band-Aid. Most return to work in <strong>2 to 3 days</strong>."
    }
  ],

  // 27. Resurfacing Shoulder Replacement
  "resurfacing-shoulder-replacement": [
    {
      question: "What is the difference between resurfacing and total shoulder replacement?",
      answer: "Total replacement removes the entire humeral head (ball). <strong>Resurfacing</strong> simply places a smooth metal cap over the existing bone, preserving more of the patient's natural anatomy."
    },
    {
      question: "Who is a candidate for shoulder resurfacing?",
      answer: "It is ideal for <strong>young, active patients</strong> with osteoarthritis who have healthy rotator cuff tendons and good bone quality. It preserves bone for potential future surgeries."
    },
    {
      question: "What is the recovery timeline?",
      answer: "Patients wear a sling for <strong>3 to 6 weeks</strong>. Rehabilitation starts immediately to prevent stiffness. Full return to sports and heavy activity typically takes <strong>4 to 6 months</strong>."
    },
    {
      question: "How long does the implant last?",
      answer: "Implants are durable, often lasting <strong>15 to 20 years</strong>. If it eventually fails, it can be easily converted to a total shoulder replacement."
    }
  ],

  // 28. Hip Arthroscopy Treatment
  "hip-arthroscopy-treatment": [
    {
      question: "What does hip arthroscopy treat?",
      answer: "<strong>Hip arthroscopy</strong> is used to repair <strong>labral tears</strong>, reshape bone in Femoroacetabular Impingement (FAI), and remove loose cartilage bodies or inflamed synovium."
    },
    {
      question: "How long am I on crutches after hip arthroscopy?",
      answer: "Most patients use crutches for <strong>2 to 4 weeks</strong> to protect the repair, especially if the labrum was refixed to the bone. Weight-bearing is graduated slowly."
    },
    {
      question: "Is hip arthroscopy major surgery?",
      answer: "It is a minimally invasive outpatient surgery, but recovery can be lengthy. While the incisions are small, the internal repair requires <strong>3 to 6 months</strong> of rehab for full sports return."
    },
    {
      question: "Can hip arthroscopy prevent hip replacement?",
      answer: "Yes, by correcting impingement (FAI) early, <strong>hip arthroscopy</strong> can prevent further cartilage damage and potentially delay or eliminate the need for hip replacement later in life."
    },
    {
      question: "Can hip arthroscopy remove loose bodies?",
      answer: "<strong>Yes.</strong> Symptomatic loose cartilage or bone fragments can be removed arthroscopically when they cause locking, catching, sudden sharp pain, swelling, or mechanical wear inside the hip joint."
    }
  ],

  // 29. Arthroscopic Knee Surgery
  "arthroscopic-knee-surgery": [
    {
      question: "Is knee arthroscopy worth it for arthritis?",
      answer: "<strong>Arthroscopic knee surgery</strong> is generally *not* recommended for treating arthritis alone. It is highly effective for mechanical symptoms like locking, catching, or meniscus tears, but does not regrow cartilage."
    },
    {
      question: "How long does swelling last?",
      answer: "Swelling is common for <strong>4 to 8 weeks</strong> after surgery. Regular icing, elevation, and compression stockings help resolve this fluid buildup."
    },
    {
      question: "When can I drive after knee arthroscopy?",
      answer: "Patients can typically drive in <strong>3 to 5 days</strong> (left knee) or <strong>1 to 2 weeks</strong> (right knee), once they have good braking control and are off pain medication."
    },
    {
      question: "What is the recovery for a meniscus trim?",
      answer: "If the meniscus is trimmed (partial meniscectomy), recovery is fast. Patients walk immediately and return to sports in <strong>4 to 6 weeks</strong>."
    }
  ],

  // 30. Rotator Cuff Repair Surgery
  "rotator-cuff-repair-surgery": [
    {
      question: "How painful is rotator cuff surgery?",
      answer: "It can be one of the more painful orthopedic recoveries due to the shoulder's sensitivity. <strong>Nerve blocks</strong> provide relief for the first 24 hours, and sleeping in a recliner is recommended for the first few weeks."
    },
    {
      question: "What is the 'danger zone' of recovery?",
      answer: "The period between <strong>6 and 12 weeks</strong> is critical. The shoulder feels better, but the tendon is not fully healed. Doing too much too soon during this window can cause the repair to fail."
    },
    {
      question: "How long does it take to heal completely?",
      answer: "The tendon heals to the bone in about 3 months, but full strength recovery takes <strong>6 to 9 months</strong>. Patience with rehabilitation is key to a good outcome."
    },
    {
      question: "Can I lift my arm immediately?",
      answer: "No. You will be in a sling for <strong>4 to 6 weeks</strong>. Passive motion (therapist moving your arm) starts early, but active lifting is strictly forbidden until the tendon heals."
    }
  ],

  // 31. Meniscus Repair Surgery
  "meniscus-repair-surgery": [
    {
      question: "Repair vs. Removal: Which is better?",
      answer: "<strong>Meniscus repair</strong> (stitching it) is better for long-term knee health as it preserves the shock absorber. Removal (meniscectomy) has a faster recovery but increases the risk of future arthritis."
    },
    {
      question: "How long on crutches for meniscus repair?",
      answer: "Because the repair needs protection, patients are often on crutches with limited weight-bearing for <strong>4 to 6 weeks</strong>, unlike the rapid return seen with removal."
    },
    {
      question: "Which meniscus tears can actually heal?",
      answer: "Two things decide it: the <strong>blood supply where the tear sits</strong> and the age of the tear. Acute tears in the vascular outer zone of a younger patient can heal. Degenerative tears in the inner avascular zone generally cannot, which is why removal is often preferred there."
    },
    {
      question: "Can the meniscus tear again?",
      answer: "Yes, re-tears can occur, especially in high-impact athletes. Following the slow progression of deep squatting and twisting exercises reduces this risk."
    }
  ],

  // 32. Disc Replacement vs Fusion
  "disc-replacement-vs-fusion-what-you-need-to-know": [
    {
      question: "Which has a faster recovery: fusion or replacement?",
      answer: "<strong>Disc replacement</strong> typically offers a faster recovery (return to activity in 4-6 weeks) because there is no need to wait for bones to fuse together, unlike fusion which takes 3-6 months."
    },
    {
      question: "Can fusion be converted to replacement?",
      answer: "No, once a spinal segment is fused, it cannot be 'unfused' and replaced. However, patients with a previous fusion can often have a replacement at a *new* adjacent level."
    },
    {
      question: "Which surgery is safer?",
      answer: "Both have similar safety profiles regarding the approach. <strong>Disc replacement</strong> has a lower risk of causing future problems at other spinal levels (adjacent segment disease)."
    },
    {
      question: "Why would a doctor recommend fusion over replacement?",
      answer: "Fusion is necessary if you have <strong>spinal instability</strong>, severe facet joint arthritis, deformity (scoliosis), or poor bone quality (osteoporosis), as replacement requires good bone and stable joints to function."
    }
  ],

  // 33. Ankle Ligament Reconstruction Surgery
  "ankle-ligament-reconstruction-surgery": [
    {
      question: "What is the Broström procedure?",
      answer: "The <strong>Broström-Gould procedure</strong> is the gold standard for <strong>ankle ligament reconstruction</strong>. It involves tightening the stretched ATFL and CFL ligaments and reinforcing them with a nearby retinaculum."
    },
    {
      question: "How long in a boot after ankle surgery?",
      answer: "Patients typically spend <strong>2 weeks in a cast</strong> followed by <strong>4 weeks in a walking boot</strong>. Rehabilitation usually begins at the 6-week mark."
    },
    {
      question: "Will my ankle be stiff?",
      answer: "Some mild stiffness is normal and actually desirable to provide stability. However, rehab focuses on regaining range of motion so walking and running feel natural."
    },
    {
      question: "When can I return to sports?",
      answer: "Return to straight-line running is often possible at <strong>3 to 4 months</strong>, with cutting sports (soccer, basketball) allowed at <strong>4 to 6 months</strong> once strength is restored."
    }
  ],

  // 35. Hybrid Cervical Spine Surgery
  "hybrid-cervical-spine-surgery": [
    {
      question: "What is hybrid cervical surgery?",
      answer: "It is a procedure combining <strong>ACDF (fusion)</strong> at one level and <strong>Cervical Disc Arthroplasty (replacement)</strong> at another. It treats multilevel disease by stabilizing the worst level while maintaining motion at the salvageable level."
    },
    {
      question: "Does hybrid surgery take longer?",
      answer: "The surgery time is slightly longer than a single-level procedure but is performed under one anesthesia session. It avoids the need for two separate surgeries."
    },
    {
      question: "What is the advantage?",
      answer: "It provides the 'best of both worlds': the reliability of fusion for severe degeneration and the motion preservation of replacement to protect the rest of the spine."
    },
    {
      question: "How is recovery compared to pure fusion?",
      answer: "Recovery is similar to ACDF, with a sore throat being common. However, patients often report less neck stiffness than those who undergo a 2-level fusion."
    }
  ],

  // 36. Back Pain Treatment
  "back-pain-treatment": [
    {
      question: "What is the best treatment for lower back pain?",
      answer: "Most acute back pain resolves with <strong>active rest</strong>, anti-inflammatories (NSAIDs), and rehabilitation. For chronic pain, a multimodal approach including injections, lifestyle changes, and core strengthening is best."
    },
    {
      question: "When does back pain require an MRI?",
      answer: "An MRI is needed if pain persists for more than <strong>6 weeks</strong>, or immediately if there are 'red flags' like leg weakness, numbness, fever, history of cancer, or loss of bowel/bladder control."
    },
    {
      question: "Do muscle relaxers help back pain?",
      answer: "Muscle relaxers can help acute spasms for a few days but are not a long-term solution. They often cause drowsiness and do not address the underlying structural issue."
    },
    {
      question: "Is heat or ice better for back pain?",
      answer: "Ice is generally better for the first <strong>48 hours</strong> of an acute injury to reduce inflammation. Heat is better for chronic stiffness and muscle spasms to increase blood flow."
    }
  ],

  // 37. Bunion Correction Surgery
  "bunion-correction-surgery": [
    {
      question: "Is bunion surgery worth it?",
      answer: "Yes, if the bunion causes pain that limits walking or shoe wear. Cosmetic correction alone is not a valid reason. Modern <strong>3D correction</strong> techniques (like Lapiplasty) have low recurrence rates."
    },
    {
      question: "How painful is bunion surgery?",
      answer: "Pain is well-managed with long-acting nerve blocks that last up to 3 days. While the first week can be uncomfortable, keeping the foot elevated strictly reduces throbbing significantly."
    },
    {
      question: "Can I walk after bunion surgery?",
      answer: "With modern fixation, many patients can bear weight on their heel in a protective boot immediately. Traditional methods may require weeks of non-weight bearing."
    },
    {
      question: "Do bunions come back?",
      answer: "Recurrence is possible, especially with older surgical methods. Newer procedures that correct the root cause (unstable midfoot joint) have reduced recurrence to <strong>less than 5%</strong>."
    }
  ],

  // 38. Carpal Tunnel Release
  "carpal-tunnel-release": [
    {
      question: "How long does the surgery take?",
      answer: "<strong>Carpal tunnel release</strong> is a quick outpatient procedure, typically taking only <strong>10 to 15 minutes</strong> under local anesthesia."
    },
    {
      question: "Is the relief immediate?",
      answer: "Many patients feel immediate relief from the nighttime numbness and tingling. Surgical soreness in the palm (pillar pain) can last for a few weeks."
    },
    {
      question: "Can I type after carpal tunnel surgery?",
      answer: "You can do light typing and use your fingers immediately. However, heavy typing or gripping should be limited for <strong>2 to 3 weeks</strong> to allow the incision to heal."
    },
    {
      question: "Open vs. Endoscopic: Which is better?",
      answer: "<strong>Endoscopic release</strong> has a smaller incision and typically allows for a faster return to work (less palm tenderness), though the long-term result is comparable between the two."
    }
  ],

  // 39. Cervical Disc Replacement
  "cervical-disc-replacement": [
    {
      question: "How long do I wear a collar after disc replacement?",
      answer: "Unlike fusion, many surgeons do *not* require a rigid collar after <strong>cervical disc replacement</strong>, or only a soft collar for a few days for comfort, encouraging early motion."
    },
    {
      question: "Can I get an MRI with a disc replacement?",
      answer: "Yes, modern artificial discs are <strong>MRI-conditional</strong>, meaning they are safe for scanning. They produce less image artifact (blurring) than steel implants."
    },
    {
      question: "What are the activity restrictions?",
      answer: "Restrictions are minimal. Patients avoid heavy lifting for 6 weeks. After that, there are typically <strong>no permanent activity restrictions</strong>, allowing return to high-level sports."
    },
    {
      question: "Is it safe for two levels?",
      answer: "Yes, the FDA has approved several devices for use at <strong>two contiguous levels</strong> of the cervical spine with excellent clinical outcomes."
    }
  ],

  // 40. Coccygectomy (Tailbone Removal Surgery)
  "coccygectomy-tailbone-removal-surgery": [
    {
      question: "What makes someone a good candidate for coccygectomy?",
      answer: "<strong>Coccygectomy</strong> is reserved for chronic coccydynia that has failed conservative care, where the pain is reproducibly localised to the coccyx and typically confirmed by a diagnostic injection. Selection is what matters — pain that is diffuse or not reproduced on examination responds poorly."
    },
    {
      question: "How long does it take to sit comfortably?",
      answer: "Sitting can be uncomfortable for <strong>3 to 6 weeks</strong>. Patients use a 'donut' or gel cushion and lean forward to keep pressure off the incision. Full recovery takes 3 to 6 months."
    },
    {
      question: "Is the surgery dangerous?",
      answer: "The main risk is <strong>infection</strong> due to the location near the rectum. Surgeons use specialized dressings and antibiotics to minimize this risk. Nerve damage is rare."
    },
    {
      question: "Will I miss my tailbone?",
      answer: "No. The coccyx is a vestigial structure (a remnant). Removing it does not affect walking, balance, or pelvic floor function significantly."
    }
  ],

  // 41. Anti-Inflammatory Injections
  "anti-inflammatory-injections-for-joint-and-spine-pain": [
    {
      question: "What is in an anti-inflammatory injection?",
      answer: "Most injections contain a <strong>corticosteroid</strong> (like betamethasone or triamcinolone) to reduce inflammation and a local <strong>anesthetic</strong> (like lidocaine) for immediate pain relief."
    },
    {
      question: "How long do injections last?",
      answer: "Duration varies wildly from <strong>3 weeks to 3 months</strong> or more. They often provide a window of relief to allow rehabilitation to correct the underlying mechanical issue."
    },
    {
      question: "Are injections painful?",
      answer: "There is a brief pinch and pressure. For spine injections, <strong>fluoroscopy</strong> (X-ray guidance) is used to ensure precision, making the process quick and minimizing discomfort."
    },
    {
      question: "Can injections damage joints?",
      answer: "Frequent steroid injections can weaken cartilage or tendons. Doctors typically limit them to <strong>3 or 4 per year</strong> in a single joint to ensure safety."
    }
  ],

  // 42. Aging Management
  "aging-management": [
    {
      question: "How does aging affect the spine?",
      answer: "Aging causes <strong>disc desiccation</strong> (drying out), loss of height, and facet joint arthritis. This leads to stiffness and potential nerve compression (stenosis)."
    },
    {
      question: "Can you stop spinal degeneration?",
      answer: "You cannot stop aging, but you can slow the symptoms. <strong>Core strengthening</strong>, maintaining a healthy weight, and not smoking are the most effective ways to manage an aging spine."
    },
    {
      question: "What supplements help joints?",
      answer: "Glucosamine, Chondroitin, and Turmeric (Curcumin) are popular for reducing inflammation, though clinical evidence is mixed. Calcium and Vitamin D are essential for bone density."
    },
    {
      question: "Is osteoporosis reversible?",
      answer: "It is difficult to reverse fully, but medications (bisphosphonates, anabolic agents) and weight-bearing exercise can significantly increase bone density and reduce fracture risk."
    }
  ],

  // 43. Coccyx Nerve Ablation
  "coccyx-nerve-ablation": [
    {
      question: "What is coccyx nerve ablation?",
      answer: "It is a procedure that uses <strong>radiofrequency energy</strong> (heat) to destroy the small nerves transmitting pain signals from the tailbone. It is a non-surgical alternative to coccygectomy."
    },
    {
      question: "How long does relief last?",
      answer: "Pain relief typically lasts <strong>6 months to 1 year</strong>. The nerves can eventually regenerate, at which point the procedure can be repeated."
    },
    {
      question: "Is the procedure painful?",
      answer: "It is done under local anesthesia and often mild sedation. Patients feel some pressure or heat, but it is generally well-tolerated. Soreness lasts for a few days."
    },
    {
      question: "Who is a candidate?",
      answer: "Patients with chronic tailbone pain who have responded positively to a temporary nerve block injection are good candidates for ablation."
    }
  ],

  // 44. Cortisone Injections for Back Pain
  "cortisone-injections-for-back-pain": [
    {
      question: "How quickly does a cortisone shot work?",
      answer: "The anesthetic provides immediate relief for a few hours. The steroid component typically takes <strong>2 to 5 days</strong> to start reducing inflammation and pain effectively."
    },
    {
      question: "What are the side effects?",
      answer: "Common side effects include a 'cortisone flare' (temporary pain increase), facial flushing, insomnia, or elevated blood sugar in diabetics. These are transient."
    },
    {
      question: "Where is the injection given?",
      answer: "For back pain, it is usually injected into the <strong>epidural space</strong> (around the nerves) or the <strong>facet joints</strong> (small joints of the spine), guided by X-ray."
    },
    {
      question: "Does it cure back pain?",
      answer: "No, it is a management tool. It reduces inflammation to facilitate rehabilitation. It does not fix the herniated disc or arthritis causing the pain."
    }
  ],

  // 45. Degenerative Disc Disease Surgery Details
  "degenerative-disc-disease-surgery-details": [
    {
      question: "Is fusion or replacement better for DDD?",
      answer: "<strong>Replacement</strong> is better for maintaining motion and preventing future surgery, but <strong>fusion</strong> is more reliable if there is significant instability or arthritis."
    },
    {
      question: "What is the 'Goldilocks' surgery for DDD?",
      answer: "Hybrid surgery is often called the 'Goldilocks' option for multilevel DDD, combining the stability of fusion at the worst level with the motion of replacement at the better level."
    },
    {
      question: "What are the signs I need surgery?",
      answer: "Signs include unrelenting pain, leg weakness (foot drop), loss of bowel/bladder control (emergency), or inability to walk or stand for more than a few minutes."
    },
    {
      question: "How is the surgery performed?",
      answer: "Most DDD surgeries are now performed using <strong>minimally invasive techniques</strong> (MIS), using small incisions and muscle-sparing approaches to speed up recovery."
    }
  ],

  // 46. Endoscopic Discectomy Surgery
  "endoscopic-discectomy-surgery": [
    {
      question: "How big is the incision?",
      answer: "The incision is ultra-small, typically <strong>less than 1 cm</strong> (about the size of a pinky nail). It usually requires just one stitch or surgical glue."
    },
    {
      question: "What are the advantages?",
      answer: "Advantages include minimal blood loss, no muscle cutting (muscles are dilated), reduced infection risk, and the ability to be performed under conscious sedation."
    },
    {
      question: "Can I walk immediately?",
      answer: "Yes, patients typically walk out of the surgery center within an hour or two. The rapid mobilization reduces post-op complications."
    },
    {
      question: "Is it suitable for all herniations?",
      answer: "It is excellent for most herniations. However, massive central herniations or those with calcification might still require a microscopic approach for safety."
    }
  ],

  // 47. Endoscopic Foraminotomy Surgery
  "endoscopic-foraminotomy-surgery": [
    {
      question: "What does this surgery treat?",
      answer: "It treats <strong>foraminal stenosis</strong>, where bone spurs or disc material narrow the exit canal of the nerve root, causing sciatica or arm pain."
    },
    {
      question: "How does it differ from open foraminotomy?",
      answer: "The endoscopic approach uses a camera and lateral entry point, allowing the surgeon to widen the foramen without removing as much stabilizing bone or ligament."
    },
    {
      question: "What is the recovery timeline?",
      answer: "Patients return to light work in <strong>1 week</strong>. Full sports and activity can often resume in <strong>4 to 6 weeks</strong>, much faster than open spine surgery."
    },
    {
      question: "Is it painful?",
      answer: "Post-op pain is minimal compared to open surgery. Most patients manage with Tylenol or NSAIDs after the first day or two."
    }
  ],

  // 48. ACL Reconstruction Surgery
  "acl-reconstruction-surgery": [
    {
      question: "Which graft is best for ACL reconstruction?",
      answer: "For young athletes, <strong>autograft</strong> (patellar tendon or hamstring) has the lowest failure rate. <strong>Allograft</strong> (donor tissue) is easier to recover from and is a good option for older patients."
    },
    {
      question: "How long is the recovery?",
      answer: "The biological healing of the graft takes time. Return to running is usually <strong>3-4 months</strong>, but return to cutting sports (soccer, basketball) takes <strong>9 to 12 months</strong>."
    },
    {
      question: "Is the surgery arthroscopic?",
      answer: "Yes, it is minimally invasive. The surgeon uses small camera incisions to drill tunnels and place the graft, though a slightly larger incision is needed if harvesting your own tendon."
    },
    {
      question: "Can I walk without crutches?",
      answer: "Most patients wean off crutches in <strong>1 to 2 weeks</strong> once they can engage their quadriceps and walk without a limp."
    }
  ],

  // 49. Epidural Steroid Injection
  "epidural-steroid-injection": [
    {
      question: "How painful is an epidural injection?",
      answer: "The procedure involves a momentary pinch for the numbing medication. The injection itself feels like pressure. It is generally well-tolerated and over in minutes."
    },
    {
      question: "What are the serious risks?",
      answer: "Serious risks like infection, bleeding, or nerve damage are <strong>extremely rare</strong> (less than 1%). The use of fluoroscopic (live X-ray) guidance ensures safety."
    },
    {
      question: "Can I drive home after the injection?",
      answer: "No. If you have sedation or even just because of potential temporary leg numbness from the anesthetic, you must have a driver to take you home."
    },
    {
      question: "How many can I have?",
      answer: "Doctors typically limit epidural steroid injections to <strong>3 to 4 per year</strong> to avoid side effects of cumulative steroid exposure, such as bone weakening."
    }
  ],

  // 50. Extreme Lateral Interbody Fusion (XLIF)
  "extreme-lateral-interbody-fusion-surgery": [
    {
      question: "What makes XLIF unique?",
      answer: "<strong>XLIF</strong> approaches the spine from the <strong>side</strong> (lateral). This avoids cutting through the heavy back muscles and avoids the major blood vessels in the front."
    },
    {
      question: "What is the main risk of XLIF?",
      answer: "The approach passes through the psoas muscle, which contains nerves. This can cause temporary <strong>thigh numbness or weakness</strong> in about 10-20% of patients, which usually resolves."
    },
    {
      question: "How fast is recovery?",
      answer: "Hospital stay is usually <strong>1 to 2 days</strong>. Patients walk immediately. Full recovery is faster than posterior fusion due to the muscle-sparing approach."
    },
    {
      question: "Can XLIF fix spondylolisthesis?",
      answer: "Yes, the large cages used in XLIF are excellent for reducing spondylolisthesis and restoring disc height, indirectly decompressing the nerves."
    }
  ],

  // 51. Facet Ablation (Rhizotomy)
  "facet-ablation-rhizotomy-treatment": [
    {
      question: "Does rhizotomy permanently kill the nerve?",
      answer: "No. <strong>Rhizotomy</strong> (Radiofrequency Ablation) burns the nerve to stop pain signals, but peripheral nerves can regenerate. Pain relief typically lasts <strong>6 to 12 months</strong>."
    },
    {
      question: "What is the recovery like?",
      answer: "There is virtually no recovery time. Patients may have a sore back for a few days (like a sunburn feeling inside), but can return to normal activities almost immediately."
    },
    {
      question: "Does it work for everyone?",
      answer: "It works best for patients whose pain was confirmed to be from the facet joints via a <strong>diagnostic nerve block</strong>. If the block worked, the ablation is likely to succeed."
    },
    {
      question: "Can I have it done again?",
      answer: "Yes, the procedure can be repeated if and when the nerves grow back and the pain returns, usually providing the same level of relief."
    }
  ],

  // 52. Facet Block, Ablation, Rhizotomy...
  "facet-block-ablation-rhizotomy-and-facet-fusion": [
    {
      question: "What is the difference between a block and ablation?",
      answer: "A <strong>block</strong> injects numbing medicine for temporary relief (diagnostic). An <strong>ablation</strong> uses heat to semi-permanently disable the nerve (therapeutic) for long-term relief."
    },
    {
      question: "What is facet fusion?",
      answer: "If ablation fails to provide lasting relief, <strong>facet fusion</strong> is a minimally invasive option where small wedges are placed into the facet joint to stabilize it permanently."
    },
    {
      question: "Is facet pain the same as sciatica?",
      answer: "No. Facet pain is usually localized to the lower back and may radiate to the buttocks/thighs but rarely goes below the knee. Sciatica shoots down the leg."
    },
    {
      question: "Are these procedures outpatient?",
      answer: "Yes, blocks, ablations, and even minimally invasive facet fusions are typically <strong>outpatient procedures</strong> performed in a surgery center."
    }
  ],

  // 53. Fracture Fixation
  "fracture-fixation": [
    {
      question: "What is kyphoplasty?",
      answer: "<strong>Kyphoplasty</strong> is a type of fixation for compression fractures where a balloon creates space in the crushed bone, which is then filled with bone cement to restore height and stop pain."
    },
    {
      question: "Do all spine fractures need surgery?",
      answer: "No. Most stable compression fractures heal with <strong>bracing</strong> and rest. Surgery is needed for unstable fractures, burst fractures, or those causing severe pain/nerve issues."
    },
    {
      question: "How long does a fracture take to heal?",
      answer: "Bony healing typically takes <strong>3 months</strong>. Pain relief from fixation surgery (like Kyphoplasty) is often immediate."
    },
    {
      question: "Can I walk with a spine fracture?",
      answer: "Depending on stability, yes. However, you should consult a spine specialist immediately. Walking with an unstable fracture can cause paralysis."
    }
  ],

  // 54. Impar Block Treatment
  "impar-block-treatment": [
    {
      question: "What does an Impar Block treat?",
      answer: "It treats visceral, sympathetic pain in the <strong>perineum, rectum, and tailbone</strong> area. It is often used for coccydynia, endometriosis, or cancer-related pain."
    },
    {
      question: "How is it performed?",
      answer: "A needle is guided via fluoroscopy (X-ray) through the sacrococcygeal ligament to the Ganglion Impar, a cluster of nerves in front of the tailbone."
    },
    {
      question: "Is it painful?",
      answer: "The area is sensitive, so local anesthesia is used. Most patients tolerate it well with only mild discomfort during the injection."
    },
    {
      question: "How long does relief last?",
      answer: "Relief varies. Some get weeks of relief, others months. It can be repeated, or followed by a neurolysis (using alcohol/heat) for longer duration."
    }
  ],

  // 55. Neck Pain Treatment & Shoulder Pain Relief
  "neck-pain-treatment-and-shoulder-pain-relief": [
    {
      question: "How do I know if it's my neck or shoulder?",
      answer: "<strong>Neck issues</strong> often cause pain that radiates down the arm past the elbow with numbness. <strong>Shoulder issues</strong> usually cause pain when lifting the arm and pain localized to the deltoid."
    },
    {
      question: "What is 'text neck'?",
      answer: "Text neck is strain caused by constantly looking down at phones. It increases load on the cervical spine, leading to muscle spasms and premature disc degeneration."
    },
    {
      question: "Can sleeping wrong cause lasting pain?",
      answer: "Yes, sleeping without proper support can irritate facet joints. Using a <strong>contoured cervical pillow</strong> helps maintain neutral alignment."
    },
    {
      question: "When should I see a doctor?",
      answer: "See a specialist if pain persists >2 weeks, if you have arm weakness, numbness, or if the pain was caused by trauma (like a car accident)."
    }
  ],

  // 56. Non-Surgical Treatments for Pain
  "non-surgical-treatments-for-pain-management": [
    {
      question: "What is regenerative medicine?",
      answer: "Regenerative medicine (like <strong>PRP</strong> and <strong>Stem Cells</strong>) utilizes the body's own healing factors to repair injured tendons and reduce inflammation in arthritic joints naturally."
    },
    {
      question: "Do TENS units work?",
      answer: "TENS units block pain signals temporarily by stimulating the nerves. They are good for managing chronic muscle pain but do not fix structural problems."
    },
    {
      question: "How effective is rehabilitation?",
      answer: "<strong>Rehabilitation</strong> is the first line of defense and is effective for 70-80% of back and neck pain cases by strengthening the core muscles that support the spine."
    },
    {
      question: "What is spinal decompression therapy?",
      answer: "It is a non-surgical traction therapy that gently stretches the spine to take pressure off herniated discs and promote fluid/nutrient exchange."
    }
  ],

  // 57. Oblique Lumbar Interbody Fusion (OLIF)
  "oblique-lumbar-interbody-fusion": [
    {
      question: "How is OLIF different from XLIF?",
      answer: "<strong>OLIF</strong> approaches the spine \"obliquely\" (in front of the psoas muscle), whereas XLIF goes through the muscle. This reduces the risk of thigh numbness/weakness associated with XLIF."
    },
    {
      question: "What are the benefits of OLIF?",
      answer: "It allows for a large cage placement for stability and correction of deformity while protecting the lumbar nerves. Recovery is faster than open posterior surgery."
    },
    {
      question: "How long is the surgery?",
      answer: "The procedure typically takes <strong>1 to 2 hours</strong> per level. Patients usually stay in the hospital for 1 or 2 days."
    },
    {
      question: "Is OLIF suitable for L5-S1?",
      answer: "Typically no. The iliac crest (hip bone) blocks the oblique angle at L5-S1. ALIF or TLIF is usually preferred for that specific level."
    }
  ],

  // 58. Percutaneous Carpal Tunnel Release
  "percutaneous-carpal-tunnel-release": [
    {
      question: "Does it leave a scar?",
      answer: "<strong>Percutaneous release</strong> is done through a tiny puncture wound, often leaving virtually no visible scar once healed."
    },
    {
      question: "How fast can I return to work?",
      answer: "Most patients return to normal activities in <strong>3 to 5 days</strong>. The recovery is significantly faster than open surgery because the palm skin is not cut."
    },
    {
      question: "Is it as effective as open surgery?",
      answer: "Yes, studies show it provides equivalent nerve decompression with the added benefits of less pain and faster recovery."
    },
    {
      question: "Is it done under ultrasound?",
      answer: "Yes, high-resolution <strong>ultrasound guidance</strong> is critical to visualize the nerve and safe zones, ensuring the ligament is cut safely without injuring nearby structures."
    }
  ],

  // 59. Shoulder Arthroscopy
  "shoulder-arthroscopy": [
    {
      question: "Can I sleep in a bed after shoulder surgery?",
      answer: "It is often painful to lie flat. Most patients sleep in a <strong>recliner</strong> or propped up with pillows for the first 3-6 weeks to reduce throbbing."
    },
    {
      question: "How long is the sling needed?",
      answer: "For a simple decompression: 1-2 weeks. For a <strong>rotator cuff repair</strong> or labral repair: <strong>4 to 6 weeks</strong> is standard to protect the stitches."
    },
    {
      question: "What is a subacromial decompression?",
      answer: "It is a shaving of bone spurs from the underside of the shoulder blade (acromion) to create more room for the rotator cuff, treating <strong>impingement syndrome</strong>."
    },
    {
      question: "When can I drive?",
      answer: "You cannot drive while in a sling. Typically, driving resumes at <strong>4 to 6 weeks</strong> once you have adequate range of motion and are off narcotics."
    }
  ],

  // 60. Stem Cell Treatment
  "stem-cell-treatment": [
    {
      question: "Where do the stem cells come from?",
      answer: "Stem cells are typically harvested from the patient's own <strong>bone marrow</strong> (hip bone) or <strong>adipose tissue</strong> (fat), or from ethically sourced umbilical cord tissue (allograft)."
    },
    {
      question: "Is stem cell therapy covered by insurance?",
      answer: "Currently, many PPO insurance plans may consider it <strong>investigational</strong> and do not cover it. It is usually a self-pay procedure."
    },
    {
      question: "Does it regrow cartilage?",
      answer: "While it can promote healing and reduce inflammation, it does not typically regrow a thick layer of new cartilage in 'bone-on-bone' arthritis. It is best for early to moderate degeneration."
    },
    {
      question: "How many treatments are needed?",
      answer: "Many patients experience significant relief with just <strong>one treatment</strong>. Some degenerative conditions may require a booster injection after a year."
    }
  ],

  // 61. Surgical Treatments (General)
  "surgical-treatments": [
    {
      question: "How do I prepare for orthopedic surgery?",
      answer: "Preparation includes stopping blood thinners, quitting smoking (nicotine slows healing), preparing your home (removing trip hazards), and arranging for a driver/caregiver."
    },
    {
      question: "What is 'minimally invasive' surgery?",
      answer: "<strong>Minimally invasive surgery (MIS)</strong> uses smaller incisions and specialized instruments to avoid cutting muscle. This leads to less pain, less blood loss, and faster recovery."
    },
    {
      question: "What is the risk of infection?",
      answer: "The risk is generally low (<strong>less than 1-2%</strong>) for elective orthopedic surgeries. Antibiotics are given before and after surgery to prevent this."
    },
    {
      question: "Do I need rehabilitation after surgery?",
      answer: "Yes. <strong>Rehabilitation</strong> is crucial for breaking down scar tissue, regaining motion, and strengthening muscles to support the surgical repair."
    }
  ],

  // 62. Trigger Finger Release
  "trigger-finger-release": [
    {
      question: "What causes trigger finger?",
      answer: "It is caused by inflammation of the tendon sheath (pulley) at the base of the finger, often due to repetitive gripping, diabetes, or rheumatoid arthritis."
    },
    {
      question: "How is the release performed?",
      answer: "The surgeon makes a small incision in the palm and cuts the <strong>A1 pulley</strong>. This opens the tunnel, allowing the tendon to glide freely without catching."
    },
    {
      question: "Can it come back?",
      answer: "Recurrence after surgical release is very rare. It is a highly definitive cure for the condition."
    },
    {
      question: "What is the recovery?",
      answer: "Hand use is allowed immediately for light tasks. The stitches are removed in 10-14 days. Grip strength returns fully in about <strong>3 to 4 weeks</strong>."
    }
  ],

  // 63. Ankle Replacement Surgery
  "ankle-replacement-surgery": [
    {
      question: "Is ankle replacement better than fusion?",
      answer: "For older, active patients, <strong>replacement</strong> is often better because it preserves natural gait and protects adjacent joints. <strong>Fusion</strong> is more durable for heavy laborers."
    },
    {
      question: "How long does the implant last?",
      answer: "Current data shows <strong>85-90%</strong> survival rates at 10 years. While not as long-lived as hip or knee replacements, technology is rapidly improving."
    },
    {
      question: "Can I run after surgery?",
      answer: "Running is generally <strong>not recommended</strong> as it wears out the plastic liner quickly. Hiking, doubles tennis, cycling, and golf are excellent activities."
    },
    {
      question: "What is the recovery timeline?",
      answer: "Non-weight bearing for <strong>4 to 6 weeks</strong>. Boot walking for another 4 weeks. Return to normal shoes at 3 months. Full recovery at <strong>6 to 12 months</strong>."
    }
  ],

  // 64. Ankle Arthroscopy Minimally Invasive
  "ankle-arthroscopy-minimally-invasive-surgery": [
    {
      question: "What conditions can it treat?",
      answer: "<strong>Ankle arthroscopy</strong> treats ankle impingement (bone spurs), loose bodies, OCD lesions (cartilage defects), and synovial inflammation."
    },
    {
      question: "How small are the incisions?",
      answer: "Two tiny incisions (portals) are made, each about <strong>5mm</strong> long. They are often closed with a single stitch or sterile strips."
    },
    {
      question: "When can I walk?",
      answer: "Depending on the procedure, many patients walk in a boot immediately. If cartilage repair was done, you may need crutches for <strong>4 to 6 weeks</strong>."
    },
    {
      question: "How long does swelling last?",
      answer: "The ankle is gravity-dependent, so swelling can persist for <strong>3 to 6 months</strong>. This is normal and does not mean something is wrong."
    }
  ],

  // Cubital Tunnel Surgery
  "cubital-tunnel-surgery": [
    {
      question: "What is the difference between cubital tunnel release and transposition?",
      answer: "<strong>In-situ release</strong> simply decompresses the nerve by cutting the tissue over it. <strong>Ulnar nerve transposition</strong> moves the nerve to a new location in front of the elbow. Your surgeon will recommend the best option based on your anatomy and nerve compression severity."
    },
    {
      question: "How long does it take for the ulnar nerve to recover after surgery?",
      answer: "Nerve recovery is gradual. <strong>Numbness typically improves over weeks to months</strong> after surgery. Patients with more severe or long-standing compression may have slower recovery. Some residual numbness may persist, making early intervention important."
    },
    {
      question: "Will I need rehabilitation after cubital tunnel surgery?",
      answer: "Most patients benefit from <strong>hand therapy</strong> after surgery to restore motion and strength. Therapy includes scar management, nerve gliding exercises, and gradual strengthening. Your surgeon will guide the therapy program based on your procedure."
    },
    {
      question: "What are the risks of cubital tunnel surgery?",
      answer: "Risks include infection, bleeding, incomplete symptom relief, and nerve injury. <strong>Elbow instability</strong> is a rare risk with transposition procedures. Choosing an experienced hand surgeon minimizes these risks."
    },
    {
      question: "Can cubital tunnel syndrome come back after surgery?",
      answer: "<strong>Recurrence is uncommon</strong> after successful surgery, but it can happen if scar tissue forms around the nerve. Following post-operative instructions and attending therapy helps prevent recurrence."
    }
  ],

  // Tennis Elbow Surgery
  "tennis-elbow-surgery": [
    {
      question: "How do I know if I need tennis elbow surgery?",
      answer: "Surgery is considered after <strong>6-12 months of failed conservative treatment</strong> including rest, therapy, bracing, and injections. If your outer elbow pain significantly limits work or activities despite these treatments, surgery may be appropriate."
    },
    {
      question: "What should I expect from tennis elbow surgery?",
      answer: "Surgery removes the degenerated tendon tissue at the origin so healthier tissue can take the load. It is considered only after a genuine trial of conservative care, because most cases settle without it. Complete relief typically takes several months, and grip strength returns more slowly than pain settles."
    },
    {
      question: "Is tennis elbow surgery done arthroscopically?",
      answer: "Tennis elbow surgery can be performed <strong>open or arthroscopically</strong>. Both techniques have excellent results. Your surgeon will recommend the best approach based on your specific situation and the extent of tendon damage."
    },
    {
      question: "How long until I can play tennis again after surgery?",
      answer: "Return to racquet sports typically takes <strong>4-6 months</strong> after surgery. Gradual return begins around 3 months with strengthening, progressing to sport-specific exercises before full return. Rushing back increases re-injury risk."
    },
    {
      question: "Can tennis elbow come back after surgery?",
      answer: "Recurrence after surgery is <strong>uncommon (less than 10%)</strong>. Using proper technique, equipment, and maintaining forearm strength helps prevent recurrence. Addressing the original cause of overuse is important."
    }
  ],

  // Golfer's Elbow Surgery
  "golfers-elbow-surgery": [
    {
      question: "Is golfer's elbow surgery similar to tennis elbow surgery?",
      answer: "Yes, the procedures are similar but on <strong>opposite sides of the elbow</strong>. Golfer's elbow surgery addresses the medial (inner) side, while tennis elbow surgery addresses the lateral (outer) side. Both involve removing damaged tendon tissue."
    },
    {
      question: "What is recovery like after golfer's elbow surgery?",
      answer: "Recovery takes <strong>3-6 months</strong> for full return to activities. Early recovery focuses on wound healing and gentle motion. Strengthening begins around 6 weeks. Sports and heavy activities resume at 3-6 months based on strength recovery."
    },
    {
      question: "Will the ulnar nerve be addressed during golfer's elbow surgery?",
      answer: "Your surgeon will evaluate for <a href=\"/conditions/cubital-tunnel-syndrome\">cubital tunnel syndrome</a> (ulnar nerve compression). If present, the nerve may be <strong>decompressed or transposed</strong> during the same surgery to address both problems."
    },
    {
      question: "When can I return to golf after golfer's elbow surgery?",
      answer: "Return to golf typically takes <strong>4-6 months</strong>. Chipping and putting may begin around 3 months; full swing practice at 4 months; competitive play by 5-6 months. Your surgeon and therapist will guide progression."
    },
    {
      question: "How does golfer's elbow surgery compare with tennis elbow surgery?",
      answer: "The operation is the mirror image on the inner side of the elbow, and behaves similarly. The main added consideration is the <strong>ulnar nerve</strong>, which runs immediately behind the medial epicondyle and sometimes needs addressing at the same time. Complete recovery of strength may take up to a year."
    }
  ],

  // Elbow Arthroscopy
  "elbow-arthroscopy": [
    {
      question: "What conditions can elbow arthroscopy treat?",
      answer: "<strong>Elbow arthroscopy</strong> treats loose bodies, bone spurs (osteophytes), arthritis, stiffness (contracture), synovitis, and osteochondritis dissecans. It's also valuable for diagnosing unexplained elbow pain."
    },
    {
      question: "How long is recovery from elbow arthroscopy?",
      answer: "Recovery varies by procedure. <strong>Simple loose body removal</strong> allows return to activities in 4-6 weeks. <strong>Capsular release for stiffness</strong> requires intensive therapy and 3-4 months for full recovery."
    },
    {
      question: "Will I need rehabilitation after elbow arthroscopy?",
      answer: "<strong>Yes, therapy is essential</strong>, especially for stiffness surgery. The elbow is prone to scarring, so early motion and aggressive therapy are critical to maintaining the gains achieved during surgery."
    },
    {
      question: "Is elbow arthroscopy painful?",
      answer: "Post-operative pain is typically <strong>less than open surgery</strong> due to smaller incisions. Most patients manage well with oral pain medications for the first few days. Early motion helps reduce stiffness and discomfort."
    },
    {
      question: "What are the risks of elbow arthroscopy?",
      answer: "Risks include infection, nerve injury (temporary numbness is common), stiffness, and incomplete symptom relief. Choosing an <strong>experienced elbow surgeon</strong> minimizes these risks."
    }
  ],

  // Wrist Arthroscopy
  "wrist-arthroscopy": [
    {
      question: "What conditions can wrist arthroscopy diagnose and treat?",
      answer: "<strong>Wrist arthroscopy</strong> treats <a href=\"/conditions/tfcc-tear\">TFCC tears</a>, ligament injuries (scapholunate), ganglion cysts, cartilage damage, and chronic wrist pain. It's especially valuable when MRI findings are inconclusive."
    },
    {
      question: "How is a TFCC tear repaired arthroscopically?",
      answer: "Peripheral TFCC tears (in the vascular zone) can be <strong>repaired with sutures</strong> arthroscopically. Central tears (avascular zone) are <strong>debrided (smoothed)</strong> since they cannot heal. Your surgeon determines the best approach during the procedure."
    },
    {
      question: "How long is recovery from wrist arthroscopy?",
      answer: "Recovery depends on the procedure performed. <strong>Debridement</strong> allows quick return (4-6 weeks). <strong>TFCC repair</strong> requires immobilization and takes 3-4 months. <strong>Ligament repair</strong> may take longer."
    },
    {
      question: "Will I need a cast after wrist arthroscopy?",
      answer: "Splint or cast use depends on the procedure. <strong>Simple debridement</strong> may only need a soft dressing. <strong>TFCC or ligament repairs</strong> typically require splinting or casting for 4-6 weeks to allow healing."
    },
    {
      question: "What are the risks of wrist arthroscopy?",
      answer: "Risks include infection, nerve injury (especially to small sensory branches), tendon injury, and stiffness. The wrist's complex anatomy requires an <strong>experienced hand surgeon</strong> for optimal results."
    }
  ],

  // Wrist Fracture Surgery
  "wrist-fracture-surgery": [
    {
      question: "When does a wrist fracture need surgery?",
      answer: "Surgery is needed for fractures that are <strong>displaced, unstable, or involve the joint surface</strong>. Fractures that cannot be held in good position with a cast, or that re-displace after casting, typically require surgical fixation."
    },
    {
      question: "What type of hardware is used for wrist fracture surgery?",
      answer: "Most wrist fractures are fixed with a <strong>metal plate and screws</strong> (ORIF). The plate is typically placed on the palm side of the wrist. Some fractures may use pins (K-wires) or external fixation depending on the fracture pattern."
    },
    {
      question: "Will the plate need to be removed after my wrist heals?",
      answer: "Most patients do <strong>not need plate removal</strong>. Modern low-profile plates rarely cause problems. Removal is only considered if the hardware causes irritation, which occurs in less than 5% of cases."
    },
    {
      question: "How long until I can use my hand after wrist fracture surgery?",
      answer: "Finger motion is encouraged immediately. <strong>Light hand use</strong> (writing, typing) often begins at 2-4 weeks. Grip strength and heavier activities improve as the bone heals, typically by 6-12 weeks."
    },
    {
      question: "What is the recovery timeline for wrist fracture surgery?",
      answer: "Bone healing takes <strong>6-8 weeks</strong> typically. Full strength and motion recovery takes <strong>3-6 months</strong>. Hand therapy accelerates recovery and helps restore motion and grip strength."
    }
  ],

  // De Quervain's Release
  "de-quervains-release": [
    {
      question: "How effective is De Quervain's release surgery?",
      answer: "Release of the first dorsal compartment relieves the mechanical irritation directly, so improvement is usually rapid. The main technical consideration is identifying a <strong>separate sub-sheath</strong> around the EPB tendon, which is present in a substantial minority and must be released too or symptoms persist."
    },
    {
      question: "How long does De Quervain's release surgery take?",
      answer: "The procedure typically takes <strong>15-20 minutes</strong> and is performed as an outpatient under local anesthesia. Most patients go home within an hour of surgery."
    },
    {
      question: "When can I use my hand after De Quervain's release?",
      answer: "Light hand use is encouraged <strong>immediately after surgery</strong>. Most patients return to normal activities within 2-4 weeks. Grip strengthening begins around 2-3 weeks post-surgery."
    },
    {
      question: "What are the risks of De Quervain's release surgery?",
      answer: "Risks include infection, nerve injury (causing temporary numbness near the incision), scar tenderness, and tendon bowstringing. These complications are <strong>uncommon with experienced surgeons</strong>."
    },
    {
      question: "Can De Quervain's tenosynovitis come back after surgery?",
      answer: "<strong>Recurrence is rare</strong> after surgical release. If symptoms persist after surgery, it may indicate an anatomical variation (separate tendon compartment) that wasn't addressed. Re-operation can address this."
    }
  ],

  // Dupuytren's Surgery
  "dupuytrens-surgery": [
    {
      question: "What is the difference between fasciectomy and needle aponeurotomy?",
      answer: "<strong>Fasciectomy</strong> surgically removes the thickened tissue for more complete treatment. <strong>Needle aponeurotomy</strong> uses a needle to divide the cord in the office with faster recovery but higher recurrence rates. Your surgeon will recommend the best option."
    },
    {
      question: "Will Dupuytren's contracture come back after surgery?",
      answer: "<strong>Recurrence is possible</strong> with any Dupuytren's treatment. Rates vary from 20-50% depending on the procedure, severity, and patient factors. Surgery (fasciectomy) generally has lower recurrence than needle procedures."
    },
    {
      question: "How long is recovery from Dupuytren's surgery?",
      answer: "Recovery takes <strong>4-12 weeks</strong> depending on severity. Hand therapy is essential for scar management and maintaining finger extension. Night splinting may continue for several months."
    },
    {
      question: "Will I need hand therapy after Dupuytren's surgery?",
      answer: "<strong>Yes, hand therapy is critical</strong> for optimal outcomes. Therapy includes wound care, scar massage, exercises to maintain finger extension, and night splinting. Therapy typically continues for 2-3 months."
    },
    {
      question: "When should Dupuytren's contracture be treated surgically?",
      answer: "Surgery is typically recommended when contracture reaches <strong>30 degrees or more</strong>, or when you cannot place your palm flat on a table. Treating before severe contracture improves outcomes and recovery."
    }
  ],

  // Hand Fracture Surgery
  "hand-fracture-surgery": [
    {
      question: "When does a hand fracture need surgery?",
      answer: "Surgery is needed for fractures that are <strong>displaced, rotated, or unstable</strong>. Rotational deformity (causing fingers to overlap when making a fist) and fractures involving the joint surface typically require surgical fixation."
    },
    {
      question: "What type of hardware is used for hand fractures?",
      answer: "Options include <strong>pins (K-wires), screws, and plates</strong> depending on fracture type and location. Pins may be removed in the office after healing. Plates and screws typically remain permanently."
    },
    {
      question: "How long does a hand fracture take to heal after surgery?",
      answer: "Bone healing typically takes <strong>6-8 weeks</strong>. Full strength and function recovery takes 3-4 months. Hand therapy accelerates recovery by restoring motion and preventing stiffness."
    },
    {
      question: "Will I have stiff fingers after hand fracture surgery?",
      answer: "Finger stiffness is a risk with any hand injury. <strong>Early motion</strong> (when the fracture allows) and hand therapy minimize this risk. Following your surgeon's motion protocol is essential for good outcomes."
    },
    {
      question: "When can I return to sports after hand fracture surgery?",
      answer: "Return to sports depends on the fracture and sport. <strong>Non-contact activities</strong> may resume at 6-8 weeks. <strong>Contact sports</strong> typically require 3 months and may need protective splinting initially."
    }
  ],

  // Elbow Fracture Surgery
  "elbow-fracture-surgery": [
    {
      question: "What types of elbow fractures require surgery?",
      answer: "Surgery is needed for <strong>displaced fractures, fractures involving the joint surface, and unstable fractures</strong>. Radial head, olecranon, and distal humerus fractures commonly require surgical fixation."
    },
    {
      question: "How long is recovery from elbow fracture surgery?",
      answer: "Bone healing takes <strong>8-12 weeks</strong>. Full recovery of motion and strength takes 3-6 months. The elbow is prone to stiffness, so <strong>early motion is critical</strong> and therapy is essential."
    },
    {
      question: "Will I regain full elbow motion after fracture surgery?",
      answer: "Most patients regain <strong>functional motion</strong> (enough for daily activities), though some loss of extension is common. Starting motion early and following therapy protocols maximizes recovery."
    },
    {
      question: "Why is rehabilitation so important after elbow fracture surgery?",
      answer: "The elbow is highly prone to <strong>stiffness after injury</strong>. Without proper therapy, scar tissue can limit motion permanently. Therapy maintains motion gained during surgery and prevents contracture."
    },
    {
      question: "What are the risks of elbow fracture surgery?",
      answer: "Risks include stiffness, infection, hardware irritation, nerve injury, and non-union (failure to heal). <strong>Elbow stiffness</strong> is the most common complication, which is why early motion and therapy are emphasized."
    }
  ],
  "kyphoplasty": [
    {
      question: "Is kyphoplasty the same as vertebroplasty?",
      answer: "Similar procedures with one key difference: kyphoplasty uses a balloon to create space and potentially restore some vertebral height before injecting cement, while vertebroplasty injects cement directly. Kyphoplasty may provide better height restoration but both effectively stabilize fractures."
    },
    {
      question: "Will kyphoplasty fix my osteoporosis?",
      answer: "No, kyphoplasty stabilizes the fracture but doesn't treat the underlying osteoporosis. You'll still need medical management (calcium, vitamin D, bone-strengthening medications) to prevent future fractures."
    },
    {
      question: "How fast does pain improve after kyphoplasty?",
      answer: "Many patients experience significant pain relief within 24-48 hours as the cement stabilizes the fracture. However, results vary—some may take a week or more to notice improvement. Overall function typically improves within 2-4 weeks."
    },
    {
      question: "What are the risks of kyphoplasty?",
      answer: "Risks include cement leakage (usually without symptoms), infection (rare), bleeding, nerve irritation, and adjacent level fractures. The procedure has a strong safety record when performed by experienced specialists using imaging guidance."
    },
    {
      question: "Do I need rehabilitation after kyphoplasty?",
      answer: "Sometimes. PT depends on your functional status and stability. Many patients benefit from gentle strengthening and balance exercises to prevent falls and improve bone health. Your specialist will determine if formal PT is needed."
    }
  ],
  "vertebroplasty": [
    {
      question: "Why choose vertebroplasty vs kyphoplasty?",
      answer: "Choice depends on fracture characteristics, anatomy, and surgeon preference. Vertebroplasty is simpler and may be preferred for flat fractures where height restoration isn't expected. Kyphoplasty may be chosen when height restoration is a goal. Both effectively stabilize fractures."
    },
    {
      question: "How is diagnosis confirmed before vertebroplasty?",
      answer: "Diagnosis requires imaging (X-ray, MRI, or CT) showing a compression fracture PLUS correlation between fracture level and your pain location. Sometimes a physical exam finding (tenderness over the fracture) helps confirm the painful level, especially if multiple fractures exist."
    },
    {
      question: "Can vertebroplasty be done for old fractures?",
      answer: "It's most effective for acute or subacute fractures (typically within 2-3 months of occurrence). Chronic fractures (more than 6 months old) may not respond as well since pain may be from other sources rather than fracture instability."
    },
    {
      question: "What are the risks of vertebroplasty?",
      answer: "Risks include cement leakage into surrounding spaces (usually asymptomatic), infection, bleeding, nerve irritation if cement leaks toward nerves, and increased fracture risk at adjacent levels. Serious complications are rare with proper technique."
    },
    {
      question: "What aftercare is needed after vertebroplasty?",
      answer: "Activity guidance (gradual increase), pain management as needed, bone health optimization (medications, calcium, vitamin D), fall prevention strategies, and follow-up imaging to monitor healing and check for adjacent fractures."
    }
  ],
  "plif": [
    {
      question: "PLIF vs TLIF—what's the difference?",
      answer: "Both are lumbar fusion techniques. PLIF (Posterior Lumbar Interbody Fusion) approaches from directly behind, accessing both sides of the disc space. TLIF (Transforaminal Lumbar Interbody Fusion) approaches from one side at an angle. Surgeon chooses based on anatomy and preference."
    },
    {
      question: "How long until I feel better after PLIF?",
      answer: "Varies significantly. Nerve pain (leg symptoms) may improve within weeks, but incisional pain can persist for 6-8 weeks. Bone fusion takes 3-6 months. Maximum improvement is often reached at 6-12 months post-surgery."
    },
    {
      question: "Do I need to wear a brace after PLIF?",
      answer: "Case-dependent. Some surgeons use braces for the first 6-12 weeks, especially for multilevel fusions or patients with poor bone quality. Others rely on the instrumentation (screws and rods) alone. Follow your surgeon's specific protocol."
    },
    {
      question: "What are common risks of PLIF surgery?",
      answer: "Risks include infection, bleeding, nerve irritation or injury, dural tear (spinal fluid leak), hardware complications, nonunion (failed fusion), and adjacent segment disease. Serious complications are uncommon but increase with multilevel fusions and patient comorbidities."
    },
    {
      question: "When can I return to work after PLIF?",
      answer: "Desk work: often 4-8 weeks. Light duty: 8-12 weeks. Heavy labor: 4-6 months or more. Timeline depends on job demands, number of levels fused, and individual healing. Avoid bending, lifting, and twisting until cleared by your surgeon."
    }
  ],
  "thoracic-spine-surgery": [
    {
      question: "Is thoracic spine surgery common?",
      answer: "Less common than cervical or lumbar surgery because thoracic problems are less frequent. Thoracic surgery is performed for specific indications like spinal cord compression, fractures, deformity, or tumors. It requires specialized expertise due to proximity to vital structures."
    },
    {
      question: "What symptoms suggest thoracic spinal cord compression?",
      answer: "Balance problems, difficulty walking (wide-based or unsteady gait), coordination issues with hands or legs, band-like chest or abdominal tightness, and leg weakness or stiffness. These myelopathy symptoms indicate potential cord compression requiring prompt evaluation."
    },
    {
      question: "Will thoracic spine surgery relieve my pain?",
      answer: "Depends on pain cause. Surgery aims primarily to protect the spinal cord and prevent neurologic decline. Pain relief is a secondary benefit. Some thoracic conditions (fractures, deformity) cause significant pain that surgery can improve."
    },
    {
      question: "What is recovery like after thoracic spine surgery?",
      answer: "Varies widely based on procedure complexity and reason for surgery. Hospital stay may be 3-7 days. Brace use is common. Return to light activities takes 6-12 weeks; full recovery can take 6-12 months. Rehabilitation is typically important."
    },
    {
      question: "Do I need a second opinion for thoracic spine surgery?",
      answer: "Reasonable for any major spine surgery, especially thoracic given its complexity and less common nature. A second opinion can confirm diagnosis, validate treatment plan, and provide perspective on surgical vs non-surgical options."
    }
  ],
  "si-joint-fusion": [
    {
      question: "How do you confirm SI joint pain?",
      answer: "Diagnosis combines clinical exam findings (specific provocative tests) with response to diagnostic SI joint injections. If injection provides 50-75%+ temporary pain relief, it confirms SI joint as a primary pain generator. MRI helps rule out other causes."
    },
    {
      question: "Is SI joint pain the same as sciatica?",
      answer: "Can mimic sciatica but different source. SI joint pain is typically in the lower back, buttock, and back of thigh—usually not below the knee. Sciatica from nerve root compression often goes below the knee with numbness/tingling. Exam and injections differentiate them."
    },
    {
      question: "What if my MRI shows lumbar issues too?",
      answer: "Common scenario. The key is identifying the PRIMARY pain generator. Diagnostic injections (SI joint injection vs epidural) help determine which structure causes most pain. Treat the true pain generator first; other findings may be incidental."
    },
    {
      question: "How long is recovery from SI joint fusion?",
      answer: "Gradual improvement over 3-6 months. Early weeks involve activity restrictions and limited weight-bearing on the surgical side. Most patients notice meaningful improvement by 3 months, with continued gains through 6-12 months as fusion solidifies."
    },
    {
      question: "What are alternatives to SI joint fusion?",
      answer: "Continued rehabilitation focusing on pelvic stability, repeated SI joint injections (every 3-6 months), radiofrequency ablation of SI joint nerves (less commonly performed), and activity modification. Fusion is reserved for confirmed SI pain failing comprehensive conservative care."
    }
  ],
  "cervical-laminectomy": [
    {
      question: "Is cervical laminectomy the same as ACDF?",
      answer: "Different procedures with different approaches and indications. Laminectomy approaches from the back to remove bone and create space for the spinal cord (used for stenosis/myelopathy). ACDF approaches from the front to remove disc and fuse vertebrae (used for disc herniation or single-level stenosis)."
    },
    {
      question: "Will my myelopathy symptoms fully reverse after laminectomy?",
      answer: "Depends on severity and duration before surgery. Early treatment improves odds of recovery. However, goal is often to PREVENT WORSENING rather than reverse established deficits. Some improvement is common, but longstanding severe myelopathy may have permanent effects."
    },
    {
      question: "Do I need fusion added to cervical laminectomy?",
      answer: "Depends on spine alignment and stability. If you have good neck alignment (normal lordosis), laminectomy alone may suffice. If you have kyphosis (forward curve) or instability, fusion may be added to prevent deformity progression. Surgeon assesses this preoperatively."
    },
    {
      question: "How long is recovery from cervical laminectomy?",
      answer: "Varies by number of levels and whether fusion is performed. Many patients resume light activities within 2-4 weeks. If fusion is added, recovery is longer (6-12 weeks for basic activities). Avoid heavy lifting and high-impact activities for 3-6 months."
    },
    {
      question: "What are red flags after cervical laminectomy?",
      answer: "Seek immediate care for worsening weakness (especially in legs), new bowel/bladder problems, increasing neck pain with fever (possible infection), severe headache when sitting up (possible spinal fluid leak), or numbness spreading to new areas."
    }
  ],
  "chronic-pain-treatment": [
    {
      question: "Why does pain persist even after imaging looks 'mild'?",
      answer: "Pain is multifactorial and doesn't always correlate with imaging severity. Factors include nerve sensitization, muscle dysfunction, joint mechanics, inflammation, and central pain processing. Effective treatment addresses the actual pain generators, not just imaging findings."
    },
    {
      question: "Are injections a cure for chronic pain?",
      answer: "Injections are both diagnostic and therapeutic—they help identify pain sources AND provide relief. They're part of a comprehensive plan, not a standalone cure. Combined with rehab and activity modification, injections can facilitate functional improvement."
    },
    {
      question: "What if I have pain in multiple areas?",
      answer: "Common in chronic pain. Strategy is to prioritize PRIMARY drivers (which pain limits you most?) and stage care appropriately. Treating the main pain generator often improves secondary pain as movement and function improve."
    },
    {
      question: "How long until improvement with chronic pain treatment?",
      answer: "Depends on pain duration and complexity. With a structured plan, many patients see measurable progress within 4-8 weeks. However, chronic pain that developed over years may take months to significantly improve. Focus is on functional goals, not complete pain elimination."
    },
    {
      question: "When should I see a specialist urgently for chronic pain?",
      answer: "Red flags include new or progressive weakness, numbness spreading proximally, loss of bowel/bladder control, severe pain with fever or unexplained weight loss, or pain after significant trauma. These warrant prompt evaluation to rule out serious underlying conditions."
    }
  ],
  "joint-pain-treatment": [
    {
      question: "Do I need an MRI for joint pain?",
      answer: "Not always. X-rays are often first-line for joint pain—they show arthritis, alignment, and bone issues. MRI is ordered when soft tissue injury (cartilage, ligaments, tendons) is suspected, symptoms don't match X-ray findings, or when considering surgery."
    },
    {
      question: "Are joint injections safe?",
      answer: "Yes, when properly indicated and performed. Risks include infection (very rare), temporary pain increase, allergic reaction, and potential cartilage effects with repeated corticosteroid injections. Benefits often outweigh risks when injections are used appropriately as part of a treatment plan."
    },
    {
      question: "When is surgery considered for joint pain?",
      answer: "When there's persistent functional limitation despite appropriate conservative care (typically 3-6 months), confirmed structural damage on imaging that correlates with symptoms, and pain/disability significantly impacts quality of life. Surgery is not based on imaging alone."
    },
    {
      question: "Can joint pain come from the spine?",
      answer: "Yes—referred pain is common. Cervical spine issues can cause shoulder pain; lumbar spine problems can mimic hip pain. Thorough exam differentiates between true joint pathology and referred spine pain. Sometimes both coexist and need addressing."
    },
    {
      question: "What can I do at home for joint pain?",
      answer: "Activity modification (avoid aggravators but stay active), appropriate exercises (low-impact cardio, strength training), ice for acute flare-ups or heat for stiffness, maintain healthy weight, and over-the-counter anti-inflammatories if cleared by your doctor."
    }
  ],
  "arthritis-treatment": [
    {
      question: "Is arthritis always 'bone-on-bone'?",
      answer: "No, arthritis exists on a spectrum. 'Bone-on-bone' is end-stage severe arthritis. Many people have mild to moderate arthritis with remaining cartilage. These earlier stages are very treatable with conservative care. Surgery is reserved for advanced arthritis causing significant disability."
    },
    {
      question: "Do injections rebuild cartilage for arthritis?",
      answer: "Current injections don't regrow cartilage. Corticosteroid injections reduce inflammation. Hyaluronic acid (viscosupplementation) may improve joint lubrication. PRP and other biologics show promise but aren't proven to regenerate cartilage. Injections provide symptom relief while cartilage preservation strategies (activity, weight) continue."
    },
    {
      question: "When is joint replacement recommended?",
      answer: "When severe arthritis symptoms (pain, stiffness, functional limitation) persist despite comprehensive conservative care (PT, medications, injections, activity modification), significantly impact quality of life, and X-rays confirm advanced joint degeneration. It's a quality-of-life decision, not an age-based one."
    },
    {
      question: "Can arthritis affect the spine?",
      answer: "Yes—facet joint arthritis causes axial back/neck pain; disc degeneration is a form of spinal arthritis. Spinal arthritis can lead to stenosis (nerve compression) as bone spurs and ligament thickening narrow the canal. Treatment is similar—start conservative, consider injections, reserve surgery for significant symptoms."
    },
    {
      question: "What's the fastest way to feel better with arthritis?",
      answer: "No single 'fastest' way—effective treatment is individualized. Combination approach typically works best: activity modification, targeted strengthening, weight management, appropriate medications, and possibly an injection for acute flare-ups. Starting with proper biomechanics plus pain control addresses root causes."
    }
  ],
  "bursitis-treatment": [
    {
      question: "Is bursitis the same as arthritis?",
      answer: "No, different structures. Bursitis is inflammation of fluid-filled sacs (bursae) that cushion around joints and tendons. Arthritis is cartilage breakdown within the joint itself. However, both can coexist and cause similar symptoms. Treatment approaches differ—bursitis responds well to injections and biomechanical correction."
    },
    {
      question: "Why does my bursitis keep coming back?",
      answer: "Recurrence usually indicates underlying biomechanical or overuse issues weren't fully addressed. Contributing factors include muscle imbalances, poor mechanics, training errors, or activities repeatedly irritating the bursa. Rehabilitation targeting these underlying factors is key to preventing recurrence."
    },
    {
      question: "Do I need imaging for bursitis?",
      answer: "Sometimes. Ultrasound can confirm bursa inflammation and guide injections. MRI is ordered if diagnosis is unclear or to rule out other issues (tendon tears, arthritis). Often, clinical diagnosis from exam is sufficient to start conservative treatment."
    },
    {
      question: "Will a cortisone injection cure my bursitis?",
      answer: "It can dramatically reduce bursa inflammation and pain, providing significant relief. However, injection alone doesn't address underlying mechanical causes. Combine injection with rehabilitation, activity modification, and correction of contributing factors for best long-term results."
    },
    {
      question: "When should I see a specialist for bursitis?",
      answer: "If pain persists despite 2-4 weeks of rest and conservative home care, if you have significant weakness, if diagnosis is unclear, or if pain is worsening. Persistent or recurrent bursitis may need imaging, injection, and structured rehab program."
    }
  ],
  "tendonitis-treatment": [
    {
      question: "Is tendonitis always inflammation?",
      answer: "Not always. Acute tendonitis involves inflammation, but chronic tendon pain (tendinopathy) is often degenerative changes rather than active inflammation. This distinction matters—degenerative tendinopathy responds better to loading/strengthening exercises than to anti-inflammatories and rest alone."
    },
    {
      question: "Should I rest completely with tendonitis?",
      answer: "Short-term relative rest (1-2 weeks) to calm acute flare-ups, then progressive loading is usually best. Complete rest weakens the tendon. The key is finding the 'therapeutic window'—enough load to stimulate healing without aggravating symptoms. Rehabilitation guides this process."
    },
    {
      question: "When do I need MRI for tendonitis?",
      answer: "If pain persists despite 6-8 weeks of appropriate treatment, if there's suspected tendon tear (sudden pain/weakness), if diagnosis is unclear, or when considering advanced treatments (PRP, surgery). MRI differentiates tendinopathy from tears and other issues."
    },
    {
      question: "How long does tendonitis recovery take?",
      answer: "Acute tendonitis may improve in 2-4 weeks with appropriate care. Chronic tendinopathy (tendinosis) takes much longer—typically 3-6 months of progressive loading exercises. Tendons heal slowly due to limited blood supply. Patience and consistency with rehab are essential."
    },
    {
      question: "Can tendonitis turn into a tear?",
      answer: "Yes, chronic tendinopathy weakens tendon structure, increasing tear risk. This is why early treatment addressing mechanics and load management is important. However, many people have tendinopathy visible on imaging without ever tearing. Proper rehab strengthens the tendon and reduces tear risk."
    }
  ],
  "osteoporosis-treatment": [
    {
      question: "How do I know if I have osteoporosis?",
      answer: "Bone density testing (DEXA scan) measures bone strength. T-score below -2.5 indicates osteoporosis; -1.0 to -2.5 is osteopenia (low bone density). Risk factors include age over 50, female sex, family history, smoking, low calcium/vitamin D, and certain medications. Testing is recommended for women 65+ and men 70+, or younger with risk factors."
    },
    {
      question: "Can osteoporosis cause back pain?",
      answer: "Osteoporosis itself doesn't cause pain—it's 'silent' until fracture occurs. However, vertebral compression fractures from osteoporosis cause acute severe back pain. Chronic pain may result from multiple old fractures causing spinal deformity. Prevention and treatment of osteoporosis prevent these painful fractures."
    },
    {
      question: "Do I need spine surgery for osteoporosis?",
      answer: "Usually no—osteoporosis is primarily treated medically (calcium, vitamin D, bone-strengthening medications like bisphosphonates). However, if osteoporosis causes acute painful compression fractures not responding to conservative care, minimally invasive procedures (kyphoplasty/vertebroplasty) may be considered."
    },
    {
      question: "What is a vertebral compression fracture?",
      answer: "A compression fracture is collapse of a vertebral body, typically in the thoracic or lumbar spine, due to weakened bone from osteoporosis. It causes sudden severe back pain, often after minor trauma (bending, lifting) or even spontaneously. Can lead to height loss and spinal deformity if multiple levels fracture."
    },
    {
      question: "What can I do now to protect my bones?",
      answer: "Weight-bearing exercise (walking, jogging), resistance training, adequate calcium (1200mg daily for women 50+) and vitamin D (800-1000 IU daily), avoid smoking and excessive alcohol, fall prevention strategies at home, and bone density testing to guide medical treatment if needed."
    }
  ],
  "hip-labral-repair": [
    {
      question: "What is hip labral repair surgery?",
      answer: "<strong>Hip labral repair</strong> is an arthroscopic procedure that reattaches a torn hip labrum using suture anchors. The labrum is the cartilage ring deepening the hip socket. Surgery addresses the tear and any underlying <a href=\"/conditions/hip-impingement\">hip impingement</a> (FAI) causing it."
    },
    {
      question: "Who is a candidate for hip labral repair?",
      answer: "Candidates include patients with <strong>symptomatic labral tears</strong> causing groin pain, clicking, or locking that failed conservative treatment. Ideal candidates are younger, active individuals without significant arthritis. Associated hip impingement must be corrected during surgery."
    },
    {
      question: "What is the recovery time for hip labral repair?",
      answer: "Recovery takes <strong>4 to 6 months</strong> for return to sports. Patients use crutches for 2-4 weeks to protect the repair. Rehabilitation progresses from passive motion to strengthening. Full healing and return to impact activities takes 6-12 months."
    },
    {
      question: "What are the risks of hip labral repair surgery?",
      answer: "Risks include incomplete pain relief (especially with advanced arthritis), stiffness, nerve injury (lateral femoral cutaneous nerve numbness), infection, blood clots, and potential for re-tear. Selection is decisive: results are far better in hips without established arthritis, because a labral repair does not address cartilage that has already worn."
    },
    {
      question: "What is the difference between labral repair and debridement?",
      answer: "<strong>Labral repair</strong> reattaches the torn labrum preserving its function, while debridement removes damaged tissue. Repair is preferred in younger patients with repairable tears. Debridement is reserved for degenerative, irreparable tears in older patients."
    }
  ],
  "hip-resurfacing": [
    {
      question: "What is hip resurfacing?",
      answer: "<strong>Hip resurfacing</strong> is an alternative to total hip replacement that caps the femoral head with a metal surface rather than removing it. The acetabulum is also resurfaced with a metal cup. It preserves more bone than traditional replacement."
    },
    {
      question: "Who is a candidate for hip resurfacing?",
      answer: "Ideal candidates are <strong>younger, active males</strong> under 60 with good bone quality, large femoral heads, and hip arthritis. Women, patients with osteoporosis, kidney disease, or metal allergies are not ideal candidates due to higher failure rates."
    },
    {
      question: "What are the benefits of hip resurfacing over replacement?",
      answer: "Benefits include <strong>bone preservation</strong> allowing easier revision if needed, more natural hip biomechanics with larger head size reducing dislocation risk, and potentially better activity tolerance. However, long-term outcomes favor traditional <a href=\"/treatments/total-hip-replacement\">total hip replacement</a>."
    },
    {
      question: "What are the risks of hip resurfacing?",
      answer: "Risks include <strong>metal ion release</strong> into bloodstream (metallosis), femoral neck fracture, higher revision rates in women, and all standard hip surgery risks (infection, dislocation, nerve injury). Metal sensitivity testing may be recommended."
    },
    {
      question: "How long does hip resurfacing last?",
      answer: "Survival rates are <strong>approximately 85-95% at 10 years</strong> in optimal candidates (young males). However, traditional hip replacements show better long-term outcomes. The procedure has declined in popularity due to concerns about metal-on-metal bearings."
    }
  ],
  "hip-fracture-surgery": [
    {
      question: "What types of hip fracture surgery are there?",
      answer: "<strong>Hip fracture surgery</strong> varies by location. Femoral neck fractures may require hemiarthroplasty (partial replacement) or total hip replacement in elderly, or internal fixation in young patients. Intertrochanteric fractures use sliding hip screws or intramedullary nails."
    },
    {
      question: "How soon after a hip fracture should surgery occur?",
      answer: "Surgery should ideally occur <strong>within 24-48 hours</strong> after medical optimization. Early surgery reduces complications (pneumonia, blood clots, pressure sores) and mortality. Delays beyond 48 hours significantly increase complication rates in elderly patients."
    },
    {
      question: "Can you walk after hip fracture surgery?",
      answer: "Most patients begin <strong>walking with assistance within 1-2 days</strong> after surgery. Weight-bearing status depends on fracture type and fixation method. Hemiarthroplasty and nailing typically allow immediate weight-bearing, while some internal fixations require protected weight-bearing."
    },
    {
      question: "What is the recovery time for hip fracture surgery?",
      answer: "Initial recovery takes <strong>3 to 4 months</strong> for basic mobility. Full recovery varies by age, health, and fracture type, taking 6-12 months. Elderly patients may not return to pre-fracture function. Rehabilitation is crucial for regaining strength and preventing falls."
    },
    {
      question: "What are the complications of hip fracture surgery?",
      answer: "Complications include <strong>infection, blood clots, pneumonia</strong>, avascular necrosis (femoral neck fractures), non-union, hardware failure, and mortality risk (5-10% at 30 days in elderly). Pre-existing medical conditions significantly impact outcomes."
    }
  ],
  "revision-hip-replacement": [
    {
      question: "What is revision hip replacement surgery?",
      answer: "<strong>Revision hip replacement</strong> is surgery to replace a failed or worn-out hip implant. Common reasons include loosening, infection, dislocation, fracture, wear, or instability. It's technically more complex than primary replacement with longer recovery."
    },
    {
      question: "When is revision hip replacement needed?",
      answer: "Revision is needed for <strong>persistent pain, implant loosening, recurrent dislocations</strong>, infection, component wear causing metallosis or osteolysis, or periprosthetic fracture. Some patients require revision decades after initial replacement due to normal implant wear."
    },
    {
      question: "How long does revision hip replacement take to heal?",
      answer: "Recovery typically takes <strong>6 to 12 months</strong>, longer than primary replacement. Patients use crutches/walker for 6-12 weeks. Rehabilitation is more intensive. Some revisions requiring bone grafting or custom implants need extended protected weight-bearing."
    },
    {
      question: "What are the risks of revision hip surgery?",
      answer: "Revision surgery carries <strong>higher risks than primary surgery</strong> including infection (2-5%), dislocation, nerve injury, blood loss requiring transfusion, bone fracture during component removal, and re-revision. Results are generally less predictable than primary surgery, because bone stock is reduced and the soft-tissue envelope has already been operated on."
    },
    {
      question: "Can you have multiple hip revision surgeries?",
      answer: "Yes, though each subsequent revision becomes <strong>more challenging</strong> due to bone loss and scarring. Modern techniques like trabecular metal cones, modular components, and bone grafting enable multiple revisions. However, outcomes decline and complication rates increase with each revision."
    }
  ],
  "hip-impingement-surgery": [
    {
      question: "What is hip impingement surgery?",
      answer: "<strong>Hip impingement surgery</strong> (FAI surgery) arthroscopically reshapes bone abnormalities causing femoroacetabular impingement. The surgeon trims the femoral head-neck junction (cam lesion) and/or acetabular rim (pincer lesion), then repairs any associated labral tears."
    },
    {
      question: "Who needs hip impingement surgery?",
      answer: "Candidates include patients with <strong>symptomatic FAI</strong> causing groin pain, clicking, or limited motion that failed 3-6 months of conservative treatment. X-rays or CT show cam/pincer morphology. Ideal candidates are younger, active individuals without significant arthritis."
    },
    {
      question: "What is the recovery time for hip impingement surgery?",
      answer: "Recovery takes <strong>4 to 6 months</strong> for return to sports. Patients use crutches for 2-3 weeks. Rehabilitation begins immediately focusing on motion, then progressive strengthening. Full return to impact activities and sports requires 6-9 months."
    },
    {
      question: "What are the results of hip impingement surgery?",
      answer: "Studies show <strong>70-85% good to excellent results</strong> with reduced pain and improved function in properly selected patients. Factors predicting success include younger age, absence of arthritis, normal BMI, and addressing both bone and labral pathology."
    },
    {
      question: "Can hip impingement come back after surgery?",
      answer: "Recurrence is uncommon when bone is adequately resected. However, <strong>residual impingement, new labral tears</strong>, or progression to arthritis can cause persistent symptoms. Some patients require revision surgery (5-10%) or eventually progress to hip replacement if arthritis develops."
    }
  ],
  "core-decompression": [
    {
      question: "What is core decompression for avascular necrosis?",
      answer: "<strong>Core decompression</strong> is a joint-preserving surgery for early-stage <a href=\"/conditions/avascular-necrosis\">avascular necrosis</a> (AVN). The surgeon drills small holes into the femoral head to reduce pressure, stimulate new blood vessel growth, and slow bone death."
    },
    {
      question: "Who is a candidate for core decompression?",
      answer: "Ideal candidates have <strong>early-stage AVN</strong> (pre-collapse stages) detected on MRI with minimal symptoms. The procedure is aimed at pre-collapse disease; once the femoral head has collapsed the mechanical problem is structural and decompression no longer addresses it. Late-stage AVN with collapse requires hip replacement rather than decompression."
    },
    {
      question: "What determines whether core decompression helps?",
      answer: "Stage is the dominant factor. In <strong>pre-collapse disease (Ficat I-II)</strong> the goal is to decompress the marrow and slow progression. Once collapse has occurred the femoral head has lost its shape, and decompression cannot restore it. Younger patients and those addressing underlying causes (stopping steroids/alcohol) have better results."
    },
    {
      question: "What is the recovery time for core decompression?",
      answer: "Patients use <strong>crutches with protected weight-bearing for 6-12 weeks</strong> to allow healing. Full recovery takes 3-6 months. Avoiding impact activities initially prevents femoral head collapse during healing. Serial X-rays monitor bone healing and potential progression."
    },
    {
      question: "What happens if core decompression fails?",
      answer: "If AVN progresses to femoral head collapse despite decompression, <strong><a href=\"/treatments/total-hip-replacement\">total hip replacement</a></strong> becomes necessary. Some patients may undergo vascularized bone grafting as a bridge procedure before eventual replacement if young."
    }
  ],
  "hip-bursectomy": [
    {
      question: "What is hip bursectomy?",
      answer: "<strong>Hip bursectomy</strong> is surgical removal of the inflamed trochanteric bursa on the outer hip. It's typically performed arthroscopically or through a small incision when chronic <a href=\"/conditions/hip-bursitis\">hip bursitis</a> fails to respond to conservative treatment."
    },
    {
      question: "When is hip bursectomy recommended?",
      answer: "Surgery is considered after <strong>6-12 months of failed conservative treatment</strong> including rehabilitation, injections, activity modification, and NSAIDs. Persistent pain limiting daily activities and sleep despite multiple injections indicates surgical candidacy."
    },
    {
      question: "What does hip bursectomy surgery involve?",
      answer: "The procedure removes the <strong>thickened, inflamed bursa</strong> and addresses underlying causes such as tight IT band (iliotibial band lengthening), gluteal tendon tears (repair), or bone spurs (removal). Addressing causative factors prevents recurrence."
    },
    {
      question: "What is the recovery time for hip bursectomy?",
      answer: "Most patients resume <strong>light activities within 2-4 weeks</strong> and return to full activities by 6-12 weeks. Rehabilitation focuses on IT band stretching, hip strengthening, and correcting biomechanical issues. Results hold up when the underlying driver is addressed — IT band tightness, gluteal tendon pathology, or a biomechanical issue — and tend not to when the bursa alone is treated."
    },
    {
      question: "Can hip bursitis come back after surgery?",
      answer: "Recurrence is uncommon after bursectomy as the bursa is removed. However, <strong>similar pain may return if underlying issues</strong> (IT band tightness, gluteal tears, leg-length discrepancy) aren't addressed. Maintaining hip flexibility and strength prevents recurrent symptoms."
    }
  ],
  "partial-knee-replacement": [
    {
      question: "What is partial knee replacement (unicompartmental)?",
      answer: "<strong>Partial knee replacement</strong> (unicompartmental arthroplasty) replaces only the damaged compartment (medial, lateral, or patellofemoral) rather than the entire knee. It's less invasive than <a href=\"/treatments/total-knee-replacement\">total knee replacement</a>, preserving healthy bone and ligaments."
    },
    {
      question: "Who is a candidate for partial knee replacement?",
      answer: "Ideal candidates have <strong>isolated arthritis in one compartment</strong>, intact ligaments, minimal deformity, and are typically over 60. The procedure works best for medial compartment arthritis in lower-demand patients. Younger, active patients may be better served by total replacement."
    },
    {
      question: "What are the benefits of partial knee replacement?",
      answer: "Benefits include <strong>faster recovery (4-6 weeks vs 3 months)</strong>, more natural knee feel, smaller incision, less blood loss, shorter hospital stay, and better preservation of bone stock for future revision. Many patients report the knee feels more normal."
    },
    {
      question: "How long does a partial knee replacement last?",
      answer: "<strong>Survival rates are 80-90% at 10 years</strong> and 70-80% at 15 years. However, 10-15% of patients eventually require conversion to total knee replacement due to arthritis progression in other compartments. Younger, heavier patients have higher revision rates."
    },
    {
      question: "What are the disadvantages of partial knee replacement?",
      answer: "Disadvantages include <strong>higher revision rates than total replacement</strong>, potential for arthritis progression in untreated compartments, occasional clicking or clunking, and strict patient selection criteria. Not suitable for inflammatory arthritis or ligament insufficiency."
    }
  ],
  "meniscus-surgery": [
    {
      question: "What is meniscus surgery?",
      answer: "<strong>Meniscus surgery</strong> treats <a href=\"/conditions/torn-meniscus\">torn meniscus</a> through arthroscopic repair (suturing the tear) or partial meniscectomy (removing damaged tissue). Repair is preferred in younger patients with repairable tears in the vascular zone. Debridement removes torn fragments causing mechanical symptoms."
    },
    {
      question: "When is meniscus repair recommended over removal?",
      answer: "<strong>Meniscus repair</strong> is preferred in younger patients (<40), acute tears, peripheral tears in the vascular zone, and vertical longitudinal tears. Repair preserves the meniscus, protecting against future arthritis. Whether a repair holds depends on where the tear sits: the outer third has a blood supply and can heal, the inner third largely cannot."
    },
    {
      question: "What is the recovery time for meniscus surgery?",
      answer: "Recovery varies by procedure. <strong>Meniscectomy: 4-6 weeks</strong> for return to activities. Meniscus repair: 3-6 months with initial protected weight-bearing and limited motion to allow healing. Contact sports require full rehabilitation and strength return."
    },
    {
      question: "Can you walk immediately after meniscus surgery?",
      answer: "Walking depends on procedure type. <strong>Meniscectomy allows immediate weight-bearing</strong> as tolerated. Meniscus repair typically requires crutches with protected weight-bearing for 4-6 weeks to protect the repair. Your surgeon will specify your restrictions."
    },
    {
      question: "Will I develop arthritis after meniscus surgery?",
      answer: "Risk varies by procedure. <strong>Meniscus removal increases arthritis risk</strong> proportional to amount removed. Meniscus repair preserves the shock-absorbing function, reducing future arthritis risk. Degenerative meniscus tears in older patients often indicate pre-existing arthritis."
    }
  ],
  "knee-ligament-repair": [
    {
      question: "What is knee ligament repair surgery?",
      answer: "<strong>Knee ligament repair</strong> treats tears of the ACL, PCL, MCL, or LCL through reconstruction (using grafts) or direct repair. ACL tears typically require reconstruction. MCL and LCL tears may heal with bracing. Multi-ligament injuries need complex reconstruction."
    },
    {
      question: "Which knee ligament injuries need surgery?",
      answer: "<strong>Complete ACL tears in active patients</strong> almost always require reconstruction. MCL injuries often heal non-surgically. PCL tears may be treated conservatively. LCL and multi-ligament injuries typically need surgery. Decision factors include activity level, age, and associated injuries."
    },
    {
      question: "What is the recovery time for knee ligament surgery?",
      answer: "Recovery varies by ligament. <strong>ACL reconstruction: 6-9 months</strong> for return to sports. Multi-ligament reconstruction: 9-12 months. MCL repair: 3-4 months. Early rehabilitation focuses on motion and preventing arthrofibrosis, followed by progressive strengthening."
    },
    {
      question: "What affects the outcome of knee ligament surgery?",
      answer: "Graft choice, technique, and rehabilitation compliance affect outcomes, and multi-ligament injuries are less predictable than isolated ones."
    },
    {
      question: "Can you play sports after knee ligament surgery?",
      answer: "Yes, most athletes return to sports after <strong>proper rehabilitation and clearance</strong>. ACL reconstruction allows return at 6-9 months with functional testing. Re-injury risk is 5-15%. Addressing biomechanics, strength deficits, and neuromuscular control reduces re-tear risk."
    }
  ],
  "pcl-reconstruction": [
    {
      question: "What is PCL reconstruction surgery?",
      answer: "<strong>PCL reconstruction</strong> replaces a torn posterior cruciate ligament using a graft (allograft or autograft). Unlike ACL tears, isolated PCL tears often heal conservatively. Surgery is reserved for grade III tears, multi-ligament injuries, or symptomatic instability."
    },
    {
      question: "Who needs PCL reconstruction surgery?",
      answer: "Candidates include patients with <strong>complete PCL tears causing instability</strong>, multi-ligament knee injuries, combined PCL and posterolateral corner injuries, or persistent symptoms (pain, instability) despite 3-6 months of conservative treatment and quadriceps strengthening."
    },
    {
      question: "What is the recovery time for PCL reconstruction?",
      answer: "Recovery takes <strong>9 to 12 months</strong> for return to sports, longer than ACL reconstruction. Patients use brace with extension lockout for 6 weeks. Quadriceps strengthening is emphasized while avoiding hamstring activation initially. Full recovery requires dedicated rehabilitation."
    },
    {
      question: "What are the outcomes of PCL reconstruction?",
      answer: "Outcomes are generally good but <strong>less predictable than ACL reconstruction</strong>. Patient satisfaction rates are 70-85%. Some residual posterior laxity often remains, but most patients achieve stable, functional knees. Combined injuries have more variable outcomes."
    },
    {
      question: "Is PCL reconstruction as successful as ACL reconstruction?",
      answer: "PCL reconstruction is <strong>technically more challenging</strong> and less predictable than ACL reconstruction. The PCL's different anatomy, biomechanics, and healing environment make reconstruction more complex. However, modern techniques have improved outcomes significantly."
    }
  ],
  "knee-cartilage-restoration": [
    {
      question: "What is knee cartilage restoration?",
      answer: "<strong>Knee cartilage restoration</strong> treats focal cartilage defects using techniques like microfracture, OATS (osteochondral autograft transfer), ACI (autologous chondrocyte implantation), or MACI (matrix-induced ACI). Choice depends on defect size, location, and patient factors."
    },
    {
      question: "Who is a candidate for cartilage restoration?",
      answer: "Ideal candidates are <strong>younger patients (<40-50)</strong> with isolated focal defects from trauma, not widespread arthritis. Stable knees with intact meniscus and ligaments have best outcomes. Patients must commit to extended rehabilitation and activity modification."
    },
    {
      question: "What are the different cartilage restoration procedures?",
      answer: "Options include: <strong>Microfracture</strong> (drilling holes to stimulate fibrocartilage), OATS (transferring plugs of healthy cartilage), ACI/MACI (culturing and implanting patient's cartilage cells). Choice depends on defect size: <2cm² microfracture, 2-4cm² OATS, >4cm² ACI/MACI."
    },
    {
      question: "What is the recovery time for cartilage restoration?",
      answer: "Recovery varies by procedure. <strong>Microfracture: 4-6 months</strong>. OATS: 6-9 months. ACI/MACI: 9-12 months. All require initial protected weight-bearing (6-8 weeks) and CPM machine use. Full maturation of repair tissue takes 12-18 months."
    },
    {
      question: "What determines whether cartilage restoration works?",
      answer: "Four things drive it, and they matter more than which technique is chosen. <strong>Defect size and depth</strong> — small contained lesions do better than large or uncontained ones. <strong>Whether the joint is otherwise healthy</strong> — restoration does not work in a knee with established arthritis. <strong>Limb alignment</strong> — if the knee is malaligned the repaired surface is loaded abnormally and will fail, which is why an osteotomy is sometimes done at the same time. And <strong>whether the patient can protect the repair</strong> during the months it takes to mature. Microfracture relies on marrow cells forming fibrocartilage, which is mechanically weaker than the original surface; OATS and ACI/MACI aim to restore true hyaline-like cartilage and are generally reserved for larger defects."
    }
  ],
  "knee-osteotomy": [
    {
      question: "What is knee osteotomy?",
      answer: "<strong>Knee osteotomy</strong> is a bone-cutting procedure that realigns the leg to shift weight away from the damaged knee compartment. High tibial osteotomy (HTO) treats medial arthritis in bow-legged patients. Distal femoral osteotomy treats lateral arthritis in knock-kneed patients."
    },
    {
      question: "Who is a candidate for knee osteotomy?",
      answer: "Ideal candidates are <strong>young, active patients (<60)</strong> with isolated compartment arthritis, malalignment (varus or valgus), intact opposite compartment, stable ligaments, and good range of motion. It delays need for <a href=\"/treatments/total-knee-replacement\">knee replacement</a> by 10+ years."
    },
    {
      question: "What is the recovery time for knee osteotomy?",
      answer: "Recovery takes <strong>3 to 6 months</strong> for return to activities. Patients use crutches with protected weight-bearing for 6-8 weeks until bone healing. Full weight-bearing resumes at 8-12 weeks. Return to sports requires 6-9 months with complete rehabilitation."
    },
    {
      question: "How long does a knee osteotomy last?",
      answer: "<strong>Survival rates are 80-90% at 10 years</strong> and 60-70% at 15 years for appropriately selected patients. Success depends on proper patient selection, accurate correction, and activity modification. Eventually, most patients require knee replacement as arthritis progresses."
    },
    {
      question: "What are the advantages of osteotomy over knee replacement?",
      answer: "Osteotomy <strong>preserves the native knee joint</strong>, allows higher-impact activities, has no implant to wear out, and maintains options for future knee replacement. Ideal for young, active patients wanting to delay replacement. However, recovery is longer than replacement."
    }
  ],
  "revision-knee-replacement": [
    {
      question: "What is revision knee replacement surgery?",
      answer: "<strong>Revision knee replacement</strong> is surgery to replace or repair a failed knee implant. Common reasons include loosening, infection, instability, component wear, fracture around the implant, or stiffness. It's more complex than primary replacement with extended recovery."
    },
    {
      question: "When is revision knee replacement needed?",
      answer: "Revision is needed for <strong>persistent pain, implant loosening, recurrent instability/dislocations</strong>, infection not controlled by antibiotics, component wear causing metallosis or osteolysis, or periprosthetic fracture. Some revisions occur due to technical errors or component malposition."
    },
    {
      question: "How long does revision knee replacement take to heal?",
      answer: "Recovery typically takes <strong>6 to 12 months</strong>, significantly longer than primary replacement. Rehabilitation is more intensive. Some revisions requiring bone grafting, stems, or augments need extended protected weight-bearing and gradual motion progression."
    },
    {
      question: "What are the risks of revision knee replacement?",
      answer: "Revision surgery has <strong>higher complication rates</strong> than primary surgery including infection (3-5%), stiffness, instability, nerve injury, blood loss, prolonged recovery, and re-revision risk. Results are generally less predictable than a primary replacement, because bone stock is reduced, the soft-tissue envelope has already been operated on, and the implant often has to be larger or more constrained."
    },
    {
      question: "Can you have multiple knee revision surgeries?",
      answer: "Yes, though each subsequent revision is <strong>more technically demanding</strong> due to bone loss and scarring. Modern techniques like metaphyseal cones, sleeves, and custom components enable multiple revisions. However, outcomes decline and infection risk increases with each revision."
    }
  ],
  "shoulder-replacement": [
    {
      question: "What is total shoulder replacement?",
      answer: "<strong>Total shoulder replacement</strong> (anatomic arthroplasty) replaces the damaged humeral head with a metal ball and resurfaces the glenoid socket with a plastic component. It treats end-stage <a href=\"/conditions/shoulder-arthritis\">shoulder arthritis</a> when the rotator cuff is intact."
    },
    {
      question: "Who is a candidate for shoulder replacement?",
      answer: "Candidates include patients with <strong>severe shoulder arthritis</strong> causing pain and limited function despite conservative treatment, intact or repairable rotator cuff, adequate bone quality, and realistic expectations. Common conditions include osteoarthritis, rheumatoid arthritis, and avascular necrosis."
    },
    {
      question: "What is the recovery time for shoulder replacement?",
      answer: "Initial recovery takes <strong>6 to 12 weeks</strong> with sling use for 4-6 weeks. Full recovery and return to activities requires 4-6 months. Rehabilitation begins immediately focusing on passive motion, then progressive strengthening. Heavy lifting restrictions are permanent."
    },
    {
      question: "How long does a shoulder replacement last?",
      answer: "<strong>Modern shoulder replacements last 15-20+ years</strong> in most patients. Survival rates exceed 90% at 10 years. Younger, more active patients may wear components faster. Glenoid loosening is the most common cause of long-term failure."
    },
    {
      question: "What activities can I do after shoulder replacement?",
      answer: "Patients can perform <strong>most daily activities and low-impact sports</strong> (golf, swimming, cycling). Avoid heavy lifting (>25-50 lbs), contact sports, and repetitive overhead activities. Tennis doubles and recreational activities are typically allowed with surgeon clearance."
    }
  ],
  "reverse-shoulder-replacement": [
    {
      question: "What is reverse shoulder replacement?",
      answer: "<strong>Reverse shoulder replacement</strong> inverts the ball-and-socket anatomy, placing a metal ball on the glenoid and a socket on the humerus. It treats rotator cuff tear arthropathy, massive irreparable cuff tears, and complex fractures by allowing the deltoid to power the arm."
    },
    {
      question: "Who needs a reverse shoulder replacement?",
      answer: "Candidates include patients with <strong>rotator cuff tear arthropathy</strong>, massive irreparable cuff tears causing pain and weakness, failed anatomic shoulder replacement, complex proximal humerus fractures in elderly, or tumors requiring proximal humerus resection."
    },
    {
      question: "What is the recovery time for reverse shoulder replacement?",
      answer: "Recovery takes <strong>3 to 6 months</strong> for most activities. Patients wear a sling for 4-6 weeks. Rehabilitation begins immediately with passive motion, progressing to active motion and strengthening. Forward elevation improves quickly; rotation recovery is more gradual."
    },
    {
      question: "What are the advantages of reverse shoulder replacement?",
      answer: "Advantages include <strong>pain relief and improved function without a functional rotator cuff</strong>, immediate stability (low dislocation risk 3-5%), predictable outcomes, and ability to elevate the arm using deltoid. It revolutionized treatment for cuff tear arthropathy."
    },
    {
      question: "What are the limitations of reverse shoulder replacement?",
      answer: "Limitations include <strong>restricted external rotation and internal rotation</strong> (reaching behind back), scapular notching (30-50%), higher complication rates than anatomic replacement, permanent heavy lifting restrictions, and potential instability with deltoid damage."
    }
  ],
  "labral-repair-shoulder": [
    {
      question: "What is shoulder labral repair surgery?",
      answer: "<strong>Shoulder labral repair</strong> is an arthroscopic procedure reattaching a torn labrum to the glenoid rim using suture anchors. It treats Bankart lesions (anterior-inferior tears from dislocation) and SLAP tears (superior labrum anterior-posterior tears from overhead sports)."
    },
    {
      question: "Who is a candidate for shoulder labral repair?",
      answer: "Candidates include patients with <strong>symptomatic labral tears</strong> causing instability, pain, or mechanical symptoms that failed conservative treatment. Bankart repairs prevent recurrent dislocations. SLAP repairs treat overhead athletes with pain and clicking from superior labral tears."
    },
    {
      question: "What is the recovery time for labral repair?",
      answer: "Recovery varies by tear location. <strong>Bankart repair: 4-6 months</strong> for return to sports. SLAP repair: 6-9 months due to biceps tendon involvement. Patients wear a sling for 4-6 weeks. Rehabilitation progresses from motion to strengthening."
    },
    {
      question: "What affects the outcome of shoulder labral repair?",
      answer: "Outcomes depend on patient age, sport, and tear pattern, and SLAP repairs are more variable than Bankart repairs. Young contact athletes have higher re-injury risk."
    },
    {
      question: "What are the complications of labral repair surgery?",
      answer: "Complications include <strong>recurrent instability (5-15%)</strong>, stiffness, incomplete pain relief, nerve injury (axillary nerve), infection, and anchor-related issues. SLAP repairs have higher dissatisfaction rates in overhead athletes, with some requiring biceps tenodesis revision."
    }
  ],
  "biceps-tenodesis": [
    {
      question: "What is biceps tenodesis surgery?",
      answer: "<strong>Biceps tenodesis</strong> detaches the long head of the biceps tendon from its attachment in the shoulder and reattaches it lower on the humerus bone. It treats chronic biceps tendonitis, SLAP tears, or partial rotator cuff tears by removing a pain generator."
    },
    {
      question: "When is biceps tenodesis recommended?",
      answer: "Tenodesis is recommended for <strong>chronic biceps tendonitis unresponsive to conservative treatment</strong>, irreparable SLAP tears (especially in patients >40), partial rotator cuff tears with biceps involvement, or painful biceps subluxation. It's often combined with rotator cuff repair."
    },
    {
      question: "What is the recovery time for biceps tenodesis?",
      answer: "Recovery takes <strong>3 to 4 months</strong> for return to full activities. Patients avoid lifting with the affected arm for 6 weeks to allow tendon healing. Rehabilitation focuses on shoulder motion initially, then progressive strengthening. Sports return requires 4-6 months."
    },
    {
      question: "What is the difference between tenodesis and tenotomy?",
      answer: "<strong>Tenodesis reattaches the tendon</strong> to bone preserving biceps function and cosmesis. Tenotomy simply releases the tendon, allowing it to retract. Tenotomy is quicker with faster recovery but may cause a \"Popeye\" deformity (20-30%) and potential cramping/weakness."
    },
    {
      question: "What are the results of biceps tenodesis?",
      answer: "Results are generally excellent. <strong>Pain relief rates exceed 85-90%</strong>. The \"Popeye\" deformity is rare (5%) compared to tenotomy (20-30%). Minimal functional strength loss occurs. Patient satisfaction is high, especially when combined with rotator cuff repair or other procedures."
    }
  ],
  "shoulder-instability-surgery": [
    {
      question: "What is shoulder instability surgery?",
      answer: "<strong>Shoulder instability surgery</strong> stabilizes a chronically unstable shoulder through arthroscopic or open Bankart repair (labral repair with capsular tightening), capsular plication, bone grafting (Latarjet), or soft tissue reconstruction. Choice depends on bone loss and tissue quality."
    },
    {
      question: "Who needs surgery for shoulder instability?",
      answer: "Surgery is recommended for <strong>recurrent dislocations</strong>, especially in young, active patients after first-time dislocation, failed conservative treatment, significant bone loss (>20% glenoid or Hill-Sachs), or high-demand athletes/military personnel requiring reliable stability."
    },
    {
      question: "What is the Latarjet procedure?",
      answer: "The <strong>Latarjet procedure</strong> transfers the coracoid bone with attached muscles to the front of the glenoid, creating a bone block and sling effect. It's used for significant glenoid bone loss (>20%), failed prior soft tissue repair, or contact athletes."
    },
    {
      question: "What is the recovery time for shoulder stabilization?",
      answer: "Recovery takes <strong>6 to 9 months</strong> for return to contact sports. Patients wear a sling for 4-6 weeks. Rehabilitation progresses cautiously to avoid re-injury. Strengthening begins at 3 months. Full contact sports clearance requires 6-9 months with functional testing."
    },
    {
      question: "What affects the outcome of shoulder stabilization surgery?",
      answer: "Bone loss on the glenoid is the main technical factor, and is why the Latarjet procedure is chosen over an arthroscopic Bankart repair in some patients. Revision surgery is less predictable than first-time surgery, and young contact athletes have higher re-dislocation risk."
    }
  ],
  "acromioplasty": [
    {
      question: "What is shoulder acromioplasty?",
      answer: "<strong>Acromioplasty</strong> (subacromial decompression) is an arthroscopic procedure that removes bone spurs from the underside of the acromion and bursa to create more space for the rotator cuff. It treats <a href=\"/conditions/shoulder-impingement\">shoulder impingement syndrome</a>."
    },
    {
      question: "Who is a candidate for acromioplasty?",
      answer: "Candidates include patients with <strong>chronic shoulder impingement</strong> causing pain with overhead activities that failed 3-6 months of conservative treatment (therapy, injections, activity modification). X-rays showing acromial spurs and MRI confirming impingement without large rotator cuff tears."
    },
    {
      question: "What is the recovery time for acromioplasty?",
      answer: "Recovery takes <strong>3 to 6 months</strong> for full return to activities. Patients typically avoid overhead activities for 6 weeks. Rehabilitation begins immediately with motion, progressing to rotator cuff strengthening. Most patients return to work in 2-4 weeks."
    },
    {
      question: "When does acromioplasty actually help?",
      answer: "This is one of the more debated procedures in shoulder surgery, and it is worth being straight about that. It is most defensible when performed <strong>alongside a rotator cuff repair</strong>, where removing the impinging bone protects the repair. Performed in isolation for impingement with no cuff tear, the evidence is genuinely mixed, and several trials have questioned whether it outperforms structured non-operative care. If it is being offered on its own, ask what specifically is expected to change."
    },
    {
      question: "Is acromioplasty still recommended?",
      answer: "Recent evidence questions <strong>isolated acromioplasty's effectiveness</strong> for impingement without rotator cuff tears, showing similar results to rehabilitation alone. It's now primarily performed alongside rotator cuff repair. Conservative treatment should be exhausted before considering surgery."
    }
  ],
  "shoulder-fracture-surgery": [
    {
      question: "What is shoulder fracture surgery?",
      answer: "<strong>Shoulder fracture surgery</strong> treats broken bones in the proximal humerus, clavicle, or scapula through open reduction internal fixation (plates/screws), intramedullary nailing, or hemiarthroplasty/reverse shoulder replacement for comminuted proximal humerus fractures in elderly patients."
    },
    {
      question: "When does a shoulder fracture need surgery?",
      answer: "Surgery is needed for <strong>displaced fractures, multiple fragments</strong> (3-4 part proximal humerus), fractures with rotator cuff injury, open fractures, neurovascular injury, or fractures in young, active patients. Many minimally displaced fractures heal non-surgically with immobilization."
    },
    {
      question: "What is the recovery time for shoulder fracture surgery?",
      answer: "Recovery varies by fracture type. <strong>ORIF fixation: 3-6 months</strong>. Reverse replacement for complex fractures: 4-6 months. Clavicle ORIF: 3-4 months. Initial immobilization lasts 4-6 weeks, followed by progressive motion and strengthening under supervision."
    },
    {
      question: "What determines if I need plates or shoulder replacement?",
      answer: "Decision factors include <strong>fracture pattern, bone quality, patient age, and function</strong>. Young patients with good bone: ORIF fixation. Elderly with osteoporotic 4-part fractures: reverse shoulder replacement often provides better outcomes than attempting fixation of poor-quality bone."
    },
    {
      question: "What are the complications of shoulder fracture surgery?",
      answer: "Complications include <strong>stiffness (most common)</strong>, avascular necrosis of the humeral head (10-20% in complex fractures), malunion, nonunion, hardware irritation, infection, nerve injury (axillary nerve), and potential need for revision to shoulder replacement."
    }
  ],
  "sacroiliac-joint-injection": [
    {
      question: "What is a sacroiliac joint injection?",
      answer: "A <strong>sacroiliac (SI) joint injection</strong> delivers corticosteroid and anesthetic into the SI joint to reduce inflammation and diagnose SI joint dysfunction. It's performed under fluoroscopic (X-ray) guidance to ensure accurate needle placement. The procedure is both diagnostic and therapeutic."
    },
    {
      question: "Who is a candidate for SI joint injection?",
      answer: "Candidates include patients with <strong>lower back or buttock pain</strong> suspected from SI joint dysfunction, pain not responding to rehabilitation, pain with provocative tests (FABER, Gaenslen's), or to confirm SI joint as pain source before considering <a href=\"/treatments/si-joint-fusion\">SI joint fusion</a>."
    },
    {
      question: "What is the recovery time after SI joint injection?",
      answer: "Most patients resume normal activities <strong>within 24-48 hours</strong>. Initial soreness from the needle resolves in 1-2 days. The steroid's full effect develops over 3-7 days. Relief typically lasts 3-6 months, sometimes longer. Multiple injections may be needed."
    },
    {
      question: "How effective are SI joint injections?",
      answer: "Diagnostic accuracy is high, with <strong>75%+ relief confirming SI joint</strong> as pain source. Therapeutic relief varies: 50-80% experience significant pain reduction lasting months. Combining injections with rehabilitation strengthening core and hips provides better long-term results."
    },
    {
      question: "What are the risks of SI joint injection?",
      answer: "Risks are minimal. Possible complications include <strong>temporary pain increase (2-3 days)</strong>, infection (rare <1%), allergic reaction, bleeding, nerve injury (very rare), and temporary leg weakness. Fluoroscopic guidance minimizes complications."
    }
  ],
  "nerve-block-injection": [
    {
      question: "What is a nerve block injection?",
      answer: "A <strong>nerve block injection</strong> delivers anesthetic (and sometimes steroid) near specific nerves to interrupt pain signals. Types include medial branch blocks (facet joints), selective nerve root blocks (radiculopathy), peripheral nerve blocks, and sympathetic blocks. Both diagnostic and therapeutic."
    },
    {
      question: "What conditions are treated with nerve blocks?",
      answer: "Nerve blocks treat <strong>facet joint arthritis, radiculopathy</strong>, complex regional pain syndrome, neuralgia, chronic pain, and post-surgical pain. They help diagnose pain sources and predict response to permanent treatments like ablation or surgery."
    },
    {
      question: "How long does a nerve block last?",
      answer: "Duration varies by type and medication used. <strong>Diagnostic blocks (local anesthetic only): hours</strong>. Therapeutic blocks (with steroid): weeks to months. Radiofrequency ablation following successful blocks provides 6-12+ months relief. Some patients need repeat procedures."
    },
    {
      question: "What determines whether a nerve block works?",
      answer: "Accuracy of the diagnosis matters more than the injection itself. A block works when the structure being anaesthetised is genuinely the pain generator, which is why blocks are often used <strong>diagnostically</strong> before anything more definitive is planned. Pain that follows a clear nerve distribution responds more predictably than diffuse pain, and a block that gives no relief is itself useful information — it tells the surgeon the target was wrong."
    },
    {
      question: "Are nerve blocks safe?",
      answer: "Yes, nerve blocks are generally <strong>very safe when performed by experienced specialists</strong> using fluoroscopic or ultrasound guidance. Rare risks include infection, bleeding, nerve injury, allergic reaction, or inadvertent dural puncture. Benefits typically outweigh minimal risks."
    }
  ],
  "sports-injury-treatment": [
    {
      question: "What does sports injury treatment involve?",
      answer: "<strong>Sports injury treatment</strong> follows a phased approach: acute management (RICE protocol), rehabilitation (motion, strengthening, proprioception), return-to-sport progression, and injury prevention strategies. Treatment is tailored to sport demands, injury type, and athlete goals."
    },
    {
      question: "When should an athlete see a sports medicine specialist?",
      answer: "See a specialist for <strong>pain limiting performance or practice participation</strong>, suspected fractures or ligament tears, swelling not resolving in 72 hours, recurrent injuries, or desire to optimize recovery and prevent re-injury. Early evaluation prevents chronic problems."
    },
    {
      question: "Can I play through a sports injury?",
      answer: "Playing through <strong>sharp pain or pain altering mechanics</strong> risks worsening injury. Mild soreness may allow modified training. The key question: does pain affect performance or technique? If yes, rest and evaluation are needed. \"Toughness\" leads to prolonged recovery."
    },
    {
      question: "What is the typical recovery timeline for sports injuries?",
      answer: "Recovery varies widely. <strong>Mild sprains: 2-4 weeks</strong>. Moderate injuries (partial tears, tendonitis): 6-12 weeks. Severe injuries (complete tears, fractures): 3-6 months. Surgical cases: 6-12 months. Return-to-sport requires meeting functional milestones, not arbitrary timelines."
    },
    {
      question: "How can athletes prevent re-injury?",
      answer: "Prevention includes <strong>completing full rehabilitation</strong>, addressing biomechanical deficits, neuromuscular training, appropriate strength and conditioning, gradual return-to-sport protocols, proper equipment, and addressing training errors that caused the initial injury."
    }
  ],
  "athletic-evaluation": [
    {
      question: "What is an athletic evaluation?",
      answer: "An <strong>athletic evaluation</strong> is a comprehensive sports medicine assessment examining injury risk factors, movement patterns, strength imbalances, flexibility deficits, and biomechanical issues. It helps athletes optimize performance, prevent injuries, and create personalized training programs."
    },
    {
      question: "Who should get an athletic evaluation?",
      answer: "Athletes with <strong>recurrent injuries, performance plateaus</strong>, chronic pain, starting new sports, returning after long breaks, or those seeking injury prevention benefit from evaluation. It's valuable for competitive athletes, weekend warriors, and youth athletes alike."
    },
    {
      question: "What does an athletic evaluation include?",
      answer: "Evaluation includes <strong>detailed injury history, movement screening (FMS)</strong>, flexibility testing, strength assessment, sport-specific movement analysis, biomechanical evaluation, and functional testing. Findings guide targeted interventions addressing deficits before they cause injury."
    },
    {
      question: "How can an athletic evaluation prevent injuries?",
      answer: "<strong>Early identification of risk factors</strong> (muscle imbalances, poor movement patterns, flexibility deficits) allows corrective interventions. Targeted strengthening, technique modifications, and training program adjustments reduce injury risk by 30-50% in many athletes."
    },
    {
      question: "How long does an athletic evaluation take?",
      answer: "Comprehensive evaluations typically take <strong>45-90 minutes</strong> depending on sport and complexity. Functional testing, movement screening, and discussion of findings are included. Follow-up may include detailed training recommendations and communication with coaches or trainers."
    }
  ],

  // Adult Scoliosis Surgery
  // NOTE: an insurance-coverage FAQ for this page is drafted but withheld pending
  // internal approval - see docs/seo/PENDING-temur-insurance-faq-adult-scoliosis-surgery.md
  "adult-scoliosis-surgery": [
    {
      question: "What degree of scoliosis requires surgery in adults?",
      answer: "There is no single number that decides this. In adults, surgeons weigh <strong>whether the curve is progressing</strong> across imaging taken over time, <strong>whether nerves are being compressed</strong>, and <strong>whether you can still stand and walk in balance</strong> - alongside how much the condition limits your daily life. Large curves are regularly managed without surgery when they are stable and symptoms are controlled, and smaller curves sometimes do need surgery when they are causing significant nerve compression or have thrown the trunk out of balance. The measurement describes the curve; your symptoms and function decide the treatment."
    },
    {
      question: "Is adult scoliosis surgery dangerous? What are the risks?",
      answer: "Adult deformity correction is <strong>major spine surgery and carries real risks</strong>, and any surgeon who tells you otherwise is not being straight with you. Recognised risks include infection, bleeding, dural tear, nerve injury, blood clots, hardware loosening or breakage, and <strong>pseudarthrosis</strong> - a fusion that does not fully heal and may need <a href=\"/treatments/revision-spinal-surgery\">revision surgery</a>. Risk is higher with more levels fused, in patients with poor bone quality, and in those who use nicotine. It is reduced by careful patient selection, continuous neuromonitoring during the operation, and treating bone health and other medical conditions before surgery rather than after. These risks are weighed against what happens if a progressing deformity is left alone - your surgeon should walk you through both sides for your specific case."
    },
    {
      question: "How long does adult scoliosis surgery take?",
      answer: "It depends entirely on how much is being corrected. A limited decompression with a short fusion is a considerably shorter operation than a multi-level reconstruction that rebuilds standing alignment. <strong>Longer reconstructions are sometimes staged across two separate sittings</strong> rather than performed in one, when that is the safer choice. Your surgeon can give you an expected operative time once the plan and the number of levels are settled."
    },
    {
      question: "How long is recovery from adult scoliosis surgery?",
      answer: "Expect a <strong>hospital stay of several days</strong>, with supervised walking starting early rather than after prolonged bed rest. The first several weeks are about protecting the correction - no bending, lifting, or twisting - after which activity is progressed gradually. <strong>Bony fusion is confirmed on imaging over roughly 6-12 months</strong>, and that is when the correction is considered durable rather than simply held by the hardware. Relief in leg symptoms is often noticed well before then, because nerve decompression takes effect long before the fusion finishes healing. Recovery from a deformity correction is longer than from a single-level fusion; specific timelines depend on your reconstruction."
    },
    {
      question: "Can adult scoliosis be fixed without surgery?",
      answer: "For many adults, yes - in the sense that symptoms can be controlled without an operation, which is the realistic goal. Most adults with a degenerative curve are managed with <a href=\"/treatments/epidural-steroid-injection\">injections</a>, activity modification, and monitoring, and never need surgery. What non-surgical care cannot do is <strong>straighten an established adult curve</strong>: it manages symptoms and can slow the functional decline, but it does not reverse the deformity. Surgery becomes the subject when the curve is measurably progressing, when nerve compression has stopped responding to conservative care, or when balance has been lost. See <a href=\"/conditions/adult-degenerative-scoliosis\">adult degenerative scoliosis</a> for the non-surgical options in detail."
    },
    {
      question: "Should I try physical therapy or a chiropractor first?",
      answer: "Many adults have already tried physical therapy, chiropractic care, or bracing before they reach a surgical consultation, and those approaches can help some people manage pain and stay active - though none of them straightens an established adult curve. <strong>Mountain Spine &amp; Orthopedics does not provide physical therapy or chiropractic care</strong>, so we have no stake in steering you toward or away from either. What matters for this page is the pivot point: when a curve is measurably progressing on repeat imaging, when leg symptoms from nerve compression are not settling, or when you can no longer stand or walk in balance, a <a href=\"/find-care/book-an-appointment\">surgical evaluation</a> is reasonable regardless of what conservative care you have already had."
    },
    {
      question: "How much does adult scoliosis surgery cost?",
      answer: "Cost varies too widely for a single figure to be honest, because it tracks the size of the operation rather than the diagnosis. The main drivers are <strong>how many levels are treated</strong>, <strong>which approaches are used</strong> (a limited decompression and short fusion versus a multi-level reconstruction), the implants required, the length of the hospital stay, and whether the procedure is staged. Anyone quoting you a firm price before your imaging has been reviewed and a plan has been made is guessing. Our team can walk you through a personalised estimate once your surgical plan is defined - <a href=\"/find-care/book-an-appointment\">schedule a consultation</a> to start that conversation."
    }
  ]
};

// Helper: Generates generic FAQs for treatments if specific data is missing
export const getTreatmentFaqs = (slug: string, title: string): FAQItem[] => {
  const specific = treatmentFAQs[slug];
  if (specific && specific.length > 0) return specific;

  // Fallback High-Intent SEO FAQs
  return [
    {
      question: `What is the recovery time for ${title}?`,
      answer: `Recovery from <strong>${title}</strong> varies by patient severity. Generally, patients start rehabilitation within the first few weeks, with return to full activity typically between 3 to 6 months.`
    },
    {
      question: `Is ${title} covered by insurance?`,
      answer: `Most medically necessary procedures for <strong>${title}</strong> are covered by major insurance plans, including Medicare. We recommend contacting our office to verify your specific benefits.`
    },
    {
      question: `Am I a candidate for ${title}?`,
      answer: `Candidates typically experience chronic pain that hasn't improved with conservative care. A consultation and MRI review are the best ways to determine if <strong>${title}</strong> is the right option for you.`
    },
    {
      question: `What are the risks of ${title}?`,
      answer: `As with any medical procedure, there are risks involved. However, <strong>${title}</strong> is generally considered safe when performed by an experienced specialist. We will discuss all specific risks during your consultation.`
    }
  ];
};
