## What I'd do with more time

- **Offline mock-data fallback replaced `ErrorState` in the live UI, rather than sitting
  alongside it.** The brief requires "loading and error states" as a base requirement, and
  the stretch idea list separately calls out "offline mock data fallback." Rather than build
  both as competing UIs, I treated the fallback banner (`FallbackBanner`, "Showing sample data —
  live weather unavailable" + Retry) as the error state: on a fetch/mapping failure, `useWeather`
  now returns a static mock `WeatherData` fixture with `isFallback: true` instead of an `error`,
  and `WeatherDashboard` renders the full dashboard with the banner on top instead of a blank
  error screen. This satisfies the "error state" requirement (the failure is communicated, with
  a retry action) while also being the richer, more usable outcome for the person looking at the
  dashboard. `ErrorState.tsx` and its test are left in the repo, unused but intact, as evidence
  the original error-state UI was built before being superseded — a straightforward answer if
  asked "where did error handling go" in review.
- **The fallback banner's retry inherits the same "always blanks to full `LoadingState`" gap
  described below for `refetch()`.** Clicking Retry on the banner re-triggers the real fetch via
  the same `refetch()` path, so it briefly shows the full-page loading skeleton rather than an
  in-place indicator over the existing (sample) content — same root cause, same fix if pursued
  (an `isRefetching` flag).
- **No distinction between initial load and a refetch**: `useWeather`'s `refetch()` sets
  `isLoading` back to `true` the same way the initial mount does, so calling it (e.g. from
  `ErrorState`'s retry button) always shows the full-page `LoadingState` again rather than an
  in-place spinner over the existing content. There's no manual "refresh" action anywhere in
  `DashContent` yet, so this hasn't mattered in practice — retrying from an error state has
  nothing on screen to preserve anyway. If a manual refresh button is added to `DashContent`
  later, I'd add a separate `isRefetching` flag (true only when `data` is already set) so a
  refetch can show a subtle in-place indicator instead of blanking the screen.

- **`EmptyState` is effectively unreachable given current types**: `mapOpenMeteoResponse` always
  returns a `WeatherData` object when the fetch succeeds, so `!data` after a successful,
  non-pending query shouldn't fire in practice. It's defensive coverage for a shape the types
  don't currently allow to go missing, kept because silently returning `null`/nothing felt worse
  than an unreachable-but-handled branch — not a state I expect to see in the running app.

- **"Today" is computed from the viewer's local clock, not Aarhus's:** WeeklyForecast calls `toLocalDateString()` (browser-local `Date`) to decide which forecast day is "today," while
  `ForecastDay.date` itself comes from Open-Meteo pre-localized to Europe/Copenhagen
  (`timezone=auto`). For a viewer physically in or near Aarhus this always matches. For a viewer
  in a very different timezone, the two clocks could disagree for a window around midnight (e.g.
  a US-based viewer's browser could still say "today" is one date while Aarhus has already
  rolled over). Fixing this properly means computing "today" in Europe/Copenhagen specifically
  (e.g. via `Intl.DateTimeFormat` with a fixed `timeZone`) rather than the browser's local zone —
  skipped as a deliberate simplification since the dashboard's audience is assumed to be
  Aarhus-local.

- **Weather icons always use the Meteocons "-day" variant, never "-night"**: `conditionMeta.ts`
  hardcodes e.g. `clear-day`/`thunderstorms-day` regardless of the actual time of day in Aarhus,
  since neither `OpenMeteoResponse` nor `WeatherData` currently tracks `is_day` (Open-Meteo
  exposes it as `current.is_day` — a simple boolean, not yet requested). Not a bug: it's a
  correct rendering of an incomplete input, not a visual glitch. I'd add `is_day: boolean` to
  `current` (both the raw type and `CurrentWeather`), request `is_day` alongside the existing
  `current` params, and give `conditionMeta` a second parameter to pick the "-day"/"-night" slug
  variant — a small, additive change to the same pattern already used for `feelsLikeC`/etc.

- **SEO work was deliberately capped at meta description, title, OG/Twitter tags, and
  `robots.txt`.** A `sitemap.xml`, a web `manifest.json`, and JSON-LD structured data would all
  be normal next steps, but none of them move the needle for a single-page, no-routes,
  no-installable-app take-home — they're the kind of thing I'd add for a real multi-page site,
  not chase here just to pad out the checklist.

- **The accessibility pass fixed what Lighthouse's audit flagged (contrast + list-structure),
  not a full manual accessibility sweep.** I didn't separately verify keyboard-only navigation,
  focus-ring visibility/order, or screen-reader semantics beyond what the fixed markup and
  Shadcn's primitives already provide. Given this company weighs accessibility highly, a
  proper pass with more time would be a manual keyboard walkthrough plus an automated sweep
  with something like `axe-core` — Lighthouse's accessibility audit checks a meaningful but
  partial slice of WCAG, not the whole thing.

- **No flash-prevention script for the theme toggle, so every reload briefly paints in
  light-mode CSS variables regardless of the stored/system preference.** `useTheme`
  (`src/hooks/useTheme.ts`) applies the `.dark` class to `<html>` from inside a post-mount
  `useEffect`, which only runs after React's first commit — but `index.html` has no inline
  `<script>` in `<head>` to set that class synchronously before first paint. So a user with
  dark mode selected still sees a light-styled flash (including the initial `LoadingState`
  skeletons) for one frame on every reload, before the effect flips the class. This is what
  made the skeleton-contrast bug (light-mode `--muted` equaling `--background`, now fixed via
  a dedicated `--skeleton` token) show up "on reload" even for dark-mode users. Proper fix:
  a small blocking inline script in `index.html`'s `<head>` that reads `localStorage["theme"]`
  (and `matchMedia` for `"system"`) and sets `.dark` on `<html>` before the stylesheet paints —
  the standard pattern used by libraries like `next-themes`. Skipped for now since it's a
  separate, slightly bigger change (touches `index.html`, outside the component tree) than the
  color-token fix, and was explicitly scoped out when the contrast bug was diagnosed.

## Trade-offs & Future Improvements

If I had more time, here is what I would prioritize to take this dashboard from a solid prototype to production-ready:

### 1. State Management & UX
* **Graceful Degradation vs. Hard Errors:** The brief asked for an "error state." Rather than building a blank error screen, I opted for a better UX: if the live fetch fails, the app falls back to offline sample data and displays a `FallbackBanner` with a retry button. This satisfies the error handling requirement while keeping the app functional. *(Note: The original `ErrorState.tsx` is still in the repo as evidence of the first iteration).*
* **Inline Refetching:** Currently, triggering a refetch (e.g., clicking "Retry" on the fallback banner) sets `isLoading` to true, which triggers the full-page loading skeleton. I would improve this by introducing a distinct `isRefetching` flag so the app can show a subtle inline spinner instead of unmounting the existing UI.
* **Defensive Empty States:** The `EmptyState` component is essentially unreachable right now. The data mapping layer is strict—it either returns a fully formed `WeatherData` object or throws an error. I left the component in defensively in case the API response shape changes unexpectedly, as that felt safer than failing silently.

### 2. Data & Localization
* **Strict Timezone Handling:** "Today" is currently calculated using the viewer's local browser clock (`toLocalDateString()`). Since the Open-Meteo data is pinned to Aarhus (`Europe/Copenhagen`), a user viewing the app from a vastly different timezone might see a mismatched "Today" if they check around midnight. The fix is to force `Intl.DateTimeFormat` to use `Europe/Copenhagen` rather than the browser's local zone. 
* **Day/Night Icon Variants:** The weather icons currently default to their daytime variants (e.g., `clear-day`). Open-Meteo provides an `is_day` boolean that I haven't requested yet. Hooking this up is a straightforward additive change: request the flag, add it to the `WeatherData` type, and update `conditionMeta.ts` to toggle between the `-day` and `-night` SVGs.

### 3. Tech Debt & Polish
* **Preventing the Theme FOUC:** Dark mode currently applies via a `useEffect` on mount. This causes a single-frame "flash of unstyled content" (FOUC) where the light theme renders before flipping to dark. To fix this, I would add a blocking inline script to the `<head>` of `index.html` to parse `localStorage` and `matchMedia` before the first paint (similar to how `next-themes` handles it).
* **Accessibility Deep Dive:** I resolved all contrast and structural issues flagged by Lighthouse, and the UI relies heavily on accessible primitives. However, Lighthouse only catches a fraction of WCAG requirements. A true production pass would include manual keyboard-navigation testing and a deep sweep using `axe-core`.
* **Pragmatic SEO:** Basic SEO (meta description, title, OG/Twitter tags, `robots.txt`) is done. I deliberately skipped adding a `sitemap.xml`, web `manifest.json`, and JSON-LD structured data, as those felt like overkill for a single-page assessment app.