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

export const selectUsers = (data, friends, currentUser) => {
  if (data.index) {
    const users = [];
    const alreadyFriends = [];
    friends.applier.forEach((applier) => alreadyFriends.push(applier.name));
    friends.friends.forEach((friend) => alreadyFriends.push(friend.name));
    alreadyFriends.push(currentUser.username);
    data.ord.forEach((id) => {
      if (!alreadyFriends.includes(data.index[id].username)) {
        users.push(values(data.index[id]));
      }
    });
    return users;
  } else {
    return [];
  }
};

export const selectComments = (data, routeId) => {
  if (data) {
    const comments = [];
    data.ord.forEach((id) => {
      if(data.index[id].route_id === routeId) {
        comments.push(values(data.index[id]));
      }
    });
    return comments;
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
