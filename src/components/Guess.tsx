import { FC, useMemo } from 'react';
import { useActiveGameStore } from '../store';

type GuessProps = {
  currentGuess: string;
};
export const Guess: FC<GuessProps> = ({ currentGuess }) => {
  const { main } = useActiveGameStore();

  const current = useMemo(() => {
    return currentGuess.split('').map((c, index) => {
      if (c === main) {
        return (
          <span
            key={index}
            className="font-medium text-purple-800 dark:text-purple-300"
          >
            {c}
          </span>
        );
      }
      return c;
    });
  }, [currentGuess, main]);

  return (
    <div className="text-center text-3xl h-9 tracking-wide uppercase text-darkneutral-300 dark:text-neutral-200">
      {current}
    </div>
  );
};
Guess.displayName = 'Guess';
