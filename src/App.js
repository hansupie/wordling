import React, { useEffect, useState } from 'react'
import Message from './components/Message'
import wordService from './sevices/word'
import Game from './components/Game'
import Nav from './components/Nav'
import './App.css'
import Keyboard from './components/Keyboard'

const App = () => {
  const [word, setWord] = useState('hello')
  const [guess, setGuess] = useState('')
  const [message, setMessage] = useState(null)
  const [tiles, setTiles] = useState(new Array(6).fill(new Array(5).fill('')))
  const [row, setRow] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [tileColors, setTileColors] = useState(new Array(6).fill(new Array(5).fill('')))
  const [clicks, setClicks] = useState(0)
  const [keyGuess, setKeyGuess] = useState('')

  console.log('keyguess', keyGuess);
  console.log('word', word);

  const handleGuessChange = (e) => {
    let temp = e.target.value
    setGuess(temp.toLowerCase())
    let tempArr = Array.from(temp)
    let newArr = tempArr.concat(Array(5-tempArr.length).fill(''))
    let copy = [...tiles]
    copy[row] = newArr
    setTiles(copy)
  }
  
  const compareWords = () => {
    let colors = [...tileColors];
    let newRow = [];

    [...guess].forEach((letter, i) => {
      if (letter === word[i]) {
        newRow = newRow.concat('green')
      }
      else if (word.includes(letter) && letter !== word[i]) {
        newRow = newRow.concat('orange')
      }
      else {
        newRow = newRow.concat('gray')
      }
    })
    colors[row] = newRow

    setTileColors(colors)
  }

  const resetGame = () => {
    setRow(0)
    setTileColors(new Array(6).fill(new Array(5).fill('')))
    setTiles(new Array(6).fill(new Array(5).fill('')))
  }

  const isValid = async() => {
    let acceptedLetters = /^[A-Za-z]+$/
    let result

    if (acceptedLetters.test(guess)) {
      result = true
    }
    else {
      setMessage('Only letters accepted.')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      result = false
    }

    await wordService
      .checkWord(guess)
      .then(() => {
        result = true
      })
      .catch(error => {
        result = false
        console.log(error)
        setMessage(`${guess} is not a word.`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
    return result
  }

  const checkGuess = async (e) => {
    //e.preventDefault()
    let rightLetters = []
    const valid = await isValid()

    if (valid) {
      compareWords()
      if (guess === word) {
        setMessage(`Congratulations! The word was ${word}.`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setGameOver(true)
      } else {
        [...guess].forEach(letter => {
          if (word.includes(letter)) {
            rightLetters = rightLetters.concat(letter)
          }
        })

        setRow(row + 1)

        if (row + 1 >= 6) {
          setMessage(`You lost! The word was ${word}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setGameOver(true)
        }
      }
      setGuess('')
    }
  }

  const handleNewGameClick = (e) => {
    wordService
      .getRandomWord()
      .then(randomWord => {
        setWord(randomWord)
      })
      .catch(error => {
        console.log(error)
        setWord('error')
      })

    setGameOver(false)
    resetGame()
  }

  const handleKeyClick = (e) => {
    console.log('key clicked: ', e.target.value);
    const letter = e.target.value
    setClicks(clicks + 1)

    let newGuess = guess
    if (clicks < 5) {
      newGuess += letter
    }
    setGuess(newGuess)

    let tempArr = Array.from(newGuess)
    let newArr = tempArr.concat(Array(5-tempArr.length).fill(''))
    let copy = [...tiles]
    copy[row] = newArr
    setTiles(copy)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    checkGuess()
    setClicks(0)
  }

  useEffect(() => {
    wordService
      .getRandomWord()
      .then(randomWord => {
        console.log('word', randomWord);
        setWord(randomWord)
      })
      .catch(error => {
        console.log(error);
        setWord('error')
      })
  }, [])

  return (
    <div className='app'>
      <Nav />
      <Game 
        tiles={tiles}
        gameOver={gameOver}
        handleNewGameClick={handleNewGameClick}
        word={word}
        row={row}
        tileColors={tileColors}
      />
      <Message message={message}/>
      <Keyboard 
        handleKeyClick={handleKeyClick}
        handleSubmit={handleSubmit}
      />
      <form onSubmit={checkGuess} className='form'>
        <input
          maxLength={5}
          minLength={5}
          value={guess}
          onChange={handleGuessChange}
          disabled={gameOver}
          autoFocus
        />
        <button type='submit'>Guess word</button>
      </form>
    </div>
  )
}

export default App
