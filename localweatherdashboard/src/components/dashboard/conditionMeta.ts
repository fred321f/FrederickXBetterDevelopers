import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  Sun,
  type LucideIcon,
} from "lucide-react"

import type { WeatherCondition } from "@/api/weatherMapper"

export interface ConditionMeta {
  icon: LucideIcon
  label: string
  /** Tailwind color class for the icon — one of the --condition-* tokens, or muted-foreground for neutral conditions. */
  colorVar: string
}

const CONDITION_META: Record<WeatherCondition, ConditionMeta> = {
  clear: { icon: Sun, label: "Clear", colorVar: "text-condition-clear" },
  "partly-cloudy": { icon: CloudSun, label: "Partly cloudy", colorVar: "text-muted-foreground" },
  cloudy: { icon: Cloud, label: "Cloudy", colorVar: "text-muted-foreground" },
  fog: { icon: CloudFog, label: "Fog", colorVar: "text-muted-foreground" },
  drizzle: { icon: CloudDrizzle, label: "Drizzle", colorVar: "text-condition-rain" },
  rain: { icon: CloudRain, label: "Rain", colorVar: "text-condition-rain" },
  snow: { icon: CloudSnow, label: "Snow", colorVar: "text-condition-snow" },
  thunderstorm: { icon: CloudLightning, label: "Thunderstorm", colorVar: "text-condition-storm" },
  unknown: { icon: Cloud, label: "Unknown", colorVar: "text-muted-foreground" },
}

/**
 * Single source of truth mapping a `WeatherCondition` to its display icon,
 * label, and accent color. Both `CurrentWeather` and `ForecastDayCard`
 * import this rather than duplicating the condition -> icon/color logic.
 * @param condition The app-level weather condition.
 * @return The icon component, display label, and Tailwind color class to use.
 */
export function conditionMeta(condition: WeatherCondition): ConditionMeta {
  return CONDITION_META[condition]
}
