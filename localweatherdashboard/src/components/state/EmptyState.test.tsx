import { describe, expect, it, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import EmptyState from "./EmptyState"

describe("EmptyState", () => {
  /**
   * Weather data is expected to be available most of the time, so this is an edge case.
   * We don't want to make it too visually prominent, but we do want to give the user a way
   * to refresh the query if they want to.
   *  */ 
  it("renders a message without a refresh button when onRefresh is omitted", () => {
    render(<EmptyState />)

    expect(screen.getByText(/sorry! no weather data available/i)).toBeInTheDocument()
    expect(screen.queryByRole("button")).not.toBeInTheDocument()
  })

  it("renders a refresh button and calls onRefresh when clicked", async () => {
    const onRefresh = vi.fn()
    const user = userEvent.setup()
    render(<EmptyState onRefresh={onRefresh} />)

    await user.click(screen.getByRole("button", { name: /refresh/i })) // Wait for the user to click the refresh button

    expect(onRefresh).toHaveBeenCalledTimes(1) // Check that the onRefresh callback was called once, when the user clicked the button
  })
})
