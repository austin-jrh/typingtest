import randomWords from 'random-words'

const NUMB_OF_WORDS = 20

class RandomWordsGen {
  static getWords(number_of_words) {
    return new Array(number_of_words).fill(null).map(() => randomWords())
  }

  static convertToArray(words) {
    return words.split(' ')
  }

  static shuffleWords(array) {
    // Fisher-Yates (aka Knuth) Shuffle

    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }
}

export default RandomWordsGen;