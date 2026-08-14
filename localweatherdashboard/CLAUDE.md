# Frederick's Better Developers Take Home assessment | AI Coding Context

## Context

- **Company:** BETTER DEVELOPERS
- **Problem to solve:** We at Better Developers love to be prepared. However, we’re tired of unexpected downpours and arriving at the office soaking wet. Your mission is to help us get ahead of the weather. Build a dashboard that shows the current weather and a 7-day forecast for Aarhus.
    - Problem requirements:
        - Current weather (temperature, condition, humidity, wind speed).
        - Forecast for the next 7 days.
        - Loading and error states.
        - Runs locally with one command.
    - Stretch ideas:
        - LLM Integration, assessing the weather.
        - Dark/light mode toggle.
        - Offline mock data fallback.

- **Timebox:** Take home with **logged** hours, no hard limit, but time is actually looked at.
- **Stack:** Vite React App using Open Meteo for weather fetching. Shadcn for styling.

## How I work with Claude here

- Proceed autonomously on implementation details, naming, file structure, and routine CRUD/UI work. **Stop and ask before**: introducing a new dependency, changing the data model/schema, picking a state-management or architectural pattern, or anything else that's expensive to reverse later. Always shpw diff after succesful implementation.
- I need to be able to explain everything that ships here — in a code review, in an interview, anywhere. Don't just write correct code silently:
  - After any non-trivial feature, or whenever you make a non-obvious choice (a library, a pattern, a tradeoff), give me a short plain-English summary of **what you did and why** — not just a diff.
  - If you reach for something I might not know well, say so in one sentence so I know to go learn it, not just accept it.
  - If something feels "too clever," prefer the more explainable option even if it's slightly less elegant. I'd rather defend a simple decision than fumble a clever one.
  - If anything is added that should be in the readme.md for this take home assessment, make sure to add it to the readme and inform me.

## Take-home / assessment mode

If this project is a timed assessment:

- Default to full feature completeness, built to the standard in this file — not a polished corner next to an unfinished core.
- If time runs out before something is done, don't silently skip it. Log it in `NOTES.md`:
  ```
  ## What I'd do with more time
  - [Thing skipped]: why it's missing, and specifically what I'd build instead with another hour.
  ```
  This is what gets said out loud in the interview, so it has to be accurate and specific — "I'd add more tests" isn't enough; "I'd add integration tests for the checkout flow, since that's the highest-risk logic" is.
- Never mark something as done, tested, or handled if it isn't. I'd rather know exactly where the gaps are than get caught by one live.

## Non-negotiables

### Security
- Auth middleware must be wired to every route that needs it — not just written. No falling back to a client-supplied header for identity.
- No hardcoded secrets, no `process.env.X || 'fallback'` for anything security-relevant.
- No real data (DB dumps, seed files with PII) ever committed. `.env*` gitignored before the first commit.
- Full checklist: [[Security Checklist]]

### Code quality
- No spammy block/banner comments (`// ----------`). Document functions with `@param`/`@return` where the signature isn't self-explanatory, not with decorative dividers.
- Don't copy-paste a helper into multiple files — extract and import it. If you're about to retype logic already written elsewhere in this session, stop and reuse it instead.
- Any multi-statement DB transaction uses one bound connection for the whole sequence, never separate pool calls.
- Full list of pressure-tested anti-patterns: [[Code Smells Under Pressure]]

### Testing
- Business logic, calculations, and validation rules get unit tests — test-first where practical, since it forces a cleaner function signature before it's locked in.
- UI layout/styling can be tested after, or explicitly logged as skipped under Take-home mode above.
- Stack-specific testability rules: [[Angular - Testable Architecture]] or [[React - State Management Architecture]] (whichever fits this project's stack)

## Architecture for this project

SPA with third party API OpenMeteo, using an LLM for short 

## Reference

- [Security Checklist](./docs/second-brain/Security%20Checklist.md)
- [Code Smells Under Pressure](./docs/second-brain/Code%20Smells%20Under%20Pressure.md)
- [Patterns Worth Keeping](./docs/second-brain/Patterns%20Worth%20Keeping.md)
- [React - State Management Architecture](./docs/second-brain/React%20-%20State%20Management%20Architecture.md)