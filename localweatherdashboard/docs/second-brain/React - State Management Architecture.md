# React: State Management & Testability

Reference for choosing and structuring state management in a React project — take-home assessments included, where the choice itself is often part of what's being evaluated.

## First split: server state vs. client state

The single most impactful architectural decision, before picking a library: **don't put fetched API data into the same store as UI state.**

- **Server state** (anything that originates from an API: lists, records, anything with staleness/caching concerns) → a data-fetching library (TanStack Query, SWR, RTK Query). These handle caching, refetching, loading/error states, and deduplication for you — reimplementing this by hand in Redux/Zustand is wasted effort and a common source of stale-data bugs.
- **Client/UI state** (form state, modal open/closed, selected tab, optimistic-only local state) → local `useState`/`useReducer` if it's local to one component tree, or a lightweight global store if it's genuinely cross-cutting.

A codebase that manually copies fetched data into Redux and manages its own loading/error booleans is usually solving a problem a data-fetching library already solved — worth naming this explicitly in a take-home if you see it, and avoiding it in your own work.

## Choosing a client-state library

| | Zustand | Redux Toolkit | MobX | Context + useReducer |
|---|---|---|---|---|
| Boilerplate | Minimal | Moderate (less than classic Redux, still has actions/slices) | Low, but relies on decorators/proxies | Minimal, but scales poorly past a few values |
| Testability | Store is a plain function — call it directly in a test, no provider needed | Reducers are pure functions — trivially unit-testable in isolation | Requires understanding observable/reaction semantics; testing side effects needs care | Requires rendering with a provider wrapper to test consumers |
| Re-render control | Selector-based, fine-grained by default | Selector-based via `useSelector`, fine-grained with care | Automatic fine-grained via observables | Coarse — any context value change re-renders all consumers unless split carefully |
| Best fit | Small-to-mid apps, take-homes, teams that want low ceremony | Larger teams, complex state graphs, need for strict structure/devtools/time-travel debugging | Teams comfortable with OOP/reactive patterns, class-based domain models | Rarely-changing, narrowly-scoped global values (theme, auth session) |

**Default recommendation for a take-home assessment**, absent other constraints: TanStack Query for server state, Zustand for any genuinely global client state, plain `useState` for everything local. It's fast to set up, easy to justify in a README, and every piece of it is independently testable without a provider tree. In this case, after closely evaluating, it was removed for this scope, but would reintroduce if the app grew multiple queries or needed background refetch.

**Reach for Redux Toolkit instead when:** the assessment explicitly signals team-scale concerns (many contributors, need for predictable state shape, devtools/time-travel debugging as a stated requirement) — it's a reasonable, defensible choice to name even if you don't have time to fully wire it up.

**Reach for MobX when:** the domain is naturally modeled as classes with computed properties, or the existing codebase already uses it — introducing it fresh for a take-home is rarely the right call given the setup cost.

## Testability by store shape

- **A Zustand store is just a function returning state + actions** — test it directly, no rendering required:

```ts
import { create } from 'zustand';

interface CartState {
  items: string[];
  addItem: (id: string) => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (id) => set((s) => ({ items: [...s.items, id] })),
}));

// Test — no provider, no render
test('addItem appends to items', () => {
  useCartStore.getState().addItem('sku-1');
  expect(useCartStore.getState().items).toEqual(['sku-1']);
});
```

- **A Redux slice/reducer is a pure function** — call it with an action and assert the output, no store instantiation needed for the reducer logic itself:

```ts
test('addItem action appends to items', () => {
  const next = cartReducer({ items: [] }, addItem('sku-1'));
  expect(next.items).toEqual(['sku-1']);
});
```

- **Context-based state needs a render** to test any consumer, because the value only exists inside a provider tree — this is the main testability cost of Context relative to a standalone store, and worth weighing even for "just one value."

## Separation of concerns inside the state layer

- **Selectors/derived values live next to the store, not recomputed ad hoc in components.** If two components independently compute "is the cart empty," that logic belongs in one selector.
- **Actions/mutators are the only way state changes** — no component should reach in and mutate store state directly, even where the library technically allows it (easy to do accidentally with Zustand's `set` if you're not careful, or with MobX observables).
- **Business logic (validation, calculations) belongs in the store/service layer, not in the component calling it** — if you can't test the logic without rendering a component, it's in the wrong layer.

## Anti-patterns to catch in review

- Storing derived data instead of computing it (`isCartEmpty: boolean` kept in state and manually kept in sync, instead of a selector `items.length === 0`) — a classic source of state that silently goes stale.
- Fetched API data duplicated into global client state instead of owned by a data-fetching library — leads to hand-rolled cache invalidation bugs.
- One giant global store holding everything (all server data, all UI state, all form state) — defeats fine-grained re-render control and makes any single piece harder to test in isolation.
- Business logic living inside a component's event handler instead of a store action — untestable without rendering the component, and unreusable if the same action is needed elsewhere.
- Context used for frequently-changing, high-frequency state (e.g. a value that updates on every keystroke or animation frame) — causes broad re-renders that a selector-based store would avoid.

## Related

- [Project AI coding context](../../CLAUDE.md)