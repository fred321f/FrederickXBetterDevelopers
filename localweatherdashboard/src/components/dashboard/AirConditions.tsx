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
      <CardContent className="flex flex-col flex-1 justify-center">
        <dl className="gap-8 grid grid-cols-2">
          <div className="flex items-center gap-4">
            <Thermometer className="size-12 text-muted-foreground" aria-hidden="true" />
            <div className="flex flex-col">
              <dt className="text-muted-foreground text-base">Real Feel</dt>
              <dd className="font-medium text-3xl">{Math.round(data.feelsLikeC)}°</dd>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Wind className="size-12 text-muted-foreground" aria-hidden="true" />
            <div className="flex flex-col">
              <dt className="text-muted-foreground text-base">Wind</dt>
              <dd className="font-medium text-3xl">{Math.round(data.windSpeedKph)} km/h</dd>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Droplets className="size-12 text-muted-foreground" aria-hidden="true" />
            <div className="flex flex-col">
              <dt className="text-muted-foreground text-base">Chance of rain</dt>
              <dd className="font-medium text-3xl">{Math.round(data.chanceOfRainPercent)}%</dd>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Sun className="size-12 text-muted-foreground" aria-hidden="true" />
            <div className="flex flex-col">
              <dt className="text-muted-foreground text-base">UV Index</dt>
              <dd className="font-medium text-3xl">{Math.round(data.uvIndex)}</dd>
            </div>
          </div>
        </dl>
      </CardContent>
    </Card>
  )
}
