import { Card, CardContent } from "@/components/ui/card"
import { conditionMeta } from "@/components/dashboard/conditionMeta"
import { cn } from "@/lib/utils"
import type { CurrentWeather as CurrentWeatherData } from "@/api/weatherMapper"

interface CurrentWeatherProps {
  data: CurrentWeatherData
  /** Reserved for a future LLM-generated summary. Always null for now. */
  insight?: string | null
}

/** Hero card showing the current conditions for Aarhus. */
export default function CurrentWeather({ data, insight = null }: CurrentWeatherProps) {
  const { icon, label, colorVar } = conditionMeta(data.condition)

  return (
    <Card className="md:w-95">
      <CardContent className="flex flex-col gap-4 font-sans">
        <div className="flex items-center gap-3">
          <img src={icon} alt="" aria-hidden="true" className="size-10" />
          <span className={cn("font-medium text-lg", colorVar)}>{label}</span>
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

        {/* If an insight is provided, display it here */}
        {insight && (
          <p data-slot="insight" className="text-muted-foreground text-sm">
            {insight}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
