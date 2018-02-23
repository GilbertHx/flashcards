export const FETCH_ALL_DECKS = 'fetch_all_deck';
export const FETCH_SINGLE_DECK = 'fetch_single_deck';

import { getDecks, getDeck } from '../utils/api';

export function fetchAllDecks() {
  return (dispatch) => {
    getDecks().then(data => dispatch({ type: FETCH_ALL_DECKS, payload: data}));
  }
}

export function getSingleDeck(entryId) {
  return (dispatch) => {
    getDeck(entryId)
      .then(cardDeck => {
        dispatch({ type: FETCH_SINGLE_DECK, payload: JSON.parse(cardDeck) })
      });
  }
}
