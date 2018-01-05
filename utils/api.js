import { AsyncStorage } from 'react-native';

export const DECKS_STORAGE_KEY = 'UdaciCards:decks';

// used to have some initial content
const initialDecks = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

export function startupDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(initialDecks));
      }
      return data;
    })
}

export function getDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(JSON.parse)
}

export function getDeck(deck) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(JSON.parse)
    .then((decks) => decks[deck] || null)
}

export function saveDeckTitle(deck, title) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [deck]: { title }
  }));
}

export function addCardToDeck(deck, card) {
  console.info('addCardToDeck', deck, card);
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(JSON.parse)
    .then((decks) => decks[deck])
    .then(d => {
      console.info('found deck', d);
      const questions = d.questions || [];
      return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [deck]: {
          questions: [ ...questions, card ]
        }
      }))
    });
}