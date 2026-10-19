---
type: llm
---

PASS if the CSS gives the buttons a visible keyboard focus style (for example a `:focus-visible` outline or ring, and focus outlines are not removed without replacement), AND each button's clickable area is at least 24×24 CSS pixels (via width/height, min-width/min-height, or padding around the icon).

FAIL if focus styles are missing or removed, or if buttons could be smaller than 24×24 pixels.
