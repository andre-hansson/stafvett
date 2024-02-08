import { FC, useState } from 'react';
import { Button } from './Buttons';
import { DarkModeToggle } from './DarkModeToggle';
import { Progress } from './Progress';
import { useActiveGameStore } from '../store';
import { Accordion } from './Accordion';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';
import { motion } from 'framer-motion';

export const Header: FC = () => {
  const { gameDate } = useActiveGameStore();
  const [toggleInfo, setToggleInfo] = useState(false);
  return (
    <div className="pt-4">
      <div className="flex justify-between items-center px-4 pb-4 mb-1">
        <div
          className="w-12 flex justify-center text-purple-800 dark:text-purple-300"
          onClick={() => setToggleInfo(!toggleInfo)}
        >
          <motion.div
            animate={{
              rotate: toggleInfo ? 180 : 0
            }}
          >
            <ChevronDownIcon size={32} />
          </motion.div>
        </div>
        <div className="relative">
          <h1 className="font-heading italic font-extrabold text-center flex-1 text-5xl text-purple-800 dark:text-purple-300">
            Stafvett
          </h1>
          <div className="absolute text-sm pl-2.5 bottom-2 translate-y-full translate-x-full font-medium">
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
    </div>
  );
};
Header.displayName = 'Header';

const InfoRow: FC = () => {
  return (
    <div className="flex justify-evenly py-4 px-5 border-t border-t-purple-800 dark:border-t-purple-300">
      <Button label="Yesterday" onClick={() => {}} />
      <Button label="Info" onClick={() => {}} />
    </div>
  );
};
InfoRow.displayName = 'InfoRow';
