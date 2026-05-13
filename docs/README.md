# AI Agent Team - Improved Portable System Prompts

This directory contains the improved version of the 15-agent prompt team. The originals in the parent directory were not modified.

Each file is a complete, model-agnostic system prompt body intended to work across Claude Code, Codex, GitHub Copilot, Kimi, Gemini CLI, Cursor, and orchestration frameworks such as CrewAI and LangGraph. Platform-specific wrappers, frontmatter, slash commands, tool annotations, and runner configuration belong outside these prompt bodies.

## Team Index

### Orchestration and Quality
| File | Role | Primary Use |
|------|------|-------------|
| [project-organizer.md](./project-organizer.md) | Project Organization & Planning Agent | Scope, sequencing, acceptance criteria, and handoffs |
| [system-architect.md](./system-architect.md) | System Architect | Architecture, trade-offs, ADRs, quality attributes |
| [code-reviewer.md](./code-reviewer.md) | Senior Code Reviewer | Correctness-first review with evidence and severity |
| [security-reviewer.md](./security-reviewer.md) | Security Reviewer | Threat modeling, vulnerability review, supply-chain risk |
| [qa-tester.md](./qa-tester.md) | QA / Testing Agent | Risk-based test strategy and verification gates |
| [debugging-specialist.md](./debugging-specialist.md) | Debugging / Triage Specialist | Repro, root-cause analysis, experiments, regression tests |

### Language and Platform Specialists
| File | Role | Primary Use |
|------|------|-------------|
| [csharp-dotnet-specialist.md](./csharp-dotnet-specialist.md) | C# / .NET / WPF Specialist | .NET 8/10, WPF, WinUI, MVVM, Windows desktop |
| [cpp-specialist.md](./cpp-specialist.md) | C / C++ Specialist | Native C/C++, Win32, CMake/MSBuild, performance and safety |
| [python-specialist.md](./python-specialist.md) | Python Specialist | Python 3.12-3.14+, typed Python, packaging, testing |
| [rust-specialist.md](./rust-specialist.md) | Rust Specialist | Rust 2024, ownership, async, FFI, unsafe review |
| [frontend-designer.md](./frontend-designer.md) | Frontend GUI / UX Designer | Web UI, component systems, accessibility, visual QA |
| [windows-internals-specialist.md](./windows-internals-specialist.md) | Windows Internals / Binary Analysis Specialist | Defensive Windows internals, PE analysis, Win32, malware triage |

### Support
| File | Role | Primary Use |
|------|------|-------------|
| [researcher.md](./researcher.md) | General Researcher & Information Synthesis | Source-grounded research and recommendations |
| [devops-engineer.md](./devops-engineer.md) | DevOps / Build & Release Engineer | CI, packaging, signing, SBOMs, releases |
| [documentation-specialist.md](./documentation-specialist.md) | Documentation Specialist | READMEs, ADRs, API docs, changelogs |
| [team-protocol.md](./team-protocol.md) | Team Collaboration Protocol | Shared routing, handoff, verification, and conflict rules |

## Recommended Pairings

- WPF / .NET desktop app: Project Organizer + System Architect + C# / .NET / WPF Specialist + Frontend GUI / UX Designer + QA / Testing Agent + Code Reviewer + Security Reviewer + DevOps.
- Native C++ / Win32 tool: Project Organizer + C / C++ Specialist + Windows Internals Specialist + QA / Testing Agent + Code Reviewer + Security Reviewer + DevOps.
- Python tool or service: Project Organizer + Python Specialist + QA / Testing Agent + Code Reviewer + Security Reviewer + Documentation.
- Rust system tool: Project Organizer + Rust Specialist + System Architect + QA / Testing Agent + Code Reviewer + DevOps.
- Defensive binary analysis utility: Project Organizer + Windows Internals Specialist + C / C++ Specialist or C# / .NET / WPF Specialist + Security Reviewer + QA / Testing Agent.
- Web UI or dashboard: Project Organizer + Frontend GUI / UX Designer + System Architect + QA / Testing Agent + Security Reviewer.

Minecraft modding, ML/RL, and tutoring agents are intentionally not included in this improved set because they were declined as new-agent additions.

## Structure of Each Agent

Each agent keeps the original eight-section template for portability:

1. Identity & Role
2. Core Expertise & Mindset
3. Primary Responsibilities
4. Detailed Workflow / Reasoning Process
5. Collaboration Rules
6. Output Format
7. Quality Guardrails & Self-Critique
8. Tools & Capabilities

The improved prompts tighten the content inside those sections rather than adding new mandatory sections. Shared behavioral rules live in [team-protocol.md](./team-protocol.md), and the design rationale lives in [01_DESIGN_PRINCIPLES.md](./01_DESIGN_PRINCIPLES.md).

## Deployment Notes

- Paste only the prompt body into the target agent system prompt or instruction field.
- Add any platform wrapper required by the host outside the prompt body.
- Keep project-specific commands, paths, and policies in repository instructions so the prompts stay reusable.
- When a host supports structured outputs, schemas, tool guardrails, or tracing, configure those in the host layer; the prompt should request evidence and shape output, not depend on a vendor-only runtime feature.
- If a smaller or weaker model runs an agent, favor the agents with the narrowest domain and the most concrete acceptance criteria.

