
import { useState } from 'react';
import './App.css'



function Square({ value, handle }) {
  return (
    <button onClick={handle} className="b">{value}</button>
  )
}

function App() {
  let [isXNext, setIsXNext] = useState(true)
  let [val, setVal] = useState(Array(9).fill(null))
  const isBoardFull = val.every((square) => square !== null);

  const hand = (i) => {

    if (val[i] || CalculateWinner(val) ) {
      return
    }
    let s
    let temp = val.slice()
    if (isXNext) {
      s = 'X'
    }
    else {
      s = 'O'
    }
    temp[i] = s
    setIsXNext(!isXNext)
    setVal(temp)
  }
  function resultcheck() {
    if (CalculateWinner(val)) {
      let result = CalculateWinner(val) + ' Winner'
      return result
    }
    else if(isBoardFull){
      return 'DRAW'
    }
    else {
      let result = (isXNext ? 'X' : 'O') + "'s Turn"
      return result
    }

  }


  return (
    <div className='card'>
      <div className='board'>
        <h1>{
          resultcheck()
        }</h1>




        <div>
          <Square value={val[0]} handle={() => hand(0)} />
          <Square value={val[1]} handle={() => hand(1)} />
          <Square value={val[2]} handle={() => hand(2)} />
        </div>
        <div>
          <Square value={val[3]} handle={() => hand(3)} />
          <Square value={val[4]} handle={() => hand(4)} />
          <Square value={val[5]} handle={() => hand(5)} />
        </div>
        <div>
          <Square value={val[6]} handle={() => hand(6)} />
          <Square value={val[7]} handle={() => hand(7)} />
          <Square value={val[8]} handle={() => hand(8)} />
        </div>

        <button className='replay' onClick={
          () => {
            setVal(Array(9).fill(null))
            setIsXNext(true)
          }
        }>REPLAY</button>
      </div>
    </div>
  )
}



function CalculateWinner(val) {
  const sq = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
  for (let i = 0; i < sq.length; i++) {
    let [a, b, c] = sq[i]
    if (val[a] && (val[a] === val[b]) && (val[a] === val[c])) {
      return val[a]
    }
  }
  return null
}

export default App;