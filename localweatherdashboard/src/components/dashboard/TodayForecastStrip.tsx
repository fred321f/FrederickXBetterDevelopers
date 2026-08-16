import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { conditionMeta } from "@/components/dashboard/conditionMeta"
import { formatHour } from "@/lib/date"
import type { HourlyForecast } from "@/api/weatherMapper"

interface TodayForecastStripProps {
  hours: HourlyForecast[]
  className?: string
}

/**
 * Horizontally scrollable hourly forecast strip. Pure CSS scroll-snap
 * (snap-x snap-mandatory on the track, snap-start per item) — no JS/swipe
 * library. Same markup at every breakpoint: it scrolls on narrow screens
 * and sits flush without scrolling once the column is wide enough.
 */
export default function TodayForecastStrip({ hours, className }: TodayForecastStripProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Today's Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 pb-1 overflow-x-auto snap-mandatory snap-x scrollbar-thin"> {/* Explore options regarding a prettier scrollbar. For now, tailwindcss `scrollbar-thin` will suffice */}
          {hours.map((hour) => {
            const { icon, label } = conditionMeta(hour.condition)
            return (
              <div key={hour.time} className="flex flex-col items-center gap-2 snap-start shrink-0">
                <span className="text-muted-foreground text-xs">{formatHour(hour.time)}</span>
                <img src={icon} alt="" aria-hidden="true" className="size-7" />
                <span className="sr-only">{label}</span>
                <span className="font-medium text-sm">{Math.round(hour.temperatureC)}°</span>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
