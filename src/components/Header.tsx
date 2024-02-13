import { FC, useCallback, useMemo, useState } from 'react';
import { Button } from './Buttons';
import { DarkModeToggle } from './DarkModeToggle';
import { Progress } from './Progress';
import { useActiveGameStore } from '../store';
import { Accordion } from './Accordion';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';
import { motion } from 'framer-motion';
import { useModal } from '../hooks';
import {
  CorrectGuessesModal,
  InfoModal,
  YesterdaysAnswersModal
} from './Modals';

export const Header: FC = () => {
  const { gameDate, correctGuesses } = useActiveGameStore();
  const { setModal } = useModal();
  const [toggleInfo, setToggleInfo] = useState(false);

  const shownCorrectGuesses = useMemo(() => {
    return [...correctGuesses].reverse().slice(0, 15).join(', '); // 15 most recent guesses
  }, [correctGuesses]);

  const showAllCorrectGuesses = useCallback(() => {
    setModal(<CorrectGuessesModal />);
  }, [setModal]);

  return (
    <div className="pt-1.5 md:pt-4 w-full flex flex-col items-center">
      <div className="flex justify-between items-center px-4 pb-2 md:pb-4 mb-1 w-full max-w-[600px]">
        <div
          className="w-12 flex justify-center text-purple-800 dark:text-purple-300"
          onClick={() => setToggleInfo(!toggleInfo)}
        >
          <motion.div
            animate={{
              rotate: toggleInfo ? 180 : 0
            }}
          >
            <div className="hidden md:block">
              <ChevronDownIcon size={32} />
            </div>
            <div className="block md:hidden">
              <ChevronDownIcon size={24} />
            </div>
          </motion.div>
        </div>
        <div className="relative">
          <h1 className="font-heading italic font-extrabold text-center flex-1 text-3xl md:text-5xl text-purple-800 dark:text-purple-300">
            Stafvett
          </h1>
          <div className="absolute text-[10px] md:text-sm -ml-1 md:ml-0 md:pl-2.5 bottom-2 translate-y-full translate-x-full font-medium">
            {gameDate}
          </div>
        </div>
        <div className="mt-1">
          <DarkModeToggle />
        </div>
      </div>
      <Accordion isOpen={toggleInfo}>
        <InfoRow />
      </Accordion>
      <Progress />
      <div
        className="bg-neutral-400 dark:bg-darkneutral-350 w-full hidden"
        onClick={showAllCorrectGuesses}
      >
        <div className="w-full max-w-[600px] mx-auto px-4 overflow-hidden text-ellipsis whitespace-nowrap font-heading text-base md:text-lg">
          {shownCorrectGuesses}
        </div>
      </div>
    </div>
  );
};
Header.displayName = 'Header';

const InfoRow: FC = () => {
  const { setModal } = useModal();

  const showInfo = useCallback(() => {
    setModal(<InfoModal />);
  }, [setModal]);

  const showYesterday = useCallback(() => {
    setModal(<YesterdaysAnswersModal />);
  }, [setModal]);
  return (
    <div className="flex justify-center border-t border-t-purple-800 dark:border-t-purple-300 w-full">
      <div className="flex justify-evenly py-1.5 md:py-4 px-5 w-full max-w-[600px]">
        <Button label="Yesterday" onClick={showYesterday} />
        <Button label="Info" onClick={showInfo} />
      </div>
    </div>
  );
};
InfoRow.displayName = 'InfoRow';
