---
name: ux-intent
description: "Load before building or redesigning any screen, page, dialog, or multi-step flow, especially from a vague request like \"build a settings page\" or \"add a dashboard\". Establishes who the UI is for, the one job, the primary action, the data shape, and risky actions as a short UI brief that later design decisions are checked against."
---

# UX Intent

Most bad UI comes from building the wrong thing well. Before choosing components or styles, pin down the job the interface does. This takes a minute and is the input every other `ux-*` skill depends on.

## Answer these from the request and the codebase first

Read the request, the surrounding code, routes, data models, and any `DESIGN.md` / `AGENTS.md` / `CLAUDE.md`. Fill in what you can before asking anything.

| Question | Why it matters | Where to look |
|---|---|---|
| Who uses this, and how often? | Daily power users want density and shortcuts; occasional users want guidance and defaults | Auth roles, existing screens, product copy |
| What is the one job they came to do? | Decides the primary action and what gets visual priority | Request wording, route name, the data being shown |
| What do they do immediately before and after? | Decides entry points, back paths, and what state to carry over | Router, links into and out of the screen |
| What data does it show, and how much? | 0 / 1 / 10 / 10,000 items need different layouts | API types, DB schema, fixtures |
| What can go wrong? | Drives error, permission, and destructive-action design | API error types, auth checks, irreversible operations |
| Where is it used? | Phone in one hand, desktop with a mouse, a kiosk, a TV | Existing breakpoints, analytics notes, platform (web, Tauri, Electron) |
| What must it look like it belongs to? | Existing design system, tokens, components | `DESIGN.md`, theme files, Tailwind config, component library |

## Ask only what changes the design

Ask at most three questions, and only when the answer would change the layout, the primary action, or what is safe to do. For everything else, state the assumption in the brief and proceed. Good questions name the fork: "Is this used mostly on phones or desktops? It changes whether the table becomes cards." Weak questions ask for preferences you could infer: "What colors do you want?"

## Write the UI brief

Put the brief in your response (or in the PR description) before building. Keep it to roughly ten lines:

```text
UI brief — <screen name>
User:          <who, how often, expertise>
Job:           <one sentence, verb first>
Primary action: <the single most important thing to do here>
Secondary:     <2–4 supporting actions, ranked>
Data shape:    <entities, typical count, worst-case count>
Risky actions: <destructive or irreversible operations, if any>
Context:       <device/input, environment, entry and exit points>
Constraints:   <design system, framework, a11y target, performance>
Assumptions:   <what you inferred and did not ask>
```

## Checks before moving on

- The job is one sentence starting with a verb ("Find and reorder an invoice", not "Invoice management").
- There is exactly one primary action. If you cannot pick one, the screen is probably two screens.
- The worst-case data size is written down (it feeds `ux-states` and `ux-hierarchy`).
- Every risky action is listed (it feeds `ux-feedback`).

## Hand off

Continue with `ux-hierarchy` (what goes where), then `ux-states` (every state the screen can be in). If the request is a form, also use `ux-forms`.
