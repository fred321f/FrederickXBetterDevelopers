import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"

import TodayForecastStrip from "./TodayForecastStrip"
import type { HourlyForecast } from "@/api/weatherMapper"

const hours: HourlyForecast[] = [
  { time: "2026-08-16T06:00", condition: "cloudy", temperatureC: 14.6 },
  { time: "2026-08-16T09:00", condition: "partly-cloudy", temperatureC: 17.8 },
  { time: "2026-08-16T12:00", condition: "clear", temperatureC: 20.3 },
]

describe("TodayForecastStrip", () => {
  it("renders one item per hourly entry with formatted time and temperature", () => {
    render(<TodayForecastStrip hours={hours} />)
    expect(screen.getByText("6:00 AM")).toBeInTheDocument()
    expect(screen.getByText("15°")).toBeInTheDocument()
    expect(screen.getByText("9:00 AM")).toBeInTheDocument()
    expect(screen.getByText("18°")).toBeInTheDocument()
    expect(screen.getByText("12:00 PM")).toBeInTheDocument()
    expect(screen.getByText("20°")).toBeInTheDocument()
  })

  it("renders exactly as many items as hours provided", () => {
    render(<TodayForecastStrip hours={hours} />)
    expect(screen.getAllByText(/°$/)).toHaveLength(hours.length)
  })
})
