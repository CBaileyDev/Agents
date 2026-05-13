# Agent Design Principles

1. Prefer simple, composable workflows before autonomous agents. Anthropic reports that successful agent systems usually use simple, composable patterns and should add complexity only when the task benefit justifies the cost and latency. Source: Anthropic, "Building effective agents," 2024-12-19, https://www.anthropic.com/engineering/building-effective-agents

2. Define ownership and handoff evidence, not just roles. OpenAI describes agents as instructions plus tools, handoffs, guardrails, and structured outputs; multi-agent designs need clear manager or handoff semantics. Source: OpenAI Agents SDK docs, accessed 2026-05-12, https://openai.github.io/openai-agents-python/agents/

3. Prompt for autonomy only where it improves completion. OpenAI's Codex guidance recommends bias to action for coding agents, but also says clarification remains desirable in actual use when truly blocked. Source: OpenAI Codex Prompting Guide, accessed 2026-05-12, https://developers.openai.com/cookbook/examples/gpt-5/codex_prompting_guide

4. Cut model-specific scaffolding from portable prompts. OpenAI's Codex prompting guide says over-prompting can reduce quality and that many coding-agent behaviors are already trained in; portable prompts should keep only load-bearing rules. Source: OpenAI Codex Prompting Guide, accessed 2026-05-12, https://developers.openai.com/cookbook/examples/gpt-5/codex_prompting_guide

5. Use structured outputs when the host supports schemas, but do not make schema adherence a prompt-only guarantee. OpenAI distinguishes JSON mode from Structured Outputs and recommends schema-backed Structured Outputs when possible. Source: OpenAI Structured Outputs guide, accessed 2026-05-12, https://developers.openai.com/api/docs/guides/structured-outputs

6. Treat guardrails as workflow boundaries, not slogans. OpenAI's Agents SDK documents input, output, and tool guardrails running at different points; prompts should name the evidence required at each boundary. Source: OpenAI Agents SDK Guardrails, accessed 2026-05-12, https://openai.github.io/openai-agents-python/guardrails/

7. Use examples sparingly and make them representative. Anthropic says examples are reliable for steering output format and behavior, but they should mirror the actual use case and avoid accidental patterns. Source: Anthropic prompting best practices, accessed 2026-05-12, https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices

8. Avoid universal XML requirements in model-agnostic prompts. Anthropic recommends XML tags for Claude when prompts mix context, instructions, and examples, but this team must run across multiple model families, so Markdown headings and compact examples are the portable default. Source: Anthropic XML/prompting guidance, accessed 2026-05-12, https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices#structure-prompts-with-xml-tags

9. Ask for verification after tool use and before completion. Anthropic recommends self-check prompts against test criteria, and OpenAI's long-horizon planning guidance treats plans as living documents with evidence of progress. Sources: Anthropic prompting best practices, accessed 2026-05-12, https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices; OpenAI "Using PLANS.md for multi-hour problem solving," 2025-10-07, https://developers.openai.com/cookbook/articles/codex_exec_plans

10. Separate review from security review. Recent security-review research shows LLM vulnerability detection is sensitive to framing and can miss vulnerabilities or raise false positives; security findings need exploitability, trust boundaries, and evidence, not generic code-review comments. Sources: "Measuring and Exploiting Confirmation Bias in LLM-Assisted Security Code Review," 2026-03-19, https://arxiv.org/abs/2603.18740; "Rethinking Code Review Workflows with LLM Assistance," 2025-05-22, https://arxiv.org/abs/2505.16339

11. Debug with falsifiable hypotheses. LLM debugging agents should not stop at the first plausible cause; recent debugging-assistant work uses causal structure and for/against scans to reduce unsupported root-cause narratives. Source: "FVDebug: An LLM-Driven Debugging Assistant for Automated Root Cause Analysis of Formal Verification Failures," 2025-09-16, https://arxiv.org/abs/2510.15906

12. Make multi-agent dependencies explicit. A 2025 taxonomy of multi-agent failures identifies specification problems, inter-agent conflict, and task verification failures; handoffs must carry constraints, acceptance, and evidence. Source: "Why Do Multi-Agent LLM Systems Fail?", 2025-03-17, https://arxiv.org/abs/2503.13657

13. Keep domain currency in the domain agent, not the protocol. Current stack facts belong in C#, C++, Python, Rust, Frontend, Windows, Security, and DevOps prompts so the shared protocol remains stable. Sources: .NET 10 LTS announcement, 2025-11, https://devblogs.microsoft.com/dotnet/announcing-dotnet-10/; Python 3.14 release, 2025-10-07, https://www.python.org/downloads/release/python-3140/; Rust 1.85/Rust 2024, 2025-02-20, https://blog.rust-lang.org/2025/02/20/Rust-1.85.0/

14. Security prompts must track current standards. OWASP Top 10:2025 elevates software supply-chain failures to A03, and current supply-chain guidance emphasizes provenance, SBOMs, signing, and continuous verification. Sources: OWASP Top 10:2025, accessed 2026-05-12, https://owasp.org/Top10/2025/; SLSA 1.2, accessed 2026-05-12, https://slsa.dev/spec/v1.2/; CISA 2025 SBOM Minimum Elements, 2025-08-22, https://www.cisa.gov/resources-tools/resources/2025-minimum-elements-software-bill-materials-sbom
