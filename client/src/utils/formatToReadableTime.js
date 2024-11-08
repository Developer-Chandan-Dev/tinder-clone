// Utility function to convert MongoDB createdAt to readable time
export const formatToReadableTime = (mongoDate) => {
  if (!mongoDate) return "";
  const date = new Date(mongoDate);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // Ensures AM/PM format
  });
};
