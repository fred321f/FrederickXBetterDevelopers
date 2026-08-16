import { useCallback, useEffect, useState } from "react"
import { fetchOpenMeteo } from "../api/openMeteo"
import { mockWeatherData } from "../api/mockWeatherData"
import { mapOpenMeteoResponse, type WeatherData } from "../api/weatherMapper"

interface UseWeatherResult {
  data: WeatherData | undefined
  isLoading: boolean
  isFallback: boolean
  refetch: () => void
}

/**
 * Fetches and maps the current weather + 7-day forecast for Aarhus.
 * A single non-paginated fetch for one fixed location doesn't need a
 * caching/dedup library, so this is a plain useState/useEffect hook rather
 * than something like TanStack Query.
 *
 * On a fetch/mapping failure, falls back to a static mock `WeatherData`
 * fixture instead of surfacing an error, so the dashboard keeps rendering
 * rather than dead-ending on a blank error screen.
 * @return `data`, `isLoading`, `isFallback` (true when `data` is the mock
 *   fixture rather than a live fetch), and a `refetch` callback that re-runs
 *   the fetch on demand.
 */
export function useWeather(): UseWeatherResult {
  const [data, setData] = useState<WeatherData>()
  const [isLoading, setIsLoading] = useState(true)
  const [isFallback, setIsFallback] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    setIsLoading(true)

    fetchOpenMeteo(controller.signal)
      .then(mapOpenMeteoResponse)
      .then((result) => {
        setData(result)
        setIsFallback(false)
        setIsLoading(false)
      })
      .catch((err) => {
        if (controller.signal.aborted) return // unmount/retry cleanup, not a real failure
        console.error("useWeather: falling back to mock data after fetch/mapping failure", err)
        setData(mockWeatherData)
        setIsFallback(true)
        setIsLoading(false)
      })

    return () => controller.abort()
  }, [retryCount])

  const refetch = useCallback(() => setRetryCount((c) => c + 1), [])

  return { data, isLoading, isFallback, refetch }
}
