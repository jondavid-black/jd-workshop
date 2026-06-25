---
type: Guideline
title: The Researcher Agent
description: Detailed overview of the Researcher agent and its specialized subagents for security modeling and context exploration.
tags: [agents, researcher, threat-modeling]
timestamp: 2026-06-19T15:05:00Z
---

# The Researcher Agent

The **Researcher Agent** (`researcher.md`) is designed for non-invasive exploration, abstract technical brainstorming, and trade-off analysis. All research activities are sandboxed inside `.agentskills/references/` to prevent repository contamination.

## 1. Specialized Subagents

The Researcher delegates tasks to four highly targeted subagents:
- **`researcher-analyst`**: Conducts structured trade-off analyses, security threat modeling, and pros/cons scoring.
- **`researcher-collect`**: Handles secure external data retrieval, including cloning repositories and fetching academic papers.
- **`researcher-repo`**: Scans codebase paths, structures local code graphs, and analyzes cloned external dependencies.
- **`researcher-web`**: Conducts active web research, fetches URLs, and crawls developer documentation.

## 2. Operating Constraints & Sandboxing

To protect workspace hygiene:
- **No Direct Code Commits**: The Researcher agent does not write or commit production code to the primary source folders (e.g. `.opencode/`).
- **Data Retention**: All downloaded materials, reference texts, and research reports must be saved exclusively inside `.agentskills/references/`.
- **Secret Hygiene**: Blocked from logging credentials or retrieving sensitive files.

# Examples

To analyze repository references or search local code structures:
```bash
task ai:repo-inspect query="find references of <target>"
```

# Citations

[1] [Lead Engineer Workflow and Roles](/agentskills/agents/engineer.md)
