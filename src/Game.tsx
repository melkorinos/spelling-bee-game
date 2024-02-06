// src/Game.tsx

import './Game.css' // Import the CSS file for styling

import React, { useEffect, useState } from 'react'

import GameLogicService from './GameLogicService'
import { Game as GameModel } from './models/game.model'

const Game: React.FC = () => {
  const [game, setGame] = useState<GameModel>({
    letters: [],
    specialLetter: '',
    currentWord: '',
    score: 0,
  })

  useEffect(() => {
    initializeGame()
  }, [])

  const initializeGame = () => {
    // Initialize the game state, generate letters, set special letter, etc.
    const letters = GameLogicService.generateRandomLetters(10)
    const specialLetter = letters[0]

    setGame({
      letters,
      specialLetter,
      currentWord: '',
      score: 0,
    })
  }

  const handleLetterClick = (letter: string) => {
    // Handle letter clicks to update the current word
    setGame((prevGame) => ({
      ...prevGame,
      currentWord: prevGame.currentWord + letter,
    }))
  }

  const handleWordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGame((prevGame) => ({
      ...prevGame,
      currentWord: event.target.value.toUpperCase(),
    }))
  }

  const handleWordSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    submitWord()
  }

  const handleEnterKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      submitWord()
    }
  }

  const submitWord = () => {
    const { currentWord, specialLetter } = game

    if (GameLogicService.isWordValid(currentWord, specialLetter)) {
      const points = GameLogicService.calculatePoints(currentWord)
      setGame((prevGame) => ({
        ...prevGame,
        currentWord: '',
        score: prevGame.score + points,
      }))
    } else {
      // Handle invalid word submission (e.g., show a message to the user)
      console.log('Invalid word!')
    }
  }

  return (
    <div>
      <h1>Spelling Bee Game</h1>
      <div>
        <p>Letters:</p>
        <div className="letters">
          {game.letters.map((letter, index) => (
            <button
              key={index}
              onClick={() => handleLetterClick(letter)}
              disabled={index === 0}
              className={index === 0 ? 'special-letter' : 'normal-letter'}
            >
              {letter}
            </button>
          ))}
        </div>
        <p>Special Letter: {game.specialLetter}</p>
        <p>Current Word: {game.currentWord}</p>
        <p>Score: {game.score}</p>
      </div>
      <form onSubmit={handleWordSubmit}>
        <label>
          Enter Word:
          <input
            type="text"
            value={game.currentWord}
            onChange={handleWordChange}
            onKeyDown={handleEnterKey}
          />
        </label>
        <button type="submit">Submit Word</button>
      </form>
      <button onClick={initializeGame}>Start New Game</button>
    </div>
  )
}

export default Game
