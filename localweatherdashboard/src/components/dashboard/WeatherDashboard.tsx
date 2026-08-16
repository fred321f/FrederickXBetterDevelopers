import { useWeather } from "@/hooks/useWeather"
import EmptyState from "@/components/state/EmptyState"
import FallbackBanner from "@/components/state/FallbackBanner"
import LoadingState from "@/components/state/LoadingState"
import DashContent from "@/components/dashboard/DashContent"

export default function WeatherDashboard() {
  const { data, isLoading, isFallback, refetch } = useWeather()

  if (isLoading) return <LoadingState />
  if (!data) return <EmptyState onRefresh={() => refetch()} /> // edge case: query succeeded with no usable data

  return (
    <div className="flex flex-col h-full min-h-0">
      {isFallback && <FallbackBanner onRetry={() => refetch()} />}
      <div className="flex-1 min-h-0">
        <DashContent data={data} />
      </div>
    </div>
  )
}
