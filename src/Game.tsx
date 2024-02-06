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
    guessedWords: [],
  })

  useEffect(() => {
    initializeGame()
  }, [])

  const initializeGame = () => {
    // Initialize the game state, generate letters, set special letter, etc.
    const letters = GameLogicService.generateRandomLetters(7)
    const specialLetter = letters[0]

    setGame({
      letters,
      specialLetter,
      currentWord: '',
      score: 0,
      guessedWords: [],
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
        guessedWords: [...prevGame.guessedWords, currentWord],
      }))
    }
  }

  const handleShuffleClick = () => {
    setGame((prevGame) => {
      const shuffledLetters = [...prevGame.letters.slice(1)] // Exclude special letter
      // Shuffle the array
      for (let i = shuffledLetters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[shuffledLetters[i], shuffledLetters[j]] = [shuffledLetters[j], shuffledLetters[i]]
      }
      return {
        ...prevGame,
        letters: [prevGame.specialLetter, ...shuffledLetters],
      }
    })
  }

  return (
    <div className="game-container">
      <h1>Spelling Bee Game</h1>
      <div className="letters">
        {game.letters.map((letter, index) => (
          <div key={index} onClick={() => handleLetterClick(letter)} className={`letter-container ${index === 0 ? 'special-letter' : ''}`}>
            {letter}
          </div>
        ))}
      </div>
      <div className="word-container">
        <p>Current Word: {game.currentWord}</p>
      </div>
      <div className="score-container">
        <p>Score: {game.score}</p>
      </div>
      <div className="button-container">
        <form onSubmit={handleWordSubmit}>
          <label>
            Enter Word:
            <input type="text" value={game.currentWord} onChange={handleWordChange} onKeyDown={handleEnterKey} />
          </label>
          <button type="submit">Submit Word</button>
        </form>
        <button onClick={handleShuffleClick}>Shuffle Letters</button>
        <button onClick={initializeGame}>Start New Game</button>
      </div>
      <div className="guessed-words-container">
        <p>Guessed Words: {game.guessedWords.join(', ')}</p>
      </div>
    </div>
  )
}

export default Game
