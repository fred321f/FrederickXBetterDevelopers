import { useCallback, useEffect, useState } from "react"
import { fetchOpenMeteo } from "../api/openMeteo"
import { mapOpenMeteoResponse, type WeatherData } from "../api/weatherMapper"

interface UseWeatherResult {
  data: WeatherData | undefined
  isLoading: boolean
  error: Error | null
  refetch: () => void
}

/**
 * Fetches and maps the current weather + 7-day forecast for Aarhus.
 * A single non-paginated fetch for one fixed location doesn't need a
 * caching/dedup library, so this is a plain useState/useEffect hook rather
 * than something like TanStack Query.
 * @return `data`, `isLoading`, `error`, and a `refetch` callback that
 *   re-runs the fetch on demand.
 */
export function useWeather(): UseWeatherResult {
  const [data, setData] = useState<WeatherData>()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    setIsLoading(true)
    setError(null)

    fetchOpenMeteo(controller.signal)
      .then(mapOpenMeteoResponse)
      .then((result) => {
        setData(result)
        setIsLoading(false)
      })
      .catch((err) => {
        if (controller.signal.aborted) return // unmount/retry cleanup, not a real failure
        setError(err instanceof Error ? err : new Error("Unknown error"))
        setIsLoading(false)
      })

    return () => controller.abort()
  }, [retryCount])

  const refetch = useCallback(() => setRetryCount((c) => c + 1), [])

  return { data, isLoading, error, refetch }
}
