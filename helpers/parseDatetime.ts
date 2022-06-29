export const parseDatetime = (datetime: string): string => {
  if (!datetime) return "";
  const date = new Date(datetime);
  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + date.getMonth()).slice(-2);

  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);

  const parsedDate = `${day}/${month}/${date.getFullYear()} ${hours}:${minutes}`;
  return parsedDate;
};

export const parseDate = (paramDate: string | Date | undefined): string => {
  if (!paramDate) return "";
  const date = new Date(paramDate);
  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + date.getMonth()).slice(-2);

  const parsedDate = `${day}/${month}/${date.getFullYear()}`;
  return parsedDate;
};
