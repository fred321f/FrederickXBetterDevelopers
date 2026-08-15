import { useWeather } from "@/hooks/useWeather"
import type { WeatherData } from "@/api/weatherMapper"
import EmptyState from "@/components/state/EmptyState"
import ErrorState from "@/components/state/ErrorState"
import LoadingState from "@/components/state/LoadingState"
import DashContent from "@/components/dashboard/DashContent"

export default function WeatherDashboard() {
  const { data: rawData, isPending, isError, error, refetch } = useWeather()
  // TanStack Query's `data` is guaranteed defined once `status === 'success'`, which lets
  // TypeScript prove the `!data` branch below unreachable and collapse it to `never`. Rebinding
  // with an explicit type keeps the defensive check compiling for a shape the types don't
  // currently allow but that we don't want silently swallowed if that ever changes.
  const data: WeatherData | undefined = rawData

  if (isPending) return <LoadingState />
  if (isError && error) return <ErrorState error={error} onRetry={() => refetch()} />
  if (!data) return <EmptyState onRefresh={() => refetch()} /> // edge case: query succeeded with no usable data

  return <DashContent data={data} />
}
