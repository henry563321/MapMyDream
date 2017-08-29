import * as APIUtil from '../util/comment_util';

export const RECEIVE_ALL_COMMENTS = 'RECEIVE_ALL_COMMENTS';
export const RECEIVE_SINGLE_COMMENT = 'RECEIVE_SINGLE_COMMENT';

export const receiveAllComments = (comments) => ({
  type: RECEIVE_ALL_COMMENTS,
  comments
});

export const receiveSingleComments = (comment) => ({
  type: RECEIVE_SINGLE_COMMENT,
  comment
});
