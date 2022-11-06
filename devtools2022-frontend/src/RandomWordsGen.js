import randomWords from 'random-words'

const NUMB_OF_WORDS = 20

class RandomWordsGen {
  static getWords(number_of_words) {
    return new Array(number_of_words).fill(null).map(() => randomWords())
  }
}

export default RandomWordsGen;