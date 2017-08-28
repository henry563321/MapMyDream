export const getFriends = () => {
  return(
    $.ajax({
      method: 'GET',
      url: 'api/friends',
    })
  );
};


export const deleteFriend = (id) => {
  return(
    $.ajax({
      method: 'DELETE',
      url: `api/friends/${id}`,
    })
  );
};

export const updateFriend = (data) => {
  const friend = {id: data[0], status: data[2]};
  return(
    $.ajax({
      method: 'PATCH',
      url: `api/friends/${friend.id}`,
      data: {friend}
    })
  );
};
