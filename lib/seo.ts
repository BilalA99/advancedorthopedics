// Handle both development and production environments
const getSiteUrl = () => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  return isDevelopment ? 'http://localhost:3000' : 'https://mountainspineorthopedics.com';
};

export const siteUrl = getSiteUrl();

// Always use production domain for canonical URLs (SEO requirement)
export const SITE_URL = "https://mountainspineorthopedics.com";

export function normalizePath(p: string): string {
  if (!p) return "/";
  let path = p.trim();
  if (!path.startsWith("/")) path = `/${path}`;
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
  return path.toLowerCase();
}

/** Lowercase, no trailing slash, absolute URL - always uses production domain for canonicals */
export function buildCanonical(path: string = "/"): string {
  const normalized = normalizePath(path);
  return `${SITE_URL}${normalized}`;
}

export function canonicalForOg(path: string): string {
  return buildCanonical(path);
}

/**
 * Remove HTML tags from text
 */
function removeHTML(text: string): string {
  return text.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
}

// Safe title/description fallbacks
export function safeTitle(primary?: string, fallback?: string): string {
  const text = normalizeUTF8(primary || fallback || "Mountain Spine & Orthopedics");
  const cleaned = removeHTML(text).trim();
  
  // Ensure title ends with "Mountain Spine Orthopedics" or variant if not already included
  if (!cleaned.includes("Mountain Spine")) {
    // If title doesn't include brand, add it
    return `${cleaned} | Mountain Spine Orthopedics`;
  }
  
  return cleaned;
}

export function safeDescription(primary?: string, fallback?: string): string {
  const text = normalizeUTF8(primary || fallback || "");
  const cleaned = removeHTML(text)
    .replace(/\s+/g, " ")
    .trim();
  return cleaned || "Trusted orthopedic and spine care across Florida, New Jersey, New York, Pennsylvania, and Georgia.";
}

// SR-only utility class (Tailwind assumed)
export const srOnly = "sr-only";

/** Build consistent OG description for doctor pages */
export function buildOgDescription(fullName: string): string {
  return `Meet ${fullName}, a board-certified orthopedic surgeon at Mountain Spine & Orthopedics. Expert in minimally invasive surgery and personalized spine and joint care. Serving patients across FL, NJ, NY, PA & GA.`;
}

/**
 * Normalize UTF-8 encoding errors in text
 * Replaces common malformed encoding characters with correct UTF-8 characters
 */
export function normalizeUTF8(text: string): string {
  if (!text || typeof text !== 'string') return text;
  
  return text
    .replace(/â€"/g, '—')  // em dash
    .replace(/â€™/g, "'")   // apostrophe
    .replace(/â€œ/g, '"')  // left double quote
    .replace(/â€/g, '"')    // right double quote
    .replace(/â€"/g, '–')  // en dash
    .replace(/â€¦/g, '…')  // ellipsis
    .replace(/â€"/g, '—')  // em dash (alternative)
    .replace(/â€"/g, '–')  // en dash (alternative)
    .replace(/â€"/g, '—'); // em dash (alternative)
} 
