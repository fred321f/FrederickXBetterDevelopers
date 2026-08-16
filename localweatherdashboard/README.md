# Local Weather Dashboard

Take-home assessment for Better Developers: a dashboard showing current weather and a 7-day
forecast for Aarhus, Denmark, built with Vite + React and styled with Shadcn/Tailwind. Weather
data comes from the [Open-Meteo](https://open-meteo.com/) API (no API key required), fetched via
a small `useState`/`useEffect` hook — a single non-paginated request for one fixed location
doesn't need a caching/dedup library, so loading/error state is handled directly rather than
pulled in from one.

**Hours spent:** 9.5

**DevLog:**
- **Friday 14-08-2026 (2.5 hrs):** Added openMeteo.ts API fetch calls, weatherMapping and wrote tests for these. Added useWeather hook and set up TanStack Query for robust but seamless state management.
- **Saturday 15-08-2026 (7 hrs):**
  - Set up the useWeather hook with TanStack Query initially, then evaluated it against
    the actual scope. In a single non-paginated fetch with nothing to cache or dedupe
    against, TanStack Query is a little overkill. I therefore reverted to a plain useState/useEffect hook instead, keeping the same fetch/mapping architecture I had already established, underneath.
  - Built the loading/error/empty state components (LoadingState, ErrorState, EmptyState)
    and wired them into a shell based on the hook's state.
  - Added a reserved `insight: string | null` field to WeatherData, laying the groundwork
    for the LLM stretch feature without implementing it yet. This ensure that if time allows it, the fuoundation is already set up which would make it more seamless to integrate if time allows it.
  - Designed the color system: per-condition accent tokens verified against industry standard WCAG 1.4.11 contrast in both light and dark mode, dark mode wired to OS preference. Toggle would be implemented at a later time if time would allow it.
  - Built conditionMeta (icon/label/color lookup), the CurrentWeather hero component, and
    ForecastDayCard/ForecastList, wired into the dashboard layout.
  - Reworked the data layer to add hourly forecast, real-feel temperature, UV index, and
    chance-of-rain, extending the mapper with tests for the new fields.
  - Swapped the icon set from Lucide to Meteocons for a more illustrated, weather-specific
    look.
  - Cleaned up repo hygiene along the way: removed stray package files, fixed
    broken links between the second-brain docs and closed a gap in .gitignore.
- **Sunday 16-08-2026 (in progress):**
  - Redesigned the dashboard into five components
  (WeatherHero, TodayForecastStrip, AirConditions, WeeklyForecast, WeatherInsight slot)
  arranged in a responsive CSS grid with named areas, matching a reference layout.
  - Deployed to Vercel.
  - Updated the README.md with devlog progress updates, as I accidentally forgot to do it along the way. Turns out it's quite painful writing a devlog after implementation, as I had to look through my entire commit history to remember everything.
  [Update this line at end of day with final hours + remaining work:
  responsive/accessibility pass, security checklist, README finalization.]

## Running locally

```bash
npm install
npm run dev
```

Other scripts:

```bash
npm run build    # type-check and produce a production build
npm run preview  # preview the production build locally
npm run lint      # run ESLint
npm test         # run the unit test suite (Vitest)
npx vitest run --coverage # to see code coverage. will prompt a package install.
```

No environment variables or API keys are required, as Open-Meteo's forecast endpoint is public.

## Testing

Unit tests use [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/).
15 test files across the data layer, dashboard components, and app states:

- **`src/api/weatherMapper.ts`** — the pure mapping logic (WMO weather-code → app-level
  condition, and the Open-Meteo response → `WeatherData` shape), since that's where a silent
  bug would show the wrong weather to a user without any type error to catch it.
- **`src/api/openMeteo.ts`** — the fetch layer's error handling, via a mocked `fetch`: the
  non-`ok` response path, malformed/non-JSON response bodies, and the request timeout.
- **`src/hooks/useWeather.ts`** — the hook itself, via `renderHook` and a mocked `fetch`: the
  loading → success transition, the loading → error transition, and that `refetch()` re-runs
  the fetch.
- **`src/lib/date.ts`** — the local-date/weekday/hour formatting helpers, including the
  UTC-boundary regression guards called out in their own doc comments.
- **Dashboard components** (`src/components/dashboard/`) — `conditionMeta` (icon/label lookup
  for every `WeatherCondition`), `WeatherHero` (temperature/condition rendering), `WeatherInsight`
  (renders nothing when `insight` is `null`, renders the text when present), `TodayForecastStrip`,
  `AirConditions`, `WeeklyForecast` + `ForecastDayRow` (today moved to the front of the list and
  given the `--primary` accent, regardless of its position in the raw API response), and
  `WeatherDashboard` (the loading/error/empty/loaded state switch itself).
- **App states** (`src/components/state/`) — `LoadingState`, `ErrorState` (including the retry
  callback), `EmptyState`.

```bash
npm test
```

## File structure

```
src/
  api/
    openMeteo.ts             # Fetches raw forecast data from the Open-Meteo API for Aarhus (timeout + error handling)
    openMeteo.test.ts        # Unit tests for the fetch layer's error/timeout handling
    weatherMapper.ts         # Maps the raw Open-Meteo response into app-level WeatherData/WeatherCondition types
    weatherMapper.test.ts    # Unit tests for the mapping logic above
  components/
    dashboard/
      WeatherDashboard.tsx        # Switches between loading/error/empty/loaded states based on useWeather
      WeatherDashboard.test.tsx
      DashContent.tsx              # Assembles the five dashboard components into the named-area CSS grid
      WeatherHero.tsx               # Hero card: city, temperature, condition icon, wind/humidity
      WeatherHero.test.tsx
      WeatherInsight.tsx            # LLM-insight display slot; renders null until that field is populated
      WeatherInsight.test.tsx
      TodayForecastStrip.tsx        # Horizontally scrollable hourly forecast (CSS scroll-snap, no JS)
      TodayForecastStrip.test.tsx
      AirConditions.tsx             # Real feel / wind / chance of rain / UV index stat grid
      AirConditions.test.tsx
      WeeklyForecast.tsx            # 7-day forecast card; sorts today to the front of the list
      WeeklyForecast.test.tsx
      ForecastDayRow.tsx            # Single day row rendered by WeeklyForecast
      ForecastDayRow.test.tsx
      conditionMeta.ts               # Single source of truth: WeatherCondition -> icon/label/accent color
      conditionMeta.test.ts
    state/
      LoadingState.tsx
      LoadingState.test.tsx
      ErrorState.tsx                # Renders the fetch error with a retry button
      ErrorState.test.tsx
      EmptyState.tsx                # Defensive fallback for a successful-but-dataless fetch
      EmptyState.test.tsx
    ui/
      button.tsx              # Shadcn-generated UI primitives
      card.tsx
      alert.tsx
      skeleton.tsx
  hooks/
    useWeather.ts             # Plain useState/useEffect hook composing openMeteo + weatherMapper for components to consume
    useWeather.test.ts        # Unit tests for the hook's loading/error/refetch behavior
  lib/
    constants.ts              # Shared constants (e.g. fetch timeout, hourly forecast count)
    utils.ts                  # Shared helpers (e.g. Shadcn's `cn` class-name merge utility)
    date.ts                   # Local date/weekday/hour formatting, deliberately avoiding UTC-shift bugs
    date.test.ts
  test/
    setup.ts                  # Testing Library / Vitest environment setup
  App.tsx                    # Root layout: full-viewport container wrapping WeatherDashboard
  main.tsx                   # React entry point
  index.css                  # Global styles, design tokens, and the dashboard's named-area grid CSS
```

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
