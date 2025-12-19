// Parse date string in DD/MM/YYYY HH:mm:ss format
export const parseDateString = (dateString) => {
  try {
    const parts = dateString.split(' ');
    if (parts.length !== 2) return null;

    const dateParts = parts[0].split('/');
    const timeParts = parts[1].split(':');

    if (dateParts.length !== 3 || timeParts.length !== 3) return null;

    const [day, month, year] = dateParts;
    const [hours, minutes, seconds] = timeParts;

    return new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day),
      parseInt(hours),
      parseInt(minutes),
      parseInt(seconds),
      0
    );
  } catch (error) {
    console.error('Failed to parse date:', error);
    return null;
  }
};

// Format date to DD/MM/YYYY HH:mm:ss
export const formatDate = (date) => {
  if (!(date instanceof Date)) return '';
  
  const pad = (num) => String(num).padStart(2, '0');
  
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};

// Validate date format
export const isValidDateFormat = (dateString) => {
  const parts = dateString.split(' ');
  if (parts.length !== 2) return false;

  const dateParts = parts[0].split('/');
  const timeParts = parts[1].split(':');

  return dateParts.length === 3 && timeParts.length === 3;
};

// Get time difference in seconds
export const getTimeDifferenceInSeconds = (targetDate, currentDate = new Date()) => {
  return (targetDate.getTime() - currentDate.getTime()) / 1000;
};
