import { describe, expect, it, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import ErrorState from "./ErrorState"

describe("ErrorState", () => {
  it("renders the error message inside an alert region", () => {
    render(<ErrorState error={new Error("Network down")} onRetry={vi.fn()} />)

    const alert = screen.getByRole("alert") // "Find" the alert region by its role, which is announced to screen readers
    expect(alert).toHaveTextContent("Network down") // See if the error message is rendered inside the alert region
  })

  it("falls back to a generic message when error.message is empty", () => {
    render(<ErrorState error={new Error("")} onRetry={vi.fn()} />)

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Something went wrong fetching the forecast."
    )
  })

  it("calls onRetry once when the retry button is clicked", async () => {
    const onRetry = vi.fn()
    const user = userEvent.setup()
    render(<ErrorState error={new Error("Timed out")} onRetry={onRetry} />)

    await user.click(screen.getByRole("button", { name: /retry/i }))

    expect(onRetry).toHaveBeenCalledTimes(1)
  })
})
