import random
from typing import Optional, Tuple

VALID_CHOICES = ["rock", "paper", "scissors", "lizard", "spock"]

# Maps (winner, loser) to the action verb
BEATS = {
    ("scissors", "paper"): "cuts",
    ("paper", "rock"): "covers",
    ("rock", "lizard"): "crushes",
    ("lizard", "spock"): "poisons",
    ("spock", "scissors"): "smashes",
    ("scissors", "lizard"): "decapitates",
    ("lizard", "paper"): "eats",
    ("paper", "spock"): "disproves",
    ("spock", "rock"): "vaporizes",
    ("rock", "scissors"): "crushes",
}


def generate_computer_choice() -> str:
    """Randomly select one of the 5 valid game choices."""
    return random.choice(VALID_CHOICES)


def evaluate_round(
    player_choice: Optional[str], computer_choice: str
) -> Tuple[str, str]:
    """
    Evaluates a single round of Rock-Paper-Scissors-Lizard-Spock.

    Returns:
        Tuple[result, message]
        where result is "player_win", "computer_win", or "tie"
        and message is the descriptive rule text explaining the outcome.
    """
    # 1. Handle Forfeit (Timeout)
    if player_choice is None:
        return "computer_win", "Forfeit: Time's up!"

    player_choice_lower = player_choice.strip().lower()
    computer_choice_lower = computer_choice.strip().lower()

    # Validation
    if player_choice_lower not in VALID_CHOICES:
        raise ValueError(f"Invalid player choice: {player_choice}")
    if computer_choice_lower not in VALID_CHOICES:
        raise ValueError(f"Invalid computer choice: {computer_choice}")

    # 2. Handle Tie
    if player_choice_lower == computer_choice_lower:
        return "tie", f"Tie: Both chose {player_choice_lower.capitalize()}."

    # 3. Handle Player Win
    if (player_choice_lower, computer_choice_lower) in BEATS:
        verb = BEATS[(player_choice_lower, computer_choice_lower)]
        return (
            "player_win",
            f"{player_choice_lower.capitalize()} {verb} {computer_choice_lower.capitalize()}! You win this round.",
        )

    # 4. Handle Computer Win
    if (computer_choice_lower, player_choice_lower) in BEATS:
        verb = BEATS[(computer_choice_lower, player_choice_lower)]
        return (
            "computer_win",
            f"{computer_choice_lower.capitalize()} {verb} {player_choice_lower.capitalize()}! Computer wins this round.",
        )

    raise RuntimeError(
        f"Unexpected unhandled outcome between {player_choice_lower} and {computer_choice_lower}"
    )
