---
type: Orchestration Guideline
title: Go-Task Orchestration Configuration
description: Local orchestration definitions using root-level Taskfile.yml with build, up, down, and validation tasks.
resource: /Taskfile.yml
tags: [orchestration, go-task, automation]
timestamp: 2026-06-24
---

# Go-Task Orchestration Configuration

Centralizes all repository automation, compiling images, starting/stopping Podman play kube, running test suites, and executing MBSE traceability checks.

## Key Tasks

* **`task build`**: Compiles container images for frontend and backend.
* **`task up`**: deploys the Kubernetes pod using `podman play kube`.
* **`task down`**: tears down the running pod.
* **`task test`**: executes Pytest and Bun-test suites.
* **`task validate-mbse`**: validates model requirements and visual stories.
* **`task ci`**: full continuous integration suite.
