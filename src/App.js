import React, { useState } from 'react'
import GuessList from './components/GuessList'

const App = () => {
  const [word, setWord] = useState('hansu')
  const [guess, setGuess] = useState('')
  const [guessedWords, setGuessedWords] = useState([])
  console.log('guessedwords', guessedWords);

  const handleGuessChange = (e) => {
    setGuess(e.target.value)
  }
  
  const checkGuess = (e) => {
    e.preventDefault()
    if (guess === word) {
      alert('cograts')
    } else {
      setGuessedWords(guessedWords.concat(guess))
    }
    setGuess('')
  }

  return (
    <div>
      <h1>Wordling</h1>
      <GuessList guessedWords={guessedWords}/>
      <form onSubmit={checkGuess}>
        <input
          value={guess}
          onChange={handleGuessChange}
        />
        <button type='submit'>Guess word</button>
      </form>
    </div>
  )
}

export default App
