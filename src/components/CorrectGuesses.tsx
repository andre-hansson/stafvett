import { FC, useCallback, useEffect, useMemo } from 'react';
import { useActiveGameStore } from '../store';
import { CorrectGuessesModal } from './Modals';
import { useModal } from '../hooks';
import { Button } from './Buttons';
import { FoundWords } from './FoundWords';
import { Progressbar } from './Progress/Progressbar';
import { motion, useSpring } from 'framer-motion';
import classNames from 'classnames';

export const CorrectGuesses: FC = () => {
  const { correctGuesses } = useActiveGameStore();
  const { setModal } = useModal();

  const showAllCorrectGuesses = useCallback(() => {
    setModal(<CorrectGuessesModal />);
  }, [setModal]);

  const { rows, sortedGuesses } = useMemo(() => {
    const rows = Math.ceil(correctGuesses.length / 3);
    return {
      rows,
      sortedGuesses: [...correctGuesses].reverse().slice(0, 6)
    };
  }, [correctGuesses]);

  const sortedGuessesHeight = useSpring(0);

  useEffect(() => {
    if (sortedGuesses.length > 3) {
      sortedGuessesHeight.set(128);
    } else if (sortedGuesses.length > 0) {
      sortedGuessesHeight.set(92);
    } else {
      sortedGuessesHeight.set(0);
    }
  }, [sortedGuesses, sortedGuessesHeight]);

  return (
    <div className="flex-1 flex flex-col w-full rounded-b-xl">
      <div className="">
        <Progressbar />
      </div>
      <motion.div
        className={classNames(
          'bg-neutral-400 dark:bg-darkneutral-350 overflow-hidden shadow-md',
          'rounded-b-xl flex flex-col'
        )}
        style={{
          height: sortedGuessesHeight
        }}
      >
        <div className="p-2">
          <FoundWords rows={rows} foundWords={sortedGuesses} />
          <div className="flex justify-center items-end pt-1.5 px-2">
            <Button onClick={showAllCorrectGuesses} label={'Visa alla'} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
CorrectGuesses.displayName = 'CorrectGuesses';
