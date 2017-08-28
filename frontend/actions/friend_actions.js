import * as APIUtil from '../util/friend_util';

export const RECEIVE_ALL_FRIENDS = 'RECEIVE_ALL_FRIENDS';
export const RECEIVE_MATCH_USERS = 'RECEIVE_MATCH_USERS';

export const receiveAllFriends = (friends) => ({
    type: RECEIVE_ALL_FRIENDS,
    friends
});

export const receiveMatchUsers = (users) => ({
    type: RECEIVE_MATCH_USERS,
    users
});

export const fetchAllFriends = () => dispatch => (
  APIUtil.getFriends()
  .then(friends => dispatch(receiveAllFriends(friends)))
);

export const deleteFriend = (id) => dispatch => (
  APIUtil.deleteFriend(id)
  .then(friends => dispatch(receiveAllFriends(friends)))
);

export const updateFriend = (friend) => dispatch => (
  APIUtil.updateFriend(friend)
  .then(friends => dispatch(receiveAllFriends(friends)))
);

export const searchFriend = (keyword) => dispatch => (
  APIUtil.searchFriend(keyword)
  .then(users => dispatch(receiveMatchUsers(users)))
);
