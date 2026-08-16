import { useWeather } from "@/hooks/useWeather"
import EmptyState from "@/components/state/EmptyState"
import ErrorState from "@/components/state/ErrorState"
import LoadingState from "@/components/state/LoadingState"
import DashContent from "@/components/dashboard/DashContent"

export default function WeatherDashboard() {
  const { data, error, isLoading, refetch } = useWeather()

  if (isLoading) return <LoadingState />
  if (error) return <ErrorState error={error} onRetry={() => refetch()} />
  if (!data) return <EmptyState onRefresh={() => refetch()} /> // edge case: query succeeded with no usable data

  return <DashContent data={data} />
}
