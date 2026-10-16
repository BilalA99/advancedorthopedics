/**
 * Proves the Apps Script insurance rules agree with lib/insurance-routing.ts
 * for every option the form can actually produce.
 *
 * The tracker (Code.gs) and the lead-sheet sync (lead-sheet-auto-sync.gs) live
 * in a different runtime and cannot import the site's config, so each keeps its
 * own copy of the option lists. This check loads the two .gs files THEMSELVES
 * (not a pasted copy of them, which can drift silently) and compares:
 *
 *   - Code.gs isQualifiedInsurance(value)      vs the site's qualification
 *   - lead-sheet-auto-sync.gs getLeadPriority  vs the site's qualification
 *     (qualified -> ✅ PPO or ⭐ HIGH VALUE, unqualified -> ⛔ NOT ACCEPTED)
 *
 * Run: npx tsx scripts/qa/verify-apps-script-rule.ts
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import { getInsuranceOptions } from "../../lib/insurance-routing";

const DIR = join(dirname(fileURLToPath(import.meta.url)), "../../docs/operations/mso-intake-form-insurance-routing/apps-script");

function load(file: string): vm.Context {
  const ctx = vm.createContext({ console });
  vm.runInContext(readFileSync(join(DIR, file), "utf8"), ctx, { filename: file });
  return ctx;
}

const tracker = load("Code.gs") as unknown as { isQualifiedInsurance(v: string): boolean };
const sync = load("lead-sheet-auto-sync.gs") as unknown as {
  getLeadPriority(v: string, reason: string): string;
};

const ACCEPTED = new Set(["✅ PPO", "⭐ HIGH VALUE"]);
let bad = 0;
const row = (...c: string[]) => console.log(c[0].padEnd(40) + c.slice(1).map((x) => "| " + x.padEnd(14)).join(""));
row("value", "site", "Code.gs", "sync label", "match");
console.log("-".repeat(104));
for (const o of getInsuranceOptions()) {
  const site = o.qualification === "qualified";
  const gs = tracker.isQualifiedInsurance(o.value);
  const label = sync.getLeadPriority(o.value, "back pain");
  const labelOk = site ? ACCEPTED.has(label) : label === "⛔ NOT ACCEPTED";
  const ok = site === gs && labelOk;
  if (!ok) bad++;
  row(o.value, String(site), String(gs), label, ok ? "ok" : "MISMATCH");
}
// Values the form no longer produces but older rows or a hand-typed sheet edit might hold.
const legacy: [string, boolean][] = [
  ["", false], ["Non-PPO", false], ["aetna ppo", true], ["Medicare / Medicaid / HMO", false], ["Other", false],
];
for (const [v, expected] of legacy) {
  const gs = tracker.isQualifiedInsurance(v);
  const ok = gs === expected;
  if (!ok) bad++;
  row(v || "(blank)", "expect " + expected, String(gs), "", ok ? "ok" : "MISMATCH");
}
console.log(bad === 0 ? "\nALL MATCH: tracker, sheet sync and site agree" : `\n${bad} MISMATCH(ES)`);
process.exit(bad ? 1 : 0);
