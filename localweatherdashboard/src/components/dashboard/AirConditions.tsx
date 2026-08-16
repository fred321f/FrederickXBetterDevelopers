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
        <div className="gap-8 grid grid-cols-2">
          <div className="flex items-center gap-4">
            <Thermometer className="size-12 text-muted-foreground" aria-hidden="true" />
            <div className="flex flex-col">
              <div className="text-muted-foreground text-sm md:text-base">Real Feel</div>
              <div className="font-medium text-2xl md:text-3xl">{Math.round(data.feelsLikeC)}°</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Wind className="size-12 text-muted-foreground" aria-hidden="true" />
            <div className="flex flex-col">
              <div className="text-muted-foreground text-sm md:text-base">Wind</div>
              <div className="font-medium text-2xl md:text-3xl">{Math.round(data.windSpeedKph)} km/h</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Droplets className="size-12 text-muted-foreground" aria-hidden="true" />
            <div className="flex flex-col">
              <div className="text-muted-foreground text-sm md:text-base">Chance of rain</div>
              <div className="font-medium text-2xl md:text-3xl">{Math.round(data.chanceOfRainPercent)}%</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Sun className="size-12 text-muted-foreground" aria-hidden="true" />
            <div className="flex flex-col">
              <div className="text-muted-foreground text-sm md:text-base">UV Index</div>
              <div className="font-medium text-2xl md:text-3xl">{Math.round(data.uvIndex)}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
