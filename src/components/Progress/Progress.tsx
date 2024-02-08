import { FC } from 'react';
import { useActiveGameStore } from '../../store';
import { Progressbar } from './Progressbar';
import { Rank } from './Rank';

export const Progress: FC = () => {
  const { answers, correctGuesses } = useActiveGameStore();
  return (
    <div className="flex flex-col border-y border-y-purple-800 dark:border-y-purple-300 pt-1.5 pb-3">
      <Rank />
      <div className="flex justify-between items-center gap-4 px-4">
        <div className="font-heading font-medium text-lg w-10 text-center">
          {correctGuesses.length}
        </div>
        <Progressbar />
        <div className="font-heading font-medium text-lg w-10 text-center">
          {answers.length}
        </div>
      </div>
    </div>
  );
};
Progress.displayName = 'Progress';
