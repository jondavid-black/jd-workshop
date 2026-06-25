---
type: Reference
title: write-a-skill Skill
description: Guides agents in creating new custom agent skills with proper structure, progressive disclosure, and bundled resources.
tags: [skills, agentic-ai]
timestamp: 2026-06-19T17:15:00Z
---

# write-a-skill Skill

The **`write-a-skill`** skill provides step-by-step instructions and structure templates for creating, refining, and compiling new modular agent skills.

## Core Rules

1. **Skeleton Cloning**: Always read the standard skill template under `.opencode/skills/agentic-ai/write-a-skill/templates/SKILL.md` before starting.
2. **File Placement**: Store custom actions and helper scripts in TypeScript inside the skill's local directory.
3. **Task Integration**: Declare any new command-line tasks in `.agentskills/Taskfile.yml`.
