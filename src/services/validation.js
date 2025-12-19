/**
 * Sanitize user input to prevent XSS attacks
 * @param {string} input - The input string to sanitize
 * @returns {string} - The sanitized string
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  
  // Remove HTML tags and encode special characters
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
};

/**
 * Validate and sanitize todo title
 * @param {string} title - The todo title
 * @returns {object} - { isValid: boolean, sanitized: string, error: string }
 */
export const validateTodoTitle = (title) => {
  if (!title || typeof title !== 'string') {
    return { isValid: false, sanitized: '', error: 'Title is required' };
  }

  const sanitized = sanitizeInput(title);
  
  if (sanitized.length === 0) {
    return { isValid: false, sanitized: '', error: 'Title cannot be empty' };
  }

  if (sanitized.length > 200) {
    return { isValid: false, sanitized: '', error: 'Title is too long (max 200 characters)' };
  }

  return { isValid: true, sanitized, error: null };
};

/**
 * Validate date format DD/MM/YYYY HH:mm:ss
 * @param {string} dateString - The date string to validate
 * @returns {object} - { isValid: boolean, error: string }
 */
export const validateDateFormat = (dateString) => {
  if (!dateString || typeof dateString !== 'string') {
    return { isValid: false, error: 'Date is required' };
  }

  const parts = dateString.split(' ');
  if (parts.length !== 2) {
    return { isValid: false, error: 'Invalid date format. Use DD/MM/YYYY HH:mm:ss' };
  }

  const dateParts = parts[0].split('/');
  const timeParts = parts[1].split(':');

  if (dateParts.length !== 3 || timeParts.length !== 3) {
    return { isValid: false, error: 'Invalid date format. Use DD/MM/YYYY HH:mm:ss' };
  }

  // Validate numeric values
  const day = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]);
  const year = parseInt(dateParts[2]);
  const hours = parseInt(timeParts[0]);
  const minutes = parseInt(timeParts[1]);
  const seconds = parseInt(timeParts[2]);

  if (
    isNaN(day) || isNaN(month) || isNaN(year) ||
    isNaN(hours) || isNaN(minutes) || isNaN(seconds)
  ) {
    return { isValid: false, error: 'Date contains invalid numbers' };
  }

  if (day < 1 || day > 31) {
    return { isValid: false, error: 'Invalid day (1-31)' };
  }

  if (month < 1 || month > 12) {
    return { isValid: false, error: 'Invalid month (1-12)' };
  }

  if (year < 2000 || year > 2100) {
    return { isValid: false, error: 'Invalid year (2000-2100)' };
  }

  if (hours < 0 || hours > 23) {
    return { isValid: false, error: 'Invalid hours (0-23)' };
  }

  if (minutes < 0 || minutes > 59) {
    return { isValid: false, error: 'Invalid minutes (0-59)' };
  }

  if (seconds < 0 || seconds > 59) {
    return { isValid: false, error: 'Invalid seconds (0-59)' };
  }

  return { isValid: true, error: null };
};
