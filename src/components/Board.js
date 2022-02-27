import React from 'react'
import Tile from './Tile'

const Board = ({ tiles, tileColors }) => {
  return (
    <div id='board'>
      {tiles.map((row, i) =>
        row.map((tile, j) =>
          <Tile 
            key={`${i}.${j}`}
            letter={tile}
            className={`tile ${tileColors[i][j]}`}
          />
        )
      )}
    </div>
  )
}

export default Board