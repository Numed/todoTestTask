export const getMonth = () => {
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date();
  const nameMonth = month[date.getMonth()];
  return nameMonth;
};

export const getDay = () => {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = new Date();
  const day = weekday[date.getDay()];
  return day;
};

export const setDate = () => {
  const date = new Date();
  const nameMonth = getMonth();
  const day = getDay();
  const numberOfDay = date.getDate();
  const currentDate = day + ", " + nameMonth + " " + numberOfDay;
  return currentDate;
};
