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
      <CardContent className="flex flex-row justify-between items-center p-8 h-full font-sans">
        
        {/* Left Column: Text Data */}
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-1">
            <h1 className="font-semibold text-4xl">Aarhus</h1>
            <span className="text-muted-foreground text-sm">
              Chance of rain: {Math.round(data.chanceOfRainPercent)}%
            </span>
          </div>

          <div className="mt-8">
            <p className="font-bold text-7xl tracking-tighter">
              {Math.round(data.temperatureC)}°
            </p>
          </div>

          <dl className="flex gap-8 mt-8 text-muted-foreground text-base">
            <div className="flex flex-col">
              <dt className="font-medium text-muted-foreground text-sm">Wind</dt>
              <dd className="font-semibold">{Math.round(data.windSpeedKph)} km/h</dd>
            </div>
            <div className="flex flex-col">
              <dt className="font-medium text-muted-foreground text-sm">Humidity</dt>
              <dd className="font-semibold">{Math.round(data.humidityPercent)}%</dd>
            </div>
          </dl>
        </div>

        {/* Right Column: Massive Icon */}
        <div className="flex justify-center items-center pr-2 md:pr-8">
          <img 
            src={icon} 
            alt={label} 
            className="drop-shadow-xl w-40 md:w-56 h-40 md:h-56 object-contain" 
          />
        </div>

      </CardContent>
    </Card>
  )
}