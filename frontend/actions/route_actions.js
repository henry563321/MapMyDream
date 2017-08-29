import * as APIUtil from '../util/dream_util';

export const RECEIVE_SINGLE_DREAM = 'RECEIVE_SINGLE_DREAM';
export const RECEIVE_ALL_DREAM = 'RECEIVE_ALL_DREAM';
export const RECEIVE_DREAM_ERRORS= 'RECEIVE_DREAM_ERRORS';
export const CLEAR_DREAM_ERRORS= 'CLEAR_DREAM_ERRORS';

export const receiveSingleDream = (dream) => ({
    type: RECEIVE_SINGLE_DREAM,
    dream
});

export const receiveAllDream = (dreams) => ({
    type: RECEIVE_ALL_DREAM,
    dreams
});



export const receiveDreamErrors = (errors) => ({
    type: RECEIVE_DREAM_ERRORS,
    errors
});

export const clearDreamErrors = () => ({
    type: CLEAR_DREAM_ERRORS,
});

export const addNewDream = dream => dispatch => (
  APIUtil.createDream(dream)
  .then((newDream) => dispatch(receiveSingleDream(newDream)),
    errors => dispatch(receiveDreamErrors(errors.responseJSON))
  )
);
export const fetchAllDream = (id) => dispatch => (
  APIUtil.getDream(id)
  .then(dreams => dispatch(receiveAllDream(dreams)))
);
