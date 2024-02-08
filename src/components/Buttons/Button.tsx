import { FC } from 'react';

type ButtonProps = {
  label: string;
  onClick: () => void;
};
export const Button: FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button
      className="px-4 py-1.5 rounded-md uppercase text-sm border-0 text-neutral-200 bg-purple-800 dark:text-darkneutral-300 dark:bg-purple-300"
      onClick={onClick}
    >
      {label}
    </button>
  );
};
Button.displayName = 'Button';
