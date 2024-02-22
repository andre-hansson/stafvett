import { AnimatePresence, motion } from 'framer-motion';
import { FC, useCallback, useMemo } from 'react';
import { useActiveGameStore } from '../store';
import { CorrectGuessesModal } from './Modals';
import { useModal } from '../hooks';
import { Button } from './Buttons';
import { FoundWords } from './FoundWords';

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

  return (
    <div className="flex-1 flex w-full">
      <AnimatePresence initial={false}>
        {!!sortedGuesses.length && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, y: 0 },
              collapsed: { opacity: 0, y: 164 }
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
            style={{
              overflow: 'hidden',
              width: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div className="bg-neutral-400 dark:bg-darkneutral-350 w-full flex-1 pt-2 px-2 rounded-t-xl flex flex-col">
              <h2 className="font-heading text-md text-center">Hittade ord</h2>
              <FoundWords rows={rows} foundWords={sortedGuesses} />

              <div className="flex-1 flex justify-center items-start pt-4">
                <Button onClick={showAllCorrectGuesses} label={'Visa alla'} />
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};
CorrectGuesses.displayName = 'CorrectGuesses';
