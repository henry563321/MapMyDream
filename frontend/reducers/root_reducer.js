import {combineReducers} from 'redux';
import sessionReducers from './session_reducer';
import dreamReducers from './dream_reducer';
import friendReducers from './friend_reducer';
import userReducers from './user_reducer';
import commentReducers from './comment_reducer';


const appReducer = combineReducers({
  session: sessionReducers,
  dream: dreamReducers,
  friend: friendReducers,
  user: userReducers,
  comment: commentReducers
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
