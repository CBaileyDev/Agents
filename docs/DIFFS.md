# Diff Summary and Proposed Changes

Citation IDs refer to the bibliography in `00_REPORT.md`.

## Shared Changes

- Kept the original eight-section template, but moved cross-agent behavior into `team-protocol.md` and research rationale into `01_DESIGN_PRINCIPLES.md`. Reason: shared rules reduce duplicate prompt bulk and align with simple composable agent design [R1, R5].
- Added a shared ambiguity rule: ask only when missing information changes safety, architecture, public behavior, or acceptance. Reason: coding agents should act when safe but clarify when truly blocked [R4].
- Added evidence requirements to handoffs and outputs. Reason: guardrails are more reliable when tied to observable checks [R6, R9, R12].
- Removed or softened performative language. Reason: over-prompting can degrade modern coding-agent behavior [R5].
- Kept prompt bodies free of YAML frontmatter, slash commands, and host-specific tool calls. Reason: portability across Claude Code, Codex, Copilot, Kimi, Gemini CLI, and Cursor was a hard constraint.

## README.md

- Replaced CLI-specific body examples with deployment notes that keep wrappers outside prompt bodies [R26, R27].
- Added role "primary use" table for faster routing [R1, R30].
- Preserved recommended pairings and made the user's core stack more explicit.
- Marked Minecraft/ML/RL/tutor agents as intentionally omitted to avoid re-proposing declined additions.

## team-protocol.md

- Added "Does Not Own" column to reduce domain overlap and ownership confusion [R12].
- Added "Evidence Expected" to the handoff contract [R6, R12].
- Added default routing and ambiguity rules [R4].
- Added explicit evidence, conflict, and release standards [R6, R22, R24].
- Split owner vs reviewer responsibilities to avoid hidden accountability gaps [R30].

## project-organizer.md

- Added safe-assumption vs clarifying-question rule [R4].
- Added evidence expected, critical path, and parallel work sections [R1, R12].
- Required exactly one accountable owner per task, with reviewers separate [R12, R30].
- Replaced vague acceptance with observable checks such as commands, artifacts, citations, or screenshots [R6].
- Strengthened self-critique against hidden dependencies and "TBD" acceptance criteria [R12].

## system-architect.md

- Added trust boundaries, state boundaries, migration, and rollback thinking [R21, R22].
- Required verification criteria for options and chosen architecture [R6].
- Added "what would prove this wrong later" to avoid unfalsifiable designs [R9].
- Made quality attributes the first trade-off anchor [R1].
- Added explicit specialist handoffs from ADR output [R2, R3].

## code-reviewer.md

- Changed output to findings-first, with verdict after findings. Reason: review consumers need actionable issues before summary.
- Removed mandatory praise and reduced nit emphasis to avoid low-value review noise [R11].
- Required failing input/state or observable impact for findings to reduce false positives [R10, R11].
- Added "Evidence Reviewed" and "not run" fields [R6].
- Clarified that exploitable findings go to Security Reviewer instead of duplicating security ownership [R21].

## security-reviewer.md

- Updated security currency to OWASP Top 10:2025, supply chain, SBOMs, provenance, signing, and CI integrity [R20, R21, R22, R24].
- Required authorization/scope before risky third-party or binary-analysis work [R10].
- Required attack scenario, prerequisites, impact, evidence, remediation, and regression test for findings [R10].
- Replaced vague "maintainer reputation" with concrete dependency and supply-chain checks [R22, R24, R25].
- Added DevOps handoff for signing, SBOM, dependency scanning, provenance, and CI permissions [R23, R24].

## qa-tester.md

- Reframed universal mutation checking into risk-based verification so the rule is practical [R6].
- Added PR/nightly/release/manual quality gate thinking via DevOps collaboration [R22].
- Added "Verification Performed" and "Not run" reporting [R6].
- Expanded UI/a11y verification to focus, labels, contrast, responsive behavior, and reduced motion [R18, R19].
- Required every important test to map to risk or acceptance criteria [R9].

## debugging-specialist.md

- Kept the strong hypothesis/prediction/experiment workflow and converted it into a compact investigation table [R32].
- Added environment capture to handle version, OS, runtime, and config drift.
- Added explicit root cause vs trigger vs contributing factor separation.
- Required missing-reproduction evidence instead of pretending a repro exists [R6].
- Added dead-end preservation to reduce repeated failed paths [R32].

## csharp-dotnet-specialist.md

- Updated currency to C# 12-14 and .NET 8/9/10 while preserving existing project constraints [R13, R14].
- Recentered WPF as the user's primary desktop stack; kept WinUI as adjacent.
- Added binding diagnostics, high contrast, DPI, and UI verification evidence [R14].
- Strengthened async/cancellation/dispatcher rules and kept the original no-blocking rule.
- Routed signing, MSIX/Velopack, and release concerns to DevOps rather than overloading the C# agent [R23].

## cpp-specialist.md

- Made C++20/23 production defaults and C++26 conditional on toolchain support [R17].
- Added ABI/FFI ownership, panic/exception, and interop contract concerns for .NET/Rust/Python work.
- Preserved strong RAII/UB rules and made sanitizer use evidence-based when feasible.
- Added Windows native specifics: MSVC, MSBuild, PDBs, ETW, and DLL boundaries.
- Required explicit error strategy instead of mixing exceptions, status codes, and `std::expected`.

## python-specialist.md

- Updated modern Python range to 3.12-3.14+ [R15].
- Added dependency-risk justification for new packages [R21, R22].
- Added lockfile/tooling awareness around `uv`, `ruff`, pytest, pyright/mypy, and packaging.
- Added explicit shell/subprocess and untrusted-input security routing.
- Added verification reporting for lint, type check, tests, and not-run checks [R6].

## rust-specialist.md

- Preserved Rust 2024 focus and added MSRV, target triples, and feature-matrix checks [R16].
- Strengthened FFI contracts: ownership, allocation, threading, panic, and lifetime rules.
- Clarified `thiserror` for libraries and `anyhow`/`eyre` for binaries.
- Added feature-flag additive/documented rule.
- Added verification across fmt, clippy, tests, docs, and relevant feature combinations [R6].

## frontend-designer.md

- Preserved React 19/Svelte 5 currency and added WPF/WinUI UX collaboration for the user's desktop-heavy stack [R18, R19].
- Required state coverage: loading, empty, error, disabled, hover, focus, active, validation, and offline when relevant.
- Added rendered-UI verification evidence and explicit "not run" reporting [R6].
- Strengthened accessibility checks around labels, focus, keyboard, contrast, and reduced motion.
- Kept anti-generic-AI-UI guidance while making it less stylistic and more workflow-driven.

## windows-internals-specialist.md

- Strengthened, not weakened, ethics scope: explicit bans on malware, credential theft, offensive evasion, unauthorized exploit code, and anti-cheat bypass.
- Added artifact provenance and authorization checks before third-party analysis [R10].
- Added sandbox isolation details for dynamic analysis.
- Required observed evidence to be separated from inferred intent.
- Added API documentation-status labeling: documented, semi-documented, or community-reversed/version-sensitive [R14].
- Preserved least-invasive preference for ETW/logs/documented APIs before hooks or injection.

## researcher.md

- Required decision context and criteria before gathering data to reduce search-result bias [R7].
- Strengthened primary-source hierarchy and source-type labeling.
- Required confidence levels and conflicts/uncertainty.
- Required URL and date for every non-obvious claim.
- Clarified that implementation choices go back to domain owners.

## devops-engineer.md

- Added SBOM, SLSA provenance, Sigstore/cosign, dependency review, and least-privilege CI permissions [R22, R23, R24, R25].
- Preserved signing and pinned-tool rules.
- Added artifact table covering signing, SBOM/provenance, and verification evidence.
- Added local/CI parity output and clean-machine verification reporting [R6].
- Clarified secrets: names only, never values.

## documentation-specialist.md

- Preserved Diataxis and runnable-example focus.
- Added reader/task definition as the first output fields.
- Added exact verification reporting for examples, links, and version-sensitive claims [R6].
- Added compatibility date/version stamping.
- Revised README template toward quick start, common tasks, troubleshooting, and development commands.

## New Agents Considered

- Agent Evaluation & Prompt Reliability Specialist: potentially useful later for cross-model evals, but not added because there is no task corpus or eval harness yet. Adding it now would violate the "bloat is the enemy" constraint [R1, R5].
- Minecraft Modding Specialist: not proposed because the user already declined Minecraft as a new agent.
- ML/RL and Tutor agents: not proposed because the user already declined them.

