/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';


const cardImages = [
  {"src": "/images/helmet-1.png", matched : false},
  {"src": "/images/potion-1.png", matched : false},
  {"src": "/images/ring-1.png", matched : false},
  {"src": "/images/scroll-1.png", matched : false},
  {"src": "/images/shield-1.png", matched : false},
  {"src": "/images/sword-1.png", matched : false}
]

function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  
  const shaffleCards = () => {
    const shaffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random()}))
    
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shaffledCards)
    setTurns(0)
  }

  // handle a choice
  const handleChoice = (card)=> {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card) 
  }

  // Compare 2 selected cards
  useEffect(()=>{
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src){
              return {...card, matched: true}
            }
            else{
              return card
            }
          })
        })
        resetTurn()
      }
      else{
        setTimeout(() => resetTurn() , 3000)
      }
    }
  } , [choiceOne , choiceTwo])

  // reset choices and increase turn
  const resetTurn = ()=> {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  useEffect(() => {
    shaffleCards()
  } , [])

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shaffleCards}>New Game</button>
      <div className='card-grid'>
        {cards.map(card => (
          <SingleCard  
            key={card.id} 
            card={card} 
            handleChoice={handleChoice} 
            flipped = {card === choiceOne || card === choiceTwo || card.matched}
            disabled = {disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
