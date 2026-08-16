import { HOURLY_FORECAST_COUNT } from "../lib/constants"
import type { OpenMeteoResponse } from "./openMeteo"

export type WeatherCondition =
  | 'clear' | 'partly-cloudy' | 'cloudy' | 'fog'
  | 'drizzle' | 'rain' | 'snow' | 'thunderstorm' | 'unknown'

export interface CurrentWeather {
  temperatureC: number
  humidityPercent: number
  windSpeedKph: number
  condition: WeatherCondition
  feelsLikeC: number
  chanceOfRainPercent: number
  uvIndex: number
}

export interface ForecastDay {
  date: string
  condition: WeatherCondition
  highC: number
  lowC: number
}

export interface HourlyForecast {
  time: string
  condition: WeatherCondition
  temperatureC: number
}

export interface WeatherData {
  current: CurrentWeather
  forecast: ForecastDay[]
  hourly: HourlyForecast[]
  /** Reserved for a future LLM-generated weather summary. Always `null` today. */
  insight: string | null
}

/**
 * @param code WMO weather code as returned by Open-Meteo.
 * @return The mapped app-level condition readable by users, or 'unknown' for an unrecognized code.
 */
export function mapWmoCode(code: number): WeatherCondition {
  if (code === 0) return 'clear'
  if ([1, 2, 3].includes(code)) return 'partly-cloudy'
  if ([45, 48].includes(code)) return 'fog'
  if ([51, 53, 55, 56, 57].includes(code)) return 'drizzle'
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return 'rain'
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'snow'
  if ([95, 96, 99].includes(code)) return 'thunderstorm'
  return 'unknown'
}

/**
 * Slices the next upcoming hourly entries out of Open-Meteo's full-week hourly arrays.
 * @param hourly Raw hourly time/temperature/weather-code arrays covering the full requested
 *   period (e.g. 168 entries for a 7-day forecast) — not just what's ahead.
 * @param currentTime The current-hour timestamp to start from (Open-Meteo's `current.time`,
 *   on the same hourly grid as `hourly.time`).
 * @return Up to {@link HOURLY_FORECAST_COUNT} entries starting at the matched current hour.
 *   Falls back to the first {@link HOURLY_FORECAST_COUNT} entries if `currentTime` isn't found,
 *   rather than throwing.
 */
export function sliceUpcomingHours(
  hourly: OpenMeteoResponse['hourly'],
  currentTime: string,
): HourlyForecast[] {
  const matchedIndex = hourly.time.indexOf(currentTime)
  const start = matchedIndex === -1 ? 0 : matchedIndex

  return hourly.time.slice(start, start + HOURLY_FORECAST_COUNT).map((time, i) => ({
    time,
    condition: mapWmoCode(hourly.weather_code[start + i]),
    temperatureC: hourly.temperature_2m[start + i],
  }))
}

export function mapOpenMeteoResponse(raw: OpenMeteoResponse): WeatherData {
  return {
    current: {
      temperatureC: raw.current.temperature_2m,
      humidityPercent: raw.current.relative_humidity_2m,
      windSpeedKph: raw.current.wind_speed_10m,
      condition: mapWmoCode(raw.current.weather_code),
      feelsLikeC: raw.current.apparent_temperature,
      chanceOfRainPercent: raw.daily.precipitation_probability_max[0],
      uvIndex: raw.daily.uv_index_max[0],
    },
    forecast: raw.daily.time.map((date: string, i: number) => ({
      date,
      condition: mapWmoCode(raw.daily.weather_code[i]),
      highC: raw.daily.temperature_2m_max[i],
      lowC: raw.daily.temperature_2m_min[i],
    })),
    hourly: sliceUpcomingHours(raw.hourly, raw.current.time),
    insight: null,
  }
}