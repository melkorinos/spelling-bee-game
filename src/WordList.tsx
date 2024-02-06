// src/WordList.tsx

import React, { useEffect, useState } from 'react';

import { Word as WordModel } from './models/word.model';
import WordService from './WordService';

const WordList: React.FC = () => {
  const [wordList, setWordList] = useState<WordModel[]>([]);

  useEffect(() => {
    // Fetch or initialize the list of valid words
    const validWords = WordService.getValidWords(); 
    const initialWordList: WordModel[] = validWords.map((word) => ({
      value: word,
      length: word.length,
      isSpecialUsed: word.includes(''), // Update with your special letter
      points: WordService.calculatePoints(word),
    }));

    setWordList(initialWordList);
  }, []);

  return (
    <div>
      <h2>Valid Words</h2>
      <ul>
        {wordList.map((word) => (
          <li key={word.value}>
            <strong>{word.value}</strong> (Length: {word.length}, Points: {word.points})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WordList;
