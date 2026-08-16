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
        "flex flex-1 items-center gap-3 px-4 py-3 transition-colors motion-reduce:transition-none scrollbar-thin",
        isToday && "bg-primary/10"
      )}
    >
      <span className="w-10 font-medium text-muted-foreground text-sm shrink-0">
        {isToday ? "Today" : formatWeekday(day.date)}
      </span>
      <img src={icon} alt="" aria-hidden="true" className="size-6" />
      <span className="flex-1 text-sm">{label}</span>
      <span className="text-sm">
        <span className="font-medium">{Math.round(day.highC)}°</span>{" "}
        <span className="text-muted-foreground">{Math.round(day.lowC)}°</span>
      </span>
    </div>
  )
}
