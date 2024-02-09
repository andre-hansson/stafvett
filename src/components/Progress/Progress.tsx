import { FC } from 'react';
import { useActiveGameStore } from '../../store';
import { Progressbar } from './Progressbar';
import { Rank } from './Rank';

export const Progress: FC = () => {
  const { answers, correctGuesses } = useActiveGameStore();
  return (
    <div className="flex justify-center border-y border-y-purple-800 dark:border-y-purple-300 w-full">
      <div className="flex flex-col pt-0.5 md:pt-1.5 pb-2 mb:pb-3 w-full max-w-[600px]">
        <Rank />
        <div className="flex justify-between items-center gap-2 md:gap-4 px-4">
          <div className="font-heading font-medium text-base md:text-lg w-10 text-center">
            {correctGuesses.length}
          </div>
          <Progressbar />
          <div className="font-heading font-medium text-base md:text-lg w-10 text-center">
            {answers.length}
          </div>
        </div>
      </div>
    </div>
  );
};
Progress.displayName = 'Progress';
