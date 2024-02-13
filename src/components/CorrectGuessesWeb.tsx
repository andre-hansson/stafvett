import { FC, useMemo } from 'react';
import { useActiveGameStore } from '../store';
import { isPangram } from '../utils/points';
import classNames from 'classnames';

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
        <div className="border border-darkneutral-400 max-h-96 overflow-y-scroll">
          {Array.from({ length: rows }).map((_, row) => {
            const guessesInRow = sortedGuesses.slice(3 * row, 3 * row + 3);
            return (
              <div
                key={row}
                className="nth-[2n]:bg-darkneutral-400/50 flex justify-evenly"
              >
                {guessesInRow.map((guess, index) => (
                  <div key={index} className="py-1.5 px-2 text-center flex-1">
                    <span
                      className={classNames(
                        isPangram(guess)
                          ? 'text-green-800 dark:text-green-300 font-bold'
                          : ''
                      )}
                    >
                      {guess}
                    </span>
                  </div>
                ))}
                {guessesInRow.length !== 3 && (
                  <div
                    style={{ width: `calc(100% / ${guessesInRow.length})` }}
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
