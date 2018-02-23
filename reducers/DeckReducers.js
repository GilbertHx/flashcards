import { FETCH_SINGLE_DECK } from '../actions';

const INITIAL_STATE = {};

function entries (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SINGLE_DECK:
      return action.payload;
    default:
      return state;
  }
}

export default entries
