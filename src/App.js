import './App.css';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { db } from './config/firebase';
import { addDoc, collection } from 'firebase/firestore';
import SingleCard from './components/SingleCard';

const cardImages = [
  { "src": "/img/9.png", clicked: false },
  { "src": "/img/8.png", clicked: false },
  { "src": "/img/0.png", clicked: false },
  { "src": "/img/7.png", clicked: false },
  { "src": "/img/Blank.png", clicked: false },
  { "src": "/img/Blank2.png", clicked: false },
  { "src": "/img/1.png", clicked: false },
  { "src": "/img/3.png", clicked: false },
  { "src": "/img/4.png", clicked: false },
  { "src": "/img/Blank3.png", clicked: false },
  { "src": "/img/Blank4.png", clicked: false },
  { "src": "/img/2.png", clicked: false },
  { "src": "/img/Blank5.png", clicked: false },
  { "src": "/img/Blank6.png", clicked: false }, 
  { "src": "/img/5.png", clicked: false },
  { "src": "/img/6.png", clicked: false },
];

const adImages = [
  "/ads/ad6.png",
  "/ads/ad5.png",
  "/ads/ad3.png",
  "/ads/ad4.png",
  "/ads/sephora.png",
  "/ads/travel.png"
];

function App() {
  const [cards, setCards] = useState([...cardImages]); // Use a fixed card board
  const [turns, setTurns] = useState(0);
  const [score, setScore] = useState(0);
  const [gameStart, setGameStart] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const accuracy = turns > 0 ? ((score / turns) * 100).toFixed(1) : 0;

  const [grade, setGrade] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [period, setPeriod] = useState('');
  const [userDataSubmitted, setUserDataSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [showAds] = useState(Math.random() > 0.5);  // 50% chance to show ads
  const [adPosition, setAdPosition] = useState('top');

  // Removed shuffleCards logic; use the same set board for every game
  const startGame = () => {
    if (Cookies.get('played')) {
      alert("You've already played the game!");
      return;
    }

    setTurns(0);
    setScore(0);
    setGameOver(false);
    setGameStart(true);
    setStartTime(Date.now());
    setEndTime(null);
  
    setTimeout(() => {
      setGameStart(false);
    }, 12000);
  
    Cookies.set('played', 'true', { expires: 1 });
  };

  const handleChoice = (card) => {
    if (gameOver || card.clicked) return;

    const filename = card.src.split('/').pop(); // Get the image filename
    const expectedNumber = turns % 10; // Get expected number for the turn

    setTurns((prevTurns) => prevTurns + 1);
    setCards((prevCards) =>
      prevCards.map((c) =>
        c.src === card.src ? { ...c, clicked: true } : c
      )
    );

    if (filename === `${expectedNumber}.png`) {
      setScore((prevScore) => prevScore + 1);
    }

    // If 10 turns are reached, game is over
    if (turns === 9) {
      setEndTime(Date.now());
      setGameOver(true);
      saveGameData(score, startTime, Date.now());
    }
  };

  const saveGameData = async (score, start, end) => {
    const timeTaken = ((end - start) / 1000).toFixed(2);
    try {
      await addDoc(collection(db, 'users'), {
        grade,
        courseCode,
        period,
        score,
        timeTaken,
        ads: showAds ? 'Yes' : 'No'
      });
      alert('Data saved successfully!');
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Failed to save data. Please try again later.');
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!grade || !courseCode || !period) {
      setErrorMessage('All fields are required.');
      return;
    }

    setUserDataSubmitted(true);
  };

  useEffect(() => {
    if (!showAds) return;

    const adInterval = setInterval(() => {
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % adImages.length);
      setAdPosition(Math.random() > 0.5 ? 'top' : 'bottom');
    }, 5000);

    return () => clearInterval(adInterval);
  }, [showAds]);

  useEffect(() => {
    const disableScroll = (e) => e.preventDefault();
    
    if (gameStart) {
      window.addEventListener('wheel', disableScroll, { passive: false });
      window.addEventListener('touchmove', disableScroll, { passive: false });
    } else {
      window.removeEventListener('wheel', disableScroll);
      window.removeEventListener('touchmove', disableScroll);
    }
  
    return () => {
      window.removeEventListener('wheel', disableScroll);
      window.removeEventListener('touchmove', disableScroll);
    };
  }, [gameStart]);

  return (
    <div className="App">
      <h1>Number Game</h1>

      {!userDataSubmitted ? (
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          />
          <input
            type="text"
            placeholder="Course Code"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
          />
          <input
            type="text"
            placeholder="Period of Day"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          />
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <button type="submit">Submit</button>
        </form>
      ) : (
        <>
          <p>Turns: {turns}</p>

          <div className={`ad-banner ${adPosition}`} style={{ position: 'absolute', [adPosition]: '10px', width: '100%', textAlign: 'center' }}>
            {showAds && (
              <img src={adImages[currentAdIndex]} alt="Ad" style={{ width: '250px', height: 'auto' }} />
            )}
          </div>

          {!gameStart && !gameOver && turns === 0 && (
            <button onClick={startGame}>Start Game</button>
          )}
        </>
      )}

      {gameOver && <p>Game Over! Your final score: {score}, Accuracy: {accuracy}%</p>}

      <div className="card-grid">
        {cards.map((card) => (
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
