export type Choice = 'rock' | 'paper' | 'scissors' | 'lizard' | 'spock' | null;

export interface PlayResponse {
  player_choice: Choice;
  computer_choice: Choice;
  result: 'player_win' | 'computer_win' | 'tie';
  message: string;
}
