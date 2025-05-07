import {useState} from 'react'
import Die from "./Die"
import { nanoid } from 'nanoid'

export default function Main() {
  
const [numbersArray, setNumbersArray] = useState(generateDice())

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
    setNumbersArray(generateDice())
  }

const die = numbersArray.map(number => <Die value={number.value} key={number.id}/>)


  return(
    <main>
     
      <div className="dice-container">
      {die}
      </div>
      <button className='roll-btn' onClick={roll}>Roll Dice</button>
    </main>
  )
}