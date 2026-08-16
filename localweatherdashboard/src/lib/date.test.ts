import { describe, expect, it } from "vitest"

import { formatHour, formatWeekday, toLocalDateString } from "./date"

describe("toLocalDateString", () => {
  it("formats a date as local YYYY-MM-DD", () => {
    expect(toLocalDateString(new Date(2026, 7, 15))).toBe("2026-08-15")
  })

  it("pads single-digit months and days", () => {
    expect(toLocalDateString(new Date(2026, 0, 5))).toBe("2026-01-05")
  })
})

describe("formatWeekday", () => {
  it("returns a short weekday label for a YYYY-MM-DD string", () => {
    // 2026-08-15 is a Saturday
    expect(formatWeekday("2026-08-15")).toBe("Sat")
  })

  it("does not shift the date near a UTC day boundary", () => {
    // Regression guard: new Date('2026-01-01') would parse as UTC midnight,
    // which renders as Dec 31 in any timezone behind UTC.
    expect(formatWeekday("2026-01-01")).toBe("Thu")
  })
})

describe("formatHour", () => {
  it("formats a local hourly timestamp as a 12-hour clock label", () => {
    expect(formatHour("2026-08-16T06:00")).toBe("6:00 AM")
  })

  it("formats afternoon hours with PM", () => {
    expect(formatHour("2026-08-16T15:00")).toBe("3:00 PM")
  })
})
