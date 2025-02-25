import { useState, useRef } from 'react';
import './App.css';

function App() {
  const [gameState, setGameState] = useState('waiting'); // 'waiting', 'ready', 'clicked', 'early'
  const [reactionTime, setReactionTime] = useState(null);
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);

  const startGame = () => {
    setGameState('waiting');
    setReactionTime(null);

    const delay = Math.floor(Math.random() * 3000) + 2000; // Random delay between 2-5s
    timerRef.current = setTimeout(() => {
      setGameState('ready');
      startTimeRef.current = Date.now();
    }, delay);
  };

  const handleClick = () => {
    if (gameState === 'waiting') {
      clearTimeout(timerRef.current);
      setGameState('early');
    } else if (gameState === 'ready') {
      const endTime = Date.now();
      setReactionTime(endTime - startTimeRef.current);
      setGameState('clicked');
    }
  };

  return (
    <div className="game-container">
      {gameState === 'waiting' && (
        <div className="waiting" onClick={handleClick} style={{ backgroundColor: 'red', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p>Wait for green...</p>
          <button onClick={startGame}>Start</button>
        </div>
      )}
      {gameState === 'ready' && (
        <div className="ready" onClick={handleClick} style={{ backgroundColor: 'green', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p>CLICK NOW!</p>
        </div>
      )}
      {gameState === 'clicked' && (
        <div className="result" style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p>Your reaction time: {reactionTime}ms</p>
          <button onClick={startGame}>Play Again</button>
        </div>
      )}
      {gameState === 'early' && (
        <div className="early" style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p>Too early! Try again.</p>
          <button onClick={startGame}>Retry</button>
        </div>
      )}
    </div>
  );
}

export default App;
