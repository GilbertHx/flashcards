import { FETCH_ALL_DECKS } from '../actions';

const INITIAL_STATE = {};

function entries (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_ALL_DECKS:
      return action.payload;
    default:
      return state;
  }
}

export default entries
