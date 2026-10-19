---
type: llm
weight: 2
---

PASS if every icon-only button has an accessible name (an `aria-label` or visually hidden text such as "Bold", "Italic", "Underline", "Insert link"), AND the bold/italic/underline buttons expose their on/off state to assistive technology with `aria-pressed` (or an equivalent toggle role and state), AND the buttons are native `<button>` elements (or have full keyboard support).

FAIL if any icon-only button lacks an accessible name, if the active state is shown only visually, or if the buttons are non-interactive elements such as `div` or `span` with click handlers.
