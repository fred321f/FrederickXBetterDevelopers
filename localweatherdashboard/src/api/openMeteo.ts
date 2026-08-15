import { FETCH_TIMEOUT_MS } from "../lib/constants"

export interface OpenMeteoResponse { // The response body from the Open-Meteo API
  current: { // Body of the current weather data
    temperature_2m: number
    relative_humidity_2m: number
    wind_speed_10m: number
    weather_code: number
  }
  daily: { // Body of the daily forecast data
    time: string[]
    weather_code: number[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
  }
}

/**
 * @param signal Optional external abort signal (e.g. from a data-fetching library's queryFn) —
 *   combined with this function's own timeout, so either can cancel the request.
 * @param timeoutMs Request timeout in milliseconds; defaults to {@link FETCH_TIMEOUT_MS}.
 *   Overridable so tests don't have to wait out the real default.
 * @return The raw Open-Meteo response for Aarhus.
 */
export async function fetchOpenMeteo(
  signal?: AbortSignal,
  timeoutMs: number = FETCH_TIMEOUT_MS,
): Promise<OpenMeteoResponse> {
  const url = new URL('https://api.open-meteo.com/v1/forecast')
  url.searchParams.set('latitude', '56.15') // We want weather data for the city of Aarhus, Denmark, which is located at 56.15 degrees N, 10.21 degrees E.
  url.searchParams.set('longitude', '10.21')
  url.searchParams.set('current', 'temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code')
  url.searchParams.set('daily', 'weather_code,temperature_2m_max,temperature_2m_min')
  url.searchParams.set('timezone', 'auto')
  url.searchParams.set('forecast_days', '7')

  const timeoutSignal = AbortSignal.timeout(timeoutMs)
  const combinedSignal = signal ? AbortSignal.any([signal, timeoutSignal]) : timeoutSignal

  const res = await fetch(url, { signal: combinedSignal })
  if (!res.ok) throw new Error(`Open-Meteo request failed: ${res.status}`) // API Error handling.

  try {
    return await res.json()
  } catch {
    throw new Error('Failed to parse Open-Meteo response') // Malformed/non-JSON body.
  }
}