import { AnimatePresence, motion } from 'framer-motion';
import { FC, ReactNode } from 'react';

type AccordionProps = {
  children: ReactNode;
  isOpen: boolean;
};
export const Accordion: FC<AccordionProps> = ({ children, isOpen }) => {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.section
          key="content"
          initial="collapsed"
          animate="open"
          exit="collapsed"
          variants={{
            open: { opacity: 1, height: 'auto' },
            collapsed: { opacity: 0, height: 0 }
          }}
          transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          style={{
            overflow: 'hidden',
            width: '100%'
          }}
        >
          {children}
        </motion.section>
      )}
    </AnimatePresence>
  );
};
Accordion.displayName = 'Accordion';
