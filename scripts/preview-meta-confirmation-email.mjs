/**
 * Renders the Meta patient confirmation email to a local HTML file for review.
 *
 * SYNTHETIC ONLY. The email carries no patient-specific content by design — no
 * name, no clinic, no condition — so there is nothing to substitute: what this
 * renders is byte-for-byte what a patient receives. That is itself the thing to
 * check in the preview.
 *
 *   npx tsx scripts/preview-meta-confirmation-email.mjs
 *   -> reports/meta-confirmation-preview.html
 *
 * The output wraps the email in a chrome that shows the subject, preview text,
 * the plain-text alternative, and a mobile-width frame beside the desktop one,
 * because the three failure modes worth catching are a broken mobile reflow, a
 * preview line that merely repeats the subject, and a text part that has drifted
 * from the HTML.
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

import { renderToStaticMarkup } from 'react-dom/server';

// Run under tsx (`npx tsx`), which resolves the .tsx/.ts imports below. A
// `node:module` register() hook is the other way to do this and is not used
// here: tsx's ESM hook has to be installed with --import rather than from
// inside the module being loaded, so registering it in-file fails outright.
import { MetaConfirmationEmailTemplate } from '../components/email/metaconfirmationtemplate.tsx';
import * as content from '../lib/meta-confirmation-content.ts';

const emailHtml = renderToStaticMarkup(MetaConfirmationEmailTemplate({}));
const plainText = content.confirmationPlainText();

const escape = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const page = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>MSO patient confirmation — preview</title>
<style>
  body { margin:0; background:#f1f3f7; color:#111827;
         font:14px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif; }
  .wrap { max-width:1180px; margin:0 auto; padding:28px 20px 60px; }
  h1 { font-size:20px; margin:0 0 4px; }
  .sub { color:#6b7280; margin:0 0 24px; }
  .meta { background:#fff; border:1px solid #e5e7eb; border-radius:8px; padding:16px 18px; margin-bottom:24px; }
  .meta dl { display:grid; grid-template-columns:150px 1fr; gap:8px 16px; margin:0; }
  .meta dt { color:#6b7280; font-weight:600; }
  .meta dd { margin:0; }
  .cols { display:flex; gap:24px; align-items:flex-start; flex-wrap:wrap; }
  .panel { background:#fff; border:1px solid #e5e7eb; border-radius:8px; overflow:hidden; }
  .panel > header { background:#f9fafb; border-bottom:1px solid #e5e7eb;
                    padding:9px 14px; font-weight:600; font-size:12px;
                    letter-spacing:.04em; text-transform:uppercase; color:#6b7280; }
  .desktop { flex:1 1 620px; min-width:360px; }
  .mobile  { flex:0 0 390px; }
  .mobile .frame { width:390px; }
  pre { margin:0; padding:16px; white-space:pre-wrap; font:13px/1.6 ui-monospace, Menlo, Consolas, monospace; }
  .note { background:#fffbeb; border:1px solid #fde68a; border-radius:8px;
          padding:14px 16px; margin-bottom:24px; color:#713f12; }
  .note strong { color:#854d0e; }
</style>
</head>
<body>
<div class="wrap">
  <h1>Meta V3 patient confirmation — email preview</h1>
  <p class="sub">Rendered from the production template. Synthetic review copy; no patient data involved.</p>

  <div class="note">
    <strong>Not enabled in production.</strong>
    ENABLE_META_PATIENT_CONFIRMATION_EMAIL defaults to 0. Resend's security page
    states it is not HIPAA compliant and cannot sign a BAA, and the Supabase
    organization has no HIPAA add-on. This preview exists so the design and copy
    can be approved while that is resolved.
  </div>

  <div class="meta">
    <dl>
      <dt>From</dt><dd>Mountain Spine &amp; Orthopedics &lt;info@mountainspineorthopedics.com&gt;</dd>
      <dt>Reply-To</dt><dd>info@mountainspineorthopedics.com</dd>
      <dt>Subject</dt><dd>${escape(content.CONFIRMATION_SUBJECT)}</dd>
      <dt>Preview text</dt><dd>${escape(content.CONFIRMATION_PREVIEW_TEXT)}</dd>
      <dt>Open tracking</dt><dd>disabled (no pixel; verify domain setting too)</dd>
      <dt>Click tracking</dt><dd>disabled (no redirector; <code>tel:</code> must not be rewritten)</dd>
      <dt>Remote assets</dt><dd>logo only, from the practice's own CDN</dd>
    </dl>
  </div>

  <div class="cols">
    <section class="panel desktop">
      <header>Desktop / webmail</header>
      <div class="frame">${emailHtml}</div>
    </section>
    <section class="panel mobile">
      <header>Mobile — 390px</header>
      <div class="frame">${emailHtml}</div>
    </section>
  </div>

  <section class="panel" style="margin-top:24px">
    <header>text/plain alternative</header>
    <pre>${escape(plainText)}</pre>
  </section>
</div>
</body>
</html>
`;

const out = resolve(import.meta.dirname, '../reports/meta-confirmation-preview.html');
await mkdir(dirname(out), { recursive: true });
await writeFile(out, page, 'utf8');
console.log(`Wrote ${out}`);
