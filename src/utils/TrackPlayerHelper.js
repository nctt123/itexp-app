export const convertPositionToTime = (value) => {
  const duration = +value.toFixed(0);
  const min = Math.floor(duration / 60);
  let second = duration % 60;
  second = second < 10 ? `0${second}` : second;
  return `${min}:${second}`;
};

export const convertDurationToTime = (duration) => {
  if (!duration) return "00:00";
  const min = Math.floor(duration / 60);
  let second = duration % 60;
  second = second < 10 ? `0${second}` : second;
  return `${min}:${second}`;
};
