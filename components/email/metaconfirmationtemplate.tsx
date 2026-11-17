import * as React from 'react';

import {
  CONFIRMATION_CTA_LABEL,
  CONFIRMATION_HEADING,
  CONFIRMATION_INTRO,
  CONFIRMATION_OUTRO,
  CONFIRMATION_PREVIEW_TEXT,
  EXPECT_CALL_LABEL,
  EXPECT_CALL_NOTE,
  PRACTICE_NAME,
  SCHEDULING_PHONE_DISPLAY,
  SCHEDULING_PHONE_TEL,
  SITE_LABEL,
  SITE_URL,
} from "@/lib/meta-confirmation-content";

/**
 * Patient-facing acknowledgement for a Meta Instant Form appointment request.
 *
 * WHY NOT REUSE `UserEmailTemplate`
 * That template greets the patient by name, lists every clinic with its address,
 * and says "Thank You for Your Submission" — it is a website-form letter. A
 * scheduling acknowledgement has one job: tell the patient a call is coming, from
 * which number, and that nothing is booked yet. The clinic directory buries all
 * three, and the patient already chose their clinic inside the Instant Form.
 *
 * THE LOGO IS THE ONE REMOTE RESOURCE, AND IT IS DELIBERATE.
 * Every remote image in an email is also an open tracker: the recipient's IP,
 * client and read time reach whoever serves it. This one is served from the
 * practice's own CDN and is ALREADY loaded by the website's existing production
 * patient confirmation (`UserEmailTemplate`), so including it introduces no
 * disclosure that patients are not already subject to — while leaving it out
 * would make this the only unbranded email the practice sends. Nothing else is
 * remote: no webfont, no second image, no pixel, no analytics, no click
 * redirector. If the CDN is ever ruled out for patient mail, delete the one
 * `<img>` below and the text wordmark beside it already carries the brand.
 *
 * TABLE LAYOUT, INLINE STYLES, NO MEDIA QUERIES
 * Outlook on Windows renders through Word, which ignores flexbox, grid and most
 * of `<style>`. A single centred table with a max-width and percentage widths is
 * the one layout that is genuinely identical in Gmail, Outlook, Apple Mail and
 * mobile clients, and it reflows on a phone without a media query.
 */

const BRAND = "#0A50EC";
const INK = "#111827";
const BODY = "#4b5563";
const RULE = "#e5e7eb";
const WASH = "#f3f6fd";
const PAGE = "#ffffff";

const LOGO_URL = "https://mountainspineortho.b-cdn.net/newlogo4.png";

export const MetaConfirmationEmailTemplate: React.FC = () => {
  return (
    <div lang="en" style={{ backgroundColor: PAGE, margin: 0, padding: 0 }}>
      {/*
        Preview text. Clients show the first text they find after the subject, so
        without this they would show "Thank you for contacting…" and effectively
        repeat the subject. Hidden with the standard belt-and-braces combination
        (zero font, zero height, clipped) because no single property is respected
        across all clients.
      */}
      <div
        style={{
          display: "none",
          fontSize: "1px",
          lineHeight: "1px",
          maxHeight: 0,
          maxWidth: 0,
          opacity: 0,
          overflow: "hidden",
        }}
      >
        {CONFIRMATION_PREVIEW_TEXT}
      </div>

      <table
        role="presentation"
        width="100%"
        cellPadding={0}
        cellSpacing={0}
        border={0}
        style={{ backgroundColor: PAGE, borderCollapse: "collapse", width: "100%" }}
      >
        <tbody>
          <tr>
            <td align="center" style={{ padding: "24px 12px" }}>
              <table
                role="presentation"
                cellPadding={0}
                cellSpacing={0}
                border={0}
                width="100%"
                style={{
                  borderCollapse: "collapse",
                  // Caps line length on desktop; the percentage width lets it
                  // shrink on a phone with no media query involved.
                  maxWidth: "560px",
                  width: "100%",
                  textAlign: "left",
                  fontFamily: "Arial, Helvetica, sans-serif",
                }}
              >
                <tbody>
                  {/* ── Header ──────────────────────────────────────────── */}
                  <tr>
                    <td style={{ borderTop: `4px solid ${BRAND}`, paddingTop: "20px" }}>
                      {/*
                        The wordmark is TEXT next to the image, not a caption for
                        it. Outlook blocks images by default, so a header that is
                        only an image is a blank box for a large share of readers.
                      */}
                      {/*
                        next/image is not available in an email: there is no
                        Next.js runtime in a mail client, and its output relies
                        on srcset/lazy-loading that mail clients strip. A plain
                        <img> with an explicit width is the only portable form.
                      */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={LOGO_URL}
                        width={132}
                        alt={PRACTICE_NAME}
                        style={{
                          border: 0,
                          display: "block",
                          height: "auto",
                          maxWidth: "100%",
                          width: "132px",
                        }}
                      />
                      <div
                        style={{
                          color: BRAND,
                          fontSize: "17px",
                          fontWeight: 700,
                          letterSpacing: "0.2px",
                          lineHeight: "24px",
                          paddingTop: "10px",
                        }}
                      >
                        {PRACTICE_NAME}
                      </div>
                    </td>
                  </tr>

                  {/* ── Heading ─────────────────────────────────────────── */}
                  <tr>
                    <td style={{ paddingTop: "24px" }}>
                      <h1
                        style={{
                          color: INK,
                          fontSize: "23px",
                          fontWeight: 700,
                          lineHeight: "31px",
                          margin: 0,
                        }}
                      >
                        {CONFIRMATION_HEADING}
                      </h1>
                    </td>
                  </tr>

                  {CONFIRMATION_INTRO.map((paragraph, index) => (
                    <tr key={`intro-${index}`}>
                      <td style={{ paddingTop: index === 0 ? "16px" : "12px" }}>
                        <p
                          style={{
                            // #4b5563 on #ffffff is 7.6:1 — past WCAG AA for
                            // body text, which matters more than usual in an
                            // email a patient may read outdoors on a phone.
                            color: BODY,
                            fontSize: "16px",
                            lineHeight: "26px",
                            margin: 0,
                          }}
                        >
                          {paragraph}
                        </p>
                      </td>
                    </tr>
                  ))}

                  {/* ── The number ──────────────────────────────────────────
                      The most important element in the email. The failure the
                      confirmation exists to fix is a patient not recognising the
                      practice's number when it rings — 11 of 11 leads were called
                      and none answered — so the number gets its own panel, at
                      display size, above the fold.
                  */}
                  <tr>
                    <td style={{ paddingTop: "24px" }}>
                      <table
                        role="presentation"
                        width="100%"
                        cellPadding={0}
                        cellSpacing={0}
                        border={0}
                        style={{ borderCollapse: "collapse", width: "100%" }}
                      >
                        <tbody>
                          <tr>
                            <td
                              style={{
                                backgroundColor: WASH,
                                borderLeft: `4px solid ${BRAND}`,
                                borderRadius: "4px",
                                padding: "18px 20px",
                              }}
                            >
                              <p
                                style={{
                                  color: BODY,
                                  fontSize: "14px",
                                  fontWeight: 700,
                                  letterSpacing: "0.3px",
                                  lineHeight: "20px",
                                  margin: 0,
                                  textTransform: "uppercase",
                                }}
                              >
                                {EXPECT_CALL_LABEL}
                              </p>
                              <p style={{ margin: "8px 0 0 0" }}>
                                <a
                                  href={`tel:${SCHEDULING_PHONE_TEL}`}
                                  style={{
                                    color: BRAND,
                                    fontSize: "26px",
                                    fontWeight: 700,
                                    lineHeight: "32px",
                                    textDecoration: "none",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  {SCHEDULING_PHONE_DISPLAY}
                                </a>
                              </p>
                              <p
                                style={{
                                  color: BODY,
                                  fontSize: "15px",
                                  lineHeight: "22px",
                                  margin: "8px 0 0 0",
                                }}
                              >
                                {EXPECT_CALL_NOTE}
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>

                  {/* ── CTA ─────────────────────────────────────────────── */}
                  <tr>
                    <td style={{ paddingTop: "24px" }}>
                      <table
                        role="presentation"
                        cellPadding={0}
                        cellSpacing={0}
                        border={0}
                        style={{ borderCollapse: "collapse" }}
                      >
                        <tbody>
                          <tr>
                            <td
                              align="center"
                              style={{
                                backgroundColor: BRAND,
                                borderRadius: "6px",
                                padding: "15px 26px",
                              }}
                            >
                              {/* tel: only. No tracking redirector, no query string. */}
                              <a
                                href={`tel:${SCHEDULING_PHONE_TEL}`}
                                style={{
                                  color: "#ffffff",
                                  display: "inline-block",
                                  fontSize: "16px",
                                  fontWeight: 700,
                                  lineHeight: "20px",
                                  textDecoration: "none",
                                }}
                              >
                                {CONFIRMATION_CTA_LABEL}
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>

                  {CONFIRMATION_OUTRO.map((paragraph, index) => (
                    <tr key={`outro-${index}`}>
                      <td style={{ paddingTop: index === 0 ? "24px" : "12px" }}>
                        <p
                          style={{
                            color: BODY,
                            fontSize: "16px",
                            lineHeight: "26px",
                            margin: 0,
                          }}
                        >
                          {paragraph}
                        </p>
                      </td>
                    </tr>
                  ))}

                  {/* ── Signature ───────────────────────────────────────── */}
                  <tr>
                    <td style={{ paddingTop: "24px" }}>
                      <hr
                        style={{
                          border: 0,
                          borderTop: `1px solid ${RULE}`,
                          height: "1px",
                          margin: 0,
                        }}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td style={{ paddingBottom: "8px", paddingTop: "16px" }}>
                      <p style={{ color: BODY, fontSize: "14px", lineHeight: "22px", margin: 0 }}>
                        <strong style={{ color: INK }}>{PRACTICE_NAME}</strong>
                        <br />
                        <a
                          href={`tel:${SCHEDULING_PHONE_TEL}`}
                          style={{ color: BODY, textDecoration: "none" }}
                        >
                          {SCHEDULING_PHONE_DISPLAY}
                        </a>
                        <br />
                        <a href={SITE_URL} style={{ color: BRAND, textDecoration: "none" }}>
                          {SITE_LABEL}
                        </a>
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
