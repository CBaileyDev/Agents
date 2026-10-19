---
type: regex
pattern: "window\\.confirm\\("
match: not_contains
---

The reply should not rely on the native `window.confirm()` dialog for an irreversible action.
