/**
 * @param d Date to format (defaults to now).
 * @return The date's local calendar day as 'YYYY-MM-DD', matching the
 *   format Open-Meteo returns for `ForecastDay.date`. Deliberately avoids
 *   `toISOString()`, which is UTC-based and can shift the date by one near
 *   midnight in any timezone ahead of UTC.
 */
export function toLocalDateString(d: Date = new Date()): string {
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

/**
 * @param dateStr A 'YYYY-MM-DD' date string.
 * @return A short weekday label ('Mon', 'Tue', ...). Parses the date as a
 *   local calendar date (not via `new Date(dateStr)`, which treats a
 *   date-only string as UTC midnight and can display the wrong weekday).
 */
export function formatWeekday(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number)
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString("en-US", { weekday: "short" })
}

/**
 * @param timeStr An Open-Meteo hourly timestamp, 'YYYY-MM-DDTHH:mm' local time.
 * @return A 12-hour clock label like '6:00 AM'. Parsed into explicit local
 *   date parts rather than `new Date(timeStr)` — same rationale as
 *   `formatWeekday`: relying on an engine's implicit handling of a
 *   partial ISO string (no timezone offset) is inconsistent to depend on.
 */
export function formatHour(timeStr: string): string {
  const [datePart, timePart] = timeStr.split("T")
  const [year, month, day] = datePart.split("-").map(Number)
  const [hour, minute] = timePart.split(":").map(Number)
  const date = new Date(year, month - 1, day, hour, minute)
  return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
}
