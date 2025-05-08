
export default function Die({value, isHeld, id, hold}){
  return(
    <button className="die"style={{backgroundColor: isHeld ? '#59E391' : '#FFFFFF'}} 
    onClick={() => {hold(id)}} aria-pressed={isHeld} 
    aria-label={`Die with value ${value} ${isHeld ? 'held' : 'not held'}`}>
      {value}
      </button>
  )
}