"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { DATE_OF_BIRTH_LABEL, DATE_OF_BIRTH_MIN, todayIsoDate } from "@/lib/date-of-birth"

/**
 * The intake date of birth question, as a NATIVE date input (2026-10-17).
 *
 * `type="date"` so iPhone and Android show their own date picker, and the value
 * is always YYYY-MM-DD whatever the phone's display format. Validation lives in
 * lib/date-of-birth.ts, shared with the server.
 *
 * Same two details as components/InsuranceSelect.tsx:
 *
 * - No `name` attribute. If a patient taps submit before the page has loaded,
 *   the browser falls back to a plain GET that writes every NAMED field into the
 *   address bar. Unnamed, the date of birth stays out of any URL (item 12).
 * - Font size 16px or more (the forms pass text-lg / text-base), so iOS Safari
 *   does not zoom the page on focus.
 *
 * Required-ness is enforced by each form's validation, not the native `required`
 * bubble, to match the other fields.
 */
export type DateOfBirthInputProps = Omit<
  React.ComponentPropsWithoutRef<"input">,
  "name" | "type" | "value" | "onChange"
> & {
  value: string
  onChange: (value: string) => void
}

export const DateOfBirthInput = React.forwardRef<HTMLInputElement, DateOfBirthInputProps>(
  function DateOfBirthInput({ value, onChange, className, ...props }, ref) {
    return (
      <input
        ref={ref}
        type="date"
        autoComplete="bday"
        aria-required="true"
        aria-label={DATE_OF_BIRTH_LABEL}
        data-date-of-birth-input=""
        min={DATE_OF_BIRTH_MIN}
        max={todayIsoDate()}
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        className={cn(
          "w-full rounded-sm border text-base outline-none",
          // The browser's calendar icon is faint grey by default; draw it solid black.
          "[&::-webkit-calendar-picker-indicator]:opacity-100 [&::-webkit-calendar-picker-indicator]:[filter:brightness(0)] [&::-webkit-calendar-picker-indicator]:cursor-pointer",
          value ? "text-[#111315]" : "text-[#838890]",
          className,
        )}
        {...props}
      />
    )
  },
)
