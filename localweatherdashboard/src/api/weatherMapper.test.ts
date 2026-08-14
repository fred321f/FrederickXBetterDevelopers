import { describe, it, expect } from 'vitest'
import { mapWmoCode, mapOpenMeteoResponse, type WeatherCondition } from './weatherMapper'
import type { OpenMeteoResponse } from './openMeteo'

describe('mapWmoCode', () => {
  const cases: [number, WeatherCondition][] = [ // Test cases for WMO code mapping, ensuring correct mapping on UI level.
    [0, 'clear'],
    [1, 'partly-cloudy'],
    [2, 'partly-cloudy'],
    [3, 'partly-cloudy'],
    [45, 'fog'],
    [48, 'fog'],
    [51, 'drizzle'],
    [53, 'drizzle'],
    [55, 'drizzle'],
    [56, 'drizzle'],
    [57, 'drizzle'],
    [61, 'rain'],
    [63, 'rain'],
    [65, 'rain'],
    [66, 'rain'],
    [67, 'rain'],
    [80, 'rain'],
    [81, 'rain'],
    [82, 'rain'],
    [71, 'snow'],
    [73, 'snow'],
    [75, 'snow'],
    [77, 'snow'],
    [85, 'snow'],
    [86, 'snow'],
    [95, 'thunderstorm'],
    [96, 'thunderstorm'],
    [99, 'thunderstorm'],
  ]

  it.each(cases)('maps WMO code %i to %s', (code, expected) => {
    expect(mapWmoCode(code)).toBe(expected)
  })

  it('falls back to "unknown" for an unrecognized code', () => {
    expect(mapWmoCode(-1)).toBe('unknown')
    expect(mapWmoCode(9999)).toBe('unknown')
  })
})

describe('mapOpenMeteoResponse', () => {
  function buildRaw(overrides?: Partial<OpenMeteoResponse>): OpenMeteoResponse {
    return {
      current: {
        temperature_2m: 18.4,
        relative_humidity_2m: 72,
        wind_speed_10m: 12.3,
        weather_code: 0,
      },
      daily: {
        time: ['2026-08-14', '2026-08-15'],
        weather_code: [0, 61],
        temperature_2m_max: [22, 19],
        temperature_2m_min: [14, 13],
      },
      ...overrides,
    }
  }

  it('maps current weather fields onto app-level shape', () => {
    const raw = buildRaw()
    const result = mapOpenMeteoResponse(raw)

    expect(result.current).toEqual({
      temperatureC: 18.4,
      humidityPercent: 72,
      windSpeedKph: 12.3,
      condition: 'clear',
    })
  })

  it('maps each daily forecast entry, preserving index alignment across parallel arrays', () => {
    const raw = buildRaw()
    const result = mapOpenMeteoResponse(raw)

    expect(result.forecast).toEqual([
      { date: '2026-08-14', condition: 'clear', highC: 22, lowC: 14 },
      { date: '2026-08-15', condition: 'rain', highC: 19, lowC: 13 },
    ])
  })

  it('returns an empty forecast array when daily.time is empty', () => {
    const raw = buildRaw({
      daily: { time: [], weather_code: [], temperature_2m_max: [], temperature_2m_min: [] },
    })

    expect(mapOpenMeteoResponse(raw).forecast).toEqual([])
  })

  it('maps a full 7-day forecast length correctly', () => {
    const raw = buildRaw({
      daily: {
        time: ['d1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7'],
        weather_code: [0, 1, 45, 51, 61, 71, 95],
        temperature_2m_max: [20, 21, 22, 23, 24, 25, 26],
        temperature_2m_min: [10, 11, 12, 13, 14, 15, 16],
      },
    })

    const result = mapOpenMeteoResponse(raw)
    expect(result.forecast).toHaveLength(7)
    expect(result.forecast.map((d) => d.condition)).toEqual([
      'clear', 'partly-cloudy', 'fog', 'drizzle', 'rain', 'snow', 'thunderstorm',
    ])
  })
})
