# ux-reasoning

UI/UX design reasoning for coding agents. Coding agents are good at producing UI that compiles and looks plausible with demo data. This plugin gets them to make the decisions a senior product designer would before and after rendering: who the screen is for, what the one primary action is, what every state looks like (empty, loading, error, overflow), how each action responds, how risky actions are guarded, how it moves, how it works on a 320 px phone and with a keyboard, and what visual direction it follows.

Plain Markdown skills in the standard `SKILL.md` format, plus Claude Code commands and subagents. No runtime, no license server, no telemetry.

## What's inside

### Knowledge skills (loaded automatically when relevant)

| Skill | Decides |
|---|---|
| `ux-intent` | Who the UI is for, the one job, the primary action, data shape, risky actions → a ten-line UI brief |
| `ux-hierarchy` | Ranking of actions and content, action weight, grouping, emphasis budget, density, progressive disclosure |
| `ux-states` | The state matrix: empty (3 kinds), loading thresholds, partial, error, offline, stale, permission, overflow |
| `ux-forms` | Fields, labels, input types and `autocomplete`, validation timing, error copy, submission, multi-step |
| `ux-feedback` | Response-time budget, optimistic vs pessimistic updates, where feedback goes, undo vs confirm vs type-to-confirm, interactive states |
| `ux-motion` | Purpose test, durations, easing, performance-safe properties, reduced motion, CSS vs View Transitions vs Motion vs GSAP ([recipes](skills/ux-motion/references/recipes.md)) |
| `ux-accessibility` | WCAG 2.2 AA: semantics, keyboard and focus, names, contrast, target size, announcements, verification ([checklist](skills/ux-accessibility/references/wcag22-aa-checklist.md)) |
| `ux-responsive` | Phone-first layout under 640 px, container queries, touch, viewport quirks, table/nav/dialog patterns |
| `ux-visual-direction` | One explicit decision per visual axis (type, color, shape, depth, space, icons, imagery, motion, voice); dark mode; avoiding generic defaults |
| `ux-design-system` | Discovering tokens and writing a `DESIGN.md` source of truth ([template](skills/ux-design-system/templates/DESIGN.md)) |
| `ux-heuristics` | Audit method: heuristic checklist, severity scale, evidence rules, report format ([template](skills/ux-heuristics/references/report-template.md)) |

### Workflow commands (you run these)

| Command | Does |
|---|---|
| `/ux-reasoning:ux-design <what to build>` | Brief → structure → states → visual decisions → build → verify with both subagents → fix S1/S2 |
| `/ux-reasoning:ux-audit [path, route, URL, flow]` | Ranked, evidenced findings report for existing UI; no code changes |
| `/ux-reasoning:ux-review [ref, range, PR]` | Reviews the UI parts of a diff with line-anchored findings |
| `/ux-reasoning:restyle <direction>` | Changes the visual direction through tokens without changing behavior; before/after screenshots |

### Subagents

| Agent | Role |
|---|---|
| `ux-auditor` | Read-only reviewer with fresh context. Applies the heuristics, states, forms, feedback, accessibility, hierarchy, responsive, and motion skills to code and screenshots; returns a severity-ranked report |
| `ux-visual-verifier` | Starts the app (or uses a URL), renders it in headless Chromium at 320/390/768/1280 px in light and dark, runs a keyboard pass and an axe-core scan, looks at the screenshots, and reports what it saw |

### Session hook

[`hooks/hooks.json`](hooks/hooks.json) runs at session start and adds a ten-line routing note ([`hooks/session-context.md`](hooks/session-context.md)) telling Claude which skill to load for which kind of UI work. Without it, Claude often answers one-shot UI prompts directly and never loads the skill bodies — in this plugin's evals, no skill fired in any of the seven cases before the hook was added, and a skill fired in all 14 runs after it. Delete the hook if you prefer to rely on skill descriptions alone.

### Capture script

[`scripts/ux-capture.mjs`](scripts/ux-capture.mjs) is what the visual verifier runs. It works on its own too:

```bash
node plugins/ux-reasoning/scripts/ux-capture.mjs http://localhost:5173/settings --keyboard --out .ux-captures/settings
```

It saves screenshots and a `report.json` with: horizontal overflow, targets under 24 px, unnamed controls, unlabeled inputs, images without `alt`, inputs under 16 px on phones, disabled zoom, focus order with focus-indicator detection, console errors, and axe-core WCAG 2.2 AA violations. It resolves Playwright and axe-core from your project first, then global installs. For the full scan, add them to the project: `npm i -D playwright @axe-core/playwright`.

## Install

### Claude Code

```text
/plugin marketplace add CBaileyDev/Agents
/plugin install ux-reasoning@cbaileydev
```

On Claude Code 2.1.275 or later, one step does both:

```text
/plugin install ux-reasoning --marketplace CBaileyDev/Agents
```

To try a local checkout without installing: `claude --plugin-dir ./plugins/ux-reasoning`.

### Other agents (Codex, Cursor, and other `SKILL.md`-compatible tools)

Copy the skill folders into the tool's skills directory — `~/.agents/skills/` for user-wide use or `.agents/skills/` in a project (both read by Codex and Cursor; check your tool's docs for others):

```bash
mkdir -p ~/.agents/skills && cp -r plugins/ux-reasoning/skills/* ~/.agents/skills/
```

The knowledge skills work unchanged. The workflow skills (`ux-design`, `ux-audit`, `ux-review`, `restyle`) work as normal skills; their steps that dispatch subagents fall back to doing the work inline. The subagents, the session hook, and the `${CLAUDE_PLUGIN_ROOT}` path are Claude Code features. Elsewhere, run the capture script by its path, and paste the routing note from `hooks/session-context.md` into your `AGENTS.md` (dropping the `ux-reasoning:` prefixes) so the agent knows when to load each skill.

## Recommended project setup

- Write a `DESIGN.md` (run `/ux-reasoning:ux-audit`, then ask for one, or ask directly — `ux-design-system` handles it) and add "Read DESIGN.md before any UI change" to `AGENTS.md` or `CLAUDE.md`.
- Add `.ux-captures/` to `.gitignore`.
- Add `playwright` and `@axe-core/playwright` as dev dependencies so the verifier can scan.

## Evals

`evals/` holds seven everyday UI prompts (delete-account button, sign-up form, fetched user list, icon toolbar, animated modal, comparison table, settings save) with rule-based and rubric graders that check outcomes — confirmation for irreversible actions, labels and `autocomplete`, empty/error states, accessible names and `aria-pressed`, reduced motion and focus management, a phone strategy for tables, save feedback. Graders check behavior in the code, not whether the plugin's vocabulary appears, so the baseline can pass too.

Run them with and without the plugin (the no-plugin arm is automatic):

```bash
cd plugins/ux-reasoning
claude plugin eval . --runs 3 -j 4 --threshold 0.8 --no-publish
```

That is 7 cases × 3 runs × 2 arms = 42 agent runs plus judge calls; use `--runs 1` or `--case <name>` for a cheaper pass, and `--max-cost-usd` to cap spend. Results land in `evals/results/<timestamp>/` (git-ignored) with `report.html` showing WITH, W/OUT, and Δ per case. Each case also reports whether a `ux-*` skill fired (an indicator, not scored).

### Results (2026-10-19, Claude Code 2.1.303, 2 runs per arm, default models, about $2 total)

| Case | With plugin | Without | Δ | What the baseline missed |
|---|---|---|---|---|
| delete-account | 1.00 | 0.25 | +0.75 | Used `window.confirm()`; no type-to-confirm or permanence warning |
| settings-save | 1.00 | 0.33 | +0.67 | Missing pending state, success announcement, or failure message |
| user-list | 1.00 | 0.33 | +0.67 | Missing a distinct empty state or a retry on error |
| comparison-table | 1.00 | 0.75 | +0.25 | One run had no phone-width strategy |
| animated-modal | 1.00 | 1.00 | 0 | — |
| icon-toolbar | 1.00 | 1.00 | 0 | — |
| signup-form | 1.00 | 1.00 | 0 | — |
| **Mean** | **1.00** | **0.67** | **+0.33** | |

A skill fired in all 14 with-plugin runs. Two runs per arm is a small sample and the graders are the plugin author's, so treat this as a regression baseline rather than proof; rerun with `--runs 3` or more after changing skills. Before the session hook was added, a one-run pass scored 0.90 with vs 0.77 without, and no skill fired in any case.

## Sources

The guidance is written from public, primary sources, chiefly:

- W3C, *Web Content Accessibility Guidelines (WCAG) 2.2*, https://www.w3.org/TR/WCAG22/, and the WAI-ARIA Authoring Practices Guide, https://www.w3.org/WAI/ARIA/apg/
- Nielsen Norman Group, *10 Usability Heuristics for User Interface Design*, https://www.nngroup.com/articles/ten-usability-heuristics/, and *Response Times: The 3 Important Limits*, https://www.nngroup.com/articles/response-times-3-important-limits/
- GOV.UK Design System — question pages, error messages, error summary, and buttons guidance, https://design-system.service.gov.uk/
- Apple Human Interface Guidelines (44 pt targets), https://developer.apple.com/design/human-interface-guidelines/ and Material Design 3 (48 dp targets, motion), https://m3.material.io/
- MDN Web Docs for CSS features (`@starting-style`, View Transitions, container queries, `dvh`, `prefers-reduced-motion`), https://developer.mozilla.org/
- Motion docs, https://motion.dev/docs, and GSAP docs, https://gsap.com/docs/
