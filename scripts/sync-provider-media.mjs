// Copies (or removes) Dr. Scott Katzman's public image files based on
// SHOW_SCOTT_KATZMAN, run automatically before `dev`/`build` via npm's
// pre-script hooks (see package.json).
//
// Why this exists: Next.js serves everything under public/ verbatim and
// unconditionally, with no code-level gating possible. To make his images
// genuinely unavailable by direct URL when the flag is off (not just absent
// from rendered pages), the actual files must not be present in public/ for
// that build. The source files are never deleted — they live permanently in
// provider-media/scott-katzman/ and this script only copies them into (or
// removes them from) public/.
//
// This mirrors the strict parsing in lib/config/featureFlags.ts. It's
// duplicated rather than imported because this script runs under plain
// Node (via `node`, not `next build`'s webpack/SWC pipeline), and
// lib/config/featureFlags.ts is intentionally guarded with `import
// "server-only"`, which only resolves inside Next's build. Keep the two in
// sync if the parsing rules ever change.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

// This script runs via an npm pre-script hook, as a plain `node` process —
// unlike `next dev`/`next build`, plain Node does not auto-load .env files.
// Mirror Next.js's precedence (.env.local wins over .env) so a value set
// either place is honored the same way it would be by the real build.
function loadDotEnvFile(filename) {
  const filePath = path.join(root, filename);
  if (!fs.existsSync(filePath)) return;
  const contents = fs.readFileSync(filePath, 'utf8');
  for (const line of contents.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

// Real env vars (shell-provided) always win; only fill in what's missing.
loadDotEnvFile('.env.local');
loadDotEnvFile('.env');

function parseShowScottKatzman() {
  const raw = process.env.SHOW_SCOTT_KATZMAN;
  if (raw !== undefined && raw !== '0' && raw !== '1') {
    throw new Error(`SHOW_SCOTT_KATZMAN must be set to either "1" or "0" (got: "${raw}").`);
  }
  return raw !== '0';
}

const FILES = [
  { source: 'provider-media/scott-katzman/ScottKatzman.png', dest: 'public/ScottKatzman.png' },
  { source: 'provider-media/scott-katzman/toporthokatzman.webp', dest: 'public/toporthokatzman.webp' },
];

const showScottKatzman = parseShowScottKatzman();

for (const { source, dest } of FILES) {
  const sourcePath = path.join(root, source);
  const destPath = path.join(root, dest);

  if (showScottKatzman) {
    fs.copyFileSync(sourcePath, destPath);
    console.log(`[sync-provider-media] copied ${source} -> ${dest}`);
  } else if (fs.existsSync(destPath)) {
    fs.unlinkSync(destPath);
    console.log(`[sync-provider-media] removed ${dest} (SHOW_SCOTT_KATZMAN=0)`);
  } else {
    console.log(`[sync-provider-media] ${dest} already absent (SHOW_SCOTT_KATZMAN=0)`);
  }
}
