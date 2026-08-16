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
    <Card className={`${className} border-none shadow-sm`}>
      <CardHeader className="pb-2">
        <CardTitle className="font-bold text-muted-foreground text-xs uppercase tracking-wider">
          Today's Forecast
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex flex-col flex-1 justify-center pt-2 md:pt-4">
        {/* Removed gap, relying on flex-1 on the children to distribute space evenly */}
        <div className="flex pb-4 w-full overflow-x-auto snap-mandatory snap-x scrollbar-thin">
          {hours.map((hour) => {
            const { icon, label } = conditionMeta(hour.condition)
            return (
              <div 
                key={hour.time} 
                // flex-1 forces them to stretch. min-w ensures they scroll if there are too many. border-r adds the dividers.
                className="flex flex-col flex-1 items-center px-2 border-border/50 border-r last:border-r-0 min-w-[5rem] md:min-w-[6rem] snap-start shrink-0"
              >
                <span className="mb-2 font-semibold text-muted-foreground text-sm">
                  {formatHour(hour.time)}
                </span>
                
                <img 
                  src={icon} 
                  alt="" 
                  aria-hidden="true" 
                  className="drop-shadow-sm mb-3 w-32 h-32 object-contain" 
                />
                
                <span className="sr-only">{label}</span>
                
                <span className="font-bold text-2xl">
                  {Math.round(hour.temperatureC)}°
                </span>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}