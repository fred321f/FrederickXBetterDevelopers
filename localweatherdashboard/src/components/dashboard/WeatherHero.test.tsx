import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"

import WeatherHero from "./WeatherHero"
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

describe("WeatherHero", () => {
  it("renders the static Aarhus label, rounded temperature, chance of rain, and stats", () => {
    render(<WeatherHero data={data} />)
    expect(screen.getByText("Aarhus")).toBeInTheDocument()
    expect(screen.getByText("19°")).toBeInTheDocument()
    expect(screen.getByText("Chance of rain: 60%")).toBeInTheDocument()
    expect(screen.getByText("12 km/h")).toBeInTheDocument()
    expect(screen.getByText("72%")).toBeInTheDocument()
  })
})
