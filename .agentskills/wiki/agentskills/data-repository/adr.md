---
type: Reference
title: Architecture Decision Records (ADRs)
description: Decoupled, version-controlled records documenting key architectural choices, trade-offs, and consequences.
tags: [data, adr, design, architecture]
timestamp: 2026-06-19T18:15:00Z
---

# Architecture Decision Records (ADRs)

Our core structural choices are preserved as **Architecture Decision Records (ADRs)** inside `.agentskills/adr/`.

## 1. Structure
- Named sequentially using kebab-case: e.g., `0001-centralized-agent-distribution-via-shallow-clone.md`.
- Conforms to a standard format containing:
  - **Status**: (e.g., accepted, proposed)
  - **Context**: The background problem or driver.
  - **Decision**: The structural choice made.
  - **Consequences**: Positive and negative outcomes.

## 2. Capabilities
Ensures future developers and agents immediately understand past trade-offs, avoiding architectural drift or repeating resolved design debates.
