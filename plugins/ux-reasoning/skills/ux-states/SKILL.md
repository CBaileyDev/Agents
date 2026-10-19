---
name: ux-states
description: "Load before writing any UI component that fetches data, renders a list or table, submits an action, or depends on permissions. Defines every state the UI can be in instead of only the happy path: loading (with no-flash thresholds), three kinds of empty, error with retry, partial, offline, stale, permission-denied, and overflow."
---

# State Completeness

Agents build the screen as it looks with ideal demo data. Real users mostly see the other states: the first visit with nothing in it, the slow network, the failed request, the name that is 80 characters long. Each of those needs a deliberate design.

## Build the state matrix first

Before writing the component, list which of these states apply and what each one shows. Skip a row only when it truly cannot happen, and say why.

| State | Variants to consider | What to decide |
|---|---|---|
| **Ideal** | Typical data | The baseline layout |
| **Empty** | First use (nothing created yet) · User cleared everything · No results for a search or filter | Explain what goes here and offer the action that fills it. "No results" offers to clear the filter. Never a blank area |
| **Loading** | Initial load · Background refresh · Loading more (pagination) · An action in progress | Skeleton, spinner, or nothing (see thresholds below). Keep previous data visible during refresh |
| **Partial** | Some requests succeeded, some failed · Some fields missing | Show what loaded; mark the failed part with its own retry |
| **Error** | Network/timeout · Server (5xx) · Not found (404) · Forbidden (403) · Validation (4xx) · Rate limited | What happened in plain words, whether it was saved, and the next step (Retry, Go back, Contact). Keep the user's input |
| **Offline** | Lost connection mid-task | Say so, keep working copies locally if the app supports it, queue or block writes explicitly |
| **Stale** | Data older than the user expects · Someone else edited it | Timestamp or "Updated 5 min ago"; conflict message on save |
| **Permission** | Read-only role · Feature not in plan · Signed out | Hide or disable with an explanation; never let a user fill a form they cannot submit |
| **Overflow** | Very long text · Many items · Huge or zero or negative numbers · Translated strings ~30–40% longer · Missing image | Truncation with full text available (tooltip, title, detail view), wrapping rules, virtualization or pagination, fallbacks |
| **Single / boundary** | Exactly one item · Exactly the maximum | Singular grammar ("1 file"), disabled "add" at the limit with the reason |
| **Success** | Action completed | Confirmation proportional to the action (see `ux-feedback`) |

## Loading thresholds

Perceived speed depends on avoiding flashes as much as on raw latency:

- **Under ~300 ms**: show nothing new. A spinner that appears and vanishes reads as a glitch. Keep the previous content or a pending button state.
- **~300 ms – 2 s**: a skeleton that matches the final layout (same heights, so nothing jumps), or an inline spinner on the triggering control.
- **Over ~2–3 s**: say what is happening ("Importing 1,240 rows…").
- **Over ~10 s**: show determinate progress when you can measure it, let the user leave or cancel, and notify on completion.

Once a loading indicator appears, keep it up for at least ~500 ms so it does not flicker. Reserve space for content that loads in, so the layout does not shift (CLS).

## Empty states are onboarding

A good empty state has three parts: what this area is for (one line), why it is empty when that is not obvious, and the single action that fills it. Distinguish the kinds of empty, because they need different copy:

- First use: "No projects yet. Create one to start tracking time." → **New project**
- Filtered to nothing: "No invoices match 'acme' in March." → **Clear filters**
- Cleared by the user: "All caught up." with no call to action.

## Error copy

Answer three questions: what happened, is my data safe, what can I do now. Avoid codes and blame in the main message; put technical detail behind "Details" for support. Examples:

- Weak: "Error 500. Something went wrong."
- Strong: "We couldn't save your changes — the server didn't respond. Your edits are still here. **Try again**"

## Implementation patterns

- Model state explicitly instead of combining booleans: a discriminated union (`{status: 'idle' | 'loading' | 'error' | 'success'}`) or the query library's status (TanStack Query `isPending` / `isError` / `isFetching`, SWR, RTK Query, Apollo). `isLoading && !data` and `isFetching && data` are different states.
- Put an error boundary around each independently failing region so one failure does not blank the page.
- Keep previous data while refetching (`placeholderData: keepPreviousData` in TanStack Query) to avoid flashing back to a skeleton.
- Add fixtures or stories (Storybook, Ladle, a `?state=empty` dev toggle) for each matrix row so states can be viewed and reviewed directly.

## Checks

- [ ] The state matrix is written down, with skipped rows justified.
- [ ] Every empty state has a purpose line and, where relevant, an action.
- [ ] Every error message says what happened and offers a next step; input survives the error.
- [ ] Loading does not flash under ~300 ms and does not shift layout when content arrives.
- [ ] Long strings, zero, one, and many items were tried, not assumed.
- [ ] Each state can be shown directly (story, fixture, or dev toggle) for review.
