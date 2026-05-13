# Mission: Audit and Improve the AI Agent Team

> Paste this entire file into Codex (GPT-5.5 xtrahigh) at the root of `C:\Users\Carte\agents\`. Codex has file access and web search — use both.

---

## Your Role
You are a **Principal Prompt Engineer and AI Agent Architect**. You think like a critic before you propose changes. You cite sources. You distinguish "this is documented best practice in 2026" from "this is my opinion." You never pad with filler.

## Context
A team of 15 specialized AI-agent prompts lives in `C:\Users\Carte\agents\`. They are deployed across **Claude Code, Codex, GitHub Copilot, Kimi, Gemini CLI, and Cursor**, and must remain **model-agnostic** and **portable** across all of them.

Each agent file follows an 8-section template:
1. Identity & Role
2. Core Expertise & Mindset
3. Primary Responsibilities
4. Detailed Workflow / Reasoning Process
5. Collaboration Rules
6. Output Format
7. Quality Guardrails & Self-Critique
8. Tools & Capabilities

The user's real stack (per `README.md` recommended pairings): **WPF / .NET 8+, native C++ / Win32, Python, Rust, Windows binary analysis (defensive), Minecraft modding (Java/Kotlin via curseforge)**.

## Mission
Make these agents **substantially better** — not cosmetic polish. Find real weaknesses and fix them with **research-backed** changes. Bloat is the enemy. Concrete, falsifiable rules beat aspirational language.

---

## Phase 1 — Read & Understand

Read every `.md` file in `C:\Users\Carte\agents\`. Build a model of:
- What each agent does
- How they hand off (`team-protocol.md`)
- The 8-section template (`README.md`)
- The user's actual stack and project mix

Do not paraphrase yet. Just absorb.

## Phase 2 — Research (do not skip this phase)

Web-search and synthesize current best practices. **Cite every non-obvious claim** with a URL and date. Note recency.

Topics to research:

1. **Agent prompt design (2025–2026)**
   - Anthropic's "Building Effective Agents" and "Agents and tools" guides
   - OpenAI's Codex / Agents SDK prompting docs and cookbook
   - Recent arXiv papers on agent reliability, planner-executor patterns, self-critique
   - Open-source agent prompts to learn from: Cursor rules, Cline, Roo Code, OpenHands, Aider, Continue, Bolt, v0, Devin's published prompts, GitHub Copilot Chat custom modes, Claude Code's default subagents, CrewAI examples, LangGraph supervisor patterns

2. **Prompt-engineering techniques**
   - When XML tags help vs hurt across models
   - Chain-of-thought scaffolding for non-reasoning vs reasoning models
   - Self-consistency, self-critique, reflection loops
   - Few-shot example design (one example > five mediocre)
   - Structured outputs (JSON Schema, Pydantic, TypeScript types) and when to require them
   - Token efficiency — what to cut, what's load-bearing

3. **Domain currency (late 2025 / 2026)**
   - Modern Python, modern C++ (23/26), .NET 9/10 + WPF/WinUI, Rust 2024 edition, React 19 / Svelte 5
   - Current CI/CD, signing (Authenticode, Sigstore), packaging (MSIX, Velopack)
   - OWASP 2025 updates, supply-chain attack guidance, SBOM standards

4. **Known LLM failure modes in agentic work**
   - In code review: false positives, missing security issues, style nitpicking
   - In debugging: stopping at first plausible cause, fabricated repros
   - In planning: over-decomposition, hidden dependencies
   - How leading frameworks (Anthropic's harness, Codex, Cursor Agent) mitigate them

## Phase 3 — Evaluate

For each of the 15 agents, score 1–5 on each axis (with a one-line justification per axis):

| Axis | Question |
|------|----------|
| Clarity | Would a fresh LLM understand the role immediately? |
| Completeness | Does it cover the typical task surface? |
| Specificity | Concrete instructions vs vague platitudes? |
| Portability | Works equivalently across CC, Codex, Copilot, Gemini, Kimi, Cursor? |
| Self-verification | Real guardrails or just slogans? |
| Tool guidance | Does it teach *how* to use tools, not just list them? |
| Failure-mode awareness | Does it warn against documented LLM failure modes? |
| Currency | Reflects 2026 tools, versions, and idioms? |
| Examples | Includes grounded few-shot examples where useful? |

Then write a 3–6 bullet evidence-backed critique per agent.

## Phase 4 — Cross-Cutting Findings

Identify issues that affect the whole team:
- Redundancies between agents (e.g., do Code Reviewer and Security Reviewer overlap unhelpfully?)
- Conflicts in collaboration protocol
- Gaps in coverage given the user's stack
- Missing meta-rules (e.g., how to behave under ambiguity, when to ask vs assume)
- Inconsistent output formats
- The 8-section template itself — should sections be added, merged, reordered, or made conditional? Justify any change.

## Phase 5 — Propose & Rewrite

For each agent:
1. List **3–7 concrete proposed changes** with reasoning and a research citation
2. Produce the **full rewritten file** that implements them
3. Provide a concise diff summary (what changed, why)

Also propose:
- Any **new agents** that fill identified gaps (the user already declined Minecraft, ML/RL, and Tutor — don't re-propose those unless you find a much stronger case)
- Updates to `README.md` and `team-protocol.md`
- A short `AGENT_DESIGN_PRINCIPLES.md` capturing the meta-rules you applied

## Constraints (strict)
- **MUST** keep agents model-agnostic and portable across Claude Code, Codex, GitHub Copilot, Kimi, Gemini CLI, and Cursor
- **MUST NOT** embed CLI-specific syntax inside the prompt body (no YAML frontmatter, slash commands, `@tool` references)
- **MUST** preserve the user's stack focus: WPF/.NET, native C++, Python, Rust, Windows binary analysis (defensive)
- **MUST** keep the ethics scope in `windows-internals-specialist.md` intact or strengthen it
- **SHOULD** prefer concrete, falsifiable rules over aspirational language
- **NEVER** add length for length's sake — every paragraph must earn its place
- **NEVER** weaken existing **MUST** / **NEVER** rules; only refine or extend them

## Deliverables (write to disk)

Create `C:\Users\Carte\agents\improved\` containing:

| File | Contents |
|------|----------|
| `00_REPORT.md` | Evaluation table, per-agent scores, cross-cutting findings, full research bibliography with URLs and dates |
| `01_DESIGN_PRINCIPLES.md` | Meta-rules you applied (5–15 principles, each with a citation) |
| `<agent>.md` × 15 | Rewritten file per agent, matching original filenames |
| `README.md` | Updated index reflecting changes |
| `team-protocol.md` | Updated protocol reflecting changes |
| `DIFFS.md` | Per-agent concise summary of what changed and why, with citations |

Do **not** overwrite originals in the parent directory. Improvements live in `improved/` so the user can diff and choose what to adopt.

## Quality Bar — self-audit before declaring done

Before you submit, answer each:
- Have I **cited** every non-obvious claim with URL + date?
- Are my proposed changes **falsifiable** (could the user tell if they made things worse)?
- Did I avoid the AI tendency to add bullets without adding value?
- Did I **preserve** everything that was already good?
- Could a different LLM (smaller / different family) apply these prompts today and produce useful output?
- Did I match output depth to actual improvement potential — not over-rewriting agents that were already strong?

If any answer is "no" — fix it before delivering.

## Operating Rules
- **Ask clarifying questions only if a constraint is genuinely ambiguous.** Otherwise execute the full mission and deliver all artifacts.
- **Use your web-search tools liberally** in Phase 2. Without research, this is just opinion-shuffling.
- **Use your file-write tools** to produce the deliverables — don't dump everything into chat.
- **Show your work** in `00_REPORT.md`: scores, evidence, citations.
- **Time budget**: take the time you need. Quality > speed.

Begin Phase 1.
