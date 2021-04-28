export const covertTimeZone = (time) => {
  const date = new Date(time);
  return date.getMonth() > 8
    ? date.getMonth() + 1
    : `0${date.getMonth() + 1}/${
      date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`
    }/${date.getFullYear()}`;
};
