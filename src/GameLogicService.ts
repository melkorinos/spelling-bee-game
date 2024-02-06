import allWords from './words'

const GameLogicService = {
  generateRandomLetters: (count: number): string[] => {
    const alphabet = 'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ'
    const uniqueRandomLetters: string[] = []

    while (uniqueRandomLetters.length < count) {
      const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)]

      if (!uniqueRandomLetters.includes(randomLetter)) {
        uniqueRandomLetters.push(randomLetter)
        // Store the special letter during the first iteration
      }
    }

    const specialLetter = uniqueRandomLetters[Math.floor(Math.random() * uniqueRandomLetters.length)]

    return [specialLetter, ...uniqueRandomLetters]
  },

  isWordValid: (word: string, specialLetter: string): boolean => {
    const index = allWords.indexOf(word.toUpperCase())
    return word.length >= 4 && word.includes(specialLetter) && index >= 0
  },

  calculatePoints: (word: string): number => {
    return word.length // Adjust the point calculation based on word length
  },
}

export default GameLogicService
