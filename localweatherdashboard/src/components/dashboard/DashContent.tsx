import WeatherHero from "@/components/dashboard/WeatherHero"
import WeatherInsight from "@/components/dashboard/WeatherInsight"
import TodayForecastStrip from "@/components/dashboard/TodayForecastStrip"
import AirConditions from "@/components/dashboard/AirConditions"
import WeeklyForecast from "@/components/dashboard/WeeklyForecast"
import type { WeatherData } from "@/api/weatherMapper"

interface DashContentProps {
  data: WeatherData
}

/**
 * Mobile: single column, hero/insight/hourly/air-conditions stacked on
 * top, weekly forecast stacked below. md: and up: fixed-width left
 * column (hero -> insight -> hourly -> air conditions) with the weekly
 * forecast filling the rest.
 */
export default function DashContent({ data }: DashContentProps) {
  return (
    <div className="flex flex-col gap-6 md:grid md:grid-cols-[380px_1fr] md:items-start">
      <div className="flex flex-col gap-4 md:w-95">
        <WeatherHero data={data.current} />
        <WeatherInsight insight={data.insight} />
        <TodayForecastStrip hours={data.hourly} />
        <AirConditions data={data.current} />
      </div>
      <WeeklyForecast days={data.forecast} />
    </div>
  )
}
