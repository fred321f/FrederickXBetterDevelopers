import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ForecastDayRow from "@/components/dashboard/ForecastDayRow"
import { toLocalDateString } from "@/lib/date"
import type { ForecastDay } from "@/api/weatherMapper"

interface WeeklyForecastProps {
  days: ForecastDay[]
}

/**
 * Renders the 7-day forecast as a single card of stacked list-rows
 * (day - icon - condition - high/low), matching the reference's row
 * layout in place of the previous per-day card grid. "Today" is computed
 * here (never inside ForecastDayRow) and moved to the front of the list
 * regardless of its position in the raw array.
 */
export default function WeeklyForecast({ days }: WeeklyForecastProps) {
  const today = toLocalDateString()
  const sorted = [...days].sort((a, b) => {
    if (a.date === today) return -1
    if (b.date === today) return 1
    return 0
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>7-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent className="divide-y divide-border px-0">
        {sorted.map((day) => (
          <ForecastDayRow key={day.date} day={day} isToday={day.date === today} />
        ))}
      </CardContent>
    </Card>
  )
}
