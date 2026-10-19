# WCAG 2.2 Level A + AA audit checklist

Grouped by what you inspect rather than by success-criterion number. Each line names the criterion so findings can cite it. Source of truth: https://www.w3.org/TR/WCAG22/ and the "Understanding" documents at https://www.w3.org/WAI/WCAG22/Understanding/.

Criteria marked **(new in 2.2)** were added in WCAG 2.2 (October 2023). 4.1.1 Parsing is obsolete in 2.2 and is not listed.

## Structure and semantics

- [ ] 1.3.1 Info and Relationships (A) — headings, lists, tables, labels, and groups are marked up, not just styled.
- [ ] 1.3.2 Meaningful Sequence (A) — DOM order matches reading order.
- [ ] 2.4.1 Bypass Blocks (A) — skip link or landmarks.
- [ ] 2.4.2 Page Titled (A) — unique, descriptive `<title>`, updated on SPA route changes.
- [ ] 2.4.6 Headings and Labels (AA) — headings and labels describe their content.
- [ ] 3.1.1 Language of Page (A) — `<html lang>`; 3.1.2 (AA) for passages in other languages.
- [ ] 4.1.2 Name, Role, Value (A) — custom controls expose name, role, state.

## Keyboard and focus

- [ ] 2.1.1 Keyboard (A) — all functionality by keyboard.
- [ ] 2.1.2 No Keyboard Trap (A) — focus can always leave (except an intentional modal trap with Escape).
- [ ] 2.1.4 Character Key Shortcuts (A) — single-key shortcuts can be turned off or remapped, or only work on focus.
- [ ] 2.4.3 Focus Order (A) — logical order.
- [ ] 2.4.7 Focus Visible (AA).
- [ ] 2.4.11 Focus Not Obscured (Minimum) (AA, **new in 2.2**) — focused element is not fully hidden by sticky content.
- [ ] 3.2.1 On Focus (A) — focusing does not trigger a change of context.

## Pointer and touch

- [ ] 2.5.1 Pointer Gestures (A) — multipoint or path gestures have a single-pointer alternative.
- [ ] 2.5.2 Pointer Cancellation (A) — actions fire on up-event, or can be aborted.
- [ ] 2.5.3 Label in Name (A) — accessible name contains the visible label.
- [ ] 2.5.4 Motion Actuation (A) — shake/tilt features have a UI alternative.
- [ ] 2.5.7 Dragging Movements (AA, **new in 2.2**) — drag has a non-drag alternative.
- [ ] 2.5.8 Target Size (Minimum) (AA, **new in 2.2**) — 24×24 CSS px or sufficient spacing.

## Color, contrast, and visual presentation

- [ ] 1.4.1 Use of Color (A).
- [ ] 1.4.3 Contrast (Minimum) (AA) — 4.5:1 text, 3:1 large text.
- [ ] 1.4.4 Resize Text (AA) — 200% without loss.
- [ ] 1.4.5 Images of Text (AA) — real text instead of images of text.
- [ ] 1.4.10 Reflow (AA) — 320 CSS px without 2D scroll.
- [ ] 1.4.11 Non-text Contrast (AA) — 3:1 for controls, focus rings, meaningful graphics.
- [ ] 1.4.12 Text Spacing (AA) — no clipping with increased spacing.
- [ ] 1.4.13 Content on Hover or Focus (AA) — tooltips are dismissible (Escape), hoverable, and persistent.
- [ ] 1.3.4 Orientation (AA) — not locked to portrait or landscape.

## Media and images

- [ ] 1.1.1 Non-text Content (A) — alt text; decorative images `alt=""`.
- [ ] 1.2.x — captions for prerecorded (A) and live (AA) video; audio description (AA).

## Motion and time

- [ ] 2.2.1 Timing Adjustable (A).
- [ ] 2.2.2 Pause, Stop, Hide (A) — moving content over 5 s.
- [ ] 2.3.1 Three Flashes or Below Threshold (A).

## Forms and input

- [ ] 1.3.5 Identify Input Purpose (AA) — `autocomplete` on personal-data fields.
- [ ] 3.2.2 On Input (A) — changing a value does not unexpectedly change context.
- [ ] 3.3.1 Error Identification (A) — errors described in text.
- [ ] 3.3.2 Labels or Instructions (A).
- [ ] 3.3.3 Error Suggestion (AA) — say how to fix.
- [ ] 3.3.4 Error Prevention (Legal, Financial, Data) (AA) — reversible, checked, or confirmed.
- [ ] 3.3.7 Redundant Entry (A, **new in 2.2**) — do not ask for the same data twice in a process.
- [ ] 3.3.8 Accessible Authentication (Minimum) (AA, **new in 2.2**) — no cognitive tests; allow paste and password managers.

## Consistency and help

- [ ] 3.2.3 Consistent Navigation (AA).
- [ ] 3.2.4 Consistent Identification (AA) — same function, same label.
- [ ] 3.2.6 Consistent Help (A, **new in 2.2**) — help mechanisms in the same relative place.

## Dynamic content

- [ ] 4.1.3 Status Messages (AA) — announced without focus change.
