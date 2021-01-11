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

const updateData = (path, action, data) => {
  return fetch(path, {
    method: action,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
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
    return getData("https://ivonlunteer-api-dev.herokuapp.com/users/1");
  },

  getPostings: () => {
    return getData("https://ivonlunteer-api-dev.herokuapp.com/events");
  },

  getSinglePosting: (id) => {
    return getData(`https://ivonlunteer-api-dev.herokuapp.com/events/${id}`);
  },

  postJobPosting: (data) => {
    return updateData(`https://ivonlunteer-api-dev.herokuapp.com/users/1`, "POST", data);
  },

  patchEventPosting: (eventId, data) => {
    return updateData(`https://ivonlunteer-api-dev.herokuapp.com/events/${eventId}`, "PATCH", data);
  }
};
