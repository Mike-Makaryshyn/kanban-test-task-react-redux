export const dateTransform = (created_at: Date) => {
  const createdAt = new Date(created_at);
  const now = new Date();

  const diff = Math.abs(now.getTime() - createdAt.getTime());
  const hoursDiff = Math.floor(diff / (1000 * 60 * 60));
  const daysDiff = Math.floor(hoursDiff / 24);

  if (daysDiff > 0) {
    return `${daysDiff} day${daysDiff === 1 ? "" : "s"} ago`;
  } else {
    return `${hoursDiff} hour${hoursDiff === 1 ? "" : "s"} ago`;
  }
};
