import allWords from './words'

const WordService = {
  getValidWords: (): string[] => {
    return allWords
  },

  calculatePoints: (word: string): number => {
    const wordLength = word.length

    if (wordLength < 4) return 0
    if (wordLength === 4) return 1

    // Award points based on word length
    let points = wordLength

    // Bonus for creating a pangram (using all available letters)
    const uniqueLetters = new Set(word.toLowerCase())
    const allLettersUsed = uniqueLetters.size === 7 // Assuming 7 letters are provided

    if (allLettersUsed) {
      points += 5 // Bonus points for pangram
    }

    return points
  },
}

export default WordService
