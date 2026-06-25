---
type: Tool
title: Go-Task Task Runner
description: Command-line task runner executed via 'task', defining modular, platform-agnostic workspace automation pipelines.
tags: [tooling, automation, taskfile, pipeline]
timestamp: 2026-06-19T16:10:00Z
---

# Go-Task Task Runner

**Go-Task** is our workspace-wide build automation and task execution tool. All automation is codified in declarative, modular YAML files.

## 1. Capabilities
- **Platform Agnosticism**: Runs steps inside a standardized Go shell emulator, avoiding platform-specific shell scripts (`.sh` or `.bat`).
- **Namespaced Modular Inclusion**: Splits tasks into reusable namespaces (like `ai:` or `ux:`) using file inclusion without root file pollution.
- **Dependency Tracking**: Executes prerequisite checks and chains validation tasks sequentially.

## 2. Main Pipelines
- `task ci`: Performs full lint, static typecheck, unit tests, BDD scenarios, and model verification.
- `task test`: Runs TS test suites under Bun.
- `task validate-mbse`: Audits SysML requirements coverage.
- `task ai:okf-*`: Exposes OKF CLI subcommands.
- `task ai:mem-*`: Exposes episodic memory database actions.
