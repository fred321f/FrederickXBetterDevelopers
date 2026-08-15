import { describe, expect, it, vi, beforeEach, afterEach } from "vitest"
import { renderHook, waitFor } from "@testing-library/react"

import { useWeather } from "./useWeather"

function buildFetchResponse(body: unknown, ok = true, status = 200) {
  return {
    ok,
    status,
    json: () => Promise.resolve(body),
  } as Response
}

const rawBody = {
  current: { temperature_2m: 18.4, relative_humidity_2m: 72, wind_speed_10m: 12.3, weather_code: 0 },
  daily: {
    time: ["2026-08-14"],
    weather_code: [0],
    temperature_2m_max: [22],
    temperature_2m_min: [14],
  },
}

describe("useWeather", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it("starts loading, then resolves with the mapped WeatherData", async () => {
    vi.mocked(fetch).mockResolvedValue(buildFetchResponse(rawBody))

    const { result } = renderHook(() => useWeather())

    expect(result.current.isLoading).toBe(true)

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(result.current.error).toBeNull()
    expect(result.current.data?.current).toEqual({
      temperatureC: 18.4,
      humidityPercent: 72,
      windSpeedKph: 12.3,
      condition: "clear",
    })
  })

  it("sets error and clears isLoading when the fetch fails", async () => {
    vi.mocked(fetch).mockResolvedValue(buildFetchResponse(null, false, 503))

    const { result } = renderHook(() => useWeather())

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(result.current.data).toBeUndefined()
    expect(result.current.error).toBeInstanceOf(Error)
    expect(result.current.error?.message).toContain("503")
  })

  it("re-runs the fetch when refetch is called", async () => {
    vi.mocked(fetch).mockResolvedValue(buildFetchResponse(rawBody))

    const { result } = renderHook(() => useWeather())
    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(fetch).toHaveBeenCalledTimes(1)

    result.current.refetch()

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2))
  })
})
