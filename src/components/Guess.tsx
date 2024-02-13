import { FC, memo, useMemo } from 'react';
import { useActiveGameStore } from '../store';

type GuessProps = {
  currentGuess: string;
};
export const Guess: FC<GuessProps> = memo(({ currentGuess }) => {
  const { main } = useActiveGameStore();

  const current = useMemo(() => {
    return currentGuess.split('').map((c, index) => {
      if (c === main) {
        return (
          <span
            key={index}
            className="font-extrabold text-purple-800 dark:text-purple-300"
          >
            {c}
          </span>
        );
      }
      return c;
    });
  }, [currentGuess, main]);

  return (
    <p className="text-center text-2xl h-9 tracking-widest uppercase text-darkneutral-300 dark:text-neutral-200">
      {current}
    </p>
  );
});
Guess.displayName = 'Guess';
