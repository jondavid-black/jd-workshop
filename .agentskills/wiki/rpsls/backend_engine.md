---
type: Logic Module
title: Backend Game Engine
description: Core game logic module containing choice options, winning rule definition, and choice outcome evaluation function.
resource: /backend/engine.py
tags: [backend, logic, engine]
timestamp: 2026-06-24
---

# Backend Game Engine

Provides a strictly verified, cheat-proof implementation of the 10 Rock-Paper-Scissors-Lizard-Spock winning permutations.

## Winning Rules

* Scissors cuts Paper
* Paper covers Rock
* Rock crushes Lizard
* Lizard poisons Spock
* Spock smashes Scissors
* Scissors decapitates Lizard
* Lizard eats Paper
* Paper disproves Spock
* Spock vaporizes Rock
* Rock crushes Scissors

## Forfeit State
If the player choice is `None`, the engine evaluates the round as a forfeit win for the Computer.
