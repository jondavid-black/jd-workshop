---
type: Reference
title: open-knowledge-format Skill
description: Guides agents in writing, linting, re-indexing, and searching OKF Knowledge Bundles.
tags: [skills, okf, wiki]
timestamp: 2026-06-19T16:50:00Z
---

# Open Knowledge Format (OKF) Skill

The **`open-knowledge-format`** skill guides agents in maintaining and querying version-controlled wikis inside `.agentskills/wiki/`. It is located at `.opencode/skills/agentic-ai/open-knowledge-format/SKILL.md`.

## Workflows Covered

- **Creating Concepts**: Guides agents to clone our standard token-efficient skeleton `.opencode/skills/agentic-ai/open-knowledge-format/templates/concept.md` and save concepts under relevant bundle folders.
- **Continuous Compilation**: Running `task okf-update` to automatically rebuild progressive indices, parse git histories for the chronological logs, and execute the OKF conformance linter.
- **Proactive Delta Audits**: Performing a file change checklist check against workspace modifications to ensure 1:1 mapping of changed repository files, commands, or agents to OKF Concepts, eliminating omissions prior to commit.
- **Full-Text Searches**: Running `task ai:okf-search query="term"`.

# Citations

[1] [OKF Tooling Reference](/agentskills/tooling/okf-cli.md)
