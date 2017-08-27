import {combineReducers} from 'redux';
import sessionReducers from './session_reducer';
import dreamReducers from './dream_reducer';
import friendReducers from './friend_reducer';

const rootReducer = combineReducers({
  session: sessionReducers,
  dream: dreamReducers,
  friend: friendReducers
});

export default rootReducer;
