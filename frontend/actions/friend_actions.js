import * as APIUtil from '../util/friend_util';

export const RECEIVE_ALL_FRIENDS = 'RECEIVE_ALL_FRIENDS';

export const receiveAllFriends = (friends) => ({
    type: RECEIVE_ALL_FRIENDS,
    friends
});

export const fetchAllFriends = () => dispatch => (
  APIUtil.getFriends()
  .then(friends => console.log(friends))

);
