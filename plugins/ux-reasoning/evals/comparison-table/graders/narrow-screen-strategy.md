---
type: llm
weight: 2
---

PASS if the page has an explicit strategy for phone-width screens (around 320–400 px) that avoids page-level horizontal scrolling: either the table sits in its own horizontally scrollable container (with the feature-name column kept visible, for example `position: sticky`), or it switches to a stacked/card layout below a breakpoint, or an equivalent approach that keeps every plan's value readable on a phone.

FAIL if the table is simply given a fixed or minimum width with no narrow-screen handling, or if the strategy hides plan data on phones without a way to see it.
