---
type: UI Component
title: Frontend React Game App
description: Strictly typed React application featuring countdown mechanics, round selection, dueling reveal states, and Match scoring.
resource: /mbse/ux/src/App.tsx
tags: [frontend, react, typescript, tailwind]
timestamp: 2026-06-24
---

# Frontend React Game App

A highly interactive, modern, and 100% type-safe React dashboard styled using Tailwind CSS and powered by Bun.

## State Phases

1. **Initial**: Start button, scores at (0, 0), rules legend.
2. **Countdown**: 5-second countdown timer.
3. **Action**: Visual highlighting of selected choice while timer ticks.
4. **Reveal**: Quick animation while server payload is fetched.
5. **Resolution**: Detailed win/loss message. Scoreboard updates.
6. **Game Over**: Active on 2 wins (Best of 3). Restarts state on "Play Again".
