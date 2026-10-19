---
name: ux-review
description: Review the UI changes in the current diff, a branch, or a pull request for UX regressions and gaps — missing states, accessibility, feedback, forms, responsive behavior, motion, and design-system drift — with line-anchored findings. Run as /ux-review [base branch, commit range, or PR number].
argument-hint: [base ref | commit range | PR number] (default: uncommitted changes, else current branch vs. default branch)
disable-model-invocation: true
---

# /ux-review

Review target: **$ARGUMENTS**

## Steps

1. **Get the diff.**
   - No argument: uncommitted changes (`git diff HEAD`); if there are none, the current branch against the default branch (`git diff origin/HEAD...HEAD`, falling back to `origin/main` or `origin/master`).
   - A ref or range: `git diff <ref>...HEAD` or the given range.
   - A PR number: fetch the PR's diff with the available GitHub tooling.
2. **Filter to UI.** Keep files that render or style UI: components, pages, templates, styles, tokens, design-system files, copy/i18n strings, and the hooks or stores that drive UI state. Ignore pure backend changes unless they change error shapes or latency the UI depends on. If nothing UI-related changed, say so and stop.
3. **Understand intent from the code, not the description.** Read each changed UI file in full (not only the hunks) plus the components it renders. Treat the PR title, description, and commit messages as claims to verify, not as evidence.
4. **Review against the checklist** below, using the referenced skills for detail.
5. **Optionally render.** If the change is substantial and the app can run, dispatch **ux-reasoning:ux-visual-verifier** for the affected routes.
6. **Report.**

## Checklist for changed UI

- **States** (`ux-states`): Does new data fetching or a new list handle loading, empty, error, and overflow? Is previous data kept during refetch?
- **Feedback** (`ux-feedback`): Do new actions show pending state? Are new destructive actions guarded in proportion? Optimistic updates roll back?
- **Forms** (`ux-forms`): Labels, `autocomplete`/`type`/`inputmode`, validation timing, error messages, submit behavior.
- **Accessibility** (`ux-accessibility`): Semantic elements, names for icon buttons, focus management for new dialogs/menus/routes, contrast of new colors, target sizes.
- **Hierarchy** (`ux-hierarchy`): Did the change add a second primary action, or bury the existing one?
- **Responsive** (`ux-responsive`): New fixed widths, hover-only affordances, tables without a narrow-screen plan, `100vh`.
- **Motion** (`ux-motion`): Purpose, duration, `transform`/`opacity` only, reduced motion.
- **Design-system drift** (`ux-design-system`): Hard-coded colors, spacing, radii, shadows, z-index, or durations where tokens exist; new near-duplicate components; changes that contradict `DESIGN.md`.
- **Copy**: Button labels are verbs; error copy says what happened and what to do; consistent terminology.

## Report format

```markdown
**UX review verdict:** <Approve | Approve with fixes | Changes needed> — <one line why>

| Sev | Where | Issue | Suggested fix |
|---|---|---|---|
| S1 | `path/File.tsx:42` | … | … |
```

Then, for each S1/S2 finding, a short paragraph with the evidence. Close with "Not checked:" listing anything you could not verify (for example, rendered output). Cap the table at the ten most important findings and give a count of the rest.
