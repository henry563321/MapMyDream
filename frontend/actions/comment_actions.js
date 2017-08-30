import * as APIUtil from '../util/comment_util';

export const RECEIVE_ALL_COMMENTS = 'RECEIVE_ALL_COMMENTS';
export const RECEIVE_SINGLE_COMMENT = 'RECEIVE_SINGLE_COMMENT';

export const receiveAllComments = (comments) => ({
  type: RECEIVE_ALL_COMMENTS,
  comments
});


export const postComment = (post) => dispatch => (
  APIUtil.createComment(post)
  .then(comments => dispatch(receiveAllComments(comments)))
);

export const fetchAllComments = () => dispatch => (
  APIUtil.getComments()
  .then(comments => dispatch(receiveAllComments(comments)))
);

export const removeComment = (id) => dispatch => (
  APIUtil.deleteComment(id)
  .then(comments => dispatch(receiveAllComments(comments)))
);
