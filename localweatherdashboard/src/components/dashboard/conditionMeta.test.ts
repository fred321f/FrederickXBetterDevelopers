import { describe, expect, it } from "vitest"

import { conditionMeta } from "./conditionMeta"
import type { WeatherCondition } from "@/api/weatherMapper"

describe("conditionMeta", () => {
  const cases: [WeatherCondition, string, string][] = [
    ["clear", "Clear", "text-condition-clear"],
    ["partly-cloudy", "Partly cloudy", "text-muted-foreground"],
    ["cloudy", "Cloudy", "text-muted-foreground"],
    ["fog", "Fog", "text-muted-foreground"],
    ["drizzle", "Drizzle", "text-condition-rain"],
    ["rain", "Rain", "text-condition-rain"],
    ["snow", "Snow", "text-condition-snow"],
    ["thunderstorm", "Thunderstorm", "text-condition-storm"],
    ["unknown", "Unknown", "text-muted-foreground"],
  ]

  it.each(cases)("maps %s to label %s and color %s", (condition, label, colorVar) => {
    const meta = conditionMeta(condition)
    expect(meta.label).toBe(label)
    expect(meta.colorVar).toBe(colorVar)
    expect(meta.icon).toBeDefined()
  })
})
