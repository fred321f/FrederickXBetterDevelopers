import { useCallback, useEffect, useState } from "react"
import { resolveTheme, type ThemeMode } from "@/lib/theme"

// The name of which to save the theme mode under in localStorage.
const STORAGE_KEY = "theme"

// The return type of the useTheme hook, which includes the current theme mode and a function to update it. 
interface UseThemeResult {
  mode: ThemeMode
  setMode: (mode: ThemeMode) => void
}

// Get the stored theme mode from localStorage, defaulting to "system" if not set or invalid. Ensures persistence across page reloads.
function getStoredMode(): ThemeMode {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored === "light" || stored === "dark" || stored === "system" ? stored : "system"
}

/**
 * Persists the user's theme preference to localStorage and applies/removes
 * the `.dark` class on <html> to match. While mode is "system", also
 * listens for OS-level prefers-color-scheme changes so the theme tracks
 * live without a page reload.
 */
export function useTheme(): UseThemeResult {
  const [mode, setModeState] = useState<ThemeMode>(getStoredMode)

  // The hook itself, which is responsible for applying the theme to the document and listening for system changes when in "system" mode.
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    // Apply the theme based on the current mode and system preference.
    const applyTheme = () => {
      const effective = resolveTheme(mode, mediaQuery.matches)
      document.documentElement.classList.toggle("dark", effective === "dark")
    }

    // Initial application of the theme when the component mounts or when the mode changes.
    applyTheme()

    if (mode !== "system") return // No need to listen for changes if we're not in system mode, because the theme is fixed to light or dark.
    mediaQuery.addEventListener("change", applyTheme)
    return () => mediaQuery.removeEventListener("change", applyTheme)
  }, [mode])

  // Upon switching the theme mode, update localStorage and the state. This will trigger the useEffect above to apply the new theme.
  const setMode = useCallback((next: ThemeMode) => {
    localStorage.setItem(STORAGE_KEY, next)
    setModeState(next)
  }, [])

  return { mode, setMode }
}
