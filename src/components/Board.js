import React from 'react'
import Tile from './Tile'

const Board = ({ tiles }) => {
  return (
    <div id='board'>
      {tiles.map((row, i) =>
        row.map((tile, j) =>
          <Tile 
            key={`${i}.${j}`}
            letter={tile}
          />
        )
      )}
    </div>
  )
}

export default Board