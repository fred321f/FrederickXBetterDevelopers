import clearDay from "@meteocons/svg/flat/clear-day.svg"
import partlyCloudyDay from "@meteocons/svg/flat/partly-cloudy-day.svg"
import cloudy from "@meteocons/svg/flat/cloudy.svg"
import fogDay from "@meteocons/svg/flat/fog-day.svg"
import drizzle from "@meteocons/svg/flat/drizzle.svg"
import rain from "@meteocons/svg/flat/rain.svg"
import snow from "@meteocons/svg/flat/snow.svg"
import thunderstormsDay from "@meteocons/svg/flat/thunderstorms-day.svg"
import notAvailable from "@meteocons/svg/flat/not-available.svg"

import type { WeatherCondition } from "@/api/weatherMapper"

export interface ConditionMeta {
  /** Imported Meteocons SVG source — render via `<img src={icon} />`, not as a component. */
  icon: string
  label: string
  /**
   * Tailwind text-color utility class for this condition, one of the --condition-*
   * tokens or muted-foreground for neutral conditions. Meteocons icons are fully
   * illustrated with their own baked-in colors, so this no longer tints the icon —
   * it's used as a small accent instead: the condition label's text color in
   * CurrentWeather, and (via `bg-current`) the accent dot in ForecastDayCard.
   */
  colorVar: string
}

// Static imports, not the dynamic per-slug import pattern from Meteocons' docs — our condition
// set is a fixed 9-value union, not a genuinely dynamic runtime string, so the dynamic pattern
// would only add an unnecessary loading-flicker state for something that should just render.
const CONDITION_META: Record<WeatherCondition, ConditionMeta> = {
  clear: { icon: clearDay, label: "Clear", colorVar: "text-condition-clear" },
  "partly-cloudy": { icon: partlyCloudyDay, label: "Partly cloudy", colorVar: "text-muted-foreground" },
  cloudy: { icon: cloudy, label: "Cloudy", colorVar: "text-muted-foreground" },
  fog: { icon: fogDay, label: "Fog", colorVar: "text-muted-foreground" },
  drizzle: { icon: drizzle, label: "Drizzle", colorVar: "text-condition-rain" },
  rain: { icon: rain, label: "Rain", colorVar: "text-condition-rain" },
  snow: { icon: snow, label: "Snow", colorVar: "text-condition-snow" },
  thunderstorm: { icon: thunderstormsDay, label: "Thunderstorm", colorVar: "text-condition-storm" },
  unknown: { icon: notAvailable, label: "Unknown", colorVar: "text-muted-foreground" },
}

/**
 * Single source of truth mapping a `WeatherCondition` to its display icon,
 * label, and accent color. Both `CurrentWeather` and `ForecastDayCard`
 * import this rather than duplicating the condition -> icon/color logic.
 * @param condition The app-level weather condition.
 * @return The icon source, display label, and Tailwind color class to use.
 */
export function conditionMeta(condition: WeatherCondition): ConditionMeta {
  return CONDITION_META[condition]
}
