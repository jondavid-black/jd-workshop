# Rock-Paper-Scissors-Lizard-Spock Context

A classic extended variant of the Rock-Paper-Scissors game containing five choices, modeled as a modern web application with a FastAPI backend and React frontend.

## Language

**Choice**:
One of the five playable options in the game.
_Avoid_: Option, move, hand, gesture

**Round**:
A single active gameplay iteration initiated by clicking "Start Game", running a countdown, and ending with a choice evaluation.
_Avoid_: Turn, play, set

**Match**:
A series of consecutive rounds continuing until either the player or the computer reaches 2 wins (Best of 3).
_Avoid_: Game, tournament, contest

**Player**:
The human user making choices on the React frontend.
_Avoid_: User, client, gamer

**Computer**:
The backend agent generating random choices.
_Avoid_: Bot, opponent, AI, server

**Forfeit**:
An automatic round loss triggered by the player failing to select a choice within the 5-second countdown.
_Avoid_: Timeout, skip, bypass
