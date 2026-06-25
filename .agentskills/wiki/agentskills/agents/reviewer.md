---
type: Guideline
title: The Reviewer Agent
description: Detailed overview of the Reviewer agent and its specialized subagents for multi-dimensional codebase auditing.
tags: [agents, reviewer, auditing]
timestamp: 2026-06-19T15:10:00Z
---

# The Reviewer Agent

The **Reviewer Agent** (`reviewer.md`) performs secure, read-only, multi-dimensional code and design audits. It ensures that all contributions meet architectural standards, type-safety rules, and documentation formatting guidelines.

## 1. Specialized Subagents

The Reviewer coordinates five highly specialized auditing subagents:
- **`reviewer-python`**: Audits backend Python code, FastAPI routing, and Alembic database migrations.
- **`reviewer-web`**: Audits React frontends, storybook components, TypeScript structures, and Bun runtime settings.
- **`reviewer-systems`**: Validates SysML v2 systems baseline models, ports, connections, and verification links.
- **`reviewer-infra`**: Audits Kubernetes manifests, Helm charts, Docker/Podman files, and Ansible IaC configurations.
- **`reviewer-docs`**: Audits markdown formatting, acronym usage, and spellchecking.

## 2. Review Outputs

Reviewers do not directly implement fixes. Instead, they produce structured improvement recommendations using standard templates:
- **Quality Findings**: Documented under `.agentskills/documents/` or in the PR reviews.
- **Traceability Audits**: Verify model-to-code parity and generate Gherkin/BDD coverage maps.

# Citations

[1] [Lead Engineer Workflow and Roles](/agentskills/agents/engineer.md)
[2] [The Researcher Agent Specifications](/agentskills/agents/researcher.md)
