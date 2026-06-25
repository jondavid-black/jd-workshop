---
type: Script
title: Prompt Validation Tool (validate_prompts.py)
description: Custom Python script used to lint and validate agent profiles and skill markdown files for compliance.
tags: [tooling, validation, prompt, python]
timestamp: 2026-06-19T16:30:00Z
---

# Prompt Validation Tool (validate_prompts.py)

The **`validate_prompts.py`** script lints all agent `.md` profiles and skill specifications inside `.opencode/` to ensure formatting compliance.

## 1. Safety Checks
- **Line Limits**: Verifies subagent files do not exceed a strict 40-line limit.
- **Section Headings**: Verifies all required section headings (such as `## 1. Core Responsibilities`, `## 2. Recommended Skills to Invoke`, `## 3. Guidelines & Constraints`) are present in each profile.
- **Syntax check**: Validates markdown formatting.

## 2. Usage Guide
Exposed under the standard linter task:
```bash
task lint:prompts
```
