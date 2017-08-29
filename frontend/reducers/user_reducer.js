import {RECEIVE_MATCH_USERS} from '../actions/friend_actions';
import {RECEIVE_USER} from '../actions/user_actions';
import merge from 'lodash/merge';

const nullUser = Object.freeze({
  users: [],
});



const userReducer = (state = nullUser, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_MATCH_USERS:
      return merge({}, nullUser, {users: action.users});
    case RECEIVE_USER:
      return merge({}, nullUser, {user: action.user});
    default:
      return state;

  }
};

export default userReducer;
