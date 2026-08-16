interface WeatherInsightProps {
  /** Reserved for a future LLM-generated summary. Always null for now. */
  insight: string | null
}

/**
 * Displays an LLM-generated weather insight when present. Renders nothing
 * (no empty card/placeholder) when `insight` is null, which is always the
 * case today — this is purely the display slot, with no LLM logic yet.
 */
export default function WeatherInsight({ insight }: WeatherInsightProps) {
  if (!insight) return null

  return (
    <p data-slot="insight" className="text-muted-foreground text-sm">
      {insight}
    </p>
  )
}
