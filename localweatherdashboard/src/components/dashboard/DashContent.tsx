import type { WeatherData } from "@/api/weatherMapper"

interface DashContentProps {
  data: WeatherData
}

/** Placeholder — real dashboard UI is a separate follow-up task. */
export default function DashContent({ data }: DashContentProps) {
  return <pre>{JSON.stringify(data, null, 2)}</pre>
}
