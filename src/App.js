import React, { useEffect, useState } from 'react'
import GuessList from './components/GuessList'
import Message from './components/Message'
import wordService from './sevices/word'

const App = () => {
  const [word, setWord] = useState('hansu')
  const [guess, setGuess] = useState('')
  const [guessedWords, setGuessedWords] = useState([])
  const [letters, setLetters] = useState([])
  const [numberOfGuesses, setNumberOfGuesses] = useState(0)
  const [message, setMessage] = useState(null)

  const handleGuessChange = (e) => {
    setGuess(e.target.value)
  }
  
  const resetGame = () => {
    setGuessedWords([])
    setLetters([])
  }

  const isValid = () => {
    let acceptedLetters = /^[A-Za-z]+$/

    if (acceptedLetters.test(guess)) {
      return true
    }
    else {
      setMessage('Only letters accepted.')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      return false
    }
  }

  const checkGuess = (e) => {
    e.preventDefault()
    let rightLetters = []
    if (isValid()) {
      if (guess === word) {
        setMessage(`Congratulations! The word was ${word}.`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        resetGame()
      } else if (guessedWords.includes(guess)) {
        setMessage('You already guessed that word')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      } else {
        [...guess].forEach(letter => {
          if (word.includes(letter)) {
            rightLetters = rightLetters.concat(letter)
          }
        })
        let filteredLetters = rightLetters.filter(letter => !letters.includes(letter))
        setLetters(letters.concat(filteredLetters))
        setGuessedWords(guessedWords.concat(guess))
        setNumberOfGuesses(numberOfGuesses + 1)
      }
    }
    setGuess('')

    if (numberOfGuesses + 1 >= 6) {
      setMessage('You lost sorry')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      resetGame()
    }
  }

  useEffect(() => {
    wordService
      .getRandomWord()
        .then(randomWord => {
          console.log('word', randomWord);
          setWord(randomWord)
        })
  }, [])

  return (
    <div>
      <h1>Wordling</h1>
      <Message message={message}/>
      <GuessList guessedWords={guessedWords}/>
      <p>{letters}</p>
      <form onSubmit={checkGuess}>
        <input
          maxLength={5}
          minLength={5}
          value={guess}
          onChange={handleGuessChange}
        />
        <button type='submit'>Guess word</button>
      </form>
    </div>
  )
}

export default App
