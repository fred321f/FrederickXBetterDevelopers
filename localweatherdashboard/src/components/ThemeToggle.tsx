import { Moon, Monitor, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/hooks/useTheme"
import type { ThemeMode } from "@/lib/theme"

// State machine for cycling through the three theme modes. The order is arbitrary, but system -> light -> dark -> system seems intuitive.
const NEXT_MODE: Record<ThemeMode, ThemeMode> = {
  system: "light",
  light: "dark",
  dark: "system",
}

// Map the theme mode to the corresponding icon component and label for accessibility. Allows for easy extension if more modes are added in the future. 
const ICON: Record<ThemeMode, typeof Sun> = {
  light: Sun,
  dark: Moon,
  system: Monitor,
}

// Map the theme mode to a human-readable label for accessibility. This is used in the aria-label of the button to inform users of the current theme and what will happen when they click it.
const LABEL: Record<ThemeMode, string> = {
  light: "Light theme",
  dark: "Dark theme",
  system: "System theme",
}

/**
 * Single icon button cycling system -> light -> dark -> system. Not
 * weather-specific, so it lives outside components/dashboard.
 */
export default function ThemeToggle() {
  const { mode, setMode } = useTheme()
  const Icon = ICON[mode]

  return (
    <span className="inline-flex items-center gap-2">
      <span className="hidden sm:block font-extralight text-muted-foreground text-xs">{LABEL[mode]}</span>
      <Button
        variant="ghost"
        size="icon"
        aria-label={`Theme: ${LABEL[mode]}. Click to switch.`}
        onClick={() => setMode(NEXT_MODE[mode])}
      >
        <Icon />
      </Button>
    </span>
  )
}
