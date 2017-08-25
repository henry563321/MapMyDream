import { values } from 'lodash';

export const selectDreams = (data) => {
  return values(data);
};

export const selectUserDreams = (state, user) => {
  return user.dreamids.map(id => state.dream.index[id])
};
