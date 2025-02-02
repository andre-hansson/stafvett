import { FC, useCallback, useEffect, useMemo, useRef } from 'react';
import { Progressbar } from './Progress/Progressbar';
import { FoundWords } from './FoundWords';
import { useActiveGameStore } from '../store';
import { motion, useAnimate } from 'framer-motion';
import classNames from 'classnames';
import { Button } from './Buttons';
import { useModal } from '../hooks';
import { CorrectGuessesModal } from './Modals';

export const CorrectGuesses: FC = () => {
  const { correctGuesses } = useActiveGameStore();
  const { setModal } = useModal();
  const ref = useRef<HTMLDivElement | null>(null);

  const showAllCorrectGuesses = useCallback(() => {
    setModal(<CorrectGuessesModal />);
  }, [setModal]);

  const { rows, sortedGuesses } = useMemo(() => {
    const rows = Math.ceil(correctGuesses.length / 3);
    return {
      rows,
      sortedGuesses: [...correctGuesses].reverse()
    };
  }, [correctGuesses]);

  const [scope, animate] = useAnimate<HTMLDivElement>();
  useEffect(() => {
    if (sortedGuesses.length > 0) {
      animate(
        scope.current,
        {
          height: Math.min(
            ref.current?.offsetHeight ?? 0,
            rows * 38 + 16 + 38 + 10
          )
        },
        { duration: 0.2 }
      );
    } else {
      animate(scope.current, { height: 0 }, { duration: 0.2 });
    }
  }, [sortedGuesses, ref, scope]);

  return (
    <div
      ref={ref}
      className="flex-1 flex flex-col w-full rounded-b-xl overflow-hidden relative"
    >
      <div className="w-full absolute top-0 z-10 bg-neutral-400 dark:bg-darkneutral-350">
        <Progressbar />
      </div>
      <motion.div
        ref={scope}
        initial={{ height: 0 }}
        className={classNames(
          'bg-neutral-400 dark:bg-darkneutral-350 overflow-hidden shadow-md w-full',
          'rounded-b-xl flex flex-col overflow-hidden'
        )}
      >
        <div className="mt-2.5 p-2 h-full flex flex-col w-full">
          <div
            className="max-h-[100%] overflow-hidden"
            style={{ flex: '1 1 0' }}
          >
            <FoundWords rows={rows} foundWords={sortedGuesses} scrollDisabled />
          </div>

          <div className="flex justify-center items-end pt-1.5 px-2">
            <Button onClick={showAllCorrectGuesses} label={'Visa alla'} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
CorrectGuesses.displayName = 'CorrectGuesses';
