---
type: llm
---

PASS if saving is wired through the form's submit (a `type="submit"` button with an `onSubmit` handler that calls `preventDefault()`), so pressing Enter works and the page does not reload, AND non-OK HTTP responses are treated as failures.

FAIL if the page could reload on submit, or if a 4xx/5xx response would be reported as a successful save.
