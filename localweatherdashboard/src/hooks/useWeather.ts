import { useQuery } from "@tanstack/react-query"
import { fetchOpenMeteo } from "../api/openMeteo"
import { mapOpenMeteoResponse, type WeatherData } from "../api/weatherMapper"

/** Query key for the Aarhus weather query — reused by any future invalidate/prefetch call. */
export const WEATHER_QUERY_KEY = ["weather", "aarhus"] as const

/**
 * Fetches and maps the current weather + 7-day forecast for Aarhus.
 * @return A TanStack Query result (`data`, `isLoading`, `isError`, `error`, `refetch`, ...)
 *   for consuming components to read directly.
 */
export function useWeather() {
  return useQuery<WeatherData>({
    queryKey: WEATHER_QUERY_KEY,
    queryFn: ({ signal }) => fetchOpenMeteo(signal).then(mapOpenMeteoResponse),
  })
}
