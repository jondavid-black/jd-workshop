---
type: Database
title: Episodic Memory Database
description: Local SQLite database storing unstructured facts, decisions, and preferences across agent sessions.
tags: [data, database, sqlite, memory]
timestamp: 2026-06-19T18:05:00Z
---

# Episodic Memory Database

The **Episodic Memory Database** is a localized SQLite database located at `.agentskills/memory_db/memory.db`.

## 1. Schema Specifications
- **`facts` Table**:
  - `id`: Auto-incrementing integer (Primary Key).
  - `fact`: Unstructured text statement.
  - `timestamp`: Datetime of creation (defaults to `CURRENT_TIMESTAMP`).

## 2. Capabilities
- Keeps persistent notes about visual choices, brand preferences, and complex debugging lessons across separate sessions.
- Managed and queried directly via `memory_cli.ts` (using Go-Task commands).

# Citations

[1] [Episodic Memory CLI Tool](/agentskills/tooling/memory-cli.md)
