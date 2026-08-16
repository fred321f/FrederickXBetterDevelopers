import WeatherHero from "@/components/dashboard/WeatherHero"
import WeatherInsight from "@/components/dashboard/WeatherInsight"
import AirConditions from "@/components/dashboard/AirConditions"
import ForecastList from "@/components/dashboard/ForecastList"
import type { WeatherData } from "@/api/weatherMapper"

interface DashContentProps {
  data: WeatherData
}

/**
 * Mobile: single column, hero/insight/air-conditions stacked on top,
 * forecast stacked below. md: and up: fixed-width left column
 * (hero -> insight -> air conditions) with forecast filling the rest.
 */
export default function DashContent({ data }: DashContentProps) {
  return (
    <div className="flex flex-col gap-6 md:grid md:grid-cols-[380px_1fr] md:items-start">
      <div className="flex flex-col gap-4 md:w-95">
        <WeatherHero data={data.current} />
        <WeatherInsight insight={data.insight} />
        <AirConditions data={data.current} />
      </div>
      <ForecastList days={data.forecast} />
    </div>
  )
}
