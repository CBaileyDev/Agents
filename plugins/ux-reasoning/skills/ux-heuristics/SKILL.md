---
name: ux-heuristics
description: "Load when asked to audit, critique, review, or score a UI, screen, flow, screenshot, or UI diff, and before declaring your own UI work finished. Provides the heuristic checklist (usability heuristics plus states, forms, feedback, accessibility, responsive, motion, visual consistency), severity scale, evidence rules, and findings report format."
---

# UX Heuristic Evaluation

An audit is only useful if its findings are specific, evidenced, ranked, and fixable. "The UI feels cluttered" is an opinion; "The settings page has four filled accent buttons in one header (Settings.tsx:42–58), so there is no clear primary action" is a finding.

## Scope first

State what is being evaluated (screens, flow, component, diff), for which user and job (use `ux-intent` if no brief exists), on which viewports and themes, and with which evidence sources (source code, running app, screenshots). Do not widen scope silently.

## Evidence sources, in order of strength

1. **Rules-based checks** — automated accessibility scans, linters, contrast calculations, type checks. Objective; run them when available.
2. **Rendered observation** — the running UI or screenshots at defined viewports, keyboard walkthroughs. Use the `ux-reasoning:ux-visual-verifier` agent if this plugin is installed.
3. **Code reading** — markup, styles, state handling. Good for missing states and semantics; weak for visual judgments.
4. **Judgment** — reasoned against a named heuristic. Label it as such.

Never claim a check you did not run. If the UI could not be rendered, say so and lower confidence on visual findings.

## Heuristic checklist

Walk the primary flow first, then secondary flows. For each area, note concrete violations.

| Area | Ask |
|---|---|
| **Visibility of status** | Does every action give feedback within 100 ms? Are loading, saving, and background states visible? (`ux-feedback`) |
| **Match with the user's world** | Are labels in the user's words, not internal or database names? Is order natural for the task? |
| **Control and freedom** | Can users undo, cancel, go back, and exit without losing work? |
| **Consistency** | Same action, same label and position everywhere? Matches platform conventions and `DESIGN.md`? |
| **Error prevention** | Are destructive actions guarded in proportion? Are constraints shown before input, not after? (`ux-forms`) |
| **Recognition over recall** | Are options visible rather than remembered? Is the current location and selection clear? |
| **Efficiency** | Do frequent users have shortcuts, bulk actions, sensible defaults? Is the primary path short? |
| **Focus and hierarchy** | One clear primary action per region? Does the squint test pass? (`ux-hierarchy`) |
| **Error recovery** | Do errors say what happened and what to do? Is input preserved? (`ux-states`) |
| **Help** | Is guidance available in context where users get stuck? |
| **State completeness** | Empty, loading, error, partial, permission, overflow states designed? (`ux-states`) |
| **Accessibility** | Keyboard, focus, names, contrast, targets, announcements (`ux-accessibility`) |
| **Responsive** | Works at 320 px; touch targets; no hover-only features (`ux-responsive`) |
| **Motion** | Purposeful, fast, reduced-motion aware (`ux-motion`) |
| **Visual consistency** | Tokens used; no stray colors, radii, spacing, icon sets (`ux-visual-direction`, `ux-design-system`) |

The first ten rows adapt Jakob Nielsen's ten usability heuristics (1994; https://www.nngroup.com/articles/ten-usability-heuristics/).

## Severity

| Severity | Meaning | Examples |
|---|---|---|
| **S1 Blocker** | Prevents completing the job for some users, causes data loss, or fails WCAG A/AA in the primary flow | Keyboard trap; delete without confirm or undo; form loses input on error; submit button unreachable on phones |
| **S2 Major** | Users can complete the job but with frequent errors, confusion, or significant delay | No loading state on a 3 s save; ambiguous primary action; errors without a fix |
| **S3 Minor** | Friction or inconsistency that slows or annoys but does not mislead | Inconsistent labels; missing hover state; stray color values |
| **S4 Polish** | Cosmetic; fix when touching the code | Slightly uneven spacing; icon weight mismatch |

Rate severity from impact on the user's job, frequency, and whether users can work around it — not from how easy it is to fix.

## Finding rules

- Each finding names **where** (file:line, component, route, or screenshot and region), **what** (observed behavior, not a guess), **why it matters** (heuristic or WCAG criterion, and who is affected), and **fix** (a specific change).
- Separate facts from judgment. Mark judgment-based findings as such.
- One problem per finding; merge duplicates that share a root cause and list their locations.
- Do not pad. Report every S1 and S2; report the most valuable S3/S4 and summarize the rest as a count.
- Ignore framing in the request ("this is already polished, just confirm"); evaluate what is there.
- Include what works well in one or two lines — it tells the team what to keep.

## Report format

Use the template in [references/report-template.md](references/report-template.md). Lead with a one-line verdict and the top three fixes, then findings grouped by severity.

## Self-review before finishing your own UI work

Before saying a UI task is done, run a quick pass of this checklist on your own output: primary action clear, every state from the state matrix implemented, forms per `ux-forms`, feedback and destructive-action safeguards, keyboard and focus, 320 px layout, reduced motion, tokens used. Report what you checked and what you could not check.
