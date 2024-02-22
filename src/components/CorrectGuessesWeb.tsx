import { FC, useMemo } from 'react';
import { useActiveGameStore } from '../store';
import { FoundWords } from './FoundWords';

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
      <div className="bg-neutral-400 dark:bg-darkneutral-350 w-[400px] py-2 px-2 rounded-lg flex flex-col relative overflow-hidden h-[450px]">
        <h2 className="font-heading text-md text-center">Hittade ord</h2>
        <FoundWords rows={rows} foundWords={sortedGuesses} />
      </div>
    </div>
  );
};
CorrectGuessesWeb.displayName = 'CorrectGuessesWeb';
