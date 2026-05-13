# CHANGELOG

All dates are 2026 unless otherwise noted. URLs are access-date 2026-05-13.

## 2026-05-13 — Independent audit pass

Goals: portability across Claude Code / OpenAI Codex / GitHub Copilot / Cursor / Kimi / Gemini CLI; 2026 currency; failure-mode hardening (anti-confirmation-bias for review roles, tool-failure recovery contract, verify hierarchy); preserved defensive-only scope on RE/internals/anti-tamper agents; preserved two-template split (8-section core team vs YAML-frontmatter specialists).

### Cross-cutting changes (team-protocol.md)

- Added `Repo Conventions (AGENTS.md / CLAUDE.md)` — every agent reads AGENTS.md (and CLAUDE.md if present) before editing files. AGENTS.md is the cross-editor convention file used by Cursor, GitHub Copilot Coding Agent, OpenAI Codex CLI, and Claude Code (see https://github.blog/changelog/2025-08-28-copilot-coding-agent-now-supports-agents-md-custom-instructions/ and https://cursor.com/docs/rules).
- Added `Verify Before Finish` with rules-based > visual > LLM-judge hierarchy and explicit commands per stack (per Anthropic's Claude Agent SDK post, https://www.anthropic.com/engineering/building-agents-with-the-claude-agent-sdk).
- Added `Tool-Failure Recovery Contract` (PALADIN arXiv 2509.25238, "Tools Fail" arXiv 2406.19228): do not retry blindly; inspect the error, change input or escalate; verify outcomes by reading state.
- Added `Anti-Confirmation-Bias` clause enumerating the review/audit agents that must ignore PR/ticket framing (arXiv 2603.18740 — adversarial framing ~88% success rate against autonomous Claude Code review).
- Added `Failure Mode Awareness` (no nested subagents in Claude Code; long-context defenses; bounded exploration; don't stop at first plausible cause).
- Added `Portability Rules`: Markdown-first structure with selective XML, no "think step by step" (Anthropic + OpenAI both document this hurts reasoning models), no superlative directives, no "you are an expert" preambles, ≤3 few-shot examples.
- Added `Defensive-Only Scope` list, naming the agents required to refuse offensive use, anti-cheat bypass, malware authorship, DRM circumvention, and detection evasion.

### Review / audit agents

- `code-reviewer.md` — added explicit anti-confirmation-bias clause; restructured output to verdict-first with severity buckets (Blocking / Important / Nit / Optional), capped at seven findings; added "do not stop at first plausible cause" rule; broadened correctness coverage to include Go.
- `security-reviewer.md` — added anti-confirmation-bias clause; refreshed framework references to **OWASP Top 10:2025** (A01 absorbs SSRF; A03 Software Supply Chain Failures and A10 Mishandling of Exceptional Conditions are new), **OWASP LLM Top 10:2025** (LLM07 System Prompt Leakage and LLM08 Vector & Embedding Weaknesses are new), **OWASP ASVS 5.0**; added SLSA v1.2, CycloneDX 1.7 / SPDX 3.0.1, CISA 2025 SBOM Minimum Elements, cosign v3 with required identity flags, NIST SP 800-218 + 800-218A.
  - Sources: https://owasp.org/Top10/2025/0x00_2025-Introduction/, https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/, https://asvs.dev/, https://slsa.dev/spec/v1.2/, https://www.cisa.gov/resources-tools/resources/2025-minimum-elements-software-bill-materials-sbom, https://blog.sigstore.dev/cosign-3-0-available/.
- `threat-modeler.md` — added anti-confirmation-bias clause; refreshed to MITRE ATT&CK v18+ Detection Strategies + Analytics (replaced Data Sources/Detections); refreshed threat libraries to OWASP Top 10:2025, LLM Top 10:2025, ASVS 5.0, NIST SP 800-218A.
  - Sources: https://attack.mitre.org/resources/versions/, https://medium.com/mitre-attack/att-ck-v18-detection-strategies-more-adversary-insights-8f82d839ee9e.
- `qa-tester.md` — added anti-confirmation-bias clause and verify-hierarchy section (rules-based > visual > LLM-judge).
- `debugging-specialist.md` — added anti-confirmation-bias clause; "self-reflection alone is weak; root-cause claims require external evidence" rule.
- `game-security-anti-tamper-researcher.md` — added anti-confirmation-bias clause specific to scope discipline; explicit re-evaluation of scope per request; refuse-and-offer-defensive-equivalent pattern.

### Language specialist currency refresh

- `csharp-dotnet-specialist.md` — bumped baseline to **.NET 10 LTS** (GA 2025-11-11, supported through 2028-11-10); C# 14 feature set (extension members, field-backed properties, null-conditional assignment, partial constructors/events); WPF actively maintained on .NET 10 with Fluent ThemeMode; WPF and WinUI 3 co-equal; WMIC removed in Win11 25H2 — use CIM cmdlets / `System.Management` / WMI COM.
  - Sources: https://devblogs.microsoft.com/dotnet/announcing-dotnet-10/, https://learn.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-14, https://learn.microsoft.com/en-us/dotnet/desktop/wpf/whats-new/net100, https://support.microsoft.com/en-us/topic/windows-management-instrumentation-command-line-wmic-removal-from-windows-e9e83c7f-4992-477f-ba1d-96f694b8665d.
- `python-specialist.md` — bumped to **Python 3.14** (GA 2025-10-07); PEP 779 free-threaded build officially supported (Phase II, ~5–10% single-thread cost, not default); PEP 750 t-strings, PEP 649/749 deferred annotations, `concurrent.interpreters` stdlib; defaulted tooling to **uv + ruff + pyright (or ty)**; `pyproject.toml` [project] table baseline; dropped `setup.py` recommendation; Python 3.9 EOL Oct 2025.
  - Sources: https://docs.python.org/3/whatsnew/3.14.html, https://peps.python.org/pep-0779/, https://peps.python.org/pep-0750/, https://docs.astral.sh/uv/, https://docs.astral.sh/ruff/.
- `rust-specialist.md` — **Rust 2024 edition** (stabilized 1.85, 2025-02-20); RPIT lifetime capture default, `unsafe extern`, async closures stable, `async fn` in traits stable for static dispatch; MSRV resolver-aware with `incompatible_msrv` clippy lint default-on; **axum 0.8** path syntax `/{id}` / `/{*rest}` (the old `/:id` / `/*rest` syntax broken since 0.8); `axum::Server` removed — use `axum::serve(tokio::net::TcpListener::bind(...).await?, app)`; tokio LTS schedule.
  - Sources: https://blog.rust-lang.org/2025/02/20/Rust-1.85.0/, https://tokio.rs/blog/2025-01-01-announcing-axum-0-8-0, https://doc.rust-lang.org/cargo/reference/rust-version.html.
- `typescript-node-specialist.md` — **TS 5.9 / 6.0.x**; TS 7 "Native" Go rewrite acknowledged but not adopted; **Node 24 Active LTS** as the default (Node 20 EOL 2026-04-30; Node 26 Current); native TS type-stripping limited to erasable syntax (no enums/decorators/parameter properties); Biome / oxlint as fast alternatives.
  - Sources: https://devblogs.microsoft.com/typescript/announcing-typescript-5-8/, https://nodejs.org/en/about/previous-releases.
- `cpp-specialist.md` — **C++23** is ISO/IEC 14882:2024 (published); **C++26** finalized at the March 2026 London meeting (publication pending); GCC 16.1 / MSVC / Clang `-std=c++2c` support map; MSVC ASan now on ARM64 in VS 2026; MSVC still has no native TSan/UBSan/MSan; CMake Presets + vcpkg manifest mode (`vcpkg.json`) or Conan 2.x with profiles + lockfiles.
  - Sources: https://en.cppreference.com/w/cpp/compiler_support.

### Stack specialist currency refresh

- `aspnet-minimal-api-specialist.md` — built-in `AddValidation()` (.NET 10), `Microsoft.AspNetCore.OpenApi` (OpenAPI 3.1) as default replacement for Swashbuckle, `TypedResults.ServerSentEvents`, cookie auth no-redirect-for-API change, PipeReader-based JSON.
  - Source: https://learn.microsoft.com/en-us/aspnet/core/release-notes/aspnetcore-10.0.
- `discord-bot-and-api-specialist.md` — **Components V2** message flag `IS_COMPONENTS_V2 (1 << 15)`; modal text inputs must be wrapped in `Label` components; **`PIN_MESSAGES`** becomes required 2026-02-23; `default_permission` deprecated → Application Command Permissions v2; discord.py 2.7.x, discord.js 14.26.x, Discord.Net (.NET 8+); DAVE voice protocol.
  - Sources: https://discord.com/developers/docs/change-log, https://docs.discord.com/developers/components/reference.
- `mcp-server-builder.md` — bumped spec baseline to **MCP `2025-11-25`** (prior `2025-06-18` superseded; `2024-11-05` two revisions behind); AAIF / Linux Foundation governance Dec 2025; `MCP-Protocol-Version` header updated.
  - Source: https://modelcontextprotocol.io/specification/2025-11-25.
- `devops-engineer.md` — supply-chain section bumped to **SLSA v1.2**, **CISA 2025 SBOM Minimum Elements**, CycloneDX 1.7 / SPDX 3.0.1, **cosign v3** with required identity/issuer flags (dropped obsolete `COSIGN_EXPERIMENTAL=1`), **GitHub Artifact Attestations** GA, NIST SP 800-218 + 800-218A.
- `msbuild-and-slnx-specialist.md` — `.slnx` is **default in `dotnet new sln`** on .NET 10; `.sln` vs `.slnx` colocation warning; update `.slnf` paths after migration; **Package Source Mapping** for multi-feed setups (substitution-attack defense).
  - Source: https://devblogs.microsoft.com/dotnet/introducing-slnx-support-dotnet-cli/.
- `tauri-v2-native-bridge-specialist.md` — Tauri 2.0 GA Oct 2024 and mobile-first-class context; capability identifier example updated to current namespace (`core:webview:allow-set-title`); explicit "v1 `allowlist` is gone".
  - Source: https://v2.tauri.app/security/capabilities/.
- `frontend-designer.md` — **React 19** stable (Dec 2024) feature set: Actions, `useActionState`, ref-as-prop (drop `forwardRef` for new components), React Compiler open-sourced; shadcn supports Radix and Base UI; unified `radix-ui` package (June 2025); Vite default (Rolldown migration), Turbopack default in Next.js 16+, Rspack as webpack replacement.
  - Source: https://react.dev/blog/2024/12/05/react-19.
- `react-tanstack-desktop-specialist.md` — shadcn migration date corrected to June 2025 (unified `radix-ui` package); React Compiler note added.
- `wpf-xaml-themeing-specialist.md` — WPF actively maintained on .NET 10 with Fluent ThemeMode (light/dark/system); WPF and WinUI 3 co-equal per Windows Developer FAQ.
  - Source: https://learn.microsoft.com/en-us/windows/apps/get-started/windows-developer-faq.

### Windows / defensive specialists

- `windows-internals-specialist.md` — Win11 25H2 GA 2025-09-30 / shared servicing branch with 24H2; **WMIC removed in 25H2**; **WDAC → App Control for Business (ACfB)**; modern standalone WinDbg required for TTD; `dx @$curprocess.TTD`; ARM64EC + Arm64X; Sysmon integrating into Win11/Server 2025; current Sysinternals versions (Autoruns 14.2, ProcExp 17.12, ProcDump 12.0); YARA-X 1.0 successor to YARA classic.
  - Sources: https://learn.microsoft.com/en-us/windows/release-health/status-windows-11-25h2, https://learn.microsoft.com/en-us/windows-hardware/drivers/debuggercmds/time-travel-debugging-overview, https://blog.virustotal.com/2025/06/yara-x-100-stable-release-and-its.html.
- `windows-power-user-scripter.md` — **PowerShell 7.6 LTS** on .NET 10 (GA 2026-03-18); explicit WMIC-removed-in-25H2 callout; PSResourceGet + winget for package management.
  - Source: https://devblogs.microsoft.com/powershell/announcing-powershell-7-6/.
- `hooking-and-detours-specialist.md` — added defensive-scope preamble; Microsoft Detours 4.0.1 MIT (no pro/express split); MinHook 1.3.4 + RaMMicHaeL `MH_QueueEnable/Disable/ApplyQueued`; CFG (`SetProcessValidCallTargets`) and CET shadow-stack interactions; AppInit_DLLs blocked under Secure Boot.
- `pattern-scan-aob-specialist.md` — added defensive-scope preamble; **YARA-X 1.0** (June 2025, Rust) as YARA classic successor; CAPA (Mandiant) and Ghidra/IDA scripts in defensive stack; explicit out-of-scope for offensive cheat tools.
- `game-engine-internals-specialist.md` — added defensive-scope preamble; UE 5.6 GA June 2025; Unity 6 IL2CPP metadata v39 BepInEx breakage note; Godot 4.5 with Jolt; Source 2 public-docs-limited note.
- `game-security-anti-tamper-researcher.md` — scope-discipline anti-bias clause already added in Critical fixes.
- `forensics-and-bug-bisector.md` — modern WinDbg TTD; ProcDump v12.0 `-pt`; NotMyFault v4.5; MSVC ARM64 ASan (new in VS 2026).
- `memory-dump-crash-triage-analyst.md` — modern standalone WinDbg required for TTD; `dx @$curprocess.TTD`; Volatility 3 v2.27 (Vol2 archived 2025-05-16); ProcDump v12.0; NotMyFault v4.5 Hyper-V/SecureKernel triggers.
  - Source: https://volatilityfoundation.org/announcing-the-official-parity-release-of-volatility-3/.

### Other specialists

- `llm-application-builder.md` — Anthropic prompt caching tier costs spelled out (5m default / 1h tier; writes ~1.25× / 2.0× input; reads ~0.10×; `cache_control: { ttl: "5m"|"1h" }`; prefix-stable, suffix-dynamic structure); OpenAI strict structured outputs constraints with `message.refusal` check; OpenAI automatic caching threshold (≥ 1024 tokens, best-effort); OWASP LLM Top 10:2025 controls (LLM01 / LLM07 / LLM08).
  - Sources: https://platform.claude.com/docs/en/build-with-claude/prompt-caching, https://openai.com/index/introducing-structured-outputs-in-the-api/, https://developers.openai.com/api/docs/guides/prompt-caching, https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/.
- `libtorch-cpp-inference-specialist.md` — PyTorch 2.11.x (March 2026); libtorch ABI is not stable (limited stable ABI is 2026 roadmap); AOTInductor `aoti_compile_and_package` is Beta; ONNX Runtime v1.26.0 (CUDA 13 default, CUDA 11 dropped v1.25+); TensorRT-LLM v1.3.x PyTorch backend default; vLLM v0.20.x for serving.
- `rlgym-ppo-deployment-specialist.md` — defensive-scope preamble (simulator-only; RL EAC mandatory online since 2025); RLGym v2 API explicit `TransitionEngine` + separate `TerminalCondition`/`TruncationCondition`; install via `rlgym[rl-sim]`; rlgym-learn 1.0.5 successor; RLGymPPO_CPP for perf.
  - Sources: https://rlgym.org/Getting%20Started/quickstart/, https://github.com/AechPro/rlgym-ppo.
- `sql-and-database-specialist.md` — Postgres 17/18; pgvector for embeddings; sqlite-vec; explicit "parameterize — OWASP A03 Injection".
- `release-manager.md` — release-time supply-chain section: SLSA v1.2 (Build + Source), GitHub Artifact Attestations (GA), cosign v3 with identity flags, CycloneDX 1.7 / SPDX 3.0.1 SBOM with CISA 2025 fields, rollback plan as required artifact.
- `graphics-overlay-specialist.md` — Dear ImGui v1.92.x Vulkan backend redesign (separate `SAMPLED_IMAGE` + `SAMPLER` pool entries); `ImDrawCallback_ResetRenderState` obsoleted; DirectStorage 1.3 stable (1.4 preview Zstd at GDC 2026); Vulkan 1.4 (Dec 2024). Also fixed a broken Markdown header (`## This agent should NOT:**` → `**This agent should NOT:**`).
  - Sources: https://github.com/ocornut/imgui/releases, https://devblogs.microsoft.com/directx/directstorage-1-3-is-now-available/, https://www.khronos.org/news/press/khronos-streamlines-development-and-deployment-of-gpu-accelerated-applications-with-vulkan-1.4.
- `game-networking-specialist.md` — added Steam Datagram Relay (SDR) for production hosted relays; clarified GGPO/GekkoNet rollback netcode citation.
  - Source: https://partner.steamgames.com/doc/features/multiplayer/steamdatagramrelay.
- `system-architect.md` — refreshed technology baseline list (.NET 10 LTS, Python 3.14, Rust 2024, TS 5.9+, React 19, Tauri v2); added explicit "simplicity ratchet" rule (justify any architecture more complex than a single augmented LLM call or single service); ADR template now lists Alternatives.
- `project-organizer.md` — added scaled-effort budgets (Simple / Medium / Large) and "revert to plan when plan must change mid-flight" rule; AGENTS.md/CLAUDE.md read-at-start step.
- `researcher.md` — source-quality heuristic (prefer primary docs / standards / official repos over SEO content); cap exploration budgets per question class; "no nested subagents in Claude Code" awareness.
- `documentation-specialist.md` — Diátaxis framework name fixed; AGENTS.md/CLAUDE.md authorship guidance (cross-editor convention file).

### Files intentionally not modified (already current)

- `prompt-engineering-orchestrator.md` — already correctly flags "you are an expert" / "be helpful" as cargo cult and contains anti-pattern callouts. No edits needed.
- `data-science-numerics-specialist.md` — already current on Polars 1.x lazy API, DuckDB-over-Dask recommendation, scalene/memray, modern NumPy/SciPy. No 2026-version drift detected.
- `go-specialist.md` — already current on Go 1.22+ `ServeMux`, `slog`, `errors.Join`, sqlc preference. Defers to runtime `go version`. No edits needed.
- `java-kotlin-specialist.md` — already current on JDK 21 LTS / JDK 25 LTS-track, Kotlin 2.x K2 compiler, virtual threads, structured concurrency, GraalVM native image, JSpecify. No edits needed.
- `performance-and-profiling-engineer.md` — already current on ETW, WPA, PerfView, dotnet-trace/counters/gcdump, py-spy/scalene/memray, perf/bpftrace, BenchmarkDotNet. No edits needed.

### Verification notes

- All YAML frontmatter parses (validated by inspection).
- No file lost its template identity.
- Defensive-only files retain explicit refusal / scope language: `windows-internals-specialist`, `hooking-and-detours-specialist`, `pattern-scan-aob-specialist`, `game-engine-internals-specialist`, `game-security-anti-tamper-researcher`, `forensics-and-bug-bisector`, `memory-dump-crash-triage-analyst`, `rlgym-ppo-deployment-specialist`.
- Anti-pattern phrases ("think step by step", "you are an expert…", "ALWAYS / maximize_*") only appear in explicit anti-pattern callouts inside `prompt-engineering-orchestrator.md`.
- Versions in this changelog are cited against accessed sources. Where the live state changes faster than this changelog (e.g., Node minor versions, Rust stable cadence), agents defer to runtime checks rather than hard-coded numbers.
