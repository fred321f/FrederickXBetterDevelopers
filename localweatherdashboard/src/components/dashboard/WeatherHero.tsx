import { Card, CardContent } from "@/components/ui/card"
import { conditionMeta } from "@/components/dashboard/conditionMeta"
import type { CurrentWeather } from "@/api/weatherMapper"

interface WeatherHeroProps {
  data: CurrentWeather
}

/**
 * Hero card: static "Aarhus" label (no location search), current
 * temperature, condition icon, and wind/humidity stats. Owns only
 * current-conditions display; the LLM insight slot lives in the
 * separate WeatherInsight component below it.
 */
export default function WeatherHero({ data }: WeatherHeroProps) {
  const { icon, label } = conditionMeta(data.condition)

  return (
    <Card className="md:w-95">
      <CardContent className="flex flex-col gap-4 font-sans">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <span className="font-heading font-semibold text-lg">Aarhus</span>
            <span className="text-muted-foreground text-sm">
              Chance of rain: {Math.round(data.chanceOfRainPercent)}%
            </span>
          </div>
          <img src={icon} alt={label} className="size-12" />
        </div>

        <p className="font-bold text-7xl tracking-tight">{Math.round(data.temperatureC)}°</p>

        <dl className="flex gap-6 text-muted-foreground text-sm">
          <div className="flex flex-col">
            <dt className="font-normal">Wind</dt>
            <dd>{Math.round(data.windSpeedKph)} km/h</dd>
          </div>
          <div className="flex flex-col">
            <dt className="font-normal">Humidity</dt>
            <dd>{Math.round(data.humidityPercent)}%</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  )
}
