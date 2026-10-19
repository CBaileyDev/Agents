---
type: llm
weight: 2
---

PASS if all of the following are true in the code:
1. Every input has a visible `<label>` associated with it (via `htmlFor`/`id` or wrapping). Placeholders alone do not count as labels.
2. Validation errors are shown as text next to the relevant field and are programmatically associated with it (for example `aria-describedby` pointing at the message, and/or `aria-invalid` on the input).
3. Errors are not shown while the user is typing into a field for the first time (validation happens on blur or on submit).

FAIL if any of the three is missing.
