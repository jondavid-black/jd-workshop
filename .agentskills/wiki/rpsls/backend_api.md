---
type: API Endpoint
title: Backend FastAPI Server
description: Stateless FastAPI server endpoints with CORS enabling and play routing.
resource: /backend/main.py
tags: [backend, api, fastapi, cors]
timestamp: 2026-06-24
---

# Backend FastAPI Server

Exposes stateless REST endpoints for game interaction. Enables CORS for authorized frontend origins.

## Endpoints

### 1. `POST /api/play`
Core stateless play evaluation.

#### Request Body
```json
{
  "player_choice": "rock" | "paper" | "scissors" | "lizard" | "spock" | null
}
```

#### Response Body
```json
{
  "player_choice": "rock" | "paper" | "scissors" | "lizard" | "spock" | null,
  "computer_choice": "rock" | "paper" | "scissors" | "lizard" | "spock",
  "result": "player_win" | "computer_win" | "tie",
  "message": "Spock vaporizes Rock! You win this round."
}
```

### 2. `GET /health`
Simple service health check.
