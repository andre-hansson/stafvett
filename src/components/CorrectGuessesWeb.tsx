import { FC, useMemo } from 'react';
import { useActiveGameStore } from '../store';
import { FoundWords } from './FoundWords';
import { Progressbar } from './Progress/Progressbar';
import { Rank } from './Progress';

export const CorrectGuessesWeb: FC = () => {
  const { correctGuesses } = useActiveGameStore();

  const { rows, sortedGuesses } = useMemo(() => {
    const rows = Math.ceil(correctGuesses.length / 3);
    return {
      rows,
      sortedGuesses: [...correctGuesses].sort((a, b) => (a > b ? 1 : -1))
    };
  }, [correctGuesses]);

  return (
    <div className="flex-0 mx-20">
      <div className="bg-neutral-400 dark:bg-darkneutral-350 w-[400px] pb-2 px-2 rounded-lg flex flex-col relative overflow-hidden h-[450px]">
        <div className="-mx-2 mb-1">
          <Progressbar />
        </div>
        <h2 className="font-heading text-md text-center">Hittade ord</h2>
        {rows > 0 && <FoundWords rows={rows} foundWords={sortedGuesses} />}
        <div className="flex-1 flex flex-col justify-end">
          <Rank />
        </div>
      </div>
    </div>
  );
};
CorrectGuessesWeb.displayName = 'CorrectGuessesWeb';
