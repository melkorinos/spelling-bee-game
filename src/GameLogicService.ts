import allWords from './words'

const GameLogicService = {
  generateRandomLetters: (count: number): string[] => {
    const alphabet = 'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ';
    const uniqueRandomLetters: string[] = [];

    while (uniqueRandomLetters.length < count) {
      const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];

      if (!uniqueRandomLetters.includes(randomLetter)) {
        uniqueRandomLetters.push(randomLetter);
      }
    }

    const specialLetterIndex = Math.floor(Math.random() * uniqueRandomLetters.length);
    const specialLetter = uniqueRandomLetters[specialLetterIndex];

    // Remove the special letter from the list
    uniqueRandomLetters.splice(specialLetterIndex, 1);

    return [specialLetter, ...uniqueRandomLetters];
  },

  isWordValid: (word: string, specialLetter: string): boolean => {
    console.log('Checking if this word is valid ' + word)
    const index = allWords.indexOf(word.toUpperCase())
    console.log('This word has this index' + index)
    return word.length >= 4 && word.includes(specialLetter) && index >= 0
  },

  calculatePoints: (word: string): number => {
    return word.length // Adjust the point calculation based on word length
  },
}

export default GameLogicService
