export const generateRandomTokenId = () => {
  return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
};

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
