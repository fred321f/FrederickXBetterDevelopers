import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"

import WeatherInsight from "./WeatherInsight"

describe("WeatherInsight", () => {
  it("renders nothing when insight is null", () => {
    const { container } = render(<WeatherInsight insight={null} />)
    expect(container).toBeEmptyDOMElement()
  })

  it("renders the insight text when provided", () => {
    render(<WeatherInsight insight="Bring an umbrella today." />)
    expect(screen.getByText("Bring an umbrella today.")).toBeInTheDocument()
  })
})
