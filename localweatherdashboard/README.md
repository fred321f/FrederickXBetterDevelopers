# Local Weather Dashboard

Take-home assessment for Better Developers: a dashboard showing current weather and a 7-day
forecast for Aarhus, Denmark, built with Vite + React and styled with Shadcn/Tailwind. Weather
data comes from the [Open-Meteo](https://open-meteo.com/) API (no API key required), fetched and
cached via [TanStack Query](https://tanstack.com/query) — chosen so loading/error/caching state
comes from a well-tested library instead of being hand-rolled per component.

**Hours spent:** 2.5

**DevLog:**
- **Friday 14-08-2026 (2.5 hrs):** Added openMeteo.ts API fetch calls, weatherMapping and wrote tests for these. Added useWeather hook and set up TanStack Query for robust yet seamless state management

## Running locally

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

Other scripts:

```bash
npm run build    # type-check and produce a production build
npm run preview  # preview the production build locally
npm run lint      # run ESLint
npm test         # run the unit test suite (Vitest)
```

No environment variables or API keys are required — Open-Meteo's forecast endpoint is public.

## Testing

Unit tests use [Vitest](https://vitest.dev/). The current suite covers:

- **`src/api/weatherMapper.ts`** — the pure mapping logic (WMO weather-code → app-level
  condition, and the Open-Meteo response → `WeatherData` shape), since that's where a silent
  bug would show the wrong weather to a user without any type error to catch it.
- **`src/api/openMeteo.ts`** — the fetch layer's error handling, via a mocked `fetch`: the
  non-`ok` response path, malformed/non-JSON response bodies, and the request timeout.

`src/hooks/useWeather.ts` itself is **not** directly tested — it's a thin composition of
`fetchOpenMeteo` + `mapOpenMeteoResponse` via TanStack Query's `useQuery`, both of which are
already covered above. See `NOTES.md` for what a direct hook-level test would add.

```bash
npm test
```

## File structure

```
src/
  api/
    openMeteo.ts           # Fetches raw forecast data from the Open-Meteo API for Aarhus (timeout + error handling)
    openMeteo.test.ts       # Unit tests for the fetch layer's error/timeout handling
    weatherMapper.ts        # Maps the raw Open-Meteo response into app-level WeatherData/WeatherCondition types
    weatherMapper.test.ts   # Unit tests for the mapping logic above
  components/
    ui/
      button.tsx            # Shadcn-generated UI primitive
  hooks/
    useWeather.ts           # TanStack Query hook composing openMeteo + weatherMapper for components to consume
  lib/
    constants.ts            # Shared constants (e.g. fetch timeout)
    queryClient.ts           # Single shared TanStack Query QueryClient instance
    utils.ts                # Shared helpers (e.g. Shadcn's `cn` class-name merge utility)
  App.tsx                  # Root application component
  App.css
  main.tsx                 # React entry point, wraps App in QueryClientProvider
  index.css                # Global styles / Tailwind entry
```

This structure will grow as the dashboard UI, loading/error states, and any stretch features
(dark/light toggle, LLM weather commentary, offline mock fallback) are added.

## Assumptions & trade-offs

- **Web app, not native.** Nothing in the brief asks for a native app, so a browser-based SPA
  is assumed sufficient. This is also part of the justification for React specifically: if a
  native shell is ever wanted later, the same React codebase could be packaged with something
  like Capacitor rather than rewritten.
- **Fixed location, no search.** Aarhus's coordinates are hardcoded in `openMeteo.ts` rather
  than built as a user-searchable city picker, since the brief asks for Aarhus specifically, not
  an arbitrary-location dashboard.
- **Implicit units from the API.** The Open-Meteo request doesn't explicitly pass
  `temperature_unit`/`wind_speed_unit` — it relies on the API's current defaults (°C, km/h),
  which is what the app's types (`temperatureC`, `windSpeedKph`) assume. If Open-Meteo ever
  changed its defaults, nothing here would fail loudly — it'd just silently mislabel units.
- **WMO weather codes are bucketed into 7 simplified conditions** (`clear`, `partly-cloudy`,
  `cloudy`, `fog`, `drizzle`, `rain`, `snow`, `thunderstorm`, `unknown`) instead of surfacing
  all ~27 raw codes. This is a deliberate simplification for a compact icon set, with the
  trade-off that distinctions like "freezing rain" vs. "rain" collapse into the same condition.
- **7-day forecast includes today.** (`forecast_days=7` from Open-Meteo, used as-is) rather than
  excluding today on the assumption that "current weather" already covers it. Today still shows
  its own high/low in the forecast strip alongside the separate current-conditions view.
- **Creative freedom is assumed.** The brief specifies no particular visual style, layout, or
  branding, so styling/UI decisions (beyond the Shadcn/Tailwind stack already noted) are left
  to judgment rather than treated as a spec to match.

## Scope notes

See `NOTES.md` for anything intentionally skipped or deferred given the take-home timebox, and
why.
