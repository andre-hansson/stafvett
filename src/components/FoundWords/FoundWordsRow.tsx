import { FC, useMemo } from 'react';
import { isPangram } from '../../utils/points';
import classNames from 'classnames';
import { useActiveGameStore } from '../../store';

type FoundWordsRowProps = {
  guess: string;
  highlightFound?: boolean;
};
export const FoundWordsRow: FC<FoundWordsRowProps> = ({
  guess,
  highlightFound
}) => {
  const { yesterdayCorrectGuesses } = useActiveGameStore();

  const highlight = useMemo(() => {
    if (highlightFound) {
      return yesterdayCorrectGuesses.indexOf(guess) !== -1;
    }
    return false;
  }, [guess, highlightFound, yesterdayCorrectGuesses]);

  return (
    <div
      className={classNames(
        'py-1.5 text-center',
        highlight
          ? 'text-neutral-200 bg-purple-800 dark:text-darkneutral-300 dark:bg-purple-500'
          : '',
        highlight && isPangram(guess)
          ? 'text-green-400'
          : isPangram(guess)
            ? 'text-green-600 dark:text-green-300 font-bold'
            : '',
        isPangram(guess) ? 'font-bold' : ''
      )}
    >
      <span>{guess}</span>
    </div>
  );
};
FoundWordsRow.displayName = 'FoundWordsRow';
