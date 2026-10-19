---
name: ux-responsive
description: "Load before building any page layout, table, navigation, or dialog that must work on phones, and when a page breaks on mobile or scrolls horizontally. Covers content-driven breakpoints, phone layout under 640 px, container queries, touch targets and thumb reach, mobile viewport and safe-area quirks, and narrow-screen patterns for tables, navigation, dialogs, and filters."
---

# Responsive Layout

Agents preview at desktop width and ship. Design for the narrowest real viewport first, then let space add capability, not the other way around.

## Viewports to check

Check at minimum: **320 px** (small phones, and 400% zoom on desktop — WCAG 1.4.10 Reflow), **375–390 px** (common phones), **768 px** (tablet portrait), **1024 px**, and **1280–1440 px**. Also check a very wide screen (≥ 1920 px) for line lengths and stretched layouts.

## Breakpoints

- Choose breakpoints where *the content* breaks, not at device names. Use the project's existing scale (Tailwind `sm` 640 / `md` 768 / `lg` 1024 / `xl` 1280 by default).
- Write styles mobile-first (`min-width` queries) so the phone layout is the default and larger layouts are additions.
- Use **container queries** (`@container`) for components that appear in spaces of different widths (sidebars, cards, dashboards). The component should respond to its container, not the window.
- Prefer intrinsic layouts that need no breakpoint: `grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr))`, `flex-wrap`, `clamp()` for fluid type and spacing, `max-width` in `ch` for text (aim for roughly 45–75 characters per line).

## Phone layout (under ~640 px)

- **One column.** Side-by-side regions stack in priority order from the hierarchy ranking (`ux-hierarchy`): primary content first, not the sidebar.
- **Primary action within thumb reach** — at the bottom of a form or in a sticky bottom bar for long screens. Account for the home indicator with `padding-bottom: env(safe-area-inset-bottom)` (requires `viewport-fit=cover` in the viewport meta).
- **Touch targets ≥ 44×44 px** with ≥ 8 px between adjacent targets. WCAG's 24 px minimum is a floor, not a mobile target.
- **No hover-only features.** Anything revealed on hover needs a tap or always-visible equivalent. Gate hover styles with `@media (hover: hover) and (pointer: fine)`.
- **Inputs at ≥ 16 px font size**, or iOS Safari zooms the page on focus.
- **Navigation**: up to about five top-level destinations fit a bottom tab bar; more go in a menu. Keep the current location visible.
- **Dialogs become sheets or full-screen views**; a centered desktop modal with 16 px margins usually leaves too little room for content and the keyboard.

## Adapting common components

| Component | Narrow-screen pattern |
|---|---|
| Data table | Keep a table if users compare across rows: horizontal scroll inside a container with a sticky first column and a visible scroll cue. Otherwise convert rows to cards showing the 2–4 most important fields, with the rest in a detail view |
| Toolbar with many actions | Primary action visible; the rest in an overflow menu |
| Multi-column form | One column (see `ux-forms`) |
| Side navigation | Off-canvas drawer or bottom tabs |
| Filters | A "Filters" button opening a sheet, with an applied-filter count on the button |
| Charts | Simplify (fewer series, larger labels), or offer a table view |
| Hero/marketing sections | Shorter copy, smaller imagery; the call to action stays above the fold |

## Mobile viewport quirks

- Use `100dvh` (dynamic viewport height) or `100svh` instead of `100vh` for full-height layouts; `100vh` ignores the mobile browser toolbar and causes cut-off content.
- The on-screen keyboard shrinks the visual viewport: keep the focused input and its submit button visible; avoid fixed bottom bars that cover inputs while typing.
- Prevent accidental horizontal scroll: no fixed widths wider than the viewport, `min-width: 0` on flex/grid children with long content, `overflow-wrap: anywhere` for long URLs and IDs, and responsive media (`max-width: 100%; height: auto`).
- Set the viewport meta: `<meta name="viewport" content="width=device-width, initial-scale=1">`. Do not disable zoom (`user-scalable=no`, `maximum-scale=1`); it fails accessibility.

## Images and performance

- Responsive images with `srcset`/`sizes` or `<picture>`; modern formats (AVIF/WebP) with fallbacks; explicit `width`/`height` or `aspect-ratio` to prevent layout shift; `loading="lazy"` below the fold.
- Phones are often on slow networks and CPUs; budget JavaScript and test with throttling.

## Verification

Use the browser's device toolbar or a headless browser to capture each viewport listed above (the `ux-reasoning:ux-visual-verifier` agent in this plugin does this). Check: no horizontal scroll at 320 px, primary action visible without hunting, nothing overlaps or truncates without a way to see the full text, touch targets meet size, and text remains readable without zoom.

## Checks

- [ ] Works at 320 px with no horizontal page scroll.
- [ ] Phone layout is single-column in hierarchy order with the primary action reachable.
- [ ] Touch targets ≥ 44 px on touch-first screens; no hover-only functionality.
- [ ] Inputs ≥ 16 px; zoom not disabled; `dvh`/`svh` used for full-height layouts; safe areas respected.
- [ ] Tables, navigation, dialogs, and filters have deliberate narrow-screen patterns.
- [ ] Screenshots or device-toolbar checks at each viewport were actually done and reported.
