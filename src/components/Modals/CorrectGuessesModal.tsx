import { FC } from 'react';
import { useActiveGameStore } from '../../store';

export const CorrectGuessesModal: FC = () => {
  const { correctGuesses } = useActiveGameStore();
  return (
    <div>
      <h2 className="font-heading text-xl mb-2">Hittade ord</h2>
      <div>{[...correctGuesses].reverse().join(', ')}</div>
    </div>
  );
};
CorrectGuessesModal.displayName = 'CorrectGuessesModal';
