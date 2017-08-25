import {RECEIVE_SINGLE_DREAM, RECEIVE_DREAM_ERRORS, CLEAR_DREAM_ERRORS,
  RECEIVE_ALL_DREAM} from '../actions/route_actions';
import merge from 'lodash/merge';

const nulldream = Object.freeze({
  dream: null,
  errors: []
});



const dreamReducer = (state = nulldream, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SINGLE_DREAM:
      return merge({}, state, {dream: action.dream});
    case RECEIVE_DREAM_ERRORS:
      const errors = action.errors;
      return merge({}, state.dream, {errors});
    case RECEIVE_ALL_DREAM:
      const dreams = action.dreams;
      return merge({}, nulldream, {dream: action.dreams});
    case CLEAR_DREAM_ERRORS:
      return merge({}, nulldream, {dream: state.dream});
    default:
      return state;

  }
};

export default dreamReducer;
