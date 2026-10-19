---
type: llm
---

PASS if all of the following are true in the code:
1. The confirming button has a specific verb label such as "Delete account" or "Permanently delete" (not "OK", "Yes", or "Confirm" alone).
2. While the DELETE request is in flight, the UI shows a pending state (for example "Deleting…" or a spinner) and prevents a second submission.
3. If the request fails, an error message is shown to the user and the account page remains usable.

FAIL if any of the three is missing.
