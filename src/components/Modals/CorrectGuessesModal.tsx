import { FC, useMemo } from 'react';
import { useActiveGameStore } from '../../store';
import { FoundWords } from '../FoundWords';

export const CorrectGuessesModal: FC = () => {
  const { correctGuesses } = useActiveGameStore();
  const { rows, sortedGuesses } = useMemo(() => {
    const rows = Math.ceil(correctGuesses.length / 3);
    return {
      rows,
      sortedGuesses: [...correctGuesses].sort((a, b) => (a > b ? 1 : -1))
    };
  }, [correctGuesses]);
  return (
    <div>
      <h2 className="font-heading text-xl mb-2 text-center">Hittade ord</h2>
      <FoundWords rows={rows} foundWords={sortedGuesses} />
    </div>
  );
};
CorrectGuessesModal.displayName = 'CorrectGuessesModal';
