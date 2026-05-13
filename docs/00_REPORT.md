# AI Agent Team Audit Report

Audit date: 2026-05-12  
Scope: every Markdown file in `C:\Users\Carte\agents\`; rewritten artifacts were written only under `improved/`.

## Executive Summary

The original team was already structurally sound: clear roles, a consistent eight-section template, explicit collaboration names, and strong domain focus for WPF/.NET, native C++/Win32, Python, Rust, defensive Windows binary analysis, and release engineering. The weaknesses were cross-cutting rather than isolated:

- Tool sections mostly listed capabilities instead of telling agents when to read, search, run, verify, or ask. This matters because modern agent guidance treats tools, handoffs, and guardrails as part of the agent contract, not an afterthought [R2, R5, R6].
- Several guardrails were slogans without evidence requirements. The improved prompts require observed commands, file references, source links, screenshots, scan results, or explicit "not run" statements [R6, R9].
- Few-shot examples were sparse. The rewrite adds examples only where they change behavior materially, especially handoffs and structured outputs, because over-prompting can reduce quality in modern coding models [R4, R5, R7].
- Security and release prompts needed 2025/2026 supply-chain currency: OWASP Top 10:2025, SLSA 1.2, SBOM minimum elements, and signing/provenance expectations [R21, R22, R23, R24].
- Multi-agent dependency handling needed sharper ownership, evidence, and conflict rules. Recent multi-agent failure taxonomies identify specification, coordination, and verification failures as recurring causes [R12].

I kept the eight-section template. The better fix was to strengthen the shared protocol and improve the content inside each section, not add new mandatory sections that would increase prompt overhead.

## Research Synthesis

### Agent Prompt Design

- Anthropic's agent guidance distinguishes workflows from agents and recommends simple, composable patterns before high-autonomy loops. That supports keeping this team modular and handoff-driven rather than adding a heavier supervisor protocol [R1].
- OpenAI's Agents SDK frames an agent as instructions plus tools, handoffs, guardrails, and structured outputs. The rewrite therefore made handoff evidence and verification first-class concepts in `team-protocol.md` [R2, R6].
- OpenAI Codex guidance favors action-oriented coding agents, while acknowledging that clarification is still useful when the agent is truly blocked. The rewrite uses the rule: ask only when missing information changes safety, architecture, public behavior, or acceptance [R4].
- OpenAI's Codex prompting guide warns that over-prompting can harm output quality. The rewrite removes theatrical language and replaces it with concrete checks [R5].
- LangGraph and CrewAI patterns both emphasize clear agent roles and explicit handoffs/supervision. The team protocol now separates accountable owner from reviewers to reduce coordination ambiguity [R29, R30].

### Prompt Engineering Techniques

- XML tags are a Claude-specific recommendation for separating prompt parts, but these prompts must be portable across multiple model families. I kept Markdown sections and code fences as the default, and avoided universal XML requirements [R7].
- Structured outputs are strongest when enforced by schemas in the host layer, not by prompt text alone. The rewritten prompts request stable text/table formats while telling users to configure schemas externally where available [R8].
- Self-critique is useful only when tied to criteria. The rewrite converts "self-critique" into evidence checks: what was read, what was run, what was not run, and what residual risk remains [R6, R9].
- Few-shot examples help format following when representative. I added compact examples only for handoffs and output contracts where a smaller model benefits from a concrete pattern [R7].

### Domain Currency

- .NET 10 is the current LTS line after its 2025 release, while the user's .NET 8+ constraint still matters for existing projects. The C# agent now confirms TFM instead of assuming a blanket upgrade [R13].
- Python 3.14 was released on 2025-10-07; Python prompts should recognize 3.12-3.14 as the modern range rather than stopping at 3.12 [R15].
- Rust 2024 is stable via Rust 1.85.0; the Rust agent now treats Rust 2024 as current but still asks for MSRV and target triples [R16].
- React 19 and Svelte 5 are current major frontend baselines, but the user's stack is desktop-heavy, so the frontend prompt also covers WPF/WinUI UX collaboration [R18, R19].
- OWASP Top 10:2025 includes software supply-chain failures prominently; DevOps and Security now include SBOM/provenance/signing as normal release concerns [R21, R22, R24].

### LLM Failure Modes

- LLM-assisted security review can show confirmation bias and false confidence, so security findings now require trust boundaries, attack scenario, exploitability, and evidence [R10].
- LLM code review can miss context or produce low-value comments; the Code Reviewer now requires intent reconstruction, surrounding-code review, and fewer high-confidence findings [R11].
- Debugging prompts must resist plausible but unsupported explanations; the Debugging Specialist now requires hypothesis, prediction, experiment, result, and root-cause evidence [R12, R32].
- Multi-agent systems fail when task specifications, dependencies, and verification are implicit. The protocol now requires acceptance criteria and expected evidence in every handoff [R12].

## Score Legend

1 = weak or mostly absent. 2 = present but unreliable. 3 = usable with gaps. 4 = strong with refinements needed. 5 = excellent.

## Score Matrix

| Agent | Clarity | Completeness | Specificity | Portability | Self-verification | Tool guidance | Failure-mode awareness | Currency | Examples |
|-------|---------|--------------|-------------|-------------|-------------------|---------------|------------------------|----------|----------|
| Project Organization & Planning | 5 | 4 | 4 | 5 | 3 | 2 | 3 | 4 | 3 |
| System Architect | 5 | 4 | 4 | 5 | 3 | 2 | 3 | 4 | 2 |
| Senior Code Reviewer | 5 | 4 | 4 | 5 | 3 | 2 | 3 | 4 | 2 |
| Security Reviewer | 5 | 4 | 4 | 5 | 4 | 3 | 4 | 3 | 2 |
| QA / Testing Agent | 5 | 4 | 4 | 5 | 4 | 3 | 4 | 4 | 3 |
| Debugging / Triage Specialist | 5 | 4 | 5 | 5 | 4 | 3 | 5 | 4 | 2 |
| C# / .NET / WPF Specialist | 5 | 4 | 4 | 5 | 4 | 3 | 4 | 4 | 2 |
| C / C++ Specialist | 5 | 4 | 5 | 5 | 4 | 4 | 4 | 4 | 2 |
| Python Specialist | 5 | 4 | 4 | 5 | 3 | 3 | 3 | 3 | 2 |
| Rust Specialist | 5 | 4 | 4 | 5 | 4 | 3 | 4 | 5 | 2 |
| Frontend GUI / UX Designer | 5 | 4 | 4 | 5 | 4 | 3 | 4 | 4 | 2 |
| Windows Internals / Binary Analysis | 5 | 4 | 5 | 5 | 5 | 4 | 5 | 4 | 3 |
| General Researcher | 5 | 4 | 5 | 5 | 4 | 4 | 4 | 4 | 3 |
| DevOps / Build & Release Engineer | 5 | 4 | 4 | 5 | 4 | 4 | 4 | 4 | 2 |
| Documentation Specialist | 5 | 4 | 4 | 5 | 4 | 3 | 3 | 4 | 3 |

## Detailed Agent Evaluations

### Project Organization & Planning Agent
| Axis | Score | Justification |
|------|-------|---------------|
| Clarity | 5 | Role and orchestration ownership are immediate. |
| Completeness | 4 | Covers planning flow, but not evidence expected back from specialists. |
| Specificity | 4 | Task table and acceptance criteria are concrete, but ambiguity rules are underdefined. |
| Portability | 5 | No vendor-specific syntax. |
| Self-verification | 3 | Re-evaluate plan rule exists, but no check for hidden dependencies or evidence gaps. |
| Tool guidance | 2 | Lists plan files and specialists, not how to inspect context or verify status. |
| Failure-mode awareness | 3 | Mentions over-planning and hidden dependencies, but not over-decomposition or coordination failure. |
| Currency | 4 | Process guidance is mostly timeless. |
| Examples | 3 | Has a useful table template, but no full handoff example. |

Critique:
- The orchestrator says it routes work, but the old protocol did not require "evidence expected" in handoffs; this increases verification failures in multi-agent work [R12].
- It asks clarifying questions whenever scope is vague, but modern coding agents benefit from acting under safe assumptions when not blocked [R4].
- It does not separate owner from reviewer, which can blur accountability in cross-agent workflows [R29].
- It lacks an explicit rule for parallelizable work, despite independent-task decomposition being a major benefit of agent teams [R1].

### System Architect
| Axis | Score | Justification |
|------|-------|---------------|
| Clarity | 5 | Architect identity and ADR ownership are clear. |
| Completeness | 4 | Strong ADR flow, but weaker on migration and verification evidence. |
| Specificity | 4 | Quality attributes and alternatives are concrete. |
| Portability | 5 | Portable Markdown format. |
| Self-verification | 3 | Premortem exists, but no "what evidence would falsify this design." |
| Tool guidance | 2 | Reads files and diagrams, but little method for source validation. |
| Failure-mode awareness | 3 | Mentions failure modes, not multi-agent/specification failure. |
| Currency | 4 | Architecture concepts current; domain stack not explicitly updated. |
| Examples | 2 | ADR template helps, but no handoff example. |

Critique:
- The old prompt evaluates alternatives, but does not require a verification plan per option; evidence criteria are central to modern guardrails [R6].
- Security is engaged for significant design, but trust boundaries are not explicitly part of architecture workflow [R21].
- It says "10x scale" but also demands defensible numbers; the phrase can encourage vague scale speculation.
- It should capture non-goals and rollback/migration effects for decisions that affect release or support [R9].

### Senior Code Reviewer
| Axis | Score | Justification |
|------|-------|---------------|
| Clarity | 5 | Reviewer identity is direct. |
| Completeness | 4 | Covers correctness/security/performance/tests, but security overlaps too much with Security Reviewer. |
| Specificity | 4 | Severity and line references are concrete. |
| Portability | 5 | No platform lock-in. |
| Self-verification | 3 | "Mentally compile" exists but evidence and false-positive checks are weak. |
| Tool guidance | 2 | Says run tests/linters but not when or how to report unrun checks. |
| Failure-mode awareness | 3 | Avoids nitpicks, but not explicit about LLM false positives or confirmation bias. |
| Currency | 4 | General review guidance still current. |
| Examples | 2 | Output template only. |

Critique:
- The output starts with summary and praise; review practice should lead with actionable findings and severity when there are issues.
- It asks to highlight 1-2 good things in every review, which can waste tokens or dilute a no-issues review.
- It does not require the failing input/state for each finding, which increases false positives [R10, R11].
- Security concerns should be routed when exploitable, not fully duplicated by general review [R21].

### Security Reviewer
| Axis | Score | Justification |
|------|-------|---------------|
| Clarity | 5 | Defensive security role is clear. |
| Completeness | 4 | Broad security coverage, including supply chain, but release provenance is light. |
| Specificity | 4 | STRIDE and severity are concrete. |
| Portability | 5 | No CLI-specific body. |
| Self-verification | 4 | Exploitability and remediation checks are strong. |
| Tool guidance | 3 | Lists tools, but not evidence required from scanners or dependency review. |
| Failure-mode awareness | 4 | Theoretical vs exploitable distinction is strong. |
| Currency | 3 | Mentions OWASP but not OWASP Top 10:2025 supply-chain emphasis, SLSA, or SBOM minimums. |
| Examples | 2 | Finding template only. |

Critique:
- The old prompt's supply-chain section is too generic for 2025/2026 standards; SBOM, provenance, and CI permission checks are now expected in release-sensitive work [R21, R22, R24].
- "Maintainer reputation" is hard to falsify and should be replaced by concrete signals: advisories, release history, provenance, lockfiles, and source [R22].
- It does not explicitly cover authorization checks for binary analysis or third-party targets; the Windows agent has this but security should share the boundary.
- It should require attack scenario, prerequisites, impact, and evidence for every finding to reduce false positives [R10].

### QA / Testing Agent
| Axis | Score | Justification |
|------|-------|---------------|
| Clarity | 5 | Testing role is clear. |
| Completeness | 4 | Covers many test levels and tools. |
| Specificity | 4 | Risk-based workflow is concrete. |
| Portability | 5 | Tool references are ecosystem commands, not host-specific. |
| Self-verification | 4 | Requires tests to fail, but mutation check may be unrealistic for every case. |
| Tool guidance | 3 | Lists tools; needs clearer gate selection. |
| Failure-mode awareness | 4 | Strong edge-case and flake awareness. |
| Currency | 4 | Current property/accessibility/performance testing coverage. |
| Examples | 3 | Test code template helps. |

Critique:
- "Verify each test fails by mutating code" is good for high-risk tests but too expensive as a universal MUST.
- The prompt should separate PR, nightly, release, and manual gates so DevOps can enforce the right checks [R22].
- UI checks should include reduced motion, focus, and labels, not only axe-core.
- It should require "not run" reporting to prevent fabricated verification [R6].

### Debugging / Triage Specialist
| Axis | Score | Justification |
|------|-------|---------------|
| Clarity | 5 | Scientific debugger role is excellent. |
| Completeness | 4 | Strong workflow, but environment capture and evidence table can improve. |
| Specificity | 5 | Hypothesis/prediction/experiment/falsification is concrete. |
| Portability | 5 | Tool list is broad and portable. |
| Self-verification | 4 | Requires repro and regression test. |
| Tool guidance | 3 | Lists tools but not reporting of missing evidence. |
| Failure-mode awareness | 5 | Directly counters stopping at first plausible cause. |
| Currency | 4 | Current tracing/profiling tools listed. |
| Examples | 2 | Output template only. |

Critique:
- The old prompt is one of the strongest; most changes are tightening rather than rewriting.
- It should require environment capture because version and platform drift often explain irreproducible failures.
- It should preserve dead ends in a compact table to reduce repeated work [R32].
- It should use a structured hypothesis table for smaller models to track falsification reliably.

### C# / .NET / WPF Specialist
| Axis | Score | Justification |
|------|-------|---------------|
| Clarity | 5 | Role and stack are clear. |
| Completeness | 4 | Strong WPF/.NET coverage; release and UI verification could be sharper. |
| Specificity | 4 | Good concrete rules around nullable, MVVM, async. |
| Portability | 5 | Prompt body is portable. |
| Self-verification | 4 | Build/format/analyzer rule is clear. |
| Tool guidance | 3 | Lists dotnet tools but not what evidence to report. |
| Failure-mode awareness | 4 | Async deadlocks and code-behind risks covered. |
| Currency | 4 | Mentions .NET 10, but not .NET 10 LTS/current guidance and C# 14 explicitly. |
| Examples | 2 | No representative code or handoff example. |

Critique:
- It assumes some architectural preferences such as records for domain models too broadly; entities and mutable UI state need nuance.
- It mentions WPF and WinUI, but should emphasize the user's WPF/.NET stack and use WinUI as adjacent, not default.
- UI verification should include binding diagnostics and accessibility/high contrast, not only tests.
- It should coordinate release packaging/signing with DevOps instead of carrying that work alone [R13, R23].

### C / C++ Specialist
| Axis | Score | Justification |
|------|-------|---------------|
| Clarity | 5 | Native safety/performance role is clear. |
| Completeness | 4 | Good language/build/tooling coverage; ABI contracts need more focus. |
| Specificity | 5 | Strong concrete rules around ownership and UB. |
| Portability | 5 | Portable. |
| Self-verification | 4 | Sanitizer/test rules are strong. |
| Tool guidance | 4 | Better than most; still needs "when feasible" and reporting. |
| Failure-mode awareness | 4 | UB and memory risks are explicit. |
| Currency | 4 | C++23 current; C++26 should be conditional on compiler support. |
| Examples | 2 | Output template only. |

Critique:
- C++26 features should not be presented as normal production defaults without confirming compiler and standard-library support [R17].
- ABI and FFI boundaries matter for the user's C#/.NET, Rust, and Python mix and deserved stronger rules.
- Sanitizers are essential but not always available on MSVC/Windows in the same way; the prompt should ask and report alternatives.
- The ownership guidance is strong and was preserved.

### Python Specialist
| Axis | Score | Justification |
|------|-------|---------------|
| Clarity | 5 | Python specialist role is clear. |
| Completeness | 4 | Good tooling and library coverage. |
| Specificity | 4 | Type/test/dependency rules are concrete. |
| Portability | 5 | Portable. |
| Self-verification | 3 | Commands listed, but "not run" evidence missing. |
| Tool guidance | 3 | Lists tools but not dependency-risk workflow. |
| Failure-mode awareness | 3 | Covers common bugs, but not shell/subprocess/security pitfalls enough. |
| Currency | 3 | Stops at Python 3.12+ and misses Python 3.14 release. |
| Examples | 2 | Output template only. |

Critique:
- Python 3.14 is current, so version language needed updating [R15].
- The dependency rule should require naming why a dependency is worth its supply-chain risk [R21, R22].
- Public API typing is good, but `Any` should be allowed only when isolated and justified.
- Shell invocation and untrusted input should be explicitly routed to Security Reviewer.

### Rust Specialist
| Axis | Score | Justification |
|------|-------|---------------|
| Clarity | 5 | Rust identity is clear. |
| Completeness | 4 | Good ownership/async/FFI coverage. |
| Specificity | 4 | Strong rules around borrows, errors, and unsafe. |
| Portability | 5 | Portable. |
| Self-verification | 4 | Cargo fmt/clippy/test rule is good. |
| Tool guidance | 3 | Lists commands; needs feature/MSRV evidence. |
| Failure-mode awareness | 4 | Unsafe and async blocking covered. |
| Currency | 5 | Rust 2024 edition is current. |
| Examples | 2 | Output template only. |

Critique:
- The original does not require MSRV/feature matrix verification, which is important for Rust libraries [R16].
- FFI boundaries need explicit panic, allocation, lifetime, and thread rules.
- `anyhow` vs `thiserror` distinction should be tied to binary vs library usage.
- Strong unsafe and clippy rules were preserved.

### Frontend GUI / UX Designer
| Axis | Score | Justification |
|------|-------|---------------|
| Clarity | 5 | Hybrid frontend/design role is clear. |
| Completeness | 4 | Strong web UI coverage; less desktop UX collaboration. |
| Specificity | 4 | Accessibility and anti-generic guidance are concrete. |
| Portability | 5 | Portable. |
| Self-verification | 4 | Requires browser verification. |
| Tool guidance | 3 | Lists tools; needs specific visual/a11y evidence. |
| Failure-mode awareness | 4 | Generic AI UI and accessibility failures addressed. |
| Currency | 4 | React 19/Svelte 5 current, but stack focus should include WPF/WinUI UX. |
| Examples | 2 | Output template only. |

Critique:
- The user's core stack is desktop-heavy; the agent should collaborate on WPF/WinUI UX, not only web [R13].
- Browser verification is required, but output should name which checks passed or were not run.
- It should explicitly require states such as empty/loading/error/disabled, because UI bugs often live outside happy paths.
- It should avoid landing-page defaults unless that is the task.

### Windows Internals / Binary Analysis Specialist
| Axis | Score | Justification |
|------|-------|---------------|
| Clarity | 5 | Defensive Windows/binary scope is clear. |
| Completeness | 4 | Strong PE/Win32/tooling coverage. |
| Specificity | 5 | Ethics and static-first workflow are concrete. |
| Portability | 5 | Portable. |
| Self-verification | 5 | Authorization and sandboxing guardrails are strong. |
| Tool guidance | 4 | Lists relevant tools and safe sequence. |
| Failure-mode awareness | 5 | Defensive misuse risks are explicit. |
| Currency | 4 | Good tools; could add stronger evidence/provenance and sandbox isolation details. |
| Examples | 3 | Output format is grounded. |

Critique:
- The ethics scope is strong and was preserved/strengthened.
- It should require artifact provenance and separate observations from inferred intent.
- It should explicitly ban offensive AV/EDR evasion and credential theft enablement.
- It should prefer least-invasive documented Windows telemetry over hooks/injection, with undocumented API labels.

### General Researcher
| Axis | Score | Justification |
|------|-------|---------------|
| Clarity | 5 | Researcher role is clear. |
| Completeness | 4 | Covers source evaluation and synthesis well. |
| Specificity | 5 | Primary/secondary, confidence, and citation rules are concrete. |
| Portability | 5 | Portable. |
| Self-verification | 4 | Strong anti-hallucination rules. |
| Tool guidance | 4 | Web/source workflow is clear. |
| Failure-mode awareness | 4 | Bias and outdated info are addressed. |
| Currency | 4 | Recency rule present. |
| Examples | 3 | Output format works. |

Critique:
- The prompt is already strong; changes are mainly about decision criteria and source hierarchy.
- It should require criteria before gathering data to prevent search-result bias [R7].
- It should mark each source type and confidence in the output.
- It should hand final implementation choice back to domain owners.

### DevOps / Build & Release Engineer
| Axis | Score | Justification |
|------|-------|---------------|
| Clarity | 5 | Build/release role is clear. |
| Completeness | 4 | Broad CI/package/signing coverage. |
| Specificity | 4 | Pinning/signing/local parity rules are concrete. |
| Portability | 5 | Portable. |
| Self-verification | 4 | Clean-VM and signature checks are strong. |
| Tool guidance | 4 | Good command/tool lists. |
| Failure-mode awareness | 4 | Drift, unsigned binaries, secrets, and rollback covered. |
| Currency | 4 | Mentions Sigstore and MSIX, but not SLSA/SBOM minimums explicitly. |
| Examples | 2 | Output template only. |

Critique:
- SBOM/provenance should be a first-class release artifact when release assurance is in scope [R22, R24].
- CI token permissions and untrusted PR secret access should be explicit security concerns.
- `latest` ban is good and was preserved.
- Clean-machine installer testing was preserved and made part of verification evidence.

### Documentation Specialist
| Axis | Score | Justification |
|------|-------|---------------|
| Clarity | 5 | Technical writer role is clear. |
| Completeness | 4 | Covers major doc artifact types. |
| Specificity | 4 | Diataxis and runnable examples are concrete. |
| Portability | 5 | Portable. |
| Self-verification | 4 | Requires running examples. |
| Tool guidance | 3 | Lists docs tools but not link/version verification. |
| Failure-mode awareness | 3 | Outdated docs and context assumptions covered, but not "unverified example" labeling. |
| Currency | 4 | Current documentation frameworks. |
| Examples | 3 | README template useful. |

Critique:
- Reader/task identification is strong and was preserved.
- It should require marking version/date-sensitive claims and unverified examples.
- README template should lead with quick start and common tasks rather than abstract documentation.
- It should coordinate release docs with DevOps and tested examples with specialists.

## Cross-Cutting Findings

1. Tool guidance was too generic. Most prompts said "read files" or "run tests" but not when to do so, what evidence to return, or how to report unavailable tools. Modern agent guidance treats tools and guardrails as part of the agent contract [R2, R6].

2. The team needed a shared ambiguity rule. Without one, smaller models may ask too many questions while coding models may assume too much. The rewrite uses: ask only when missing information changes safety, architecture, public behavior, or acceptance [R4].

3. Code Reviewer and Security Reviewer overlapped. The improved split is: Code Reviewer owns correctness and regression risk; Security Reviewer owns trust boundaries, exploitability, supply chain, crypto, auth, and abuse paths [R10, R11, R21].

4. DevOps and Security overlap on supply chain. The improved split is: DevOps implements CI, signing, SBOM, provenance, and release mechanics; Security reviews whether those controls satisfy the risk [R22, R23, R24].

5. The team lacked evidence expected in handoffs. The updated protocol adds an "Evidence Expected" field to reduce multi-agent verification failures [R12].

6. The eight-section template should stay. It is portable and predictable. Adding a ninth mandatory section would increase prompt bulk; instead, shared operating rules belong in `team-protocol.md`, and meta-design rationale belongs in `01_DESIGN_PRINCIPLES.md`.

7. Examples should be conditional. Output templates and one handoff example are useful, but broad few-shot blocks in every agent would add tokens without improving most tasks [R5, R7].

8. The user's stack has one intentional gap: Minecraft modding. Because the user already declined a Minecraft agent, I did not add one. The README now records that omission as intentional.

## New Agent Recommendation

No new agent is required now. The strongest possible addition would be an "Agent Evaluation & Prompt Reliability Specialist" for running cross-model prompt evals, but that would be premature without an eval harness and real task corpus. The improved `01_DESIGN_PRINCIPLES.md` and `team-protocol.md` cover the immediate need without adding bloat.

## Self-Audit

- Cited every non-obvious research-backed claim with URL/date in the bibliography or source IDs.
- Proposed changes are falsifiable through output evidence, commands, handoff completeness, and reduced overlap.
- Removed filler language and preserved useful existing rules.
- Kept model-agnostic prompt bodies with no YAML frontmatter, slash commands, or host-specific tool syntax.
- Preserved and strengthened Windows Internals ethics scope.
- Did not overwrite parent-directory originals.

## Bibliography

[R1] Anthropic, "Building effective agents," published 2024-12-19, accessed 2026-05-12. https://www.anthropic.com/engineering/building-effective-agents

[R2] OpenAI Agents SDK, "Agents," accessed 2026-05-12. https://openai.github.io/openai-agents-python/agents/

[R3] OpenAI Agents SDK, "Handoffs," accessed 2026-05-12. https://openai.github.io/openai-agents-python/handoffs/

[R4] OpenAI Cookbook, "Codex Prompting Guide," accessed 2026-05-12. https://developers.openai.com/cookbook/examples/gpt-5/codex_prompting_guide

[R5] OpenAI Cookbook, "Codex Prompting Guide," accessed 2026-05-12. https://developers.openai.com/cookbook/examples/gpt-5/codex_prompting_guide

[R6] OpenAI Agents SDK, "Guardrails," accessed 2026-05-12. https://openai.github.io/openai-agents-python/guardrails/

[R7] Anthropic Docs, "Claude prompting best practices," accessed 2026-05-12. https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices

[R8] OpenAI Docs, "Structured Outputs," accessed 2026-05-12. https://developers.openai.com/api/docs/guides/structured-outputs

[R9] OpenAI Cookbook, "Using PLANS.md for multi-hour problem solving with Codex," published 2025-10-07, accessed 2026-05-12. https://developers.openai.com/cookbook/articles/codex_exec_plans

[R10] "Measuring and Exploiting Confirmation Bias in LLM-Assisted Security Code Review," arXiv, published 2026-03-19, accessed 2026-05-12. https://arxiv.org/abs/2603.18740

[R11] "Rethinking Code Review Workflows with LLM Assistance," arXiv, published 2025-05-22, accessed 2026-05-12. https://arxiv.org/abs/2505.16339

[R12] "Why Do Multi-Agent LLM Systems Fail?", arXiv, published 2025-03-17, accessed 2026-05-12. https://arxiv.org/abs/2503.13657

[R13] Microsoft .NET Blog, "Announcing .NET 10," published 2025-11, accessed 2026-05-12. https://devblogs.microsoft.com/dotnet/announcing-dotnet-10/

[R14] Microsoft Learn, "Windows Presentation Foundation for .NET," accessed 2026-05-12. https://learn.microsoft.com/dotnet/desktop/wpf/

[R15] Python Software Foundation, "Python 3.14.0," published 2025-10-07, accessed 2026-05-12. https://www.python.org/downloads/release/python-3140/

[R16] Rust Blog, "Announcing Rust 1.85.0 and Rust 2024," published 2025-02-20, accessed 2026-05-12. https://blog.rust-lang.org/2025/02/20/Rust-1.85.0/

[R17] ISO C++, "Current Status," accessed 2026-05-12. https://isocpp.org/std/status

[R18] React Blog, "React 19," published 2024-12-05, accessed 2026-05-12. https://react.dev/blog/2024/12/05/react-19

[R19] Svelte Blog, "Svelte 5 is alive," published 2024-10-22, accessed 2026-05-12. https://svelte.dev/blog/svelte-5-is-alive

[R20] OWASP Top 10:2025, accessed 2026-05-12. https://owasp.org/Top10/2025/

[R21] OWASP Top 10:2025 - Software Supply Chain Failures, accessed 2026-05-12. https://owasp.org/Top10/2025/A03_2025-Software_Supply_Chain_Failures/

[R22] SLSA, "Supply-chain Levels for Software Artifacts v1.2," accessed 2026-05-12. https://slsa.dev/spec/v1.2/

[R23] Sigstore Docs, "Signing with Cosign," accessed 2026-05-12. https://docs.sigstore.dev/cosign/signing/signing_with_containers/

[R24] CISA, "2025 Minimum Elements for a Software Bill of Materials (SBOM)," published 2025-08-22, accessed 2026-05-12. https://www.cisa.gov/resources-tools/resources/2025-minimum-elements-software-bill-materials-sbom

[R25] CycloneDX, "CycloneDX Specification," accessed 2026-05-12. https://cyclonedx.org/specification/overview/

[R26] GitHub Docs, "Adding repository custom instructions for GitHub Copilot," accessed 2026-05-12. https://docs.github.com/en/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot

[R27] Anthropic Docs, "Claude Code subagents," accessed 2026-05-12. https://docs.anthropic.com/en/docs/claude-code/sub-agents

[R28] Continue Docs, "Rules," accessed 2026-05-12. https://docs.continue.dev/customize/deep-dives/rules

[R29] Aider Docs, "Conventions," accessed 2026-05-12. https://aider.chat/docs/usage/conventions.html

[R30] LangGraph Docs, "Multi-agent systems," accessed 2026-05-12. https://langchain-ai.github.io/langgraph/concepts/multi_agent/

[R31] Roo Code, system prompt source, accessed 2026-05-12. https://raw.githubusercontent.com/RooCodeInc/Roo-Code/main/src/core/prompts/system.ts

[R32] "FVDebug: An LLM-Driven Debugging Assistant for Automated Root Cause Analysis of Formal Verification Failures," arXiv, published 2025-09-16, accessed 2026-05-12. https://arxiv.org/abs/2510.15906
