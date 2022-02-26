import React from 'react'

const Button = ({ gameOver, handleClick }) => {
  if (gameOver === false) {
    return null
  }
  return (
    <button className='btn' onClick={handleClick}>
      New game
    </button>
  )
}

export default Button