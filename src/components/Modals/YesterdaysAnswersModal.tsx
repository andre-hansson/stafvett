import { FC, useMemo } from 'react';
import { useActiveGameStore } from '../../store';
import { isPangram } from '../../utils/points';
import classNames from 'classnames';
import dayjs from 'dayjs';

export const YesterdaysAnswersModal: FC = () => {
  const {
    gameDate,
    yesterdayAnswers,
    yesterdayCharacters,
    yesterdayMain,
    yesterdayScore,
    yesterdayCorrectGuesses
  } = useActiveGameStore();

  const { rows, sortedGuesses } = useMemo(() => {
    const rows = Math.ceil(yesterdayAnswers.length / 3);
    return {
      rows,
      sortedGuesses: [...yesterdayAnswers].sort((a, b) => (a > b ? 1 : -1))
    };
  }, [yesterdayAnswers]);

  const yesterdayGameDate = useMemo(
    () => dayjs(gameDate).subtract(1, 'day').format('YYYY-MM-DD'),
    [gameDate]
  );
  return (
    <div>
      <h2 className="font-heading text-xl mb-2 text-center">
        Lösning {yesterdayGameDate}
      </h2>
      <div className="flex justify-between px-2">
        <div className="flex gap-2">
          <label className="font-medium">Bokstäver</label>
          <div className="tracking-widest">
            {yesterdayCharacters.split('').map((c) =>
              c === yesterdayMain ? (
                <span
                  key={c}
                  className="text-purple-800 dark:text-purple-300 font-bold"
                >
                  {c}
                </span>
              ) : (
                <span key={c}>{c}</span>
              )
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <label className="font-medium">Poäng</label>
          <div>{yesterdayScore}</div>
        </div>
      </div>
      <div className="border border-darkneutral-400 max-h-96 overflow-y-scroll">
        {Array.from({ length: rows }).map((_, row) => {
          const guessesInRow = sortedGuesses.slice(3 * row, 3 * row + 3);
          return (
            <div
              key={row}
              className="nth-[2n]:bg-darkneutral-400/50 flex justify-evenly"
            >
              {guessesInRow.map((guess, index) => (
                <div
                  key={index}
                  className={classNames(
                    'py-1.5 px-2 text-center',
                    yesterdayCorrectGuesses.indexOf(guess) !== -1
                      ? 'bg-purple-300 text-darkneutral-300'
                      : ''
                  )}
                >
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
                <div style={{ width: `calc(100% / ${guessesInRow.length})` }} />
              )}
            </div>
          );
        })}
      </div>
      <div className="flex justify-center mt-2">
        Lila ord hittades i föregående pussel
      </div>
    </div>
  );
};
YesterdaysAnswersModal.displayName = 'YesterdaysAnswersModal';
