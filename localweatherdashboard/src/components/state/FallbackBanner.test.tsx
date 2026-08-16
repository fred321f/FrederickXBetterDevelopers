import { describe, expect, it, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import FallbackBanner from "./FallbackBanner"

describe("FallbackBanner", () => {
  it("renders the fallback message inside an alert region", () => {
    render(<FallbackBanner onRetry={vi.fn()} />)

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Showing sample data — live weather unavailable."
    )
  })

  it("calls onRetry once when the retry button is clicked", async () => {
    const onRetry = vi.fn()
    const user = userEvent.setup()
    render(<FallbackBanner onRetry={onRetry} />)

    await user.click(screen.getByRole("button", { name: /retry/i }))

    expect(onRetry).toHaveBeenCalledTimes(1)
  })
})
