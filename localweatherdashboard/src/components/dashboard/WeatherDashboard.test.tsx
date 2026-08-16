import { describe, expect, it, vi, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import WeatherDashboard from "./WeatherDashboard"
import { useWeather } from "@/hooks/useWeather"
import type { WeatherData } from "@/api/weatherMapper"

vi.mock("@/hooks/useWeather", () => ({
  useWeather: vi.fn(),
}))

const mockUseWeather = vi.mocked(useWeather)

const sampleData: WeatherData = {
  current: {
    temperatureC: 20,
    humidityPercent: 60,
    windSpeedKph: 10,
    condition: "clear",
    feelsLikeC: 19,
    chanceOfRainPercent: 10,
    uvIndex: 4,
  },
  forecast: [],
  hourly: [],
  insight: null,
}

function mockResult(overrides: Partial<ReturnType<typeof useWeather>>) {
  mockUseWeather.mockReturnValue({
    data: undefined,
    isLoading: false,
    isFallback: false,
    refetch: vi.fn(),
    ...overrides,
  } as ReturnType<typeof useWeather>)
}

describe("WeatherDashboard", () => {
  beforeEach(() => {
    mockUseWeather.mockReset()
  })

  it("renders LoadingState while loading", () => {
    mockResult({ isLoading: true })

    render(<WeatherDashboard />)

    expect(screen.getByRole("status")).toBeInTheDocument()
  })

  it("renders EmptyState when the query succeeds with no data", () => {
    mockResult({})

    render(<WeatherDashboard />)

    expect(screen.getByText(/no weather data available/i)).toBeInTheDocument()
  })

  it("renders DashContent when data is present", () => {
    mockResult({ data: sampleData })

    render(<WeatherDashboard />)

    expect(screen.getByText("20°")).toBeInTheDocument()
  })

  it("renders FallbackBanner above DashContent when isFallback is true, and retry calls refetch", async () => {
    const refetch = vi.fn()
    mockResult({ data: sampleData, isFallback: true, refetch })
    const user = userEvent.setup()

    render(<WeatherDashboard />)

    expect(screen.getByRole("alert")).toHaveTextContent(/sample data/i)
    expect(screen.getByText("20°")).toBeInTheDocument()
    await user.click(screen.getByRole("button", { name: /retry/i }))
    expect(refetch).toHaveBeenCalledTimes(1)
  })
})
