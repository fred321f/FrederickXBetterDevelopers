# Local Weather Dashboard

Take-home assessment for Better Developers: a dashboard showing current weather and a 7-day
forecast for Aarhus, Denmark, built with Vite + React and styled with Shadcn/Tailwind. Weather
data comes from the [Open-Meteo](https://open-meteo.com/) API (no API key required).

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

Unit tests use [Vitest](https://vitest.dev/). The current suite covers the pure mapping logic
in `src/api/weatherMapper.ts` (WMO weather-code → app-level condition, and the Open-Meteo
response → `WeatherData` shape), since that's where a silent bug would show the wrong weather
to a user without any type error to catch it.

```bash
npm test
```

## File structure

```
src/
  api/
    openMeteo.ts           # Fetches raw forecast data from the Open-Meteo API for Aarhus
    weatherMapper.ts        # Maps the raw Open-Meteo response into app-level WeatherData/WeatherCondition types
    weatherMapper.test.ts   # Unit tests for the mapping logic above
  components/
    ui/
      button.tsx            # Shadcn-generated UI primitive
  lib/
    utils.ts                # Shared helpers (e.g. Shadcn's `cn` class-name merge utility)
  App.tsx                  # Root application component
  App.css
  main.tsx                 # React entry point
  index.css                # Global styles / Tailwind entry
```

This structure will grow as the dashboard UI, loading/error states, and any stretch features
(dark/light toggle, LLM weather commentary, offline mock fallback) are added.

## Scope notes

See `NOTES.md` (once present) for anything intentionally skipped or deferred given the take-home
timebox, and why.
