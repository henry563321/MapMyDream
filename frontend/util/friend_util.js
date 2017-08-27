export const getFriends = () => {
  return(
    $.ajax({
      method: 'GET',
      url: 'api/routes',
    })
  );
};
