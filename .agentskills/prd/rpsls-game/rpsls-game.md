# Product Requirements Document (PRD)

## Title: PRD-RPSLS: Rock-Paper-Scissors-Lizard-Spock Game
**Date**: 2026-06-24  

---

## 1. Executive Summary & Objective
Implement a fully interactive, web-based, modern, and secure "Rock-Paper-Scissors-Lizard-Spock" (RPSLS) game. The system will feature a strictly typed React frontend, a high-performance Python FastAPI backend, and containerized deployment defined as a single Kubernetes Pod. A comprehensive Taskfile will orchestrate building, running, and stopping the game locally using Podman.

The ultimate objective is to deliver a highly polished, cheat-proof, and robust gaming application that adheres to Model-Based Systems Engineering (MBSE) principles and demonstrates full continuous-integration conformance.

## 2. Problem Statement & User Story
* **Problem**: Standard Rock-Paper-Scissors suffers from a high rate of ties (33.3% chance) due to its limited decision space (3 options). Expanding it to Rock-Paper-Scissors-Lizard-Spock introduces 5 options, dropping the tie rate to 20% and adding strategic depth. Furthermore, typical browser games handle game evaluation client-side, making them vulnerable to memory/DOM-injection cheating. A secure, modern system must delegate choice generation and match evaluation to a backend authority while keeping the client lightweight, highly responsive, and strictly typed.
* **User Story**: As an enthusiastic gamer, I want to play a fast-paced, countdown-driven match of Rock-Paper-Scissors-Lizard-Spock against a secure computer opponent so that I can enjoy a fair, cheat-proof, and immersive best-of-three competition.

## 3. High-Level Requirements (CAP_SYS)
* **CAP_SYS_FE**: A responsive, 100% type-safe React frontend running on **bun**, styled with modern Tailwind CSS or similar lightweight utility styles.
* **CAP_SYS_BE**: A high-performance stateless Python backend built on **FastAPI** using **uv** for environment/dependency management.
* **CAP_SYS_K8S**: A multi-container Kubernetes Pod definition (`pod.yaml`) containing frontend and backend containers running in the same network namespace.
* **CAP_SYS_TASK**: A comprehensive `Taskfile.yml` defining tasks to build container images, spin up/down the Kubernetes Pod locally via `podman play kube`, and run tests.

## 4. Detailed Functional Requirements (EARS)
* **REQ_RPSLS_001 (Server-Side Evaluation)**: If a round is played, the Backend SHALL randomly generate the Computer's choice and evaluate the round result using the 10 game rules:
  - Scissors cuts Paper
  - Paper covers Rock
  - Rock crushes Lizard
  - Lizard poisons Spock
  - Spock smashes Scissors
  - Scissors decapitates Lizard
  - Lizard eats Paper
  - Paper disproves Spock
  - Spock vaporizes Rock
  - Rock crushes Scissors
* **REQ_RPSLS_002 (Stateless Resolution API)**: While the backend evaluates a round, it SHALL process requests statelessly via `POST /api/play` containing the player's choice, and return the player's choice, computer's choice, round outcome (player_win, computer_win, or tie), and the explanatory text.
* **REQ_RPSLS_003 (Forfeit Resolution)**: If the player fails to submit a choice within the 5-second countdown, the system SHALL treat the round as a **Forfeit**, awarding the round victory to the Computer.
* **REQ_RPSLS_004 (CORS Protection)**: While handling cross-origin API requests, the Backend SHALL enable CORS explicitly for origin `http://localhost:3000` and reject requests from unauthorized origins.
* **REQ_RPSLS_005 (Match State Loop)**: While consecutive rounds are being played, the Frontend SHALL keep track of the score scoreboard and declare a Match victory as soon as either the Player or the Computer reaches 2 wins (Best of 3).
* **REQ_RPSLS_006 (Interactive Flow)**: The system SHALL progress through the following phase flow:
  1. **Initial**: Welcome screen, scores at (0, 0), and "Start Game" button.
  2. **Countdown**: Clicking "Start Game" initiates a 5-second countdown. The player must select one of the five choices before the timer hits 0.
  3. **Action**: Visual highlighting of the player's selected choice without immediate evaluation.
  4. **Reveal**: Simultaneously display both the player's and the computer's choices, and reveal the winner along with the rule text.
  5. **Resolution**: Update the scoreboard. If no one has reached 2 wins, enable the "Next Round" action.
  6. **Game Over**: Once a match winner is declared (2 wins), display the ultimate victor, celebrate or commiserate, and offer a "Play Again" reset action.

## 5. MBSE Baseline & Integration Analysis
* **Added Parts/Systems**: 
  - SysML v2 models will define the system boundary, data types (`Choice`, `RoundResult`), ports (Frontend API port `3000`, Backend API port `8000`), and use-case interactions.
  - UX models inside `mbse/ux` and associated Storybook stories will track the visual elements: `Scoreboard`, `CountdownTimer`, `ChoiceSelector`, `RevealPanel`, and `ResetController`.
* **Modified Models**: 
  - SysML packages under `mbse/sysml` will be extended to specify requirements, use cases, structural components, and interface ports.
* **Blast Radius & Impact**: 
  - Clean implementation isolated to the newly created `/mbse/ux` (frontend workspace), `/backend` (backend workspace), `/mbse/sysml`, and orchestration configurations (`Taskfile.yml`, `pod.yaml`). No impact on other existing subsystems.

## 6. Non-Functional & Security Requirements
* **Type Safety**: 100% type-safe React frontend with TypeScript interface-defined payloads and game states.
* **Low Coupling**: The frontend and backend run in isolated container namespaces. The frontend contacts the backend strictly via HTTP using standard REST payloads, enabling seamless modular updates.
* **Zero Secrets**: No sensitive keys are used. Port mappings and endpoints are passed cleanly through environment variables and default values.
* **High Coverage**: Pytest unit tests on the backend cover all 10 RPSLS rules and edge cases. Bun-based tests on the frontend cover state transitions and timers.
* **Network & Port Mappings**: 
  - Port `3000` is exposed on the host for browser access to the React frontend.
  - Port `8000` is exposed on the host for direct client-to-backend API communication (CORS enabled).

## 7. Verification & Acceptance Criteria (Test Cases)
* **verifyRoundRules**: Test the backend evaluation function against all 10 rule permutations, ensuring accurate result mapping.
* **verifyForfeitEvaluation**: Test that a payload containing `null` or empty choice evaluates as a loss for the player with a "Time's up!" message.
* **verifyMatchStateThreshold**: Test that the frontend scoreboard correctly transitions the game to `Game Over` status as soon as either party registers 2 wins, and prevents further choice inputs.
* **verifyCORSAndHeaders**: Test that API requests from unauthorized origins receive CORS rejection, while `http://localhost:3000` passes cleanly.
* **verifyKubernetesPod**: Verify that running `podman play kube pod.yaml` boots both frontend and backend successfully, and that the host browser can access the game at `http://localhost:3000`.

## 8. Detailed Implementation Plan & Proposed Issues
* **Proposed Issue 1**: **Implement Backend API Service**
  - **Title**: Implement FastAPI RPSLS Backend Service
  - **Type**: AFK
  - **Blocked by**: None
  - **What to build**: Set up a FastAPI application using `uv`. Implement the custom evaluation module covering all 10 game rules and forfeit state. Set up `pyproject.toml` and pytest suite to achieve 100% test coverage. Provide a Containerfile optimized for `uv`.
  - **Acceptance criteria**: CORS enabled for `http://localhost:3000`, stateless `POST /api/play` returns full evaluation details, and all unit tests pass with zero linting/typing errors.
* **Proposed Issue 2**: **Implement Frontend Client Application**
  - **Title**: Implement Strictly Typed React RPSLS Frontend
  - **Type**: HITL
  - **Blocked by**: Issue 1
  - **What to build**: Boot a React frontend using `bun` and TypeScript under `mbse/ux` or a targeted workspace. Implement the 6 game state phases: Welcome, Countdown (5s), Action (Highlighting), Reveal, Resolution, and Game Over. Include Tailwind CSS styles. Build corresponding Storybook stories.
  - **Acceptance criteria**: Clean UI matches the user-centered flow, countdown forfeits accurately on timeout, TypeScript strictly type-checks, and bun test suite passes successfully.
* **Proposed Issue 3**: **Containerization, Kubernetes Manifest, & Orchestration**
  - **Title**: Establish Containerfiles, Pod Manifest, and Taskfile Orchestration
  - **Type**: AFK
  - **Blocked by**: Issue 1, Issue 2
  - **What to build**: Create highly optimized Containerfiles for the frontend (bun build/serve) and backend (uv-based fastapi). Write `pod.yaml` containing both containers, ensuring ports `3000` and `8000` are exposed correctly. Implement root `Taskfile.yml` with tasks: `build` (compiles images), `up` (deploys pod using `podman play kube`), and `down` (destroys the pod).
  - **Acceptance criteria**: Run `task build && task up` boots the entire stack locally with no errors, and the user can play the full game in their host browser.

## 9. Workflow State & Checklist of Activities
* **Current Workflow State**: **Phase 5: Multi-Subagent Feature Implementation**

### Checklist of Activities:
- [x] Phase 1: Problem & Domain Refinement (Compile PRD, checkout branch, open Draft PR)
- [x] Phase 2: Architectural Modeling & UX/UI Definition (Model updates in /mbse, validate MBSE)
- [x] Phase 3: Planning & Backlog Refinement (Develop backlog, map blocking dependencies)
- [x] Phase 4: User Approval Gate (Awaiting written sign-off, record approval in Log below)
- [ ] Phase 5: Multi-Subagent Feature Implementation (Develop, verify, document each ticket)
- [ ] Phase 6: QA & Verification (Audit test reports, ensure zero regressions)
- [ ] Phase 7: Release Preparation & Versioning (Update version.txt, stage/package release)
- [ ] Phase 8: Human Peer Review (Await human peer sign-off, run /pr-done closeout)

### Approval Sign-off Log:
| Phase Name | Approved By (Git / OS Username) | Date | Status / Notes |
|---|---|---|---|
| **Phase 4: Package Approval** | Approved by Your Name | 2026-06-24 | Approved by user in chat |
| **Phase 6: Quality Verification** | *Pending* | *Pending* | *Pending* |
