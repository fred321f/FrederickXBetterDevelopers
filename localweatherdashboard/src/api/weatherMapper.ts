import type { OpenMeteoResponse } from "./openMeteo"

export type WeatherCondition =
  | 'clear' | 'partly-cloudy' | 'cloudy' | 'fog'
  | 'drizzle' | 'rain' | 'snow' | 'thunderstorm' | 'unknown'

export interface CurrentWeather {
  temperatureC: number
  humidityPercent: number
  windSpeedKph: number
  condition: WeatherCondition
}

export interface ForecastDay {
  date: string
  condition: WeatherCondition
  highC: number
  lowC: number
}

export interface WeatherData {
  current: CurrentWeather
  forecast: ForecastDay[]
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

export function mapOpenMeteoResponse(raw: OpenMeteoResponse): WeatherData {
  return {
    current: {
      temperatureC: raw.current.temperature_2m,
      humidityPercent: raw.current.relative_humidity_2m,
      windSpeedKph: raw.current.wind_speed_10m,
      condition: mapWmoCode(raw.current.weather_code),
    },
    forecast: raw.daily.time.map((date: string, i: number) => ({
      date,
      condition: mapWmoCode(raw.daily.weather_code[i]),
      highC: raw.daily.temperature_2m_max[i],
      lowC: raw.daily.temperature_2m_min[i],
    })),
    insight: null,
  }
}