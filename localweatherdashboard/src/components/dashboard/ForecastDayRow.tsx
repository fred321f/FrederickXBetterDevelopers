import { conditionMeta } from "@/components/dashboard/conditionMeta"
import { formatWeekday } from "@/lib/date"
import { cn } from "@/lib/utils"
import type { ForecastDay } from "@/api/weatherMapper"

interface ForecastDayRowProps {
  day: ForecastDay
  /** Whether this row should get the --primary "today" accent treatment. Never inferred internally — passed in by WeeklyForecast. */
  isToday: boolean
}

/** A single day's forecast as one row: weekday, icon, condition, high/low. */
export default function ForecastDayRow({ day, isToday }: ForecastDayRowProps) {
  const { icon, label } = conditionMeta(day.condition)

  return (
    <div
      data-slot="forecast-day-row"
      className={cn(
        "flex flex-1 items-center gap-4 px-2 md:px-4 py-4 border-border/50 last:border-0 border-b transition-colors motion-reduce:transition-none",
        isToday && "bg-muted/50 rounded-lg border-none"
      )}
    >
      <span className="w-16 font-medium text-muted-foreground text-sm shrink-0">
        {isToday ? "Today" : formatWeekday(day.date)}
      </span>
      
      <div className="flex flex-1 items-center gap-4">
        <img 
          src={icon} 
          alt="" 
          aria-hidden="true" 
          className="drop-shadow-sm w-10 h-10 object-contain" 
        />
        <span className="font-medium text-foreground text-sm">{label}</span>
      </div>
      
      <span className="min-w-[4rem] text-base text-right">
        <span className="font-bold">{Math.round(day.highC)}°</span>{" "}
        <span className="ml-2 text-muted-foreground">{Math.round(day.lowC)}°</span>
      </span>
    </div>
  )
}