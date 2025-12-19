// Request notification permission on app load
export const requestNotificationPermission = async () => {
  if ('Notification' in window && Notification.permission !== 'denied' && Notification.permission !== 'granted') {
    try {
      await Notification.requestPermission();
    } catch (error) {
      console.error('Failed to request notification permission:', error);
    }
  }
};

// Show a notification
export const showNotification = (title, message) => {
  if ('Notification' in window && Notification.permission === 'granted') {
    try {
      new Notification(title, { body: message });
    } catch (error) {
      console.error('Failed to show notification:', error);
    }
  }
};

// Check if notification is supported
export const isNotificationSupported = () => {
  return 'Notification' in window;
};
