import { FC } from 'react';
import { FoundWordsRow } from './FoundWordsRow';

type FoundWordsProps = {
  rows: number;
  foundWords: string[];
};
export const FoundWords: FC<FoundWordsProps> = ({ rows, foundWords }) => {
  return (
    <div className="border border-darkneutral-400 max-h-96 overflow-y-scroll">
      {Array.from({ length: rows }).map((_, row) => {
        const guessesInRow = foundWords.slice(3 * row, 3 * row + 3);
        return (
          <div
            key={row}
            className="nth-[2n]:bg-darkneutral-400/50 grid grid-cols-3"
          >
            {guessesInRow.map((guess, index) => (
              <FoundWordsRow key={index} guess={guess} />
            ))}
          </div>
        );
      })}
    </div>
  );
};
