export const dateTranform = (created_at: Date) => {
  const createdAt = new Date(created_at);

  const day =
    createdAt.getDate() < 10 ? "0" + createdAt.getDate() : createdAt.getDate();
  const month =
    createdAt.getMonth() + 1 < 10
      ? "0" + (createdAt.getMonth() + 1)
      : createdAt.getMonth() + 1;
  const year = createdAt.getFullYear();

  const date = `${day}.${month}.${year}`;
  return date;
};
