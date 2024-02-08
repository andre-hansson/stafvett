import { Answer, Game } from '../../types';
import dayjs from 'dayjs';

const gameCreationDate = '2024-01-01';
export const createGameObject = (answers: Answer[], date: string): Game => {
  const daysFromCreation = dayjs(date.substring(0, 10)).diff(gameCreationDate);

  const today = answers[daysFromCreation % answers.length];
  const yesterday = answers[(daysFromCreation - 1) % answers.length];
  return { today, yesterday, date };
};
