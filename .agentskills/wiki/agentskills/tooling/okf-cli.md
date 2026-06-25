---
type: Script
title: OKF CLI Tool (okf_cli.ts)
description: Custom TypeScript CLI tool built to manage, lint, index, search, and parse changelogs for OKF Knowledge Bundles.
tags: [tooling, okf, cli, scripts]
timestamp: 2026-06-19T16:15:00Z
---

# OKF CLI Tool (okf_cli.ts)

The **`okf_cli.ts`** script is our custom TypeScript command-line utility designed to handle all aspects of Open Knowledge Format (OKF) bundle management.

## 1. Subcommands
- **`lint`**: Validates frontmatter parsing, required fields (like `type`), broken concept cross-links, and ISO 8601 dates. Can fail CI via `--strict` flag.
- **`index`**: Recursively scans folders to generate progressive disclosure `index.md` files.
- **`log`**: Parses git logs touching specific directories to generate/update chronological update histories (`log.md`) for each bundle.
- **`search`**: Executes fast queries matching full text, tags, title, or type, supporting `--json` formatting.

## 2. Usage Guide
Exposed under the `ai:` namespace tasks:
```bash
task ai:okf-search query="conformance"
```
Or run directly:
```bash
bun .opencode/scripts/okf_cli.ts lint --strict
```
