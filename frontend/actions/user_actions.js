import * as APIUtil from '../util/user_util';

export const RECEIVE_USER = 'RECEIVE_USER';

export const receiveUser = (user) => ({
    type: RECEIVE_USER,
    user
});

export const fetchUser = id => dispatch => (
  APIUtil.getUser(id)
  .then(user => dispatch(receiveUser(user))
));
