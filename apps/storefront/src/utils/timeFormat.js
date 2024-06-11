const options = {
    // weekday: 'long',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    // hour: '2-digit',
    // minute: '2-digit',
    timeZone: 'Asia/Ho_Chi_Minh',
    hour12: false
  };
//   const options = {
//     year: 'numeric', // Numeric representation of the year (e.g., "2024")
//     month: '2-digit', // Two-digit representation of the month (e.g., "05" for May)
//     day: '2-digit', // Two-digit representation of the day (e.g., "10")
//     hour: '2-digit', // Two-digit representation of the hour (e.g., "12")
//     minute: '2-digit', // Two-digit representation of the minute (e.g., "51")
//     hour12: false // Use 24-hour format
//   };
  const formatter = new Intl.DateTimeFormat('en-US', options);
  export default formatter;
