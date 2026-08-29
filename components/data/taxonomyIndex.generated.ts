/**
 * Auto-generated, client-safe taxonomy index.
 * DO NOT hand-edit — regenerate with: node scripts/generate-taxonomy-index.mjs
 *
 * Only { slug, title, tag } — the fields client components need to render
 * related-condition and related-treatment links. Deliberately independent of
 * components/data/conditions.tsx and treatments.tsx, which are 1.3MB and 867KB
 * of source: a bundler cannot tree-shake entries out of a single array literal,
 * so importing those into a client component ships the whole dataset.
 */

export interface TaxonomyEntry {
  slug: string;
  title: string;
  tag: string | null;
}

export const conditionIndex: TaxonomyEntry[] = [
  {
    "slug": "adult-degenerative-scoliosis",
    "title": "Adult Degenerative Scoliosis",
    "tag": "Spine"
  },
  {
    "slug": "adjacent-segment-disease",
    "title": "Adjacent Segment Disease",
    "tag": "Spine"
  },
  {
    "slug": "lumbar-herniated-disc",
    "title": "Lumbar Herniated Disc",
    "tag": "Spine"
  },
  {
    "slug": "degenerative-disc-disease",
    "title": "Degenerative Disc Disease",
    "tag": "Spine"
  },
  {
    "slug": "cervical-spinal-stenosis",
    "title": "Cervical Spinal Stenosis",
    "tag": "Neck"
  },
  {
    "slug": "spondylolisthesis",
    "title": "Spondylolisthesis",
    "tag": "Spine"
  },
  {
    "slug": "cervical-herniated-disc",
    "title": "Cervical Herniated Disc",
    "tag": "Neck"
  },
  {
    "slug": "spinal-compression-fractures",
    "title": "Spinal Compression Fractures",
    "tag": "Spine"
  },
  {
    "slug": "kyphosis",
    "title": "Kyphosis",
    "tag": "Spine"
  },
  {
    "slug": "osteoarthritis",
    "title": "Osteoarthritis",
    "tag": "Knee"
  },
  {
    "slug": "rotator-cuff-tear",
    "title": "Rotator Cuff Tear",
    "tag": "Shoulder"
  },
  {
    "slug": "acl-injury",
    "title": "ACL Injury",
    "tag": "Knee"
  },
  {
    "slug": "labral-tears",
    "title": "Labral Tears",
    "tag": "Shoulder"
  },
  {
    "slug": "torn-meniscus",
    "title": "Torn Meniscus",
    "tag": "Knee"
  },
  {
    "slug": "knee-pain",
    "title": "Knee Pain",
    "tag": "Knee"
  },
  {
    "slug": "knee-arthritis",
    "title": "Knee Arthritis",
    "tag": "Knee"
  },
  {
    "slug": "pcl-tear",
    "title": "PCL Tear",
    "tag": "Knee"
  },
  {
    "slug": "knee-cartilage-damage",
    "title": "Knee Cartilage Damage",
    "tag": "Knee"
  },
  {
    "slug": "knee-instability",
    "title": "Knee Instability",
    "tag": "Knee"
  },
  {
    "slug": "knee-bursitis",
    "title": "Knee Bursitis",
    "tag": "Knee"
  },
  {
    "slug": "patellofemoral-pain-syndrome",
    "title": "Patellofemoral Pain Syndrome",
    "tag": "Knee"
  },
  {
    "slug": "chondromalacia-patella",
    "title": "Chondromalacia Patella",
    "tag": "Knee"
  },
  {
    "slug": "runner-knee",
    "title": "Runner's Knee",
    "tag": "Knee"
  },
  {
    "slug": "iliotibial-band-syndrome",
    "title": "Iliotibial Band Syndrome",
    "tag": "Knee"
  },
  {
    "slug": "bakers-cyst",
    "title": "Baker's Cyst",
    "tag": "Knee"
  },
  {
    "slug": "sacroiliac-joint-dysfunction",
    "title": "Sacroiliac Joint Dysfunction",
    "tag": "Spine"
  },
  {
    "slug": "trochanteric-bursitis",
    "title": "Trochanteric Bursitis",
    "tag": "Hip"
  },
  {
    "slug": "carpal-tunnel-syndrome",
    "title": "Carpal Tunnel Syndrome",
    "tag": "Hand"
  },
  {
    "slug": "back-pain",
    "title": "Back Pain",
    "tag": "Spine"
  },
  {
    "slug": "bulging-disc",
    "title": "Bulging Disc",
    "tag": "Spine"
  },
  {
    "slug": "pinched-nerve",
    "title": "Pinched Nerve",
    "tag": "Spine"
  },
  {
    "slug": "disc-tear",
    "title": "Disc Tear",
    "tag": "Spine"
  },
  {
    "slug": "hip-dysplasia",
    "title": "Hip Dysplasia",
    "tag": "Hip"
  },
  {
    "slug": "facet-joint-disease",
    "title": "Facet Joint Disease",
    "tag": "Spine"
  },
  {
    "slug": "arthritis",
    "title": "Arthritis",
    "tag": "Hand"
  },
  {
    "slug": "lower-back-pain",
    "title": "Lower Back Pain",
    "tag": "Lower Spine"
  },
  {
    "slug": "sciatica",
    "title": "Sciatica",
    "tag": "Lower Spine"
  },
  {
    "slug": "coccydynia",
    "title": "Coccydynia",
    "tag": "Lower Spine"
  },
  {
    "slug": "failed-back-surgery-syndrome",
    "title": "Failed Back or Failed Neck Surgery Syndrome",
    "tag": "Spine"
  },
  {
    "slug": "foraminal-stenosis",
    "title": "Foraminal Stenosis",
    "tag": "Spine"
  },
  {
    "slug": "hip-impingement",
    "title": "Hip Impingement (Femoroacetabular Impingement)",
    "tag": "Hip"
  },
  {
    "slug": "loose-bodies",
    "title": "Loose Bodies",
    "tag": "Knee"
  },
  {
    "slug": "aging-management",
    "title": "Aging Management",
    "tag": "Spine"
  },
  {
    "slug": "neck-pain",
    "title": "Neck Pain",
    "tag": "Neck"
  },
  {
    "slug": "degenerative-disc-disease-surgery",
    "title": "Degenerative Disc Disease Surgery",
    "tag": "Spine"
  },
  {
    "slug": "shoulder-arthritis",
    "title": "Shoulder Arthritis",
    "tag": "Shoulder"
  },
  {
    "slug": "shoulder-tendonitis",
    "title": "Shoulder Tendonitis",
    "tag": "Shoulder"
  },
  {
    "slug": "shoulder-pain",
    "title": "Shoulder Pain",
    "tag": "Shoulder"
  },
  {
    "slug": "shoulder-impingement",
    "title": "Shoulder Impingement",
    "tag": "Shoulder"
  },
  {
    "slug": "frozen-shoulder",
    "title": "Frozen Shoulder",
    "tag": "Shoulder"
  },
  {
    "slug": "shoulder-instability",
    "title": "Shoulder Instability",
    "tag": "Shoulder"
  },
  {
    "slug": "biceps-tendonitis-shoulder",
    "title": "Biceps Tendonitis (Shoulder)",
    "tag": "Shoulder"
  },
  {
    "slug": "acromioclavicular-joint-arthritis",
    "title": "Acromioclavicular Joint Arthritis",
    "tag": "Shoulder"
  },
  {
    "slug": "shoulder-bursitis",
    "title": "Shoulder Bursitis",
    "tag": "Shoulder"
  },
  {
    "slug": "rotator-cuff-tendonitis",
    "title": "Rotator Cuff Tendonitis",
    "tag": "Shoulder"
  },
  {
    "slug": "snapping-hip-syndrome",
    "title": "Snapping Hip Syndrome",
    "tag": "Hip"
  },
  {
    "slug": "hip-pain",
    "title": "Hip Pain",
    "tag": "Hip"
  },
  {
    "slug": "hip-arthritis",
    "title": "Hip Arthritis",
    "tag": "Hip"
  },
  {
    "slug": "hip-labral-tear",
    "title": "Hip Labral Tear",
    "tag": "Hip"
  },
  {
    "slug": "avascular-necrosis",
    "title": "Avascular Necrosis",
    "tag": "Hip"
  },
  {
    "slug": "hip-bursitis",
    "title": "Hip Bursitis",
    "tag": "Hip"
  },
  {
    "slug": "hip-fracture",
    "title": "Hip Fracture",
    "tag": "Hip"
  },
  {
    "slug": "spinal-bone-spurs",
    "title": "Spinal Bone Spurs",
    "tag": "Spine"
  },
  {
    "slug": "spinal-stenosis",
    "title": "Spinal Stenosis",
    "tag": "Spine"
  },
  {
    "slug": "spine-deformities",
    "title": "Spine Deformities",
    "tag": "Spine"
  },
  {
    "slug": "synovitis",
    "title": "Synovitis",
    "tag": "Knee"
  },
  {
    "slug": "tingling-or-numbness-in-extremities",
    "title": "Tingling or Numbness in Extremities",
    "tag": "Spine"
  },
  {
    "slug": "herniated-disc",
    "title": "Herniated Disc",
    "tag": "Spine"
  },
  {
    "slug": "rheumatoid-arthritis",
    "title": "Rheumatoid Arthritis",
    "tag": "Hand"
  },
  {
    "slug": "tennis-elbow",
    "title": "Tennis Elbow",
    "tag": "Hand"
  },
  {
    "slug": "plantar-fasciitis",
    "title": "Plantar Fasciitis",
    "tag": "Foot"
  },
  {
    "slug": "bursitis",
    "title": "Bursitis",
    "tag": "Knee"
  },
  {
    "slug": "bunions-hallux-valgus",
    "title": "Bunions (Hallux Valgus)",
    "tag": "Foot"
  },
  {
    "slug": "achilles-tendonitis",
    "title": "Achilles Tendonitis",
    "tag": "Foot"
  },
  {
    "slug": "flat-feet",
    "title": "Flat Feet",
    "tag": "Foot"
  },
  {
    "slug": "ankle-arthroscopy",
    "title": "Ankle Arthroscopy",
    "tag": "Foot"
  },
  {
    "slug": "hammer-toes",
    "title": "Hammertoes",
    "tag": "Foot"
  },
  {
    "slug": "diabetic-foot-ulcers",
    "title": "Diabetic Foot Ulcers",
    "tag": "Foot"
  },
  {
    "slug": "ankle-replacement",
    "title": "Ankle Replacement",
    "tag": "Foot"
  },
  {
    "slug": "running-injuries",
    "title": "Running Injuries",
    "tag": "Sports Medicine"
  },
  {
    "slug": "golf-injuries",
    "title": "Golf Injuries",
    "tag": "Sports Medicine"
  },
  {
    "slug": "tennis-injuries",
    "title": "Tennis Injuries",
    "tag": "Sports Medicine"
  },
  {
    "slug": "pickleball-injuries",
    "title": "Pickleball Injuries",
    "tag": "Sports Medicine"
  },
  {
    "slug": "swimming-injuries",
    "title": "Swimming Injuries",
    "tag": "Sports Medicine"
  },
  {
    "slug": "cycling-injuries",
    "title": "Cycling Injuries",
    "tag": "Sports Medicine"
  },
  {
    "slug": "crossfit-injuries",
    "title": "CrossFit Injuries",
    "tag": "Sports Medicine"
  },
  {
    "slug": "weightlifting-injuries",
    "title": "Weightlifting Injuries",
    "tag": "Sports Medicine"
  },
  {
    "slug": "yoga-injuries",
    "title": "Yoga Injuries",
    "tag": "Sports Medicine"
  },
  {
    "slug": "surfing-injuries",
    "title": "Surfing Injuries",
    "tag": "Sports Medicine"
  },
  {
    "slug": "water-sports-injuries",
    "title": "Water Sports Injuries",
    "tag": "Sports Medicine"
  },
  {
    "slug": "throwing-injuries",
    "title": "Throwing Injuries",
    "tag": "Sports Medicine"
  },
  {
    "slug": "beach-volleyball-injuries",
    "title": "Beach Volleyball Injuries",
    "tag": "Sports Medicine"
  },
  {
    "slug": "trigger-finger",
    "title": "Trigger Finger",
    "tag": "Hand"
  },
  {
    "slug": "cubital-tunnel-syndrome",
    "title": "Cubital Tunnel Syndrome",
    "tag": "Hand"
  },
  {
    "slug": "golfers-elbow",
    "title": "Golfer's Elbow",
    "tag": "Hand"
  },
  {
    "slug": "wrist-pain",
    "title": "Wrist Pain",
    "tag": "Hand"
  },
  {
    "slug": "hand-pain",
    "title": "Hand Pain",
    "tag": "Hand"
  },
  {
    "slug": "elbow-pain",
    "title": "Elbow Pain",
    "tag": "Hand"
  },
  {
    "slug": "dupuytrens-contracture",
    "title": "Dupuytren's Contracture",
    "tag": "Hand"
  },
  {
    "slug": "de-quervains",
    "title": "De Quervain's Tenosynovitis",
    "tag": "Hand"
  },
  {
    "slug": "tfcc-tear",
    "title": "TFCC Tear",
    "tag": "Hand"
  },
  {
    "slug": "mortons-neuroma",
    "title": "Morton's Neuroma",
    "tag": "Foot"
  },
  {
    "slug": "ankle-arthritis",
    "title": "Ankle Arthritis",
    "tag": "Ankle"
  },
  {
    "slug": "heel-pain",
    "title": "Heel Pain",
    "tag": "Foot"
  },
  {
    "slug": "ankle-pain",
    "title": "Ankle Pain",
    "tag": "Ankle"
  },
  {
    "slug": "ankle-instability",
    "title": "Chronic Ankle Instability",
    "tag": "Ankle"
  },
  {
    "slug": "chronic-pain",
    "title": "Chronic Pain",
    "tag": "Pain Management"
  },
  {
    "slug": "nerve-pain",
    "title": "Nerve Pain",
    "tag": "Pain Management"
  },
  {
    "slug": "radiculopathy",
    "title": "Radiculopathy",
    "tag": "Spine"
  },
  {
    "slug": "slap-tear",
    "title": "SLAP Tear",
    "tag": "Shoulder"
  },
  {
    "slug": "shoulder-dislocation",
    "title": "Shoulder Dislocation",
    "tag": "Shoulder"
  },
  {
    "slug": "ac-joint-injury",
    "title": "AC Joint Injury",
    "tag": "Shoulder"
  }
];

export const treatmentIndex: TaxonomyEntry[] = [
  {
    "slug": "orthopedic-injections",
    "title": "Orthopedic Injections",
    "tag": "Pain Management"
  },
  {
    "slug": "revision-spinal-surgery",
    "title": "Revision Spinal Surgery",
    "tag": "Spine"
  },
  {
    "slug": "multilevel-degenerative-disc-disease-surgery",
    "title": "Multilevel Degenerative Disc Disease Surgery",
    "tag": "Spine"
  },
  {
    "slug": "anterior-lumbar-corpectomy-and-fusion",
    "title": "Anterior Lumbar Corpectomy and Fusion",
    "tag": "Lower Spine"
  },
  {
    "slug": "anterior-lumbar-interbody-fusion",
    "title": "Anterior Lumbar Interbody Fusion (ALIF)",
    "tag": "Lower Spine"
  },
  {
    "slug": "hybrid-lumbar-spine-surgery",
    "title": "Hybrid Lumbar Spine Surgery",
    "tag": "Lower Spine"
  },
  {
    "slug": "lumbar-fusion-surgery",
    "title": "Lumbar Fusion Surgery",
    "tag": "Lower Spine"
  },
  {
    "slug": "spinal-fusion",
    "title": "Spinal Fusion Surgery",
    "tag": "Spine"
  },
  {
    "slug": "understanding-tlif-surgery",
    "title": "Transforaminal Lumbar Interbody Fusion (TLIF)",
    "tag": "Lower Spine"
  },
  {
    "slug": "posterior-cervical-fusion-with-instrumentation-surgery",
    "title": "Posterior Cervical Fusion with Instrumentation Surgery",
    "tag": "Neck"
  },
  {
    "slug": "posterior-cervical-fusion-surgery",
    "title": "Posterior Cervical Fusion Surgery",
    "tag": "Neck"
  },
  {
    "slug": "anterior-cervical-corpectomy-and-fusion",
    "title": "Anterior Cervical Corpectomy and Fusion",
    "tag": "Neck"
  },
  {
    "slug": "acdf-surgery",
    "title": "ACDF Surgery",
    "tag": "Neck"
  },
  {
    "slug": "lumbar-disc-replacement-surgery",
    "title": "Lumbar Disc Replacement Surgery",
    "tag": "Lower Spine"
  },
  {
    "slug": "artificial-disc-replacement-surgery",
    "title": "Artificial Disc Replacement Surgery",
    "tag": "Spine"
  },
  {
    "slug": "cervical-disc-arthroplasty",
    "title": "Cervical Disc Arthroplasty",
    "tag": "Neck"
  },
  {
    "slug": "motion-preservation-spine-surgery",
    "title": "Motion Preservation Spine Surgery",
    "tag": "Spine"
  },
  {
    "slug": "total-hip-replacement",
    "title": "Total Hip Replacement Surgery",
    "tag": "Hip"
  },
  {
    "slug": "total-knee-replacement",
    "title": "Total Knee Replacement Surgery",
    "tag": "Knee"
  },
  {
    "slug": "posterior-cervical-laminoplasty",
    "title": "Posterior Cervical Laminoplasty Surgery",
    "tag": "Neck"
  },
  {
    "slug": "posterior-cervical-foraminotomy-surgery",
    "title": "Posterior Cervical Foraminotomy Surgery",
    "tag": "Neck"
  },
  {
    "slug": "lumbar-laminectomy-surgery",
    "title": "Lumbar Laminectomy Surgery",
    "tag": "Lower Spine"
  },
  {
    "slug": "lumbar-decompression",
    "title": "Lumbar Decompression Surgery",
    "tag": "Lower Spine"
  },
  {
    "slug": "lumbar-microendoscopic-discectomy-surgery",
    "title": "Lumbar Microendoscopic Discectomy Surgery",
    "tag": "Lower Spine"
  },
  {
    "slug": "lumbar-microdiscectomy-surgery",
    "title": "Lumbar Microdiscectomy Surgery",
    "tag": "Lower Spine"
  },
  {
    "slug": "degenerative-disc-disease-surgery",
    "title": "Degenerative Disc Disease Surgery",
    "tag": "Spine"
  },
  {
    "slug": "percutaneous-discectomy",
    "title": "Percutaneous Discectomy",
    "tag": "Neck"
  },
  {
    "slug": "resurfacing-shoulder-replacement",
    "title": "Resurfacing Shoulder Replacement Treatment",
    "tag": "Shoulder"
  },
  {
    "slug": "hip-arthroscopy-treatment",
    "title": "Hip Arthroscopy Treatment",
    "tag": "Hip"
  },
  {
    "slug": "hip-labral-repair",
    "title": "Hip Labral Repair Surgery",
    "tag": "Hip"
  },
  {
    "slug": "hip-resurfacing",
    "title": "Hip Resurfacing Surgery",
    "tag": "Hip"
  },
  {
    "slug": "hip-fracture-surgery",
    "title": "Hip Fracture Surgery",
    "tag": "Hip"
  },
  {
    "slug": "revision-hip-replacement",
    "title": "Revision Hip Replacement Surgery",
    "tag": "Hip"
  },
  {
    "slug": "hip-impingement-surgery",
    "title": "Hip Impingement Surgery",
    "tag": "Hip"
  },
  {
    "slug": "core-decompression",
    "title": "Core Decompression for Avascular Necrosis",
    "tag": "Hip"
  },
  {
    "slug": "hip-bursectomy",
    "title": "Hip Bursectomy Surgery",
    "tag": "Hip"
  },
  {
    "slug": "arthroscopic-knee-surgery",
    "title": "Arthroscopic Knee Surgery",
    "tag": "Knee"
  },
  {
    "slug": "rotator-cuff-repair-surgery",
    "title": "Rotator Cuff Repair Surgery",
    "tag": "Shoulder"
  },
  {
    "slug": "meniscus-repair-surgery",
    "title": "Meniscus Repair Surgery",
    "tag": "Knee"
  },
  {
    "slug": "disc-replacement-vs-fusion-what-you-need-to-know",
    "title": "Disc Replacement vs Fusion: What You Need to Know",
    "tag": "Spine"
  },
  {
    "slug": "ankle-ligament-reconstruction-surgery",
    "title": "Ankle Ligament Reconstruction Surgery",
    "tag": "Foot"
  },
  {
    "slug": "hybrid-cervical-spine-surgery",
    "title": "Hybrid Cervical Spine Surgery",
    "tag": "Neck"
  },
  {
    "slug": "back-pain-treatment",
    "title": "Back Pain Treatment",
    "tag": "Lower Spine"
  },
  {
    "slug": "bunion-correction-surgery",
    "title": "Bunion Correction Surgery",
    "tag": "Foot"
  },
  {
    "slug": "carpal-tunnel-release",
    "title": "Carpal Tunnel Release Surgery",
    "tag": "Hand"
  },
  {
    "slug": "cervical-disc-replacement",
    "title": "Cervical Disc Replacement",
    "tag": "Neck"
  },
  {
    "slug": "coccygectomy-tailbone-removal-surgery",
    "title": "Coccygectomy (Tailbone Removal Surgery)",
    "tag": "Lower Spine"
  },
  {
    "slug": "anti-inflammatory-injections-for-joint-and-spine-pain",
    "title": "Anti-Inflammatory Injections for Joint and Spine Pain",
    "tag": "Pain Management"
  },
  {
    "slug": "aging-management",
    "title": "Aging Management",
    "tag": "Spine"
  },
  {
    "slug": "coccyx-nerve-ablation",
    "title": "Coccyx Nerve Ablation",
    "tag": "Lower Spine"
  },
  {
    "slug": "cortisone-injections-for-back-pain",
    "title": "Cortisone Injections for Back Pain",
    "tag": "Lower Spine"
  },
  {
    "slug": "degenerative-disc-disease-surgery-details",
    "title": "Degenerative Disc Disease Surgery Details",
    "tag": "Spine"
  },
  {
    "slug": "endoscopic-discectomy-surgery",
    "title": "Endoscopic Discectomy Surgery",
    "tag": "Lower Spine"
  },
  {
    "slug": "endoscopic-foraminotomy-surgery",
    "title": "Endoscopic Foraminotomy Surgery",
    "tag": "Spine"
  },
  {
    "slug": "acl-reconstruction-surgery",
    "title": "ACL Reconstruction Surgery",
    "tag": "Knee"
  },
  {
    "slug": "partial-knee-replacement",
    "title": "Partial Knee Replacement Surgery",
    "tag": "Knee"
  },
  {
    "slug": "meniscus-surgery",
    "title": "Meniscus Surgery (Meniscectomy)",
    "tag": "Knee"
  },
  {
    "slug": "knee-ligament-repair",
    "title": "Knee Ligament Repair Surgery",
    "tag": "Knee"
  },
  {
    "slug": "pcl-reconstruction",
    "title": "PCL Reconstruction Surgery",
    "tag": "Knee"
  },
  {
    "slug": "knee-cartilage-restoration",
    "title": "Knee Cartilage Restoration",
    "tag": "Knee"
  },
  {
    "slug": "knee-osteotomy",
    "title": "Knee Osteotomy Surgery",
    "tag": "Knee"
  },
  {
    "slug": "revision-knee-replacement",
    "title": "Revision Knee Replacement Surgery",
    "tag": "Knee"
  },
  {
    "slug": "epidural-steroid-injection",
    "title": "Epidural Steroid Injection",
    "tag": "Lower Spine"
  },
  {
    "slug": "extreme-lateral-interbody-fusion-surgery",
    "title": "Extreme Lateral Interbody Fusion Surgery",
    "tag": "Lower Spine"
  },
  {
    "slug": "facet-ablation-rhizotomy-treatment",
    "title": "Facet Ablation (Rhizotomy) Treatment",
    "tag": "Lower Spine"
  },
  {
    "slug": "facet-block-ablation-rhizotomy-and-facet-fusion",
    "title": "Facet Block, Ablation, Rhizotomy, and Facet Fusion",
    "tag": "Spine"
  },
  {
    "slug": "fracture-fixation",
    "title": "Fracture Fixation",
    "tag": "Pain Management"
  },
  {
    "slug": "impar-block-treatment",
    "title": "Impar Block Treatment",
    "tag": "Hip"
  },
  {
    "slug": "neck-pain-treatment-and-shoulder-pain-relief",
    "title": "Neck Pain Treatment and Shoulder Pain Relief",
    "tag": "Neck"
  },
  {
    "slug": "non-surgical-treatments-for-pain-management",
    "title": "Non-Surgical Treatments for Pain Management",
    "tag": "Pain Management"
  },
  {
    "slug": "oblique-lumbar-interbody-fusion",
    "title": "Oblique Lumbar Interbody Fusion",
    "tag": "Lower Spine"
  },
  {
    "slug": "percutaneous-carpal-tunnel-release",
    "title": "Percutaneous Carpal Tunnel Release",
    "tag": "Hand"
  },
  {
    "slug": "shoulder-arthroscopy",
    "title": "Shoulder Arthroscopy",
    "tag": "Shoulder"
  },
  {
    "slug": "stem-cell-treatment",
    "title": "Stem Cell Treatment",
    "tag": "Knee"
  },
  {
    "slug": "surgical-treatments",
    "title": "Surgical Treatments",
    "tag": "Spine"
  },
  {
    "slug": "trigger-finger-release",
    "title": "Trigger Finger Release",
    "tag": "Hand"
  },
  {
    "slug": "ankle-replacement-surgery",
    "title": "Ankle Replacement Surgery",
    "tag": "Foot"
  },
  {
    "slug": "ankle-arthroscopy-minimally-invasive-surgery",
    "title": "Ankle Arthroscopy (Minimally Invasive Surgery)",
    "tag": "Foot"
  },
  {
    "slug": "sacroiliac-joint-injection",
    "title": "Sacroiliac Joint Injection",
    "tag": "Pain Management"
  },
  {
    "slug": "nerve-block-injection",
    "title": "Nerve Block Injection",
    "tag": "Pain Management"
  },
  {
    "slug": "chronic-pain-treatment",
    "title": "Chronic Pain Treatment",
    "tag": "Pain Management"
  },
  {
    "slug": "sports-injury-treatment",
    "title": "Sports Injury Treatment",
    "tag": "Sports Medicine"
  },
  {
    "slug": "athletic-evaluation",
    "title": "Athletic Injury Evaluation",
    "tag": "Sports Medicine"
  },
  {
    "slug": "cubital-tunnel-surgery",
    "title": "Cubital Tunnel Surgery",
    "tag": "Hand"
  },
  {
    "slug": "tennis-elbow-surgery",
    "title": "Tennis Elbow Surgery",
    "tag": "Hand"
  },
  {
    "slug": "golfers-elbow-surgery",
    "title": "Golfer's Elbow Surgery",
    "tag": "Hand"
  },
  {
    "slug": "elbow-arthroscopy",
    "title": "Elbow Arthroscopy",
    "tag": "Hand"
  },
  {
    "slug": "wrist-arthroscopy",
    "title": "Wrist Arthroscopy",
    "tag": "Hand"
  },
  {
    "slug": "wrist-fracture-surgery",
    "title": "Wrist Fracture Surgery",
    "tag": "Hand"
  },
  {
    "slug": "de-quervains-release",
    "title": "De Quervain's Release",
    "tag": "Hand"
  },
  {
    "slug": "dupuytrens-surgery",
    "title": "Dupuytren's Surgery",
    "tag": "Hand"
  },
  {
    "slug": "hand-fracture-surgery",
    "title": "Hand Fracture Surgery",
    "tag": "Hand"
  },
  {
    "slug": "elbow-fracture-surgery",
    "title": "Elbow Fracture Surgery",
    "tag": "Elbow"
  },
  {
    "slug": "shoulder-replacement",
    "title": "Total Shoulder Replacement",
    "tag": "Shoulder"
  },
  {
    "slug": "reverse-shoulder-replacement",
    "title": "Reverse Shoulder Replacement",
    "tag": "Shoulder"
  },
  {
    "slug": "labral-repair-shoulder",
    "title": "Labral Repair (Shoulder)",
    "tag": "Shoulder"
  },
  {
    "slug": "biceps-tenodesis",
    "title": "Biceps Tenodesis",
    "tag": "Shoulder"
  },
  {
    "slug": "shoulder-instability-surgery",
    "title": "Shoulder Instability Surgery",
    "tag": "Shoulder"
  },
  {
    "slug": "acromioplasty",
    "title": "Acromioplasty",
    "tag": "Shoulder"
  },
  {
    "slug": "shoulder-fracture-surgery",
    "title": "Shoulder Fracture Surgery",
    "tag": "Shoulder"
  },
  {
    "slug": "kyphoplasty",
    "title": "Kyphoplasty",
    "tag": "Spine"
  },
  {
    "slug": "vertebroplasty",
    "title": "Vertebroplasty",
    "tag": "Spine"
  },
  {
    "slug": "plif",
    "title": "PLIF (Posterior Lumbar Interbody Fusion)",
    "tag": "Lower Spine"
  },
  {
    "slug": "thoracic-spine-surgery",
    "title": "Thoracic Spine Surgery",
    "tag": "Spine"
  },
  {
    "slug": "si-joint-fusion",
    "title": "SI Joint Fusion",
    "tag": "Lower Spine"
  },
  {
    "slug": "cervical-laminectomy",
    "title": "Cervical Laminectomy",
    "tag": "Neck"
  },
  {
    "slug": "joint-pain-treatment",
    "title": "Joint Pain Treatment",
    "tag": "Pain Management"
  },
  {
    "slug": "arthritis-treatment",
    "title": "Arthritis Treatment",
    "tag": "Pain Management"
  },
  {
    "slug": "bursitis-treatment",
    "title": "Bursitis Treatment",
    "tag": "Pain Management"
  },
  {
    "slug": "tendonitis-treatment",
    "title": "Tendonitis Treatment",
    "tag": "Pain Management"
  },
  {
    "slug": "osteoporosis-treatment",
    "title": "Osteoporosis Treatment",
    "tag": "Pain Management"
  },
  {
    "slug": "achilles-tendon-repair",
    "title": "Achilles Tendon Repair",
    "tag": "Foot"
  },
  {
    "slug": "plantar-fasciitis-treatment",
    "title": "Plantar Fasciitis Treatment",
    "tag": "Foot"
  },
  {
    "slug": "plantar-fasciitis-surgery",
    "title": "Plantar Fascia Release Surgery",
    "tag": "Foot"
  },
  {
    "slug": "hammertoe-surgery",
    "title": "Hammertoe Surgery",
    "tag": "Foot"
  },
  {
    "slug": "foot-fracture-surgery",
    "title": "Foot Fracture Surgery",
    "tag": "Foot"
  },
  {
    "slug": "ankle-fracture-surgery",
    "title": "Ankle Fracture Surgery",
    "tag": "Ankle"
  },
  {
    "slug": "mortons-neuroma-surgery",
    "title": "Morton's Neuroma Surgery",
    "tag": "Foot"
  },
  {
    "slug": "flat-foot-surgery",
    "title": "Flat Foot Surgery",
    "tag": "Foot"
  },
  {
    "slug": "heel-pain-treatment",
    "title": "Heel Pain Treatment",
    "tag": "Foot"
  },
  {
    "slug": "diabetic-foot-care",
    "title": "Diabetic Foot Care",
    "tag": "Foot"
  }
];
