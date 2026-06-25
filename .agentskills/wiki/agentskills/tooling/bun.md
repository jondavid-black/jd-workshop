---
type: Tool
title: Bun TS/JS Runtime
description: High-performance TypeScript and JavaScript compiler, bundler, and test runner used for helper scripts and unit tests.
tags: [tooling, runtime, bun, typescript]
timestamp: 2026-06-19T16:00:00Z
---

# Bun TS/JS Runtime

**Bun** is our primary execution environment for JavaScript and TypeScript within AgentSkills.

## 1. Capabilities
- **Fast Execution**: Compiles and runs TS/JS scripts directly with near-zero startup overhead.
- **Built-in Test Runner**: Executes all TypeScript/JavaScript unit and integration tests located under `.opencode/tests/` via `bun test`.
- **Database Support**: Integrates native SQLite drivers (used by our episodic memory CLI).

## 2. Usage Guide
Always execute TypeScript or JavaScript scripts via `bun`:
```bash
bun .opencode/scripts/memory_cli.ts search "started"
```
