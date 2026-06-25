package rpsls {
    // Requirements
    public requirement REQ_RPSLS_001 {
        doc /* Server-side evaluation of choice logic */
    }
    public requirement REQ_RPSLS_002 {
        doc /* Stateless REST API endpoints */
    }
    public requirement REQ_RPSLS_003 {
        doc /* 5-second countdown forfeit */
    }
    public requirement REQ_RPSLS_004 {
        doc /* CORS restriction */
    }
    public requirement REQ_RPSLS_005 {
        doc /* Match state tracking best of 3 */
    }
    public requirement REQ_RPSLS_006 {
        doc /* Complete interactive state flow */
    }

    // Verification Cases
    public verification case verifyRoundRules {
        doc /* Verify all 10 RPSLS rules and outcomes */
    }
    public verification case verifyForfeit {
        doc /* Verify countdown forfeit behavior on timeout */
    }
    public verification case verifyMatchEnd {
        doc /* Verify best of 3 match scores and game reset */
    }
    public verification case verifyCORS {
        doc /* Verify CORS access control limits */
    }

    // Trace mappings
    verify REQ_RPSLS_001 by verifyRoundRules;
    verify REQ_RPSLS_002 by verifyRoundRules;
    verify REQ_RPSLS_003 by verifyForfeit;
    verify REQ_RPSLS_004 by verifyCORS;
    verify REQ_RPSLS_005 by verifyMatchEnd;
    verify REQ_RPSLS_006 by verifyMatchEnd;

    // Structural Parts and Ports
    public part def GameBoard {
        doc /* Main container of the RPSLS game interface */
        public port uiPort;
    }

    public part def Scoreboard {
        doc /* Real-time display panel of player and computer scores */
        public port displayPort;
    }

    public part def CountdownTimer {
        doc /* 5-second action timer element */
        public port timePort;
    }

    public part def ChoiceSelector {
        doc /* Input selectors for the 5 choices */
        public port inputPort;
    }

    // Use Cases and Actions
    public usecase playRound {
        doc /* Sequence representing a single round of RPSLS play */
        
        public action startCountdown {
            doc /* Trigger the 5-second player input timer */
        }
        public action submitChoice {
            doc /* Post the user choice to the server API */
        }
        public action revealChoices {
            doc /* Simultaneously reveal choices and declare outcome */
        }
    }
}
