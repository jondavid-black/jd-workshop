---
type: Guideline
title: The Engineer Agent and Workflows
description: Comprehensive overview of the Lead Chief Engineer agent, its eight specialized subagents, and the 8-phase development state machine.
tags: [agents, workflows, engineering]
timestamp: 2026-06-23T12:00:00Z
---

# The Engineer Agent and Workflows

The **Chief Engineer Agent** (`engineer.md`) is the primary orchestrator for software and system engineering tasks within AgentSkills. It coordinates a team of eight specialized, cross-functional subagents to develop, verify, and document features and bugfixes sequentially.

## 1. Specialized Subagents

The Chief Engineer delegates tasks to the following subagents:
- **`engineer-system`**: Establishes system architectures, component hierarchies, and SysML v2 models inside `/mbse/sysml`.
- **`engineer-ux`**: Maps user journeys, evaluates visual layout alternatives, and implements type-safe Storybook components under `/mbse/ux`.
- **`engineer-test`**: Designs automated test coverage matched directly to the SysML model baseline.
- **`engineer-plan`**: Analyzes preceding phase artifacts, creates atomic user stories, maps dependencies, and manages the GitHub issues backlog.
- **`engineer-software`**: Implements production-ready code using strict type safety and Test-Driven Development (TDD).
- **`engineer-quality`**: Designs acceptance tests, audits codebase compliance, and performs final QA verifications.
- **`engineer-writer`**: Produces clear technical guides and auto-maintains documentation under the OKF Wiki.
- **`engineer-release`**: Handles semantic versioning, pipeline validations, and packages release archives.

## 2. GitHub Flow & Precise Version Control Steps

To guarantee rigorous version control, all engineering tasks must strictly follow the repository's structured Git and GitHub flow:

1. **Local Workspace Stashing**: Ensure any untracked or local dirty modifications from prior sessions are safely stashed:
   ```bash
   git stash
   ```
2. **Retrieve Latest Remote Baseline**: Checkout the main branch and pull latest changes to ensure you are starting from the fresh remote baseline:
   ```bash
   git checkout main && git pull origin main
   ```
3. **Check Out a Unique Feature Branch**: Create and switch to a kebab-case feature or bugfix branch immediately before making any file modifications:
   ```bash
   git checkout -b feature/<issue-number>-<name>
   ```
   *(e.g., `git checkout -b feature/<feature-name-here>`)*
4. **Restore Local Workspace Stash**: If local dirty changes were stashed in step 1, restore them on the new feature branch:
   ```bash
   git stash pop
   ```
5. **Continuous Local Verification**: Verify changes incrementally during development by running local test commands and linters:
   ```bash
   task lint:prompts
   task test
   task validate-traceability
   ```
6. **Pre-Commit Workspace Audit**: Perform workspace delta checks using `git status` and `git diff` before committing. Stage ONLY intended files and strictly ensure no secrets or environment variables are staged.
7. **Stage & Commit Changes**: Commit staged files with a clear, descriptive message matching repository conventions:
   ```bash
   git add .
   git commit -m "<type>: <brief description of changes>"
   ```
8. **Push Feature Branch**: Push the checked-out branch to the remote repository:
   ```bash
   git push origin <branch-name>
   ```
9. **Open a GitHub Draft Pull Request**: Use the GitHub CLI to create a Draft Pull Request referencing and closing all corresponding issues using standard keywords (e.g. `Closes #ID`):
   ```bash
   gh pr create --draft --title "WIP: <title>" --body "Closes #ID"
   ```

## 3. The 8-Phase Development State Machine

All feature development and bug fixing follows a rigid, non-bypassable sequence:

### Phase 1: Problem & Domain Refinement
The Chief Engineer pulls the remote baseline, checks out a feature branch, and directly runs the `refine` skill to interview the user, resolve terminology ambiguities in `.agentskills/CONTEXT.md`, and compile a formal Product Requirements Document (PRD) under `.agentskills/prd/<feature-name>/<feature-name>.md`. A Draft Pull Request is opened on GitHub.

### Phase 2: Architectural Modeling & UX/UI Definition
The `engineer-system` models package structures, system boundaries, and requirements inside the `/mbse/sysml` baseline. If a user interface is involved, `engineer-ux` compiles UI specs and maps user journeys. The `engineer-test` designs automated tests.

### Phase 3: Backlog Refinement & Plan Development
The `engineer-plan` reviews preceding phase artifacts, runs `git diff` for delta integration analysis, drafts atomic user stories with clear Acceptance Criteria, maps dependencies, and compiles the implementation plan in the PRD.

### Phase 4: Package Approval (User Control Gate)
The Chief Engineer presents the comprehensive PRD and implementation plan in chat.
- **User Gate (NO-BYPASS)**: Proceeding requires explicit written human approval (e.g., "Approve" or "Proceed"). The agent MUST halt and yield control with zero tool calls. No post-approval actions, logging, or implementation can occur in the same turn.

### Phase 5: Multi-Subagent Feature Implementation
Once user approval is received, the agent records sign-off, logs issues on GitHub, updates the PR description, and then implements each logged issue sequentially on the feature branch. The `engineer-software` writes code under TDD, `engineer-quality` designs acceptance/verification tests, and `engineer-writer` updates the OKF Wiki concepts under `.agentskills/wiki/`.

### Phase 6: QA & Verification
The `engineer-quality` conducts final verification audits. All repository lints and validations are executed (`task ci`). Episodic memories are saved, and the repository code graph is re-indexed.

### Phase 7: Release Preparation & Versioning
The `engineer-release` bumps SemVer in `version.txt`, validates pipeline configs, packages release artifacts, and marks the PR ready for review (`gh pr ready`).

### Phase 8: Human Peer Review (User Control Gate)
The completed Pull Request is audited by a human engineer.
- **User Gate (NO-BYPASS)**: Proceeding to release publishing and closeout requires explicit written peer review approval. The agent MUST halt and yield control with zero tool calls. Merging or closeout (/pr-done) cannot occur until written approval is received in a subsequent user message. Once given, `engineer-release` publishes the release and closes out the workflow (`/pr-done`).

# Examples

To resume active development on a checked-out branch:
```bash
task ai:resume ref="<PR_number_or_feature_name>"
```

# Citations

[1] [AgentSkills CONTEXT Glossary](https://github.com/Vibe1NG/AgentSkills/blob/main/.agentskills/CONTEXT.md)
