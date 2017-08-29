import {RECEIVE_SINGLE_COMMENT, RECEIVE_ALL_COMMENTS}  from
  '../actions/comment_actions';
import merge from 'lodash/merge';

const nullcomment = Object.freeze({
  comment: null,
});



const commentReducer = (state = nullcomment, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_COMMENTS:
      return merge({}, nullcomment, {comment: action.comments});
    default:
      return state;

  }
};

export default commentReducer;
