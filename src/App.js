// import logo from './logo.svg';
import './App.css';
import { useState } from 'react'
import SingleCard from './components/SingleCard'

const cardImages = [{"src": "/img/0.png", clicked: false}, 
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
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [score, setScore] = useState(0); // Initialize score to 0
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [choiceThree, setChoiceThree] = useState(null)
  const [choiceFour, setChoiceFour] = useState(null)  
  const [choiceFive, setChoiceFive] = useState(null)
  const [choiceSix, setChoiceSix] = useState(null)
  const [choiceSeven, setChoiceSeven] = useState(null)
  const [choiceEight, setChoiceEight] = useState(null)
  const [choiceNine, setChoiceNine] = useState(null)
  const [choiceTen, setChoiceTen] = useState(null)

  // Shuffle the cards and restart the game
  const shuffleCards = () => {
    const shuffledCards = [...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random()}))

    setCards(shuffledCards)
    setTurns(0)
    setScore(0)
    setChoices(Array(10).fill(null))
  }

  // Store the selected card in the choices array
  const [choices, setChoices] = useState(Array(10).fill(null)); // Initialize choices array with null
  const expectedImages = ["0.png", "1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png", "9.png"]; // List of expected images

  // Handle Card Selection
  const handleChoice = (card) => {
    const filename = card.src.split('/').pop(); // Extract "0.png" from "/img/0.png"
    const nextChoiceIndex = choices.findIndex(choice => choice === null);

    if (nextChoiceIndex !== -1) {
      const expectedImage = expectedImages[nextChoiceIndex];
      const updatedChoices = [...choices];
      updatedChoices[nextChoiceIndex] = filename;
      setChoices(updatedChoices);
      setCards(prevCards => 
        prevCards.map(c => 
          c.src === card.src ? { ...c, clicked: true } : c
        )
      );
      if (filename === expectedImage) {
        setScore(prevScore => prevScore + 1);
      }
    }
    setTurns(prevTurns => prevTurns + 1);
  };

  console.log(cards)

  // const gameOver = () => {
  //   if (choices.includes(null)) {
  //     return false;
  //   }
  //   return true;
  // }

  return (
    <div className="App">
      <h1>Number Game</h1>
      <button onClick={shuffleCards}>Start Game</button>
      <p>Score: {score} Turns: {turns}</p>
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
            key={card.id} 
            card={card} 
            handleChoice={handleChoice}
          />
        ))}
      </div>
      
    </div>
  );
}

export default App;
