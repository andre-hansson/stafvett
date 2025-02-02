import { FC, useMemo } from 'react';
import { useActiveGameStore } from '../../store';
import { FoundWords } from '../FoundWords';
import { HexagonGrid } from '../Hexagon';

export const YesterdaysAnswersModal: FC = () => {
  const {
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

  return (
    <div>
      <h2 className="flex justify-center text-xl font-medium mb-2">
        Gårdagens lösning
      </h2>
      <div className="flex justify-between items-end px-2 mb-2 relative">
        <div className="flex flex-col items-center select-none absolute left-0">
          <div className="text-xs">Hittade ord</div>
          <div className="text-sm">
            {yesterdayCorrectGuesses.length} / {yesterdayAnswers.length}
          </div>
        </div>
        <div className="flex-1 flex gap-2 justify-center">
          <div className="w-[105px] md:w-[142px] h-[112px] md:h-[148px] relative">
            <div className="scale-[0.45] absolute top-0 left-0 origin-top-left">
              <HexagonGrid
                characters={yesterdayCharacters
                  .split('')
                  .filter((c) => c !== yesterdayMain)}
                yesterday
                onHexagonClick={() => {}}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center select-none absolute right-0">
          <div className="text-xs">Poäng</div>
          <div className="text-sm">{yesterdayScore}</div>
        </div>
      </div>
      <div className="border border-darkneutral-400 max-h-96 overflow-y-scroll">
        <FoundWords rows={rows} foundWords={sortedGuesses} highlightFound />
      </div>
      <div className="flex justify-center mt-2 text-xs">
        Lila ord hittades i föregående pussel
      </div>
    </div>
  );
};
YesterdaysAnswersModal.displayName = 'YesterdaysAnswersModal';
