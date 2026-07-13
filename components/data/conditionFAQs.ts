export interface FAQItem {
    question: string;
    answer: string;
  }
  
  export const conditionFAQs: Record<string, FAQItem[]> = {
    "adult-degenerative-scoliosis": [
      {
        question: "What causes adult degenerative scoliosis to worsen?",
        answer: "Adult degenerative scoliosis worsens due to the <strong>asymmetric collapse of spinal discs and facet joints</strong> caused by aging. As one side of a disc wears down faster than the other, the spine curves further, often leading to <a href=\"/conditions/spinal-stenosis\">spinal stenosis</a> and nerve compression."
      },
      {
        question: "Can adult scoliosis be treated without surgery?",
        answer: "Yes, the majority of adult scoliosis cases are managed non-surgically. Treatments include <strong>core strengthening exercises, bracing, and epidural steroid injections</strong> to manage pain. Surgery is typically reserved for curves exceeding 50 degrees or when nerve compression causes leg weakness."
      },
      {
        question: "What are the first symptoms of degenerative scoliosis?",
        answer: "Symptoms typically begin with <strong>gradual lower back pain</strong> and stiffness in the morning. As the curve progresses, patients may notice uneven shoulders, a rib hump, or shooting leg pain (<a href=\"/conditions/sciatica\">sciatica</a>) caused by the narrowing of the spinal canal."
      },
      {
        question: "Is spinal fusion the only option for scoliosis surgery?",
        answer: "While <a href=\"/treatments/spinal-fusion\">spinal fusion</a> is the most common method to permanently straighten the spine, <strong>decompression surgery</strong> (laminectomy) alone may be performed if the primary symptom is leg pain and the spinal curve is stable."
      },
      {
        question: "How long is the recovery for adult scoliosis surgery?",
        answer: "Recovery is significant, typically requiring <strong>3 to 6 months for fusion to solidify</strong>. Patients usually walk the day after surgery but must limit bending and twisting for several months to ensure the spine heals correctly."
      }
    ],
    "adjacent-segment-disease": [
      {
        question: "What is Adjacent Segment Disease (ASD)?",
        answer: "Adjacent Segment Disease is a condition where <strong>spinal levels immediately above or below a previous fusion degenerate</strong> due to increased mechanical stress. It is a potential long-term complication of spinal fusion surgery."
      },
      {
        question: "How do you prevent Adjacent Segment Disease?",
        answer: "The best prevention is maintaining a <strong>healthy weight and strong core muscles</strong> to support the spine. Additionally, opting for motion-preservation surgeries like <a href=\"/treatments/artificial-disc-replacement-surgery\">Artificial Disc Replacement</a> instead of fusion can significantly reduce the risk."
      },
      {
        question: "Does adjacent segment disease always require surgery?",
        answer: "No. Treatment begins with conservative measures like <strong>targeted exercises, bracing, and injections</strong>. Surgery is only recommended if these fail and nerve compression causes significant pain or weakness."
      },
      {
        question: "What are the symptoms of adjacent segment disease?",
        answer: "Symptoms mimic the original spinal problem, including <strong>returning back pain or radiating leg pain</strong> (<a href=\"/conditions/sciatica\">sciatica</a>) years after a successful fusion surgery, indicating new degeneration at a neighboring level."
      },
      {
        question: "How is adjacent segment disease treated surgically?",
        answer: "Surgical treatment typically involves <strong>extending the fusion</strong> to include the affected level. In some cases, a <a href=\"/treatments/lumbar-decompression\">decompression</a> or disc replacement can be performed to address the new issue without further fusing the spine."
      }
    ],
    "lumbar-herniated-disc": [
      {
        question: "How does a lumbar herniated disc cause sciatica?",
        answer: "A herniated disc causes sciatica when the <strong>inner gel of the disc leaks out</strong> and chemically irritates or mechanically compresses the sciatic nerve roots. This sends shooting pain, numbness, or tingling down the leg."
      },
      {
        question: "Will a herniated disc heal on its own?",
        answer: "<strong>Yes, 80-90% of herniated discs resolve on their own</strong> within 6 to 12 weeks. The body naturally reabsorbs the herniated material, and inflammation subsides with rest and anti-inflammatory medication."
      },
      {
        question: "What activities should I avoid with a herniated disc?",
        answer: "Avoid <strong>heavy lifting, deep bending, and prolonged sitting</strong>, as these increase pressure on the discs. High-impact activities like running should also be paused until the disc heals."
      },
      {
        question: "When is surgery needed for a herniated disc?",
        answer: "Surgery (<a href=\"/treatments/lumbar-microdiscectomy-surgery\">Microdiscectomy</a>) is recommended if pain is <strong>unmanageable after 6-12 weeks</strong> of conservative care, or immediately if there is progressive muscle weakness (foot drop) or loss of bladder/bowel control."
      },
      {
        question: "What is the fastest way to relieve herniated disc pain?",
        answer: "The fastest relief often comes from <a href=\"/treatments/epidural-steroid-injection\">epidural steroid injections</a>, which deliver strong anti-inflammatories directly to the nerve root. For home care, alternating ice and heat with NSAIDs and gentle extension exercises (McKenzie method) is effective."
      }
    ],
    "degenerative-disc-disease": [
      {
        question: "Is Degenerative Disc Disease actually a disease?",
        answer: "No, it is not a disease but a <strong>natural condition of aging</strong>. It refers to the wear-and-tear of spinal discs that lose hydration and height over time, potentially leading to pain or instability."
      },
      {
        question: "Does Degenerative Disc Disease lead to paralysis?",
        answer: "<strong>Extremely rarely.</strong> DDD primarily causes chronic pain and stiffness. While it can lead to nerve compression causing weakness, it does not typically cause total paralysis."
      },
      {
        question: "What makes degenerative disc pain worse?",
        answer: "Pain is often aggravated by <strong>sitting for long periods, bending, or lifting</strong>, which increases intradiscal pressure. Walking or changing positions frequently usually helps relieve symptoms."
      },
      {
        question: "Can you reverse degenerative disc disease?",
        answer: "You cannot strictly 'reverse' the degeneration, as discs do not regenerate. However, <a href=\"/treatments/non-surgical-treatments-for-pain-management\">non-surgical treatments</a> can manage symptoms effectively, and lifestyle changes like weight loss can slow the progression."
      },
      {
        question: "What is the best exercise for degenerative disc disease?",
        answer: "Low-impact aerobic exercises like <strong>walking, swimming, or cycling</strong> are best. They increase blood flow to the spine without high impact. Core strengthening (Pilates, yoga) helps support the spine and reduce load on the discs."
      }
    ],
    "cervical-spinal-stenosis": [
      {
        question: "What are the warning signs of cervical spinal stenosis?",
        answer: "Warning signs include <strong>neck pain, numbness in the hands</strong>, and balance coordination issues. Severe cases may cause 'myelopathy,' characterized by difficulty with fine motor skills like buttoning a shirt."
      },
      {
        question: "Can cervical stenosis be cured without surgery?",
        answer: "Stenosis is a structural narrowing that <strong>cannot be cured non-surgically</strong>, but symptoms can be managed. Targeted exercises and injections can relieve inflammation, but they do not widen the spinal canal."
      },
      {
        question: "How is cervical stenosis treated surgically?",
        answer: "Common surgeries include <a href=\"/treatments/acdf-surgery\">ACDF (Anterior Cervical Discectomy and Fusion)</a> to remove the disc pressing on the cord, or Posterior Cervical Laminectomy to remove the back of the vertebra and create more space for the spinal cord."
      },
      {
        question: "Is walking difficult with cervical stenosis?",
        answer: "Yes, if the spinal cord is compressed (myelopathy), it can affect <strong>gait and balance</strong>, making patients feel unsteady or 'drunk' when walking, even if they have no leg pain."
      },
      {
        question: "What happens if cervical stenosis is left untreated?",
        answer: "If untreated, severe cervical stenosis can lead to <strong>permanent nerve damage or paralysis</strong>. Progressive weakness and loss of hand function are signs that surgery should not be delayed."
      }
    ],
    "spondylolisthesis": [
      {
        question: "What is the difference between spondylosis and spondylolisthesis?",
        answer: "Spondylosis is general spinal arthritis. <strong>Spondylolisthesis is the slippage</strong> of one vertebra forward over the one below it. This slippage can cause instability and pinch nerves."
      },
      {
        question: "Is walking good for spondylolisthesis?",
        answer: "<strong>Yes, walking is beneficial.</strong> It strengthens the core and legs without placing heavy stress on the spine. However, avoid hyperextending (arching) the back, which can worsen the slip."
      },
      {
        question: "What grade of spondylolisthesis requires surgery?",
        answer: "Surgery is typically required for <strong>Grade 3 or 4 slips (over 50% slippage)</strong> or if lower grades cause intractable nerve pain. <a href=\"/treatments/spinal-fusion\">Spinal fusion</a> stabilizes the slipped vertebra."
      },
      {
        question: "Can a chiropractor fix spondylolisthesis?",
        answer: "Chiropractors can provide symptom relief for mild slips, but <strong>they cannot push the vertebra back into place</strong>. High-velocity adjustments should be avoided in unstable, high-grade slips."
      },
      {
        question: "What exercises should be avoided with spondylolisthesis?",
        answer: "Avoid exercises that involve <strong>extension (arching the back)</strong>, such as 'Superman' poses or heavy overhead lifting, as these can push the slipped vertebra further forward."
      }
    ],
    "cervical-herniated-disc": [
      {
        question: "Where do you feel pain from a cervical herniated disc?",
        answer: "Pain usually starts in the neck and radiates down the <strong>shoulder blade, arm, and into the fingers</strong>. The specific fingers affected depend on which nerve (C5, C6, C7) is compressed."
      },
      {
        question: "How long does a cervical herniated disc take to heal?",
        answer: "Most cases improve within <strong>4 to 6 weeks</strong> with non-surgical care. If nerve pain is severe or causes weakness, surgery like <a href=\"/treatments/cervical-disc-replacement\">cervical disc replacement</a> may be discussed sooner."
      },
      {
        question: "Can a cervical herniated disc cause headaches?",
        answer: "<strong>Yes, cervicogenic headaches</strong> are common. They typically start at the base of the skull and radiate to the forehead or behind the eyes due to muscle tension and nerve irritation."
      },
      {
        question: "Is heat or ice better for a herniated neck disc?",
        answer: "Use <strong>ice for the first 48 hours</strong> to reduce inflammation. After that, heat can help relax the tight muscles and spasms that often accompany a herniated disc."
      },
      {
        question: "What is the best pillow for a cervical herniated disc?",
        answer: "A <strong>cervical contour pillow</strong> that keeps the neck in a neutral position (aligned with the spine) is best. Avoid pillows that are too high, which flex the neck forward."
      }
    ],
    "spinal-compression-fractures": [
      {
        question: "How are spinal compression fractures treated in the elderly?",
        answer: "First-line treatment is pain management and bracing. For persistent pain, <a href=\"/treatments/fracture-fixation\">Kyphoplasty (Fracture Fixation)</a> is a minimally invasive procedure where bone cement is injected to stabilize the fracture and restore height."
      },
      {
        question: "What is the main cause of compression fractures?",
        answer: "<strong>Osteoporosis (weak bones)</strong> is the leading cause, allowing even minor movements like coughing or lifting to collapse a vertebra. Trauma is a secondary cause."
      },
      {
        question: "Is bed rest recommended for compression fractures?",
        answer: "<strong>Only briefly.</strong> Prolonged bed rest can worsen bone loss. Early mobilization with a back brace is encouraged to prevent complications like pneumonia or blood clots."
      },
      {
        question: "Can a compression fracture heal on its own?",
        answer: "<strong>Yes, the bone typically heals in 8-10 weeks.</strong> However, the vertebra often heals in a wedge shape, which can lead to a hunched posture (kyphosis) if not treated."
      },
      {
        question: "How do I know if I have a compression fracture?",
        answer: "Symptoms include <strong>sudden, severe back pain</strong> (often after a minor fall or lifting), which worsens when standing or walking and improves when lying down."
      }
    ],
    "kyphosis": [
      {
        question: "Can bad posture cause permanent Kyphosis?",
        answer: "Postural kyphosis can typically be corrected with <strong>targeted exercises and habit changes</strong>. However, structural kyphosis (like Scheuermann's disease) involves misshapen bones and requires medical treatment."
      },
      {
        question: "What is the surgical treatment for severe Kyphosis?",
        answer: "Surgery involves <a href=\"/treatments/spinal-fusion\">spinal fusion</a> with instrumentation (rods and screws) to realign the spine. In rigid cases, an osteotomy (cutting the bone) helps correct the curvature."
      },
      {
        question: "Is a brace effective for adult kyphosis?",
        answer: "<strong>Generally no.</strong> Bracing is most effective for adolescents who are still growing. In adults, bracing may provide pain relief but will not permanently correct the spinal curve."
      },
      {
        question: "What causes a 'dowager's hump'?",
        answer: "A dowager's hump is usually caused by <strong>multiple compression fractures</strong> in the upper spine due to osteoporosis, leading to an excessive forward curvature."
      },
      {
        question: "Does kyphosis affect breathing?",
        answer: "Yes, severe kyphosis can compress the chest cavity, <strong>limiting lung capacity</strong> and making it difficult to take deep breaths. This is a key indication for surgery."
      }
    ],
    "osteoarthritis": [
      {
        question: "What is the difference between osteoarthritis and rheumatoid arthritis?",
        answer: "<strong>Osteoarthritis is wear-and-tear</strong> of the cartilage, affecting specific joints asymmetrically. Rheumatoid arthritis is an autoimmune disease attacking the joint lining, often affecting joints symmetrically."
      },
      {
        question: "Can you rebuild cartilage lost to osteoarthritis?",
        answer: "<strong>No, cartilage cannot typically be regrown</strong> once lost. Treatments focus on preserving remaining cartilage and managing pain through injections (hyaluronic acid) and therapy."
      },
      {
        question: "Is walking good for osteoarthritis?",
        answer: "<strong>Yes.</strong> While it may seem counterintuitive, low-impact walking keeps joints lubricated and strengthens the muscles that support them, reducing overall pain."
      },
      {
        question: "When should I consider joint replacement for osteoarthritis?",
        answer: "Joint replacement, such as <a href=\"/treatments/total-hip-replacement\">total hip replacement</a>, is recommended when <strong>pain interferes with daily life</strong> (sleep, walking) and conservative treatments like injections and therapy no longer provide relief."
      },
      {
        question: "Does weather really affect arthritis pain?",
        answer: "<strong>Yes.</strong> Drops in barometric pressure can cause tissues in the joints to expand slightly, irritating nerve endings and increasing pain in arthritic joints."
      }
    ],
    "rotator-cuff-tear": [
      {
        question: "Can a rotator cuff tear heal without surgery?",
        answer: "<strong>Partial tears can heal</strong> or become asymptomatic with PT and regenerative injections. <strong>Full-thickness tears do not heal</strong> on their own and typically require surgical repair to restore strength."
      },
      {
        question: "What does a torn rotator cuff feel like?",
        answer: "It feels like a <strong>deep ache in the shoulder</strong>, especially at night. Patients often have difficulty raising their arm overhead or reaching behind their back."
      },
      {
        question: "How long is recovery after rotator cuff surgery?",
        answer: "Full recovery takes <strong>4 to 6 months</strong>. Patients wear a sling for 4-6 weeks, followed by passive motion therapy, and finally strengthening exercises."
      },
      {
        question: "Can I lift weights with a rotator cuff tear?",
        answer: "You should avoid <strong>overhead pressing and heavy lifting</strong> until cleared by a doctor. Strengthening the surrounding scapular muscles is beneficial, but heavy loads can widen the tear."
      },
      {
        question: "What is the success rate of rotator cuff repair?",
        answer: "Success rates are high, generally <strong>over 90% for pain relief</strong>. Functional strength return depends on the size of the tear and the patient's adherence to rehabilitation. See more about <a href=\"/treatments/rotator-cuff-repair-surgery\">rotator cuff repair surgery</a>."
      }
    ],
    "acl-injury": [
      {
        question: "Do all ACL tears require surgery?",
        answer: "<strong>No.</strong> Sedentary patients or those with partial tears may recover with bracing and PT. However, athletes and active individuals usually need <a href=\"/treatments/acl-reconstruction-surgery\">ACL reconstruction</a> to restore stability."
      },
      {
        question: "How long after ACL injury can I walk?",
        answer: "Most patients can walk <strong>within a few weeks</strong> after injury or surgery, often with crutches initially. Full normal gait typically returns by 4-6 weeks post-op."
      },
      {
        question: "Can an ACL tear heal itself?",
        answer: "<strong>Generally, no.</strong> The ACL has poor blood supply and is submerged in joint fluid, which prevents a full tear from knitting back together naturally."
      },
      {
        question: "What graft is best for ACL reconstruction?",
        answer: "Common grafts include the <strong>patellar tendon, hamstring tendon, or donor tissue (allograft)</strong>. The 'best' choice depends on the patient's age, activity level, and surgeon preference."
      },
      {
        question: "When can I return to sports after ACL surgery?",
        answer: "Return to sports typically takes <strong>6 to 9 months</strong>. It requires not just time, but passing functional tests to ensure the leg is strong enough to prevent re-injury."
      }
    ],
    "labral-tears": [
      {
        question: "What does a hip labral tear feel like?",
        answer: "A hip labral tear causes <strong>sharp groin pain</strong>, often accompanied by a clicking, locking, or catching sensation deep in the hip joint."
      },
      {
        question: "Can a labral tear be missed on MRI?",
        answer: "<strong>Yes.</strong> A standard MRI can miss small tears. An <strong>MRA (MRI with contrast dye)</strong> is the gold standard for diagnosing labral tears in the hip or shoulder."
      },
      {
        question: "Do hip labral tears require surgery?",
        answer: "Not always. Many are managed with <strong>targeted exercises, bracing, and injections</strong>. Surgery (<a href=\"/treatments/hip-arthroscopy-treatment\">hip arthroscopy</a>) is considered if pain persists and mechanical symptoms (locking) interfere with daily life."
      },
      {
        question: "What is the difference between a SLAP tear and a Bankart tear?",
        answer: "Both are shoulder labral tears. A <strong>SLAP tear</strong> is at the top (biceps attachment), while a <strong>Bankart tear</strong> is at the bottom (usually from dislocation) and causes instability."
      },
      {
        question: "How long is recovery from labral repair surgery?",
        answer: "Recovery takes <strong>4 to 6 months</strong>. The first month involves protecting the repair (crutches or sling), followed by progressive range of motion and strengthening."
      }
    ],
    "torn-meniscus": [
      {
        question: "Can you walk on a torn meniscus?",
        answer: "<strong>Yes, often.</strong> Many people can walk on a minor tear, though it may be painful. If the knee locks or buckles, walking becomes dangerous and surgery may be needed."
      },
      {
        question: "Does a meniscus tear heal without surgery?",
        answer: "Tears in the <strong>outer 'red zone' (good blood supply)</strong> can heal on their own. Tears in the inner 'white zone' lack blood flow and usually require surgical trimming."
      },
      {
        question: "What is the difference between repair and removal?",
        answer: "<strong>Repair</strong> stitches the meniscus (longer recovery, better long-term joint health). <strong>Meniscectomy</strong> trims the damaged part (faster recovery, higher arthritis risk). Learn more about <a href=\"/treatments/meniscus-repair-surgery\">meniscus repair surgery</a>."
      },
      {
        question: "How do I know if my meniscus tear is severe?",
        answer: "Severe tears often cause <strong>mechanical symptoms</strong> like the knee locking in place (inability to straighten) or giving way, along with significant swelling."
      },
      {
        question: "Is cycling good for a torn meniscus?",
        answer: "<strong>Yes.</strong> Cycling is excellent as it strengthens the legs with low impact. Ensure the seat is high enough to avoid deep knee bending."
      }
    ],
    "sacroiliac-joint-dysfunction": [
      {
        question: "Where is SI joint pain located?",
        answer: "SI joint pain is felt in the <strong>lower back and buttocks</strong>, often radiating into the groin or upper thigh. It is frequently mistaken for a herniated disc."
      },
      {
        question: "How do you fix SI joint pain?",
        answer: "Treatments include <strong>SI joint belts, targeted stabilization exercises, and steroid injections</strong>. If these fail, minimally invasive SI joint fusion uses titanium implants to stabilize the joint."
      },
      {
        question: "What aggravates SI joint pain?",
        answer: "Pain is often worse with <strong>transitional movements</strong> (standing up from a chair), climbing stairs, or standing on one leg."
      },
      {
        question: "How is SI joint dysfunction diagnosed?",
        answer: "It is diagnosed via physical provocation tests and confirmed with a <strong>diagnostic injection</strong>. If the injection relieves pain temporarily, the SI joint is the confirmed source."
      },
      {
        question: "Is SI joint fusion major surgery?",
        answer: "No, modern <strong>minimally invasive SI fusion</strong> is performed through a small incision, takes less than an hour, and has a rapid recovery time compared to traditional open surgery."
      }
    ],
    "trochanteric-bursitis": [
      {
        question: "What triggers trochanteric bursitis?",
        answer: "Triggers include <strong>repetitive friction</strong> (walking/running), direct trauma (falling on the hip), or gait abnormalities caused by other issues like arthritis or leg length discrepancy."
      },
      {
        question: "How long does hip bursitis take to heal?",
        answer: "With rest and treatment, it typically resolves in <strong>6 to 8 weeks</strong>. Chronic cases may require targeted exercises or <a href=\"/treatments/anti-inflammatory-injections-for-joint-and-spine-pain\">cortisone injections</a> to break the cycle of inflammation."
      },
      {
        question: "Is walking good for hip bursitis?",
        answer: "Walking is okay in moderation, but <strong>excessive walking can aggravate the bursa</strong>. It is best to rest until acute pain subsides, then gradually reintroduce activity."
      },
      {
        question: "How do you sleep with trochanteric bursitis?",
        answer: "Sleep on the <strong>unaffected side</strong> with a pillow between your knees. This aligns the hips and reduces pressure on the inflamed bursa."
      },
      {
        question: "Does bursitis ever require surgery?",
        answer: "<strong>Rarely.</strong> Surgery (bursectomy) is only considered if months of non-surgical treatment, including injections and therapy, fail to provide relief."
      }
    ],
    "carpal-tunnel-syndrome": [
      {
        question: "What are the first signs of carpal tunnel?",
        answer: "The first signs are <strong>numbness or tingling in the thumb, index, and middle fingers</strong>, especially at night or when holding a phone/steering wheel."
      },
      {
        question: "Can carpal tunnel go away on its own?",
        answer: "Mild cases can resolve with <strong>rest and wrist splinting</strong>. However, if the nerve compression is structural, it typically progresses without treatment."
      },
      {
        question: "Is surgery the only fix for carpal tunnel?",
        answer: "No. <strong>Splinting, ergonomic changes, and steroid injections</strong> are effective early treatments. <a href=\"/treatments/carpal-tunnel-release\">Carpal tunnel release</a> is needed when nerve damage risk is high."
      },
      {
        question: "How long is recovery from carpal tunnel release?",
        answer: "The skin heals in 2 weeks. <strong>Grip strength returns over 2-3 months.</strong> Most patients report immediate relief from the nighttime numbness."
      },
      {
        question: "What happens if carpal tunnel is left untreated?",
        answer: "Untreated carpal tunnel can lead to <strong>permanent nerve damage</strong> and muscle wasting at the base of the thumb, resulting in permanent weakness and loss of sensation."
      }
    ],
    "back-pain": [
      {
        question: "When should I see a doctor for back pain?",
        answer: "See a doctor if pain <strong>persists over 2 weeks</strong>, radiates down the leg, causes numbness/weakness, or is accompanied by fever or unexplained weight loss. Book a <a href=\"/find-care/book-an-appointment\">consultation</a> for evaluation."
      },
      {
        question: "What is the difference between acute and chronic back pain?",
        answer: "<strong>Acute pain</strong> is sudden and lasts <6 weeks (usually muscle strain). <strong>Chronic pain</strong> lasts >3 months and is often linked to structural issues like discs or arthritis."
      },
      {
        question: "Is bed rest good for back pain?",
        answer: "<strong>No.</strong> Prolonged bed rest weakens muscles and stiffens joints. Active recovery (gentle movement) is proven to heal back pain faster than staying in bed."
      },
      {
        question: "How do I know if my back pain is muscular or spinal?",
        answer: "Muscular pain is usually localized and sore to the touch. <strong>Spinal (disc/nerve) pain</strong> is often deep, sharp, and radiates into the buttocks or legs (like <a href=\"/conditions/sciatica\">sciatica</a>)."
      },
      {
        question: "What are the best exercises for lower back pain?",
        answer: "Core strengthening exercises like <strong>planks, bridges, and bird-dogs</strong> help stabilize the spine. Stretching the hamstrings and hip flexors also relieves back tension."
      }
    ],
    "bulging-disc": [
      {
        question: "Does a bulging disc always require surgery?",
        answer: "<strong>Rarely.</strong> Most bulging discs are managed with targeted exercises, rest, and injections. Surgery is only considered if the bulge compresses a nerve causing severe pain or weakness."
      },
      {
        question: "Bulging disc vs. Herniated disc: What's the difference?",
        answer: "A <strong>bulging disc</strong> is like a flat tire (sags but intact). A <strong>herniated disc</strong> is like a blowout (inner gel leaks out). Herniations are generally more painful. Learn more about <a href=\"/conditions/lumbar-herniated-disc\">herniated discs</a>."
      },
      {
        question: "Can a bulging disc heal?",
        answer: "A bulging disc <strong>does not return to its original shape</strong>, but symptoms can resolve completely as inflammation subsides and the spine stabilizes."
      },
      {
        question: "Is walking good for a bulging disc?",
        answer: "<strong>Yes.</strong> Walking increases blood flow and nourishes the spinal discs. It is a safe, low-impact activity that prevents stiffness."
      },
      {
        question: "What positions make a bulging disc worse?",
        answer: "<strong>Slouching and forward bending</strong> increase pressure on the front of the disc, pushing the bulge backward toward the nerves. Maintaining good posture is critical."
      }
    ],
    "pinched-nerve": [
      {
        question: "How long does a pinched nerve last?",
        answer: "Most pinched nerves resolve within <strong>days to weeks</strong> with rest and anti-inflammatories. If pain persists beyond 6 weeks, medical evaluation is needed."
      },
      {
        question: "What does a pinched nerve feel like?",
        answer: "It feels like <strong>sharp, shooting pain</strong> accompanied by 'pins and needles,' numbness, or muscle weakness along the path of the nerve (e.g., down the arm or leg)."
      },
      {
        question: "How do you release a pinched nerve?",
        answer: "Treatments include <strong>NSAIDs, nerve glide exercises, bracing, and corticosteroids</strong>. In severe cases, surgery may be needed to physically decompress the nerve."
      },
      {
        question: "Is heat or ice better for a pinched nerve?",
        answer: "Alternating both is best. <strong>Ice reduces inflammation</strong> around the nerve, while <strong>heat relaxes tight muscles</strong> that may be compressing the nerve."
      },
      {
        question: "Can a pinched nerve cause permanent damage?",
        answer: "Yes, chronic compression can lead to <strong>permanent neuropathy</strong> or muscle atrophy. Seek care if you experience profound weakness or loss of sensation."
      }
    ],
    "cervical-deformities": [
      {
        question: "What is cervical kyphosis?",
        answer: "Cervical kyphosis is a condition where the normal inward curve of the neck reverses, causing a <strong>forward hunch</strong>. It can strain muscles and compress the spinal cord."
      },
      {
        question: "Can cervical deformities be corrected?",
        answer: "<strong>Yes.</strong> Mild cases may improve with therapy. Severe, rigid deformities require <strong>osteotomy surgery</strong> to realign the vertebrae and relieve spinal cord pressure."
      },
      {
        question: "What causes cervical deformity?",
        answer: "Causes include <strong>degenerative disc disease, previous failed surgeries, trauma</strong>, or systemic conditions like Ankylosing Spondylitis."
      },
      {
        question: "What are the symptoms of cervical deformity?",
        answer: "Symptoms include <strong>inability to look straight ahead</strong>, severe neck pain, and difficulty swallowing. Cord compression may cause balance issues and hand numbness."
      },
      {
        question: "Is surgery risky for cervical deformity?",
        answer: "Corrective surgery is complex but effective. It carries risks like nerve injury, so it is performed by specialized spine surgeons using <strong>neuromonitoring</strong> to ensure safety."
      }
    ],
    "disc-tear": [
      {
        question: "What does an annular tear feel like?",
        answer: "An annular tear causes <strong>deep, localized burning pain</strong> in the back or neck. Unlike a herniation, the pain is often central and does not always radiate to the limbs."
      },
      {
        question: "Can a torn disc heal?",
        answer: "<strong>Yes.</strong> The outer layer (annulus) can heal with scar tissue over <strong>18-24 months</strong>. Avoiding heavy lifting and rotation is crucial during this time."
      },
      {
        question: "How is a disc tear diagnosed?",
        answer: "A standard MRI often misses small tears. A <strong>Provocative Discogram</strong> or high-resolution MRI (HIZ sign) helps identify painful annular tears."
      },
      {
        question: "Does a disc tear lead to a herniation?",
        answer: "<strong>It can.</strong> The tear weakens the disc wall. If intradiscal pressure increases (e.g., lifting), the inner gel can push through the tear, becoming a full <a href=\"/conditions/lumbar-herniated-disc\">herniation</a>."
      },
      {
        question: "What is the treatment for a painful disc tear?",
        answer: "Treatment focuses on time and stabilization. <strong>Targeted exercises, bracing, and biologics</strong> (PRP) are used. <a href=\"/treatments/spinal-fusion\">Spinal fusion</a> or replacement is a last resort for chronic pain."
      }
    ],
    "hip-dysplasia": [
      {
        question: "Can adults have hip dysplasia?",
        answer: "<strong>Yes.</strong> While often congenital, mild dysplasia may not cause symptoms until adulthood, presenting as groin pain and early-onset arthritis."
      },
      {
        question: "How is adult hip dysplasia treated?",
        answer: "Joint-preserving surgery like <strong>PAO (Periacetabular Osteotomy)</strong> repositions the socket. If arthritis is advanced, <a href=\"/treatments/total-hip-replacement\">Total Hip Replacement</a> is the preferred solution."
      },
      {
        question: "What does hip dysplasia pain feel like?",
        answer: "It feels like a <strong>deep ache in the groin</strong> or side of the hip. Activity often worsens the pain, and patients may feel the hip is 'giving out'."
      },
      {
        question: "Does hip dysplasia always lead to arthritis?",
        answer: "Without treatment, the shallow socket causes excessive pressure on the cartilage, making <strong>early osteoarthritis highly likely</strong>."
      },
      {
        question: "Is hip dysplasia hereditary?",
        answer: "<strong>Yes, it tends to run in families.</strong> If you have hip dysplasia, it is recommended to have your children screened early."
      }
    ],
    "facet-joint-disease": [
      {
        question: "What aggravates facet joint pain?",
        answer: "Pain is typically worse with <strong>extension (leaning backward) and twisting</strong>. It is often relieved by bending forward, which opens the joints."
      },
      {
        question: "How long do facet joint injections last?",
        answer: "Diagnostic injections last hours. <strong><a href=\"/treatments/facet-ablation-rhizotomy-treatment\">Radiofrequency Ablation (RFA)</a></strong>, which burns the nerve, can provide relief for <strong>6 to 12 months</strong> or longer."
      },
      {
        question: "Is facet joint disease the same as arthritis?",
        answer: "<strong>Yes.</strong> Facet joint disease is effectively <strong>osteoarthritis of the spine</strong>. The cartilage between the facet joints wears down, causing bone-on-bone friction."
      },
      {
        question: "Can facet joint disease cause leg pain?",
        answer: "Yes, but unlike sciatica (which goes to the foot), facet pain typically radiates only to the <strong>buttocks or back of the thigh</strong> (referred pain)."
      },
      {
        question: "What is the best sleeping position for facet pain?",
        answer: "Sleeping <strong>on your side with knees curled up</strong> (fetal position) opens the facet joints and relieves pressure, reducing morning stiffness."
      }
    ],
    "arthritis": [
      {
        question: "What is the most common type of arthritis?",
        answer: "<strong><a href=\"/conditions/osteoarthritis\">Osteoarthritis</a> (wear-and-tear)</strong> is the most common, affecting millions. Rheumatoid arthritis is the second most common but is autoimmune."
      },
      {
        question: "Is heat or ice better for arthritis?",
        answer: "<strong>Heat is usually better</strong> for chronic arthritis stiffness, as it increases blood flow. Ice is used for acute flare-ups to reduce swelling."
      },
      {
        question: "Does cracking knuckles cause arthritis?",
        answer: "<strong>No.</strong> Studies show no link between knuckle cracking and arthritis. The sound is simply gas bubbles popping in the joint fluid."
      },
      {
        question: "What foods should I avoid with arthritis?",
        answer: "Avoid inflammatory foods like <strong>sugar, processed meats, and refined carbs</strong>. An anti-inflammatory diet (Mediterranean style) can help reduce flare-ups."
      },
      {
        question: "Can exercise help arthritis?",
        answer: "<strong>Absolutely.</strong> Movement produces synovial fluid which lubricates joints. Sedentary behavior makes stiffness worse. Stick to low-impact activities like swimming, walking, or cycling."
      }
    ],
    "lower-back-pain": [
      {
        question: "What are red flags for lower back pain?",
        answer: "Seek emergency care if you have <strong>loss of bowel/bladder control, saddle anesthesia</strong>, fever, or sudden severe weakness (foot drop). These are signs of Cauda Equina Syndrome. Check out <a href=\"/blogs/10-signs-you-need-a-spine-surgeon\">signs you need a spine surgeon</a>."
      },
      {
        question: "How do I relieve lower back pain fast?",
        answer: "Use <strong>anti-inflammatories (NSAIDs)</strong> and apply heat. Gentle walking helps. Avoid bed rest, which can cause muscles to tighten further."
      },
      {
        question: "Why does my lower back hurt when I wake up?",
        answer: "Morning pain is often due to <strong>disc swelling overnight</strong> or an unsupportive mattress. It usually improves after moving around for 30 minutes."
      },
      {
        question: "Is a firm mattress better for back pain?",
        answer: "Not always. A <strong>medium-firm mattress</strong> is generally best as it supports the spine's natural curve while providing pressure relief for hips and shoulders."
      },
      {
        question: "Can stress cause lower back pain?",
        answer: "<strong>Yes.</strong> Stress causes muscle tension and increases pain sensitivity. Chronic stress is a significant contributor to persistent back pain."
      }
    ],
    "sciatica": [
      {
        question: "Is sciatica a condition or a symptom?",
        answer: "Sciatica is a <strong>symptom, not a disease</strong>. It refers to pain along the sciatic nerve, caused by an underlying issue like a <a href=\"/conditions/lumbar-herniated-disc\">herniated disc</a> or spinal stenosis."
      },
      {
        question: "How long does sciatica usually last?",
        answer: "Acute sciatica usually resolves in <strong>4 to 6 weeks</strong>. Chronic sciatica persisting longer than 3 months may require injections or surgery."
      },
      {
        question: "What is the best stretch for sciatica?",
        answer: "The <strong>Piriformis Stretch</strong> (Figure-4 stretch) is effective if the muscle is tight. Nerve glides (flossing) also help mobilize the nerve."
      },
      {
        question: "Can sciatica affect both legs?",
        answer: "<strong>Yes (Bilateral Sciatica).</strong> This is rarer and can indicate central spinal stenosis or cauda equina syndrome, which requires urgent evaluation."
      },
      {
        question: "Does walking help sciatica?",
        answer: "<strong>Generally, yes.</strong> Walking helps reduce inflammation. However, if walking significantly increases leg pain (neurogenic claudication), it may suggest <a href=\"/conditions/spinal-stenosis\">spinal stenosis</a>."
      }
    ],
    "coccydynia": [
      {
        question: "What causes tailbone pain (coccydynia)?",
        answer: "Common causes include <strong>trauma (falls), prolonged sitting on hard surfaces</strong>, or childbirth. Sometimes the cause is unknown (idiopathic)."
      },
      {
        question: "How do you treat a bruised tailbone?",
        answer: "Use a <strong>doughnut or wedge cushion</strong> to offload pressure when sitting. Ice, NSAIDs, and avoiding sitting for long periods allow it to heal."
      },
      {
        question: "Can the tailbone be removed?",
        answer: "<strong>Yes (<a href=\"/treatments/coccygectomy-tailbone-removal-surgery\">Coccygectomy</a>).</strong> If chronic pain persists despite months of conservative care, surgical removal of the coccyx is highly effective for relief."
      },
      {
        question: "How long does tailbone pain last?",
        answer: "Acute pain heals in weeks. <strong>Chronic Coccydynia</strong> can last months or years without treatment. Injections (<a href=\"/treatments/impar-block-treatment\">Ganglion Impar Block</a>) can break the pain cycle."
      },
      {
        question: "Is cycling bad for tailbone pain?",
        answer: "<strong>Yes.</strong> Cycling puts direct pressure on the coccyx. It should be avoided until the pain has completely resolved."
      }
    ],
    "failed-back-surgery-syndrome": [
      {
        question: "Why does back surgery fail?",
        answer: "Causes include <strong>improper diagnosis, failure to fuse (pseudarthrosis), scar tissue formation</strong>, or new problems at adjacent levels (Adjacent Segment Disease)."
      },
      {
        question: "Can failed back surgery be fixed?",
        answer: "<strong>Yes.</strong> <a href=\"/treatments/revision-spinal-surgery\">Revision surgery</a> can correct technical issues. If structural correction isn't possible, <strong>Spinal Cord Stimulation (SCS)</strong> is an effective option for pain control."
      },
      {
        question: "What are the symptoms of FBSS?",
        answer: "Symptoms include <strong>persistent or new leg pain</strong>, return of original symptoms, or reliance on high doses of pain medication after recovery should have finished."
      },
      {
        question: "Is revision surgery riskier?",
        answer: "Yes, revision surgery is more complex due to <strong>scar tissue</strong>. It requires an experienced surgeon to navigate the altered anatomy safely."
      },
      {
        question: "What non-surgical treatments help FBSS?",
        answer: "Treatments include <strong>neuromodulation (SCS), targeted rehabilitation exercises</strong>, and radiofrequency ablation to manage pain without further open surgery."
      }
    ],
    "foraminal-stenosis": [
      {
        question: "What is the difference between central and foraminal stenosis?",
        answer: "<strong>Central stenosis</strong> narrows the main canal (cord). <strong>Foraminal stenosis</strong> narrows the side exits (foramen) where nerve roots leave, causing specific nerve pain (radiculopathy)."
      },
      {
        question: "Can foraminal stenosis be treated without fusion?",
        answer: "<strong>Yes.</strong> A minimally invasive <strong><a href=\"/treatments/endoscopic-foraminotomy-surgery\">Foraminotomy</a></strong> can shave away bone spurs to widen the exit path for the nerve, preserving spinal motion."
      },
      {
        question: "What exercises help foraminal stenosis?",
        answer: "<strong>Flexion exercises</strong> (bending forward) open the foramen and relieve pressure. Avoid excessive extension (leaning back) which closes the space."
      },
      {
        question: "Does foraminal stenosis cause foot drop?",
        answer: "<strong>It can.</strong> Severe compression of the L4 or L5 nerve root in the foramen can lead to weakness in lifting the foot (foot drop)."
      },
      {
        question: "How is foraminal stenosis diagnosed?",
        answer: "It is best seen on an <strong>MRI or CT scan</strong>. Symptoms often include pain that worsens when standing and improves when sitting or bending forward."
      }
    ],
    "hip-impingement": [
      {
        question: "What is Femoroacetabular Impingement (FAI)?",
        answer: "FAI is a condition where the <strong>bones of the hip are misshapen</strong> (Cam or Pincer lesions), causing them to rub against each other and damage the joint."
      },
      {
        question: "Does hip impingement require surgery?",
        answer: "Not always. PT helps stabilize the hip. <strong><a href=\"/treatments/hip-arthroscopy-treatment\">Arthroscopic surgery</a></strong> is recommended if pain persists or if the impingement is tearing the labrum."
      },
      {
        question: "Can hip impingement cause back pain?",
        answer: "<strong>Yes.</strong> Restricted hip motion often forces the lower back to compensate, leading to secondary lumbar strain and pain."
      },
      {
        question: "Does FAI lead to arthritis?",
        answer: "<strong>Yes.</strong> Untreated impingement causes repetitive damage to the cartilage and labrum, significantly increasing the risk of early osteoarthritis."
      },
      {
        question: "What is the recovery for hip impingement surgery?",
        answer: "Arthroscopy recovery takes <strong>3 to 4 months</strong> for full return to sports. Crutches are used for 2-4 weeks to protect the repaired labrum."
      }
    ],
    "loose-bodies": [
      {
        question: "What are 'loose bodies' in a joint?",
        answer: "Loose bodies are <strong>fragments of bone or cartilage</strong> that break off and float freely in the joint fluid, often causing mechanical symptoms."
      },
      {
        question: "How do you remove loose bodies?",
        answer: "They are removed via <strong>Arthroscopy</strong>. It is a minimally invasive procedure where a camera and grasper are inserted to wash out the floating fragments. See <a href=\"/treatments/arthroscopic-knee-surgery\">knee arthroscopy</a> or <a href=\"/treatments/hip-arthroscopy-treatment\">hip arthroscopy</a>."
      },
      {
        question: "What does a loose body feel like?",
        answer: "Patients feel a <strong>sudden locking or catching</strong> of the joint, like a pebble in a shoe. The joint may get stuck and then suddenly click free."
      },
      {
        question: "Do loose bodies grow?",
        answer: "<strong>They can.</strong> Loose bodies are nourished by joint fluid and can increase in size over time, causing more damage to the cartilage."
      },
      {
        question: "What causes loose bodies?",
        answer: "Causes include <strong>trauma (chipped bone), osteoarthritis</strong>, or conditions like Synovial Chondromatosis (where the lining grows abnormal cartilage)."
      }
    ],
"neck-pain": [
      {
        question: "When is neck pain a medical emergency?",
        answer: "Seek care if neck pain follows trauma, or is accompanied by <strong>severe headache, fever, arm weakness, or loss of coordination</strong>."
      },
      {
        question: "What is 'text neck'?",
        answer: "Text neck is strain caused by <strong>looking down at phones</strong> for prolonged periods. This forward head posture doubles the load on the cervical spine."
      },
      {
        question: "How long does a stiff neck last?",
        answer: "Acute stiffness usually resolves in <strong>a few days to a week</strong>. Gentle stretching and heat help. If it lasts >2 weeks, check for structural issues."
      },
      {
        question: "Can stress cause neck pain?",
        answer: "<strong>Yes.</strong> Stress causes people to unconsciously hunch shoulders and tighten jaw muscles, leading to chronic neck tension and headaches."
      },
      {
        question: "Is a firm pillow better for neck pain?",
        answer: "Not necessarily. You need a supportive pillow that keeps the <strong>neck aligned with the spine</strong>. A contoured cervical pillow is often best for side/back sleepers."
      }
    ],
"pseudarthrosis-revision-surgery": [
      {
        question: "What is spinal pseudarthrosis?",
        answer: "Pseudarthrosis is a <strong>failed fusion</strong>—the bone graft did not grow to connect the vertebrae, creating a painful 'false joint' with motion."
      },
      {
        question: "How do you treat pseudarthrosis?",
        answer: "It requires <strong><a href=\"/treatments/revision-spinal-surgery\">revision surgery</a></strong> to clean the site, apply new bone graft (often with BMP), and typically replace/upgrade the hardware for better stability."
      },
      {
        question: "What are the signs of pseudarthrosis?",
        answer: "Signs include <strong>persistent back pain</strong> that never went away after surgery, or clicking/popping sounds from the hardware."
      },
      {
        question: "Why did my spinal fusion fail?",
        answer: "Risk factors include <strong>smoking (nicotine inhibits bone growth)</strong>, diabetes, steroid use, or excessive motion at the surgical site during healing."
      },
      {
        question: "Is revision surgery successful?",
        answer: "<strong>Yes</strong>, but it is more complex. Using advanced biologics (stem cells/BMP) and stricter post-op protocols improves the success rate of the second attempt."
      }
    ],
    "shoulder-arthritis": [
      {
        question: "What are the symptoms of shoulder arthritis?",
        answer: "Symptoms include <strong>deep joint pain, grinding (crepitus)</strong>, and progressive loss of range of motion, making it hard to reach overhead."
      },
      {
        question: "Anatomic vs. Reverse Shoulder Replacement?",
        answer: "<strong>Anatomic</strong> mimics nature (ball on arm). <strong><a href=\"/treatments/resurfacing-shoulder-replacement\">Reverse replacement</a></strong> switches them (ball on socket) and is used when the rotator cuff is torn, relying on the deltoid muscle."
      },
      {
        question: "How long does a shoulder replacement last?",
        answer: "Modern implants typically last <strong>15 to 20 years</strong>. Longevity depends on patient activity level and implant technology."
      },
      {
        question: "Can shoulder arthritis be treated without surgery?",
        answer: "Early stages are managed with <strong>NSAIDs, targeted exercises, and steroid injections</strong>. Avoid heavy lifting to slow progression."
      },
      {
        question: "Is shoulder replacement painful?",
        answer: "Post-op pain is managed with nerve blocks. <strong>Long-term, it is very effective at eliminating arthritis pain</strong>, often more so than knee replacement."
      }
    ],
    "shoulder-tendonitis": [
      {
        question: "How long does shoulder tendonitis take to heal?",
        answer: "Mild cases heal in <strong>2-4 weeks</strong>. Chronic tendonitis (tendinosis) can take months. Rest and avoiding overhead activity are crucial."
      },
      {
        question: "Is heat or ice better for tendonitis?",
        answer: "<strong>Ice</strong> is best for acute pain. <strong>Heat</strong> helps chronic stiffness. <strong>Ultrasound therapy</strong> and massage also help increase blood flow to the tendon."
      },
      {
        question: "What causes shoulder impingement?",
        answer: "Impingement occurs when the <strong>rotator cuff catches on the acromion bone</strong> spur, causing inflammation (tendonitis). Poor posture contributes to this."
      },
      {
        question: "Can PRP help shoulder tendonitis?",
        answer: "<strong>Yes.</strong> PRP (<a href=\"/treatments/stem-cell-treatment\">Platelet-Rich Plasma</a>) injections deliver growth factors to the tendon, stimulating healing in chronic cases where standard treatments fail."
      },
      {
        question: "What exercises fix shoulder tendonitis?",
        answer: "Exercises focusing on <strong>scapular stabilization and rotator cuff strengthening</strong> (internal/external rotation) help correct the mechanics causing the irritation."
      }
    ],
    "snapping-hip-syndrome": [
      {
        question: "What causes snapping hip syndrome?",
        answer: "It is caused by a <strong>tight tendon/muscle sliding over a hip bone</strong>. Usually the IT band snapping over the greater trochanter (outer hip)."
      },
      {
        question: "Is snapping hip syndrome dangerous?",
        answer: "<strong>No</strong>, but it can be painful and lead to bursitis. If painless, it usually requires no treatment."
      },
      {
        question: "How do you stop your hip from snapping?",
        answer: "<strong>Stretching is key.</strong> Stretching the IT band, hip flexors, and glutes usually resolves the tightness causing the snap. PT is highly effective."
      },
      {
        question: "Does snapping hip require surgery?",
        answer: "<strong>Rarely.</strong> Surgery is only for painful, refractory cases to lengthen the tight tendon or remove cartilage debris if the snapping is internal."
      },
      {
        question: "Can I run with snapping hip?",
        answer: "Yes, if painless. If painful, reduce mileage and focus on stretching. <strong>Running on banked surfaces</strong> may aggravate it."
      }
    ],
    "spinal-bone-spurs": [
      {
        question: "Do bone spurs always cause pain?",
        answer: "<strong>No.</strong> Many people have spurs (osteophytes) with no symptoms. They only cause pain if they pinch a nerve or the spinal cord."
      },
      {
        question: "Can bone spurs be dissolved?",
        answer: "<strong>No.</strong> Bone spurs are hard bone. They cannot be dissolved by supplements or diet. They must be physically removed if they cause issues."
      },
      {
        question: "How are spinal bone spurs removed?",
        answer: "They are removed via <strong>Decompression Surgery</strong> (<a href=\"/treatments/lumbar-laminectomy-surgery\">Laminectomy</a> or <a href=\"/treatments/endoscopic-foraminotomy-surgery\">Foraminotomy</a>), where the surgeon carefully burrs away the excess bone pressing on nerves."
      },
      {
        question: "What causes bone spurs to grow?",
        answer: "They are the body's <strong>response to friction and instability</strong>. As discs wear out, the body grows extra bone to try and stabilize the joint."
      },
      {
        question: "Can bone spurs grow back after surgery?",
        answer: "<strong>It is possible</strong> over many years if instability remains, but they typically grow very slowly. Fusion surgery prevents regrowth by stopping motion."
      }
    ],
    "spinal-stenosis": [
      {
        question: "What relieves spinal stenosis pain?",
        answer: "<strong>Leaning forward</strong> (like over a shopping cart) relieves pain because it opens the spinal canal. Sitting also provides relief."
      },
      {
        question: "Is walking good for spinal stenosis?",
        answer: "Yes, but tolerate it only to your limit. <strong>Stationary cycling</strong> is often better because the leaned-forward position is more comfortable than upright walking."
      },
      {
        question: "How fast does spinal stenosis progress?",
        answer: "It is generally <strong>slow and gradual</strong>. Symptoms may remain stable for years. Sudden worsening is rare and warrants immediate checks."
      },
      {
        question: "What is the newest treatment for spinal stenosis?",
        answer: "<strong>Minimally invasive <a href=\"/treatments/lumbar-decompression\">decompression</a></strong> and interspinous spacers (devices placed between vertebrae) are modern alternatives to major fusion surgery."
      },
      {
        question: "Can spinal stenosis cause permanent damage?",
        answer: "<strong>Yes.</strong> Severe, untreated stenosis can damage the spinal cord (myelopathy), leading to permanent balance issues and incontinence."
      }
    ],
    "spine-deformities": [
      {
        question: "What are the types of spine deformities?",
        answer: "Common types include <strong><a href=\"/conditions/adult-degenerative-scoliosis\">Scoliosis</a></strong> (sideways curve), <strong><a href=\"/conditions/kyphosis\">Kyphosis</a></strong> (forward hunch), and <strong>Lordosis</strong> (excessive swayback)."
      },
      {
        question: "Can adult spine deformities be fixed?",
        answer: "<strong>Yes.</strong> Surgery can reconstruct the spine. It is a major procedure involving osteotomies (bone cuts) and long-segment fusion."
      },
      {
        question: "Do spine deformities affect organs?",
        answer: "Severe curves can <strong>compress the lungs and heart</strong>, reducing breathing capacity. This is a primary reason for surgical correction in severe cases."
      },
      {
        question: "Is surgery for spine deformity safe?",
        answer: "It is complex but safer than ever with <strong>computer navigation and neuromonitoring</strong>. It significantly improves quality of life for severe cases."
      },
      {
        question: "What is the recovery for deformity surgery?",
        answer: "It is a long recovery, often <strong>6 to 12 months</strong> for full bone healing. Patients walk immediately but must avoid bending/twisting for months."
      }
    ],
    "synovitis": [
      {
        question: "What is synovitis?",
        answer: "Synovitis is the <strong>inflammation of the synovial membrane</strong> (joint lining), causing pain and swelling. It is seen in arthritis and overuse injuries."
      },
      {
        question: "How is synovitis treated?",
        answer: "Treatment includes <strong>NSAIDs, rest, and steroid injections</strong>. In conditions like RA, DMARDs are used. Persistent cases may need a Synovectomy."
      },
      {
        question: "Can synovitis heal on its own?",
        answer: "Mild cases from overuse can heal with rest. Chronic synovitis from inflammatory diseases usually requires medical management."
      },
      {
        question: "Does ice help synovitis?",
        answer: "<strong>Yes.</strong> Ice constricts blood vessels and reduces the fluid accumulation (effusion) inside the joint."
      },
      {
        question: "What is a synovectomy?",
        answer: "It is a surgery to <strong>remove the inflamed joint lining</strong>. It is typically performed <a href=\"/treatments/arthroscopic-knee-surgery\">arthroscopically</a> to preserve the joint and stop destruction."
      }
    ],
    "tingling-or-numbness-in-extremities": [
      {
        question: "When is tingling a medical emergency?",
        answer: "Call 911 if tingling is sudden and accompanied by <strong>confusion, speech slurring (stroke signs)</strong>, or loss of bowel/bladder control (Cauda Equina). See more on <a href=\"/blogs/10-signs-you-need-a-spine-surgeon\">spine emergencies</a>."
      },
      {
        question: "What vitamin deficiency causes tingling?",
        answer: "Deficiency in <strong>Vitamin B12</strong> is a common cause of peripheral neuropathy (tingling in hands/feet). Diabetes is another leading cause."
      },
      {
        question: "Can anxiety cause tingling?",
        answer: "<strong>Yes.</strong> Hyperventilation during panic attacks alters blood chemistry, causing temporary tingling in the hands and face."
      },
      {
        question: "How is neuropathy treated?",
        answer: "Treatment targets the cause (e.g., controlling blood sugar). Medications like <strong>Gabapentin or Lyrica</strong> help mask the nerve pain."
      },
      {
        question: "Does a pinched nerve cause tingling?",
        answer: "<strong>Yes.</strong> A <a href=\"/conditions/pinched-nerve\">pinched nerve</a> in the neck causes hand tingling. A pinched nerve in the back causes foot tingling. Identifying the source is key."
      }
    ],
    "herniated-disc": [
      {
        question: "What is the difference between a slipped and herniated disc?",
        answer: "They are the same. <strong>'Slipped disc' is a non-medical term</strong> for a herniated disc, where the inner gel pushes out through a tear in the outer wall."
      },
      {
        question: "Can I exercise with a herniated disc?",
        answer: "<strong>Yes, but carefully.</strong> Walking and swimming are safe. Avoid high-impact running or heavy weightlifting until symptoms subside."
      },
      {
        question: "How long does the pain last?",
        answer: "Acute pain is worst for the first <strong>1-2 weeks</strong>. Most symptoms resolve significantly by 6 weeks. Only 10% of patients require surgery."
      },
      {
        question: "Does a herniated disc show on X-ray?",
        answer: "<strong>No.</strong> X-rays show bone, not discs. An <strong>MRI is required</strong> to visualize the soft tissue herniation and nerve compression. Get a <a href=\"/find-care/free-mri-review\">free MRI review</a>."
      },
      {
        question: "What is the best sleeping position for a herniated disc?",
        answer: "Sleep on your back with a <strong>pillow under your knees</strong>, or on your side with a pillow between your legs to keep the spine neutral."
      }
    ],
    "rheumatoid-arthritis": [
      {
        question: "How does RA affect the spine?",
        answer: "RA typically affects the <strong>cervical spine (neck)</strong>, causing instability between the top vertebrae (C1-C2). This can compress the spinal cord."
      },
      {
        question: "What is the first sign of Rheumatoid Arthritis?",
        answer: "Early signs include <strong>joint stiffness in the morning</strong> lasting >30 minutes, fatigue, and symmetrical swelling in small joints (hands/feet)."
      },
      {
        question: "Can RA be cured?",
        answer: "<strong>No, but remission is possible.</strong> Early treatment with DMARDs and biologics can stop joint damage and keep patients symptom-free."
      },
      {
        question: "Is surgery common for RA?",
        answer: "Surgery is less common now due to better meds. It is used for <strong>severe joint destruction</strong> (replacements) or stabilizing the neck (fusion)."
      },
      {
        question: "Does diet affect Rheumatoid Arthritis?",
        answer: "<strong>Yes.</strong> An anti-inflammatory diet helps. Avoiding triggers like processed foods and nightshades (for some) can reduce flare frequency."
      }
    ],
    "tennis-elbow": [
      {
        question: "Do you have to play tennis to get tennis elbow?",
        answer: "<strong>No.</strong> It is caused by any repetitive gripping/wrist extension. Painters, plumbers, and typists are commonly affected."
      },
      {
        question: "How do you treat tennis elbow fast?",
        answer: "<strong>Rest and bracing</strong> are key. A counterforce brace relieves tension. Ice massage and NSAIDs reduce acute pain."
      },
      {
        question: "Does tennis elbow heal on its own?",
        answer: "<strong>Yes, but it takes time.</strong> It is a self-limiting condition that typically resolves in 6-12 months. PT accelerates recovery."
      },
      {
        question: "What is PRP for tennis elbow?",
        answer: "<strong>Platelet-Rich Plasma (PRP)</strong> injections use your blood's growth factors to jumpstart healing in chronic tendons that haven't healed with rest. Learn about <a href=\"/treatments/stem-cell-treatment\">regenerative medicine</a>."
      },
      {
        question: "Is surgery needed for tennis elbow?",
        answer: "<strong>Rarely (<5%).</strong> Surgery is only for patients with disabling pain after a year of failed conservative treatment."
      }
    ],
    "plantar-fasciitis": [
      {
        question: "Why is plantar fasciitis worse in the morning?",
        answer: "The fascia contracts overnight. The first steps stretch this tight tissue, causing micro-tears and sharp <strong>'start-up' pain</strong>."
      },
      {
        question: "Can plantar fasciitis go away on its own?",
        answer: "<strong>Yes, but it can take a year.</strong> Active treatment with stretching, orthotics, and night splints speeds up recovery significantly. Read about <a href=\"/area-of-pain/foot-pain/heel-pain-plantar-fasciitis\">heel pain treatment</a>."
      },
      {
        question: "Is walking barefoot bad for plantar fasciitis?",
        answer: "<strong>Yes.</strong> Walking barefoot lacks arch support, increasing strain on the fascia. Wear supportive shoes or sandals even indoors."
      },
      {
        question: "Do cortisone shots cure plantar fasciitis?",
        answer: "<strong>No.</strong> They provide temporary pain relief (months) to allow you to do PT, but they do not heal the tissue. Overuse can weaken the fascia."
      },
      {
        question: "Does plantar fasciitis require surgery?",
        answer: "<strong>Very rarely.</strong> Surgery (fascia release) is considered only after 12 months of aggressive non-surgical treatment has failed."
      }
    ],
    "bursitis": [
      {
        question: "How do you know if bursitis is infected?",
        answer: "<strong>Septic bursitis</strong> is red, hot, and very painful. You may have a fever. This is an emergency requiring drainage and antibiotics."
      },
      {
        question: "Can you massage bursitis?",
        answer: "<strong>Avoid direct massage</strong> on the inflamed bursa, as it increases irritation. Massaging surrounding muscles is okay."
      },
      {
        question: "How long does bursitis last?",
        answer: "With rest, acute bursitis heals in <strong>weeks</strong>. Chronic bursitis from repetitive overuse can last months without lifestyle changes."
      },
      {
        question: "Is compression good for bursitis?",
        answer: "<strong>Yes.</strong> A compression sleeve can help reduce swelling (edema) and provide support to the joint."
      },
      {
        question: "Does bursitis show on X-ray?",
        answer: "<strong>No.</strong> X-rays show bone. An ultrasound or MRI is needed to see the fluid-filled bursa sacs."
      }
    ],
    "bunions-hallux-valgus": [
      {
        question: "Can bunions be corrected without surgery?",
        answer: "<strong>No.</strong> Toe spacers and wide shoes relieve pain, but they cannot structurally realign the bone. <strong>Only surgery can remove the bunion.</strong>"
      },
      {
        question: "When should I have bunion surgery?",
        answer: "Consider surgery when <strong>pain interferes with walking</strong> or wearing shoes. Surgery for cosmetic reasons alone is generally not recommended. Learn about <a href=\"/treatments/bunion-correction-surgery\">bunion correction surgery</a>."
      },
      {
        question: "What is minimally invasive bunion surgery?",
        answer: "It uses <strong>tiny incisions</strong> and special burrs to cut and shift the bone. It offers less pain, less scarring, and faster recovery than open surgery."
      },
      {
        question: "Do bunions grow back?",
        answer: "<strong>They can (recurrence).</strong> The risk is lower with modern surgical techniques (like Lapiplasty) that address the root instability."
      },
      {
        question: "Are bunions hereditary?",
        answer: "<strong>Yes.</strong> Foot shape and mechanics are inherited. Wearing tight shoes exacerbates the problem but is rarely the sole cause."
      }
    ],
    "achilles-tendonitis": [
      {
        question: "Is heat or ice better for Achilles tendonitis?",
        answer: "<strong>Ice is best</strong> for acute pain, especially after activity. Heat can be used *before* activity to loosen the tendon."
      },
      {
        question: "Can I run with Achilles tendonitis?",
        answer: "<strong>It is risky.</strong> Running through pain can lead to a rupture. Rest or cross-train (swim/bike) until pain subsides."
      },
      {
        question: "What exercises help Achilles tendonitis?",
        answer: "<strong>Eccentric heel drops</strong> (lowering the heel slowly off a step) are the gold standard exercise to remodel and strengthen the tendon."
      },
      {
        question: "What happens if the Achilles ruptures?",
        answer: "You will feel a <strong>pop</strong> and be unable to push off. It requires immediate medical care and often surgery for active people."
      },
      {
        question: "How long does Achilles tendonitis take to heal?",
        answer: "It is slow. Mild cases take weeks; chronic cases take <strong>3-6 months</strong>. Consistency with exercises is critical."
      }
    ],
    "flat-feet": [
      {
        question: "Do flat feet need to be fixed?",
        answer: "<strong>Only if painful.</strong> Many people have flat feet with no issues. Treatment is needed if it causes arch, ankle, or knee pain."
      },
      {
        question: "Can you develop flat feet as an adult?",
        answer: "<strong>Yes (Adult Acquired Flatfoot).</strong> This is usually due to Posterior Tibial Tendon Dysfunction (PTTD), where the arch-supporting tendon stretches out."
      },
      {
        question: "Are orthotics necessary for flat feet?",
        answer: "<strong>They are very helpful.</strong> Custom orthotics support the arch and correct misalignment, reducing strain on the foot and knees."
      },
      {
        question: "Can flat feet cause back pain?",
        answer: "<strong>Yes.</strong> Poor foot alignment affects the knees and hips, which alters posture and can lead to secondary lower back pain."
      },
      {
        question: "What is flat foot reconstruction surgery?",
        answer: "It involves <strong>tendon transfers and bone cuts (osteotomies)</strong> to rebuild the arch. Recovery is long (6-12 months) but effective for severe deformity. See <a href=\"/conditions/flat-feet\">flat feet treatment options</a>."
      }
    ],
"hammer-toes": [
      {
        question: "Can hammer toes be straightened without surgery?",
        answer: "In the early <strong>flexible stage</strong>, splints and roomier shoes can stop progression. Once <strong>rigid</strong>, only surgery can straighten the bone."
      },
      {
        question: "What causes hammer toes?",
        answer: "Muscle imbalance caused by <strong>tight shoes, bunions, or high arches</strong> forces the toe to curl. Genetics also play a role."
      },
      {
        question: "What is hammer toe surgery?",
        answer: "The surgeon removes a small piece of bone to shorten the toe and inserts a <strong>pin or wire</strong> to hold it straight while it heals."
      },
      {
        question: "Can I walk after hammer toe surgery?",
        answer: "<strong>Yes, in a special shoe.</strong> You put weight on the heel. Recovery takes 4-6 weeks for the bone to knit."
      },
      {
        question: "Do hammer toes come back?",
        answer: "<strong>Recurrence is possible</strong> if the underlying cause (like a bunion or tight shoes) is not addressed."
      }
    ],
    "diabetic-foot-ulcers": [
      {
        question: "Why do diabetic ulcers not heal?",
        answer: "Healing is blocked by <strong>poor blood flow</strong> (preventing nutrients) and neuropathy (lack of feeling), which leads to continued pressure on the wound."
      },
      {
        question: "How serious is a diabetic foot ulcer?",
        answer: "<strong>Very serious.</strong> Without treatment, infection can spread to the bone (osteomyelitis), leading to amputation. Early care is vital. See <a href=\"/area-of-pain/foot-pain/diabetic-foot-ulcer-care\">ulcer care</a>."
      },
      {
        question: "How do you treat a foot ulcer?",
        answer: "Treatment involves <strong>debridement (cleaning)</strong>, offloading (special boots), and dressing changes. Vascular surgery may be needed to improve blood flow."
      },
      {
        question: "Can diabetic ulcers be prevented?",
        answer: "<strong>Yes.</strong> Daily foot checks, controlling blood sugar, and wearing <strong>diabetic shoes</strong> significantly reduce ulcer risk."
      },
      {
        question: "What does a diabetic ulcer look like?",
        answer: "It looks like a <strong>red crater or crater-like wound</strong>, often on the ball of the foot. It may be painless due to nerve damage."
      }
    ],
// Body Part Hub Page FAQs
    "spine": [
      {
        question: "When should I see an orthopedist for spine pain?",
        answer: "You should see an orthopedic spine specialist if your back or neck pain persists for more than a few weeks, worsens over time, or interferes with daily activities. <strong>Immediate evaluation is needed</strong> for severe pain after injury, progressive weakness or numbness, loss of bowel/bladder control, or pain accompanied by fever. Early consultation can help prevent conditions from worsening and may reduce the need for surgery. Book a <a href=\"/find-care/book-an-appointment\">consultation</a> for evaluation."
      },
      {
        question: "What are the treatment options for spine conditions?",
        answer: "Treatment options range from <strong>conservative approaches</strong> like targeted exercises, medications, and <a href=\"/treatments/epidural-steroid-injection\">spinal injections</a> to minimally invasive surgical procedures. Our specialists start with non-surgical treatments whenever possible. When surgery is necessary, we specialize in minimally invasive techniques like <a href=\"/treatments/lumbar-microdiscectomy-surgery\">microdiscectomy</a>, <a href=\"/treatments/lumbar-laminectomy-surgery\">laminectomy</a>, and <a href=\"/treatments/spinal-fusion\">spinal fusion</a> that offer faster recovery and less post-operative pain."
      },
      {
        question: "What is the recovery timeline after spine surgery?",
        answer: "Recovery timelines vary depending on the procedure. <strong>Minimally invasive spine surgeries</strong> typically allow patients to return to light activities within 2-4 weeks, with full recovery taking 3-6 months. More complex procedures like spinal fusion may require 6-12 months for complete healing. Most patients experience significant pain relief within the first few weeks after surgery."
      },
      {
        question: "Do I need an MRI for spine pain diagnosis?",
        answer: "An MRI is often essential for accurately diagnosing spine conditions, as it provides detailed images of the spinal cord, nerves, discs, and surrounding structures. <strong>Our practice offers complimentary <a href=\"/find-care/free-mri-review\">MRI reviews</a></strong> to help patients understand their condition. An MRI is particularly important when symptoms suggest nerve compression, when conservative treatments haven't helped, or when surgery is being considered."
      },
      {
        question: "What's the difference between surgical and non-surgical spine treatment?",
        answer: "<strong>Non-surgical treatments</strong> include targeted exercises, medications, spinal injections, and lifestyle modifications—these are always tried first when appropriate. Surgical treatment becomes an option when conservative methods haven't provided relief, when there's progressive neurological deficit, or when structural problems require correction. Our minimally invasive surgical techniques offer significant advantages including smaller incisions, less muscle damage, and faster recovery."
      }
    ],
    "neck": [
      {
        question: "When should I see an orthopedist for neck pain?",
        answer: "See an orthopedic specialist if neck pain lasts more than a week, especially with radiating arm pain, numbness, or weakness. <strong>Immediate evaluation is needed</strong> after trauma, with severe pain, or progressive neurological symptoms. Early consultation can prevent conditions from worsening and may reduce the need for surgery. Our practice offers complimentary <a href=\"/find-care/free-mri-review\">MRI reviews</a> to help diagnose cervical spine conditions."
      },
      {
        question: "What are the treatment options for neck conditions?",
        answer: "Treatment options range from <strong>conservative approaches</strong> like targeted exercises, medications, and cervical injections to minimally invasive surgical procedures. We start with non-surgical treatments including <a href=\"/treatments/epidural-steroid-injection\">epidural steroid injections</a> and facet joint injections. When surgery is necessary, we specialize in minimally invasive techniques like <a href=\"/treatments/acdf-surgery\">ACDF</a> and <a href=\"/treatments/cervical-disc-replacement\">cervical disc replacement</a> that offer faster recovery and excellent outcomes."
      },
      {
        question: "What is the recovery timeline after neck surgery?",
        answer: "Recovery after minimally invasive cervical spine surgery typically allows <strong>return to light activities within 2-4 weeks</strong>, with most patients experiencing significant pain relief within the first few weeks. Full recovery and return to all activities usually takes 3-6 months, depending on the procedure. Most patients can resume driving and light work within 2-3 weeks."
      },
      {
        question: "Can neck problems cause headaches?",
        answer: "<strong>Yes, cervicogenic headaches are common</strong> with neck conditions. They typically start at the base of the skull and radiate to the forehead or behind the eyes due to muscle tension and nerve irritation from conditions like <a href=\"/conditions/cervical-herniated-disc\">cervical herniated discs</a> or <a href=\"/conditions/cervical-spinal-stenosis\">cervical stenosis</a>. Treating the underlying neck condition often resolves the headaches."
      },
      {
        question: "What is 'text neck' and how do I prevent it?",
        answer: "<strong>Text neck</strong> is strain caused by looking down at phones for prolonged periods. This forward head posture doubles the load on the cervical spine, potentially causing chronic pain and accelerating disc degeneration. Prevention includes raising devices to eye level, taking frequent breaks, and strengthening neck muscles through targeted exercises."
      }
    ],
    "back": [
      {
        question: "When should I see an orthopedist for back pain?",
        answer: "See an orthopedic spine specialist if back pain lasts more than a few weeks, especially if it interferes with daily activities or sleep. <strong>Immediate evaluation is needed</strong> after trauma, with severe pain, progressive weakness/numbness, or loss of bowel/bladder control. We offer complimentary <a href=\"/find-care/free-mri-review\">MRI reviews</a> to help diagnose back conditions accurately. Book a <a href=\"/find-care/book-an-appointment\">consultation</a> for evaluation."
      },
      {
        question: "What are the red flags for lower back pain?",
        answer: "Seek emergency care if you have <strong>loss of bowel/bladder control, saddle anesthesia</strong> (numbness in groin area), fever, or sudden severe weakness (foot drop). These are signs of Cauda Equina Syndrome which requires immediate surgery. Other concerning signs include unexplained weight loss, pain that worsens at night, or pain that doesn't improve with rest."
      },
      {
        question: "What is the difference between acute and chronic back pain?",
        answer: "<strong>Acute pain</strong> is sudden and lasts less than 6 weeks, usually from muscle strain. <strong>Chronic pain</strong> lasts more than 3 months and is often linked to structural issues like <a href=\"/conditions/degenerative-disc-disease\">degenerative disc disease</a>, <a href=\"/conditions/lumbar-herniated-disc\">herniated discs</a>, or <a href=\"/conditions/spinal-stenosis\">spinal stenosis</a>. Treatment approaches differ significantly between acute and chronic conditions."
      },
      {
        question: "How do I know if my back pain is muscular or spinal?",
        answer: "Muscular pain is usually localized and sore to the touch. <strong>Spinal (disc/nerve) pain</strong> is often deep, sharp, and radiates into the buttocks or legs—like <a href=\"/conditions/sciatica\">sciatica</a>. Pain that worsens with sitting or bending forward suggests disc involvement, while pain during extension (leaning back) suggests facet joint problems. An MRI can definitively identify the source."
      },
      {
        question: "What are the best exercises for lower back pain?",
        answer: "Core strengthening exercises like <strong>planks, bridges, and bird-dogs</strong> help stabilize the spine. Stretching the hamstrings and hip flexors also relieves back tension. Walking and swimming are excellent low-impact options. Avoid exercises that cause pain. Our specialists can recommend appropriate exercises during your consultation."
      }
    ],
    "shoulder": [
      {
        question: "When should I see an orthopedist for shoulder pain?",
        answer: "See an orthopedic specialist if shoulder pain lasts more than a few weeks, especially if it interferes with sleep, work, or daily activities. <strong>Immediate evaluation is needed</strong> after trauma, with severe pain, complete inability to move the shoulder, or visible deformity. Early consultation can prevent conditions from worsening and may reduce the need for surgery."
      },
      {
        question: "What are the common causes of shoulder pain?",
        answer: "Common causes include <strong><a href=\"/conditions/rotator-cuff-tear\">rotator cuff tears</a></strong>, shoulder impingement, <a href=\"/conditions/shoulder-arthritis\">arthritis</a>, frozen shoulder (adhesive capsulitis), <a href=\"/conditions/labral-tears\">labral tears</a>, and bursitis. Pain at night often indicates rotator cuff problems, while pain with overhead reaching suggests impingement or tears."
      },
      {
        question: "Can a rotator cuff tear heal without surgery?",
        answer: "<strong>Partial tears can heal</strong> or become asymptomatic with targeted exercises and regenerative injections like PRP. However, <strong>full-thickness tears typically do not heal</strong> on their own and usually require <a href=\"/treatments/rotator-cuff-repair-surgery\">surgical repair</a> to restore strength, especially in active individuals."
      },
      {
        question: "What is the recovery timeline after shoulder surgery?",
        answer: "Recovery after arthroscopic shoulder surgery typically involves a <strong>sling for 4-6 weeks</strong>, with gradual return to activities over 3-6 months. Rotator cuff repairs may require 4-6 months for full recovery, while shoulder replacement recovery usually takes 3-6 months. Most patients experience significant pain relief within the first few weeks."
      },
      {
        question: "What exercises should I avoid with shoulder pain?",
        answer: "Avoid <strong>overhead pressing, heavy lifting, and repetitive reaching</strong> until evaluated. Exercises that cause sharp pain should be stopped immediately. Swimming and certain yoga poses may aggravate shoulder conditions. Once diagnosed, our specialists can recommend a safe strengthening program targeting your specific condition."
      }
    ],
    "hip": [
      {
        question: "When should I see an orthopedist for hip pain?",
        answer: "See an orthopedic specialist if hip pain lasts more than a few weeks, especially if it interferes with walking, sleep, or daily activities. <strong>Immediate evaluation is needed</strong> after trauma, with severe pain, inability to bear weight, or visible deformity. Early consultation can prevent conditions from worsening. We offer complimentary imaging reviews."
      },
      {
        question: "What causes hip pain that radiates to the groin?",
        answer: "Hip joint problems typically cause <strong>groin pain rather than outer hip pain</strong>. Common causes include <a href=\"/conditions/hip-impingement\">hip impingement</a>, <a href=\"/conditions/labral-tears\">labral tears</a>, <a href=\"/conditions/osteoarthritis\">osteoarthritis</a>, and <a href=\"/conditions/hip-dysplasia\">hip dysplasia</a>. Outer hip pain often indicates <a href=\"/conditions/trochanteric-bursitis\">bursitis</a> or IT band syndrome."
      },
      {
        question: "When is hip replacement necessary?",
        answer: "Hip replacement is recommended when <strong>pain interferes with daily life</strong>—sleep, walking, climbing stairs—and conservative treatments like injections and therapy no longer provide relief. <a href=\"/treatments/total-hip-replacement\">Modern hip replacements</a> last 15-25 years and dramatically improve quality of life."
      },
      {
        question: "What is the recovery timeline after hip surgery?",
        answer: "Recovery after <a href=\"/treatments/hip-arthroscopy-treatment\">hip arthroscopy</a> typically allows return to light activities within 2-4 weeks, with full recovery taking 3-6 months. <strong>Hip replacement recovery</strong> usually involves walking with assistance within a day, driving within 4-6 weeks, and return to most activities within 3-6 months."
      },
      {
        question: "Can hip problems cause back pain?",
        answer: "<strong>Yes, hip-spine syndrome</strong> is common. Restricted hip motion forces the lower back to compensate, leading to secondary lumbar strain. Conversely, spine problems can cause referred pain to the hip. A thorough evaluation by an orthopedic specialist can identify which joint is the primary source."
      }
    ],
    "knee": [
      {
        question: "When should I see an orthopedist for knee pain?",
        answer: "See an orthopedic specialist if knee pain lasts more than a few weeks, especially if it interferes with walking, sports, or daily activities. <strong>Immediate evaluation is needed</strong> after trauma, with severe pain, inability to bear weight, visible deformity, or if the knee locks. Early consultation can prevent conditions from worsening."
      },
      {
        question: "What are the common causes of knee pain?",
        answer: "Common causes include <strong><a href=\"/conditions/torn-meniscus\">meniscal tears</a></strong>, <a href=\"/conditions/acl-injury\">ACL injuries</a>, <a href=\"/conditions/osteoarthritis\">osteoarthritis</a>, patellar tendonitis, and bursitis. Pain location helps identify the cause—inner pain often suggests meniscus, front pain suggests patella issues, and diffuse pain with swelling suggests arthritis."
      },
      {
        question: "Do all ACL tears require surgery?",
        answer: "<strong>No.</strong> Sedentary patients or those with partial tears may recover with bracing and targeted strengthening exercises. However, athletes and active individuals usually need <a href=\"/treatments/acl-reconstruction-surgery\">ACL reconstruction</a> to restore stability. Without surgery, the unstable knee may develop early arthritis."
      },
      {
        question: "What is the recovery timeline after knee surgery?",
        answer: "Recovery after <a href=\"/treatments/arthroscopic-knee-surgery\">knee arthroscopy</a> typically allows return to light activities within 2-4 weeks, with full recovery taking 3-6 months. <strong>Knee replacement</strong> recovery involves walking with assistance within a day, driving within 4-6 weeks, and return to most activities within 3-6 months. ACL reconstruction may require 6-9 months for full return to sports."
      },
      {
        question: "Can a torn meniscus heal without surgery?",
        answer: "Tears in the <strong>outer 'red zone'</strong> (good blood supply) can heal on their own with rest and targeted exercises. Tears in the inner 'white zone' lack blood flow and usually require <a href=\"/treatments/meniscus-repair-surgery\">surgical treatment</a>—either repair (longer recovery, better joint health) or partial removal (faster recovery)."
      }
    ],
    "hand-wrist-elbow": [
      {
        question: "When should I see an orthopedist for hand, wrist, or elbow pain?",
        answer: "See an orthopedic specialist if hand, wrist, or elbow pain lasts more than a few weeks, especially if it interferes with work, hobbies, sports, or daily activities. <strong>Immediate evaluation is needed</strong> after trauma, with severe pain, inability to move the affected area, visible deformity, or loss of sensation. Early consultation is especially important for persistent numbness or tingling."
      },
      {
        question: "What are the first signs of carpal tunnel syndrome?",
        answer: "The first signs are <strong>numbness or tingling in the thumb, index, and middle fingers</strong>, especially at night or when holding a phone or steering wheel. Symptoms may progress to weakness in grip strength and difficulty with fine motor tasks. See <a href=\"/conditions/carpal-tunnel-syndrome\">carpal tunnel syndrome</a> for more information."
      },
      {
        question: "What is the difference between tennis elbow and golfer's elbow?",
        answer: "<strong>Tennis elbow</strong> (lateral epicondylitis) causes pain on the outside of the elbow from repetitive wrist extension. <strong>Golfer's elbow</strong> (medial epicondylitis) causes pain on the inside from repetitive wrist flexion and gripping. Both are overuse injuries that respond well to conservative treatment. See <a href=\"/conditions/tennis-elbow\">tennis elbow</a> information."
      },
      {
        question: "Can carpal tunnel or cubital tunnel syndrome heal without surgery?",
        answer: "Mild cases can improve with <strong>rest, splinting, and ergonomic changes</strong>. Corticosteroid injections provide temporary relief. However, if nerve compression is significant or symptoms persist despite conservative care, surgery such as <a href=\"/treatments/carpal-tunnel-release\">carpal tunnel release</a> or <a href=\"/treatments/cubital-tunnel-surgery\">cubital tunnel surgery</a> prevents permanent nerve damage."
      },
      {
        question: "What is the recovery timeline after hand, wrist, or elbow surgery?",
        answer: "Recovery varies by procedure. <strong>Carpal tunnel release and trigger finger release</strong> typically allow return to light activities within 1-2 weeks, with full recovery taking 4-6 weeks. <a href=\"/treatments/tennis-elbow-surgery\">Tennis elbow surgery</a> and <a href=\"/treatments/golfers-elbow-surgery\">golfer's elbow surgery</a> may require 3-6 months for full recovery. More complex procedures like fracture fixation may require 6-12 weeks."
      },
      {
        question: "What causes trigger finger?",
        answer: "<strong>Trigger finger</strong> occurs when inflammation narrows the tendon sheath, causing the tendon to catch when bending the finger. Risk factors include repetitive gripping, diabetes, and rheumatoid arthritis. Treatment includes splinting, steroid injections, and minimally invasive <a href=\"/treatments/trigger-finger-release\">trigger finger release surgery</a> if conservative measures fail."
      },
      {
        question: "When is surgery needed for elbow conditions?",
        answer: "Surgery is considered after <strong>6-12 months of failed conservative treatment</strong>. Options include <a href=\"/treatments/tennis-elbow-surgery\">tennis/golfer's elbow surgery</a>, <a href=\"/treatments/cubital-tunnel-surgery\">cubital tunnel release</a>, <a href=\"/treatments/elbow-arthroscopy\">elbow arthroscopy</a>, and fracture fixation."
      }
    ],
    "foot-ankle": [
      {
        question: "When should I see an orthopedist for foot or ankle pain?",
        answer: "See an orthopedic specialist if foot or ankle pain lasts more than a few weeks, especially if it interferes with walking, standing, or daily activities. <strong>Immediate evaluation is needed</strong> after trauma, with severe pain, inability to bear weight, visible deformity, or loss of sensation. Early consultation can prevent conditions from worsening."
      },
      {
        question: "Why is plantar fasciitis worse in the morning?",
        answer: "The plantar fascia contracts overnight. The first steps stretch this tight tissue, causing micro-tears and <strong>sharp 'start-up' pain</strong>. Treatment includes stretching before getting up, night splints, supportive shoes, and orthotics. See <a href=\"/conditions/plantar-fasciitis\">plantar fasciitis</a> treatment options."
      },
      {
        question: "Can bunions be corrected without surgery?",
        answer: "<strong>No.</strong> Toe spacers and wide shoes relieve pain but cannot structurally realign the bone. Only <a href=\"/treatments/bunion-correction-surgery\">bunion surgery</a> can remove the bunion. Modern minimally invasive techniques offer faster recovery and less scarring than traditional open surgery."
      },
      {
        question: "What is the recovery timeline after ankle surgery?",
        answer: "Recovery after <a href=\"/treatments/ankle-arthroscopy-minimally-invasive-surgery\">ankle arthroscopy</a> typically allows walking in a boot within 1-2 weeks, with full sports return in 6-12 weeks. <strong>Bunion and hammertoe corrections</strong> allow light activities in 4-6 weeks, full recovery in 3-6 months. <a href=\"/treatments/ankle-replacement-surgery\">Ankle replacement</a> requires 6-12 months for full recovery."
      },
      {
        question: "Can flat feet cause other problems?",
        answer: "<strong>Yes.</strong> Poor foot alignment affects the knees and hips, which alters posture and can lead to secondary knee, hip, and lower back pain. Custom orthotics support the arch and correct alignment, reducing strain throughout the body. See <a href=\"/conditions/flat-feet\">flat feet</a> treatment options."
      }
    ],
    "trigger-finger": [
      {
        question: "What causes trigger finger?",
        answer: "<strong>Trigger finger</strong> is caused by inflammation and narrowing of the tendon sheath in the finger. This makes it difficult for the flexor tendon to glide smoothly, causing catching, locking, or popping. Risk factors include repetitive gripping, diabetes, and rheumatoid arthritis."
      },
      {
        question: "Can trigger finger go away on its own?",
        answer: "Mild cases may improve with <strong>rest and activity modification</strong>, but most cases require treatment. Without intervention, trigger finger often worsens over time, with increased catching and eventual locking of the finger in a bent position."
      },
      {
        question: "How effective are cortisone injections for trigger finger?",
        answer: "<strong>Corticosteroid injections are highly effective</strong>, providing relief in up to 90% of patients after one or two injections. They work by reducing inflammation in the tendon sheath, allowing the tendon to glide freely again."
      },
      {
        question: "What happens during trigger finger release surgery?",
        answer: "<a href=\"/treatments/trigger-finger-release\">Trigger finger release</a> is a <strong>quick outpatient procedure</strong> performed under local anesthesia. The surgeon makes a small incision at the base of the finger and releases the constricted tendon sheath, allowing the tendon to move freely."
      },
      {
        question: "How long is recovery after trigger finger surgery?",
        answer: "Recovery is typically <strong>quick—most patients can use their hand for light activities within a few days</strong>. Finger stiffness is normal initially and improves with gentle exercises. Full recovery and return to all activities usually occurs within 4-6 weeks."
      }
    ],
    "cubital-tunnel-syndrome": [
      {
        question: "What is the difference between carpal tunnel and cubital tunnel syndrome?",
        answer: "<a href=\"/conditions/carpal-tunnel-syndrome\">Carpal tunnel syndrome</a> compresses the <strong>median nerve at the wrist</strong>, causing numbness in the thumb, index, and middle fingers. <strong>Cubital tunnel syndrome</strong> compresses the ulnar nerve at the elbow, causing numbness in the ring and small fingers."
      },
      {
        question: "Why does cubital tunnel syndrome get worse at night?",
        answer: "Symptoms often worsen at night because we naturally <strong>sleep with bent elbows</strong>, which stretches and compresses the ulnar nerve. Using a night splint to keep the elbow straighter can significantly improve nighttime symptoms."
      },
      {
        question: "Can cubital tunnel syndrome heal without surgery?",
        answer: "<strong>Yes, early-stage cubital tunnel syndrome</strong> often improves with conservative measures including activity modification, elbow padding, night splinting, and nerve gliding exercises. Surgery is reserved for cases that don't improve or show signs of nerve damage."
      },
      {
        question: "What happens if cubital tunnel syndrome is left untreated?",
        answer: "Untreated cubital tunnel syndrome can lead to <strong>permanent nerve damage</strong>, resulting in muscle wasting in the hand, chronic numbness, weakness of grip, and difficulty with fine motor tasks. Early treatment prevents irreversible damage."
      },
      {
        question: "How long is recovery from cubital tunnel surgery?",
        answer: "Recovery varies by procedure type. Simple decompression allows return to light activities in <strong>2-4 weeks</strong>. <a href=\"/treatments/cubital-tunnel-surgery\">Ulnar nerve transposition</a> may require 4-6 weeks of limited activity. Full nerve recovery can take several months."
      }
    ],
    "golfers-elbow": [
      {
        question: "Is golfer's elbow the same as tennis elbow?",
        answer: "No, they affect <strong>opposite sides of the elbow</strong>. Golfer's elbow (medial epicondylitis) causes pain on the <strong>inner elbow</strong> from wrist flexor tendons. <a href=\"/conditions/tennis-elbow\">Tennis elbow</a> (lateral epicondylitis) causes pain on the outer elbow from wrist extensor tendons."
      },
      {
        question: "Can I continue playing golf with golfer's elbow?",
        answer: "It depends on severity. <strong>Complete rest may not be necessary</strong>, but modifying technique, using a counterforce brace, warming up properly, and reducing playing frequency can allow you to continue while the condition heals."
      },
      {
        question: "What is the best treatment for golfer's elbow?",
        answer: "Treatment typically starts with <strong>rest, ice, and eccentric strengthening exercises</strong>. Counterforce bracing and anti-inflammatory medications help. For persistent cases, <a href=\"/treatments/stem-cell-treatment\">PRP injections</a> or corticosteroid injections may be recommended."
      },
      {
        question: "How long does golfer's elbow take to heal?",
        answer: "With proper treatment, most cases improve within <strong>6-12 weeks</strong>. However, golfer's elbow can become chronic if aggravating activities continue. Consistent stretching, strengthening, and activity modification are essential for full recovery."
      },
      {
        question: "When is surgery needed for golfer's elbow?",
        answer: "<a href=\"/treatments/golfers-elbow-surgery\">Surgery for golfer's elbow</a> is rarely needed (less than 10% of cases) and is considered only after <strong>6-12 months of failed conservative treatment</strong>. The procedure removes damaged tendon tissue and has a high success rate."
      }
    ],
    "wrist-pain": [
      {
        question: "What are the most common causes of wrist pain?",
        answer: "Common causes include <strong>sprains and strains, tendinitis</strong> (like <a href=\"/conditions/de-quervains\">De Quervain's</a>), <a href=\"/conditions/carpal-tunnel-syndrome\">carpal tunnel syndrome</a>, <a href=\"/conditions/tfcc-tear\">TFCC tears</a>, arthritis, and fractures. Accurate diagnosis is important because treatment varies significantly."
      },
      {
        question: "When should I see a doctor for wrist pain?",
        answer: "See a specialist if wrist pain <strong>persists beyond a few weeks</strong>, follows an injury with swelling or deformity, includes numbness or tingling, or significantly limits your activities. Immediate evaluation is needed after trauma with severe pain or inability to move the wrist."
      },
      {
        question: "Can wrist pain be a sign of carpal tunnel syndrome?",
        answer: "<strong>Yes, wrist pain can accompany carpal tunnel syndrome</strong>, though numbness and tingling in the thumb, index, and middle fingers are more characteristic. Night symptoms and pain radiating up the forearm are common. <a href=\"/conditions/carpal-tunnel-syndrome\">Learn more about carpal tunnel syndrome</a>."
      },
      {
        question: "What tests diagnose the cause of wrist pain?",
        answer: "Diagnosis includes <strong>physical examination and specific provocation tests</strong>. X-rays evaluate bones and arthritis. MRI visualizes soft tissues, ligaments, and cartilage. Ultrasound assesses tendons. Nerve conduction studies diagnose nerve compression."
      },
      {
        question: "What treatments are available for chronic wrist pain?",
        answer: "Treatment depends on the cause and may include <strong>splinting, anti-inflammatory medications, rehabilitation, and injections</strong>. When conservative care fails, surgical options range from <a href=\"/treatments/wrist-arthroscopy\">wrist arthroscopy</a> to fracture fixation to joint fusion or replacement."
      }
    ],
    "hand-pain": [
      {
        question: "What causes pain in the joints of my fingers?",
        answer: "<strong>Finger joint pain</strong> is most commonly caused by osteoarthritis (wear-and-tear) or rheumatoid arthritis (autoimmune). Other causes include <a href=\"/conditions/trigger-finger\">trigger finger</a>, gout, infection, and injury. The pattern of affected joints helps identify the cause."
      },
      {
        question: "Why is my hand pain worse in the morning?",
        answer: "<strong>Morning stiffness</strong> is characteristic of inflammatory conditions like rheumatoid arthritis (lasting over an hour) and osteoarthritis (typically less than 30 minutes). <a href=\"/conditions/trigger-finger\">Trigger finger</a> also tends to be stiffer in the morning."
      },
      {
        question: "Can hand arthritis be treated without surgery?",
        answer: "<strong>Yes, most hand arthritis is managed non-surgically</strong> with activity modification, splinting, anti-inflammatory medications, occupational therapy, and injections. Surgery is reserved for severe cases that don't respond to conservative treatment."
      },
      {
        question: "What is the best treatment for hand pain?",
        answer: "Treatment depends on the diagnosis. Options include <strong>rest, splinting, anti-inflammatory medications, rehabilitation, and corticosteroid injections</strong>. Surgical options range from <a href=\"/treatments/trigger-finger-release\">trigger finger release</a> to <a href=\"/treatments/carpal-tunnel-release\">carpal tunnel release</a> to joint fusion or replacement."
      },
      {
        question: "When should I see a hand specialist?",
        answer: "See a hand specialist if you have <strong>persistent pain lasting more than a few weeks</strong>, numbness or tingling in your fingers, weakness affecting daily activities, visible deformity, or fingers that lock or catch. Early evaluation prevents worsening."
      }
    ],
    "elbow-pain": [
      {
        question: "What causes elbow pain without injury?",
        answer: "<strong>Overuse injuries</strong> are the most common cause, including <a href=\"/conditions/tennis-elbow\">tennis elbow</a> and <a href=\"/conditions/golfers-elbow\">golfer's elbow</a>. Arthritis, <a href=\"/conditions/cubital-tunnel-syndrome\">cubital tunnel syndrome</a>, and bursitis can also develop gradually without a specific injury."
      },
      {
        question: "How do I know if my elbow pain is serious?",
        answer: "Seek immediate evaluation if you have <strong>severe pain after injury, visible deformity, inability to move the elbow, or numbness</strong> extending into the hand. Pain lasting more than a few weeks, especially if affecting work or sleep, also warrants specialist evaluation."
      },
      {
        question: "What is the best way to treat elbow pain at home?",
        answer: "Initial home treatment includes <strong>rest, ice (15-20 minutes several times daily), and anti-inflammatory medications</strong>. A counterforce brace can help with tennis or golfer's elbow. Avoid activities that aggravate the pain."
      },
      {
        question: "Can elbow pain be caused by nerve problems?",
        answer: "<strong>Yes, nerve compression</strong> is a common cause. <a href=\"/conditions/cubital-tunnel-syndrome\">Cubital tunnel syndrome</a> compresses the ulnar nerve at the elbow, causing numbness in the ring and small fingers. Cervical spine problems can also refer pain to the elbow."
      },
      {
        question: "When is surgery needed for elbow pain?",
        answer: "Surgery is considered after <strong>6-12 months of failed conservative treatment</strong>. Options include <a href=\"/treatments/tennis-elbow-surgery\">tennis/golfer's elbow surgery</a>, <a href=\"/treatments/cubital-tunnel-surgery\">cubital tunnel release</a>, <a href=\"/treatments/elbow-arthroscopy\">elbow arthroscopy</a>, and fracture fixation."
      }
    ],
    "dupuytrens-contracture": [
      {
        question: "What causes Dupuytren's contracture?",
        answer: "<strong>The exact cause is unknown</strong>, but genetics plays a major role—it's common in people of Northern European descent. Other risk factors include diabetes, smoking, alcohol use, and manual labor with vibrating tools."
      },
      {
        question: "Is Dupuytren's contracture painful?",
        answer: "<strong>Dupuytren's is typically not painful.</strong> The nodules may be tender to pressure initially, but the main problem is loss of function due to the inability to straighten the fingers. Pain is not usually a primary symptom."
      },
      {
        question: "Can Dupuytren's contracture be cured?",
        answer: "Currently, there is <strong>no cure for Dupuytren's disease</strong>—it's a chronic condition that tends to recur. Treatments like needle aponeurotomy, collagenase injections (Xiaflex), and <a href=\"/treatments/dupuytrens-surgery\">fasciectomy surgery</a> can improve finger extension but don't prevent recurrence."
      },
      {
        question: "When should Dupuytren's contracture be treated?",
        answer: "Treatment is typically recommended when the condition <strong>interferes with hand function</strong>—often when contracture reaches 30 degrees or more, or when you can no longer place your palm flat on a table (positive tabletop test)."
      },
      {
        question: "What is the best treatment for Dupuytren's contracture?",
        answer: "Treatment choice depends on severity and patient factors. Options include <strong>collagenase injections (Xiaflex)</strong> and needle aponeurotomy for milder cases, and <a href=\"/treatments/dupuytrens-surgery\">surgical fasciectomy</a> for more severe contractures. Each has different recovery times and recurrence rates."
      }
    ],
    "de-quervains": [
      {
        question: "What causes De Quervain's tenosynovitis?",
        answer: "<strong>De Quervain's is caused by irritation or inflammation</strong> of the tendons on the thumb side of the wrist. Repetitive gripping, pinching, or wringing motions are common causes. It's also called 'mommy thumb' because it often affects new parents from lifting babies."
      },
      {
        question: "How is De Quervain's diagnosed?",
        answer: "Diagnosis is based on the <strong>Finkelstein test</strong>: making a fist with your thumb inside and bending your wrist toward the pinky side. A positive test reproduces sharp pain along the thumb side of the wrist."
      },
      {
        question: "How effective are steroid injections for De Quervain's?",
        answer: "<strong>Corticosteroid injections are highly effective</strong>, providing relief in approximately 70-80% of patients with a single injection. A second injection may be offered if the first provides partial relief. Surgery is rarely needed."
      },
      {
        question: "Can De Quervain's heal on its own?",
        answer: "<strong>Mild cases may improve</strong> with rest, splinting, and avoiding aggravating activities. However, most cases benefit from treatment with splinting and/or injections to break the cycle of inflammation. Without treatment, symptoms often persist."
      },
      {
        question: "What is recovery like after De Quervain's release surgery?",
        answer: "<a href=\"/treatments/de-quervains-release\">De Quervain's release surgery</a> is an outpatient procedure with <strong>quick recovery</strong>. Most patients can use their hand for light activities within days. Full recovery and return to all activities typically occurs in 4-6 weeks."
      }
    ],
    "tfcc-tear": [
      {
        question: "What is a TFCC tear?",
        answer: "The <strong>triangular fibrocartilage complex (TFCC)</strong> is a cartilage and ligament structure on the pinky side of the wrist. A TFCC tear causes pain with gripping, twisting, and pushing activities. It can result from trauma (falls) or degeneration over time."
      },
      {
        question: "How do I know if I have a TFCC tear?",
        answer: "Symptoms include <strong>pain on the pinky side of the wrist</strong>, clicking or popping with wrist rotation, weakness, and instability. MRI is the best imaging test to confirm a TFCC tear. Our specialists offer complimentary <a href=\"/find-care/free-mri-review\">MRI reviews</a>."
      },
      {
        question: "Can a TFCC tear heal without surgery?",
        answer: "<strong>Some TFCC tears can heal with conservative treatment</strong>, especially degenerative tears. Treatment includes splinting, anti-inflammatory medications, and rehabilitation. Traumatic tears, especially those causing instability, may require <a href=\"/treatments/wrist-arthroscopy\">surgical repair</a>."
      },
      {
        question: "What is TFCC surgery like?",
        answer: "TFCC surgery is performed <strong>arthroscopically through small incisions</strong>. Peripheral tears in the vascular zone can be repaired with sutures. Central tears are debrided (smoothed). Recovery typically takes 6-12 weeks depending on the repair type."
      },
      {
        question: "How long does it take to recover from a TFCC tear?",
        answer: "With conservative treatment, improvement is typically seen in <strong>4-8 weeks</strong>. After <a href=\"/treatments/wrist-arthroscopy\">arthroscopic surgery</a>, recovery depends on whether repair or debridement was performed. Debridement allows earlier return; repairs may require 3 months for full healing."
      }
    ],
    "slap-tear": [
      {
        question: "Is a SLAP tear the same as a rotator cuff tear?",
        answer: "No, they are different structures. A SLAP tear affects the labrum (cartilage rim around the socket), while a rotator cuff tear affects the tendons that move the shoulder. However, both conditions can coexist and may cause similar symptoms."
      },
      {
        question: "Will a SLAP tear heal on its own?",
        answer: "Some SLAP tears improve with rehab and activity modification, but the labral cartilage itself doesn't regenerate. Symptoms can resolve as inflammation decreases and surrounding muscles compensate, even if the tear remains on imaging."
      },
      {
        question: "Does MRI always show a SLAP tear?",
        answer: "Not always. Standard MRI can miss subtle tears. MRI arthrogram (with contrast injected into the joint) is more sensitive. However, correlation with clinical exam is key—labral irregularities can appear on MRI in people without pain."
      },
      {
        question: "When is surgery necessary for a SLAP tear?",
        answer: "Surgery is considered when there is persistent pain or instability after 6-12 weeks of structured rehab, in high-demand athletes who need overhead function, or when mechanical symptoms (catching, locking) significantly limit activities."
      },
      {
        question: "How long is recovery from SLAP tear treatment?",
        answer: "Non-surgical recovery often takes 6–12 weeks. Surgical recovery is longer—typically 4-6 months for full return to overhead sports or activities, depending on the repair type and activity demands."
      }
    ],
    "shoulder-dislocation": [
      {
        question: "How do I know if my shoulder dislocated or just 'popped'?",
        answer: "A true dislocation causes severe pain, visible deformity (the shoulder looks 'out of place'), and complete loss of motion. It requires medical reduction. A 'pop' from subluxation (partial dislocation) is less severe but still needs evaluation if it happens repeatedly."
      },
      {
        question: "Will my shoulder dislocate again after the first time?",
        answer: "Risk depends on age, activity level, and bone/soft tissue damage. Young athletes (under 25) have up to 80% recurrence risk. Older patients have lower risk but higher chance of rotator cuff injury. Bone loss increases instability risk significantly."
      },
      {
        question: "Do I need surgery after my first shoulder dislocation?",
        answer: "Not always. Treatment depends on your age, activity demands, and injury details. High-risk groups (young athletes, significant bone loss, contact sports) may benefit from early surgery to prevent recurrence. Others can try rehab first."
      },
      {
        question: "How long do I wear a sling after shoulder dislocation?",
        answer: "Typically 1-3 weeks, but varies by age and injury severity. Prolonged immobilization (more than 3-4 weeks) increases stiffness risk. Your specialist will guide you on when to start gentle motion exercises."
      },
      {
        question: "What are signs of nerve injury from shoulder dislocation?",
        answer: "Numbness in the 'shoulder patch' area (outer upper arm), tingling down the arm, or hand weakness can indicate axillary nerve injury. This requires prompt evaluation but often improves with time. Persistent numbness beyond 6 weeks needs follow-up imaging."
      }
    ],
    "ac-joint-injury": [
      {
        question: "Is an AC joint injury the same as a shoulder dislocation?",
        answer: "No, they are different injuries. AC joint injury (shoulder separation) affects where the collarbone meets the shoulder blade. Shoulder dislocation occurs when the ball of the upper arm comes out of the shoulder socket. They require different treatments."
      },
      {
        question: "Will the bump on my shoulder go away after AC joint injury?",
        answer: "In higher-grade injuries (Type 3-6), a permanent bump may remain even after symptoms resolve. This cosmetic change doesn't always correlate with function—many people return to full activity despite the visible deformity."
      },
      {
        question: "Do all AC joint separations need surgery?",
        answer: "Most do not. Grades 1-2 (sprains) almost always heal with conservative care. Grade 3 is controversial—often treated non-surgically first. Grades 4-6 or Grade 3 in overhead athletes may require surgery for optimal function."
      },
      {
        question: "When can I return to sports after AC joint injury?",
        answer: "Timeline depends on grade and sport. Low-grade injuries may allow return in 2-4 weeks with proper protection. Higher grades or surgical cases typically need 3-6 months. Contact sports require full strength and pain-free range of motion before clearance."
      },
      {
        question: "Can AC joint arthritis develop later after injury?",
        answer: "Yes, post-traumatic AC joint arthritis can occur years after injury, causing localized pain and tenderness at the top of the shoulder. It's treatable with activity modification, injections, or in severe cases, distal clavicle excision surgery."
      }
    ],
    "knee-pain": [
      {
        question: "What are the most common causes of knee pain?",
        answer: "Knee pain is most commonly caused by <strong>osteoarthritis</strong>, <a href=\"/conditions/torn-meniscus\">meniscus tears</a>, ligament injuries (ACL, MCL), and overuse conditions like patellofemoral pain syndrome. Acute trauma, such as twisting injuries, can damage multiple structures at once."
      },
      {
        question: "When should I see a doctor for knee pain?",
        answer: "See an orthopedic specialist if you experience <strong>severe pain preventing weight-bearing</strong>, visible swelling or deformity, inability to fully extend or bend the knee, or pain lasting more than a few weeks. <a href=\"/find-care/book-an-appointment\">Schedule a consultation</a> for proper diagnosis."
      },
      {
        question: "Can knee pain be treated without surgery?",
        answer: "Yes, most knee pain responds well to <strong>conservative treatments</strong> including rest, ice, rehabilitation, anti-inflammatory medications, and targeted injections. Surgery is typically reserved for cases where non-surgical options fail or when structural damage requires repair."
      },
      {
        question: "What tests diagnose the cause of knee pain?",
        answer: "Diagnosis begins with a physical examination, followed by <strong>X-rays to assess bone alignment</strong> and arthritis. MRI scans reveal soft tissue injuries like meniscus tears, ligament damage, or cartilage problems. Our practice offers <a href=\"/find-care/free-mri-review\">complimentary MRI reviews</a>."
      },
      {
        question: "How long does knee pain typically last?",
        answer: "Duration varies by cause. <strong>Mild strains or overuse injuries</strong> often resolve in 2-6 weeks with rest and therapy. Arthritis causes chronic pain requiring ongoing management. Structural injuries may need months of rehabilitation or surgical intervention for full recovery."
      }
    ],
    "knee-arthritis": [
      {
        question: "What is knee arthritis and what causes it?",
        answer: "<strong>Knee arthritis</strong> (osteoarthritis) is the breakdown of cartilage in the knee joint, causing bone-on-bone contact. It develops from age-related wear, previous injuries, obesity, or genetic factors. The medial (inner) compartment is most commonly affected."
      },
      {
        question: "What are the early symptoms of knee arthritis?",
        answer: "Early symptoms include <strong>morning stiffness lasting 30+ minutes</strong>, pain worsening with activity, swelling after prolonged use, and a grinding sensation (crepitus). Pain typically improves with rest initially but progressively worsens as arthritis advances."
      },
      {
        question: "Can knee arthritis be reversed or cured?",
        answer: "Knee arthritis cannot be reversed, as <strong>cartilage does not regenerate</strong>. However, progression can be slowed through weight loss, strengthening exercises, and activity modification. Treatment focuses on pain management and maintaining function through conservative care or <a href=\"/treatments/total-knee-replacement\">joint replacement</a> when severe."
      },
      {
        question: "What non-surgical treatments help knee arthritis?",
        answer: "Effective non-surgical options include <strong>rehabilitation for quadriceps strengthening</strong>, NSAIDs for inflammation, cortisone or hyaluronic acid injections, bracing for stability, and weight loss to reduce joint stress. Low-impact exercises like swimming preserve mobility without accelerating degeneration."
      },
      {
        question: "When is knee replacement surgery recommended for arthritis?",
        answer: "Surgery is considered when conservative treatments fail and <strong>arthritis significantly limits daily activities</strong> like walking, climbing stairs, or sleeping. Bone-on-bone contact on X-rays with persistent pain despite injections typically indicates readiness for <a href=\"/treatments/total-knee-replacement\">total knee replacement</a>."
      }
    ],
    "pcl-tear": [
      {
        question: "What is a PCL tear and how does it happen?",
        answer: "A <strong>posterior cruciate ligament (PCL) tear</strong> occurs when the ligament stabilizing the back of the knee is damaged. It typically results from direct trauma to the front of the tibia (dashboard injury in car accidents) or hyperextension, less commonly from sports."
      },
      {
        question: "Can a PCL tear heal without surgery?",
        answer: "Yes, many isolated PCL tears heal with <strong>non-surgical treatment</strong> because the PCL has better blood supply than the ACL. Conservative management includes bracing, rehabilitation emphasizing quadriceps strengthening, and activity modification. Surgery is reserved for grade III tears or combined ligament injuries."
      },
      {
        question: "What are the symptoms of a torn PCL?",
        answer: "Symptoms include <strong>mild to moderate knee swelling</strong>, instability when descending stairs or walking downhill, pain in the back of the knee, and difficulty kneeling. Unlike ACL tears, patients often retain the ability to walk immediately after injury."
      },
      {
        question: "How is a PCL tear diagnosed?",
        answer: "Diagnosis involves the <strong>posterior drawer test</strong> where the doctor pushes the tibia backward to assess instability. MRI confirms the tear location and severity. X-rays rule out associated fractures, particularly at the tibial insertion point."
      },
      {
        question: "What is the recovery time for a PCL tear?",
        answer: "Non-surgical recovery typically takes <strong>3 to 4 months</strong> with dedicated rehabilitation. Surgical reconstruction requires 6-9 months for full recovery, including graft healing and return to sports. Early rehabilitation focuses on preventing posterior tibial sag and strengthening the quadriceps."
      }
    ],
    "knee-cartilage-damage": [
      {
        question: "What causes knee cartilage damage?",
        answer: "<strong>Knee cartilage damage</strong> results from acute trauma (sports injuries, falls), degenerative wear from arthritis, or repetitive stress. Meniscus tears and articular cartilage defects are the two primary types, each requiring different treatment approaches."
      },
      {
        question: "Can damaged knee cartilage repair itself?",
        answer: "Meniscus cartilage has limited healing capacity in its outer third due to <strong>minimal blood supply</strong>. Articular (joint surface) cartilage cannot regenerate naturally. Treatment options include repair techniques for meniscus tears or <a href=\"/treatments/knee-cartilage-restoration\">cartilage restoration procedures</a> for articular defects."
      },
      {
        question: "What are symptoms of knee cartilage damage?",
        answer: "Symptoms include <strong>sharp pain with twisting or pivoting</strong>, swelling after activity, catching or locking sensations, and stiffness. Articular cartilage damage causes grinding (crepitus) and pain with weight-bearing, while meniscus tears cause mechanical symptoms."
      },
      {
        question: "How is knee cartilage damage diagnosed?",
        answer: "MRI is the gold standard for detecting <strong>cartilage tears and defects</strong>. X-rays show secondary changes like joint space narrowing and bone spurs. <a href=\"/treatments/arthroscopic-knee-surgery\">Arthroscopic examination</a> provides direct visualization and allows simultaneous treatment."
      },
      {
        question: "What treatments are available for cartilage damage?",
        answer: "Treatment depends on defect size and location. Options include <strong>arthroscopic debridement for small tears</strong>, meniscus repair, microfracture to stimulate healing, cartilage transplantation (OATS, ACI), or partial knee replacement for localized arthritis. Conservative care includes rehabilitation and injections."
      }
    ],
    "knee-instability": [
      {
        question: "What causes knee instability?",
        answer: "<strong>Knee instability</strong> results from ligament tears (ACL, PCL, MCL, LCL), meniscus damage, or muscle weakness. The knee gives way or buckles during activities, particularly with cutting, pivoting, or going down stairs. Multiple ligament injuries cause severe instability."
      },
      {
        question: "Can knee instability be fixed without surgery?",
        answer: "Mild instability from <strong>partial ligament tears</strong> may respond to rehabilitation focusing on quadriceps and hamstring strengthening, along with bracing for support. However, complete ACL tears or multi-ligament injuries typically require surgical reconstruction to restore stability for active lifestyles."
      },
      {
        question: "What are the symptoms of an unstable knee?",
        answer: "Symptoms include <strong>a sensation of the knee giving way</strong>, difficulty with directional changes in sports, swelling after activity, and reluctance to trust the knee. Chronic instability can lead to secondary meniscus tears and early arthritis development."
      },
      {
        question: "How is knee instability diagnosed?",
        answer: "Physical examination tests like the <strong>Lachman test, pivot shift, and drawer tests</strong> assess ligament integrity. MRI reveals ligament tears, meniscus damage, and bone bruises. Stress X-rays quantify the degree of instability in multiple planes."
      },
      {
        question: "What is the recovery time after knee stabilization surgery?",
        answer: "Recovery from <a href=\"/treatments/acl-reconstruction-surgery\">ACL reconstruction</a> takes <strong>6 to 9 months</strong> for return to sports. Multi-ligament reconstruction requires 9-12 months. Early phases focus on regaining motion and preventing arthrofibrosis, followed by progressive strengthening and agility training."
      }
    ],
    "knee-bursitis": [
      {
        question: "What is knee bursitis and what causes it?",
        answer: "<strong>Knee bursitis</strong> is inflammation of the fluid-filled sacs (bursae) that cushion the knee joint. Prepatellar bursitis (in front of kneecap) results from prolonged kneeling, while pes anserine bursitis (inner knee) stems from overuse or obesity."
      },
      {
        question: "What are the symptoms of knee bursitis?",
        answer: "Symptoms include <strong>localized swelling and tenderness</strong> over the affected bursa, pain with direct pressure (kneeling), warmth, and redness if infected. Unlike arthritis, knee bursitis doesn't typically cause pain with weight-bearing or walking."
      },
      {
        question: "How is knee bursitis treated?",
        answer: "Treatment begins with <strong>rest, ice, and compression</strong>, along with NSAIDs for inflammation. Avoiding aggravating activities (kneeling) is crucial. Aspiration may drain excess fluid, and corticosteroid injections reduce inflammation. Infected bursitis requires antibiotics and surgical drainage."
      },
      {
        question: "Can knee bursitis become chronic?",
        answer: "Yes, repeated trauma or inadequate treatment can lead to <strong>chronic bursitis</strong> with thickened bursal walls and recurrent swelling. Chronic cases may require bursa removal (bursectomy) if conservative treatments fail. Proper padding and activity modification prevent recurrence."
      },
      {
        question: "How long does knee bursitis take to heal?",
        answer: "<strong>Acute bursitis typically resolves in 2 to 4 weeks</strong> with rest and anti-inflammatory treatment. Chronic or septic bursitis may take months. Return to kneeling activities should wait until pain-free and swelling has completely resolved to prevent flare-ups."
      }
    ],
    "patellofemoral-pain-syndrome": [
      {
        question: "What is patellofemoral pain syndrome (PFPS)?",
        answer: "<strong>Patellofemoral pain syndrome</strong> (runner's knee) is anterior knee pain caused by irritation between the kneecap and femur. It results from muscle imbalances, poor tracking of the patella, overuse, or biomechanical issues like flat feet or weak hips."
      },
      {
        question: "What causes runner's knee pain?",
        answer: "PFPS develops from <strong>quadriceps muscle weakness</strong> (especially VMO), tight IT bands or hamstrings, hip abductor weakness, overpronation, or sudden increases in training intensity. Poor patellar tracking increases pressure on cartilage, causing pain."
      },
      {
        question: "How is patellofemoral pain syndrome treated?",
        answer: "Treatment focuses on <strong>rehabilitation to strengthen the VMO</strong> and hip abductors, stretching tight structures, patellar taping or bracing, activity modification, and correcting biomechanics with orthotics. Ice and NSAIDs manage symptoms. Surgery is rarely needed."
      },
      {
        question: "Can I continue running with runner's knee?",
        answer: "Running should be reduced or modified while healing. <strong>Cross-training with swimming or cycling</strong> maintains fitness without aggravating symptoms. Gradually return to running once pain-free, ensuring proper form, appropriate footwear, and adequate hip/quad strength."
      },
      {
        question: "How long does patellofemoral pain syndrome last?",
        answer: "With proper treatment, most cases improve in <strong>6 to 12 weeks</strong>. Chronic cases may take several months of dedicated rehabilitation. Addressing underlying biomechanical issues prevents recurrence. Ignoring symptoms risks progression to <a href=\"/conditions/chondromalacia-patella\">chondromalacia patella</a> (cartilage damage)."
      }
    ],
    "chondromalacia-patella": [
      {
        question: "What is chondromalacia patella?",
        answer: "<strong>Chondromalacia patella</strong> is softening and deterioration of the cartilage on the underside of the kneecap. It causes anterior knee pain, especially when climbing stairs, squatting, or sitting with bent knees for prolonged periods. It's common in young athletes and females."
      },
      {
        question: "What's the difference between chondromalacia and patellofemoral pain?",
        answer: "Chondromalacia refers to <strong>actual cartilage damage</strong> visible on MRI or arthroscopy, while patellofemoral pain syndrome describes the pain pattern without proven structural damage. Untreated PFPS can progress to chondromalacia if biomechanical issues persist."
      },
      {
        question: "Can chondromalacia patella be reversed?",
        answer: "Early-stage cartilage softening may improve with <strong>aggressive rehabilitation</strong> and activity modification, but advanced damage is irreversible. Treatment aims to prevent progression through proper patellar tracking, strengthening weak muscles (VMO, hip abductors), and reducing compressive forces."
      },
      {
        question: "What activities should I avoid with chondromalacia?",
        answer: "Avoid <strong>deep squatting, lunges, and kneeling</strong> which increase patellofemoral compression. Minimize stair climbing and downhill running. Low-impact exercises like swimming, elliptical, and cycling with high seat position are better alternatives that maintain fitness without worsening cartilage damage."
      },
      {
        question: "When is surgery needed for chondromalacia patella?",
        answer: "Surgery is considered only after 6+ months of failed conservative care. Options include <strong>arthroscopic debridement to smooth rough cartilage</strong>, lateral release if tilt exists, or tibial tubercle transfer for severe tracking issues. Most patients improve without surgery through proper rehabilitation."
      }
    ],
    "iliotibial-band-syndrome": [
      {
        question: "What is IT band syndrome and what causes it?",
        answer: "<strong>Iliotibial band syndrome</strong> (ITBS) is lateral knee pain caused by friction of the IT band over the lateral femoral epicondyle. It's common in runners and cyclists, resulting from overuse, poor biomechanics, hip weakness, or sudden mileage increases."
      },
      {
        question: "What are the symptoms of IT band syndrome?",
        answer: "Symptoms include <strong>sharp lateral knee pain</strong> that worsens during running (especially downhill) or cycling, typically starting after a consistent distance or time. Pain may radiate up the thigh and usually improves with rest but returns with activity resumption."
      },
      {
        question: "Can IT band syndrome be treated without stopping running?",
        answer: "Yes, but <strong>training volume must be reduced</strong> significantly while addressing underlying causes. Cross-training with swimming maintains fitness. Combine reduced mileage with rehabilitation, foam rolling, hip strengthening, and biomechanical corrections. Complete rest accelerates recovery but isn't always necessary."
      },
      {
        question: "How is IT band syndrome treated?",
        answer: "Treatment focuses on <strong>hip abductor and gluteus medius strengthening</strong>, IT band and hip flexor stretching, foam rolling, correcting overpronation with orthotics, and activity modification. Corticosteroid injections provide temporary relief for severe cases. Surgery (IT band release) is rarely needed."
      },
      {
        question: "How long does IT band syndrome take to heal?",
        answer: "Most cases resolve in <strong>6 to 8 weeks</strong> with proper treatment and training modifications. Chronic or severe cases may require 3-6 months. Gradual return to running with proper form, adequate hip strength, and appropriate footwear prevents recurrence. Addressing causative factors is crucial."
      }
    ],
    "shoulder-pain": [
      {
        question: "What are the most common causes of shoulder pain?",
        answer: "<strong>Shoulder pain</strong> most commonly results from <a href=\"/conditions/rotator-cuff-tear\">rotator cuff injuries</a>, impingement syndrome, arthritis, bursitis, or labral tears. Overuse activities, poor posture, and age-related degeneration contribute to many shoulder conditions."
      },
      {
        question: "When should I see a doctor for shoulder pain?",
        answer: "Seek evaluation if pain persists beyond <strong>2-3 weeks</strong>, limits daily activities, occurs with weakness, follows acute trauma, or prevents sleep. Sudden inability to raise the arm or severe pain with minimal movement warrants immediate <a href=\"/find-care/book-an-appointment\">orthopedic consultation</a>."
      },
      {
        question: "Can shoulder pain be treated without surgery?",
        answer: "Yes, most shoulder pain responds to <strong>conservative treatment</strong> including rest, rehabilitation, anti-inflammatory medications, and corticosteroid injections. Surgery is typically reserved for complete rotator cuff tears, severe arthritis, or instability that fails non-surgical management."
      },
      {
        question: "What tests diagnose the cause of shoulder pain?",
        answer: "Diagnosis begins with physical examination and <strong>X-rays to assess bone structure</strong> and arthritis. MRI reveals soft tissue injuries like rotator cuff tears, labral damage, or tendonitis. Ultrasound can evaluate cuff tears and guide injections."
      },
      {
        question: "Why does shoulder pain worsen at night?",
        answer: "Nighttime shoulder pain worsens due to <strong>reduced blood flow when lying down</strong>, increased inflammation pooling in the joint, and pressure on affected structures. Rotator cuff tendonitis and impingement commonly cause night pain that disrupts sleep."
      }
    ],
    "shoulder-impingement": [
      {
        question: "What is shoulder impingement syndrome?",
        answer: "<strong>Shoulder impingement</strong> occurs when the rotator cuff tendons are compressed between the humerus and acromion bone during arm elevation. Repetitive overhead activities, poor posture, and bone spurs narrow the subacromial space, causing inflammation and pain."
      },
      {
        question: "What are the symptoms of shoulder impingement?",
        answer: "Symptoms include <strong>pain when raising the arm overhead</strong>, especially between 60-120 degrees (painful arc), weakness, night pain, and difficulty reaching behind the back. Pain typically worsens with overhead activities and improves with rest."
      },
      {
        question: "Can shoulder impingement heal on its own?",
        answer: "Mild cases may improve with <strong>activity modification and rest</strong>, but most require targeted treatment. Rehabilitation, NSAIDs, and corticosteroid injections address inflammation. Without treatment, chronic impingement can lead to progressive rotator cuff damage and tears."
      },
      {
        question: "How is shoulder impingement treated?",
        answer: "Treatment begins with <strong>rehabilitation strengthening rotator cuff</strong> and scapular stabilizers, NSAIDs, activity modification, and subacromial injections. If conservative care fails after 3-6 months, <a href=\"/treatments/shoulder-arthroscopy\">arthroscopic acromioplasty</a> removes the bone spur and creates more space."
      },
      {
        question: "How long does shoulder impingement take to heal?",
        answer: "Most cases improve within <strong>6 to 12 weeks</strong> with proper therapy and avoiding aggravating activities. Severe or chronic impingement may require 3-6 months. Surgical decompression adds 3-4 months for full recovery including rehabilitation."
      }
    ],
    "frozen-shoulder": [
      {
        question: "What is frozen shoulder (adhesive capsulitis)?",
        answer: "<strong>Frozen shoulder</strong> is stiffness and pain caused by thickening and tightening of the shoulder capsule. It typically affects people aged 40-60, especially those with diabetes, thyroid disorders, or after prolonged immobilization. Women are more commonly affected than men."
      },
      {
        question: "What are the three stages of frozen shoulder?",
        answer: "Frozen shoulder progresses through three stages: <strong>Freezing (2-9 months)</strong> with increasing pain and stiffness, Frozen (4-12 months) with severe stiffness but decreasing pain, and Thawing (6-24 months) with gradual motion improvement. Total duration typically spans 12-36 months."
      },
      {
        question: "Can frozen shoulder be cured?",
        answer: "Most cases resolve naturally over <strong>18 to 24 months</strong>, though some residual stiffness may persist. Treatment accelerates recovery through rehabilitation, corticosteroid injections, hydrodilatation, or manipulation under anesthesia. Arthroscopic capsular release is reserved for refractory cases."
      },
      {
        question: "What treatments help frozen shoulder?",
        answer: "<strong>Gentle stretching exercises</strong> are crucial, along with heat application, NSAIDs for pain, and corticosteroid injections in the early phase. Aggressive stretching worsens inflammation. Later stages benefit from more intensive therapy to restore motion as pain subsides."
      },
      {
        question: "Why is frozen shoulder more common in diabetics?",
        answer: "Diabetes increases frozen shoulder risk <strong>5-fold</strong> due to glycosylation of collagen in the capsule, causing abnormal cross-linking and stiffening. Poor glucose control heightens risk. Diabetic patients often experience more severe symptoms and slower recovery."
      }
    ],
    "shoulder-instability": [
      {
        question: "What is shoulder instability?",
        answer: "<strong>Shoulder instability</strong> occurs when the humeral head slips out of the glenoid socket (dislocation) or nearly slips out (subluxation). It results from traumatic injury, repetitive overhead stress, or congenital ligament laxity. The shoulder is the most commonly dislocated major joint."
      },
      {
        question: "What causes shoulder instability?",
        answer: "Causes include <strong>acute dislocation from trauma</strong>, repetitive overhead activities (swimming, baseball) stretching ligaments, labral tears, and multi-directional laxity. First-time dislocations in young athletes have high recurrence rates without proper treatment."
      },
      {
        question: "Can shoulder instability be treated without surgery?",
        answer: "Mild instability or first-time dislocations in older patients may respond to <strong>rotator cuff and scapular strengthening exercises</strong> to compensate for laxity. However, recurrent dislocations in young, active individuals typically require <a href=\"/treatments/shoulder-instability-surgery\">surgical stabilization</a> to prevent progressive damage."
      },
      {
        question: "What are the symptoms of shoulder instability?",
        answer: "Symptoms include <strong>sensation of the shoulder slipping</strong> or giving way, pain with overhead activities, apprehension when moving the arm in certain positions, and recurring dislocations. Patients may avoid positions that trigger instability."
      },
      {
        question: "How is shoulder instability diagnosed?",
        answer: "Diagnosis involves <strong>apprehension and relocation tests</strong> during physical examination. MRI or MR arthrography reveals labral tears (Bankart lesions), capsular injury, and bone defects. CT scans assess bone loss (glenoid or humeral head), which affects surgical planning."
      }
    ],
    "biceps-tendonitis-shoulder": [
      {
        question: "What is biceps tendonitis in the shoulder?",
        answer: "<strong>Biceps tendonitis</strong> is inflammation of the long head of the biceps tendon where it passes through the shoulder joint. It commonly occurs with rotator cuff problems, impingement, or from repetitive overhead activities. The tendon can also fray or rupture."
      },
      {
        question: "What are the symptoms of shoulder biceps tendonitis?",
        answer: "Symptoms include <strong>anterior shoulder pain</strong> that worsens with overhead activities, tenderness in the bicipital groove, pain with resisted shoulder flexion or elbow supination, and sometimes an audible snapping sensation. Night pain is common."
      },
      {
        question: "Can biceps tendonitis heal without surgery?",
        answer: "Yes, most cases respond to <strong>rest, rehabilitation, and anti-inflammatory medications</strong>. Avoiding aggravating activities and strengthening the rotator cuff reduces stress on the biceps tendon. Corticosteroid injections provide relief but should be used cautiously due to rupture risk."
      },
      {
        question: "What happens if the biceps tendon ruptures?",
        answer: "Proximal biceps ruptures cause a <strong>\"Popeye\" deformity</strong> with the muscle belly bulging in the upper arm. Most ruptures, especially in older patients, are treated non-surgically with minimal functional loss. Young, active individuals may benefit from <a href=\"/treatments/biceps-tenodesis\">tenodesis surgery</a>."
      },
      {
        question: "How long does biceps tendonitis take to heal?",
        answer: "Mild cases improve in <strong>4 to 6 weeks</strong> with rest and therapy. Chronic or severe tendonitis may require 3-6 months of treatment. If conservative measures fail or the tendon is severely damaged, surgical options include tenotomy or tenodesis."
      }
    ],
    "acromioclavicular-joint-arthritis": [
      {
        question: "What is AC joint arthritis?",
        answer: "<strong>Acromioclavicular (AC) joint arthritis</strong> is degeneration of the small joint at the top of the shoulder where the collarbone meets the acromion. It results from age-related wear, previous AC separation, or repetitive overhead stress in athletes (weightlifters, swimmers)."
      },
      {
        question: "What are the symptoms of AC joint arthritis?",
        answer: "Symptoms include <strong>localized pain at the top of the shoulder</strong>, tenderness directly over the AC joint, pain worsening when reaching across the body or sleeping on the affected side, and clicking or grinding with shoulder movement."
      },
      {
        question: "How is AC joint arthritis diagnosed?",
        answer: "<strong>Cross-body adduction test</strong> reproduces pain by bringing the arm across the chest. X-rays show joint space narrowing, bone spurs, and sometimes upward clavicle migration. Diagnostic lidocaine injection into the joint confirms the pain source."
      },
      {
        question: "Can AC joint arthritis be treated without surgery?",
        answer: "Yes, most cases respond to <strong>activity modification, NSAIDs, and rehabilitation</strong> strengthening rotator cuff muscles. Corticosteroid injections provide temporary relief. Avoiding overhead activities and sleeping on the opposite side reduces symptoms."
      },
      {
        question: "When is surgery needed for AC joint arthritis?",
        answer: "Surgery (<a href=\"/treatments/shoulder-arthroscopy\">distal clavicle excision</a>) is considered when conservative treatment fails after <strong>3-6 months</strong> and pain significantly limits activities. The procedure removes 5-10mm of the clavicle end, creating space and eliminating painful bone contact."
      }
    ],
    "shoulder-bursitis": [
      {
        question: "What is shoulder bursitis?",
        answer: "<strong>Shoulder bursitis</strong> (subacromial bursitis) is inflammation of the fluid-filled sac between the rotator cuff and acromion bone. It cushions tendons during arm movement. Bursitis often coexists with <a href=\"/conditions/shoulder-impingement\">impingement syndrome</a> or rotator cuff tendonitis."
      },
      {
        question: "What causes shoulder bursitis?",
        answer: "Causes include <strong>repetitive overhead activities</strong>, direct trauma, prolonged pressure, inflammatory arthritis, or infection (septic bursitis). It frequently develops alongside rotator cuff problems due to reduced subacromial space and increased friction."
      },
      {
        question: "What are the symptoms of shoulder bursitis?",
        answer: "Symptoms include <strong>dull aching shoulder pain</strong> that worsens with overhead activities, tenderness over the outer shoulder, swelling, pain at night, and weakness due to pain inhibition. The painful arc (60-120 degrees of elevation) is characteristic."
      },
      {
        question: "How is shoulder bursitis treated?",
        answer: "Treatment begins with <strong>rest, ice, and NSAIDs</strong> to reduce inflammation. Rehabilitation improves mechanics and strengthens stabilizers. Corticosteroid injections directly into the bursa provide significant relief. Chronic cases may require arthroscopic debridement."
      },
      {
        question: "How long does shoulder bursitis take to heal?",
        answer: "Acute bursitis typically improves in <strong>2 to 4 weeks</strong> with proper treatment and activity modification. Chronic bursitis may persist for months, especially if underlying impingement isn't addressed. Surgical bursectomy is rarely needed but provides definitive treatment for refractory cases."
      }
    ],
    "rotator-cuff-tendonitis": [
      {
        question: "What is rotator cuff tendonitis?",
        answer: "<strong>Rotator cuff tendonitis</strong> is inflammation of the rotator cuff tendons (supraspinatus, infraspinatus, teres minor, subscapularis) without tearing. It results from repetitive overhead activities, impingement, poor posture, or age-related degeneration. It's a precursor to rotator cuff tears."
      },
      {
        question: "What are the symptoms of rotator cuff tendonitis?",
        answer: "Symptoms include <strong>shoulder pain with overhead activities</strong>, weakness (particularly in abduction and external rotation), night pain disrupting sleep, and tenderness over the greater tuberosity. Pain follows activity rather than occurring during specific movements."
      },
      {
        question: "Can rotator cuff tendonitis lead to a tear?",
        answer: "Yes, chronic untreated tendonitis weakens the tendon structure through <strong>repetitive inflammation and micro-tears</strong>, increasing the risk of complete rotator cuff rupture. Early treatment with rehabilitation and activity modification prevents progression to irreparable tears."
      },
      {
        question: "How is rotator cuff tendonitis treated?",
        answer: "Treatment includes <strong>rest from aggravating activities, ice, NSAIDs, and rehabilitation</strong> focusing on rotator cuff strengthening and scapular stabilization. Corticosteroid injections reduce inflammation. Addressing underlying impingement or poor mechanics prevents recurrence."
      },
      {
        question: "How long does rotator cuff tendonitis take to heal?",
        answer: "Most cases improve within <strong>6 to 12 weeks</strong> with consistent therapy and activity modification. Chronic tendonitis may require 3-6 months. If symptoms persist despite conservative treatment, MRI evaluation rules out partial or full-thickness <a href=\"/conditions/rotator-cuff-tear\">rotator cuff tears</a>."
      }
    ],
    "hip-pain": [
      {
        question: "What are the most common causes of hip pain?",
        answer: "<strong>Hip pain</strong> commonly results from arthritis, <a href=\"/conditions/hip-labral-tear\">labral tears</a>, bursitis, hip impingement, or tendonitis. Location matters: groin pain suggests intra-articular issues, while lateral hip pain indicates bursitis or IT band problems."
      },
      {
        question: "When should I see a doctor for hip pain?",
        answer: "Seek evaluation if pain persists beyond <strong>2-3 weeks</strong>, limits walking or daily activities, occurs with groin clicking or catching, follows trauma, or causes nighttime awakening. Sudden inability to bear weight requires immediate medical attention."
      },
      {
        question: "Can hip pain be treated without surgery?",
        answer: "Yes, many hip conditions respond to <strong>rehabilitation, activity modification, and anti-inflammatory medications</strong>. Weight loss reduces joint stress. Corticosteroid injections provide diagnostic and therapeutic relief. Surgery is considered when conservative care fails."
      },
      {
        question: "What tests diagnose the cause of hip pain?",
        answer: "Diagnosis begins with physical examination including <strong>FABER and FADIR tests</strong> for impingement. X-rays assess arthritis and bone structure. MRI or MR arthrography reveals labral tears, cartilage damage, and tendon injuries."
      },
      {
        question: "Why does hip pain radiate down the leg?",
        answer: "Hip pain radiating to the thigh often indicates <strong>referred pain from the joint itself</strong>, not nerve compression. True sciatica from the spine causes below-knee symptoms. Hip pathology typically causes anterior or lateral thigh pain without numbness."
      }
    ],
    "hip-arthritis": [
      {
        question: "What is hip arthritis and what causes it?",
        answer: "<strong>Hip arthritis</strong> (osteoarthritis) is cartilage breakdown in the hip joint causing bone-on-bone contact. It develops from age-related wear, previous injuries, hip dysplasia, avascular necrosis, or genetic predisposition. Obesity accelerates progression."
      },
      {
        question: "What are the symptoms of hip arthritis?",
        answer: "Symptoms include <strong>groin pain worsening with activity</strong>, morning stiffness lasting 30+ minutes, reduced range of motion, limping, pain with weight-bearing, and difficulty with shoes/socks. Pain may radiate to the thigh or knee."
      },
      {
        question: "Can hip arthritis be reversed?",
        answer: "Hip arthritis cannot be reversed as <strong>cartilage does not regenerate</strong>. Treatment focuses on slowing progression through weight loss, exercise, and activity modification. When conservative care fails, <a href=\"/treatments/total-hip-replacement\">total hip replacement</a> provides definitive relief."
      },
      {
        question: "What non-surgical treatments help hip arthritis?",
        answer: "Effective options include <strong>low-impact exercises (swimming, cycling)</strong>, rehabilitation for hip strengthening, NSAIDs, corticosteroid or hyaluronic acid injections, assistive devices (cane), and weight reduction. Maintaining motion delays need for surgery."
      },
      {
        question: "When is hip replacement surgery recommended?",
        answer: "Surgery is considered when arthritis <strong>significantly limits daily activities</strong> (walking, dressing, sleeping), conservative treatments fail, X-rays show severe joint space loss, and pain interferes with quality of life. Age and activity level influence timing."
      }
    ],
    "hip-labral-tear": [
      {
        question: "What is a hip labral tear?",
        answer: "A <strong>hip labral tear</strong> is damage to the cartilage ring (labrum) surrounding the hip socket. It deepens the socket and stabilizes the joint. Tears result from trauma, hip impingement (FAI), repetitive twisting (sports), or hip dysplasia."
      },
      {
        question: "What are the symptoms of a hip labral tear?",
        answer: "Symptoms include <strong>deep groin pain</strong>, clicking or locking with hip movement, pain worsening with sitting or pivoting, stiffness, and limited range of motion. The FADIR test (flexion, adduction, internal rotation) reproduces pain."
      },
      {
        question: "Can a hip labral tear heal without surgery?",
        answer: "Small tears may stabilize with <strong>rest, rehabilitation, and activity modification</strong>. However, the labrum has poor blood supply limiting healing. Symptomatic tears causing mechanical symptoms or associated with FAI typically require <a href=\"/treatments/hip-arthroscopy-treatment\">arthroscopic repair</a>."
      },
      {
        question: "How is a hip labral tear diagnosed?",
        answer: "<strong>MR arthrography</strong> (contrast dye injected into the joint) is the gold standard, revealing tear location and severity. Physical examination tests and history of clicking/catching suggest the diagnosis. Plain X-rays assess for underlying bone abnormalities."
      },
      {
        question: "What is the recovery time for labral tear surgery?",
        answer: "Recovery from <a href=\"/treatments/hip-labral-repair\">hip labral repair</a> takes <strong>4 to 6 months</strong> for return to sports. Patients use crutches for 2-4 weeks protecting the repair. Rehabilitation progresses from motion to strengthening. Full healing takes up to a year."
      }
    ],
    "avascular-necrosis": [
      {
        question: "What is avascular necrosis (AVN) of the hip?",
        answer: "<strong>Avascular necrosis</strong> (osteonecrosis) is death of bone tissue due to interrupted blood supply to the femoral head. Causes include corticosteroid use, excessive alcohol, trauma (hip dislocation), sickle cell disease, and diving (caisson disease)."
      },
      {
        question: "What are the symptoms of hip AVN?",
        answer: "Early stages may be painless. As the condition progresses, patients experience <strong>deep groin pain</strong> worsening with weight-bearing, limited hip motion, and eventually severe arthritis. Sudden onset of pain suggests femoral head collapse."
      },
      {
        question: "Can avascular necrosis be reversed?",
        answer: "Early-stage AVN detected before collapse may respond to <strong>protected weight-bearing, medications (bisphosphonates), and core decompression surgery</strong> to stimulate new blood vessel growth. Once the femoral head collapses, joint-preserving options are limited."
      },
      {
        question: "How is avascular necrosis diagnosed?",
        answer: "<strong>MRI is the most sensitive test</strong> detecting AVN before X-ray changes appear. X-rays show later-stage collapse and arthritis. Bone scans reveal decreased blood flow. Early detection improves treatment success."
      },
      {
        question: "What treatments are available for AVN?",
        answer: "Treatment depends on stage. Early: <strong>core decompression</strong> relieves pressure and promotes healing. Advanced pre-collapse: vascularized bone grafting. Post-collapse with arthritis: <a href=\"/treatments/total-hip-replacement\">total hip replacement</a> provides pain relief and restores function."
      }
    ],
    "hip-bursitis": [
      {
        question: "What is hip bursitis?",
        answer: "<strong>Hip bursitis</strong> (trochanteric bursitis) is inflammation of the fluid-filled sac over the greater trochanter (bony prominence on outer hip). It causes lateral hip pain worsening with lying on the affected side, climbing stairs, or prolonged walking."
      },
      {
        question: "What causes hip bursitis?",
        answer: "Causes include <strong>repetitive friction from IT band</strong>, direct trauma, leg-length discrepancy, hip arthritis, spine problems, or prolonged standing. It's more common in middle-aged and older women, runners, and those with poor hip biomechanics."
      },
      {
        question: "Can hip bursitis be treated without surgery?",
        answer: "Yes, over <strong>90% of cases resolve</strong> with conservative treatment including rest, ice, NSAIDs, rehabilitation (IT band stretching, hip strengthening), activity modification, and corticosteroid injections. Surgery (bursectomy) is rarely needed."
      },
      {
        question: "What are the symptoms of hip bursitis?",
        answer: "Symptoms include <strong>sharp or burning lateral hip pain</strong>, tenderness over the greater trochanter, pain lying on the affected side at night, pain radiating down the outer thigh, and aching after prolonged activity."
      },
      {
        question: "How long does hip bursitis take to heal?",
        answer: "Most cases improve within <strong>2 to 6 weeks</strong> with proper treatment and avoiding aggravating activities. Chronic cases may require corticosteroid injection and extended therapy. Addressing underlying biomechanical issues prevents recurrence."
      }
    ],
    "hip-fracture": [
      {
        question: "What is a hip fracture?",
        answer: "A <strong>hip fracture</strong> is a break in the proximal femur, typically in the femoral neck or intertrochanteric region. It most commonly affects elderly patients with osteoporosis from falls but can occur in younger patients from high-energy trauma."
      },
      {
        question: "What are the symptoms of a hip fracture?",
        answer: "Symptoms include <strong>severe groin or hip pain</strong>, inability to bear weight, shortened and externally rotated leg, swelling, and bruising. Some non-displaced stress fractures cause milder pain allowing limited walking initially."
      },
      {
        question: "Do all hip fractures require surgery?",
        answer: "Nearly all hip fractures in the femoral neck or intertrochanteric region require <strong>surgical fixation or replacement</strong> to restore mobility and prevent complications. Non-surgical management risks non-union, avascular necrosis, pneumonia, and blood clots."
      },
      {
        question: "What is the recovery time for hip fracture surgery?",
        answer: "Patients typically walk with assistance <strong>within 1-2 days</strong> after surgery. Full recovery takes 3-6 months depending on fracture type and treatment. Rehabilitation is crucial for regaining strength and preventing falls. Mortality risk is significant in elderly patients."
      },
      {
        question: "What causes hip fractures in the elderly?",
        answer: "The primary cause is <strong>osteoporosis weakening bones</strong> combined with falls. Risk factors include advanced age, low vitamin D, poor balance, vision problems, and medications causing dizziness. Prevention focuses on fall prevention and bone health."
      }
    ],
    "loose-bodies-hip": [
      {
        question: "What are loose bodies in the hip?",
        answer: "<strong>Loose bodies</strong> are fragments of cartilage, bone, or both floating freely within the hip joint. They result from trauma, arthritis, osteochondritis dissecans, or synovial chondromatosis. They cause mechanical symptoms by getting caught between joint surfaces."
      },
      {
        question: "What are the symptoms of loose bodies in the hip?",
        answer: "Symptoms include <strong>sudden sharp pain with certain movements</strong>, catching or locking sensations, grinding or clicking, intermittent swelling, and episodes where the hip \"gives way.\" Symptoms vary based on loose body size and location."
      },
      {
        question: "Can loose bodies in the hip go away on their own?",
        answer: "No, loose bodies do not dissolve or reattach. Small asymptomatic fragments may not require treatment. <strong>Symptomatic loose bodies</strong> causing mechanical symptoms or joint damage require <a href=\"/treatments/hip-arthroscopy-treatment\">arthroscopic removal</a> to prevent progressive cartilage wear."
      },
      {
        question: "How are hip loose bodies diagnosed?",
        answer: "<strong>X-rays may show calcified loose bodies</strong>, but cartilaginous fragments are invisible. CT scans detect smaller fragments. MRI reveals cartilage damage and non-calcified bodies. Clinical examination shows catching and limited motion in specific positions."
      },
      {
        question: "What is the treatment for loose bodies in the hip?",
        answer: "Treatment is <strong>arthroscopic removal</strong> of symptomatic fragments, along with addressing the underlying cause (smoothing damaged cartilage, treating arthritis). Recovery typically takes 6-12 weeks. Untreated loose bodies accelerate joint degeneration."
      }
    ],
    "running-injuries": [
      {
        question: "What are the most common running injuries?",
        answer: "Common running injuries include <strong>runner's knee</strong> (patellofemoral pain), shin splints, <a href=\"/conditions/plantar-fasciitis\">plantar fasciitis</a>, Achilles tendonitis, IT band syndrome, and stress fractures. Most result from training errors, improper footwear, or biomechanical issues."
      },
      {
        question: "How can I prevent running injuries?",
        answer: "Prevention includes <strong>gradual mileage increases (10% rule)</strong>, proper footwear replacement every 300-500 miles, adequate warm-up and cool-down, cross-training, strength training (especially hips and core), and addressing biomechanical issues with orthotics."
      },
      {
        question: "Should I stop running if I have pain?",
        answer: "The \"no pain, no gain\" approach worsens injuries. <strong>Sharp pain or pain altering your gait</strong> requires immediate rest. Mild soreness may allow modified training. Persistent pain beyond 2 weeks needs evaluation to prevent chronic issues."
      },
      {
        question: "What is the best treatment for running injuries?",
        answer: "Initial treatment follows RICE protocol (rest, ice, compression, elevation). <strong>Relative rest</strong> with cross-training maintains fitness. Rehabilitation addresses biomechanics and strength deficits. Gradual return-to-running programs prevent re-injury."
      },
      {
        question: "How long do running injuries take to heal?",
        answer: "Healing varies by injury type. <strong>Mild strains: 2-4 weeks</strong>, tendonitis: 6-12 weeks, stress fractures: 6-8 weeks. Returning too soon risks chronic problems. Follow a structured return-to-running progression once pain-free."
      }
    ],
    "golf-injuries": [
      {
        question: "What are common golf injuries?",
        answer: "Common golf injuries include <strong>golfer's elbow</strong> (medial epicondylitis), lower back pain, rotator cuff problems, wrist tendonitis, and knee pain. Repetitive swing mechanics, poor technique, and inadequate warm-up contribute to injury development."
      },
      {
        question: "How can I prevent golf injuries?",
        answer: "Prevention strategies include <strong>proper warm-up before play</strong>, maintaining flexibility (especially thoracic spine and hips), strengthening core and rotator cuff, using correct swing mechanics, avoiding excessive practice volume, and ensuring proper club fitting."
      },
      {
        question: "Why does my back hurt after golfing?",
        answer: "Golf causes <strong>repetitive rotation and side-bending stress</strong> on the lumbar spine. Poor core stability, limited hip rotation forcing spine compensation, and improper swing mechanics increase strain. Addressing swing faults and strengthening core muscles reduces risk."
      },
      {
        question: "Can I golf with a rotator cuff tear?",
        answer: "Minor rotator cuff tendonitis may allow <strong>modified play with proper warm-up</strong>. Complete tears typically require treatment before returning. Rehabilitation strengthening remaining cuff muscles and scapular stabilizers may enable play in some cases."
      },
      {
        question: "How long does golfer's elbow take to heal?",
        answer: "Golfer's elbow typically improves in <strong>6 to 12 weeks</strong> with rest, ice, therapy, and avoiding aggravating activities. Chronic cases may require 3-6 months. Corticosteroid injections provide relief but should be used judiciously. Gradual return prevents recurrence."
      }
    ],
    "tennis-injuries": [
      {
        question: "What are the most common tennis injuries?",
        answer: "Common tennis injuries include <strong>tennis elbow</strong> (lateral epicondylitis), rotator cuff problems, ankle sprains, knee tendonitis (jumper's knee), wrist injuries, and lower back pain. Overuse from repetitive strokes is the primary mechanism."
      },
      {
        question: "How can I prevent tennis elbow?",
        answer: "Prevention includes <strong>proper stroke technique</strong>, using appropriate racket size/grip, avoiding excessive topspin, strengthening forearm muscles, taking rest days, and limiting play duration. String tension and racket weight also affect elbow stress."
      },
      {
        question: "Why do I get shoulder pain when serving?",
        answer: "Serving creates <strong>repetitive overhead stress</strong> on the rotator cuff, particularly during ball toss and acceleration phases. Improper mechanics, inadequate strength, or scapular dyskinesis increase injury risk. Serving volume should be limited during training."
      },
      {
        question: "Can I play tennis with knee pain?",
        answer: "Playing through <strong>knee pain risks worsening damage</strong>. Mild patellofemoral pain may allow modified play with bracing and proper footwear. Structural injuries (<a href=\"/conditions/torn-meniscus\">meniscus tears</a>, ligament damage) require evaluation before return to play."
      },
      {
        question: "How long does tennis elbow take to heal?",
        answer: "Tennis elbow typically improves in <strong>6 to 12 weeks</strong> with rest, rehabilitation, bracing, and avoiding aggravating activities. Chronic cases may require 6-12 months. Platelet-rich plasma (PRP) injections may accelerate healing in refractory cases."
      }
    ],
    "pickleball-injuries": [
      {
        question: "What injuries are common in pickleball?",
        answer: "Common pickleball injuries include <strong>Achilles tendon strains</strong>, calf injuries, ankle sprains, shoulder rotator cuff problems, tennis/golfer's elbow, and knee pain. The sport's quick directional changes and repetitive overhead strokes cause overuse injuries."
      },
      {
        question: "Why is pickleball causing so many injuries?",
        answer: "Pickleball's rapid growth attracts <strong>older, less-conditioned players</strong> who underestimate the sport's demands. Quick lateral movements, low dinking position stressing knees, and repetitive overhead smashes without adequate conditioning lead to injuries."
      },
      {
        question: "How can I prevent pickleball injuries?",
        answer: "Prevention includes <strong>proper warm-up before play</strong>, wearing court shoes with lateral support, maintaining calf and Achilles flexibility, strengthening shoulders and core, limiting play duration initially, and allowing recovery days between sessions."
      },
      {
        question: "Is pickleball bad for your knees?",
        answer: "The low dinking position and frequent <strong>rapid pivoting stress knee joints</strong>. Players with existing knee arthritis or patellofemoral pain may experience worsening symptoms. Proper footwork, strengthening quadriceps, and limiting play volume reduce risk."
      },
      {
        question: "What should I do if I get injured playing pickleball?",
        answer: "Stop playing immediately if experiencing <strong>sharp pain or swelling</strong>. Apply ice and elevate the area. Seek medical evaluation for severe pain, inability to bear weight, or symptoms lasting beyond a few days. Early treatment prevents chronic problems."
      }
    ],
    "swimming-injuries": [
      {
        question: "What are common swimming injuries?",
        answer: "Common swimming injuries include <strong>swimmer's shoulder</strong> (rotator cuff impingement), knee pain (breaststroke kick), lower back pain (butterfly/backstroke), and neck pain. Overuse from high training volumes and poor stroke mechanics are primary causes."
      },
      {
        question: "What is swimmer's shoulder?",
        answer: "<strong>Swimmer's shoulder</strong> encompasses rotator cuff tendonitis and impingement from repetitive overhead arm movements. Freestyle and butterfly create the most stress. Muscle imbalances, poor scapular control, and excessive yardage without strength training increase risk."
      },
      {
        question: "How can I prevent swimmer's shoulder?",
        answer: "Prevention includes <strong>balanced strength training</strong> for rotator cuff and scapular stabilizers, proper stroke technique with high elbow recovery, gradual yardage increases, adequate rest days, and stretching pectoral muscles to prevent forward shoulder posture."
      },
      {
        question: "Why does breaststroke hurt my knees?",
        answer: "The breaststroke whip kick creates <strong>valgus stress on knee ligaments</strong>, particularly MCL. Incorrect technique with excessive external rotation, pre-existing knee conditions, or high training volume worsen symptoms. Modifying kick width and ankle flexibility helps."
      },
      {
        question: "Can I swim with a rotator cuff tear?",
        answer: "Small partial tears may allow <strong>modified swimming avoiding freestyle/butterfly</strong>. Complete tears typically require treatment first. Using pull buoys, focusing on kick sets, and performing gentle backstroke may maintain fitness during rehabilitation."
      }
    ],
    "cycling-injuries": [
      {
        question: "What are the most common cycling injuries?",
        answer: "Common cycling injuries include <strong>knee pain</strong> (patellofemoral syndrome, IT band syndrome), lower back pain, neck stiffness, hand numbness (handlebar palsy), and saddle sores. Most result from improper bike fit, overuse, or poor positioning."
      },
      {
        question: "How can proper bike fit prevent injuries?",
        answer: "<strong>Professional bike fitting</strong> prevents most cycling injuries by optimizing saddle height, fore-aft position, handlebar reach, and cleat alignment. Proper fit reduces knee stress, back strain, and nerve compression while improving power transfer and comfort."
      },
      {
        question: "Why do my knees hurt when cycling?",
        answer: "Knee pain often results from <strong>improper saddle height</strong> (too low increases patellofemoral stress, too high stresses hamstrings and back of knee), incorrect cleat position causing tracking issues, or sudden mileage increases without adequate conditioning."
      },
      {
        question: "What causes hand numbness while cycling?",
        answer: "<strong>Prolonged pressure on handlebars</strong> compresses the ulnar or median nerves causing numbness. Contributing factors include improper handlebar height/reach, locked elbows, excessive weight on hands, and inadequate handlebar padding. Changing hand positions frequently helps."
      },
      {
        question: "How can I prevent lower back pain from cycling?",
        answer: "Prevention includes <strong>core strengthening exercises</strong>, proper bike fit with appropriate reach, gradual position changes, frequent position adjustments during rides, and maintaining hip flexibility. Avoiding aggressive aerodynamic positions initially reduces back stress."
      }
    ],
    "crossfit-injuries": [
      {
        question: "What are common CrossFit injuries?",
        answer: "Common CrossFit injuries include <strong>shoulder injuries</strong> (rotator cuff, labral tears from overhead movements), lower back strains (deadlifts, cleans), knee pain, Achilles tendonitis, and wrist injuries. High-intensity workouts with technical lifts increase injury risk."
      },
      {
        question: "How can I prevent CrossFit injuries?",
        answer: "Prevention includes <strong>mastering proper technique before adding weight</strong>, scaling workouts appropriately, adequate warm-up and mobility work, allowing recovery days, avoiding ego-lifting, and working with qualified coaches to correct form errors."
      },
      {
        question: "Are kipping pull-ups bad for your shoulders?",
        answer: "Kipping pull-ups create <strong>high dynamic stress on shoulders</strong>, particularly in the bottom position. Without adequate shoulder stability and scapular control, they increase rotator cuff and labral injury risk. Build strict pull-up strength first."
      },
      {
        question: "Why does my back hurt after deadlifts?",
        answer: "Deadlift back pain often results from <strong>poor form (rounded spine)</strong>, lifting too heavy, inadequate core bracing, or pre-existing spine conditions. Proper hip hinge mechanics, bracing technique, and appropriate loading reduce injury risk. Consult a coach if experiencing pain."
      },
      {
        question: "Should I do CrossFit if I have joint problems?",
        answer: "CrossFit can be modified for <strong>existing joint conditions</strong> through appropriate scaling, avoiding high-impact movements (box jumps, running), substituting low-impact alternatives, and focusing on strength building rather than max-effort competitions. Consult your physician first."
      }
    ],
    "weightlifting-injuries": [
      {
        question: "What are common weightlifting injuries?",
        answer: "Common weightlifting injuries include <strong>lower back strains</strong>, shoulder impingement, pec tears (bench press), biceps tendon ruptures, wrist tendonitis, and knee pain. Improper form, lifting excessive weight, and inadequate warm-up contribute to injuries."
      },
      {
        question: "How can I prevent lower back injuries when lifting?",
        answer: "Prevention includes <strong>maintaining neutral spine alignment</strong>, proper bracing technique (breath and brace), adequate core strengthening, progressive loading, using proper form over heavy weight, and avoiding ego-lifting. Deadlifts and squats require perfect technique."
      },
      {
        question: "What causes shoulder pain during bench press?",
        answer: "<strong>Shoulder impingement</strong> during bench press results from flared elbows (beyond 45 degrees), pressing too wide, excessive volume, or pre-existing rotator cuff issues. Proper scapular retraction, elbow tucking, and balanced push/pull training reduce risk."
      },
      {
        question: "Can I lift weights with a rotator cuff injury?",
        answer: "Mild rotator cuff tendonitis may allow <strong>modified training avoiding overhead and heavy pressing</strong>. Focus on lower body, careful shoulder exercises, and rehabilitation. Complete tears typically require treatment before resuming lifting. Avoid pushing through sharp pain."
      },
      {
        question: "How do I know if I'm lifting too heavy?",
        answer: "Warning signs include <strong>breaking proper form</strong>, excessive joint pain (beyond normal muscle soreness), inability to control the weight, compensatory movements, and requiring momentum/bouncing. Progressive overload should be gradual—add weight only when form is perfect."
      }
    ],
    "yoga-injuries": [
      {
        question: "Can you get injured doing yoga?",
        answer: "Yes, yoga injuries occur from <strong>overstretching, forcing poses beyond capability</strong>, inadequate warm-up, poor alignment, or pre-existing conditions. Common injuries include hamstring strains, knee meniscus tears, wrist tendonitis, neck strains, and lower back pain."
      },
      {
        question: "What are the most common yoga injuries?",
        answer: "Common injuries include <strong>hamstring tears at the origin</strong> (forward folds), knee meniscus damage (lotus position), wrist pain (downward dog, arm balances), shoulder impingement (chaturanga), and sacroiliac joint dysfunction. Power yoga and hot yoga increase injury risk."
      },
      {
        question: "How can I prevent yoga injuries?",
        answer: "Prevention includes <strong>respecting your body's limits</strong>, using props appropriately, proper alignment over depth, adequate warm-up before deep stretches, avoiding comparisons with others, informing instructors of injuries, and progressing gradually in challenging poses."
      },
      {
        question: "Is yoga safe for people with joint problems?",
        answer: "Gentle yoga can benefit joint conditions through <strong>improved mobility and strength</strong>. However, certain poses may worsen problems. Avoid deep knee bending with knee arthritis, extreme shoulder positions with impingement, and forward bending with disc issues. Modify poses appropriately."
      },
      {
        question: "Should I push through pain in yoga?",
        answer: "No. The yoga principle of \"good pain vs. bad pain\" is <strong>misleading and dangerous</strong>. Sharp, pinching, or joint pain signals potential injury. Muscle stretch discomfort differs from pain. Listen to your body and back off when experiencing true pain."
      }
    ],
    "surfing-injuries": [
      {
        question: "What are common surfing injuries?",
        answer: "Common surfing injuries include <strong>shoulder injuries</strong> (rotator cuff problems from paddling), lower back pain, neck strains, lacerations from fins/boards, ear infections, and acute trauma (collisions). Overuse paddling injuries and wipeout trauma are equally prevalent."
      },
      {
        question: "How can I prevent surfer's shoulder?",
        answer: "<strong>Surfer's shoulder</strong> (rotator cuff impingement) results from repetitive paddling. Prevention includes shoulder strengthening, scapular stabilization exercises, proper paddling technique, gradual session duration increases, adequate rest between sessions, and cross-training."
      },
      {
        question: "Why does surfing cause lower back pain?",
        answer: "Paddling creates <strong>prolonged lumbar extension stress</strong>, while pop-ups require explosive rotation. Poor core strength, inadequate flexibility, and high-volume sessions without conditioning increase risk. Core strengthening and hip flexibility reduce back strain."
      },
      {
        question: "What should I do if I get injured surfing?",
        answer: "For acute injuries (head trauma, severe lacerations, suspected fractures), <strong>seek immediate medical attention</strong>. Minor cuts require thorough cleaning to prevent infection. Chronic overuse pain needs evaluation if lasting beyond 2 weeks to prevent permanent damage."
      },
      {
        question: "Can I surf with a shoulder injury?",
        answer: "Minor shoulder tendonitis may allow <strong>reduced surfing with proper warm-up</strong> and modified technique. Complete rotator cuff tears typically require treatment first. Swimming and stand-up paddleboarding may maintain fitness during shoulder rehabilitation."
      }
    ],
    "water-sports-injuries": [
      {
        question: "What injuries are common in water sports?",
        answer: "Common water sports injuries include <strong>shoulder overuse injuries</strong> (rotator cuff problems), knee injuries (waterskiing, wakeboarding), lower back strains, head trauma, and acute trauma from falls/collisions. Specific injuries vary by sport intensity and technique."
      },
      {
        question: "How can I prevent water sports injuries?",
        answer: "Prevention includes <strong>proper equipment fit</strong>, wearing appropriate protective gear (life jackets, helmets), gradual skill progression, adequate strength and flexibility training, proper warm-up, avoiding alcohol, and respecting water conditions and personal limits."
      },
      {
        question: "Why do water sports cause shoulder problems?",
        answer: "Activities like <strong>waterskiing and wakeboarding create high rotational forces</strong> on shoulders, while kayaking and rowing involve repetitive overhead motions. Inadequate conditioning, poor technique, and excessive duration without rest lead to rotator cuff injuries."
      },
      {
        question: "What are the risks of jet ski injuries?",
        answer: "Jet skiing causes <strong>traumatic injuries from falls and collisions</strong> including fractures, head injuries, and abdominal trauma from water impact. Lower back injuries result from repeated impact over waves. Wearing protective gear and following safety rules reduces risk."
      },
      {
        question: "Can I return to water sports after knee surgery?",
        answer: "Return depends on surgery type and healing progress. <strong>Low-impact activities</strong> like kayaking may resume sooner than high-impact waterskiing. <a href=\"/find-care/book-an-appointment\">Consult your surgeon</a> for clearance, typically 4-6 months post-surgery with full rehabilitation."
      }
    ],
    "throwing-injuries": [
      {
        question: "What are common throwing injuries?",
        answer: "Common throwing injuries include <strong>rotator cuff tears</strong>, labral tears (SLAP lesions), UCL injuries (Tommy John), shoulder impingement, elbow tendonitis, and stress fractures. Baseball, softball, and javelin athletes are particularly susceptible."
      },
      {
        question: "What is Little League shoulder?",
        answer: "<strong>Little League shoulder</strong> is a growth plate injury (proximal humeral epiphysitis) in young pitchers caused by repetitive throwing stress. It causes shoulder pain, decreased velocity, and requires rest. Following pitch count limits and proper mechanics prevents it."
      },
      {
        question: "How can I prevent throwing injuries?",
        answer: "Prevention includes <strong>following age-appropriate pitch counts</strong>, adequate rest between outings, proper throwing mechanics, year-round shoulder strengthening, avoiding multiple teams/positions, and reporting pain early. Youth pitchers should avoid breaking pitches until skeletal maturity."
      },
      {
        question: "What is Tommy John surgery?",
        answer: "<strong>Tommy John surgery</strong> (UCL reconstruction) repairs the torn ulnar collateral ligament in the elbow using a tendon graft. It's increasingly common in baseball pitchers. Recovery takes 12-18 months before returning to competitive pitching."
      },
      {
        question: "When should a pitcher see a doctor for arm pain?",
        answer: "Seek evaluation for <strong>pain lasting beyond 2-3 days after throwing</strong>, decreased velocity, inability to straighten the elbow, numbness/tingling, or pain during daily activities. Early evaluation prevents minor issues from becoming season-ending injuries."
      }
    ],
    "beach-volleyball-injuries": [
      {
        question: "What are common beach volleyball injuries?",
        answer: "Common beach volleyball injuries include <strong>ankle sprains</strong>, shoulder impingement (from hitting/serving), patellar tendonitis (jumper's knee), lower back pain, finger injuries, and sunburn. The unstable sand surface increases ankle and knee injury risk."
      },
      {
        question: "How can I prevent ankle injuries in beach volleyball?",
        answer: "Prevention includes <strong>ankle strengthening exercises</strong> (resistance bands, single-leg balance), wearing ankle braces if previously injured, proper landing mechanics, maintaining sand court level, gradual volume increases, and avoiding play when fatigued."
      },
      {
        question: "Why does beach volleyball cause knee pain?",
        answer: "Repetitive jumping on unstable sand creates <strong>patellar tendon stress</strong> (jumper's knee). The sand's give requires more quadriceps work during takeoff and landing. Eccentric strengthening, adequate rest, and jumping technique training reduce risk."
      },
      {
        question: "What shoulder injuries occur in beach volleyball?",
        answer: "<strong>Shoulder impingement and rotator cuff tendonitis</strong> result from repetitive overhead hitting and serving. The explosive arm swing creates high forces. Prevention includes rotator cuff strengthening, scapular stabilization, proper hitting technique, and limiting consecutive play days."
      },
      {
        question: "How do I treat a finger injury from blocking?",
        answer: "Minor <strong>jammed fingers</strong> improve with ice, buddy taping, and rest. Severe pain, visible deformity, or inability to bend suggests fracture or dislocation requiring immediate evaluation. Persistent swelling beyond a week warrants X-rays to rule out fracture."
      }
    ],
    "ankle-arthritis": [
      {
        question: "What is ankle arthritis?",
        answer: "<strong>Ankle arthritis</strong> is degeneration of the cartilage in the ankle joint, causing bone-on-bone contact. It commonly results from previous ankle fractures, ligament injuries, or inflammatory conditions. Unlike hip/knee arthritis, primary wear-and-tear ankle arthritis is less common."
      },
      {
        question: "What are the symptoms of ankle arthritis?",
        answer: "Symptoms include <strong>ankle pain and stiffness</strong> worsening with activity, swelling, grinding sensation (crepitus), reduced range of motion, difficulty walking on uneven surfaces, and pain after prolonged standing. Morning stiffness typically lasts 30+ minutes."
      },
      {
        question: "Can ankle arthritis be treated without surgery?",
        answer: "Yes, initial treatment includes <strong>activity modification, bracing, rehabilitation</strong>, NSAIDs, corticosteroid injections, and custom orthotics. Weight loss reduces joint stress. Many patients manage symptoms successfully without surgery for years."
      },
      {
        question: "When is surgery needed for ankle arthritis?",
        answer: "Surgery is considered when conservative treatment fails and arthritis <strong>significantly limits daily activities</strong>. Options include arthroscopic debridement for mild arthritis, <a href=\"/treatments/ankle-replacement-surgery\">total ankle replacement</a>, or ankle fusion for end-stage disease."
      },
      {
        question: "What's better for ankle arthritis: fusion or replacement?",
        answer: "<strong>Ankle fusion</strong> (arthrodesis) eliminates pain by fusing bones but sacrifices motion. <a href=\"/treatments/ankle-replacement-surgery\">Ankle replacement</a> preserves motion but has implant longevity concerns. Choice depends on age, activity level, and bone quality."
      }
    ],
    "heel-pain": [
      {
        question: "What are the most common causes of heel pain?",
        answer: "The most common cause is <strong><a href=\"/conditions/plantar-fasciitis\">plantar fasciitis</a></strong> (inflammation of the arch ligament). Other causes include Achilles tendonitis, heel spurs, stress fractures, nerve entrapment (tarsal tunnel syndrome), and fat pad atrophy."
      },
      {
        question: "When should I see a doctor for heel pain?",
        answer: "Seek evaluation if heel pain persists beyond <strong>2-3 weeks</strong> despite rest and home care, prevents weight-bearing, occurs with swelling or numbness, or follows trauma. Severe pain with first morning steps suggests plantar fasciitis."
      },
      {
        question: "Can heel pain be treated at home?",
        answer: "Yes, many cases respond to <strong>rest, ice, stretching exercises</strong> (calf and plantar fascia), supportive shoes, arch supports, NSAIDs, and night splints. Rolling a frozen water bottle under the foot provides relief. Avoid barefoot walking."
      },
      {
        question: "What tests diagnose heel pain?",
        answer: "Diagnosis begins with physical examination. <strong>X-rays rule out fractures</strong> and assess bone spurs, though spurs don't always cause pain. MRI reveals soft tissue injuries, stress fractures, and plantar fascia tears. Ultrasound evaluates fascia thickness."
      },
      {
        question: "How long does heel pain take to heal?",
        answer: "<strong>Plantar fasciitis</strong> typically improves in 6-12 weeks with proper treatment. Chronic cases may persist 6-18 months. Achilles tendonitis takes 3-6 months. If conservative care fails, options include cortisone injections, PRP, or surgical release."
      }
    ],
    "ankle-pain": [
      {
        question: "What are common causes of ankle pain?",
        answer: "<strong>Ankle pain</strong> commonly results from sprains, arthritis, tendonitis (Achilles, posterior tibial), impingement, fractures, or instability. Location and mechanism help diagnosis: lateral pain suggests sprains, anterior pain indicates impingement."
      },
      {
        question: "When should I see a doctor for ankle pain?",
        answer: "Seek evaluation if unable to bear weight, severe swelling or deformity occurs, pain persists beyond <strong>2-3 weeks</strong>, ankle gives way repeatedly, or clicking/locking sensations develop. Acute trauma with inability to walk requires immediate assessment."
      },
      {
        question: "Can I walk on a sprained ankle?",
        answer: "Mild sprains may allow <strong>protected weight-bearing with support</strong>. Severe sprains causing inability to bear weight need evaluation for fracture or high-grade ligament injury. Using crutches, bracing, and following RICE protocol aids healing."
      },
      {
        question: "What tests diagnose ankle pain?",
        answer: "Physical examination assesses <strong>stability, range of motion, and tenderness</strong>. X-rays rule out fractures. MRI reveals ligament tears, tendon injuries, cartilage damage, and impingement. Stress X-rays quantify instability in chronic ankle sprains."
      },
      {
        question: "Why does my ankle still hurt months after a sprain?",
        answer: "Persistent pain suggests <strong>chronic ankle instability, cartilage damage, tendon injury, or scar tissue</strong> (impingement). Incomplete rehabilitation after initial injury increases recurrence risk. Evaluation and targeted therapy address residual instability and strength deficits."
      }
    ],
    "ankle-instability": [
      {
        question: "What is chronic ankle instability?",
        answer: "<strong>Chronic ankle instability</strong> is persistent giving way of the ankle following inadequately treated ankle sprains. Stretched or torn lateral ligaments (ATFL, CFL) fail to provide stability, causing repeated sprains and long-term complications."
      },
      {
        question: "What causes ankle instability?",
        answer: "Causes include <strong>incomplete healing after ankle sprains</strong>, inadequate rehabilitation, peroneal muscle weakness, poor proprioception (balance), and anatomic factors like hindfoot varus. Initial sprains in young athletes have high recurrence rates without proper treatment."
      },
      {
        question: "Can ankle instability be fixed without surgery?",
        answer: "Many cases improve with <strong>dedicated rehabilitation</strong> emphasizing peroneal strengthening, proprioceptive training (balance board), and functional exercises. Bracing provides support. Surgery is reserved for persistent instability despite 3-6 months of therapy."
      },
      {
        question: "What are the symptoms of ankle instability?",
        answer: "Symptoms include <strong>repeated ankle sprains</strong>, sensation of the ankle giving way (especially on uneven surfaces), chronic swelling, pain, hesitation during activities, and avoiding sports. Some patients develop secondary arthritis from repeated trauma."
      },
      {
        question: "What is the surgery for ankle instability?",
        answer: "<strong><a href=\"/treatments/ankle-ligament-reconstruction-surgery\">Ankle ligament reconstruction</a></strong> (Brostrom procedure) repairs or reconstructs damaged lateral ligaments. Recovery takes 3-4 months for return to sports. Success rates exceed 90% for properly selected patients."
      }
    ],
    "lumbar-stenosis": [
      {
        question: "What is lumbar stenosis?",
        answer: "<strong>Lumbar stenosis</strong> is narrowing of the spinal canal in the lower back, compressing nerves. It typically results from age-related degeneration, bone spurs, thickened ligaments, or disc bulging. Symptoms worsen with standing/walking and improve with sitting/bending forward."
      },
      {
        question: "What are the symptoms of lumbar stenosis?",
        answer: "Symptoms include <strong>leg pain, numbness, or weakness</strong> worsening with walking (neurogenic claudication), lower back pain, cramping in the legs, and difficulty walking long distances. Sitting or leaning forward (shopping cart sign) provides relief."
      },
      {
        question: "Can lumbar stenosis be treated without surgery?",
        answer: "Yes, many patients improve with <strong>rehabilitation, epidural steroid injections</strong>, activity modification, assistive devices (cane), and pain management. Weight loss reduces spinal stress. Surgery is considered when conservative care fails and symptoms limit quality of life."
      },
      {
        question: "What is the best treatment for lumbar stenosis?",
        answer: "Treatment depends on severity. <strong>Epidural injections</strong> provide temporary relief. Rehabilitation strengthens core and improves flexibility. When symptoms significantly limit walking/daily activities despite conservative care, <a href=\"/treatments/lumbar-laminectomy-surgery\">decompression surgery</a> (laminectomy) relieves pressure on nerves."
      },
      {
        question: "How is lumbar stenosis diagnosed?",
        answer: "Diagnosis combines clinical history of <strong>positional symptoms</strong> with imaging. MRI is the gold standard, showing canal narrowing and nerve compression. CT myelography is an alternative if MRI is contraindicated. X-rays assess alignment and bone spurs."
      }
    ],
    "whiplash": [
      {
        question: "What is whiplash?",
        answer: "<strong>Whiplash</strong> is a neck injury from rapid back-and-forth movement, typically in rear-end car accidents. It strains neck muscles, ligaments, discs, and can injure nerves. Symptoms may be delayed 24-48 hours after trauma."
      },
      {
        question: "What are the symptoms of whiplash?",
        answer: "Symptoms include <strong>neck pain and stiffness</strong>, headaches (especially at the skull base), shoulder pain, reduced range of motion, tingling or numbness in arms, dizziness, and fatigue. Severe cases cause cognitive issues or vision problems."
      },
      {
        question: "How long does whiplash take to heal?",
        answer: "Mild whiplash typically improves in <strong>2-4 weeks</strong> with conservative care. Moderate cases may take 2-3 months. Chronic whiplash persisting beyond 6 months occurs in 10-20% of patients and may require more intensive treatment."
      },
      {
        question: "What is the best treatment for whiplash?",
        answer: "Early treatment includes <strong>gentle activity as tolerated</strong> rather than rigid collar immobilization, ice/heat therapy, NSAIDs, and rehabilitation focusing on range of motion and strengthening. Muscle relaxants may help acute spasms. Avoid prolonged immobilization."
      },
      {
        question: "Can whiplash cause long-term problems?",
        answer: "Most recover fully, but some develop <strong>chronic pain, headaches, or cognitive issues</strong>. Risk factors for chronic symptoms include severe initial pain, older age, pre-existing neck problems, and rapid onset of symptoms. Early active treatment improves outcomes."
      }
    ],
    "chronic-pain": [
      {
        question: "What is chronic pain?",
        answer: "<strong>Chronic pain</strong> is pain lasting beyond 3-6 months, persisting after tissue healing. It involves neurological changes where pain signals become amplified. Common sources include arthritis, nerve damage, spine conditions, or complex regional pain syndrome."
      },
      {
        question: "What causes chronic pain to persist?",
        answer: "Chronic pain involves <strong>central sensitization</strong> where the nervous system becomes hypersensitive. Contributing factors include tissue damage, inflammation, nerve injury, psychological factors (stress, depression), and altered pain processing in the brain and spinal cord."
      },
      {
        question: "Can chronic pain be cured?",
        answer: "While complete cure may not be possible, chronic pain can be <strong>effectively managed</strong> through multimodal approaches including rehabilitation, medications, injections, psychological support, lifestyle modifications, and sometimes surgical interventions addressing underlying structural problems."
      },
      {
        question: "What are the best treatments for chronic pain?",
        answer: "Effective management combines <strong>rehabilitation, graded exercise programs</strong>, medications (NSAIDs, neuropathic pain drugs, occasional opioids), interventional procedures (nerve blocks, spinal cord stimulation), cognitive behavioral therapy, and addressing sleep and mental health."
      },
      {
        question: "How does rehabilitation help chronic pain?",
        answer: "<strong>Rehabilitation</strong> breaks the pain-inactivity cycle through graded exercise, improving strength and flexibility, reducing fear-avoidance behaviors, and restoring function. It modulates pain signals through movement and helps patients regain confidence in their bodies."
      }
    ],
    "nerve-pain": [
      {
        question: "What is nerve pain (neuropathic pain)?",
        answer: "<strong>Nerve pain</strong> (neuropathic pain) results from nerve damage or dysfunction causing burning, shooting, or electric-shock sensations. Common causes include pinched nerves, diabetic neuropathy, post-herpetic neuralgia, and nerve injuries."
      },
      {
        question: "What are the symptoms of nerve pain?",
        answer: "Symptoms include <strong>burning, shooting, or stabbing pain</strong>, electric-shock sensations, numbness or tingling, sensitivity to touch (allodynia), and pain at night. Pain may be constant or intermittent and doesn't always respond to traditional pain medications."
      },
      {
        question: "How is nerve pain different from other pain?",
        answer: "<strong>Nerve pain</strong> stems from the nervous system itself rather than tissue damage. It causes atypical sensations (burning, electric), may occur without clear injury, and responds better to neuropathic medications (gabapentin, duloxetine) than NSAIDs or opioids."
      },
      {
        question: "What medications treat nerve pain?",
        answer: "First-line medications include <strong>gabapentin, pregabalin (Lyrica), and duloxetine (Cymbalta)</strong>. Tricyclic antidepressants (amitriptyline) are also effective. Topical lidocaine patches help localized pain. Traditional painkillers like NSAIDs are less effective for neuropathic pain."
      },
      {
        question: "Can nerve pain be cured?",
        answer: "Cure depends on the underlying cause. <strong>Compressive neuropathies</strong> (pinched nerves) often improve with surgical decompression. Diabetic neuropathy requires glucose control. Some nerve pain becomes chronic, requiring ongoing management with medications and supportive therapies."
      }
    ],
    "radiculopathy": [
      {
        question: "What is radiculopathy?",
        answer: "<strong>Radiculopathy</strong> is nerve root compression in the spine causing pain, numbness, tingling, or weakness radiating into an arm or leg. Cervical radiculopathy affects arms; lumbar radiculopathy causes leg symptoms. Common causes include herniated discs and bone spurs."
      },
      {
        question: "What are the symptoms of radiculopathy?",
        answer: "Symptoms include <strong>sharp, shooting pain</strong> following a nerve distribution (dermatomal pattern), numbness, tingling, weakness in specific muscle groups, and reflex changes. Neck movements worsen cervical radiculopathy; bending/coughing exacerbates lumbar radiculopathy."
      },
      {
        question: "Can radiculopathy heal without surgery?",
        answer: "Yes, <strong>80-90% of radiculopathy cases improve</strong> with conservative treatment including rest, rehabilitation, anti-inflammatory medications, and epidural steroid injections. Symptoms often resolve as disc herniations shrink and inflammation subsides over 6-12 weeks."
      },
      {
        question: "When is surgery needed for radiculopathy?",
        answer: "Surgery is indicated for <strong>progressive weakness (foot drop, hand weakness)</strong>, bowel/bladder dysfunction (emergency), or persistent pain unresponsive to 6-12 weeks of conservative care. Options include <a href=\"/treatments/lumbar-microdiscectomy-surgery\">microdiscectomy</a> or foraminotomy."
      },
      {
        question: "How is radiculopathy diagnosed?",
        answer: "<strong>MRI</strong> is the gold standard showing disc herniations, stenosis, or bone spurs compressing nerve roots. Physical examination reveals specific nerve root involvement through dermatomal patterns, reflex changes, and weakness. EMG/nerve conduction studies confirm nerve damage."
      }
    ]
  };