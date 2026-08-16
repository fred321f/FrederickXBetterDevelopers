export type ThemeMode = "light" | "dark" | "system"

/**
 * @param mode The user's stored theme preference.
 * @param systemPrefersDark Whether the OS currently prefers dark mode.
 * @return The effective 'light' | 'dark' class to apply to the document root.
 */
export function resolveTheme(mode: ThemeMode, systemPrefersDark: boolean): "light" | "dark" {
  if (mode === "system") return systemPrefersDark ? "dark" : "light"
  return mode
}
