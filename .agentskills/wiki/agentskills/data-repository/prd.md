---
type: Reference
title: Product Requirements Documents (PRDs)
description: Standardized folders storing feature specifications and version-controlled workflow trackers.
tags: [data, prd, requirements, planning]
timestamp: 2026-06-19T18:10:00Z
---

# Product Requirements Documents (PRDs)

We store all active and legacy Product Requirements Documents (PRDs) inside feature-specific folders under `.agentskills/prd/<feature-name>/`.

## 1. Contents
- **`<feature-name>.md`**: Detailed technical specifications, integration impact analyses, and vertical-slice ticket breakdowns.
- **`prd-status.md`**: Active workflow state tracker defining current phase, checklist completions, ticket status, and git user approval logs.

## 2. Portability Rule
Encapsulating each PRD and its tracker inside its own subfolder prevents naming collisions during concurrent development on parallel branches.

# Citations

[1] [PRD Status Tracker Skill](/agentskills/skills/planning/prd-status.md)
