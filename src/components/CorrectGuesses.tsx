import { AnimatePresence, motion } from 'framer-motion';
import { FC, useCallback, useMemo } from 'react';
import { useActiveGameStore } from '../store';
import { CorrectGuessesModal } from './Modals';
import { useModal } from '../hooks';
import { Button } from './Buttons';

export const CorrectGuesses: FC = () => {
  const { correctGuesses } = useActiveGameStore();
  const { setModal } = useModal();

  const showAllCorrectGuesses = useCallback(() => {
    setModal(<CorrectGuessesModal />);
  }, [setModal]);

  const { rows, sortedGuesses } = useMemo(() => {
    const rows = Math.ceil(correctGuesses.length / 4);
    return {
      rows,
      sortedGuesses: [...correctGuesses].reverse().slice(0, 8)
    };
  }, [correctGuesses]);

  return (
    <div className="flex-1 flex md:hidden w-full">
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
              <h2 className="font-heading text-lg text-center">Hittade ord</h2>
              <div className="border border-darkneutral-400 rounded-xl">
                {Array.from({ length: rows }).map((_, row) => {
                  const guessesInRow = sortedGuesses.slice(
                    4 * row,
                    4 * row + 4
                  );
                  return (
                    <div
                      key={row}
                      className="nth-[2n]:bg-darkneutral-400 flex gap-4 rounded-b-xl"
                    >
                      {guessesInRow.map((guess, index) => (
                        <div key={index} className="flex-1 px-3 py-1.5">
                          {guess}
                        </div>
                      ))}

                      {guessesInRow.length !== 4 && (
                        <div
                          style={{
                            width: `calc(100% / ${guessesInRow.length})`
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
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
