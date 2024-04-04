import { FC, useMemo } from 'react';
import { useActiveGameStore } from '../../store';
import dayjs from 'dayjs';
import { FoundWords } from '../FoundWords';

export const YesterdaysAnswersModal: FC = () => {
  const {
    gameDate,
    yesterdayAnswers,
    yesterdayCharacters,
    yesterdayMain,
    yesterdayScore
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
        <FoundWords rows={rows} foundWords={sortedGuesses} highlightFound />
      </div>
      <div className="flex justify-center mt-2">
        Lila ord hittades i föregående pussel
      </div>
    </div>
  );
};
YesterdaysAnswersModal.displayName = 'YesterdaysAnswersModal';
