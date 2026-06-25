---
type: Tool
title: UV Python Environment Manager
description: Ultra-fast Python package and environment manager used to run formatting, lints, and behavior tests.
tags: [tooling, runtime, uv, python]
timestamp: 2026-06-19T16:05:00Z
---

# UV Python Environment Manager

**UV** is our primary Python virtual environment, script, and dependency manager. It replaces slower traditional pip, virtualenv, and poetry setups.

## 1. Capabilities
- **Script Runner**: Executes independent Python scripts inside clean, isolated environments using `uv run`.
- **Pre-commit Lints**: Drives our static checkers and automated prompt validators (`validate_prompts.py`).
- **BDD Testing**: Installs and executes Gherkin BDD steps (`behave`) inside test runner environments.

## 2. Usage Guide
Always run Python tasks or scripts using `uv run`:
```bash
uv run python .opencode/scripts/validate_prompts.py
```
