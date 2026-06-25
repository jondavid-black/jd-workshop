export type Choice = 'rock' | 'paper' | 'scissors' | 'lizard' | 'spock' | null;

export interface PlayRequest {
  player_choice: Choice;
}

export interface PlayResponse {
  player_choice: Choice;
  computer_choice: Choice;
  result: 'player_win' | 'computer_win' | 'tie';
  message: string;
}

export interface ScoreboardState {
  player: number;
  computer: number;
}

export type GamePhase = 'initial' | 'countdown' | 'action' | 'reveal' | 'resolution' | 'game_over';
