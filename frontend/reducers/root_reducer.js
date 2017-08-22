import {combineReducers} from 'redux';
import sessionReducers from './session_reducer';

const rootReducer = combineReducers({
  session: sessionReducers
});

export default rootReducer;
