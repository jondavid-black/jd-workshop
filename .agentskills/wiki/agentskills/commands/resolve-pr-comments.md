---
type: Command
title: /resolve-pr-comments Command
description: Pulls unresolved review comments from GitHub PRs, implements fixes, and post replies.
tags: [commands, workflow, git]
timestamp: 2026-06-19T17:06:00Z
---

# /resolve-pr-comments Command

The `/resolve-pr-comments` command automates the review resolution process for open Pull Requests.

## Execution Sequence

1. **Find PR Number**: Locates the active PR number associated with the current tracking branch.
2. **Fetch Comment Threads**: Pulls unresolved line comments via the GitHub GraphQL API.
3. **Address Feedback**: Implements surgical fixes on the referenced lines of code.
4. **Local Verification**: Runs `task ci` locally to verify that fixes are correct and do not introduce regressions.
5. **Stage, Commit, & Push**: Pushes conventional commits to the remote origin.
6. **Reply**: Posts a reply summary on GitHub via CLI to keep reviewers notified (discussions are kept unresolved for human verification).
