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
 */
export default function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <Alert variant="destructive">
      <AlertTriangle />
      <AlertTitle>Couldn't load the weather</AlertTitle>
      <AlertDescription>
        {error.message || "Something went wrong fetching the forecast."} {/* Fall back to a generic message if the error has no message */}
      </AlertDescription>
      <Button variant="outline" size="sm" onClick={onRetry} className="mt-2 w-fit">
        Retry
      </Button>
    </Alert>
  )
}
