// import logo from './logo.svg';
import './App.css';
import { useState } from 'react'
import SingleCard from './components/SingleCard'

const cardImages = [{"src": "/img/0.png"}, 
  { "src": "/img/1.png" }, 
  { "src": "/img/2.png" }, 
  { "src": "/img/3.png" }, 
  { "src": "/img/4.png" }, 
  { "src": "/img/5.png" }, 
  { "src": "/img/6.png" }, 
  { "src": "/img/7.png" }, 
  { "src": "/img/8.png" }, 
  { "src": "/img/9.png" }, 
  { "src": "/img/Blank.png" },
  { "src": "/img/Blank.png" },
  { "src": "/img/Blank.png" },
  { "src": "/img/Blank.png" },
  { "src": "/img/Blank.png" },
  { "src": "/img/Blank.png" },
  { "src": "/img/Blank.png" },
  { "src": "/img/Blank.png" },
  { "src": "/img/Blank.png" },
  { "src": "/img/Blank.png" },
  { "src": "/img/Blank.png" },
  { "src": "/img/Blank.png" },
  { "src": "/img/Blank.png" },
  { "src": "/img/Blank.png" },
  { "src": "/img/Blank.png" }
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

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random() }))

    setCards(shuffledCards)
    setTurns(0)
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

      if (filename === expectedImage) {
        setScore(prevScore => prevScore + 1);
        console.log(`Correct! ${filename}. Score: ${score + 1}`);
      } else {
        console.log(`Incorrect. Expected: ${expectedImage}, Got: ${filename}. Score: ${score}`);
      }
    }
  };

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
