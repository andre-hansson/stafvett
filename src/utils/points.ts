export const calculateWordScore = (
  word: string
): { score: number; message: string } => {
  if (word.length === 4) return { score: 1, message: '👍' };
  if (isPangram(word)) return { score: word.length + 25, message: '🔥' };
  return { score: word.length, message: '🎉' };
};

export const isPangram = (word: string): boolean => {
  return new Set(word).size === 7;
};

export const calculateGameMaxScore = (answers: string[]): number => {
  return answers.reduce((total: number, word: string): number => {
    return total + calculateWordScore(word).score;
  }, 0);
};

export const calculateScoreLevels = (answers: string[]): number[] => {
  return Array.from({ length: 10 })
    .map((_, index) =>
      Math.floor(calculateGameMaxScore(answers) * +`0.${index}`)
    )
    .sort((a, b) => a - b);
};
