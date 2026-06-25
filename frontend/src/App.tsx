import { useState, useEffect, useRef } from 'react';
import { Choice, PlayResponse } from './types';

type GamePhase = 'initial' | 'countdown' | 'action' | 'reveal' | 'resolution' | 'game_over';

interface ChoiceDetails {
  id: Exclude<Choice, null>;
  emoji: string;
  name: string;
  color: string;
  gradient: string;
  shadow: string;
}

const CHOICES: ChoiceDetails[] = [
  {
    id: 'rock',
    emoji: '✊',
    name: 'Rock',
    color: 'text-red-400',
    gradient: 'from-red-500 to-rose-600',
    shadow: 'shadow-red-500/50',
  },
  {
    id: 'paper',
    emoji: '✋',
    name: 'Paper',
    color: 'text-blue-400',
    gradient: 'from-blue-500 to-indigo-600',
    shadow: 'shadow-blue-500/50',
  },
  {
    id: 'scissors',
    emoji: '✌️',
    name: 'Scissors',
    color: 'text-yellow-400',
    gradient: 'from-yellow-400 to-amber-500',
    shadow: 'shadow-yellow-400/50',
  },
  {
    id: 'lizard',
    emoji: '🦎',
    name: 'Lizard',
    color: 'text-emerald-400',
    gradient: 'from-emerald-400 to-green-500',
    shadow: 'shadow-emerald-500/50',
  },
  {
    id: 'spock',
    emoji: '🖖',
    name: 'Spock',
    color: 'text-purple-400',
    gradient: 'from-purple-500 to-fuchsia-600',
    shadow: 'shadow-purple-500/50',
  },
];

export default function App() {
  const [phase, setPhase] = useState<GamePhase>('initial');
  const [playerScore, setPlayerScore] = useState<number>(0);
  const [computerScore, setComputerScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(5);
  const [playerChoice, setPlayerChoice] = useState<Choice>(null);
  const [computerChoice, setComputerChoice] = useState<Choice>(null);
  const [roundResult, setRoundResult] = useState<'player_win' | 'computer_win' | 'tie' | null>(null);
  const [roundMessage, setRoundMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  
  // Use ref to keep track of current choice during interval callback
  const playerChoiceRef = useRef<Choice>(null);

  // Sync ref with playerChoice state
  useEffect(() => {
    playerChoiceRef.current = playerChoice;
  }, [playerChoice]);

  // Countdown timer logic
  useEffect(() => {
    if (phase !== 'countdown' && phase !== 'action') return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          triggerReveal(playerChoiceRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [phase]);

  const startGame = () => {
    setPlayerScore(0);
    setComputerScore(0);
    startRound();
  };

  const startRound = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setRoundResult(null);
    setRoundMessage('');
    setTimeLeft(5);
    setPhase('countdown');
  };

  const handleSelectChoice = (choice: Choice) => {
    if (phase !== 'countdown' && phase !== 'action') return;
    setPlayerChoice(choice);
    setPhase('action');
  };

  const triggerReveal = async (selectedChoice: Choice) => {
    setPhase('reveal');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/play', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ player_choice: selectedChoice }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data: PlayResponse = await response.json();
      
      // Introduce a small dramatic suspense delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setComputerChoice(data.computer_choice);
      setRoundResult(data.result);
      setRoundMessage(data.message);

      let pScore = playerScore;
      let cScore = computerScore;

      if (data.result === 'player_win') {
        pScore += 1;
        setPlayerScore(pScore);
      } else if (data.result === 'computer_win') {
        cScore += 1;
        setComputerScore(cScore);
      }

      setLoading(false);
      
      if (pScore >= 2 || cScore >= 2) {
        setPhase('game_over');
      } else {
        setPhase('resolution');
      }
    } catch (err) {
      console.warn('Backend unavailable, running local logic fallback.');
      
      // Offline / Test environment fallback
      const randomChoice = CHOICES[Math.floor(Math.random() * CHOICES.length)].id;
      let fallbackResult: 'player_win' | 'computer_win' | 'tie' = 'tie';
      let message = '';

      if (selectedChoice === null) {
        fallbackResult = 'computer_win';
        message = "Forfeit: Time's up!";
      } else if (selectedChoice === randomChoice) {
        fallbackResult = 'tie';
        message = `Tie: Both chose ${selectedChoice}.`;
      } else {
        const winMap: Record<string, string[]> = {
          scissors: ['paper', 'lizard'],
          paper: ['rock', 'spock'],
          rock: ['scissors', 'lizard'],
          lizard: ['spock', 'paper'],
          spock: ['rock', 'scissors'],
        };
        if (winMap[selectedChoice].includes(randomChoice)) {
          fallbackResult = 'player_win';
          message = `${selectedChoice.charAt(0).toUpperCase() + selectedChoice.slice(1)} beats ${randomChoice.charAt(0).toUpperCase() + randomChoice.slice(1)}! You win!`;
        } else {
          fallbackResult = 'computer_win';
          message = `${randomChoice.charAt(0).toUpperCase() + randomChoice.slice(1)} beats ${selectedChoice.charAt(0).toUpperCase() + selectedChoice.slice(1)}! Computer wins!`;
        }
      }

      await new Promise((resolve) => setTimeout(resolve, 1500));

      setComputerChoice(randomChoice);
      setRoundResult(fallbackResult);
      setRoundMessage(message);

      let pScore = playerScore;
      let cScore = computerScore;

      if (fallbackResult === 'player_win') {
        pScore += 1;
        setPlayerScore(pScore);
      } else if (fallbackResult === 'computer_win') {
        cScore += 1;
        setComputerScore(cScore);
      }

      setLoading(false);

      if (pScore >= 2 || cScore >= 2) {
        setPhase('game_over');
      } else {
        setPhase('resolution');
      }
    }
  };

  // Circular timer SVG variables
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (timeLeft / 5) * circumference;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 select-none bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-slate-100 font-sans">
      
      {/* Header Panel */}
      <header className="mb-8 text-center animate-fade-in">
        <h1 className="text-3xl sm:text-5xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 drop-shadow">
          RPSLS BASELINE
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 uppercase tracking-widest mt-2">
          Rock • Paper • Scissors • Lizard • Spock
        </p>
        <div className="mt-1 text-[10px] text-slate-500 font-mono">
          SysML Ref: [sysml:usecase:playRound]
        </div>
      </header>

      {/* Main Container Card */}
      <main className="w-full max-w-2xl bg-slate-800/60 backdrop-blur-md rounded-2xl border border-slate-700/50 shadow-2xl p-6 sm:p-8 relative overflow-hidden">
        
        {loading && (
          <div className="absolute top-4 right-4 text-[10px] bg-teal-500/10 text-teal-400 px-2 py-0.5 rounded border border-teal-500/20 font-mono animate-pulse">
            Processing...
          </div>
        )}
        
        {/* Scoreboard Block */}
        {(phase !== 'initial') && (
          <section className="grid grid-cols-3 gap-4 items-center mb-8 border-b border-slate-700/40 pb-6" aria-label="Scoreboard">
            {/* Player Score */}
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Player</span>
              <div className="text-4xl font-extrabold mt-1 text-teal-400">{playerScore}</div>
            </div>
            
            {/* VS Divider */}
            <div className="text-center font-mono text-sm text-slate-500 uppercase tracking-widest">
              Best of 3
            </div>

            {/* Computer Score */}
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Computer</span>
              <div className="text-4xl font-extrabold mt-1 text-indigo-400">{computerScore}</div>
            </div>
          </section>
        )}

        {/* Phase Renderers */}
        {phase === 'initial' && (
          <article className="text-center py-6 animate-fade-in">
            <div className="text-6xl mb-6 animate-bounce-short">🖖</div>
            <h2 className="text-2xl font-bold mb-3 text-slate-200">Welcome to the Quantum Arena</h2>
            <p className="text-slate-400 text-sm max-w-md mx-auto mb-8 leading-relaxed">
              Challenge our system engine in a battle of tactics. 
              Each round lasts exactly <strong className="text-teal-400">5 seconds</strong>. 
              Be swift—failing to lock in your choice results in a forfeit!
            </p>
            <button
              onClick={startGame}
              className="px-8 py-3.5 bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-400 hover:to-indigo-400 text-white font-bold rounded-xl shadow-lg hover:shadow-indigo-500/30 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 uppercase tracking-wider text-sm"
            >
              Start Game
            </button>
          </article>
        )}

        {(phase === 'countdown' || phase === 'action') && (
          <article className="flex flex-col items-center py-4">
            
            {/* Countdown Circle Timer */}
            <div className="relative w-32 h-32 flex items-center justify-center mb-8" aria-label="Countdown Timer">
              <svg className="w-full h-full transform -rotate-90">
                {/* Track Circle */}
                <circle
                  cx="64"
                  cy="64"
                  r={radius}
                  className="stroke-slate-700/60"
                  strokeWidth="8"
                  fill="transparent"
                />
                {/* Active Progress Circle */}
                <circle
                  cx="64"
                  cy="64"
                  r={radius}
                  className="stroke-teal-400 transition-all duration-1000 ease-linear"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute text-4xl font-black text-white font-mono tracking-tighter">
                {timeLeft}s
              </span>
            </div>

            <h3 className="text-lg font-bold mb-6 text-slate-300">
              {playerChoice 
                ? `Ready: You selected ${playerChoice.toUpperCase()}`
                : "Select your tactic before time expires!"}
            </h3>

            {/* Choice Selector Block */}
            <div className="grid grid-cols-5 gap-3 w-full" aria-label="Choice Selector">
              {CHOICES.map((choice) => {
                const isSelected = playerChoice === choice.id;
                const isAnySelected = playerChoice !== null;
                return (
                  <button
                    key={choice.id}
                    onClick={() => handleSelectChoice(choice.id)}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all duration-200 transform ${
                      isSelected
                        ? `bg-slate-700 border-teal-400 scale-105 shadow-lg ${choice.shadow}`
                        : isAnySelected
                        ? 'bg-slate-800/40 border-slate-700/50 opacity-40 hover:opacity-60 scale-95'
                        : 'bg-slate-800 border-slate-700 hover:border-slate-500 hover:scale-105 hover:bg-slate-700'
                    }`}
                  >
                    <span className="text-3xl sm:text-4xl mb-1">{choice.emoji}</span>
                    <span className="text-[10px] sm:text-xs font-semibold text-slate-400 tracking-wider">
                      {choice.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </article>
        )}

        {phase === 'reveal' && (
          <article className="flex flex-col items-center py-6 text-center animate-pulse-slow">
            <div className="flex justify-center items-center gap-8 mb-8">
              {/* Player Choice Highlight */}
              <div className="flex flex-col items-center">
                <span className="text-xs uppercase font-semibold text-slate-400 mb-2">You Chose</span>
                <div className="w-24 h-24 rounded-full bg-slate-700/80 flex items-center justify-center border-2 border-teal-400 text-5xl">
                  {playerChoice ? CHOICES.find(c => c.id === playerChoice)?.emoji : '⏳'}
                </div>
                <span className="text-sm font-bold mt-2 capitalize text-teal-400">
                  {playerChoice || 'Forfeit'}
                </span>
              </div>

              {/* Suspense VS Indicator */}
              <div className="text-xl font-black text-slate-500 font-mono">VS</div>

              {/* Cycling Computer Choice */}
              <div className="flex flex-col items-center">
                <span className="text-xs uppercase font-semibold text-slate-400 mb-2">Computer</span>
                <div className="w-24 h-24 rounded-full bg-slate-700/80 flex items-center justify-center border-2 border-dashed border-indigo-400 text-5xl animate-spin-slow">
                  🎰
                </div>
                <span className="text-sm font-bold mt-2 text-indigo-400 animate-pulse">
                  Selecting...
                </span>
              </div>
            </div>

            <h3 className="text-lg font-bold text-slate-300">
              Analyzing quantum choices...
            </h3>
          </article>
        )}

        {phase === 'resolution' && (
          <article className="flex flex-col items-center py-4 text-center">
            <div className="flex justify-center items-center gap-8 mb-8">
              {/* Player Choice Panel */}
              <div className="flex flex-col items-center">
                <span className="text-xs uppercase font-semibold text-slate-400 mb-2">You Chose</span>
                <div className={`w-24 h-24 rounded-full bg-slate-700 flex items-center justify-center border-2 ${
                  roundResult === 'player_win' ? 'border-teal-400 shadow-lg shadow-teal-500/20' : 'border-slate-600'
                } text-5xl`}>
                  {playerChoice ? CHOICES.find(c => c.id === playerChoice)?.emoji : '⏳'}
                </div>
                <span className="text-sm font-bold mt-2 capitalize text-teal-400">
                  {playerChoice || 'Forfeit'}
                </span>
              </div>

              <div className="text-xl font-black text-slate-500 font-mono">VS</div>

              {/* Computer Choice Panel */}
              <div className="flex flex-col items-center">
                <span className="text-xs uppercase font-semibold text-slate-400 mb-2">Computer</span>
                <div className={`w-24 h-24 rounded-full bg-slate-700 flex items-center justify-center border-2 ${
                  roundResult === 'computer_win' ? 'border-indigo-400 shadow-lg shadow-indigo-500/20' : 'border-slate-600'
                } text-5xl`}>
                  {computerChoice ? CHOICES.find(c => c.id === computerChoice)?.emoji : '⏳'}
                </div>
                <span className="text-sm font-bold mt-2 capitalize text-indigo-400">
                  {computerChoice || 'Forfeit'}
                </span>
              </div>
            </div>

            {/* Resolution Banner */}
            <div className={`px-6 py-3 rounded-full font-bold text-sm sm:text-base uppercase tracking-wider mb-4 ${
              roundResult === 'player_win' 
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                : roundResult === 'computer_win'
                ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                : 'bg-slate-700 text-slate-300 border border-slate-600'
            }`}>
              {roundResult === 'player_win' && '🎉 Round Won!'}
              {roundResult === 'computer_win' && '🤖 Round Lost!'}
              {roundResult === 'tie' && '🤝 Round Tied!'}
            </div>

            <p className="text-slate-300 text-lg font-medium mb-8 max-w-md">
              {roundMessage}
            </p>

            <button
              onClick={startRound}
              className="px-8 py-3.5 bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold rounded-xl border border-slate-600 shadow-md transition-all duration-150 uppercase tracking-wider text-sm"
            >
              Next Round
            </button>
          </article>
        )}

        {phase === 'game_over' && (
          <article className="flex flex-col items-center py-6 text-center animate-fade-in">
            {playerScore >= 2 ? (
              <div className="text-7xl mb-6">🏆</div>
            ) : (
              <div className="text-7xl mb-6">🤖</div>
            )}
            
            <h2 className="text-3xl font-black tracking-wide mb-2 text-white">
              {playerScore >= 2 ? 'GLORIOUS VICTORY!' : 'SYSTEM DEFEAT'}
            </h2>
            
            <p className="text-slate-400 text-sm max-w-md mx-auto mb-8 leading-relaxed">
              {playerScore >= 2 
                ? `Outstanding strategy! You defeated the system engine with a final score of ${playerScore} to ${computerScore}.`
                : `The system engine outpaced you in logic metrics. Final score: Computer ${computerScore}, You ${playerScore}.`}
            </p>

            {/* Final score block */}
            <div className="flex gap-6 items-center justify-center bg-slate-900/60 border border-slate-800 p-4 rounded-xl mb-8 font-mono">
              <div>
                <span className="text-xs text-slate-500 block uppercase">Player</span>
                <span className="text-3xl font-bold text-teal-400">{playerScore}</span>
              </div>
              <div className="text-slate-600 text-lg font-bold">:</div>
              <div>
                <span className="text-xs text-slate-500 block uppercase">System</span>
                <span className="text-3xl font-bold text-indigo-400">{computerScore}</span>
              </div>
            </div>

            <button
              onClick={startGame}
              className="px-8 py-3.5 bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-400 hover:to-indigo-400 text-white font-bold rounded-xl shadow-lg hover:shadow-indigo-500/30 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 uppercase tracking-wider text-sm"
            >
              Play Again
            </button>
          </article>
        )}

      </main>

      {/* Footer Info / Traceability Details */}
      <footer className="mt-8 text-center text-[10px] text-slate-500 uppercase tracking-widest leading-relaxed">
        <div>SysML Part: GameBoard [sysml:part:GameBoard]</div>
        <div>SysML Comps: Scoreboard [sysml:part:Scoreboard] • CountdownTimer [sysml:part:CountdownTimer] • ChoiceSelector [sysml:part:ChoiceSelector]</div>
      </footer>
    </div>
  );
}
