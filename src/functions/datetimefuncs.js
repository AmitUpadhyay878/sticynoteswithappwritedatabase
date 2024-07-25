export const OrgGetFullDate = (data) => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthsOfYear = [
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

  const date = new Date(+data);
  const dayOfWeek = daysOfWeek[date.getDay()];
  const day = date.getDate();
  const month = monthsOfYear[date.getMonth()];
  const year = date.getFullYear();
  
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  
  const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`;
  
  const formattedDate = `${dayOfWeek}, ${day} ${month} ${year}, ${formattedTime}`;
  
  return formattedDate;
};
