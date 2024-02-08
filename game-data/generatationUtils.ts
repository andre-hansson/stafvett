import { readFileSync } from 'fs';

export const convertFileToArray = (path: string): string[] => {
  const file = readFileSync(path);
  return file
    .toString()
    .split('\n')
    .filter(Boolean) // Remove any extra empty indexes
    .map((word) => word.toLowerCase());
};

export const removeInvalidWords = (words: string[]): string[] => {
  return words.filter((word) => {
    // word minimun length
    if (word.length < 4) {
      return false;
    }

    // Remove words with more than 7 unique chars
    const unique = new Set(word);
    if (unique.size > 7) {
      return false;
    }

    return true;
  });
};
