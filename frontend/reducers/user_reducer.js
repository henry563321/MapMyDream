import {RECEIVE_MATCH_USERS} from '../actions/friend_actions';
import merge from 'lodash/merge';

const nullUser = Object.freeze({
  users: [],
});



const userReducer = (state = nullUser, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_MATCH_USERS:
      return merge({}, nullUser, {user: action.users});
    default:
      return state;

  }
};

export default userReducer;
