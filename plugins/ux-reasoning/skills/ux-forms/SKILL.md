---
name: ux-forms
description: "Load before building or changing any form or input: sign-up, login, checkout, settings panel, search or filter bar, inline edit. Covers which fields to ask for, labels, input types and autocomplete, validation timing, error messages, submit and pending behavior, and multi-step flows."
---

# Form UX

Every field is a cost the user pays. The best form asks for less, makes each answer easy to give, and makes recovery from mistakes painless.

## 1. Cut fields first

For each field ask: is it needed for this task now, can it be inferred or defaulted, can it be asked later? Remove or defer what fails. If a field is optional, ask whether it should exist at all.

## 2. Layout and labels

- **One column.** Multi-column forms get read in the wrong order. Exceptions: short related pairs (city / postcode, expiry / CVC).
- **Visible labels above fields.** Placeholders are not labels: they disappear on input, have low contrast, and are skipped by some assistive tech. Use placeholders only for format examples, if at all.
- **Hint text sits between the label and the input**, connected with `aria-describedby`, so it is read before typing.
- **Mark the minority.** If most fields are required, mark optional ones with "(optional)"; if most are optional, mark the required ones. Do not rely on a red asterisk alone.
- **Size inputs to the expected answer.** A postcode field should not be full width; width is a hint about length.
- **Group related fields** with `<fieldset>` and `<legend>` (address, payment, radio groups).

## 3. The right control and input attributes

| Need | Use |
|---|---|
| 2–5 mutually exclusive options | Radio buttons, all visible |
| Long list of known options | `<select>`; past ~15–20 options, a searchable combobox |
| Yes/no that applies immediately | Switch (toggle) |
| Yes/no that applies on submit, or consent | Checkbox (never pre-checked for consent) |
| Number with small range | Stepper or select; free text for large or precise values |
| Memorable date (birth date) | Separate day / month / year text fields |
| Scheduling date | Date picker that also accepts typed input |

Set the attributes that browsers, password managers, and phone keyboards rely on: `type` (`email`, `tel`, `url`, `password`, `search`), `inputmode` (`numeric`, `decimal`), `autocomplete` tokens (`name`, `given-name`, `email`, `street-address`, `postal-code`, `cc-number`, `one-time-code`, `current-password`, `new-password`), and `enterkeyhint`. `autocomplete` is also a WCAG 2.2 AA requirement (1.3.5 Identify Input Purpose) for personal-data fields. Use `type="text" inputmode="numeric"` for codes and card numbers, not `type="number"` (which adds spinners and drops leading zeros).

## 4. Validation timing

- **Do not validate while the user is still typing a field for the first time.** Validate on blur (when they leave the field) or on submit.
- **Once a field shows an error, re-validate on every input** so the error clears the moment it is fixed.
- **On submit with errors**: keep everything entered, show an error summary at the top that lists each problem as a link to its field, move focus to the summary, and show the same message inline next to each field.
- **Do not disable the submit button to signal invalid input.** Users cannot tell why it is disabled. Let them submit and show what to fix. (Disabling *while a submission is pending* is correct — see below.)
- Validate on the server too; show server-side errors in the same inline style, mapped to fields.

Mark invalid fields with `aria-invalid="true"` and connect the message with `aria-describedby`. Do not signal errors with red color alone — include an icon or text.

## 5. Error messages

State the problem and the fix in plain words, specific to the field:

| Weak | Strong |
|---|---|
| Invalid input | Enter an email address like name@example.com |
| Field required | Enter your postcode |
| Password does not meet requirements | Password must be at least 12 characters (you have 9) |

Never clear a field because it was invalid. Never blame ("You entered a wrong value").

## 6. Passwords and authentication

- Allow paste and password managers (WCAG 2.2 AA 3.3.8 Accessible Authentication). Do not block paste into password or code fields.
- Offer a show/hide toggle instead of a "confirm password" field.
- Show requirements before the user types, and update them live once they start.
- One-time codes: one input with `autocomplete="one-time-code"` handles paste and SMS autofill; split boxes break both unless built carefully.

## 7. Submission

- On submit, put the button into a pending state (spinner or "Saving…") and block duplicate submissions; keep the button the same width so the layout does not jump.
- Make the server endpoint idempotent where double-submits would be harmful (payments, creates).
- On success, confirm in proportion (inline "Saved" for settings; a confirmation page for purchases) and move focus sensibly.
- On failure, keep the input and say what happened (see `ux-states`).
- For long forms, warn before navigating away with unsaved changes, and autosave drafts when the data allows.

## 8. Long and multi-step forms

- Break long forms into steps with one topic each; show progress ("Step 2 of 4") and allow going back without losing data.
- End with a review step for consequential submissions (orders, applications) with "Change" links to each section.
- Do not ask for the same information twice in one flow (WCAG 2.2 A 3.3.7 Redundant Entry); prefill or offer "Same as billing address".

## Checks

- [ ] Every field is justified; optional fields are marked.
- [ ] Every input has a visible, programmatically associated label.
- [ ] `type`, `inputmode`, and `autocomplete` are set where they apply.
- [ ] No validation fires during first-time typing; errors clear as soon as they are fixed.
- [ ] Submit with errors produces a focused summary plus inline messages, and keeps all input.
- [ ] Submit is never disabled for invalid input; it is disabled only while pending.
- [ ] Paste works in password and code fields.
- [ ] The whole form can be completed with a keyboard alone.
