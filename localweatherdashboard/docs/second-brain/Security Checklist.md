# Security Checklist

A pre-submission gate for take-home assessments, and a periodic pass on real projects. Run through it by testing each item, not by remembering that you meant to.

## Auth

- [ ] **Every non-public route actually has auth middleware attached in the route definition**, not just written somewhere in the codebase. A middleware file existing proves nothing — grep every route registration and confirm the middleware is in the call itself.
- [ ] **The user ID used for authorization comes from the verified token**, never from a client-supplied header, query param, or body field. If two different code paths can both resolve "who is this request," one of them is a bypass.
- [ ] Any "resolve the current user" logic is a single shared function, imported everywhere — not reimplemented per file. Reimplementations drift silently (see `code-smells-under-pressure.md`).

## Secrets

- [ ] No `process.env.SECRET || 'fallback-string'` pattern anywhere. A missing required env var should crash the app at startup, not silently degrade to a guessable default.
- [ ] `.env`, `.env.*.local`, and any DB dump/export files are in `.gitignore` **before** the first commit that could contain them.
- [ ] Before submitting a take-home, scan git history for leaked secrets (`git log --all -p | grep -i "secret\|password\|api_key"` or a proper scanner) — a later "fix" commit doesn't remove something from an earlier one.

## Data in the repo

- [ ] No real database dumps, exports, or seed files containing real user data (emails, hashes, PII) get committed. Use synthetic/generated seed data for local dev.
- [ ] If a dump is genuinely needed for local setup, it lives in a gitignored folder with a README explaining how to regenerate it — never committed as-is.

## File uploads

- [ ] Uploads are validated by **content type**, not just filename/extension, against an explicit allowlist.
- [ ] Any upload/download/delete path built from user input is checked against the intended root directory (`path.relative(root, resolved)` shouldn't start with `..`) before touching disk.
- [ ] Nothing that accepts arbitrary uploads writes into a directory that's also served statically, unless auth and type validation are both airtight.

## Transactions & concurrency

- [ ] Multi-statement writes wrapped in a transaction use **one dedicated connection** for the whole sequence, never bare connection-pool calls in between statements.
- [ ] Anything claimed, redeemed, or consumed exactly once (codes, coupons, single-use tokens, seat reservations) locks the relevant row inside that transaction before checking its state.

## Before submitting a take-home specifically

- [ ] No debug/bypass flags (permissive CORS, auth skip, verbose error dumps) that default to "on" or are one missing env var away from being on in a real deployment.
- [ ] Final pass for leftover `console.log`/`print` of tokens, full user objects, or raw SQL params — reads as sloppy even when harmless.
- [ ] `.gitignore` covers: `.env*`, `*.sql`/`*.dump`, `/uploads` or equivalent, local key/cert files, IDE folders.
- [ ] README states clearly how to run it, what env vars are required, and what's intentionally out of scope given the time box — reviewers read this first.

## Related

- [Code Smells Under Pressure](./code-smells-under-pressure.md)
- [Project AI coding context](../../CLAUDE.md)