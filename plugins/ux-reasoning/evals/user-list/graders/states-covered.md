---
type: llm
weight: 2
---

PASS if the component renders a distinct, deliberate UI for each of these three states:
1. Loading (a skeleton, spinner, or loading text).
2. Error (a human-readable message, not a raw error object or stack) with a way to retry the request.
3. Empty (the request succeeded but returned zero users) with a message explaining there are no users, rather than rendering an empty list or blank area.

FAIL if any state is missing, if the error state has no retry, or if empty and loading render the same thing.
