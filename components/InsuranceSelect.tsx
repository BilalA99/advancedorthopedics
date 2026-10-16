"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { getInsuranceOptions, INSURANCE_PLACEHOLDER } from "@/lib/insurance-routing"

/**
 * The intake insurance question, as a NATIVE <select> (Abubeckr, 2026-10-14, item 9).
 *
 * A real <select> rather than a custom listbox, so iPhone and Android show their
 * own picker wheel, which is faster and more reliable to use on a phone than a
 * scrolling popover. Options come from lib/insurance-routing.ts, the one list the
 * server also classifies against.
 *
 * Required-ness is enforced by each form's zod schema ("Please select your
 * insurance") and again on the server, which fails closed, so the select does not
 * also carry the native `required` attribute and its browser bubble.
 *
 * Two deliberate details:
 *
 * - No `name` attribute. These forms submit through JavaScript. If a patient taps
 *   submit before the page has finished loading, the browser falls back to a plain
 *   GET of the form, which writes every NAMED field into the address bar. Leaving
 *   the select unnamed keeps the insurance answer out of any URL even then
 *   (item 12). react-hook-form tracks the value through `value`/`onChange`, so it
 *   does not need the name.
 * - Font size 16px or more (the forms pass text-lg / text-base). Below 16px iOS
 *   Safari zooms the page when the field is focused.
 */
export type InsuranceSelectProps = Omit<
  React.ComponentPropsWithoutRef<"select">,
  "name" | "children" | "value" | "onChange"
> & {
  value: string
  onChange: (value: string) => void
}

export const InsuranceSelect = React.forwardRef<HTMLSelectElement, InsuranceSelectProps>(
  function InsuranceSelect({ value, onChange, className, ...props }, ref) {
    return (
      <select
        ref={ref}
        aria-required="true"
        aria-label={INSURANCE_PLACEHOLDER}
        data-insurance-select=""
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        className={cn(
          "w-full rounded-sm border text-base outline-none",
          value ? "text-[#111315]" : "text-[#838890]",
          className,
        )}
        {...props}
      >
        <option value="" disabled>
          {INSURANCE_PLACEHOLDER}
        </option>
        {getInsuranceOptions().map(({ value: optionValue, label }) => (
          <option key={optionValue} value={optionValue}>
            {label}
          </option>
        ))}
      </select>
    )
  },
)
