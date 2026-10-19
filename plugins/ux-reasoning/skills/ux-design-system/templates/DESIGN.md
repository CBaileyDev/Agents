# DESIGN.md — <Product name>

Source of truth for this product's UI. Read this before any UI change. Update it in the same change when you add a token, component, or pattern.

- Tokens live in: `<path, e.g. src/styles/tokens.css or tailwind.config.ts>`
- Components live in: `<path, e.g. src/components/ui/>`
- Stories / previews: `<path or "none">`

## Direction

<Two or three adjectives> — not <anti-adjective>.

<One or two sentences tying the direction to who uses the product and what they do.>

## Principles

1. <Decision with a reason, e.g. "Data first: application screens open on the user's data, never on a marketing hero.">
2. <e.g. "One primary action per region; destructive actions are never the default button.">
3. <e.g. "Undo over confirm for reversible actions.">

## Tokens

Components use **semantic** tokens only. Primitive values appear only in this section and the token file.

### Color roles

| Role | Token | Light | Dark | Used for |
|---|---|---|---|---|
| Background | `--color-bg` | | | Page background |
| Surface | `--color-surface` | | | Cards, panels |
| Surface raised | `--color-surface-raised` | | | Menus, popovers, dialogs |
| Border | `--color-border` | | | Dividers, input borders |
| Text | `--color-text` | | | Body text |
| Text muted | `--color-text-muted` | | | Secondary text (must still pass 4.5:1) |
| Accent | `--color-accent` | | | Primary buttons, links, selection |
| Accent text | `--color-on-accent` | | | Text on accent |
| Danger | `--color-danger` | | | Destructive confirmations, errors |
| Success | `--color-success` | | | Success messages |
| Warning | `--color-warning` | | | Warnings |
| Focus ring | `--color-focus` | | | `:focus-visible` outline (≥ 3:1) |

### Typography

| Token | Value | Use |
|---|---|---|
| `--font-sans` | | UI text |
| `--font-mono` | | Code, IDs, tabular data |
| `--text-xs … --text-3xl` | | Type scale (ratio: <e.g. 1.2>) |
| Weights | <e.g. 400, 600> | Only these |

### Space, shape, elevation, layers

| Scale | Tokens | Values |
|---|---|---|
| Spacing | `--space-1 … --space-12` | <e.g. 4, 8, 12, 16, 24, 32, 48, 64> |
| Radius | `--radius-sm / -md / -lg / -full` | <e.g. 4, 8, 12, 9999> |
| Elevation | `--shadow-1 / -2` or surface steps | <where each applies> |
| Z-index | `--z-dropdown / -sticky / -overlay / -modal / -toast` | <ordered values> |
| Breakpoints | `sm / md / lg / xl` | <e.g. 640, 768, 1024, 1280> |

### Motion

| Token | Value | Use |
|---|---|---|
| `--duration-instant` | 100ms | Color, opacity, press |
| `--duration-short` | 150ms | Small elements, exits |
| `--duration-medium` | 250ms | Dialogs, popovers |
| `--duration-long` | 350ms | Sheets, route transitions |
| `--ease-out` | cubic-bezier(0.2, 0, 0, 1) | Enter |
| `--ease-in` | cubic-bezier(0.4, 0, 1, 1) | Exit |
| `--ease-in-out` | cubic-bezier(0.4, 0, 0.2, 1) | Move on screen |

Reduced motion: <what changes under `prefers-reduced-motion: reduce`>.

### Iconography and imagery

- Icon set: <name>, <stroke>, sizes <16/20/24>. Icon-only buttons always have an accessible name.
- Imagery: <photos / illustrations / none, and treatment>.

## Components

| Component | Variants | Rules |
|---|---|---|
| Button | primary, secondary, ghost, danger; sm, md | One primary per region. Danger only on the confirming step. Pending state keeps width |
| Input | text, select, textarea, checkbox, radio, switch | Visible label above; hint between label and input; errors inline with icon + text |
| Dialog | default, destructive | Verb-labeled buttons; focus starts on the safe option; Escape closes |
| Toast | info, success, error | `role="status"`; ≥ 5 s with action; never the only record of an error |
| Table | default, compact | Text left, numbers right with tabular figures; narrow-screen pattern: <cards / scroll> |
| Empty state | first-use, no-results, cleared | Purpose line + one action |

## Patterns

### Forms
- Do: <e.g. validate on blur, re-validate on input after an error, summary on submit>.
- Don't: <e.g. disable submit for invalid input; use placeholders as labels>.

### Loading, empty, error
- Do: <skeletons matching layout after ~300 ms; keep previous data during refresh>.
- Don't: <blank areas; "Something went wrong" without a next step>.

### Destructive actions
- Reversible → undo toast. Hard to reverse → confirm dialog naming the object and consequence. Irreversible → type-to-confirm.

## Voice

- <e.g. Plain, direct, second person. Sentence case for all UI text. Buttons are verbs.>

## Accessibility baseline

WCAG 2.2 AA. Keyboard operable, visible focus, 4.5:1 text contrast in every theme, 24×24 px minimum targets (44 px on touch-first screens), reduced motion honored.

## Open decisions

- <Conflicts found during discovery, with the options and who decides.>
