import { FC, memo, useMemo } from 'react';
import { useActiveGameStore } from '../store';
import { useFormContext, useWatch } from 'react-hook-form';

type GuessProps = {
  currentGuess: string;
};
export const Guess: FC<GuessProps> = memo(() => {
  const { main } = useActiveGameStore();
  const { register } = useFormContext();
  const currentGuess: string = useWatch({ name: 'guess' });

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
    <div>
      <input
        id="guess"
        type="hidden"
        className="bg-transparent text-center text-2xl h-9 tracking-widest uppercase text-darkneutral-300 dark:text-neutral-200"
        {...register('guess')}
      />
      <p className="text-center text-2xl h-9 tracking-widest uppercase text-darkneutral-300 dark:text-neutral-200">
        {current}
      </p>
    </div>
  );
});
Guess.displayName = 'Guess';
