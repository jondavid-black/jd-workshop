---
type: Command
title: /pr-done Command
description: Resets and cleans up the local target workspace after a Pull Request is successfully merged.
tags: [commands, workspace, git]
timestamp: 2026-06-19T17:02:00Z
---

# /pr-done Command

The `/pr-done` command handles local workspace cleanup and branch synchronization after a development Pull Request has been completed and merged on GitHub.

## Steps Performed

1. **Identify Feature Branch**: Determines the active development branch.
2. **Checkout & Pull Main**: Switches back to the protected `main` branch and pulls the latest remote changes:
   ```bash
   git checkout main && git pull
   ```
3. **Branch Deletion**: Safely deletes the local feature branch (using `git branch -d` first, or requesting user confirmation if unmerged).
4. **Session Reset**: Executes the `/new` command to clear out active agent memory and reset the context for the next feature slice.
