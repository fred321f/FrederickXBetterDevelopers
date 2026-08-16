import { AlertTriangle } from "lucide-react"

import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

interface ErrorStateProps {
  error: Error
  onRetry: () => void
}

/**
 * Shown when the weather query fails. `Alert`'s `role="alert"` announces
 * this to screen readers as soon as it mounts, no extra `aria-live` needed.
 * Centered in a flex wrapper (matching EmptyState's pattern) so it reads as
 * a compact card rather than stretching to fill the full dashboard height
 * with large gaps, which is what App.tsx's `md:*:h-full` does to Alert's
 * default grid layout otherwise.
 */
export default function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="flex justify-center items-center h-full">
      <Alert
        variant="destructive"
        className="flex flex-col items-center gap-2 py-6 max-w-sm text-center"
      >
        <AlertTriangle className="size-6" />
        <AlertTitle className="text-base">Couldn't load the weather</AlertTitle>
        <AlertDescription>
          {error.message || "Something went wrong fetching the forecast."} {/* Fall back to a generic message if the error has no message */}
        </AlertDescription>
        <Button variant="outline" size="sm" onClick={onRetry} className="mt-2 w-fit">
          Retry
        </Button>
      </Alert>
    </div>
  )
}
