import { AlertTriangle } from "lucide-react"

import { Alert, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

interface FallbackBannerProps {
  onRetry: () => void
}

/**
 * Shown above the dashboard when live weather couldn't be fetched and sample
 * data is displayed instead. This is the app's user-facing error state: the
 * fetch failed, but rather than dead-ending on a blank error screen, the
 * dashboard stays fully usable with clearly-labeled sample data and a way
 * to retry the real fetch.
 */
export default function FallbackBanner({ onRetry }: FallbackBannerProps) {
  return (
    <Alert className="flex flex-row items-center gap-2 mb-4">
      <AlertTriangle className="size-4" />
      <AlertTitle className="text-sm flex-1">
        Showing sample data — live weather unavailable.
      </AlertTitle>
      <Button variant="outline" size="sm" onClick={onRetry}>
        Retry
      </Button>
    </Alert>
  )
}
