/**
 * Global constants for location pages
 * Used across UI, schema generation, and FAQs for consistency
 */

export const MAIN_PHONE_DISPLAY = "(561) 223-9959";
export const MAIN_PHONE_TEL = "5612239959";
export const MAIN_PHONE_E164 = "+1-561-223-9959"; // E.164 format for schema.org
export const MAIN_PHONE_HREF = "tel:+15612239959"; // dialable href (no punctuation)
export const LOCATION_HOURS_DISPLAY = "8AM–8PM, 7 days/week";

export const NJ_PHONE_DISPLAY = "(973) 259-6756";
export const NY_PHONE_DISPLAY = "(646) 389-5606";

export const STATE_PHONE_NUMBERS = {
  florida: {
    display: "(561) 223-9959",
    tel: "5612239959",
    e164: "+1-561-223-9959",
    href: "tel:+15612239959"
  },
  'new-jersey': {
    display: "(973) 259-6756",
    tel: "9732596756",
    e164: "+1-973-259-6756",
    href: "tel:+19732596756"
  },
  'new-york': {
    display: "(646) 389-5606",
    tel: "6463895606",
    e164: "+1-646-389-5606",
    href: "tel:+16463895606"
  },
  pennsylvania: {
    display: "(561) 223-9959",
    tel: "5612239959",
    e164: "+1-561-223-9959",
    href: "tel:+15612239959"
  }
};

/**
 * Opening hours in schema.org format
 * All locations: Monday-Sunday, 8:00 AM - 8:00 PM
 */
export const LOCATION_OPENING_HOURS = [
  "Mo 08:00-20:00",
  "Tu 08:00-20:00",
  "We 08:00-20:00",
  "Th 08:00-20:00",
  "Fr 08:00-20:00",
  "Sa 08:00-20:00",
  "Su 08:00-20:00",
];
