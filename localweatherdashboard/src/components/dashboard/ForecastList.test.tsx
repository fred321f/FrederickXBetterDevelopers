import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { render, screen } from "@testing-library/react"

import ForecastList from "./ForecastList"
import type { ForecastDay } from "@/api/weatherMapper"

const days: ForecastDay[] = [
  { date: "2026-08-15", condition: "clear", highC: 22, lowC: 14 },
  { date: "2026-08-13", condition: "rain", highC: 18, lowC: 11 },
  { date: "2026-08-14", condition: "cloudy", highC: 20, lowC: 12 },
]

describe("ForecastList", () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2026, 7, 14)) // 2026-08-14
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("moves today's card to the front regardless of its position in the raw array", () => {
    render(<ForecastList days={days} />)

    const todayLabels = screen.getAllByText(/^(Today|Sun|Mon|Tue|Wed|Thu|Fri|Sat)$/)
    expect(todayLabels[0]).toHaveTextContent("Today")
  })

  it("renders one card per forecast day", () => {
    render(<ForecastList days={days} />)

    expect(screen.getAllByText(/°$/)).toHaveLength(days.length * 2) // high + low per day
  })
})
