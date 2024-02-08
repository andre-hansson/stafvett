import { Answer } from './Answer';

export type Game = {
  today: Answer;
  yesterday: Answer;
  date: string;
};
