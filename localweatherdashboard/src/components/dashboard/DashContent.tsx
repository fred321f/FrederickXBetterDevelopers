import type { WeatherData } from "@/api/weatherMapper"

interface DashContentProps {
  data: WeatherData
}

/** Placeholder — real dashboard UI is a separate follow-up task. */
export default function DashContent({ data }: DashContentProps) {
  return (
    <>
      {/* Reserved slot for a future LLM-generated weather insight — insight is always null today */}
      {data.insight && <p>{data.insight}</p>}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  )
}
