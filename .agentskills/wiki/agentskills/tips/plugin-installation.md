---
type: Guideline
title: Zero-Config Plugin Installation & Updates
description: Guidelines and installation processes for integrating AgentSkills into target repositories using the zero-config auto-discovery plugin model.
tags: [plugin, installation, updates, setup]
timestamp: 2026-06-24T12:00:00Z
---

# Zero-Config Plugin Installation & Updates

To minimize configuration drift, symbolic link collisions, and workspace pollution, AgentSkills is distributed as a compiled, auto-discovered OpenCode plugin package (`agentskills.tar.gz`).

On boot, the OpenCode execution framework automatically loads the plugin from `.opencode/plugins/agentskills/` and programmatically merges all agent prompts, custom commands, and skills.

## 🚀 One-Command Installation & Upgrade

To bootstrap any target repository from scratch or upgrade an existing workspace to the latest version of AgentSkills, execute the following command in your terminal root:

```bash
gh api -H "Accept: application/vnd.github.raw" repos/Vibe1NG/AgentSkills/contents/update-agents.sh | bash
```

## ⚙️ Automated Integration Details

The installation script (`update-agents.sh`) performs the following operations:

1. **Auto-Discovery Setup**: Downloads the latest or pinned `agentskills.tar.gz` and extracts it strictly inside `.opencode/plugins/agentskills/` using the `--strip-components=1` flag.
2. **Taskfile Import**: Programmatically includes the AgentSkills execution namespace (`as:`) into the target repository's root `Taskfile.yml`:
   ```yaml
   includes:
     as:
       taskfile: .opencode/plugins/agentskills/.agentskills/Taskfile.yml
       dir: .
   ```
3. **Workspace Hygiene**: Cleanly appends `.opencode/plugins/` to the target `.gitignore` to keep git working trees pristine.

## 📌 Version Pinning

To freeze a specific version of AgentSkills for stability across builds, pass the desired tag name as an argument to bash:

```bash
gh api -H "Accept: application/vnd.github.raw" repos/Vibe1NG/AgentSkills/contents/update-agents.sh | bash -s -- [version-here]
```
