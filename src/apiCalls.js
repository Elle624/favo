const getData = (path) => {
  return fetch(path).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(
        "Sorry we are having difficulty loading this page, please try again later!"
      );
    }
  });
};

const updateData = (path, action, id) => {
  return fetch(path, {
    method: action,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ id: id }),
  }).then((response) => {
    if (response.ok) {
      return response;
    } else {
      throw new Error(
        "Sorry we are having difficulty loading this page, please try again later!"
      );
    }
  });
};

export const apiCalls = {

  getUser: () => {
    return getData("http://localhost:3001/users/1");
  },

  getPostings: () => {
    return getData("http://localhost:3001/events");
  },

  getSinglePosting: (id) => {
    return getData(`http://localhost:3001/events/${id}`);
  }
};
