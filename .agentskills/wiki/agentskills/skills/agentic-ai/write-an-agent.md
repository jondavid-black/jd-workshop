---
type: Reference
title: write-an-agent Skill
description: Guides agents in creating or updating specialized agent configurations (either primary-mode agents or specialized subagents).
tags: [skills, agentic-ai]
timestamp: 2026-06-21T11:00:00Z
---

# write-an-agent Skill

The **`write-an-agent`** skill provides step-by-step instructions and structure templates for creating, refining, and compiling new modular agent configurations.

## Core Rules

1. **Unified Template**: Always use the unified template at `.opencode/skills/agentic-ai/write-an-agent/agent-template.md` which uses the standard `[[PLACEHOLDER]]` format.
2. **Permission Model Decoupled**: By default, do not configure standard permissions in the frontmatter unless explicitly specified by the user.
3. **Agent Mode Layout**:
   - **Primary Agent**: Best for high-level multi-phase state machine coordination. Must embed non-negotiable User Control Gates (Phases) where the user must explicitly sign off to progress.
   - **Subagent**: Best for task-driven localized domain execution. Must follow step-by-step task instructions (Steps) with clear entrance/exit criteria, strict domain scopes, and negative constraints.
