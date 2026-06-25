---
type: Guideline
title: Getting Started with OKF
description: Introduction and guidelines for creating and using Open Knowledge Format (OKF) bundles in AgentSkills.
tags: [okf, wiki, documentation]
timestamp: 2026-06-19T12:00:00Z
---

# Getting Started with OKF

Welcome to the AgentSkills OKF wiki. This bundle is designed to store shared, structured, and version-controlled team knowledge.

## File Naming and Layout

All files inside the bundle are standard Markdown files containing a YAML frontmatter block.
The directory tree is organized by domain or category:

- `/tips/`: Quick tutorials, guidelines, and tricks.
- `/references/`: System specs and standards.

## Cross-Linking

You can link between concepts using standard Markdown links:
- Use absolute, bundle-relative paths starting with `/`: `[Root Directory](/index.md)`
- Use relative paths: `[Self-Link](./getting-started.md)`

# Examples

To run the OKF search tool:
```bash
task ai:okf-search query="conformance"
```

# Citations

[1] [Google OKF Spec](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md)
