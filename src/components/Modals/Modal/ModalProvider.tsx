import { FC, useState, useCallback, useEffect, ReactNode } from 'react';
import { Modal } from './Modal';
import { ModalContext } from '../../../contexts';
import { AnimatePresence } from 'framer-motion';

type ModalProviderProps = {
  children: ReactNode;
};
export const ModalProvider: FC<ModalProviderProps> = (props) => {
  const [visible, setVisible] = useState(false);
  const [modal, setModal] = useState<ReactNode>(null);

  const closeModal = useCallback(() => {
    setVisible(false);
    setModal(null);
  }, []);

  useEffect(() => {
    setVisible(!!modal);
  }, [modal]);

  // useEffect(() => {
  //   const handleEvent = (event: Event) => {
  //     if (visible) {
  //       event.preventDefault();
  //     }
  //   };

  //   /**
  //    * Disabled scroll when modal is open
  //    * Using preventDefault to force the scrollbar to remain visible.
  //    * This prevent shifting of the background content when the modal is toggled.
  //    */
  //   window.addEventListener('wheel', handleEvent, { passive: false });
  //   window.addEventListener('touchmove', handleEvent, { passive: false });
  //   return () => {
  //     window.removeEventListener('wheel', handleEvent);
  //     window.removeEventListener('touchmove', handleEvent);
  //   };
  // }, [visible]);

  const handleSetModal = useCallback((modal: ReactNode) => {
    setModal(modal);
  }, []);

  return (
    <ModalContext.Provider value={{ setModal: handleSetModal }} {...props}>
      {props.children}
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {visible && <Modal content={modal} handleClose={closeModal} />}
      </AnimatePresence>
    </ModalContext.Provider>
  );
};
ModalProvider.displayName = 'ModalProvider';
