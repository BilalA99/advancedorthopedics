import "server-only";
import { parseStrictBooleanFlag } from "./parseStrictBooleanFlag";

/**
 * Controls whether Dr. Scott Katzman appears in public website output.
 * Missing value defaults to true (visible) to preserve existing production behavior.
 */
export const showScottKatzman = parseStrictBooleanFlag("SHOW_SCOTT_KATZMAN", process.env.SHOW_SCOTT_KATZMAN, true);
