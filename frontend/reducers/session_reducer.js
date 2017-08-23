import {RECEIVE_ERRORS, RECEIVE_CURRENT_USER, CLEAR_ERRORS} from '../actions/session_actions';
import merge from 'lodash/merge';

const nullUser = Object.freeze({
  currentUser: null,
  errors: []
});



const sessionReducer = (state = nullUser, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      const currentUser = action.currentUser;
      return merge({}, nullUser, {currentUser});
    case RECEIVE_ERRORS:
      const errors = action.errors;
      return merge({}, nullUser, {errors});
    case CLEAR_ERRORS:
      return merge({}, nullUser, {errors: []});
    default:
      return state;

  }
};

export default sessionReducer;
