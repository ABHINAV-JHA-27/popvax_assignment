const createDate = (dateStr: string) => {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  // Set time to "00:00:00.000" (midnight) UTC
  date.setUTCHours(0, 0, 0, 0);
  return date.toISOString();
};

export { createDate };
