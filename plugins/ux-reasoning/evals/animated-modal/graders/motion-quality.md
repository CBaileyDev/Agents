---
type: llm
---

PASS if all of the following are true:
1. The open/close animation changes only `transform` and/or `opacity` (not `width`, `height`, `top`, `left`, or `margin`).
2. The animation durations are 400 ms or less.
3. There is a closing animation as well as an opening one (the dialog does not simply vanish while its entrance is animated).

FAIL if any of the three is not met.
