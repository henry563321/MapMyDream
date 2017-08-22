import * as APIUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";

export const receiveErrors = (errors) => ({
    type: RECEIVE_CURRENT_USER,
    errors
});

export const receiveCurrentUser = (currentUser) => ({
    type: RECEIVE_CURRENT_USER,
    currentUser
});

export const signup = user => dispatch => (
  APIUtil.signup(user)
  .then(currentUser => dispatch(receiveCurrentUser(currentUser)),
  errors => dispatch(receiveErrors(errors.responseJSON))
));

export const login = user => dispatch => {
  return (
  APIUtil.login(user)
  .then(currentUser => dispatch(receiveCurrentUser(currentUser)),
  errors => dispatch(receiveErrors(errors.responseJSON))
));
};

export const logout = () => dispatch => (
  APIUtil.logout()
  .then(user => dispatch(receiveCurrentUser(null)),
  errors => dispatch(receiveErrors(errors))
));
