import './App.css';
import { useState, useEffect } from 'react';
import SingleCard from './components/SingleCard';
import Cookies from 'js-cookie';

const cardImages = [
  { "src": "/img/0.png", clicked: false },
  { "src": "/img/1.png", clicked: false },
  { "src": "/img/2.png", clicked: false },
  { "src": "/img/3.png", clicked: false },
  { "src": "/img/4.png", clicked: false },
  { "src": "/img/5.png", clicked: false },
  { "src": "/img/6.png", clicked: false },
  { "src": "/img/7.png", clicked: false },
  { "src": "/img/8.png", clicked: false },
  { "src": "/img/9.png", clicked: false },
  { "src": "/img/Blank.png", clicked: false },
  { "src": "/img/Blank2.png", clicked: false },
  { "src": "/img/Blank3.png", clicked: false },
  { "src": "/img/Blank4.png", clicked: false },
  { "src": "/img/Blank5.png", clicked: false },
  { "src": "/img/Blank6.png", clicked: false },
  { "src": "/img/Blank7.png", clicked: false },
  { "src": "/img/Blank8.png", clicked: false },
  { "src": "/img/Blank9.png", clicked: false },
  { "src": "/img/Blank10.png", clicked: false },
  { "src": "/img/Blank11.png", clicked: false },
  { "src": "/img/Blank12.png", clicked: false },
  { "src": "/img/Blank13.png", clicked: false },
  { "src": "/img/Blank14.png", clicked: false },
  { "src": "/img/Blank15.png", clicked: false }
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [score, setScore] = useState(0);
  const [gameStart, setGameStart] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const accuracy = turns > 0 ? ((score / turns) * 100).toFixed(1) : 0;

  const [image, setImage] = useState(null); // Store the image (left or right)
  const [gamePlayed, setGamePlayed] = useState(Cookies.get('played'));

  // Insert one image (either left or right) 5 seconds after the start time
  const insertImageAtFiveSeconds = () => {
    const timeout = 5000; // 5000ms = 5 seconds

    setTimeout(() => {
      // Randomly decide whether to place the image on the left or right side
      const side = Math.random() < 0.5 ? 'left' : 'right';
      setImage({ side });

      // Remove the image after 3 seconds
      setTimeout(() => {
        setImage(null); // Remove the image after it has been visible for 3 seconds
      }, 3000);
    }, timeout);
  };

  useEffect(() => {

    // Call the insertImageAtFiveSeconds function after the game starts
    if (gameStart) {
      insertImageAtFiveSeconds();
    }

    return () => {
      // Any cleanup code here
    };
  }, [gameStart]); // Run the effect when the game starts

  // Shuffle the cards and restart the game
  const shuffleCards = () => {
    if (Cookies.get('played')) {
      alert("You've already played the game!");
      return;
    }

    const shuffledCards = [...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(0);
    setScore(0);
    setGameOver(false);
    setGameStart(true); // Start game with initial reveal
    setStartTime(null);
    setEndTime(null);

    setTimeout(() => {
      setGameStart(false); // Hide cards after 7 seconds
      setStartTime(Date.now());
    }, 7000);

    // Set a cookie to expire in 24 hours
    Cookies.set('played', 'true', { expires: 1 });
  };

  // Handle Card Selection
  const handleChoice = (card) => {
    if (gameOver || card.clicked) return;
    const filename = card.src.split('/').pop(); // Extract "0.png" from "/img/0.png"
    setTurns(prevTurns => prevTurns + 1);
    setCards(prevCards =>
      prevCards.map(c =>
        c.src === card.src ? { ...c, clicked: true } : c
      )
    );
    setScore(prevScore => prevScore + 1);
    if (turns === 9) {
      setGameOver(true);
      setEndTime(Date.now());
    }
  };

  const timeTaken = startTime && endTime ? ((endTime - startTime) / 1000).toFixed(2) : null;

  return (
    <div className="App">
      <h1>Number Game</h1>
      <button onClick={shuffleCards}>Start Game</button>
      <p>Turns: {turns}</p>

      {/* Single image (left or right) */}
      {image && (
        <img
          src={image.side === 'left' ? '/ads/sephora.png' : '/ads/travel.png'}
          alt="Random"
          className={`random-image ${image.side}`}
          style={{
            position: 'fixed', // Use fixed positioning to place the images relative to the viewport
            top: '50%',
            transform: 'translateY(-50%)',
            [image.side]: '0', // Left or right side of the screen
            zIndex: 100, // Ensure images are on top of the card grid
            width: '100px', // Customize image size as needed
            display: 'block',
            transition: 'opacity 3s ease-out',
            opacity: 1, // Fully visible when they appear
          }}
        />
      )}

      {/* If game over */}
      {gameOver && <p>Game Over! Your final score: {score}, Accuracy: {accuracy}%, Time: {timeTaken} sec</p>}

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
            key={card.id} 
            card={card} 
            handleChoice={handleChoice}
            flipped={gameStart || gameOver}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
