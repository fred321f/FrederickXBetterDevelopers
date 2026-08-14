# Code Smells Under Deadline Pressure

Patterns worth recognizing the moment they happen, not hypothetical best practices. Sometimes you genuinely have to make the tradeoff — the goal is that it's a conscious decision with a note attached, not an invisible one that becomes permanent.

## 1. "I'll just copy this function instead of importing it" (DRY Princilpe)

**What it feels like:** the function is small, the other file feels far away, importing means touching module boundaries you don't want to think about right now.

**Why it's dangerous, not just untidy:** copies drift. Two pasted versions of the same "get the current user" logic can end up checking different property names — both work in isolation, nothing forces them to stay in sync, and the divergence is invisible until something depends on it.

**The tell:** if you're about to type out logic you *know* exists elsewhere in the codebase, stop and import it. If the import path feels awkward, that's a signal to relocate the function to somewhere shared — not a reason to paste it.

## 2. "The transaction wraps it, so it's atomic" (without checking how)

**What it feels like:** `BEGIN` / `COMMIT` visually brackets the risky code, it compiles, it works in manual testing.

**Why it's dangerous:** with a connection pool, issuing `BEGIN` and each subsequent statement as separate pool-level calls can silently route them to different physical connections — it looks transactional and isn't.

**The tell:** for any multi-statement transaction, confirm your DB client gives you one bound connection/client for the whole sequence (`pool.getConnection()`, a checked-out client, an ORM's `$transaction`). If you're just calling the pool's query method repeatedly, it's decoration, not a guarantee.

## 3. "I'll leave the old version in, just in case" (Commenting out stuff instead of deleting it, or even leaving it in there because it doesn't break anything - yet)

**What it feels like:** you built a second implementation of something because the deadline didn't leave room to untangle the old one first. You mean to delete the old one later.

**Why it's dangerous:** later doesn't come. Two competing implementations of the same concern (two state stores, two upload flows) means anyone touching that area later has to trace imports to figure out which path is actually live.

**The tell:** if you're naming a new file `thingV2` or `newThing` "for now," delete or gut the old one in the same sitting — even if the replacement isn't fully polished. A half-finished single source of truth beats two finished competing ones.

## 4. "I tested it by clicking through it once" (WRITE A TEST PLAN FOR THE LOGIC)

**What it feels like:** the feature works, you verified it manually, writing automated tests feels like it's competing with actually shipping.

**Why it's dangerous:** manual verification doesn't survive the next change. A written manual test plan is genuinely useful, but it only protects you if a human remembers to re-run it — it doesn't run in CI on every push.

**The tell:** if a feature has branching logic worth writing a manual test plan for, it's worth a handful of fast unit tests on the pure logic underneath it (the calculation, the validation, the state transition) — that doesn't require a running server or DB and buys real regression protection cheaply.

## 5. "It's just a debug flag, I'll turn it off before deploying" 

**What it feels like:** you need to unblock local testing against auth or CORS right now, so you add an env-gated bypass.

**Why it's dangerous:** the bypass ships the moment someone forgets to unset the flag, or an `.env` gets copied wholesale between environments.

**The tell:** any bypass should be structurally impossible to leave on in production — gate it on `NODE_ENV !== 'production'` in code, not on a separately-set flag that has to be *remembered* to be unset.

---

### The 5-minute gut check before committing under deadline pressure

- Did I paste logic instead of importing it? → import it, or leave a dated TODO.
- Did I wrap multiple writes in a transaction? → confirm it's on one connection/client.
- Did I leave an old implementation next to a new one? → delete the old one now.
- Did I only test this by hand? → unit-test the pure logic underneath, at minimum.
- Did I add a bypass flag? → make it impossible to leave on in prod, not just off by default.

## Related

- [Security Checklist](./security-checklist.md)
- [Project AI coding context](../../CLAUDE.md)