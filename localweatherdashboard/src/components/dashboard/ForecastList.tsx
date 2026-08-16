import ForecastDayCard from "@/components/dashboard/ForecastDayCard"
import { toLocalDateString } from "@/lib/date"
import type { ForecastDay } from "@/api/weatherMapper"

interface ForecastListProps {
  days: ForecastDay[]
}

/**
 * Renders the 7-day forecast: a vertical stack on mobile, a horizontal row
 * on md: and up. "Today" is computed here (never inside ForecastDayCard)
 * and moved to the front of the list regardless of its position in the
 * raw array, so it's visually first on both breakpoints.
 */
export default function ForecastList({ days }: ForecastListProps) {
  const today = toLocalDateString()
  const sorted = [...days].sort((a, b) => {
    if (a.date === today) return -1
    if (b.date === today) return 1
    return 0
  })

  return (
    <div className="flex flex-col gap-3 md:flex-row">
      {sorted.map((day) => (
        <ForecastDayCard key={day.date} day={day} isToday={day.date === today} />
      ))}
    </div>
  )
}
