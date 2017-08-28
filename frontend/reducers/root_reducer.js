import {combineReducers} from 'redux';
import sessionReducers from './session_reducer';
import dreamReducers from './dream_reducer';
import friendReducers from './friend_reducer';
import userReducers from './user_reducer';


const rootReducer = combineReducers({
  session: sessionReducers,
  dream: dreamReducers,
  friend: friendReducers,
  user: userReducers
});

export default rootReducer;
