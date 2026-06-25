---
type: Command
title: /sync Command
description: Synchronizes agent configurations, skills, and task files from AgentSkills into a Target Repository.
tags: [commands, synchronization, target]
timestamp: 2026-06-19T17:07:00Z
---

# /sync Command

The `/sync` command updates a Target Repository with the latest agent configurations and skills distributed from AgentSkills.

## How to Trigger

Run the bootstrap installer script corresponding to your platform:

* **Linux / macOS**:
  ```bash
  git clone -q --depth 1 git@github.com:Vibe1NG/AgentSkills.git /tmp/AgentSkills-bootstrap && HUB_URL="git@github.com:Vibe1NG/AgentSkills.git" bash /tmp/AgentSkills-bootstrap/scripts/install.sh && rm -rf /tmp/AgentSkills-bootstrap
  ```

* **Windows (PowerShell)**:
  ```powershell
  git clone -q --depth 1 git@github.com:Vibe1NG/AgentSkills.git "$env:TEMP\AgentSkills-bootstrap"; & "$env:TEMP\AgentSkills-bootstrap\scripts\install.ps1"; Remove-Item -Recurse -Force "$env:TEMP\AgentSkills-bootstrap"
  ```

## Automated Git & PR Lifecycle

After copying files, the installer automatically detects if it is running inside a Git repository and offers to automate the Git and PR creation steps:
- **Interactive TTY:** Prompts to automatically branch, stage, commit, push, and open a PR.
- **Auto-Bypass / Non-Interactive:** Set environment variable `AUTO_PR=true` to force full automated execution, or `AUTO_PR=false` to skip.
- **Fallback Support:** If Git push or GitHub CLI (`gh`) fails, it gracefully falls back and displays the exact manual instructions to complete the process.

## Reference

* [Centralized Distribution ADR](../../../adr/0001-centralized-agent-distribution-via-shallow-clone.md)
