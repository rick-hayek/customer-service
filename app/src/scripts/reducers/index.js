import { combineReducers } from 'redux'
import messages from './messages';
import shuttle from './shuttle';

export default combineReducers({
    messages,
    shuttle
});
  