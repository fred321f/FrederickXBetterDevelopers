import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { render, screen } from "@testing-library/react"

import WeeklyForecast from "./WeeklyForecast"
import type { ForecastDay } from "@/api/weatherMapper"

const days: ForecastDay[] = [
  { date: "2026-08-15", condition: "clear", highC: 22, lowC: 14 },
  { date: "2026-08-13", condition: "rain", highC: 18, lowC: 11 },
  { date: "2026-08-14", condition: "cloudy", highC: 20, lowC: 12 },
]

describe("WeeklyForecast", () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2026, 7, 14)) // 2026-08-14
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("moves today's row to the front regardless of its position in the raw array", () => {
    render(<WeeklyForecast days={days} />)
    const dayLabels = screen.getAllByText(/^(Today|Sun|Mon|Tue|Wed|Thu|Fri|Sat)$/)
    expect(dayLabels[0]).toHaveTextContent("Today")
  })

  it("renders one row per forecast day", () => {
    render(<WeeklyForecast days={days} />)
    expect(screen.getAllByText(/°$/)).toHaveLength(days.length * 2)
  })
})
