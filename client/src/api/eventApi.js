import instance from './configApi';

export const getEvents = (url) => new Promise((resolve, reject) => {
  instance
    .get(`http://localhost:5000/${url}`)
    .then((response) => {
      resolve(response.data);
    })
    .catch((error) => {
      reject(error);
    });
});
