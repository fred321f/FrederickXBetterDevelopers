import { Card, CardContent } from "@/components/ui/card"
import { conditionMeta } from "@/components/dashboard/conditionMeta"
import type { CurrentWeather } from "@/api/weatherMapper"

interface WeatherHeroProps {
  data: CurrentWeather
  className?: string
}

export default function WeatherHero({ data, className }: WeatherHeroProps) {
  const { icon, label } = conditionMeta(data.condition)

  return (
    <Card className={`${className} border-none`}>
      <CardContent className="flex flex-row justify-between items-center gap-4 p-4 md:p-8 h-full font-sans">

        {/* Left Column: Text Data */}
        <div className="flex flex-col justify-between h-full min-w-0">
          <div className="flex flex-col gap-1">
            <h1 className="font-semibold text-2xl sm:text-3xl md:text-4xl">Aarhus</h1>
            <span className="text-muted-foreground text-sm">
              Chance of rain: {Math.round(data.chanceOfRainPercent)}%
            </span>
          </div>

          <div className="mt-8">
            <p className="font-bold text-5xl sm:text-6xl md:text-7xl tracking-tighter">
              {Math.round(data.temperatureC)}°
            </p>
          </div>

          <div className="flex gap-8 mt-8 text-muted-foreground text-base">
            <div className="flex flex-col">
              <div className="font-medium text-muted-foreground text-xs md:text-sm">Wind</div>
              <div className="font-semibold">{Math.round(data.windSpeedKph)} km/h</div>
            </div>
            <div className="flex flex-col">
              <div className="font-medium text-muted-foreground text-xs md:text-sm">Humidity</div>
              <div className="font-semibold">{Math.round(data.humidityPercent)}%</div>
            </div>
          </div>
        </div>

        {/* Right Column: Massive Icon */}
        <div className="flex justify-center items-center pr-0 md:pr-8 shrink-0">
          <img
            src={icon}
            alt={label}
            className="drop-shadow-xl w-28 sm:w-32 md:w-56 h-28 sm:h-32 md:h-56 object-contain"
          />
        </div>

      </CardContent>
    </Card>
  )
}