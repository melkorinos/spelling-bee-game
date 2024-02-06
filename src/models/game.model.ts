// src/models/game.model.ts
export interface Game {
    letters: string[];
    specialLetter: string;
    currentWord: string;
    score: number;
    guessedWords : string[];
  }
  