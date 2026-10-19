---
type: llm
---

PASS if the submit button stays enabled when fields are invalid (submitting shows the errors instead), AND while the POST is in flight the button shows a pending state and blocks double submission, AND a failed request shows an error message without clearing what the user typed.

FAIL if the submit button is disabled until the form is valid, if there is no pending state, or if the form clears the user's input on a failed request.
