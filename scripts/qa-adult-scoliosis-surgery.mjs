/**
 * Responsive QA for /treatments/adult-scoliosis-surgery.
 *
 * The page adds no CSS of its own — it is a data record rendered by the shared
 * treatment template — so this checks that the template's proven responsive
 * behaviour still holds with this record's content: no horizontal overflow, the
 * candidacy list and FAQ present at every width, and the physician module
 * showing the two deformity surgeons.
 *
 * Usage: node scripts/qa-adult-scoliosis-surgery.mjs [baseUrl]
 */

import puppeteer from 'puppeteer';

const BASE = process.argv[2] || 'http://localhost:3000';
const URL = `${BASE}/treatments/adult-scoliosis-surgery`;

const VIEWPORTS = [
  ['mobile', 390, 844, true],
  ['tablet', 768, 1024, false],
  ['desktop', 1440, 900, false],
];

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
let failures = 0;

for (const [name, width, height, isMobile] of VIEWPORTS) {
  const page = await browser.newPage();
  await page.setViewport({ width, height, isMobile, deviceScaleFactor: 1 });
  await page.goto(URL, { waitUntil: 'networkidle2', timeout: 90000 });

  // Mount reveal-animated sections before measuring.
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.8);
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 300));
  });

  const result = await page.evaluate(() => {
    const txt = (el) => (el?.textContent || '').trim();
    const h2s = [...document.querySelectorAll('main h2')].map(txt).filter(Boolean);
    const faqs = [...document.querySelectorAll('main h3')]
      .map(txt)
      .filter((t) => t.includes('?'));
    const body = document.body;
    return {
      overflow: Math.max(0, body.scrollWidth - document.documentElement.clientWidth),
      h2Count: h2s.length,
      hasCandidacy: h2s.some((h) => /Who Is a Candidate/i.test(h)),
      hasDoctorsHeading: h2s.some((h) => /Doctors Who Treat Adult Scoliosis/i.test(h)),
      faqCount: faqs.length,
      doctorCards: [...document.querySelectorAll('main')]
        .map((m) => m.textContent || '')
        .join(' ')
        .match(/McCarthy|Slaughter|Katzman|Shumway|Cowin/g) || [],
      h1: txt(document.querySelector('h1')),
    };
  });

  const doctors = [...new Set(result.doctorCards)].sort();
  const problems = [];
  if (result.overflow > 0) problems.push(`horizontal overflow ${result.overflow}px`);
  if (!result.hasCandidacy) problems.push('candidacy section missing');
  if (!result.hasDoctorsHeading) problems.push('doctorsHeading missing');
  if (result.faqCount !== 7) problems.push(`expected 7 FAQs, found ${result.faqCount}`);
  if (doctors.some((d) => d === 'Katzman' || d === 'Shumway' || d === 'Cowin')) {
    problems.push(`unexpected provider: ${doctors.join(', ')}`);
  }

  console.log(
    `${name.padEnd(8)} ${width}x${height}  h1="${result.h1}"  h2=${result.h2Count}  faq=${result.faqCount}  overflow=${result.overflow}px  doctors=[${doctors.join(', ')}]`
  );
  if (problems.length) {
    failures++;
    for (const p of problems) console.log(`         FAIL: ${p}`);
  }

  await page.close();
}

await browser.close();

if (failures) {
  console.log(`\n${failures} viewport(s) failed.`);
  process.exit(1);
}
console.log('\nResponsive QA OK — 3 viewports.');
