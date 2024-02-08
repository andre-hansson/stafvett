import { FC, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '../icons';
import { useDarkModeStore } from '../store';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tailwindcssConfig = resolveConfig(tailwindConfig) as any;
const spring = {
  type: 'spring',
  stiffness: 700,
  damping: 30
};

export const DarkModeToggle: FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkModeStore();

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div
      onClick={toggleDarkMode}
      className="w-12 h-7 bg-purple-800 dark:bg-purple-300 rounded-full flex p-1 pointer items-center"
      style={{
        justifyContent: isDarkMode ? 'flex-end' : 'flex-start'
      }}
    >
      <motion.div layout transition={spring}>
        <motion.div
          animate={{
            borderRadius: 9999,
            backgroundColor: isDarkMode
              ? tailwindcssConfig.theme.colors.purple[800]
              : tailwindcssConfig.theme.colors.neutral[300],
            color: isDarkMode
              ? tailwindcssConfig.theme.colors.neutral[300]
              : tailwindcssConfig.theme.colors.darkneutral[300]
          }}
        >
          <div className="w-5 h-5 rounded-full flex justify-center items-center">
            {isDarkMode ? <Icon.Sun size={16} /> : <Icon.Moon size={16} />}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
DarkModeToggle.displayName = 'DarkModeToggle';
