---
type: llm
weight: 2
---

PASS if deleting the account requires a deliberate extra step that matches an irreversible action: a confirmation dialog or panel that names the consequence (the account and its data are permanently removed / cannot be undone) AND either requires typing a confirmation value (such as the email, the account name, or a fixed word like DELETE) or otherwise makes accidental confirmation unlikely.

FAIL if a single click deletes the account, if the only safeguard is the browser's native `window.confirm()`, or if the confirmation does not state that the action is permanent.
