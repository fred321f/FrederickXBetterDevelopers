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

export async function fetchOpenMeteo(signal?: AbortSignal): Promise<OpenMeteoResponse> {
  const url = new URL('https://api.open-meteo.com/v1/forecast')
  url.searchParams.set('latitude', '56.15') // We want weather data for the city of Aarhus, Denmark, which is located at 56.15 degrees N, 10.21 degrees E.
  url.searchParams.set('longitude', '10.21')
  url.searchParams.set('current', 'temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code')
  url.searchParams.set('daily', 'weather_code,temperature_2m_max,temperature_2m_min')
  url.searchParams.set('timezone', 'auto')
  url.searchParams.set('forecast_days', '7')

  const res = await fetch(url, { signal })
  if (!res.ok) throw new Error(`Open-Meteo request failed: ${res.status}`) // API Error handling.
  return res.json()
}