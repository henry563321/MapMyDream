import { RECEIVE_ALL_FRIENDS } from '../actions/friend_actions';
import merge from 'lodash/merge';

const nullFriend = Object.freeze({
  friends: []
});



const friendReducer = (state = nullFriend, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_FRIENDS:
      return {friends: action.friends};
    default:
      return state;
  }
};

export default friendReducer;
