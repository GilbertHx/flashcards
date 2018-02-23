import { combineReducers } from 'redux';
import DecksReducers from './DecksReducers';
import DeckReducers from './DeckReducers';

export default combineReducers({
  decks: DecksReducers,
  deck: DeckReducers,
});
