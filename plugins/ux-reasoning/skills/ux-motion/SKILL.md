---
name: ux-motion
description: "Load before adding or changing any animation, transition, micro-interaction, page or route transition, or skeleton shimmer, and when UI feels janky or static. Covers the purpose test, durations, easing, transform/opacity-only performance, prefers-reduced-motion, and choosing CSS transitions, View Transitions, Motion (formerly Framer Motion), or GSAP."
---

# Motion

Motion is feedback and orientation, not decoration. Good UI motion is quick enough that nobody notices it as animation — they just understand what changed.

## Purpose test

Animate only if the motion does at least one of these. If it does none, remove it.

1. **Feedback** — confirms an input landed (press, toggle, drop).
2. **Orientation** — shows where something came from or went (a panel sliding from the edge it lives on, an item flying into a cart).
3. **Continuity** — keeps an object recognizable across a change of state or layout (expanding a card into a detail view, reordering a list).
4. **Attention** — draws the eye to something that changed outside the focus area — sparingly, once, never looping.

Never block input while an animation plays, and never make the user wait for an animation to finish before they can act.

## Duration

| Change | Duration |
|---|---|
| Color, opacity, hover/press states | 100–150 ms |
| Small elements: tooltips, toggles, checkboxes, dropdowns | 150–200 ms |
| Medium: dialogs, popovers, cards expanding, toasts | 200–300 ms |
| Large: full-screen sheets, page or route transitions | 300–400 ms; rarely up to 500 ms |

- Exits run faster than entrances (about two-thirds of the enter duration): the user has already decided to dismiss.
- Distance and size scale duration: a 600 px slide needs longer than a 16 px nudge.
- Staggered lists: 20–40 ms between items, and cap the total stagger (~300 ms) so long lists do not crawl in.
- Anything repeated many times a day (opening a menu, switching tabs) stays at the short end. Delight wears off; slowness does not.

## Easing

| Situation | Curve |
|---|---|
| Entering the screen | Ease-out (decelerate) — fast start, gentle stop: `cubic-bezier(0.2, 0, 0, 1)` |
| Leaving the screen | Ease-in (accelerate): `cubic-bezier(0.4, 0, 1, 1)` |
| Moving or resizing on screen | Ease-in-out: `cubic-bezier(0.4, 0, 0.2, 1)` |
| Gestures, drags, interruptible motion | Springs (velocity-aware, retarget smoothly mid-flight) |
| Continuous indicators (spinners, indeterminate progress) | Linear |

Avoid linear easing for positional motion (it looks mechanical) and avoid bounce/overshoot outside playful brands and gesture endings. Define the curves and durations as tokens (`--ease-out`, `--duration-short`) in the design system rather than inline magic numbers.

## Performance rules

- Animate **`transform` and `opacity`** — they run on the compositor. Avoid animating `width`, `height`, `top`, `left`, `margin`, `box-shadow`, and `filter: blur()` on large areas; they trigger layout or expensive paint every frame.
- For layout changes (reorder, expand), use FLIP: measure, apply the end layout, animate a `transform` from the old position. Motion's `layout` prop and the View Transitions API do this for you.
- Use `will-change` only on elements about to animate, and remove it afterwards; it costs memory.
- Test on a throttled CPU (DevTools 4–6× slowdown). Dropped frames show up there first.

## Reduced motion (required)

Honor `prefers-reduced-motion: reduce`. Reduced motion means *less movement*, not *no feedback*:

- Replace slides, zooms, parallax, and spring motion with short opacity fades (or instant changes).
- Keep state-change feedback (color, opacity) so the UI does not feel broken.
- Stop auto-playing, looping, and parallax effects entirely. Content that moves for more than 5 seconds needs a pause control regardless of preference (WCAG 2.2 A 2.2.2).
- Never flash more than three times per second (WCAG A 2.3.1).

## Choosing a tool

Pick the lightest tool that does the job, and match what the project already uses.

| Need | Tool |
|---|---|
| Hover, press, color, simple show/hide | CSS `transition` |
| Entering from `display: none` (dialogs, popovers) | CSS `@starting-style` + `transition-behavior: allow-discrete` (Baseline 2024) |
| Route/page transitions, shared-element morphs | View Transitions API (`document.startViewTransition()`, framework integrations); feature-detect and treat as progressive enhancement |
| Scroll-linked effects | CSS scroll-driven animations (`animation-timeline: view()`) where supported; progressive enhancement only |
| React: exit animations, layout/shared-layout, gestures, springs | Motion (`motion` package, `import { motion, AnimatePresence } from "motion/react"`; formerly Framer Motion) |
| Complex timelines, SVG choreography, scroll storytelling | GSAP (free, including its formerly paid plugins, since 2025; its license excludes use in competing no-code website builders) |
| Native desktop | Platform animation system (WPF storyboards, WinUI composition, SwiftUI) |

Concrete snippets for each approach are in [references/recipes.md](references/recipes.md).

## Common mistakes

- Animating everything on first page load; content-heavy apps should appear, not perform.
- Different durations and curves for the same kind of change in different places.
- Skeleton shimmer that never stops on slow networks and ignores reduced motion.
- Exit animations missing, so elements vanish abruptly while entrances are smooth (in React, exits need `AnimatePresence` or equivalent).
- Hover-triggered motion on touch devices (gate with `@media (hover: hover)`).
- Scroll-jacking (overriding native scroll speed or snapping the whole page).

## Checks

- [ ] Every animation passes the purpose test.
- [ ] Durations and easing come from tokens and fall in the ranges above; exits are faster than entrances.
- [ ] Only `transform` and `opacity` animate (or a FLIP/View Transition handles layout).
- [ ] `prefers-reduced-motion: reduce` swaps movement for fades and stops loops.
- [ ] No animation blocks input or delays the user's next action.
- [ ] Smooth at 4× CPU throttle.
