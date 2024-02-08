import { FC, memo, useEffect, useMemo } from 'react';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { useActiveGameStore, useDarkModeStore } from '../../store';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../../tailwind.config';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tailwindcssConfig = resolveConfig(tailwindConfig) as any;
const light = tailwindcssConfig.theme.colors.purple[800];
const dark = tailwindcssConfig.theme.colors.purple[300];

export const Progressbar: FC = memo(() => {
  const { correctGuesses, answers, clearCorrectGuess, resetScore } =
    useActiveGameStore();
  const { isDarkMode } = useDarkModeStore();
  const progress = useMotionValue(0);
  const width = useTransform(progress, [0, 1], ['0%', '100%']);

  const target = useMemo(() => {
    return +(correctGuesses.length / answers.length).toFixed(2);
  }, [correctGuesses, answers]);

  useEffect(() => {
    animate(progress, target, {
      duration: 0.125,
      ease: 'easeInOut'
    });
  }, [progress, target]);

  return (
    <div
      className="h-5 flex-1 bg-neutral-400 dark:bg-darkneutral-400 rounded-full overflow-hidden relative"
      onClick={() => {
        clearCorrectGuess();
        resetScore();
      }}
    >
      <div className="flex h-full">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="h-full w-[10%] border-neutral-500 dark:border-darkneutral-350"
            style={{
              borderLeftWidth: index === 0 ? 0 : 1
            }}
          />
        ))}
      </div>
      <div className="absolute top-0 bottom-0 left-0 right-0 z-10">
        <motion.div
          style={{
            width,
            backgroundColor: isDarkMode ? dark : light,
            height: '100%'
          }}
        />
      </div>
    </div>
  );
});
Progressbar.displayName = 'Progressbar';
