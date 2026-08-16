import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"

import ForecastDayRow from "./ForecastDayRow"
import type { ForecastDay } from "@/api/weatherMapper"

const day: ForecastDay = { date: "2026-08-15", condition: "rain", highC: 19, lowC: 13 }

describe("ForecastDayRow", () => {
  it("renders the weekday label, condition text, high, and low when not today", () => {
    render(<ForecastDayRow day={day} isToday={false} />)
    expect(screen.getByText("Sat")).toBeInTheDocument()
    expect(screen.getByText("Rain")).toBeInTheDocument()
    expect(screen.getByText("19°")).toBeInTheDocument()
    expect(screen.getByText("13°")).toBeInTheDocument()
  })

  it('shows "Today" instead of the weekday when isToday is true', () => {
    render(<ForecastDayRow day={day} isToday={true} />)
    expect(screen.getByText("Today")).toBeInTheDocument()
    expect(screen.queryByText("Sat")).not.toBeInTheDocument()
  })

  it("applies the primary accent background only when isToday is true", () => {
    const { container: todayContainer } = render(<ForecastDayRow day={day} isToday={true} />)
    const { container: otherContainer } = render(<ForecastDayRow day={day} isToday={false} />)
    expect(todayContainer.querySelector('[data-slot="forecast-day-row"]')).toHaveClass("bg-primary/10")
    expect(otherContainer.querySelector('[data-slot="forecast-day-row"]')).not.toHaveClass("bg-primary/10")
  })
})
