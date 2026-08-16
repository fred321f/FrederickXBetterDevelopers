import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"

import AirConditions from "./AirConditions"
import type { CurrentWeather } from "@/api/weatherMapper"

const data: CurrentWeather = {
  temperatureC: 18.6,
  humidityPercent: 72,
  windSpeedKph: 12.3,
  condition: "rain",
  feelsLikeC: 17.2,
  chanceOfRainPercent: 60,
  uvIndex: 3,
}

describe("AirConditions", () => {
  it("renders all four stats in a 2x2 grid", () => {
    render(<AirConditions data={data} />)
    expect(screen.getByText("Real Feel")).toBeInTheDocument()
    expect(screen.getByText("17°")).toBeInTheDocument()
    expect(screen.getByText("Wind")).toBeInTheDocument()
    expect(screen.getByText("12 km/h")).toBeInTheDocument()
    expect(screen.getByText("Chance of rain")).toBeInTheDocument()
    expect(screen.getByText("60%")).toBeInTheDocument()
    expect(screen.getByText("UV Index")).toBeInTheDocument()
    expect(screen.getByText("3")).toBeInTheDocument()
  })

  it("does not render a See more button", () => {
    render(<AirConditions data={data} />)
    expect(screen.queryByRole("button", { name: /see more/i })).not.toBeInTheDocument()
  })
})
