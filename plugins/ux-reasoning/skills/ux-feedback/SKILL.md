---
name: ux-feedback
description: "Load before wiring any button, save, delete, toggle, mutation, drag-and-drop, or other action whose result is not instant. Sets the response-time budget, pending and optimistic states, where success and error feedback appears, interactive state styles, disabled-state explanations, and undo vs confirm vs type-to-confirm for destructive actions."
---

# Feedback & Affordance

Two questions every control must answer without help: *What will this do?* (affordance) and *Did it work?* (feedback).

## Response-time budget

These limits come from long-standing human-computer interaction research (Miller 1968; Card, Robertson & Mackinlay 1991; popularized by Nielsen) and still hold:

| Delay | Perception | Required feedback |
|---|---|---|
| ≤ 100 ms | Instant, caused by me | Visual change on the control itself (pressed state, checkmark, toggled value). Budget for this on every click and keypress |
| ≤ 1 s | Noticeable, flow intact | Pending state on the control (spinner inside the button, "Saving…"); no blocking overlay |
| 1–10 s | Attention drifts | Progress message on the affected area; keep the rest of the UI usable |
| > 10 s | User leaves | Determinate progress, cancel, and a notification when done; let them navigate away |

Never let a click produce no visible change within 100 ms. If the work takes longer, change *something* immediately (pressed/pending state) and the result later.

## Optimistic vs pessimistic updates

- **Optimistic** (update UI now, reconcile later) for frequent, low-risk, usually-successful actions: like, star, reorder, toggle, rename, mark as read. On failure, roll back visibly and say so ("Couldn't save — restored").
- **Pessimistic** (wait for the server) for money, permissions, sending messages to other people, irreversible operations, and anything where a rollback would surprise someone.
- React 19 provides `useOptimistic` and `useActionState`; TanStack Query supports optimistic updates via `onMutate` with rollback in `onError`.

## Where feedback goes

Put feedback where the user is looking, scaled to the importance of the event:

| Event | Channel |
|---|---|
| Field-level result (saved, invalid) | Inline, next to the field |
| Action on an item (deleted, moved) | On the item, or a toast with **Undo** |
| Background job finished | Toast or notification badge; do not steal focus |
| Blocking problem the user must act on | Inline banner at the top of the affected region |
| Destructive confirmation | Dialog (see below) — never a toast |

Toasts: one at a time or stacked with a limit, ≥ ~5 s for text with an action (or until dismissed), pause on hover and focus, never the only record of an error the user must fix. Announce them politely to screen readers (`role="status"` / `aria-live="polite"`; WCAG 2.2 AA 4.1.3 Status Messages).

## Destructive actions: prefer undo to confirmation

Choose the lightest safeguard that matches how bad and how reversible the outcome is:

1. **Reversible and low-impact** (archive, remove from list, delete a draft): do it immediately and offer **Undo** for several seconds (soft-delete on the backend). No dialog.
2. **Hard to reverse or affects others** (delete a shared project, remove a member, cancel a subscription): confirmation dialog. Title states the action and object ("Delete project 'Atlas'?"), body states the consequence ("12 files and 3 integrations will be removed for everyone"), buttons are verbs ("Delete project" / "Cancel"), never "OK / Cancel". The danger-colored button is not the default focus; focus starts on Cancel or the dialog itself.
3. **Irreversible and severe** (delete account, drop database, wipe data): require typing the object's name (or a fixed word) to enable the confirm button, and say plainly that it cannot be undone. Offer an export first when relevant.

Confirmation dialogs lose their power when they appear for everything; if users confirm without reading, use undo instead.

## Affordance: controls look like what they do

- Buttons look pressable (filled, outlined, or clearly button-shaped text); links look like links (color plus underline in body text).
- Do not make non-interactive elements look interactive (colored text that is not a link, cards with hover lift that are not clickable).
- If a whole card is clickable, make the whole card the hit area and keep nested controls working.
- Icon-only buttons need an accessible name and, on pointer devices, a tooltip.
- Draggable items show a grip handle and cursor change; offer a keyboard or button alternative (WCAG 2.2 AA 2.5.7 Dragging Movements).

## Interactive state styling

Every interactive element needs distinct styles for: **default, hover** (pointer devices only — wrap in `@media (hover: hover)`), **focus-visible** (a clear outline with ≥ 3:1 contrast against the background), **active/pressed, disabled, loading/pending,** and where relevant **selected/checked** and **invalid**. Missing focus styles are a WCAG failure, not a style choice.

## Disabled states

- Prefer explaining over disabling. A disabled button with no reason is a dead end; add a tooltip or helper text ("Add a payment method to upgrade"), or keep it enabled and explain on click.
- Disabled controls are exempt from contrast rules, so they are often unreadable — keep their labels legible anyway.
- `aria-disabled="true"` keeps a control focusable so its explanation can be discovered (you must block activation in the handler yourself); the native `disabled` attribute removes it from the tab order.

## Checks

- [ ] Every control changes visibly within 100 ms of activation.
- [ ] Actions over ~1 s show a pending state on the control; over ~10 s show progress and allow leaving.
- [ ] Optimistic updates roll back visibly on failure.
- [ ] Destructive actions use undo, confirmation, or type-to-confirm according to severity, with verb-labeled buttons.
- [ ] Every interactive element has hover, focus-visible, active, and disabled styles.
- [ ] Every disabled control explains why.
- [ ] Status messages are announced to assistive technology.
