---
type: Command
title: /write-skill Command
description: Launches the 'write-a-skill' helper to securely author or refine custom agent skills.
tags: [commands, workflow, skills]
timestamp: 2026-06-19T17:08:00Z
---

# /write-skill Command

The `/write-skill` command initiates the custom skill authoring pipeline.

## Core Workspace Guardrails

When creating new skills, tools, or scripts, agents must strictly follow these rules:

1. **Custom Tools vs. Scripts**:
   - Save custom tool definitions (`tool()`) strictly under `.opencode/tools/`.
   - Save command-line scripts/utilities strictly under `.opencode/scripts/`. Never put standalone scripts in `tools/` to prevent crashes during boot.
2. **Type Safety**:
   - Write all helper scripts in **TypeScript (`.ts`)** with strict type declarations.
3. **Decoupled Commands**:
   - Save custom commands as Markdown files under `.opencode/commands/`. Do not hardcode them in `opencode.json`.
4. **Task Safety**:
   - Never write non-context-driven startup tasks in `AGENTS.md` that can hang OpenCode during initialization.

## Learn More

* [Write a Skill Skill](/agentskills/skills/agentic-ai/write-a-skill.md)
