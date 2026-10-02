/** Confirms the rendered dropdown shows carrier names without the PPO suffix. */
import puppeteer from 'puppeteer';
const BASE = process.argv[2] || 'http://localhost:3000';
const b = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
await p.goto(BASE + '/insurance-policy', { waitUntil: 'networkidle2', timeout: 60000 });
await new Promise(r => setTimeout(r, 1500));
await p.evaluate(() => document.getElementById('insurance_type').closest('form').setAttribute('data-qa','1'));
await p.evaluate(() => { const e = document.getElementById('insurance_type'); e.scrollIntoView({block:'center'}); e.focus(); });
await p.keyboard.press('Enter');
await new Promise(r => setTimeout(r, 900));
const out = await p.evaluate((id) => {
  const trig = document.getElementById(id);
  const controlled = trig.getAttribute('aria-controls');
  const all = Array.from(document.querySelectorAll('[role="listbox"]'));
  const box = (controlled && all.find(b => b.id === controlled)) || all[all.length-1];
  const opts = Array.from(box.querySelectorAll('[role="option"]')).map(o => o.textContent.trim());
  return { count: opts.length, opts, helper: document.querySelector('[data-qa] p')?.textContent?.trim().slice(0,200) };
}, 'insurance_type');
console.log('options rendered:', out.count);
out.opts.forEach((o,i) => console.log('  ' + String(i).padStart(2) + '  ' + o));
const stillPPO = out.opts.filter(o => /\bPPO\b/.test(o) && o !== 'PPO (any carrier)');
console.log('\ncarrier options still showing "PPO": ' + (stillPPO.length ? stillPPO.join(', ') : 'none'));
const helperText = await p.evaluate(() => {
  const form = document.querySelector('[data-qa]');
  return Array.from(form.querySelectorAll('p')).map(e=>e.textContent.trim()).find(t=>/PPO practice/i.test(t)) || '(not found)';
});
console.log('helper text: ' + helperText);
await b.close();
process.exit(stillPPO.length ? 1 : 0);
