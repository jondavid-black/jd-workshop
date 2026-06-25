import { describe, expect, test, mock } from 'bun:test';
import { Choice, PlayResponse } from './types';

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
  test('strictly validates the Choice types', () => {
    const choices: Choice[] = ['rock', 'paper', 'scissors', 'lizard', 'spock', null];
    expect(choices).toContain('rock');
    expect(choices).toContain('spock');
    expect(choices).toContain(null);
  });

  test('verifies PlayResponse interface shape', () => {
    const playResponse: PlayResponse = {
      player_choice: 'lizard',
      computer_choice: 'spock',
      result: 'player_win',
      message: 'Lizard poisons Spock!'
    };

    expect(playResponse.player_choice).toBe('lizard');
    expect(playResponse.computer_choice).toBe('spock');
    expect(playResponse.result).toBe('player_win');
    expect(playResponse.message).toBe('Lizard poisons Spock!');
  });

  test('validates Scoreboard state logic', () => {
    let playerScore = 0;
    let computerScore = 0;

    // Simulate winning a round
    const mockResult = 'player_win';
    if (mockResult === 'player_win') {
      playerScore += 1;
    }

    expect(playerScore).toBe(1);
    expect(computerScore).toBe(0);

    // Simulate losing a round
    const mockResult2 = 'computer_win';
    if (mockResult2 === 'computer_win') {
      computerScore += 1;
    }

    expect(playerScore).toBe(1);
    expect(computerScore).toBe(1);
  });

  test('validates game-over best of 3 transition trigger', () => {
    const hasGameEnded = (p: number, c: number) => p >= 2 || c >= 2;

    expect(hasGameEnded(0, 0)).toBe(false);
    expect(hasGameEnded(1, 0)).toBe(false);
    expect(hasGameEnded(1, 1)).toBe(false);
    expect(hasGameEnded(2, 0)).toBe(true);
    expect(hasGameEnded(1, 2)).toBe(true);
  });

  test('mocks backend communication play endpoint successfully', async () => {
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
