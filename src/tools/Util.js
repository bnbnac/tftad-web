export function timeAgo(date) {
  const seconds = Math.floor((Date.now() - date) / 1000);

  const interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    return interval + " year" + (interval > 1 ? "s" : "") + " ago";
  }

  const intervalMonths = Math.floor(seconds / 2592000);
  if (intervalMonths >= 1) {
    return intervalMonths + " month" + (intervalMonths > 1 ? "s" : "") + " ago";
  }

  const intervalDays = Math.floor(seconds / 86400);
  if (intervalDays >= 1) {
    return intervalDays + " day" + (intervalDays > 1 ? "s" : "") + " ago";
  }

  const intervalHours = Math.floor(seconds / 3600);
  if (intervalHours >= 1) {
    return intervalHours + " hour" + (intervalHours > 1 ? "s" : "") + " ago";
  }

  const intervalMinutes = Math.floor(seconds / 60);
  if (intervalMinutes >= 1) {
    return (
      intervalMinutes + " minute" + (intervalMinutes > 1 ? "s" : "") + " ago"
    );
  }

  return "Just now";
}
