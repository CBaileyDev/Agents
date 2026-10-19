---
name: ux-design
description: Full design-then-build workflow for a new screen, component, or flow — brief, hierarchy, state matrix, forms, feedback, visual direction, implementation, then an independent audit and visual verification. Run as /ux-design <what to build>.
argument-hint: <what to build, e.g. "team settings page with member invites">
disable-model-invocation: true
---

# /ux-design

Design and build: **$ARGUMENTS**

Work through the phases in order. Keep each phase's written output short; the point is to make decisions explicit, not to produce documents. Show the outputs of phases 1–3 in your reply before writing code.

## Phase 1 — Brief

Use the `ux-intent` skill. Read `DESIGN.md`, `AGENTS.md`, and `CLAUDE.md` if present, plus the code around where this UI will live. Produce the UI brief. Ask up to three questions only if an answer would change the layout, the primary action, or what is safe to do; otherwise state assumptions and continue.

## Phase 2 — Structure

Use `ux-hierarchy`. Rank every element (primary / secondary / tertiary / remove), choose density, and sketch the layout as a short outline — regions in order, with the primary action named — for desktop and for phone (`ux-responsive`).

## Phase 3 — States and interactions

Use `ux-states` to write the state matrix. If there is a form, apply `ux-forms`. Use `ux-feedback` to decide the response for each action (optimistic or pessimistic, where feedback appears) and the safeguard for each risky action (undo, confirm, or type-to-confirm).

## Phase 4 — Visual decisions

If `DESIGN.md` or existing tokens exist, use them and do not introduce new values without adding them as tokens. If nothing exists, use `ux-visual-direction` to make and record one decision per axis, and offer to write `DESIGN.md` with `ux-design-system`. Add motion only where `ux-motion`'s purpose test passes.

## Phase 5 — Build

Implement with the project's framework, component library, and conventions. Use semantic elements and accessible primitives (`ux-accessibility`). Implement every state from the matrix, not just the ideal one, and make each state viewable (story, fixture, or dev toggle) if the project has a mechanism for it.

## Phase 6 — Verify

1. Run the project's own checks (type check, lint, tests, build).
2. If this plugin's agents are available, dispatch **ux-reasoning:ux-visual-verifier** to render the UI at phone and desktop widths, in light and dark themes, with a keyboard pass and an automated accessibility scan. If it cannot run the app, do the checks you can and say which were skipped.
3. Dispatch **ux-reasoning:ux-auditor** with the brief, the state matrix, and the changed files for an independent review. It has not seen your reasoning, which is the point.
4. Fix every S1 and S2 finding. Fix S3 findings that are cheap. List what remains.

## Final reply

- The UI brief and key decisions (a few lines).
- Files changed.
- States implemented (the matrix rows, each marked done or not applicable).
- Verification actually performed, with results, and what was not checked.
- Remaining findings, if any, with severity.
