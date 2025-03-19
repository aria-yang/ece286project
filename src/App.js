import './App.css';
import { useState, useEffect } from 'react';
import SingleCard from './components/SingleCard';
import Cookies from 'js-cookie';
import UserForm from './userform.js';
import firebaseApp from './config/firebase'; // Import firebase

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

  const [image, setImage] = useState(null); 
  const [gamePlayed, setGamePlayed] = useState(Cookies.get('played'));
  const [userDataSubmitted, setUserDataSubmitted] = useState(false); // Add this state

  // Insert one image (either left or right) 5 seconds after the start time
  const insertImageAtFiveSeconds = () => {
    const timeout = 5000;
    setTimeout(() => {
      const side = Math.random() < 0.5 ? 'left' : 'right';
      setImage({ side });

      setTimeout(() => {
        setImage(null);
      }, 3000);
    }, timeout);
  };

  useEffect(() => {
    if (gameStart) {
      insertImageAtFiveSeconds();
    }
  }, [gameStart]);

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
    setGameStart(true); 
    setStartTime(null);
    setEndTime(null);

    setTimeout(() => {
      setGameStart(false); 
      setStartTime(Date.now());
    }, 7000);

    Cookies.set('played', 'true', { expires: 1 });
  };

  const handleChoice = (card) => {
    if (gameOver || card.clicked) return;
    const filename = card.src.split('/').pop();
    setTurns(prevTurns => prevTurns + 1);
    setCards(prevCards =>
      prevCards.map(c =>
        c.src === card.src ? { ...c, clicked: true } : c
      )
    );
    if (filename === `${turns}.png`) {
      setScore(prevScore => prevScore + 1);
    }
    if (turns === 9) {
      setGameOver(true);
      setEndTime(Date.now());
    }
  };

  const timeTaken = startTime && endTime ? ((endTime - startTime) / 1000).toFixed(2) : null;

  return (
    <div className="App">
      <h1>Number Game</h1>
      {!userDataSubmitted && <UserForm setUserDataSubmitted={setUserDataSubmitted} />}

      <button onClick={shuffleCards}>Start Game</button>
      <p>Turns: {turns}</p>

      {image && (
        <img
          src={image.side === 'left' ? '/ads/sephora.png' : '/ads/travel.png'}
          alt="Random"
          className={`random-image ${image.side}`}
          style={{
            position: 'fixed',
            top: '50%',
            transform: 'translateY(-50%)',
            [image.side]: '0',
            zIndex: 100,
            width: '100px',
            height: '100px',
            display: 'block',
            transition: 'opacity 3s ease-out',
            opacity: 1,
          }}
        />
      )}

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
