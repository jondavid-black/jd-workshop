import React, { useState, useEffect, useRef } from 'react';
import { Shield, Sparkles, Trophy, RotateCcw, Play, AlertCircle, HelpCircle } from 'lucide-react';
import { Choice, GamePhase, PlayResponse, ScoreboardState } from './types';

const CHOICE_METADATA: Record<string, { label: string; emoji: string; color: string; hoverColor: string }> = {
  rock: { label: 'Rock', emoji: '🪨', color: 'bg-amber-600 border-amber-400 text-white', hoverColor: 'hover:bg-amber-500' },
  paper: { label: 'Paper', emoji: '📄', color: 'bg-blue-600 border-blue-400 text-white', hoverColor: 'hover:bg-blue-500' },
  scissors: { label: 'Scissors', emoji: '✂️', color: 'bg-red-600 border-red-400 text-white', hoverColor: 'hover:bg-red-500' },
  lizard: { label: 'Lizard', emoji: '🦎', color: 'bg-emerald-600 border-emerald-400 text-white', hoverColor: 'hover:bg-emerald-500' },
  spock: { label: 'Spock', emoji: '🖖', color: 'bg-purple-600 border-purple-400 text-white', hoverColor: 'hover:bg-purple-500' },
};

export default function App() {
  const [scoreboard, setScoreboard] = useState<ScoreboardState>({ player: 0, computer: 0 });
  const [phase, setPhase] = useState<GamePhase>('initial');
  const [playerChoice, setPlayerChoice] = useState<Choice>(null);
  const [computerChoice, setComputerChoice] = useState<Choice>(null);
  const [countdown, setCountdown] = useState<number>(5);
  const [roundResult, setRoundResult] = useState<PlayResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const countdownIntervalRef = useRef<Timer | null>(null);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, []);

  // Handle countdown mechanics
  useEffect(() => {
    if (phase === 'countdown') {
      setCountdown(5);
      setError(null);
      
      countdownIntervalRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
            // Trigger Reveal when timer hits 0
            resolveRound();
            return 0;
          }
          return prev - 1;
        });
      }, 1000) as unknown as Timer;
    }

    return () => {
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, [phase]);

  // Submit the selected choice or handle forfeit (null) when the timer expires
  const resolveRound = async () => {
    // Read playerChoice from the latest state. Since state values inside setInterval might be stale,
    // we use a helper pattern. However, because we trigger resolveRound in an effect that has dependencies,
    // we must fetch the state safely.
    setPhase('reveal');
    
    // We fetch latest choice from state
    setPlayerChoice((latestPlayerChoice) => {
      fetchEvaluation(latestPlayerChoice);
      return latestPlayerChoice;
    });
  };

  const fetchEvaluation = async (choice: Choice) => {
    try {
      const response = await fetch('http://localhost:8000/api/play', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ player_choice: choice }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const data: PlayResponse = await response.json();
      setRoundResult(data);
      setComputerChoice(data.computer_choice);
      
      // Update scoreboards and progress to resolution phase
      setScoreboard((prev) => {
        let newPlayerScore = prev.player;
        let newComputerScore = prev.computer;

        if (data.result === 'player_win') {
          newPlayerScore += 1;
        } else if (data.result === 'computer_win') {
          newComputerScore += 1;
        }

        const nextPhase = (newPlayerScore >= 2 || newComputerScore >= 2) ? 'game_over' : 'resolution';
        setTimeout(() => {
          setScoreboard({ player: newPlayerScore, computer: newComputerScore });
          setPhase(nextPhase);
        }, 1500); // Hold Reveal state briefly for cinematic build-up

        return prev;
      });
    } catch (err) {
      console.error(err);
      setError('Could not connect to the game evaluation backend. Please verify that the backend is running at localhost:8000.');
      setPhase('resolution');
    }
  };

  const startNewGame = () => {
    setScoreboard({ player: 0, computer: 0 });
    setPlayerChoice(null);
    setComputerChoice(null);
    setRoundResult(null);
    setError(null);
    setPhase('countdown');
  };

  const startNextRound = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setRoundResult(null);
    setError(null);
    setPhase('countdown');
  };

  const handleSelectChoice = (choice: Choice) => {
    if (phase === 'countdown') {
      setPlayerChoice(choice);
      setPhase('action');
    }
  };

  // Determine who won the Match
  const matchWinner = scoreboard.player >= 2 ? 'Player' : scoreboard.computer >= 2 ? 'Computer' : null;

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 font-sans select-none">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 py-4 backdrop-blur-md">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-purple-500 animate-pulse" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">
              RPSLS Arena
            </span>
          </div>
          <div className="text-xs text-slate-500 border border-slate-800 px-3 py-1.5 rounded-full bg-slate-950">
            Podman Kubernetes Environment • CORS Protected
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        {/* Scoreboard Widget */}
        <div className="w-full max-w-xl mb-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500" />
          <div className="flex items-center justify-between">
            <div className="text-center w-5/12">
              <h2 className="text-sm font-semibold text-purple-400 tracking-wider uppercase mb-1">Player</h2>
              <p className="text-5xl font-black text-white tracking-tight">{scoreboard.player}</p>
            </div>
            <div className="w-2/12 flex flex-col items-center justify-center">
              <span className="text-xs font-bold text-slate-500 uppercase px-2 py-1 bg-slate-950 rounded border border-slate-800">
                VS
              </span>
            </div>
            <div className="text-center w-5/12">
              <h2 className="text-sm font-semibold text-amber-400 tracking-wider uppercase mb-1">Computer</h2>
              <p className="text-5xl font-black text-white tracking-tight">{scoreboard.computer}</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-800/60 text-center text-xs text-slate-400">
            {matchWinner ? (
              <span className="text-green-400 font-bold">Match Completed!</span>
            ) : (
              <span>First to <strong className="text-purple-400">2 Wins</strong> wins the Match</span>
            )}
          </div>
        </div>

        {/* Dynamic Phase Controller */}
        <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl flex flex-col items-center min-h-[400px] justify-center text-center">
          
          {/* 1. INITIAL PHASE */}
          {phase === 'initial' && (
            <div className="flex flex-col items-center animate-fade-in">
              <div className="w-20 h-20 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6">
                <Trophy className="w-10 h-10 text-purple-400" />
              </div>
              <h1 className="text-3xl font-black tracking-tight mb-3">
                Rock-Paper-Scissors-Lizard-Spock
              </h1>
              <p className="text-slate-400 max-w-md mb-8 leading-relaxed text-sm">
                Enter the extended variant of the classic hand game made famous by Sam Kass and Karen Bryla. Secure, stateless backend evaluation prevents cheaters.
              </p>
              <button
                onClick={startNewGame}
                className="group flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 px-8 py-4 rounded-xl text-lg font-bold shadow-lg shadow-purple-500/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                <Play className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" />
                Start Game
              </button>
            </div>
          )}

          {/* 2. COUNTDOWN & 3. ACTION PHASES */}
          {(phase === 'countdown' || phase === 'action') && (
            <div className="w-full flex flex-col items-center animate-fade-in">
              {/* Countdown Timer Circle */}
              <div className="relative w-24 h-24 flex items-center justify-center mb-8">
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="#1e293b"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="url(#timerGradient)"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 - (251.2 * countdown) / 5}
                    className="transition-all duration-1000 ease-linear"
                  />
                  <defs>
                    <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="text-3xl font-black text-white">{countdown}</span>
              </div>

              <h2 className="text-xl font-bold mb-2">
                {phase === 'countdown' ? 'Make Your Choice!' : 'Selection Highlighted'}
              </h2>
              <p className="text-sm text-slate-400 mb-8">
                {phase === 'countdown' 
                  ? 'Select one of the five cards before the timer hits 0!' 
                  : 'You have chosen. Waiting for the countdown to expire...'}
              </p>

              {/* Selection cards */}
              <div className="grid grid-cols-5 gap-3 w-full">
                {Object.entries(CHOICE_METADATA).map(([key, value]) => {
                  const isSelected = playerChoice === key;
                  const isInteractive = phase === 'countdown';
                  
                  return (
                    <button
                      key={key}
                      disabled={!isInteractive}
                      onClick={() => handleSelectChoice(key as Choice)}
                      className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all aspect-[4/5] justify-center ${
                        isSelected 
                          ? 'border-purple-500 bg-purple-950/40 scale-105 ring-2 ring-purple-500/50 shadow-2xl shadow-purple-500/20' 
                          : isInteractive 
                            ? 'border-slate-800 bg-slate-900/50 hover:border-slate-700 hover:scale-102 hover:bg-slate-800/40' 
                            : 'border-slate-800/40 bg-slate-900/20 opacity-40'
                      }`}
                    >
                      <span className="text-4xl mb-3">{value.emoji}</span>
                      <span className="text-xs font-bold tracking-wide uppercase text-slate-300">
                        {value.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 4. REVEAL PHASE */}
          {phase === 'reveal' && (
            <div className="w-full flex flex-col items-center justify-center animate-fade-in py-6">
              <Sparkles className="w-12 h-12 text-yellow-400 animate-spin mb-6" />
              <h2 className="text-2xl font-black mb-8 tracking-tight">Revealing Choice Outcomes...</h2>
              
              <div className="flex items-center justify-center gap-12 w-full max-w-md">
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-dashed border-purple-500 flex items-center justify-center text-4xl shadow-xl">
                    {playerChoice ? CHOICE_METADATA[playerChoice].emoji : '⏳'}
                  </div>
                  <span className="text-xs font-bold text-purple-400 mt-3 uppercase tracking-wider">Player</span>
                </div>
                
                <div className="text-2xl font-black text-slate-600 animate-pulse">VS</div>

                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-dashed border-amber-500 flex items-center justify-center text-4xl shadow-xl animate-bounce">
                    ❓
                  </div>
                  <span className="text-xs font-bold text-amber-400 mt-3 uppercase tracking-wider">Computer</span>
                </div>
              </div>
            </div>
          )}

          {/* 5. RESOLUTION PHASE */}
          {phase === 'resolution' && (
            <div className="w-full flex flex-col items-center animate-fade-in">
              {error ? (
                <div className="flex flex-col items-center text-center p-4">
                  <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
                  <h3 className="text-lg font-bold text-red-400 mb-2">Evaluation Error</h3>
                  <p className="text-sm text-slate-400 max-w-md mb-6 leading-relaxed">{error}</p>
                  <button
                    onClick={startNewGame}
                    className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-6 py-2.5 rounded-xl text-sm font-bold border border-slate-700"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset & Retry
                  </button>
                </div>
              ) : (
                <div className="w-full flex flex-col items-center">
                  {/* Duel Visual Panel */}
                  <div className="flex items-center justify-center gap-16 mb-8 w-full">
                    <div className="flex flex-col items-center">
                      <div className={`w-28 h-28 rounded-3xl border-2 flex items-center justify-center text-5xl shadow-2xl ${
                        roundResult?.result === 'player_win' 
                          ? 'border-green-500 bg-green-950/20 scale-105 ring-4 ring-green-500/20' 
                          : 'border-slate-800 bg-slate-900/50'
                      }`}>
                        {playerChoice ? CHOICE_METADATA[playerChoice].emoji : '❌'}
                      </div>
                      <span className="text-xs font-bold text-purple-400 mt-3 uppercase tracking-wider">
                        {playerChoice ? CHOICE_METADATA[playerChoice].label : 'Forfeit'}
                      </span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className={`w-28 h-28 rounded-3xl border-2 flex items-center justify-center text-5xl shadow-2xl ${
                        roundResult?.result === 'computer_win' 
                          ? 'border-green-500 bg-green-950/20 scale-105 ring-4 ring-green-500/20' 
                          : 'border-slate-800 bg-slate-900/50'
                      }`}>
                        {computerChoice ? CHOICE_METADATA[computerChoice].emoji : '❓'}
                      </div>
                      <span className="text-xs font-bold text-amber-400 mt-3 uppercase tracking-wider">
                        {computerChoice ? CHOICE_METADATA[computerChoice].label : 'Unknown'}
                      </span>
                    </div>
                  </div>

                  {/* Outcome Heading */}
                  <div className="px-6 py-4 bg-slate-950/50 border border-slate-800/80 rounded-2xl max-w-lg mb-8 shadow-inner">
                    <h3 className={`text-xl font-extrabold mb-1 ${
                      roundResult?.result === 'player_win' 
                        ? 'text-green-400' 
                        : roundResult?.result === 'computer_win' 
                          ? 'text-red-400' 
                          : 'text-slate-300'
                    }`}>
                      {roundResult?.result === 'player_win' && 'You Won the Round!'}
                      {roundResult?.result === 'computer_win' && 'Computer Won the Round!'}
                      {roundResult?.result === 'tie' && "Tie Round! (Doesn't Count)"}
                    </h3>
                    <p className="text-sm text-slate-300 italic">{roundResult?.message}</p>
                  </div>

                  <button
                    onClick={startNextRound}
                    className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-purple-500/15"
                  >
                    Next Round
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 6. GAME OVER PHASE */}
          {phase === 'game_over' && (
            <div className="flex flex-col items-center animate-fade-in py-4">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-2xl ${
                matchWinner === 'Player' 
                  ? 'bg-green-500/10 border border-green-500/30 text-green-400' 
                  : 'bg-red-500/10 border border-red-500/30 text-red-400'
              }`}>
                <Trophy className="w-12 h-12" />
              </div>

              <h1 className="text-4xl font-black tracking-tight mb-2">
                {matchWinner === 'Player' ? 'Congratulations!' : 'Game Over'}
              </h1>
              
              <p className="text-lg text-slate-300 mb-8 max-w-sm">
                {matchWinner === 'Player' 
                  ? 'You absolutely dominated! You are the champion of the RPSLS Arena.' 
                  : 'The Computer outsmarted you this time. Practice and challenge again!'}
              </p>

              <div className="flex items-center gap-6 p-4 bg-slate-950/40 rounded-2xl border border-slate-800 mb-8">
                <span className="text-sm text-slate-400 uppercase tracking-wide font-bold pl-2">Final Match Score:</span>
                <span className="text-2xl font-black tracking-widest px-4 py-1.5 bg-slate-900 rounded-lg border border-slate-700 text-white">
                  {scoreboard.player} - {scoreboard.computer}
                </span>
              </div>

              <button
                onClick={startNewGame}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 px-8 py-4 rounded-xl text-lg font-bold shadow-xl shadow-purple-500/20"
              >
                <RotateCcw className="w-5 h-5" />
                Play Again
              </button>
            </div>
          )}

        </div>
      </main>

      {/* Footer / Legend */}
      <footer className="border-t border-slate-800 bg-slate-900/20 py-6 text-center text-xs text-slate-500">
        <div className="container mx-auto px-4 max-w-xl">
          <p className="mb-2 uppercase tracking-widest font-semibold text-slate-400">Winning Rules Legend</p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-left text-slate-400 font-mono text-[11px] leading-relaxed mx-auto max-w-md">
            <div>• Scissors cuts Paper</div>
            <div>• Scissors decapitates Lizard</div>
            <div>• Paper covers Rock</div>
            <div>• Lizard eats Paper</div>
            <div>• Rock crushes Lizard</div>
            <div>• Lizard poisons Spock</div>
            <div>• Rock crushes Scissors</div>
            <div>• Spock smashes Scissors</div>
            <div>• Paper disproves Spock</div>
            <div>• Spock vaporizes Rock</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Simple type helper for Node/Browser timer compatibility
type Timer = ReturnType<typeof setInterval>;
