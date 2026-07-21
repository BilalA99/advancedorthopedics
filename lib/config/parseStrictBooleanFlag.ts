/**
 * Strict boolean env var parser.
 * Accepts only the exact strings "1" or "0". Missing = default value.
 * Anything else throws, so a typo'd flag value fails loudly during
 * build/startup instead of silently shipping the wrong behavior.
 *
 * No `server-only` guard here (unlike featureFlags.ts) — kept as a pure,
 * dependency-free function specifically so it can be unit-tested directly
 * under plain Node/tsx. featureFlags.ts is the only place this should be
 * called from application code.
 */
export function parseStrictBooleanFlag(envVarName: string, rawValue: string | undefined, defaultValue: boolean): boolean {
  if (rawValue !== undefined && rawValue !== "0" && rawValue !== "1") {
    throw new Error(`${envVarName} must be set to either "1" or "0" (got: "${rawValue}").`);
  }

  if (rawValue === undefined) {
    return defaultValue;
  }

  return rawValue === "1";
}
