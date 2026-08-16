import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"

import ForecastDayCard from "./ForecastDayCard"
import type { ForecastDay } from "@/api/weatherMapper"

const day: ForecastDay = { date: "2026-08-15", condition: "rain", highC: 19, lowC: 13 }

describe("ForecastDayCard", () => {
  it("renders the weekday label, high, and low when not today", () => {
    render(<ForecastDayCard day={day} isToday={false} />)

    expect(screen.getByText("Sat")).toBeInTheDocument()
    expect(screen.getByText("19°")).toBeInTheDocument()
    expect(screen.getByText("13°")).toBeInTheDocument()
  })

  it('shows "Today" instead of the weekday when isToday is true', () => {
    render(<ForecastDayCard day={day} isToday={true} />)

    expect(screen.getByText("Today")).toBeInTheDocument()
    expect(screen.queryByText("Sat")).not.toBeInTheDocument()
  })

  it("applies the primary accent treatment only when isToday is true", () => {
    const { container: todayContainer } = render(<ForecastDayCard day={day} isToday={true} />)
    const { container: otherContainer } = render(<ForecastDayCard day={day} isToday={false} />)

    expect(todayContainer.querySelector('[data-slot="card"]')).toHaveClass("border-primary")
    expect(otherContainer.querySelector('[data-slot="card"]')).not.toHaveClass("border-primary")
  })
})
