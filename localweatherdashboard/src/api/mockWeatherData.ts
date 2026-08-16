import type { WeatherData } from "./weatherMapper"

/**
 * Static fixture shown when the live Open-Meteo fetch fails, so the dashboard still
 * renders a fully-populated layout instead of a dead-end error screen. Values are
 * plausible but not live data — see `useWeather`'s fallback path and `FallbackBanner`.
 */
export const mockWeatherData: WeatherData = {
  current: {
    temperatureC: 19,
    humidityPercent: 65,
    windSpeedKph: 14,
    condition: "partly-cloudy",
    feelsLikeC: 18,
    chanceOfRainPercent: 20,
    uvIndex: 3,
  },
  forecast: [
    { date: "2026-08-16", condition: "partly-cloudy", highC: 20, lowC: 13 },
    { date: "2026-08-17", condition: "cloudy", highC: 18, lowC: 12 },
    { date: "2026-08-18", condition: "rain", highC: 16, lowC: 11 },
    { date: "2026-08-19", condition: "drizzle", highC: 17, lowC: 12 },
    { date: "2026-08-20", condition: "clear", highC: 21, lowC: 13 },
    { date: "2026-08-21", condition: "clear", highC: 22, lowC: 14 },
    { date: "2026-08-22", condition: "partly-cloudy", highC: 19, lowC: 13 },
  ],
  hourly: [
    { time: "2026-08-16T12:00", condition: "partly-cloudy", temperatureC: 19 },
    { time: "2026-08-16T13:00", condition: "partly-cloudy", temperatureC: 20 },
    { time: "2026-08-16T14:00", condition: "cloudy", temperatureC: 20 },
    { time: "2026-08-16T15:00", condition: "cloudy", temperatureC: 19 },
    { time: "2026-08-16T16:00", condition: "rain", temperatureC: 17 },
    { time: "2026-08-16T17:00", condition: "rain", temperatureC: 16 },
    { time: "2026-08-16T18:00", condition: "drizzle", temperatureC: 16 },
    { time: "2026-08-16T19:00", condition: "cloudy", temperatureC: 15 },
  ],
  insight: null,
}
