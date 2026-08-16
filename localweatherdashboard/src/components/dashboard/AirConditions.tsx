import { Droplets, Sun, Thermometer, Wind } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { CurrentWeather } from "@/api/weatherMapper"

interface AirConditionsProps {
  data: CurrentWeather
  className?: string
}

/**
 * 2x2 grid of secondary current-conditions stats. Reference image shows a
 * "See more" pill in the header, deliberately omitted here per spec.
 */
export default function AirConditions({ data, className }: AirConditionsProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Air Conditions</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-2 gap-6">
          <div className="flex items-center gap-3">
            <Thermometer className="size-5 text-muted-foreground" aria-hidden="true" />
            <div className="flex flex-col">
              <dt className="text-muted-foreground text-sm">Real Feel</dt>
              <dd className="font-medium">{Math.round(data.feelsLikeC)}°</dd>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Wind className="size-5 text-muted-foreground" aria-hidden="true" />
            <div className="flex flex-col">
              <dt className="text-muted-foreground text-sm">Wind</dt>
              <dd className="font-medium">{Math.round(data.windSpeedKph)} km/h</dd>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Droplets className="size-5 text-muted-foreground" aria-hidden="true" />
            <div className="flex flex-col">
              <dt className="text-muted-foreground text-sm">Chance of rain</dt>
              <dd className="font-medium">{Math.round(data.chanceOfRainPercent)}%</dd>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Sun className="size-5 text-muted-foreground" aria-hidden="true" />
            <div className="flex flex-col">
              <dt className="text-muted-foreground text-sm">UV Index</dt>
              <dd className="font-medium">{Math.round(data.uvIndex)}</dd>
            </div>
          </div>
        </dl>
      </CardContent>
    </Card>
  )
}
