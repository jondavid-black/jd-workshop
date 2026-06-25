---
type: Script
title: Memory CLI Tool (memory_cli.ts)
description: Custom TypeScript CLI tool providing direct SQLite query execution for episodic memory add, search, and delete actions.
tags: [tooling, memory, sqlite, scripts]
timestamp: 2026-06-19T16:20:00Z
---

# Memory CLI Tool (memory_cli.ts)

The **`memory_cli.ts`** script provides direct command-line access to our episodic long-term memory SQLite database.

## 1. Subcommands
- **`add`**: Persists a new engineering statement or user preference.
- **`search`**: Queries memories using `LIKE` regex matching and prints IDs.
- **`forget`**: Deletes a memory by exact ID, or safe query substring match (which aborts if multiple entries are matched).

## 2. Usage Guide
Exposed under the `ai:` namespace tasks:
```bash
task ai:mem-remember fact="Use letter format for playwright PDF compile"
```
Or run directly:
```bash
bun .opencode/scripts/memory_cli.ts search "playwright"
```
