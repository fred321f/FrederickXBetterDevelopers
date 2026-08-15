import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"

import CurrentWeather from "./CurrentWeather"
import type { CurrentWeather as CurrentWeatherData } from "@/api/weatherMapper"

const data: CurrentWeatherData = {
  temperatureC: 18.6,
  humidityPercent: 72,
  windSpeedKph: 12.3,
  condition: "rain",
}

describe("CurrentWeather", () => {
  it("renders the rounded temperature, condition label, and stats", () => {
    render(<CurrentWeather data={data} />)

    expect(screen.getByText("19°")).toBeInTheDocument()
    expect(screen.getByText("Rain")).toBeInTheDocument()
    expect(screen.getByText("12 km/h")).toBeInTheDocument()
    expect(screen.getByText("72%")).toBeInTheDocument()
  })

  it("does not render an insight paragraph when insight is null", () => {
    const { container } = render(<CurrentWeather data={data} insight={null} />)

    expect(container.querySelector('[data-slot="insight"]')).not.toBeInTheDocument()
  })

  it("renders the insight text when provided", () => {
    render(<CurrentWeather data={data} insight="Bring an umbrella today." />)

    expect(screen.getByText("Bring an umbrella today.")).toBeInTheDocument()
  })
})
