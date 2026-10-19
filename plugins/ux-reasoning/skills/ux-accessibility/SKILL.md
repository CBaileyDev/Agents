---
name: ux-accessibility
description: "Load before building custom widgets (menus, dialogs, comboboxes, tabs, toolbars), icon-only buttons, or color and contrast choices, and for any accessibility review or focus bug. Applies WCAG 2.2 AA: semantic HTML, keyboard and focus management, accessible names, contrast, target size, motion, status announcements, and how to verify them."
---

# Accessibility

Accessibility is part of "works", not a later polish pass. The cheapest fixes happen while choosing elements, not after the screen is built.

## Order of preference

1. **Native HTML element** with the right semantics (`<button>`, `<a href>`, `<input>`, `<select>`, `<dialog>`, `<details>`, `<table>`, headings, landmarks).
2. **A maintained headless primitive** that already implements the ARIA pattern (Radix, React Aria, Base UI, Headless UI, Ark UI, Melt UI) when native elements cannot do the job.
3. **Hand-built ARIA widget**, following the WAI-ARIA Authoring Practices Guide pattern exactly — last resort. Incorrect ARIA is worse than none.

A `<div onClick>` is never a button: it is not focusable, not announced as a button, and ignores Enter and Space.

## Keyboard and focus

- Everything operable with a pointer is operable with a keyboard, in a logical tab order that follows the visual order. No positive `tabindex`.
- Focus is always visible: a clear `:focus-visible` outline with ≥ 3:1 contrast against adjacent colors (WCAG 2.4.7; AA 1.4.11 for contrast). Never `outline: none` without a replacement.
- Focus is not hidden behind sticky headers, footers, or cookie banners (WCAG 2.2 AA 2.4.11 Focus Not Obscured). Use `scroll-padding-top` for sticky headers.
- **Dialogs**: move focus into the dialog on open, trap it while open, close on Escape, and return focus to the trigger on close. Native `<dialog>` with `showModal()` does most of this.
- **Route changes in SPAs**: move focus to the new page's main heading (or announce the page title) so screen-reader users know the page changed.
- **Deleting the focused item**: move focus to the next sensible item, not to `<body>`.
- Composite widgets (menus, tabs, listboxes, grids) use arrow keys inside and one tab stop for the whole widget (roving `tabindex`), per the APG pattern.
- Provide a "Skip to main content" link on pages with repeated navigation.

## Names, roles, and structure

- Every interactive element has an accessible name. Icon-only buttons: `aria-label="Close dialog"` or visually hidden text. The name matches or starts with the visible label (WCAG 2.5.3 Label in Name).
- Images: meaningful `alt` text for informative images; `alt=""` for decorative ones.
- One `<h1>` per page and headings in order without skipped levels; landmarks (`<header>`, `<nav>`, `<main>`, `<footer>`) so users can jump around.
- Form inputs use `<label for>` (see `ux-forms`); groups use `<fieldset>` + `<legend>`.
- Set `lang` on `<html>`; tables of data use `<th scope>`.

## Visual requirements (WCAG 2.2 AA)

| Requirement | Threshold |
|---|---|
| Body text contrast (1.4.3) | ≥ 4.5:1 |
| Large text — ≥ 24 px, or ≥ 18.66 px bold (1.4.3) | ≥ 3:1 |
| UI component boundaries, icons, focus indicators, chart lines (1.4.11) | ≥ 3:1 |
| Target size (2.5.8) | ≥ 24×24 CSS px, or enough spacing that a 24 px circle around each target does not overlap another. Platform guidance is larger: 44×44 pt (Apple), 48×48 dp (Material) |
| Use of color (1.4.1) | Color is never the only signal — pair with text, icons, or patterns |
| Reflow (1.4.10) | Usable at 320 CSS px wide (400% zoom) without two-dimensional scrolling, except for data tables, maps, and similar |
| Resize text (1.4.4) and text spacing (1.4.12) | Works at 200% text size and with increased line/letter/word spacing — avoid fixed heights on text containers |

Check both light and dark themes; contrast often breaks in the theme that was designed second.

## Motion and timing

- Honor `prefers-reduced-motion` (see `ux-motion`).
- Moving, blinking, or auto-updating content lasting more than 5 seconds can be paused (2.2.2).
- Nothing flashes more than three times per second (2.3.1).
- Session timeouts warn the user and let them extend (2.2.1).

## Dynamic content

- Status messages (saved, 3 results found, upload complete) are announced without moving focus: `role="status"` or `aria-live="polite"`; use `role="alert"` only for urgent errors (WCAG 2.2 AA 4.1.3).
- The live region must exist in the DOM before its content changes, or many screen readers miss the update.
- Loading regions can set `aria-busy="true"` while updating.

## Verification

Run checks in this order and report what actually ran:

1. **Automated**: axe-core via `@axe-core/playwright`, `jest-axe`/`vitest-axe`, Storybook's a11y addon, or Lighthouse; `eslint-plugin-jsx-a11y` for React source. Automated tools catch only part of real issues (published estimates range from about a third to about half) — a clean run is a floor, not a pass.
2. **Keyboard pass**: unplug the mouse. Tab through the whole flow; check order, visibility, traps, Escape, and Enter/Space on every control.
3. **Zoom and reflow**: 200% text zoom and a 320 px-wide viewport.
4. **Screen reader spot check** on the primary flow: VoiceOver (macOS/iOS), NVDA (Windows), or TalkBack (Android). Listen for names, roles, states, and announcements.
5. **Contrast** for any new color pair, in every theme.

A detailed checklist for audits is in [references/wcag22-aa-checklist.md](references/wcag22-aa-checklist.md).

## Checks

- [ ] Native elements or a maintained primitive used for every control; no clickable `div`s.
- [ ] Full keyboard operation with visible, unobscured focus; dialogs trap and restore focus.
- [ ] Every control and informative image has an accessible name.
- [ ] Text, UI, and focus contrast meet the thresholds in every theme.
- [ ] Targets are at least 24×24 CSS px (44 px on touch-first screens).
- [ ] Status changes are announced; reduced motion is honored.
- [ ] Automated scan and keyboard pass were run, and results are reported.
