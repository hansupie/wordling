import React from 'react'
import Board from './Board'
import Button from './Button'

const Game = ({ tiles, gameOver, handleNewGameClick }) => {
  return (
    <div id='game'>
      <Board tiles={tiles}/>
      <Button 
        gameOver={gameOver}
        handleClick={handleNewGameClick}  
      />
    </div>
  )
}

export default Game