import allWords from './words'

const GameLogicService = {
  generateRandomLetters: (): string[] => {
    const alphabet = 'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ'
    const randomIndex = Math.floor(Math.random() * alphabet.length)
    const specialLetter = alphabet[randomIndex]
    const otherLetters = GameLogicService.generateRandomLettersWithoutSpecial(
      6,
      specialLetter
    )
    return [specialLetter, ...otherLetters]
  },

  generateRandomLettersWithoutSpecial: (
    count: number,
    specialLetter: string
  ): string[] => {
    const lettersWithoutSpecial = 'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ'.replace(
      specialLetter,
      ''
    )
    const randomLetters = []
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(
        Math.random() * lettersWithoutSpecial.length
      )
      randomLetters.push(lettersWithoutSpecial[randomIndex])
    }
    return randomLetters
  },

  isWordValid: (word: string, specialLetter: string): boolean => {
    const index = allWords.indexOf(word.toUpperCase())
    return word.length >= 4 && word.includes(specialLetter) && index > 0
  },

  calculatePoints: (word: string): number => {
    return word.length // Adjust the point calculation based on word length
  },
}

export default GameLogicService
