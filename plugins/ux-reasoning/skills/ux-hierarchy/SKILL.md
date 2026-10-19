---
name: ux-hierarchy
description: "Load before laying out a page, toolbar, card, table, dashboard, or navigation, and when a UI feels cluttered, flat, or \"everything looks equally important\". Ranks actions and content (one primary action per region), sets action weight, grouping and order, emphasis budget, density, and progressive disclosure."
---

# Information Hierarchy

A screen has a limited attention budget. Hierarchy is how you spend it: the most important thing is the most visible, and the rest steps down in clear levels. When everything is emphasized, nothing is.

## Rank before you style

Start from the UI brief (`ux-intent`). List every element the screen needs, then rank them:

1. **Primary** — the one action or piece of content the screen exists for. One per view or per independent region (a modal, a card, a table row).
2. **Secondary** — supports the primary job; used often.
3. **Tertiary** — occasional; can live behind a menu, a disclosure, or a settings link.
4. **Remove** — anything that serves nobody's job on this screen. Cut it or move it.

Write the ranking down before choosing components. If two items both feel primary, go back to the brief's job sentence and pick the one it names.

## Action weight

| Rank | Treatment |
|---|---|
| Primary | Filled button in the accent color; placed where the eye ends a scan of the region (end of a form, top-right of a page header, bottom of a phone sheet) |
| Secondary | Outline or tonal button, or a plain text button next to the primary |
| Tertiary | Text link, icon button with a label or tooltip, or an overflow (⋯) menu |
| Destructive | Never styled as the default primary unless deletion *is* the job. Separate it spatially from safe actions; use the danger color only on the confirming step (see `ux-feedback`) |

Put no more than one filled accent button in a region. Two accent buttons side by side make the user stop and compare.

## Content order and grouping

- **Order by task, not by data model.** Show fields in the order the user needs them, not the order of the database columns.
- **Group by proximity.** Related items sit closer to each other than to unrelated ones; space between groups is visibly larger than space within them. Prefer whitespace to borders and boxes for grouping.
- **Align to a few edges.** Every extra alignment line adds visual noise.
- **Label groups with headings that say what is inside** ("Billing address", not "Section 2").
- **Front-load text.** Put the distinguishing word first in labels, list items, and buttons ("Delete project", "Export as CSV").

## Emphasis budget

Use at most three levels of type emphasis per region (for example: title, body, muted meta). Create levels by combining size, weight, and color contrast; avoid relying on color alone. If you add a fourth level, remove one.

The squint test: blur the screen (or zoom out to 25%). The primary action and the main heading must still be the first two things you see.

## Density

Choose density deliberately and apply it consistently:

- **Comfortable** — occasional users, content reading, touch input, marketing and onboarding.
- **Compact** — expert users who scan many rows (admin tables, logs, trading, IDE-like tools). Keep targets at least 24×24 CSS px (WCAG 2.2 AA) even when compact.

Do not mix densities within a screen without a reason a user would notice.

## Progressive disclosure

Show what most users need most of the time; put the rest one step away.

- Advanced options go behind an "Advanced" disclosure, not in the main flow.
- Rarely used row actions go in an overflow menu; the one common row action stays visible.
- Long explanations go behind "Learn more" or a help link, not in the layout.
- Do not hide anything a user needs to complete the primary job, and do not hide required fields.

## Tables, lists, and numbers

- Left-align text, right-align numbers, and use tabular figures (`font-variant-numeric: tabular-nums`) so digits line up.
- Make the identifying column (name, title) the first and widest.
- Keep units in the column header, not in every cell.
- Sorting, filtering, and search sit above the data they affect.

## Checks

- [ ] One primary action per region, visibly dominant.
- [ ] Destructive actions are separated from safe ones.
- [ ] No more than three type-emphasis levels per region.
- [ ] Squint test passes: primary action and main heading read first.
- [ ] Every element on screen maps to the brief's job or a secondary action; nothing orphaned.
