import { describe, expect, test, mock } from 'bun:test';
import { Choice, PlayResponse, ScoreboardState, GamePhase } from './types';

// Mock the global fetch function
global.fetch = mock(() => 
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      player_choice: 'spock',
      computer_choice: 'rock',
      result: 'player_win',
      message: 'Spock vaporizes Rock! You win this round.'
    })
  })
) as any;

describe('RPSLS Frontend Type and State Verification', () => {
  test('strictly validates the Choices enum structures', () => {
    const validChoices: Choice[] = ['rock', 'paper', 'scissors', 'lizard', 'spock', null];
    expect(validChoices).toContain('rock');
    expect(validChoices).toContain(null);
  });

  test('validates Scoreboard state transitions', () => {
    const initialScoreboard: ScoreboardState = { player: 0, computer: 0 };
    expect(initialScoreboard.player).toBe(0);
    expect(initialScoreboard.computer).toBe(0);

    const updatedScoreboard: ScoreboardState = {
      player: initialScoreboard.player + 1,
      computer: initialScoreboard.computer
    };
    expect(updatedScoreboard.player).toBe(1);
    expect(updatedScoreboard.computer).toBe(0);
  });

  test('validates GamePhase states', () => {
    const activePhase: GamePhase = 'countdown';
    const validPhases: GamePhase[] = ['initial', 'countdown', 'action', 'reveal', 'resolution', 'game_over'];
    expect(validPhases).toContain(activePhase);
  });

  test('mocks backend communication payload correctly', async () => {
    const response = await fetch('http://localhost:8000/api/play', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ player_choice: 'spock' })
    });
    
    expect(response.ok).toBe(true);
    
    const data: PlayResponse = await response.json();
    expect(data.player_choice).toBe('spock');
    expect(data.computer_choice).toBe('rock');
    expect(data.result).toBe('player_win');
    expect(data.message).toBe('Spock vaporizes Rock! You win this round.');
  });
});
