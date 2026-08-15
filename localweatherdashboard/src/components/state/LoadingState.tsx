import { Skeleton } from "@/components/ui/skeleton"

interface LoadingStateProps {
  /** Screen-reader-only announcement text. */
  label?: string
}

/**
 * Placeholder shown while the initial weather query is in flight.
 * Skeleton shapes roughly mirror the eventual current-conditions card
 * and 7-day forecast row so the layout doesn't jump once data arrives.
 */
export default function LoadingState({
  label = "Loading weather for Aarhus…",
}: LoadingStateProps) {
  return (
    <div role="status" aria-live="polite" className="flex flex-col gap-4">
      <span className="sr-only">{label}</span>
      <Skeleton className="w-full h-32" />
      <div className="gap-2 grid grid-cols-7">
        {Array.from({ length: 7 }, (_, i) => (
          <Skeleton key={i} className="w-full h-24" /> /* using the skeleton component from shadcn */
        ))}
      </div>
    </div>
  )
}
