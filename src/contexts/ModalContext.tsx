import { ReactNode, createContext } from 'react';

export type SetModalContextProps = {
  modal: React.ReactNode;
};

type ModalContextProps = {
  setModal: (modal: ReactNode) => void;
};

export const ModalContext = createContext<ModalContextProps>({
  setModal: () => {}
});
ModalContext.displayName = 'ModalContext';
