import instance from './configApi';

export const getUser = (url) => new Promise((resolve, reject) => {
  instance
    .get(`http://localhost:5000/${url}`)
    .then((response) => {
      resolve(response.data);
    })
    .catch((error) => {
      console.log(error);
      reject();
    });
});
