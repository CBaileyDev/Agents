---
name: ux-visual-direction
description: "Load when starting a new product look, restyling, choosing colors, fonts, or a theme, adding dark mode, when the user names a mood (\"calm\", \"premium\", \"playful\", \"brutalist\"), or when output looks generic. Makes one explicit, written decision per visual axis (type, color, shape, depth, space, icons, imagery, motion, voice) and applies it consistently."
---

# Visual Direction

Generic UI happens when no one decides. Every visual axis gets filled with a default — the same font, the same slate grays, the same rounded cards with soft shadows, the same purple-to-blue gradient — and the result looks like everything else. The fix is not more decoration; it is a small number of explicit decisions applied consistently.

## Start from what exists

If the project has a `DESIGN.md`, theme tokens, a component library, or a brand guide, the direction is already decided: follow it, and use this skill only to fill gaps or when asked to restyle. Read `ux-design-system` for how to record decisions.

## Pick a direction in words first

Write two or three adjectives that describe how the product should feel, plus one it should *not* feel like. Tie them to the audience and job from the UI brief (`ux-intent`).

> "Calm, precise, trustworthy — not playful." (finance dashboard for accountants)
> "Warm, friendly, light — not corporate." (habit tracker for individuals)
> "Dense, technical, fast — not decorative." (log explorer for engineers)

## One decision per axis

Make one explicit choice for each axis and write it down. "Default" is allowed only if it was chosen on purpose.

| Axis | Decide | Example decision |
|---|---|---|
| **Typography** | Typeface(s) (one family, or one display + one text), type scale ratio, weights used | "IBM Plex Sans for UI, Plex Mono for data; scale 1.2; weights 400/600 only" |
| **Color** | Neutral family (cool, warm, or true gray), one accent, semantic colors (success/warning/danger/info), where the accent is allowed | "Warm stone neutrals; single teal accent only on primary actions and focus; no gradients" |
| **Shape** | Radius scale and where each step applies | "4 px on inputs/buttons, 8 px on cards, full-round only on avatars and pills" |
| **Depth** | Borders vs shadows vs tonal surfaces; how many elevation levels | "Flat: 1 px borders and tonal surfaces; one shadow level for floating menus only" |
| **Space & density** | Base unit, spacing scale, comfortable or compact | "4 px base; scale 4/8/12/16/24/32/48; compact tables, comfortable forms" |
| **Iconography** | One icon set, stroke width, size grid, filled vs outline | "Lucide, 1.5 px stroke, 16/20 px; outline only" |
| **Imagery & illustration** | Photos, illustrations, none; treatment | "No illustrations; empty states use a single icon and text" |
| **Motion personality** | Snappy or gentle; springs or curves (see `ux-motion`) | "Snappy: 150–200 ms ease-out; no bounce" |
| **Voice** | Tone of microcopy; sentence vs title case | "Plain, direct, second person; sentence case everywhere" |

Fewer choices, applied everywhere, beat many choices applied once.

## Patterns that read as unconsidered

These are not forbidden, but if you use one it should be a decision, not a reflex:

- Purple/indigo-to-blue gradients on hero sections, buttons, and text.
- Glassmorphism (blurred translucent panels) on everything.
- Every container as a rounded card with a soft drop shadow, nested cards inside cards.
- Emoji as icons in product UI.
- A centered hero, three feature cards, and a gradient call-to-action — used for an *application* screen that should start with the user's data.
- Gray text on gray background for "subtle" content that fails contrast.
- Multiple accent colors competing for attention with no semantic meaning.
- Mixing icon sets, or random border radii (6, 10, 12, 14 px) on neighboring elements.

## Color in practice

- Build the palette as a neutral ramp (about 10 steps) plus one accent ramp and semantic colors. Assign roles (background, surface, surface-raised, border, text, text-muted, accent, accent-text, focus) and reference roles in code, not raw hex values.
- Check every text/background role pair for contrast (≥ 4.5:1 body, ≥ 3:1 large text and UI parts — see `ux-accessibility`).
- Perceptual color spaces (OKLCH) make it easier to build ramps with even lightness steps and predictable contrast; `oklch()` is supported in all current major browsers.

## Dark mode

Dark mode is a second design, not an inversion:

- Use dark gray surfaces (not pure black) and express elevation with *lighter* surfaces rather than shadows.
- Reduce accent saturation slightly and re-check contrast; colors that pass on white often fail on dark gray, and vice versa.
- Avoid pure white body text on near-black for long reading; use an off-white.
- Re-check images, illustrations, and charts; many assume a white background.
- Respect `prefers-color-scheme` by default, and allow a manual override if the app offers a theme setting.

## Applying the direction

1. Write the decisions (above) into `DESIGN.md` as tokens (see `ux-design-system`).
2. Implement tokens first (CSS custom properties, Tailwind theme, or platform resources), then components, then screens.
3. Replace hard-coded values with tokens as you touch code.
4. Review a screenshot of the primary screen against the adjectives: does it feel like the words? Adjust the axis that is off rather than adding decoration.

## Checks

- [ ] Two or three direction adjectives (and one anti-adjective) are written down.
- [ ] Every axis in the table has an explicit decision.
- [ ] Only one accent color, used for a defined set of roles.
- [ ] Radii, shadows, icon set, and spacing come from small, named scales.
- [ ] All color pairs pass contrast in light and dark themes.
- [ ] The primary screen screenshot matches the adjectives, without generic-default patterns used by reflex.
