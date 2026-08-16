import { Skeleton } from "@/components/ui/skeleton"

interface LoadingStateProps {
  /** Screen-reader-only announcement text. */
  label?: string
}

/**
 * Placeholder shown while the initial weather query is in flight.
 * Reuses the same `.dashboard-grid` layout as the loaded dashboard
 * (see DashContent.tsx / index.css) so each skeleton block sits in the
 * same region, at the same breakpoints, as the real content it stands
 * in for — avoiding a layout jump once data arrives.
 */
export default function LoadingState({
  label = "Loading weather for Aarhus…",
}: LoadingStateProps) {
  return (
    <div role="status" aria-live="polite" className="dashboard-grid">
      <span className="sr-only">{label}</span>
      <Skeleton className="[grid-area:hero] h-44 md:h-full" />
      <Skeleton className="[grid-area:today] h-64 md:h-full" />
      <Skeleton className="[grid-area:air] h-56 md:h-full" />
      <Skeleton className="[grid-area:weekly] h-96 md:h-full" />
    </div>
  )
}
