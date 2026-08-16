import { describe, it, expect } from "vitest"
import { resolveTheme } from "./theme"

// Check if the resolveTheme function correctly determines the effective theme based on the user's preference and system settings. Important for ensuring that the theme toggling logic works as expected.
describe("resolveTheme", () => {
  it.each([
    ["light", false, "light"],
    ["light", true, "light"],
    ["dark", false, "dark"],
    ["dark", true, "dark"],
    ["system", false, "light"],
    ["system", true, "dark"],
  ] as const)("mode=%s, systemPrefersDark=%s -> %s", (mode, systemPrefersDark, expected) => {
    expect(resolveTheme(mode, systemPrefersDark)).toBe(expected)
  })
})
