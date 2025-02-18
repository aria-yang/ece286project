// import logo from './logo.svg';
import './App.css';
import { useState } from 'react'

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

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random() }))

    setCards(shuffledCards)
    setTurns(0)
  }

  console.log(cards, turns)

  return (
    <div className="App">
      <h1>Number Game</h1>
      <button onClick={shuffleCards}>Start Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <div className="card" key={card.id}>
            <div>
              <img className="front" src={card.src} alt="card front" />
              <img className="back" src="/img/cover.png" alt="" alt="card back" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
