export const padExtraZeroForSingleDigit = num => {
  return num < 10 ? `0${num}` : `${num}`;
};

export const get_YYYYMMDD_HHMMSS_String = date => {
  const yearNum = date.getFullYear();
  const monthNum = date.getMonth() + 1;
  const dateNum = date.getDate();

  const hourNum = date.getHours();
  const minNum = date.getMinutes();
  const secNum = date.getSeconds();

  return (
    `${yearNum}` +
    `${padExtraZeroForSingleDigit(monthNum)}` +
    `${padExtraZeroForSingleDigit(dateNum)}_` +
    `${padExtraZeroForSingleDigit(hourNum)}` +
    `${padExtraZeroForSingleDigit(minNum)}` +
    `${padExtraZeroForSingleDigit(secNum)}`
  );
};
