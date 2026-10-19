# UX audit report template

```markdown
# UX audit — <scope>

**Verdict:** <one line, e.g. "Usable on desktop; blocked on phones and for keyboard users — 2 blockers, 5 major.">

**Evaluated:** <screens/flow/diff> · **User & job:** <from the UI brief> · **Viewports:** <e.g. 320, 390, 1280> · **Themes:** <light/dark>
**Evidence:** <rules-based checks run, rendered checks run, code read> · **Not checked:** <and why>

## Top fixes
1. <Highest-impact change, one line>
2. <…>
3. <…>

## S1 — Blockers
### <Short title>
- **Where:** `<file:line>` / <route> / <screenshot region>
- **Observed:** <what actually happens>
- **Why it matters:** <heuristic or WCAG criterion; who is affected>
- **Fix:** <specific change>
- **Evidence type:** rules-based | rendered | code | judgment

## S2 — Major
<same structure>

## S3 — Minor
<same structure, or a compact table: Where | Issue | Fix>

## S4 — Polish
<count and a short list>

## Working well
- <What to keep, one or two lines>

## Suggested next steps
- <e.g. "Run `/ux-reasoning:restyle` after fixing S1–S2", "Add stories for empty and error states", "Write DESIGN.md">
```

Keep the verdict honest: if blockers exist, the verdict says so even when the rest is strong.
