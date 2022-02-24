import React from 'react';

const GuessList = ({ guessedWords }) => {
  console.log('length', guessedWords.length);
  if (guessedWords.length === 0) {
    return null
  }

  return (
    <ul>
      {guessedWords.map(guess => 
        <li key={guess}>{guess}</li>
      )}
    </ul>
  );
};

export default GuessList;