import CurrentWeather from "@/components/dashboard/CurrentWeather"
import ForecastList from "@/components/dashboard/ForecastList"
import type { WeatherData } from "@/api/weatherMapper"

interface DashContentProps {
  data: WeatherData
}

/**
 * Mobile: single column, hero card on top, forecast stacked below.
 * md: and up: fixed-width hero on the left, forecast filling the rest.
 */
export default function DashContent({ data }: DashContentProps) {
  return (
    <div className="flex flex-col gap-6 md:grid md:grid-cols-[380px_1fr] md:items-start">
      <CurrentWeather data={data.current} insight={data.insight} />
      <ForecastList days={data.forecast} />
    </div>
  )
}
