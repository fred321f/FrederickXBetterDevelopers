import WeatherHero from "@/components/dashboard/WeatherHero"
import WeatherInsight from "@/components/dashboard/WeatherInsight"
import TodayForecastStrip from "@/components/dashboard/TodayForecastStrip"
import AirConditions from "@/components/dashboard/AirConditions"
import WeeklyForecast from "@/components/dashboard/WeeklyForecast"
import { cn } from "@/lib/utils"
import type { WeatherData } from "@/api/weatherMapper"

interface DashContentProps {
  data: WeatherData
}

/**
 * CSS grid with named areas (.dashboard-grid in index.css), not grid-cols
 * plus DOM order, so the area <-> breakpoint mapping is explicit in the
 * CSS itself. Mobile: single column, hero -> insight (if present) ->
 * today -> air -> weekly. md: and up: left column stacks the same four
 * in order, weekly spans the right column across their full height.
 * The "insight" area only exists in the template when there's an insight
 * to show (.dashboard-grid--with-insight) — WeatherInsight returning
 * null doesn't by itself remove a reserved row/gap from a static
 * template, so the template swap is what actually prevents the gap.
 */
export default function DashContent({ data }: DashContentProps) {
  return (
    <div className={cn("dashboard-grid", data.insight && "dashboard-grid--with-insight")}>
      <WeatherHero data={data.current} className="bg-background shadow-none p-6 border-none [grid-area:hero]" />
      <WeatherInsight insight={data.insight} className="bg-card shadow-none p-6 border-none [grid-area:insight]" />
      <TodayForecastStrip hours={data.hourly} className="bg-card shadow-none p-6 border-none [grid-area:today]" />
      <AirConditions data={data.current} className="bg-card shadow-none p-6 border-none [grid-area:air]" />
      <WeeklyForecast days={data.forecast} className="bg-card shadow-none p-6 border-none [grid-area:weekly]" />
    </div>
  )
}
