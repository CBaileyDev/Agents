---
name: ux-audit
description: Audit an existing screen, flow, route, or the whole app for UX quality and produce a ranked, evidenced findings report without changing code. Run as /ux-audit [path, route, URL, or flow description].
argument-hint: [path | route | URL | flow, e.g. "src/app/settings" or "checkout flow"]
disable-model-invocation: true
---

# /ux-audit

Audit target: **$ARGUMENTS** (if empty, audit the app's primary user flow — find it from the router and the most-linked screens, and say which one you chose).

This command reports; it does not edit code. Offer fixes at the end.

## Steps

1. **Scope.** Identify the screens, components, and routes in scope by reading the code (router, page files, components they render). Write the scope line: what is evaluated, for which user and job (infer a brief with `ux-intent` if none exists), viewports, and themes.
2. **Render if possible.** If the app can be run (a dev script in `package.json`, a static build, or a provided URL), dispatch the **ux-reasoning:ux-visual-verifier** agent to capture the in-scope screens at 320, 390, 768, and 1280 px in light and dark themes, run a keyboard pass, and run an automated accessibility scan. If it cannot run, continue from code and lower confidence on visual findings.
3. **Independent review.** Dispatch the **ux-reasoning:ux-auditor** agent with the scope, the brief, the relevant file paths, and the verifier's report and screenshot paths. If the agents are not available, apply the `ux-heuristics` method yourself.
4. **Consolidate.** Merge duplicate findings, check each one against the code (drop any you cannot point to), and order by severity.
5. **Report** using the `ux-heuristics` report template: verdict, top three fixes, findings by severity with file references, what works well, and what was not checked.

## Final reply

The report, then a short offer: "I can fix the S1–S2 findings now" (and, if no `DESIGN.md` exists, "and write a DESIGN.md so future changes stay consistent").
