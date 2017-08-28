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
  return(
    $.ajax({
      method: 'DELETE',
      url: `api/friends/${data.id}`,
      data: {data}
    })
  );
};
