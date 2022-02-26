import React, { useEffect, useState } from 'react'
import GuessList from './components/GuessList'
import Message from './components/Message'
import wordService from './sevices/word'
import Game from './components/Game'
import Nav from './components/Nav'
import './App.css'

const App = () => {
  const [word, setWord] = useState('hansu')
  const [guess, setGuess] = useState('')
  const [guessedWords, setGuessedWords] = useState([])
  const [letters, setLetters] = useState([])
  const [message, setMessage] = useState(null)
  const [tiles, setTiles] = useState(new Array(6).fill(new Array(5).fill('')))
  const [row, setRow] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  const handleGuessChange = (e) => {
    let temp = e.target.value
    setGuess(e.target.value)
    let tempArr = Array.from(temp)
    let newArr = tempArr.concat(Array(5-tempArr.length).fill(''))
    let copy = [...tiles]
    copy[row] = newArr

    setTiles(copy)
  }
  
  const resetGame = () => {
    setGuessedWords([])
    setLetters([])
    setRow(0)
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
        setGameOver(true)
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
        console.log('letters', letters);
        setLetters(letters.concat(filteredLetters))
        setGuessedWords(guessedWords.concat(guess))

        setRow(row + 1)

        if (row + 1 >= 6) {
          setMessage('You lost sorry')
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          resetGame()
          setGameOver(true)
        }
      }
      setGuess('')
    }
  }

  const handleNewGameClick = (e) => {
    //hae uusi sana
    setWord('mimmu')

    setGameOver(false)
    setTiles(new Array(6).fill(new Array(5).fill('')))
  }

  // useEffect(() => {
  //   wordService
  //     .getRandomWord()
  //       .then(randomWord => {
  //         console.log('word', randomWord);
  //         setWord(randomWord)
  //       })
  // }, [])

  return (
    <div className='app'>
      <Nav />
      <Game 
        tiles={tiles}
        gameOver={gameOver}
        handleNewGameClick={handleNewGameClick}
      />
      <Message message={message}/>
      <GuessList guessedWords={guessedWords}/>
      <p>{letters}</p>
      <form onSubmit={checkGuess}>
        <input
          maxLength={5}
          minLength={5}
          value={guess}
          onChange={handleGuessChange}
          disabled={gameOver}
        />
        <button type='submit'>Guess word</button>
      </form>
    </div>
  )
}

export default App
