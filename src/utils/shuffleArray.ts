import { random } from './random';

// https://stackoverflow.com/a/46545530/6305204
export const shuffleArray = <T>(array: T[], seed: number = 1): T[] => {
  // Random key for sorting
  const key = random({ seed });
  return array
    .map((value) => ({ value, sort: key() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};
