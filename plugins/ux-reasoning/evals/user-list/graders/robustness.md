---
type: llm
---

PASS if at least two of the following are handled in the code:
1. Non-OK HTTP responses (`!response.ok`) are treated as errors, not parsed as data.
2. The request is cancelled or its result ignored when the component unmounts (AbortController or an ignore flag).
3. Long names or emails cannot break the layout (truncation with the full value still available, or wrapping such as `overflow-wrap`/`word-break`).
4. Loading feedback avoids flashing for fast responses, or keeps previously loaded data visible during a refetch.

FAIL if fewer than two are handled.
