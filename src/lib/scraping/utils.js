export const cleanString = (str) => {
  return str
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\t+/g, " ")
    .trim();
};