import { FC, useMemo } from 'react';
import { useActiveGameStore } from '../store';
import { isPangram } from '../utils/points';

export const CorrectGuessesWeb: FC = () => {
  const { correctGuesses } = useActiveGameStore();

  const { rows, sortedGuesses } = useMemo(() => {
    const rows = Math.ceil(correctGuesses.length / 4);
    return {
      rows,
      sortedGuesses: [...correctGuesses].sort((a, b) => (a > b ? 1 : -1))
    };
  }, [correctGuesses]);

  return (
    <div className="flex-0 mx-20">
      <div className="bg-neutral-400 dark:bg-darkneutral-350 w-[400px] py-2 px-2 rounded-lg flex flex-col relative overflow-hidden h-[450px]">
        <h2 className="font-heading text-md text-center">Hittade ord</h2>
        <div className="border border-darkneutral-400 rounded-xl overflow-y-scroll">
          {Array.from({ length: rows }).map((_, row) => {
            const guessesInRow = sortedGuesses.slice(4 * row, 4 * row + 4);
            return (
              <div
                key={row}
                className="nth-[2n]:bg-darkneutral-400/50 flex gap-3"
              >
                {guessesInRow.map((guess, index) => (
                  <div key={index} className="flex-1 px-3 py-1">
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
                  <div
                    style={{
                      width: `calc(100% / ${guessesInRow.length})`
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
CorrectGuessesWeb.displayName = 'CorrectGuessesWeb';
