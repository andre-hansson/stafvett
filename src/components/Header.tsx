import { FC, useCallback } from 'react';
import { DarkModeToggle } from './DarkModeToggle';
import { useActiveGameStore } from '../store';
import { useModal } from '../hooks';
import { InfoModal, YesterdaysAnswersModal } from './Modals';
import { Icon } from '../icons';

export const Header: FC = () => {
  const { gameDate } = useActiveGameStore();
  const { setModal } = useModal();

  const showInfo = useCallback(() => {
    setModal(<InfoModal />);
  }, [setModal]);

  const showYesterday = useCallback(() => {
    setModal(<YesterdaysAnswersModal />);
  }, [setModal]);

  return (
    <div className="pt-1.5 md:pt-4 w-full flex flex-col items-center border-b border-b-purple-800 dark:border-b-purple-300">
      <div className="flex justify-between items-center px-4 pb-2 md:pb-4 mb-1 w-full max-w-[600px]">
        <div className="flex items-center gap-1 text-purple-800 dark:text-purple-300">
          <button
            onClick={showYesterday}
            className="hover:opacity-70 active:scale-95"
          >
            <Icon.BarChart size={26} />
          </button>
          <button
            onClick={showInfo}
            className="hover:opacity-70 active:scale-95"
          >
            <Icon.Info size={26} />
          </button>
        </div>
        <div className="relative select-none">
          <h1 className="font-heading italic font-extrabold text-center flex-1 text-3xl md:text-5xl text-purple-800 dark:text-purple-300">
            Stafvett
          </h1>
          <div className="absolute text-[10px] md:text-sm -ml-1 md:ml-0 md:pl-2.5 bottom-2 translate-y-full translate-x-full font-medium">
            {gameDate}
          </div>
        </div>
        <div className="mt-1 w-[56px]">
          <DarkModeToggle />
        </div>
      </div>
    </div>
  );
};
Header.displayName = 'Header';
