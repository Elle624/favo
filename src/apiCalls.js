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

// const baseUrl = 'https://ivolunteer-api-development.herokuapp.com'
const baseUrl = 'http://localhost:3001'

export const apiCalls = {

  getUser: () => {
    return getData(`${baseUrl}/users/1`);
  },

  getPostings: () => {
    return getData(`${baseUrl}/events`);
  },

  getSinglePosting: (id) => {
    return getData(`${baseUrl}/events/${id}`);
  },

  postJobPosting: (data) => {
    return updateData(`${baseUrl}/users/1`, "POST", data);
  },

  patchEventPosting: (eventId, data) => {
    return updateData(`${baseUrl}/events/${eventId}`, "PATCH", data);
  },

  cancelSignedUpJob: (eventId, data) => {
    return updateData(`${baseUrl}/events/${eventId}`, "DELETE", data)
  }
};
