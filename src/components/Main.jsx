import {useState, useEffect, useRef} from 'react'
import Die from "./Die"
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

export default function Main() {
  
const [numbersArray, setNumbersArray] = useState(() => generateDice())

const winner = numbersArray.every(numb => numb.isHeld) && numbersArray.every(numb => numb.value === numbersArray[0].value)

const buttonFocus = useRef(null)
 
useEffect(() =>{
  if(winner){
    buttonFocus.current.focus()
  }
}, [winner])

  function generateDice(){
    let diceNumber = []
    for(let i=0; i < 10 ; i++){
      let randomNumber = Math.ceil(Math.random()*6)
      let objectDice = {value: randomNumber, isHeld: false, id: nanoid()}
      diceNumber.push(objectDice)
    }
      return diceNumber
  }

  
  function roll(){
   if(!winner){
    setNumbersArray(prevNumber => prevNumber.map(num =>{
      if(num.isHeld){
        return num
      }
      else{
        return {...num, value: Math.ceil(Math.random()*6)}
      }
    }))
   }else{
    setNumbersArray(generateDice())
   }
  
  }

  function hold(id){
    setNumbersArray(prevNumber => prevNumber.map(num =>{
      if(num.id === id){
        return {...num, isHeld:!num.isHeld}
      }
      else{
        return num
      }
    }))
  }

  const die = numbersArray.map(number => <Die value={number.value} key={number.id} 
    isHeld={number.isHeld} hold={hold} id={number.id} />)
  
  return(
    <main>

      <section className='info-game'>
        <h1>Tenzies</h1>
        <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      </section>
      <div className="dice-container">
      {die}
      </div>
      <button className='roll-btn' onClick={roll} ref={buttonFocus}>{winner ? 'New Game' : 'Roll Dice'}</button>
      {winner ? <Confetti width={window.innerWidth}/> : null}
    </main>
  )
}