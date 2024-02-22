import { FC } from 'react';
import { isPangram } from '../../utils/points';

type FoundWordsRowProps = {
  guess: string;
};
export const FoundWordsRow: FC<FoundWordsRowProps> = ({ guess }) => {
  return (
    <div className="py-1.5 text-center">
      <span
        className={
          isPangram(guess) ? 'text-green-800 dark:text-green-300 font-bold' : ''
        }
      >
        {guess}
      </span>
    </div>
  );
};
FoundWordsRow.displayName = 'FoundWordsRow';
