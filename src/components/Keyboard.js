import React from 'react'
import Key from './Key';

const Keyboard = ({ handleKeyClick, handleSubmit }) => {
  const keyboard = {
    row1: 'QWERTYUIOP',
    row2: 'ASDFGHJKL',
    row3: 'ZXCVBNM'
  }

  return (
    <div className='keyboard'>
      <div className='row'>
        {[...keyboard.row1].map(letter => 
          <Key
            value={letter}
            key={letter}
            letter={letter}
            handleClick={handleKeyClick}
          />
        )}
      </div>
      <div className='row'>
        {[...keyboard.row2].map(letter => 
          <Key
            value={letter}
            key={letter}
            letter={letter}
            handleClick={handleKeyClick}
          />
        )}
      </div>
      <div className='row'>
        {[...keyboard.row3].map(letter => 
          <Key
            value={letter}
            key={letter}
            letter={letter}
            handleClick={handleKeyClick}
          />
        )}
      </div>
      <button onClick={handleSubmit}>Enter</button>
    </div>
  );
};

export default Keyboard