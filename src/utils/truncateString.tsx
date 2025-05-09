export const truncateString = (name: string, maxLength: number) => {
  return name.length > maxLength ? name.substring(0, maxLength) + '...' : name;
};
