---
type: Command
title: /refine-issue Command
description: Starts a new requirement refinement session driven by a specific GitHub issue description.
tags: [commands, workflow, planning]
timestamp: 2026-06-19T17:03:00Z
---

# /refine-issue Command

The `/refine-issue` command pulls an issue description from the GitHub tracker and immediately launches a requirement refinement session.

## Workflow

1. **Issue Fetching**: Uses the GitHub CLI (`gh issue view`) to retrieve the detailed issue description.
2. **Refinement Launch**: Invokes the `refine` skill, using the fetched issue description as the plan baseline.
3. **Traceability**: Compares the issue against `.agentskills/CONTEXT.md` and active ADRs, prompting the user with targeted questions.

## Learn More

* [Refine Command](/agentskills/commands/refine.md)
* [Refine Skill](/agentskills/skills/planning/refine.md)
