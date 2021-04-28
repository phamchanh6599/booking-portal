import instance from './configApi';

export const getBooking = (url) => new Promise((resolve, reject) => {
  instance
    .get(`http://localhost:5000/${url}`)
    .then((response) => {
      resolve(response.data);
    })
    .catch((error) => {
      reject(error);
    });
});

export const addBooking = (url, booking) => new Promise((resolve, reject) => {
  instance
    .post(`http://localhost:5000/${url}`, booking)
    .then((response) => {
      resolve(response.data);
    })
    .catch((error) => {
      reject(error);
    });
});

export const updateBooking = (url, booking) => new Promise((resolve, reject) => {
  instance
    .put(`http://localhost:5000/${url}`, booking)
    .then((response) => {
      resolve(response.data);
    })
    .catch((error) => {
      reject(error);
    });
});

export const deleteBooking = (url) => new Promise((resolve, reject) => {
  instance
    .delete(`http://localhost:5000/${url}`)
    .then((response) => {
      resolve(response.data);
    })
    .catch((error) => {
      console.log('LOI ROI', error);
      reject();
    });
});
