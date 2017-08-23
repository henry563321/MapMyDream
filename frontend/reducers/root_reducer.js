import {combineReducers} from 'redux';
import sessionReducers from './session_reducer';
import dreamReducers from './dream_reducer';

const rootReducer = combineReducers({
  session: sessionReducers,
  dream: dreamReducers
});

export default rootReducer;
