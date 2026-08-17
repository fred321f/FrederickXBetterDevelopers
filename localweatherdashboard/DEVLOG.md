# DevLog

- **Friday 14-08-2026 (2.5 hrs):**
  - Added openMeteo.ts API fetch calls, weatherMapping and wrote tests for these.
- **Saturday 15-08-2026 (7 hrs):**
  - Set up the useWeather hook with TanStack Query initially, then evaluated it against
    the actual scope. In a single non-paginated fetch with nothing to cache or dedupe
    against, TanStack Query is a little overkill. I therefore reverted to a plain useState/useEffect hook instead, keeping the same fetch/mapping architecture I had already established, underneath.
  - Built the loading/error/empty state components (LoadingState, ErrorState, EmptyState)
    and wired them into a shell based on the hook's state.
  - Added a reserved `insight: string | null` field to WeatherData, laying the groundwork
    for the LLM stretch feature without implementing it yet. This ensures the foundation is already in place, so integrating the actual LLM call later is a smaller addition rather than a large restructure.
  - Designed the color system: per-condition accent tokens verified against industry standard WCAG 1.4.11 contrast in both light and dark mode, dark mode wired to OS preference. Toggle would be implemented at a later time if time would allow it.
  - Built conditionMeta (icon/label/color lookup), the CurrentWeather hero component, and
    ForecastDayCard/ForecastList, wired into the dashboard layout.
  - Reworked the data layer to add hourly forecast, real-feel temperature, UV index, and
    chance-of-rain, extending the mapper with tests for the new fields.
  - Swapped the icon set from Lucide to Meteocons for a more illustrated, weather-specific
    look.
  - Cleaned up repo hygiene along the way: removed stray package files, fixed
    broken links between the second-brain docs and closed a gap in .gitignore.
- **Sunday 16-08-2026 (8.5 hrs):**
  - Redesigned the dashboard into five components
  (WeatherHero, TodayForecastStrip, AirConditions, WeeklyForecast, WeatherInsight slot)
  arranged in a responsive CSS grid with named areas, matching a reference layout.
  - Deployed to Vercel.
  - Updated the README.md with devlog progress updates, as I accidentally forgot to do it along the way. Turns out it's quite painful writing a devlog after implementation, as I had to look through my entire commit history to remember everything.
  - Ran a security check as according to my custom security checklist of `localweatherdashboard\docs\second-brain\Security Checklist.md`
  - Ran a desktop Lighthouse audit and used it to drive a targeted accessibility + SEO pass:
    - Raised text contrast (`--muted-foreground` in both light/dark themes) to clear WCAG AA
      4.5:1 against every background it's rendered on, fixing every "insufficient contrast"
      finding without changing the underlying color palette.
    - Converted the `dl`/`dt`/`dd` stat blocks in `AirConditions` and `WeatherHero` to plain
      `div`s — they were stat tiles, not real definition-list content, and the mis-nested markup
      was failing Lighthouse's list-structure audit.
    - Added a meta description, a descriptive `<title>`, Open Graph/Twitter tags, `robots.txt`,
      and an `llms.txt` (a small file some LLM/agent crawlers read for a curated site summary —
      not a scored Lighthouse audit, but cheap and increasingly standard).
  - Fixed a real mobile bug found in devtools' phone emulation: the page could be dragged
    horizontally into blank space. Root cause was two-fold — `overflow-x: clip` on
    `html`/`body`/`#root` doesn't reliably block touch/rubber-band scroll the way
    `overflow-x: hidden` does, and `.dashboard-grid`'s implicit single mobile column had no
    `min-width: 0`, so it could grow past the viewport to fit its widest child (the hourly
    forecast strip). Fixed both, alongside a broken/half-applied className left on
    `WeatherHero`'s `CardContent` from an earlier edit pass.
  - Reworked `LoadingState` to reuse the real `.dashboard-grid` layout (one skeleton block per
    grid area, sized to roughly match its real region) instead of an unrelated
    flex/grid-cols-7 placeholder — loading and loaded states now share the same shape instead
    of jumping.
  - Fixed `ErrorState`'s layout: it was stretching to fill the full dashboard height, which
    spread its icon/title/message/button apart into an oddly empty-looking card. Centered it as
    a compact card instead, matching `EmptyState`'s existing pattern.
  - Implemented `ThemeToggle` logic as mentioned in the DevLog of Saturday. The user can now switch between dark mode, light mode and system preference in a three-stage state machine implemented in `localweatherdashboard\src\components\ThemeToggle.tsx`.