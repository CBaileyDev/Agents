---
type: llm
weight: 2
---

PASS if all of the following are true:
1. While the PUT is in flight, the button shows a pending state (for example "Saving…") and a second save cannot be triggered.
2. After success, the user gets visible confirmation (for example "Saved" text or a toast), announced to assistive technology (`role="status"` or `aria-live`) or placed next to the button.
3. After failure, an error message explains that the changes were not saved, and the user's selections are kept so they can retry.

FAIL if any of the three is missing.
