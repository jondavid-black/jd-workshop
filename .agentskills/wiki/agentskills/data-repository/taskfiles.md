---
type: Reference
title: Namespaced Taskfiles
description: Modular task runner configuration files declaring namespaced automation tasks for AI and UX.
tags: [data, taskfile, automation, tooling]
timestamp: 2026-06-19T18:20:00Z
---

# Namespaced Taskfiles

We store namespaced task configurations inside `.agentskills/` to avoid cluttering the root `Taskfile.yml`:

## 1. Modular Files
- **`ai-Taskfile.yml`**: Exposes semantic memory, OKF wiki management, and GitHub branch resumption under the `ai:` namespace.
- **`ux-Taskfile.yml`**: Exposes UI testing, cognitive load evaluations, and storybook compiler pipelines under the `ux:` namespace.

## 2. Capabilities
Allows target repositories to imported-include namespaced task modules, making our automated pipelines highly portable and clean.

# Citations

[1] [Go-Task CLI Runner](/agentskills/tooling/go-task.md)
