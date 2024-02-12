import { FC, ReactNode } from 'react';
import { Overlay } from './Overlay';
import { motion } from 'framer-motion';
import { Icon } from '../../../icons';

const fadeIn = {
  hidden: {
    opacity: 0
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500
    }
  },
  exit: {
    opacity: 0
  }
};

type ModalProps = {
  handleClose: () => void;
  content: ReactNode;
};
export const Modal: FC<ModalProps> = ({ handleClose, content }) => {
  return (
    <Overlay onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="bg-neutral-300 dark:bg-darkneutral-300 rounded-lg px-4 pt-4 pb-8 text-darkneutral-300 dark:text-neutral-300 relative w-full md:w-[450px]"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div
          className="absolute right-2 top-2 cursor-pointer p-1"
          onClick={handleClose}
        >
          <Icon.Close size={20} />
        </div>
        <div className="">{content}</div>
      </motion.div>
    </Overlay>
  );
};
Modal.displayName = 'Modal';
