---
name: restyle
description: Change the visual direction of an existing UI (or bring it onto a consistent design system) without breaking behavior — set direction, define or remap tokens, migrate components, and verify nothing regressed. Run as /restyle <direction or reference>.
argument-hint: <direction, e.g. "calmer and more premium", "match our marketing site", "dense like a dev tool">
disable-model-invocation: true
---

# /restyle

Restyle toward: **$ARGUMENTS**

Restyling changes how the UI looks, not what it does. Behavior, states, copy, and accessibility must be at least as good afterwards as before.

## 1. Baseline

- Read `DESIGN.md` and the token sources (`ux-design-system` discovery step). Inventory hard-coded values in the files in scope.
- If the app can run, dispatch **ux-reasoning:ux-visual-verifier** to capture "before" screenshots of the main screens at phone and desktop widths in each theme. These are the regression reference.

## 2. Direction

Use `ux-visual-direction`: translate the request into two or three adjectives plus an anti-adjective, then make one explicit decision per axis (type, color, shape, depth, space, icons, imagery, motion, voice). Present these decisions in a short table and, if the change is large or the request was vague, ask for confirmation before editing many files.

## 3. Tokens first

- Express the new direction as changes to semantic tokens (color roles, type scale, radius, elevation, spacing, motion) in the token source — light and dark.
- Check every text/background role pair for contrast (≥ 4.5:1 body text, ≥ 3:1 large text and UI parts).
- Prefer remapping existing semantic tokens to renaming them, so components change automatically.

## 4. Migrate components

- Replace hard-coded values with tokens in the components and screens in scope.
- Adjust component variants only where the direction requires it (for example, flat surfaces instead of shadows).
- Do not change component behavior, props, copy, or state handling as part of a restyle. If you find a UX bug along the way, note it for the report rather than mixing it in, unless it is a one-line accessibility fix.

## 5. Verify

- Run the project's checks (type check, lint, tests, build, visual-regression tests if present).
- Capture "after" screenshots at the same viewports and themes; compare with the baseline for regressions: overflow, truncation, lost focus rings, contrast drops, misaligned layouts, missing states.
- Confirm focus-visible styles, hover/active/disabled states, and reduced-motion behavior survived.

## 6. Record

Update `DESIGN.md` with the new direction, token values, and any changed component rules (create it from the `ux-design-system` template if it does not exist).

## Final reply

- Direction table (axis → decision).
- Token changes and files migrated.
- Before/after screenshot paths, if captured.
- Contrast results and other checks run.
- Behavior or UX issues noticed but intentionally not changed.
