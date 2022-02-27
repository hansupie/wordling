import React from 'react'

const Key = ({ letter, handleClick }) => {
  return (
    <button 
      className='key'
      onClick={handleClick}
      value={letter.toLowerCase()}
    >
      {letter}
    </button>
  );
};

export default Key