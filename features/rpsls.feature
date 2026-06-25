Feature: Rock-Paper-Scissors-Lizard-Spock Game Flow

  @verifyRoundRules
  Scenario Outline: Play a single round of RPSLS with standard choices
    Given the backend server is running and ready to evaluate choices
    When the player chooses "<player_choice>"
    And the computer generates "<computer_choice>"
    Then the round result is "<result>" with message "<message>"

    Examples:
      | player_choice | computer_choice | result       | message                      |
      | scissors      | paper           | player_win   | Scissors cuts Paper          |
      | paper         | rock            | player_win   | Paper covers Rock            |
      | rock          | lizard          | player_win   | Rock crushes Lizard          |
      | lizard        | spock           | player_win   | Lizard poisons Spock         |
      | spock         | scissors        | player_win   | Spock smashes Scissors       |
      | scissors      | lizard          | player_win   | Scissors decapitates Lizard  |
      | lizard        | paper           | player_win   | Lizard eats Paper            |
      | paper         | spock           | player_win   | Paper disproves Spock        |
      | spock         | rock            | player_win   | Spock vaporizes Rock         |
      | rock          | scissors        | player_win   | Rock crushes Scissors        |
      | rock          | rock            | tie          | Tie round                    |

  @verifyForfeit
  Scenario: Player fails to choose within the countdown timer
    Given the 5-second countdown timer has started
    When the countdown reaches 0 seconds without player selection
    Then the round is marked as a forfeit
    And the round result is evaluated as "computer_win" with message "Forfeit: Time's up!"

  @verifyMatchEnd
  Scenario: Score scoreboard triggers game over on match condition
    Given the current score is 1 for the player and 1 for the computer
    When the player wins the next round
    Then the scoreboard score updates to 2 for the player and 1 for the computer
    And the match is won by the player
    And the game transitions to "Game Over" screen

  @verifyCORS
  Scenario: Restrict cross-origin requests to authorized origins only
    Given the backend server is running with CORS enabled
    When an API request is made from origin "http://unauthorized-domain.com"
    Then the server rejects the request with a CORS error
