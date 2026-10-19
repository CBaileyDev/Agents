# Motion recipes

Copy-ready patterns that follow the rules in `../SKILL.md`. Adapt token names to the project's design system.

## Motion tokens

```css
:root {
  --duration-instant: 100ms;
  --duration-short: 150ms;
  --duration-medium: 250ms;
  --duration-long: 350ms;
  --ease-out: cubic-bezier(0.2, 0, 0, 1);      /* enter */
  --ease-in: cubic-bezier(0.4, 0, 1, 1);       /* exit */
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1); /* move on screen */
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --duration-medium: 1ms;
    --duration-long: 1ms;
  }
}
```

A global "kill all transitions" rule (`* { transition: none !important }`) is too blunt: it also removes color and opacity feedback. Prefer targeted overrides like the ones below.

## Button press and hover (CSS)

```css
.button {
  transition:
    background-color var(--duration-instant) var(--ease-out),
    transform var(--duration-instant) var(--ease-out);
}
@media (hover: hover) {
  .button:hover { background-color: var(--color-accent-hover); }
}
.button:active { transform: scale(0.98); }
.button:focus-visible { outline: 2px solid var(--color-focus); outline-offset: 2px; }
```

## Dialog or popover entering from `display: none` (CSS only)

```css
dialog {
  opacity: 1;
  transform: translateY(0) scale(1);
  transition:
    opacity var(--duration-medium) var(--ease-out),
    transform var(--duration-medium) var(--ease-out),
    overlay var(--duration-medium) allow-discrete,
    display var(--duration-medium) allow-discrete;
}
@starting-style {
  dialog[open] { opacity: 0; transform: translateY(8px) scale(0.98); }
}
dialog:not([open]) {
  opacity: 0;
  transform: translateY(4px) scale(0.98);
  transition-duration: var(--duration-short);
  transition-timing-function: var(--ease-in);
}
@media (prefers-reduced-motion: reduce) {
  dialog, dialog:not([open]) { transform: none; }
  @starting-style { dialog[open] { transform: none; } }
}
```

## Route or state transition (View Transitions API)

```js
function navigate(update) {
  if (!document.startViewTransition) return update(); // progressive enhancement
  document.startViewTransition(update);
}
```

```css
::view-transition-old(root) { animation: fade-out var(--duration-short) var(--ease-in) both; }
::view-transition-new(root) { animation: fade-in var(--duration-medium) var(--ease-out) both; }
@keyframes fade-out { to { opacity: 0; } }
@keyframes fade-in { from { opacity: 0; } }

/* Shared element: give the same name on both pages/states */
.card-image { view-transition-name: var(--vt-name); }

@media (prefers-reduced-motion: reduce) {
  ::view-transition-group(*), ::view-transition-old(*), ::view-transition-new(*) {
    animation-duration: 1ms;
  }
}
```

Each `view-transition-name` must be unique on the page at the moment of the transition.

## React with Motion (`motion/react`)

```tsx
import { AnimatePresence, MotionConfig, motion } from "motion/react";

// Once, near the app root: respect the OS reduced-motion setting.
export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

// Enter/exit with a faster exit.
export function Toast({ open, children }: { open: boolean; children: React.ReactNode }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="status"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.2, ease: [0.2, 0, 0, 1] } }}
          exit={{ opacity: 0, y: 4, transition: { duration: 0.15, ease: [0.4, 0, 1, 1] } }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Reordering list: `layout` animates position changes with FLIP.
// Render as <ReorderableItem key={item.id}> so identity survives the reorder.
export function ReorderableItem({ children }: { children: React.ReactNode }) {
  return (
    <motion.li layout="position" transition={{ type: "spring", stiffness: 500, damping: 40 }}>
      {children}
    </motion.li>
  );
}
```

`MotionConfig reducedMotion="user"` disables transform and layout animations for users who request reduced motion while keeping opacity and color.

## Staggered list entrance with a cap

```tsx
const MAX_STAGGERED = 8;
items.map((item, i) => (
  <motion.li
    key={item.id}
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: Math.min(i, MAX_STAGGERED) * 0.03, duration: 0.2, ease: [0.2, 0, 0, 1] }}
  >
    {item.label}
  </motion.li>
));
```

## GSAP timeline with reduced motion

```js
import { gsap } from "gsap";

const mm = gsap.matchMedia();
mm.add(
  { reduce: "(prefers-reduced-motion: reduce)", full: "(prefers-reduced-motion: no-preference)" },
  ({ conditions }) => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: conditions.reduce ? 0 : 0.3 } });
    tl.from(".hero-title", { autoAlpha: 0, y: conditions.reduce ? 0 : 16 })
      .from(".hero-cta", { autoAlpha: 0 }, "-=0.15");
  }
);
```

`gsap.matchMedia()` reverts the animations automatically when the media query stops matching.

## Skeleton shimmer that respects preferences

```css
.skeleton {
  background: linear-gradient(90deg, var(--surface-2) 25%, var(--surface-3) 50%, var(--surface-2) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s linear infinite;
}
@keyframes shimmer { to { background-position: -200% 0; } }
@media (prefers-reduced-motion: reduce) {
  .skeleton { animation: none; background: var(--surface-2); }
}
```

Animating `background-position` repaints. That is acceptable for small skeletons; for large areas, animate a `transform` on a pseudo-element instead.
