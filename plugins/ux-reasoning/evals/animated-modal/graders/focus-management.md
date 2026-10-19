---
type: llm
weight: 2
---

PASS if the dialog handles focus and dismissal accessibly: focus moves into the dialog when it opens (for example to the project-name input), Escape closes it, focus is kept inside the dialog while it is open (a focus trap, or the native `<dialog>` element opened with `showModal()`), focus returns to the "New project" button when it closes, and the dialog has an accessible name (`aria-labelledby` pointing at its title, or `aria-label`).

FAIL if two or more of these are missing.
