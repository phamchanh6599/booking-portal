import instance from './configApi';

export const login = (url = null, user) => new Promise((resolve, reject) => {
  instance
    .post(`http://localhost:5000/${url}`, user)
    .then((response) => {
      resolve(response.data);
    })
    .catch((error) => {
      reject(error);
    });
});
