import { AsyncStorage } from 'react-native';

export const DECKS_STORAGE_KEY = 'UdaciCards:decks';

// initial content from project spec
const initialDecks = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces',
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event',
      },
    ],
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.',
      },
    ],
  },
};

/**
 * initial startup of storage, pre-fills with initial content from project spec
 * @return {object} Promise with getItem data object or setItem response
 */
export function startupDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(JSON.parse)
    .then(data => {
      // check if data exists
      if (data === null) {
        // and add initial if they don't
        return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(initialDecks));
      }
      return data;
    });
}

/**
 * get all decks
 * @return {object} decks
 */
export function getDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(JSON.parse);
}

/**
 * get single deck
 * @param  {string} deck deck name
 * @return {object}      deck entry
 */
export function getDeck(deck) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(JSON.parse)
    .then(decks => decks[deck] || null);
}

/**
 * create a new deck with given name (also can update exist, but not used)
 * @param  {string} deck  name
 * @param  {string} title title
 * @return {object}       Promise
 */
export function saveDeckTitle(deck, title) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [deck]: { title },
  }));
}

/**
 * adds a new card to deck
 * @param {string} deck deck name to add the card to
 * @param {object} card card data (template seen in initialDecks above)
 */
export function addCardToDeck(deck, card) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(JSON.parse)
    .then(decks => decks[deck])
    .then(d => {
      const questions = d.questions || [];
      return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [deck]: {
          questions: [...questions, card],
        },
      }));
    });
}
