// Targeted validation script for the SHOW_SCOTT_KATZMAN strict parser.
// No test framework exists in this repo; per the task's own guidance, this
// avoids introducing one for a single small check. Run with:
//   npx tsx scripts/test-feature-flag-parsing.mjs
// Exits 0 if every case behaves as specified, exits 1 (with details) otherwise.

import { parseStrictBooleanFlag } from '../lib/config/parseStrictBooleanFlag.ts';

const ENV_VAR_NAME = 'SHOW_SCOTT_KATZMAN';
let failures = 0;
let passed = 0;

function expectValue(label, rawValue, defaultValue, expected) {
  try {
    const result = parseStrictBooleanFlag(ENV_VAR_NAME, rawValue, defaultValue);
    if (result === expected) {
      console.log(`PASS  ${label}: got ${result}`);
      passed++;
    } else {
      console.log(`FAIL  ${label}: expected ${expected}, got ${result}`);
      failures++;
    }
  } catch (e) {
    console.log(`FAIL  ${label}: expected value ${expected}, but threw: ${e.message}`);
    failures++;
  }
}

function expectThrows(label, rawValue, defaultValue) {
  try {
    const result = parseStrictBooleanFlag(ENV_VAR_NAME, rawValue, defaultValue);
    console.log(`FAIL  ${label}: expected a throw, got value ${result}`);
    failures++;
  } catch (e) {
    if (e.message.includes(ENV_VAR_NAME)) {
      console.log(`PASS  ${label}: threw and error names ${ENV_VAR_NAME} ("${e.message}")`);
      passed++;
    } else {
      console.log(`FAIL  ${label}: threw but error does not name ${ENV_VAR_NAME}: "${e.message}"`);
      failures++;
    }
  }
}

console.log('=== SHOW_SCOTT_KATZMAN strict parser validation ===\n');

// Missing value defaults to the caller-supplied default (true = visible in production usage)
expectValue('missing value defaults to visible (true)', undefined, true, true);
expectValue('missing value defaults to hidden (false) when default=false', undefined, false, false);

// Exact accepted values
expectValue('"1" succeeds -> true', '1', true, true);
expectValue('"0" succeeds -> false', '0', true, false);

// Explicitly rejected values
expectThrows('empty string fails', '', true);
expectThrows('"true" fails', 'true', true);
expectThrows('"false" fails', 'false', true);
expectThrows('"yes" fails', 'yes', true);
expectThrows('"no" fails', 'no', true);
expectThrows('"2" (unexpected number) fails', '2', true);
expectThrows('"10" (unexpected number) fails', '10', true);
expectThrows('"-1" (unexpected number) fails', '-1', true);
expectThrows('" 1" (leading whitespace) fails', ' 1', true);
expectThrows('"1 " (trailing whitespace) fails', '1 ', true);
expectThrows('" 0 " (whitespace-padded) fails', ' 0 ', true);
expectThrows('"01" fails', '01', true);
expectThrows('"1.0" fails', '1.0', true);
expectThrows('"ENABLED" fails', 'ENABLED', true);
expectThrows('"disabled" fails', 'disabled', true);

console.log(`\n${passed} passed, ${failures} failed`);
process.exit(failures === 0 ? 0 : 1);
