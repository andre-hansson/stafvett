import { FC, useMemo } from 'react';
import { useActiveGameStore } from '../../store';
import { isPangram } from '../../utils/points';

export const CorrectGuessesModal: FC = () => {
  const { correctGuesses } = useActiveGameStore();
  const { rows, sortedGuesses } = useMemo(() => {
    const rows = Math.ceil(correctGuesses.length / 4);
    return {
      rows,
      sortedGuesses: [...correctGuesses].sort((a, b) => (a > b ? 1 : -1))
    };
  }, [correctGuesses]);
  return (
    <div>
      <h2 className="font-heading text-xl mb-2 text-center">Hittade ord</h2>
      <div className="border border-darkneutral-400 max-h-96 overflow-y-scroll">
        {Array.from({ length: rows }).map((_, row) => {
          const guessesInRow = sortedGuesses.slice(4 * row, 4 * row + 4);
          return (
            <div
              key={row}
              className="nth-[2n]:bg-darkneutral-400/50 flex justify-start gap-4 px-2"
            >
              {guessesInRow.map((guess, index) => (
                <div key={index} className="flex-1 py-1.5">
                  <span
                    className={
                      isPangram(guess)
                        ? 'text-purple-800 dark:text-purple-300 font-medium'
                        : ''
                    }
                  >
                    {guess}
                  </span>
                </div>
              ))}
              {guessesInRow.length !== 4 && (
                <div style={{ width: `calc(100% / ${guessesInRow.length})` }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
CorrectGuessesModal.displayName = 'CorrectGuessesModal';
