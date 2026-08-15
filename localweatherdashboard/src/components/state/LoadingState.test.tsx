import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"

import LoadingState from "./LoadingState"

describe("LoadingState", () => {
  it("renders a polite status region announcing the loading label", () => {
    render(<LoadingState />)

    const status = screen.getByRole("status")
    expect(status).toHaveAttribute("aria-live", "polite")
    expect(status).toHaveTextContent("Loading weather for Aarhus…")
  })

  it("accepts a custom label", () => {
    render(<LoadingState label="Fetching…" />)

    expect(screen.getByRole("status")).toHaveTextContent("Fetching…")
  })

  it("renders skeleton placeholders", () => {
    const { container } = render(<LoadingState />)

    expect(container.querySelectorAll('[data-slot="skeleton"]').length).toBeGreaterThan(0)
  })
})
