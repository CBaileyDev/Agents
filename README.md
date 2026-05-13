# Agent Specialists

A comprehensive collection of specialized AI agent prompts for various domains, technologies, and software engineering disciplines. Each agent is designed with deep domain expertise, specific collaboration patterns, and actionable workflows.

## 📚 Overview

This repository contains 43 specialized agents organized by domain:

- **Programming Languages** — Python, Rust, Go, TypeScript/Node.js, C++, C#/.NET, Java/Kotlin
- **Web & API** — ASP.NET Core Minimal APIs, Discord Bot/API, Frontend Design, React Desktop
- **Data & ML** — Data Science/Numerics, LLM Application Building, Python inference
- **Game Development** — Engine Internals, Networking, Security, Anti-Cheat
- **Systems & Infrastructure** — DevOps, Windows Internals, Performance Profiling, Memory Dumps
- **Security & Review** — Security Reviewer, Threat Modeling, Forensics
- **Database & Persistence** — SQL/Database, Tauri Native Bridge
- **AI & Meta** — Prompt Engineering Orchestrator, MCP Server Builder, Research
- **Desktop & UI** — WPF/XAML Theming, Graphics Overlays, Windows Scripting
- **Engineering Discipline** — QA/Testing, Documentation, Release Management, Project Organization

---

## 🎯 Language & Framework Specialists

### Python Specialist
Use for typed, maintainable Python — data science, CLI tools, FastAPI, Pydantic, testing, packaging. Prefers modern tooling (uv, ruff, pytest, pyright) and type hints.

### Rust Specialist
Use for idiomatic Rust — ownership, lifetimes, async safety, FFI, error handling, `unsafe` isolation. Covers cargo workspaces, testing, and ecosystem choices (tokio, serde, axum).

### Go Specialist
Use for idiomatic Go work — goroutines, channels, context propagation, interface design, and the Go ecosystem (stdlib net/http, sqlx, chi, modern tooling).

### TypeScript/Node.js Specialist
Use for strict TypeScript — type-system surgery, ESM/CJS interop, monorepo orchestration (pnpm/turbo), advanced tsconfig, and modern Node.js runtime patterns.

### C# / .NET Specialist
Use for C# and .NET — WPF, libraries, console apps, runtime behavior, threading, reflection. Works alongside aspnet-minimal-api-specialist for web-specific patterns.

### C++ Specialist
Use for modern C++ — memory safety, dependency linking, build system configuration, profiling, and Windows ABI patterns. Covers both modern C++ and legacy interop.

### Java / Kotlin Specialist
Use for modern Java (21+) and Kotlin — coroutines, structured concurrency, sealed types, JVM tuning, and choosing between Java and Kotlin per task.

---

## 🌐 Web & API Development

### ASP.NET Core Minimal API Specialist
Use for ASP.NET Core minimal API work — endpoint routing, model binding, OpenAPI, authentication, EF Core wiring, Native AOT compatibility, and the patterns that distinguish minimal APIs from controllers.

### Discord Bot & API Specialist
Use for Discord bot and API work — gateway events, slash commands, OAuth flows, rate-limit handling, message components, and library-level choices (discord.py / Discord.Net / discord.js).

### Frontend Designer
Use for frontend design and React component work — modern UI patterns, accessibility, component libraries, and design systems.

### React TanStack Desktop Specialist
Use for desktop-shell React SPAs — TanStack Router/Query, Radix/shadcn composition, and the desktop-specific UX patterns (hash routing, no overscroll, drag regions, native scrollbars) that web devs miss.

---

## 📊 Data & Machine Learning

### Data Science / Numerics Specialist
Use for high-performance numeric Python — NumPy/Polars/SciPy idioms, vectorization, statistical analysis, and CSV/Parquet pipelines that aren't ML-modeling work.

### LLM Application Builder
Use for *building* with LLM APIs and agent frameworks — RAG, tool-use, structured outputs, prompt caching, evals — not just configuring CLIs.

### LibTorch C++ Inference Specialist
Use for C++ inference with PyTorch's libtorch — loading TorchScript / ONNX models, tensor lifetime, CUDA/CPU dispatch, MSVC build setup, and deployment crash triage.

### RLGym PPO Deployment Specialist
Use for Rocket League RL bot work — RLGym v2 architecture, rlgym-ppo training, RocketSim integration, observation/action contracts, and the train-to-deploy boundary.

---

## 🎮 Game Development

### Game Engine Internals Specialist
Use when navigating game engine memory layouts (UE4/UE5, Unity IL2CPP/mono, Source/Source 2) to locate, walk, or document offsets, structures, and engine globals.

### Game Networking Specialist
Use for game-grade networking work — UDP-first protocols, packet serialization, lag compensation, simulation bridges (RLGym-style), and the latency/throughput tradeoffs specific to real-time games.

### Game Security & Anti-Tamper Researcher
Use for *defensive* analysis of anti-cheat and anti-tamper systems — understanding how they detect, so you can write legitimate tooling that coexists with them or so you can design your own protections.

### Graphics Overlay Specialist
Use when hooking a graphics API (D3D9/11/12, Vulkan, OpenGL) to render an overlay, integrate ImGui, or implement world-to-screen drawing.

### Hooking & Detours Specialist
Use when installing, designing, or debugging function hooks (inline, IAT/EAT, VEH, syscall) — the mechanics of redirecting control flow safely.

### Pattern Scan / AOB Specialist
Use when designing, optimizing, or auditing AOB / byte-pattern signature scans for locating functions, globals, or struct fields in target binaries.

---

## 🔧 Systems, Infrastructure & DevOps

### DevOps Engineer
Use for CI/CD, containerization, infrastructure as code, deployment pipelines, monitoring, and operational best practices.

### Windows Internals Specialist
Use for Windows kernel, driver development, system calls, PE format, registry, and low-level system behavior.

### Windows Power-User Scripter
Use for serious Windows automation — PowerShell, WMI, registry, scheduled tasks, services, ETW queries, and system tweaks that need to be safe, idempotent, and reversible.

### Performance & Profiling Engineer
Use when investigating real (measured, not assumed) performance problems — picking profilers, reading flamegraphs, and turning data into targeted optimization across native, managed, and Python code.

### Memory Dump & Crash Triage Analyst
Use when you have a crash dump (.dmp), a watson/MTTR ticket with a stack, or a hang dump and need to extract the root cause from postmortem data.

### MSBuild & .slnx Specialist
Use for modern .NET build-system work — .slnx solutions, Directory.Build.props, Central Package Management, Native AOT, lock files, and MSBuild target authoring.

---

## 🔐 Security & Safety

### Security Reviewer
Use for security-focused code review — authentication, cryptography, injection attacks, untrusted input handling, dependency supply chain, and security-specific architectural patterns.

### Threat Modeler
Use at *design time* for security thinking — STRIDE/PASTA, attack-tree drafting, trust-boundary mapping, and identifying threats before code is written.

### Forensics & Bug Bisector
Use for cold-case bugs — when reproduction is hard or impossible, when the cause is buried in history, or when you need git bisect, repro minimization, or postmortem authoring.

---

## 💾 Database & Data Persistence

### SQL & Database Specialist
Use for serious SQL work — query plans, index strategy, schema migrations, EXPLAIN reading, transaction isolation, and local-first SQLite design (especially with EF Core).

### Tauri v2 Native Bridge Specialist
Use for Tauri v2 desktop app work — `#[tauri::command]` design, the capabilities/permissions model, tauri-specta bindings, and Rust-side Windows integration (WMI, registry).

---

## 🤖 AI, Meta-Analysis & Tools

### Prompt Engineering Orchestrator
Use for *meta* work on multi-agent systems — auditing prompt efficacy, designing agent handoff protocols, optimizing context windows, and improving how your own agent collection works together.

### MCP Server Builder
Use for designing or implementing Model Context Protocol servers — tools, resources, prompts, transports (stdio / Streamable HTTP), schemas, capabilities, and OAuth-secured remote MCP.

### Researcher
Use for deep research tasks — finding sources, investigating frameworks, benchmarking solutions, and documenting findings.

### Code Reviewer
Use for detailed code review — identifying bugs, testing gaps, performance issues, and design concerns. Analyzes diffs and staged changes.

---

## 🎨 Desktop UI & Design

### WPF / XAML Theming Specialist
Use when designing or implementing serious WPF visual design — themes, ControlTemplate overrides, animations, glass/blur effects, custom resource dictionaries, and dark-mode/neon palettes.

---

## 📋 Engineering Discipline & Practices

### QA / Tester
Use for test strategy, test case design, coverage analysis, regression testing, and building reliable quality assurance practices.

### Documentation Specialist
Use for writing, organizing, and maintaining technical documentation — API docs, guides, tutorials, and knowledge bases.

### Release Manager
Use for release engineering — semver decisions, changelogs, branch strategy, version pinning, rollout/rollback playbooks, and the discipline that prevents "we shipped what?!"

### Project Organizer
Use for project planning, task breakdown, milestone tracking, and keeping complex multi-phase efforts organized.

---

## 📖 How to Use These Agents

1. **Identify your task** — find the agent whose domain matches your work.
2. **Read the agent prompt** — understand the agent's expertise, constraints, and collaboration patterns.
3. **Invoke with context** — provide problem statement, existing code, constraints, and what you've already tried.
4. **Leverage collaboration** — agents are designed to work together; they'll recommend other specialists when needed.
5. **Iterate** — use feedback from the agent to refine approach or escalate to a different specialist.

---

## 📂 Repository Structure

```
.
├── [language]-specialist.md          # Language and framework experts
├── [domain]-specialist.md            # Domain specialists (networking, security, etc.)
├── [role]-[discipline].md            # Engineering discipline roles
├── team-protocol.md                  # Guidelines for multi-agent collaboration
├── docs/
│   ├── README.md                     # Documentation overview
│   ├── DESIGN_PRINCIPLES.md          # Design philosophy
│   ├── IMPROVE_PROMPT.md             # How to iterate on agents
│   └── DIFFS.md                      # Guide to prompt diffs
└── README.md                         # This file
```

---

## 🔗 Collaboration & Handoff

Each agent includes a **Collaboration** section listing:
- **Works well with** — agents that naturally pair on complex tasks
- **Escalates to** — when to delegate specific aspects

Example: A web API task might start with aspnet-minimal-api-specialist, escalate to sql-and-database-specialist for schema design, and involve security-reviewer for auth/OWASP patterns.

---

**Last Updated:** May 2026  
**Agent Count:** 43  
**Domains Covered:** Programming Languages, Web APIs, Game Development, Systems, Security, Data Science, AI/LLM, Desktop UI, Engineering Discipline