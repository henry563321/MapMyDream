export const createDream = (dream) => {
  return $.ajax({
      method: 'POST',
      url: 'api/routes',
      data: {dream}
    });
};

export const showDream = (id) => {
  return(
    $.ajax({
      method: 'GET',
      url: 'api/routes',
      data: {id}
    })
  );
};

export const getDream = (id) => {
  return(
    $.ajax({
      method: 'GET',
      url: 'api/routes',
      data: {id}
    })
  );
};

export const deleteDream = (dream) => {
  return(
    $.ajax({
      method: 'DELETE',
      url: 'api/routes',
    })
  );
};
