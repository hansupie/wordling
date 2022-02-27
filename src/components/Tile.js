import React from 'react'

const Tile = ({ letter, className }) => {
  return (
    <div className={className}>
      {letter}
    </div>
  )
}

export default Tile