---
name: ux-design-system
description: "Load when a project has no written design system, when tokens are scattered or hard-coded, before a restyle, when onboarding an agent to a codebase's UI conventions, or when asked to document or audit a design system. Discovers existing tokens and components and writes or maintains a DESIGN.md source of truth so later UI changes stay consistent."
---

# Design System (DESIGN.md)

Agents reinvent the visual language on every request unless it is written down where they will read it. `DESIGN.md` is that place: a short, plain-Markdown source of truth at the repository root (next to `AGENTS.md` / `CLAUDE.md`) that names the tokens, components, and rules to use.

## 1. Discover before writing

Inventory what the codebase already does. Do not invent a system that contradicts working code.

- **Token sources**: CSS custom properties (`:root { --… }`), Tailwind config or `@theme` block (Tailwind v4), Sass variables, theme objects (MUI, Chakra, Mantine), design-token JSON (Style Dictionary, W3C Design Tokens format), platform resources (WPF `ResourceDictionary`, Android `themes.xml`, SwiftUI asset catalogs).
- **Components**: the component directory, the UI library in use (shadcn/ui, Radix, MUI, etc.), and Storybook if present.
- **Actual usage**: grep for hard-coded values to see what is really used — hex colors (`#[0-9a-fA-F]{3,8}`), `rgb(`, pixel values in `padding|margin|gap`, `border-radius`, `font-size`, `box-shadow`, `z-index`, durations (`[0-9]+ms`). Clusters of near-duplicates (`#1f2937`, `#1e293b`, `#111827`) reveal a missing token.

Record conflicts (two grays used for the same role, three button styles) as open decisions rather than silently choosing.

## 2. Write DESIGN.md

Start from [templates/DESIGN.md](templates/DESIGN.md). Keep it short enough to read in a few minutes. Rules of thumb:

- **Reference token names, not raw values**, in component rules ("Primary buttons use `--color-accent`"), and list each token's value once in the token tables.
- **Write rules as decisions with reasons** ("Destructive actions are never the default button, because users confirm on autopilot").
- **Include do/don't pairs** for the patterns agents get wrong most: buttons, forms, empty states, errors, dialogs, tables.
- **Link to code**: where tokens live, where components live, how to add a new one.
- Point to `DESIGN.md` from `AGENTS.md` or `CLAUDE.md` ("Read DESIGN.md before any UI change") so every agent session loads it.

## 3. Tokens

Tokens have two layers:

1. **Primitive tokens** — the palette and scales: `--gray-50 … --gray-950`, `--teal-500`, `--space-1 … --space-12`, `--radius-sm/md/lg`.
2. **Semantic tokens** — roles that components use: `--color-bg`, `--color-surface`, `--color-text`, `--color-text-muted`, `--color-border`, `--color-accent`, `--color-danger`, `--color-focus`, `--duration-short`, `--ease-out`.

Components use semantic tokens only. Theming (dark mode, brands, high contrast) remaps semantic tokens to different primitives; components do not change.

Cover at least: color roles (light and dark), typography (families, sizes, weights, line heights), spacing scale, radius scale, elevation (shadows or surfaces), z-index layers, breakpoints, motion durations and easings, and focus ring.

## 4. Maintain it

- When adding a component or pattern, update `DESIGN.md` in the same change.
- When a hard-coded value is touched, replace it with a token; if no token fits, either it is a new token (add it, with a reason) or the design is drifting (use an existing one).
- Prefer extending existing components over creating near-duplicates ("`Button` gains a `size="sm"` variant", not a new `SmallButton`).
- A lint rule can enforce tokens: `stylelint-declaration-strict-value` for CSS, Tailwind's restricted theme (no arbitrary values) via ESLint plugins, or a simple CI grep for hex colors outside the token file.

## 5. Auditing an existing system

When asked to audit, report: token coverage (share of style values that use tokens), duplicate or near-duplicate values, components with overlapping purpose, naming inconsistencies (`primary` vs `brand` vs `accent` for the same role), contrast failures in any theme, and missing states in core components (see `ux-feedback` interactive states). Give file references for each finding.

## Checks

- [ ] Existing tokens and components were inventoried before writing.
- [ ] `DESIGN.md` exists at the repo root, uses token names in rules, and is linked from `AGENTS.md`/`CLAUDE.md`.
- [ ] Semantic tokens exist for every color role in every theme.
- [ ] Spacing, radius, type, elevation, z-index, and motion are scales, not one-offs.
- [ ] Do/don't guidance covers buttons, forms, empty/error states, dialogs, and tables.
- [ ] Conflicts found during discovery are listed as open decisions.
