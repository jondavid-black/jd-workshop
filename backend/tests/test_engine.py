import pytest
from fastapi.testclient import TestClient

from engine import evaluate_round, BEATS, VALID_CHOICES
from main import app

client = TestClient(app)


def test_all_player_winning_permutations():
    """Verify that every one of the 10 rules successfully resolves to a player win."""
    for (winner, loser), verb in BEATS.items():
        result, message = evaluate_round(winner, loser)
        assert result == "player_win"
        assert verb in message
        assert winner.capitalize() in message
        assert loser.capitalize() in message


def test_all_computer_winning_permutations():
    """Verify that every one of the 10 rules successfully resolves to a computer win."""
    for (winner, loser), verb in BEATS.items():
        # Computer chooses winner, player chooses loser
        result, message = evaluate_round(loser, winner)
        assert result == "computer_win"
        assert verb in message
        assert winner.capitalize() in message
        assert loser.capitalize() in message


def test_ties():
    """Verify that matching choices result in a tie."""
    for choice in VALID_CHOICES:
        result, message = evaluate_round(choice, choice)
        assert result == "tie"
        assert "Tie" in message
        assert choice.capitalize() in message


def test_forfeit_player_null():
    """Verify that a player forfeit (None choice) triggers an automatic computer win."""
    for choice in VALID_CHOICES:
        result, message = evaluate_round(None, choice)
        assert result == "computer_win"
        assert "Forfeit" in message


def test_invalid_choices():
    """Verify that invalid inputs raise ValueError."""
    with pytest.raises(ValueError):
        evaluate_round("invalid_choice", "rock")

    with pytest.raises(ValueError):
        evaluate_round("rock", "invalid_choice")


# FastAPI API Integration Tests
def test_api_play_valid_endpoint():
    """Test API endpoint with a valid player choice."""
    response = client.post("/api/play", json={"player_choice": "spock"})
    assert response.status_code == 200
    data = response.json()
    assert data["player_choice"] == "spock"
    assert data["computer_choice"] in VALID_CHOICES
    assert data["result"] in ["player_win", "computer_win", "tie"]
    assert "message" in data


def test_api_play_forfeit_endpoint():
    """Test API endpoint representing a timeout forfeit (player_choice is null)."""
    response = client.post("/api/play", json={"player_choice": None})
    assert response.status_code == 200
    data = response.json()
    assert data["player_choice"] is None
    assert data["computer_choice"] in VALID_CHOICES
    assert data["result"] == "computer_win"
    assert "Forfeit" in data["message"]


def test_api_play_invalid_choice_endpoint():
    """Test API endpoint with an invalid choice payload (unsupported by Pydantic literal schema)."""
    response = client.post("/api/play", json={"player_choice": "invalid_choice"})
    # Pydantic Literal validation should reject this with 422 Unprocessable Entity
    assert response.status_code == 422


def test_health_endpoint():
    """Verify health check endpoint returns 200 ok."""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}
