import { Button } from "@/components/ui/button"

interface EmptyStateProps {
  onRefresh?: () => void
}

/**
 * Shown when the query succeeded but returned no usable data. This is an edge
 * case. Kept visually low-key since it's
 * not a failure, just a gap.
 */
export default function EmptyState({ onRefresh }: EmptyStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center gap-2 py-8 text-muted-foreground text-center"
    >
      <p className="text-sm">Sorry! No weather data available right now.</p>
      {onRefresh && (
        <Button variant="outline" size="sm" onClick={onRefresh}>
          Refresh
        </Button>
      )}
    </div>
  )
}
