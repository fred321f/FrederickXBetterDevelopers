import { Card, CardContent } from "@/components/ui/card"
import { conditionMeta } from "@/components/dashboard/conditionMeta"
import { formatWeekday } from "@/lib/date"
import { cn } from "@/lib/utils"
import type { ForecastDay } from "@/api/weatherMapper"

interface ForecastDayCardProps {
  day: ForecastDay
  /** Whether this card should get the --primary "today" accent treatment. Never inferred internally — passed in by ForecastList. */
  isToday: boolean
}

/** A single day's forecast: weekday, icon, and high/low temperatures. */
export default function ForecastDayCard({ day, isToday }: ForecastDayCardProps) {
  const { icon, label, colorVar } = conditionMeta(day.condition)

  return (
    <Card
      className={cn(
        "flex-1 transition-colors motion-reduce:transition-none",
        isToday && "border-primary bg-primary/10"
      )}
    >
      <CardContent className="flex flex-col items-center gap-2 text-center">
        <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          {isToday ? "Today" : formatWeekday(day.date)}
        </span>
        <img src={icon} alt="" aria-hidden="true" className="size-7" />
        <span className={cn("size-1.5 rounded-full bg-current", colorVar)} aria-hidden="true" />
        <span className="sr-only">{label}</span>
        <div className="flex gap-2 text-sm">
          <span className="font-medium">{Math.round(day.highC)}°</span>
          <span className="text-muted-foreground">{Math.round(day.lowC)}°</span>
        </div>
      </CardContent>
    </Card>
  )
}
