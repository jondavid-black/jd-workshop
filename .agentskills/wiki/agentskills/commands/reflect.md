---
type: Command
title: /reflect Command
description: Analyzes conversation history to identify opportunities for improving agent definitions and skills.
tags: [commands, feedback, improvement]
timestamp: 2026-06-19T17:05:00Z
---

# /reflect Command

The `/reflect` command scans the active session interaction logs to find potential refinements to the agent definitions, tools, or configurations.

## Workflow

1. **History Retrieval**: Analyzes recent turns and user corrections.
2. **continuous-learning Skill**: Invokes the `continuous-learning` skill to review the history.
3. **Draft Updates**: Proposes updates to system prompts or specialized skills to prevent repetitive missteps.

## Learn More

* [Continuous Learning Skill](/agentskills/skills/agentic-ai/continuous-learning.md)
