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
  body: string | null;
  card_img: string | null;
}

export const conditionIndex: TaxonomyEntry[] = [
  {
    "slug": "adult-degenerative-scoliosis",
    "title": "Adult Degenerative Scoliosis",
    "tag": "Spine",
    "body": "Adult degenerative scoliosis is a sideways spinal curve that develops with age, often causing back pain and stiffness.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--adult-degenerative-scoliosis--thumbnail.png"
  },
  {
    "slug": "adjacent-segment-disease",
    "title": "Adjacent Segment Disease",
    "tag": "Spine",
    "body": "Adjacent Segment Disease (ASD) is a condition that can cause new pain and degeneration at spinal levels next to a previous surgical fusion.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--adjacent-segment-disease--thumbnail.png"
  },
  {
    "slug": "lumbar-herniated-disc",
    "title": "Lumbar Herniated Disc",
    "tag": "Spine",
    "body": "A lumbar herniated disc occurs when a disc in the lower back presses on a nerve, causing sciatica and radiating leg pain.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--lumbar-herniated-disc--thumbnail.png"
  },
  {
    "slug": "degenerative-disc-disease",
    "title": "Degenerative Disc Disease",
    "tag": "Spine",
    "body": "Degenerative disc disease (DDD) involves the natural age-related wear and tear of spinal discs, which can lead to chronic pain and stiffness.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--degenerative-disc-disease--thumbnail.png"
  },
  {
    "slug": "cervical-spinal-stenosis",
    "title": "Cervical Spinal Stenosis",
    "tag": "Neck",
    "body": "Cervical spinal stenosis is a narrowing of the spinal canal in the neck, which can compress the spinal cord and cause radiating pain or numbness.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--cervical-spinal-stenosis--thumbnail.png"
  },
  {
    "slug": "spondylolisthesis",
    "title": "Spondylolisthesis",
    "tag": "Spine",
    "body": "Spondylolisthesis is a spinal condition where one vertebra slips forward over the one below it, often causing lower back pain and nerve compression.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--spondylolisthesis--thumbnail.png"
  },
  {
    "slug": "cervical-herniated-disc",
    "title": "Cervical Herniated Disc",
    "tag": "Neck",
    "body": "A cervical herniated disc occurs when a disc in the neck bulges and presses on a nerve, causing neck pain and radiating arm symptoms.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--cervical-herniated-disc--thumbnail.png"
  },
  {
    "slug": "spinal-compression-fractures",
    "title": "Spinal Compression Fractures",
    "tag": "Spine",
    "body": "A spinal compression fracture is a collapse or crack in a vertebra, often caused by osteoporosis, leading to sudden back pain and height loss.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--spinal-compression-fractures--thumbnail.png"
  },
  {
    "slug": "kyphosis",
    "title": "Kyphosis",
    "tag": "Spine",
    "body": "Kyphosis is an exaggerated forward rounding of the upper back, which can cause pain, stiffness, and significant postural problems.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--kyphosis--thumbnail.png"
  },
  {
    "slug": "osteoarthritis",
    "title": "Osteoarthritis",
    "tag": "Knee",
    "body": "Osteoarthritis is degenerative joint disease in which cartilage loss, bone changes, and inflammation cause activity-related pain and stiffness.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--osteoarthritis--thumbnail.png"
  },
  {
    "slug": "rotator-cuff-tear",
    "title": "Rotator Cuff Tear",
    "tag": "Shoulder",
    "body": "A rotator cuff tear is a partial or full-thickness injury to the shoulder tendons that can cause night pain, weakness, and loss of overhead function.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--rotator-cuff-tear--thumbnail.png"
  },
  {
    "slug": "acl-injury",
    "title": "ACL Injury",
    "tag": "Knee",
    "body": "An ACL injury is a tear of the anterior cruciate ligament in the knee, a key stabilizer that often leads to knee instability, pain, and swelling.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--acl-injury--thumbnail.png"
  },
  {
    "slug": "labral-tears",
    "title": "Labral Tears",
    "tag": "Shoulder",
    "body": "A labral tear in the shoulder or hip involves damage to the cartilage ring that stabilizes the joint, causing deep pain, clicking, and instability.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--labral-tears--thumbnail.png"
  },
  {
    "slug": "torn-meniscus",
    "title": "Torn Meniscus",
    "tag": "Knee",
    "body": "A torn meniscus is a common knee injury involving the C-shaped cartilage that cushions the joint, causing pain, swelling, and locking sensations.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--torn-meniscus--thumbnail.png"
  },
  {
    "slug": "knee-pain",
    "title": "Knee Pain",
    "tag": "Knee",
    "body": "Knee pain is a common complaint that can stem from various causes, including injuries, arthritis, and overuse conditions affecting the knee joint.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--knee-pain--thumbnail.png"
  },
  {
    "slug": "knee-arthritis",
    "title": "Knee Arthritis",
    "tag": "Knee",
    "body": "Knee arthritis is a degenerative condition where the cartilage in the knee joint wears away, causing pain, stiffness, and reduced mobility.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--knee-arthritis--thumbnail.png"
  },
  {
    "slug": "pcl-tear",
    "title": "PCL Tear",
    "tag": "Knee",
    "body": "A PCL tear is an injury to the posterior cruciate ligament, a key stabilizer in the back of the knee that prevents the shinbone from sliding backward.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--pcl-tear--thumbnail.png"
  },
  {
    "slug": "knee-cartilage-damage",
    "title": "Knee Cartilage Damage",
    "tag": "Knee",
    "body": "Knee cartilage damage involves injury or wear to the smooth cartilage that covers the ends of bones in the knee joint, causing pain, swelling, and reduced function.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--knee-cartilage-damage--thumbnail.png"
  },
  {
    "slug": "knee-instability",
    "title": "Knee Instability",
    "tag": "Knee",
    "body": "Knee instability is a condition where the knee feels loose or gives way, often resulting from ligament injuries or structural problems affecting knee stability.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--knee-instability--thumbnail.png"
  },
  {
    "slug": "knee-bursitis",
    "title": "Knee Bursitis",
    "tag": "Knee",
    "body": "Knee bursitis is inflammation of the fluid-filled sacs (bursae) that cushion the knee joint, causing pain, swelling, and tenderness around the knee.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--knee-bursitis--thumbnail.png"
  },
  {
    "slug": "patellofemoral-pain-syndrome",
    "title": "Patellofemoral Pain Syndrome",
    "tag": "Knee",
    "body": "Patellofemoral pain syndrome is a common cause of front-of-knee pain, often related to improper tracking of the kneecap during movement.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--patellofemoral-pain-syndrome--thumbnail.png"
  },
  {
    "slug": "chondromalacia-patella",
    "title": "Chondromalacia Patella",
    "tag": "Knee",
    "body": "Chondromalacia patella is softening and breakdown of the cartilage on the underside of the kneecap, causing front-of-knee pain and grinding sensations.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--chondromalacia-patella--thumbnail.png"
  },
  {
    "slug": "runner-knee",
    "title": "Runner's Knee",
    "tag": "Knee",
    "body": "Runner's knee is a common overuse condition causing pain around the kneecap, often related to improper biomechanics or muscle imbalances in runners.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--runner-knee--thumbnail.png"
  },
  {
    "slug": "iliotibial-band-syndrome",
    "title": "Iliotibial Band Syndrome",
    "tag": "Knee",
    "body": "Iliotibial band syndrome is load-related outer knee pain, most often seen in runners and cyclists when hip control, training volume, or bike/run mechanics overload the IT band.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--iliotibial-band-syndrome--thumbnail.png"
  },
  {
    "slug": "bakers-cyst",
    "title": "Baker's Cyst",
    "tag": "Knee",
    "body": "A Baker's cyst is a fluid-filled swelling behind the knee, usually caused by another knee problem that increases joint fluid.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--bakers-cyst--thumbnail.png"
  },
  {
    "slug": "sacroiliac-joint-dysfunction",
    "title": "Sacroiliac Joint Dysfunction",
    "tag": "Spine",
    "body": "Sacroiliac (SI) joint dysfunction is a common source of lower back, buttock, or groin pain caused by abnormal movement or inflammation of the SI joint.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--sacroiliac-joint-dysfunction--thumbnail.png"
  },
  {
    "slug": "trochanteric-bursitis",
    "title": "Trochanteric Bursitis",
    "tag": "Hip",
    "body": "Trochanteric bursitis causes outer hip pain over the greater trochanter and often overlaps with gluteal tendon irritation.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--trochanteric-bursitis--thumbnail.png"
  },
  {
    "slug": "carpal-tunnel-syndrome",
    "title": "Carpal Tunnel Syndrome",
    "tag": "Hand",
    "body": "Carpal tunnel syndrome is a common nerve compression disorder that causes pain, numbness, and tingling in the hand and wrist.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--carpal-tunnel-syndrome--thumbnail.png"
  },
  {
    "slug": "back-pain",
    "title": "Back Pain",
    "tag": "Spine",
    "body": "Back pain is a widespread condition that can severely limit daily activity, ranging from a dull ache to sharp, debilitating pain.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--back-pain--thumbnail.png"
  },
  {
    "slug": "bulging-disc",
    "title": "Bulging Disc",
    "tag": "Spine",
    "body": "A bulging disc occurs when a spinal disc protrudes and presses on nearby nerves, which can cause localized or radiating pain.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--bulging-disc--thumbnail.png"
  },
  {
    "slug": "pinched-nerve",
    "title": "Pinched Nerve",
    "tag": "Spine",
    "body": "A pinched nerve, or radiculopathy, happens when a nerve is compressed by surrounding tissue, causing radiating pain, numbness, or tingling.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--pinched-nerve--thumbnail.png"
  },
  {
    "slug": "disc-tear",
    "title": "Disc Tear",
    "tag": "Spine",
    "body": "A disc tear, or annular tear, is a crack in the tough outer layer of a spinal disc, which can cause sharp, localized back or neck pain.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--disc-tear--thumbnail.png"
  },
  {
    "slug": "hip-dysplasia",
    "title": "Hip Dysplasia",
    "tag": "Hip",
    "body": "Hip dysplasia is a condition where the hip socket is too shallow to properly support the 'ball' of the thighbone, leading to instability and early arthritis.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--hip-dysplasia--thumbnail.png"
  },
  {
    "slug": "facet-joint-disease",
    "title": "Facet Joint Disease",
    "tag": "Spine",
    "body": "Facet joint disease, also known as spinal arthritis or facet arthropathy, is a common source of chronic neck and back pain.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--facet-joint-disease--thumbnail.png"
  },
  {
    "slug": "arthritis",
    "title": "Arthritis",
    "tag": "Hand",
    "body": "Arthritis is a condition that causes joint inflammation, leading to chronic pain, stiffness, and reduced mobility that can impact quality of life.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--arthritis--thumbnail.png"
  },
  {
    "slug": "lower-back-pain",
    "title": "Lower Back Pain",
    "tag": "Lower Spine",
    "body": "Lower back pain is an extremely common condition that can range from a dull, constant ache to sharp, sudden pain, significantly impacting daily life.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--lower-back-pain--thumbnail.png"
  },
  {
    "slug": "sciatica",
    "title": "Sciatica",
    "tag": "Lower Spine",
    "body": "Sciatica is radiating nerve pain that travels from the lower back down the leg, caused by compression or irritation of the sciatic nerve.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--sciatica--thumbnail.png"
  },
  {
    "slug": "coccydynia",
    "title": "Coccydynia",
    "tag": "Lower Spine",
    "body": "Coccydynia, more commonly known as tailbone pain, is a condition that can make sitting painful and difficult.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--coccydynia--thumbnail.png"
  },
  {
    "slug": "failed-back-surgery-syndrome",
    "title": "Failed Back or Failed Neck Surgery Syndrome",
    "tag": "Spine",
    "body": "Failed Back (or Neck) Surgery Syndrome refers to persistent pain after a spinal procedure, requiring expert evaluation to find the underlying cause.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--failed-back-surgery-syndrome--thumbnail.png"
  },
  {
    "slug": "foraminal-stenosis",
    "title": "Foraminal Stenosis",
    "tag": "Spine",
    "body": "Foraminal stenosis is a narrowing of the spinal openings where nerves exit, which can 'pinch' the nerves and cause radiating pain.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--foraminal-stenosis--thumbnail.png"
  },
  {
    "slug": "hip-impingement",
    "title": "Hip Impingement (Femoroacetabular Impingement)",
    "tag": "Hip",
    "body": "Hip impingement, or FAI, occurs when abnormal bone growth in the hip joint causes damaging contact, leading to groin pain and stiffness.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--hip-impingement--thumbnail.png"
  },
  {
    "slug": "loose-bodies",
    "title": "Loose Bodies",
    "tag": "Knee",
    "body": "Loose bodies are fragments of cartilage or bone floating within a joint, which can cause painful catching, popping, and locking sensations.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--loose-bodies--thumbnail.png"
  },
  {
    "slug": "aging-management",
    "title": "Aging Management",
    "tag": "Spine",
    "body": "Our aging management programs focus on preserving bone density, joint health, and muscle strength to help you stay active, strong, and independent as you age.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--aging-management--thumbnail.png"
  },
  {
    "slug": "neck-pain",
    "title": "Neck Pain",
    "tag": "Neck",
    "body": "Neck pain is a common condition that can range from a mild, dull ache to sharp, radiating pain that disrupts daily activities and sleep.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--neck-pain--thumbnail.png"
  },
  {
    "slug": "degenerative-disc-disease-surgery",
    "title": "Degenerative Disc Disease Surgery",
    "tag": "Spine",
    "body": "For severe degenerative disc disease, surgery such as spinal fusion or artificial disc replacement can restore stability and provide lasting pain relief.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--degenerative-disc-disease-surgery--thumbnail.png"
  },
  {
    "slug": "shoulder-arthritis",
    "title": "Shoulder Arthritis",
    "tag": "Shoulder",
    "body": "Shoulder arthritis is a degenerative condition that involves the breakdown of joint cartilage, leading to chronic pain, stiffness, and loss of motion.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--shoulder-arthritis--thumbnail.png"
  },
  {
    "slug": "shoulder-tendonitis",
    "title": "Shoulder Tendonitis",
    "tag": "Shoulder",
    "body": "Shoulder tendonitis is an overuse injury that causes inflammation of the rotator cuff or biceps tendons, leading to pain and limited motion.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--shoulder-tendonitis--thumbnail.png"
  },
  {
    "slug": "shoulder-pain",
    "title": "Shoulder Pain",
    "tag": "Shoulder",
    "body": "Shoulder pain can come from the rotator cuff, labrum, joint cartilage, bursa, AC joint, frozen capsule, or even the neck, so the pain pattern matters.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--shoulder-pain--thumbnail.png"
  },
  {
    "slug": "shoulder-impingement",
    "title": "Shoulder Impingement",
    "tag": "Shoulder",
    "body": "Shoulder impingement occurs when the rotator cuff tendons are compressed under the acromion bone, causing pain and limited overhead motion.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--shoulder-impingement--thumbnail.png"
  },
  {
    "slug": "frozen-shoulder",
    "title": "Frozen Shoulder",
    "tag": "Shoulder",
    "body": "Frozen shoulder, or adhesive capsulitis, causes progressive stiffness and pain in the shoulder joint, significantly limiting range of motion.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--frozen-shoulder--thumbnail.png"
  },
  {
    "slug": "shoulder-instability",
    "title": "Shoulder Instability",
    "tag": "Shoulder",
    "body": "Shoulder instability occurs when the shoulder joint is loose or slips out of place, causing pain, weakness, and a feeling that the shoulder may dislocate.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--shoulder-instability--thumbnail.png"
  },
  {
    "slug": "biceps-tendonitis-shoulder",
    "title": "Biceps Tendonitis (Shoulder)",
    "tag": "Shoulder",
    "body": "Biceps tendonitis in the shoulder causes inflammation of the long head of the biceps tendon, leading to pain in the front of the shoulder and upper arm.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--biceps-tendonitis-shoulder--thumbnail.png"
  },
  {
    "slug": "acromioclavicular-joint-arthritis",
    "title": "Acromioclavicular Joint Arthritis",
    "tag": "Shoulder",
    "body": "AC joint arthritis causes focal pain at the top of the shoulder where the collarbone meets the shoulder blade.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--acromioclavicular-joint-arthritis--thumbnail.png"
  },
  {
    "slug": "shoulder-bursitis",
    "title": "Shoulder Bursitis",
    "tag": "Shoulder",
    "body": "Shoulder bursitis is inflammation of the bursa, a fluid-filled sac that cushions the rotator cuff tendons, causing pain and limited motion.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--shoulder-bursitis--thumbnail.png"
  },
  {
    "slug": "rotator-cuff-tendonitis",
    "title": "Rotator Cuff Tendonitis",
    "tag": "Shoulder",
    "body": "Rotator cuff tendonitis is inflammation of the rotator cuff tendons, often caused by overuse or impingement, leading to shoulder pain and weakness.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--rotator-cuff-tendonitis--thumbnail.png"
  },
  {
    "slug": "snapping-hip-syndrome",
    "title": "Snapping Hip Syndrome",
    "tag": "Hip",
    "body": "Snapping hip syndrome is a condition where a tendon moves over a bone in the hip, creating an audible or palpable snapping sensation.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--snapping-hip-syndrome--thumbnail.png"
  },
  {
    "slug": "hip-pain",
    "title": "Hip Pain",
    "tag": "Hip",
    "body": "Hip pain may come from the ball-and-socket joint, tendons, bursae, pelvis, or lower spine, so location and movement pattern matter.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--hip-pain--thumbnail.png"
  },
  {
    "slug": "hip-arthritis",
    "title": "Hip Arthritis",
    "tag": "Hip",
    "body": "Hip arthritis is a degenerative condition where the cartilage in the hip joint wears away, causing pain, stiffness, and reduced mobility.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--hip-arthritis--thumbnail.png"
  },
  {
    "slug": "hip-labral-tear",
    "title": "Hip Labral Tear",
    "tag": "Hip",
    "body": "A hip labral tear involves damage to the cartilage ring that deepens and stabilizes the hip socket, causing deep pain, clicking, and instability.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--hip-labral-tear--thumbnail.png"
  },
  {
    "slug": "avascular-necrosis",
    "title": "Avascular Necrosis",
    "tag": "Hip",
    "body": "Avascular necrosis (AVN) is a condition where bone tissue dies due to lack of blood supply, most commonly affecting the hip joint and leading to joint collapse.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--avascular-necrosis--thumbnail.png"
  },
  {
    "slug": "hip-bursitis",
    "title": "Hip Bursitis",
    "tag": "Hip",
    "body": "Hip bursitis is inflammation of the fluid-filled sacs (bursae) that cushion the hip joint, causing pain on the outer hip that worsens with activity.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--hip-bursitis--thumbnail.png"
  },
  {
    "slug": "hip-fracture",
    "title": "Hip Fracture",
    "tag": "Hip",
    "body": "A hip fracture is a break in the upper part of the thighbone (femur) near the hip joint, typically requiring urgent surgical treatment to restore function.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--hip-fracture--thumbnail.png"
  },
  {
    "slug": "spinal-bone-spurs",
    "title": "Spinal Bone Spurs",
    "tag": "Spine",
    "body": "Spinal bone spurs, or osteophytes, are bony growths that form on the spine, often due to arthritis, and can cause pain by compressing nerves.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--spinal-bone-spurs--thumbnail.png"
  },
  {
    "slug": "spinal-stenosis",
    "title": "Spinal Stenosis",
    "tag": "Spine",
    "body": "Spinal stenosis is a narrowing of the spinal canal that can compress the spinal cord and nerves, causing pain, numbness, or weakness.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--spinal-stenosis--thumbnail.png"
  },
  {
    "slug": "spine-deformities",
    "title": "Spine Deformities",
    "tag": "Spine",
    "body": "Adult spinal deformity — including scoliosis, kyphosis, and sagittal imbalance — causes chronic pain, postural change, and nerve compression that may require surgical correction. Our fellowship-trained spine surgeons evaluate the full three-dimensional alignment of your spine and design treatment plans that address both the structural abnormality and your specific symptoms.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--spine-deformities--thumbnail.png"
  },
  {
    "slug": "synovitis",
    "title": "Synovitis",
    "tag": "Knee",
    "body": "Synovitis is the inflammation of the synovial membrane that lines a joint, which causes pain, swelling, and stiffness.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--synovitis--thumbnail.png"
  },
  {
    "slug": "tingling-or-numbness-in-extremities",
    "title": "Tingling or Numbness in Extremities",
    "tag": "Spine",
    "body": "Tingling or numbness in the arms, hands, legs, or feet is often a sign of nerve compression or irritation that requires expert evaluation. Common causes include <Link href='/conditions/spinal-stenosis'>Spinal Stenosis</a> and <Link href='/conditions/herniated-disc'>Herniated Disc</a>.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--tingling-or-numbness-in-extremities--thumbnail.png"
  },
  {
    "slug": "herniated-disc",
    "title": "Herniated Disc",
    "tag": "Spine",
    "body": "A herniated disc, also known as a slipped or ruptured disc, occurs when a disc's soft core pushes out and presses on a nerve, causing significant pain.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--herniated-disc--thumbnail.png"
  },
  {
    "slug": "rheumatoid-arthritis",
    "title": "Rheumatoid Arthritis",
    "tag": "Hand",
    "body": "Rheumatoid arthritis is an autoimmune inflammatory arthritis that can damage joints, tendons, and alignment when persistent swelling is not controlled.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--rheumatoid-arthritis--thumbnail.png"
  },
  {
    "slug": "tennis-elbow",
    "title": "Tennis Elbow",
    "tag": "Hand",
    "body": "Tennis elbow is tendon overload at the outside of the elbow, often causing grip pain, forearm aching, and weakness with lifting or twisting.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--tennis-elbow--thumbnail.png"
  },
  {
    "slug": "plantar-fasciitis",
    "title": "Plantar Fasciitis",
    "tag": "Foot",
    "body": "Plantar fasciitis is a common source of bottom-of-heel pain caused by overload and irritation where the plantar fascia attaches to the heel bone.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--plantar-fasciitis--thumbnail.png"
  },
  {
    "slug": "bursitis",
    "title": "Bursitis",
    "tag": "Knee",
    "body": "Bursitis is the inflammation of a bursa, a small, fluid-filled sac near a joint, which causes localized pain, swelling, and tenderness.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--bursitis--thumbnail.png"
  },
  {
    "slug": "bunions-hallux-valgus",
    "title": "Bunions (Hallux Valgus)",
    "tag": "Foot",
    "body": "A bunion is a painful bony bump that develops at the base of the big toe as it drifts inward, causing deformity and difficulty with footwear.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--bunions-hallux-valgus--thumbnail.png"
  },
  {
    "slug": "achilles-tendonitis",
    "title": "Achilles Tendonitis",
    "tag": "Foot",
    "body": "Achilles tendonitis is a common overuse injury of the tendon connecting the calf muscles to the heel, causing pain and stiffness at the back of the ankle.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--achilles-tendonitis--thumbnail.png"
  },
  {
    "slug": "flat-feet",
    "title": "Flat Feet",
    "tag": "Foot",
    "body": "Flat feet, or fallen arches, occur when the arch of the foot collapses, which can lead to pain, imbalance, and other lower body issues.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--flat-feet--thumbnail.png"
  },
  {
    "slug": "ankle-arthroscopy",
    "title": "Ankle Arthroscopy",
    "tag": "Foot",
    "body": "Ankle arthroscopy is a minimally invasive surgical procedure that allows surgeons to diagnose and treat a wide range of ankle joint problems.",
    "card_img": "https://mountainspineortho.b-cdn.net/Orthopedic%20Website%20(11).png"
  },
  {
    "slug": "hammer-toes",
    "title": "Hammertoes",
    "tag": "Foot",
    "body": "A hammertoe is a progressive toe deformity where a toe bends abnormally at the middle joint, causing pain, corns, and difficulty with shoes.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--hammer-toes--thumbnail.png"
  },
  {
    "slug": "diabetic-foot-ulcers",
    "title": "Diabetic Foot Ulcers",
    "tag": "Foot",
    "body": "Diabetic foot ulcers are open sores on the foot that can lead to serious infection and amputation if not treated by a specialist.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--diabetic-foot-ulcers--thumbnail.png"
  },
  {
    "slug": "ankle-replacement",
    "title": "Ankle Replacement",
    "tag": "Foot",
    "body": "Ankle replacement is an advanced surgical procedure to treat severe ankle arthritis by replacing damaged bone and cartilage with a prosthesis.",
    "card_img": "https://mountainspineortho.b-cdn.net/Orthopedic%20Website%20(16).jpg"
  },
  {
    "slug": "running-injuries",
    "title": "Running Injuries",
    "tag": "Sports Medicine",
    "body": "Running injuries are common among runners of all levels, from beginners to elite athletes. Proper diagnosis and treatment help maintain performance and prevent chronic issues.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--running-injuries--thumbnail.png"
  },
  {
    "slug": "golf-injuries",
    "title": "Golf Injuries",
    "tag": "Sports Medicine",
    "body": "Golf injuries commonly affect the lower back, shoulders, elbows, and wrists due to the rotational forces and repetitive motions of the golf swing. Proper evaluation helps maintain your game.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--golf-injuries--thumbnail.png"
  },
  {
    "slug": "tennis-injuries",
    "title": "Tennis Injuries",
    "tag": "Sports Medicine",
    "body": "Tennis injuries commonly affect the shoulder, elbow, wrist, and lower back due to repetitive overhead motions, rotational forces, and quick directional changes on the court.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--tennis-injuries--thumbnail.png"
  },
  {
    "slug": "pickleball-injuries",
    "title": "Pickleball Injuries",
    "tag": "Sports Medicine",
    "body": "Pickleball injuries commonly affect the shoulder, elbow, knee, and ankle due to quick lateral movements, overhead shots, and repetitive motions on the court.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--pickleball-injuries--thumbnail.png"
  },
  {
    "slug": "swimming-injuries",
    "title": "Swimming Injuries",
    "tag": "Sports Medicine",
    "body": "Swimming injuries typically affect the shoulder, neck, and lower back due to repetitive overhead motions and biomechanical imbalances in stroke technique.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--swimming-injuries--thumbnail.png"
  },
  {
    "slug": "cycling-injuries",
    "title": "Cycling Injuries",
    "tag": "Sports Medicine",
    "body": "Cycling injuries commonly affect the lower back, knees, neck, and hands due to prolonged positioning, repetitive pedaling motions, and bike fit issues.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--cycling-injuries--thumbnail.png"
  },
  {
    "slug": "crossfit-injuries",
    "title": "CrossFit Injuries",
    "tag": "Sports Medicine",
    "body": "CrossFit injuries can affect various body parts due to high-intensity, varied movements and sometimes improper form or rapid progression.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--crossfit-injuries--thumbnail.png"
  },
  {
    "slug": "weightlifting-injuries",
    "title": "Weightlifting Injuries",
    "tag": "Sports Medicine",
    "body": "Weightlifting injuries commonly affect the lower back, shoulders, knees, and wrists due to heavy loads, improper form, or rapid progression.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--weightlifting-injuries--thumbnail.png"
  },
  {
    "slug": "yoga-injuries",
    "title": "Yoga Injuries",
    "tag": "Sports Medicine",
    "body": "Yoga injuries can affect the lower back, shoulders, wrists, and knees due to overstretching, improper alignment, or pushing beyond limits.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--yoga-injuries--thumbnail.png"
  },
  {
    "slug": "surfing-injuries",
    "title": "Surfing Injuries",
    "tag": "Sports Medicine",
    "body": "Surfing injuries commonly affect the shoulder, lower back, neck, and knees due to paddling motions, wipeouts, and board impacts.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--surfing-injuries--thumbnail.png"
  },
  {
    "slug": "water-sports-injuries",
    "title": "Water Sports Injuries",
    "tag": "Sports Medicine",
    "body": "Water sports injuries can affect various body parts depending on the activity, including shoulders, lower back, knees, and extremities from impacts or overuse.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--water-sports-injuries--thumbnail.png"
  },
  {
    "slug": "throwing-injuries",
    "title": "Throwing Injuries",
    "tag": "Sports Medicine",
    "body": "Throwing injuries commonly affect the shoulder and elbow due to the high forces and repetitive overhead motions in sports like baseball, softball, and football.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--throwing-injuries--thumbnail.png"
  },
  {
    "slug": "beach-volleyball-injuries",
    "title": "Beach Volleyball Injuries",
    "tag": "Sports Medicine",
    "body": "Beach volleyball injuries commonly affect the shoulders, lower back, knees, and ankles due to jumping, diving, and quick lateral movements on sand.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--beach-volleyball-injuries--thumbnail.png"
  },
  {
    "slug": "trigger-finger",
    "title": "Trigger Finger",
    "tag": "Hand",
    "body": "Trigger finger is a condition where a finger or thumb gets stuck in a bent position and may snap straight, caused by inflammation of the tendon sheath.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--trigger-finger--thumbnail.png"
  },
  {
    "slug": "cubital-tunnel-syndrome",
    "title": "Cubital Tunnel Syndrome",
    "tag": "Hand",
    "body": "Cubital tunnel syndrome is a nerve compression condition causing numbness and tingling in the ring and small fingers due to pressure on the ulnar nerve at the elbow.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--cubital-tunnel-syndrome--thumbnail.png"
  },
  {
    "slug": "golfers-elbow",
    "title": "Golfer's Elbow",
    "tag": "Hand",
    "body": "Golfer's elbow (medial epicondylitis) is an overuse injury causing pain on the inside of the elbow from repetitive wrist flexion and gripping activities.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--golfers-elbow--thumbnail.png"
  },
  {
    "slug": "wrist-pain",
    "title": "Wrist Pain",
    "tag": "Hand",
    "body": "Wrist pain may come from bone, ligament, tendon, cartilage, arthritis, or nerve compression, and the location of pain is the first diagnostic clue.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--wrist-pain--thumbnail.png"
  },
  {
    "slug": "hand-pain",
    "title": "Hand Pain",
    "tag": "Hand",
    "body": "Hand pain can affect grip strength and fine motor function, arising from arthritis, injuries, nerve conditions, or tendon problems.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--hand-pain--thumbnail.png"
  },
  {
    "slug": "elbow-pain",
    "title": "Elbow Pain",
    "tag": "Hand",
    "body": "Elbow pain can result from overuse injuries, arthritis, nerve compression, or trauma, affecting arm strength and daily activities.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--elbow-pain--thumbnail.png"
  },
  {
    "slug": "dupuytrens-contracture",
    "title": "Dupuytren's Contracture",
    "tag": "Hand",
    "body": "Dupuytren's contracture is a hand condition where thick cords form under the palm skin, gradually pulling fingers into a bent position.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--dupuytrens-contracture--thumbnail.png"
  },
  {
    "slug": "de-quervains",
    "title": "De Quervain's Tenosynovitis",
    "tag": "Hand",
    "body": "De Quervain's tenosynovitis causes painful swelling of the tendons on the thumb side of the wrist, affecting grip and thumb movement.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--de-quervains--thumbnail.png"
  },
  {
    "slug": "tfcc-tear",
    "title": "TFCC Tear",
    "tag": "Hand",
    "body": "A TFCC tear is an injury to the triangular fibrocartilage complex on the pinky side of the wrist, causing pain with gripping and rotation.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--tfcc-tear--thumbnail.png"
  },
  {
    "slug": "mortons-neuroma",
    "title": "Morton's Neuroma",
    "tag": "Foot",
    "body": "Morton's neuroma is a painful condition affecting the ball of the foot, caused by thickening of tissue around a nerve between the toes.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--mortons-neuroma--thumbnail.png"
  },
  {
    "slug": "ankle-arthritis",
    "title": "Ankle Arthritis",
    "tag": "Ankle",
    "body": "Ankle arthritis causes chronic pain, stiffness, and swelling in the ankle joint due to cartilage breakdown, often from prior injury or wear and tear.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--ankle-arthritis--thumbnail.png"
  },
  {
    "slug": "heel-pain",
    "title": "Heel Pain",
    "tag": "Foot",
    "body": "Heel pain is a symptom, not a single diagnosis; pain location and timing help separate plantar fascia, Achilles, bone, nerve, and fat-pad problems.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--heel-pain--thumbnail.png"
  },
  {
    "slug": "ankle-pain",
    "title": "Ankle Pain",
    "tag": "Ankle",
    "body": "Ankle pain affects mobility and can result from sprains, arthritis, tendonitis, or fractures. Expert evaluation ensures proper treatment.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--ankle-pain--thumbnail.png"
  },
  {
    "slug": "ankle-instability",
    "title": "Chronic Ankle Instability",
    "tag": "Ankle",
    "body": "Chronic ankle instability causes repeated ankle sprains and a feeling of the ankle giving way, often from inadequately healed ligament injuries.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--ankle-instability--thumbnail.png"
  },
  {
    "slug": "chronic-pain",
    "title": "Chronic Pain",
    "tag": "Pain Management",
    "body": "Chronic pain is persistent pain lasting beyond 3-6 months that affects daily function and quality of life, requiring comprehensive multimodal pain management.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--chronic-pain--thumbnail.png"
  },
  {
    "slug": "nerve-pain",
    "title": "Nerve Pain",
    "tag": "Pain Management",
    "body": "Nerve pain (neuropathic pain) is caused by nerve damage or dysfunction, producing burning, shooting, or electric shock-like sensations requiring specialized pain management.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--nerve-pain--thumbnail.png"
  },
  {
    "slug": "radiculopathy",
    "title": "Radiculopathy",
    "tag": "Spine",
    "body": "Radiculopathy is a pinched spinal nerve root causing radiating pain, numbness, or weakness in the arm or leg served by that nerve.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--radiculopathy--thumbnail.png"
  },
  {
    "slug": "slap-tear",
    "title": "SLAP Tear",
    "tag": "Shoulder",
    "body": "A SLAP tear is an injury to the labrum (the rim of cartilage around the shoulder socket). It can cause deep shoulder pain, clicking or catching, weakness with lifting, and pain with overhead motions.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--slap-tear--thumbnail.png"
  },
  {
    "slug": "shoulder-dislocation",
    "title": "Shoulder Dislocation",
    "tag": "Shoulder",
    "body": "A shoulder dislocation happens when the upper arm bone comes out of the socket. It often causes sudden severe pain, visible deformity, and loss of motion.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--shoulder-dislocation--thumbnail.png"
  },
  {
    "slug": "ac-joint-injury",
    "title": "AC Joint Injury",
    "tag": "Shoulder",
    "body": "An AC (acromioclavicular) joint injury—often called a shoulder separation—occurs where the collarbone meets the shoulder. It commonly happens after a fall onto the shoulder or contact sports.",
    "card_img": "https://mountainspineortho.b-cdn.net/conditions-thumbnails/mountain-spine-orthopedics--condition--ac-joint-injury--thumbnail.png"
  }
];

export const treatmentIndex: TaxonomyEntry[] = [
  {
    "slug": "orthopedic-injections",
    "title": "Orthopedic Injections",
    "tag": "Pain Management",
    "body": "Board-certified orthopedic specialists offering cortisone shots, epidural steroid injections, nerve blocks, facet & SI joint injections for back, neck, knee, shoulder, and hip pain. Same-week appointments, no referral needed.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/orthopedic-injections-mountain-spine-orthopedics.png"
  },
  {
    "slug": "revision-spinal-surgery",
    "title": "Revision Spinal Surgery",
    "tag": "Spine",
    "body": "Revision spinal surgery is considered when pain, weakness, numbness, deformity, or instability persists or returns after a prior decompression, disc surgery, or spinal fusion. The goal is not simply to repeat surgery. The goal is to identify a correctable structural reason for the ongoing symptoms.Possible causes include pseudarthrosis (failed fusion or nonunion), recurrent stenosis, recurrent disc herniation, adjacent segment disease, flatback or sagittal imbalance, progressive adult degenerative scoliosis, misplaced or loosened hardware, fractured instrumentation, infection, or nerve compression from bone, disc, or scar. Pseudarthrosis creates persistent micromotion at a level that was supposed to heal into solid bone, which can produce deep pain, grinding or clicking, continued nerve symptoms, and hardware loosening.Mountain Spine & Orthopedics begins with prior operative reports, CT, MRI, standing X-rays, flexion-extension imaging when needed, and a neurologic exam before recommending any revision plan. When failed fusion is suspected, thin-slice CT helps assess bone bridging and implant integrity, while risk factors such as nicotine use, diabetes, poor nutrition, steroid exposure, vitamin D deficiency, and multilevel fusion history are reviewed before planning another operation. PPO Insurance Accepted.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--revision-spinal-surgery--thumbnail.png"
  },
  {
    "slug": "multilevel-degenerative-disc-disease-surgery",
    "title": "Multilevel Degenerative Disc Disease Surgery",
    "tag": "Spine",
    "body": "Multilevel Degenerative Disc Disease occurs when two or more intervertebral discs lose their height, hydration, and structural integrity simultaneously — creating widespread instability, nerve compression, and often a progressive coronal or sagittal deformity. In many patients, multilevel DDD is the direct mechanical cause of adult degenerative scoliosis: as discs collapse asymmetrically, the spine curves sideways and forward. Surgical treatment must address both the disc disease and any resulting deformity at the same time. At Mountain Spine & Orthopedics, our approach to multilevel DDD surgery is highly individualized. Depending on how many levels are involved and whether significant deformity is present, we select the optimal access strategy — TLIF, ALIF, OLIF, or XLIF — to restore disc height, decompress nerves, and achieve solid spinal fusion across all affected segments. When the resulting curve is the dominant problem rather than the disc disease itself, the plan is built as adult scoliosis surgery.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--multilevel-degenerative-disc-disease-surgery--thumbnail.png"
  },
  {
    "slug": "anterior-lumbar-corpectomy-and-fusion",
    "title": "Anterior Lumbar Corpectomy and Fusion",
    "tag": "Lower Spine",
    "body": "Anterior Lumbar Corpectomy and Fusion (ALCF) is a major reconstructive surgery used when a vertebral body is severely damaged by a Spinal Compression Fractures, tumor, or infection. Unlike a standard discectomy, this procedure involves removing the entire vertebral bone and the discs above and below it. The surgeon then inserts a specialized expandable cage or vertebral body replacement (VBR) device to restore the spine's structural integrity. This is often necessary to prevent spinal collapse and protect the spinal cord.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--anterior-lumbar-corpectomy-and-fusion--thumbnail.png"
  },
  {
    "slug": "anterior-lumbar-interbody-fusion",
    "title": "Anterior Lumbar Interbody Fusion (ALIF)",
    "tag": "Lower Spine",
    "body": "Anterior Lumbar Interbody Fusion (ALIF) is a spinal fusion technique that approaches the lumbar spine through the abdomen rather than through the back muscles. This anterior approach offers a distinct anatomical advantage: it allows placement of large interbody cages that restore substantial disc height and lumbar lordosis (the natural forward curve of the lower spine). ALIF is particularly valuable for treating degenerative flatback, adult scoliosis requiring sagittal balance correction, and severe disc disease at L4-5 and L5-S1. Because the posterior muscles and bone structures are preserved, ALIF maintains these tissues for potential posterior instrumentation — in a combined or staged procedure — and is associated with high fusion rates.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--anterior-lumbar-interbody-fusion--thumbnail.png"
  },
  {
    "slug": "hybrid-lumbar-spine-surgery",
    "title": "Hybrid Lumbar Spine Surgery",
    "tag": "Lower Spine",
    "body": "Hybrid Lumbar Spine Surgery is an innovative solution for patients with multilevel spine problems. Instead of fusing the entire lower back, which restricts movement, we combine two techniques: Lumbar Fusion Surgery at the most unstable level and Artificial Disc Replacement Surgery at the functional level. This preserves natural biomechanics, reduces stiffness, and prevents stress on adjacent discs, offering a superior alternative to long multi-level fusions.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--hybrid-lumbar-spine-surgery--thumbnail.png"
  },
  {
    "slug": "lumbar-fusion-surgery",
    "title": "Lumbar Fusion Surgery",
    "tag": "Lower Spine",
    "body": "Lumbar Fusion Surgery is a reconstructive procedure that permanently joins two or more vertebrae in the lower back, eliminating painful motion at damaged or unstable spinal segments. By fusing these vertebrae into a single solid unit, we address the mechanical cause of chronic lower back and leg pain from degenerative disc disease, spondylolisthesis, and adult degenerative scoliosis. At Mountain Spine & Orthopedics, we use minimally invasive techniques whenever appropriate — reducing muscle disruption, blood loss, and recovery time compared to traditional open lumbar fusion. For how fusion is used across the cervical, thoracic and lumbar spine, and how surgeons decide whether fusion is the right operation at all, see Spinal Fusion Surgery.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--lumbar-fusion-surgery--thumbnail.png"
  },
  {
    "slug": "spinal-fusion",
    "title": "Spinal Fusion Surgery",
    "tag": "Spine",
    "body": "Spinal fusion surgery stabilizes two or more vertebrae so they heal into one solid segment. It may be considered when pain or nerve symptoms are driven by confirmed instability, deformity, spondylolisthesis, recurrent stenosis with instability risk, pseudarthrosis, traumatic instability, or selected cases of severe degenerative disc disease.Fusion is not the right answer for every back or neck pain complaint. The decision depends on whether imaging, standing alignment, neurologic findings, and symptoms all point to a structural problem that fusion can reasonably address. Mountain Spine & Orthopedics performs fusion across cervical, thoracic, and lumbar levels, including lumbar fusion surgery, with minimally invasive approaches considered when anatomy and goals support them.For selected L5-S1 pathology, the fusion discussion may include specialized access options such as Axial Lumbar Interbody Fusion (AxiaLIF), a presacral approach that reaches the L5-S1 disc space through a small incision near the tailbone. This technique is not a general substitute for lumbar fusion; it is considered only when the anatomy, diagnosis, and surgical goals fit a targeted lumbosacral fusion. PPO Insurance Accepted.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--spinal-fusion--thumbnail.png"
  },
  {
    "slug": "understanding-tlif-surgery",
    "title": "Transforaminal Lumbar Interbody Fusion (TLIF)",
    "tag": "Lower Spine",
    "body": "Transforaminal Lumbar Interbody Fusion (TLIF) is one of the most widely performed spinal fusion techniques in modern spine surgery. It accesses the damaged disc space through a posterior (back of the body) approach via the 'transforaminal corridor' — the natural window where the nerve root exits — allowing the surgeon to simultaneously decompress nerve structures and fuse the vertebral segment in a single operation. TLIF is highly effective for spondylolisthesis, severe degenerative disc disease, recurrent disc herniation, and adult scoliosis requiring lumbar stabilization.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--understanding-tlif-surgery--thumbnail.png"
  },
  {
    "slug": "posterior-cervical-fusion-with-instrumentation-surgery",
    "title": "Posterior Cervical Fusion with Instrumentation Surgery",
    "tag": "Neck",
    "body": "Posterior Cervical Fusion with Instrumentation Surgery is a specialized procedure performed through the back of the neck to stabilize the cervical spine. It is often required for patients suffering from traumatic fractures, significant Spinal Instability, or severe deformities like Kyphosis. By using FDA-approved titanium screws and rods (instrumentation) alongside bone graft, we create an internal brace that holds the vertebrae rigidly in place, allowing them to fuse into a solid bone. This prevents dangerous motion that could damage the spinal cord. For more information on spinal instability, visit our Spinal Stenosis page.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--posterior-cervical-fusion-with-instrumentation-surgery--thumbnail.png"
  },
  {
    "slug": "posterior-cervical-fusion-surgery",
    "title": "Posterior Cervical Fusion Surgery",
    "tag": "Neck",
    "body": "Posterior Cervical Fusion Surgery is performed to permanently join two or more vertebrae in the neck, eliminating painful motion between them. This approach is particularly effective when the spinal cord is compressed from the back or when multiple levels of the spine need stabilization due to Cervical Spondylosis (arthritis). Unlike anterior surgery (ACDF), this approach avoids the throat area and allows the surgeon to address compression directly from the rear, often combined with a Laminectomy for maximum spinal cord space.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--posterior-cervical-fusion-surgery--thumbnail.png"
  },
  {
    "slug": "anterior-cervical-corpectomy-and-fusion",
    "title": "Anterior Cervical Corpectomy and Fusion",
    "tag": "Neck",
    "body": "Anterior Cervical Corpectomy and Fusion (ACCF) is a more extensive procedure than a standard ACDF Surgery. It involves the removal of the entire vertebral body (the bone itself) and the discs above and below it. This is necessary when Spinal Stenosis is caused by bone spurs behind the vertebral body, or in cases of Spinal Compression Fractures and tumors. After removing the bone to decompress the spinal cord, a cage or strut graft is inserted to reconstruct the spine's column.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--anterior-cervical-corpectomy-and-fusion--thumbnail.png"
  },
  {
    "slug": "acdf-surgery",
    "title": "ACDF Surgery",
    "tag": "Neck",
    "body": "ACDF Surgery (Anterior Cervical Discectomy and Fusion) is one of the most common and successful spine surgeries performed today. It treats a Pinched Nerve or spinal cord compression in the neck. By approaching from the front (anterior), surgeons can safely remove a Cervical Herniated Disc without moving the spinal cord. Once the disc is removed, a spacer with bone graft is inserted to fuse the vertebrae, restoring height and stopping painful motion.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--acdf-surgery--thumbnail.png"
  },
  {
    "slug": "lumbar-disc-replacement-surgery",
    "title": "Lumbar Disc Replacement Surgery",
    "tag": "Lower Spine",
    "body": "Lumbar Disc Replacement Surgery (Total Disc Arthroplasty) is a revolutionary alternative to Lumbar Fusion Surgery for eligible patients. Instead of locking the vertebrae together, we remove the painful, degenerated disc and replace it with a mobile artificial implant. This mechanical device mimics the natural movement of a healthy disc, allowing for flexion, extension, and rotation. This helps maintain a natural range of motion and may protect adjacent discs from future wear.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--lumbar-disc-replacement-surgery--thumbnail.png"
  },
  {
    "slug": "artificial-disc-replacement-surgery",
    "title": "Artificial Disc Replacement Surgery",
    "tag": "Spine",
    "body": "Artificial Disc Replacement Surgery (ADR) represents the forefront of Motion Preservation Spine Surgery. Whether in the neck (cervical) or lower back (lumbar), the goal is the same: remove the source of pain—the damaged disc—without sacrificing the spine's ability to move. By implanting a device that slides and rotates, we can treat conditions like Degenerative Disc Disease and Herniated Discs while maintaining near-normal biomechanics, which may prevent future surgeries.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--artificial-disc-replacement-surgery--thumbnail.png"
  },
  {
    "slug": "cervical-disc-arthroplasty",
    "title": "Cervical Disc Arthroplasty",
    "tag": "Neck",
    "body": "Cervical Disc Arthroplasty replaces a damaged cervical disc with an artificial disc after the nerve root or spinal cord has been decompressed. It is most often considered for a single-level or selected two-level cervical herniated disc, bone spur, or disc collapse causing arm pain, numbness, tingling, or weakness. Unlike ACDF surgery, which locks the treated segment, disc arthroplasty is designed to maintain motion at the operated level when the joints, alignment, and bone quality make motion preservation appropriate.The decision is not simply \"replacement instead of fusion.\" Patients with severe facet arthritis, marked instability, osteoporosis, deformity, infection, or advanced multilevel degeneration may be better served by fusion or another cervical procedure. At Mountain Spine & Orthopedics, the surgical recommendation is based on symptoms, neurological findings, MRI or CT results, X-rays that show motion and alignment, and the patient's functional goals.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--cervical-disc-arthroplasty--thumbnail.png"
  },
  {
    "slug": "motion-preservation-spine-surgery",
    "title": "Motion Preservation Spine Surgery",
    "tag": "Spine",
    "body": "Motion Preservation Spine Surgery refers to a family of advanced procedures designed to treat spinal pathology without fusing the vertebrae. Traditional surgery often eliminates motion to stop pain, but this can stress the rest of the spine. Our techniques, such as Artificial Disc Replacement Surgery and Posterior Cervical Laminoplasty, aim to decompress nerves and stabilize the spine while retaining its natural ability to move. This philosophy is central to our practice at Mountain Spine & Orthopedics.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--motion-preservation-spine-surgery--thumbnail.png"
  },
  {
    "slug": "total-hip-replacement",
    "title": "Total Hip Replacement Surgery",
    "tag": "Hip",
    "body": "Total Hip Replacement (THA) is one of the most successful surgeries in modern medicine. It is designed to relieve the debilitating pain of hip arthritis, including osteoarthritis and rheumatoid arthritis, or avascular necrosis.During the procedure, the damaged ball (femoral head) and socket (acetabulum) are removed and replaced with durable artificial components (metal, ceramic, or high-grade plastic). This new joint glides smoothly, eliminating the bone-on-bone friction that causes chronic pain and restoring function.Our hip specialists use advanced minimally invasive techniques whenever possible to minimize tissue disruption, reduce pain, and accelerate recovery. Modern hip replacements are designed to last 15-25 years or more, providing long-term relief and improved quality of life.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--total-hip-replacement--thumbnail.png"
  },
  {
    "slug": "total-knee-replacement",
    "title": "Total Knee Replacement Surgery",
    "tag": "Knee",
    "body": "Total Knee Replacement (TKA), also called total knee arthroplasty, is used when knee arthritis has damaged more than one compartment of the joint and daily function is limited by pain, stiffness, swelling, or deformity. The operation does not replace the entire knee with a hinge; it resurfaces the worn ends of the femur and tibia with metal components and places a medical-grade plastic spacer between them. The undersurface of the kneecap may also be resurfaced when indicated.The central goal is alignment and balance. A knee replacement that is well aligned, stable in flexion and extension, and matched to the patient's anatomy can reduce bone-on-bone pain and improve walking, stairs, and standing tolerance. Mountain Spine & Orthopedics evaluates X-rays, deformity, range of motion, ligament stability, medical risk, and prior treatments before recommending surgery.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--total-knee-replacement--thumbnail.png"
  },
  {
    "slug": "posterior-cervical-laminoplasty",
    "title": "Posterior Cervical Laminoplasty Surgery",
    "tag": "Neck",
    "body": "Posterior Cervical Laminoplasty is a specialized surgical technique designed to treat Cervical Spinal Stenosis and myelopathy (spinal cord compression) involving multiple levels of the neck. Unlike a laminectomy alone or a fusion, laminoplasty reconstructs the spinal canal to make it larger. The surgeon creates a hinge on the lamina (the roof of the spine) and opens it like a door, securing it in an open position with small plates. This gives the spinal cord immediate room to float freely while preserving the natural motion of the neck.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--posterior-cervical-laminoplasty--thumbnail.png"
  },
  {
    "slug": "posterior-cervical-foraminotomy-surgery",
    "title": "Posterior Cervical Foraminotomy Surgery",
    "tag": "Neck",
    "body": "Posterior Cervical Foraminotomy is a minimally invasive spine surgery used to treat Cervical Radiculopathy (nerve pain radiating into the arm). It addresses Foraminal Stenosis, which is the narrowing of the tunnel (foramen) where the nerve root exits the spinal cord. By accessing the spine from the back, the surgeon can shave away the bone spurs or herniated disc material compressing the nerve, creating more space. This procedure is unique because it relieves nerve pressure without requiring a spinal fusion.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--posterior-cervical-foraminotomy-surgery--thumbnail.png"
  },
  {
    "slug": "lumbar-laminectomy-surgery",
    "title": "Lumbar Laminectomy Surgery",
    "tag": "Lower Spine",
    "body": "Lumbar Laminectomy Surgery is an effective procedure primarily used to treat Lumbar Spinal Stenosis, a condition where the spinal canal narrows and pinches the nerves, causing leg pain and weakness when walking. Often called a 'decompression,' this surgery involves removing the lamina—the bony arch on the back of the vertebra—along with thickened ligaments and bone spurs. This creates immediate space for the nerves to drift back and relax, alleviating the pressure that causes neurogenic claudication.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--lumbar-laminectomy-surgery--thumbnail.png"
  },
  {
    "slug": "lumbar-decompression",
    "title": "Lumbar Decompression Surgery",
    "tag": "Lower Spine",
    "body": "Lumbar Decompression Surgery is a general term referring to various procedures performed to relieve pressure on the spinal nerve roots. Compressed nerves in the lower back are often the cause of Sciatica (shooting leg pain), numbness, and weakness. Decompression can be achieved through several techniques, including Laminectomy (removing bone), Discectomy (removing disc material), or Foraminotomy (widening the nerve tunnel). The goal is always the same: create space for the nerves to function properly.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--lumbar-decompression--thumbnail.png"
  },
  {
    "slug": "lumbar-microendoscopic-discectomy-surgery",
    "title": "Lumbar Microendoscopic Discectomy Surgery",
    "tag": "Lower Spine",
    "body": "Lumbar Microendoscopic Discectomy Surgery (MED) is an advanced, minimally invasive evolution of the traditional microdiscectomy. It is used to treat a Lumbar Herniated Disc that is compressing a nerve and causing Sciatica. The procedure is performed through a tiny incision using a tubular retractor and a small camera (endoscope). This allows the surgeon to see the nerve and disc on a video screen without cutting or detaching the back muscles, leading to significantly less postoperative pain and scarring.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--lumbar-microendoscopic-discectomy-surgery--thumbnail.png"
  },
  {
    "slug": "lumbar-microdiscectomy-surgery",
    "title": "Lumbar Microdiscectomy Surgery",
    "tag": "Lower Spine",
    "body": "Lumbar Microdiscectomy Surgery is the gold standard surgical treatment for a symptomatic Lumbar Herniated Disc. When the inner gel of a disc leaks out and presses on a spinal nerve, it causes severe leg pain known as Sciatica. In this procedure, the surgeon uses a high-powered surgical microscope to view the spine through a small incision. This magnification allows for the precise removal of the herniated disc fragment while protecting the delicate nerve root, preserving spinal stability.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--lumbar-microdiscectomy-surgery--thumbnail.png"
  },
  {
    "slug": "degenerative-disc-disease-surgery",
    "title": "Degenerative Disc Disease Surgery",
    "tag": "Spine",
    "body": "Degenerative Disc Disease Surgery is not based on an MRI label alone. Many adults have worn discs without needing an operation. Surgery becomes a serious discussion when disc collapse, herniation, bone spurs, or segment instability match the patient's symptoms and have not improved with appropriate non-surgical care.The surgical target can differ from patient to patient. A collapsed lumbar disc may cause mechanical back pain, foraminal narrowing, or sciatica. A cervical disc may compress a nerve root and cause arm pain or weakness. Some patients need decompression for nerve pressure; others need spinal fusion for instability, or artificial disc replacement when motion preservation is appropriate. Mountain Spine & Orthopedics reviews imaging, exam findings, prior treatments, and functional limits before recommending a procedure.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--degenerative-disc-disease-surgery--thumbnail.png"
  },
  {
    "slug": "percutaneous-discectomy",
    "title": "Percutaneous Discectomy",
    "tag": "Neck",
    "body": "Percutaneous Discectomy is an ultra-minimally invasive procedure designed to treat small, contained Herniated Discs that cause Sciatica or radiculopathy. Unlike open surgery, this technique does not require cutting bone or muscle. Instead, a specialized needle or probe is inserted into the disc under X-ray guidance to remove or shrink the nucleus pulposus (the jelly-like center). This reduces pressure inside the disc, relieving the compression on the spinal nerve.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--percutaneous-discectomy--thumbnail.png"
  },
  {
    "slug": "resurfacing-shoulder-replacement",
    "title": "Resurfacing Shoulder Replacement Treatment",
    "tag": "Shoulder",
    "body": "Resurfacing Shoulder Replacement is a conservative surgical alternative to standard total shoulder replacement. Instead of cutting off the entire humeral head (ball of the shoulder), the surgeon simply smoothes the damaged surface and caps it with a metal prosthesis, similar to capping a tooth. This preserves the patient's natural bone stock, making it an excellent option for younger, active patients with Shoulder Arthritis or avascular necrosis who wish to maintain high activity levels. For how resurfacing compares with the other shoulder replacement options and when each is chosen, see Total Shoulder Replacement.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--resurfacing-shoulder-replacement--thumbnail.png"
  },
  {
    "slug": "hip-arthroscopy-treatment",
    "title": "Hip Arthroscopy Treatment",
    "tag": "Hip",
    "body": "Hip Arthroscopy Treatment is a specialized, minimally invasive procedure used to diagnose and treat problems inside the hip joint. Unlike traditional open surgery, it uses small incisions and a camera (arthroscope) to access the joint with minimal tissue disruption. This approach is highly effective for treating Femoroacetabular Impingement (FAI) and labral tears—conditions that cause deep groin pain, mechanical catching, and restricted hip motion in active individuals.Athletes and active patients often present with hip pain during pivoting, cutting, or deep squatting—movements that stress the labrum and impinging bone. Hip arthroscopy allows surgeons to reshape abnormal bone (CAM or Pincer lesions), repair or reconstruct the labrum, and remove inflamed tissue or loose bodies. Loose bodies are small cartilage or bone fragments that float within the joint after trauma, arthritis, avascular necrosis, osteochondritis dissecans, synovial chondromatosis, or prior injury. They can wedge between joint surfaces and cause sudden sharp pain, popping, catching, locking, swelling, and episodic loss of motion. The goal is to preserve the natural hip joint, relieve pain, and delay or prevent the onset of hip osteoarthritis. For those experiencing persistent hip conditions, early evaluation can determine if arthroscopy is appropriate.According to AAOS guidance on overuse injuries, repetitive hip stress in athletes can lead to labral damage that may benefit from surgical intervention when conservative measures fail. Hip arthroscopy has become a valuable tool in sports medicine for returning athletes to their activities with restored hip function and pain relief.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--hip-arthroscopy-treatment--thumbnail.png"
  },
  {
    "slug": "hip-labral-repair",
    "title": "Hip Labral Repair Surgery",
    "tag": "Hip",
    "body": "Hip Labral Repair is a specialized minimally invasive procedure performed through hip arthroscopy to repair or reconstruct a torn labrum. The labrum is a ring of fibrocartilage that deepens the hip socket and provides crucial stability to the joint.When the labrum is torn, it can no longer perform its stabilizing function, leading to deep groin pain, clicking sensations, and a feeling of instability. Labral repair involves reattaching the torn tissue to the bone using specialized anchors, while labral reconstruction may be necessary if the tissue is too damaged to repair.At Mountain Spine & Orthopedics, our hip preservation specialists use advanced arthroscopic techniques to restore the labrum's function, preserving the native hip joint and allowing patients to return to their active lifestyle with restored stability and pain relief.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--hip-labral-repair--thumbnail.png"
  },
  {
    "slug": "hip-resurfacing",
    "title": "Hip Resurfacing Surgery",
    "tag": "Hip",
    "body": "Hip resurfacing treats selected cases of hip arthritis by reshaping the femoral head and placing a cap over it rather than removing the full femoral head and neck as in total hip replacement. The socket is also resurfaced with an implant component.The procedure is not a generic replacement for every arthritic hip. Candidacy depends on bone quality, femoral head shape, implant sizing, arthritis pattern, activity goals, kidney function, metal sensitivity considerations, and whether there is deformity or bone loss. The main surgical-intent question is whether preserving femoral bone provides a meaningful advantage for the individual patient compared with modern total hip replacement.Mountain Spine & Orthopedics evaluates hip resurfacing candidates with X-rays, MRI or CT when needed, medical history, and a candid discussion of benefits, risks, and alternatives. PPO Insurance Accepted.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--hip-resurfacing--thumbnail.png"
  },
  {
    "slug": "hip-fracture-surgery",
    "title": "Hip Fracture Surgery",
    "tag": "Hip",
    "body": "Hip Fracture Surgery is an urgent procedure performed to treat hip fractures, which are serious injuries that typically require prompt surgical intervention. The specific procedure depends on the fracture type, location, patient age, and bone quality.For stable fractures in younger patients with good bone quality, internal fixation using screws, plates, or rods may be performed to hold the bone fragments in place while they heal. This minimally invasive approach preserves the native hip joint.For displaced fractures or fractures in older patients with poor bone quality, total hip replacement or hemiarthroplasty (replacing only the ball portion) may be recommended. This approach provides immediate stability, allows early weight-bearing, and reduces the risk of complications like avascular necrosis.At Mountain Spine & Orthopedics, our hip specialists provide urgent evaluation and treatment, using advanced techniques to optimize outcomes and minimize recovery time.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--hip-fracture-surgery--thumbnail.png"
  },
  {
    "slug": "revision-hip-replacement",
    "title": "Revision Hip Replacement Surgery",
    "tag": "Hip",
    "body": "Revision Hip Replacement is a complex procedure performed to address problems with a previous hip replacement, such as implant wear, loosening, infection, or failure. This procedure is more complex than the initial replacement and requires specialized expertise.Common reasons for revision include implant wear over time (typically 15-25 years), aseptic loosening (implant coming loose without infection), infection, instability or dislocation, periprosthetic fractures (fractures around the implant), and implant failure. Revision surgery involves removing the old components and replacing them with new, often more durable implants.At Mountain Spine & Orthopedics, our hip specialists have extensive experience with complex revision procedures, using advanced techniques and specialized implants to address bone loss, restore stability, and provide lasting pain relief. We work closely with each patient to understand their specific situation and develop a personalized revision plan.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--revision-hip-replacement--thumbnail.png"
  },
  {
    "slug": "hip-impingement-surgery",
    "title": "Hip Impingement Surgery",
    "tag": "Hip",
    "body": "Hip Impingement Surgery is performed to correct Femoroacetabular Impingement (FAI), a condition where abnormal bone growth causes damaging contact in the hip joint. This procedure reshapes the bone to eliminate impingement and preserve the joint.The surgery can be performed through minimally invasive hip arthroscopy or open surgery, depending on the extent of the impingement and associated damage. During the procedure, abnormal bone (CAM lesions on the femoral head or Pincer lesions on the socket rim) is reshaped to restore smooth joint mechanics.At Mountain Spine & Orthopedics, our hip preservation specialists use advanced techniques to correct impingement while addressing associated labral tears and cartilage damage. The goal is to preserve the native hip joint, relieve pain, and prevent the development of hip arthritis.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--hip-impingement-surgery--thumbnail.png"
  },
  {
    "slug": "core-decompression",
    "title": "Core Decompression for Avascular Necrosis",
    "tag": "Hip",
    "body": "Core Decompression is a minimally invasive procedure performed to treat early-stage avascular necrosis (AVN) of the hip before the femoral head collapses. The procedure involves drilling into the dead bone to relieve pressure and stimulate new blood vessel growth.AVN occurs when the blood supply to the femoral head is interrupted, causing bone death. If left untreated, the dead bone weakens and the femoral head collapses, leading to severe hip arthritis requiring joint replacement. Core decompression is most effective when performed early, before collapse occurs.At Mountain Spine & Orthopedics, our hip specialists use advanced imaging including MRI to detect AVN in its early stages. When appropriate, core decompression can preserve the hip joint and prevent the need for joint replacement, making early diagnosis and treatment crucial.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--core-decompression--thumbnail.png"
  },
  {
    "slug": "hip-bursectomy",
    "title": "Hip Bursectomy Surgery",
    "tag": "Hip",
    "body": "Hip Bursectomy is a minimally invasive procedure performed to remove an inflamed bursa when hip bursitis fails to respond to conservative treatment. The bursa is a small fluid-filled sac that cushions the hip joint, and when it becomes chronically inflamed, removal may be necessary.This procedure is typically reserved for severe, chronic cases of bursitis that have not responded to rest, rehabilitation, medications, or injections. The most common type is trochanteric bursectomy, which removes the bursa over the greater trochanter (the bony prominence on the outer hip).At Mountain Spine & Orthopedics, our specialists use minimally invasive techniques to remove the inflamed bursa while preserving surrounding tissues. This approach minimizes recovery time and allows for a rapid return to activities once healing is complete.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--hip-bursectomy--thumbnail.png"
  },
  {
    "slug": "arthroscopic-knee-surgery",
    "title": "Arthroscopic Knee Surgery",
    "tag": "Knee",
    "body": "Arthroscopic Knee Surgery is one of the most common orthopedic procedures performed today, using a small camera (arthroscope) inserted through tiny incisions to visualize, diagnose, and treat problems inside the knee joint. This minimally invasive approach allows surgeons to address meniscus tears, ACL injuries, cartilage damage, and other conditions with significantly less tissue disruption than traditional open surgery.For athletes and active individuals, knee arthroscopy offers a pathway to accurate diagnosis and treatment with faster recovery. Many patients walk out of the surgery center the same day. Whether you're dealing with a torn meniscus causing locking and catching, cartilage loose bodies causing mechanical symptoms, or need evaluation and treatment for knee conditions affecting your activity, arthroscopy provides both diagnostic clarity and therapeutic options in a single procedure.According to AAOS guidance on overuse injuries, many knee injuries in athletes result from repetitive stress and may benefit from arthroscopic evaluation and treatment when conservative care fails. The procedure's minimally invasive nature means less post-operative pain, reduced scarring, and a faster return to sports and daily activities compared to open surgery.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--arthroscopic-knee-surgery--thumbnail.png"
  },
  {
    "slug": "rotator-cuff-repair-surgery",
    "title": "Rotator Cuff Repair Surgery",
    "tag": "Shoulder",
    "body": "Rotator Cuff Repair Surgery is performed to reattach torn tendons in the shoulder to the humerus bone. A torn rotator cuff can cause severe Shoulder Pain, weakness, and inability to lift the arm. Most repairs are performed arthroscopically, using small incisions and cameras. This minimally invasive approach re-establishes the connection between the muscle and bone, allowing the shoulder to function correctly again and preventing the progression to Rotator Cuff Arthropathy.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--rotator-cuff-repair-surgery--thumbnail.png"
  },
  {
    "slug": "meniscus-repair-surgery",
    "title": "Meniscus Repair Surgery",
    "tag": "Knee",
    "body": "Meniscus Repair Surgery is an arthroscopic procedure designed to stitch a torn meniscus back together rather than removing it. The meniscus serves as the knee's critical shock absorber and stabilizer, and preserving this tissue is essential for long-term knee health. Whenever possible, our surgeons opt for repair over removal (meniscectomy) to reduce the significant long-term risk of knee arthritis.The decision between repair and removal depends on several factors: tear location (outer vascular zone tears heal better than inner white zone tears), tear pattern (longitudinal and bucket-handle tears are more repairable), and tissue quality. For athletes and young, active patients with repairable tears, preservation is especially important. Studies show that patients who undergo meniscus removal develop arthritis at significantly higher rates than those who have successful repairs.For those experiencing persistent knee conditions including meniscus tears, early evaluation can determine if repair is possible. According to AAOS guidance on overuse injuries, preserving meniscal tissue is particularly important in younger athletes who need long-term knee function. Repair is one of two operations for a torn meniscus; for how repair compares with meniscectomy and how the choice is made, see Meniscus Surgery.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--meniscus-repair-surgery--thumbnail.png"
  },
  {
    "slug": "disc-replacement-vs-fusion-what-you-need-to-know",
    "title": "Disc Replacement vs Fusion: What You Need to Know",
    "tag": "Spine",
    "body": "When surgery is required for Degenerative Disc Disease, patients often face a choice between Spinal Fusion Surgery and Artificial Disc Replacement. Both procedures remove the painful disc and relieve nerve compression, but they achieve stability differently. Fusion permanently locks the bones together, stopping motion. Replacement inserts a mobile joint, preserving motion. Understanding the pros and cons of each—based on your anatomy, age, and lifestyle—is critical. At Mountain Spine & Orthopedics, we specialize in both and guide you to the right decision.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--disc-replacement-vs-fusion-what-you-need-to-know--thumbnail.png"
  },
  {
    "slug": "ankle-ligament-reconstruction-surgery",
    "title": "Ankle Ligament Reconstruction Surgery",
    "tag": "Foot",
    "body": "Ankle Ligament Reconstruction Surgery is a specialized procedure designed to repair or reconstruct damaged lateral ankle ligaments, primarily the anterior talofibular ligament (ATFL) and calcaneofibular ligament (CFL). Chronic ankle instability often results from repeated sprains that stretch or tear these critical stabilizing structures, leading to a loose, unstable ankle prone to giving way. This surgery uses techniques like the Brostrom-Gould procedure or tendon graft reconstruction to restore ankle joint stability and prevent recurrent injuries, addressing ankle ligament laxity and improving overall ankle biomechanics.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--ankle-ligament-reconstruction-surgery--thumbnail.png"
  },
  {
    "slug": "hybrid-cervical-spine-surgery",
    "title": "Hybrid Cervical Spine Surgery",
    "tag": "Neck",
    "body": "Hybrid Cervical Spine Surgery treats multilevel Degenerative Disc Disease by strategically combining ACDF Surgery (Anterior Cervical Discectomy and Fusion) at one or more levels with motion-preserving Cervical Disc Arthroplasty at adjacent levels. This approach addresses varied pathology: fusing unstable segments while preserving neck motion elsewhere. Compared to multilevel cervical fusion alone, this hybrid technique potentially reduces adjacent segment stress and improves overall neck biomechanics. This is an advanced cervical spine solution that customizes treatment for complex multilevel conditions.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--hybrid-cervical-spine-surgery--thumbnail.png"
  },
  {
    "slug": "back-pain-treatment",
    "title": "Back Pain Treatment",
    "tag": "Lower Spine",
    "body": "Back Pain Treatment encompasses a wide range of strategies to address various spinal conditions. Back pain can stem from muscle strains, Degenerative Disc Disease, Herniated Discs, Spinal Stenosis, or Facet Joint Disease. Effective management requires accurate diagnosis of the underlying spinal condition. Our approach starts with a clinical evaluation and advanced imaging (MRI, X-rays) to visualize spinal structures. Treatment plans are individualized, ranging from conservative care including referrals to Rehabilitation specialists to advanced interventions for lasting back pain relief and improved spinal function.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--back-pain-treatment--thumbnail.png"
  },
  {
    "slug": "bunion-correction-surgery",
    "title": "Bunion Correction Surgery",
    "tag": "Foot",
    "body": "Bunion Correction Surgery (bunionectomy) addresses a bunion (hallux valgus), a bony prominence at the big toe joint caused by outward drift of the toe and inward protrusion of the metatarsal head. This deformity causes pain and difficulty with shoe wear. The surgery realigns the toe and foot bones through osteotomy techniques and removes the bump, balancing soft tissues. Minimally invasive foot surgery options exist for faster recovery and improved foot alignment, addressing this common foot deformity effectively.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--bunion-correction-surgery--thumbnail.png"
  },
  {
    "slug": "carpal-tunnel-release",
    "title": "Carpal Tunnel Release Surgery",
    "tag": "Hand",
    "body": "Carpal Tunnel Release Surgery treats Carpal Tunnel Syndrome, a condition resulting from median nerve compression in the wrist's carpal tunnel. This compression causes numbness, tingling, and pain in the hand and fingers. When non-surgical treatments fail, this procedure cuts the transverse carpal ligament to increase tunnel size, relieving nerve pressure. Options include open or minimally invasive hand surgery for lasting carpal tunnel relief and restoration of hand sensation. This is a common peripheral nerve surgery with high success rates.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--carpal-tunnel-release--thumbnail.png"
  },
  {
    "slug": "cervical-disc-replacement",
    "title": "Cervical Disc Replacement",
    "tag": "Neck",
    "body": "Cervical Disc Replacement (arthroplasty) treats chronic neck and arm pain from damaged cervical discs by replacing the disc with a mobile implant, preserving segmental motion unlike fusion. This procedure is for suitable candidates with symptomatic Cervical Herniated Disc or Degenerative Disc Disease unresponsive to non-surgical care. This advanced neck surgery aims to maintain flexibility and reduce adjacent level stress, offering a modern solution for cervical spine conditions and improving overall neck function. It represents a significant advancement in Motion Preservation Spine Surgery.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--cervical-disc-replacement--thumbnail.png"
  },
  {
    "slug": "coccygectomy-tailbone-removal-surgery",
    "title": "Coccygectomy (Tailbone Removal Surgery)",
    "tag": "Lower Spine",
    "body": "Coccygectomy is the surgical removal of the coccyx (tailbone) for chronic, debilitating coccydynia unresponsive to extended non-surgical management including Rehabilitation and injections. This procedure is for carefully selected patients where pain is localized to a pathological coccyx. The goal is to eliminate the source of chronic tailbone pain and improve sitting tolerance, offering a definitive solution for intractable coccyx pain and restoring quality of life. This specialized procedure addresses persistent sacrococcygeal pain.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--coccygectomy-tailbone-removal-surgery--thumbnail.png"
  },
  {
    "slug": "anti-inflammatory-injections-for-joint-and-spine-pain",
    "title": "Anti-Inflammatory Injections for Joint and Spine Pain",
    "tag": "Pain Management",
    "body": "Anti-Inflammatory Injections deliver potent medication (commonly corticosteroids like triamcinolone, methylprednisolone, or betamethasone) directly to the source of pain and inflammation in joints, around tendons, into bursae, or near compressed spinal nerves. Often including a local anesthetic for immediate relief, these image-guided injections (ultrasound or fluoroscopy) are used for conditions like Osteoarthritis, Rheumatoid Arthritis, Bursitis, or Sciatica when conservative measures fail, offering targeted pain reduction and improved mobility. This is a common part of non-surgical pain management for acute or chronic inflammation, providing precise medication delivery for optimal therapeutic effect. Learn more about cortisone injections from the American Academy of Orthopaedic Surgeons.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--anti-inflammatory-injections-for-joint-and-spine-pain--thumbnail.png"
  },
  {
    "slug": "aging-management",
    "title": "Aging Management",
    "tag": "Spine",
    "body": "Aging Management shifts orthopedic care to preventive maintenance, identifying vulnerabilities early before they become problems. Bone mass declines and cartilage degenerates with age, increasing risks of osteopenia, Osteoarthritis, and falls. Our comprehensive evaluation (health profile, physical exam, DEXA scans, MRI/ultrasound) informs a customized plan integrating medical, nutritional, and lifestyle strategies for lifelong musculoskeletal wellness and improved mobility for seniors, focusing on proactive joint care and bone health preservation.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--aging-management--thumbnail.png"
  },
  {
    "slug": "coccyx-nerve-ablation",
    "title": "Coccyx Nerve Ablation",
    "tag": "Lower Spine",
    "body": "Coccyx Nerve Ablation (Impar Ganglion Ablation) treats chronic tailbone pain (coccydynia) and related pelvic/perineal pain mediated by the Impar ganglion. When conservative treatments (cushions, medications, rehabilitation) fail and a diagnostic Impar Ganglion Block confirms the pain source (50%+ relief for 4-6 hours), radiofrequency ablation (RFA) uses controlled heat to lesion nerve fibers in the ganglion, interrupting pain signals from the coccyx. This outpatient procedure offers a less invasive alternative to Coccygectomy (surgical tailbone removal) for chronic pain and improving sitting comfort, a key interventional pain management technique for refractory tailbone conditions. Learn more about tailbone pain from the American Academy of Orthopaedic Surgeons.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--coccyx-nerve-ablation--thumbnail.png"
  },
  {
    "slug": "cortisone-injections-for-back-pain",
    "title": "Cortisone Injections for Back Pain",
    "tag": "Lower Spine",
    "body": "Cortisone Injections for Back Pain (corticosteroid injections) are an effective non-surgical treatment for reducing inflammation and alleviating spinal pain. Delivered directly into inflamed areas like the epidural space or facet joints under image guidance, they decrease swelling and nerve irritation from conditions like Herniated Discs or Spinal Stenosis. This targeted anti-inflammatory treatment provides significant back pain relief and can improve spinal mobility, often used as part of a comprehensive back care plan including Rehabilitation and activity modification.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--cortisone-injections-for-back-pain--thumbnail.png"
  },
  {
    "slug": "degenerative-disc-disease-surgery-details",
    "title": "Degenerative Disc Disease Surgery Details",
    "tag": "Spine",
    "body": "For severe Degenerative Disc Disease (DDD) unresponsive to non-surgical care, surgery may be an option. Spinal Fusion Surgery provides stability by joining vertebrae with bone graft and instrumentation, eliminating painful motion. Artificial Disc Replacement Surgery aims to preserve motion by replacing the damaged disc with a mobile implant. Evaluation includes MRI and dynamic X-rays to plan the most effective surgical treatment for discogenic pain and nerve compression, potentially using minimally invasive spine surgery for improved spinal health and addressing issues of chronic discogenic back pain. For whether surgery is indicated for degenerative disc disease in the first place, and the full range of options, see Degenerative Disc Disease Surgery.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--degenerative-disc-disease-surgery-details--thumbnail.png"
  },
  {
    "slug": "endoscopic-discectomy-surgery",
    "title": "Endoscopic Discectomy Surgery",
    "tag": "Lower Spine",
    "body": "Endoscopic Discectomy Surgery is a cutting-edge, minimally invasive surgery for symptomatic Herniated Discs compressing spinal nerves. Through a sub-centimeter incision, an endoscope (tiny camera) provides magnified visualization, allowing specialized micro-instruments to remove only the herniated disc portion. This technique for treating disc herniation minimizes muscle disruption, offering less pain and faster recovery than a traditional Lumbar Microdiscectomy Surgery approach, representing a significant advancement in spinal care and a precise nerve root surgery with minimal scarring.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--endoscopic-discectomy-surgery--thumbnail.png"
  },
  {
    "slug": "endoscopic-foraminotomy-surgery",
    "title": "Endoscopic Foraminotomy Surgery",
    "tag": "Spine",
    "body": "Endoscopic Foraminotomy Surgery is a state-of-the-art, minimally invasive spine surgery for Foraminal Stenosis (narrowed nerve exit canal). An endoscope provides magnified visualization, allowing removal of bone spurs or disc material compressing the nerve root. This technique for treating pinched nerves avoids significant muscle dissection, resulting in less pain and potentially faster recovery. It is an effective spinal decompression method for restoring nerve pathway integrity and relieving radicular pain, offering precise nerve root release with minimal tissue disruption.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--endoscopic-foraminotomy-surgery--thumbnail.png"
  },
  {
    "slug": "acl-reconstruction-surgery",
    "title": "ACL Reconstruction Surgery",
    "tag": "Knee",
    "body": "The anterior cruciate ligament (ACL) is essential for knee stability during pivoting, cutting, and jumping activities. ACL tears, often occurring during sports from non-contact pivoting or direct contact, cause the knee to give way and limit athletic function. ACL Reconstruction Surgery replaces the damaged ligament with a graft (from your own tissue or donor tissue), anchored in tunnels drilled through the femur and tibia to replicate the native ACL's position and function.For athletes participating in pivot-shift sports (soccer, basketball, football, skiing), ACL reconstruction is typically recommended to restore the stability needed for safe return to play. Without a functioning ACL, repeated instability episodes can damage the meniscus and cartilage, leading to early arthritis. Understanding graft options, rehabilitation requirements, and realistic return-to-sport timelines is essential for informed decision-making.According to AAOS guidance on overuse injuries, proper rehabilitation after ACL reconstruction is critical for successful return to athletics and prevention of re-injury. This common sports medicine procedure has high success rates when performed with appropriate surgical technique and followed by dedicated rehabilitation.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--acl-reconstruction-surgery--thumbnail.png"
  },
  {
    "slug": "partial-knee-replacement",
    "title": "Partial Knee Replacement Surgery",
    "tag": "Knee",
    "body": "Partial Knee Replacement (unicompartmental knee arthroplasty or UKA) is a minimally invasive procedure that replaces only the damaged compartment of the knee while preserving the healthy bone, cartilage, and ligaments in the other compartments. This approach is ideal for patients with knee arthritis limited to one area of the joint.Unlike total knee replacement, which replaces the entire joint, partial replacement preserves more of the natural knee structure, potentially providing a more natural feel and faster recovery. The procedure is typically performed through a smaller incision and involves less bone removal.At Mountain Spine & Orthopedics, our knee specialists carefully evaluate each patient to determine if partial knee replacement is appropriate, considering factors like the extent of arthritis, knee alignment, and patient activity level.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--partial-knee-replacement--thumbnail.png"
  },
  {
    "slug": "meniscus-surgery",
    "title": "Meniscus Surgery (Meniscectomy)",
    "tag": "Knee",
    "body": "Meniscus Surgery (meniscectomy) is an arthroscopic procedure performed to remove damaged meniscal tissue when repair is not possible or appropriate. The meniscus is the C-shaped cartilage that acts as a shock absorber in the knee, and when torn, it can cause pain, swelling, and mechanical symptoms like locking or catching.While meniscus repair is preferred to preserve tissue, some tears are not repairable due to location (inner white zone with no blood supply), pattern, or tissue quality. In these cases, partial meniscectomy removes only the damaged portion while preserving as much healthy meniscus as possible.At Mountain Spine & Orthopedics, our knee specialists use minimally invasive arthroscopic techniques to remove damaged tissue while preserving healthy meniscus, optimizing outcomes and minimizing the risk of future knee arthritis.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--meniscus-surgery--thumbnail.png"
  },
  {
    "slug": "knee-ligament-repair",
    "title": "Knee Ligament Repair Surgery",
    "tag": "Knee",
    "body": "Knee ligament repair is not one procedure. The right operation depends on which ligament is injured, where it tore, whether the tissue can hold sutures, and whether other structures were damaged. MCL, LCL, posterolateral corner, PCL, and combined ligament injuries each create different instability patterns.Some collateral ligament tears can heal with bracing and time. Others require repair to the attachment site or reconstruction with graft tissue, especially when the knee opens abnormally with stress, instability persists, or the injury is part of a multi-ligament knee trauma. Mountain Spine & Orthopedics uses exam findings, stress testing, X-rays, and MRI to determine whether non-surgical care, repair, reconstruction, or staged treatment is appropriate. PPO Insurance Accepted.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--knee-ligament-repair--thumbnail.png"
  },
  {
    "slug": "pcl-reconstruction",
    "title": "PCL Reconstruction Surgery",
    "tag": "Knee",
    "body": "PCL Reconstruction is performed to restore knee stability after posterior cruciate ligament (PCL) tears. The PCL prevents the shinbone (tibia) from sliding backward relative to the thighbone (femur), and when torn, it can cause knee instability and pain.Unlike ACL tears, many PCL injuries can be managed non-surgically. However, severe tears, combined ligament injuries, or cases where non-surgical treatment fails may require reconstruction. The procedure uses a graft (from the patient's own tissue or donor tissue) to rebuild the torn ligament.At Mountain Spine & Orthopedics, our sports medicine specialists use advanced minimally invasive arthroscopic techniques to perform PCL reconstruction, restoring knee stability and allowing patients to return to their desired activities.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--pcl-reconstruction--thumbnail.png"
  },
  {
    "slug": "knee-cartilage-restoration",
    "title": "Knee Cartilage Restoration",
    "tag": "Knee",
    "body": "Knee Cartilage Restoration encompasses various procedures designed to repair or regenerate damaged articular cartilage in the knee joint. When cartilage is damaged, it doesn't heal well on its own, and if left untreated, can progress to knee arthritis.Cartilage restoration techniques include microfracture (creating small holes to stimulate healing), OATS (osteochondral autograft transfer), and advanced cell-based therapies. These procedures are particularly valuable for younger, active patients with focal cartilage defects who want to preserve their natural joint and avoid or delay joint replacement.At Mountain Spine & Orthopedics, our knee specialists use advanced minimally invasive techniques to restore damaged cartilage, preserving the knee joint and preventing the progression to arthritis. The specific technique chosen depends on the size, location, and characteristics of the cartilage defect.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--knee-cartilage-restoration--thumbnail.png"
  },
  {
    "slug": "knee-osteotomy",
    "title": "Knee Osteotomy Surgery",
    "tag": "Knee",
    "body": "Knee Osteotomy is a joint-preserving procedure that realigns the knee to shift weight away from damaged cartilage to healthier areas of the joint. This procedure is particularly valuable for younger, active patients with knee arthritis limited to one side of the knee who want to preserve their natural joint and delay or avoid joint replacement.The most common type is high tibial osteotomy (HTO), which involves cutting and realigning the shinbone (tibia) to correct malalignment and redistribute weight. By shifting the load to healthier cartilage, the procedure can relieve pain, slow arthritis progression, and preserve the joint for many years.At Mountain Spine & Orthopedics, our knee specialists carefully evaluate each patient to determine if osteotomy is appropriate, considering factors like age, activity level, extent of arthritis, and knee alignment. This minimally invasive approach can provide excellent outcomes for the right candidates.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--knee-osteotomy--thumbnail.png"
  },
  {
    "slug": "revision-knee-replacement",
    "title": "Revision Knee Replacement Surgery",
    "tag": "Knee",
    "body": "Revision Knee Replacement is performed when a previous knee replacement is no longer functioning safely or comfortably. The cause must be identified before surgery. A painful implant can come from aseptic loosening, polyethylene wear, instability, stiffness, malalignment, periprosthetic fracture, extensor mechanism problems, metal or cement issues, or infection.Revision surgery is more complex than a first-time knee replacement because the surgeon may need to remove well-fixed components, manage bone loss, rebuild ligament stability, and choose stems, augments, cones, sleeves, or more constrained implants. If infection is suspected, bloodwork, aspiration, cultures, and sometimes a staged revision plan may be required before a final implant is placed.Mountain Spine & Orthopedics evaluates prior operative records when available, implant type, X-rays, advanced imaging, lab results, and the patient's instability, pain, swelling, and function pattern to build a revision plan rather than simply exchanging parts.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--revision-knee-replacement--thumbnail.png"
  },
  {
    "slug": "epidural-steroid-injection",
    "title": "Epidural Steroid Injection",
    "tag": "Lower Spine",
    "body": "An Epidural Steroid Injection (ESI) treats back, leg, neck, or arm pain from inflamed spinal nerves. Conditions like Herniated Discs or Spinal Stenosis can compress nerves, causing radiating pain. ESIs deliver corticosteroid and local anesthetic into the epidural space under fluoroscopic image guidance, targeting inflammation at the source for pain relief. This is a common non-surgical spine intervention for managing acute or chronic nerve pain and improving spinal comfort, providing effective relief for Sciatica and radicular pain syndromes. Learn more about low back pain from the National Institute of Neurological Disorders and Stroke.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--epidural-steroid-injection--thumbnail.png"
  },
  {
    "slug": "extreme-lateral-interbody-fusion-surgery",
    "title": "Extreme Lateral Interbody Fusion Surgery",
    "tag": "Lower Spine",
    "body": "Extreme Lateral Interbody Fusion (XLIF) — also called direct lateral interbody fusion (DLIF) — is a minimally invasive lumbar fusion technique that approaches the spine entirely from the patient's side. By passing through the flank and psoas muscle under continuous nerve monitoring, XLIF avoids the scarring, blood loss, and prolonged recovery associated with traditional open posterior surgery. XLIF is particularly well-suited for adult degenerative scoliosis: the lateral approach allows placement of a wide, lordotic interbody cage that simultaneously restores disc height, corrects coronal curve, and indirectly decompresses neural foramina — all without touching the posterior musculature. For patients requiring fusion at multiple lumbar levels, XLIF can address several segments through the same flank incision before supplemental posterior fixation is added. It complements other approaches in a staged or combined strategy alongside OLIF, ALIF, or TLIF depending on the levels involved.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--extreme-lateral-interbody-fusion-surgery--thumbnail.png"
  },
  {
    "slug": "facet-ablation-rhizotomy-treatment",
    "title": "Facet Ablation (Rhizotomy) Treatment",
    "tag": "Lower Spine",
    "body": "Facet joints can develop Facet Joint Disease (facet joint osteoarthritis), leading to chronic neck or back pain. Radiofrequency Ablation (RFA)—also called Facet Ablation or Rhizotomy—treats this pain using controlled heat energy. After a diagnostic medial branch block confirms the facet joints as the source (at least 50-75% pain reduction), RFA uses radiofrequency energy to lesion small nerves (medial branches) carrying pain signals from these joints. This targeted nerve treatment provides extended pain relief lasting 6-12+ months and improves spinal comfort, a key non-surgical back pain solution for facet-mediated pain without the need for surgery. Learn more about radiofrequency ablation from the North American Spine Society.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--facet-ablation-rhizotomy-treatment--thumbnail.png"
  },
  {
    "slug": "facet-block-ablation-rhizotomy-and-facet-fusion",
    "title": "Facet Block, Ablation, Rhizotomy, and Facet Fusion",
    "tag": "Spine",
    "body": "Facet joints can cause chronic neck/back pain due to Osteoarthritis. We offer a stepped approach: 1. Facet Blocks: Image-guided injections (anesthetic/corticosteroid) for diagnosis and temporary relief. 2. Facet Ablation (Rhizotomy): If blocks help, radiofrequency ablation deactivates nerves for longer pain relief. 3. Facet Fusion: Surgical stabilization for severe degeneration or instability unresponsive to less invasive Facet Joint Disease treatments, providing definitive spinal segment support. This addresses the full spectrum of facet joint pathology from mild to severe.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--facet-block-ablation-rhizotomy-and-facet-fusion--thumbnail.png"
  },
  {
    "slug": "fracture-fixation",
    "title": "Fracture Fixation",
    "tag": "Pain Management",
    "body": "Fracture Fixation is orthopedic surgery for broken bones needing internal/external stabilization for correct healing, typically for displaced, unstable, or joint-involved fractures. It surgically realigns fragments (reduction) and holds them with implants (plates, screws, rods). This surgical fracture management promotes optimal bone healing and early movement, restoring bone strength and mobility, crucial for complex bone injuries and achieving anatomical bone reconstruction with proper alignment.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--fracture-fixation--thumbnail.png"
  },
  {
    "slug": "impar-block-treatment",
    "title": "Impar Block Treatment",
    "tag": "Hip",
    "body": "An Impar Ganglion Block is a diagnostic and therapeutic injection for chronic pain in the tailbone (Coccydynia) and surrounding pelvic/perineal region, where pain signals are relayed via the Impar ganglion (ganglion of Walther). This unpaired sympathetic ganglion sits anterior to the sacrococcygeal junction and transmits pain from the coccyx, perineum, rectum, and distal pelvic organs. Local anesthetic (+/- corticosteroid) is injected near this ganglion under fluoroscopic image guidance to block pain transmission. This minimally invasive pain procedure can break the pain cycle for coccyx-related discomfort and improve quality of life for those with persistent sacrococcygeal pain, a specialized nerve block for pelvic pain and tailbone conditions. Learn more about tailbone disorders from MedlinePlus.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--impar-block-treatment--thumbnail.png"
  },
  {
    "slug": "neck-pain-treatment-and-shoulder-pain-relief",
    "title": "Neck Pain Treatment and Shoulder Pain Relief",
    "tag": "Neck",
    "body": "Neck and shoulder pain often co-exist due to anatomical links. Causes include muscle strains, cervical spine issues (Cervical Herniated Disc, Radiculopathy), or shoulder pathologies (Rotator Cuff Tears, impingement). Accurate diagnosis via exams and imaging (MRI, X-rays) is key. Our multidisciplinary care plan addresses the specific source of cervicobrachial pain for effective relief and improved musculoskeletal function, often involving non-surgical shoulder pain solutions or advanced neck care including ACDF Surgery or Shoulder Arthroscopy.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--neck-pain-treatment-and-shoulder-pain-relief--thumbnail.png"
  },
  {
    "slug": "non-surgical-treatments-for-pain-management",
    "title": "Non-Surgical Treatments for Pain Management",
    "tag": "Pain Management",
    "body": "Chronic or acute musculoskeletal and nerve pain can significantly impair daily life, but surgery isn't always necessary. Non-Surgical Treatments for Pain Management encompasses a multimodal approach using Rehabilitation, medications, image-guided injections (corticosteroid, hyaluronic acid, nerve blocks), regenerative medicine (stem cell therapy, PRP), bracing, and lifestyle modifications to reduce pain, decrease inflammation, and improve function. Our approach is rooted in accurate diagnosis and personalized care for conditions like Osteoarthritis, disc pathology, chronic pain syndromes, and nerve compression, aiming for long-term wellness and providing effective alternatives to surgery. This includes comprehensive conservative pain therapy and interventional pain management techniques. Learn more about chronic pain management from the National Institute of Neurological Disorders and Stroke.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--non-surgical-treatments-for-pain-management--thumbnail.png"
  },
  {
    "slug": "oblique-lumbar-interbody-fusion",
    "title": "Oblique Lumbar Interbody Fusion",
    "tag": "Lower Spine",
    "body": "Oblique Lumbar Interbody Fusion (OLIF) is a minimally invasive technique that approaches the lumbar spine (L2–L5) through a natural corridor between the anterior abdominal vessels and the psoas muscle — without splitting or retracting the psoas itself. This psoas-sparing access reduces the risk of lumbar plexus injury and thigh pain compared to direct lateral approaches, while still allowing placement of a large, lordotic interbody cage for disc height restoration and alignment correction. OLIF is a cornerstone technique in the surgical management of adult degenerative scoliosis: by restoring disc height and lumbar lordosis at the apex of the curve, surgeons can achieve significant deformity correction before adding posterior pedicle screw fixation. Multiple lumbar levels can be addressed through the same oblique corridor in a single session. OLIF is used alongside or instead of XLIF, ALIF, and TLIF depending on the levels involved and the patient's anatomy. The end result is a solid spinal fusion with restored alignment and reduced recovery burden. OLIF is one approach within a larger correction plan — for how candidacy is assessed and how the approach is chosen, see adult scoliosis surgery.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--oblique-lumbar-interbody-fusion--thumbnail.png"
  },
  {
    "slug": "percutaneous-carpal-tunnel-release",
    "title": "Percutaneous Carpal Tunnel Release",
    "tag": "Hand",
    "body": "Carpal Tunnel Syndrome involves median nerve compression in the wrist. Percutaneous Carpal Tunnel Release (PCTR) is a minimally invasive surgery to relieve this pressure by cutting the transverse carpal ligament through a tiny puncture wound, often using ultrasound guidance. This technique for carpal tunnel relief results in less pain and potentially faster recovery than more invasive methods, restoring normal hand sensation and improving hand strength. This is an ultra-minimally invasive hand surgery with minimal tissue disruption.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--percutaneous-carpal-tunnel-release--thumbnail.png"
  },
  {
    "slug": "shoulder-arthroscopy",
    "title": "Shoulder Arthroscopy",
    "tag": "Shoulder",
    "body": "Shoulder Arthroscopy uses an arthroscope (small camera) and specialized instruments through tiny incisions to treat problems inside and around the shoulder joint, such as torn rotator cuffs or labral tears. This minimally invasive shoulder surgery technique reduces tissue trauma, leading to less pain and faster recovery than open surgery. It addresses chronic shoulder pain, stiffness, or instability, improving overall shoulder joint health and function. This is a versatile procedure for various shoulder joint disorders.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--shoulder-arthroscopy--thumbnail.png"
  },
  {
    "slug": "stem-cell-treatment",
    "title": "Stem Cell Treatment",
    "tag": "Knee",
    "body": "Stem cell therapy uses the patient's own (autologous) stem cells, typically harvested from bone marrow or adipose (fat) tissue, concentrated, and injected into damaged areas like arthritic joints or torn tendons. These mesenchymal stem cells may release growth factors, reduce inflammation, and potentially stimulate the body's natural regenerative capacity. This regenerative orthopedics approach aims to reduce chronic pain and improve function in selected patients as part of non-surgical pain management. Important: Stem cell therapy is not FDA-approved for most orthopedic conditions and is considered investigational. Results vary significantly between patients, and it should not be considered a cure or guaranteed treatment. Learn more about stem cell treatments from the FDA.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--stem-cell-treatment--thumbnail.png"
  },
  {
    "slug": "surgical-treatments",
    "title": "Surgical Treatments",
    "tag": "Spine",
    "body": "When non-surgical treatments fail to relieve chronic pain or restore function for spine or joint conditions, surgical intervention may be necessary. We perform a wide range of advanced procedures, from complex reconstructive surgeries for severe joint damage or spinal deformities to minimally invasive surgical (MIS) techniques. MIS can lead to less pain, shorter hospital stays, and faster recovery, addressing issues like Herniated Discs or joint deterioration effectively and improving overall musculoskeletal health. This includes specialized orthopedic interventions for various conditions.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--surgical-treatments--thumbnail.png"
  },
  {
    "slug": "trigger-finger-release",
    "title": "Trigger Finger Release",
    "tag": "Hand",
    "body": "Trigger finger (stenosing tenosynovitis) occurs when a flexor tendon catches in its sheath at the A1 pulley, causing painful clicking or locking. When non-surgical treatments fail, Trigger Finger Release surgery (open or percutaneous) widens the A1 pulley, allowing free tendon glide. This hand surgery procedure offers quick and effective relief from mechanical finger symptoms and restores normal finger movement, addressing this common hand ailment with minimal disruption.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--trigger-finger-release--thumbnail.png"
  },
  {
    "slug": "ankle-replacement-surgery",
    "title": "Ankle Replacement Surgery",
    "tag": "Foot",
    "body": "Ankle Replacement Surgery, also called total ankle arthroplasty, treats selected cases of end-stage ankle arthritis by resurfacing the bottom of the tibia and top of the talus with implant components. It is different from ankle fusion: fusion can be durable for severe arthritis but eliminates ankle motion, while replacement is designed to reduce pain and preserve a more natural ankle arc for walking.The choice between replacement and fusion depends on more than pain severity. Mountain Spine & Orthopedics evaluates alignment, bone stock, ligament stability, prior fractures, deformity, activity level, weight-bearing X-rays, CT findings, and the condition of neighboring joints. Patients with severe deformity, poor bone quality, active infection, major nerve or circulation problems, or very high-impact demands may need a different surgical plan.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--ankle-replacement-surgery--thumbnail.png"
  },
  {
    "slug": "ankle-arthroscopy-minimally-invasive-surgery",
    "title": "Ankle Arthroscopy (Minimally Invasive Surgery)",
    "tag": "Foot",
    "body": "Ankle Arthroscopy (often referred to as 'keyhole surgery') allows surgeons to visualize, diagnose, and repair problems within the ankle joint without the need for large incisions. During the procedure, the orthopedic surgeon makes one or more small portals (incisions) around the ankle. The joint is then gently filled with a sterile fluid, which expands the joint, providing a clear and magnified view for the arthroscope's high-definition camera. This camera transmits live images to a monitor, allowing the surgeon to meticulously inspect the articular cartilage, ligaments, tendons, and the synovial lining. Through other small portals, specialized micro-instruments are introduced to perform the necessary treatment, including shaving damaged cartilage, removing inflamed synovial tissue, trimming bone spurs, or repairing torn ligaments.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--ankle-arthroscopy-minimally-invasive-surgery--thumbnail.png"
  },
  {
    "slug": "sacroiliac-joint-injection",
    "title": "Sacroiliac Joint Injection",
    "tag": "Pain Management",
    "body": "Sacroiliac (SI) Joint Injections are both diagnostic and therapeutic procedures for SI joint dysfunction, a common cause of lower back and buttock pain often mimicking sciatica or disc pain. The SI joints connect the sacrum (base of the spine) to the iliac bones (pelvis) and can become inflamed or hypermobile, causing pain. Under fluoroscopic (X-ray) guidance, a combination of local anesthetic and corticosteroid is injected directly into the SI joint. The immediate response to anesthetic (50-75%+ pain relief) confirms the SI joint as the pain source, while the steroid provides longer-term anti-inflammatory relief. This is a key component of non-surgical pain management for lower back and buttock pain. Learn more about SI joint dysfunction from Spine-Health.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--sacroiliac-joint-injection--thumbnail.png"
  },
  {
    "slug": "nerve-block-injection",
    "title": "Nerve Block Injection",
    "tag": "Pain Management",
    "body": "Nerve block injections place local anesthetic, and sometimes corticosteroid, near a specific nerve, nerve root, nerve branch, or ganglion. The immediate numbing phase helps answer a diagnostic question: is this nerve pathway actually carrying the patient's pain?When the block significantly reduces the expected pain for the expected duration, it can guide next steps such as repeat injection, radiofrequency ablation, surgical decompression evaluation, or another targeted procedure. Common examples include epidural or selective nerve root blocks, medial branch blocks for facet pain, sympathetic blocks, Impar ganglion blocks, occipital blocks, and selected peripheral nerve blocks. This is different from a general pain shot because the target nerve and pain pattern must match. PPO Insurance Accepted.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--nerve-block-injection--thumbnail.png"
  },
  {
    "slug": "chronic-pain-treatment",
    "title": "Chronic Pain Treatment",
    "tag": "Pain Management",
    "body": "Chronic pain treatment begins by identifying the main pain generator or combination of generators. Pain that lasts for months can involve joint degeneration, nerve compression, prior surgery changes, tendon disease, muscle guarding, scar tissue, and sensitized nerve pathways. A useful plan must separate those contributors rather than treating all chronic pain the same way.Mountain Spine & Orthopedics uses history, physical exam, imaging review, and diagnostic injections when appropriate to determine whether pain is primarily spine-related, joint-related, nerve-related, post-surgical, inflammatory, or mixed. Treatment may include medication review, activity modification, outside-guided rehabilitation, image-guided injections, nerve blocks, radiofrequency ablation, surgical evaluation when a correctable structural problem exists, or neuromodulation discussion for selected refractory cases. PPO Insurance Accepted.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--chronic-pain-treatment--thumbnail.png"
  },
  {
    "slug": "adult-scoliosis-surgery",
    "title": "Adult Scoliosis Surgery",
    "tag": "Spine",
    "body": "This page begins where the diagnosis ends. If you are still working out what your curve is, how it was measured, or which specialist to see, read adult degenerative scoliosis first — it covers the condition, the workup, and the non-surgical options. What follows is the surgical decision itself.\n\nAdult scoliosis surgery is not a single operation, and the size of a curve is not what puts someone in the operating room. Two adults with visually similar curves can need completely different plans, because the surgical question is not *how big is the curve* but *what is the curve doing to you*. A curve that hurts because one nerve root is pinched where it exits the spine is a decompression problem with a limited fusion. A curve that has tipped your trunk forward or sideways so that you cannot stand or walk without leaning is a balance problem, and no amount of bone removal fixes it — alignment has to be rebuilt over the pelvis. Telling those two apart is most of the planning. A sideways curve is also only one form of adult spinal deformity — where the dominant problem is forward collapse or a loss of sagittal alignment, see kyphosis and spine deformities, which the same reconstructive planning covers.\n\nAdult correction also differs from surgery in a growing spine. Adults bring degenerative discs, arthritic facets, stiffer curves, variable bone quality, and often previous spine surgery. Mountain Spine & Orthopedics treats adults only — our surgeons do not perform pediatric or adolescent idiopathic scoliosis procedures. Planning is done against standing full-length imaging rather than an MRI alone, because a curve only shows its true behaviour under load. A complimentary MRI review and a second opinion are both available before you commit to anything.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--spinal-fusion--thumbnail.png"
  },
  {
    "slug": "sports-injury-treatment",
    "title": "Sports Injury Treatment",
    "tag": "Sports Medicine",
    "body": "Sports injuries encompass a wide range of conditions affecting athletes, from sudden trauma like ligament tears and fractures to chronic overuse injuries such as tendinitis and stress fractures. These injuries can occur during training, competition, or recreational activities, affecting athletes of all ages and skill levels.Understanding the difference between acute injuries (sudden onset from a specific event) and overuse injuries (gradual development from repetitive stress) is crucial for proper diagnosis and treatment. At Mountain Spine & Orthopedics, our Sports Medicine specialists provide comprehensive evaluation, including advanced imaging and diagnostic testing, to accurately identify the injury and develop a personalized treatment plan.According to AAOS guidance on overuse injuries, many injuries result from repetitive stress without adequate recovery time. Early intervention often leads to faster recovery and prevents long-term complications that could affect athletic performance.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--sports-injury-treatment--thumbnail.png"
  },
  {
    "slug": "athletic-evaluation",
    "title": "Athletic Injury Evaluation",
    "tag": "Sports Medicine",
    "body": "Athletic Injury Evaluation is a thorough orthopedic diagnostic process designed to accurately identify the type, severity, and extent of sports-related injuries. Our sports medicine specialists combine detailed medical history, advanced physical examination techniques, functional movement assessments, and state-of-the-art imaging to understand your injury completely and guide treatment decisions.Whether you're a professional athlete, collegiate competitor, or recreational enthusiast, a precise orthopedic evaluation is the foundation for effective treatment and safe return to sport. We assess not only what's injured but why it happened—identifying biomechanical factors, training errors, or underlying conditions that may have contributed. To find a doctor who specializes in your specific sport or injury type, our team can match you with the right specialist.According to AAOS guidance on overuse injuries, proper evaluation of athletic injuries requires understanding training load, growth factors in young athletes, and sport-specific demands. We offer complimentary MRI reviews and comprehensive assessments to ensure accurate diagnosis and optimal recovery planning tailored to your athletic goals.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--athletic-evaluation--thumbnail.png"
  },
  {
    "slug": "cubital-tunnel-surgery",
    "title": "Cubital Tunnel Surgery",
    "tag": "Hand",
    "body": "Cubital Tunnel Surgery treats cubital tunnel syndrome, the second most common nerve compression condition after carpal tunnel syndrome. The surgery relieves pressure on the ulnar nerve as it passes through the cubital tunnel on the inside of the elbow.Surgical options include in-situ decompression (releasing the tissue compressing the nerve) or ulnar nerve transposition (moving the nerve to a less vulnerable position). According to the American Society for Surgery of the Hand, surgery provides excellent outcomes when conservative treatment has failed.At Mountain Spine & Orthopedics, our hand and nerve specialists use minimally invasive techniques to achieve optimal nerve decompression with faster recovery and less discomfort.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--cubital-tunnel-surgery--thumbnail.png"
  },
  {
    "slug": "tennis-elbow-surgery",
    "title": "Tennis Elbow Surgery",
    "tag": "Hand",
    "body": "Tennis Elbow Surgery treats tennis elbow (lateral epicondylitis) when conservative treatments have failed. The procedure removes the damaged, degenerative tendon tissue from the extensor carpi radialis brevis (ECRB) tendon where it attaches to the lateral epicondyle of the elbow.While most tennis elbow cases resolve with rest, therapy, and injections, approximately 5-10% of patients require surgery. Modern techniques include open release, arthroscopic debridement, and percutaneous release—all with excellent outcomes.At Mountain Spine & Orthopedics, our orthopedic specialists determine the best surgical approach based on the extent of tendon damage and your specific needs.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--tennis-elbow-surgery--thumbnail.png"
  },
  {
    "slug": "golfers-elbow-surgery",
    "title": "Golfer's Elbow Surgery",
    "tag": "Hand",
    "body": "Golfer's Elbow Surgery treats golfer's elbow (medial epicondylitis) when conservative treatments have failed. The procedure removes the damaged, degenerative tendon tissue from the flexor-pronator muscle group where it attaches to the medial epicondyle of the elbow.Similar to tennis elbow surgery but on the opposite side of the elbow, this procedure addresses chronic tendon degeneration. Surgery is typically considered after 6-12 months of failed conservative care.At Mountain Spine & Orthopedics, our surgeons evaluate the extent of tendon damage and assess for associated ulnar nerve compression, which may need to be addressed at the same time.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--golfers-elbow-surgery--thumbnail.png"
  },
  {
    "slug": "elbow-arthroscopy",
    "title": "Elbow Arthroscopy",
    "tag": "Hand",
    "body": "Elbow Arthroscopy is a minimally invasive surgical procedure that uses a small camera (arthroscope) inserted through tiny incisions to visualize, diagnose, and treat problems inside the elbow joint. This technique offers significant advantages over traditional open surgery, including smaller incisions, less pain, and faster recovery.Elbow arthroscopy can address a variety of conditions including loose bodies, osteophytes (bone spurs), cartilage damage, synovitis, and stiffness. It's also valuable for diagnosing unexplained elbow pain when other tests are inconclusive.At Mountain Spine & Orthopedics, our surgeons are experienced in elbow arthroscopy and use advanced techniques to optimize outcomes and minimize recovery time.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--elbow-arthroscopy--thumbnail.png"
  },
  {
    "slug": "wrist-arthroscopy",
    "title": "Wrist Arthroscopy",
    "tag": "Hand",
    "body": "Wrist Arthroscopy is a minimally invasive surgical procedure that uses a small camera (arthroscope) to visualize, diagnose, and treat problems inside the wrist joint. The wrist's complex anatomy of eight carpal bones, multiple ligaments, and the triangular fibrocartilage complex (TFCC) makes arthroscopy particularly valuable for both diagnosis and treatment.Common conditions treated include TFCC tears, scapholunate ligament injuries, ganglion cysts, cartilage damage, and unexplained wrist pain. Arthroscopy allows treatment through tiny incisions with significantly faster recovery than open surgery.At Mountain Spine & Orthopedics, our hand and wrist specialists are experienced in wrist arthroscopy, using the latest techniques to diagnose and treat complex wrist conditions.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--wrist-arthroscopy--thumbnail.png"
  },
  {
    "slug": "wrist-fracture-surgery",
    "title": "Wrist Fracture Surgery",
    "tag": "Hand",
    "body": "Wrist Fracture Surgery stabilizes broken bones in the wrist to restore proper alignment and allow optimal healing. The most common wrist fracture is the distal radius fracture, occurring when the larger forearm bone breaks near the wrist joint. Surgery is typically recommended when the fracture is displaced, unstable, or involves the joint surface.Modern surgical techniques use plates and screws, external fixation, or pins to hold the bones in proper position while they heal. According to the American Academy of Orthopaedic Surgeons, surgical treatment provides more reliable alignment and earlier motion for appropriate fractures.At Mountain Spine & Orthopedics, our hand and wrist specialists evaluate each fracture individually to determine the optimal treatment approach.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--wrist-fracture-surgery--thumbnail.png"
  },
  {
    "slug": "de-quervains-release",
    "title": "De Quervain's Release",
    "tag": "Hand",
    "body": "De Quervain's Release Surgery treats De Quervain's tenosynovitis when conservative treatments have failed. The procedure opens the first dorsal compartment—the tunnel through which the thumb tendons pass on the thumb side of the wrist. This releases the constriction that causes pain and allows the tendons to glide freely.While most cases of De Quervain's respond to splinting and corticosteroid injections, approximately 20-30% of patients require surgery for definitive relief. The procedure is quick, effective, and has excellent outcomes.At Mountain Spine & Orthopedics, our hand specialists perform De Quervain's release using techniques that minimize scarring and optimize recovery.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--de-quervains-release--thumbnail.png"
  },
  {
    "slug": "dupuytrens-surgery",
    "title": "Dupuytren's Surgery",
    "tag": "Hand",
    "body": "Dupuytren's Surgery (fasciectomy) treats Dupuytren's contracture when the condition significantly affects hand function. The procedure removes the thickened, cord-like tissue (palmar fascia) that is pulling the fingers into a bent position, allowing the fingers to extend again.Surgery is typically recommended when the contracture reaches 30 degrees or more, or when you can no longer place your palm flat on a table. According to the American Society for Surgery of the Hand, fasciectomy provides the most complete removal of diseased tissue.At Mountain Spine & Orthopedics, our hand surgeons evaluate your contracture and recommend the most appropriate treatment, whether observation, injection, or surgery.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--dupuytrens-surgery--thumbnail.png"
  },
  {
    "slug": "hand-fracture-surgery",
    "title": "Hand Fracture Surgery",
    "tag": "Hand",
    "body": "Hand Fracture Surgery stabilizes broken bones in the fingers (phalanges) and hand (metacarpals) to restore proper alignment and function. The hand's 19 bones and multiple joints require precise treatment to maintain finger motion and grip strength.Common fractures include boxer's fractures (5th metacarpal neck), spiral metacarpal fractures, and phalanx fractures from sports, falls, or crush injuries. Surgery is typically recommended when fractures are displaced, angulated, unstable, or involve the joint surface.At Mountain Spine & Orthopedics, our hand specialists use various fixation methods including pins, screws, and plates to provide stable fixation while allowing early motion whenever possible.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--hand-fracture-surgery--thumbnail.png"
  },
  {
    "slug": "elbow-fracture-surgery",
    "title": "Elbow Fracture Surgery",
    "tag": "Elbow",
    "body": "Elbow Fracture Surgery stabilizes broken bones around the elbow joint to restore alignment and allow healing. The elbow is a complex hinge joint where three bones meet—the humerus (upper arm), radius, and ulna. Fractures can involve any of these bones and often result from falls onto an outstretched hand or direct trauma.Common elbow fractures include radial head fractures, olecranon fractures, and distal humerus fractures. Surgery is typically required when fractures are displaced, involve the joint surface, or are unstable.At Mountain Spine & Orthopedics, our orthopedic surgeons specialize in elbow fracture treatment, using plates, screws, and advanced techniques to optimize outcomes and preserve elbow motion.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--elbow-fracture-surgery--thumbnail.png"
  },
  {
    "slug": "shoulder-replacement",
    "title": "Total Shoulder Replacement",
    "tag": "Shoulder",
    "body": "Total Shoulder Replacement is a surgical procedure that replaces the damaged humeral head (ball) and glenoid (socket) with artificial components made of metal and plastic. This procedure is highly effective for treating advanced shoulder arthritis that has not responded to conservative treatments. At Mountain Spine & Orthopedics, our board-certified shoulder specialists use modern implant designs and surgical techniques to restore shoulder function and provide lasting pain relief.The procedure is typically recommended when shoulder arthritis causes severe pain, stiffness, and loss of function that significantly impacts daily activities. Modern shoulder replacement implants are designed to last 15-20 years or longer, making this an excellent long-term solution for patients with advanced arthritis. Our surgeons specialize in both traditional and reverse shoulder replacement techniques, choosing the best option based on each patient's specific condition and anatomy.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--shoulder-replacement--thumbnail.png"
  },
  {
    "slug": "reverse-shoulder-replacement",
    "title": "Reverse Shoulder Replacement",
    "tag": "Shoulder",
    "body": "Reverse Shoulder Replacement is a specialized procedure that reverses the normal ball-and-socket anatomy of the shoulder. Instead of the ball being on the humerus and socket on the shoulder blade, the components are reversed—the ball is attached to the shoulder blade and the socket to the humerus. This innovative design allows the deltoid muscle to power the shoulder, making it ideal for patients with large rotator cuff tears and shoulder arthritis.This procedure is particularly effective for patients who are not candidates for traditional shoulder replacement due to irreparable rotator cuff tears. The reverse design provides excellent pain relief and functional improvement, allowing patients to regain overhead motion even when the rotator cuff cannot be repaired. At Mountain Spine & Orthopedics, our shoulder specialists are experts in this advanced technique and use it to restore function for patients with complex shoulder problems.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--reverse-shoulder-replacement--thumbnail.png"
  },
  {
    "slug": "labral-repair-shoulder",
    "title": "Labral Repair (Shoulder)",
    "tag": "Shoulder",
    "body": "Labral Repair (Shoulder) is used when the cartilage rim around the shoulder socket is torn and no longer helps center the ball of the joint. The pattern matters. A Bankart tear usually follows a dislocation and can cause recurrent shoulder instability. A SLAP tear involves the top of the labrum where the biceps tendon attaches and may cause deep pain, clicking, or loss of throwing strength. Posterior labral tears can create pain or shifting in the back of the shoulder, especially with pressing, blocking, or contact activity.Mountain Spine & Orthopedics uses exam findings, MRI or MRI arthrogram results, prior dislocation history, bone-loss assessment, and sport or work demands to decide whether arthroscopic repair is appropriate. Not every labral tear needs surgery, and some older or degenerative SLAP patterns are better treated with biceps tenodesis or non-surgical care rather than labral repair alone.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--labral-repair-shoulder--thumbnail.png"
  },
  {
    "slug": "biceps-tenodesis",
    "title": "Biceps Tenodesis",
    "tag": "Shoulder",
    "body": "Biceps Tenodesis treats pain from the long head of the biceps tendon, the portion that travels through the front of the shoulder and attaches near the labrum. When this tendon is inflamed, partially torn, unstable in its groove, or involved in a SLAP tear, it can cause deep front-of-shoulder pain, clicking, cramping, pain with lifting, and loss of overhead strength.Tenodesis is different from tenotomy. In a tenotomy, the tendon is released and not reattached, which may be appropriate for some patients but can lead to cramping or a cosmetic \"Popeye\" muscle change. In tenodesis, the tendon is released from the painful shoulder-joint attachment and fixed to the upper arm bone to preserve contour and reduce traction inside the joint. Mountain Spine & Orthopedics considers age, activity demands, cosmetic concerns, rotator cuff status, labral findings, and work or sport goals when deciding whether tenodesis fits.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--biceps-tenodesis--thumbnail.png"
  },
  {
    "slug": "shoulder-instability-surgery",
    "title": "Shoulder Instability Surgery",
    "tag": "Shoulder",
    "body": "Shoulder Instability Surgery is an arthroscopic procedure that repairs the torn labrum (Bankart lesion) and tightens the joint capsule to restore shoulder stability. This procedure is highly effective for treating shoulder instability and preventing recurrent dislocations. At Mountain Spine & Orthopedics, our shoulder specialists use advanced arthroscopic techniques to perform this procedure, resulting in less pain and faster recovery compared to open surgery.The procedure addresses the structural damage that causes instability, typically repairing the torn labrum and tightening the stretched joint capsule. This restores the shoulder's natural stability and allows patients to return to sports and activities without fear of dislocation. Our surgeons specialize in both anterior (front) and posterior (back) stabilization procedures, choosing the approach based on each patient's specific pattern of instability.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--shoulder-instability-surgery--thumbnail.png"
  },
  {
    "slug": "acromioplasty",
    "title": "Acromioplasty",
    "tag": "Shoulder",
    "body": "Acromioplasty, also known as subacromial decompression, is an arthroscopic procedure that removes bone spurs from the underside of the acromion (shoulder blade) and creates more space for the rotator cuff tendons. This procedure is highly effective for treating shoulder impingement that hasn't responded to conservative treatment. At Mountain Spine & Orthopedics, our shoulder specialists use advanced arthroscopic techniques to perform this procedure, resulting in less pain and faster recovery compared to open surgery.The procedure addresses the structural cause of impingement by removing the bone spurs and smoothing the acromion, allowing the rotator cuff tendons to move freely without compression. This can prevent progression to rotator cuff tears and provide lasting pain relief. Acromioplasty is often performed in conjunction with other procedures like rotator cuff repair or biceps tenodesis.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--acromioplasty--thumbnail.png"
  },
  {
    "slug": "shoulder-fracture-surgery",
    "title": "Shoulder Fracture Surgery",
    "tag": "Shoulder",
    "body": "Shoulder Fracture Surgery is performed to repair broken bones in the shoulder, most commonly the proximal humerus (upper arm bone near the shoulder). Fractures can result from falls, direct trauma, or high-energy injuries. At Mountain Spine & Orthopedics, our shoulder specialists use advanced surgical techniques including open reduction and internal fixation (ORIF) with plates and screws, or shoulder replacement for severe fractures. The goal is to restore bone alignment, promote healing, and restore shoulder function.The type of surgery depends on the fracture pattern, bone quality, and patient factors. Some fractures can be repaired with plates and screws, while others may require shoulder replacement if the bone cannot be reliably fixed. Our surgeons specialize in both techniques and choose the best option based on each patient's specific fracture and goals.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--shoulder-fracture-surgery--thumbnail.png"
  },
  {
    "slug": "kyphoplasty",
    "title": "Kyphoplasty",
    "tag": "Spine",
    "body": "Kyphoplasty is a minimally invasive procedure used to treat painful vertebral compression fractures—often related to osteoporosis or trauma. At Mountain Spine & Orthopedics, this advanced treatment stabilizes the fracture, reduces pain, and improves function when conservative care isn't enough. A small balloon (bone tamp) is used to create space in the vertebra, then bone cement (PMMA) stabilizes the fracture site.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--kyphoplasty--thumbnail.png"
  },
  {
    "slug": "vertebroplasty",
    "title": "Vertebroplasty",
    "tag": "Spine",
    "body": "Vertebroplasty is a minimally invasive procedure that stabilizes a painful vertebral compression fracture by injecting bone cement into the collapsed vertebra. Unlike kyphoplasty, no balloon is used—cement is directly injected into the fracture site under imaging guidance. At Mountain Spine & Orthopedics, this procedure aims to reduce pain and improve mobility when conservative care is insufficient.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--vertebroplasty--thumbnail.png"
  },
  {
    "slug": "plif",
    "title": "PLIF (Posterior Lumbar Interbody Fusion)",
    "tag": "Lower Spine",
    "body": "PLIF (Posterior Lumbar Interbody Fusion) is a lumbar fusion procedure performed from the back to stabilize the spine and relieve nerve compression. At Mountain Spine & Orthopedics, PLIF may be considered for conditions like spondylolisthesis, severe degenerative disc disease with instability, or recurrent disc problems with persistent symptoms.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--plif--thumbnail.png"
  },
  {
    "slug": "thoracic-spine-surgery",
    "title": "Thoracic Spine Surgery",
    "tag": "Spine",
    "body": "Thoracic spine surgery addresses problems in the mid-back (T1-T12 vertebrae) that may compress the spinal cord, destabilize the spine, or cause deformity and pain. At Mountain Spine & Orthopedics, because the thoracic region protects the spinal cord and connects to the rib cage, diagnosis and surgical planning are especially important. Surgery is less common here than cervical or lumbar spine but may be necessary for specific conditions.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--thoracic-spine-surgery--thumbnail.png"
  },
  {
    "slug": "si-joint-fusion",
    "title": "SI Joint Fusion",
    "tag": "Lower Spine",
    "body": "SI joint fusion stabilizes the sacroiliac joint for patients with confirmed SI joint–driven pain that persists despite appropriate non-surgical care. At Mountain Spine & Orthopedics, accurate diagnosis is critical because SI pain can mimic lumbar spine or hip pain. Diagnosis typically combines exam findings with response to targeted SI joint injections. Imaging helps rule out alternative causes.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--si-joint-fusion--thumbnail.png"
  },
  {
    "slug": "cervical-laminectomy",
    "title": "Cervical Laminectomy",
    "tag": "Neck",
    "body": "Cervical laminectomy is a posterior neck surgery that removes the lamina, the back part of the vertebral arch, to create more room for the spinal cord. It is most often discussed when cervical spinal stenosis causes myelopathy, meaning the spinal cord is not functioning normally.Myelopathy is different from ordinary neck pain. Warning signs can include hand clumsiness, dropping objects, changes in handwriting, balance problems, gait changes, arm or leg weakness, numbness, and coordination issues. Mountain Spine & Orthopedics uses MRI, exam findings, alignment X-rays, and symptom progression to decide whether posterior decompression, laminoplasty, laminectomy with fusion, or another cervical procedure is most appropriate. PPO Insurance Accepted.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--cervical-laminectomy--thumbnail.png"
  },
  {
    "slug": "joint-pain-treatment",
    "title": "Joint Pain Treatment",
    "tag": "Pain Management",
    "body": "Joint pain can be caused by arthritis, inflammation, tendon problems, cartilage injury, or instability. At Mountain Spine & Orthopedics, the best treatment depends on the joint, severity, and whether the main problem is inflammation, mechanical damage, or nerve-related pain. Our evaluation includes comprehensive exam plus imaging selection (X-ray for arthritis; MRI for soft tissue/cartilage as needed).",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--joint-pain-treatment--thumbnail.png"
  },
  {
    "slug": "arthritis-treatment",
    "title": "Arthritis Treatment",
    "tag": "Pain Management",
    "body": "Arthritis is joint cartilage breakdown with inflammation that can cause pain, stiffness, swelling, and loss of motion. At Mountain Spine & Orthopedics, treatment focuses on improving function and reducing pain while preserving joint health. The most common type is osteoarthritis (degenerative joint disease), but inflammatory arthritis (rheumatoid, psoriatic) also affects joints and spine.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--arthritis-treatment--thumbnail.png"
  },
  {
    "slug": "bursitis-treatment",
    "title": "Bursitis Treatment",
    "tag": "Pain Management",
    "body": "Bursitis is inflammation of a bursa—a fluid-filled sac that reduces friction between bones, tendons, and muscles around joints. At Mountain Spine & Orthopedics, it often causes localized tenderness, pain with pressure, and pain with specific movements. Common locations include hip (trochanteric bursitis), shoulder (subacromial bursitis), knee (prepatellar, pes anserine), elbow (olecranon), and heel (retrocalcaneal).",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--bursitis-treatment--thumbnail.png"
  },
  {
    "slug": "tendonitis-treatment",
    "title": "Tendonitis Treatment",
    "tag": "Pain Management",
    "body": "Tendonitis/tendinopathy refers to tendon irritation or degeneration that causes pain with use and reduced strength. At Mountain Spine & Orthopedics, acute tendonitis involves inflammation, while chronic tendon pain is often tendinopathy (degenerative changes) rather than active inflammation. Treatment focuses on restoring tendon capacity and mechanics through progressive loading.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--tendonitis-treatment--thumbnail.png"
  },
  {
    "slug": "osteoporosis-treatment",
    "title": "Osteoporosis Treatment",
    "tag": "Pain Management",
    "body": "Osteoporosis reduces bone density and increases fracture risk—especially in the spine, hip, and wrist. At Mountain Spine & Orthopedics, treatment focuses on preventing fractures and maintaining mobility. This 'silent disease' has no symptoms until fracture occurs. Evaluation includes bone density testing (DEXA scan), fracture risk assessment using FRAX tool, vitamin D and calcium levels, and medical management coordination.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--osteoporosis-treatment--thumbnail.png"
  },
  {
    "slug": "achilles-tendon-repair",
    "title": "Achilles Tendon Repair",
    "tag": "Foot",
    "body": "Achilles tendon repair surgery restores function after partial or complete tendon rupture, allowing you to return to walking, running, and sports activities.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--achilles-tendon-repair--thumbnail.png"
  },
  {
    "slug": "plantar-fasciitis-treatment",
    "title": "Plantar Fasciitis Treatment",
    "tag": "Foot",
    "body": "Plantar fasciitis treatment targets the plantar fascia, calf tightness, footwear mechanics, and inflammation that cause first-step heel pain.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--plantar-fasciitis-treatment--thumbnail.png"
  },
  {
    "slug": "plantar-fasciitis-surgery",
    "title": "Plantar Fascia Release Surgery",
    "tag": "Foot",
    "body": "Plantar fascia release surgery provides lasting relief for chronic plantar fasciitis that hasn't responded to conservative treatment after 6-12 months.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--plantar-fasciitis-surgery--thumbnail.png"
  },
  {
    "slug": "hammertoe-surgery",
    "title": "Hammertoe Surgery",
    "tag": "Foot",
    "body": "Hammertoe surgery straightens a painful bent toe when shoe changes, padding, splints, or orthotics no longer control rubbing, corns, or joint stiffness.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--hammertoe-surgery--thumbnail.png"
  },
  {
    "slug": "foot-fracture-surgery",
    "title": "Foot Fracture Surgery",
    "tag": "Foot",
    "body": "Foot fracture surgery stabilizes broken bones in the foot using plates, screws, or pins to restore proper alignment and enable return to walking.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--foot-fracture-surgery--thumbnail.png"
  },
  {
    "slug": "ankle-fracture-surgery",
    "title": "Ankle Fracture Surgery",
    "tag": "Ankle",
    "body": "Ankle fracture surgery restores alignment to broken ankle bones using plates and screws, enabling proper healing and return to normal walking.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--ankle-fracture-surgery--thumbnail.png"
  },
  {
    "slug": "mortons-neuroma-surgery",
    "title": "Morton's Neuroma Surgery",
    "tag": "Foot",
    "body": "Morton's neuroma surgery removes the enlarged nerve tissue causing burning pain and numbness in the ball of the foot, providing lasting relief.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--mortons-neuroma-surgery--thumbnail.png"
  },
  {
    "slug": "flat-foot-surgery",
    "title": "Flat Foot Surgery",
    "tag": "Foot",
    "body": "Flat foot surgery reconstructs the arch of the foot, restoring alignment and relieving pain from adult-acquired flatfoot deformity.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--flat-foot-surgery--thumbnail.png"
  },
  {
    "slug": "heel-pain-treatment",
    "title": "Heel Pain Treatment",
    "tag": "Foot",
    "body": "Heel pain treatment begins by identifying whether pain comes from the plantar fascia, Achilles tendon, heel bone, bursa, fat pad, or a compressed nerve.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--heel-pain-treatment--thumbnail.png"
  },
  {
    "slug": "diabetic-foot-care",
    "title": "Diabetic Foot Care",
    "tag": "Foot",
    "body": "Comprehensive diabetic foot care prevents and treats foot complications in diabetic patients, preserving limb health and preventing amputation.",
    "card_img": "https://mountainspineortho.b-cdn.net/treatments-thumbnails/mountain-spine-orthopedics--treatment--diabetic-foot-care--thumbnail.png"
  }
];
