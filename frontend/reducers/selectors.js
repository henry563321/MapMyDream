import { values } from 'lodash';

export const selectDreams = (data) => {
  if (data) {
    const dreams = [];
    data.ord.forEach((id) => dreams.push(values(data.index[id])));
    return dreams;
  } else {
    return [];
  }
};
