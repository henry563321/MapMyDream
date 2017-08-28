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


export const selectFriends = (data) => {
  if (data.applier) {
    const friends = [];
    const pendingFreinds = [];
    const applier = [];
    data.applier.forEach((apply) => {
      if ( apply.status === 'APPROVED' ) {
       friends.push(values(apply));
      }
      else if ( apply.status === 'PENDING' ){
       applier.push(values(apply));
      }
    }
    );
    data.friends.forEach((friend) => {
      if ( friend.status === 'APPROVED' ) {
       friends.push(values(friend));
      }
      else {
       pendingFreinds.push(values(friend));
      }
    }
    );
    const value = [];
    value.push({friends: friends});
    value.push({applier: applier});
    value.push({pendingFreinds: pendingFreinds});
    return value;
  }
  else {
    return [];
  }
};
